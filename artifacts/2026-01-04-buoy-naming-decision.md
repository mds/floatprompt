<fp>
<json>
{
  "STOP": "Naming Decision: Buoys. Locked. Parallel task agents in FloatPrompt are called 'buoys' — not 'agents'.",

  "meta": {
    "title": "Buoy Naming Decision",
    "id": "buoy-naming-2026-01-04",
    "type": "decision"
  },

  "human": {
    "author": "@mds",
    "intent": "Lock the naming of parallel task workers as 'buoys'",
    "context": "Early enough to make naming decisions. FloatPrompt trademarked. Want coherent brand language."
  },

  "ai": {
    "role": "Decision recorder",
    "model": "claude-opus-4.5"
  }
}
</json>
<md>
# Buoy Naming Decision

**Date:** 2026-01-04
**Status:** Locked
**Decision:** Parallel task agents in FloatPrompt are called **buoys**.

---

## The Question

Should FloatPrompt's parallel task workers be called "buoys" or "agents"?

---

## Decision

**Buoys.**

Not agents. Not workers. Not tasks. Buoys.

---

## Rationale

### 1. Differentiation

Everyone has "agents." LangChain agents, AutoGPT agents, crew.ai agents, Claude agents. The term is commoditized. Another "agent" framework disappears into noise.

"Buoys" stands out. It's distinctive. It signals FloatPrompt is something different.

### 2. Less Threatening

"Agent" has baggage:
- Autonomous AI acting without oversight
- Job replacement fears
- Black box decision-making
- "Agentic" hype cycle fatigue

"Buoy" is calm. Water. Navigation. Safety markers. It doesn't trigger the same resistance.

### 3. Thematic Coherence

The naming fits the FloatPrompt brand:

| Term | Connection |
|------|------------|
| **Float** | Information floats to the surface |
| **Prompt** | Structured instructions |
| **Buoy** | Anchored, floating, guiding |

Buoys are:
- **Anchored** — to context (SQLite, folder structure)
- **Floating** — information surfaces where needed
- **Guiding** — navigation aids, orientation
- **Warning** — mark boundaries, gotchas, danger zones
- **Accepted** — nobody questions buoys on a lake

### 4. Concrete Visual

You can picture a buoy. Red and white. Bobbing on water. Marking a no-wake zone.

You can't really picture an "agent." It's abstract. Concrete beats abstract for memory and recognition.

### 5. Personal Authenticity

The term came from somewhere real — skiing at the lake as a kid, buoys marking zones, anchored to the bottom. Not manufactured by a branding committee.

Authentic origin > focus-grouped terminology.

---

## Counterarguments Considered

### "Learning curve"

Developers will ask "what's a buoy?" the first time.

**Response:** You explain it once, it sticks. The metaphor is strong enough to carry itself. And the explanation itself ("parallel workers that float context where needed") reinforces the FloatPrompt mental model.

### "Could feel precious"

Some developers resist non-technical terminology.

**Response:** Those developers also resist anything new. The ones who matter will appreciate the clarity and differentiation. FloatPrompt isn't trying to be everything to everyone.

### "Agent is the standard term"

Industry uses "agent" — shouldn't we align?

**Response:** FloatPrompt is infrastructure, not another agent framework. The naming should signal that difference. We're not competing with LangChain. We're building the layer underneath.

---

## Implications

### Documentation

All docs use "buoy" for parallel task workers:
- `wip-buoys.md` — Worker catalog (already named correctly)
- `docs/maintainer/buoys.md` — Buoy documentation
- Tool files — Reference buoys, not agents

### Code

```typescript
// Yes
spawnBuoy('context_generator', { folder: '/src/db' });

// No
spawnAgent('context_generator', { folder: '/src/db' });
```

### Communication

When explaining FloatPrompt:
- "Buoys are parallel workers that..."
- "You can spawn buoys to..."
- "Each buoy handles a scoped task..."

Not:
- "FloatPrompt agents..."
- "Our agent framework..."

---

## The Metaphor

A lake with buoys:

```
                    🔴 No-wake zone
                         |
    ⛵ ─────────────────────────────────────
                         |
                    🟡 Channel marker
                         |
    ─────────────────────────────────────────
                         |
                    🟢 Safe zone
```

Buoys don't drive the boat. They orient the captain. They mark boundaries. They float but they're anchored. They're just there — everyone accepts them.

That's what FloatPrompt buoys do for AI navigating a codebase.

---

## Related

- `wip-buoys.md` — Full worker catalog
- `docs/maintainer/buoys.md` — Buoy system documentation
- `artifacts/2026-01-04-buoy-recon.md` — Complete buoy architecture context

---

*Locked 2026-01-04 — The name is buoys.*
</md>
</fp>
