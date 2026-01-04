# Archetype Externalization Complete

**Date:** 2026-01-04
**Status:** Complete
**Session:** 14 (continuation)

## What Was Built

Implemented 3-layer composition pattern for buoy instructions:

```
Global → Archetype → Specific
```

### Files Created

**Layer 1: Global** (1 file)
- `src/buoys/global.md` — What ALL buoys share (schema philosophy, contracts, judgment boundaries)

**Layer 2: Archetypes** (7 files)
- `src/buoys/archetypes/generator.md` — Reading strategy, content quality, depth decisions
- `src/buoys/archetypes/validator.md` — Confidence framework, evidence weighting, thresholds
- `src/buoys/archetypes/fixer.md` — Repair philosophy, validation, conflict resolution
- `src/buoys/archetypes/mapper.md` — Relationship types, strength, cascade scope
- `src/buoys/archetypes/integrator.md` — External API patterns, timeout/retry, security
- `src/buoys/archetypes/orchestrator.md` — Hub-and-spoke, nested hierarchy, mechanical vs AI
- `src/buoys/archetypes/recorder.md` — Timestamps, entry format, retention, privacy

### Files Modified

**TypeScript Infrastructure**
- `src/buoys/schema.ts` — Added `GlobalGuidance`, `ArchetypeGuidance`, `ComposedBuoy` types
- `src/buoys/registry.ts` — Added `getGlobal()`, `getArchetype()`, `listArchetypes()`, `getComposed()`
- `src/buoys/dispatch.ts` — 3-layer composition in `buildSystemPrompt()`
- `src/buoys/index.ts` — Exported new types

**CLI**
- `src/cli/float-db.ts` — Added `buoy archetypes` subcommand, added `--composed` flag

**Templates**
- `src/buoys/templates/context-generator.md` — Removed duplicated generator patterns
- `src/buoys/templates/staleness-checker.md` — Removed duplicated validator patterns

## Test Results

All 5 tests passed:

| Test | Result |
|------|--------|
| Archetypes loaded | ✓ All 7 + global |
| Composition | ✓ 3 layers in correct order |
| Backward compatibility | ✓ Without --composed, only specific guidance |
| Graceful degradation | ✓ Missing files don't break system |
| Templates parse | ✓ Both templates still valid |

## CLI Usage

```bash
# List loaded archetypes
float-db buoy archetypes

# Build prompt without composition (backward compatible)
float-db buoy prompt context-generator --data '{...}'

# Build prompt WITH composition (global + archetype + specific)
float-db buoy prompt context-generator --data '{...}' --composed
```

## Benefits Achieved

1. **DRY** — Archetype guidance written once, inherited by all buoys of that type
2. **Consistency** — All generators follow same patterns
3. **Evolution** — Update archetype → all buoys improve
4. **Scalability** — 10th generator gets established patterns automatically
5. **Clarity** — Clear distinction between shared and specific guidance

## References

- Plan: `.claude/plans/melodic-strolling-snail.md`
- Prior: `2026-01-04-archetype-plan-ready.md`
- Architecture: `2026-01-04-buoy-schema-locked.md` (D1-D7)
- Assembly pattern: `2026-01-04-buoy-architecture.md`

---

*Archetype externalization implemented. Buoy system now scales to 55+ workers.*
