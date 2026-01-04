# Buoy Naming Decision

**Date:** 2026-01-04
**Status:** Locked

## Decision

Parallel task agents in FloatPrompt are called **buoys** — not "agents."

## Rationale

1. **Differentiation** — "Agent" is commoditized. Everyone has agents. Buoys stand out.

2. **Less threatening** — "Agent" has baggage (autonomous AI, job replacement, hype fatigue). "Buoy" is calm — water, navigation, safety.

3. **Thematic coherence** — Float. Prompt. Buoy. They fit. Buoys are anchored (to context), floating (information surfaces), guiding (orientation).

4. **Concrete visual** — You can picture a buoy. You can't picture an "agent."

5. **Personal authenticity** — Came from real memory (skiing at the lake as a kid), not a branding committee.

## Counterarguments Considered

- "Learning curve" → Explain once, it sticks. The metaphor carries itself.
- "Could feel precious" → Those who matter will appreciate the clarity.
- "Agent is standard" → FloatPrompt is infrastructure, not an agent framework. The naming signals that difference.

## Implications

- All docs use "buoy" for parallel task workers
- Code uses `spawnBuoy()`, not `spawnAgent()`
- Communication: "buoys are parallel workers that..."

## Files

| File | Purpose |
|------|---------|
| `artifacts/2026-01-04-buoy-naming-decision.md` | Full decision document |

---

*Locked 2026-01-04*
