<fp>
<json>
{
  "STOP": "Session Handoff Protocol. Closes the session with 2 focused agents.",

  "meta": {
    "title": "Session Handoff",
    "id": "session-handoff"
  },

  "human": {
    "author": "@mds",
    "intent": "Ensure workshop is clean and ready for next session"
  },

  "ai": {
    "role": "Session closer — orchestrate cleanup with 2 agents"
  },

  "requirements": {
    "trigger": "Human says 'handoff', 'wrap up', 'end session', or similar",
    "agents": {
      "float-update-logs": "Record decisions to logs/ (optional — skip if no decisions)",
      "float-organize": "Update state, move files, archive (always runs)"
    }
  }
}
</json>
<md>
# Session Handoff

**Close the shop. Sweep up. Leave notes for tomorrow.**

Run at the end of every session to ensure the workshop is clean.

---

## When to Run

- End of planning sessions
- End of architecture discussions
- After significant work
- When human says "handoff", "wrap up", "end session"

---

## The Closing Sequence

```
session-handoff.md (you are here)
  │
  ├── 1. Review         → "What did we do?"
  │
  ├── 2. Spawn agents   → "Get the shop tidy"
  │   ├── float-update-logs   (if decisions made)
  │   └── float-organize      (always)
  │
  └── 3. Recap + verify → "Here's what changed"
```

---

## Step 1: Review Session Work

Check what happened this session:

- What was completed?
- What decisions were made?
- What's continuing to next session?
- Did any files change status?

---

## Step 2: Spawn Agents

### Agent: float-update-logs

**When:** Decisions were made this session.
**Skip if:** No decisions to record.

```
Spawn float-update-logs agent:
- Create decision file in logs/YYYY/MM-mmm/
- Update month summary
```

### Agent: float-organize

**When:** Always runs.

```
Spawn float-organize agent:
- Update active/ACTIVE.md and later/LATER.md
- Move files to correct locations
- Archive completed work to done/
- Update all affected indexes
```

---

## Step 3: Recap + Verify

After agents complete, report to human:

**Summary:**
- What was logged (decisions, if any)
- State changes (ACTIVE, LATER updates)
- Files moved (from → to)
- Items archived (if any)
- Suggested next steps

### Verification Checklist

- [ ] `active/ACTIVE.md` — reflects continuing work (≤ 3 items)
- [ ] `later/LATER.md` — queue is accurate (≤ 10 items)
- [ ] `done/DONE.md` — completed items added
- [ ] `logs/` — session decisions recorded (if any)
- [ ] No orphan files

---

## End State

When handoff completes:

| File | State |
|------|-------|
| `active/ACTIVE.md` | Current focus (≤ 3 items) |
| `later/LATER.md` | Queue for next session (≤ 10 items) |
| `done/DONE.md` | Completed work added |
| `logs/` | Session decisions recorded |

**The shop is swept. Tomorrow's todo list is on the bench.**

---

*The closing sequence. Every session ends here.*
</md>
</fp>
