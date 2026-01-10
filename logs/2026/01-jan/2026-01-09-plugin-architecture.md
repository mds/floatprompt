# Plugin Architecture Decisions

**Date:** 2026-01-09
**Session:** 41
**Status:** locked

---

## Summary

Eliminated CLI layer entirely. AI agents write raw SQL to sqlite3; humans interact via single `/float` command. Architecture artifact becomes source of truth, superseding previous PRD assumptions.

---

## Decisions

### 1. No CLI Architecture

**Decision:** AI uses sqlite3 directly, no float-db.js CLI. Agents write raw SQL.
**Rationale:** Simplifies the plugin significantly. The CLI was an abstraction layer that added complexity without value — AI can write SQL directly, and this is actually more powerful and flexible than a limited command interface.

### 2. One Command Interface

**Decision:** Human runs `/float`, AI operates everything else. No other commands needed for users.
**Rationale:** Radical simplicity for adoption. Users don't need to learn anything. The AI handles all complexity behind a single entry point.

### 3. Architecture Artifact as Source of Truth

**Decision:** Created `artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md` (847 lines). This supersedes all previous PRD assumptions about CLI tooling.
**Rationale:** Previous PRDs assumed a CLI layer. The architecture document captures the actual design after realizing direct sqlite3 access is cleaner.

### 4. PRD Refinement Mode

**Decision:** Refining understanding, not building, until 100% confident in the architecture.
**Rationale:** Building prematurely on unclear architecture creates rework. Better to iterate on paper until the design is solid.

---

## Files Changed

- `artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md` — Created (847 lines, source of truth)
- `.float-workshop/active/plugin-features.json` — Created
- `.float-workshop/active/claude-progress.md` — Created
- `.float-workshop/modes/deep-plugin.md` — Updated

---

*Session 41: AI writes SQL directly*
