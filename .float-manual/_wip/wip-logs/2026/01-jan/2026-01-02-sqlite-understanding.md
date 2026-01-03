# SQLite Full Understanding

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

SQLite is the acceleration layer for FloatPrompt's recursive context scaffolding. This document captures the full understanding developed through extensive conversation about architecture, purpose, and implementation.

---

## The Core Insight

**The value proposition is NOT "humans can read markdown files."**

**The value proposition IS "AI has complete context across your entire project."**

SQLite serves the AI, not the human. Humans benefit indirectly through AI having perfect context.

---

## What SQLite Replaces

| Old Approach | SQLite Replacement |
|--------------|-------------------|
| floatdoc context files (YAML frontmatter) | `folders` table with map_* and context_* columns |
| logs/ folder hierarchy (2026/01-jan/) | `log_entries` table with date fields + queries |
| Index files (01-jan.md, 2026.md, wip-logs.md) | Queries — aggregations, not stored documents |
| Self-describing filenames (project-map.md) | Path is a field, not a filename convention |
| `_project/` folder convention | Root is just `path = '/'` |
| Cross-reference tracking (grep across files) | `references` table + JOINs |
| Mirror structure (.float/project/src/) | `folder_path` field links context to source |

**Key realization:** The flat file structure was a query interface for humans. SQLite IS the query interface.

---

## What SQLite Does NOT Replace

| Still Needed | Why |
|--------------|-----|
| **boot.md** | THE system prompt for the project — AI reads this first |
| **AI judgment** | AI still generates summaries, context, decisions |
| **Markdown export** | For GitHub readability, sharing, human inspection |

---

## The Two Kinds of "Summary"

1. **Original summaries (AI judgment)**
   - "What does /src mean?"
   - "What patterns are used here?"
   - "Why was this decision made?"
   - **Still needed** — AI writes these, stores in SQLite

2. **Aggregation summaries (mechanical)**
   - "List all January decisions"
   - "Show locked decisions"
   - "What themes emerged this year?"
   - **Eliminated** — these become queries

---

## Schema Design Principles

### Model the Domain, Not Files

The database should model:
- **Folders** — the things being described
- **Log entries** — the paper trail
- **References** — cross-links for staleness
- **Files** — source files being tracked (for change detection)

NOT:
- Folder hierarchies (that's what `parent_path` is for)
- Index files (that's what GROUP BY is for)
- Naming conventions (path is just a field)

### AI-Generated Content is First-Class

The schema must capture that AI writes this content:

```sql
folder_context (
  path TEXT PRIMARY KEY,

  -- AI-GENERATED (judgment, compression)
  map_summary TEXT,              -- "Contains React components for..."
  map_children JSON,             -- [{name, type, ai_description}]
  context_what TEXT,             -- "This is the authentication layer"
  context_why TEXT,              -- "Separated for security isolation"
  context_patterns JSON,         -- ["repository pattern", "DI"]

  -- MECHANICAL (computed)
  source_hash TEXT,              -- Hash of source folder contents
  last_scanned_at INTEGER,       -- When AI last read source
  stale BOOLEAN                  -- Hash changed since last scan
)
```

### Aggregations Are Queries

```sql
-- What 01-jan.md does manually:
SELECT date, title, status FROM log_entries
WHERE date LIKE '2026-01%' ORDER BY date;

-- What 2026.md does manually:
SELECT strftime('%m', date) as month, COUNT(*) as decisions
FROM log_entries WHERE date LIKE '2026%' GROUP BY month;

-- Open questions:
SELECT * FROM open_questions WHERE resolved_at IS NULL;
```

---

## boot.md = System Prompt for Project

**Critical realization:** boot.md is not just orientation — it IS the FloatOS.

Like a system prompt:
- Read once at session start
- Sets AI behavior for the entire project
- Defines capabilities and constraints
- Single source of truth for "how this works"

```
Human opens session
        ↓
AI reads boot.md (system prompt for project)
        ↓
AI now knows:
├── SQLite exists → query for context
├── TypeScript functions exist → call for mechanical work
├── Buoys available → spawn for parallel AI work
└── How to think about this project
        ↓
AI is "powered on" — ready to help with full context
```

---

## float-os.md Relationship

**float-os.md is a MODEL, not the rules.**

- It's the v1 prototype of what a floatprompt can do
- The methodology (Map → Decide → Structure) is good practice for understanding
- But agents operating within an already-mapped system don't need to re-map every time
- They just execute their specific tasks

---

## floatdoc is Probably Obsolete

The floatdoc schema was designed for:
- "Token-light, good contextual AI docs"
- YAML frontmatter + markdown
- Lightweight terrain awareness

SQLite covers this:
- Fields store the same data (title, type, status, description)
- Queries provide the same routing signals
- No parsing overhead

**Possible remaining use:** Lightweight markdown files as AI "hooks" in folders? Or fully replaced by SQLite?

---

## The Data Flow

```
Original content (code, docs, files)
         ↓
   AI READS (consumes tokens once)
         ↓
   AI GENERATES (judgment, compression)
   ├── map: "what's here"
   ├── context: "what it means"
   └── logs: "what changed, why"
         ↓
   STORED IN SQLITE
         ↓
   FUTURE AI READS METADATA (minimal tokens)
         ↓
   Drills into original only when needed
```

**The generation step is still AI judgment. SQLite changes WHERE it's stored, not WHETHER it's needed.**

---

## Trigger Model

When do agents wake up to update context?

**Options (all valid, configurable):**
- File watcher (local development)
- Git hook (on commit)
- Webhook (from GitHub)
- Timer/cron (periodic scan)
- Manual (`float sync` command)
- Threshold (X files changed)

**The ideal:** Any file change triggers background agents that keep context fresh. Hundreds of coordinated agents if needed.

**Change detection:** Content hash comparison in SQLite. If `source_hash` changed since `last_scanned_at`, context is stale.

---

## The Two Modes

| Mode | Actor | Method | Output |
|------|-------|--------|--------|
| **Manual/Conversational** | Human + AI | Map → Decide → Structure dialogue | Floatprompt files |
| **Automated/Agent** | Cloud agents | Scan → Generate → Store | SQLite rows |

Both still need AI judgment. The automated system uses the same methodology — it just runs without human prompting.

---

## Proposed Schema

```sql
-- The things being described (folders in any project)
folders (
  path TEXT PRIMARY KEY,        -- '/', '/src', '/src/auth'
  parent_path TEXT,             -- For hierarchy queries
  name TEXT,                    -- 'src', 'auth'

  -- Map (WHERE - structure) — AI-generated
  map_summary TEXT,
  map_children JSON,            -- [{name, type, description}]

  -- Context (WHAT - understanding) — AI-generated
  context_what TEXT,
  context_why TEXT,
  context_patterns JSON,

  -- Staleness detection
  source_hash TEXT,
  last_scanned_at INTEGER,

  updated_at INTEGER
)

-- The paper trail (WHEN/WHY - history)
log_entries (
  id INTEGER PRIMARY KEY,
  folder_path TEXT,             -- Which folder (or '/' for system-wide)
  date TEXT,                    -- '2026-01-02'
  topic TEXT,                   -- 'nav-structure'
  status TEXT,                  -- 'locked', 'open', 'superseded'

  -- AI-generated content
  title TEXT,
  decision TEXT,
  rationale TEXT,
  before_state TEXT,
  after_state TEXT,

  -- Metadata
  files_changed JSON,
  future_agent TEXT,

  -- Relations
  supersedes INTEGER,
  superseded_by INTEGER,

  created_at INTEGER
)

-- Source files being tracked (for change detection)
files (
  path TEXT PRIMARY KEY,
  folder_path TEXT,
  content_hash TEXT,
  last_scanned_at INTEGER
)

-- Cross-references (for staleness detection)
references (
  id INTEGER PRIMARY KEY,
  source_type TEXT,             -- 'folder' or 'log_entry'
  source_id TEXT,
  target_type TEXT,
  target_id TEXT,
  context TEXT                  -- The surrounding text
)

-- Open questions (unresolved items)
open_questions (
  id INTEGER PRIMARY KEY,
  question TEXT,
  context TEXT,
  folder_path TEXT,
  resolved_by INTEGER,          -- log_entry_id that answered it
  created_at INTEGER,
  resolved_at INTEGER
)

-- Tags/themes (for categorization)
tags (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE
)

log_entry_tags (
  log_entry_id INTEGER,
  tag_id INTEGER,
  PRIMARY KEY (log_entry_id, tag_id)
)
```

---

## What This Enables

| Operation | Flat Files | SQLite |
|-----------|-----------|--------|
| Store AI-generated summary | Write .md file | INSERT row |
| Retrieve context for /src | Parse markdown | SELECT query |
| Find all decisions about auth | Grep all files | WHERE + full-text |
| Detect stale context | Compare file hashes manually | Hash column + index |
| Aggregate by date/tag/status | Manual index files | GROUP BY query |
| Cross-references | Grep for links | JOIN on references |
| "What changed today?" | Git log | WHERE date = today |

---

## Open Questions

- **Schema refinements** — What else needs indexing?
- **Turso vs local** — When does cloud sync matter?
- **Migration tooling** — How to handle schema changes?
- **Markdown export format** — What structure for GitHub/sharing?
- **boot.md content** — What exactly goes in the production boot.md?

---

## Files Changed

| File | Change |
|------|--------|
| `2026-01-02-sqlite-understanding.md` | Created — this file |
| `wip-sqlite.md` | To be updated with this understanding |
| `wip-boot.md` | To be updated with clarifications |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Document understanding | `decision_logger` (this work) |
| Implement schema | TypeScript (not agent) |
| Maintain context | `context_agent` (future) |

---

**Do not revisit until implementation reveals issues.**
