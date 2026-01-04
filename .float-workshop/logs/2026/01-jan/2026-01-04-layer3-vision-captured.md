# Layer 3 Vision Captured

**Date:** 2026-01-04
**Status:** locked
**Session:** 18

---

## Decision

Layer 3 (Ongoing) vision fully captured in `wip-layer-3-ongoing.md`. The workshop protocols (boot, handoff, log) are the prototype for what float does automatically.

---

## Key Insights

### The Core Realization
**Repeat users are the 99% case. Optimize for them.**

First-time setup is expensive but rare. Every subsequent session should be instant.

### The Amortization Principle
You pay AI-thinking cost ONCE. Buoys run, context is generated, artifacts are written. Every subsequent session just reads those artifacts.

### Two Boot Modes
| Mode | When | Context |
|------|------|---------|
| **create-floatprompt** | First time | Full scaffolding, builds float.db |
| **snapshot boot** | Repeat sessions | Recent work weighted, <800 tokens |

### Background Buoys (During Session)
- **pattern-detector** — links conversation to folder contexts
- **decision-logger** — auto-logs decisions (already validated)
- **context-linker** — surfaces relevant prior work
- **next-steps** — "choose your adventure" generation

### The Graduation
> The workshop graduates from "how we build float" to "what float does for everyone."

Workshop protocols become automated infrastructure. The workshop becomes the override layer.

---

## Prior Art

`/fp-handoff` already builds a fresh boot.md each session. That's build-time generation. We've been doing it manually all along.

---

## Migration Path

1. **Parallel Operation** — Workshop continues, Layer 3 runs in background, compare outputs
2. **Assisted Manual** — Buoys suggest, human confirms
3. **Supervised Automatic** — Auto-log with review queue
4. **Fully Automatic** — Human only intervenes for corrections

---

## CLI Implications

New commands for Layer 3:
- `float snapshot` — generate snapshot boot
- `float boot --mode=create|snapshot`
- `float buoys start|stop|status`
- `float review` — auto-log review queue

---

## Problem Framed (6 Angles)

1. **The Repeated Tax** — 6+ operations every session
2. **Token Economy** — Value per token > raw token count
3. **Cognitive Overhead** — Assembly logic, no caching, inconsistent shape
4. **CMS Analogy** — WordPress pre-renders, FloatPrompt should too
5. **Speed Differential** — 9 steps → 2 steps
6. **Competitive Moat** — "The schema is the moat"

---

## Files Changed

- `docs/wip-layer-3-ongoing.md` — Created (full spec)

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [wip-layer-3-ongoing.md](../../docs/wip-layer-3-ongoing.md) | THE spec this decision documents |
| [float-CMS-context-management-system.md](../../docs/float-CMS-context-management-system.md) | Layer 2.5 static build (feeds into Layer 3) |
| [deep-context-floatprompt.md](../../docs/deep-context-floatprompt.md) | System overview (updated Layer 3 status) |

---

## Future Agent

**decision_logger** — This type of synthesizing discussion into structured decision would be automated by a decision-logger buoy with conversation access.

---

*Layer 3 vision captured — the workshop protocols become the spec for automated context management.*
