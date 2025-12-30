---
title: Filesystem Watcher Context
type: artifact-context
status: draft
created: 2025-12-30
related: architecture.md, buoys.md, decision-log.md, decisions.md, roadmap.md, watcher.md

human_author: @mds
human_intent: Frame the problem, goals, and approach for a self-healing FloatPrompt System
human_context: Strategic exploration — anything-goes coding meets FloatPrompt

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  Captured from conversation mapping session.
  Key insight: Scout/Map/Think buoy chain with decision logging.
---

# Filesystem Watcher Context

**Goal:** A self-healing FloatPrompt System where `.float/` is always an accurate, current representation of the entire project.

## The Problem

Files go stale. The metadata (`ai_updated`, `created`) tells us *when* something was touched, but not *whether it's still accurate*. A file touched yesterday could be stale if its dependencies changed today.

**Types of staleness:**

| Type | Description |
|------|-------------|
| Reference stale | Points to something that moved/renamed/deleted |
| Content stale | Describes behavior/structure that changed |
| Version stale | Says "v0.9.0" when we're at "v0.11.0" |
| Decision stale | Captures a decision that was superseded |
| Relationship stale | `related` field is incomplete or broken |

## The Approach

A filesystem watcher that keeps `.float/` current through a chain of command:

```
Boot → Watcher → scout-detect → scout-map → Map Buoy → Think Buoy → float-* commands
         (code)    (code)         (AI)        (AI)        (AI)         (tools)
```

**Key distinctions:**

- **Code layer** — Mechanical, always running, free (filesystem watcher, scout-detect)
- **Buoys** — AI agents triggered by code or other buoys (scout-map, Map, Think)
- **float-* commands** — Text tools invoked by buoys or humans (float-sync, float-fix, etc.)

**Scout is two phases:**
- **scout-detect** — Pure code, instant, runs on every change, filters noise
- **scout-map** — Lightweight AI, assesses non-trivial changes, produces report

Buoys are agents. Commands are tools they use.

## The Chain

```
npx floatprompt (or /float)
         ↓
    Boot: Initialize .float/ if needed
         ↓
    Watcher: Start monitoring
         ↓
    scout-detect: Initial scan (code, instant)
         ↓
    scout-map: Assess findings (AI, if non-trivial)
         ↓
    If clean → "Ready for: human direction"
    If issues → Map Buoy → Think Buoy → float-* commands → resolve
         ↓
    Watcher continues running
         ↓
    Changes detected → scout-detect → scout-map → Map → Think → Act
         ↓
    .float/ always current
```

## Design Principles

1. **Chain of command always** — detect → map → think → act. No shortcuts.
2. **Paper trail** — Every AI decision logged with rationale. Humans can review and correct.
3. **Self-healing** — `/float` finds and fixes. The system repairs itself.
4. **Quality over speed** — But speed matters. Configurable models for AI layers.
5. **Automation with accountability** — As much automation as possible, but decisions are logged.

## The Continuum

Evolution path from manual to always-on:

```
Phase 1: Manual (now)
    npx floatprompt init → creates .float/
    /float → AI boots, manual maintenance

Phase 2: Session watcher
    npx floatprompt → starts watcher for session
    Watcher runs while terminal open
    Close terminal → watcher stops
    /float restarts if needed

Phase 3: Background daemon
    floatprompt install → installs as service
    Always running, Dropbox-style
    Survives terminal close, system restart

Phase 4: Cloud sync (future)
    .float/ syncs to cloud
    Dashboard shows project health
    Multiple devices stay in sync
```

Start at Phase 2. Build toward Phase 3+.

## Technical Direction

- **Runtime:** Node.js (aligns with existing npx floatprompt)
- **Hosting:** Vercel-compatible
- **Watcher:** Filesystem events (chokidar or similar)
- **AI:** Anthropic SDK, configurable model per layer
- **Scope:** One project per watcher (multi-project future)

## Key Questions Resolved

| Question | Answer |
|----------|--------|
| Watch scope | Entire project, standard ignores |
| Boot sequence | Unified — `/float` handles all states |
| Human approval | AI decisions logged, human reviews paper trail |
| Error recovery | Git history + decision logs |
| Flood handling | `/float-plan` or code chunking with user confirmation |
| Offline | System requires API, no offline mode |

## Artifacts in This Folder

| File | Purpose |
|------|---------|
| CONTEXT.md | This file — problem, goals, approach |
| architecture.md | Layers, chain of command, components |
| buoys.md | Scout (two-phase), Map, Think Buoy specifications |
| decisions.md | Architectural decisions with rationale |
| decision-log.md | Paper trail format specification |
| roadmap.md | Implementation phases, open questions, tracking |
| watcher.md | Code layer specification |

---

*Part of the FloatPrompt filesystem watcher exploration.*
