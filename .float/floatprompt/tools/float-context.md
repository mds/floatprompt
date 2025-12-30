<fp>
<json>
{
  "STOP": "Float Context Tool. Generate or load project context for deep understanding. CRITICAL: Choose a meaningful filename that reflects the project identity — NOT 'project.md'.",

  "meta": {
    "title": "/float context",
    "id": "float-context",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Generate terrain maps that give AI instant understanding of any project",
    "context": "Run when /float reports missing context or when deep understanding is needed"
  },

  "ai": {
    "role": "Project archaeologist and cartographer",
    "behavior": "Discover patterns, relationships, and meaning. Generate emergent context based on what you find."
  },

  "requirements": {
    "duality": {
      "condition_a": "No context file exists",
      "action_a": "Generate terrain map",
      "condition_b": "Has context file",
      "action_b": "Load and follow reading order"
    },
    "status_format": "FloatPrompt context complete.\nDirectory: [path]\nStatus: [result]\n\n[Next step or Ready for: human direction]",
    "next_step_logic": "Generated new context? → Run /float to boot with full context. Loaded existing? → Ready for: human direction",
    "buoys": {
      "context_buoy": "Generate terrain map (full model for synthesis)"
    }
  }
}
</json>
<md>
# /float context — Meaning Generation Tool

**Generate or load project context for deep understanding.**

This command creates `.float/project/context/{project-name}.md` — the understanding layer that complements project/nav/*.md structure files.

## Duality

| Condition | Action |
|-----------|--------|
| No context file exists | Generate terrain map |
| Has context file | Load and follow reading order |

**Regeneration:** Delete context file to force regeneration. No special command needed.

## Difference from /float Boot

| Command | Purpose | Depth |
|---------|---------|-------|
| `/float` (boot) | Quick awareness | Reads context file for awareness |
| `/float context` (load) | Deep understanding | Follows reading order, builds mental model |
| `/float context` (generate) | Create context | Synthesizes project understanding |

## Generate Sequence

When no context file exists:

### 1. Discover

Read and analyze:
- `.float/system.md` — Boot protocol
- `.float/project/nav/*.md` — All navigation files
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

**Examples:**
- "What's the main purpose of this project?"
- "How do packages/frontend and packages/backend relate?"
- "Is artifacts/ historical or active?"

If everything is clear, skip to Generate.

### 3. Generate via Context Buoy

Spawn Context Buoy to create terrain map:

```markdown
---
title: {Project} Context
type: context
generated: YYYY-MM-DD HH:MM
generator: float-context

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

### 4. Offer Decision Capture

After generating context:

```
Context generated: .float/project/context/{project-name}.md

Build deeper context? (Capture key decisions)
(y/n):
```

If yes: prompt for decisions, save to `decisions.md`

## Load Sequence

When context file exists:

1. **Read `.float/project/context/*.md`** — All context files
2. **Follow reading order** — As specified in terrain map
3. **Read files in order** — Build rich mental model
4. **Report understanding depth**

## Output Location

```
.float/project/context/{meaningful-name}.md
```

**CRITICAL — Choose a meaningful filename:**
- DO NOT default to `project.md` — that's lazy and unhelpful
- Name should reflect the project's domain or identity
- Look at README, package.json name, or folder name for hints
- Examples: `floatprompt.md`, `shiftnudge.md`, `portfolio-workshop.md`, `api-gateway.md`
- The filename IS the project identity for AI context

## Status Output

```
FloatPrompt context complete.
Directory: /path/to/project
Status: [result]

[Next step recommendation]
```

**Results:**
- "Generated floatprompt.md"
- "Loaded context, followed reading order (8 files)"

## Next Step Logic

```
Generated new context?
  → Yes: "Next: Run /float to boot with full context"
  → No (loaded existing): "Ready for: human direction"
```

## Buoy Prompts

### Context Buoy

```
Generate context file for this project:
1. Read .float/system.md for project overview
2. Read all .float/project/nav/*.md files for structure
3. Read README.md for public description
4. Identify key files that define the project
5. Determine logical reading order for understanding
6. Map domain relationships
7. Choose meaningful filename based on project identity (NOT 'project.md')
8. Generate terrain map with:
   - Project summary
   - Key files table
   - Reading order
   - Domain map
   - Core patterns
   - Conventions
9. Return: { filename: string, content: string }
```

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

## Preservation

If updating existing context:
- Keep sections marked as human-added
- Preserve `human_refinements` frontmatter
- Merge new discoveries with existing context
- Note what changed

## Examples

**Generate new context:**
```
> /float context

Scanning project structure...

Questions:
1. Is artifacts/ historical or active development?

> historical, it's the archive

Generating context...

FloatPrompt context complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: Generated floatprompt.md

Build deeper context? (Capture key decisions)
(y/n): y

What key decisions should be captured?
> We chose <fp> tags over YAML because...

Saved to decisions.md

Next: Run /float to boot with full context
```

**Load existing context:**
```
> /float context

Loading context from floatprompt.md...

Following reading order:
1. .float/system.md — Boot protocol
2. specs/floatprompt.md — Format definition
3. floatprompt/core/template.md — Template structure
...

FloatPrompt context complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: Loaded context, followed reading order (8 files)

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
