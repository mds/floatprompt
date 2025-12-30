---
title: Tool Expansion Exploration
type: exploration
status: proposed
created: 2025-12-30
related: 2025-12-30-roadmap.md, .float/meta/tools/float.md, specs/claude/buoys.md, specs/claude/commands.md

human_author: @mds
human_intent: Explore potential new /float tools to fill gaps in the current system
human_context: Strategic session identifying missing capabilities and creative architectures

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  Emerged from question: "Would any tools be helpful on a healthy directory?"
  Led to gap analysis of current 5-tool system.
  Inspired by Blackbox AI's competing-agents pattern.
  Status: These proposals are now WS4 (Expansion Tools) in the roadmap.
---

# Tool Expansion Exploration

Strategic exploration of potential new `/float` tools to fill gaps in the current system.

> **Roadmap Status:** These tool proposals are tracked as **Workstream 4 (WS4): Expansion Tools** in `2025-12-30-roadmap.md`. WS4 is blocked on WS3 (Tool Building System) completion.

## Current Tool Coverage

```
/float          → Awareness (boot, health check)
/float-sync     → Structure (nav ↔ folders)
/float-fix      → References (links ↔ reality)
/float-context  → Understanding (terrain map)
/float-enhance  → Quality (placeholders, frontmatter)
```

**What's working:** Structure and reference integrity are solid. Boot provides quick awareness.

**What's missing:** Depth, knowledge extraction, relationship mapping, ripple analysis, multi-perspective generation.

---

## Proposed Tools

### /float-focus

**Gap:** Project-wide context is too shallow for complex work. No way to go deep on one domain.

**Input:** File path, folder path, or concept name

**Architecture: The Tracer Pattern**
```
                    ┌─────────────┐
                    │   Target    │
                    │   File/Dir  │
                    └──────┬──────┘
                           │
           ┌───────────────┼───────────────┐
           ▼               ▼               ▼
    ┌────────────┐  ┌────────────┐  ┌────────────┐
    │  Forward   │  │  Backward  │  │  Semantic  │
    │  Tracer    │  │  Tracer    │  │  Tracer    │
    │            │  │            │  │            │
    │ follows    │  │ finds refs │  │ finds      │
    │ related:   │  │ TO target  │  │ similar    │
    └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
          │               │               │
          └───────────────┼───────────────┘
                          ▼
                   ┌────────────┐
                   │ Synthesizer│
                   │   Buoy     │
                   └─────┬──────┘
                         ▼
                  Mini-Context
```

**Buoys:**

| Buoy | Model | Purpose |
|------|-------|---------|
| `forward_tracer` | haiku | Follow explicit `related:` fields outward |
| `backward_tracer` | haiku | Grep for files that reference target |
| `semantic_tracer` | sonnet | Find conceptually related files (optional) |
| `synthesizer` | sonnet | Combine findings into mini-context |

**Output Options:**
- **Persistent:** `.float/project/context/{scope}.md` — for domains you'll revisit
- **Ephemeral:** Returns understanding in conversation, doesn't save — for one-off deep work

**Structure:**
```yaml
scope: specs/
depth: 3 levels
files_traced: 17
relationships:
  explicit: 8
  implicit: 6
  semantic: 3
```

**Example:**
```
> /float-focus specs/

Tracing specs/ domain...

Forward: 12 files referenced via related:
Backward: 8 files reference specs/
Semantic: 3 conceptually similar (docs/philosophy/, floatprompt/)

Save as mini-context? [persistent / ephemeral]: persistent

Output: .float/project/context/specs.md (47 lines)

Ready for: deep work on specifications
```

---

### /float-harvest

**Gap:** Session logs accumulate but are never synthesized. Decisions happen implicitly but aren't captured. Knowledge evaporates between sessions.

**Input:** Time range (`--week`, `--month`, `--since 2025-12-25`) or auto (`--since-last-harvest`)

**Architecture: The Mining Pattern**
```
     Session Logs              Git History
          │                        │
          ▼                        ▼
   ┌────────────┐           ┌────────────┐
   │    Log     │           │   Commit   │
   │   Parser   │           │   Parser   │
   └─────┬──────┘           └─────┬──────┘
         │                        │
         └──────────┬─────────────┘
                    ▼
            ┌────────────┐
            │  Decision  │
            │   Miner    │ ← Proposes: "Decision X was made"
            └─────┬──────┘
                  │
                  ▼
            ┌────────────┐
            │  Evidence  │
            │  Validator │ ← Checks: "Does evidence support this?"
            └─────┬──────┘
                  │
                  ▼
            ┌────────────┐
            │  Pattern   │
            │  Detector  │ ← "This theme appeared 4 times"
            └─────┬──────┘
                  │
          ┌───────┴───────┐
          ▼               ▼
    decisions.md    patterns.md
```

**Buoys:**

| Buoy | Model | Purpose |
|------|-------|---------|
| `log_parser` | haiku | Extract structured entries from session logs |
| `commit_parser` | haiku | Extract intent from commit messages |
| `decision_miner` | sonnet | Propose decisions based on what changed |
| `evidence_validator` | sonnet | Verify proposals against actual changes |
| `pattern_detector` | haiku | Find recurring themes, blockers, questions |

**Output:**
- Appends to `decisions.md` with date + evidence citations
- Creates/updates `patterns.md` (recurring themes, open questions)
- Confidence levels: HIGH (log + commit), MEDIUM (commit only), LOW (inference)

**Structure:**
```markdown
### Commands split for palette discovery
**Question:** Why separate /float-sync from /float?
**Answer:** Users won't find commands hidden behind a router
**Date:** 2025-12-29
**Evidence:** commit 92d3328, session log 2025-12-29 14:30
**Confidence:** HIGH
```

**Example:**
```
> /float-harvest --week

Parsing 5 session logs, 12 commits...

Proposed decisions (3):

  1. "Commands split into separate files for palette discovery"
     Evidence: commits 92d3328, a2ce06c; log 2025-12-29
     Confidence: HIGH

  2. "Frontmatter validation belongs in /float-enhance"
     Evidence: commit e87198f
     Confidence: MEDIUM (no log discussion)

  3. "Mini-contexts considered but deferred"
     Evidence: log 2025-12-30 discussion
     Confidence: LOW (discussion, not decision)

Accept? [all / review / skip]: review

Patterns detected:
  - "buoy" → 8 mentions (architecture pattern)
  - "frontmatter" → 5 mentions (quality concern)
  - "stale" → 4 mentions (recurring problem)

Harvest complete.
  → 2 decisions added
  → 3 patterns logged
```

---

### /float-relate

**Gap:** `related:` fields exist but aren't verified, bidirectional, or discovered. No way to see the relationship web from any node.

**Input:** A file path, or `--all` for full graph, or `--broken` for integrity only

**Architecture: The Web Pattern**
```
                    Target File
                         │
         ┌───────────────┼───────────────┐
         ▼               ▼               ▼
  ┌────────────┐  ┌────────────┐  ┌────────────┐
  │  Explicit  │  │  Implicit  │  │  Structural│
  │  Scanner   │  │  Scanner   │  │  Scanner   │
  │            │  │            │  │            │
  │ related:   │  │ grep for   │  │ same dir   │
  │ fields     │  │ mentions   │  │ siblings   │
  └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
        │               │               │
        └───────────────┼───────────────┘
                        ▼
                 ┌────────────┐
                 │   Graph    │
                 │  Builder   │
                 └─────┬──────┘
                       │
        ┌──────────────┼──────────────┐
        ▼              ▼              ▼
   Relationship   Broken Links    Suggestions
      Map         (A→B not B→A)   (should relate)
```

**Buoys:**

| Buoy | Model | Purpose |
|------|-------|---------|
| `explicit_scanner` | haiku | Parse `related:` fields from frontmatter |
| `implicit_scanner` | haiku | Grep for path/file mentions in content |
| `structural_scanner` | haiku | Find siblings, parent nav files |
| `graph_builder` | sonnet | Combine into map, detect issues, suggest |

**Output:**
- Relationship map (ASCII or mermaid diagram)
- Integrity issues (one-way links, broken references)
- Suggestions (files that mention each other but aren't formally related)

**Structure:**
```
Relationship Map for: .float/system.md

EXPLICIT (in related: field):
  → .float/meta/meta.md
  → .float/project/project.md
  → specs/system.md

IMPLICIT (referenced in content):
  → docs/claude.md (mentions boot protocol)
  → context/float-deepdive.md (references system.md)

REFERENCING THIS FILE:
  ← 14 files reference .float/system.md

INTEGRITY:
  ⚠ docs/claude.md → system.md (not bidirectional)
  ⚠ specs/system.md missing from its own related:
```

**Example:**
```
> /float-relate --broken

Scanning all relationships...

Files scanned: 47
Explicit relationships: 89
Implicit references: 156

Integrity Issues (7):

  1. docs/claude.md → .float/system.md
     ↳ Not bidirectional (system.md doesn't list docs/claude.md)

  2. specs/floatprompt.md → floatprompt/template.md
     ↳ One-way reference

  ...

Fix bidirectional issues? [all / review / skip]:
```

---

### /float-delta

**Gap:** After changes, no tool analyzes ripple effects. What else might be stale now?

**Input:** Auto-detect from `git diff`, or specify files, or `--staged`

**Architecture: The Ripple Pattern**
```
     Changed Files (git diff)
              │
              ▼
       ┌────────────┐
       │   Change   │
       │  Analyzer  │ ← What changed? (content, names, structure, API)
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │   Impact   │
       │   Tracer   │ ← What depends on what changed?
       └─────┬──────┘
             │
             ▼
       ┌────────────┐
       │ Staleness  │
       │  Detector  │ ← Are dependents now outdated?
       └─────┬──────┘
             │
             ▼
       Ripple Report
```

**Buoys:**

| Buoy | Model | Purpose |
|------|-------|---------|
| `change_analyzer` | haiku | Categorize changes (content, structure, naming, version) |
| `impact_tracer` | sonnet | Find dependents via `related:`, imports, references |
| `staleness_detector` | sonnet | Check if dependents contain outdated info |

**Output:**
- Ripple report with severity (HIGH: definitely stale, MEDIUM: possibly, LOW: check)
- Specific suggestions for each affected file
- Optional auto-fix for simple cases (version numbers, path updates)

**Structure:**
```
Change: .float/meta/tools/float-enhance.md
  Type: content (added frontmatter_buoy)

Ripples:
  HIGH: specs/claude/buoys.md — lists buoy types, needs update
  HIGH: docs/claude.md — describes enhance, may be stale
  MEDIUM: .float/system.md — mentions tools
  LOW: README.md — general /float description
```

**Example:**
```
> /float-delta

Analyzing changes since last commit...

Changed (2 files):
  - .float/meta/tools/float-enhance.md (+frontmatter_buoy)
  - specs/claude/buoys.md (+Frontmatter Buoy section)

Tracing ripples...

Ripple Report:

HIGH (directly affected):
  ⚠ docs/claude.md
    Line 47: "describes enhance" — may need frontmatter mention

MEDIUM (possibly affected):
  ? .float/project/context/floatprompt.md
    References tool system, might want buoy mention

LOW (check manually):
  · README.md — general description, probably fine

Fix high-priority ripples? [yes / review / skip]:
```

---

### /float-compete

**Gap:** Single-perspective outputs can miss nuance. What if approaches competed?

**Input:** A task + mode (`describe`, `synthesize`, `decide`)

**Architecture: The Arena Pattern**
```
                      Task
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
 ┌────────────┐  ┌────────────┐  ┌────────────┐
 │ Approach A │  │ Approach B │  │ Approach C │
 │  (sparse)  │  │ (detailed) │  │ (creative) │
 │            │  │            │  │            │
 │   haiku    │  │   haiku    │  │   haiku    │
 └─────┬──────┘  └─────┬──────┘  └─────┬──────┘
       │               │               │
       └───────────────┼───────────────┘
                       ▼
                ┌────────────┐
                │   Judge    │
                │   (sonnet) │
                └─────┬──────┘
                      │
           ┌──────────┴──────────┐
           ▼                     ▼
      Best Single           Synthesis
      (pick winner)      (combine best)
```

**Use Cases:**
- **Descriptions:** 3 styles compete → judge picks or synthesizes
- **Context:** Technical/philosophical/practical lenses → merged view
- **Decisions:** Strict/generous interpretations → validated middle ground

**Buoys:**

| Buoy | Model | Purpose |
|------|-------|---------|
| `contestant_a` | haiku | Approach A (sparse/technical/strict) |
| `contestant_b` | haiku | Approach B (detailed/philosophical/generous) |
| `contestant_c` | haiku | Approach C (creative/practical/balanced) |
| `judge` | sonnet | Evaluate against criteria, pick or synthesize |

**Output:**
- Winner with rationale, OR
- Synthesis with attribution ("clarity from A, depth from B")

**Structure:**
```yaml
task: describe src/utils.ts
contestants:
  A: "Utility functions"
  B: "Helper functions for string manipulation, date formatting, and array operations"
  C: "The Swiss Army knife — small tools that make everything else work"
judgment:
  winner: B
  rationale: "Most informative at appropriate length"
  synthesis: "Helper functions (string, date, array) — the project's Swiss Army knife"
```

**Example:**
```
> /float-enhance --compete src/utils.ts

Generating descriptions (3 approaches)...

A (sparse):   "Utility functions"
B (detailed): "Helper functions for string manipulation, date
               formatting, and array operations"
C (creative): "The Swiss Army knife — small tools that make
               everything else work"

Judging...

Winner: B
Rationale: Most informative, appropriate length for nav file

Suggested synthesis:
  "Helper functions (string, date, array) — the codebase's Swiss Army knife"

Accept [A / B / C / synthesis / edit]:
```

---

## Summary

| Tool | Gap | Pattern | Key Innovation |
|------|-----|---------|----------------|
| `/float-focus` | No deep dives | Tracer | Multi-directional following → mini-contexts |
| `/float-harvest` | Knowledge evaporates | Mining | Decision extraction with evidence validation |
| `/float-relate` | Unverified relationships | Web | Bidirectional integrity + suggestions |
| `/float-delta` | No ripple analysis | Ripple | Change → Impact → Staleness chain |
| `/float-compete` | Single-perspective | Arena | Multiple approaches + judge synthesis |

## Priority Assessment

**High value, fills clear gap:**
1. `/float-harvest` — Session knowledge is being lost daily
2. `/float-delta` — Changes cause invisible staleness

**Medium value, enables deep work:**
3. `/float-focus` — Mini-contexts unlock complex tasks
4. `/float-relate` — Relationship integrity is foundational

**Low priority (enhancement pattern):**
5. `/float-compete` — Most architecturally interesting; recommended as `--compete` flag on other tools rather than standalone command

## Open Questions

1. Should `/float-compete` be standalone or a mode flag (`/float-enhance --compete`)?
2. Should mini-contexts auto-generate when entering a folder, or only on demand?
3. How often should `/float-harvest` run? End of session? Weekly prompt?
4. Should `/float-delta` run automatically post-commit as a hook?

## Next Steps

- [ ] Prioritize which tool to build first
- [ ] Write full floatprompt spec for chosen tool
- [ ] Define buoy prompts in detail
- [ ] Test architecture on floatprompt repo itself

---

*Exploration session: 2025-12-30*
*Participants: @mds, Claude Opus 4.5*
