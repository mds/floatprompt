# Wikilinks Not Needed

**Date:** 2026-01-04
**Status:** Locked
**Session:** 20

---

## Decision

Wikilinks (`[[filename]]` syntax) are NOT part of the FloatPrompt vision. Relationships belong in the `references` table, not embedded in markdown prose.

---

## Rationale

**The question:** Should FloatPrompt parse and leverage `[[wikilinks]]` in markdown files to detect staleness and track relationships?

**The answer:** No.

### Old Model (Flatfile)
- Files reference files via `[[links]]`
- Humans navigate by following links
- Relationships live in the prose itself

### New Model (SQLite)
- Relationships live in tables (`references`, `folders` hierarchy)
- AI queries JOINs, not markdown syntax
- Database IS the relationship graph

### Why Wikilinks Don't Fit

1. **Redundant** — If a relationship exists, it goes in `references` table. Wikilink in prose duplicates this.

2. **Noise** — AI has to parse markdown for `[[...]]` patterns, or ignore them. Neither is clean.

3. **Maintenance burden** — Links in prose must stay in sync with actual file paths.

4. **Wrong abstraction** — Wikilinks are a human navigation pattern for flat files. SQLite queries are the AI navigation pattern.

The whole point of the SQLite pivot was moving from "files that reference files" to "database that knows relationships."

---

## Context

User (@mds) asked whether wikilinks in personal markdown files (schedule, meal plan, grocery list) could help prevent staleness. On reflection, recognized this as "flatfile brain" — old mental model from markdown-based system.

---

## Files Changed

None (decision only)

---

## Future Agent

**decision_logger** — This is exactly the kind of architectural decision a decision_logger buoy would capture.

---

*Locked 2026-01-04, Session 20*
