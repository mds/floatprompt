# Archival Structure Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Use archival science hierarchy with flat files within month folders.

## Structure

```
decisions/
├── index.md                    # Current locked + map (Collection)
└── 2026/                       # Series (year)
    ├── index.md                # Annual summary
    └── 01-jan/                 # File (month, sortable + readable)
        ├── index.md            # Monthly summary
        ├── 02-architecture.md  # Item (DD-topic.md)
        ├── 02-token-economy.md
        └── 02-archival-structure.md
```

## Naming Conventions

- Folders: `YYYY/`, `MM-mon/` (e.g., `01-jan/`)
- Files: `DD-topic.md` (e.g., `02-architecture.md`)
- Summaries: always `index.md` at each level

## Archival Hierarchy

| Level | Maps To |
|-------|---------|
| Collection | `decisions/` |
| Series | year (`2026/`) |
| File | month (`01-jan/`) |
| Item | daily logs (`DD-topic.md`) |

## Folding Pattern

- `index.md` at each level summarizes contents below
- Fresh session reads `decisions/index.md` (~500 tokens)
- Drills down only when needed
- Day folders created only if 10+ logs on one day

## Rationale

**Token economy:** Fresh sessions need current decisions fast, not 760 lines of history.

**Archival science:** Proven methodology for arrangement and description:
- Collection → Series → File → Item
- Finding aids (index.md) at each level
- Drill-down capability preserved

**Why this structure:**
- Files sort naturally by date
- Multiple logs per day share day number
- Month folder stays flat until unwieldy
- `index.md` stays lean at every level

## Application

First application: Restructure `decisions.md` into this format.

Apply to sessions, context, and other archives.

---

**Do not revisit.**
