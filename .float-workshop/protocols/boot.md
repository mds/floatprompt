<fp>
<json>
{
  "STOP": "Context-Compiler Boot File. Read this first. You have everything you need here to understand the vision and continue the work.",

  "meta": {
    "title": "Context-Compiler Boot",
    "id": "context-compiler-boot",
    "updated": "2026-01-05",
    "session": 24
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

**Last updated:** 2026-01-05

---

## Last Session

**2026-01-05 (session 23):** Deep orientation + plugin architecture exploration.

Key outcomes:
- **Database status clarified** — All 65 folders have `description` and `content_md` populated (ran on 2026-01-04). Boot.md was stale.
- **Database gap found** — Scan from Jan 3rd is missing 39 folders (104 exist, 65 scanned). `src/buoys/`, `.float-workshop/` not indexed.
- **Plugin research** — Studied 13 official Claude Code plugins. Ralph Wiggum (iteration loops), plugin-dev (7 skills), feature-dev (7-phase workflow).
- **Architecture exploration** — Old `/float-*` commands map directly to plugin structure. FloatPrompt was built with Claude Code's command pattern in mind.
- **New doc created** — `docs/plugin-architecture.md` — Exploring FloatPrompt as Claude Code plugin.

**Key insight:** FloatPrompt's architecture (slash commands, buoy teams, tool capability maps) maps naturally to Claude Code's plugin structure. Plugin-first could be fastest path to market.

**Corrected:** Database is NOT empty — 65 folders have AI-generated context. The gap is the scan is outdated (missing src/buoys/, .float-workshop/).

---

## Possible Directions

**Decision made Session 23:** Go plugin-first. Old `/float-*` commands already worked. TypeScript + SQLite is the speed layer. Plugin is distribution.

### Priority: Build Plugin

1. Create `.claude-plugin/plugin.json` manifest
2. Create `commands/status.md` → calls `float-db status`
3. Test with `claude --plugin-dir ./floatprompt`
4. Add more commands: `details.md`, `sync.md`, `generate.md`

**Read first:**
- `docs/plugin-architecture.md` — Structure and mapping
- `artifacts/claude-code-plugins/create-plugins.md` — Official tutorial

### Also Needed

- **Re-scan database** — 39 folders missing (src/buoys/, .float-workshop/)
- **Schema cleanup** — Rename `content_md` → `context` (decided Session 12)

### Tabled

- **`float build`** — Static export, not needed for plugin
- **Layer 3** — 4 open questions, design incomplete
- **Vercel SDK** — Plugin-first is faster path

### Test Status

| Test | Status | Result |
|------|--------|--------|
| **Test 1: Agent-Spawned Generation** | ✅ Done | 2x richer context, fleet mode required |
| **Test 2A: Fresh Orientation (DB-only)** | ✅ Done | ~500 tokens → full navigation, 5/5 passed |
| **Test 2B: Fresh Orientation (full system)** | ✅ Done | boot.md + float.db combined, 7/7 passed, "70-80% for productive work" |
| **Test 3: Scope Detection Quality** | ✅ Done | scope-detector buoy validated (Session 17) |
| **Test 4: Staleness Detection** | ✅ Done | staleness-checker buoy validated (Session 17) |
| **Test 5: Parallel Buoy Spawning** | ✅ Partial | Mechanism validated (5.29x), API blocked by sandbox |

**Read first:** (if relevant to chosen direction)
- `docs/vision.md` — THE vision document
- `docs/buoys.md` — LOCKED buoy schema and architecture
- `logs/2026/01-jan/2026-01-04-layer2-buoy-spec.md` — Buoy prioritization and next steps

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
| **Layer 2: AI Generation** | For each folder/scope: generate map + context | **DONE for scanned folders, RESCAN NEEDED** |
| **Layer 3: Ongoing** | Triggers, staleness detection, freshness | **TABLED** (4 open questions) |

**Note:** Layer 2 infrastructure (buoys, execute.ts, CLI) is complete and validated. All 65 scanned folders have AI-generated `description` and `content_md`. However, the scan is outdated — 39 folders added since Jan 3rd (including `src/buoys/`, `.float-workshop/`) are not in the database.

### Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.

Think monorepo: `/packages/web-app` is a world. `/packages/web-app/src/auth` is a world within that world.

In the database: `is_scope = TRUE`, pointer to parent scope. One SQLite database knows which folders are "worlds."

---

## What's Built

### src/db/ (Complete)

```
src/db/
├── schema.ts      # Zod schemas + SQL DDL for 7 tables
├── deep-schema.ts # Deep context schemas + DDL (Session 20)
├── client.ts      # Database connection, CRUD (log entries + deep context)
├── import.ts      # Markdown → SQLite parser
├── export.ts      # SQLite → Markdown exporter (nice-to-have)
├── scan.ts        # Filesystem scanner (Layer 1)
└── generate.ts    # Layer 2 functions (5 core + 2 convenience)
```

### src/buoys/ (Session 14-16)

```
src/buoys/
├── schema.ts      # Zod schemas + GlobalGuidance, ArchetypeGuidance, ComposedBuoy
├── parser.ts      # FloatPrompt format parser (<fp><json>...<md>...</fp>)
├── registry.ts    # Buoy discovery + getGlobal(), getArchetype(), getComposed()
├── dispatch.ts    # 3-layer composition in buildSystemPrompt()
├── execute.ts     # Buoy execution engine (NEW — Session 16)
├── index.ts       # Public API exports
├── global.md      # What ALL buoys share
├── archetypes/
│   ├── generator.md    # Reading strategy, content quality, depth
│   ├── validator.md    # Confidence framework, evidence, thresholds
│   ├── fixer.md        # Repair philosophy, validation, conflicts
│   ├── mapper.md       # Relationship types, strength, cascade
│   ├── integrator.md   # External APIs, timeout/retry, security
│   ├── orchestrator.md # Hub-and-spoke, nested hierarchy, AI vs code
│   └── recorder.md     # Timestamps, format, retention, privacy
└── templates/
    ├── context-generator.md   # Generator buoy
    ├── staleness-checker.md   # Validator buoy
    ├── scope-detector.md      # Generator buoy (NEW — Session 16)
    └── decision-logger.md     # Recorder buoy (NEW — Session 16)
```

CLI: `float-db buoy list`, `buoy archetypes`, `buoy prompt <id> --composed`

### .float/ (Session 16)

```
.float/
├── float.db       # THE database (Layer 1 complete)
└── boot-draft.md  # Production boot (NEW — draft, will become boot.md)
```

### src/cli/

```
src/cli/
└── float-db.ts  # CLI wrapper (18+ commands)
```

Commands:
- **Folders:** `folders`, `details`, `update`, `max-depth`, `scope-chain`, `status`, `dist`
- **Buoys:** `buoy list`, `buoy archetypes`, `buoy prompt`, `buoy execute`, `buoy batch`
- **Deep context:** `deep list`, `deep show`, `deep create`, `deep update`, `deep stale`, `deep delete`, `deep history`, `deep version`

### Database (`.float/float.db`)

- **65 folders** scanned from repo
- **446 files** with content hashes + mtime
- **12 log entries** imported from logs/
- **1 deep context** imported (floatprompt system orientation)

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
│   ├── deep-context.md ← LOCKED deep context spec (topic-based context)
│   ├── comments.md    ← TypeScript commenting standards
│   └── workshop.md    ← Workshop concept (parked)
└── logs/
    ├── logs.md        ← Map of all logs
    └── 2026/01-jan/

.float/
├── float.db           ← THE database (Layer 1 complete)
└── boot-draft.md      ← Production boot (NEW — Session 16)

src/db/                ← Database layer (production-ready)
src/buoys/             ← Buoy system (Session 14-16, 4 templates)
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
| `docs/plugin-architecture.md` | **Plugin exploration** — FloatPrompt as Claude Code plugin (Session 23, EXPLORING) |
| `docs/deep-context-floatprompt.md` | **DEEP ORIENTATION** — Synthesized understanding of entire system (Session 19) |
| `docs/wip-float-build-spec.md` | **float build spec** — Static context generation MVP (DRAFT, TABLED) |
| `docs/float-CMS-context-management-system.md` | **CMS architecture** — static context build system (Layer 2.5) |
| `docs/wip-layer-3-ongoing.md` | **Layer 3 vision** — background buoys, snapshot boots, continuous synthesis (TABLED) |
| `docs/generate-spec.md` | **THE spec** — Layer 2 functions, CLI interface, architecture diagram |
| `docs/vision.md` | **THE vision** — full architecture, three layers, autonomous scopes |
| `docs/buoys.md` | **Buoy architecture** — worker catalog, context depth, dispatch patterns (LOCKED) |
| `docs/deep-context.md` | **Deep context spec** — topic-based context, watches, version history (LOCKED) |
| `docs/vercel-sdk-integration-spec.md` | **Vercel integration** — AI SDK, Sandbox, MCP migration path (TABLED - plugin-first may be faster) |
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

*Updated 2026-01-05 — Session 23: Deep orientation, plugin architecture exploration, database state corrected*
</md>
</fp>
