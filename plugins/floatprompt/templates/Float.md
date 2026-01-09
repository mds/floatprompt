# Float.md — AI Driver's Manual

FloatPrompt: Persistent context that survives sessions and compounds over time.

## Query Context

```sql
-- Current folder
sqlite3 .float/float.db "SELECT description, context, status FROM folders WHERE path='/src/auth'"

-- Scope chain (current → root)
sqlite3 .float/float.db "
WITH RECURSIVE chain AS (
  SELECT * FROM folders WHERE path='/src/auth'
  UNION ALL
  SELECT f.* FROM folders f JOIN chain c ON f.path = c.parent_path
)
SELECT path, description FROM chain"

-- Latest session handoff
sqlite3 .float/float.db "SELECT * FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1"

-- Recent activity (for focus inference)
sqlite3 .float/float.db "SELECT files_read, files_changed FROM log_entries WHERE date >= date('now', '-7 days')"
```

## When to Query

- Entering a folder you don't understand
- Checking if context is stale
- Looking for past decisions on a topic

## Trust Levels

| status | Meaning |
|--------|---------|
| `current` | Trust this context |
| `stale` | Verify before relying |
| `pending` | No AI context yet |

## What's Automatic

- **PreCompact hook** captures session state (full: sqlite3 + AI agents)
- **SessionEnd hook** captures as fallback (mechanical: sqlite3 only)
- Agents are spawned inline via `claude -p` — no separate agent files needed

You don't need to manually save. Just work.

## Update Context (Optional)

If you learn something worth preserving:

```sql
sqlite3 .float/float.db "UPDATE folders SET
  description='What this folder contains',
  context='Deeper understanding of purpose and patterns',
  status='current',
  ai_model='opus',
  ai_updated=unixepoch(),
  updated_at=unixepoch()
WHERE path='/src/auth'"
```

Be selective. Only update if genuinely new understanding.
