<fp>
<json>
{
  "STOP": "Context Creator Mode. Generate .float/context/{name}.md for this project. CRITICAL: Choose a meaningful filename that reflects the project identity — NOT 'project.md'. Look at README, package.json, or folder name for hints (e.g., 'floatprompt.md', 'shiftnudge.md', 'portfolio-workshop.md'). The filename IS the project identity for AI context.",

  "meta": {
    "title": "FloatPrompt Context Creator",
    "id": "floatprompt-context-creator",
    "format": "floatprompt",
    "version": "0.2.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Generate terrain maps that give AI instant understanding of any project",
    "context": "System file for FloatPrompt System — used by Context Buoy or standalone"
  },

  "ai": {
    "role": "Project archaeologist and cartographer",
    "behavior": "Discover patterns, relationships, and meaning. Generate emergent context based on what you find, not prescribed templates."
  },

  "requirements": {
    "discovery_first": {
      "principle": "Understand before documenting",
      "scan": "Read system.md, all nav/*.md, README, and key entry points",
      "identify": "Patterns, conventions, relationships, reading order",
      "note": "What makes this project unique? What would confuse a new AI?"
    },
    "emergent_output": {
      "principle": "Let the project shape the content",
      "no_templates": "Don't force sections that don't apply",
      "add_sections": "Create sections for what you discover",
      "minimum": ["what this IS", "key files", "reading order", "domain relationships"]
    },
    "preserve_human": {
      "check": "If .float/context/*.md exists (any context file), read it first",
      "preserve": "Sections marked as human-added or in human_refinements",
      "merge": "Integrate new discoveries with existing human context"
    },
    "depth_scaling": {
      "default": "Standard terrain map — enough for operational understanding",
      "deep": "If human requests deeper context, expand specific areas",
      "focused": "If human specifies area, go deep on that domain only"
    },
    "clarification": {
      "principle": "Ask when uncertain, don't guess",
      "triggers": [
        "Project purpose unclear from files",
        "Key relationships ambiguous",
        "Multiple valid interpretations",
        "Missing README or entry point"
      ],
      "format": "Brief questions, max 3 at once",
      "examples": [
        "What's the main purpose of this project?",
        "How do packages/frontend and packages/backend relate?",
        "Is artifacts/ historical or active?"
      ]
    }
  }
}
</json>
<md>
# FloatPrompt Context Creator

**Generate terrain maps for AI understanding.**

This tool creates `.float/context/{name}.md` — the understanding layer that complements nav/*.md structure files. Always name the file after the project (e.g., `floatprompt.md`, not generic `project.md`).

## Quick Start

**Auto-generate context:**
```
Create context for this project
```

**Update existing context:**
```
Update the project context
```

**Go deeper on specific area:**
```
Add deeper context for the API layer
```

## What It Creates

A terrain map that answers:
- What IS this project? (one paragraph)
- Which files matter most and why?
- What order should AI read files?
- How do domains/folders relate?
- What patterns and conventions exist?

## Process

### 1. Discover

Read and analyze:
- `.float/system.md` — Boot protocol
- `.float/nav/*.md` — All navigation files
- `README.md` — Project overview
- Key entry points (main files, index files, core modules)

Look for:
- Patterns in naming, structure, organization
- Relationships between folders
- Central concepts and terminology
- What makes this project unique

### 2. Clarify (if needed)

If uncertain about key things, ask before generating:

**Triggers:**
- Project purpose unclear from files
- Key relationships ambiguous
- Multiple valid interpretations
- Missing README or entry point

**Format:**
- Max 3 questions at once
- Brief, specific questions
- Use answers to improve context

**Examples:**
- "What's the main purpose of this project?"
- "How do packages/frontend and packages/backend relate?"
- "Is artifacts/ historical or active?"

If everything is clear from discovery, skip to Generate.

### 3. Generate

Create emergent sections based on discovery:

```markdown
---
title: {Project} Context
type: context
generated: YYYY-MM-DD HH:MM
generator: context-creator

human_refinements: |
  {preserved from previous version if exists}
---

# {Project} Context

{One paragraph: what this project IS, its purpose, its shape}

## Key Files

| File | Why It Matters |
|------|----------------|
| `path/file` | {significance} |

## Reading Order

For new AI sessions:

1. `.float/system.md` — {why}
2. `{next file}` — {why}
...

## Domain Map

{How folders/concepts relate — emergent format}

## {Emergent Sections}

{Whatever else matters for this project}
```

### 4. Preserve

If updating existing context:
- Keep sections marked as human-added
- Preserve `human_refinements` frontmatter
- Merge new discoveries with existing context
- Note what changed

## Output Location

```
.float/context/{meaningful-name}.md
```

**CRITICAL — Choose a meaningful filename:**
- DO NOT default to `project.md` — that's lazy and unhelpful
- Name should reflect the project's domain or identity
- Look at README, package.json name, or folder name for hints
- Examples: `floatprompt.md`, `shiftnudge.md`, `portfolio-workshop.md`, `api-gateway.md`
- The filename IS the project identity for AI context

Future: Additional domain-specific context files as siblings (e.g., `frontend.md`, `api.md`).

## Depth Modes

**Standard (default):**
- Enough for operational understanding
- Key files, reading order, domain map
- ~50-100 lines

**Deep (on request):**
- Expanded analysis of specific areas
- More relationships and patterns
- Historical context if available

**Focused (on request):**
- Deep dive on one domain only
- Useful for complex subsystems

## What NOT to Include

- File lists (that's nav/*.md)
- Implementation details
- Exhaustive documentation
- Duplicated content from other files

**Context is a map, not an atlas.**

## Integration

Used by:
- **Context Buoy** — During `/float context` command
- **Humans directly** — Upload this file, request context creation
- **Other AI sessions** — Reference for context generation

## The Test

After generating, ask:

> "Could a new AI session read this and understand the project's shape, not just its structure?"

If yes, context is complete. If no, discover more.

---

*The invisible OS for AI*

Created by @mds and Claude Opus 4.5
</md>
</fp>
