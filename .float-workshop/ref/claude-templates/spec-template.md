---
title: [Project Name] — Spec
updated: YYYY-MM-DD
status: current
---

# [Project Name] — Spec

> Scope and boundaries. What it is, what it isn't, and how you'll know it's done.

---

## What This Is

[One paragraph describing the core idea. What are you building? Who is it for? What does it do?]

---

## What This Is Not

[Explicit boundaries. What are you deliberately not building? This prevents scope creep and keeps AI focused.]

- Not [thing you're explicitly excluding]
- Not [another thing]
- Not [another thing]

---

## Core Concepts

[Key terms and ideas someone needs to understand before working on this. Define the vocabulary.]

| Term | Definition |
|------|------------|
| [Concept 1] | [What it means in this project] |
| [Concept 2] | [What it means in this project] |
| [Concept 3] | [What it means in this project] |

---

## Success Criteria

[How will you know this is done? Be specific. These should be verifiable.]

- [ ] [Criterion 1 — something you can check]
- [ ] [Criterion 2 — something you can check]
- [ ] [Criterion 3 — something you can check]

---

## Constraints

[Technical or practical limitations that shape the solution.]

| Constraint | Rationale |
|------------|-----------|
| [e.g., No backend database] | [e.g., Keep it simple for prototype] |
| [e.g., Must work on mobile] | [e.g., Primary use case is on-the-go] |
| [e.g., Single page only] | [e.g., Scope control] |

---

## Data Schema

[If applicable. Define core data structures, tables, fields, types. This is the source of truth for data modeling — PRD will reference this section.]

### [Entity 1: e.g., User]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| [field_name] | [TEXT/INTEGER/BOOLEAN/TIMESTAMP] | Yes/No | [What it stores] |

### [Entity 2: e.g., Document]

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| [field_name] | [type] | Yes/No | [description] |

### Relationships

[Describe how entities relate to each other, if applicable.]

- [Entity 1] has many [Entity 2]
- [Entity 2] belongs to [Entity 1]

> *Skip this section if your project has no persistent data.*

---

## Open Questions

[Things you haven't decided yet. It's okay to start building with unknowns — just name them.]

- [ ] [Question 1]
- [ ] [Question 2]

---

## Next Steps

After this spec, you'll typically:

1. → Write `tech-stack.md` (technology choices) + `decisions.md` (initial ADRs)
2. → Write `prd.md` (detailed requirements and build spec)
3. → Write `design.md` (aesthetic principles)
4. → Generate `features.json` (testable feature checklist)
5. → Initialize `claude-progress.md` (session log)
6. → Start building with Claude Code

---

*Spec defines boundaries and data structures. PRD fills in implementation details.*
