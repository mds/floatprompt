<fp>
<json>
{
  "STOP": "The Great Restructuring. All 9 decisions locked. Ready for execution. Reorganizing FloatPrompt repo by three pillars: format/, system/, bin/+templates/.",

  "meta": {
    "title": "The Great Restructuring",
    "id": "great-restructuring",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact"
  },

  "human": {
    "author": "@mds",
    "intent": "Reorganize FloatPrompt repo by three pillars (FILE, SYSTEM, PACKAGE)",
    "context": "Triggered by complexity concerns after rapid tool expansion. Evolved: atomic audit → pillar analysis → naming decisions → execution plan."
  },

  "ai": {
    "role": "Restructure coordinator",
    "behavior": "Execute restructuring per locked decisions, use buoy coordination pattern with parallel workers and validation gates"
  },

  "requirements": {
    "reading_order": [
      "FLOAT.md (this file)",
      "decisions.md (WHY each decision)",
      "restructure-proposal.md (WHAT changes)",
      "execution-plan.md (HOW to execute)",
      "pillar-map.md (final structure)",
      "brain-dump.md (historical)",
      "map-current-complexity.md (historical)"
    ],
    "key_insight": "Nothing named floatprompt/ in folders — folders named by PURPOSE, files contain the format",
    "decisions_locked": 9,
    "phases": 9,
    "related_work": {
      "orchestration": "2025-12-30-float-orchestration/",
      "float-think": "2025-12-30-float-think/",
      "relationship": "Restructuring happens BEFORE implementing orchestration"
    }
  }
}
</json>
<md>
# The Great Restructuring

**Status:** All 9 decisions locked. Ready for execution.

## Quick Context

Planning artifact for restructuring the FloatPrompt repository by three pillars. Decisions finalized. Next step: execute.

**Core insight:** Nothing named `floatprompt/` in folders — like JS projects don't have `javascript/` folders. Folders named by PURPOSE, files contain the format.

## The Three Pillars

| Pillar | Folder | What it answers |
|--------|--------|-----------------|
| **FILE** | `format/` | What is FloatPrompt? |
| **SYSTEM** | `system/` | How does it work? |
| **PACKAGE** | `bin/`, `templates/` | How does it ship? |

**Separately:** `.float/` = The system RUNNING (spawned, not a pillar folder)

## Contents

| File | Purpose | Read when... |
|------|---------|--------------|
| `FLOAT.md` | This file — entry point | First contact |
| `decisions.md` | WHY each decision was made | Need rationale |
| `restructure-proposal.md` | WHAT changes (9 decisions) | Need specifics |
| `execution-plan.md` | HOW to execute (9 phases, buoys) | Ready to execute |
| `pillar-map.md` | Final structure reference | Need structure details |
| `brain-dump.md` | Original thoughts | Historical context |
| `map-current-complexity.md` | Initial analysis | Historical context |

## Key Decisions (9)

| # | Decision | Rationale |
|---|----------|-----------|
| 1 | `floatprompt/` → `format/` | Folders named by purpose |
| 2 | New `system/` folder | SYSTEM pillar needs home |
| 3 | `specs/claude/` → `system/` | SYSTEM content to SYSTEM pillar |
| 4 | `MAINTENANCE.md` → `system/maintenance.md` | As floatprompt tool |
| 5 | `.float/floatprompt/` → `.float/core/` | No "floatprompt/" folder names |
| 6 | `.float/.../core/` → `.float/core/format/` | Mirrors repo structure |
| 7 | `.float/.../types/` → `.float/core/tools/types/` | Types are types of tools |
| 8 | Root `context/` → eliminated | FLOAT.md system replaces |
| 9 | FLOAT.md in every folder | Full `<fp>` JSON format |

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

**Pattern:** Parallel workers WITHIN phases, validation gates BETWEEN phases.

## Status

- [x] Map current complexity
- [x] Define three pillars
- [x] Assign all files to pillars
- [x] Decide what moves/renames
- [x] Create execution plan
- [ ] **Execute restructuring** ← Next step
- [ ] Update all references
- [ ] Update templates/
- [ ] Validate with /float-fix
- [ ] Test npx floatprompt init
- [ ] Archive this artifact

## Related Work

| Artifact | Status |
|----------|--------|
| `2025-12-30-float-orchestration/` | Deferred until after restructuring |
| `2025-12-30-float-think/` | Parked, depends on orchestration |

## Origin

**Trigger:** Complexity concerns after rapid tool ecosystem expansion.

**Evolution:** atomic audit → pillar analysis → naming decisions → FLOAT.md system → ready for execution

**Date:** 2025-12-30
</md>
</fp>
