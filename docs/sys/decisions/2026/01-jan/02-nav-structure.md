# Nav Structure Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

`.float/project/` mirrors the project folder structure. Each tracked folder gets a `_/` subfolder containing map.md, context.md, and logs/.

## The Pattern

```
.float/project/
├── _/                      ← root meta (project itself)
│   ├── map.md              ← structure
│   ├── context.md          ← understanding
│   └── logs/
│       └── index.md        ← history
├── src/
│   ├── _/                  ← src/ meta
│   │   ├── map.md
│   │   ├── context.md
│   │   └── logs/
│   │       └── index.md
│   └── components/
│       └── _/              ← components/ meta
│           ├── map.md
│           ├── context.md
│           └── logs/
│               └── index.md
└── docs/
    └── _/
        ├── map.md
        ├── context.md
        └── logs/
            └── index.md
```

## The Three Files

| File | Purpose |
|------|---------|
| `map.md` | Structure — what's here, routing to children |
| `context.md` | Understanding — what it means, decisions, patterns |
| `logs/index.md` | History — what changed, freshness signal |

## The `_/` Convention

- `_/` means "meta about this folder"
- Always sorts first (before alphabetical subfolders)
- Prevents dispersion of map.md, context.md, logs/ among subfolders
- Self-similar at every level

## Agent Behavior

Emergent, not prescribed. The agent's job:

1. Something changed
2. Update `_/logs/` (always)
3. Check: is `_/map.md` still accurate?
4. Check: is `_/context.md` still true?
5. Bubble up to parent's `_/logs/`

Depth, granularity, and cross-references are agent judgment — not rules.

## Why Mirror Structure

**Old (separate by type):**
```
.float/project/
├── nav/src.md
├── context/src.md
└── logs/src/
```
To understand `src/`, look in 3 places.

**New (mirror structure):**
```
.float/project/src/_/
├── map.md
├── context.md
└── logs/
```
Everything about `src/` is in one place.

## Communication Flow

```
File changes in src/components/
       ↓
_/logs/index.md gets entry (always)
       ↓
Agent reviews: _/map.md still accurate? _/context.md still true?
       ↓
Bubbles up to src/_/logs/index.md (summarized)
       ↓
Bubbles up to _/logs/index.md (summarized further)
```

Logs drive freshness. They're the signal that triggers map/context review.

## Supersedes

- `.float/project/nav/` (separate nav folder)
- `.float/project/context/` (separate context folder)
- `.float/project/logs/` at root only

---

**Do not revisit.**
