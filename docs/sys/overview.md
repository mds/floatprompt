# How FloatPrompt Works

Overview of the FloatPrompt system — architecture, execution model, and goals.

---

## The Architecture

```
Cloud Agents (build/maintain)          Local Session (understand/help)
        │                                       │
        ▼                                       ▼
┌─────────────────┐                    ┌─────────────────┐
│  TypeScript     │                    │  Claude Code    │
│  tools in       │───── .float/ ─────│  reads boot.md  │
│  Vercel Sandbox │                    │  has context    │
└─────────────────┘                    └─────────────────┘
        │                                       │
        ▼                                       ▼
   Maintains:                              Helps human:
   - nav/ files                            - Build features
   - context/ files                        - Debug issues
   - logs/                                 - Navigate codebase
```

**Agents build. Local understands.**

---

## What Gets Installed

```
.float/
├── boot.md           # Orients Claude Code to context
├── project/
│   ├── context/      # Deep understanding (agent-maintained)
│   ├── logs/         # Session history
│   └── nav/          # Folder maps (agent-maintained)
└── .version          # Installed version

.claude/commands/     # Thin wrappers (may be deprecated)
```

---

## Execution Model

| Layer | Role | Example |
|-------|------|---------|
| **TypeScript** | Mechanical work | Scan folders, compare files, generate nav |
| **AI judgment** | Decisions when needed | "Is this description accurate?" |
| **Markdown** | Interface | What humans and Claude Code read |

**Code orchestrates. AI judges. .md is the interface.**

---

## Two Modes

### Cloud Mode (Agents)

```bash
# Agents run continuously or on triggers
float sync    # TypeScript scans → AI judges → TypeScript writes
float fix     # Detects drift → proposes fixes
float context # Generates terrain maps
```

- Runs in Vercel Sandbox (isolated, scalable)
- Unlimited parallel agents
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

Because agents are cheap (cloud, parallel), tools should be:

| Principle | Why |
|-----------|-----|
| Small, focused | One tool = one job |
| Composable | Orchestrator combines tools |
| Stateless | No shared context between agents |
| Structured output | JSON, not prose |

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

*Canonical overview for new sessions. See `README.md` for reading order.*
