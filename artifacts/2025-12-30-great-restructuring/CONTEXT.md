<fp>
<json>
{
  "STOP": "Great Restructuring Context. Planning artifact for reorganizing FloatPrompt repo by three pillars (FILE, SYSTEM, PACKAGE). Read this first.",

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
    "context": "Evolved from atomic audit — now focused on what actually changes"
  },

  "ai": {
    "role": "Restructure planner and decision recorder",
    "behavior": "Map current state, propose changes, capture decisions, create paper trail"
  },

  "requirements": {
    "reading_order": [
      "CONTEXT.md (this file)",
      "brain-dump.md (original thoughts)",
      "map-current-complexity.md (analysis)",
      "pillar-map.md (FILE/SYSTEM/PACKAGE breakdown)",
      "restructure-proposal.md (what changes)"
    ],
    "related_work": {
      "orchestration": "2025-12-30-float-orchestration/",
      "float-think": "2025-12-30-float-think/",
      "relationship": "Restructuring happens BEFORE implementing orchestration"
    },
    "key_questions": [
      "What moves between pillars?",
      "What gets renamed?",
      "What stays the same?",
      "When do we execute?"
    ]
  }
}
</json>
<md>
# The Great Restructuring

**Purpose:** Plan the reorganization of FloatPrompt repo by three pillars.

## What This Is

Planning artifact for restructuring the FloatPrompt repository. Map everything first, make decisions, THEN execute. No ad-hoc changes.

## Document Map

```
2025-12-30-great-restructuring/
├── CONTEXT.md              ← You are here
├── brain-dump.md           ← Original stream of consciousness
├── map-current-complexity.md  ← Where we are, what's muddled
├── pillar-map.md           ← FILE/SYSTEM/PACKAGE breakdown
└── restructure-proposal.md ← What changes (draft, needs decisions)
```

## The Three Pillars

| Pillar | Purpose | Key Folders |
|--------|---------|-------------|
| **FILE** | The format itself | `floatprompt/`, `specs/`, `docs/`, `examples/` |
| **SYSTEM** | Runtime behavior | `.float/`, `.claude/`, `context/` |
| **PACKAGE** | Distribution | `bin/`, `templates/`, `package.json` |

**Workspace** (not a pillar): `artifacts/`

## Related Work

| Artifact | Relationship |
|----------|--------------|
| `2025-12-30-float-orchestration/` | Implementation deferred until after restructuring |
| `2025-12-30-float-think/` | Vision parked, depends on orchestration |

## Status

- [x] Map current complexity
- [x] Define three pillars
- [x] Assign all files to pillars
- [ ] Decide what moves/renames (in progress)
- [ ] Execute restructuring
- [ ] Validate and archive

## Origin

**Trigger:** Complexity concerns after rapid tool ecosystem expansion.

**Evolution:** Started as "atomic audit" → became "great restructuring" as scope clarified.

**Date:** 2025-12-30
</md>
</fp>
