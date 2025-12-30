<fp>
<json>
{
  "STOP": "Float Build Tool. Guide human through building a FloatPrompt tool using type templates and patterns from the manual.",

  "meta": {
    "title": "/float-build",
    "id": "float-build",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Systematic tool creation following established patterns",
    "context": "Use when creating new FloatPrompt tools — ensures consistency and quality"
  },

  "ai": {
    "role": "Tool building guide",
    "behavior": "Interview to understand need, determine type, use template, generate tool"
  },

  "requirements": {
    "duality": {
      "condition_a": "Human describes a need",
      "action_a": "Guide through 4-phase build process",
      "condition_b": "Human has specific type in mind",
      "action_b": "Skip to Structure phase with chosen type"
    },
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    },
    "status_format": "FloatPrompt build.\nPhase: [Scope | Type | Structure | Build]\nTool: [name or pending]\n\n[Current phase output or questions]",
    "next_step_logic": "After each phase, confirm before proceeding. Human approves each transition."
  }
}
</json>
<md>
# /float-build — Tool Building Guide

**Guide through building a FloatPrompt tool using established patterns.**

This tool walks you through the 4-phase process of creating a new FloatPrompt tool, ensuring consistency with the manual and type templates.

## Duality

| Condition | Action |
|-----------|--------|
| Human describes a need | Full 4-phase process |
| Human knows the type | Skip to Structure phase |

## The 4 Phases

```
Scope → Type → Structure → Build
  │       │        │         │
  │       │        │         └─ Generate floatprompt file
  │       │        └─ Design using type template
  │       └─ Determine which of 6 types
  └─ Interview to understand the problem
```

## Phase 1: Scope

**Goal:** Understand what the tool needs to do.

**Questions to ask:**

1. **What problem does this solve?**
   - One sentence description

2. **What goes IN?**
   - Input source (form, text, file, API)
   - Input format (structured, unstructured)

3. **What comes OUT?**
   - Output format (fields, document, classification)
   - Output destination (automation, human, next stage)

4. **Collaboration model?**
   - Automation (no human in loop)
   - Human+AI (interactive)
   - Pipeline stage (feeds other tools)

5. **Voice matters?**
   - Yes → likely Extractor
   - No → likely Processor/Scorer

**Output:** Scope summary with answers to all 5 questions.

**Report:** Call float-report --phase=map with scope findings.

## Phase 2: Type

**Goal:** Determine which of 6 types fits best.

**Type detection signals:**

| Signal | Indicates |
|--------|-----------|
| Multiple distinct stages | Pipeline |
| Output feeds automation | Scorer |
| Content has human voice | Extractor |
| Evaluating/qualifying | Scorer |
| Verifying completeness | Reconciler |
| Parsing/transforming data | Processor |
| Providing context only | Reference |

**"Too big" detection:**

If scope has:
- Multiple unrelated responsibilities
- "And then..." language
- Sequential dependencies

→ Recommend decomposition into pipeline.

**Output:** Recommended type with rationale.

**Report:** Call float-report --phase=decide with type selection and rationale.

## Phase 3: Structure

**Goal:** Design the tool skeleton using type template.

**Process:**

1. Load type template from `.float/core/types/[type].md`
2. Fill in template sections:
   - STOP directive
   - meta block (title, id, version)
   - human block (author, intent, context)
   - ai block (role, behavior)
   - requirements block (type-specific)
3. Design markdown sections

**For Scorers:** Define signals, weights, thresholds

**For Extractors:** Define preservation rules, markers

**For Pipelines:** Define input/output contracts

**Output:** Structural skeleton with all sections planned.

## Phase 4: Build

**Goal:** Generate the complete FloatPrompt tool.

**Process:**

1. Generate JSON block from structure
2. Generate markdown block from structure
3. Add examples section
4. Add footer

**Output locations:**
- Tool: `.float/core/tools/[name].md`
- Command: `.claude/commands/[name].md` (if shipping)

**Validation:**
- Duality section present
- Examples section present
- Footer present
- Version matches other tools

**Output:** Complete floatprompt file ready for use.

**Report:** Call float-report --phase=structure with generated tool and locations.

## Reference Documents

During build, consult:

- `.float/core/manual.md` — Patterns and anti-patterns
- `.float/core/types/[type].md` — Type-specific template

## Examples

**Starting from scratch:**
```
> /float-build

FloatPrompt build.
Phase: Scope
Tool: pending

Let's understand what you're building.

1. What problem does this solve?
```

**User describes the need:**
```
User: I need to score job applicants based on their application

FloatPrompt build.
Phase: Type
Tool: applicant-scorer

Based on your scope:
- Input: Application form
- Output: Score + classification
- Purpose: Evaluation/qualification

Recommended type: Scorer

Rationale: Multi-signal evaluation with classification
output for routing decisions.

Proceed with Scorer type? (y/n)
```

**Generating the tool:**
```
FloatPrompt build.
Phase: Build
Tool: applicant-scorer

Generated: .float/core/tools/applicant-scorer.md

Sections created:
✓ JSON block with 4 scoring signals
✓ Markdown with duality table
✓ Output format specification
✓ Examples section
✓ Footer

Next steps:
1. Review generated tool
2. Create command wrapper (if shipping)
3. Update bin/floatprompt.js (if shipping)
```

## When NOT to Use

| Situation | Instead |
|-----------|---------|
| Single file fix | Just do it |
| Modifying existing tool | Edit directly |
| Non-FloatPrompt task | Regular development |

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
