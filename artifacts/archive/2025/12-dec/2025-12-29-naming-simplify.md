---
title: Naming Simplification
type: update
status: pending
created: 2025-12-29

human_author: @mds
human_intent: Remove redundant floatprompt- prefix from files in floatprompt/ folder
human_context: Folder already namespaces. Prefix stutters. Structure IS documentation.

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Follow-up to naming-update.md.
  The folder name does the work. Files don't need to repeat it.
  floatprompt/floatprompt-template.md → floatprompt/template.md
---

# Naming Simplification

**Remove redundant `floatprompt-` prefix from files in `.float/meta/floatprompt/`.**

## Rationale

1. **Folder does the work.** `floatprompt/` tells you what's inside.
2. **Prefix stutters.** `floatprompt/floatprompt-template.md` says it twice.
3. **Structure IS documentation.** The folder name documents. Prefixes are redundant.
4. **Clean paths read better.**

## Change Specification

### Current Structure (post naming-update.md)
```
.float/meta/floatprompt/
├── floatprompt-template.md
├── floatprompt-doc.md
├── floatprompt-os.md
└── floatprompt-update.md
```

### Target Structure
```
.float/meta/floatprompt/
├── template.md
├── doc.md
├── os.md
└── update.md
```

### File Renames

| Current | Target |
|---------|--------|
| `floatprompt-template.md` | `template.md` |
| `floatprompt-doc.md` | `doc.md` |
| `floatprompt-os.md` | `os.md` |
| `floatprompt-update.md` | `update.md` |

---

## Impact Zone Assessment

### Files Referencing floatprompt-*.md

Any file updated by naming-update.md needs re-updating:

| File | References |
|------|------------|
| `.float/system.md` | Structure map |
| `.float/project/nav/float.md` | Subfolder descriptions |
| `bin/floatprompt.js` | Scaffold paths |
| `specs/system.md` | Structure documentation |
| `docs/CLAUDE.md` | Architecture diagram |
| `README.md` | Public paths |
| `context/float-*.md` | Reading paths |
| `templates/.float/system.md` | Fresh install structure |
| `templates/.float/meta/floatprompt/` | Template files |

### Pattern to Search

```bash
rg "floatprompt-template|floatprompt-doc|floatprompt-os|floatprompt-update" --type md
```

---

## Execution Checklist

### Phase 1: Rename Files
- [ ] `floatprompt-template.md` → `template.md`
- [ ] `floatprompt-doc.md` → `doc.md`
- [ ] `floatprompt-os.md` → `os.md`
- [ ] `floatprompt-update.md` → `update.md`

### Phase 2: Update References
- [ ] `.float/system.md`
- [ ] `.float/project/nav/float.md`
- [ ] `bin/floatprompt.js`
- [ ] `specs/system.md`
- [ ] `specs/claude/commands.md` (if applicable)
- [ ] `docs/CLAUDE.md`
- [ ] `README.md`
- [ ] `context/float-map.md`
- [ ] `context/float-context.md`
- [ ] `context/float-deepdive.md`

### Phase 3: Update Templates
- [ ] Rename `templates/.float/meta/floatprompt/floatprompt-*.md` files
- [ ] Update `templates/.float/system.md`

### Phase 4: Validate
- [ ] Run `/float` — boot works
- [ ] Run `/float sync` — structure valid
- [ ] `rg "floatprompt-template|floatprompt-doc|floatprompt-os|floatprompt-update"` returns nothing

### Phase 5: Commit
- [ ] Update decisions.md
- [ ] Commit with clear message
- [ ] Archive naming-update.md (superseded)

---

## Human Approval Gate

**Status:** Awaiting approval

Before proceeding:
1. Stop/complete other chat's work
2. Review this plan
3. Approve to proceed

**Approved:** [ ]
**Date:**
**Notes:**

---

*Simplification artifact based on floatprompt-update methodology*
