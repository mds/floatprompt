<fp>
<json>
{
  "STOP": "Buoy Reconnaissance Artifact. Complete context dump from exhaustive codebase read. Use as reference for buoy architecture decisions.",

  "meta": {
    "title": "Buoy Reconnaissance",
    "id": "buoy-recon-2026-01-04"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture complete buoy context for future sessions"
  },

  "ai": {
    "role": "Reference document — read for buoy architecture context"
  },

  "requirements": {
    "source_files_read": [
      "docs/maintainer/buoys.md",
      ".float-wip/_wip/wip-buoys.md",
      ".float-wip/_wip/wip-vision.md",
      ".float-wip/_wip/wip-boot.md",
      ".float-wip/_wip/wip-generate-spec.md",
      ".float-wip/_wip/wip-reconcile.md",
      "artifacts/2025-12-30-filesystem-watcher/buoys.md",
      "artifacts/archive/2025/12-dec/2025-12-28-float-buoys-context.md",
      "artifacts/archive/2025/12-dec/2025-12-28-float-buoys-daemon-spec.md",
      "artifacts/archive/2025/12-dec/2025-12-28-float-buoys-commands-spec.md",
      "artifacts/archive/2025/12-dec/2025-12-28-float-buoys-test.md",
      "templates/.float/tools/float-think.md",
      "templates/.float/tools/float-all.md",
      "src/db/schema.ts",
      "src/db/generate.ts",
      ".float-wip/_wip/wip-logs/2026/01-jan/01-jan.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-founding.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-sqlite-understanding.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-no-code-without-requirements.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-nav-structure.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-vercel-infrastructure.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-02-storage-architecture.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-schema-spec-locked.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-orchestration-decisions.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-generate-spec-complete.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-layer2-implementation.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-phase3-implementation-complete.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-summaries-in-folders.md",
      ".float-wip/_wip/wip-logs/2026/01-jan/2026-01-03-context-architecture.md"
    ]
  }
}
</json>
<md>
# Buoy Reconnaissance

**Date:** 2026-01-04
**Purpose:** Complete context dump from exhaustive codebase read

---

## The Vision

**Omnipresent recursive context scaffolding** around any user's project.

```
= mechanical speed (code)
+ contextual quality (AI judgment)
+ infinite parallelization (buoys)
+ hierarchical scoping (autonomous scopes)
+ persistent storage (SQLite)
```

Any size. Any depth. Any complexity.

---

## What Buoys Are

**Parallel task agents for FloatPrompt System maintenance.** Platform-agnostic — implementations can use Claude Code's Task tool, API calls, or custom software.

### The Core Pattern

```
Spawn → Verify → Aggregate → Approve → Fix → Log
```

**The approval gate is critical:** buoys propose, humans decide.

---

## Two Main Architectures

### 1. Commands Approach (Active)

On-demand maintenance via `/float` commands. No daemon, no npm install, no background process.

**Check Phase Buoys:**

| Buoy | Job |
|------|-----|
| Check Buoy | Verify nav/*.md vs actual folders |
| Context Buoy | Generate terrain maps |
| Scan Buoy | Detect stale refs, version drift |
| Frontmatter Buoy | Check YAML/`<fp>` metadata completeness |

**Fix Phase Buoys:**

| Buoy | Job |
|------|-----|
| Nav Buoy | Update nav file tables |
| Describe Buoy | Generate file descriptions (Haiku) |
| Scaffold Buoy | Create new nav files |
| Log Buoy | Record activity to logs |

### 2. Daemon Approach (Tabled)

Real-time Dropbox-style sync with 5 buoys: Watch, Index, System, Log, Integrity. Tabled in favor of simpler commands.

---

## The City Metaphor

From `wip-buoys.md`:

- **boot.md** = The Mayor — knows all workers, dispatch patterns
- **Buoys** = Workers — policemen, firemen, doctors, etc.
- **Buoy-boot templates** = Job descriptions
- **Folder context** = Work sites

### 55+ Potential Workers (14 Categories)

**Layer 1: Mechanical (no AI)**
- Scanner

**Layer 2: AI Generation**
- Context Generator
- Scope Detector
- Summarizer

**Layer 3: Ongoing Maintenance**
- Staleness Checker
- Regenerator

**Meta Workers**
- Thinker
- Orchestrator
- Prioritizer
- Merger

---

## Key Design Principles

### The Goldilocks Rule

| Too Narrow | Just Right | Too Wide |
|------------|------------|----------|
| "Read line 5" | "Read file, return one-line description" | "Fix all problems" |
| Wasteful | Bounded | Unpredictable |

### The 3+ Rule

Spawn buoys when **3+ parallel operations** needed. Below that, direct execution is fine.

### Context Architecture

Buoys have **isolated context** — they don't inherit orchestrator conversation history. They discover context through files, not conversation transfer.

**Prompt Design:**

| Include | Exclude |
|---------|---------|
| Specific file paths | "the file we talked about" |
| Expected output format (JSON) | Open-ended questions |
| Success/failure criteria | Conversation references |

---

## Watcher Buoys (Filesystem)

From `artifacts/2025-12-30-filesystem-watcher/buoys.md`:

```
scout-detect (code) → raw change detection
     ↓
scout-map (AI/Haiku) → assess non-trivial changes
     ↓
Map Buoy (AI/Haiku→Sonnet) → determine blast radius
     ↓
Think Buoy (AI/Sonnet) → decide and execute actions
```

**Confidence levels:** routine → significant → needs-judgment

---

## Float-Think (Meta-Orchestrator)

The intelligent orchestrator that:

1. Analyzes findings from any tool
2. Matches issues to appropriate tools
3. Spawns parallel buoys (max 4)
4. Collects results
5. Reports to human

**Always returns to human after one round** — no autonomous loops.

---

## Float-All vs Float-Think

| Aspect | float-all | float-think |
|--------|-----------|-------------|
| Sequence | Fixed (5 tools always) | Dynamic (only needed tools) |
| Intelligence | None (pipeline) | Analyzes and selects |
| Use case | "Make everything healthy" | "Do what's needed" |

**float-all sequence:** `float → sync → fix → context → enhance`

---

## Buoy Assembly Architecture

```
BuoyPrompt = Global + Archetype + Specialized + DBInstructions + HandoffMessage
```

**Archetypes:**
- Extractor
- Processor
- Scorer
- Reconciler
- Pipeline
- Reference

---

## Three Layers of FloatPrompt

| Layer | Status | What |
|-------|--------|------|
| **Layer 1: Mechanical** | DONE | Scanner — walks filesystem, populates SQLite |
| **Layer 2: AI Generation** | IN PROGRESS | generate.ts + CLI — level-order context population |
| **Layer 3: Ongoing** | Future | Triggers, staleness detection, freshness |

---

## Core Architecture Decisions (Locked)

From January 2026 logs:

1. **AI orchestrates, code executes** — AI delegates to TS/CLI/buoys
2. **SQLite is source of truth** — Every folder = row, queryable
3. **boot.md = system prompt** — THE entry point for AI
4. **Map → Decide → Structure is a GATE** — No code without locked requirements
5. **CLI over MCP** — Same power, less infrastructure
6. **Database IS progress** — `status` field tracks pending/current/stale

---

## Schema (16 Fields, Locked)

```sql
folders (
  -- Identity (3)
  path TEXT PRIMARY KEY,
  parent_path TEXT,
  name TEXT NOT NULL,

  -- Governance (2)
  type TEXT,           -- folder | scope | log_root | log_year | log_month
  status TEXT,         -- pending | current | stale

  -- AI Content (2)
  description TEXT,    -- quick orientation ("the map")
  content_md TEXT,     -- deeper understanding ("the context")

  -- Scope (3)
  is_scope BOOLEAN,
  parent_scope_path TEXT,
  scope_boot TEXT,

  -- Mechanical (2)
  source_hash TEXT,
  last_scanned_at INTEGER,

  -- AI Attribution (2)
  ai_model TEXT,
  ai_updated INTEGER,

  -- Timestamps (2)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
)
```

---

## Current State

- **65 folders** in `.float/float.db`
- **446 files** tracked
- **7 depth levels** (0-7)
- All folders at `status = 'pending'` awaiting Layer 2

---

## Vercel Infrastructure (Locked)

| Component | Choice | Role |
|-----------|--------|------|
| **AI SDK** | Yes | Orchestration, streaming, tool calling |
| **Sandbox** | Yes | Isolated execution for buoys |
| **Provider** | Anthropic (Claude) | Best for context, reasoning |

---

## Key Concepts

| Term | Meaning |
|------|---------|
| **AI Civilization** | Database as structured world with laws (schema), governance (status), provenance (ai_model) |
| **Token Economy** | Maximum value per token, not minimum tokens |
| **Autonomous Scopes** | Folders that are "worlds" — own boot context, own patterns, own buoy teams |
| **Level-Order Traversal** | Process depth-by-depth so parents complete before children |

---

## Buoy Test Plan (10 Tests)

From `2025-12-28-float-buoys-test.md`:

1. Boot existing FloatSystem
2. Sync existing FloatSystem
3. Create file → sync
4. Delete file → sync
5. Create folder → sync
6. Initialize new project
7. Sync right after init
8. Table format preservation (3-column tables preserved)
9. Config file skip (no AI for package.json, tsconfig.json, etc.)
10. Approval decline (verify no changes made)

---

## Session Protocol

From `wip-reconcile.md` — 6 phases:

1. **Inventory** — list all wip-* files
2. **Archive** — move superseded docs to logs/
3. **Update wip-boot.md** — capture session changes + reading list
4. **Cross-reference** — check consistency across wip-* files
5. **Log decisions** — create decision files, update summaries
6. **Verify** — double-check everything

---

## Open Questions

1. **boot.md content** — What does production boot.md contain?
2. **Scope detection** — How does AI/system decide a folder is a scope?
3. **Buoy spawning** — Mechanics of parallel AI generation?
4. **Trigger mechanism** — Webhooks, cron, git hooks, manual?

---

## Files Read (Complete List)

**Buoy Documentation (12 files):**
- docs/maintainer/buoys.md
- .float-wip/_wip/wip-buoys.md
- .float-wip/_wip/wip-vision.md
- artifacts/2025-12-30-filesystem-watcher/buoys.md
- artifacts/archive/2025/12-dec/2025-12-28-float-buoys-context.md
- artifacts/archive/2025/12-dec/2025-12-28-float-buoys-daemon-spec.md
- artifacts/archive/2025/12-dec/2025-12-28-float-buoys-commands-spec.md
- artifacts/archive/2025/12-dec/2025-12-28-float-buoys-test.md
- templates/.float/tools/float-think.md
- templates/.float/tools/float-all.md
- .float-wip/_wip/wip-boot.md
- .float-wip/_wip/wip-generate-spec.md

**Decision Logs (17 files):**
- .float-wip/_wip/wip-logs/2026/01-jan/01-jan.md
- .float-wip/_wip/wip-logs/wip-logs.md
- .float-wip/_wip/wip-logs/2026/2026.md
- 2026-01-02-founding.md
- 2026-01-02-sqlite-understanding.md
- 2026-01-02-no-code-without-requirements.md
- 2026-01-02-nav-structure.md
- 2026-01-02-vercel-infrastructure.md
- 2026-01-02-storage-architecture.md
- 2026-01-03-schema-spec-locked.md
- 2026-01-03-orchestration-decisions.md
- 2026-01-03-generate-spec-complete.md
- 2026-01-03-layer2-implementation.md
- 2026-01-03-phase3-implementation-complete.md
- 2026-01-03-summaries-in-folders.md
- 2026-01-03-context-architecture.md
- .float-wip/_wip/wip-reconcile.md

**Implementation (2 files):**
- src/db/schema.ts
- src/db/generate.ts

---

*Created 2026-01-04 — Exhaustive buoy reconnaissance*
</md>
</fp>
