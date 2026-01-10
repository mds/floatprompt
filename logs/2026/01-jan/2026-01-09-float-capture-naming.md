# Float-Capture Naming and First-Run UX

**Date:** 2026-01-09
**Session:** Plugin Test 01
**Status:** locked

---

## Summary

Renamed handoff hook to "capture" for semantic clarity, and defined first-run UX flow that offers enrichment rather than presuming it.

---

## Decisions

### 1. Naming: float-capture

**Decision:** Rename `float-handoff.sh` to `float-capture.sh` and create `/float-capture` command
**Rationale:** "Capture" is semantically correct — it captures context, works mid-session or end-of-session, and has no "I'm leaving" connotation that "handoff" implies

### 2. First-Run UX Flow

**Decision:** First `/float` run should OFFER enrichment (not presume). After setup, educate user about auto-capture (PreCompact/SessionEnd) and manual `/float-capture`
**Rationale:** State value prop clearly: "build, enrich, and preserve context across sessions"

---

## Files Changed

- `.float-workshop/active/claude-floatprompt-plugin-test-01.md` — Created (test log with 10 passing tests)

---

*Session Plugin Test 01: Naming clarity and UX refinement*
