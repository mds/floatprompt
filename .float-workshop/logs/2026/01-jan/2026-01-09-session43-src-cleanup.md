# Session 43: src/ Cleanup

**Date:** 2026-01-09
**Session:** 43
**Status:** locked

---

## Summary

Reorganized src/ to separate core plugin code from draft/future code. Core files compile, draft files excluded from build.

---

## Decision

### Core vs Draft Separation

**Decision:** Created `src/draft/` for code not needed in v1 plugin. Excluded from TypeScript compilation.

**Rationale:** The plugin spec says "AI uses sqlite3 directly" — we need schema and scanner, not the full buoy system or CLI wrapper. Keeping draft code available for future reference without breaking the build.

---

## Core Files (5 files, compiled)

| File | Purpose |
|------|---------|
| `src/index.ts` | Root exports |
| `src/db/schema.ts` | Zod schemas + SQL DDL (CREATE_TABLES_SQL) |
| `src/db/scan.ts` | Layer 1 filesystem scanner |
| `src/db/client.ts` | Database connection + CRUD functions |
| `src/db/deep-schema.ts` | Deep context types (used by client.ts) |

---

## Draft Files (28 files, excluded)

| Folder | Contents | Why Draft |
|--------|----------|-----------|
| `src/draft/buoys/` | Buoy worker system (archetypes, templates, dispatch, execute) | Future architecture — plugin uses Claude Code agents |
| `src/draft/cli/` | float-db.ts CLI | Spec says AI uses sqlite3 directly, not CLI |
| `src/draft/db/` | generate.ts, import.ts, export.ts | Replaced by agents (enricher, logger) |
| `src/draft/partials/` | Partials system | Unclear purpose, unused |
| `src/draft/schema/` | FloatDoc/FloatPrompt validation | Old format validation, not needed |
| `src/draft/tools/` | float-sync.ts | Superseded |

---

## Config Changes

- `tsconfig.json` — Added `"src/draft"` to exclude array

---

## Verification

```
npm run build → Success (no errors)
Core files compile → ✓
Draft files excluded → ✓
```

---

*Session 43: Clean separation of core vs draft code*
