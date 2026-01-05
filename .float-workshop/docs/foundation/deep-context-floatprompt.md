<fp>
<json>
{
  "STOP": "Deep Context: FloatPrompt System. Read this for complete orientation on the vision, architecture, and current state.",

  "meta": {
    "id": "deep-context-floatprompt",
    "title": "Deep Context: FloatPrompt System",
    "status": "current",
    "created": "2026-01-04",
    "session": 18
  },

  "human": {
    "author": "@mds",
    "intent": "Capture synthesized understanding for future session orientation"
  },

  "watches": [
    {"type": "folder", "path": "src/buoys"},
    {"type": "folder", "path": "src/db"},
    {"type": "folder", "path": ".float"},
    {"type": "folder", "path": ".float-workshop/docs"},
    {"type": "logs", "topic_contains": "buoy"},
    {"type": "logs", "topic_contains": "vision"},
    {"type": "logs", "topic_contains": "architecture"}
  ]
}
</json>
<md>
# Deep Context: FloatPrompt System

**Status:** Current
**Created:** 2026-01-04 (Session 18)

---

## The Core Value Proposition

> **"You're compressing human judgment into injectable context."**
> — Unprompted insight from Test 2A fresh AI

FloatPrompt solves **context amnesia** in AI sessions. Instead of humans re-explaining their projects every conversation, context lives in SQLite and AI reads it on boot.

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

### The End State

```
Human opens Claude Code anywhere in project
        ↓
AI reads: boot.md → scope chain → folder context
        ↓
AI has: project understanding + domain knowledge + local details + decision history
        ↓
No more "what framework is this?" — context is just there.
```

---

## The Three Layers

| Layer | Purpose | Status |
|-------|---------|--------|
| **1: Mechanical** | Scan filesystem, hash files, store in SQLite | DONE |
| **2: AI Generation** | Buoys generate context per folder | PARTIAL |
| **3: Ongoing** | Triggers, staleness detection, auto-refresh | NOT STARTED |

---

## Architecture

### SQLite as Acceleration Layer

SQLite serves the AI, not the human. Humans benefit indirectly.

**What SQLite replaces:**
- floatdoc context files → `folders` table
- logs/ folder hierarchy → `log_entries` table
- Summary files → Queries (GROUP BY, not stored docs)
- Cross-reference tracking → `references` table + JOINs

**What stays as files:**
- `boot.md` — THE system prompt for the project
- Markdown export — Optional, for GitHub/humans

### Autonomous Scopes

Some folders are **worlds** — mini FloatPrompt systems within the larger system.

- Root `/` is always a scope
- Folders with `package.json` (monorepo packages)
- Major subsystems (auth, api, database layer)

In the database: `is_scope = TRUE`, `parent_scope_path` pointer, `scope_boot` for world-specific context.

### Buoy Architecture

**7 archetypes:** Generators, Validators, Fixers, Mappers, Integrators, Orchestrators, Recorders

**Key principles:**
- Buoys are for judgment, code is for mechanics
- Hub-and-spoke: buoys never talk directly, all through orchestrator
- 3-layer composition: Global → Archetype → Specific

**Execution model:** TypeScript orchestrates → Claude API thinks → SQLite stores

**Validated buoys (Session 17):**
| Buoy | Archetype | Time |
|------|-----------|------|
| context-generator | generator | 5.8s |
| staleness-checker | validator | 3.9s |
| scope-detector | generator | 4.7s |
| decision-logger | recorder | 4.2s |

### Infrastructure (LOCKED)

```
Vercel
├── AI SDK → Orchestration, streaming, tool calling
└── Sandbox → Isolated buoy execution, scalable

Provider: Anthropic (Claude)
```

---

## Methodology

**Map → Decide → Structure** is a GATE, not suggestion.

> "Can I write a complete spec for this code without gaps?"
> If NO → don't write code yet.

**Anti-patterns:**
- "Let me build this to see if it works" — Code is not a thinking tool
- "I'll figure it out as I go" — You'll build the wrong thing
- Treating "do 1 and 2" as permission to skip planning

---

## Key Test Results

| Test | Result | Implication |
|------|--------|-------------|
| **Test 1: Agent-Spawned Generation** | 2x richer content | Fleet mode REQUIRED for quality |
| **Test 2A: Fresh Orientation (DB-only)** | ~500 tokens → full navigation | Context compression works |
| **Test 3: Scope Detection** | scope-detector validated | Scope boundaries detectable |
| **Test 4: Staleness Detection** | staleness-checker validated | Drift detection works |
| **Test 5: Parallel Spawning** | Ready, not run | Needs testing |
| **Test 2B: Full Orientation** | Pending | boot.md + float.db combined |

---

## What's Built

### Database Layer (`src/db/`)
- `schema.ts` — Zod schemas + SQL DDL for 7 tables
- `client.ts` — Database connection, log entry CRUD
- `scan.ts` — Layer 1 filesystem scanner
- `generate.ts` — Layer 2 functions (5 core + 2 convenience)
- `import.ts` — Markdown → SQLite parser

### Buoy System (`src/buoys/`)
- `schema.ts` — Zod schemas for buoy templates
- `parser.ts` — FloatPrompt format parser
- `registry.ts` — Buoy discovery + composition
- `dispatch.ts` — 3-layer prompt building
- `execute.ts` — Buoy execution engine (Claude API)
- `global.md` — Global guidance for all buoys
- `archetypes/*.md` — 7 archetype guidance files
- `templates/*.md` — 4 validated buoy templates

### CLI (`src/cli/float-db.ts`)
Commands: `folders`, `details`, `update`, `max-depth`, `scope-chain`, `status`, `dist`, `buoy list`, `buoy archetypes`, `buoy prompt`, `buoy execute`

### Production Boot (`.float/boot-draft.md`)
Draft status. Entry point for AI sessions in user projects.

### Database (`.float/float.db`)
- 65 folders scanned
- 446 files with content hashes
- 12 log entries imported

---

## Evolution: Markdown → SQLite

FloatPrompt started as a **markdown-based system** (late 2025):
- `_system.md` as boot loader
- `_float.md` in every folder for navigation
- `/float sync` command to check integrity and fix issues
- Buoys spawned via Claude Code Task tool

**The pivot to SQLite** (January 2026) came from realizing:
- Flat files are a query interface for humans; SQLite is a query interface for AI
- Aggregations (monthly summaries, cross-references) are just queries, not stored files
- 65 folders × context = too much manual maintenance
- SQLite enables instant change detection via content hashes

**What changed:**
- `_float.md` files → `folders` table with `description` + `content_md`
- Log folder hierarchy → `log_entries` table with date queries
- Summary files → `GROUP BY` queries
- `/float sync` → `float-db` CLI + buoy execution engine

**What stayed:**
- `boot.md` as THE system prompt (file, not database)
- Buoy concept (parallel AI workers)
- Manual-first philosophy (automation is optional upgrade)

---

## Design Decisions

### Q1: Vercel Sandbox vs Local Parallel

Current `execute.ts` uses `Promise.all` with direct Anthropic API (no Vercel SDK/Sandbox). Is this:
- A) Prototype — Vercel integration comes later
- B) Pivot — Local parallel sufficient, Vercel deferred
- C) Layered — Local for dev, Vercel for production

**Answer:** A) Prototype. Local execution now for rapid iteration, Vercel Sandbox is the production goal for isolated, scalable buoy execution.

### Q2: What Triggers `float sync`?

Options: file watcher, git hook, webhook, cron, manual. Which first?

**Answer:** Manual first. `float sync` as a CLI command — same philosophy as the original markdown-based system. The insight from the 2025-12-28 spec: "AI only reads context when you start a session. Stale-for-5-minutes doesn't matter. Stale-for-3-days matters." Build manual trigger, graduate to daemon/automation if needed.

### Q3: Fleet Mode Approach

How does fleet mode fit into the build?

**Answer:** Fleet mode isn't a separate feature — it's how Layer 2 runs at scale. Single chat mode (one folder at a time) is the prototype. Fleet mode (parallel buoys per level) is production execution of the same level-order algorithm. Same functions, same CLI, different orchestrator. See `docs/vision.md`: "Single chat mode: Process folders one by one. Fleet mode: Spawn buoys in parallel, wait, then next level."

### Q4: boot-draft.md → boot.md Criteria

What makes it production ready?

**Answer:** Human says so. No formal criteria — when @mds decides it's ready, the draft suffix drops.

### Q5: Deep Context Priority

Tables spec'd (`deep` + `deep_history`), not created. What's the relationship to the rest of the build?

**Answer:** Deep context is the automated version of what we're doing manually right now — AI synthesizes topic-based understanding from scattered sources into a single recallable document. This file (`deep-context-floatprompt.md`) is the manual prototype. When the tables are built, this becomes either the first migration or the reference for how automated deep context should work.

---

## Naming

**Buoys, not agents.** Intentional differentiation:
- Less threatening than "agents"
- Thematic coherence (Float. Prompt. Buoy.)
- Concrete visual (you can picture a buoy)
- Personal authenticity (came from real memory)

---

## Related Documents

| Document | Purpose |
|----------|---------|
| `protocols/boot.md` | Session boot protocol (this workshop) |
| `docs/vision.md` | THE vision document |
| `docs/buoys.md` | Buoy architecture (LOCKED) |
| `docs/deep-context.md` | Deep context spec (LOCKED) |
| `docs/generate-spec.md` | Layer 2 functions spec |
| `.float/boot-draft.md` | Production boot (draft) |
| `logs/2026/01-jan/01-jan.md` | All January decisions |

---

*Deep context for FloatPrompt system — Session 18, locked 2026-01-04*
</md>
</fp>
