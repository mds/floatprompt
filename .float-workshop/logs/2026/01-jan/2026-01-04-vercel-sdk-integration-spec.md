# Vercel SDK Integration Spec

**Date:** 2026-01-04
**Status:** Locked
**Future Agent:** decision_logger

---

## Decision

Created integration spec for migrating FloatPrompt buoy system to Vercel AI SDK stack.

---

## Summary

Researched Vercel's AI SDK (v5/v6), Sandbox, and MCP to identify patterns applicable to FloatPrompt's buoy architecture. Documented findings in `.float-workshop/docs/vercel-sdk-integration-spec.md`.

---

## Key Findings

### Direct Leverage Points

| Vercel Tech | FloatPrompt Use Case |
|-------------|----------------------|
| AI SDK `tool()` | Replace buoy templates with typed tool definitions |
| `ToolLoopAgent` | Multi-step buoy orchestration with automatic context |
| `prepareStep` | Dynamic 3-layer composition (global + archetype + specific) |
| Vercel Sandbox | Isolated buoy execution in production |
| MCP | Expose float.db for remote/Sandbox buoy data access |

### Migration Phases

1. **Phase 1 (Low Risk):** Convert buoy templates to SDK `tool()` format
2. **Phase 2 (Medium Risk):** Replace manual orchestration with `ToolLoopAgent`
3. **Phase 3 (Higher Risk):** Move buoy execution to Vercel Sandbox
4. **Phase 4 (Production):** Expose float.db via MCP server

### Architectural Parallel

Both Vercel's approach and FloatPrompt follow the same pattern:

```
VERCEL FdI:      code → analyze patterns → generate infrastructure
FLOATPROMPT:     folders → analyze patterns → generate context
```

Same evolution arc: manual → declarative → inferred → autonomous

---

## Open Questions Captured

1. Agent vs direct tool calls — when to use which
2. Sandbox granularity — per-buoy vs per-fleet
3. MCP server location — same process vs separate
4. prepareStep vs pre-composition — dynamic vs static
5. Which operations need `needsApproval: true`

---

## Rationale

Current `execute.ts` works but lacks:
- Multi-step reasoning loops
- Context management between steps
- Isolation (buoys share process with orchestrator)
- Human-in-loop approval

AI SDK provides these primitives. Sandbox provides isolation. MCP enables remote data access. All three integrate cleanly.

---

## References

- [AI SDK Documentation](https://ai-sdk.dev/docs/introduction)
- [Vercel Sandbox Docs](https://vercel.com/docs/vercel-sandbox)
- [Framework-Defined Infrastructure](https://vercel.com/blog/framework-defined-infrastructure)
- [Self-Driving Infrastructure](https://vercel.com/blog/self-driving-infrastructure)

---

## Files Changed

- Created `.float-workshop/docs/vercel-sdk-integration-spec.md`
- Created `.float-workshop/logs/2026/01-jan/2026-01-04-vercel-infrastructure-evolution.md`
