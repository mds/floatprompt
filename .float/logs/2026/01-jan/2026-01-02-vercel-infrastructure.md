# Vercel Infrastructure Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Use Vercel AI SDK + Sandbox for cloud agent infrastructure.

---

## Rationale

**AI SDK:**
- First-class support for orchestration patterns
- Streaming for long-running operations
- Tool calling with typed schemas
- Provider-agnostic but we're using Anthropic

**Sandbox:**
- Isolated execution (buoys can't interfere)
- Scalable (spin up as many as needed)
- Secure (contained environment)
- Perfect for parallel buoy pattern

**Anthropic:**
- Best context handling (200k tokens)
- Strong reasoning for judgment calls
- Consistent with local Claude Code experience
