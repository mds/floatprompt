<fp>
<json>
{
  "STOP": "Session Reconciliation Protocol. Run at end of every context-building session. Updates wip-boot, reconciles wip-* files, logs decisions.",

  "meta": {
    "title": "Session Reconcile",
    "id": "wip-reconcile"
  },

  "human": {
    "author": "@mds",
    "intent": "Ensure all session work is captured for future sessions"
  },

  "ai": {
    "role": "Session reconciler — meticulous, exhaustive, no shortcuts"
  },

  "requirements": {
    "trigger": "Human says 'reconcile', 'end session', 'wrap up', or similar",
    "phases": [
      "Phase 1: Inventory — list all wip-* files",
      "Phase 2: Update wip-boot.md — capture session changes",
      "Phase 3: Cross-reference — check consistency across wip-* files",
      "Phase 4: Log decisions — create decision files, update summaries",
      "Phase 5: Verify — double-check everything"
    ],
    "critical": "This is the manual process that agents will automate. Be exhaustive."
  }
}
</json>
<md>
# Session Reconcile

**Run at the end of every context-building session.**

This protocol ensures all session work is captured for future sessions. It's the manual version of what agents will automate.

---

## When to Run

- End of planning sessions
- End of architecture discussions
- After making decisions
- Before ending any significant session
- When human says "reconcile", "end session", "wrap up"

---

## Phase 1: Inventory

**Goal:** Know what files exist and what each contains.

```bash
# List all wip-* files (count will grow over time)
ls .float-manual/_wip/wip-*.md
```

**Action:** Read each file found. The list is dynamic — new wip-* files may be added as project evolves.

### Known File Patterns

| Pattern | Purpose |
|---------|---------|
| `wip-boot.md` | THE entry point — session handoff context (always exists) |
| `wip-*.md` | Topic-specific planning/architecture files |
| `wip-readme.md` | Pointer to wip-boot.md |
| `wip-reconcile.md` | This file |

### Discovery Process

1. Run `ls .float-manual/_wip/wip-*.md`
2. For each file found, note its purpose from the filename
3. Read files you haven't seen before or that may have changed
4. Build mental map of current state before proceeding

---

## Phase 2: Update wip-boot.md

**Goal:** Session Handoff section reflects this session's work.

### Check
1. Open `wip-boot.md`
2. Find `## Session Handoff` section
3. Is today's date listed?
4. Are this session's changes documented?

### Update
Add new section for today if needed:

```markdown
### YYYY-MM-DD (Summary)

N. **Change summary**
   - Detail 1
   - Detail 2
```

### Also check
- `## Drill-Down Files` table — any status changes?
- `## Open Questions` — any resolved or new?
- `## Key Decisions` — any new locked decisions?

---

## Phase 3: Cross-reference wip-* Files

**Goal:** All files are consistent with each other.

### Checklist

| Check | How |
|-------|-----|
| Status consistency | If one file says "Phase 2 ready", all should agree |
| Reference accuracy | Links between files still valid? |
| Stale notes | "TARGET vs STALE" notes still accurate? |
| Next steps | All files point to same "what's next"? |

### Common issues
- One file says "pending", another says "complete"
- Outdated "See X for next steps"
- Broken internal links

### Action
Fix any inconsistencies found.

---

## Phase 4: Log Decisions

**Goal:** All decisions have paper trail.

### Questions
1. Were any decisions made this session?
2. Do they warrant a decision file?

### If yes, create decision file

**Location:** `.float-manual/_wip/wip-logs/YYYY/MM-mon/YYYY-MM-DD-topic.md`

**Format (from wip-logs.md):**
```markdown
# Decision Title

**Date:** YYYY-MM-DD
**Status:** Locked

---

## Decision

[What was decided]

---

## Rationale

[Why this decision was made]

---

## Files Changed

| File | Change |
|------|--------|
| `file.md` | What changed |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| [type] | [agent name] |
```

### Update summaries

1. **Update month summary** (`01-jan.md`):
   - Add row to Files table
   - Update any status summaries

2. **Update year summary** (`2026.md`) if new theme emerges

3. **Update root summary** (`wip-logs.md`) only if new year

### Re-import to SQLite

If `float.db` exists, re-run the importer to include new decision files:

```bash
node dist/db/import.js .float-manual/float.db .float-manual/_wip/wip-logs/2026/01-jan
```

**The importer is idempotent** — it skips files already in the database (matched by date + topic). Safe to run multiple times.

---

## Phase 5: Verify

**Goal:** Double-check everything before ending session.

### Final checklist

- [ ] `wip-boot.md` Session Handoff updated for today
- [ ] All wip-* files consistent with each other
- [ ] No contradictions between files
- [ ] Decision file created if decisions were made
- [ ] Month summary updated with new decision
- [ ] "Next steps" in all files point to correct action
- [ ] **This file (`wip-reconcile.md`)** — Does protocol need updating based on this session?

### Self-update check

If this reconciliation session revealed:
- New patterns not captured in the protocol
- Steps that should be added/removed
- Improvements to the checklist

Then update `wip-reconcile.md` itself before ending. The protocol should evolve as the project evolves.

### Command
```bash
# Quick grep for inconsistencies
grep -r "pending\|NEXT\|DO NOT BUILD\|not ready" .float-manual/_wip/*.md
```

Any results should be intentional, not stale.

---

## What This Replaces

This manual process (~15 min) is what agents will automate:

| Manual | Agent |
|--------|-------|
| Read all wip-* files | `parity_checker` queries SQLite |
| Find inconsistencies | `parity_checker` finds via JOINs |
| Update wip-boot.md | `decision_logger` writes to SQLite |
| Create decision files | `decision_logger` INSERTs rows |
| Update summaries | Eliminated — summaries become queries |
| Cross-reference check | `parity_checker` via `references` table |

---

## Example Session

**Session:** Phase 2 planning (2026-01-03)

**Phase 1 result:** N wip-* files found (dynamic count)

**Phase 2 updates to wip-boot.md:**
- Added "2026-01-03 (Phase 2 Planning Complete)" section
- Updated Drill-Down Files table

**Phase 3 found:**
- wip-sqlite.md said "NEXT" for answered questions — fixed

**Phase 4 created:**
- `2026-01-03-phase2-planning-complete.md`
- Updated `01-jan.md` with new entry

**Phase 5 verified:**
- All files consistent
- No stale "pending" references

---

*This floatprompt encodes the manual reconciliation process observed on 2026-01-03.*
</md>
</fp>
