<fp>
<json>
{
  "STOP": "Session Handoff Protocol. Run at end of every context-building session. Updates boot.md, reconciles protocol and doc files, logs decisions.",

  "meta": {
    "title": "Session Handoff",
    "id": "handoff"
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
    "chain": [
      "1. Run update-logs.md — record session decisions",
      "2. Run update-123.md — update state files (_1, _2, _3)",
      "3. Run update-files.md — sync folder indexes (if files moved)",
      "4. Update boot.md — capture session changes",
      "5. Verify — check consistency across files"
    ],
    "critical": "This orchestrates the update protocols. Each protocol handles its domain."
  }
}
</json>
<md>
# Session Handoff

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

## The Handoff Chain

**Goal:** Orchestrate end-of-session updates across specialized protocols.

```
handoff.md (you are here)
  │
  ├── 1. update-logs.md    → logs/YYYY/MM-mon/*.md
  │
  ├── 2. update-123.md     → _1_next.md, _2_focus.md, _3_review.md
  │
  ├── 3. update-files.md   → foundation.md, specs.md, backlog.md
  │
  └── 4. boot.md updates   → Last Session, Possible Directions
```

Each protocol handles its own domain. This file orchestrates the sequence.

---

## Step 1: Run update-logs.md

**Goal:** Record what happened this session.

See `protocols/update-logs.md` for the full protocol.

**Quick version:**
1. Create `YYYY-MM-DD-topic.md` in current month folder
2. Update month's `01-jan.md` (or current month)
3. Update year's `2026.md` if new theme

**Skip if:** No decisions were made this session.

---

## Step 2: Run update-123.md

**Goal:** Update state files to reflect session outcome.

See `protocols/update-123.md` for the full protocol.

**Quick version:**
- Focus item completed → move to `_3_review`
- Focus item continuing → update summary in `_2_focus`
- New work identified → add to `_1_next`

---

## Step 3: Run update-files.md (conditional)

**Goal:** Sync folder indexes if files were moved.

See `protocols/update-files.md` for the full protocol.

**Skip if:** No docs changed folders this session.

**Run if:** Moved docs between foundation/, specs/, backlog/.

---

## Step 4: Update boot.md

**Goal:** Next session starts with accurate context.

### Update "Last Session"

```markdown
## Last Session

**YYYY-MM-DD (session N):** Brief summary of what happened this session.
```

### Update "Possible Directions"

**Key principle:** Present options, not orders. Human picks direction.

Scan `_1_next.md` and recent decision logs to identify options:
- **Locked but not built** — specs ready to implement
- **Pending validation** — tests or quality checks waiting
- **Open design work** — future features, architecture questions

### Also Check
- `## Answered Questions` — any new resolved questions?
- `## Open Questions` — any resolved or new?
- `## Drill-Down Files` table — any status changes?

### Update `.float/boot-draft.md` (if applicable)

**Skip if:** No buoys or commands changed this session.

**Update if:**
- Built a new buoy
- Added a CLI command
- Changed a field or principle

---

## Step 5: Verify

**Goal:** Double-check everything before ending session.

### Final checklist

- [ ] **Step 1:** Decision file created if decisions were made (`update-logs.md`)
- [ ] **Step 1:** Month summary (`01-jan.md`) updated
- [ ] **Step 2:** State files reflect session outcome (`update-123.md`)
- [ ] **Step 3:** Folder indexes synced if files moved (`update-files.md`)
- [ ] **Step 4:** `boot.md` "Last Session" updated
- [ ] **Step 4:** `.float/boot-draft.md` updated if buoys/commands changed
- [ ] **Step 5:** All files consistent, no contradictions
- [ ] **Step 5:** `handoff.md` updated if new patterns discovered

### Self-update check

If this handoff session revealed:
- New patterns not captured in the protocol
- Steps that should be added/removed
- Improvements to the checklist

Then update `handoff.md` itself before ending. The protocol should evolve as the project evolves.

### Command
```bash
# Quick grep for inconsistencies
grep -r "pending\|NEXT\|DO NOT BUILD\|not ready" .float-workshop/protocols/*.md .float-workshop/docs/*.md
```

Any results should be intentional, not stale.

---

## What This Replaces

This manual process (~15 min) is what agents will automate:

| Manual | Agent |
|--------|-------|
| Read all protocol/doc files | `parity_checker` queries SQLite |
| Archive stale files | `archiver` moves + logs via SQLite |
| Find inconsistencies | `parity_checker` finds via JOINs |
| Update boot.md | `session_handoff` writes to SQLite |
| Build reading list | `session_handoff` selects relevant docs |
| Create decision files | `decision_logger` INSERTs `log_entries` rows |
| Update summaries | `decision_logger` updates `folders.content_md` for log folders |
| Cross-reference check | `parity_checker` via `references` table |

**Note:** Summaries are stored in `folders` table as rows with `type = 'log_month'`, etc. They're not query-generated — AI writes them, SQLite stores them.

---

## Example Session

**Session:** Workshop reorg (2026-01-05)

**Step 1 (update-logs.md):**
- Created `2026-01-05-workshop-reorg.md` log entry
- Updated `01-jan.md` with summary

**Step 2 (update-123.md):**
- Updated `_2_focus.md` → plugin-architecture active
- Updated `_1_next.md` → rescan database, schema cleanup

**Step 3 (update-files.md):**
- Moved docs to foundation/, specs/, backlog/
- Updated folder indexes

**Step 4 (boot.md):**
- Updated "Last Session" with reorg summary
- Updated "Current State" structure diagram
- Updated all doc paths to new nested locations

**Step 5 (verify):**
- All protocols reference new paths
- State files populated with real content
- No broken references

---

*Updated 2026-01-05 — Simplified to 5-step chain orchestrating update-* protocols.*
</md>
</fp>
