# How FloatPrompt Works

Overview of the FloatPrompt system — architecture, execution model, and goals.

---

## The Architecture

```
Cloud Agents (build/maintain)          Local Session (understand/help)
        │                                       │
        ▼                                       ▼
┌─────────────────┐                    ┌─────────────────┐
│  AI orchestrates│                    │  Claude Code    │
│  ├── TS funcs   │───── .float/ ─────│  reads boot.md  │
│  ├── CLI cmds   │                    │  has context    │
│  └── Buoys      │                    │  spawns buoys   │
└─────────────────┘                    └─────────────────┘
        │                                       │
        ▼                                       ▼
   Maintains:                              Helps human:
   - _/map.md (structure)                  - Build features
   - _/context.md (understanding)          - Debug issues
   - _/logs/ (history)                     - Navigate codebase
```

**Agents build. Local understands. AI orchestrates both.**

---

## What Gets Installed

```
.float/
├── boot.md               # Orients Claude Code to context
├── project/              # Mirrors project structure
│   ├── _/                # Root meta
│   │   ├── map.md        # Project structure
│   │   ├── context.md    # Project understanding
│   │   └── logs/         # Project history
│   ├── src/
│   │   └── _/            # src/ meta (recursive)
│   └── docs/
│       └── _/            # docs/ meta (recursive)
└── .version              # Installed version

.claude/commands/         # Thin wrappers (may be deprecated)
```

**The `_/` convention:** Each tracked folder gets `_/` containing map.md, context.md, logs/. Logs drive freshness — new entry triggers map/context review.

---

## Execution Model

AI orchestrates, delegating to 4 execution modes:

| Mode | When to use | Example |
|------|-------------|---------|
| **TypeScript** | Mechanical, deterministic | Scan folders, parse frontmatter, write files |
| **CLI** | System operations | `git status`, file operations |
| **Buoys** | Parallel work | Check 10 nav files simultaneously |
| **Cognition** | Judgment, creativity | Generate descriptions, decide naming |

**AI orchestrates. TS/CLI/Buoys execute. AI also thinks.**

> Never do alone what 3-4 buoys can do together.

---

## Two Modes

### Cloud Mode (Agents)

```bash
# Agents run continuously or on triggers
float sync    # AI orchestrates → spawns buoys → calls TS → writes
float fix     # Detects drift → proposes fixes
float context # Generates terrain maps
```

- AI orchestrates, delegates to TS/CLI/buoys
- Vercel AI SDK (orchestration) + Sandbox (isolated execution)
- Unlimited parallel buoys
- Maintains .float/ automatically
- Triggered by webhooks, cron, or manual

### Local Mode (Session)

```
/float        # Claude Code reads boot.md → instant context
```

- Human opens Claude Code session
- Reads agent-maintained context
- Helps human build with full understanding
- No re-explaining needed

---

## Tool Design Principles

Because buoys are cheap (cloud, parallel), design for parallelization:

| Principle | Why |
|-----------|-----|
| Small, focused | One tool = one job |
| Parallelizable | Spawn buoys, don't do alone |
| Stateless | No shared context between buoys |
| Structured output | JSON, not prose |

> Never do alone what 3-4 buoys can do together.

---

## Installation Flow

```bash
npm install floatprompt   # Get the package
float init                # Scaffold .float/
```

Then either:
- **Cloud:** Connect to webhooks → agents maintain automatically
- **Local:** Run `float sync` manually, or just use maintained context

---

*Canonical overview for new sessions. See `boot.md` for full context.*
