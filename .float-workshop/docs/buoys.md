# Buoy Architecture

**Status:** LOCKED (Session 9, 2026-01-04)
**Purpose:** Buoy schema and orchestration patterns for FloatPrompt

---

## Core Principle

**Buoys are for judgment. Code is for mechanics.**

| Task Type | Solution |
|-----------|----------|
| Needs AI judgment | Buoy (AI agent) |
| Deterministic | TypeScript function |

If it can be done with code, do it with code.

---

## The 7 Buckets

All AI buoys fall into one of 7 archetypes:

| Bucket | Core Job |
|--------|----------|
| **Generators** | Create content (context, summaries, explanations) |
| **Validators** | Check correctness (staleness, quality, integrity) |
| **Fixers** | Repair problems (refs, paths, conflicts, sync) |
| **Mappers** | Internal connections (relationships, patterns, dependencies) |
| **Integrators** | External systems (Git, GitHub, CI/CD, IDE) |
| **Orchestrators** | Coordinate buoys (spawn, merge, prioritize, decide) |
| **Recorders** | Record activity (decisions, harvests, metrics, archives) |

---

## Buoy Catalog by Bucket

### Generators
| Buoy | Job | Produces |
|------|-----|----------|
| Context Generator | Create description + context for folder | description, context |
| Scope Detector | Decide if folder is a scope | is_scope, parent_scope_path, scope_boot |
| Summarizer | Roll up log entries | Monthly/yearly summaries |
| Enhancer | Improve weak descriptions | Enhanced context |
| Deep Diver | Focused exploration | Deep analysis |
| Explainer | Human-readable explanations | Plain language |
| Interviewer | Q&A to generate context | Rich context from dialogue |

### Validators
| Buoy | Job | Produces |
|------|-----|----------|
| Staleness Checker | Detect drift from reality | is_stale, drift_summary |
| Quality Scorer | Rate context completeness | Quality scores |
| Integrity Checker | Validate constraints | Integrity report |
| Coverage Reporter | Find gaps | Coverage report |
| Anomaly Detector | Find orphaned structures | Anomaly reports |
| Reviewer | Present for human approval | Review summaries |

### Fixers
| Buoy | Job | Produces |
|------|-----|----------|
| Fixer | Repair stale refs, broken paths | Fixed references |
| Syncer | Match nav to folder structure | Updated nav |
| Regenerator | Refresh stale context | Updated context |
| Conflict Resolver | Handle inconsistent context | Resolution |
| Mover | Handle file moves, update refs | Updated paths |
| Refactorer | Coordinate multi-folder changes | Refactoring plan |
| Corrector | Apply human feedback | Updated context |

### Mappers
| Buoy | Job | Produces |
|------|-----|----------|
| Relationship Mapper | Find folder connections | Relationship data |
| Tracer | Follow dependencies | Dependency graph |
| Impact Analyzer | What does change affect? | Impact report |
| Pattern Detector | Find recurring structures | Pattern documentation |
| Searcher | Find content across folders | Search results |
| Cascader | Propagate changes | Updated dependents |

### Integrators
| Buoy | Job | Produces |
|------|-----|----------|
| Git Integrator | Commit, branch awareness | Git context |
| GitHub Integrator | PR, issue linking | GitHub context |
| CI/CD Integrator | Build status, test results | CI/CD data |
| IDE Integrator | Cursor, VS Code hooks | IDE context |

### Orchestrators
| Buoy | Job | Produces |
|------|-----|----------|
| Orchestrator | Spawn and coordinate buoys | Coordination |
| Thinker | Decide what to do next | Dispatch decisions |
| Prioritizer | Rank by urgency | Priority queue |
| Merger | Combine parallel results | Merged output |

### Recorders
| Buoy | Job | Produces |
|------|-----|----------|
| Decision Logger | Write decisions to log | Log entries |
| Activity Logger | What happened when | Activity logs |
| Harvester | Extract from conversation | Insights, log entries |
| Metrics Reporter | Quality over time | Metrics |
| Drift Reporter | What's getting stale | Drift reports |
| Health Reporter | System status | Health dashboard |
| Archiver | Move old entries | Archived data |
| Pruner | Remove obsolete context | Cleaned database |

---

## Hub-and-Spoke Orchestration

**Buoys never talk to each other directly.** All communication goes through orchestrator.

```
         Orchestrator
        /     |     \
       ↓      ↓      ↓
    Buoy A  Buoy B  Buoy C
       ↓      ↓      ↓
         Orchestrator
              ↓
           (next)
```

### Why Hub-and-Spoke

| Concern | Solution |
|---------|----------|
| Contract validation | Orchestrator's job |
| Format normalization | Orchestrator handles |
| Unknown flags | Orchestrator decides |
| Failure handling | Orchestrator manages |
| Visibility/logging | All traffic through orchestrator |

### Nested Hierarchy

Orchestrators can spawn other orchestrators (coordinators):

| Level | Type | Can Spawn? | Returns To |
|-------|------|------------|------------|
| **Top Orchestrator** | Orchestrator | Yes | Human/System |
| **Coordinator** | Orchestrator (sub) | Yes | Parent Orchestrator |
| **Worker** | Any other bucket | No | Whoever spawned it |

Example:
```
Top Orchestrator
       ↓
  Recon Coordinator (orchestrator-type)
       ↓
  spawns 10 Deep Divers in parallel
       ↓
  Deep Divers return to Coordinator
       ↓
  Coordinator aggregates, returns to Top
```

---

## Buoy Schema (LOCKED)

All AI buoys use this FloatPrompt structure:

```
<fp>
<json>
{
  "meta": {
    "id": "string, kebab-case identifier",
    "title": "string, human-readable name",
    "type": "ai",
    "version": "semver"
  },

  "ai": {
    "role": "string, 1-3 sentences describing job and purpose",
    "archetype": "generator | validator | fixer | mapper | integrator | orchestrator | recorder",
    "sub_archetype": "string, specific buoy type (optional, null if base)",
    "autonomy": "string, where judgment lives"
  },

  "input": {
    "receives": ["array", "of", "field", "names"],
    "defaults": {
      "context_depth": "none | self_only | parent_only | scope_chain | full"
    }
  },

  "output": {
    "produces": ["array", "of", "field", "names"]
  }
}
</json>
<md>
# [Buoy Title]

## What You Receive
[Human-readable description of inputs]

## What You Produce
[Human-readable description of outputs]

## Guidance
[Soft rules, typical patterns, hints]

## You Decide
[Explicit areas of autonomy]
</md>
</fp>
```

### Schema Philosophy

| Aspect | Tight (Fixed) | Loose (Emergent) |
|--------|---------------|------------------|
| Identity | ✓ meta, ai.role, ai.archetype | |
| Input contract | ✓ receives (what fields) | Format can vary |
| Output contract | ✓ produces (what fields) | Format can vary |
| Context depth | | ✓ defaults, orchestrator can override |
| Tone/style | | ✓ Inherit from context |
| Thoroughness | | ✓ Situational |

**The contract is: "I receive X, I produce Y."**
**How I fill Y is my judgment.**

---

## Example: Context Generator

```
<fp>
<json>
{
  "meta": {
    "id": "context-generator",
    "title": "Context Generator",
    "type": "ai",
    "version": "0.1.0"
  },

  "ai": {
    "role": "You create the description and context for folders in the FloatPrompt system. You read what's in a folder, understand its purpose, and write content that helps future AI sessions understand this part of the project.",
    "archetype": "generator",
    "sub_archetype": "context-generator",
    "autonomy": "full judgment on content interpretation and depth"
  },

  "input": {
    "receives": ["folder_path", "parent_context", "file_list"],
    "defaults": {
      "context_depth": "parent_only"
    }
  },

  "output": {
    "produces": ["description", "context"]
  }
}
</json>
<md>
# Context Generator

Creates `description` and `context` for a folder.

## What You Receive
- Folder path
- Parent's context (if exists)
- Files in this folder

## What You Produce
- `description`: Quick orientation (what is this folder?)
- `context`: Deeper understanding (why it matters, what's here)

## Guidance
- Inherit tone from parent context
- Infer purpose from file names and contents
- Mark uncertainty with [UNCLEAR]
- Flag anything that looks like a scope boundary

## You Decide
- How much detail in context
- What's worth mentioning vs noise
- Whether files need reading or names are enough
</md>
</fp>
```

---

## Example: Staleness Checker (Validator)

```
<fp>
<json>
{
  "meta": {
    "id": "staleness-checker",
    "title": "Staleness Checker",
    "type": "ai",
    "version": "0.1.0"
  },

  "ai": {
    "role": "You detect drift between folder context and current reality. You compare what's documented against what's actually in the folder and flag mismatches.",
    "archetype": "validator",
    "sub_archetype": "staleness-checker",
    "autonomy": "full judgment on what constitutes meaningful drift vs noise"
  },

  "input": {
    "receives": ["folder_path", "current_context", "current_files"],
    "defaults": {
      "context_depth": "self_only"
    }
  },

  "output": {
    "produces": ["is_stale", "drift_summary"]
  }
}
</json>
<md>
# Staleness Checker

Detects drift between documented context and folder reality.

## What You Receive
- Folder path
- Current context from database
- Current file list (names, hashes, mtimes)

## What You Produce
- `is_stale`: boolean — does context need refresh?
- `drift_summary`: what changed and why it matters

## Guidance
- New files added → probably stale
- Files deleted → probably stale
- Hash changed → check if context still accurate
- Minor changes (formatting, comments) → maybe not stale

## You Decide
- Threshold for "meaningful" change
- Whether drift is cosmetic or substantive
- Urgency of refresh needed
</md>
</fp>
```

---

## Mechanical Functions (Not Buoys)

These are TypeScript, not AI buoys:

| Function | Job |
|----------|-----|
| `scan()` | Walk filesystem, hash files |
| `hashContent()` | Compute content hash |
| `queryFolders()` | Execute DB queries |
| `moveFile()` | Relocate files |
| `diffStates()` | Compare before/after |
| `updateFolder()` | Write to database |

Orchestrator uses both:
```
Orchestrator
    ├── calls scan() (code)
    ├── spawns Context Generator (AI buoy)
    ├── calls updateFolder() (code)
    └── spawns Validator (AI buoy)
```

---

## Context Depth Options

| Depth | What Buoy Reads |
|-------|-----------------|
| `none` | Nothing from DB |
| `self_only` | Just this folder's context |
| `parent_only` | This folder + immediate parent |
| `scope_chain` | This folder up to scope root |
| `full` | Everything relevant |

Default is in buoy schema. Orchestrator can override per dispatch.

---

## Dispatch Pattern

Buoy-boot files are templates. TypeScript handles dispatch:

```typescript
await spawnBuoy({
  template: 'context-generator',  // loads buoy-boot .md
  message: 'Generate context for /src/db',  // dynamic
  data: { folder_path, parent_context, file_list }
})
```

The buoy-boot defines WHO. The dispatch defines WHAT (specific task).

---

## Answered Questions

| Question | Answer |
|----------|--------|
| How many archetypes? | 7 buckets |
| Do buoys talk to each other? | No — hub-and-spoke through orchestrator |
| What about mechanical tasks? | TypeScript functions, not buoys |
| Tight or loose schema? | Tight on identity/contracts, loose on format/judgment |
| Where does handoff logic live? | TypeScript orchestrator, not buoy schema |

---

## Open Questions (Remaining)

| Question | Status |
|----------|--------|
| Where do buoy-boot files live? | TBD — `src/buoys/`? `.float/buoys/`? |
| How does orchestrator know which buoys exist? | TBD — registry? file discovery? |
| What's minimum viable for Layer 2? | TBD — prioritize buoys |
| Rename `content_md` → `context`? | Decided yes, not yet implemented |

---

## Relationship to Other Docs

| Doc | Relationship |
|-----|--------------|
| `protocols/boot.md` | References this for buoy context |
| `docs/vision.md` | This implements "infinite parallelization (buoys)" |
| `docs/generate-spec.md` | Layer 2 functions that buoys will call |

---

*Locked 2026-01-04 — Session 9*
