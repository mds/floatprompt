<fp>
<json>
{
  "STOP": "Float Orchestration Architecture Context. Design the coordination layer for FloatPrompt tools, buoys, and reporting. Read this first when resuming work.",

  "meta": {
    "title": "Float Orchestration Architecture",
    "id": "float-orchestration-context",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-context"
  },

  "human": {
    "author": "@mds",
    "intent": "Design coordination layer for tools, buoys, and reporting",
    "context": "Triggered by discussion about chaining float-* commands and logging gaps"
  },

  "ai": {
    "role": "Architecture designer and documentation keeper",
    "behavior": "Design patterns, document decisions, maintain coherence across documents"
  },

  "requirements": {
    "reading_order": [
      "CONTEXT.md (this file)",
      "map-current-state.md",
      "map-proposed-architecture.md",
      "decide-components.md",
      "decisions.md (rationale)",
      "structure-implementation.md",
      "2025-12-30-float-think.md (future vision, parked)"
    ],
    "key_insight": "MDS pattern applies to tool output, not just tool design",
    "decisions_locked": 8,
    "implementation_status": "Design complete, awaiting implementation"
  }
}
</json>
<md>
# Float Orchestration Architecture

**Purpose:** Design the coordination layer for FloatPrompt tools, buoys, and reporting.

## What We're Designing

A system where:
1. **Tools remain goldilocks-sized** — focused on one job
2. **float-report handles logging** — MDS files (map/decide/structure) for every run
3. **Buoys are fully orchestrated** — coordinated, waiting on each other, one orchestrating
4. **Everything reports up the chain** — logged, auditable, resumable

## Key Concepts

| Concept | Description |
|---------|-------------|
| `float-project.md` | Directory tool for `.float/project/*` management |
| `float-report` | Logging mechanism producing map/decide/structure |
| `float-all` | Orchestrator running tools in sequence |
| `float-think` | Meta-orchestrator with intelligent tool selection (future, parked) |
| Monitoring buoys | Long-running buoys watching for changes |
| Gate buoys | Approval points between phases |

## Document Map

```
2025-12-30-float-orchestration/
├── CONTEXT.md                   ← You are here
├── map-current-state.md         ← What exists now
├── map-proposed-architecture.md ← What we're building
├── decide-components.md         ← Decisions about each piece
├── decisions.md                 ← Rationale behind each decision (Q&A format)
├── structure-implementation.md  ← Build plan
└── 2025-12-30-float-think.md    ← Future vision (parked)
```

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

See `decisions.md` for full rationale.

## Session Origin

**Trigger:** Discussion about chaining float-* commands and logging gaps.

**Key insight:** MDS pattern applies to tool output, not just tool design.

**Session date:** 2025-12-30
**Participants:** @mds, Claude Opus 4.5
</md>
</fp>
