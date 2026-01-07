# FloatPrompt Plugin PRD Review

**Date:** 2026-01-07
**Session:** 37
**Status:** locked

---

## Summary

Comprehensive PRD review locked key decisions on users, enrichment architecture, bundling strategy, boot.md lifecycle, git integration, working directory handling, and future schema work. Added float-logger agent for generalized decision logging.

---

## Decisions

### 1. Users (v1)

**Decision:** Solo developers on personal/work projects. Team collaboration out of scope.
**Rationale:** Focus on getting the core experience right for individual users before tackling multi-user complexity.

### 2. Enrichment Architecture

**Decision:** Removed `float-enrich` skill. SessionEnd hook uses `git diff --name-only` to detect edited folders.
**Rationale:** Simpler approach with no skill state to manage. Git already tracks what changed.

### 3. MCP vs Bundled Scripts

**Decision:** Bundled scripts (`lib/float-db.js`), NOT MCP server.
**Rationale:** MCP tool descriptions add token overhead to every session. Bundled scripts keep context lean.

### 4. boot.md Lifecycle

**Decision:** Shipped with plugin as template, copied to `.float/boot.md` on first `/float` run.
**Rationale:** Stable instructions, not project-specific. Template approach allows updates.

### 5. Git Integration

**Decision:** Commit `.float/` directory (both float.db and boot.md).
**Rationale:** Context compounds and shares across team/machines. Database is small, valuable.

### 6. Working Directory

**Decision:** `/float` uses current working directory. No root detection.
**Rationale:** Keep it simple. User runs from project root.

### 7. Schema Rename (Pending)

**Decision:** Rename `content_md` to `context` for semantic clarity.
**Rationale:** Column stores context, not generic markdown content. Name should match purpose.
**Status:** Pending — may be done in another session.

### 8. float-logger Agent

**Decision:** Added generalized decision logging agent for ANY project with `.float/` (not just workshop).
**Rationale:** Decision capture should work everywhere FloatPrompt is installed. Writes to `log_entries` table.

### 9. Agent Design Passes Needed

**Decision:** boot.md, float-enricher, and float-logger each need their own design pass before implementation.
**Rationale:** PRD captures what, not how. Each component needs detailed spec work.

---

## Files Changed

- `.float-workshop/active/floatprompt-plugin-PRD.md` — Updated with all decisions
- `.float-workshop/active/ACTIVE.md` — Updated to reflect PRD review complete

---

*Session 37: PRD locked, implementation dependencies identified*
