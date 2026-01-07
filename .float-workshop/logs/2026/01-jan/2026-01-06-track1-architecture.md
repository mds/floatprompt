# Track 1 Architecture Decisions

**Date:** 2026-01-06
**Session:** 35
**Status:** locked

---

## Summary

Locked the architecture for Track 1 workshop plugin enrichment system: four enrichment paths, component pattern (command + agent + skill), and phased implementation approach.

---

## Decisions

### 1. Four Paths for Enrichment

**Decision:** Enrichment can happen via four distinct paths:
- **Manual** — `/float-enrich` command (explicit user request)
- **Organic** — Skill notices opportunity during normal work
- **Batched** — Handoff offers enrichment at session end
- **Emergency** — PreCompact hook triggers when context fills

**Rationale:** Different triggers for the same underlying capability. Manual gives control, organic captures serendipity, batched ensures nothing is missed, emergency prevents context overflow.

### 2. Modes Stay in Markdown

**Decision:** Modes remain human-curated markdown files, not stored in float.db.

**Rationale:** Modes are editorial artifacts requiring human judgment. Future consideration: store in float.db but export to markdown for editing (source of truth vs editing interface).

### 3. Folder Tracking

**Decision:** Two approaches for tracking which folders were touched:
- **AI memory at handoff** — AI remembers what it touched during session
- **Transcript parse** — PreCompact hooks can parse transcript for folder references

**Rationale:** Different needs require different solutions. Handoff can rely on AI memory (it's right there), PreCompact needs to parse because it's automated.

### 4. Component Pattern

**Decision:** Each capability follows Command + Agent + Skill pattern:
- **Commands** trigger (user-initiated)
- **Agents** do the work (spawned tasks)
- **Skills** notice opportunities (ambient awareness)

**Rationale:** Clear separation of concerns. Commands are the interface, agents are the implementation, skills are the intelligence layer.

### 5. Implementation Phases

**Decision:** Four-phase implementation:
- **Phase 1: Core** — Agent, command, skill (basic enrichment)
- **Phase 2: Integration** — `/float`, handoff integration
- **Phase 3: Emergency** — PreCompact hook
- **Phase 4: Polish** — boot.md refinement

**Rationale:** Start with core capability, then integrate into existing workflows, then handle edge cases, then refine the system prompt.

### 6. Boot.md Refined Last

**Decision:** Don't over-specify boot.md until components exist.

**Rationale:** Boot.md should reflect what the system actually does, not what we hope it will do. Build components first, then document their orchestration.

---

## Files Changed

- `.float-workshop/active/track1-workshop-plugin-spec.md` — Updated with architecture decisions

---

*Session 35: Four paths to enrichment, phased implementation*
