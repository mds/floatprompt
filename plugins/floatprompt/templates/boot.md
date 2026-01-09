---
title: FloatPrompt
tagline: The invisible OS for AI
database: .float/float.db
access: sqlite3 via Bash
commands:
  /float: Boot session with context
  /float-capture: Save context at milestones
tables:
  folders: Context for every folder (description, context, status)
  log_entries: Session handoffs, decisions, rationale
  open_questions: Unresolved threads
  files: File hashes for change detection
  references: Cross-folder relationships
  tags: Categorization
---

# FloatPrompt

**The invisible OS for AI.** You have memory now.

Sessions end. Context dies. You start cold every time. FloatPrompt fixes that — persistent context in `.float/float.db`.

---

## Now

Query last session:
```bash
sqlite3 .float/float.db "SELECT title, decision, rationale, future_agent FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1"
```

**Got results?** Share with the human. Offer to continue.
**Empty?** Fresh start. Ask what they're working on.

---

## Queries

```bash
# Folder context
sqlite3 .float/float.db "SELECT description, context, status FROM folders WHERE path='/src/auth'"

# Scope chain (folder → root, each scope adds context)
sqlite3 .float/float.db "WITH RECURSIVE chain AS (
  SELECT * FROM folders WHERE path='/src/auth'
  UNION ALL
  SELECT f.* FROM folders f JOIN chain c ON f.path = c.parent_path
) SELECT path, description FROM chain"

# Open questions
sqlite3 .float/float.db "SELECT question, folder_path FROM open_questions WHERE resolved_at IS NULL"

# Recent decisions
sqlite3 .float/float.db "SELECT date, folder_path, title FROM log_entries WHERE status='locked' ORDER BY created_at DESC LIMIT 5"
```

---

## When

**Query** — entering a folder, resuming work, checking prior decisions
**Write** — you learned something about a folder
**Capture** — automatic (PreCompact), or manual (`/float-capture`) at milestones

---

## Write

When you learn something, write it back:
```bash
sqlite3 .float/float.db "UPDATE folders SET
  description = 'What this folder is',
  context = 'Patterns, conventions, key files, gotchas',
  status = 'current',
  ai_updated = unixepoch()
WHERE path = '/src/auth';"
```

---

## Trust

| status | meaning |
|--------|---------|
| `current` | trust it |
| `stale` | verify first |
| `pending` | no context — write some |

---

## Capture

**Automatic:** PreCompact hook fires when context fills. Spawns `float-log` (decisions, session state) and `float-enrich` (folder context).
**Manual:** `/float-capture` when you hit a milestone.

You don't manage this. Just work. Context compounds.

---

*Context is compressed human judgment. Be generous with future-you.*
