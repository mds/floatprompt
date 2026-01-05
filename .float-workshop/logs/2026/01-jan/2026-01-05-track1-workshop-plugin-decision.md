# Track 1 Workshop Plugin Decision

**Date:** 2026-01-05
**Session:** 28
**Status:** locked

---

## Summary

Established Track 1 (workshop plugin with float.db) as Priority 1, using Claude Code native patterns (skills + agents + commands) for Layer 2 implementation.

---

## Decisions

### 1. Track 1 Workshop Plugin Priority

**Decision:** Track 1 (workshop plugin with float.db) is now Priority 1
**Rationale:** Smaller scope, validates patterns, uses existing float.db and buoy infrastructure. Layer 2 only (AI generation), no autonomous monitoring (Layer 3).

### 2. Architecture: Skills + Agents + Commands

**Decision:** Use Claude Code native patterns for Layer 2
- **Skills:** floatdb-schema (teaches Claude the DB)
- **Agents:** float-context-generator, float-scope-detector, float-staleness-checker
- **Commands:** /float-generate, /float-status, /float-refresh

**Rationale:** Buoys map naturally to agents, keeps float-db CLI as the execution layer.

### 3. Ralph Wiggum for Staleness

**Decision:** Optional periodic staleness checking via Ralph Wiggum loop
**Rationale:** No continuous monitoring (Layer 3), but can run staleness checks periodically on user request.

---

## Files Created

- `.float-workshop/active/track1-workshop-plugin-spec.md` - Full specification for Track 1
- `artifacts/claude-code-plugins/claude-code-curriculum.md` - Plugin architecture curriculum
- `artifacts/claude-code-plugins/claude-code-quiz.md` - Understanding validation quiz

---

*Session 28: Track 1 prioritized with native Claude Code patterns*
