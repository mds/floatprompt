---
type: index
folder: active
limit: 3
---

# Active Work

Current focus items. **Limit: 3 items max.**

## Current Focus

| Item | Status | Summary |
|------|--------|---------|
| Capture Pipeline Redesign | **Decision Pending** | 4 agents → 2, hook fate, graph vs log |
| FloatPrompt Plugin | **Ready for Distribution** | Phase 6: marketplace.json, publish |
| FloatPrompt for Web | **Ready** | NPM package needs testing, then publish |

## Session 63 Context

**Git-native v1.2.0 shipped.** All git-native planning docs moved to `done/`.

**Spawning bug fixed (Session 62).** Capture now detects commits since last capture, not just uncommitted changes.

**Active decisions needed:**
1. Hook fate: Delete entirely or minimal breadcrumb?
2. Agent count: 2 (log + handoff) or 3 (keep enrich)?
3. Graph vs log: Keep flat logging or evolve to graph construction?

## Active Files

| File | Purpose |
|------|---------|
| `ACTIVE.md` | This index |
| `2026-01-10-capture-pipeline-redesign.md` | 3 decision questions |
| `CAPTURE-FIX-PLAN.md` | Graph construction proposal (Priority 0 done) |
| `floatprompt-plugin.md` | Authoritative spec until Phase 6 ships |

## Moved This Session

**To done/:**
- `2026-01-10-git-layer1-insight.md` — Insight acted on
- `2026-01-10-git-native-architecture-plan.md` — All phases complete
- `claude-git-conversion-progress.md` — Marked COMPLETE

**To later/:**
- `2026-01-10-agentic-backend-insight.md` — Future possibility

**To ref/:**
- `CONTEXT-GRAPH-improvements.md` — Strategic analysis

## Next Steps

**Option A — Consolidate (Recommended):**
1. Validate capture spawning fix works in organic session
2. Create `marketplace.json` for plugin distribution
3. Test and publish FloatPrompt for Web NPM package
4. Decide on capture questions after validation

**Option B — Decide Capture Architecture:**
1. Lock decisions on hook/agents/graph
2. Implement chosen approach
3. Then distribute

## Overflow Check

✓ Active limit maintained (3 focus items)
✓ Git-native work archived to done/
✓ Future work moved to later/
