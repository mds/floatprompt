# Float Folder Structure

## Flat File Structure (Mental Model)

This is how the system looks as navigable folders and files:

```
.float/
- boot.md (how this system works)
- project (generated based on root folder scan)
  - _project
    - project-map.md (generated)
    - project-context.md (deeper context)
    - project-logs/ (logs about the entire project)
      2026/
      - 01-jan
          - 01-jan.md (summary)
          - 2026-01-02-decision.md (individuals)
        2026.md (summary)
      wip-logs.md (how to keep this updated)
  - bin
    - bin-map.md
    - bin-context.md
    - bin-logs/ (logs about bin/)
      2026/
      - 01-jan/
  - dist
    - dist-map.md
    - dist-context.md
    - dist-logs/ (logs about dist/)
      2026/
      - 01-jan/
  - docs
  - examples
  - src
  - templates
- templates
- tools
```

---

## SQLite Translation (added 2026-01-03)

The flat file structure is a **mental model**. SQLite is the source of truth.

| Flat File | SQLite Equivalent |
|-----------|-------------------|
| `.float/project/_project/` | `folders` row: `path = '/'` |
| `project-map.md` content | `folders.description` field |
| `project-context.md` content | `folders.content_md` field |
| `project-logs/2026/01-jan/decision.md` | `log_entries` row: `folder_path = '/'` |
| `project-logs/2026/01-jan/01-jan.md` (summary) | `folders` row: `type = 'log_month'` |
| `.float/project/bin/` | `folders` row: `path = '/bin'`, `parent_path = '/'` |
| `bin-map.md` content | `folders.description` on `/bin` row |
| `bin-context.md` content | `folders.content_md` on `/bin` row |
| `bin-logs/` entries | `log_entries` WHERE `folder_path = '/bin'` |

**Key insight:** Every folder = one row. The `-map.md` and `-context.md` files become fields on that row. The `-logs/` folder becomes query results from `log_entries`.

SQLite makes it queryable instead of navigable. Same data, different interface.

---

## The Mapping Pattern

For any folder at path `/foo/bar`:

| Concept | Flat File | Database |
|---------|-----------|----------|
| Identity | Folder exists at `/foo/bar` | `path = '/foo/bar'` |
| Parent | Inside `/foo` | `parent_path = '/foo'` |
| Map | `bar-map.md` | `description` field |
| Context | `bar-context.md` | `content_md` field |
| Logs | `bar-logs/*.md` | `log_entries WHERE folder_path = '/foo/bar'` |
| Children | Subfolders inside | `SELECT * FROM folders WHERE parent_path = '/foo/bar'` |
