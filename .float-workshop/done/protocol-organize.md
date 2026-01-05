<fp>
<json>
{
  "STOP": "Workshop Organization Protocol. Single-pass cleanup of state, files, and archive.",

  "id": "organize",
  "title": "Organize",

  "human": {
    "author": "@mds",
    "intent": "One agent, one pass through the workshop — put everything where it belongs"
  },

  "ai": {
    "role": "Workshop organizer — update indexes, move files, archive completed work",
    "principle": "Files live where their status says. Indexes reflect reality. Done is terminal."
  },

  "requirements": {
    "purpose": "Update ACTIVE.md, LATER.md, move files, archive completed work",
    "called_by": "session-handoff.md (always runs at end of session)",
    "indexes": {
      "active/ACTIVE.md": "Current focus (limit: 3)",
      "later/LATER.md": "Parked work (limit: 10)",
      "done/DONE.md": "Completed work",
      "ref/REF.md": "Stable reference docs"
    },
    "status_locations": {
      "Active": "active/",
      "Locked": "ref/",
      "Tabled": "later/",
      "Blocked": "later/",
      "Done": "done/"
    }
  }
}
</json>
<md>
# Organize

**Purpose:** Single-pass workshop cleanup — update state, move files, archive completed work.

**Called by:** `session-handoff.md` (always runs)

> **Key principle:** Files live where their status says. Indexes reflect reality.

---

## What This Does

1. Updates `active/ACTIVE.md` and `later/LATER.md` (state)
2. Moves files to correct locations (files)
3. Archives completed work to `done/` (archive)

All in one pass, one agent, one mental model.

---

## Protocol

### Step 1: Assess Session Outcome

What happened this session?

- [ ] Active item completed → archive to `done/`
- [ ] Active item blocked → note in ACTIVE or move to `later/`
- [ ] Active item continuing → update summary in ACTIVE
- [ ] New work identified → add to `later/`
- [ ] Doc status changed → move to correct folder

### Step 2: Move Files (if needed)

Move files to match their status:

```bash
# Completed → done/
git mv active/doc.md done/doc.md

# Locked/stable → ref/
git mv active/doc.md ref/doc.md

# Tabled/blocked → later/
git mv active/doc.md later/doc.md
```

### Step 3: Update All Indexes

Update each affected index file:

**active/ACTIVE.md:**
```markdown
| Item | Status | Summary |
|------|--------|---------|
| `current-work.md` | Primary | What's happening |
```

**later/LATER.md:**
```markdown
| Item | Why Parked | Ready to Pull? |
|------|------------|----------------|
| `parked-work.md` | Reason | Yes / No / Blocked |
```

**done/DONE.md:**
```markdown
| Item | Completed | Summary |
|------|-----------|---------|
| `finished-work.md` | YYYY-MM-DD | What it was |
```

**ref/REF.md:**
```markdown
| Doc | Summary |
|-----|---------|
| `stable-doc.md` | Brief description |
```

### Step 4: Archive Check

For any item marked complete:

Ask: "Does this meet completion criteria?"

- **Yes** → move to `done/`, update `done/DONE.md`
- **No** → leave in `active/` or move to `later/`

> Done is terminal. Things rarely come back.

### Step 5: Consistency Check

Verify:
- [ ] Files exist where indexes say they are
- [ ] No orphan files (in folder but not in index)
- [ ] No stale entries (in index but file moved/deleted)
- [ ] Limits respected (active ≤ 3, later ≤ 10)

---

## Status Definitions

| Status | Meaning | Location |
|--------|---------|----------|
| Active | Being worked on | `active/` |
| Locked | Implemented, stable | `ref/` |
| Tabled | Intentionally paused | `later/` |
| Blocked | Waiting on dependency | `later/` |
| Done | Completed | `done/` |

---

## Output

Return summary of all changes:

- **State:** Items added/removed from ACTIVE, LATER
- **Files:** Files moved (from → to)
- **Archived:** Items moved to done/ (with dates)
- **Warnings:** Limit violations, orphan files, inconsistencies

---

*One pass. Everything in its place.*
</md>
</fp>
