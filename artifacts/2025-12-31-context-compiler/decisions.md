---
title: Context Compiler Decisions
type: decisions
created: 2025-12-31
updated: 2026-01-02

human_author: @mds
human_intent: Consolidated WHY for all choices made

ai_model: Claude Opus 4.5
ai_notes: Historical decisions — see docs/sys/decisions.md for current
---

# Context Compiler — Decisions (Historical)

**For current decisions, see `docs/sys/decisions.md`.**

This file captures the decision evolution. The canonical source is now `docs/sys/decisions.md`.

---

## Decision Evolution

```
2025-12-31: Initial exploration
     ↓
03-technology.md → Handlebars locked
     ↓
08-technology-reassessment.md → Wait, TypeScript might be better
     ↓
12-typescript-direction.md → Lean TypeScript
     ↓
2026-01-01: TypeScript LOCKED, Zod schemas created
     ↓
2026-01-02: Partials decision — ad-hoc only, not core architecture
```

---

## Decisions Made Here (Now in docs/sys/decisions.md)

### Locked in This Artifact

| Decision | Status | Now Documented In |
|----------|--------|-------------------|
| Use templating | Locked | docs/sys/decisions.md |
| Dual CLI model | Locked | docs/sys/decisions.md |
| TypeScript native | Locked | docs/sys/decisions.md |
| No React for build | Locked | docs/sys/decisions.md |

### Evolved Since This Artifact

| Original Decision | What Changed | Current State |
|-------------------|--------------|---------------|
| "Partials for shared patterns" | Decided partials are ad-hoc | No built-in partials |
| "Duality, buoys, footer partials" | Deleted | Add only when 3+ tools share content |
| "Open: Config schema shape" | Decided | id + title required, everything else optional |
| "Open: Partial organization" | Decided | Empty folder with README.md guidance |

---

## What's Still Valid

These decisions from this artifact are still current:

1. **Use templating** — Yes, maintenance pain is real
2. **TypeScript native** — Template literals, no Handlebars
3. **Dual CLI model** — npm (headless) + /slash (interactive)
4. **No React for build system** — Compilation, not UI

---

## What's Changed

These were decided differently than originally planned:

1. **Partials** — Originally "extract duality, buoys, footer" → Now "ad-hoc only"
2. **Schema** — Originally "open question" → Now "id + title required, rest optional"
3. **Three tiers** — Not in original → Now locked (fullest/fuller/minimal)

---

## Do Not Revisit (Still Valid)

1. **Whether to use templating** — Yes. Decided.
2. **TypeScript vs Handlebars** — TypeScript. Locked.
3. **React for build system** — No. Locked.

---

## For Current Decisions

**Go to `docs/sys/decisions.md`** — that's the canonical source with all current architecture decisions.

---

*Updated 2026-01-02 — marked as historical, pointed to docs/sys/decisions.md*
