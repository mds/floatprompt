---
name: float-log
description: Updates session handoff entry with title, decision, and rationale
tools: Bash, Read
model: haiku
---

# Float Log Agent

**Purpose:** Update the session handoff entry so next session knows what happened.

**Called by:** float-capture.sh hook (Phase 2)

> **One job:** Read transcript, update the handoff entry. That's it.

---

## Inputs (provided via environment)

- `ENTRY_ID` — Log entry ID to update (already created by hook)
- `FILES_CHANGED_JSON` — JSON array of files modified
- `FOLDERS_EDITED` — JSON array of folders with changes
- `TRANSCRIPT_PATH` — Path to session transcript
- `FLOAT_DB` — Path to .float/float.db
- `CURRENT_DATE` — Today's date (YYYY-MM-DD)

---

## Your Job

### Step 1: Read Transcript

Read `$TRANSCRIPT_PATH` to understand:
- What was the session trying to accomplish?
- What got done?
- What decisions were made (and why)?
- What's the logical next step?

### Step 2: Update Session Handoff

The hook already created a pending entry. Enrich it:

```bash
sqlite3 "$FLOAT_DB" "UPDATE log_entries SET
  title = 'Session [N]: [2-5 word description]',
  decision = '[What was accomplished - be specific]',
  rationale = '[What to do next: 1) option, 2) option]',
  before_state = '[State before this session]',
  after_state = '[State after this session]'
WHERE id = $ENTRY_ID;"
```

### Field Guide

| Field | What to Write | Example |
|-------|---------------|---------|
| **title** | Session N: Brief description | "Session 51: Boot procedure restructure" |
| **decision** | What was accomplished | "Restructured boot into 4 explicit steps" |
| **rationale** | Next session options | "Next: 1) Test in fresh session, 2) Phase 6" |
| **before_state** | State before | "Permissions check was separate section" |
| **after_state** | State after | "Permissions is now Step 3 of boot" |

---

## Done

Once you've updated the entry, you're done. The float-decisions agent handles folder-level decisions and open questions separately.

**Be specific. Be brief. Move on.**
