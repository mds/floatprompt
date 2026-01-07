---
type: index
folder: active
limit: 3
---

# Active Work

Current focus items. **Limit: 3 items max.**

> [!ai-hook]
> If this folder has more than 3 items, recommend moving lower-priority
> items to `later/`. Active should only hold what's in hands NOW.

## Current Focus

| Item | Status | Summary |
|------|--------|---------|
| `floatprompt-plugin-PRD.md` | **In Progress (S38)** | Agents drafted, CLI implemented. Next: SessionEnd hook, /float, boot.md |
| `floatprompt-plugin-spec.md` | **Reference** | Vision/philosophy doc — why we're building this |

## Session 38 Progress

**Completed:**
- Session continuity pattern designed (uses `log_entries` with `topic=session-handoff`)
- `float-enricher` agent drafted (`.claude/agents/float-enricher.md`)
- `float-logger` agent drafted (`.claude/agents/float-logger.md`)
- CLI `log` command implemented (`add`, `list`, `latest` subcommands)
- Workshop-to-float.db mapping clarified (folders become queries, no structure needed)

## Next Steps (from S38)

**Remaining before implementation:**

**1. SessionEnd hook**
- Wire up git diff detection
- Spawn enricher + logger agents
- Gate workshop agent on `.float-workshop/` existence

**2. /float command updates**
- Rename `/float-boot` to `/float`
- Add float.db creation on first run
- Show session continuity from `log_entries`

**3. boot.md — "The Driver's Manual" (save for last)**
- What instructions teach AI how to use float.db?
- Target: < 800 tokens
- Design after agents finalized

**4. Then:** Implementation phases per PRD

### After Design Passes

Generate `feature_list.json` for testable verification (like shiftOS pattern)

## Overflow Check

<!-- AI: Count *.md files (excluding active.md). If > 3, suggest parking. -->
