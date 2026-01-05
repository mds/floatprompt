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

## Next Session

**Entry:** `claude -p "Read .float-workshop/_temp-work.md and continue workshop reorg"`

### Priority 1: Protocol Updates (HEAVY)

Read `docs/backlog/workshop-reorg-plan.md` for full details.

1. **Update boot.md** (~15-20k tokens)
   - Point to `_2_focus.md` for current work
   - Point to `_1_next.md` for queue
   - Update ALL file paths (docs/*.md → docs/foundation/*.md, etc.)
   - See plan for full reference list

2. **Update handoff.md** (~15-20k tokens)
   - Simplify 6 phases → 2 protocols (update-logs + update-state)
   - Update all file paths
   - Rewrite "What This Replaces" section

3. **Update update-logs.md** (~5k tokens)
   - Rename header: "Log Protocol" → "Update Logs"
   - Update JSON id field
   - Align with new structure

4. **Create update-state.md** (combine 123 + files)
   - Merge update-123.md + update-files.md
   - Add conditional: always do 123, optionally do files

### Priority 2: Populate State Files — DONE

- [x] `_1_next.md` — queue (re-scan DB, schema cleanup, Layer 3)
- [x] `_2_focus.md` — current work (plugin-architecture)
- [x] `_3_review.md` — pending validation (workshop reorg, buoy system)

### Priority 3: Verify

- Update `workshop.md` to match reality
- Check `logs/logs.md` for stale paths
- Check `.float/boot-draft.md` for stale paths

### Commit + Tag

```bash
git commit -m "reorg: update protocols for new structure"
git tag workshop-reorg-v1
```

---

## Success Criteria

- [ ] `ls docs/` shows: `foundation/`, `specs/`, `backlog/`, `plugin-architecture.md`
- [ ] All protocols run without path errors
- [ ] boot.md reads _2_focus.md correctly
- [ ] Handoff chain completes
- [ ] No broken references

---

*Delete this file after reorg complete*
