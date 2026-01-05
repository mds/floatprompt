# Update 123

**Purpose:** Update state files — `_1_next.md`, `_2_focus.md`, `_3_review.md`

**Called by:** `handoff.md` (end of session)

---

## What This Updates

| File | Purpose |
|------|---------|
| `_1_next.md` | Work queue — ordered, ready to pull |
| `_2_focus.md` | Active work — this session's focus |
| `_3_review.md` | Pending validation — done but unconfirmed |

---

## When to Run

- End of every session (via handoff.md)
- When work items change state
- After completing or starting work

---

## Protocol

### Step 1: Assess Session Outcome

What happened this session?
- [ ] Focus item completed → move to `_3_review`
- [ ] Focus item blocked → note in `_2_focus`, maybe back to `_1_next`
- [ ] Focus item continuing → update summary in `_2_focus`
- [ ] New work identified → add to `_1_next`

### Step 2: Update `_2_focus.md`

```markdown
## Active

### [Current Work Item]
**Doc:** [path/to/doc.md](path/to/doc.md)
**Status:** In progress | Blocked | Continuing
**Summary:** What's happening, what's next.

## Context
- Links to relevant specs, foundation docs
```

### Step 3: Update `_3_review.md` (if applicable)

```markdown
## Pending Validation

### [Completed Item]
**Doc:** [path/to/doc.md](path/to/doc.md)
**Summary:** What was done.
**Validate:** Criteria for confirming completion.
```

### Step 4: Update `_1_next.md`

```markdown
## Queue

### 1. [Next Priority]
**Doc:** [path/to/doc.md](path/to/doc.md)
**Summary:** Why this is next.
```

---

## State Transitions

```
_1_next → _2_focus    (pulled into active work)
_2_focus → _3_review  (completed, needs validation)
_2_focus → _1_next    (blocked, back to queue)
_3_review → specs/    (validated, done)
_3_review → _1_next   (rejected, needs rework)
```

---

## Format Guidelines

- **Pointers, not content** — link to docs, don't duplicate
- **AI-friendly summaries** — 1-3 sentences of context
- **Status is clear** — reader knows state immediately

---

*Placeholder — full protocol TBD*
