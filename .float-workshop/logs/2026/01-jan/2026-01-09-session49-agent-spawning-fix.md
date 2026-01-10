# Session 49: Agent Spawning Bug Fix

**Session:** 49
**Date:** 2026-01-09
**Status:** locked

---

## Summary

Fixed critical bug in `float-capture.sh` where YAML frontmatter in agent files was being passed to `claude -p` as CLI options, preventing agent database updates. Added `sed` filter to strip frontmatter before spawning agents.

---

## Decision

### Root Cause: YAML Frontmatter in Agent Prompts

**Problem:** When spawning agents via `claude -p "$AGENT_PROMPT"`, the YAML frontmatter (`---`) was being interpreted as CLI delimiters, breaking agent execution and preventing database updates.

**Solution:** Filter frontmatter before passing to `claude -p`:

```bash
# Before (broken):
AGENT_PROMPT=$(cat "$PLUGIN_ROOT/agents/float-log.md")
claude -p "$AGENT_PROMPT"

# After (fixed):
AGENT_PROMPT=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-log.md")
claude -p "$AGENT_PROMPT"
```

---

## Rationale

**Why this happened:** Agent files use YAML frontmatter for Claude Code metadata (name, description). This is standard for `.claude/` files but conflicts with shell argument parsing when passed directly to `claude -p`.

**Why this fix:** `sed '/^---$/,/^---$/d'` removes lines between (and including) the first and second `---` delimiter, leaving only the markdown content that Claude's `-p` mode can process correctly.

**Impact:** Restores database update capability for both `float-log` and `float-enrich` agents, enabling session continuity and context enrichment.

---

## Verification

- **Symptom resolved:** Database entries now successfully updated after agent spawning
- **PreCompact test:** Confirmed firing organically during normal session (hook_event="PreCompact", trigger="auto")
- **Test status:** All 11 tests now PASS (previously 10/11 pending)

---

## Files Changed

- `plugins/floatprompt/hooks/float-capture.sh` — Added `sed` filter for both agent invocations
- `plugins/floatprompt/agents/float-log.md` — No change (frontmatter now properly stripped)
- `plugins/floatprompt/agents/float-enrich.md` — No change (frontmatter now properly stripped)

---

## Testing Outcomes

| Test | Before | After |
|------|--------|-------|
| Agent database updates | FAIL | PASS |
| PreCompact hook firing | PENDING | PASS |
| Session continuity | Broken | Working |
| Full test suite | 10/11 | 11/11 PASS |

---

*Session 49: One-line fix, full restoration of agent spawning capability*
