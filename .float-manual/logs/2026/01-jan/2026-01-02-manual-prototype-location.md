# Manual Prototype Location Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Manual prototype lives at `.float-manual/`, not `docs/sys/`.

## Rationale

| Factor | `docs/sys/` | `.float-manual/` |
|--------|-------------|------------------|
| Semantic clarity | Buried in docs (user-facing?) | Clearly dev/prototype |
| Mirrors target | Doesn't mirror `.float/` | Directly mirrors what we're building |
| Visibility | Hidden | Dot-prefix = "system" signal |
| Contamination | Mixes with user docs | Isolated |

**Key insight:** `docs/` should be user-facing documentation. The manual prototype is dev-facing working space.

## What Moved

```
docs/sys/           →  .float-manual/
├── boot.md         →  ├── boot.md
├── problem.md      →  ├── problem.md
├── overview.md     →  ├── overview.md
├── comments.md     →  ├── comments.md
├── README.md       →  ├── README.md
└── logs/           →  └── logs/
```

## Future Work (Deferred)

- Create `project/_/` structure inside `.float-manual/`
- Merge problem.md + overview.md → context.md
- Move comments.md to `src/_/context.md`
- Stabilize, then extract polished docs to `docs/sys/`

## Stale References

**Archive files in `artifacts/archive/2025/12-dec/2025-12-31-context-compiler/` contain ~20 references to `docs/sys/`.**

These are intentionally left as-is:
- Archives are frozen history — they reference where things *were*
- Updating them would falsify the historical record
- The move is documented here; that's the paper trail

**For future AI sessions:** When you see `docs/sys/` in archive files, it now means `.float-manual/`. Do not "fix" archive references — document the mapping in logs instead.

## Related

- Renamed `.float/` → `.float-old/` (stale structure from previous iteration)
- Updated self-references in moved files

---

**Do not revisit.**
