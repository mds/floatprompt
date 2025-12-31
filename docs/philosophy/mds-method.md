---
title: MDS Method
type: methodology, documentation
status: complete
created: 2025-06
related: floatprompt.md

human_author: @mds
human_intent: Define the Map → Decide → Structure workflow as a universal methodology
human_context: Three-phase collaboration process - applies to tools, context, learning, problem-solving

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Updated for centralized nav/*.md architecture (v0.6.0)
---

# MDS Method

**Map → Decide → Structure**

A universal methodology for building understanding and creating artifacts. Originally designed for floatprompt creation, but applies to any domain where humans and AI collaborate.

**The core insight:** Understand before acting. Decide before building. Loop as necessary.

---

## Map

**Establish shared understanding before acting.**

- Assess what you're working with (content, scope, complexity)
- Identify the domain and requirements
- Create shared vocabulary and anchors
- Understand the territory before acting on it

**When to map:** Complex content, unclear requirements, large scope. Simple tasks can skip straight to deciding.

**Output:** Clear boundaries, shared understanding, foundation for the next phase.

---

## Decide

**Determine what matters and what to focus on.**

- What needs to be done?
- What methodology or framework applies?
- What output should be produced?
- What can be left out?

**The key question:** What actually matters for this task, and what is noise?

**Output:** Clear decisions about scope, approach, and desired outcome.

---

## Structure

**Build the artifact or understanding.**

- Organize what you've learned
- Create the deliverable
- Test and refine

**Output:** A working artifact, organized knowledge, or operational understanding.

---

## Universal Application

MDS applies wherever understanding must precede action:

| Domain | Map | Decide | Structure |
|--------|-----|--------|-----------|
| **Building Tools** | Assess content territory | What tool needs to do | Build the floatprompt |
| **Building Context** | Orient to structure | What to focus on | Build operational understanding |
| **Learning** | Survey the domain | What matters for the task | Organize knowledge |
| **Problem Solving** | Understand the situation | What approach to take | Execute the solution |

The methodology is fractal — it applies at every scale, from a 5-minute task to a multi-month project.

---

## The Loop

**MDS is iterative, not linear.**

```
Map → Decide → Structure → (realize you need more depth) → Map again
```

**Example: Building AI Context**

```
Loop 1: Boot
├── Map: Read system.md, nav/root.md
├── Decide: Follow boot sequence
└── Structure: Initial awareness

Loop 2: Verify
├── Map: Read all nav/*.md files
├── Decide: Check integrity
└── Structure: Confirmed project state

Loop 3: Deepen
├── Map: Read template, OS, manifesto
├── Decide: Focus on philosophy
└── Structure: Understood the "why"

Loop 4: Ground
├── Map: Read real examples
├── Decide: See the spectrum
└── Structure: Practical understanding

Loop 5: Complete
├── Map: What's still fuzzy?
├── Decide: Fill specific gaps
└── Structure: Full context achieved
```

Each loop increases depth. You don't need all loops for simple tasks.

---

## The Process in Practice

### For Building Tools

**Simple tool:**
1. Map (quick): "I need a tool that extracts action items from meeting notes"
2. Decide (quick): Extract action items, preserve speaker attribution, output as checklist
3. Structure: Build the floatprompt

**Complex tool:**
1. Map (thorough): Understand the full portfolio planning process, identify phases, assess what designers struggle with
2. Decide (iterative): Define 5 phases, determine output format (HTML), establish voice rules, plan for context limits
3. Structure (detailed): Build comprehensive floatprompt with phase-by-phase instructions

### For Building Context

**Quick orientation (float-map):**
1. Map: Read boot loader and index
2. Decide: What do I need to know for this task?
3. Structure: Minimal viable understanding

**Full context (float-deepdive):**
1. Map: Read all system files and nav/*.md
2. Decide: Understand everything, including history
3. Structure: Complete operational context

### For Humans Learning FloatPrompt

**First contact:**
1. Map: Read the manifesto, skim the template
2. Decide: What's the core idea?
3. Structure: "It's portable AI tools as text files"

**Building fluency:**
1. Map: Read documentation, study examples
2. Decide: How does voice preservation work?
3. Structure: "JSON for behavior, markdown for methodology, voice is sacred"

**Mastery:**
1. Map: Read historical artifacts, understand evolution
2. Decide: How do I extend this system?
3. Structure: Full understanding of architecture and philosophy

The depth scales with complexity. Simple needs don't require elaborate mapping. Complex understanding benefits from thorough upfront work and multiple loops.

---

## Key Principles

**Map before acting.** Understanding the territory prevents wasted effort.

**Decide explicitly.** Vague requirements produce vague outcomes.

**Structure follows decisions.** The output reflects what you decided, not what you discovered while building.

**Loop as necessary.** One pass rarely achieves depth. Each loop increases understanding.

**Depth scales with complexity.** Simple tasks need one quick loop. Complex understanding needs multiple loops at increasing depth.

---

## The Test

After each loop, ask:

> "Do I understand enough to do what I need to do?"

- **Yes** → Proceed to action
- **No** → Loop again with more depth
- **Partially** → Loop on the specific gaps

The goal is operational understanding, not exhaustive knowledge.
