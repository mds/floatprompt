# Protocol to Native Migration

**Date:** 2026-01-05
**Session:** 26
**Status:** Locked

---

## Summary

Migrated workshop protocols from custom `<fp><json><md>` format to native Claude Code commands and agents. Workshop layer now uses Claude Code patterns while FloatPrompt core (buoys, SQLite) remains custom.

---

## Decisions

### 1. Commands are Self-Contained

**Decision:** Commands include full content inline, no "read protocol X" indirection.
**Rationale:** Simpler mental model, no dependency chain, works with Claude Code's native discovery.

### 2. Shorter Command Names

**Decision:** `float-boot` and `float-handoff` (not `float-session-*`).
**Rationale:** Cleaner in menus, consistent `float-*` prefix for namespace.

### 3. No Skill Needed for Boot

**Decision:** Boot is always explicit via `/float-boot`, not auto-invoked.
**Rationale:** Sometimes user has specific task, doesn't need full orientation. Explicit is better.

### 4. Protocols Archived to done/

**Decision:** Original protocols moved to `done/protocol-*.md`.
**Rationale:** Completed migration work, not ongoing reference. Content now lives in commands/agents.

### 5. Workshop vs Core Distinction

**Decision:** Workshop layer uses native Claude Code patterns. FloatPrompt core (buoys, SQLite, scopes) stays custom.
**Rationale:** Workshop is Claude-specific development tooling. Core is the portable product.

---

## Files Changed

**Created:**
- `.claude/commands/float-boot.md`
- `.claude/commands/float-handoff.md`
- `.float-workshop/active/protocol-migration-verification.md`

**Updated:**
- `.claude/agents/float-organize.md` — Self-contained
- `.claude/agents/float-update-logs.md` — Self-contained
- `.float-workshop/README.md` — Commands/agents instead of protocols
- `.float-workshop/done/DONE.md` — Listed archived protocols

**Archived:**
- `done/protocol-session-boot.md`
- `done/protocol-session-handoff.md`
- `done/protocol-organize.md`
- `done/protocol-update-logs.md`

**Deleted:**
- `.claude/commands/float-session-boot.md`
- `.claude/commands/float-session-handoff.md`
- `.float-workshop/protocols/` (entire folder)

---

*Session 26: Workshop layer now uses native Claude Code patterns*
