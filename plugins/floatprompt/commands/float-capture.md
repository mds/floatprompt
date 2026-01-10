---
name: float-capture
description: Manually capture session context to float.db. Use mid-session to save significant work.
---

# /float-capture — Manual Context Capture

**Save a checkpoint. Keep working.**

Run mid-session when you've completed significant work and want to preserve context.

---

## When to Run

- Just finished a feature or decision
- About to switch to a different area of the codebase
- Want to ensure context is preserved before a risky operation
- Session has 50%+ context left but you want to save now

---

## The Capture Sequence

```
float-capture (you are here)
  │
  ├── 1. Gather        → "What changed?"
  │
  ├── 2. Capture       → "Write to float.db"
  │   └── Phase 1: Mechanical (sqlite3 INSERT) — instant
  │
  └── 3. Confirm       → "Here's what was saved"
```

**Note:** Manual capture attempts to find the current session transcript. If found, all phases run with full AI enrichment. If no transcript is available, only Phase 1 (mechanical) runs.

---

## Step 1: Gather Session Data

Check what changed this session:

```bash
git diff --name-only HEAD
```

Report:
- Files changed: [count]
- Folders affected: [list]

---

## Step 2: Run Capture

The capture script auto-detects project root:

```bash
${CLAUDE_PLUGIN_ROOT}/hooks/float-capture.sh --manual
```

This runs:
- **Phase 1:** Mechanical sqlite3 INSERT (instant, <1 second)

AI agents (Phases 2-4) only run on automatic PreCompact capture when transcript is available.

---

## Step 3: Confirm What Was Saved

Query the capture result:

```bash
sqlite3 .float/float.db "SELECT id, title, decision FROM log_entries ORDER BY id DESC LIMIT 1;"
```

Report to user:

**Capture Summary:**
- Entry ID: [N]
- Title: [session title]
- Files captured: [count]
- Folders enriched: [list]

---

## End State

When capture completes:

| What | State |
|------|-------|
| `log_entries` | New session-handoff entry |
| `folders` | Edited folders marked `current` |
| `.float/handoff.md` | AI-to-AI note for next session |
| Context | Preserved for next session |

**Context saved. Continue working.**

---

## Relationship to Automatic Capture

| Trigger | When | Phases |
|---------|------|--------|
| PreCompact (auto) | Context filling up | All (1-4) |
| SessionEnd (auto) | User exits | Phase 1 only |
| /float-capture (manual) | You decide | All (1-4) if transcript found, else Phase 1 |

Manual capture with transcript = full enrichment + handoff.md while session is alive.
