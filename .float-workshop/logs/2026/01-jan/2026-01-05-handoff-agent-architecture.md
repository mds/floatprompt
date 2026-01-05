# Handoff Agent Architecture

**Date:** 2026-01-05
**Session:** 24
**Status:** Locked

---

## Summary

Built 5 handoff agents with `float-*` naming convention for Claude Code plugin architecture. Established thin agent pattern where agents reference protocol files for logic.

---

## Decisions

### 1. Agent Naming Convention: `float-*`

**Decision:** All handoff agents use `float-` prefix for namespace clarity.

**Agents created:**
- `float-session-boot` — Boot new sessions from state files
- `float-session-handoff` — End-of-session state synchronization
- `float-update-state` — Update _focus, _next, _review files
- `float-update-logs` — Create decision logs and update summaries
- `float-update-boot` — Update boot.md with current state

**Rationale:** Consistent namespace prevents collision with other plugins, makes FloatPrompt agents immediately identifiable.

---

### 2. Agent Protocol Format: `<fp><json><md>`

**Decision:** All agent protocol files use the FloatPrompt hybrid format.

**Structure:**
```markdown
<fp>
<json>
{
  "STOP": "...",
  "id": "...",
  "title": "...",
  ...
}
</json>
<md>
# Protocol content...
</md>
</fp>
```

**Rationale:**
- `<json>` provides machine-readable metadata and structured requirements
- `<md>` provides human-readable instructions and context
- `STOP` field forces AI to pause and read before executing
- Consistent with all FloatPrompt protocol files

---

### 3. Thin Agent Pattern

**Decision:** Agents are "thin" — they reference protocol files for logic rather than containing it inline.

**Pattern:**
```markdown
---
name: float-update-logs
description: Decision logging...
---

Read `.float-workshop/protocols/update-logs.md` and execute the protocol.
```

**Rationale:**
- Single source of truth for protocol logic
- Agents can be regenerated without losing protocol improvements
- Protocols can evolve independently of agent wrappers
- Reduces duplication across related agents

---

### 4. Handoff Sequence Order

**Decision:** `float-update-boot` runs last in the handoff sequence.

**Sequence:**
1. `float-update-state` — Update state files (_focus, _next, _review)
2. `float-update-logs` — Create decision logs, update summaries
3. `float-update-boot` — Sync boot.md with final state

**Rationale:** boot.md should reflect the final state after all other updates complete. Running it last ensures boot contains accurate, current information.

---

## Files Changed

- `.claude/agents/float-session-boot.md` — Created
- `.claude/agents/float-session-handoff.md` — Created
- `.claude/agents/float-update-state.md` — Created
- `.claude/agents/float-update-logs.md` — Created
- `.claude/agents/float-update-boot.md` — Created

---

## Future Agent

**Work type:** decision_logger
**Suggested agent:** decision_logger buoy would create this log entry automatically at end of session

---

*Session 24: Handoff infrastructure complete — thin agents delegating to rich protocols*
