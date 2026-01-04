# Summaries Live in Folders Table

**Date:** 2026-01-03
**Status:** Locked

---

## Decision

Summary files (01-jan.md, 2026.md, wip-logs.md) are stored as rows in the `folders` table, not a separate table.

---

## Rationale

Log folders like `/project-logs/2026/01-jan` are just folders. They get a row in `folders` with:

- `type = 'log_month'` (or `log_year`, `log_root`)
- `description` — one-line routing signal for AI
- `content_md` — the summary prose

No new table needed. The hierarchy is already there. SQLite queries replace manually-maintained index files.

---

## Key Insight

The folder structure in `artifacts/float-folder-structure.md` is a **data model**, not literal files on disk.

- Every folder at every level gets a row in `folders` table
- Every folder's logs are `log_entries` WHERE `folder_path = '/that/folder'`
- SQLite is the source of truth
- Export to markdown is optional output for humans/GitHub

---

## Context

This decision emerged from discussion about Question 1 in `wip-phase4-qa.md`:

> Where should summary files (logs.md, 2026.md, 01-jan.md) live in the schema?

Options considered:
- A: New `summaries` table — rejected (another table to manage)
- B: `log_entries` with `type` field — rejected (mixes different concepts)
- **C: Part of `folders` table — chosen** (summaries describe folder structure)

---

## Files Changed

| File | Change |
|------|--------|
| `wip-phase4-qa.md` | Marked Q1 as answered |
| `wip-boot.md` | Added scope clarification, data model section |

---

## Future Agent

`decision_logger` — Creates decision files in SQLite, maintains paper trail.

---

*Locked 2026-01-03*
