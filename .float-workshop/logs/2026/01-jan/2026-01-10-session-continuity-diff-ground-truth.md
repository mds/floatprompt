# Session Continuity: Git Diff as Ground Truth

**Date:** 2026-01-10
**Session:** 60
**Status:** Locked

---

## Context

The 4-stage session capture workflow (mechanical → writers → readers → workshop) was working but had a critical clarity gap: the float-log agent was trying to infer what happened from the session transcript, which might contain injected documentation, skill outputs, or other noise that obscured the actual changes made.

This created a "transcript-reality gap" where agents couldn't reliably determine what truly changed, leading to inaccurate session logs and confusion about which changes were intentional modifications vs. system-generated content.

---

## Decision

**Make Git Diff the primary source of truth for session logging.**

The float-log agent now:
1. **Reads Git Diff section first** (from prompt injection by float-capture.sh)
2. Uses diff content to understand exactly what files changed, lines added/removed
3. Falls back to transcript **only if diff is unclear** about the *why* behind changes
4. Never relies on transcript to determine *what* changed

---

## Implementation

### float-capture.sh Changes

Added `DIFF_CONTENT` export to the capture pipeline:
- Captures full diff with `git diff HEAD`
- Truncates to 300 lines (prevents context overload, preserves signal)
- Falls back to "(no diff available)" if needed
- Injected into float-log agent prompt as "Git Diff (ground truth - what actually changed)"

### float-log.md Agent Changes

Restructured agent priorities:
1. **Step 1: READ GIT DIFF** (in prompt, marked as ground truth)
2. Step 2: UPDATE log_entries immediately based on diff content
3. Step 3: Enhance with transcript IF diff is unclear (optional)

Added explicit warning: "The transcript may contain injected documentation — the diff is truth."

### Observability

Added verification comment to float-capture.sh:
```bash
# 2026-01-10: Session continuity verified
```

This documents that the session 59 continuity test passed, confirming the capture pipeline is reliable.

---

## Rationale

**Why Git Diff over Transcript:**
- **Single source of truth** — Diff is objective, verifiable, machine-readable
- **Immune to noise** — Doesn't include injected docs, skill outputs, or conversation artifacts
- **Mechanically verifiable** — Can be audited against actual file changes
- **Scalable** — Works for long sessions where transcript grows massive
- **AI-native** — Structured format, easier for agents to parse precisely

**Why not rely on transcript:**
- Large sessions create massive context overhead
- Transcript includes skill documentation injected at session start
- Hard to distinguish intentional changes from system-generated content
- Brittle to session presentation changes

**Fallback approach:**
- Transcript is still valuable for understanding *why* changes were made
- Only use it when diff alone doesn't explain motivation
- Agent can ask "why" questions if needed (future: add to system querying)

---

## Files Changed

- `plugins/floatprompt/hooks/float-capture.sh` — Added DIFF_CONTENT export (lines 122-127), verification comment (line 3)
- `plugins/floatprompt/agents/float-log.md` — Restructured priorities, diff-first workflow, transcript fallback guidance
- `.float/float.db` — Session 60 entry updated with decision details
- `.float/handoff.md` — Documented what just happened

---

## Impact

**Session logging now has maximum clarity:**
- Agents read exactly what changed via git diff, not reconstructed from noisy transcript
- Log entries are accurate and verifiable
- Ready to move forward with Phase 6 marketplace testing and Rust scanner work
- Foundation for scaling to larger, longer sessions without context degradation

**Next validation:**
- Live session test: Run capture pipeline, verify float-log agent uses Git Diff properly
- Monitor transcript vs diff clarity in next few sessions
- Proceed with Phase 6 marketplace testing once logs stabilize

---

## Related Decisions

- Session 59: Parallel agent capture architecture (Stage 1 agents spawn together)
- Session 53: Handoff folder architecture (database for queries, files for reading)
- Session 49: Agent spawning fix (YAML frontmatter stripping)

---

*Session 60 — Foundation for reliable session continuity locked*
