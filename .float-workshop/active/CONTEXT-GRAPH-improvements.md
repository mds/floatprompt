# Context Graphs: FloatPrompt Alignment & Improvements

**Date:** 2026-01-10 (Session 62)
**Status:** Strategic analysis
**Context:** Foundation Capital thesis + FloatPrompt implementation

---

## The Thesis

Foundation Capital (December 2025) calls context graphs "AI's trillion-dollar opportunity."

**The Shift:**
> Enterprise value is moving from "systems of record" (what happened) to "systems of agents" (what should happen next). The bridge is the context graph — a living record of decision traces where precedent becomes searchable.

**The Problem:**
Systems capture **what happened** but lose **why**. A CRM records "20% discount" but not the reasoning: incident history, escalation threads, policy override rationale. When people leave, knowledge evaporates.

**The Unlock:**
> "Every exception becomes training data. Every override becomes a case study."

---

## FloatPrompt Already Has Most of This

The context graph thesis describes what FloatPrompt already implements — built bottom-up from developer needs rather than top-down from enterprise theory.

### What We Have

| Context Graph Requirement | FloatPrompt Implementation |
|--------------------------|---------------------------|
| "System of record for decisions" | `log_entries` table: `decision`, `rationale`, `before_state`, `after_state` |
| "Decision traces across entities and time" | `folder_path` + `created_at` + `git_commit` pinning |
| "Precedent becomes searchable" | `sqlite3 .float/float.db "SELECT decision, rationale FROM log_entries WHERE folder_path LIKE '%auth%'"` |
| "What was true at decision time" | `before_state`/`after_state` + `git_commit` (v1.2.0) |
| "Real-time capture during execution" | PreCompact + SessionEnd hooks instrument the choice moment |
| "Uncertainty tracking" | `open_questions` table for unresolved ambiguity |
| "Queryable not just navigable" | SQLite serves AI; markdown export serves humans |

### What We Have That They're Only Theorizing

**1. AI as Producer AND Consumer**

Enterprise context graph discussion assumes humans produce context and AI consumes it. FloatPrompt assumes AI produces context (float-enrich, float-log agents) and AI consumes it (next session's `/float` boot).

This is more aligned with the agentic future. Agents don't just need to read precedent — they need to write it.

**2. Temporal Truth via Git**

The articles struggle with "the event clock problem" — what was true when a decision was made? FloatPrompt v1.2.0 solved this by pinning every capture to a git commit. Code state is immutably recorded. This is harder in enterprise contexts where there's no universal version control.

**3. Working Implementation**

Foundation Capital is calling for startups to build this. We have a working plugin with 11/11 tests passing, 493 folders indexed, session continuity working.

---

## The Event Clock Problem

The articles identify this as the critical missing element:

> Most systems answer "what is true now?" but fail at "what was true when a decision was made?"

**Failure modes:**
- **Stale Context** — Current rules applied to historical decisions
- **Missing Precedent** — Reasoning chains disappear
- **Temporal Collision** — Different agents using different state snapshots

### FloatPrompt's Current Answer

- `git_commit` pins decisions to code version
- `before_state` / `after_state` capture transitions (as prose)
- `created_at` timestamps everything

### The Gap

`before_state` and `after_state` are freeform text fields. They could be structured snapshots — the actual context of relevant folders at decision time, not just prose description.

**Proposed:** When logging a decision about `/src/auth`, snapshot the current `context` field of `/src/auth` (and ancestors) as structured JSON. The event clock becomes explicit.

---

## What's Missing

### 1. The Graph Structure

Context graphs are "triples-representation" — entity-relationship-entity. FloatPrompt is hierarchical (folders) not graph-native.

The `references` table exists in schema but is underutilized. It could connect:
- Decisions → files they affected
- Folders → folders they depend on
- Questions → decisions that resolved them
- Decisions → decisions they supersede

**Current schema:**
```sql
CREATE TABLE references (
  source_path TEXT NOT NULL,
  target_path TEXT NOT NULL,
  reference_type TEXT NOT NULL,
  context TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**Proposed:** Active use of `references` with types like:
- `decision_affects_file`
- `decision_supersedes_decision`
- `question_resolved_by_decision`
- `folder_depends_on_folder`

### 2. Decision Chains and Reversals

When a decision contradicts a prior decision, that's valuable signal. Currently not tracked.

**Proposed:** Add to `log_entries`:
```sql
decision_type TEXT -- 'create' | 'modify' | 'delete' | 'exception' | 'reversal'
supersedes_id INTEGER REFERENCES log_entries(id)
```

Now you can query: "Show me all reversals" or "What decisions modified this original decision?"

### 3. Precedent Similarity

"Find decisions similar to this situation" requires more than exact path matching.

**Options:**
- **Tags/categories** — Categorical labels on decisions (performance, security, architecture, naming)
- **Semantic embeddings** — Vector similarity for "decisions like this"
- **Decision patterns** — Structured types that match across contexts

**Proposed (Tier 1):** Add `tags` field to log_entries, array of category strings. Enables `WHERE tags LIKE '%security%'` queries.

### 4. Cross-Entity Stitching

The articles describe decisions spanning multiple systems (PagerDuty + Zendesk + CRM). FloatPrompt is single-repo.

The web vision gestures at this:
> ".md becomes as ubiquitous as robots.txt. Every serious website has a /float/ endpoint."

**Long-term:** The context mesh — `.float/` talks to `.float/` across repos and services. Cross-repo precedent becomes queryable.

**Near-term:** `related_files` field (already in schema) could reference external URLs or paths.

### 5. Temporal Queries as First-Class

"What did the system know when decision X was made?" is possible but awkward.

**Proposed:** Dedicated query patterns or CLI commands:
```bash
float-db context-at <decision-id>   # Returns folder context at decision time
float-db decisions-since <commit>   # Decisions since a git commit
float-db state-at <commit> <path>   # Folder context at specific commit
```

---

## Proposed Improvements by Tier

### Tier 1: Low-Hanging Fruit (This Week)

| Change | Effort | Value |
|--------|--------|-------|
| Active use of `references` table | Low | Links decisions to files, questions to resolutions |
| Add `decision_type` to log_entries | Low | Categorize: create/modify/exception/reversal |
| Add `supersedes_id` to log_entries | Low | Track decision chains |
| Add `tags` array to log_entries | Low | Categorical precedent search |

**Schema additions:**
```sql
ALTER TABLE log_entries ADD COLUMN decision_type TEXT;
ALTER TABLE log_entries ADD COLUMN supersedes_id INTEGER REFERENCES log_entries(id);
ALTER TABLE log_entries ADD COLUMN tags TEXT; -- JSON array
```

### Tier 2: Medium Effort (This Month)

| Change | Effort | Value |
|--------|--------|-------|
| Context snapshots at decision time | Medium | Solve event clock problem |
| Link questions to resolving decisions | Medium | `open_questions.resolved_by_id` |
| Precedent query commands | Medium | First-class temporal queries |

**Context snapshot design:**
When float-log writes a decision, also capture:
```json
{
  "decision_id": 42,
  "context_snapshot": {
    "/src/auth": "Authentication middleware using JWT...",
    "/src/auth/middleware": "Express middleware that validates..."
  },
  "git_state": {
    "commit": "abc123",
    "branch": "main",
    "dirty_files": ["src/auth/jwt.ts"]
  }
}
```

Store in `log_entries.context_snapshot` as JSON, or separate `decision_snapshots` table.

### Tier 3: Architecture Evolution (Future)

| Change | Effort | Value |
|--------|--------|-------|
| Graph layer on folder hierarchy | High | True entity-relationship model |
| Semantic search for precedents | High | "Find decisions like this" |
| Cross-repo context mesh | High | The web vision |
| Standard schema alignment | Medium | Interoperability (Schema.org, etc.) |

---

## Prescriptive vs Emergent Ontology

The articles identify two competing approaches to building context graphs:

### Prescriptive Ontology (Palantir Model)

- Define entities, relationships, action types **upfront**
- Build semantic, kinetic, and dynamic layers before execution
- Requires months of schema design
- Enables rigorous, defensible reasoning
- Works well for complex, high-stakes environments

**Trade-off:** Slow to start, but consistent and queryable.

### Emergent Ontology

- Let structure **reveal itself** through agent execution
- Start fast, avoid schema debates
- Structure emerges from patterns in actual use
- Risks inconsistency and repeated entity resolution

**Trade-off:** Fast to start, but messy and hard to query.

### FloatPrompt: Prescriptive Structure, Emergent Meaning

FloatPrompt is neither pure prescriptive nor pure emergent. It's a hybrid:

| Layer | Approach | What It Means |
|-------|----------|---------------|
| **Schema** | Prescriptive | `folders`, `log_entries`, `open_questions`, `references` tables have defined columns |
| **Hierarchy** | Prescriptive | Folder structure mirrors filesystem — entities are pre-defined |
| **Content** | Emergent | `description`, `context`, `decision`, `rationale` are AI-written, emerge through work |
| **Relationships** | Emergent | `references` table populated as connections are discovered |
| **Importance** | Emergent | Which folders matter, what they mean — revealed through use |

**The insight:** You don't have to choose. Define the **structure** upfront (what columns exist, what entities are tracked) but let the **meaning** emerge through execution.

### Why This Works

**Benefits of prescriptive structure:**
- Queryable from day one (`SELECT * FROM log_entries WHERE folder_path LIKE '%auth%'`)
- Consistent entity model (every folder is a row, every decision has the same fields)
- No entity resolution problem (paths are unique identifiers)
- Schema changes are migrations, not archaeology

**Benefits of emergent content:**
- No months of "what should context mean?" debates
- AI fills in meaning as it works
- Context evolves — what's written in Session 10 can be refined in Session 50
- Patterns emerge naturally (frequently-modified folders become obviously important)

**What we avoid:**
- Palantir's months of upfront schema design
- Emergent ontology's inconsistency and query difficulty
- The false choice between "design everything first" and "figure it out later"

### The Hybrid in Practice

```
Day 1: Schema exists, tables are empty
       └─ Prescriptive structure ready

Day 1: /float runs, scan.sh populates folders table
       └─ Entities exist (paths), meaning is empty

Session 5: AI writes context for /src/auth
           └─ Meaning emerges for one entity

Session 20: Decision logged about auth refactor
            └─ Precedent accumulates

Session 50: Query "all decisions about auth"
            └─ Structure enables query, content provides answer
```

The schema didn't need to know what "auth" would mean. It just needed columns for `path`, `context`, `decision`. Meaning filled in over time.

### Implications for Context Graph Improvements

This hybrid model informs how we should implement the tiered improvements:

**Tier 1 (Prescriptive additions):**
- `decision_type`, `supersedes_id`, `tags` — add the columns now
- Don't define what values they'll hold — let that emerge
- The structure enables future queries; the content emerges through use

**Tier 2 (Emergent discovery):**
- Context snapshots — structure is JSON blob, contents emerge per decision
- Question resolution — the link emerges when AI notices a question was answered

**Tier 3 (Graph evolution):**
- References table is prescriptive (source, target, type, context)
- Which references matter emerges through use
- Don't pre-define relationship types — discover them

---

## The Unique Angle

Most context graph discussion is **enterprise-first**: "How do we capture reasoning across Salesforce, Workday, and Zendesk?"

FloatPrompt is **codebase-first**: "How do we capture reasoning across sessions working on the same code?"

### Why Codebase-First is Better

1. **Developers are early adopters** — Willing to try new tools, give feedback
2. **Git solves temporal truth** — Version control is already there
3. **Single-repo is tractable** — Cross-system integration is enterprise sales hell
4. **Patterns translate upward** — What works for codebases works for organizations

### The Non-Obvious Insight

The articles describe AI agents that need to consume context graphs to make decisions.

FloatPrompt has AI agents that **produce** context graphs. float-enrich, float-log, float-decisions are all writing to the graph, not just reading.

This is the actual agentic future: agents that learn and record, not just agents that query and act.

### The Compound Advantage

Combining all three unique angles:

1. **Prescriptive structure, emergent meaning** — Fast to start, queryable forever
2. **Codebase-first** — Git provides temporal truth enterprise systems lack
3. **AI as producer** — Agents write the graph, not just read it

This isn't "context graphs for developers." It's a better architecture for context graphs, period — validated in the developer context first, translatable to enterprise later.

---

## Vocabulary Consideration

| Term | Source | Legibility |
|------|--------|------------|
| "Context graph" | VC/enterprise | High in funding contexts |
| "Compressed human judgment" | FloatPrompt internal | More accurate, less legible |
| "Decision traces" | Foundation Capital | Specific, useful |
| "System of record for decisions" | Dharmesh Shah | Clear positioning |

**Recommendation:** Use "context graph" in external positioning. Keep "compressed human judgment" as internal philosophy. They describe the same thing from different angles.

---

## Strategic Questions

### 1. Is FloatPrompt a developer tool that implements context graphs, or a context graph platform that starts with developers?

Option A (developer tool): Smaller market, faster adoption, proven pattern
Option B (platform): Bigger story, requires showing the path to enterprise

### 2. Should we align with emerging standards?

Articles cite Schema.org, Microsoft CDM. Custom schema is fine for single-repo. Interoperability matters for the mesh vision.

**Near-term:** Not critical. Custom schema serves the use case.
**Long-term:** Consider alignment if cross-repo/cross-system becomes real.

### 3. What's the relationship to the Rust scanner work?

Session 52 spec'd a Rust merkle scanner (26s → <100ms).
Session 61 shipped git-native Layer 1 instead.

The context graph framing validates the git-native decision: git provides temporal truth that a custom scanner cannot. The value is in Layer 2 (AI context), not Layer 1 (file tracking).

---

## Next Steps

### Priority 0: Fix Capture Agent Workflow

**The Problem (from Session 61):**
Capture agents didn't auto-spawn when working tree was clean (all changes committed). The "research vs development" detection uses `git diff --name-only HEAD` which returns empty when work is committed.

**Root Cause:**
```bash
# Current logic (capture.sh ~line 95-111)
changed_files=$(git diff --name-only HEAD)
if [ -z "$changed_files" ]; then
  # Assumes no work done — WRONG
fi
```

**The Fix:**
Compare HEAD against `last_capture_commit` from log_entries, not just check for uncommitted changes:
```bash
# Get last capture commit
last_capture=$(sqlite3 .float/float.db "SELECT git_commit FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1")

# Compare against that, not just HEAD
if [ -n "$last_capture" ]; then
  changed_files=$(git diff --name-only "$last_capture"..HEAD)
else
  changed_files=$(git diff --name-only HEAD)
fi
```

**Location:** `plugins/floatprompt/hooks/capture.sh` around line 95-111

---

### Tier 1: Schema Additions (This Week)

| Change | File | Notes |
|--------|------|-------|
| Add `decision_type` to log_entries | `lib/schema.sql` | 'create' \| 'modify' \| 'exception' \| 'reversal' |
| Add `supersedes_id` to log_entries | `lib/schema.sql` | FK to log_entries(id) for decision chains |
| Add `tags` to log_entries | `lib/schema.sql` | JSON array for categorical search |
| Update float-log agent | `agents/float-log.md` | Populate decision_type based on context |
| Activate references table | `hooks/capture.sh` | Link decisions → files_changed |

**Schema migration:**
```sql
ALTER TABLE log_entries ADD COLUMN decision_type TEXT;
ALTER TABLE log_entries ADD COLUMN supersedes_id INTEGER REFERENCES log_entries(id);
ALTER TABLE log_entries ADD COLUMN tags TEXT; -- JSON array
```

---

### Tier 2: Event Clock & Queries (This Month)

| Change | Notes |
|--------|-------|
| Context snapshots at decision time | JSON blob of relevant folder contexts when decision logged |
| Add `resolved_by_id` to open_questions | Link questions to decisions that resolved them |
| `float-db context-at <decision-id>` | Returns folder context at decision time |
| `float-db decisions-since <commit>` | Decisions since a git commit |
| Update float-decisions agent | Check for resolved questions, link to resolving decision |

**Context snapshot format:**
```json
{
  "context_snapshot": {
    "/src/auth": "Authentication middleware using JWT...",
    "/src/auth/middleware": "Express middleware that validates..."
  },
  "git_state": {
    "commit": "abc123",
    "branch": "main",
    "dirty_files": ["src/auth/jwt.ts"]
  }
}
```

---

### Tier 3: Architecture Evolution (Future)

| Change | Notes |
|--------|-------|
| Graph layer on folder hierarchy | Entity-relationship model via references table |
| Semantic search for precedents | Vector embeddings for "find similar decisions" |
| Cross-repo context mesh | `.float/` talks to `.float/` across repos |
| Standard schema alignment | Schema.org / Microsoft CDM for interoperability |

---

### Strategic

| Action | Notes |
|--------|-------|
| External positioning with "context graph" vocabulary | Blog post, README update |
| Decide: developer tool vs context graph platform | Framing for potential funding conversations |
| Document the "AI produces context" differentiator | Unique angle vs enterprise-first approaches |

---

## Sources

- [Foundation Capital: Context Graphs - AI's Trillion-Dollar Opportunity](https://foundationcapital.com/context-graphs-ais-trillion-dollar-opportunity/)
- [RunDataRun: The Context Graph - AI's Trillion-Dollar Opportunity](https://rundatarun.io/p/the-context-graph-ais-trillion-dollar)
- [Simple.ai: What are Context Graphs?](https://simple.ai/p/what-are-context-graphs)

---

*Session 62: Connecting FloatPrompt to the emerging context graph thesis*
