---
title: Context Optimization Pattern
type: discovery
status: observed
created: 2026-01-09

human_author: "@mds"
human_intent: Document the discovered behavior where spawning agents frees context

ai_model: Claude Opus 4.5
ai_notes: Observed during Session 40. Mechanism not fully understood but behavior is consistent.
---

# Context Optimization Pattern

> **Discovery:** Spawning agents via the Task tool appears to optimize/free main conversation context when agents complete — without triggering autocompact.

---

## The Observation

During `/float-handoff`, context usage dropped dramatically:

| Metric | Before Handoff | After Handoff |
|--------|----------------|---------------|
| Free space | 14k (6.8%) | 134k (66.8%) |
| Autocompact | Did not fire | Did not fire |
| Context freed | — | ~120k tokens |

**Autocompact was not triggered.** The context was freed through a different mechanism.

---

## The Pattern

```
Main conversation (high context usage)
    │
    ├── Spawn agent via Task tool
    │   └── Agent runs in SEPARATE context window
    │   └── Agent does work (reads, writes, decides)
    │   └── Agent returns SUMMARY to main
    │
    └── Main conversation context is OPTIMIZED
        └── Significant tokens freed
        └── Conversation continues with more headroom
```

---

## Why This Matters for FloatPrompt

### Handoff as Controlled Optimization

`/float-handoff` spawns agents that:
1. Capture session state (logs, decisions)
2. Organize workshop (files, indexes)
3. Return compact summaries

The side effect: **Context is freed at a natural break point.**

### Better Than Autocompact

| Autocompact | Handoff Pattern |
|-------------|-----------------|
| Threshold-triggered (unpredictable) | Intentionally triggered |
| Summarizes everything | Agents preserve what matters |
| May lose important context | State captured in artifacts |
| Happens mid-work | Happens at session end |

### Implications for Hook Design

If spawning agents inherently optimizes context:
- **SessionEnd hook** spawning preservation agents = automatic optimization
- **PreCompact hook** may be less critical (handoff already optimizes)
- The "preservation pipeline" pattern is self-reinforcing

---

## Update: Context Refills (Session 41)

**New observation:** The "freed" context doesn't stay freed.

| State | Context Usage |
|-------|---------------|
| Before handoff | 62% (125k) |
| Right after handoff | 11% (22k) |
| After a few exchanges | 68% (135k) |

**The context came back.** Once the conversation resumed (user typed, Claude responded), usage returned to similar levels.

### Revised Hypothesis

The "optimization" may not actually free tokens permanently. Possible explanations:

1. **Measurement timing** — Context is measured differently during/after agent execution
2. **Lazy loading** — Conversation history might be temporarily "unloaded" during agent runs, then reloaded when conversation resumes
3. **Compression state** — There may be a compressed state that gets re-expanded when needed

### Implications

- The pattern is **reproducible** but may not provide **permanent** context savings
- The "freed" state is **temporary** — lasts until conversation resumes
- May be a **measurement artifact** rather than actual token reduction
- **Still useful** for session breaks (natural pause point) but not for extending context window

### What We Don't Know

- Is the full conversation history always preserved?
- Does the "freed" state do anything useful (e.g., reduce latency during agents)?
- Is this intentional behavior or a side effect?

---

## Open Questions

1. **Is this Task tool behavior specifically?** Or any subprocess?
2. **What determines how much is freed?** Agent complexity? Return size?
3. **Is this Claude Code behavior?** Or Anthropic API behavior?
4. **Is it documented anywhere?** (Not found in public docs as of 2026-01-09)
5. **Why does context refill?** Is the history always there, just measured differently?
6. **Is the "freed" state useful at all?** Or purely cosmetic?

---

## Recommended Practice

Until the mechanism is fully understood:

1. **Use `/float-handoff` before context fills** — Don't wait for autocompact
2. **Spawn agents for preservation** — They capture state AND free context
3. **Design for the pattern** — SessionEnd hook should spawn multiple agents
4. **Observe and document** — Track if behavior is consistent

---

## Related

- `logs/2026/01-jan/2026-01-09-handoff-context-optimization.md` — Original observation
- `.claude/commands/float-handoff.md` — The handoff command
- `.claude/agents/draft/README.md` — Future agent architecture

---

*Discovered Session 40 (2026-01-09) — Mechanism TBD, behavior observed*
