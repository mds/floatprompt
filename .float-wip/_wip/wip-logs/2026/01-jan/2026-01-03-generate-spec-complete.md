# Generate Spec Complete

**Date:** 2026-01-03
**Status:** Locked

## Decision

Created `wip-generate-spec.md` — the complete spec for `src/db/generate.ts`.

## Key Decisions

### Algorithm: Single-pass, level-order traversal

**Considered:** Two-pass (scope detection first, then content)

**Decided:** Single-pass. Level-order naturally ensures parents complete before children. No need for separate passes.

```
Depth 0: / (root)          → generate all context
Depth 1: /src, /bin, /docs → generate all context
Depth 2: /src/db, etc.     → generate all context
...
```

### Functions: 5 defined

1. `getFoldersByDepth(depth, status?)` — Level-order query
2. `getMaxDepth(status?)` — Loop control
3. `getFolderDetails(path, options?)` — Full folder info for AI
4. `updateFolderContext(path, context, ai_model)` — Write to DB
5. `getScopeChain(path)` — Scope hierarchy for context inheritance

### Orchestration: Two modes

- **Single chat:** AI calls functions as tools, processes level by level
- **Fleet mode:** TypeScript spawns buoys per level (future)

### Open Questions

7 questions remain (O1-O3, A1-A4) but spec is solid enough to implement.

## Files

- Created: `wip-generate-spec.md`
- Archived: `wip-schema-spec.md` (implemented), `wip-layer2-spec.md` (superseded)

---

*Session 5 — Layer 2 spec complete*
