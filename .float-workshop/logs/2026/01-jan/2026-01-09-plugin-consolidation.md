# Plugin Consolidation

**Date:** 2026-01-09
**Session:** 42
**Status:** locked

---

## Summary

Consolidated scattered plugin documentation into one authoritative spec, replaced static mode system with activity-based inference, and identified Float.md naming as pending decision.

---

## Decisions

### 1. Mode Inference Replaces Static Modes

**Decision:** The `float-mode-suggest` skill is OUT of scope. Static mode files are replaced by inference from `files_read` and `files_changed` in log_entries.

**Rationale:** Static mode files get stale. Float.md will teach AI to query recent activity patterns and infer focus dynamically. Principle: "Log the activity, infer the context. Don't create static artifacts that rot."

### 2. Consolidated Plugin Spec

**Decision:** Created `floatprompt-plugin.md` (1,136 lines) as THE authoritative plugin specification.

**Rationale:** Multiple overlapping documents created confusion and risked drift. Single source of truth simplifies maintenance and ensures consistency.

**Superseded documents (archived to done/):**
- floatprompt-plugin-PRD.md
- floatprompt-plugin-spec.md
- architecture-gaps.md
- 2026-01-09-floatprompt-plugin-architecture.md
- floatprompt-claude-code-plugin.md
- claude-progress.md
- plugin-features.json

### 3. Float.md Naming Undecided

**Decision:** The instruction file name remains TBD. Candidates: `boot.md`, `float.md`, `FLOAT.MD`.

**Rationale:** The file will exist in `.float/` directory; final naming to be decided in a future session when more context emerges.

---

## Files Changed

- `active/floatprompt-plugin.md` - Created (authoritative plugin spec)
- `done/floatprompt-plugin-PRD.md` - Archived
- `done/floatprompt-plugin-spec.md` - Archived
- `done/architecture-gaps.md` - Archived
- `done/2026-01-09-floatprompt-plugin-architecture.md` - Archived
- `done/floatprompt-claude-code-plugin.md` - Archived
- `done/claude-progress.md` - Archived
- `done/plugin-features.json` - Archived

---

*Session 42: Consolidate to one spec, infer from logs*
