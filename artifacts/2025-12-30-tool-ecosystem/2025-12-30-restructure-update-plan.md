---
title: Restructure Update Plan
type: update-plan
status: reviewed
created: 2025-12-30
related: 2025-12-30-roadmap.md, 2025-12-30-tool-ecosystem-strategy.md, .float/system.md

human_author: @mds
human_intent: Plan the .float/meta/ → .float/floatprompt/ restructure
human_context: Generated using floatprompt/update.md methodology

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  This is WS1 (Workstream 1) from the tool ecosystem roadmap.
  Impact assessment found 28+ files with references to current structure.
  Excludes archive/ files (historical record).

  Gap review (2025-12-30):
  - Added .claude/commands/float-tools.md (was missing)
  - Expanded bin/floatprompt.js detail (15+ path changes)
  - Added empty folder handling for templates
  - Added internal path updates for tool-sync.md
---

# Restructure Update Plan

**Workstream:** WS1 (from `2025-12-30-roadmap.md`)
**Change:** `.float/meta/` → `.float/floatprompt/` with new substructure

---

## Change Specification

### Current State

```
.float/
├── system.md
├── meta/
│   ├── meta.md
│   ├── floatprompt/
│   │   ├── template.md
│   │   ├── doc.md
│   │   ├── os.md
│   │   └── update.md
│   └── tools/
│       ├── float.md
│       ├── float-sync.md
│       ├── float-fix.md
│       ├── float-context.md
│       └── float-enhance.md
└── project/
    └── ...
```

### Target State

```
.float/
├── system.md
├── floatprompt/
│   ├── index.md                 # was meta.md
│   ├── core/                    # was floatprompt/
│   │   ├── template.md
│   │   ├── doc.md
│   │   ├── os.md
│   │   └── update.md
│   └── tools/                   # was tools/
│       ├── float.md
│       ├── float-sync.md
│       ├── float-fix.md
│       ├── float-context.md
│       └── float-enhance.md
└── project/
    └── ...
```

### Path Changes

| Current | Target |
|---------|--------|
| `.float/meta/` | `.float/floatprompt/` |
| `.float/meta/meta.md` | `.float/floatprompt/index.md` |
| `.float/meta/floatprompt/` | `.float/floatprompt/core/` |
| `.float/meta/tools/` | `.float/floatprompt/tools/` |
| `floatprompt/meta/` | `floatprompt/internal/` |
| (new) | `MAINTENANCE.md` at root |

---

## Impact Zone Assessment

### P0 — Must Update (Structure Files)

| File | Impact | Action |
|------|--------|--------|
| `.float/system.md` | Structure map shows old paths | Update entire structure map |
| `.float/meta/meta.md` | Being renamed | Rename to `.float/floatprompt/index.md`, update content |
| `.float/project/project.md` | References `meta/` | Update references |
| `templates/.float/system.md` | Template has old structure | Update structure map |
| `templates/.float/meta/meta.md` | Template path wrong | Move to `templates/.float/floatprompt/index.md` |
| `templates/.float/project/project.md` | References `meta/` | Update references |

### P0 — Must Update (Tools)

| File | Impact | Action |
|------|--------|--------|
| `.float/meta/tools/float.md` | Path in file, being moved | Move to `.float/floatprompt/tools/`, update internal refs |
| `.float/meta/tools/float-sync.md` | Path in file, being moved | Move, update refs |
| `.float/meta/tools/float-fix.md` | Path in file, being moved | Move, update refs |
| `.float/meta/tools/float-context.md` | Path in file, being moved | Move, update refs |
| `.float/meta/tools/float-enhance.md` | Path in file, being moved | Move, update refs |

### P0 — Must Update (Commands)

| File | Impact | Action |
|------|--------|--------|
| `.claude/commands/float.md` | Points to `.float/meta/tools/` | Update path |
| `.claude/commands/float-sync.md` | Points to `.float/meta/tools/` | Update path |
| `.claude/commands/float-fix.md` | Points to `.float/meta/tools/` | Update path |
| `.claude/commands/float-context.md` | Points to `.float/meta/tools/` | Update path |
| `.claude/commands/float-enhance.md` | Points to `.float/meta/tools/` | Update path |
| `.claude/commands/float-tools.md` | Points to `floatprompt/meta/` | Update to `floatprompt/internal/` |

### P0 — Must Update (Deployment)

| File | Impact | Action |
|------|--------|--------|
| `bin/floatprompt.js` | 15+ path references | Full path audit (see details below) |

**`bin/floatprompt.js` detailed changes:**

| Line(s) | Current | Target |
|---------|---------|--------|
| 50 | `'.float/meta/tools'` | `'.float/floatprompt/tools'` |
| 50 | `'.float/meta/floatprompt'` | `'.float/floatprompt/core'` |
| 61 | `'.float', 'meta', 'tools'` | `'.float', 'floatprompt', 'tools'` |
| 64 | `.float/meta/tools/` | `.float/floatprompt/tools/` |
| 68-73 | `'.float', 'meta', 'floatprompt'` | `'.float', 'floatprompt', 'core'` |
| 73 | `.float/meta/floatprompt/` | `.float/floatprompt/core/` |
| 77-79 | `'templates', '.float', 'meta', 'meta.md'` | `'templates', '.float', 'floatprompt', 'index.md'` |
| 79 | `.float/meta/meta.md` | `.float/floatprompt/index.md` |
| 143-145 | `'.float/meta'`, `'.float/meta/tools'`, `'.float/meta/floatprompt'` | `'.float/floatprompt'`, `'.float/floatprompt/tools'`, `'.float/floatprompt/core'` |
| 209-211 | `'.float', 'meta', 'tools'` | `'.float', 'floatprompt', 'tools'` |
| 211 | `.float/meta/tools/` | `.float/floatprompt/tools/` |
| 215-220 | `'.float', 'meta', 'floatprompt'` | `'.float', 'floatprompt', 'core'` |
| 220 | `.float/meta/floatprompt/` | `.float/floatprompt/core/` |
| 224-226 | `'templates', '.float', 'meta', 'meta.md'` | `'templates', '.float', 'floatprompt', 'index.md'` |
| 226 | `.float/meta/meta.md` | `.float/floatprompt/index.md` |

### P0 — Must Update (Source Maintainer Tools)

| File | Impact | Action |
|------|--------|--------|
| `floatprompt/meta/tool-sync.md` | Folder being renamed + internal refs | Move to `floatprompt/internal/tool-sync.md`, update all internal path refs |
| (new) `MAINTENANCE.md` | Doesn't exist | Create at root |

**`floatprompt/internal/tool-sync.md` internal path updates:**

After moving, update these internal references:
- Line 54: `.float/meta/tools/float-*.md` → `.float/floatprompt/tools/float-*.md`
- Lines 81-85: grep commands referencing `.float/meta/tools/`
- Lines 98-99: ls commands referencing `.float/meta/tools/`
- Lines 135, 144-156: All `.float/meta/tools/` references
- Lines 115-116: template sync paths (meta.md → index.md)

### P1 — Should Update (Documentation)

| File | Impact | Action |
|------|--------|--------|
| `README.md` | References `.float/meta/` | Update path references |
| `docs/claude.md` | References structure | Update structure references |
| `docs/structure.md` | Documents `.float/` structure | Full rewrite of structure section |
| `specs/system.md` | Formal spec of structure | Update structure map |
| `specs/claude/commands.md` | References tool paths | Update paths |
| `specs/doc.md` | References meta.md | Update references |
| `.float/project/context/floatprompt.md` | Domain map shows old paths | Update domain map |
| `.float/project/context/decisions.md` | Historical refs OK, add new decision | Add decision entry |
| `floatprompt/meta/tool-sync.md` | Maintainer tool, refs paths | Update paths |
| `package.json` | May have path refs | Check and update if needed |

### Do NOT Update

| Location | Reason |
|----------|--------|
| `artifacts/archive/2025/*` | Historical record — preserve as-is |
| `artifacts/2025-12-30-*.md` | Today's artifacts — reference old AND new |

---

## Validation Framework

### Goals Alignment
- [ ] Preserves human intelligence/voice (PRIMARY) — no content changes beyond paths
- [ ] Enables precise AI execution (SECONDARY) — clearer structure naming
- [ ] Improves task completion (TERTIARY) — room for types/, manual.md

### Architectural Consistency
- [ ] `/float` boot works after change
- [ ] `/float-sync` runs successfully
- [ ] All command → tool paths resolve
- [ ] `npx floatprompt` deploys correct files

### Structural Integrity
- [ ] No broken internal references
- [ ] All `related:` fields updated
- [ ] Structure maps match reality
- [ ] Templates match deployed structure

---

## Execution Checklist

### Phase 1: Create New Structure
- [ ] Create `.float/floatprompt/` directory
- [ ] Create `.float/floatprompt/core/` directory
- [ ] Create `.float/floatprompt/tools/` directory
- [ ] Rename `floatprompt/meta/` → `floatprompt/internal/`

### Phase 2: Move Files
- [ ] Move `.float/meta/floatprompt/*` → `.float/floatprompt/core/`
- [ ] Move `.float/meta/tools/*` → `.float/floatprompt/tools/`
- [ ] Move `.float/meta/meta.md` → `.float/floatprompt/index.md`

### Phase 3: Update Core Files
- [ ] Update `.float/system.md` structure map
- [ ] Update `.float/floatprompt/index.md` content (was meta.md)
- [ ] Update `.float/project/project.md` references

### Phase 4: Update Tools (internal refs)
- [ ] Update `.float/floatprompt/tools/float.md`
- [ ] Update `.float/floatprompt/tools/float-sync.md`
- [ ] Update `.float/floatprompt/tools/float-fix.md`
- [ ] Update `.float/floatprompt/tools/float-context.md`
- [ ] Update `.float/floatprompt/tools/float-enhance.md`

### Phase 5: Update Commands
- [ ] Update `.claude/commands/float.md`
- [ ] Update `.claude/commands/float-sync.md`
- [ ] Update `.claude/commands/float-fix.md`
- [ ] Update `.claude/commands/float-context.md`
- [ ] Update `.claude/commands/float-enhance.md`
- [ ] Update `.claude/commands/float-tools.md` (points to `floatprompt/internal/`)

### Phase 6: Update Deployment
- [ ] Update `bin/floatprompt.js` paths (15+ changes — see detailed table in Impact Assessment)
- [ ] Check `package.json` for path refs

### Phase 7: Update Templates
- [ ] Create `templates/.float/floatprompt/` directory
- [ ] Create `templates/.float/floatprompt/core/` directory (empty, for structure)
- [ ] Create `templates/.float/floatprompt/tools/` directory (empty, for structure)
- [ ] Move `templates/.float/meta/meta.md` → `templates/.float/floatprompt/index.md`
- [ ] Update `templates/.float/floatprompt/index.md` content (paths, references)
- [ ] Update `templates/.float/system.md` (structure map)
- [ ] Update `templates/.float/project/project.md` (meta → floatprompt refs)
- [ ] Remove empty `templates/.float/meta/floatprompt/` directory
- [ ] Remove empty `templates/.float/meta/tools/` directory
- [ ] Remove empty `templates/.float/meta/` directory

### Phase 8: Update Documentation
- [ ] Update `README.md`
- [ ] Update `docs/claude.md`
- [ ] Update `docs/structure.md`
- [ ] Update `specs/system.md`
- [ ] Update `specs/claude/commands.md`
- [ ] Update `specs/doc.md`
- [ ] Update `.float/project/context/floatprompt.md`
- [ ] Add decision to `.float/project/context/decisions.md`
- [ ] Update `floatprompt/internal/tool-sync.md` internal path references (see detailed list in Impact Assessment)
- [ ] Create `MAINTENANCE.md` at root

### Phase 9: Cleanup & Validation
- [ ] Remove empty `.float/meta/` directory
- [ ] Remove empty `templates/.float/meta/` directory
- [ ] Run `/float` — verify boot works
- [ ] Run `/float-sync` — verify no issues
- [ ] Test `npx floatprompt` in temp directory

---

## Human Approval Gate

**Status:** Gap review complete, ready for final approval

Before proceeding:
1. [x] Review impact zones — any files missing? *(Gap review 2025-12-30: 5 gaps found and fixed)*
2. [ ] Review execution phases — order correct?
3. [ ] Confirm scope is complete
4. [ ] Approve to proceed

**Approved:** [ ]
**Date:**
**Notes:**

---

## Post-Execution

After restructure complete:
- [ ] Commit with clear message documenting the change
- [ ] Update `2025-12-30-roadmap.md` to mark WS1 complete
- [ ] Proceed to WS2: Create `MAINTENANCE.md` (quick win per roadmap)
- [ ] Then proceed to WS3: Build Tool System (manual.md, types/, float-build.md)

See `2025-12-30-roadmap.md` for full workstream dependencies and coordination.

---

*Generated using floatprompt/update.md methodology*
