---
title: Tool Ecosystem Strategy Discussion
type: strategy-map
status: active
created: 2025-12-30
related: 2025-12-30-roadmap.md, 2025-12-30-tool-expansion-exploration.md, floatprompt/template.md, specs/claude/buoys.md

human_author: @mds
human_intent: Map the strategic arc of tool ecosystem expansion discussion
human_context: Session exploring gaps in /float tools, discovering archetypes from real examples, and designing meta-tools for building tools

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  Conversation flowed naturally from operational question to strategic architecture.
  Key insight: the same MDS pattern (Map → Decide → Structure) applies to building tools.
  Real production tools in examples/ revealed archetypes not visible from specs alone.
---

# Tool Ecosystem Strategy Discussion

Strategic map of conversation arc from "/float on healthy directories?" to tool-manual and tool-creator architecture.

> **Coordination:** For task sequencing and progress tracking, see `2025-12-30-roadmap.md` (master coordination document). This file preserves strategic discussion context.

---

## Conversation Arc

```
Question: "Would any tools help on a healthy directory?"
    │
    ▼
Gap Analysis: Current 5 tools cover structure, not depth/quality
    │
    ▼
Tool Expansion: 5 new tools proposed (focus, harvest, relate, delta, compete)
    │
    ▼
Real Examples: Examined production tools in examples/more (temp)
    │
    ▼
Archetype Discovery: 6 tool types emerged from real usage
    │
    ▼
Meta-Tools: Need manual (reference) + creator (process)
    │
    ▼
Pipeline Pattern: Tool creation itself follows MDS methodology
```

---

## Phase 1: Gap Analysis

**Trigger:** "Would any tools be helpful on a healthy directory?"

**Insight:** "Healthy" (structure intact) ≠ "Quality" (content excellent)

| Tool | On Healthy Directory | Value |
|------|---------------------|-------|
| `/float` | Reports "No issues" | Confirmation only |
| `/float-sync` | "No mismatches" | Confirmation only |
| `/float-fix` | "No broken refs" | Confirmation only |
| `/float-context` | Loads + follows reading order | **Useful for deep work** |
| `/float-enhance` | **Finds quality gaps** | **Proactive value** |

**Key finding:** `/float-enhance` is the only proactive tool. Others are reactive (fix what's broken).

---

## Phase 2: Tool Expansion Proposals

Five new tools designed to fill gaps:

### /float-focus (Tracer Pattern)
- **Gap:** No deep dives on specific scopes
- **Innovation:** Multi-directional relationship tracing → mini-contexts
- **Output:** `.float/project/context/{scope}.md` or ephemeral understanding

### /float-harvest (Mining Pattern)
- **Gap:** Session knowledge evaporates, decisions not captured
- **Innovation:** Extract decisions from logs + commits with evidence validation
- **Output:** Enriched `decisions.md` + new `patterns.md`

### /float-relate (Web Pattern)
- **Gap:** `related:` fields unverified, relationships one-way
- **Innovation:** Bidirectional integrity checking + relationship suggestions
- **Output:** Relationship map, broken links, suggested connections

### /float-delta (Ripple Pattern)
- **Gap:** Changes cause invisible staleness elsewhere
- **Innovation:** Change → Impact → Staleness detection chain
- **Output:** Ripple report with severity levels and fix suggestions

### /float-compete (Arena Pattern)
- **Gap:** Single-perspective outputs miss nuance
- **Innovation:** Multiple approaches compete, judge synthesizes
- **Output:** Best answer or synthesis with attribution

**Captured in:** `artifacts/2025-12-30-tool-expansion-exploration.md`

---

## Phase 3: Real Example Analysis

**Source:** `/examples/more (temp)/` — 8 production tools

### Tools Examined

| File | Type | Key Pattern |
|------|------|-------------|
| `map-territory.txt` | Pipeline Stage | Territorial mapping for extraction prep |
| `lesson-restructuring-tool.txt` | Extractor | Archaeological voice preservation |
| `restructure-reconciliation-tool.txt` | Reconciler | Gap detection, surgical edits |
| `applicant-scoring-system.txt` | Scorer | Multi-signal weighted evaluation |
| `shiftnudge-applicant-processing.txt` | Processor | Raw data → structured intelligence |
| `shiftnudge-icp.txt` | Authority | Deep context for other tools |

### Pipeline Pattern Discovered

```
map-territory.txt
       │
       ▼ (territorial map)
lesson-restructuring-tool.txt
       │
       ▼ (restructured lesson)
restructure-reconciliation-tool.txt
       │
       ▼ (complete, verified output)
```

**Insight:** Complex tasks decompose into Map → Do → Verify pipelines.

---

## Phase 4: Archetype Discovery

Six distinct tool archetypes emerged:

### 1. Pipeline Stage
- Sequential processing with clear handoffs
- Input/output contracts between stages
- Example: `map-territory.txt`

### 2. Scorer
- Multi-signal weighted evaluation
- Classification thresholds (HOT/WARM/COLD)
- Automation integration (strict output format)
- Example: `applicant-scoring-system.txt`

### 3. Extractor
- Archaeological voice preservation
- `[UNCLEAR]` markers over interpretation
- Exact quotes with timestamps
- Example: `lesson-restructuring-tool.txt`

### 4. Reconciler
- Cross-reference source → output
- Detect gaps, propose surgical fixes
- Completeness verification
- Example: `restructure-reconciliation-tool.txt`

### 5. Processor
- Raw data → structured intelligence
- Field mapping, variable extraction
- Transformation without interpretation
- Example: `shiftnudge-applicant-processing.txt`

### 6. Authority/Context
- Reference document, not processor
- Provides deep context for other tools
- Not called directly, informs decisions
- Example: `shiftnudge-icp.txt`

---

## Phase 5: Key Patterns Identified

### Voice Preservation
When extraction must preserve human voice:
- Never paraphrase — exact quotes only
- `[UNCLEAR]` over interpretation
- Timestamp precision when available
- "Archaeological respect"

### Output Constraints
For automation integration:
- Constraint block at TOP of file
- "OUTPUT EXACTLY THIS FORMAT"
- "DO NOT OUTPUT: [list]"
- Prevents AI interpretation layer

### Multi-Signal Scoring
For qualification/evaluation:
- Weighted signals (Fit 30%, Pain 30%, etc.)
- Clear thresholds per signal
- Classification buckets
- Geographic/contextual adjustments

### Pipeline Handoffs
For complex multi-stage work:
- Clear input/output contracts
- Each stage has single responsibility
- Reconciliation as separate final stage
- Map → Do → Verify pattern

### Reconciliation
For completeness assurance:
- Cross-reference all sources
- Detect gaps, not just errors
- Surgical edits, not rewrites
- "Educational relevance test" for what matters

---

## Phase 6: Meta-Tool Architecture

### Two Artifacts Needed

**1. `manual.md` — Reference Document**
- Documents all 6 archetypes with examples
- Patterns and when to use them
- Anti-patterns and common mistakes
- Pipeline design principles

**2. `creator.md` — Process Tool**
- Guides building floatprompts
- Follows MDS methodology
- Detects scope, recommends archetype
- Triggers pipeline decomposition when too big

### The Creator Pipeline

```
/float-create
    │
    ├── Scope Buoy
    │   ├── Interview human
    │   ├── Map problem space
    │   ├── Identify inputs/outputs
    │   └── Determine automation vs collaboration
    │
    ├── Archetype Buoy
    │   ├── Analyze scope output
    │   ├── Match to archetype
    │   ├── Detect "too big" → recommend pipeline
    │   └── Define boundaries
    │
    ├── Structure Buoy
    │   ├── Required sections for archetype
    │   ├── Pattern selection (voice? constraints?)
    │   ├── Handoff design if pipeline
    │   └── Generate skeleton
    │
    └── Build Buoy
        ├── Fill JSON section
        ├── Fill MD section
        ├── Human review checkpoints
        └── Output floatprompt file
```

### Scope Detection Logic

| Signal | Indicates |
|--------|-----------|
| Multiple distinct stages | Pipeline needed |
| Output feeds automation | Strict constraints needed |
| Content has human voice | Extraction archetype |
| Evaluating/qualifying | Scorer archetype |
| Verifying completeness | Reconciler archetype |
| Providing context only | Authority document |

### Pipeline Decomposition Trigger

When Archetype Buoy detects:
- Multiple unrelated responsibilities
- Sequential dependencies
- "And then..." language in problem description

Recommend decomposition:
```
1. Map tool (analyze, scope)
2. Do tool (core transformation)
3. Verify tool (reconciliation, QA)
```

---

## Insights & Principles

### 1. MDS All The Way Down
The same pattern applies everywhere:
- Building features → Map → Decide → Structure
- Building tools → Map → Decide → Structure
- The tool for building tools → Map → Decide → Structure

### 2. Scope Is Everything
Most tool failures come from wrong scope:
- Too big → should be pipeline
- Too small → overhead exceeds value
- Wrong archetype → fighting the pattern

### 3. Voice Preservation Is Binary
Either you need it or you don't:
- Extraction/content work → archaeological precision
- Processing/automation → transformation is fine
- Don't mix them in one tool

### 4. Reconciliation Is Underrated
The lesson pipeline has THREE stages, not two:
- Map (analyze)
- Restructure (transform)
- Reconcile (verify)

Most people skip reconciliation. That's where quality dies.

### 5. Constraints Enable Automation
The scoring tool works in Zapier BECAUSE of aggressive constraints:
- Exactly 7 fields
- No interpretation
- Strict format

Freedom is the enemy of automation.

---

## Next Steps

Sequenced workstreams with task tracking are maintained in `2025-12-30-roadmap.md`:

- **WS1:** Restructure (unblocks all) → `2025-12-30-restructure-update-plan.md`
- **WS2:** Maintenance Guide (quick win)
- **WS3:** Tool Building System (core infrastructure)
- **WS4:** Expansion Tools (future) → `2025-12-30-tool-expansion-exploration.md`

---

## Decisions Made

> Canonical decision list in `2025-12-30-roadmap.md`. Rationale preserved below.

### Naming Decisions

| Topic | Decision | Rationale |
|-------|----------|-----------|
| Archetypes vs Types | **Types** | Simpler, less academic. "What type of tool?" |
| Command name | **`/float-build`** | Implies process (scope → type → structure → output) |
| Authority archetype | **`reference.md`** | It's a reference document, not a processor |
| meta.md rename | **`index.md`** | Universal pattern, avoids meta-meta confusion |
| `floatprompt/meta/` | **`floatprompt/internal/`** | Clearer: "this doesn't ship to users" |
| Maintenance guide | **Root `MAINTENANCE.md`** | Discoverable, standard location, single file |

### Structure Decision: `.float/` Restructuring

**From:** `meta/` + `project/`
**To:** `floatprompt/` + `project/`

**Rationale:**
- `floatprompt/` is self-documenting (vs vague "meta")
- Opens hierarchy for `core/`, `types/`, `tools/`
- Clean parallel: floatprompt (system) vs project (yours)
- Room to grow

---

## Structure Evolution

### Current (v0.10.0)

```
.float/
├── system.md
├── meta/
│   ├── meta.md
│   ├── floatprompt/        # Core templates
│   │   ├── template.md
│   │   ├── doc.md
│   │   ├── os.md
│   │   └── update.md
│   └── tools/              # /float commands
│       ├── float.md
│       ├── float-sync.md
│       ├── float-fix.md
│       ├── float-context.md
│       └── float-enhance.md
└── project/
    ├── project.md
    ├── context/
    ├── nav/
    └── logs/
```

### Proposed (v0.11.0)

```
.float/
├── system.md
├── floatprompt/                # Clear: "FloatPrompt system"
│   ├── index.md                # Structural reference (was meta.md)
│   ├── core/                   # The format itself
│   │   ├── template.md
│   │   ├── doc.md
│   │   ├── os.md
│   │   └── update.md
│   ├── types/                  # Patterns for building
│   │   ├── pipeline.md
│   │   ├── scorer.md
│   │   ├── extractor.md
│   │   ├── reconciler.md
│   │   ├── processor.md
│   │   └── reference.md
│   ├── tools/                  # Commands that operate
│   │   ├── float.md
│   │   ├── float-sync.md
│   │   ├── float-fix.md
│   │   ├── float-context.md
│   │   ├── float-enhance.md
│   │   └── float-build.md      # NEW
│   └── manual.md               # Guide to tool building
└── project/                    # Your stuff (unchanged)
    ├── project.md
    ├── context/
    ├── nav/
    └── logs/
```

### Hierarchy Logic

```
.float/floatprompt/
├── index.md    → "What's in this folder"
├── core/       → What FloatPrompt IS (templates)
├── types/      → How to BUILD different tools
├── tools/      → Commands that OPERATE on projects
└── manual.md   → Guide to the whole system
```

**Three concerns, three folders:**
- **core/** = format definition
- **types/** = building patterns
- **tools/** = operational commands

### Mirror Pattern (Source → Deployed)

```
# Repo root (source)           # Deployed (.float/)
floatprompt/                   .float/floatprompt/
├── template.md         →      ├── core/template.md
├── doc.md              →      ├── core/doc.md
├── os.md               →      ├── core/os.md
└── update.md           →      └── core/update.md

.float/meta/tools/      →      .float/floatprompt/tools/

NEW                     →      .float/floatprompt/types/
NEW                     →      .float/floatprompt/manual.md

# Maintainer-only (doesn't ship)
floatprompt/internal/          # Renamed from floatprompt/meta/
├── tool-sync.md               # Maintainer tool
MAINTENANCE.md                 # Root-level process guide
```

---

## Open Questions

1. **Examples folder** — How to handle `examples/more (temp)/`? Rename and create proper nav?

2. **Source structure** — Should repo root `floatprompt/` also get `types/` subfolder to mirror deployed structure?

3. **float-build buoys** — Finalize buoy design (Scope, Type, Structure, Build)?

---

## Session Metadata

**Duration:** ~90 minutes
**Key artifacts created:**
- `artifacts/2025-12-30-tool-expansion-exploration.md`
- `artifacts/2025-12-30-tool-ecosystem-strategy.md` (this file)

**Key discoveries:**
- 6 tool archetypes from real production examples
- Pipeline decomposition pattern (Map → Do → Verify)
- Meta-recursive tool creation following MDS
- Voice preservation as binary decision

**Participants:** @mds, Claude Opus 4.5

---

*Strategic discussion map — foundation for manual.md and creator.md*
