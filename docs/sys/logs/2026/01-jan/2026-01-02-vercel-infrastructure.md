# Vercel Infrastructure Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Use Vercel AI SDK + Sandbox for cloud agent infrastructure.

## Components

| Component | Choice | Role |
|-----------|--------|------|
| **AI SDK** | Yes | Orchestration, streaming, tool calling |
| **Sandbox** | Yes | Isolated execution for buoys |
| **Provider** | Anthropic (Claude) | Best for context, reasoning |

## Architecture

```
Vercel
├── AI SDK
│   ├── Orchestrator (main agent)
│   ├── Tool definitions (TS functions)
│   └── Streaming responses
└── Sandbox
    ├── Buoy execution (isolated)
    ├── Parallel workers
    └── Scalable (unlimited buoys)
```

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

## What This Enables

```
float sync
    ↓
AI SDK orchestrates
    ↓
Spawns 4 Sandbox buoys (parallel)
    ↓
Each buoy: scan folder → return structured data
    ↓
Orchestrator: merge results → write updates
```

## Open Questions (Downstream)

- **Trigger mechanism** — Webhooks from GitHub? Cron? Manual API?
- **State management** — How do buoys report back? Structured JSON?
- **Cost model** — Sandbox pricing at scale?

---

**Do not revisit.**
