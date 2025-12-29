---
title: Naming Update Plan
type: update
status: pending
created: 2025-12-29

human_author: @mds
human_intent: Rename core/ to floatprompt/ with consistent file naming
human_context: "floatprompt" not "floatprompts" — like JavaScript, not JavaScripts

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Follow-up to structure-update.md (meta/project migration).
  Apply AFTER v0.9.0 structure migration is committed.
  Uses floatprompt-update methodology.
---

# Naming Update Plan

**Rename `.float/meta/core/` to `.float/meta/floatprompt/` with consistent file naming.**

## Change Specification

### Current Structure
```
.float/meta/core/
├── prompt.md
├── doc.md
├── os.md
└── update.md
```

### Target Structure
```
.float/meta/floatprompt/
├── floatprompt-template.md    # was prompt.md
├── floatprompt-doc.md         # was doc.md
├── floatprompt-os.md          # was os.md
└── floatprompt-update.md      # was update.md
```

### Path Changes

| Current | Target |
|---------|--------|
| `.float/meta/core/` | `.float/meta/floatprompt/` |
| `core/prompt.md` | `floatprompt/floatprompt-template.md` |
| `core/doc.md` | `floatprompt/floatprompt-doc.md` |
| `core/os.md` | `floatprompt/floatprompt-os.md` |
| `core/update.md` | `floatprompt/floatprompt-update.md` |

### Naming Rationale

- **floatprompt/** not **floatprompts/** — like "JavaScript" not "JavaScripts"
- **floatprompt-{function}.md** — clear, consistent, searchable
- **floatprompt-template.md** not **floatprompt-prompt.md** — describes purpose, not format

---

## Impact Zone Assessment

### Critical — Must Update

| File | Impact | Priority |
|------|--------|----------|
| `.float/system.md` | Structure map references meta/core/ | P0 |
| `.float/project/nav/float.md` | Subfolder descriptions, `related` field | P0 |
| `.float/project/nav/core.md` | Rename to floatprompt.md, update all refs | P0 |
| `.float/project/context/floatprompt.md` | Domain map references | P1 |
| `bin/floatprompt.js` | Scaffold creation paths | P0 |

### Tools — Must Update

| File | Impact |
|------|--------|
| `.float/meta/tools/float-context.md` | References core/*.md for context loading |

### Specs — Must Update

| File | Impact |
|------|--------|
| `specs/system.md` | Structure documentation |
| `specs/claude/commands.md` | Tool path references |

### Docs — Must Update

| File | Impact |
|------|--------|
| `README.md` | Public-facing paths |
| `docs/philosophy/naming.md` | References core/ |
| `docs/philosophy/orientation.md` | References core/ |

### Context/Onboarding — Must Update

| File | Impact |
|------|--------|
| `context/float-map.md` | Reading paths |
| `context/float-context.md` | Reading paths |
| `context/float-deepdive.md` | Full path list |

### Templates — Must Update

| File | Impact |
|------|--------|
| `templates/.float/system.md` | Fresh install structure map |
| `templates/.float/meta/core/` | Rename folder and files |

### Archive — Do NOT Update

| Location | Reason |
|----------|--------|
| `artifacts/archive/*` | Historical record |
| `artifacts/structure-update.md` | Historical record of previous migration |
| `artifacts/float-npm-scaffold-spec.md` | May need update OR archive |

---

## Validation Framework

### Goals Alignment
- [ ] Preserves human intelligence/voice (PRIMARY)
- [ ] Enables precise AI execution (SECONDARY)
- [ ] Improves naming clarity (TERTIARY)

### Architectural Consistency
- [ ] Boot sequence still works
- [ ] All tools functional
- [ ] Navigation intact
- [ ] Scaffold (npx floatprompt) works

### Voice Preservation
- [ ] No content changes, only path/name changes
- [ ] Preserve all existing descriptions
- [ ] Maintain document tone

---

## Execution Checklist

### Phase 1: Rename Folder & Files
- [ ] Rename `.float/meta/core/` → `.float/meta/floatprompt/`
- [ ] Rename `prompt.md` → `floatprompt-template.md`
- [ ] Rename `doc.md` → `floatprompt-doc.md`
- [ ] Rename `os.md` → `floatprompt-os.md`
- [ ] Rename `update.md` → `floatprompt-update.md`

### Phase 2: Update .float/ Files
- [ ] `.float/system.md` — structure map
- [ ] `.float/project/nav/float.md` — subfolder descriptions
- [ ] `.float/project/nav/core.md` → rename to `floatprompt.md`
- [ ] `.float/project/context/floatprompt.md` — domain map

### Phase 3: Update Tools
- [ ] `.float/meta/tools/float-context.md` — core/ references

### Phase 4: Update bin/
- [ ] `bin/floatprompt.js` — scaffold paths

### Phase 5: Update Specs
- [ ] `specs/system.md`
- [ ] `specs/claude/commands.md`

### Phase 6: Update Docs
- [ ] `README.md`
- [ ] `docs/philosophy/naming.md`
- [ ] `docs/philosophy/orientation.md`

### Phase 7: Update Context/Onboarding
- [ ] `context/float-map.md`
- [ ] `context/float-context.md`
- [ ] `context/float-deepdive.md`

### Phase 8: Update Templates
- [ ] Rename `templates/.float/meta/core/` → `templates/.float/meta/floatprompt/`
- [ ] Rename template files to floatprompt-*.md pattern
- [ ] Update `templates/.float/system.md`

### Phase 9: Validation
- [ ] Run `/float` — boot works
- [ ] Run `/float sync` — structure valid
- [ ] Run `npx floatprompt init` in test folder — scaffold correct
- [ ] Manual review of all updated files

### Phase 10: Version & Commit
- [ ] Update version in package.json (0.10.0?)
- [ ] Update decisions.md with this change
- [ ] Commit with clear message
- [ ] Archive this plan to artifacts/archive/

---

## Human Approval Gate

**Status:** Awaiting approval

**Prerequisite:** v0.9.0 structure migration must be committed first.

Before proceeding to implementation:
1. Review impact zones
2. Review execution checklist
3. Confirm version number
4. Approve to proceed

**Approved:** [ ]
**Date:**
**Notes:**

---

*Implementation artifact based on floatprompt-update methodology*
