# Deep Context Implementation

**Date:** 2026-01-04
**Status:** locked
**Session:** 20

---

## Decision

Implemented deep context tables and CLI per locked spec (`docs/deep-context.md`). Topic-based context now stored in SQLite with version history.

---

## What Was Built

### Schema (`src/db/deep-schema.ts`)
- `DeepWatchSchema` — Staleness trigger types (folder, glob, logs, deep)
- `DeepStatusSchema` — current | stale | generating
- `DeepSchema` — Full row type
- `DeepHistorySchema` — Version snapshot type
- DDL for `deep` + `deep_history` tables

### CRUD Functions (`src/db/client.ts`)
- `insertDeep()` — Create new deep context
- `getDeep()` — Get by slug
- `listDeep()` — List all with parsed JSON
- `updateDeep()` — Update with automatic history versioning
- `markDeepStale()` — Mark status as stale
- `deleteDeep()` — Delete with cascade to history
- `getDeepHistory()` — Get all versions
- `getDeepVersion()` — Get specific version

### CLI Commands (`src/cli/float-db.ts`)
```bash
float-db deep list                    # List all contexts
float-db deep show <slug> [--json]    # Show content
float-db deep create <slug> --title --content/--file
float-db deep update <slug> --content/--file/--status
float-db deep stale <slug>            # Mark stale
float-db deep delete <slug>           # Delete with cascade
float-db deep history <slug>          # Show versions
float-db deep version <slug> <n>      # Get specific version
```

---

## Test Results

| Test | Result |
|------|--------|
| Create from file | ✅ |
| List with metadata | ✅ |
| Show with JSON output | ✅ |
| Update creates history | ✅ |
| Version history tracking | ✅ |
| Specific version retrieval | ✅ |
| Mark stale | ✅ |
| Delete with cascade | ✅ |

---

## First Deep Context

Imported `deep-context-floatprompt.md` as `floatprompt` slug — the manual prototype now lives in float.db with version history.

---

## Files Changed

- `src/db/deep-schema.ts` — Created (Zod schemas + DDL)
- `src/db/schema.ts` — Added deep tables DDL
- `src/db/client.ts` — Added 8 CRUD functions
- `src/cli/float-db.ts` — Added deep subcommand

---

## Future Agent

**decision_logger** — This implementation decision would be auto-logged by a decision-logger buoy observing the session.

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [deep-context.md](../../docs/deep-context.md) | THE spec (LOCKED) |
| [deep-context-floatprompt.md](../../docs/deep-context-floatprompt.md) | First manual deep context |

---

*Deep context tables implemented — topic-based context with version history now in SQLite.*
