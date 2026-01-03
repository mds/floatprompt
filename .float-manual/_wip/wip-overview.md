# How FloatPrompt Works

> **Note:** `.float/` in this doc refers to the TARGET structure we're building. The current `.float-old/` in this repo is stale (old structure).
>
> **Storage evolution:** The flat file structure shown here is Phase 1 (prototyping). SQLite becomes the source of truth in Phase 2-3. See `wip-sqlite.md` for full architecture.

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
   Maintains (via SQLite):                 Helps human:
   - folder context (structure)            - Build features
   - folder context (understanding)        - Debug issues
   - log entries (history)                 - Navigate codebase
```

**Agents build. Local understands. AI orchestrates both.**

---

## What Gets Installed

```
.float/
├── boot.md               # THE system prompt — orients AI to project
├── index.db              # SQLite database — source of truth for context
├── project/              # Optional: exported markdown for humans (Phase 4)
└── .version              # Installed version

.claude/commands/         # Thin wrappers (may be deprecated)
```

**SQLite stores:**
- `folders` table — map + context for each folder
- `log_entries` table — decisions, changes, paper trail
- `files` table — source files for change detection
- `references` table — cross-links for staleness

**boot.md is THE system prompt** — AI reads this first, then queries SQLite for context.

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
