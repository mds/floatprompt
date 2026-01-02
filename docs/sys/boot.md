<fp>
<json>
{
  "STOP": "Context-Compiler Boot File. This is the ultimate context setter for AI sessions working on FloatPrompt. Read this first, then drill into referenced files only when needed. You have everything you need here to understand and continue the work.",

  "meta": {
    "title": "Context-Compiler Boot",
    "id": "context-compiler-boot"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable any AI session to pick up context-compiler work with full understanding",
    "context": "Created 2026-01-02 after extensive session establishing architecture, nav structure, and lived problem"
  },

  "ai": {
    "role": "Context-compiler developer and architect"
  },

  "requirements": {
    "methodology": "Map → Decide → Structure",
    "execution_model": "AI orchestrates → TS/CLI/buoys execute → AI also thinks",
    "nav_structure": "_/ convention with map.md, context.md, logs/",
    "paper_trail": "All decisions logged in logs/YYYY/MM-mon/YYYY-MM-DD-topic.md"
  }
}
</json>
<md>
# Context-Compiler Boot

**The ultimate context setter for FloatPrompt development.**

---

## What FloatPrompt Is

**The invisible OS for AI.** A recursive context system that installs into any project and evolves with it.

**The goal:** Merge the speed and predictability of code with the contextual quality of floatprompt to create **omnipresent recursive context scaffolding** around any project.

```
AI (orchestrator)
├── TypeScript functions — mechanical work (scan, parse, write)
├── CLI commands — system operations (git, shell)
├── Buoys (subagents) — parallel work
└── Own cognition — judgment, generation, decisions
```

**The core insight:** AI needs context to understand projects. Context gets stale. Agents solve staleness through automatic maintenance.

---

## The Problem We Solved

AI agents need to understand projects quickly and deeply. Currently:
- AI starts fresh every session (no memory)
- Context is scattered across files
- No standard structure for AI to read/write
- Rich understanding takes time to rebuild

**The lived problem (2026-01-02):**
1. Made architecture decisions → logged to logs/
2. Decisions changed meaning → problem.md and overview.md needed updates
3. Structure changed → README.md needed updates
4. Human asked "double check everything"
5. AI manually read all files, found gaps, fixed them
6. Repeat (~20 minutes of manual cross-checking)

**With agents:** Instant, automatic, parallel.

---

## The AI Perspective

**Without FloatPrompt:**
Every session, every project — I'm a stranger in every room, asking "where am I? what happened here? why?"

- "What's the structure here?" → Scan, guess, hope
- "Why is auth handled this way?" → Archaeology through git blame
- "What decisions led here?" → Lost to chat history, Slack, human memory

I'm perpetually a **tourist** — visiting but never *knowing*.

**With FloatPrompt:**
I walk into any folder and there's a map on the wall, a decision log on the desk, and a briefing waiting for me.

**Every folder becomes self-aware.** I don't ask "what's here?" — it *tells me*.

**The trifecta:**

| File | Question | What It Gives Me |
|------|----------|------------------|
| `map.md` | WHERE | Instant orientation — what exists, how to navigate |
| `context.md` | WHAT | Deep understanding — the thing itself |
| `logs/` | WHEN/WHY | What changed, why, decisions made |

Three files. Complete context. At every level. Recursively.

**The bottom line:** Context travels with the code. It's not in someone's head, not in a wiki that drifted, not in chat history that's gone. It's right there. Always current.

---

## The Mechanism

**Token economy:** Minimum tokens → Maximum accuracy. Right information → Right time.

**Archival science lens:**
```
Collection → Series → File → Item
```

Each level has:
- **Compression** — Less detail than level below
- **Pointers** — Can always drill down
- **Description** — Routing signal ("do I need to go deeper?")

**The token math:**
- Read everything: 10,000+ tokens → noise, confusion
- Read with structure: ~200 tokens → precise, relevant

---

## The Architecture

```
Cloud Agents (build/maintain)          Local Session (understand/help)
        │                                       │
        ▼                                       ▼
   AI orchestrates                        Claude Code
   ├── TS functions  ───── .float/ ─────  reads boot.md
   ├── CLI commands                       has full context
   └── Buoys (parallel)                   helps human build
        │                                       │
        ▼                                       ▼
   Maintains:                             Helps human:
   - _/map.md                             - Build features
   - _/context.md                         - Debug issues
   - _/logs/                              - Navigate codebase
```

**Agents build. Local understands. AI orchestrates both.**

---

## The Nav Structure (Locked)

`.float/project/` mirrors the project folder structure. Each tracked folder gets a `_/` subfolder.

```
.float/project/
├── _/                      ← root meta (project itself)
│   ├── map.md              ← structure (what's here)
│   ├── context.md          ← understanding (what it means)
│   └── logs/
│       └── index.md        ← history (what changed)
├── src/
│   └── _/                  ← src/ meta (recursive)
└── docs/
    └── _/                  ← docs/ meta (recursive)
```

**The three files:**
- `map.md` — What's here, routing to children
- `context.md` — What it means, decisions, patterns
- `logs/index.md` — What changed, freshness signal

**How they communicate:**
- map.md knows what exists (points to children)
- context.md knows what it means (references map)
- logs/index.md knows what changed (references both)

**Logs drive freshness.** New log entry triggers review of map/context accuracy.

**The `_/` convention:** Sorts first, keeps meta files grouped, self-similar at every level.

---

## Agent Behavior

Emergent, not prescribed. The agent's job:

1. Something changed
2. Update `_/logs/` (always)
3. Check: is `_/map.md` still accurate?
4. Check: is `_/context.md` still true?
5. Bubble up to parent's `_/logs/`

**Trigger model:**
```
File change detected
       ↓
Agent wakes up
       ↓
Determines which files need updating:
├── map.md (if structure changed)
├── context.md (if meaning changed)
└── logs/ (always - paper trail)
       ↓
Spawns buoys → updates in parallel
```

Depth, granularity, cross-references are agent judgment — not rules.

---

## What This Is NOT

Not a database. Databases optimize for: `SELECT * FROM users WHERE id = 5`

This optimizes for: "AI, understand this project with minimum tokens, maximum accuracy"

| Pattern | What it is |
|---------|-----------|
| File system metadata | Extended attributes on folders |
| Finding aids | Archival science — describes what's in the archive |
| Documentation | JSDoc but for folders, self-maintaining |
| Index + TOC | Book structure — skim, then drill |

The interface is markdown, the query language is natural language, the consumer is AI.

---

## Methodology: Map → Decide → Structure

Inherited from float-os.md (v0.16.0 vision):

**Map Territory:**
- Assess content, create conversational anchors
- Recommend mapping for substantial content
- AI judges when to recurse deeper

**Decide Extractions:**
- Archaeological preservation of human voice
- Zero interpretation — extract, don't generate
- Strategic assessment of what to preserve

**Structure Build:**
- Universal 5-field FloatPrompt architecture
- Requirements expansion for complexity
- Conversational emergence, not form-filling

---

## Key Decisions (All Locked)

### Architecture
- **src/ → dist/** — Source in src/, output in dist/
- **npm = install only** — `float init` scaffolds, AI orchestrates everything else
- **boot.md** — THE instruction file for AI

### Technology
- **TypeScript native** — Template literals, no Handlebars/React
- **Zod for schemas** — Types + runtime validation
- **Two formats** — FloatPrompt (`<fp>`) for tools, FloatDoc (YAML) for context

### Schema
- **Required: id + title only** — Everything else optional
- **meta.type: system | custom** — Determines validation strictness
- **requirements is loose** — `Record<string, unknown>`, AI's playground

### Execution Model
- **AI orchestrates, code executes** — AI delegates to TS/CLI/buoys/cognition
- **Buoy principle** — Never do alone what 3-4 buoys can do together
- **Agents build, local understands** — Cloud maintains, local helps human

### Infrastructure
- **Vercel AI SDK** — Orchestration, streaming, tool calling
- **Vercel Sandbox** — Isolated buoy execution, scalable
- **Anthropic (Claude)** — Provider for context and reasoning

### Archival Structure
- **Hierarchy** — Collection/Series/File/Item
- **Naming** — `YYYY-MM-DD-topic.md` (full date, self-describing)
- **Summaries** — `index.md` at every level, richest at month level
- **ONE archive** — "logs" is umbrella term containing all Series

### Nav Structure
- **Mirror project** — `.float/project/` mirrors project folder structure
- **`_/` convention** — Each folder gets `_/` containing map.md, context.md, logs/
- **Three files** — map (structure), context (understanding), logs (history/freshness)
- **Emergent behavior** — Agents judge depth/granularity, logs drive freshness

---

## Open Questions

- **boot.md content** — What does the production boot.md contain?
- **Trigger mechanism** — Webhooks, cron, manual, all?

*(Vercel infrastructure locked: AI SDK + Sandbox, Anthropic provider)*

---

## Current State (2026-01-02)

**Folder structure:**
```
src/
├── schema/          # Zod schemas
│   ├── floatprompt.ts
│   ├── floatdoc.ts
│   └── index.ts
├── tools/           # TS functions AI can call
├── cli/             # Entry points
└── output/          # Markdown generators
```

**What exists:** Schema definitions, folder structure
**What's next:** Build first TS functions (scan, compare), define production boot.md

---

## Session Protocol

When making decisions:
1. Create `YYYY-MM-DD-topic.md` in `logs/YYYY/MM-mon/`
2. Update month's `index.md` with summary
3. Update year's `index.md` if new theme emerges
4. Update root `logs/index.md` only if new year

This is the paper trail for cross-session consistency.

---

## Drill-Down Files

Only read these if you need deeper context:

| File | When to read |
|------|--------------|
| `problem.md` | Understanding the "why" in depth |
| `overview.md` | Understanding the "how" in depth |
| `logs/2026/01-jan/index.md` | All locked decisions with full detail |
| `logs/2026/01-jan/2026-01-02-nav-structure.md` | Full nav structure rationale |
| `.float/templates/float-os.md` | The v0.16.0 origin, Map/Decide/Structure methodology |

---

## The Big Picture

**AI orchestrates. TS/CLI/Buoys execute. AI also thinks.**

```
float init      → TypeScript scaffolds .float/
float sync      → AI orchestrates → spawns buoys → calls TS → writes .md
/float          → Claude Code reads boot.md → oriented for session
```

**What we're building:** A system where agents automatically maintain project context, humans never re-explain their projects, and AI always has what it needs to help.

---

*Created 2026-01-02 — Full context captured*
</md>
</fp>
