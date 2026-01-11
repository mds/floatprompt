# Capture Fix Plan: From Logging to Graph Construction

**Date:** 2026-01-10 (Session 62)
**Status:** Plan
**Context:** Context graph analysis revealed capture should be constructing a graph, not just logging

---

## The Insight

Current capture writes to `log_entries` as a flat log. Entry goes in, has some fields, done.

Context graph capture should be **constructing a graph** with each session:

```
Nodes: decisions, folders, questions, files
Edges: affects, supersedes, resolves, relates_to
```

Each capture adds nodes AND edges. Precedent becomes queryable.

---

## Priority 0: Fix Spawning Bug ✅ DONE

**Problem:** `git diff --name-only HEAD` returns empty when work is committed. Agents don't spawn.

**Location:** `plugins/floatprompt/hooks/capture.sh` ~line 95-115

**Fixed:** Session 62 (2026-01-10)

**What was changed:**
```bash
# Get last capture's git commit (to detect committed work since then)
LAST_CAPTURE_COMMIT=$(sqlite3 "$FLOAT_DB" "
  SELECT git_commit FROM log_entries
  WHERE topic = 'session-handoff' AND git_commit IS NOT NULL AND git_commit != ''
  ORDER BY created_at DESC LIMIT 1;
" 2>/dev/null || echo "")

# Files changed since last capture (committed work)
if [ -n "$LAST_CAPTURE_COMMIT" ]; then
  COMMITTED_CHANGES=$(git diff --name-only "$LAST_CAPTURE_COMMIT"..HEAD 2>/dev/null || echo "")
else
  COMMITTED_CHANGES=""
fi

# Uncommitted changes (staged + unstaged)
UNCOMMITTED_CHANGES=$(git diff --name-only HEAD 2>/dev/null || echo "")
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")

# Combine all: committed + uncommitted + staged, dedupe
CHANGED_FILES=$(echo -e "$COMMITTED_CHANGES\n$UNCOMMITTED_CHANGES\n$STAGED_FILES" | sort -u | grep -v '^$' || echo "")
```

**Test:** Commit all work, push, run `/float-capture`. Agents should now spawn.

---

## Phase 1: Schema Additions

Add columns to make log_entries graph-aware:

```sql
-- Decision categorization
ALTER TABLE log_entries ADD COLUMN decision_type TEXT;
-- Values: 'create' | 'modify' | 'exception' | 'reversal' | 'observation'

-- Decision chains
ALTER TABLE log_entries ADD COLUMN supersedes_id INTEGER REFERENCES log_entries(id);

-- Categorical search
ALTER TABLE log_entries ADD COLUMN tags TEXT; -- JSON array

-- Event clock (what was true at decision time)
ALTER TABLE log_entries ADD COLUMN context_snapshot TEXT; -- JSON blob
```

Add to open_questions for resolution linking:

```sql
ALTER TABLE open_questions ADD COLUMN resolved_by_id INTEGER REFERENCES log_entries(id);
```

**Files to update:**
- `plugins/floatprompt/lib/schema.sql`
- Migration script for existing databases

---

## Phase 2: Agent Updates

### float-log

**Current:** Writes title, decision, rationale

**Add:**
1. Determine `decision_type` from transcript analysis
   - Did we create something new? → `create`
   - Did we modify existing? → `modify`
   - Did we override a pattern/rule? → `exception`
   - Did we undo a prior decision? → `reversal`
   - Just learning/noting? → `observation`

2. Check for supersession
   - Query recent decisions on same folder_path
   - If this contradicts/updates a prior decision, set `supersedes_id`

3. Assign tags
   - Extract categories: `architecture`, `bugfix`, `refactor`, `security`, `performance`, etc.
   - Store as JSON array

**Prompt addition:**
```
When logging this decision, also determine:
- decision_type: Is this creating something new, modifying existing,
  making an exception to a rule, reversing a prior decision, or just an observation?
- supersedes: Does this contradict or update any recent decision on this folder?
- tags: What categories apply? (architecture, bugfix, refactor, security, performance, naming, etc.)
```

### float-decisions

**Current:** Creates open questions

**Add:**
1. Check prior unresolved questions
   - Query: `SELECT id, question FROM open_questions WHERE resolved_at IS NULL`
   - For each, check if session work addressed it

2. Link resolutions
   - If resolved, UPDATE with `resolved_at` and `resolved_by_id` pointing to new log entry

**Prompt addition:**
```
Before creating new questions, check if this session resolved any prior questions.
Query open_questions for unresolved items. If the session work answers one,
mark it resolved and link to this session's log entry ID.
```

### float-enrich

**Current:** Updates folder context

**Add:**
1. Context snapshot at decision time
   - For each folder affected by decisions
   - Capture current `context` field
   - Store in `context_snapshot` JSON blob on log_entry

**Format:**
```json
{
  "/src/auth": "Authentication middleware using JWT...",
  "/src/auth/middleware": "Express middleware that validates...",
  "/src": "Source code root..."
}
```

This solves the event clock problem: "What did the system know when decision X was made?"

### float-handoff

**Current:** Writes handoff.md

**Add:**
1. Summarize graph changes
   - New decisions (count, types)
   - Resolved questions (count, which ones)
   - New links/edges created

**Keep:** AI-to-AI continuity note for next session

---

## Phase 3: References Table Activation

The `references` table exists but is unused. Activate it for graph edges.

**Edge types to support:**

| reference_type | source | target | Meaning |
|----------------|--------|--------|---------|
| `decision_affects_file` | log_entry path | file path | Decision touched this file |
| `decision_supersedes` | log_entry id | log_entry id | This decision updates that one |
| `question_resolved_by` | question id | log_entry id | Question answered by decision |
| `folder_imports` | folder path | folder path | Code dependency |

**Who writes:**
- float-log: `decision_affects_file` from `files_changed`
- float-log: `decision_supersedes` when setting `supersedes_id`
- float-decisions: `question_resolved_by` when resolving

**Schema check:**
```sql
CREATE TABLE IF NOT EXISTS references (
  id INTEGER PRIMARY KEY,
  source_path TEXT NOT NULL,
  target_path TEXT NOT NULL,
  reference_type TEXT NOT NULL,
  context TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

May need to adjust schema for integer references (log_entry IDs, question IDs) vs path references.

---

## Phase 4: Execution Order

Current parallel execution causes race conditions. Graph construction has dependencies.

**Current:**
```
Phase 1: Mechanical INSERT
Stage 1: float-log + float-decisions (parallel)
Stage 2: float-enrich + float-handoff (parallel)
```

**Proposed:**
```
Phase 1: Mechanical INSERT (get entry ID)
    ↓
Phase 2: float-log (fills entry, returns decision_type, tags)
    ↓
Phase 3: float-decisions (reads entry, resolves questions, links)
    ↓
Phase 4: float-enrich (updates folders, creates context snapshot)
    ↓
Phase 5: float-handoff (reads everything, writes handoff.md)
```

More sequential, but each step has what it needs.

**Alternative:** Keep some parallelism but with explicit dependencies
- float-log MUST complete before float-decisions (needs entry content)
- float-decisions MUST complete before float-handoff (needs resolution info)
- float-enrich can run parallel to float-decisions

---

## Implementation Order

### Week 1: Foundation
1. [x] Fix spawning bug (Priority 0) — **Done Session 62**
2. [ ] Add schema columns (decision_type, supersedes_id, tags)
3. [ ] Run migration on existing float.db

### Week 2: Agent Updates
4. [ ] Update float-log prompt for decision_type + tags
5. [ ] Update float-decisions for question resolution linking
6. [ ] Test capture with new fields populated

### Week 3: Graph Construction
7. [ ] Activate references table writes
8. [ ] Add context_snapshot to float-enrich
9. [ ] Update execution order if needed

### Week 4: Verification
10. [ ] Test full capture pipeline
11. [ ] Verify graph queries work (precedent search, decision chains)
12. [ ] Update handoff to summarize graph changes

---

## Success Criteria

**Spawning fix:**
- [x] Code changed to detect commits since last capture — **Done Session 62**
- [ ] Test: Commit all work, run `/float-capture`, agents spawn

**Graph construction:**
- [ ] Decisions have `decision_type` populated
- [ ] Related decisions linked via `supersedes_id`
- [ ] Questions linked to resolving decisions
- [ ] `references` table has edges
- [ ] Can query: "What decisions affected /src/auth?"
- [ ] Can query: "What did we know about auth when decision X was made?"

**Precedent search:**
- [ ] Can find similar decisions by tags
- [ ] Can trace decision chains (X supersedes Y supersedes Z)
- [ ] Can see which questions a decision resolved

---

## Conceptual Frame

**Before:** Capture = "log what happened"
**After:** Capture = "construct the context graph"

Each capture adds:
- **Nodes:** A decision, maybe new questions, updated folder contexts
- **Edges:** What it supersedes, what it resolves, what files it affects

The graph grows richer. Precedent becomes queryable. This is the "trillion-dollar opportunity" — we're building the mechanism.

---

*Session 62: Plan for evolving capture from logging to graph construction*
