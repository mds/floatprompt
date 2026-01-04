# Boot Draft and Buoy Execution Model

**Date:** 2026-01-04
**Status:** Locked
**Session:** 16

## Decisions

### D1: Production Boot Location

**Decision:** Production boot lives at `.float/boot-draft.md` during development, renamed to `boot.md` when stable.

**Rationale:** Draft suffix makes WIP status visible in file explorer. Located in `.float/` (production location) not workshop.

### D2: Buoy Execution Model

**Decision:** TypeScript → Claude API for buoy execution. TypeScript orchestrates, Claude thinks, SQLite stores.

**Rationale:** Supports vision.md's parallelism requirements ("50 scopes changed? Spawn 50 buoys"). TypeScript can manage parallel API calls, rate limiting, and retries. More controllable than Claude Code subprocess approach.

### D3: First Buoys to Build

**Decision:** Build `scope-detector` and `decision-logger` buoys first.

**Rationale:**
- scope-detector tests generator archetype, directly supports boot's scope traversal
- decision-logger tests recorder archetype, hooks into existing log protocol
- Together they cover generation and recording — two core use cases

### D4: Path B - Boot + Buoys Co-evolution

**Decision:** Build draft boot and buoys together (WIP), evolving both as we learn.

**Rationale:** Boot and buoys are coupled — boot needs to know what buoys produce. Building them together reveals gaps in both. "WIP" framing sets correct expectations.

## Files Changed

- `.float/boot-draft.md` (created) — Production boot (draft)
- `src/buoys/templates/scope-detector.md` (created) — Scope detection buoy
- `src/buoys/templates/decision-logger.md` (created) — Decision logging buoy
- `src/buoys/execute.ts` (created) — Buoy execution engine
- `src/buoys/index.ts` (modified) — Added execute exports
- `.float-workshop/protocols/handoff.md` (modified) — Added Phase 3.5 boot update hook

## What's Built

| Component | Status |
|-----------|--------|
| boot-draft.md | ✅ Created with full structure |
| scope-detector | ✅ Template created |
| decision-logger | ✅ Template created |
| execute.ts | ✅ Skeleton with Claude API integration |
| Handoff Phase 3.5 | ✅ Added |

## What's Next

1. Install Anthropic SDK: `npm install @anthropic-ai/sdk`
2. Test execution with scope-detector
3. Test execution with decision-logger
4. Update boot-draft.md with learnings

---

*Future: This work would be done by the `decision-logger` buoy.*
