# Next

**Purpose:** Work queue — ordered, ready to pull into focus.

**Updated by:** `protocols/update-123.md`

---

## Queue

### 1. Re-scan Database
**Why:** 39 folders missing from Jan 3rd scan (including `src/buoys/`, `.float-workshop/`). Database has 65 folders but repo has 104.
**Command:** `float-db scan` (after fixing scan to include new folders)

### 2. Schema Cleanup
**Why:** Rename `content_md` → `context` (decided Session 12, not implemented).
**Doc:** See decision in `logs/2026/01-jan/` archives.

### 3. Layer 3 Design
**Doc:** [docs/backlog/wip-layer-3-ongoing.md](docs/backlog/wip-layer-3-ongoing.md)
**Status:** Blocked — 4 open questions, needs plugin architecture first
**Summary:** Triggers, staleness detection, freshness. Parked until plugin validates the model.

---

## Tabled (Not in Queue)

| Item | Why Tabled |
|------|------------|
| `float build` | Plugin-first is faster path |
| Vercel SDK integration | Plugin-first is faster path |
| Layer 3 | Blocked by open questions |
