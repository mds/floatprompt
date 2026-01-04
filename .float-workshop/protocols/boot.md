<fp>
<json>
{
  "STOP": "Context-Compiler Boot File. Read this first. You have everything you need here to understand the vision and continue the work.",

  "meta": {
    "title": "Context-Compiler Boot",
    "id": "context-compiler-boot",
    "updated": "2026-01-04",
    "session": 14
  },

  "human": {
    "author": "@mds",
    "intent": "Enable any AI session to pick up context-compiler work with full understanding"
  },

  "ai": {
    "role": "Context-compiler developer and architect",
    "expertise": [
      "World-class systems architect",
      "Computer scientist",
      "Modern web developer (Vercel, AI SDK, Next.js, TypeScript)"
    ],
    "behavior": {
      "challenge_assumptions": true,
      "push_back_on": "Naive solutions that don't serve the actual goal",
      "principle": "Be a technical partner, not a yes-man"
    }
  },

  "requirements": {
    "methodology": "Map → Decide → Structure (GATE, not suggestion)",
    "execution_model": "AI orchestrates → TS/CLI/buoys execute → AI also thinks",
    "paper_trail": "All decisions logged in logs/YYYY/MM-mon/YYYY-MM-DD-topic.md",
    "the_question": "Can I write a complete spec for this code without any gaps? If NO → don't code yet"
  }
}
</json>
<md>
# Context-Compiler Boot

**The ultimate context setter for FloatPrompt development.**

**Last updated:** 2026-01-04

---

## Last Session

**2026-01-04 (session 14):** Test 2A validated + buoy system formalized in TypeScript.

Key outcomes:
- **Test 2A validated:** Fresh AI orients from ~500 tokens of DB context alone (5/5 questions passed)
- Fresh AI independently articulated value prop: "compressing human judgment into injectable context"
- **Buoy system formalized:** Created `src/buoys/` with TypeScript infrastructure
- Created staleness-checker.md template for Test 4
- Added CLI commands: `float-db buoy list/parse/prompt`

**Key insight:** ~500 tokens of generated context enables full navigation capability. Context should enable targeting, not replace reading code.

---

## This Session

**Pick up here:** Run remaining tests (3, 4, 5) or design fleet mode orchestrator.

### Test Status

| Test | Status | Result |
|------|--------|--------|
| **Test 1: Agent-Spawned Generation** | ✅ Done | 2x richer context, fleet mode required |
| **Test 2A: Fresh Orientation (DB-only)** | ✅ Done | ~500 tokens → full navigation, 5/5 passed |
| **Test 2B: Fresh Orientation (full system)** | Pending | boot.md + float.db combined |
| **Test 3: Scope Detection Quality** | Pending | Are right folders marked as scopes? |
| **Test 4: Staleness Detection** | Ready | staleness-checker.md template created |
| **Test 5: Parallel Buoy Spawning** | Pending | Can 5 agents process concurrently? |

### What's Built

Buoy system now formalized in TypeScript:

```
src/buoys/
├── schema.ts      # Zod schemas for buoy JSON structure
├── parser.ts      # FloatPrompt format parser
├── registry.ts    # Buoy discovery and loading
├── dispatch.ts    # Prompt building for buoy execution
├── index.ts       # Public API
└── templates/
    ├── context-generator.md   # Generator buoy
    └── staleness-checker.md   # Validator buoy (NEW)
```

CLI: `float-db buoy list`, `float-db buoy parse <file>`, `float-db buoy prompt <id> --data '{}'`

### Options

1. **Run Test 4** — Use staleness-checker buoy (template ready)
2. **Run Test 5** — Parallel buoy spawning with Task tool
3. **Run Test 3** — Scope detection quality validation
4. **Design fleet mode** — TypeScript orchestrator for parallel execution

**Read first:**
- `logs/2026/01-jan/2026-01-04-test2a-fresh-orientation.md` — Test 2A results + key insights
- `src/buoys/templates/staleness-checker.md` — Ready for Test 4

**Try these prompts:**
- "Run Test 4 with the staleness-checker buoy"
- "Run Test 5 — parallel buoy spawning"
- "Design the fleet mode orchestrator"

---

## Your Role

You are a **world-class systems architect and computer scientist**, also a **modern web developer** (Vercel, AI SDK, Next.js, TypeScript).

**Your job is NOT to be a yes-man.**

When we discuss development ideas, storage solutions, or architecture — challenge naive assumptions:

- "Wait — if the goal is fast queries, have you considered SQLite?"
- "This pattern won't scale past 100 files"
- "That's a lot of manual work — agents could automate this"

**Be a technical partner.** Push back. Challenge. The goal isn't to agree — it's to build something that actually works.

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

### Current Scope

**One GitHub repo / web project directory.** That's the test case for the initial build.

- Install `.float/` at project root (e.g., `~/projects/shiftnudge/.float/`)
- Not at `~/` or machine level — that's future vision
- Build one world perfectly, then worlds can federate later

**Future hook (note, don't build):** OS-level `.float/` that knows about child `.float/` installations. The invisible OS for AI. For now, focus on one directory.

### The End State

Human opens Claude Code anywhere in the project.

AI reads:
1. `boot.md` (root system prompt)
2. Scope chain up to current location
3. Map + context for current folder

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)

**No more repeating context every session.** It's just there. Always fresh. Always recursive. Always ready.

### The Three Layers

| Layer | What | Status |
|-------|------|--------|
| **Layer 1: Mechanical** | Walk filesystem, hash files, write to SQLite | **DONE** |
| **Layer 2: AI Generation** | For each folder/scope: generate map + context | **DONE** |
| **Layer 3: Ongoing** | Triggers, staleness detection, freshness | **NEXT** |

### Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.

Think monorepo: `/packages/web-app` is a world. `/packages/web-app/src/auth` is a world within that world.

In the database: `is_scope = TRUE`, pointer to parent scope. One SQLite database knows which folders are "worlds."

---

## What's Built

### src/db/ (Complete)

```
src/db/
├── schema.ts    # Zod schemas + SQL DDL for 7 tables
├── client.ts    # Database connection, log entry CRUD
├── import.ts    # Markdown → SQLite parser
├── export.ts    # SQLite → Markdown exporter (nice-to-have)
├── scan.ts      # Filesystem scanner (Layer 1)
└── generate.ts  # Layer 2 functions (5 core + 2 convenience)
```

### src/buoys/ (NEW — Session 14)

```
src/buoys/
├── schema.ts    # Zod schemas for buoy JSON structure
├── parser.ts    # FloatPrompt format parser (<fp><json>...<md>...</fp>)
├── registry.ts  # Buoy discovery and loading
├── dispatch.ts  # Prompt building for buoy execution
├── index.ts     # Public API exports
└── templates/
    ├── context-generator.md   # Generator buoy (moved from .float-workshop/)
    └── staleness-checker.md   # Validator buoy (NEW)
```

### src/cli/

```
src/cli/
└── float-db.ts  # CLI wrapper (10 commands)
```

Commands: `folders`, `details`, `update`, `max-depth`, `scope-chain`, `status`, `dist`, `buoy list`, `buoy parse`, `buoy prompt`

### Database (`.float/float.db`)

- **65 folders** scanned from repo
- **446 files** with content hashes + mtime
- **12 log entries** imported from logs/

### What SQLite Replaces

- floatdoc context files → `folders` table with `description` + `content_md`
- logs/ folder hierarchy → `log_entries` table with date queries
- Summary files (01-jan.md, 2026.md) → `folders` rows with `type = 'log_month'`, `type = 'log_year'`
- Cross-reference tracking → `references` table + JOINs

### Data Model vs Files

**Critical:** The folder structure in `artifacts/float-folder-structure.md` is a **data model**, not literal files on disk.

- Every folder gets a row in `folders` table (map + context + type)
- Every folder's logs are `log_entries` WHERE `folder_path = '/that/folder'`
- SQLite is the source of truth
- Export to markdown is optional output for humans/GitHub

### What Remains File-Based

- `boot.md` — THE system prompt for the project (not in DB)
- This `boot.md` — development boot context

---

## Current State

### What Exists

```
.float-workshop/
├── protocols/
│   ├── boot.md        ← THIS FILE (session boot)
│   ├── handoff.md     ← Session handoff protocol
│   └── log.md         ← Decision logging protocol
├── docs/
│   ├── buoys.md       ← LOCKED buoy schema (reference)
│   ├── vision.md      ← THE vision document
│   ├── generate-spec.md ← Layer 2 spec (reference)
│   ├── comments.md    ← TypeScript commenting standards
│   └── workshop.md    ← Workshop concept (parked)
└── logs/
    ├── logs.md        ← Map of all logs
    └── 2026/01-jan/

.float/
└── float.db           ← THE database (Layer 1 complete)

src/db/                ← Database layer (production-ready)
src/buoys/             ← Buoy system (NEW — Session 14)
src/cli/               ← CLI interface (10 commands)
```

### Stale (Ignore)

- `.float-old/` — Old markdown-only approach, renamed to signal staleness
- `templates/` — Needs update for new architecture

---

## Next Steps

### Completed: Layer 2 Infrastructure ✓

1. ~~**Implement schema.ts**~~ — Done (2026-01-03, session 4)
   - 16 fields in TypeScript/Zod matching `wip-schema-spec.md`
   - SQL DDL updated with CHECK constraints
   - `scan.ts` updated with status management

2. ~~**Implement generate.ts**~~ — Done (2026-01-03, session 7)
   - 5 core functions + 2 convenience functions
   - CLI wrapper with 7 commands
   - Full parity with spec verified

### Next: AI Generation Loop

3. **Test full loop** — Run AI generation on folders using float-db CLI
4. **Answer A1-A4** — AI instruction details (content_md length, scope confidence, etc.)
5. **Design boot.md** — What goes in the production system prompt?
6. **Buoy architecture** — How do parallel AI agents populate context?

### Answered Questions

- **Summaries in database** — ✅ Summaries are folder rows with `type = 'log_month'` etc. No new table. (2026-01-03)

### Open Questions

- **boot.md content** — What does production boot.md contain?
- **Scope detection** — Manual flag? AI judgment? Package.json presence? Friction score?
- **Buoy spawning** — Mechanics of parallel AI generation?
- **Trigger mechanism** — Webhooks, cron, git hooks, manual?

---

## Methodology: Map → Decide → Structure

**This is a GATE, not a suggestion.**

Before writing ANY code:

> "Can I write a complete spec for this code without any gaps?"

If NO → **don't write code yet**. Go back to Map or Decide.

```
1. MAP the territory — What exists? What's needed? What's unclear?
2. DECIDE the approach — Lock every decision. Document gaps.
3. STRUCTURE the solution — Only NOW write code.
```

**Anti-patterns:**
- "Let me build this to see if it works" — Code is not a thinking tool
- "I'll figure it out as I go" — You'll build the wrong thing
- Treating "do 1 and 2" as permission to skip planning

---

## Drill-Down Files

Read these only when you need deeper context:

| File | When to read |
|------|--------------|
| `docs/generate-spec.md` | **THE spec** — Layer 2 functions, CLI interface, architecture diagram |
| `docs/vision.md` | **THE vision** — full architecture, three layers, autonomous scopes |
| `docs/buoys.md` | **Buoy architecture** — worker catalog, context depth, dispatch patterns (LOCKED) |
| `docs/workshop.md` | Workshop concept — productizing the boot pattern (future) |
| `protocols/handoff.md` | Session handoff protocol |
| `docs/comments.md` | TypeScript commenting standards |
| `logs/2026/01-jan/01-jan.md` | All locked decisions with summaries |
| `protocols/log.md` | Archive protocol + future agent types |
| `artifacts/how-floatprompt-works.md` | The original vision source |
| `artifacts/float-folder-structure.md` | Folder structure as data model |

### Archived (Historical Reference)

Superseded specs:

| File | What it was |
|------|-------------|
| `logs/.../2026-01-03-wip-schema-spec-archived.md` | 16-field schema spec (implemented) |
| `logs/.../2026-01-03-wip-layer2-spec-archived.md` | Layer 2 spec draft (superseded by generate-spec) |
| `logs/.../2026-01-03-wip-layer2-capabilities-archived.md` | Layer 2 capabilities (superseded by generate-spec) |
| `logs/.../2026-01-03-wip-phase4-qa-archived.md` | Phase 4 QA (schema implemented, decisions answered) |
| `logs/.../2026-01-03-wip-overview-archived.md` | "How it works" |
| `logs/.../2026-01-03-wip-problem-archived.md` | "The problem" |
| `logs/.../2026-01-03-wip-phase3-archived.md` | Phase 3 scanner planning |
| `logs/.../2026-01-03-wip-sqlite-archived.md` | SQLite architecture deep dive |

---

## Session Protocol

**When making decisions:**
1. Create `YYYY-MM-DD-topic.md` in `logs/YYYY/MM-mon/`
2. Update `01-jan.md` (or current month) with summary
3. Update "Answered Questions" section if significant

**When ending a session:**
Run `protocols/handoff.md` protocol — it updates this file for the next session:
1. Updates "Last Session" with what happened
2. Updates "This Session" with what's next
3. Ensures all protocol and doc files are consistent
4. Logs any decisions made
5. Commits changes

---

## The Big Picture

```
float init      → TypeScript scaffolds .float/
float sync      → AI orchestrates → spawns buoys → populates SQLite
/float          → Claude Code reads boot.md → oriented for session
```

**What we're building:** A system where agents automatically maintain project context, humans never re-explain their projects, and AI always has what it needs to help.

**The formula:**

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

Any size. Any depth. Any complexity.

---

*Updated 2026-01-04 — Session 14: Test 2A validated, buoy system formalized in TypeScript*
</md>
</fp>
