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

**How they communicate:**
- `map.md` knows what exists (points to children)
- `context.md` knows what it means (references map for structure)
- `logs/index.md` knows what changed (references both)

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

**The trigger model:**
```
File change detected
       ↓
Agent wakes up
       ↓
Determines which files need updating:
├── map.md (if structure changed)
├── context.md (if meaning changed)
└── logs/ (always - paper trail)
       ↓
Spawns buoys → updates in parallel
```

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

## What This Is

Not a database. Databases optimize for: `SELECT * FROM users WHERE id = 5`

This optimizes for: "AI, understand this project with minimum tokens, maximum accuracy"

| Pattern | What it is |
|---------|-----------|
| File system metadata | Extended attributes on folders |
| Finding aids | Archival science — describes what's in the archive |
| Documentation | JSDoc but for folders, self-maintaining |
| Index + TOC | Book structure — skim, then drill |

The interface is markdown, the query language is natural language, the consumer is AI.

## Validation

Stress-tested against three project types:

| Project | Result |
|---------|--------|
| React SaaS app | ✓ Holds up — AI knows structure, patterns, what changed |
| Python ML project | ✓ Holds up — preserves context that ML projects lose constantly |
| Documentation site | ✓ Holds up — docs are ALL about context |

The pattern holds. Open questions (depth, granularity, cross-refs) are agent judgment, not architecture.

## Supersedes

- `.float/project/nav/` (separate nav folder)
- `.float/project/context/` (separate context folder)
- `.float/project/logs/` at root only

---

**Do not revisit.**
