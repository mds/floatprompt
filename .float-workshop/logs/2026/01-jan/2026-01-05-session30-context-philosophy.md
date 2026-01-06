# Session 30: Context Philosophy

**Date:** 2026-01-05
**Session:** 30
**Status:** locked

---

## Summary

Articulated the philosophical foundation of float.db: context is "compressed human judgment" not just information. Documented the AI perspective on why persistent context matters.

---

## Decisions

### 1. Context Philosophy Locked

**Decision:** Context is "compressed human judgment" — not just information
**Rationale:** Float.db extends CLAUDE.md for projects that outgrow a single file. The key insight is that AI doesn't just need data, it needs the distilled judgment calls, rationale, and understanding that humans accumulate over time.

**Criteria for float.db adoption:**
- 50+ folders
- Dynamic context needs
- Long-term AI collaboration

### 2. AI Perspective Documented

**Decision:** Created `ref/ai-wants-this.md` with first-person AI view on float.db
**Rationale:** Documenting from AI's perspective reveals the core problem: "Every session starts cold, understanding dies with session." This framing makes clear what float.db solves:
- Persistent understanding (survives session end)
- Hierarchical knowledge (right depth at right time)
- Freshness awareness (knows what's stale)

### 3. Queryable vs Navigable

**Decision:** Workshop flat files are prototype of float.db structure
**Rationale:** Same structure, different interface:
- Flat files = navigable (for humans browsing)
- SQLite = queryable (for AI reasoning)

The workshop folder structure is the data model we're building toward, just in a human-friendly format during development.

### 4. Plugin Extension Vision

**Decision:** Future `/float init` extends `/init`, not replaces
**Rationale:** FloatPrompt is not a competitor to Claude Code — it extends it. Just as Claude Code's `/init` creates CLAUDE.md, `/float init` would extend that for projects needing deeper context management. Track 1 validates this pattern.

### 5. Reference Docs Updated

**Decision:** Created/updated core reference documents for Session 30
**Files updated:**
- `ref/deep-floatprompt.md` — Comprehensive system orientation
- `ref/ai-wants-this.md` — AI perspective (new)
- `ref/float-folder-structure.md` — Full data model
- `active/track1-workshop-plugin-spec.md` — Enhanced with new insights

### 6. PreCompact Hook Discovery

**Decision:** Claude Code has `PreCompact` hook that enables future auto-handoff
**Rationale:** The `PreCompact` hook fires before auto-compact events. Using matcher `auto` catches context pressure events, enabling future automatic handoff when context fills up.

**Limitations discovered:**
- No threshold warning (80-90% context) available
- No real-time context percentage available
- These are feature request territory for Claude Code

**Action:** Added to `active/track1-workshop-plugin-spec.md` under "Future: Auto-Handoff via PreCompact Hook"

---

## Files Changed

- `ref/deep-floatprompt.md` — Updated (Session 30 comprehensive orientation)
- `ref/ai-wants-this.md` — Created (AI perspective document)
- `ref/float-folder-structure.md` — Updated (full data model)
- `active/track1-workshop-plugin-spec.md` — Updated (enhanced with context philosophy)

---

*Session 30: Context is compressed human judgment*
