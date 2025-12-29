---
title: Float Buoys
type: doc
version: 1.0.0

human_author: MDS
human_intent: Document the buoy pattern for parallel task agents
human_context: Platform-agnostic concept, implementation varies by platform

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Extracted from Claude Code implementation to document the pattern.
  Implementations may use Task tool, API calls, or custom software.
  Added Goldilocks Rule, task sizing guidelines, and orchestration pattern.
---

# Float Buoys

**Parallel task agents for FloatPrompt System maintenance.**

Buoys are specialized agents that work in parallel to verify, fix, and maintain the FloatPrompt System. The pattern is platform-agnostic — implementations vary.

---

## The Pattern

```
Spawn → Verify → Aggregate → Approve → Fix → Log
```

1. **Spawn** — Launch multiple agents in parallel
2. **Verify** — Each agent checks its assigned scope
3. **Aggregate** — Collect results from all agents
4. **Approve** — Human reviews proposed changes
5. **Fix** — Agents apply approved changes
6. **Log** — Record activity for future sessions

The approval gate is critical. Buoys propose, humans decide.

---

## Buoy Types

### Check Phase (Verification)

| Buoy | Responsibility |
|------|----------------|
| **Check Buoy** | Verify nav/*.md against actual folder contents |
| **Context Buoy** | Generate/update terrain map for AI understanding |

### Fix Phase (After Approval)

| Buoy | Responsibility |
|------|----------------|
| **Nav Buoy** | Add/remove rows in nav/*.md tables |
| **System Buoy** | Update structure map in system.md |
| **Describe Buoy** | Generate file descriptions (lightweight model) |
| **Scaffold Buoy** | Create new nav files for new folders |
| **Log Buoy** | Record activity to session logs |

---

## Orchestration Principles

### Parallelization

Buoys work in parallel when tasks are independent:

- Multiple Check Buoys verify different nav files simultaneously
- Multiple Describe Buoys generate descriptions in batches
- Multiple Nav Buoys update different files at once

Sequential only when dependent:
- Fix Buoys wait for Check Buoys to complete
- Log Buoy runs after all fixes are applied

### Batching

For efficiency, group similar work:

```
10 files need descriptions across 3 folders
  → Spawn 3 Nav Buoys (one per folder)
  → Spawn Describe Buoys in batches of 4
  → Log Buoy records all activity
```

### Scope Isolation

Each buoy has a focused scope:

- Check Buoy: one nav file vs one folder
- Nav Buoy: one nav file's tables
- Describe Buoy: one file's description

Narrow scope enables parallelization and reduces conflicts.

### The Goldilocks Rule

**Too narrow:** "Read line 5 of file X" — wasteful overhead, no useful context
**Too wide:** "Fix all problems in the project" — unpredictable, unfocused, hard to validate
**Just right:** "Read this file, return one-line description" — clear input, clear output, bounded scope

### Task Sizing Guidelines

| Good Buoy Task | Bad Buoy Task |
|----------------|---------------|
| Single clear objective | Multiple unrelated objectives |
| Bounded scope (1-3 files) | Unbounded scope |
| Predictable output format | Freeform output |
| Can be validated | Can't tell if it succeeded |

### Orchestration Pattern

**Two workers + one checker:**

```
Shell gathers raw data (fast, mechanical)
           ↓
    ┌──────┴──────┐
Buoy 1          Buoy 2    (parallel work)
    └──────┬──────┘
           ↓
   Orchestrator validates
           ↓
      Apply if valid
```

This pattern ensures:
- Speed where possible (shell)
- Parallelism where beneficial (buoys)
- Quality control before changes (validation)

---

## When to Use Buoys

**Use buoys when:**
- Verifying multiple files/folders
- Applying changes across multiple locations
- Work can be parallelized
- Human approval is required before changes

**Don't use buoys when:**
- Single file operation
- Simple, immediate task
- No verification needed

Buoys add coordination overhead. Use for system maintenance, not simple edits.

---

## The Approval Gate

Buoys never apply changes without human approval:

```
Results:
✓ nav/root.md — OK
✓ nav/docs.md — OK
✗ nav/src.md — 2 issues
  - Missing: src/new-file.ts
  - Stale: src/deleted.ts

Proposed changes:
  + Add: new-file.ts
  - Remove: deleted.ts

Apply changes? (y/n):
```

If declined, buoys stop. User got their inspection without modification.

---

## Implementation Notes

The buoy pattern can be implemented via:

- **AI coding tools** — Task/agent spawning (e.g., Claude Code)
- **API calls** — Parallel requests to AI services
- **Custom software** — Purpose-built maintenance tools
- **Web applications** — Background workers with AI integration

The pattern remains constant. The execution mechanism varies.

---

## Relationship to FloatPrompt System

Buoys maintain the system, they don't define it:

| Component | Purpose |
|-----------|---------|
| `.float/system.md` | Boot protocol |
| `.float/context/*.md` | AI understanding |
| `.float/nav/*.md` | Structure navigation |
| `.float/logs/*.md` | Session history |
| **Buoys** | Keep all of the above in sync |

Buoys are the maintenance crew, not the architecture.

---

*The invisible OS for AI*

Created by @mds and Claude Opus 4.5
