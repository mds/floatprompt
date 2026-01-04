# Buoy Architecture

**Status:** Working Document (not yet a spec)
**Date:** 2026-01-03
**Purpose:** Thinking that will turn into the buoy architecture spec

---

## What This Document Is

This is **exploratory thinking**, not a locked spec.

We're working through:
- Who are all the workers in the city?
- What does each worker do?
- What information does each worker need?
- How does the Mayor (boot.md) dispatch them?

When decisions lock, this becomes a spec. Until then, it's a thinking space.

---

## The City Metaphor

FloatPrompt is a city. The database is the infrastructure. The folders are work sites.

| Concept | In FloatPrompt |
|---------|----------------|
| **The Mayor** | boot.md — knows all workers, dispatches them |
| **Workers** | Buoys — specialized agents with jobs |
| **Job Descriptions** | Buoy-boot templates — role, behavior, what info needed |
| **Work Sites** | Folders — where workers go to do their jobs |
| **City Records** | SQLite — the source of truth |

### Different Cities, Different Workers

Not all cities are the same. Some are tech cities, others are creative cities, others are business cities.

**The core system stays the same:**
- Mayor (boot.md)
- Buoy assembly architecture
- Database infrastructure
- Dispatch patterns

**The worker fleet is domain-specific:**

| City Type | Example Workers |
|-----------|-----------------|
| **Tech/Engineering** | Authentication, Security, API, Frontend, Backend, DevOps, Testing |
| **Creative/Writing** | Script Writer, Editor, Grammar, Story Cohesion, Voice Consistency |
| **Education** | College App Letter, Submission, Guidance Counselor, Essay Review |
| **Business/Finance** | HR, Payroll, Accounting, Bookkeeping Reconciliation, Audit |
| **Legal** | Contract Review, Compliance, Discovery, Citation |
| **Healthcare** | Patient Intake, Charting, Billing, Compliance |
| **E-commerce** | Inventory, Pricing, Product Description, Customer Service |

**The insight:** Once the core buoy system is locked, it becomes a **framework** for generating domain-specific worker fleets.

```
FloatPrompt Core (universal)
    │
    ├── Tech City Fleet
    ├── Creative City Fleet
    ├── Business City Fleet
    ├── Education City Fleet
    └── [Any Domain] Fleet
```

**Each project discovers its city type and gets the right workers.**

### How It Works

1. Something happens (user request, staleness detected, scheduled task)
2. Mayor (boot.md) decides which workers to dispatch
3. Each worker already knows their job (buoy-boot template)
4. Workers grab the context they need (lean or full)
5. Workers do their job, may hand off to others
6. Work completes, results recorded

### The Emergency Response Pattern

When multiple workers are needed:

```
Fire at /src/db (major refactor needed)
        │
        ▼
    Mayor decides:
    "Dispatch Fixer, Thinker, Enhancer"
        │
        ├─────────────┬─────────────┐
        ▼             ▼             ▼
    Fixer         Thinker       Enhancer
  (grabs lean)  (grabs full)  (grabs full)
        │             │             │
        └─────────────┴─────────────┘
                      │
                Report to Mayor
```

---

## Context Depth

Folders have context at two depths:

### Lean
- Quick orientation
- What's here
- Gotchas and warnings
- Input/output contracts
- For: mechanical workers, quick consumption

### Full
- Deep understanding
- Why it matters
- How it connects to other things
- What "good" looks like here
- For: judgment workers, deep work

**The buoy-boot tells the buoy which depth to consume.**

---

## Worker Catalog

**Total: 55+ potential workers across 14 categories**

| Category | Count | Context Need (predominant) |
|----------|-------|---------------------------|
| Layer 1: Mechanical | 1 | None |
| Layer 2: AI Generation | 3 | Parent + files |
| Layer 3: Ongoing | 3 | Lean |
| Core Workers | 5 | Lean |
| Specialized Workers | 8 | Full |
| Cross-Folder Workers | 4 | Mixed |
| External Integration | 4 | Lean |
| Quality Assurance | 4 | Mixed |
| Failure Handling | 4 | Lean |
| Observability | 4 | Lean |
| Maintenance | 4 | Lean |
| Meta Workers | 5 | Full |
| Human-Facing | 3 | Full |
| Workshop | 2 | Full |

### The Question for Each Worker

1. What is their job?
2. What context do they need? (lean, full, or none)
3. What do they produce?
4. When do they hand off to others?

---

### Layer 1: Mechanical (Code, No AI)

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Scanner** | Walk filesystem, hash files, write to SQLite | None (reads files directly) | Folder/file rows in DB |

---

### Layer 2: AI Generation

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Context Generator** | Create description + context for folder | Parent context + files | description, context (lean/full) |
| **Scope Detector** | Decide if folder is a scope, set hierarchy | Lean + heuristics | is_scope, parent_scope_path, scope_boot |
| **Summarizer** | Roll up log entries into summaries | Lean | Monthly/yearly summary entries |

---

### Layer 3: Ongoing

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Staleness Checker** | Detect drift between context and reality | Lean | Stale flags on folders |
| **Regenerator** | Refresh stale context | Full + current files | Updated context |
| **Change Cascader** | Propagate staleness up scope chain | Lean | Updated stale flags |

---

### Operational: Core Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Fixer** | Repair stale references, broken paths | Lean | Fixed references |
| **Syncer** | Match nav files to folder structure | Lean | Updated nav files |
| **Enhancer** | Improve weak descriptions, fill gaps | Full | Enhanced context |
| **Harvester** | Extract insights from conversation | Lean (just the conversation) | New log entries, context updates |
| **Decision Logger** | Write decisions to log_entries | Lean (just the decision) | Log entry rows |

---

### Operational: Specialized Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Interviewer** | Q&A with human to generate context | Full (to ask good questions) | Rich context from dialogue |
| **Relationship Mapper** | Find connections between folders | Full | Relationship data |
| **Deep Diver** | Focused exploration of specific topic | Full | Deep analysis |
| **Pattern Detector** | Find recurring structures across folders | Full | Pattern documentation |
| **Quality Scorer** | Rate context confidence/completeness | Full | Quality scores |
| **Anomaly Detector** | Find unusual/orphaned structures | Full | Anomaly reports |
| **Searcher** | Find content across folders | Lean | Search results |
| **Tracer** | Follow relationships/dependencies | Full | Dependency graph |

---

### Cross-Folder Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Refactorer** | Coordinate changes spanning folders | Full | Refactoring plan + execution |
| **Mover** | Handle file/folder moves, update refs | Lean | Updated paths, fixed refs |
| **Impact Analyzer** | What does this change affect? | Full | Impact report |
| **Cascader** | Propagate changes through dependencies | Lean | Updated dependent folders |

---

### External Integration Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Git Worker** | Commit, branch, merge awareness | Lean | Git operations |
| **GitHub Worker** | PR context, issue linking | Lean | GitHub integration |
| **CI/CD Worker** | Build status, test results | Lean | CI/CD data |
| **IDE Worker** | Cursor, VS Code integration | Lean | IDE hooks |

---

### Quality Assurance Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Validator** | Check context accuracy against reality | Full | Validation report |
| **Test Generator** | Generate tests for context | Full | Test cases |
| **Feedback Processor** | Process human corrections | Lean | Context updates |
| **Coverage Reporter** | What lacks context? | Lean | Coverage gaps |

---

### Failure Handling Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Error Recoverer** | Handle buoy failures | Lean | Recovery actions |
| **Rollback Handler** | Revert bad changes | Lean | Restored state |
| **Retry Handler** | Retry transient failures | Lean | Retry results |
| **Conflict Resolver** | Handle inconsistent context | Full | Resolution |

---

### Observability Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Activity Logger** | What happened when | None (just events) | Activity logs |
| **Metrics Reporter** | Context quality over time | Lean | Quality metrics |
| **Drift Reporter** | What's getting stale | Lean | Drift reports |
| **Health Reporter** | System status, gaps | Lean | Health dashboard |

---

### Maintenance Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Pruner** | Remove obsolete context | Lean | Cleaned database |
| **Migrator** | Schema upgrades | Lean | Migrated data |
| **Integrity Checker** | Validate constraints | Lean | Integrity report |
| **Archiver** | Move old entries to archive | Lean | Archived data |

---

### Meta Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Thinker** | Decide what to do next, call audibles | Full | Dispatch decisions |
| **Orchestrator** | Spawn and coordinate multiple buoys | Full | Coordination |
| **Prioritizer** | Rank work by urgency/importance | Full | Priority queue |
| **Merger** | Combine results from parallel buoys | Lean (just outputs) | Merged results |
| **Conflict Resolver** | Handle disagreements between buoys | Full | Resolution |

---

### Human-Facing Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Explainer** | Make context understandable to human | Full | Human-friendly explanations |
| **Reviewer** | Present work for human approval | Full | Review summaries |
| **Corrector** | Apply human feedback/corrections | Lean (just the fix) | Updated context |

---

### Workshop Workers

| Worker | Job | Context Need | Produces |
|--------|-----|--------------|----------|
| **Workshop Boot** | Set up working session | Full | Session context |
| **Workshop Reconciler** | Summarize what happened, archive | Full | Session summary, archives |

---

## Buoy Core Needs

**Status:** Thinking (not locked)

Every buoy receives:

1. **Boot file** — FloatPrompt format, defines who they are
2. **Handoff message** — The dispatch slip with specific task
3. **Database access** — Instructions for interacting with float.db

---

## Buoy Assembly Architecture

Buoys are composed from **shared partials** + **specialized instructions**.

```
src/buoys/
├── base/
│   ├── global.md              # Every buoy reads (city laws)
│   ├── db-instructions.md     # How to interact with float.db
│   └── handoff-format.md      # Dispatch slip structure
│
├── archetypes/
│   ├── extractor.md           # Archaeological extraction pattern
│   ├── processor.md           # Data transformation pattern
│   ├── scorer.md              # Evaluation pattern
│   ├── reconciler.md          # Cross-reference pattern
│   └── pipeline.md            # Sequential processing pattern
│
├── workers/
│   ├── context-generator.md   # Specific worker definition
│   ├── scope-detector.md
│   ├── fixer.md
│   ├── harvester.md
│   └── ... (all workers)
│
└── index.ts                   # Assembles buoys from parts
```

### Composition Pattern

```
BuoyPrompt = Global + Archetype + Specialized + DBInstructions + HandoffMessage
```

| Layer | What | Shared? |
|-------|------|---------|
| **Global** | City laws, core principles, system overview | All buoys |
| **Archetype** | Pattern behavior (extractor, processor, etc.) | By type |
| **Specialized** | Specific worker job, context needs, output | Per worker |
| **DB Instructions** | How to query/update float.db | All buoys |
| **Handoff Message** | Specific task, folder, parameters | Per dispatch |

### What Each Layer Contains

**Global (base/global.md):**
- You are a worker in FloatPrompt city
- The Mayor dispatched you
- Complete your job, report back
- Core principles (voice preservation, MDS methodology)

**Archetype (archetypes/*.md):**
- Extractor: Preserve voice, never paraphrase, [UNCLEAR] for ambiguity
- Processor: Transform data, field mapping, don't interpret
- Scorer: Calculate, classify, exact output format
- Reconciler: Cross-reference, detect gaps, surgical fixes
- Pipeline: Stage in sequence, input/output contracts

**Specialized (workers/*.md):**
- Identity: "You are the Context Generator"
- Job: "Create description + context for folders"
- Context consumption: Lean, Full, or None
- Output format: Specific structure
- Handoff rules: When to call other workers

**DB Instructions (base/db-instructions.md):**
- How to read from float.db (CLI commands)
- How to write to float.db (update commands)
- Status management (pending → current → stale)
- What tables exist, what fields mean

**Handoff Message (dispatch slip):**
- Task: "Generate context for /src/db"
- Folder path
- Any parameters (includeContents: true)
- Return format expected

---

## Buoy-Boot Template Structure (FloatPrompt Format)

Each worker definition uses FloatPrompt structure:

```
<fp>
<json>
{
  "STOP": "[Worker Name] Mode. [One line job description].",

  "meta": {
    "id": "[worker-id]",
    "title": "[Worker Name]",
    "archetype": "[extractor|processor|scorer|reconciler|pipeline]"
  },

  "ai": {
    "role": "[Role in the city]",
    "behavior": "[Core behavior constraint]"
  },

  "requirements": {
    "context_consumption": {
      "depth": "[lean|full|none]",
      "reads": ["description", "context", "scope_boot"],
      "ignores": ["..."]
    },
    "input_contract": {
      "receives": "[What comes in handoff]",
      "format": "[Expected format]"
    },
    "output_contract": {
      "produces": "[What this worker outputs]",
      "format": "[Output format]"
    },
    "handoff_rules": {
      "calls": ["[Other workers to call when...]"],
      "never_calls": ["[Workers outside scope]"]
    }
  }
}
</json>
<md>
# [Worker Name]

## Job
[Clear, specific description of what this worker does]

## Context Consumption
[What to read, what depth, what to ignore]

## Process
1. [Step 1]
2. [Step 2]
3. [Step n]

## Output Format
[Exact structure of what's produced]

## Handoff Rules
[When to call other workers, who to call]

## Constraints
[What NOT to do, boundaries]
</md>
</fp>
```

---

## Tool Archetypes

From `.float-old/tools/types/`, patterns that inform buoy-boot design:

| Archetype | Core Behavior | Context Need |
|-----------|---------------|--------------|
| **Extractor** | Preserve voice, never paraphrase, archaeological | Lean |
| **Processor** | Transform data, field mapping, don't interpret | Lean |
| **Pipeline** | Stage in sequence, clear input/output contracts | Lean |
| **Scorer** | Calculate, classify, exact structured output | Some |
| **Reconciler** | Cross-reference, detect gaps, surgical fixes | Some |
| **Reference** | Provide authority, don't act, inform others | IS context |

These archetypes may map to workers:
- Extractor → Harvester
- Processor → Fixer, Syncer, Decision Logger
- Scorer → Quality Scorer, Scope Detector
- Reconciler → Staleness Checker, Conflict Resolver
- Reference → (folder context itself)

---

## Parallel Patterns

### Recon Buoy Pattern (Query → Spawn → Aggregate)

**The problem:** Single chat session doing 31 file reads sequentially = slow, context-heavy

**The solution:**

```
Recon Buoy (orchestrator)
    │
    ├── 1. Query float.db
    │      SELECT path, description FROM folders
    │      WHERE description LIKE '%topic%'
    │      → Returns 31 paths + descriptions (instant)
    │
    ├── 2. Spawn 31 Deep Diver buoys (parallel)
    │      Each gets: one file path + "extract [topic] info"
    │      Each returns: structured findings
    │
    └── 3. Aggregate
           Combine 31 reports → comprehensive recon
```

**Why this matters:**
- DB query = instant discovery (vs manual grep)
- 31 parallel buoys = 31 context windows, simultaneous
- Each Deep Diver is focused, bounded, Goldilocks-sized
- Recon Buoy only aggregates, doesn't read all files itself

**Workers involved:**
- **Recon Buoy** — Orchestrates research, queries DB, spawns Deep Divers
- **Deep Diver** — Reads one file, extracts relevant info, returns structured findings
- **Merger** — Combines parallel outputs (could be part of Recon Buoy)

---

### Database Enables Parallelization

Old world (flat files):
- Grep to find files
- Read each file sequentially
- One context window does everything

New world (float.db):
- Query to find files + get descriptions (instant)
- Spawn parallel buoys for each file
- Aggregate results

**The database is the discovery layer. Buoys are the work layer.**

---

## Test Plan (Needed)

**Status:** Not yet designed

We need a test plan for the buoy system. Areas to test:

- [ ] Single buoy execution (does one worker work?)
- [ ] Parallel buoy spawning (do multiple workers work together?)
- [ ] Handoff message format (do dispatch slips work?)
- [ ] Context consumption (do buoys grab lean/full correctly?)
- [ ] Result aggregation (do results merge correctly?)
- [ ] Failure handling (what happens when a buoy fails?)
- [ ] DB interaction (can buoys query/update float.db?)

Historical reference: `artifacts/archive/2025/12-dec/2025-12-28-float-buoys-test.md` has 10 tests from the flat-file era.

---

## Open Questions

### Context Structure
- [ ] One `context` field with `## Lean` and `## Full` sections?
- [ ] Or separate `context_lean` and `context_full` fields?
- [ ] How does buoy know which section to read?

### Buoy-Boot Storage
- [ ] Where do templates live? `.float/buoys/`? `system/buoys/`?
- [ ] Are they FloatPrompt format (`<fp>`) or simpler?
- [ ] Shipped with package or generated?

### Dispatch Logic
- [ ] How does boot.md know when to call whom?
- [ ] Explicit routing table? AI judgment? Both?
- [ ] How are multi-buoy scenarios triggered?

### Coordination
- [ ] How do parallel buoys avoid conflicts?
- [ ] How do results get merged?
- [ ] What happens when a buoy fails?

### Scope
- [ ] Are all these workers needed for v1?
- [ ] What's the minimum viable worker set?
- [ ] Which workers are Layer 2 vs Layer 3?

---

## Next Steps

1. [ ] Validate worker catalog — are we missing anyone?
2. [ ] Prioritize — which workers are essential for Layer 2?
3. [ ] Draft buoy-boot template structure
4. [ ] Decide context field structure (sections vs fields)
5. [ ] Lock decisions → convert to spec

---

## Relationship to Other Docs

| Doc | Relationship |
|-----|--------------|
| `wip-boot.md` | References this for buoy context |
| `wip-vision.md` | This implements the "infinite parallelization (buoys)" part |
| `wip-generate-spec.md` | Layer 2 functions that buoys will call |
| `wip-logs/.../context-architecture.md` | Decision log for how we got here |

---

*Working document — thinking in progress*
