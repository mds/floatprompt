<fp>
<json>
{
  "STOP": "Context Handoff. Read this first to pick up context-compiler work.",

  "meta": {
    "title": "Context Handoff",
    "id": "context-handoff"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable new AI sessions to pick up context-compiler work",
    "context": "Updated 2026-01-02 after agent architecture decisions"
  },

  "ai": {
    "role": "Session bootstrapper",
    "behavior": "Read files in order, understand architecture, continue from where we left off"
  },

  "requirements": {
    "reading_order": [
      "1. This file (orientation)",
      "2. docs/sys/overview.md (how FloatPrompt works, buoys)",
      "3. docs/sys/decisions.md (ALL architecture decisions)",
      "4. docs/sys/problem.md (what we're solving)",
      "5. Look at src/ folder structure"
    ],
    "do_not_read_unless_needed": [
      "artifacts/2025-12-31-context-compiler/*.md (outdated breadcrumbs)"
    ],
    "session_protocol": [
      "Update docs/sys/decisions.md as you make decisions",
      "This is the paper trail for cross-session consistency",
      "See 'For Future AI Sessions' section in decisions.md for format"
    ]
  }
}
</json>
<md>
# Context Handoff

**Read this first to pick up context-compiler work.**

## What We're Building

FloatPrompt is an **AI-orchestrated context system**:

```
AI (orchestrator)
├── TypeScript functions — mechanical work (scan, parse, write)
├── CLI commands — system operations (git, shell)
├── Buoys (subagents) — parallel work
└── Own cognition — judgment, generation, decisions
```

- **AI orchestrates** — decides what to do, delegates appropriately
- **TypeScript** provides speed and reliability for mechanical work
- **Buoys** enable parallelization — never do alone what 3-4 buoys can do together
- **Markdown** is the interface (what AI and humans read/write)

Users see `.float/` with markdown. AI orchestrates everything behind the scenes.

## Current State vs Target

| What | Current | Target |
|------|---------|--------|
| Tools | 17 markdown files in `.float/tools/` (4-12KB each) | TS functions AI can call + buoys for parallel work |
| Execution | AI does everything alone, serial | AI orchestrates TS/CLI/buoys, parallelizes |
| Boot file | `.float/float.md` (v0.16.0, full protocol) | `boot.md` (teaches AI when to use TS/CLI/buoys/cognition) |
| CLI | `bin/floatprompt.js` (scaffold only) | `src/cli/` (entry points) |

**The transformation:**
```
OLD: AI reads float-sync.md → AI does everything alone → slow, serial
NEW: AI reads boot.md → spawns buoys for parallel checks
                      → calls TS functions for mechanical work
                      → does cognitive work (descriptions, judgment)
```

## Current State (2026-01-02)

**Folder structure:**
```
src/
├── schema/          # Zod schemas (exists)
│   ├── floatprompt.ts
│   ├── floatdoc.ts
│   └── index.ts
├── tools/           # TS functions that DO things (not just configs)
│   ├── sync.ts      # Scans folders, compares to nav, calls AI for judgment
│   ├── fix.ts       # Detects drift, proposes fixes
│   └── context.ts   # Generates terrain maps
├── cli/             # Orchestrator
│   └── index.ts     # float init, float sync, etc.
├── ai/              # AI judgment layer
│   └── judge.ts     # Wrapper for AI calls when needed
└── output/          # Markdown generators
    └── templates.ts # Produces .md files
```

**Schema (locked):**
- Required: `id`, `title` only
- Optional: `STOP`, `type`, `human`, `ai`, `triggers`, `checks`, `outputs`, `requirements`

**Execution model (locked):**
- AI orchestrates — delegates to TS/CLI/buoys, does cognitive work
- TypeScript for mechanical work (scanning, comparing, writing)
- Buoys for parallel work — never do alone what buoys can do together
- Markdown is the interface

## Key Decisions (docs/sys/decisions.md)

| Decision | Summary |
|----------|---------|
| **AI orchestrates** | AI delegates to TS/CLI/buoys, does cognitive work (judgment, generation) |
| **Buoy principle** | Never do alone what 3-4 buoys can do together — parallelize |
| **Agents build, local understands** | Cloud agents maintain .float/, local Claude Code helps human build |
| **Cloud-first design** | Think unlimited agents, deploy local as fallback |
| Zod for schemas | Types + validation |
| Required structure | `id` + `title` only, everything else optional |

## Open Questions

- **boot.md content** — Orientation for Claude Code (not tool instructions)
- **Vercel infrastructure** — AI SDK, Sandbox, or provider-agnostic?
- **Trigger mechanism** — Webhooks, cron, manual, all?

## What's Next

1. Decide Vercel infrastructure (AI SDK, Sandbox)
2. Build first TS tool (sync) — scan folders, compare, AI judges
3. Define boot.md for local sessions
4. Build CLI orchestrator + cloud deployment

## What's Outdated

- `artifacts/2025-12-31-context-compiler/` — Archived, breadcrumbs from early planning
- Markdown-only tool execution model — superseded by TypeScript system
- Partials architecture — superseded (tools are TS functions now)

## The Big Picture

**AI orchestrates. TS/CLI/Buoys execute. AI also thinks.**

```
float init      → TypeScript scaffolds .float/
float sync      → AI orchestrates → spawns buoys → calls TS → writes .md
/float          → Claude Code reads boot.md → oriented for session
```

---

*Updated 2026-01-02 — AI orchestrates decision locked*
</md>
</fp>
