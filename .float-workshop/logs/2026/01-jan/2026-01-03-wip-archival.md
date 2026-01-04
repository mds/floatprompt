# WIP Files Archived

**Date:** 2026-01-03
**Status:** Locked

---

## Decision

Archive four stale wip-* files that have been superseded by `wip-vision.md`.

---

## Rationale

After creating `wip-vision.md` to capture the full vision from `artifacts/how-floatprompt-works.md`, several wip files became redundant:

- `wip-overview.md` — "How it works" superseded by wip-vision.md
- `wip-problem.md` — "The problem" superseded by wip-vision.md
- `wip-phase3.md` — Phase 3 planning, COMPLETE (scanner built)
- `wip-sqlite.md` — Storage architecture, superseded by wip-vision.md

These files still have historical value as reference material, so they're archived rather than deleted.

---

## Before

```
.float-wip/
├── wip-boot.md
├── wip-vision.md
├── wip-overview.md      ← stale
├── wip-problem.md       ← stale
├── wip-phase3.md        ← complete
├── wip-sqlite.md        ← superseded
├── wip-reconcile.md
├── wip-comments.md
├── wip-readme.md
├── wip-phase4-qa.md
└── wip-logs/
```

---

## After

```
.float-wip/
├── wip-boot.md          ← THE session boot file
├── wip-vision.md        ← THE vision document
├── wip-reconcile.md     ← still useful
├── wip-comments.md      ← still useful
├── wip-readme.md        ← pointer file
├── wip-phase4-qa.md     ← needs update
└── wip-logs/
    └── 2026/01-jan/
        ├── 2026-01-03-wip-overview-archived.md
        ├── 2026-01-03-wip-problem-archived.md
        ├── 2026-01-03-wip-phase3-archived.md
        └── 2026-01-03-wip-sqlite-archived.md
```

---

## Files Changed

| File | Change |
|------|--------|
| `wip-overview.md` | Moved to wip-logs/2026/01-jan/2026-01-03-wip-overview-archived.md |
| `wip-problem.md` | Moved to wip-logs/2026/01-jan/2026-01-03-wip-problem-archived.md |
| `wip-phase3.md` | Moved to wip-logs/2026/01-jan/2026-01-03-wip-phase3-archived.md |
| `wip-sqlite.md` | Moved to wip-logs/2026/01-jan/2026-01-03-wip-sqlite-archived.md |

---

## What Remains Current

| File | Purpose |
|------|---------|
| `wip-boot.md` | THE session boot file — always read first |
| `wip-vision.md` | THE vision — omnipresent recursive context scaffolding |
| `wip-reconcile.md` | Session reconciliation protocol |
| `wip-comments.md` | TypeScript commenting standards |
| `wip-phase4-qa.md` | Phase 4 QA (needs update for resolved decisions) |

---

*Archived 2026-01-03 after creating wip-vision.md*
