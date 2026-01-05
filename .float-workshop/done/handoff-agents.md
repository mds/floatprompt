# Handoff Agents

**Status:** DONE (Session 24)
**Purpose:** Create Claude Code subagents to automate handoff cleanup.

---

## Overview

`session-handoff.md` orchestrates session cleanup via subagents. Need agent definitions in `.claude/agents/` so Claude can auto-invoke them.

---

## Agents Created

| Agent | Protocol | Purpose |
|-------|----------|---------|
| `float-update-logs` | `protocols/update-logs.md` | Record session decisions to logs/ |
| `float-update-state` | `protocols/update-state.md` | Update `active/ACTIVE.md`, `later/LATER.md` |
| `float-update-files` | `protocols/update-files.md` | Tidy folder indexes when files move |
| `float-archive` | `protocols/archive.md` | Move validated work to `done/` |

---

## Agent Format

Each agent is a markdown file in `.claude/agents/`:

```yaml
---
name: float-update-logs
description: Record session decisions to logs/. Use during handoff.
tools: Read, Write, Edit, Glob, Grep
---

You are a session logger. Your job is to record decisions made during this session.

Read `protocols/update-logs.md` and execute the protocol:
1. Create decision file in `logs/YYYY/MM-mmm/`
2. Update month summary
3. Update year summary if new theme

Be thorough. Every decision should be captured for future sessions.
```

---

## Design Principle

**Agents thin, protocols fat.**

- Agent = triggers + tool access + brief persona
- Protocol = the actual logic and steps

Agents read their protocol and execute it. This keeps logic in one place (protocols/) and allows agents to be swapped or updated independently.

---

## Tool Access

| Agent | Tools |
|-------|-------|
| `float-update-logs` | Read, Write, Edit, Glob, Grep |
| `float-update-state` | Read, Write, Edit |
| `float-update-files` | Read, Write, Edit, Glob, Bash (git mv) |
| `float-archive` | Read, Write, Edit, Glob, Bash (git mv) |

---

## Permission Mode

Use `acceptEdits` — agents can edit files but edits are shown to user.

For fully autonomous: `bypassPermissions` (use with caution).

---

## Invocation

During handoff, Claude spawns agents:

```
Use the float-update-logs agent to record session decisions
Use the float-update-state agent to update folder indexes
Use the float-update-files agent to tidy folder indexes
Use the float-archive agent to archive validated work
```

Or in parallel where independent:

```
Spawn float-update-logs and float-update-state agents in parallel,
then spawn float-update-files and float-archive after.
```

---

*Implemented Session 24. Agents in `.claude/agents/`, protocols in `.float-workshop/protocols/`.*
