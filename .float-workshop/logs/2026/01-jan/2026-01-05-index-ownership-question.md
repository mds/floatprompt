# Index Ownership Question

**Date:** 2026-01-05
**Session:** 26
**Status:** Open

---

## Question

Who owns updating each workshop index file?

Current state: `organize.md` explicitly lists 4 indexes:
- `active/ACTIVE.md`
- `later/LATER.md`
- `done/DONE.md`
- `ref/REF.md`

But there are 7 index files total:
- `README.md` — Workshop overview, has "Current Focus" section
- `active/ACTIVE.md`
- `later/LATER.md`
- `done/DONE.md`
- `ref/REF.md`
- `logs/LOGS.md`
- `protocols/PROTOCOLS.md`

---

## Options

### Option A: Split Ownership

| Index | Owner | Rationale |
|-------|-------|-----------|
| ACTIVE, LATER, DONE, REF | organize.md | Work state |
| README "Current Focus" | organize.md | Derived from ACTIVE |
| LOGS.md | update-logs.md | Created alongside log entries |
| PROTOCOLS.md | manual | Rarely changes |

### Option B: organize.md Owns All

Single agent updates all indexes for consistency. Simpler mental model.

### Option C: README is Manual

README is stable orientation doc. "Current Focus" section removed or made generic. Dynamic state only lives in ACTIVE.md.

---

## Context

Came up during session-boot protocol discussion. Noticed README has stale handoff chain (fixed) and "Current Focus" section that could drift from ACTIVE.md.

---

*Open question — revisit when addressing workshop consistency*
