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

## Answered Decisions

### 1. Summaries in Database ✅

**Status:** Answered (2026-01-03)

**Question:** Where should summary files (logs.md, 2026.md, 01-jan.md) live in the schema?

**Decision:** Option C — Part of `folders` table.

**Rationale:**
- Log folders (`/project-logs/2026/01-jan`) are just folders
- They get a row in `folders` with:
  - `type = 'log_month'` (or `log_year`, `log_root`)
  - `description` — one-line routing signal
  - `content_md` — the summary prose
- No new table needed
- The hierarchy is already there — SQLite queries replace manually-maintained index files

**Key insight:** The folder structure in `artifacts/float-folder-structure.md` is **data model**, not literal files. Everything lives in SQLite. Export to markdown is optional output for humans/GitHub.

See: `wip-logs/2026/01-jan/2026-01-03-summaries-in-folders.md`

---

### 2. Autonomous Scopes in Schema ✅

**Status:** Answered (2026-01-03)

**Question:** When do we add `is_scope`, `parent_scope_path`, `scope_boot` to folders table?

**Decision:** Now — included in the locked schema spec.

**Rationale:**
- Schema spec (`wip-schema-spec.md`) includes all 3 scope fields
- They're part of the 16-field design
- Will be implemented when schema.ts is updated

See: `wip-schema-spec.md` and `2026-01-03-schema-spec-locked.md`

---

## Open Decisions

### 3. Export Completeness

**Status:** Open

**Question:** What should export.ts output?

**Current:** Only individual decision files (YYYY-MM-DD-topic.md)

**Expected:** Complete browsable structure including summaries

**Depends on:** Decision #1 (summaries in DB) — now answered

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

1. ~~Decide on summaries storage (Decision #1)~~ ✅ Answered
2. ~~Update schema~~ ✅ Spec locked in `wip-schema-spec.md`, ready to implement
3. **Implement schema.ts** — Translate locked spec to TypeScript/Zod
4. Update import.ts if needed
5. Update export.ts to output full folder structure as markdown
6. Test roundtrip with summaries
7. Then proceed to Layer 2 (AI generation)

---

*Created 2026-01-03 during post-Phase-3 QA*
</md>
</fp>
