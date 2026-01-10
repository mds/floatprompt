---
type: orientation
title: FloatPrompt Workshop
description: Development workspace for FloatPrompt
---

# FloatPrompt Workshop

Development workspace for FloatPrompt. This file maps the structure and workflows.

---

## Quick Start

```
Session Start  →  /float-boot
                    ↓
                  WORK
                    ↓
Session End    →  /float-handoff
                    ├── float-update-logs agent (record decisions)
                    └── float-organize agent    (state, files, archive)
```

---

## Folder Structure

```
.float-workshop/
├── README.md                   # ← You are here (READ THIS FIRST)
│
├── active/                     # Current work (limit: 3)
│   ├── ACTIVE.md               # Index
│   └── *.md                    # Active items
│
├── later/                      # Parked work (limit: 10)
│   ├── LATER.md                # Index
│   └── *.md                    # Queued items
│
├── done/                       # Completed work
│   ├── DONE.md                 # Index
│   └── *.md                    # Frozen job files
│
├── ref/                        # Stable reference docs
│   ├── REF.md                  # Index
│   └── *.md                    # Reference documents
│
├── modes/                      # Context loadouts (opt-in deep context)
│   ├── MODES.md                # Index of available modes
│   └── deep-strategy.md        # Strategic planning mode
│
└── logs/                       # Session records
    ├── LOGS.md                 # Index: all sessions
    └── 2026/01-jan/            # Session logs by date
```

---

## Work Lifecycle

```
later/ ──pull──▶ active/ ──finish──▶ done/
   ▲                │
   └───park─────────┘
```

| Folder | Purpose | Limit |
|--------|---------|-------|
| `active/` | What's in hands NOW | 3 items |
| `later/` | Will do, not now | 10 items |
| `done/` | Completed work | No limit |
| `ref/` | Stable reference docs | No limit |
| `modes/` | Context loadouts (opt-in) | No limit |

---

## Commands & Agents

### Session Commands

| Command | When | Purpose |
|---------|------|---------|
| `/float-boot` | Session start | Orient Claude, load focus, set context |
| `/float-handoff` | Session end | Orchestrate end-of-session cleanup |

### Handoff Agents

`/float-handoff` spawns these agents:

| Agent | Purpose | Outputs |
|-------|---------|---------|
| `float-update-logs` | Record decisions | → `logs/YYYY/MM-mmm/YYYY-MM-DD-topic.md` |
| `float-organize` | State, files, archive | → indexes, file moves, `done/` |

---

## Index Files

Each folder has a self-describing index:

| Index | Contains |
|-------|----------|
| `active/ACTIVE.md` | Current focus (limit: 3) |
| `later/LATER.md` | Parked work (limit: 10) |
| `done/DONE.md` | Completed work |
| `ref/REF.md` | Reference docs inventory |
| `modes/MODES.md` | Available context loadouts |
| `logs/LOGS.md` | Session log index |

---

## Conventions

### File Naming
- `folder/FOLDER.md` — Folder indexes (uppercase)
- `YYYY-MM-DD-title.md` — Log files

### Status Labels
- **Active** — Currently being worked on
- **Locked** — Implemented, don't modify without discussion
- **Tabled** — Parked intentionally, may revisit
- **Blocked** — Parked with dependency, will revisit
- **Superseded** — Replaced by newer approach

---

## Current Focus

**Primary:** `active/floatprompt-plugin.md`
FloatPrompt Claude Code plugin — 11/11 tests passed, ready for distribution (Phase 6).

See `active/ACTIVE.md` for full context.
