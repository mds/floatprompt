# FloatPrompt Workshop

Development workspace for FloatPrompt. This file maps the structure and workflows.

---

## Quick Start

```
Session Start  →  boot.md
                    ↓
                  WORK
                    ↓
Session End    →  handoff.md
                    ├── update-logs.md   (record session)
                    ├── update-files.md  (update indexes)
                    └── update-123.md    (update state files)
```

---

## State Files

Lightweight pointers with AI-friendly summaries. Updated by `update-123.md` protocol.

| File | Purpose | Updated By |
|------|---------|------------|
| `_1_next.md` | Work queue — ordered, ready to pull | `update-123.md` |
| `_2_focus.md` | Active this session — what we're working on | `update-123.md` |
| `_3_review.md` | Needs validation — done but unconfirmed | `update-123.md` |

---

## Folder Structure

```
.float-workshop/
├── workshop.md                 # ← You are here
│
├── _1_next.md                  # State: queued work
├── _2_focus.md                 # State: active work
├── _3_review.md                # State: pending validation
│
├── docs/                       # Documentation
│   ├── foundation/             # "Why" — vision, orientation
│   │   ├── foundation.md       # Index for this folder
│   │   ├── vision.md
│   │   └── deep-context-floatprompt.md
│   │
│   ├── specs/                  # "How" — locked, implemented
│   │   ├── specs.md            # Index for this folder
│   │   ├── buoys.md
│   │   ├── generate-spec.md
│   │   ├── deep-context.md
│   │   └── comments.md
│   │
│   ├── backlog/                # "Not now" — parked work
│   │   ├── backlog.md          # Index + blocked section
│   │   ├── wip-float-build-spec.md
│   │   ├── wip-layer-3-ongoing.md
│   │   ├── vercel-sdk-integration-spec.md
│   │   ├── float-CMS-context-management-system.md
│   │   └── workshop.md
│   │
│   └── plugin-architecture.md  # Active focus (root until complete)
│
├── logs/                       # Session records
│   ├── logs.md                 # Index: all sessions
│   └── 2026/01-jan/            # Session logs by date
│
└── protocols/                  # Workflows
    ├── boot.md                 # Start session
    ├── handoff.md              # End session (orchestrator)
    ├── update-logs.md          # Record session → logs/
    ├── update-files.md         # Update folder indexes
    └── update-123.md           # Update _#_ state files
```

---

## Docs Breakdown

### foundation/
Always-on reference. Read to understand the system.

| Doc | Summary |
|-----|---------|
| `vision.md` | North star — "context-as-code", progressive disclosure |
| `deep-context-floatprompt.md` | System orientation for new sessions |

### specs/
Locked implementations. Reference when building.

| Doc | Summary |
|-----|---------|
| `buoys.md` | Micro-prompt architecture for folder analysis |
| `generate-spec.md` | Context file generation spec |
| `deep-context.md` | Deep context system implementation |
| `comments.md` | Comment format standards |

### backlog/
Parked work. Not active — may revisit later.

| Doc | Status | Why Parked |
|-----|--------|------------|
| `wip-float-build-spec.md` | Tabled | Plugin-first approach faster |
| `wip-layer-3-ongoing.md` | Blocked | Needs plugin architecture first |
| `vercel-sdk-integration-spec.md` | Tabled | Plugin-first approach faster |
| `float-CMS-context-management-system.md` | Superseded | Plugin model replaces this |
| `workshop.md` | Parked | Original workshop notes |

---

## Protocols

### Session Lifecycle

| Protocol | When | Purpose |
|----------|------|---------|
| `boot.md` | Session start | Orient Claude, load focus, set context |
| `handoff.md` | Session end | Orchestrate end-of-session tasks |

### Handoff Chain

`handoff.md` triggers these in sequence:

| Protocol | Purpose | Outputs |
|----------|---------|---------|
| `update-logs.md` | Record what happened | → `logs/YYYY/MM-mmm/YYYY-MM-DD-title.md` |
| `update-files.md` | Update folder indexes | → `docs/*/folder.md` files |
| `update-123.md` | Update state files | → `_1_next.md`, `_2_focus.md`, `_3_review.md` |

---

## State Flow

```
                    ┌─────────────────────────────────┐
                    │                                 │
                    ▼                                 │
┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐
│ _1_next  │ → │ _2_focus │ → │ _3_review│ → │  specs/  │
│  (queue) │   │ (active) │   │(validate)│   │  (done)  │
└──────────┘   └──────────┘   └──────────┘   └──────────┘
     ▲                              │
     │                              │ (rejected)
     └──────────────────────────────┘

                    │
                    ▼ (parked)
              ┌──────────┐
              │ backlog/ │
              └──────────┘
```

---

## Index Files

Each folder has a self-describing `folder.md`:

| Index | Contains |
|-------|----------|
| `docs/foundation/foundation.md` | What's in foundation/, why it matters |
| `docs/specs/specs.md` | What's implemented, status of each |
| `docs/backlog/backlog.md` | What's parked + blocked section |
| `logs/logs.md` | Session log index, recent activity |

State files (`_#_*.md`) point to these indexes for quick AI navigation.

---

## Conventions

### File Naming
- `_#_name.md` — State files (numbered for sort order)
- `folder/folder.md` — Folder indexes
- `YYYY-MM-DD-title.md` — Log files

### Status Labels
- **Active** — Currently being worked on
- **Locked** — Implemented, don't modify without discussion
- **Tabled** — Parked intentionally, may revisit
- **Blocked** — Parked with dependency, will revisit
- **Superseded** — Replaced by newer approach

### State File Format
```markdown
## Item Name
**Doc:** [path/to/file.md](path/to/file.md)
**Status:** Active | Blocked | etc.
**Summary:** 1-3 sentences for AI context.
```

---

## Current Focus

**Primary:** `docs/plugin-architecture.md`
Converting FloatPrompt buoys to Claude Code native agents/skills.

See `_2_focus.md` for full context.
