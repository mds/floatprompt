<fp>
<json>
{
  "STOP": "Filesystem Watcher Architecture. Three-layer system for self-healing FloatPrompt: Code (mechanical) → Buoys (AI agents) → Commands (tools).",

  "meta": {
    "title": "Filesystem Watcher Architecture",
    "id": "filesystem-watcher-architecture",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Define the layered architecture for automated FloatPrompt System maintenance",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Architecture reference",
    "behavior": "Understand the layers, chain of command, and how components interact"
  },

  "requirements": {
    "layers": {
      "code": "Mechanical, always running, free — filesystem watcher, detect functions",
      "buoys": "AI agents, triggered by code or other buoys — Scout, Map, Think",
      "commands": "Text tools, invoked by buoys or humans — float-sync, float-fix, etc."
    },
    "chain_of_command": "detect → map → think → act — always, no shortcuts",
    "paper_trail": "Every AI decision logged with rationale"
  }
}
</json>
<md>
# Filesystem Watcher Architecture

**Three layers working together for a self-healing FloatPrompt System.**

## The Layers

```
┌─────────────────────────────────────────────────────────┐
│  LAYER 3: float-* Commands                              │
│  Text tools invoked by buoys or humans                  │
│  /float-sync, /float-fix, /float-enhance, /float-think  │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │ invokes
                          │
┌─────────────────────────────────────────────────────────┐
│  LAYER 2: Buoys                                         │
│  AI agents triggered by code or other buoys             │
│  Scout Buoy → Map Buoy → Think Buoy                     │
└─────────────────────────────────────────────────────────┘
                          ▲
                          │ triggers
                          │
┌─────────────────────────────────────────────────────────┐
│  LAYER 1: Code                                          │
│  Mechanical, always running, free                       │
│  Filesystem watcher, detect functions                   │
└─────────────────────────────────────────────────────────┘
```

## Layer 1: Code (Mechanical)

Pure Node.js. No AI calls. Always running when watcher is active.

### Components

| Component | Purpose |
|-----------|---------|
| Filesystem Watcher | Detect file create/delete/rename/move/modify |
| Reference Checker | Grep for paths, check if they exist |
| Frontmatter Parser | Extract and validate YAML/JSON metadata |
| Timestamp Tracker | Compare file mtime vs ai_updated |
| Version Checker | Match version strings against current |

### Output

Raw change data passed to Scout Buoy:

```json
{
  "event": "modify",
  "path": "src/auth.ts",
  "timestamp": "2025-12-30T14:32:00Z",
  "references_to": ["nav/src.md"],
  "referenced_by": ["docs/safety.md"],
  "broken_refs": []
}
```

## Layer 2: Buoys (AI Agents)

AI-powered agents that assess, decide, and coordinate.

### The Chain

```
Scout Buoy
    │
    │  "What changed? What might be affected?"
    │  Fast, lightweight assessment
    ▼
Map Buoy
    │
    │  "What's the blast radius? Semantic relationships?"
    │  Determines scope beyond mechanical links
    ▼
Think Buoy
    │
    │  "What actions are required?"
    │  Decides which float-* commands to invoke
    ▼
[float-* commands execute]
```

### Buoy Responsibilities

| Buoy | Input | Output | Model |
|------|-------|--------|-------|
| Scout Buoy | Raw change data from code | Assessment report | Configurable (start Haiku) |
| Map Buoy | Scout report | Blast radius, relationships, confidence | Configurable (start Haiku) |
| Think Buoy | Map report | Action plan, command invocations | Configurable (start Sonnet) |

### Confidence Levels

Map Buoy outputs confidence that determines Think Buoy behavior:

| Confidence | Meaning | Think Buoy Action |
|------------|---------|-------------------|
| routine | Mechanical update, pattern recognized | Execute immediately, log |
| significant | Multiple files, needs coordination | Plan carefully, execute, log |
| needs-judgment | Unclear impact, architectural | Deep analysis, may ask human |

## Layer 3: float-* Commands (Tools)

Text-based tools that buoys invoke. Same tools humans can run directly.

### Available Commands

| Command | Purpose | Invoked When |
|---------|---------|--------------|
| /float | Boot, initialize, status | Session start |
| /float-sync | Structure integrity | Nav doesn't match folders |
| /float-fix | Content integrity | Broken refs, stale content |
| /float-enhance | Quality improvement | Weak descriptions, gaps |
| /float-context | Terrain maps | Context missing or stale |
| /float-think | Decision layer | Complex multi-file changes |
| /float-plan | Chunk large changes | Flood of changes detected |

### Command Invocation

Think Buoy invokes commands by:
1. Determining which command(s) apply
2. Passing relevant context (files, scope)
3. Logging the decision and rationale
4. Executing the command
5. Logging the result

## The Full Flow

```
Filesystem change detected
         ↓
    Code Layer: Gather raw data
         ↓
    Scout Buoy: Assess change
         ↓
    Map Buoy: Determine blast radius
         ↓
    Think Buoy: Decide actions
         ↓
    Log decision with rationale
         ↓
    Invoke float-* command(s)
         ↓
    Log results
         ↓
    .float/ updated
```

## Chain of Command Rules

1. **Always flows through Think** — Even routine changes go through Think Buoy. Think just decides fast for routine cases.

2. **No direct code → command** — Code layer never invokes float-* directly. Always through buoy chain.

3. **Buoys can wake buoys** — Scout can trigger Map. Map can trigger Think. Think can re-trigger Scout for verification.

4. **Commands report back** — After execution, results flow back to Think for logging and potential follow-up.

## State Management

### Watcher State

```json
{
  "status": "running",
  "started": "2025-12-30T14:00:00Z",
  "watching": "/Users/mds/project",
  "files_tracked": 147,
  "pending_scouts": 0,
  "last_activity": "2025-12-30T14:32:00Z"
}
```

### Decision Log

Every AI decision persisted to `.float/project/logs/decisions/`:

```markdown
## 2025-12-30 14:32 — Think Buoy

**Trigger:** Scout report (src/auth.ts modified)
**Map Assessment:** nav/src.md stale, docs/safety.md low-confidence
**Decision:** /float-sync nav/src.md
**Rationale:** Direct reference in nav, safety doc is conceptual only
**Result:** Success, description updated
```

## Error Handling

| Scenario | Response |
|----------|----------|
| Scout fails | Log error, skip to next change |
| Map fails | Fall back to Scout assessment only |
| Think fails | Queue for retry, alert if persistent |
| Command fails | Log failure, Think decides retry or escalate |
| API down | Queue all changes, process when restored |

## Integration Points

### With Existing FloatPrompt System

- Watcher respects `.float/` structure
- Uses existing nav/*.md as reference map
- Logs to existing `.float/project/logs/`
- Triggers existing float-* commands

### With Claude Code

- `/float` detects watcher status
- Reports watcher health in boot output
- Can restart watcher if needed

---

*Architecture for the self-healing FloatPrompt System.*
</md>
</fp>
