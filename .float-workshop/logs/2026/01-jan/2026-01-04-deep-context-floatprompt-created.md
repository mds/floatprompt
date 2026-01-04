# Deep Context: FloatPrompt System Created

**Date:** 2026-01-04
**Session:** 19
**Status:** Locked

---

## Decision

Created `docs/deep-context-floatprompt.md` as the first manual deep context document for the FloatPrompt system.

## Rationale

1. **Future sessions need orientation** — 17+ sessions of work accumulated, new sessions would need to read 50+ files
2. **Manual prototype** — This IS what the automated deep context feature will do; creating manually validates the concept
3. **Topic-based, not location-based** — Understanding spans `src/`, `docs/`, `logs/`, `buoys/` — can't be captured in a single folder's context
4. **Compresses institutional knowledge** — "The stuff a senior engineer tells you in your first week"

## What Was Created

`docs/deep-context-floatprompt.md` contains:
- Core value proposition
- Vision and formula
- Three layers with status
- Architecture (SQLite, scopes, buoys)
- Methodology gate
- Test results
- What's built (inventory)
- Evolution story (markdown → SQLite)
- 5 answered design decisions
- Related documents for deeper dives

## Design Decisions Answered

| Question | Answer |
|----------|--------|
| Vercel Sandbox vs Local | Prototype locally, Vercel is production goal |
| Trigger mechanism | Manual first (`float sync`), automation later |
| Fleet mode approach | Not separate feature — just Layer 2 at scale |
| boot.md ready criteria | Human says so |
| Deep context priority | Automated version of what we did manually |

## Files Changed

| File | Change |
|------|--------|
| `docs/deep-context-floatprompt.md` | Created (new) |
| `protocols/boot.md` | Added to drill-down files, updated last session |

## Key Insight

> Deep context captures ~80% of orientation. For 100%, drill into vision.md, buoys.md, and key test logs.

The document is a map, not the territory. It enables fast orientation with pointers for deeper understanding.

---

*Locked 2026-01-04 — Session 19*
