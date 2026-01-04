# Archive Unity Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

ONE archive with Series inside, not separate archival systems.

## The Insight

An archival scientist would have ONE archive containing different Series:
- decisions
- sessions
- journals
- activity

Not separate systems (`logs/` vs `decisions/` vs `sessions/`).

**"logs" is the umbrella term** — it contains all Series.

## Current State

`.float-wip/` is a **field operation**:
- Active work, not final architecture
- Minimal viable structure for cross-session consistency
- Will evolve as patterns emerge

**Do not over-engineer.** The archival structure decision defines the pattern. Apply it as needed.

## Implication

When building the full `.float/` archival system:
- Single `logs/` folder
- Series inside: `logs/decisions/`, `logs/sessions/`, etc.
- Same `YYYY-MM-DD-topic.md` naming for all Series
- Same `index.md` folding at every level

## Rationale

**Archival science principle:** A Collection has Series, not sibling Collections.

**Practical:** One mental model, one pattern, one place to look.

---

**Do not revisit.**
