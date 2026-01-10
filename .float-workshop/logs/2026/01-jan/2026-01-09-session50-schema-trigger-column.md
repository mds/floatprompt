# Schema Enhancement: Trigger Column for Hook Debugging

**Session:** 50
**Date:** 2026-01-09
**Folders:** plugins/floatprompt/hooks, plugins/floatprompt/lib

## Summary
Added `trigger` column to `log_entries` table to track which hook created each entry. Enables debugging when PreCompact hook fires but session context differs from SessionEnd capture.

## Decision
Added `trigger TEXT` column to log_entries table in schema.sql.

Hook-created entries record their source:
- `PreCompact` — Entry created by PreCompact hook (session still active)
- `SessionEnd` — Entry created by SessionEnd hook (fallback, after session)
- `manual` — Entry created manually (direct sqlite3 or future UI)

The hook sets `trigger` to `${HOOK_EVENT:-manual}` when inserting.

## Rationale
1. **Hook debugging** — Some issues manifest only when PreCompact vs SessionEnd fire in different patterns
2. **Context accuracy** — PreCompact fires mid-session (accurate transcript + state), SessionEnd fires after session ends (may have lost context)
3. **Deduplication tracking** — 5-minute window prevents double-capture, but we need to know which hook won
4. **Minimal overhead** — Single TEXT column, no performance impact, purely diagnostic
5. **Future analysis** — Can analyze patterns: "When does PreCompact fire? When does SessionEnd catch things?"

## Files Changed
- `plugins/floatprompt/lib/schema.sql` — Added `trigger` and `related_files` columns to log_entries
- `plugins/floatprompt/hooks/float-capture.sh` — Hook now passes `trigger` value on INSERT

## Notes
- `related_files` column also added in same commit (JSON array for files conceptually relevant to work)
- No migration needed (fresh installs only; existing DBs remain compatible)
- Workshop plugin uses this; may inform future Layer 3 autonomous triggering decisions
