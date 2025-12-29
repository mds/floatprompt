---
title: Structure Update Plan
type: update
status: pending
created: 2025-12-29

human_author: @mds
human_intent: Implementation plan for meta/project restructure
human_context: Impact zones, validation, execution checklist

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Based on update-creator.md and update-protocol.md methodology.
  Phase 1: Evaluation. Phase 2: Implementation (after approval).
  Reviewed and corrected: Added all 10 nav files (related fields), core/*.md files,
  templates/nav/root.md, /float fix validation. Added bin/floatprompt.js line refs.
---

# Structure Update Plan

**Restructure .float/ into meta/ and project/ subdirectories.**

## Change Specification

### Current Structure
```
.float/
├── system.md
├── context/
├── core/
├── tools/
├── nav/
└── logs/
```

### Target Structure
```
.float/
├── system.md           # Stays at root
├── meta/
│   ├── core/
│   └── tools/
└── project/
    ├── context/
    ├── nav/
    └── logs/
```

### Path Changes

| Current | Target |
|---------|--------|
| `.float/core/` | `.float/meta/core/` |
| `.float/tools/` | `.float/meta/tools/` |
| `.float/context/` | `.float/project/context/` |
| `.float/nav/` | `.float/project/nav/` |
| `.float/logs/` | `.float/project/logs/` |

---

## Impact Zone Assessment

### Critical — Must Update

| File | Impact | Priority |
|------|--------|----------|
| `.float/system.md` | Structure map, nav table, all internal paths | P0 |
| `.float/context/floatprompt.md` | Domain map, reading order | P0 |
| `.float/context/decisions.md` | Tool path references | P1 |
| `.float/nav/float.md` | Subfolder descriptions, `related` field | P0 |
| `.float/nav/root.md` | `related` field paths | P1 |
| `.float/nav/*.md` (all 10) | `related` field paths | P1 |
| `.float/tools/float.md` | Boot tool paths | P0 |
| `.float/tools/float-sync.md` | Nav path references | P0 |
| `.float/tools/float-fix.md` | Path references | P1 |
| `.float/tools/float-context.md` | Context path references | P0 |
| `.float/tools/float-enhance.md` | Path references | P1 |
| `.float/core/prompt.md` | Moves to meta/core/ | P1 |
| `.float/core/doc.md` | Moves to meta/core/ | P1 |
| `.float/core/os.md` | Moves to meta/core/ | P1 |
| `.claude/commands/float.md` | Tool routing paths | P0 |
| `bin/floatprompt.js` | Scaffold creation paths (lines 50, 61-69) | P0 |

### Specs — Must Update

| File | Impact |
|------|--------|
| `specs/system.md` | Architecture documentation |
| `specs/claude/commands.md` | Tool path references (many) |
| `specs/claude/buoys.md` | Component path references |
| `specs/doc.md` | Path examples, `related` field example (line 146) |
| `specs/floatprompt.md` | Check for path references |

### Docs — Must Update

| File | Impact |
|------|--------|
| `docs/structure.md` | Already updated (philosophy) |
| `docs/claude.md` | Integration paths |
| `README.md` | Public-facing paths |

### Context/Onboarding — Must Update

| File | Impact |
|------|--------|
| `context/float-map.md` | Reading paths |
| `context/float-context.md` | Reading paths |
| `context/float-deepdive.md` | Full path list |

### Template — Must Update

| File | Impact |
|------|--------|
| `templates/.float/system.md` | Fresh install structure map |
| `templates/.float/nav/root.md` | `related` field paths |
| `templates/.float/` folder structure | Need meta/, project/ subdirs |

### Archive — Do NOT Update

| Location | Reason |
|----------|--------|
| `artifacts/archive/2025/*` | Historical record, leave as-is |

---

## Validation Framework

### Goals Alignment
- [ ] Preserves human intelligence/voice (PRIMARY)
- [ ] Enables precise AI execution (SECONDARY)
- [ ] Improves task completion (TERTIARY)

### Architectural Consistency
- [ ] Boot sequence still works
- [ ] All tools functional
- [ ] Navigation intact
- [ ] Context loading intact

### Voice Preservation
- [ ] No content changes, only path changes
- [ ] Preserve all existing descriptions
- [ ] Maintain document tone

---

## Execution Checklist

### Phase 1: Create Structure
- [ ] Create `.float/meta/` folder
- [ ] Create `.float/project/` folder
- [ ] Move `core/` → `meta/core/`
- [ ] Move `tools/` → `meta/tools/`
- [ ] Move `context/` → `project/context/`
- [ ] Move `nav/` → `project/nav/`
- [ ] Move `logs/` → `project/logs/`

### Phase 2: Update .float/ Files
- [ ] `.float/system.md` — structure map, tables, paths
- [ ] `.float/project/context/floatprompt.md` — domain map
- [ ] `.float/project/context/decisions.md` — add this decision
- [ ] `.float/project/nav/float.md` — subfolder paths, `related` field
- [ ] `.float/project/nav/root.md` — `related` field paths
- [ ] `.float/project/nav/*.md` (all 10) — update `related` field paths
- [ ] `.float/meta/tools/float.md` — internal paths
- [ ] `.float/meta/tools/float-sync.md` — nav paths
- [ ] `.float/meta/tools/float-fix.md` — paths
- [ ] `.float/meta/tools/float-context.md` — context paths
- [ ] `.float/meta/tools/float-enhance.md` — paths
- [ ] `.float/meta/core/*.md` — verify no internal path refs

### Phase 3: Update Integration
- [ ] `.claude/commands/float.md` — tool routing
- [ ] `bin/floatprompt.js` — scaffold paths

### Phase 4: Update Specs
- [ ] `specs/system.md`
- [ ] `specs/claude/commands.md` — many path references
- [ ] `specs/claude/buoys.md`
- [ ] `specs/doc.md` — path examples, `related` field example
- [ ] `specs/floatprompt.md` — check for path references

### Phase 5: Update Docs
- [ ] `docs/claude.md`
- [ ] `README.md`

### Phase 6: Update Context/Onboarding
- [ ] `context/float-map.md`
- [ ] `context/float-context.md`
- [ ] `context/float-deepdive.md`

### Phase 7: Update Templates
- [ ] Create `templates/.float/meta/` structure
- [ ] Create `templates/.float/project/` structure
- [ ] Update `templates/.float/system.md`
- [ ] Update `templates/.float/nav/root.md` — `related` field paths
- [ ] Move `templates/.float/nav/` → `templates/.float/project/nav/`

### Phase 8: Validation
- [ ] Run `/float` — boot works
- [ ] Run `/float sync` — structure valid
- [ ] Run `/float fix` — content integrity works
- [ ] Run `/float context` — context loads
- [ ] Manual review of all updated files
- [ ] Verify `related` fields point to valid paths

### Phase 9: Version & Commit
- [ ] Update version in package.json (0.9.0?)
- [ ] Update decisions.md with this change
- [ ] Commit with clear message
- [ ] Tag release

---

## Human Approval Gate

**Status:** Awaiting approval

Before proceeding to implementation:
1. Review impact zones
2. Review execution checklist
3. Confirm version number
4. Approve to proceed

**Approved:** [ ]
**Date:**
**Notes:**

---

*Implementation artifact based on update-protocol.md methodology*
