<fp>
<json>
{
  "STOP": "Context-Compiler Boot File. Read this first. You have everything you need here to understand the vision and continue the work.",

  "meta": {
    "title": "Context-Compiler Boot",
    "id": "context-compiler-boot",
    "updated": "2026-01-03"
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
    "paper_trail": "All decisions logged in wip-logs/YYYY/MM-mon/YYYY-MM-DD-topic.md",
    "the_question": "Can I write a complete spec for this code without any gaps? If NO → don't code yet"
  }
}
</json>
<md>
# Context-Compiler Boot

**The ultimate context setter for FloatPrompt development.**

**Last updated:** 2026-01-03

---

## Last Session

**2026-01-03 (session 3):** Locked the folders table schema via Q&A. Created `wip-schema-spec.md` with 16 fields, all with rationale. Added "AI civilization" and "token economy" concepts to vision docs.

Key outcomes:
- Schema spec locked: 16 fields organized by purpose
- Removed 5 over-structured columns (`map_*`, `context_*`)
- Added governance (`status`), attribution (`ai_model`, `ai_updated`)
- Updated `how-floatprompt-works.md`, `float-folder-structure.md`, `wip-vision.md`

---

## This Session

**Pick up here:** Implement `schema.ts` based on locked spec in `wip-schema-spec.md`.

The spec is complete — 16 fields with full rationale. Just translate to TypeScript/Zod:
- Read `wip-schema-spec.md` for the locked field definitions
- Update `src/db/schema.ts` to match
- Run `npm run build` to verify

**Or ask:** "Need deeper context? Want to see any files? Know what we're working on?"

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
| **Layer 2: AI Generation** | For each folder/scope: generate map + context | **NEXT** |
| **Layer 3: Ongoing** | Triggers, staleness detection, freshness | Future |

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
└── scan.ts      # Filesystem scanner (Layer 1)
```

### Database (`.float/float.db`)

- **65 folders** scanned from repo
- **446 files** with content hashes + mtime
- **12 log entries** imported from wip-logs/

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
- This `wip-boot.md` — development boot context

---

## Current State

### What Exists

```
.float-wip/
├── _wip/
│   ├── wip-boot.md        ← THIS FILE (session boot)
│   ├── wip-vision.md      ← THE vision document (read for full context)
│   ├── wip-reconcile.md   ← Session reconciliation protocol
│   ├── wip-comments.md    ← TypeScript commenting standards
│   ├── wip-phase4-qa.md   ← Open questions for Layer 2
│   └── wip-logs/          ← Decision archive
│       └── 2026/01-jan/   ← 22 decision files
│
└── project/               ← Target structure (not yet populated by AI)

.float/
└── float.db               ← THE database (Layer 1 complete)

src/db/                    ← TypeScript implementation (production-ready)
```

### Stale (Ignore)

- `.float-old/` — Old markdown-only approach, renamed to signal staleness
- `templates/` — Needs update for new architecture

---

## Next Steps

### Immediate: Schema Implementation

1. **Implement schema.ts** — Translate locked spec (`wip-schema-spec.md`) to TypeScript/Zod
   - 16 fields organized by purpose (Identity, Governance, AI Content, Scope, Mechanical, Attribution, Timestamps)
   - Remove old `map_*` and `context_*` columns
   - Add `type`, `status`, `description`, `content_md`
   - Add scope fields (`is_scope`, `parent_scope_path`, `scope_boot`)
2. **Design boot.md** — What goes in the production system prompt?

### Then: Layer 2 Implementation

4. **Buoy architecture** — How do parallel AI agents populate context?
5. **Scope detection** — How does system decide a folder is a scope?
6. **Test with real folders** — Populate context for `src/`, `bin/`, etc.

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
| `wip-vision.md` | **THE vision** — full architecture, three layers, autonomous scopes |
| `wip-phase4-qa.md` | QA gaps — Q1 answered, Q2/Q3 open |
| `wip-reconcile.md` | Session reconciliation protocol |
| `wip-comments.md` | TypeScript commenting standards |
| `wip-logs/2026/01-jan/01-jan.md` | All locked decisions with summaries |
| `wip-logs/wip-logs.md` | Archive protocol + future agent types |
| `artifacts/how-floatprompt-works.md` | The original vision source |
| `artifacts/float-folder-structure.md` | Folder structure as data model |

### Archived (Historical Reference)

These were superseded by `wip-vision.md`:

| File | What it was |
|------|-------------|
| `wip-logs/.../2026-01-03-wip-overview-archived.md` | "How it works" |
| `wip-logs/.../2026-01-03-wip-problem-archived.md` | "The problem" |
| `wip-logs/.../2026-01-03-wip-phase3-archived.md` | Phase 3 scanner planning |
| `wip-logs/.../2026-01-03-wip-sqlite-archived.md` | SQLite architecture deep dive |

---

## Session Protocol

**When making decisions:**
1. Create `YYYY-MM-DD-topic.md` in `wip-logs/YYYY/MM-mon/`
2. Update `01-jan.md` (or current month) with summary
3. Update "Answered Questions" section if significant

**When ending a session:**
Run `wip-reconcile.md` protocol — it updates this file for the next session:
1. Updates "Last Session" with what happened
2. Updates "This Session" with what's next
3. Ensures all wip-* files are consistent
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

*Updated 2026-01-03 — Scope clarified (one repo), summaries question resolved, data model vs files clarified*
</md>
</fp>
