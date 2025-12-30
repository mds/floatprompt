<fp>
<json>
{
  "STOP": "Great Restructuring Context. All decisions locked. Ready for execution.",

  "meta": {
    "title": "The Great Restructuring",
    "id": "great-restructuring-context",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-context"
  },

  "human": {
    "author": "@mds",
    "intent": "Plan and document the restructuring of FloatPrompt repo by pillars",
    "context": "Evolved from atomic audit — all decisions now locked"
  },

  "ai": {
    "role": "Restructure planner and decision recorder",
    "behavior": "Execute restructuring per locked decisions"
  },

  "requirements": {
    "reading_order": [
      "CONTEXT.md (this file)",
      "decisions.md (WHY each decision was made)",
      "restructure-proposal.md (WHAT changes - execution plan)",
      "pillar-map.md (final structure reference)",
      "brain-dump.md (original thoughts)",
      "map-current-complexity.md (historical)"
    ],
    "related_work": {
      "orchestration": "2025-12-30-float-orchestration/",
      "float-think": "2025-12-30-float-think/",
      "relationship": "Restructuring happens BEFORE implementing orchestration"
    },
    "decisions_locked": 9
  }
}
</json>
<md>
# The Great Restructuring

**Status:** All decisions locked. Ready for execution.

## What This Is

Planning artifact for restructuring the FloatPrompt repository. Decisions are finalized. Next step: execute.

## Document Map

```
2025-12-30-great-restructuring/
├── CONTEXT.md              ← You are here
├── decisions.md            ← WHY each decision was made
├── restructure-proposal.md ← WHAT changes (9 locked, execution plan)
├── pillar-map.md           ← Final structure reference
├── brain-dump.md           ← Original thoughts (historical)
└── map-current-complexity.md  ← Analysis (historical)
```

## The Three Pillars (Final)

| Pillar | Folder | Contains |
|--------|--------|----------|
| **FILE** | `format/` | What FloatPrompt IS |
| **SYSTEM** | `system/` | How FloatPrompt WORKS |
| **PACKAGE** | `bin/`, `templates/` | How FloatPrompt SHIPS |

**Separately:** `.float/` = The system RUNNING (spawned, not a pillar folder)

## Key Decisions

| # | Decision |
|---|----------|
| 1 | `floatprompt/` → `format/` |
| 2 | New `system/` folder |
| 3 | `specs/claude/` → `system/` |
| 4 | `MAINTENANCE.md` → `system/maintenance.md` (as tool) |
| 5 | `.float/floatprompt/` → `.float/core/` |
| 6 | `.float/floatprompt/core/` → `.float/core/format/` |
| 7 | `.float/floatprompt/types/` → `.float/core/tools/types/` |
| 8 | Root `context/` → eliminated (FLOAT.md system) |
| 9 | FLOAT.md in every folder |

## Status

- [x] Map current complexity
- [x] Define three pillars
- [x] Assign all files to pillars
- [x] Decide what moves/renames
- [ ] Execute restructuring
- [ ] Update all references
- [ ] Update templates/
- [ ] Validate with /float-fix
- [ ] Test npx floatprompt init
- [ ] Archive this artifact

## Related Work

| Artifact | Relationship |
|----------|--------------|
| `2025-12-30-float-orchestration/` | Deferred until after restructuring |
| `2025-12-30-float-think/` | Parked, depends on orchestration |

## Origin

**Trigger:** Complexity concerns after rapid tool ecosystem expansion.

**Evolution:** atomic audit → pillar analysis → naming decisions → FLOAT.md system → ready for execution

**Date:** 2025-12-30
</md>
</fp>
