# AI-Native Context Architecture

**Date:** 2026-01-06
**Session:** 33
**Status:** locked

---

## Summary

Articulated the foundational insight that float.db is AI-native — built for AI to create, enrich, and maintain, with humans as auditors rather than authors. Created reference document. Discussed but deferred mode restructuring.

---

## Decisions

### 1. AI-Native Paradigm Documented

**Decision:** Created `ref/ai-native-context.md` capturing the paradigm shift
**Rationale:** This insight wasn't explicitly articulated before. Float.db isn't "docs for AI" — it's "AI's own knowledge store that humans can audit."

**Key concepts:**
- AI is producer AND consumer (not just consumer)
- Human role shifts from author to auditor
- Markdown is a tax, not a benefit (for AI-native storage)
- Binary/SQLite is correct — human-readability is an export option
- Export is explicit, not default

### 2. Mode Restructuring Deferred

**Decision:** Keep current mode structure (deep-strategy, deep-plugin). Do not implement why/what/how reorganization yet.
**Rationale:** Current system works. Just demonstrated smooth boot → mode activation flow. Don't over-optimize before we have more experience with modes.

**Idea captured for future:**
- Why/what/how as organizational buckets for ref docs
- Foundation modes (deep-why, deep-what, deep-how)
- Composite modes pull from buckets (strategy = why+what, plugin = what+how)
- Revisit when we have 5+ modes and feel friction

### 3. Reference Doc Location

**Decision:** `ref/ai-native-context.md` (flat in ref/, not nested)
**Rationale:** Not enough ref docs yet to warrant why/what/how subdirectories. Keep flat until we feel the need.

---

## Files Changed

- `.float-workshop/ref/ai-native-context.md` — Created (AI-native paradigm)

---

## Future Consideration

When modes feel cluttered or ref docs feel disorganized, revisit:
- Why/what/how buckets for ref docs
- Foundation modes vs composite modes
- Whether posture (role) and depth (why/what/how) should be separate axes

For now: simple wins.

---

*Session 33: AI-native paradigm — built for AI, audited by humans*
