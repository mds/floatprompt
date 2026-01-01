<fp>
<json>
{
  "STOP": "Float Orchestration Decisions. Rationale behind the 8 architectural decisions for FloatPrompt orchestration. Created via structured Q&A interview.",

  "meta": {
    "title": "Float Orchestration Decisions",
    "id": "float-orchestration-decisions",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-decisions"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture rationale behind orchestration architecture decisions",
    "context": "Q&A session to document the 'why' behind each locked decision"
  },

  "ai": {
    "role": "Decision documenter",
    "behavior": "Record human rationale accurately, distinguish hard vs soft locks"
  },

  "requirements": {
    "decisions_count": 8,
    "format": "Question → Answer → Status",
    "lock_types": ["hard", "soft"],
    "created_via": "structured Q&A interview"
  }
}
</json>
<md>
# Float Orchestration Decisions

Rationale behind the 8 architectural decisions for FloatPrompt orchestration.

## Decision 1: float-project.md as Tool + Spec

**Question:** Why make `project.md` an active tool instead of keeping it as passive documentation? What problem does this solve that `/float-sync` doesn't already handle?

**Answer:** `/float-sync` handles the full project repository (nav ↔ folders at repo level). `/float-project` is specifically about recursively syncing all folders inside `.float/project/` — nav/, logs/, context/. It's a focused safeguard for the system's own structure, an additional layer of validation.

**Status:** Locked

---

## Decision 2: float-report as Protocol + Buoy

**Question:** Why spawn a report_buoy instead of having tools write logs directly?

**Answer:** All existing float-* tools are very specific. Embedding the same report functionality in each would be duplicative. Float-report is a chained command that runs as a post-tool-completion process. It's about:
- DRY principle — tools stay focused on their job
- Separation of concerns — reporting is its own responsibility
- "Civilization of context" — documenting everything, building understanding
- Parallelism — having as many buoys as possible doing work simultaneously

**Status:** Locked

---

## Decision 3: Orchestrator Pattern

**Question:** Why a central orchestrator buoy instead of having tools chain themselves?

**Answer:** Best practice to have an orchestrator leading the team of buoys. Benefits:
- Single point of coordination for sequencing and error handling
- One place that knows the full picture
- Workers stay simple (do their task, report back)
- Easier to debug when something fails

Without orchestration, you get chains where no one knows the overall state.

**Status:** Locked

---

## Decision 4: Automated Gates + Paper Trail

**Question:** Why no blocking approval gates?

**Answer:** Not opposed to manual approval checkpoints — they're valuable during internal process building. However, automating with paper trails makes FloatPrompt tools chained together with buoys much more efficient.

Key insight: As long as there's a paper trail of decisions, it's easy to spawn a reversal buoy orchestrator that spawns worker buoys to fix things.

**Status:** Soft lock — leaning toward automation, but flexibility preserved. Manual gates may be useful during development phases.

---

## Decision 5: MDS for Tool Output

**Question:** Why apply MDS (map/decide/structure) to tool *output* files, not just tool *design*?

**Answer:** It's easy to keep a single framework in mind for working. One mental model for everything — design, execution, output. Consistency reduces cognitive load.

**Status:** Locked

---

## Decision 6: context/ as Required Core + Emergent

**Question:** Why require `project-decisions.md` and `project-context.md` specifically? Why not let context/ be fully emergent?

**Answer:** Everything needs a context file, and AI models work really well when we have decisions. Demonstrated in this very session — Claude had the context file but was missing decision rationale and explicitly said so.

Context + decisions is a powerful combo that should be required. Then let other things (scope files, domain files) be emergent.

**Status:** Locked

---

## Decision 7: logs/ with Run Numbers

**Question:** Why `float-sync-run-1/` folders instead of timestamps or sequential IDs?

**Answer:** Timestamps are fine. Dates + timestamps probably better than arbitrary IDs. The structure matters more than the exact naming scheme.

**Status:** Soft preference — flexible on naming convention

---

## Decision 8: Buoy Teams of 4-5, Flat

**Question:** Why cap at 4-5 buoys per team? Why flat (no buoys spawning sub-buoys)?

**Answer:** The 4-5 cap is a *current practical limit* based on Claude Code's agent spawning capability, not a philosophical constraint.

**Vision:** Scale to hundreds or thousands of buoys through hierarchy:

```
Executive (1)
    → Directors (4-5)
        → Orchestrators (4-5 each)
            → Workers (4-5 each)
```

Each level manages 4-5 of the next level down. This creates accountability structure. Not buildable in Claude Code today, but worth documenting as future architecture.

**Status:** Locked for now (practical constraint), with documented vision for scaling

---

## Summary

| # | Decision | Rationale | Lock Status |
|---|----------|-----------|-------------|
| 1 | float-project.md | Focused safeguard for system structure | Hard |
| 2 | float-report | DRY, separation of concerns, civilization of context | Hard |
| 3 | Orchestrator pattern | Single coordination point, clear responsibility | Hard |
| 4 | Automated + paper trail | Efficiency + reversibility via paper trail | Soft |
| 5 | MDS for output | One mental model for everything | Hard |
| 6 | Required core + emergent | Context + decisions proven essential | Hard |
| 7 | Dates + timestamps | Structure > naming convention | Soft |
| 8 | 4-5 cap (for now) | Practical limit, hierarchical scaling is vision | Hard (practical) |

---

*Captured via structured interview, 2025-12-30*
</md>
</fp>
