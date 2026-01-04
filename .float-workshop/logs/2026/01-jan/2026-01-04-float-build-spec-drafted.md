# float build Spec Drafted

**Date:** 2026-01-04
**Session:** 21
**Status:** Draft (needs lock before build)

---

## Context

Session 21 focused on deep orientation and assessing readiness for Layer 3 (Ongoing). Analysis revealed:
- Layer 3 has 4 open questions (conversation access, timing, triggers, storage)
- Layer 2.5 (CMS/static context) is ready — the CMS doc is a complete spec
- `float snapshot` (Layer 3) is a special case of tiered context (Layer 2.5)

Decision: Extract the ready parts. Build CMS first.

---

## Decisions Locked (in draft spec)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Path encoding | `--` (double-dash) | Readable, reversible, filesystem-safe |
| Context location | `.float/context/` | Single location, easy gitignore |
| Default tier | `standard` (<2000 tokens) | Balance of context vs token cost |
| Cross-refs | Deferred | AI inference is future work |
| MVP scope | Single tier, no watch, no parallel | Get it working first (Rule 15) |

---

## MVP Scope

**In scope:**
- `float build` — all folders
- `float build <path>` — specific path + ancestors
- `float build --stale` — only changed folders
- Context file format (scope chain + current + logs)
- Hash-based staleness detection

**Out of scope:**
- Multiple tiers (minimal/full/deep)
- Watch mode
- Parallel buoy building
- Snapshot boot

---

## Files Created

- `.float-workshop/docs/wip-float-build-spec.md` — Complete buildable spec

---

## Next Steps

1. Review and lock the spec
2. Build `src/build/` module
3. Add `float build` CLI command
4. Test on 65 folders

---

## Related

- Source: `float-CMS-context-management-system.md`
- Layer 3 vision: `wip-layer-3-ongoing.md`
- Unix philosophy: `artifacts/17-rules-for-successful-agentic-coding.md`

---

*Session 21 — float build spec drafted, ready for lock*
