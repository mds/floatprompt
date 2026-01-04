<fp>
<json>
{
  "STOP": "The Vision — Omnipresent recursive context scaffolding. What we're building and how the schema supports it.",

  "meta": {
    "title": "The Vision: Recursive Context Scaffolding",
    "id": "vision"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture the full vision and how implementation supports it"
  },

  "ai": {
    "role": "Systems architect — build toward the vision"
  },

  "requirements": {
    "source": "artifacts/how-floatprompt-works.md",
    "methodology": "Map → Decide → Structure"
  }
}
</json>
<md>
# The Vision: Recursive Context Scaffolding

**Date:** 2026-01-03
**Source:** `artifacts/how-floatprompt-works.md`

---

> **📎 Companion Document:** This is the **working spec** — schema details, component status, decision rationale.
> For philosophical grounding (goal hierarchy, methodology, token economy), see [`docs/vision.md`](../../docs/vision.md).
> Both documents describe the same system. This one tells you *what to build*. That one tells you *how to think*.

---

## The Goal

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

## The End State

Human opens Claude Code anywhere in the project.

AI reads (in order):
1. `boot.md` (root system prompt)
2. Scope chain up to current location
3. Map + context for current folder

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)

**No more:**
- "What framework is this?"
- "Can you explain the auth system?"
- Repeating context every session

It's just... there. Always fresh. Always recursive. Always ready.

---

## The Three Layers

### Layer 1: Mechanical (code, instant)

- Walk filesystem, detect structure
- Hash files for change detection
- Write to SQLite
- Runs in milliseconds, no AI needed

**Status:** Done. Scanner built. 65 folders, 446 files in `.float/float.db`.

### Layer 2: AI Generation (buoys, parallel)

- For each folder/scope: generate map (what's here)
- For each folder/scope: generate context (what it means)
- Form hypothesis about relationships, patterns, architecture
- Buoys work in parallel — one per scope if needed

**Status:** Next. Schema ready, need AI generation logic.

### Layer 3: Ongoing (triggers, continuous)

- File watcher, git hook, manual command
- Detect changes, mark scopes as stale
- Re-run AI for affected scopes only
- Context stays fresh without human prompting

**Status:** Future. Foundation must be solid first.

---

## Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.

Think monorepo:
- `/packages/web-app` is a world
- `/packages/web-app/src/auth` is a world within that world
- `/packages/mobile-app` is a different world
- `/infrastructure` is its own world

**What makes a scope:**
- Gets its own boot context
- Gets its own patterns
- Gets its own buoy teams when needed
- Still connected to parent — changes bubble up

**In the database:**
```sql
folders (
  ...
  is_scope BOOLEAN,           -- TRUE if this folder is a world
  parent_scope_path TEXT,     -- pointer to parent scope
  scope_boot TEXT,            -- scope-specific boot context
  ...
)
```

One SQLite database. System knows which folders are "worlds" and treats them specially.

---

## Why This Scales Infinitely

**Mechanical layer** = O(1) hash comparisons, milliseconds
- 10,000 folders? 10,000 rows. SQLite handles billions.

**Scopes** = hierarchical, changes only affect ancestors
- Change in `/auth` doesn't rescan `/mobile-app`
- Staleness bubbles UP, not sideways

**Buoys** = parallel, spawn as needed
- 50 scopes changed? Spawn 50 buoys.
- 1000 folders need context? Spawn 1000 buoys.
- Cloud handles it. That's the point.

Architecture doesn't care if it's 10 folders or 10,000. Same pattern. Same code. Different scale.

---

## Context Evolution

**Initial context** = AI's hypothesis — generated from reading files, best guess about what things mean.

**As human and AI work together**, insights emerge. System can tell when something is novel because it can check against what exists. Novel insights get captured. Context evolves.

```
folders.context_* = current understanding (latest state)
log_entries = paper trail of how we got there
```

Context isn't static. It's a **living record** that gets richer over time.

---

## Every Folder Has Its Own Logs

Not one global `logs/` folder. Every project folder gets:
- Map (AI interpretation of structure)
- Context (what/why/patterns/insights)
- Logs (decision history for that folder)

```
.float/project/
├── _project/
│   ├── project-map.md
│   ├── project-context.md
│   └── project-logs/        ← Project-wide decisions
├── src/
│   ├── src-map.md
│   ├── src-context.md
│   └── src-logs/            ← Decisions about src/
└── bin/
    ├── bin-map.md
    ├── bin-context.md
    └── bin-logs/            ← Decisions about bin/
```

This is `log_entries.folder_path` — scopes decisions to folders.

Log summaries (year/month) are just folders in the `folders` table with their own context.

---

## The Schema (LOCKED 2026-01-03)

> Full spec with rationale: archived in `logs/.../2026-01-03-wip-schema-spec-archived.md`

### Folders table (16 fields)

```sql
folders (
  -- Identity (3)
  path TEXT PRIMARY KEY,         -- '/src/auth'
  parent_path TEXT,              -- '/src' (NULL for root)
  name TEXT NOT NULL,            -- 'auth'

  -- Governance (2)
  type TEXT,                     -- folder | scope | log_root | log_year | log_month
  status TEXT,                   -- pending | current | stale

  -- AI Content (2)
  description TEXT,              -- quick orientation ("the map")
  content_md TEXT,               -- deeper understanding ("the context")

  -- Autonomous scopes (3)
  is_scope BOOLEAN,              -- TRUE if this is a "world"
  parent_scope_path TEXT,        -- pointer to parent scope
  scope_boot TEXT,               -- scope-specific boot context

  -- Mechanical (2)
  source_hash TEXT,              -- SHA-256 of children (change detection)
  last_scanned_at INTEGER,       -- Unix timestamp

  -- AI Attribution (2)
  ai_model TEXT,                 -- 'claude-sonnet-4' (provenance)
  ai_updated INTEGER,            -- when AI last wrote

  -- Timestamps (2)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

**Removed from original design:**
- `title` → redundant with first line of `description`
- `map_summary` → renamed to `description`
- `map_children` → replaced by SQLite query
- `context_what`, `context_why`, `context_patterns` → replaced by `content_md`

### Log entries table

```sql
log_entries (
  id INTEGER PRIMARY KEY,
  folder_path TEXT NOT NULL,     -- which folder this decision is about
  date TEXT NOT NULL,
  topic TEXT NOT NULL,
  status TEXT NOT NULL,          -- locked, open, superseded

  title TEXT NOT NULL,
  decision TEXT,
  rationale TEXT,

  files_changed TEXT,            -- JSON array

  created_at INTEGER NOT NULL
);
```

### Files table

```sql
files (
  path TEXT PRIMARY KEY,
  folder_path TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,
  last_scanned_at INTEGER NOT NULL
);
```

---

## boot.md: The System Prompt

`boot.md` stays as a file. It's THE system prompt for the project.

- Read first, sets up everything
- Tells AI how to use the database
- Tells AI how to traverse scopes
- Tells AI how the whole system works

Like `protocols/boot.md` tells each session how everything works.

Everything else lives in SQLite.

---

## The Formula

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

---

## Current State

| Layer | Status |
|-------|--------|
| Layer 1: Mechanical | **Done** — scanner, folders, files in DB |
| Layer 2: AI Generation | **Next** — buoys populate context |
| Layer 3: Ongoing | **Future** — triggers, freshness |

| Component | Status |
|-----------|--------|
| `src/db/schema.ts` | Needs revision for scope fields |
| `src/db/scan.ts` | Done |
| `src/db/client.ts` | Done |
| `src/db/import.ts` | Done (log entries) |
| `src/db/export.ts` | Nice-to-have, not critical |
| `boot.md` | Needs design |
| AI generation | Needs design |

---

## Decisions Locked

| Decision | Rationale |
|----------|-----------|
| SQLite is the source of truth | Queryable, fast, relationships built-in |
| boot.md stays as file | System prompt, tells AI how to use DB |
| Every folder has its own logs | `folder_path` scopes log_entries |
| Summaries in `folders` table | Log paths are just folders with content |
| Autonomous scopes via `is_scope` flag | No extra folders, just a flag + pointer |
| Staleness bubbles UP | Scope hierarchy, not sideways |
| Buoys for parallel AI work | Never do alone what 1000 buoys can do together |
| `description` = AI interpretation | What structure MEANS, not what EXISTS |
| `content_md` = flexible prose | Any insights fit here, evolves over time |

---

## Open Questions

1. **boot.md design** — What goes in the production boot.md?
2. **Scope detection** — How does AI/system decide a folder is a scope?
3. **Buoy spawning** — Mechanics of parallel AI generation?
4. **Trigger mechanism** — Webhooks, cron, git hooks, manual?

---

## Next Steps

1. Revise `src/db/schema.ts` — add scope fields, align with vision
2. Design boot.md structure
3. Design Layer 2 AI generation (buoy architecture)
4. Test scope chain traversal

---

*Created 2026-01-03 — The vision that drives everything*
</md>
</fp>
