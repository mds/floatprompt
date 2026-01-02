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

## Related

- Added `.float/README.md` warning about stale structure
- Updated self-references in moved files

---

**Do not revisit.**
