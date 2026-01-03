# Archival Structure Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Use archival science hierarchy with flat files within month folders.

---

## Rationale

**Token economy:** Fresh sessions need current decisions fast, not 760 lines of history.

**Archival science:** Proven methodology for arrangement and description:
- Collection → Series → File → Item
- Finding aids (index.md) at each level
- Drill-down capability preserved

**Why this structure:**
- Files sort naturally by date (full YYYY-MM-DD prefix)
- Files are self-describing out of context
- Month folder stays flat until unwieldy
- `index.md` stays lean at every level
