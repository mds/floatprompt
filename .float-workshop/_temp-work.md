# Temporary Work Tracker

**Session:** 2026-01-05 (workshop reorg)
**Plan:** `docs/backlog/workshop-reorg-plan.md`

---

## This Session — DONE

- [x] Move files to foundation/, specs/, backlog/
- [x] Update folder indexes (foundation.md, specs.md, backlog.md)
- [x] Commit: "reorg: move docs to foundation/specs/backlog" ✓ (958265a)
- [x] Populate state files (_1_next, _2_focus, _3_review) with real content
- [x] Create `foundation/principles.md` (standalone+chainable, AI-native, simplicity)

### File Moves

```bash
# To foundation/
git mv docs/vision.md docs/foundation/
git mv docs/deep-context-floatprompt.md docs/foundation/

# To specs/
git mv docs/buoys.md docs/specs/
git mv docs/generate-spec.md docs/specs/
git mv docs/deep-context.md docs/specs/
git mv docs/comments.md docs/specs/

# To backlog/
git mv docs/wip-float-build-spec.md docs/backlog/
git mv docs/wip-layer-3-ongoing.md docs/backlog/
git mv docs/vercel-sdk-integration-spec.md docs/backlog/
git mv docs/float-CMS-context-management-system.md docs/backlog/
git mv docs/workshop.md docs/backlog/

# Stays at root
# docs/plugin-architecture.md
```

---

## Completed (Session 24)

### Priority 1: Protocol Updates — DONE ✓

1. **boot.md** ✓
   - Added `_2_focus.md` / `_1_next.md` references
   - Updated ALL file paths to new nested structure
   - Updated "Current State" diagram

2. **handoff.md** ✓
   - Simplified 6 phases → 5 steps orchestrating update-* protocols
   - Updated all file paths
   - Updated example session

3. **update-logs.md** ✓
   - Renamed header: "Log Protocol" → "Update Logs"
   - Updated JSON id field

4. **workshop.md** ✓
   - Fixed protocol name refs (log.md → update-logs.md, etc.)

### Priority 2: Populate State Files — DONE ✓

- [x] `_1_next.md` — queue (re-scan DB, schema cleanup, Layer 3)
- [x] `_2_focus.md` — current work (plugin-architecture)
- [x] `_3_review.md` — pending validation (workshop reorg, buoy system)

### Priority 3: Verify — DONE ✓

- [x] `workshop.md` matches reality
- [x] `logs/logs.md` paths updated
- [x] `.float/boot-draft.md` paths OK (no changes needed)

---

## Success Criteria — ALL PASS ✓

- [x] `ls docs/` shows: `foundation/`, `specs/`, `backlog/`, `plugin-architecture.md`
- [x] All protocols reference new paths correctly
- [x] boot.md reads `_2_focus.md` correctly
- [x] Handoff chain is 5-step orchestration
- [x] No broken references

---

*Delete this file after reorg complete*
