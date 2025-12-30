<fp>
<json>
{
  "STOP": "Float Think Concept. Meta-orchestrator that intelligently selects tools, identifies gaps, and triggers repairs. Parked for later implementation.",

  "meta": {
    "title": "Float Think",
    "id": "float-think-context",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-context"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture the vision for an intelligent meta-orchestrator",
    "context": "Lifted from brain dump during atomic audit - too powerful to lose, too big to build now"
  },

  "ai": {
    "role": "Concept keeper",
    "behavior": "Preserve the vision, don't implement yet"
  },

  "requirements": {
    "status": "Parked - vision captured, implementation deferred",
    "depends_on": ["float-orchestration (WS1-WS5)", "atomic audit completion"],
    "relationship_to_float_all": "float-all is fixed sequence, float-think is intelligent selection"
  }
}
</json>
<md>
# Float Think

**The meta-orchestrator that thinks about which tools to use.**

## Vision

```
User runs /float-think
        │
        ▼
AI cycles through all float-* tools
        │
        ▼
Decides which tools are needed for current task
        │
        ▼
Spawns buoys to run selected tools
        │
        ▼
Gap buoy identifies missing functionality
        │
        ▼
Repair buoy updates tools if gaps found
```

## Why This Is Different

| Tool | Approach |
|------|----------|
| `/float-all` | Fixed sequence: float → sync → fix → context → enhance |
| `/float-think` | Intelligent selection based on current context and task |

Float-all is a pipeline. Float-think is a reasoning engine.

## Key Capabilities

1. **Tool Selection** — Analyze context, determine which tools are relevant
2. **Gap Detection** — Identify when no existing tool fits the need
3. **Repair Triggering** — Spawn buoys to update/create tools when gaps found
4. **MDS Reporting** — Full paper trail of reasoning and decisions

## Relationship to Other Work

```
                    float-think (future)
                         │
                         ▼
              ┌──────────────────────┐
              │   Tool Selection     │
              │   (intelligent)      │
              └──────────┬───────────┘
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
    float-sync      float-fix      float-context
         │               │               │
         └───────────────┼───────────────┘
                         │
                         ▼
                  float-report
                  (civilization of context)
```

## Prerequisites

Before building float-think:
1. ✅ Float orchestration designed (8 decisions locked)
2. ⏳ Float orchestration implemented (WS1-WS5)
3. ⏳ Atomic audit completed (foundation clarified)
4. ⏳ float-report working (paper trail infrastructure)

## Ideas to Explore Later

- How does float-think decide which tools to run?
- What heuristics determine "this task needs sync but not fix"?
- How does gap detection work? Pattern matching against tool capabilities?
- Should repair be automatic or human-approved?
- How does this relate to the buoy hierarchy vision (executives → directors → orchestrators)?

## Status

**Parked.** Vision captured. Implementation deferred until:
- Orchestration infrastructure exists (float-report, float-all)
- Foundation is solid (atomic audit complete)
- We have experience with simpler orchestration patterns

---

*This is the "someday" tool — the one that makes FloatPrompt truly intelligent.*
</md>
</fp>
