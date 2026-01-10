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
  ├── 2. Capture       → "Write to float.db + handoff.md"
  │   ├── Phase 1: Mechanical (sqlite3 INSERT)
  │   ├── Phase 2: AI synthesis (parallel)
  │   │   ├── float-log        → session handoff entry
  │   │   └── float-decisions  → folder decisions + questions
  │   ├── Phase 3: float-enrich → folder context
  │   └── Phase 4: float-handoff → .float/handoff.md
  │
  └── 3. Confirm       → "Here's what was saved"
```

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
- **Phase 1:** Mechanical sqlite3 INSERT (guaranteed)
- **Phase 2:** Parallel agents — float-log (session handoff) + float-decisions (folder decisions)
- **Phase 3:** float-enrich agent updates folder context
- **Phase 4:** float-handoff agent writes `.float/handoff.md`

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
| /float-capture (manual) | You decide | All (1-4) |

Manual capture = full enrichment + handoff.md while session is alive.
