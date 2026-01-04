# Buoy Architecture

**Date:** 2026-01-04
**Status:** In Progress (working document, not locked spec)
**Session:** 8

---

## Summary

Explored buoy architecture through city metaphor. Cataloged 55+ workers. Defined assembly pattern.

---

## Key Concepts Established

### The City Metaphor

| Concept | In FloatPrompt |
|---------|----------------|
| Mayor | boot.md — dispatches workers |
| Workers | Buoys — specialized agents |
| Job Descriptions | Buoy-boot templates |
| Work Sites | Folders in the project |
| City Records | SQLite database |

### Domain-Specific Fleets

Different projects = different cities = different worker fleets:
- Tech City: Auth, Security, API, Frontend
- Creative City: Editor, Grammar, Story Cohesion
- Business City: HR, Payroll, Accounting
- etc.

Core system is universal. Worker fleet is domain-specific.

### Buoy Assembly Pattern

```
BuoyPrompt = Global + Archetype + Specialized + DBInstructions + HandoffMessage
```

Buoys are pre-loaded with identity before receiving tasks.

### Recon Buoy Pattern

```
Query DB → Spawn parallel Deep Divers → Aggregate results
```

Database enables parallelization (instant discovery layer).

---

## Decisions

| Decision | Status | Rationale |
|----------|--------|-----------|
| Rename `content_md` → `context` | Pending | It IS context, `_md` suffix is redundant |
| Context has depth (lean/full) | Concept | Different workers need different depth |
| Buoys get pre-loaded boot templates | Concept | Workers know their job before getting tasks |
| 55+ workers across 14 categories | Drafted | Comprehensive catalog for all task types |

---

## Files Created/Updated

| File | Change |
|------|--------|
| `wip-buoys.md` | Created — working document for buoy architecture |
| `wip-boot.md` | Updated — added wip-buoys.md to drill-down files |
| `wip-logs/.../context-architecture.md` | Created — decision log for context discussions |
| `artifacts/2026-01-04-buoy-recon.md` | Created (parallel session) — exhaustive buoy research |

---

## Next Steps

1. Prioritize workers for Layer 2 (minimum viable)
2. Map what each essential worker needs (lean/full/none)
3. Derive context field structure from worker needs
4. Rename content_md → context in schema

---

## Reference

- `wip-buoys.md` — Full worker catalog and architecture
- `artifacts/2026-01-04-buoy-recon.md` — Exhaustive research from parallel session

---

*Session 8 — Buoy architecture exploration*
