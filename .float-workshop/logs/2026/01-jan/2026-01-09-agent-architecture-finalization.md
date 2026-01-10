# Agent Architecture Finalization

**Session:** 50
**Date:** 2026-01-09
**Folders:** plugins/floatprompt, plugins/floatprompt/agents, plugins/floatprompt/hooks

## Summary
Finalized the hook-driven agent architecture for FloatPrompt plugin with explicit agent files, parallel execution pattern, and structured capture phases. Moved from inline agent prompts to discoverable agent.md files in the agents/ directory.

## Decision
Adopted explicit multi-phase capture architecture with agent files:
- **Phase 1 (Mechanical):** sqlite3 INSERT only (instant, guaranteed)
- **Phase 2 (Parallel):** `float-log` + `float-decisions` agents spawn together
- **Phase 3 (Sequential):** `float-enrich` agent updates folder context
- **Phase 4:** `float-handoff` agent writes `.float/handoff.md`
- **Phase 5 (Optional):** Workshop agents if `.float-workshop/` exists

All agent prompts moved from inline shell scripts to discoverable `agents/*.md` files with YAML frontmatter.

## Rationale
1. **Discoverability** — Agent files are version-controlled, visible in plugin directory, easier to maintain than inline prompts
2. **Parallelization opportunity** — Phase 2 agents can run concurrently since they don't depend on each other (handoff + decisions)
3. **Explicit phases** — Clear separation of concerns: mechanical first (guaranteed), enrichment second (best-effort)
4. **Session safety** — PreCompact (session alive) vs SessionEnd (fallback) deduplication via 5-minute window
5. **Pattern consistency** — All FloatPrompt agents use `float-` prefix, YAML frontmatter, same invocation pattern

## Files Changed
- `plugins/floatprompt/README.md` — Updated architecture documentation
- `plugins/floatprompt/agents/float-log.md` — New agent file
- `plugins/floatprompt/agents/float-decisions.md` — New agent file (parallel with log)
- `plugins/floatprompt/agents/float-enrich.md` — Enrichment agent
- `plugins/floatprompt/agents/float-handoff.md` — Handoff writer
- `plugins/floatprompt/commands/float.md` — Updated boot procedure with phase descriptions
- `plugins/floatprompt/hooks/float-capture.sh` — Implements 5-phase architecture
- `plugins/floatprompt/templates/handoff.md` — Template for handoff output
- `plugins/floatprompt/plugin.json` — Added `agents` and `skills` entry points
