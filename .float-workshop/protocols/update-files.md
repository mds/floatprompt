# Update Files

**Purpose:** Move/categorize docs and update folder indexes.

**Called by:** `handoff.md` (when docs change status)

---

## What This Updates

| Index | Folder | Contains |
|-------|--------|----------|
| `foundation.md` | `docs/foundation/` | Vision, orientation |
| `specs.md` | `docs/specs/` | Locked implementations |
| `backlog.md` | `docs/backlog/` | Parked + blocked work |

---

## When to Run

- Doc status changes (tabled → active, draft → locked)
- Work moves between categories
- New doc created
- Doc superseded or archived

**Not every session** — only when file organization changes.

---

## Protocol

### Step 1: Identify Changes

What docs changed status this session?
- [ ] New doc created → add to appropriate folder + index
- [ ] Doc completed → move to specs/, update specs.md
- [ ] Doc tabled → move to backlog/, update backlog.md
- [ ] Doc blocked → update backlog.md blocked section
- [ ] Doc superseded → move to backlog/, note in backlog.md

### Step 2: Move Files (if needed)

```bash
# Example: move completed spec
git mv docs/plugin-architecture.md docs/specs/plugin-architecture.md
```

### Step 3: Update Folder Index

Update the relevant `folder.md` file:

**foundation.md:**
```markdown
| Doc | Summary |
|-----|---------|
| `new-doc.md` | Brief description |
```

**specs.md:**
```markdown
| Spec | Status | Summary |
|------|--------|---------|
| `new-spec.md` | Locked | Brief description |
```

**backlog.md:**
```markdown
## Parked
| Doc | Status | Why Parked |
|-----|--------|------------|
| `tabled-doc.md` | Tabled | Reason |

## Blocked
| Doc | Blocked By | Unblocks When |
|-----|------------|---------------|
| `blocked-doc.md` | Dependency | Condition |
```

---

## Status Definitions

| Status | Meaning | Location |
|--------|---------|----------|
| Active | Being worked on | `docs/` root or `_2_focus` reference |
| Locked | Implemented, stable | `docs/specs/` |
| Tabled | Intentionally paused | `docs/backlog/` |
| Blocked | Waiting on dependency | `docs/backlog/` (blocked section) |
| Superseded | Replaced by newer approach | `docs/backlog/` |

---

## Consistency Check

After updates, verify:
- [ ] File exists in folder listed in index
- [ ] Index entry matches file's actual status
- [ ] No orphan files (in folder but not in index)
- [ ] No stale entries (in index but file moved/deleted)

---

*Placeholder — full protocol TBD*
