# Handoff Context Optimization Discovery

**Date:** 2026-01-09
**Session:** 40
**Status:** observed (needs further investigation)

---

## Summary

Discovered that `/float-handoff` frees significant context (~120k tokens) without triggering autocompact. The Task tool (spawning agents) appears to optimize the main conversation context when agents complete.

---

## Observations

### Before Handoff
```
Free space: 14k (6.8%)
Autocompact indicator: 7% remaining
```

### After Handoff
```
Free space: 134k (66.8%)
Autocompact indicator: Still 7% (did NOT fire)
```

### Key Finding

**Autocompact did not run.** The context was freed through a different mechanism — likely related to how the Task tool handles agent completion.

---

## Hypothesis

When the Task tool spawns an agent:

1. Agent runs in **separate context window** (isolated)
2. Agent does work (reads files, makes edits, makes decisions)
3. Agent returns **only a compact summary** to main conversation
4. Claude Code **optimizes/compresses the main context** upon agent return

This is NOT autocompact (which summarizes the entire conversation). It appears to be a different optimization that happens when agents complete.

---

## Implications

### Float-handoff as Context Preservation

This behavior means `/float-handoff` acts as a **controlled context optimization point**:

| Autocompact | Float-handoff |
|-------------|---------------|
| Triggered by threshold | Triggered intentionally |
| Summarizes entire conversation | Agents preserve what matters |
| Random timing | Natural break point (session end) |
| May lose important context | We control what's captured |

### Design Insight

The handoff pattern (spawn agents → agents write to files → context freed) is actually **better than autocompact** for session preservation because:

1. Important state is captured in artifacts (logs, organization)
2. Context optimization happens at a meaningful moment
3. Next session reads artifacts, not compressed conversation

---

## Questions

1. **What exactly triggers the optimization?** Is it Task tool completion specifically, or any agent return?
2. **Is this documented behavior?** Or an undocumented side effect?
3. **Is it reliable?** Will it always free context, or only sometimes?
4. **What determines how much is freed?** Proportional to agent work? Fixed amount?

---

## Recommendation

1. Continue using `/float-handoff` as the session-end pattern
2. Investigate the mechanism further when building SessionEnd hook
3. Consider this behavior when designing PreCompact hook (may not be needed if handoff already optimizes)

---

## Update: Session 41 — Context Refills

**New observation:** The "freed" context doesn't stay freed.

| State | Context Usage |
|-------|---------------|
| Before handoff | 62% (125k) |
| Right after handoff | 11% (22k) |
| After a few exchanges | 68% (135k) |

The context came back once conversation resumed. This suggests:

1. The "optimization" may be a **measurement artifact**, not actual token reduction
2. Could be **lazy loading** — history unloaded during agents, reloaded when conversation resumes
3. The "freed" state is **temporary**, not permanent

**Revised understanding:** Handoff is still useful as a natural break point and for capturing state in artifacts, but may not actually extend the context window.

---

*Session 40: Initial discovery*
*Session 41: Observed context refills after conversation resumes*
