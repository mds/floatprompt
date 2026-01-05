# Protocol Rename Plan

**Session:** 2026-01-05
**Scope:** Rename boot.md → session-boot.md, handoff.md → session-handoff.md

---

## Why

Consistency with `update-*` naming pattern. All protocols should be verb-object:

```
BEFORE                  AFTER
boot.md                 session-boot.md
handoff.md              session-handoff.md
update-files.md         (unchanged)
update-logs.md          (unchanged)
update-state.md         (unchanged)
```

---

## Files to Rename

```bash
git mv protocols/boot.md protocols/session-boot.md
git mv protocols/handoff.md protocols/session-handoff.md
```

---

## References to Update

### boot.md mentions (18 files, excluding logs/)
**Protocols:**
- [ ] protocols/boot.md — self-references, update internal mentions
- [ ] protocols/handoff.md — step 3 references boot.md

**Core:**
- [ ] workshop.md — 3 mentions (flow diagram, folder structure, protocols table)
- [ ] _review.md — "boot.md reads _focus.md"

**Reference docs:**
- [ ] work/reference/vision.md — 9 mentions
- [ ] work/reference/principles.md — 3 mentions
- [ ] work/reference/buoys.md — 1 mention
- [ ] work/reference/deep-context-floatprompt.md — 8 mentions

**Backlog:**
- [ ] work/backlog/wip-layer-3-ongoing.md — 9 mentions
- [ ] work/backlog/float-CMS-context-management-system.md — 12 mentions
- [ ] work/backlog/wip-float-build-spec.md — 1 mention
- [ ] work/backlog/workshop-productization-concept.md — 4 mentions

**Active work:**
- [ ] work/plugin-architecture.md — 3 mentions
- [ ] work/archive/workshop-reorg-plan.md — 6 mentions

**External:**
- [ ] .float/boot-draft.md — references protocols/handoff.md
- [ ] logs/logs.md — 1 mention (open question)

### handoff.md mentions (12 files, excluding logs/)
**Protocols:**
- [ ] protocols/handoff.md — self-references
- [ ] protocols/boot.md — 3 mentions
- [ ] protocols/update-files.md — "Called by: handoff.md"
- [ ] protocols/update-state.md — 2 mentions
- [ ] protocols/archive.md — "During handoff"

**Core:**
- [ ] workshop.md — 4 mentions
- [ ] _next.md — references work/handoff-agents.md

**Work:**
- [ ] work/handoff-agents.md — multiple mentions
- [ ] work/reference/principles.md — 1 mention
- [ ] work/reference/buoys.md — 1 mention

**Backlog:**
- [ ] work/backlog/workshop-productization-concept.md — 4 mentions
- [ ] work/backlog/wip-layer-3-ongoing.md — 10+ mentions

**Archive:**
- [ ] work/archive/workshop-reorg-plan.md — 10+ mentions

**External:**
- [ ] .float/boot-draft.md — "protocols/handoff.md"

---

## Verification

- [ ] `ls protocols/` shows session-boot.md, session-handoff.md
- [ ] `grep -r "boot.md" .float-workshop/` returns nothing (except this file)
- [ ] `grep -r "handoff.md" .float-workshop/` returns nothing (except this file)
- [ ] All protocol cross-references work

---

*Delete after complete*
