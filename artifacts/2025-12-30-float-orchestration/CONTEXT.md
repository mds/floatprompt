# Float Orchestration Architecture

**Purpose:** Design the coordination layer for FloatPrompt tools, buoys, and reporting.

---

## What We're Designing

A system where:
1. **Tools remain goldilocks-sized** — focused on one job
2. **float-report handles logging** — MDS files (map/decide/structure) for every run
3. **Buoys are fully orchestrated** — coordinated, waiting on each other, one orchestrating
4. **Everything reports up the chain** — logged, auditable, resumable

---

## Key Concepts Emerging

| Concept | Description |
|---------|-------------|
| `float-project.md` | Directory tool for `.float/project/*` management |
| `float-report` | Logging mechanism producing map/decide/structure |
| `float-all` | Orchestrator running tools in sequence |
| Monitoring buoys | Long-running buoys watching for changes |
| Gate buoys | Approval points between phases |

---

## Document Map

```
2025-12-30-float-orchestration/
├── CONTEXT.md                 ← You are here
├── map-current-state.md       ← What exists now
├── map-proposed-architecture.md ← What we're building
├── decide-components.md       ← Decisions about each piece
└── structure-implementation.md ← Build plan
```

---

## Decisions Locked (8)

| # | Component | Decision |
|---|-----------|----------|
| 1 | float-project.md | Tool + Spec (+ orchestrator) |
| 2 | float-report | Protocol + report_buoy |
| 3 | Buoy coordination | Orchestrator pattern |
| 4 | Gate UX | Automated + paper trail |
| 5 | MDS file format | map/decide/structure templates |
| 6 | context/ structure | Required core + emergent |
| 7 | logs/ structure | Run numbers |
| 8 | Buoy hierarchy | Teams of 4-5, flat |

See `decide-components.md` for full details.

---

## Session Origin

**Trigger:** Discussion about chaining float-* commands and logging gaps.

**Key insight:** MDS pattern applies to tool output, not just tool design.

**Session date:** 2025-12-30
**Participants:** @mds, Claude Opus 4.5
