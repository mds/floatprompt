---
name: float-capture
description: Save full session context with AI enrichment. Run when you've done significant work.
---

# /float-capture — Save Your Work

**The primary way to preserve session context.**

Run this when you've completed significant work. You get:
- Full log entry (title, decision, rationale)
- Updated folder context
- handoff.md for next session

---

## Why Manual Capture Matters

| Capture Type | Trigger | What You Get |
|--------------|---------|--------------|
| **Manual** (`/float-capture`) | You decide | Full enrichment + handoff.md |
| Auto (PreCompact) | Context fills up | Mechanical only (facts, no handoff) |
| Auto (SessionEnd) | You exit | Mechanical only (facts, no handoff) |

**Auto-capture is a safety net, not a replacement.**

PreCompact fires when context is nearly full, but compaction doesn't wait for AI agents to complete. You get the facts (what files changed) but not the understanding (why, what matters, what's next).

**Manual capture runs with no time pressure.** All agents complete. handoff.md is generated.

> **"PreCompact saves facts. Manual capture saves understanding."**

---

## When to Run

- Just finished a feature or significant fix
- Made an important decision
- About to switch focus areas
- Before ending a long session
- Anytime you'd be upset losing context

**Rule of thumb:** If the work matters, run `/float-capture`.

---

## What Gets Captured

### Mechanical (instant)
- Files changed this session
- Folders edited
- Diff size
- Timestamp

### AI Enrichment (~90 seconds)
- Session title (what was this about)
- Decision summary (what was decided)
- Rationale (why)
- handoff.md (AI-to-AI note for next session)
- Folder context updates
- Open questions resolved

---

## The Capture Pipeline

```
/float-capture
  │
  ├─ Phase 1: Mechanical INSERT (instant)
  │   └─ log_entry created with files, folders, timestamp
  │
  ├─ Phase 2: Entry Writers (~30-60s, parallel)
  │   ├─ float-log → title, decision, rationale
  │   └─ float-decisions → open questions
  │
  ├─ Phase 3: Entry Readers (~30-60s, parallel)
  │   ├─ float-enrich → folder context updates
  │   └─ float-handoff → writes .float/handoff.md
  │
  └─ Phase 4: Workshop (if .float-workshop/ exists)
      ├─ float-organize → cleanup
      └─ float-update-logs → decision logs
```

**Total time:** ~90 seconds for full enrichment.

---

## Running Capture

### Step 1: Check What Changed

```bash
git diff --name-only HEAD
```

### Step 2: Run Capture

```bash
${CLAUDE_PLUGIN_ROOT}/hooks/capture.sh --manual
```

### Step 3: Verify

```bash
sqlite3 .float/float.db "SELECT id, title, decision FROM log_entries ORDER BY id DESC LIMIT 1;"
```

Check handoff.md was updated:

```bash
head -10 .float/handoff.md
```

---

## End State

When capture completes:

| What | State |
|------|-------|
| `log_entries` | New session-handoff entry with full enrichment |
| `folders` | Edited folders context updated |
| `.float/handoff.md` | AI-to-AI note for next session |
| Context | Preserved for next session |

**Context saved. Continue working or end session.**

---

## Best Practice

```
Session work...
       ↓
Hit a milestone or finishing up
       ↓
Run /float-capture     ← SAVE YOUR WORK
       ↓
Continue (or exit)
```

Don't rely on auto-capture for context you care about. It's there if you forget, but manual capture is how you get the full benefit of FloatPrompt's context system.
