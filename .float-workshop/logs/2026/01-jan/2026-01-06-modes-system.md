# Modes System

**Date:** 2026-01-06
**Sessions:** 31, 32
**Status:** locked

---

## Summary

Created modes/ folder for context loadouts — different work needs different context. "Getting dressed for the work." Also created CLAUDE.md as baseline operational context and /float-mode command for crystallizing context into reusable modes. Session 32 refined the system with activate/create duality, deep-plugin mode, and compass-vs-map framing for Track 1 work.

---

## Decisions

### 1. Modes System Created

**Decision:** Create modes/ folder for context loadouts
**Rationale:** Different work needs different context. Strategic planning needs different context than implementation. Modes are "getting dressed for the work."
**Framework:** Role, Activate when, Exit when, Load, Hold, Ignore

### 2. CLAUDE.md Created

**Decision:** Create baseline CLAUDE.md for all sessions
**Rationale:** Operational guidance (commands, architecture) that every session needs regardless of mode
**Key insight:** "CLAUDE.md is a note on the door. Modes are the institutional knowledge."

### 3. Origin Story Added to deep-strategy

**Decision:** Include FloatPrompt origin story (portable tools to context infrastructure) in deep-strategy mode
**Rationale:** Understanding evolution matters for strategic thinking

### 4. Mode Generator Agent Created

**Decision:** Create /float-mode command and float-mode-generator agent
**Rationale:** Crystallize context investment into reusable modes before handoff
**Key feature:** Hypothesis-first approach — agent analyzes session and proposes mode, doesn't start blank

### 5. float-organize Updated for Modes

**Decision:** Add lightweight modes awareness to organize agent
**Rationale:** Ensure new modes get registered in MODES.md during handoff

### 6. Float-mode Activate/Create Duality (Session 32)

**Decision:** `/float-mode` now handles both activating existing modes AND creating new ones
**Rationale:** Single command for all mode operations, with smart session state detection
**Key feature:** Early session defaults to activate, deep session suggests create

### 7. Deep-plugin Mode Created (Session 32)

**Decision:** Create deep-plugin mode for Track 1 implementation work
**Rationale:** Implementer role needs different context than strategist
**Contents:** Claude Code docs, decision log references, "why" from strategy, spec as compass

### 8. Compass vs Map Framing (Session 32)

**Decision:** Track 1 spec (floatdb skill, /float, /float-deepen, etc.) is compass direction, not rigid map
**Rationale:** What we actually build may evolve as we learn
**Key insight:** Current commands/agents (float-boot, float-handoff, etc.) ARE Track 1 in progress

### 9. Boot Offers Mode Activation (Session 32)

**Decision:** `/float-boot` step 5 now offers mode activation after reading state
**Rationale:** Natural point to load context loadout — after understanding state, before starting work

---

## Files Changed

### Session 31
- `modes/MODES.md` — Created (modes registry)
- `modes/deep-strategy.md` — Created (first mode, with origin story)
- `CLAUDE.md` — Created (baseline operational context)
- `.claude/agents/float-mode-generator.md` — Created (mode crystallization agent)
- `.claude/commands/float-mode.md` — Created (mode command)
- `.claude/commands/float-boot.md` — Updated (modes awareness)
- `.claude/agents/float-organize.md` — Updated (modes registration)
- `.float-workshop/README.md` — Updated

### Session 32
- `.claude/commands/float-mode.md` — Major update (activate/create duality)
- `.claude/commands/float-boot.md` — Added mode activation step
- `.float-workshop/modes/deep-plugin.md` — Created
- `.float-workshop/modes/MODES.md` — Registered deep-plugin

---

*Session 31: Modes as context loadouts — getting dressed for the work*
*Session 32: Activate/create duality, deep-plugin mode, compass framing*
