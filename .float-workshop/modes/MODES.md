# Modes

**Context loadouts for different types of work.**

Modes are like getting dressed for the day. Going to the office? Workout? Hiking? Skiing? Different activities need different clothes, different gear, different mindsets. Modes give AI the right context and posture for the work at hand.

---

## How Modes Work

Boot stays lean — just enough to orient. Modes are opt-in deep context.

**To activate:** "Activate [mode-name] mode" or "Load [mode-name] context"

When activated, AI reads the mode file, loads referenced documents, adopts the role, holds the key concepts.

---

## Mode Framework

Every mode follows this structure:

```markdown
# [Mode Name]

**Role:** [Who you are — identity, mindset, posture for this work]

**Activate when:** [What kind of work triggers this mode]

**Exit when:** [Signal that this mode is no longer needed]

---

## Load

Documents to read. Each adds specific context.

| Document | Path | What It Provides |
|----------|------|------------------|
| Name | path/to/doc.md | Why this matters for this mode |

---

## Hold

Key concepts to keep front of mind throughout this mode.

### [Concept Name]
Brief explanation or quote.

### [Another Concept]
Brief explanation.

---

## Ignore

What to deprioritize or avoid in this mode. Keeps focus sharp.

- Thing to not worry about right now
- Another thing that's out of scope for this mode

---

## Go Deeper

Reference docs for adjacent exploration:

| Direction | Document | Path |
|-----------|----------|------|
| Related mode | Other Mode | `modes/other-mode.md` |
| Reference doc | Relevant Doc | `ref/relevant.md` |
```

---

## Framework Elements

| Element | Purpose | Required |
|---------|---------|----------|
| **Role** | Who you are — shapes judgment and tone | Yes |
| **Activate when** | Trigger conditions — when to enter this mode | Yes |
| **Exit when** | Transition signal — when work shifts | Optional |
| **Load** | Documents to read — the context payload | Yes |
| **Hold** | Concepts to remember — mental anchors | Yes |
| **Ignore** | What to deprioritize — sharpens focus | Optional |
| **Go Deeper** | Adjacent references for exploration | Optional |

---

## Writing Good Modes

**Role should shape posture, not just describe it.**
- Weak: "You help with planning"
- Strong: "You are an architect. Think in systems, trade-offs, and long-term consequences."

**Load should be curated, not exhaustive.**
- Only include documents that directly serve this mode
- Order matters — list in reading order if dependencies exist

**Hold should be memorable anchors.**
- Quotes work well
- Concepts that change how you approach problems
- Not a summary of everything — just what matters most

**Ignore prevents drift.**
- Strategic mode ignores implementation details
- Implementation mode ignores philosophical debates
- Keeps the mode focused on its purpose

**Go Deeper enables exploration.**
- Links to adjacent modes for context switching
- Links to reference docs for deeper dives
- Escape hatch without leaving the mode system

---

## Available Modes

| Mode | Role | When to Activate |
|------|------|------------------|
| `deep-strategy.md` | Architect | Architecture decisions, planning, big-picture |
| `deep-plugin.md` | Implementer | Building plugin components, Claude Code patterns, Track 1 |

---

## Adding New Modes

1. Create `modes/[mode-name].md`
2. Follow the framework above
3. Add to the "Available Modes" table in this file

**Naming convention:** `deep-[focus].md` for deep context modes, or just `[focus].md` for lighter modes.

---

*Modes: getting dressed for the work*
