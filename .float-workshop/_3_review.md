# Review

**Purpose:** Done but needs validation — confirm before moving to specs/.

**Updated by:** `protocols/update-123.md`

---

## Pending Validation

### Workshop Reorg
**What:** Restructured `.float-workshop/` with kanban state files and nested docs.
**Validate:**
- [ ] `ls docs/` shows: `foundation/`, `specs/`, `backlog/`, `plugin-architecture.md`
- [ ] All protocols reference new paths correctly
- [ ] boot.md reads `_2_focus.md` correctly
- [ ] No broken references in protocols

### Buoy System (Layer 2 Infrastructure)
**Doc:** [docs/specs/buoys.md](docs/specs/buoys.md)
**Summary:** 4 buoy templates built, execution engine validated, CLI commands working.
**Validate:**
- [ ] `float-db buoy list` shows all 4 templates
- [ ] `float-db buoy execute scope-detector` runs without error
- [ ] Parallel spawning mechanism works (5.29x speedup validated)

---

## Flow

```
_3_review → specs/     (validated)
_3_review → _1_next    (rejected, needs rework)
```
