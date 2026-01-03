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
ls .float-wip/_wip/wip-*.md
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

1. Run `ls .float-wip/_wip/wip-*.md`
2. For each file found, note its purpose from the filename
3. Read files you haven't seen before or that may have changed
4. Build mental map of current state before proceeding

---

## Phase 2: Update wip-boot.md

**Goal:** Next session starts with accurate context.

### Update "Last Session"

Replace the content with a one-liner about THIS session:

```markdown
## Last Session

**YYYY-MM-DD:** Brief summary of what happened this session.
```

### Update "This Session"

Point to what's next:

```markdown
## This Session

**Pick up here:** What should the next AI do first?

**Or ask:** "Need deeper context? Want to see any files? Know what we're working on?"
```

### Also check
- `## Answered Questions` — any new resolved questions?
- `## Open Questions` — any resolved or new?
- `## Drill-Down Files` table — any status changes?

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

### If yes → Run the wip-logs.md protocol

**This is a separate action.** Read `wip-logs/wip-logs.md` and follow its 4-level chain:

1. **Create decision file** — `YYYY-MM-DD-topic.md` in current month folder
2. **Update month summary** — Add entry to `01-jan.md` (or current month)
3. **Update year summary** — Add to `2026.md` if new theme emerges
4. **Update root** — Add to `wip-logs.md` only if new year

### After logging

Check that all summary files are consistent:
- Decision file exists and is complete
- Month summary (`01-jan.md`) has the new entry
- Year summary (`2026.md`) reflects any new themes

**Future:** This becomes a `decision_logger` buoy call.

```typescript
// What this will become:
await spawnBuoy('decision_logger', {
  topic: 'schema-drift-fix',
  decision: '...',
  rationale: '...',
  filesChanged: ['src/db/scan.ts']
});
```

The buoy handles the full chain — item, month, year, root, SQLite update.

---

## Phase 5: Verify

**Goal:** Double-check everything before ending session.

### Final checklist

- [ ] `wip-boot.md` "Last Session" updated with this session's summary
- [ ] `wip-boot.md` "This Session" points to what's next
- [ ] All wip-* files consistent with each other
- [ ] No contradictions between files
- [ ] Decision file created if decisions were made (Phase 4)
- [ ] Month summary (`01-jan.md`) updated with new decision (Phase 4)
- [ ] Year summary (`2026.md`) updated if new theme (Phase 4)
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
grep -r "pending\|NEXT\|DO NOT BUILD\|not ready" .float-wip/_wip/*.md
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
| Create decision files | `decision_logger` INSERTs `log_entries` rows |
| Update summaries | `decision_logger` updates `folders.content_md` for log folders |
| Cross-reference check | `parity_checker` via `references` table |

**Note:** Summaries are stored in `folders` table as rows with `type = 'log_month'`, etc. They're not query-generated — AI writes them, SQLite stores them.

---

## Example Session

**Session:** Summaries decision (2026-01-03)

**Phase 1 result:** 6 wip-* files found

**Phase 2 updates to wip-boot.md:**
- Updated "Last Session" with session summary
- Updated "This Session" to point to Q2/Q3
- Added "Data Model vs Files" section
- Added entry to "Answered Questions"

**Phase 3 found:**
- wip-phase4-qa.md Q1 still said "Open" — fixed to "Answered"

**Phase 4 created:**
- `2026-01-03-summaries-in-folders.md`
- Updated `01-jan.md` with new entry

**Phase 5 verified:**
- All files consistent
- wip-boot.md ready for next session

---

*Updated 2026-01-03 — Aligned with wip-boot.md "Last Session" / "This Session" structure.*
</md>
</fp>
