# Session 47: Rename handoff to capture, boot.md rewrite

**Date:** 2026-01-09
**Session:** 47
**Status:** locked

---

## Summary

Renamed "handoff" to "capture" for user-facing clarity, and rewrote boot.md with YAML frontmatter and action-first organization.

---

## Decisions

### 1. Naming: "capture" over "handoff"

**Decision:** Rename `handoff` to `capture` in user-facing contexts
**Rationale:** "Capture" describes what actually happens (saving context). "Handoff" was internal jargon that assumed knowledge of session-to-session workflow. Users understand "capture your work" immediately.

### 2. boot.md format: YAML over JSON

**Decision:** Use YAML frontmatter instead of custom `<fp><json><md>` format
**Rationale:** The hybrid format was designed for cross-platform portability. boot.md is a single-platform file (Claude Code only). YAML frontmatter is standard, familiar to developers, and cleaner to read. No benefit to custom format here.

### 3. boot.md structure: Action-first

**Decision:** Organize boot.md by what a fresh AI needs to do, not by concept
**Rationale:** Fresh AI needs immediate orientation. Structure organized as:
- **Now** — Immediate action (run scan)
- **Queries** — SQL patterns to understand codebase
- **When** — Triggers for system behavior
- **Write** — How to save context back to float.db
- **Trust** — What status values mean
- **Capture** — Automatic + manual capture patterns

This is action-first, not documentation-first.

---

## Files Changed

- `plugins/floatprompt/templates/boot.md` — Rewritten with YAML frontmatter, action-first structure
- Various hook/agent references — `handoff` terminology updated to `capture` where user-facing

---

*Session 47: User clarity through naming and structure*
