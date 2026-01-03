<fp>
<json>
{
  "STOP": "Phase 2 Planning. Get project folder information into the database. Map → Decide → Structure.",

  "meta": {
    "title": "Phase 2 Planning",
    "id": "wip-phase2"
  },

  "human": {
    "author": "@mds",
    "intent": "Lock all Phase 2 requirements before writing code"
  },

  "ai": {
    "role": "Phase 2 architect — no code until all questions answered"
  },

  "requirements": {
    "phase": "Map (questions) → Decide (answers) → Structure (build)",
    "status": "Decide phase complete — stress test passed, ready for implementation",
    "gate": "Ready to build",
    "scope": "DEVELOPMENT — building importer to test schema with our own data. User experience design comes later."
  }
}
</json>
<md>
# Phase 2 Planning

**Status:** Decide phase complete — stress test passed, ready for implementation.

**Gate:** Ready to build.

**Scope:** DEVELOPMENT — We're building an importer to test our schema with our own data. User experience design comes later.

---

## 1. Problem

We have a SQLite schema (src/db/schema.ts) but no way to test it with real data.

Our test data exists in flat files:
```
.float-manual/_wip/wip-logs/    # Decision history (our prototype)
```

**We need to import this data into SQLite to validate:**
- Does the schema actually work?
- Are the columns right?
- Can we query what we need?

This is NOT about user experience yet. This is about proving the schema works.

---

## 2. Goals

**Phase 2 = Build importer to test schema with OUR data.**

### Test Data Source

| Source | Location | Target Table |
|--------|----------|--------------|
| Decision logs | `.float-manual/_wip/wip-logs/2026/01-jan/2026-01-02-*.md` | `log_entries` |

**Note:** `.float-old/` is stale (old markdown-only approach). We're ignoring it entirely.

### Success Criteria

1. **Import runs without errors** — Our test data parses correctly
2. **Data is queryable** — Can run example queries
3. **Schema validates** — Zod schemas accept the imported data
4. **Questions answered** — We learn what's missing or wrong

### Not Phase 2

- User-facing CLI commands (that's after we validate)
- AI generating new content (that's Phase 3)
- Cloud infrastructure (that's later)
- Designing the "first run" experience (that's user experience design)
- `folders` table (needs scanner, not importer)
- `files`, `references`, `open_questions`, `tags` tables (later phases)

---

## 3. Architecture Decision

**One `float.db` per project installation.**

The folder hierarchy lives IN the data (via `path` and `parent_path` columns), not in the file structure.

```
my-project/
├── .float/
│   ├── float.db          ← THE database (all context)
│   ├── boot.md           ← System prompt (AI reads first)
│   └── exports/          ← Optional markdown exports
├── src/
└── ...
```

---

## 4. Questions & Answers

### Test Data (What We're Importing)

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 1 | What's in `.float-manual/_wip/wip-logs/*.md`? Format? | Plain markdown: `# Title`, `**Date:**`, `**Status:**`, `## Decision`, etc. 11 decision files + 3 summary files | Locked |
| 2 | What's in `.float-old/project/nav/*.md`? Format? | N/A — ignoring .float-old (stale) | Locked |
| 3 | What's in `.float-old/project/context/*.md`? Format? | N/A — ignoring .float-old (stale) | Locked |
| 4 | What's in `.float-old/project/logs/*.md`? Format? | N/A — ignoring .float-old (stale) | Locked |

### Parsing Strategy

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 5 | Do we need a markdown parser or just regex/string parsing? | Regex/string parsing is sufficient. Format is simple and consistent. | Locked |
| 6 | How strict? Fail on malformed files or skip with warning? | Skip with warning. Log issue, continue importing, report summary. | Locked |
| 7 | Do we parse `<fp><json>...</json><md>...</md></fp>` format? | No. wip-logs are plain markdown. `<fp>` format not needed for Phase 2. | Locked |

### Column Mapping

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 8 | wip-logs/*.md → which `log_entries` columns? | See mapping table below | Locked |
| 9 | .float-old nav files → which `folders` columns? | N/A — ignoring .float-old | Locked |
| 10 | .float-old context files → which `folders` columns? | N/A — ignoring .float-old | Locked |
| 11 | Skip `references`, `open_questions`, `tags` tables for now? | Yes. Phase 2 = `log_entries` only. | Locked |

### Development Mechanics

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 12 | One-time test script or reusable function? | Reusable functions in `src/db/import.ts` | Locked |
| 13 | Where does test database go? | `.float-manual/float.db` (git-ignored) | Locked |
| 14 | TypeScript or raw SQL for testing? | TypeScript + Zod validation; sqlite3 CLI for ad-hoc queries | Locked |

### Validation

| # | Question | Answer | Status |
|---|----------|--------|--------|
| 15 | What queries prove the import worked? | 4 categories: count, schema check, content spot-check, aggregations | Locked |
| 16 | How do we compare SQLite output to original files? | Manual spot-checking for Phase 2 (sufficient for validation) | Locked |

---

## 5. Column Mapping Detail

### Source → Target

| Source | Target Column | Extraction |
|--------|---------------|------------|
| Filename `2026-01-02-nav-structure.md` | `date` | First 10 chars of filename |
| Filename `2026-01-02-nav-structure.md` | `topic` | After date, before `.md` |
| `# Title` | `title` | First H1 heading |
| `**Status:** Locked` | `status` | Regex, lowercase |
| `## Decision` section | `decision` | Text until next H2 |
| `## Rationale` section | `rationale` | Text until next H2 (if exists) |
| `## Files Changed` table | `files_changed` | Parse table → JSON array |
| `## Future Agent` section | `future_agent` | Text or table content |
| `## Supersedes` section | `supersedes` | Reference (resolve to id later) |
| N/A | `folder_path` | Default to `'/'` (system-wide) |
| File mtime or date field | `created_at` | Unix timestamp |

### Files to Import (decision files only)

```
.float-manual/_wip/wip-logs/2026/01-jan/
├── 2026-01-02-founding.md
├── 2026-01-02-archival-structure.md
├── 2026-01-02-archive-unity.md
├── 2026-01-02-nav-structure.md
├── 2026-01-02-vercel-infrastructure.md
├── 2026-01-02-manual-prototype-location.md
├── 2026-01-02-project-folder-naming.md
├── 2026-01-02-self-describing-filenames.md
├── 2026-01-02-storage-architecture.md
├── 2026-01-02-sqlite-understanding.md
└── 2026-01-02-no-code-without-requirements.md
```

**Skip:** `01-jan.md`, `2026.md`, `wip-logs.md` (summary/index files — these become queries, not data)

---

## 6. Validation Queries

### Basic (did it insert?)

```sql
-- Count: should be 11
SELECT COUNT(*) FROM log_entries;

-- List all
SELECT date, topic, title, status FROM log_entries ORDER BY date;
```

### Schema (are columns populated?)

```sql
-- Check for NULL in required fields
SELECT id, title FROM log_entries WHERE title IS NULL OR date IS NULL;

-- Check status values
SELECT DISTINCT status FROM log_entries;

-- Check date format
SELECT date FROM log_entries WHERE date NOT LIKE '____-__-__';
```

### Content (did we parse correctly?)

```sql
-- Spot check: nav-structure
SELECT title, decision, rationale
FROM log_entries
WHERE topic = 'nav-structure';

-- Spot check: sqlite-understanding (longest file)
SELECT title, LENGTH(decision) as decision_length
FROM log_entries
WHERE topic = 'sqlite-understanding';
```

### Aggregation (does GROUP BY work?)

```sql
-- By status
SELECT status, COUNT(*) FROM log_entries GROUP BY status;

-- By month (what 01-jan.md did manually)
SELECT substr(date, 1, 7) as month, COUNT(*) as decisions
FROM log_entries
GROUP BY month;
```

---

## 7. File Structure

```
src/
├── db/
│   ├── schema.ts      ← EXISTS (Zod schemas + DDL)
│   ├── client.ts      ← NEW (database connection, helpers)
│   └── import.ts      ← NEW (parse wip-logs, insert to log_entries)
└── index.ts           ← EXISTS (root exports)

.float-manual/
├── float.db           ← NEW (test database, git-ignored)
└── _wip/
    └── wip-logs/      ← Source data
```

---

## Summary

**Total questions:** 16

**Answered:** 16

**Status:** ✅ Stress test passed — ready for implementation

---

## 8. Stress Test Results

Conducted 2026-01-03. Challenged all decisions against actual data.

### Challenges & Results

| # | Challenge | Result | Action |
|---|-----------|--------|--------|
| 1 | Are we testing the right thing? | ✅ Valid | AI generated logs following `wip-logs.md` spec. Schema matches spec. |
| 2 | Format variations in files? | ⚠️ Minor | Some files have blockquotes before title, trailing text in date. Parser handles. |
| 3 | Missing `## Decision` section? | ⚠️ Edge case | `founding.md` has no Decision section. Import with NULL. |
| 4 | File count correct? | ✅ Matches | 11 decision files confirmed. |
| 5 | Schema columns match extraction? | ✅ Yes | All columns have corresponding source data. |
| 6 | `supersedes` foreign key? | ⚠️ Defer | Skip FK resolution for Phase 2. |
| 7 | `before_state`/`after_state` exist? | ✅ Yes | 2 files have explicit Before/After sections. |
| 8 | Is regex sufficient? | ✅ Yes | Largest file is 364 lines. No AST needed. |

### Key Discovery

The `wip-logs.md` file defines the exact spec AI followed:

```json
"decision_format": {
  "required": ["Date", "Status", "Decision"],
  "optional": ["Rationale", "Before/After", "Supersedes", "Files Changed", "Future Agent"]
}
```

**This matches our schema exactly.** The import should be nearly 1:1.

### Parser Adjustments Noted

1. **Title extraction:** Skip blockquotes, find first `# ` line
2. **Date extraction:** Regex ignores trailing text like `(captured)`
3. **NULL handling:** Optional sections can be NULL
4. **supersedes:** Skip FK resolution (defer to later phase)

### Verdict

**Plan is solid.** Minor edge cases identified, all handleable within the design.

---

## Next Steps

1. ~~Map test data~~ ✓
2. ~~Answer each question~~ ✓
3. ~~Lock decisions~~ ✓
4. ~~Stress test~~ ✓
5. ~~Build importer~~ ✓ (client.ts, import.ts)
6. ~~Test queries~~ ✓ (12 entries, all validated)
7. ~~Learn~~ ✓ (schema works, "references" reserved word fixed)

**Phase 2 complete.**

---

## Phase 3 (Next)

- Build scanner (populate `folders` table from actual project)
- AI-enriched context generation
- User-facing CLI commands

---

*Created 2026-01-02 — Updated 2026-01-03 with Phase 2 implementation complete*
</md>
</fp>
