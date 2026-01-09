# FloatPrompt Plugin Test 01

**Date:** 2026-01-09
**Status:** in-progress
**Testing:** Plugin in separate Claude Code session

---

## Test Setup

- Plugin loaded via: `claude --plugin-dir ./plugins/floatprompt`
- This session: Observer/debugger
- Other session: Plugin under test

---

## Observations

### Test 1: /float First Run (Initialization)

**What we're testing:** Does `/float` correctly initialize a fresh project?

**Expected behavior:**
- Create `.float/` directory
- Run `scan.sh` to populate float.db
- Copy `boot.md` to `.float/`
- Report folder/file counts

**Actual behavior:**
- Detected no `.float/` directory
- Asked user to confirm initialization (good UX)
- Ran `scan.sh` → 86 folders, 587 files indexed
- Copied `boot.md` to `.float/boot.md`
- AI correctly understood it was the floatprompt repo itself
- AI offered to start working

**Result:** PASS

**Notes:**
- AI correctly used `git rev-parse --show-toplevel` to find repo root
- boot.md was read (203 lines) and understood
- AI correctly noted all folders have `status = pending` (no AI context yet)

---

### Test 2: float.db Structure Verification

**What we're testing:** Is the database schema correct?

**Expected behavior:**
- 9 tables as per schema.sql
- folders table with 16 columns
- files table with content hashes

**Actual behavior:**
- Tables found: `deep`, `files`, `log_entries`, `open_questions`, `tags`, `deep_history`, `folders`, `log_entry_tags`, `references` (all 9)
- folders: 86 rows, all `status = pending`
- files: 587 rows with content_hash (SHA-256)
- log_entries: empty (fresh start)
- AI successfully queried using sqlite3

**Result:** PASS

**Notes:**
- AI made minor errors guessing column names (`name`, `hash` in files table) but self-corrected using `PRAGMA table_info()`
- This is expected — AI is learning the schema on the fly

---

### Test 3: AI Understanding of Layer 2 Timing

**What we're testing:** Does AI understand when enrichment happens?

**Expected behavior:** AI should know Layer 2 fires on PreCompact, not SessionEnd

**Actual behavior:**
- AI read hooks.json and float-handoff.sh
- Correctly explained:
  - PreCompact = primary (full AI enrichment)
  - SessionEnd = fallback (mechanical only)
  - Self-deduplicating (5-minute window)
- Understood the philosophy: "mechanical is the floor, AI is the ceiling"

**Result:** PASS

**Notes:**
- AI read 260 lines of float-handoff.sh and understood the 4-phase architecture
- This validates that boot.md + hook code are teaching AI correctly

---

### Test 4: Manual Enrichment Understanding

**What we're testing:** Does AI know how to enrich folders manually?

**Expected behavior:** AI should use sqlite3 directly or spawn float-enrich agent

**Actual behavior:**
- AI FIRST looked in `dist/cli/` for a CLI tool (WRONG)
- User corrected: "that's not the plugin"
- AI self-corrected: showed raw sqlite3 UPDATE statement
- AI correctly identified float-enrich as an AGENT (not command)
- AI explained two strategies for parallel enrichment:
  1. One agent, multiple folders (JSON array)
  2. Multiple agents, one folder each (parallel Task calls)

**Result:** PASS (after correction)

**Issue Found:** AI's first instinct was to look for a CLI tool, not use sqlite3 directly. boot.md may need stronger "no CLI, use sqlite3" messaging.

**Notes:**
- Plugin structure is commands-light: only `/float` exists
- Agents (float-log, float-enrich) are spawned by hooks or Task tool
- AI offered to enrich all 86 pending folders in parallel

---

### Test 5: Parallel Agent Spawning

**What we're testing:** Can AI spawn multiple float-enrich agents in parallel?

**Expected behavior:** Multiple Task tool calls, concurrent execution

**Actual behavior:**
- AI queried all 86 pending folders
- Decided to hit "important ones first" (code, not archives)
- Spawned 6 float-enrich agents IN PARALLEL:
  - `/src/db` — 8 tool uses, 24.9k tokens
  - `/plugins/floatprompt` — 9 tool uses, 22.3k tokens
  - `/plugins/floatprompt/agents` — 7 tool uses, 15.5k tokens
  - `/plugins/floatprompt/hooks` — 8 tool uses, 9.2k tokens
  - `/web/src/core` — 9 tool uses, 16.7k tokens
  - `/web/src/cli` — 6 tool uses, 15.0k tokens
- All completed successfully

**Result:** PASS

**Notes:**
- Total: ~103.6k tokens across 6 agents
- AI showed good judgment: prioritized code folders over archives
- Each agent verified its own write with a follow-up query
- This proves parallel enrichment scales

**Verification (from observer session):**
```
status   | count
---------|------
current  | 6
pending  | 80
```

Sample enrichment (`/src/db`):
- **description:** "SQLite database layer. Zod schemas, client CRUD operations, filesystem scanning, and deep context management."
- **context:** 4-paragraph deep dive covering schema.ts, client.ts, scan.ts, deep-schema.ts with key insight about Layer 1 vs Layer 2
- **ai_model:** haiku
- **ai_updated:** 2026-01-09 16:15:48

Quality is HIGH. Agents understood the code and wrote useful context.

---

### Test 6: Batch Enrichment Capacity

**What we're testing:** How many folders can one float-enrich agent handle?

**Analysis from test session:**

**Limiting factors:**
1. **max-turns** (currently 5 in hook config)
   - Each folder needs ~2-3 turns (glob, read, sqlite update)
   - 5 turns = 1-2 folders realistically
2. **Context window** (haiku ~200k)
   - Per-folder cost: ~1-3k tokens
   - Safe capacity: 15-20 folders (with margin)
   - Aggressive: 30-40 folders

**Test:** Batch of 20 folders in one agent

**Expected behavior:** Agent processes all 20, context stays manageable

**Actual behavior:**
- **55 tool uses**
- **44.7k tokens**
- **2m 52s** runtime
- **20 folders enriched successfully**
- Survived permission denial mid-run, recovered with "keep going"

**Result:** PASS

**Comparison:**

| Strategy | Folders | Tokens | Time |
|----------|---------|--------|------|
| Parallel (6 agents × 1 folder) | 6 | ~100k | ~60s |
| Batch (1 agent × 20 folders) | 20 | 44.7k | ~3m |

**Token efficiency:** Batch used 44.7k for 20 folders vs ~100k for 6 folders parallel. That's **~2.2k tokens/folder batched** vs **~17k tokens/folder parallel**. 8x more efficient!

**Notes:**
- My estimate was conservative (5-8 folders)
- Test session AI was right: 15-20 safe, could push to 30-40
- max-turns wasn't the bottleneck — agent kept working
- The permission denial hiccup didn't corrupt anything

---

### Test 7: Parallel Batch Enrichment (3 agents × 20 folders)

**What we're testing:** Can we parallelize batched agents for maximum throughput?

**Expected behavior:** 3 agents run concurrently, each handling 20 folders

**Actual behavior:**
- Agent 1: 20 folders, 28 tool uses, 26.2k tokens
- Agent 2: 20 folders, 26 tool uses, 30.9k tokens
- Agent 3: 20 folders, 46 tool uses, 33.9k tokens
- **Total: 60 folders, 91k tokens, 1m 42s**
- **Result: 86 enriched, 0 pending — COMPLETE DATABASE**

**Result:** PASS

**Efficiency comparison:**

| Strategy | Folders | Tokens | Time | Tokens/folder |
|----------|---------|--------|------|---------------|
| Parallel single (6×1) | 6 | ~100k | ~60s | ~17k |
| Batch single (1×20) | 20 | 44.7k | ~3m | ~2.2k |
| **Parallel batch (3×20)** | 60 | 91k | ~1m42s | **~1.5k** |

**Key insight:** Parallel batching is the sweet spot:
- 1.5k tokens/folder (best efficiency)
- Parallelism recovers wall-clock time
- Entire 86-folder database enriched in <2 minutes

---

### Test 8: Database Ready State

**What we're testing:** Is float.db fully operational after enrichment?

**Database state:**
| Table | Count | Status |
|-------|-------|--------|
| folders | 86 | All enriched (description + context) |
| files | 587 | All hashed |
| log_entries | 0 | Fresh (will populate on capture) |
| open_questions | 0 | Fresh |
| deep | 0 | Fresh |

**Layer status:**
- Layer 1 (mechanical): COMPLETE
- Layer 2 (AI context): COMPLETE
- Layer 3 (ongoing): Wired, not yet triggered

**Result:** PASS — Database ready for use

**Notes:**
- Next `/float` boot will query this context
- Session handoffs will populate log_entries on PreCompact/SessionEnd
- Manual `/float-capture` command would also populate log_entries

---

### Test 9: SessionEnd Hook Firing

**What we're testing:** Does SessionEnd hook fire and populate log_entries?

**Expected behavior:**
- SessionEnd fires on Ctrl+C exit
- Hook runs float-handoff.sh
- Phase 1 (mechanical) runs: sqlite3 INSERT
- Phases 2-4 (AI) skipped: terminal closing
- log_entries gets a session-handoff record

**Actual behavior:**
- User exited with Ctrl+C
- **HOOK FIRED!**
- log_entries now has 1 row:
  - `id: 1`
  - `topic: session-handoff`
  - `status: open`
  - `title: "Session end (awaiting enrichment)"`
  - `files_changed: 22 files` (via git diff)
  - `files_read: []` (empty — mechanical only)
  - `rationale: "Pending AI enrichment."`

**Result:** PASS

**Notes:**
- SessionEnd correctly did mechanical capture only
- AI enrichment was correctly skipped (terminal closing)
- The design works: "mechanical is the floor"
- Next session will see this handoff and can enrich if needed

---

### Test 10: Session Continuity (Full Loop)

**What we're testing:** Does a new session pick up the previous session's handoff?

**Expected behavior:**
- New session runs `/float`
- Reads boot.md
- Queries log_entries for latest session-handoff
- Displays context about what was worked on
- Offers to continue

**Actual behavior:**
- `/float` found existing `.float/` directory
- Read boot.md (203 lines)
- **Queried log_entries** — found the handoff
- Displayed:
  - "Last Session: Ended with files modified..."
  - "Database Status: 86 folders indexed, all current"
  - "What Was Touched: plugins/, .float-workshop/, web/, artifacts/"
  - "The modified files suggest plugin development and CLI tooling"
- Asked: "Ready to continue. What are we working on today?"

**Result:** PASS — FULL LOOP WORKS!

**This validates the core vision:**
```
Session 1 → work → exit → handoff captured
                    ↓
Session 2 → /float → reads handoff → "Last session: ..."
                    ↓
            AI boots with context. Not a tourist.
```

---

### Test 11: [Pending - PreCompact Hook]

**What we're testing:** Does PreCompact hook fire with FULL capture (including AI agents)?

**Notes:** Still need to test. Requires organic context growth to ~80%.

---

## Issues Found

| # | Issue | Severity | Fix |
|---|-------|----------|-----|
| 1 | AI first looked for CLI tool instead of using sqlite3 directly | Low | Strengthen "no CLI" messaging in boot.md |
| 2 | No manual capture command | Medium | Create `/float-capture` (see below) |

### Issue 2: Manual Capture Command

**Discovered during:** Test 6 (batch enrichment)

**Problem:** Current design only captures on:
- PreCompact (automatic, context filling up)
- SessionEnd (automatic, leaving)

But sometimes you do something significant mid-session and want to capture NOW — with 50% context left.

**Proposed solution:** `/float-capture`

| Command | When to use |
|---------|-------------|
| `/float` | Session start — boot with context |
| `/float-capture` | Mid-session — "snapshot this significant work" |
| (automatic hooks) | Session end — safety net |

**What `/float-capture` would do:**
1. Run float-log agent (capture session state to log_entries)
2. Run float-enrich agent on edited folders
3. Optionally: prompt for decision summary

**Design question:** Is this different from `/float-handoff`?
- Handoff implies "I'm leaving"
- Capture implies "I'm staying but want to save"

Maybe same underlying mechanism, different mental model. Or maybe capture is lightweight (just log_entries) while handoff is full (log + enrich + organize).

---

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Rename to `float-capture` | "Capture" is higher-level, describes the action, works mid-session or end-of-session |
| First-run offers enrichment | Respects agency, not presumptuous |
| Educate about capture at boot | User should know about auto + manual capture |

---

## LOCKED: Naming — `float-capture`

**Date:** 2026-01-09
**Status:** LOCKED

### Decision

Rename the manual context capture operation from `handoff` to `capture`.

**Architecture:**
```
/float-capture (command — the umbrella)
    → float-capture.sh (hook script)
        → float-log (agent — writes log_entries)
        → float-enrich (agent — writes folders)
```

### Rationale

1. **"Capture" is semantically correct** — we're capturing context, decisions, and folder understanding
2. **Works mid-session or end-of-session** — no "I'm leaving" connotation
3. **Clean hierarchy** — capture is the operation, log/enrich are the workers
4. **Higher-level abstraction** — describes what, not when

### What Changes

| Current | New |
|---------|-----|
| `float-handoff.sh` | `float-capture.sh` |
| (no command) | `/float-capture` |
| hooks.json references handoff | hooks.json references capture |

### What Stays the Same

- `float-log` agent name (describes its job)
- `float-enrich` agent name (describes its job)
- Agent functionality unchanged

### Implementation

- [ ] Rename `hooks/float-handoff.sh` → `hooks/float-capture.sh`
- [ ] Create `commands/float-capture.md`
- [ ] Update `hooks/hooks.json` to reference `float-capture.sh`
- [ ] Update README.md references

---

## LOCKED: First-Run UX Flow

**Date:** 2026-01-09
**Status:** LOCKED

### The Flow

**First run (`/float` when no float.db):**

```
1. Scan filesystem → "86 folders, 587 files indexed"

2. ASK (not presume):
   "Would you like to enrich your context database?"
   - This teaches AI about each folder
   - Takes ~2-3 minutes for a project this size
   [Yes / No / Later]

3. If Yes → spawn enrichment agents (parallel batches)
   If No → continue with pending folders

4. EDUCATE:
   "FloatPrompt will automatically capture your work when the
   session ends (or context fills up). If you want to save
   earlier, run /float-capture anytime.

   The goal: build, enrich, and preserve your context across
   all your working sessions."

5. Ready to work
```

### Key Principles

1. **Offer, don't presume** — User chooses to enrich
2. **Educate at the right moment** — After setup, before work
3. **State the value prop** — "preserve context across sessions"
4. **Show both paths** — Auto capture + manual `/float-capture`

### Copy to refine

> "Would you like to enrich your context database? This teaches AI about each folder so future sessions start with full understanding."

> "Your work will be captured automatically at session end. Run `/float-capture` anytime to save earlier."

> "The goal: build, enrich, and preserve your context across all your working sessions."

---

## Files Changed

- (none yet)

---

*Test log for FloatPrompt plugin validation*
