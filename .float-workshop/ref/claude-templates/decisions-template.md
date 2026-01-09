---
title: [Project Name] — Decisions
updated: YYYY-MM-DD
format: ADR (Architecture Decision Records)
---

# [Project Name] — Decisions

> Architecture Decision Records. Why we chose what we chose. Reference this when questioning past decisions or making new ones.

---

## Decision Log

| ID | Decision | Date | Status |
|----|----------|------|--------|
| [ADR-001] | [Short title] | [YYYY-MM-DD] | Accepted / Superseded / Deprecated |
| [ADR-002] | [Short title] | [YYYY-MM-DD] | Accepted |

---

## ADR-001: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Accepted | Superseded by ADR-XXX | Deprecated
**Deciders:** [Who made this decision]

### Context

[What is the issue? What forces are at play? 2-4 sentences describing the situation that required a decision.]

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **[Option A]** | [Benefits] | [Drawbacks] |
| **[Option B]** | [Benefits] | [Drawbacks] |
| **[Option C]** | [Benefits] | [Drawbacks] |

### Decision

**We chose [Option X].**

[1-2 sentences explaining the choice. What tipped the scales?]

### Consequences

**Good:**
- [Positive outcome 1]
- [Positive outcome 2]

**Bad:**
- [Tradeoff or limitation 1]
- [Tradeoff or limitation 2]

**Neutral:**
- [Side effect that's neither good nor bad]

### Notes

[Optional: Additional context, links, or future considerations.]

---

## ADR-002: [Decision Title]

**Date:** YYYY-MM-DD
**Status:** Accepted
**Deciders:** [Who]

### Context

[The situation.]

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **[Option A]** | | |
| **[Option B]** | | |

### Decision

**We chose [Option X].**

[Why.]

### Consequences

**Good:**
-

**Bad:**
-

---

## Quick Reference

### When to Write an ADR

Write an ADR when:
- Choosing between multiple valid approaches
- Making a decision that's hard to reverse
- Picking a technology or library
- Defining a pattern that will be repeated
- Changing a previous decision

Don't write an ADR for:
- Obvious choices with no real alternatives
- Trivial implementation details
- Temporary decisions (use comments instead)

### ADR Lifecycle

| Status | Meaning |
|--------|---------|
| **Proposed** | Under discussion, not yet accepted |
| **Accepted** | Decision made, in effect |
| **Superseded** | Replaced by a newer ADR (link to it) |
| **Deprecated** | No longer relevant, kept for history |

### Template for New Decisions

```markdown
## ADR-XXX: [Title]

**Date:** YYYY-MM-DD
**Status:** Accepted
**Deciders:** [Who]

### Context

[The situation requiring a decision.]

### Options Considered

| Option | Pros | Cons |
|--------|------|------|
| **[Option A]** | | |
| **[Option B]** | | |

### Decision

**We chose [Option X].**

[Why.]

### Consequences

**Good:**
-

**Bad:**
-

### Notes

[Optional.]
```

---

*Format based on Michael Nygard's ADR template*
