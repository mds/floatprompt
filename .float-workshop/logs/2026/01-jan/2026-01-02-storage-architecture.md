# Storage Architecture Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Evolve from flat files (prototype) to SQLite (production) in four phases.

## The Insight

The value prop isn't "you can read markdown files."

The value prop is **"AI has complete context across your entire project."**

Humans don't need to open files. They need to trust that AI knows everything instantly.

## The Phases

| Phase | What | When |
|-------|------|------|
| **1. NOW** | Flat files only | Prototyping, testing structure |
| **2. SOON** | SQLite alongside flat files | When structure is stable |
| **3. LATER** | SQLite as source of truth | When TypeScript tooling works |
| **4. EVENTUALLY** | Flat files optional | Production ready, export for sharing |

## Why SQLite

- **Single file** — No server, no config, no hosting
- **Fast queries** — Instant parity checks, relationship tracking
- **History built-in** — Replaces need for git-style tracking
- **Regenerable** — Delete and rebuild from flat files (in Phase 2)
- **Battle-tested** — In every phone, browser, OS since 2000

## What SQLite Enables

| Operation | Flat files (now) | SQLite (soon) |
|-----------|------------------|---------------|
| Find stale refs | Grep all files | `SELECT * FROM references WHERE target NOT IN files` |
| What changed today? | Git log | `SELECT * FROM history WHERE date = today` |
| Locked decisions | Read all files | `SELECT * FROM decisions WHERE status = 'locked'` |

## The File

```
.float/
├── project/
└── index.db    ← Single file, ~50KB, contains everything
```

---

## Files Changed

| File | Change |
|------|--------|
| `wip-sqlite.md` | Created — full architecture document |
| `wip-boot.md` | Added Storage Architecture section, added to drill-down |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Document architecture | `decision_logger` |
| Build SQLite scanner | TypeScript (not agent) |
| Query SQLite for parity | `parity_checker` |

---

**Do not revisit.**
