---
title: Float Interview
type: concept
created: 2025-12-31

human_author: @mds
human_intent: Capture the interview-based context extraction pattern

ai_model: Claude Opus 4.5
ai_notes: Critical for generating context docs — AI draws out human knowledge through structured questioning
---

# Float Interview

**Context extraction through structured AI-human dialogue.**

---

## The Core Idea

Some context can be **scanned** (file structure, schemas, code).

Some context must be **drawn out** (decisions, rationale, intent).

Float Interview is the tool for the second category — a structured way for AI to ask questions that surface human knowledge and capture it as documentation.

---

## The Precedent

Similar to the AI portfolio coach pattern:
- Pre-built interview structure
- AI asks, human answers
- Responses become documentation
- Context extracted, not invented

---

## Two Types of Truth

**Critical distinction:**

| Type | Source | Treatment |
|------|--------|-----------|
| **Factual/Contractual** | Filesystem, schemas, code | Gospel truth — locked, verified |
| **Contextual/Human** | Interview responses, decisions | Valuable context — but not immutable |

### Factual (Locked)
- File structure (map.md reflects actual folders)
- Schema shapes (JSON structure is what it is)
- Template outputs (compiled .md matches source)
- Code behavior (tests prove it)

**These are ground truth.** AI observes and documents them.

### Contextual (Fluid)
- Why this architecture? → Human explains
- What's the intent? → Human describes
- What trade-offs? → Human recalls

**These are human perspective.** Valuable, but:
- Memory can be imperfect
- Understanding evolves
- Context changes over time

---

## The Risk

> "If a human answers a certain way, the AI model will basically use that as gospel truth"

This is real. Mitigations:

1. **Label the source** — Mark human-provided context as such
2. **Date stamp** — When was this captured?
3. **Allow evolution** — Decisions can be revisited
4. **Separate fact from interpretation** — Structure vs meaning

### Example Labeling

```markdown
## Why NextAuth over Clerk?

*Source: Interview with @mds, 2025-12-31*

We chose NextAuth because enterprise clients need self-hosting.
Clerk's managed model doesn't work for regulated industries.

*Note: This reflects understanding at time of decision.
May be revisited if requirements change.*
```

---

## Interview Types

### 1. Discovery Interview (New Context)

**Trigger:** New folder, new domain, no existing context

**Pattern:**
```
AI: I've mapped src/auth/ and found these files:
    - config.ts
    - providers/
    - middleware.ts

    To create context documentation, I need to understand:

    1. What problem does this authentication system solve?
    2. Why this approach vs alternatives you considered?
    3. What should someone new understand first?
    4. Any gotchas or non-obvious things?```

**Output:** AI drafts context.md, decisions.md with human input incorporated.

---

### 2. Decision Interview (Capturing Rationale)

**Trigger:** A choice was made, need to document why

**Pattern:**
```
AI: I see you chose NextAuth for authentication. To document this decision:

    1. What alternatives did you consider?
    2. What was the deciding factor?
    3. Under what conditions would you revisit this?
    4. Who was involved in this decision?
```

**Output:** Entry in decisions.md with full rationale.

---

### 3. Emergent Interview (AI-Driven Discovery)

**Trigger:** AI has mapped files and drawn initial conclusions, needs validation

**Pattern:**
```
AI: Based on my analysis of this folder, I believe:

    - This handles user sessions (based on file names)
    - It uses JWT tokens (based on imports I see)
    - The middleware runs on every request (based on placement)

    Am I understanding this correctly?
    What am I missing or getting wrong?
```

**Output:** Refined context.md with human-validated understanding.

---

## The Flow

```
┌─────────────────────────────────────────┐
│  AI SCANS                               │
│  Files, structure, code, schemas        │
│  → Generates factual map.md             │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  AI INTERVIEWS                          │
│  Asks predetermined + emergent questions│
│  → Human provides context, rationale    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  AI DRAFTS                              │
│  context.md, decisions.md               │
│  → Labeled with source, dated           │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│  HUMAN REVIEWS                          │
│  Approves, corrects, enriches           │
│  → Final documentation                  │
└─────────────────────────────────────────┘
```

---

## Question Categories

### Predetermined (Always Ask)
- What is this for?
- Why this approach?
- What should newcomers know first?
- Any gotchas?

### Emergent (Based on Scan)
- "I see X pattern, is that intentional?"
- "These files seem related, are they?"
- "This looks like Y, am I right?"
- "I noticed Z is missing, is that intentional?"

### Deep Dive (Optional)
- Trade-offs considered?
- Who decided this?
- When might this change?
- Dependencies on this decision?

---

## Integration Points

### With Existing Tools

| Tool | Interview Integration |
|------|----------------------|
| `/float-context` | Discovery interview to enrich terrain map |
| `/float-harvest` | Interview to validate mined insights |
| `/float-focus` | Deep dive interview for specific topics |
| Nav folder creation | Interview to populate decisions.md |

### Potential New Tool

`/float-interview` — Dedicated context extraction tool

```
/float-interview src/auth/

AI: I will interview you about src/auth/ to create context documentation.
    This will take 3-5 questions. Ready?

[Interactive Q&A session]

AI: Based on our conversation, I have drafted:
    - context.md (what this is)
    - decisions.md (why it is this way)

    [Shows drafts for approval]
```

---

## Breadcrumb Note

This captures the insight that **context extraction requires dialogue**, not just scanning.

The interview pattern:
1. Separates fact from interpretation
2. Labels human-provided context appropriately
3. Allows for evolution over time
4. Draws out knowledge that cannot be scanned

This is a key component of the context compiler vision — not just generating docs from templates, but extracting the human knowledge that makes context valuable.

