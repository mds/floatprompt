# Schema Drift Fix: mtime Column

**Date:** 2026-01-03
**Status:** Locked

---

## Decision

Fixed schema drift where `mtime` column existed in Zod schema but not in actual SQLite database.

---

## Rationale

During code review of `scan.ts`, discovered:
1. `schema.ts` defines `mtime INTEGER NOT NULL` for files table
2. Actual database lacked this column (PRAGMA table_info confirmed)
3. scan.ts collected mtime values but INSERT/UPDATE didn't use them
4. Root cause: `CREATE TABLE IF NOT EXISTS` skips creation if table exists — doesn't add missing columns

The fix ensures the database matches the schema definition, enabling future two-phase change detection (mtime check first, hash if changed).

---

## Before

```sql
-- Actual files table (missing mtime)
path TEXT PRIMARY KEY
folder_path TEXT NOT NULL
content_hash TEXT NOT NULL
last_scanned_at INTEGER NOT NULL
```

```typescript
// scan.ts INSERT (missing mtime)
INSERT INTO files (path, folder_path, content_hash, last_scanned_at)
```

---

## After

```sql
-- Fixed files table
path TEXT PRIMARY KEY
folder_path TEXT NOT NULL
content_hash TEXT NOT NULL
mtime INTEGER NOT NULL        -- Now exists
last_scanned_at INTEGER NOT NULL
```

```typescript
// scan.ts INSERT (includes mtime)
INSERT INTO files (path, folder_path, content_hash, mtime, last_scanned_at)
```

---

## Files Changed

| File | Change |
|------|--------|
| `src/db/scan.ts` | — |
| `.float/float.db` | — |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Schema validation | `parity_checker` — verify schema.ts matches actual DB |
| Migration detection | `schema_migrator` — detect when ALTER TABLE needed |
