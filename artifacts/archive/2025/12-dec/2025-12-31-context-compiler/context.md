---
title: Context Compiler — Context (Historical)
type: context
created: 2025-12-31
updated: 2026-01-02

human_author: @mds
human_intent: Historical snapshot of context compiler concept

ai_model: Claude Opus 4.5
ai_notes: Historical breadcrumbs — see docs/sys/ for current state
---

# Context Compiler — Context (Historical)

**For current state, see `docs/sys/_context-handoff.md`.**

This file captures the original vision. The canonical source is now `docs/sys/`.

---

## Current Status (2026-01-02)

**Implementation is underway.** This file is historical breadcrumbs.

| Current Source | Purpose |
|----------------|---------|
| `docs/sys/_context-handoff.md` | Start here for new sessions |
| `docs/sys/decisions.md` | ALL current architecture decisions |
| `docs/sys/problem.md` | What we're solving |
| `src/` | Implementation in progress |

---

## The Central Insight (Still Valid)

FloatPrompt is not a file format. It's a **context compilation pipeline**.

```
src/ (TypeScript) → build → dist/templates/.float/ → npm float install → user project
```

The `.md` files are build artifacts, not source files.

---

## What's Changed Since This Was Written

| Original Vision | Current Implementation |
|-----------------|------------------------|
| Config + Templates | TypeScript native (no Handlebars) |
| Partials: duality, buoys, footer | Partials are ad-hoc, not core |
| system.json config | TypeScript modules |
| Future implementation | In progress now |

---

## What's Still Valid

1. **Build system is invisible** — Users see `.md` files
2. **Schema is the product** — Types + validation via Zod
3. **Two execution contexts** — npm (headless) + /slash (interactive)
4. **Stability enables verticals** — Still true

---

## Three Layers (Evolved)

Original:
```
Config Layer (JSON) → Template Layer (Handlebars) → Output Layer (.md)
```

Current:
```
Schema Layer (Zod) → Tool Layer (TypeScript) → Output Layer (.md)
```

Same concept, different implementation.

---

## Do Not Reference for Implementation

- Partials section (deleted in favor of ad-hoc approach)
- Technology decisions (superseded by docs/sys/decisions.md)
- `13-when.md` triggers (we're implementing now)

---

## For Current Implementation

**Go to `docs/sys/_context-handoff.md`** — that's the starting point for new sessions.

---

*Updated 2026-01-02 — marked as historical, pointed to docs/sys/*
