---
title: Artifact Map
type: map
created: 2025-12-31
updated: 2026-01-02

human_author: @mds
human_intent: Visual navigation of document relationships

ai_model: Claude Opus 4.5
ai_notes: WHERE things are and how they connect
---

# Context Compiler — Map

**Historical breadcrumbs. For current state, see `docs/sys/`.**

---

## Current Status (2026-01-02)

**Implementation is underway.** The canonical source for decisions is now:

| File | Purpose |
|------|---------|
| `docs/sys/_context-handoff.md` | Start here for new sessions |
| `docs/sys/decisions.md` | ALL current architecture decisions |
| `docs/sys/problem.md` | What we're solving |
| `src/` | Implementation in progress |

This artifact folder contains **historical breadcrumbs** — useful for understanding how we got here, not for current implementation.

---

## The Central Insight

FloatPrompt is not a file format. It's a **context compilation pipeline**.

```
src/ (TypeScript) → build → dist/templates/.float/ → npm float install → user project
```

The `.md` files are build artifacts, not source files.

---

## Key Decisions (Summary)

| Decision | Status | Current Location |
|----------|--------|------------------|
| Use templating | **Locked** | docs/sys/decisions.md |
| TypeScript native | **Locked** | docs/sys/decisions.md |
| Schema (id + title required) | **Locked** | docs/sys/decisions.md |
| Partials ad-hoc | **Locked** | docs/sys/decisions.md |
| Three tiers | **Locked** | docs/sys/decisions.md |

---

## Historical Documents

These capture thinking at points in time. Read for context, not as specs.

| File | Historical Value |
|------|------------------|
| `01-foundation.md` | FloatPrompt format primer |
| `02-architecture.md` | Three layers concept (still valid) |
| `03-technology.md` | Initial Handlebars decision (superseded) |
| `08-technology-reassessment.md` | Challenge to Handlebars (led to TypeScript) |
| `12-typescript-direction.md` | TypeScript lean (now locked) |
| `20-implementation-plan.md` | Original plan (partially outdated) |

---

## Reading Path for New Sessions

```
docs/sys/_context-handoff.md  ← START HERE
         ↓
docs/sys/decisions.md         ← All current decisions
         ↓
docs/sys/problem.md           ← What we're solving
         ↓
src/                          ← Current implementation
```

**Do NOT start with this artifact folder.** It's historical context, not current state.

---

## What's Outdated Here

- `20-implementation-plan.md` — Partially superseded by docs/sys/decisions.md
- `examples/` — Handlebars examples, we use TypeScript now
- Any mention of duality/buoys/footer partials — now ad-hoc, not core
- References to "future implementation" — we're in implementation now

---

*Updated 2026-01-02 — pointed to docs/sys/ as canonical source*
