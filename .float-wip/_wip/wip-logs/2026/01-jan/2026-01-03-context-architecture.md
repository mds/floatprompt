# Context Architecture: The City of FloatPrompt

**Date:** 2026-01-03
**Status:** In Progress
**Session:** 8

---

## The Insight

We started asking: "What should `content_md` contain?"

We ended up discovering: **The buoy-boot architecture.**

---

## Key Decisions (Locked)

| Decision | Rationale |
|----------|-----------|
| Rename `content_md` → `context` | It IS context, `_md` suffix is redundant |
| Context has depth (lean/full) | Different workers need different depth |
| Buoys get pre-loaded boot templates | Workers know their job before getting a task |
| boot.md = The Mayor | Knows all workers, dispatch patterns, coordination |

---

## The Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         boot.md                                  │
│                        THE MAYOR                                 │
│                                                                  │
│  Knows:                                                          │
│  - All workers and their jobs                                    │
│  - When to dispatch whom                                         │
│  - Coordination patterns (fire → police + ambulance + doctors)  │
│  - How to read the city (database)                               │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ dispatches
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUOY-BOOT TEMPLATES                         │
│                      (Job Descriptions)                          │
│                                                                  │
│  Each worker has a pre-loaded identity:                          │
│  - Role and behavior                                             │
│  - What info they need (lean or full)                            │
│  - What they produce                                             │
│  - When to hand off to others                                    │
└─────────────────────────────────────────────────────────────────┘
                                │
                                │ consumes
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                     FOLDER CONTEXT (DB)                          │
│                     (The Work Sites)                             │
│                                                                  │
│  Each folder has:                                                │
│  - description: Quick "what's here"                              │
│  - context (lean): Working knowledge, gotchas                    │
│  - context (full): Deep understanding, relationships             │
│                                                                  │
│  Workers grab what their job requires.                           │
└─────────────────────────────────────────────────────────────────┘
```

---

## The City Metaphor

- **boot.md** = The Mayor — knows all workers, when to call them
- **Buoys** = Workers — policemen, firemen, doctors, bankers, etc.
- **Buoy-boot templates** = Job descriptions — role, behavior, what info needed
- **Folder context** = Work sites — the places workers go to do their jobs

### Emergency Response Pattern

When a fire happens (something needs doing):
- Mayor dispatches appropriate workers (buoys)
- Each worker already knows their job (buoy-boot)
- Each worker grabs the info they need (lean or full)
- Workers may collaborate or hand off
- Work completes, report back to Mayor

---

## Context Depth Structure

Instead of one blob, context is structured:

```markdown
## Lean
Quick orientation. What's here. Gotchas.
(For mechanical workers, quick consumption)

## Full
Why it matters. How it connects. What "good" looks like.
(For judgment workers, deep work)
```

The buoy-boot tells the buoy which depth to consume.

---

## Worker Catalog (In Progress)

### Layer 1: Mechanical (Code, No AI)
| Worker | Job | Context Need |
|--------|-----|--------------|
| Scanner | Walk filesystem, hash files | None (reads files) |

### Layer 2: AI Generation
| Worker | Job | Context Need |
|--------|-----|--------------|
| Context Generator | Create description + context | Parent context + files |
| Scope Detector | Decide if folder is a scope | Lean + heuristics |
| Summarizer | Rollup log entries | Lean |

### Layer 3: Ongoing
| Worker | Job | Context Need |
|--------|-----|--------------|
| Staleness Checker | Detect drift | Lean |
| Regenerator | Refresh stale context | Full (current + files) |

### Operational: Core Workers
| Worker | Job | Context Need |
|--------|-----|--------------|
| Fixer | Repair stale references | Lean |
| Syncer | Match nav to folders | Lean |
| Enhancer | Improve weak content | Full |
| Harvester | Extract insights from conversation | Lean |
| Decision Logger | Write to log_entries | Lean |

### Operational: Specialized Workers
| Worker | Job | Context Need |
|--------|-----|--------------|
| Interviewer | Q&A to generate context | Full (asks good questions) |
| Relationship Mapper | Find cross-folder connections | Full |
| Deep Diver | Focused topic exploration | Full |
| Pattern Detector | Find recurring structures | Full |
| Quality Scorer | Rate context confidence | Full |

### Meta Workers
| Worker | Job | Context Need |
|--------|-----|--------------|
| Thinker | Decide what to do next | Full |
| Orchestrator | Spawn and coordinate buoys | Full |
| Prioritizer | Rank work by urgency | Full |
| Merger | Combine parallel buoy results | Lean (just outputs) |

### Human-Facing Workers
| Worker | Job | Context Need |
|--------|-----|--------------|
| Explainer | Make context understandable | Full |
| Reviewer | Present for human approval | Full |
| Corrector | Apply human feedback | Lean (just the fix) |

---

## Tool Archetypes (from .float-old/tools/types/)

These inform buoy-boot template design:

| Archetype | Behavior | Context Need |
|-----------|----------|--------------|
| **Extractor** | Preserve voice, never paraphrase | Lean |
| **Processor** | Transform data, don't interpret | Lean |
| **Pipeline** | Stage in sequence, clear handoffs | Lean |
| **Scorer** | Calculate, classify, exact output | Some |
| **Reconciler** | Cross-reference, detect gaps | Some |
| **Reference** | Provide authority, don't act | IS context |

---

## Open Questions

1. **Context field structure** — One field with sections? Or separate fields?
2. **Buoy-boot storage** — Where do templates live? `.float/buoys/`?
3. **Dispatch logic** — How does boot.md know when to call whom?
4. **Coordination patterns** — How do multi-buoy scenarios work?

---

## Next Steps

1. [ ] Finalize worker catalog with all buoy types
2. [ ] Define buoy-boot template structure
3. [ ] Decide context field structure (sections vs fields)
4. [ ] Design boot.md structure (the Mayor)
5. [ ] Update schema.ts (rename content_md → context)

---

## Background

### Why We Got Here

Started with A1-A4 questions about content_md:
- A1: How verbose?
- A2: File-by-file breakdown?
- A3: Scope detection confidence?
- A4: Format of scope_boot?

Realized these were wrong questions. The real question:
> "What does each consumer of context actually need?"

### The Token Economy

From docs/vision.md:
> "The goal isn't minimizing tokens, it's maximizing value per token."

Context should be:
- **Relevant** — What the consumer needs
- **Accurate** — Reflects reality
- **Rich** — Depth when needed
- **Precise** — No fluff

### Historical Reference

Old context files (`.float-old/project/context/`) were rich, structured markdown. Good for single chat sessions. But the new architecture (buoys, SQLite, scope chains) changes what's needed.

---

*Working document — updated as discussion evolves*
