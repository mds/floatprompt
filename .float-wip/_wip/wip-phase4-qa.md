<fp>
<json>
{
  "STOP": "Phase 4 QA — Follow-up issues discovered during Phase 3 review.",

  "meta": {
    "title": "Phase 4: QA & Gaps",
    "id": "wip-phase4-qa"
  },

  "human": {
    "author": "@mds",
    "intent": "Track gaps and decisions discovered during post-Phase-3 review"
  },

  "ai": {
    "role": "QA engineer — find gaps, document decisions needed"
  },

  "requirements": {
    "methodology": "Map → Decide → Structure",
    "goal": "Resolve all open questions before Layer 2 (AI generation)"
  }
}
</json>
<md>
# Phase 4: QA & Gaps

**Discovered during:** Post-Phase-3 review (2026-01-03)

---

## Open Decisions

### 1. Summaries in Database

**Status:** Open

**Question:** Where should summary files (logs.md, 2026.md, 01-jan.md) live in the schema?

**Context:**
- Summaries contain narrative content, not just aggregations
- They should be in the database (single source of truth)
- Export should export them, not generate them

**Options:**

| Option | Description | Pros | Cons |
|--------|-------------|------|------|
| A | New `summaries` table | Clean separation, clear purpose | Another table to manage |
| B | `log_entries` with `type` field | Reuse existing table | Mixes different concepts |
| C | Part of `folders` table | Summaries describe folder structure | Overloads folders concept |

**Decision:** TBD

---

### 2. Autonomous Scopes in Schema

**Status:** Open

**Question:** When do we add `is_scope`, `parent_scope_path`, `scope_boot` to folders table?

**Context:**
- Vision doc (how-floatprompt-works.md) describes autonomous scopes
- Schema currently missing these columns
- Needed for hierarchical context (monorepo support)

**Decision:** TBD — likely Phase 5 (Layer 2 prep)

---

### 3. Export Completeness

**Status:** Open

**Question:** What should export.ts output?

**Current:** Only individual decision files (YYYY-MM-DD-topic.md)

**Expected:** Complete browsable structure including summaries

**Depends on:** Decision #1 (summaries in DB)

---

## Completed Items

### Production Cleanup ✅

- [x] Removed WIP references from src/db/*.ts
- [x] Renamed .float-manual → .float-wip
- [x] Updated all internal references
- [x] Rebuilt dist/
- [x] Verified TypeScript compiles

### Parity Check ✅

- [x] All 5 src/db/ files consistent
- [x] Schema matches vision (except scopes)
- [x] Import/export roundtrip works

---

## Next Steps

1. Decide on summaries storage (Decision #1)
2. Update schema if needed
3. Update import.ts if needed
4. Update export.ts to be exhaustive
5. Test roundtrip with summaries
6. Then proceed to Layer 2 (AI generation)

---

*Created 2026-01-03 during post-Phase-3 QA*
</md>
</fp>
