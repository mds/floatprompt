<fp>
<json>
{
  "STOP": "SQLite Architecture. The acceleration layer for FloatPrompt. This is the source of truth for recursive context scaffolding.",

  "meta": {
    "title": "SQLite Architecture",
    "id": "wip-sqlite"
  },

  "human": {
    "author": "@mds",
    "intent": "Document SQLite as the storage layer for AI-generated context metadata"
  },

  "ai": {
    "role": "Architect for storage layer"
  },

  "requirements": {
    "phases": {
      "phase_1": "Manual flat files (NOW) — prototyping structure",
      "phase_2": "SQLite alongside flat files (SOON) — speed up agents",
      "phase_3": "SQLite as source of truth (LATER) — agents own it",
      "phase_4": "Flat files optional (EVENTUALLY) — export for GitHub/sharing"
    },
    "sqlite_purpose": "Store AI-generated metadata — fast queries, relationship tracking, staleness detection",
    "what_sqlite_replaces": ["floatdoc context files", "logs folder hierarchy", "index files", "cross-reference tracking"],
    "what_sqlite_keeps": ["boot.md (system prompt)", "AI judgment (generation)", "markdown export (optional)"]
  }
}
</json>
<md>
# SQLite Architecture

**The acceleration layer for FloatPrompt's recursive context scaffolding.**

---

## The Core Insight

The value prop isn't: "You can read these markdown files"

The value prop is: **"AI has complete context across your entire project"**

Humans don't need to open `01-jan.md`. They need to trust that when they ask "what decisions did we make about nav structure?" — the AI knows instantly.

**SQLite serves the AI, not the human.** Humans benefit indirectly.

---

## What SQLite Replaces

| Old Approach | SQLite Replacement |
|--------------|-------------------|
| floatdoc context files | `folders` table with map_* and context_* columns |
| logs/ folder hierarchy | `log_entries` table with date fields + queries |
| Index files (01-jan.md, 2026.md) | Queries — aggregations, not stored documents |
| Self-describing filenames | Path is a field, not a filename convention |
| `_project/` folder convention | Root is just `path = '/'` |
| Cross-reference tracking | `references` table + JOINs |
| Mirror structure | `folder_path` field links context to source |

**The flat file structure was a query interface for humans. SQLite IS the query interface.**

---

## What SQLite Does NOT Replace

| Still Needed | Why |
|--------------|-----|
| **boot.md** | THE system prompt for the project — AI reads this first |
| **AI judgment** | AI still generates summaries, context, decisions |
| **Markdown export** | For GitHub readability, sharing, human inspection |

---

## The Two Kinds of Summary

### Original Summaries (AI Judgment) — STILL NEEDED

- "What does /src mean?"
- "What patterns are used here?"
- "Why was this decision made?"

AI writes these. SQLite stores them.

### Aggregation Summaries (Mechanical) — ELIMINATED

- "List all January decisions"
- "Show locked decisions"
- "What themes emerged this year?"

These become queries. No index files needed.

---

## Why SQLite

**Traditional databases (PostgreSQL, MySQL):**
```
Your app  →  Network  →  Database SERVER (running 24/7)  →  Data
                              ↑
                         Needs hosting ($$$)
```

**SQLite:**
```
Your app  →  Single file (index.db)
             That's it.
```

SQLite is just a file. Like a really smart JSON file that can be queried.

| Aspect | JSON file | SQLite |
|--------|-----------|--------|
| Read | Load whole file | Query just what you need |
| Write | Rewrite whole file | Update just the row |
| Scale | Slow at 10MB+ | Handles gigabytes |
| Queries | Parse and filter | SQL with indexes |

**SQLite is everywhere.** Every iPhone, Android, browser, Mac, Windows. Battle-tested since 2000.

---

## The Evolution

```
PHASE 1: NOW (manual flat files)
├── Still testing structure
├── Easy to see/edit/iterate
├── No tooling needed
└── YOU ARE HERE

PHASE 2: SOON (add SQLite alongside)
├── Flat files remain source of truth
├── SQLite indexes them for speed
├── Agents query SQLite
├── Test the DB schema
└── WHEN: Structure is stable ← READY NOW

PHASE 3: LATER (SQLite becomes source of truth)
├── Agents write directly to SQLite
├── Flat files generated on demand
├── Full agent-driven
└── WHEN: TypeScript tooling works

PHASE 4: EVENTUALLY (flat files optional)
├── Export to markdown for GitHub/sharing
├── SQLite is canonical
└── WHEN: Production ready
```

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

## The Schema

### Core Tables

```sql
-- The things being described (folders in any project)
folders (
  path TEXT PRIMARY KEY,        -- '/', '/src', '/src/auth'
  parent_path TEXT,             -- For hierarchy queries
  name TEXT,                    -- 'src', 'auth'

  -- Map (WHERE - structure) — AI-generated
  map_summary TEXT,             -- "Contains React components for UI"
  map_children JSON,            -- [{name, type, description}]

  -- Context (WHAT - understanding) — AI-generated
  context_what TEXT,            -- "This is the authentication layer"
  context_why TEXT,             -- "Separated for security isolation"
  context_patterns JSON,        -- ["repository pattern", "DI"]

  -- Staleness detection
  -- source_hash = SHA-256(sorted child paths + their content hashes)
  -- Not recursive — just immediate children. Staleness bubbles up naturally.
  source_hash TEXT,
  last_scanned_at INTEGER,

  created_at INTEGER,
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
  future_agent TEXT,            -- Which agent type would do this

  -- Relations
  supersedes INTEGER,
  superseded_by INTEGER,

  created_at INTEGER
)

-- Source files being tracked (for change detection)
files (
  path TEXT PRIMARY KEY,        -- '/src/auth/login.ts'
  folder_path TEXT,             -- '/src/auth'
  content_hash TEXT,            -- For staleness detection
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
  folder_path TEXT,             -- Related folder
  resolved_by INTEGER,          -- log_entry_id that answered it
  created_at INTEGER,
  resolved_at INTEGER
)

-- Tags/themes (for categorization)
tags (
  id INTEGER PRIMARY KEY,
  name TEXT UNIQUE              -- 'architecture', 'naming', 'storage'
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
| Detect stale context | Compare hashes manually | Hash column + index |
| Aggregate by date/tag/status | Manual index files | GROUP BY query |
| Cross-references | Grep for links | JOIN on references |
| "What changed today?" | Git log | WHERE date = today |

**Parity checking becomes instant.** No more grepping across files.

---

## Example Queries

```sql
-- What 01-jan.md does manually:
SELECT date, title, status FROM log_entries
WHERE date LIKE '2026-01%' ORDER BY date;

-- What 2026.md does manually:
SELECT strftime('%m', date) as month,
       COUNT(*) as decisions,
       GROUP_CONCAT(DISTINCT t.name) as themes
FROM log_entries le
LEFT JOIN log_entry_tags let ON le.id = let.log_entry_id
LEFT JOIN tags t ON let.tag_id = t.id
WHERE date LIKE '2026%'
GROUP BY month;

-- Context for a folder:
SELECT map_summary, context_what, context_why
FROM folders WHERE path = '/src/auth';

-- Stale folders (source changed since last scan):
SELECT f.path FROM folders f
JOIN files fi ON fi.folder_path = f.path
WHERE fi.content_hash != f.source_hash;

-- Open questions:
SELECT * FROM open_questions WHERE resolved_at IS NULL;

-- What references this file?
SELECT * FROM references WHERE target_id = '/src/auth';
```

---

## Trigger Model

When do agents wake up to update context?

| Trigger | Use Case |
|---------|----------|
| File watcher | Local development |
| Git hook | On commit |
| Webhook | From GitHub |
| Timer/cron | Periodic scan |
| Manual | `float sync` command |
| Threshold | X files changed |

**The ideal:** Any file change triggers background agents. Hundreds coordinated if needed.

**Change detection:**
1. Compute hash of source folder contents
2. Compare to `source_hash` in `folders` table
3. If different → context is stale → spawn agent to regenerate

**Hash algorithm:**
```
source_hash = SHA-256(sorted child paths + their content hashes)
```
- Not recursive — just immediate children
- Staleness bubbles up naturally (child changes → child hash changes → parent recalculates)
- Deterministic (sorted paths ensure consistent ordering)

---

## The File

```
.float/
├── boot.md           ← THE system prompt (AI reads first)
├── index.db          ← Single file, ~50KB, contains everything
└── project/          ← Optional: exported markdown for humans
```

- Delete index.db? Regenerate from source
- Corrupt? Regenerate
- Move project? It comes along
- No server, no config, no hosting

---

## TypeScript Integration

```typescript
import Database from 'better-sqlite3';

// Open (creates if doesn't exist)
const db = new Database('.float/index.db');

// Query context
const context = db.prepare(`
  SELECT map_summary, context_what, context_why
  FROM folders WHERE path = ?
`).get('/src/auth');

// Find stale folders
const stale = db.prepare(`
  SELECT path FROM folders
  WHERE source_hash != (
    SELECT content_hash FROM files WHERE folder_path = folders.path
  )
`).all();

// Insert decision
db.prepare(`
  INSERT INTO log_entries (folder_path, date, topic, status, title, decision)
  VALUES (?, ?, ?, ?, ?, ?)
`).run('/', '2026-01-02', 'sqlite-understanding', 'locked', 'SQLite Full Understanding', '...');
```

**Package:** `better-sqlite3` (native, fast) or `sql.js` (pure JS, portable)

---

## For Vercel/Cloud

**Options:**
- **Turso** — SQLite fork with cloud sync (edge-compatible)
- **Cloudflare D1** — SQLite at the edge
- **Generate on deploy** — build index.db during CI

For now: local SQLite. Later: evaluate cloud options.

---

## floatdoc Status

The floatdoc schema (`src/schema/floatdoc.ts`) was designed for:
- Token-light context docs
- YAML frontmatter + markdown
- Lightweight terrain awareness

**SQLite likely replaces this entirely.** The same data lives in database columns:
- `title` → `folders.name` or `log_entries.title`
- `type` → implicit in table
- `status` → `log_entries.status`
- `description` → `folders.map_summary`

**Possible remaining use:** Exported markdown views. But generation, not storage.

---

## Open Questions

- **Schema refinements** — What else needs indexing?
- **Turso vs local** — When does cloud sync matter?
- **Migration tooling** — How to handle schema changes?
- **Markdown export format** — What structure for GitHub/sharing?
- **Full-text search** — FTS5 for searching content?

---

## Implementation Status

### What Exists

```
src/db/
└── schema.ts    # Zod schemas + SQL DDL for all 7 tables
```

**Status:** Direct translation of this document. HIGH confidence.

### What Was Deleted

`index.ts` (FloatDB class with CRUD operations) — was speculative API design without locked requirements. Removed to avoid anchoring bias. In git history if needed.

**Lesson learned:** See `2026-01-02-no-code-without-requirements.md`

---

## Next Steps

1. ~~Document full understanding~~ (done: 2026-01-02-sqlite-understanding.md)
2. ~~Implement schema in TypeScript~~ (done: schema.ts)
3. ~~Answer all Phase 2 questions~~ (done: wip-phase2.md — 16 questions, stress tested)
4. ~~Lock each decision~~ (done: all locked 2026-01-03)
5. ~~Build importer~~ (done: client.ts, import.ts)
6. ~~Test with current wip-logs/ data~~ (done: 15 entries imported, validated)
7. ~~Plan Phase 3~~ (done: wip-phase3.md — 15 questions answered)
8. ~~Build scanner~~ (done: src/db/scan.ts — 65 folders, 446 files in .float/float.db)
9. **Layer 2:** AI generation (buoys populate `map_*` and `context_*` fields)

---

*Created 2026-01-02 — Updated 2026-01-03 with Phase 3 implementation complete*
</md>
</fp>
