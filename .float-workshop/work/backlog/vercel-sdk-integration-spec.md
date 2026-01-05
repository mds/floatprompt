# Vercel AI SDK Integration Spec

> **Status:** WIP — Spec for migrating buoy execution to Vercel AI SDK
> **Created:** 2026-01-04
> **Source:** Research from Vercel docs, AI SDK 5/6, Sandbox, MCP

---

## Current State

### What We Have

```
src/buoys/execute.ts
├── Direct Anthropic API calls (anthropic.messages.create)
├── Manual prompt composition (3-layer: global + archetype + specific)
├── Manual response parsing
├── Promise.all for parallel execution
└── No isolation (runs in main process)
```

**Works for:** Development, single-project testing, manual invocation

**Limitations:**
- No built-in loop control (multi-step reasoning)
- No context management between steps
- No isolation (buoys share process with orchestrator)
- No human-in-loop approval for destructive operations
- Manual token management

---

## Target State

### The Stack

```
┌─────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR                             │
│                                                              │
│  AI SDK ToolLoopAgent                                        │
│  ├── Handles loop, context, stopping conditions              │
│  ├── prepareStep for dynamic behavior per iteration          │
│  └── Tools defined with Zod schemas                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Tool execution
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     EXECUTION LAYER                          │
│                                                              │
│  Development: In-process (current behavior)                  │
│  Production: Vercel Sandbox (isolated Firecracker VMs)       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ Data access
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     DATA LAYER                               │
│                                                              │
│  MCP Server exposing float.db                                │
│  ├── queryFolders, getLogEntries, updateContext              │
│  ├── Remote access for Sandbox-isolated buoys                │
│  └── Standardized protocol (works with any MCP client)       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

---

## Concept Mapping

| FloatPrompt Concept | Current Implementation | AI SDK Primitive |
|---------------------|------------------------|------------------|
| Buoy template | Markdown file in `templates/` | `tool()` definition with Zod schema |
| 3-layer composition | `dispatch.ts` string concatenation | `prepareStep` callback |
| Parallel execution | `Promise.all` with direct API | `ToolLoopAgent` with multiple tools |
| Buoy execution | `execute.ts` → Anthropic API | `agent.generate()` or Sandbox isolation |
| Stopping condition | Manual (single response) | `stopWhen: stepCountIs(n)` or `hasToolCall('done')` |
| Fleet mode | Planned (spawn per folder) | Agent with folder-processing tools |
| Background buoys | Planned (Layer 3) | Long-running agent + MCP data access |

---

## AI SDK Patterns

### 1. Tool Definition (Replaces Buoy Templates)

**Current:**
```typescript
// templates/scope-detector.md parsed at runtime
const template = await loadTemplate('scope-detector');
const prompt = composePrompt(template, data);
const response = await anthropic.messages.create({...});
```

**With AI SDK:**
```typescript
import { tool } from 'ai';
import { z } from 'zod';

const scopeDetector = tool({
  description: 'Analyzes folder structure to detect if folder is an autonomous scope',
  parameters: z.object({
    folder_path: z.string().describe('Path to analyze'),
    folder_details: FolderDetailsSchema,
    parent_context: z.string().optional()
  }),
  execute: async ({ folder_path, folder_details, parent_context }) => {
    // Buoy logic here
    return {
      is_scope: true,
      confidence: 'high',
      reasoning: 'Has package.json, independent test suite, own README'
    };
  }
});
```

**Benefits:**
- Schema validation built-in (Zod)
- Description tells model when/how to use
- Type-safe inputs and outputs
- Composable with other tools

### 2. Agent Loop (Replaces Manual Orchestration)

**Current:**
```typescript
// Manual single-shot execution
const response = await executeBuoy('context-generator', data);
```

**With AI SDK:**
```typescript
import { ToolLoopAgent, stepCountIs } from 'ai';

const contextAgent = new ToolLoopAgent({
  model: anthropic('claude-sonnet-4-20250514'),
  tools: {
    scanFolder,
    detectScope,
    generateContext,
    checkStaleness,
    markComplete
  },
  stopWhen: hasToolCall('markComplete'),
  maxSteps: 10
});

const result = await contextAgent.generate({
  prompt: `Generate context for folder: ${folderPath}`
});
```

**Benefits:**
- Agent decides which tools to call and in what order
- Automatic context accumulation between steps
- Built-in stopping conditions
- No manual loop management

### 3. prepareStep (Replaces Static 3-Layer Composition)

**Current:**
```typescript
// Static composition at call time
const prompt = [
  globalGuidance,
  archetypeGuidance,
  specificTemplate
].join('\n\n');
```

**With AI SDK:**
```typescript
const agent = new ToolLoopAgent({
  model,
  tools,
  prepareStep: ({ stepNumber, messages, steps }) => {
    // Dynamic composition based on what's happened
    const lastToolCall = steps[steps.length - 1]?.toolCalls[0]?.toolName;

    return {
      // Switch to stronger model for complex reasoning
      model: stepNumber > 3 ? anthropic('claude-opus-4') : model,

      // Trim context to manage tokens
      messages: trimToRecentMessages(messages, 5),

      // Restrict tools based on phase
      tools: getToolsForPhase(lastToolCall)
    };
  }
});
```

**Benefits:**
- Dynamic model selection (cheap model for simple steps, expensive for complex)
- Context window management (trim old messages)
- Tool availability changes per phase
- Observability into execution history

### 4. Human-in-Loop Approval

**For destructive operations:**
```typescript
const updateContext = tool({
  description: 'Updates folder context in database',
  parameters: z.object({
    folder_path: z.string(),
    content_md: z.string()
  }),
  // Requires human approval before execution
  needsApproval: true,
  execute: async ({ folder_path, content_md }) => {
    await db.updateFolder(folder_path, { content_md });
    return { success: true };
  }
});
```

**Relevant for:**
- Database writes
- File modifications
- Log entries marked as "locked"
- Scope boundary changes

---

## Sandbox Integration

### Why Sandbox?

Current `execute.ts` runs buoys in the main Node.js process. Problems:
- Buoys can access filesystem, environment, network
- No resource limits (CPU, memory, time)
- No isolation between parallel buoys
- A bad buoy can crash the orchestrator

### Sandbox Architecture

```typescript
import { Sandbox } from '@vercel/sandbox';

async function executeBuoyIsolated(buoyName: string, data: object) {
  const sandbox = await Sandbox.create({
    resources: { vcpus: 2 },  // Up to 8 available
    timeout: ms('5m'),         // Up to 5 hours on Pro
    runtime: 'node22'
  });

  try {
    // Option A: Run pre-built buoy script
    await sandbox.writeFile('/buoy.js', getBuoyScript(buoyName));
    await sandbox.writeFile('/data.json', JSON.stringify(data));

    const result = await sandbox.runCommand({
      cmd: 'node',
      args: ['buoy.js'],
      env: { ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY }
    });

    return JSON.parse(result.stdout);

  } finally {
    await sandbox.stop();  // Always cleanup — avoids charges
  }
}
```

### Sandbox + MCP for Data Access

Sandboxed buoys can't access local SQLite. Solution: MCP server.

```typescript
// Orchestrator exposes float.db via MCP
const mcpServer = createMCPServer({
  tools: {
    queryFolders: async ({ path }) => db.getFolder(path),
    getLogEntries: async ({ folder_path }) => db.getLogEntries(folder_path),
    updateContext: async ({ path, content }) => db.updateFolder(path, content)
  }
});

// Sandbox buoy connects via MCP
const mcpClient = await experimental_createMCPClient({
  transport: new StreamableHTTPClientTransport({
    url: 'http://host.docker.internal:3001/mcp'  // Host-accessible URL
  })
});

const tools = await mcpClient.tools();
// Buoy now has: queryFolders, getLogEntries, updateContext
```

### Cost Model

| Resource | Hobby (Free) | Pro |
|----------|--------------|-----|
| CPU hours | 5/month | $0.128/hour |
| Memory | 420 GB-hr | $0.0106/GB-hr |
| Sandbox creations | 5,000/month | $0.60/million |

**Estimate for FloatPrompt:**
- 65 folders × 4 buoys each = 260 buoy executions
- ~30 seconds average = 2.2 CPU-hours
- Well within free tier for development

---

## MCP Server Design

### Why MCP?

Model Context Protocol standardizes how AI tools access data. Benefits:
- Buoys don't need direct database access
- Same interface whether running local or in Sandbox
- Decouples execution from storage
- Enables distributed/remote buoy execution

### Proposed MCP Tools

```typescript
const floatMCPServer = {
  tools: {
    // Read operations
    getFolder: {
      description: 'Get folder metadata and context',
      parameters: z.object({ path: z.string() }),
      execute: async ({ path }) => db.getFolder(path)
    },

    getScopeChain: {
      description: 'Get ancestor scopes for a path',
      parameters: z.object({ path: z.string() }),
      execute: async ({ path }) => db.getScopeChain(path)
    },

    getLogEntries: {
      description: 'Get decision log entries for a folder',
      parameters: z.object({
        folder_path: z.string(),
        limit: z.number().default(10)
      }),
      execute: async ({ folder_path, limit }) =>
        db.getLogEntries(folder_path, limit)
    },

    getStaleFolders: {
      description: 'Get folders marked as stale',
      parameters: z.object({}),
      execute: async () => db.query('SELECT * FROM folders WHERE status = "stale"')
    },

    // Write operations (may require approval)
    updateFolderContext: {
      description: 'Update description and content_md for a folder',
      parameters: z.object({
        path: z.string(),
        description: z.string().optional(),
        content_md: z.string().optional()
      }),
      execute: async (params) => db.updateFolder(params.path, params)
    },

    createLogEntry: {
      description: 'Create a new decision log entry',
      parameters: LogEntrySchema,
      execute: async (entry) => db.createLogEntry(entry)
    }
  }
};
```

### Transport Options

| Transport | Use Case | Production? |
|-----------|----------|-------------|
| stdio | Local dev, same machine | No |
| HTTP/SSE | Remote access, Sandbox | Yes |
| WebSocket | Real-time bidirectional | Future |

**Recommendation:** HTTP transport for production. Sandbox buoys connect to orchestrator's MCP server.

---

## Migration Phases

### Phase 1: Tool Definitions (Low Risk)

**Change:** Convert buoy templates to AI SDK `tool()` format

**Keep:** Direct Anthropic API calls, current orchestration

**Benefit:** Type-safe schemas, better documentation, preparation for Phase 2

```typescript
// New: src/buoys/tools/scope-detector.ts
export const scopeDetector = tool({
  description: '...',
  parameters: ScopeDetectorInputSchema,
  execute: async (input) => {
    // Can still call current executeBuoy internally
    return executeBuoy('scope-detector', input);
  }
});
```

### Phase 2: Agent Orchestration (Medium Risk)

**Change:** Replace manual orchestration with `ToolLoopAgent`

**Keep:** In-process execution, direct database access

**Benefit:** Multi-step reasoning, automatic context management, built-in stopping

```typescript
// New: src/buoys/agents/context-agent.ts
export const contextAgent = new ToolLoopAgent({
  model: anthropic('claude-sonnet-4-20250514'),
  tools: { scopeDetector, contextGenerator, stalenessChecker, decisionLogger },
  stopWhen: hasToolCall('complete'),
  prepareStep: dynamicComposition
});
```

### Phase 3: Sandbox Isolation (Higher Risk)

**Change:** Move buoy execution to Vercel Sandbox

**Keep:** Agent orchestration, tool definitions

**Benefit:** True isolation, resource limits, production scalability

```typescript
// Orchestrator stays local
const agent = new ToolLoopAgent({
  tools: {
    // Tools execute in Sandbox
    scopeDetector: sandboxWrapped(scopeDetector),
    contextGenerator: sandboxWrapped(contextGenerator)
  }
});
```

### Phase 4: MCP Data Layer (Production)

**Change:** Expose float.db via MCP server

**Benefit:** Sandboxed buoys access data remotely, clean separation

```typescript
// Start MCP server alongside orchestrator
const mcpServer = createFloatMCPServer(db);
await mcpServer.listen(3001);

// Sandbox buoys connect via MCP
// No direct database access needed
```

---

## Open Questions

### Q1: Agent vs Direct Tool Calls

When should buoys use agent loops vs direct single-shot execution?

**Options:**
- A) Always use agent (let it decide tool order)
- B) Single-shot for simple buoys, agent for complex chains
- C) User chooses per invocation

**Leaning:** B — `context-generator` is single-shot, but `fleet-coordinator` orchestrating multiple folders is an agent.

### Q2: Sandbox Granularity

One sandbox per buoy execution, or one sandbox per fleet run?

**Options:**
- A) Per-buoy: Maximum isolation, higher overhead
- B) Per-fleet: Shared context, lower overhead, less isolation
- C) Pooled: Reuse sandboxes across invocations

**Leaning:** A for production (isolation), B for development (speed).

### Q3: MCP Server Location

Where does the MCP server run?

**Options:**
- A) Same process as orchestrator (simple, coupled)
- B) Separate process, same machine (decoupled, local)
- C) Deployed service (fully decoupled, network latency)

**Leaning:** A for MVP, graduate to B when Sandbox integration lands.

### Q4: prepareStep vs Pre-Composition

Should 3-layer composition happen in `prepareStep` or stay pre-computed?

**Options:**
- A) prepareStep: Dynamic, can change per step
- B) Pre-computed: Simpler, predictable, current approach
- C) Hybrid: Base composition pre-computed, prepareStep adds step-specific

**Leaning:** C — Global + archetype pre-composed, prepareStep adds step context.

### Q5: When to Require Approval

Which operations need `needsApproval: true`?

**Candidates:**
- [ ] All database writes
- [ ] Only "locked" status changes
- [ ] Scope boundary modifications
- [ ] Log entries
- [ ] None (trust the buoys)

**Leaning:** Scope boundary changes and "locked" status only. Context updates are frequent, approval would be friction.

---

## Dependencies

### Required Packages

```json
{
  "dependencies": {
    "ai": "^6.0.0",
    "@ai-sdk/anthropic": "^1.0.0",
    "@vercel/sandbox": "^1.0.0"
  }
}
```

### Environment

- Node.js 22+ (for Sandbox compatibility)
- Vercel account (for Sandbox, optional for dev)
- Anthropic API key (unchanged)

---

## References

- [AI SDK Documentation](https://ai-sdk.dev/docs/introduction)
- [AI SDK Tool Calling](https://ai-sdk.dev/docs/ai-sdk-core/tools-and-tool-calling)
- [Agent Loop Control](https://ai-sdk.dev/docs/agents/loop-control)
- [Agents Overview](https://ai-sdk.dev/docs/foundations/agents)
- [Building AI Agents Guide](https://vercel.com/kb/guide/how-to-build-ai-agents-with-vercel-and-the-ai-sdk)
- [Vercel Sandbox Docs](https://vercel.com/docs/vercel-sandbox)
- [Sandbox + Claude Agent SDK](https://vercel.com/kb/guide/using-vercel-sandbox-claude-agent-sdk)
- [MCP Integration](https://ai-sdk.dev/docs/ai-sdk-core/mcp-tools)
- [AI SDK 6 Announcement](https://vercel.com/blog/ai-sdk-6)

---

*Vercel AI SDK integration spec — 2026-01-04*
