---
title: MDS Method
type: methodology, documentation
status: complete
created: 2025-06
related: floatprompt.md

human_author: MDS
human_intent: Define the Map → Decide → Structure workflow for building floatprompts
human_context: Three-phase collaboration process - depth scales with complexity

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Added FloatDoc frontmatter
---

# MDS Method

**Map → Decide → Structure**

A three-phase workflow for building floatprompts through conversation.

---

## Map

**Establish shared understanding before building.**

- Assess what you're working with (content, scope, complexity)
- Identify the domain and requirements
- Create shared vocabulary and anchors
- Understand the territory before acting on it

**When to map:** Complex content, unclear requirements, large scope. Simple tools can skip straight to building.

**Output:** Clear boundaries, shared understanding, foundation for the next phase.

---

## Decide

**Determine what the tool needs to do.**

- What behavior should the AI have?
- What methodology or framework applies?
- What output should be produced?
- What voice/constraints matter?

**The key question:** What does this tool actually need to do, and what can be left out?

**Output:** Clear decisions about behavior, methodology, and output format.

---

## Structure

**Build the floatprompt.**

- Write the JSON behavioral specification
- Write the markdown methodology
- Follow the [file format](floatprompt.md)
- Test and refine

**Output:** A working floatprompt file.

---

## The Process in Practice

**Simple tool:**
1. Map (quick): "I need a tool that extracts action items from meeting notes"
2. Decide (quick): Extract action items, preserve speaker attribution, output as checklist
3. Structure: Build the floatprompt

**Complex tool:**
1. Map (thorough): Understand the full portfolio planning process, identify phases, assess what designers struggle with
2. Decide (iterative): Define 5 phases, determine output format (HTML), establish voice rules, plan for context limits
3. Structure (detailed): Build comprehensive floatprompt with phase-by-phase instructions

The depth scales with complexity. Simple needs don't require elaborate mapping. Complex tools benefit from thorough upfront work.

---

## Key Principles

**Map before building.** Understanding the territory prevents wasted effort.

**Decide explicitly.** Vague requirements produce vague tools.

**Structure follows decisions.** The floatprompt reflects what you decided, not what you discovered while writing it.

**Iterate.** First versions rarely nail it. Refine through use.
