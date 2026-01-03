# Manual Prototype Location Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Manual prototype lives at `.float-manual/`, not `docs/sys/`.

---

## Rationale

| Factor | `docs/sys/` | `.float-manual/` |
|--------|-------------|------------------|
| Semantic clarity | Buried in docs (user-facing?) | Clearly dev/prototype |
| Mirrors target | Doesn't mirror `.float/` | Directly mirrors what we're building |
| Visibility | Hidden | Dot-prefix = "system" signal |
| Contamination | Mixes with user docs | Isolated |

**Key insight:** `docs/` should be user-facing documentation. The manual prototype is dev-facing working space.
