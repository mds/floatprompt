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
    "phases": [
      "Phase 1: Inventory — list all protocol and doc files",
      "Phase 2: Archive stale files — move superseded docs to logs/",
      "Phase 3: Update boot.md — capture session changes + reading list",
      "Phase 4: Cross-reference — check consistency across files",
      "Phase 5: Log decisions — create decision files, update summaries",
      "Phase 6: Verify — double-check everything"
    ],
    "critical": "This is the manual process that agents will automate. Be exhaustive."
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

## Phase 1: Inventory

**Goal:** Know what files exist and what each contains.

```bash
# List all protocol and doc files
ls .float-workshop/protocols/*.md .float-workshop/docs/*.md
```

**Action:** Read each file found. The list is dynamic — new files may be added as project evolves.

### Known File Patterns

| Pattern | Purpose |
|---------|---------|
| `protocols/boot.md` | THE entry point — session handoff context (always exists) |
| `docs/*.md` | Topic-specific planning/architecture files |
| `protocols/handoff.md` | This file |

### Discovery Process

1. Run `ls .float-workshop/protocols/*.md .float-workshop/docs/*.md`
2. For each file found, note its purpose from the filename
3. Read files you haven't seen before or that may have changed
4. Build mental map of current state before proceeding

---

## Phase 2: Archive Stale Files

**Goal:** Keep docs/ clean. Only active documents live there.

### When to Archive

A doc file should be archived when:
- Its work is **complete** (e.g., phase3.md after Phase 3 is done)
- It's been **superseded** by another document (e.g., overview.md replaced by vision.md)
- The topic is **no longer active** and only has historical value

### How to Archive

1. **Move** the file to `logs/YYYY/MM-mon/` with date prefix:
   ```bash
   git mv docs/phase3.md logs/2026/01-jan/2026-01-03-phase3-archived.md
   ```

2. **Create a log entry** documenting why it was archived:
   ```markdown
   # Doc Archival

   **Date:** 2026-01-03
   **Status:** Locked

   ## Archived Files

   | File | Reason |
   |------|--------|
   | phase3.md | Phase 3 complete |
   | overview.md | Superseded by vision.md |
   ```

3. **Update 01-jan.md** with an "Archived Reference Material" section

### What to Keep Active

- `protocols/boot.md` — Always active (THE entry point)
- `protocols/handoff.md` — Always active (this protocol)
- `docs/vision.md` — Active until vision changes significantly
- Any file with **open work** or **pending decisions**

---

## Phase 3: Update boot.md

**Goal:** Next session starts with accurate context AND the right reading material.

### Update "Last Session"

Replace the content with a one-liner about THIS session:

```markdown
## Last Session

**YYYY-MM-DD:** Brief summary of what happened this session.
```

### Update "This Session"

Point to what's next AND include relevant reading:

```markdown
## This Session

**Pick up here:** What should the next AI do first?

**Read first:** (only include if highly relevant to the task)
- `docs/schema-spec.md` — The locked spec you're implementing
- `docs/vision.md` — If you need architectural context

**Or ask:** "Need deeper context? Want to see any files? Know what we're working on?"
```

### Reading List Guidelines

The "Read first" section should:
- **Only include files directly relevant to the next task** (not general context)
- **Be minimal** — 1-3 files max, not a dump of everything
- **Explain why** — A brief note on what the file provides

Example good reading lists:
```markdown
**Read first:**
- `docs/schema-spec.md` — The 16-field schema you're implementing
```

```markdown
**Read first:**
- `docs/phase4-qa.md` — Open questions that need answers
- `artifacts/how-floatprompt-works.md` — The vision if you need grounding
```

Example bad reading list:
```markdown
**Read first:**
- boot.md (they're already reading this)
- docs/vision.md (too general if task is specific)
- docs/phase4-qa.md (not relevant if task is implementation)
- every other file (information overload)
```

### Next Session Prompts

Add copy-paste ready prompts for the next session:

```markdown
**Try these prompts:**
- "Read docs/generate-spec and implement generate.ts"
- "Walk me through the architecture first"
- "What questions are still open?"
```

Guidelines:
- **1-3 prompts** — not a menu, just the obvious paths
- **Action-oriented** — start with a verb (read, build, walk me through)
- **Match the options** — each prompt should map to one of the numbered options
- **Include a "orient me" option** — for sessions that want context first

Example for implementation session:
```markdown
**Try these prompts:**
- "Read the spec and build generate.ts"
- "Show me the architecture diagram first"
```

Example for planning session:
```markdown
**Try these prompts:**
- "What decisions are still open?"
- "Walk me through the current state"
- "Let's lock the remaining questions"
```

### Also check
- `## Answered Questions` — any new resolved questions?
- `## Open Questions` — any resolved or new?
- `## Drill-Down Files` table — any status changes?

---

## Phase 4: Cross-reference Files

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

## Phase 5: Log Decisions

**Goal:** All decisions have paper trail.

### Questions
1. Were any decisions made this session?
2. Do they warrant a decision file?

### If yes → Run the log.md protocol

**This is a separate action.** Read `protocols/log.md` and follow its 4-level chain:

1. **Create decision file** — `YYYY-MM-DD-topic.md` in current month folder
2. **Update month summary** — Add entry to `01-jan.md` (or current month)
3. **Update year summary** — Add to `2026.md` if new theme emerges
4. **Update root** — Add to `logs/logs.md` only if new year

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

## Phase 6: Verify

**Goal:** Double-check everything before ending session.

### Final checklist

- [ ] **Phase 2:** Stale files archived to `logs/YYYY/MM-mon/`
- [ ] **Phase 3:** `boot.md` "Last Session" updated with this session's summary
- [ ] **Phase 3:** `boot.md` "This Session" points to what's next
- [ ] **Phase 3:** `boot.md` "Read first" includes relevant files for next task
- [ ] **Phase 4:** All protocol and doc files consistent with each other
- [ ] **Phase 4:** No contradictions between files
- [ ] **Phase 5:** Decision file created if decisions were made
- [ ] **Phase 5:** Month summary (`01-jan.md`) updated with new decision
- [ ] **Phase 5:** Year summary (`2026.md`) updated if new theme
- [ ] **Phase 6:** `handoff.md` updated if new patterns discovered

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

> **Note:** This example is from before the workshop restructure (2026-01-03). File names have changed but the process is the same.

**Session:** Schema spec locked (2026-01-03)

**Phase 1 result:** 7 files found

**Phase 2 archived:**
- `overview.md` → `2026-01-03-overview-archived.md` (superseded by vision.md)
- `problem.md` → `2026-01-03-problem-archived.md` (superseded by vision.md)
- `phase3.md` → `2026-01-03-phase3-archived.md` (Phase 3 complete)
- `sqlite.md` → `2026-01-03-sqlite-archived.md` (superseded by vision.md)
- Created `2026-01-03-archival.md` log entry

**Phase 3 updates to boot.md:**
- Updated "Last Session" with session summary
- Updated "This Session" to point to schema.ts implementation
- Added "Read first: `docs/schema-spec.md`" for next session
- Updated Next Steps to match locked spec

**Phase 4 found:**
- schema-spec.md said "In Progress" — fixed to "Locked"
- phase4-qa.md Q2 still said "Open" — fixed to "Answered"

**Phase 5 created:**
- `2026-01-03-schema-spec-locked.md`
- Updated `01-jan.md` with new entry

**Phase 6 verified:**
- All files consistent
- boot.md ready for next session
- Added Phase 2 (archival) and reading list to this protocol

---

*Updated 2026-01-04 — Restructured from wip-reconcile.md to handoff.md.*
</md>
</fp>
