# Adoption-First Plugin Philosophy

**Date:** 2026-01-07
**Session:** 36
**Status:** locked

---

## Summary

Shifted from capability-first (4 commands, manual paths) to adoption-first (1 command, automatic everything). ONE command (`/float`) is the entire user interface; everything else happens automatically via skills, hooks, and agents.

---

## Decisions

### 1. One Command Interface

**Decision:** `/float` is the entire user interface. No `/float-handoff`, `/float-enrich`, or other commands for users.
**Rationale:** Adoption-first means minimal friction. Users shouldn't need to learn multiple commands or remember when to invoke them.

### 2. Skills as Automated Protocols

**Decision:** Skills notice opportunities and spawn agents automatically. "The skill IS the protocol, automated."
**Rationale:** What were previously manual protocols (like handoff, enrichment) become skills that detect when they're needed and act without user intervention.

### 3. Hooks for Session Lifecycle

**Decision:** Hooks trigger handoff at session end automatically.
**Rationale:** Users shouldn't have to remember to call `/float-handoff`. The PreCompact hook and session end hooks handle this.

### 4. Mode Suggestions are Proactive

**Decision:** Mode suggestions appear proactively but aren't required.
**Rationale:** The system can recommend modes based on detected work patterns, but users can ignore suggestions without breaking anything.

### 5. Drop Track Framing

**Decision:** Dropped "Track 1/Track 2" terminology. There's just "the plugin."
**Rationale:** Track framing was internal planning vocabulary. Users don't need to know about implementation phases.

---

## Files Changed

- `active/floatprompt-plugin-spec.md` — Created (new adoption-first spec)
- `done/track1-workshop-plugin-spec-historical.md` — Moved from active/ (historical archive)
- `active/ACTIVE.md` — Updated (reflects new spec)
- `done/DONE.md` — Updated (archived track1 spec)
- `modes/deep-plugin.md` — Updated (aligned with new spec)

---

*Session 36: From capability-first to adoption-first — one command to rule them all*
