# Archetype Externalization Plan Ready

**Date:** 2026-01-04
**Status:** Plan Ready
**Session:** 15

---

## Decision

Archetype externalization plan is complete and ready for implementation.

**Plan location:** `/Users/mds/.claude/plans/melodic-strolling-snail.md`

---

## Summary

3-layer composition pattern to scale from 2 buoys to 55+:
- **Global layer** (1 file) — What ALL buoys share
- **Archetype layer** (7 files) — What all generators/validators/etc. share
- **Sub-archetype layer** (many files) — What THIS specific buoy does

Matches Session 8 assembly pattern: `BuoyPrompt = Global + Archetype + Specialized + DBInstructions + HandoffMessage`

---

## High Confidence Areas

- 3-layer composition pattern (verified against Session 8 logs)
- TypeScript changes (schema, registry, dispatch, index)
- Backward compatibility approach (--composed flag)
- Vision alignment (verified against docs/vision.md)
- Generator and validator archetype content

---

## Needs to be Addressed (During Implementation)

### 1. Archetype Content for Fixer, Mapper, Integrator, Orchestrator, Recorder

**Issue:** Plan outlines WHAT goes in each archetype but actual content for 5 of 7 archetypes needs to be written.

**Mitigation:** Start with generator.md and validator.md (best understood), then iterate on others based on learnings.

### 2. Orchestrator Archetype Complexity

**Issue:** The nested hierarchy (Top Orchestrator → Coordinator → Worker) and "when to spawn coordinator vs worker" decision tree may need multiple iterations to get right.

**Mitigation:** Document the rules from `docs/buoys.md` literally first, then refine based on actual usage.

### 3. Scope Detection Heuristics

**Issue:** The signals for scope detection (package.json, README, etc.) are listed but thresholds may need tuning.

**Mitigation:** Run against real folders, compare with human judgment, adjust confidence levels.

### 4. "Mechanical vs AI" Boundary in Orchestrator

**Issue:** The principle "if it can be done with code, do it with code" needs clear guidance on edge cases.

**Mitigation:** Add concrete examples during orchestrator.md implementation.

---

## Files Changed

- Created: Plan at `/Users/mds/.claude/plans/melodic-strolling-snail.md`
- This log entry

---

## Next Steps

1. Approve plan and begin implementation
2. Start with Phase 1 (create guidance files)
3. Focus on generator.md and validator.md first
4. Address "needs to be addressed" items during implementation

---

*Plan created 2026-01-04 — Session 15*
