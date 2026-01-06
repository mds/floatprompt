# Float Folder Structure

**Updated:** 2026-01-05 (Session 30)

The flat file structure is a **mental model**. SQLite is the source of truth.

---

## Mental Model vs Reality

```
Mental Model (files)          Reality (SQLite)
─────────────────────         ────────────────────
.float/                       .float/float.db
├── boot.md                   (stays as file)
└── project/                  folders table
    ├── _project/               └── path = '/'
    │   ├── map.md                  └── description field
    │   ├── context.md              └── content_md field
    │   └── logs/                   └── log_entries WHERE folder_path = '/'
    ├── src/                    └── path = '/src'
    │   ├── map.md                  └── description field
    │   ├── context.md              └── content_md field
    │   └── auth/               └── path = '/src/auth'
    │       └── ...                 └── ...
    └── [recursive...]          └── [one row per folder]
```

**Key insight:** Every folder = one row. Map and context become fields. Logs become query results.

---

## The Folders Table (16 Fields)

| Category | Field | Purpose |
|----------|-------|---------|
| **Identity** | `path` | Primary key: `/`, `/src`, `/src/auth` |
| | `parent_path` | Hierarchy pointer (NULL for root) |
| | `name` | Folder name: `src`, `auth` |
| **Governance** | `type` | `folder`, `scope`, `log_root`, `log_year`, `log_month` |
| | `status` | `pending`, `current`, `stale` — can AI trust this? |
| **AI Content** | `description` | Quick orientation — "what's here" (1-2 sentences) |
| | `content_md` | Deeper understanding — "what it means" (markdown) |
| **Scope** | `is_scope` | Is this folder an autonomous world? |
| | `parent_scope_path` | Pointer to nearest ancestor scope |
| | `scope_boot` | Boot context for this scope |
| **Mechanical** | `source_hash` | SHA-256 of children for change detection |
| | `last_scanned_at` | When scanner last looked |
| **Attribution** | `ai_model` | Which model wrote this context |
| | `ai_updated` | When AI last wrote |
| **Timestamps** | `created_at` | Row creation time |
| | `updated_at` | Last modification time |

---

## The Mapping Pattern

For any folder at path `/foo/bar`:

| Concept | Mental Model | SQLite |
|---------|--------------|--------|
| Identity | Folder exists at `/foo/bar` | `path = '/foo/bar'` |
| Parent | Inside `/foo` | `parent_path = '/foo'` |
| Map | `bar-map.md` | `description` field |
| Context | `bar-context.md` | `content_md` field |
| Logs | `bar-logs/*.md` | `log_entries WHERE folder_path` |
| Children | Subfolders inside | `SELECT WHERE parent_path` |
| Scope? | Has own boot | `is_scope = TRUE` |
| Fresh? | Manual check | `status = 'current'` |
| Who wrote? | Unknown | `ai_model`, `ai_updated` |

---

## Other Tables

| Table | Purpose |
|-------|---------|
| `files` | Source files tracked (path, content_hash, mtime) |
| `log_entries` | Decision paper trail (folder_path, date, topic, decision, rationale) |
| `references` | Cross-links for staleness detection (source → target) |
| `open_questions` | Unresolved items |
| `tags` | Categorization |
| `log_entry_tags` | Many-to-many for log_entries and tags |
| `deep` | Topic-based context (concept primers, cross-cutting) |
| `deep_history` | Version history for deep contexts |

---

## Scope Chain

When AI lands in `/src/auth/middleware`:

```sql
-- Get the scope chain
SELECT path, description, is_scope, scope_boot
FROM folders
WHERE path IN ('/', '/src', '/src/auth', '/src/auth/middleware')
ORDER BY length(path);
```

Returns context from root → intermediate scopes → current folder. Each level adds specificity.

---

## Staleness Detection

```sql
-- What's stale?
SELECT path, status, ai_updated
FROM folders
WHERE status = 'stale';

-- What needs initial context?
SELECT path
FROM folders
WHERE status = 'pending';
```

---

## What Stays as Files

| File | Why |
|------|-----|
| `boot.md` | THE system prompt, human-editable, version controlled |
| Markdown export | Optional, for humans/GitHub (not source of truth) |

Everything else lives in SQLite. Queryable > navigable.

---

*Data model reference for FloatPrompt — Updated Session 30*
