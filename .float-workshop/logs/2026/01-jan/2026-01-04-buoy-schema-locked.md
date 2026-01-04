# Buoy Schema Locked

**Date:** 2026-01-04
**Session:** 9
**Status:** LOCKED

---

## Decisions Made

### D1: 7 Buckets (Archetypes)

All AI buoys fall into one of 7 archetypes:

1. **Generators** — Create content
2. **Validators** — Check correctness
3. **Fixers** — Repair problems
4. **Mappers** — Internal connections
5. **Integrators** — External systems
6. **Orchestrators** — Coordinate buoys
7. **Recorders** — Record activity

Replaced the previous 14-category system.

### D2: Buoys Are for Judgment, Code Is for Mechanics

If a task can be done with code (TypeScript), don't make it an AI buoy. Examples:
- Scanner → TypeScript function
- Hasher → TypeScript function
- DB queries → TypeScript function

Buoys are reserved for tasks requiring AI judgment.

### D3: Hub-and-Spoke Orchestration

Buoys never talk to each other directly. All communication goes through orchestrator.

Benefits:
- Single point of validation
- Single point of normalization
- Easier debugging
- Clear visibility

### D4: Nested Hierarchy

Orchestrators can spawn other orchestrators (coordinators):
- Top Orchestrator → Human/System
- Coordinator → Parent Orchestrator
- Worker → Whoever spawned it

### D5: Buoy Schema (Locked)

```json
{
  "meta": { "id", "title", "type", "version" },
  "ai": { "role", "archetype", "sub_archetype", "autonomy" },
  "input": { "receives", "defaults.context_depth" },
  "output": { "produces" }
}
```

Plus markdown section with:
- What You Receive
- What You Produce
- Guidance
- You Decide

### D6: Schema Philosophy

- **Tight:** Identity, input contract, output contract
- **Loose:** Format, tone, thoroughness, context depth (can override)

"I receive X, I produce Y. How I fill Y is my judgment."

### D7: Dispatch Pattern

Buoy-boot files are templates (WHO). TypeScript handles dispatch (WHAT).

```typescript
await spawnBuoy({
  template: 'context-generator',
  message: 'Generate context for /src/db',
  data: { folder_path, parent_context, file_list }
})
```

---

## Files Updated

- `wip-buoys.md` — Complete rewrite with locked schema

---

## Open Questions Remaining

- Where do buoy-boot files live?
- How does orchestrator discover available buoys?
- What's minimum viable for Layer 2?
- Rename `content_md` → `context` (decided, not implemented)

---

*Locked 2026-01-04 — Session 9*
