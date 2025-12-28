---
title: Sessions
type: float
status: current
ai_updated: 2025-12-28
---

# Sessions

Activity history for the FloatPrompt project.

---

## Contents

| File | Purpose |
|------|---------|
| **log-YYYY-MM-DD.md** | Daily session log (one file per day) |

---

## Purpose

- **Handoff context** — New AI sessions see recent activity
- **Audit trail** — What happened, when, which AI
- **History** — Long-term record of project evolution
- **Session boundaries** — Clear separation between conversations

---

## File Format

### Naming

```
log-YYYY-MM-DD.md
```

Examples:
- `log-2025-12-28.md` — Today's sessions
- `log-2025-12-29.md` — Tomorrow's sessions

One file per day. Multiple sessions within a day are marked internally.

### Structure

```markdown
---
title: "YYYY-MM-DD"
type: log
status: current
ai_model: [model name]
ai_updated: YYYY-MM-DD
---

# YYYY-MM-DD

Daily session log. Newest entries first.

---

# Session 2 — HH:MM (optional title)

Brief description of what this session is about.

---

## HH:MM — Entry title
commit: abc1234

- What changed
- Why it matters

---

# Session 1 — HH:MM (optional title)

Brief description.

---

## HH:MM — Entry title
commit: def5678

- What changed
```

### Key Rules

1. **Newest first** — Like `git log`, most recent at top
2. **Session markers** — New `# Session N` when context resets (new conversation)
3. **Entry format** — `## HH:MM — Title` + commit hash + bullets
4. **Commit hash** — Ties log entry to git history
5. **Brief bullets** — The "why" that git doesn't capture

---

## When to Log

**Log after:**
- Significant code changes (commits)
- Architecture decisions
- File renames or reorganization
- Spec updates
- Any work worth handing off

**Don't log:**
- Every tiny edit
- Reading/exploration without changes
- Failed attempts (unless instructive)

---

## Session Boundaries

A **new session** starts when:
- Context window resets (new conversation)
- Different AI model takes over
- Significant time gap (next day, or hours later with fresh context)

Within a session, just add entries under the current session header.

---

## AI Instructions

**Starting a session:**
1. Check for today's log file (`log-YYYY-MM-DD.md`)
2. If exists, read it for context
3. If new day, create new file
4. Add session header if this is a new conversation

**During work:**
- Log after commits, not before
- Keep bullets brief and focused on "why"
- Include commit hash for traceability

**Ending a session:**
- Ensure all significant work is logged
- Final entry should give next session enough context to continue

<!-- AI: Create log-YYYY-MM-DD.md for today if it doesn't exist. Add session header for new conversations. Append entries after significant work. -->
