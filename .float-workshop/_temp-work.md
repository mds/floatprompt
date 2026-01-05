# Temp Work: docs/ → work/ reorg

**Session:** 2026-01-05
**Scope:** Rename + flatten docs structure

---

## Why

**Workbench metaphor:**
- `work/` root = **on the bench** (active files, visible)
- `work/reference/` = **drawer** (stable docs you reach for)
- `work/backlog/` = **drawer** (parked, not active)

**Problems with old structure:**
- `foundation/` vs `specs/` was arbitrary — both are just "reference"
- Active files at `docs/` root was implicit, not explicit
- "foundation" and "specs" are too concrete when they're all just reference material

**New model:** 3 states, 3 locations
1. On bench → `work/*.md`
2. Reference → `work/reference/`
3. Parked → `work/backlog/`

---

## The Change

```
BEFORE                          AFTER
docs/                           work/
├── plugin-architecture.md      ├── plugin-architecture.md  (bench)
├── foundation/                 │
│   ├── vision.md              ├── reference/               (merged)
│   └── deep-context-fp.md     │   ├── vision.md
├── specs/                      │   ├── deep-context-floatprompt.md
│   ├── buoys.md               │   ├── buoys.md
│   ├── generate-spec.md       │   ├── generate-spec.md
│   ├── deep-context.md        │   ├── deep-context.md
│   └── comments.md            │   └── comments.md
└── backlog/                    │
    └── ...                     └── backlog/  (unchanged contents)
```

---

## File Moves — DONE ✓

Structure is already correct:
```
work/
├── plugin-architecture.md    ✓
├── reference/                ✓ (7 files)
│   ├── vision.md
│   ├── buoys.md
│   ├── generate-spec.md
│   ├── deep-context.md
│   ├── deep-context-floatprompt.md
│   ├── comments.md
│   └── principles.md
└── backlog/                  ✓
```

**Remaining:** Path references + index creation

---

## Path Updates Needed

### protocols/boot.md
- [ ] `docs/plugin-architecture.md` → `work/plugin-architecture.md`
- [ ] `docs/foundation/vision.md` → `work/reference/vision.md`
- [ ] `docs/foundation/deep-context-floatprompt.md` → `work/reference/deep-context-floatprompt.md`
- [ ] `docs/specs/buoys.md` → `work/reference/buoys.md`
- [ ] `docs/specs/generate-spec.md` → `work/reference/generate-spec.md`
- [ ] `docs/specs/deep-context.md` → `work/reference/deep-context.md`
- [ ] `docs/specs/comments.md` → `work/reference/comments.md`
- [ ] `docs/backlog/*` → `work/backlog/*`
- [ ] Update "Current State" diagram

### protocols/handoff.md
- [ ] Any `docs/` references

### protocols/update-files.md
- [ ] `docs/foundation/`, `docs/specs/`, `docs/backlog/` refs

### workshop.md
- [ ] Update folder structure diagram
- [ ] Update all `docs/` → `work/`

### State files
- [ ] `_2_focus.md` — `docs/plugin-architecture.md` → `work/plugin-architecture.md`
- [ ] `_2_focus.md` — context links
- [ ] `_1_next.md` — any doc refs
- [ ] `_3_review.md` — any doc refs

### logs/logs.md
- [ ] `docs/foundation/vision.md` → `work/reference/vision.md`

### work/backlog/*.md (2 files have refs)
- [ ] `backlog.md` — sibling folder refs + add definition (backlog = not done yet)
- [ ] `float-CMS-context-management-system.md` — docs/ refs
- [ ] `vercel-sdk-integration-spec.md` — docs/ refs

### Archive completed plan
- [ ] `git mv work/backlog/workshop-reorg-plan.md artifacts/` (done = artifacts)

---

## New Index

Create `work/reference/reference.md`:
```markdown
# Reference

Stable docs. Reach for these when needed.

| Doc | Purpose |
|-----|---------|
| `vision.md` | North star — the why |
| `buoys.md` | Buoy architecture (LOCKED) |
| `generate-spec.md` | Layer 2 generation spec |
| `deep-context.md` | Deep context spec (LOCKED) |
| `deep-context-floatprompt.md` | System orientation |
| `comments.md` | Code comment standards |
| `principles.md` | Core design principles |
```

---

## Verify

- [ ] `ls work/` shows: `plugin-architecture.md`, `reference/`, `backlog/`
- [ ] `ls work/reference/` shows 7 files (added principles.md)
- [ ] `grep -r "docs/" .float-workshop/` returns nothing (except maybe backlog.md internal refs)
- [ ] boot.md paths all resolve

---

## Commit

```bash
git commit -m "reorg: docs/ → work/, foundation+specs → reference"
```

---

*Delete after complete*
