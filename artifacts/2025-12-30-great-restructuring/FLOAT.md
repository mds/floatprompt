---
title: The Great Restructuring
type: artifact
status: ready-for-execution
created: 2025-12-30
pillar: workspace

human_author: @mds
human_intent: Reorganize FloatPrompt repo by three pillars (FILE, SYSTEM, PACKAGE)
human_context: |
  Triggered by complexity concerns after rapid tool expansion.
  Evolved: atomic audit → pillar analysis → naming decisions → execution plan.

ai_role: Restructure coordinator
ai_behavior: Execute per locked decisions, use buoy coordination pattern
---

# The Great Restructuring

**Reorganizing FloatPrompt by three pillars: FILE, SYSTEM, PACKAGE.**

## Quick Context

This artifact contains the complete planning for restructuring the FloatPrompt repository. All decisions are locked. Ready for execution.

**Core insight:** Nothing named `floatprompt/` in folders — like JS projects don't have `javascript/` folders. Folders named by PURPOSE, files contain the format.

## The Three Pillars

| Pillar | Folder | What it answers |
|--------|--------|-----------------|
| FILE | `format/` | What is FloatPrompt? |
| SYSTEM | `system/` | How does it work? |
| PACKAGE | `bin/`, `templates/` | How does it ship? |

`.float/` is separate — the system RUNNING, not a pillar folder.

## Contents

| File | Purpose | Read when... |
|------|---------|--------------|
| `FLOAT.md` | This file — quick orientation | First contact |
| `CONTEXT.md` | Entry point, status, reading order | Starting work |
| `decisions.md` | WHY each decision was made | Need rationale |
| `restructure-proposal.md` | WHAT changes (9 decisions) | Need specifics |
| `execution-plan.md` | HOW to execute (9 phases, buoys) | Ready to execute |
| `pillar-map.md` | Final structure reference | Need structure details |
| `brain-dump.md` | Original thoughts | Historical context |
| `map-current-complexity.md` | Initial analysis | Historical context |

## Reading Order

1. **FLOAT.md** (this file) — 30 seconds, get oriented
2. **decisions.md** — understand WHY
3. **restructure-proposal.md** — understand WHAT
4. **execution-plan.md** — understand HOW
5. **pillar-map.md** — reference as needed

## Key Decisions (9)

1. `floatprompt/` → `format/`
2. New `system/` folder
3. `specs/claude/` → `system/`
4. `MAINTENANCE.md` → `system/maintenance.md` (as tool)
5. `.float/floatprompt/` → `.float/core/`
6. `.float/floatprompt/core/` → `.float/core/format/`
7. `.float/floatprompt/types/` → `.float/core/tools/types/`
8. Root `context/` → eliminated (FLOAT.md system)
9. FLOAT.md in every folder

## Execution Summary

**9 phases** with parallel buoys and validation gates:

```
Phase 1: Create folders        [3 parallel workers]
Phase 2: Move format/          [2 parallel workers]
Phase 3: Create system/        [2 parallel workers]
Phase 4: Restructure .float/   [3 sequential - deps]
Phase 5: Archive context/      [1 worker]
Phase 6: /float-fix            [tool buoy]
Phase 7: Create FLOAT.md files [4 parallel workers]
Phase 8: Update templates/     [2 parallel workers]
Phase 9: Final validation      [4 sequential validators]
```

## Status

- [x] Map complexity
- [x] Define pillars
- [x] Lock decisions (9)
- [x] Create execution plan
- [ ] **Execute restructuring** ← Next step
- [ ] Validate and archive

## Related Work

| Artifact | Status |
|----------|--------|
| `float-orchestration/` | Deferred until after this |
| `float-think/` | Parked, depends on orchestration |

---

*This FLOAT.md is itself a test of the FLOAT.md system (Decision #9).*
