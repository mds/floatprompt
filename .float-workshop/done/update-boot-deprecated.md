<fp>
<json>
{
  "STOP": "Boot Update Protocol. Read before updating session-boot.md.",

  "id": "update-boot",
  "title": "Update Boot",

  "human": {
    "author": "@mds",
    "intent": "Ensure next session (fresh chat, zero context) has everything it needs"
  },

  "ai": {
    "role": "Context curator — synthesize session into boot context",
    "perspective": "Write for someone with ZERO prior knowledge"
  },

  "requirements": {
    "purpose": "Prepare session-boot.md so next session can continue seamlessly",
    "runs": "Last in handoff sequence, after all other agents",
    "inputs": [
      "Conversation history (what was discussed, decided, built)",
      "Changes from other agents (logs, state, files, archives)",
      "Current active/ACTIVE.md and later/LATER.md"
    ],
    "outputs": [
      "Updated 'Last Session' section",
      "Updated 'Current Focus' / 'Possible Directions'",
      "Updated 'Open Questions' / 'Answered Questions'",
      "Incremented session number"
    ]
  }
}
</json>
<md>
# Update Boot

**Purpose:** Update `session-boot.md` so the next session starts with full context.

**Called by:** `session-handoff.md` (runs last, after all other agents)

> **Key principle:** Write for a fresh session with ZERO context. Be specific, not vague.
> The boot file is the primary context carrier — it must stand alone.

---

## When to Run

- Always during handoff (runs last)
- After float-update-logs, float-update-state, float-update-files, float-archive complete

---

## Protocol

### Step 1: Gather Context

Before updating, read:
- Conversation history — what happened this session
- `active/ACTIVE.md` — current focus items
- `later/LATER.md` — queued items
- `logs/` — any decisions logged this session
- `done/` — any items archived this session

### Step 2: Update "Last Session"

**Always update.** This is the most critical section.

```markdown
## Last Session

**YYYY-MM-DD (session N):** Brief summary of what happened.

Key outcomes:
- Specific outcomes, not vague summaries
- Decisions made and why
- State changes (what's different now)
- Files created/moved/archived
```

**Quality standards:**
- Increment session number
- Be specific: "Built 5 handoff agents" not "Made progress"
- Focus on outcomes: "Agents now automate handoff" not "Worked on agents"
- Include what changed, not just what was discussed

### Step 3: Update "Current Focus"

What should next session work on?

- Reference items in `active/ACTIVE.md`
- Note any blockers or dependencies
- Suggest natural next steps from this session

### Step 4: Update "Possible Directions"

Think through what the human might want to do next:

- Obvious next steps from current work
- Alternative approaches worth considering
- Items from `later/LATER.md` that might be ready
- Things that might need attention

**Use judgment.** Give the human good options to choose from.

### Step 5: Update Questions

**Answered Questions:**
- Move questions that were resolved this session
- Include brief answer or reference to decision

**Open Questions:**
- Add new questions that emerged
- Remove questions no longer relevant

### Step 6: Update Structure (if needed)

Only if files/folders changed significantly:

- "What's Built" section
- "Current State" section
- "Drill-Down Files" table (update status: EXPLORING → LOCKED, etc.)

---

## Quality Standards

| Do | Don't |
|----|-------|
| "Built 5 handoff agents in .claude/agents/" | "Made progress on agents" |
| "Decided: plugin-first approach" | "Discussed options" |
| "Next: test agents in fresh session" | "Continue work" |
| "Archived handoff-agents.md to done/" | "Cleaned up files" |

**The test:** Could a fresh session with only session-boot.md understand what's happening and continue productively?

---

## Output

After updating, return summary:
- Session number: N-1 → N
- Sections updated
- Key context added for next session
- Suggested next steps

---

*The boot file is the bridge between sessions. Make it count.*
</md>
</fp>
