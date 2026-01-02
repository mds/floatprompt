---
title: When to Implement
type: decision
created: 2025-12-31

human_author: @mds
human_intent: Capture triggers and sequencing for future implementation

ai_model: Claude Opus 4.5
ai_notes: WHEN to build, not HOW — breadcrumb for timing decisions
---

# When to Implement

**WHEN to build the context compiler.**

---

## Trigger Conditions

Implementation makes sense when ANY of these become true:

### Pain Triggers

| Trigger | Signal | Current State |
|---------|--------|---------------|
| Version bump takes >10 min | Editing 16+ files manually | Not yet painful enough |
| Path refactor breaks things | References drift, float-fix runs constantly | Occasional |
| New tool creation is tedious | Copy-paste-modify cycle annoying | Manageable |
| Contributor asks "where's the source?" | Confusion about .md as source vs output | Not yet |

### Opportunity Triggers

| Trigger | Signal |
|---------|--------|
| Ready to build floatprompt.com | Need API/web rendering |
| Want to publish as library | Need clean separation |
| Enterprise interest | Need stability guarantees |

### Confidence Triggers

| Trigger | Signal |
|---------|--------|
| Tool count stabilizes | Not adding new tools weekly |
| Patterns crystallize | Same partial used 10+ times unchanged |
| Schema feels solid | No more "hmm, should this field exist?" |

---

## Current Assessment

**Not yet.**

The system is still evolving rapidly:
- Built in 2-3 days
- Still finding the right patterns
- Tools being added/modified frequently
- Schema still being discovered

**Premature optimization risk:** Building a compiler for a schema that's still changing = wasted effort.

---

## Sequencing (When Ready)

### Phase 0: Pre-conditions
- [ ] Tool count stable for 2+ weeks
- [ ] No schema changes for 1+ week
- [ ] Clear pain from manual maintenance

### Phase 1: Schema First
Lock the schema before building the compiler.

```
1. Document exact JSON shape for tools
2. Document exact JSON shape for nav/context
3. Create validation (JSON Schema or TypeScript types)
4. All existing tools pass validation
```

**Why schema first:** The schema IS the product. Compiler is just mechanics.

### Phase 2: Partials/Functions
Extract shared patterns into reusable units.

```
1. footer partial (simplest, validates approach)
2. duality partial (used everywhere)
3. status_format partial
4. reporting partial
5. buoys partial
```

**Order by:** Simplest first, most-used second.

### Phase 3: One Tool
Full pipeline proof with float-sync.

```
1. Create config (float-sync.tool.json or .ts)
2. Create template (float-sync.ts)
3. Build and compare to current .md
4. Run /float-sync with compiled version
5. Validate behavior unchanged
```

### Phase 4: All Tools
Batch by type (see 08-migration.md).

### Phase 5: Output Templates
Nav and context files become generated.

---

## Anti-Triggers

**Do NOT start implementation when:**

- Adding new tools frequently
- Schema fields still being discovered
- Patterns haven't stabilized
- "Just want to try it" (yak shaving risk)
- Refactoring for refactoring's sake

---

## Decision Framework

```
Is manual maintenance causing actual pain?
├── No → Don't build yet
└── Yes → Is the schema stable?
          ├── No → Stabilize schema first
          └── Yes → Is there time/focus for it?
                    ├── No → Wait for right moment
                    └── Yes → Start Phase 1
```

---

## The Wait is Intentional

This artifact exists so we DON'T forget the thinking.

When the time is right:
1. Pain will be obvious
2. Schema will be stable
3. These breadcrumbs will guide implementation

Until then: keep shipping with manual .md files. They work.
