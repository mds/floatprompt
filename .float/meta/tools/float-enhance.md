<fp>
<json>
{
  "STOP": "Float Enhance Tool. Improve content quality — fill placeholders, fix stale descriptions, update references.",

  "meta": {
    "title": "/float enhance",
    "id": "float-enhance",
    "format": "floatprompt",
    "version": "0.9.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Elevate quality of FloatPrompt System content",
    "context": "Run when /float sync adds placeholders or when content needs improvement"
  },

  "ai": {
    "role": "Quality enhancer and content curator",
    "behavior": "Find weak content, generate improvements, apply with approval"
  },

  "requirements": {
    "duality": {
      "condition_a": "Weak/stale content exists",
      "action_a": "Improve with approval",
      "condition_b": "High quality",
      "action_b": "Report OK, nothing to enhance"
    },
    "status_format": "FloatPrompt enhance complete.\nDirectory: [path]\nStatus: [result]\n\nReady for: human direction",
    "next_step_logic": "Always: Ready for: human direction",
    "buoys": {
      "describe_buoy": "Generate one file description (model: haiku, parallel)",
      "reference_buoy": "Fix stale references in one file"
    }
  }
}
</json>
<md>
# /float enhance — Quality Improvement Tool

**Improve content quality — fill placeholders, fix stale descriptions, update references.**

This command replaces `/float describe` with broader quality enhancement.

## Duality

| Condition | Action |
|-----------|--------|
| Weak/stale content exists | Improve with approval |
| High quality | Report OK, nothing to enhance |

## What It Enhances

1. **`[needs description]` placeholders** — Generate meaningful descriptions
2. **Stale descriptions** — Don't match actual file contents
3. **Outdated references** — Version numbers, file paths that changed
4. **Weak descriptions** — Too generic, too short, unhelpful

## Process

### 1. Scan (Shell-Assisted)

Use shell to find enhancement targets:

```bash
# Find placeholder descriptions
grep -r "\[needs description\]" .float/project/nav/

# List nav files for staleness check
ls .float/project/nav/*.md
```

For each nav file, compare descriptions to actual file contents:
- Read file, check if description matches purpose
- Flag descriptions that are generic ("Main file", "Code", etc.)
- Flag descriptions that reference old names/structure

### 2. Report

Show what needs enhancement:

```
Enhancement Targets:

Placeholders (3):
  nav/docs.md: new-guide.md, api-reference.md
  nav/src.md: utils.ts

Stale descriptions (1):
  nav/docs.md: setup.md — says "Installation guide" but now covers deployment

Weak descriptions (2):
  nav/src.md: index.ts — "Main file" (too generic)
  nav/src.md: types.ts — "Types" (too generic)

Total: 6 items to enhance
```

### 3. Wait for Approval

```
Enhance these 6 items? (y/n):
```

| Response | Action |
|----------|--------|
| `y` or `yes` | Generate all enhancements |
| `n` or `no` | Cancel, no changes made |
| Specific feedback | Adjust scope, re-propose |

### 4. Spawn Buoys

**Describe Buoy** (model: haiku for speed):
- One buoy per file needing description
- Run in parallel batches
- Returns: `{ file: string, description: string }`

**Reference Buoy** (for stale references):
- One buoy per file with stale content
- Returns: `{ file: string, fixes: [{line, old, new}] }`

### 5. Validate

Orchestrator reviews generated content:
- Check descriptions are meaningful (not generic)
- Check descriptions are accurate (match file purpose)
- Check length (under 80 characters)
- Flag anything questionable for human review

### 6. Apply with Batch Approval

For multiple descriptions, offer batch options:

```
Descriptions generated:

  docs/new-guide.md → "Step-by-step tutorial for new users"
  docs/api-reference.md → "Complete API endpoint documentation"
  src/utils.ts → "Shared utility functions for string and date manipulation"

[accept all / review each / skip]:
```

| Response | Action |
|----------|--------|
| `accept all` | Apply all descriptions |
| `review each` | Show one at a time for approval |
| `skip` | Cancel, no changes made |

## Status Output

```
FloatPrompt enhance complete.
Directory: /path/to/project
Status: [result]

Ready for: human direction
```

**Results:**
- "Enhanced 6 items"
- "Nothing to enhance — content quality is high"
- "Enhanced 4 items, skipped 2"

## Next Step Logic

```
Always: "Ready for: human direction"
```

Enhancement is the end of the command chain.

## Buoy Prompts

### Describe Buoy

```
Generate description for {file_path}:
1. Read the file content
2. Understand what the file DOES (not implementation details)
3. Generate one-line description (under 80 characters)
4. Focus on purpose and function
5. Return: { file: string, description: string }

Skip and return null for:
- Config files (package.json, tsconfig.json, etc.)
- Lock files
- Generated files
```

**Model:** haiku (fast, parallel)

### Reference Buoy

```
Fix stale references in {file_path}:
1. Read the file content
2. Find references that don't match reality:
   - Version numbers that are outdated
   - File paths that no longer exist
   - Descriptions that don't match file contents
3. Propose specific fixes
4. Return: { file: string, fixes: [{line: number, old: string, new: string}] }
```

## Description Guidelines

**Good descriptions:**
- "CLI entry point for floatprompt init and update commands"
- "Defines TypeScript interfaces for configuration options"
- "Step-by-step guide for integrating with existing projects"

**Bad descriptions:**
- "Main file" (too generic)
- "Code" (says nothing)
- "This file contains the implementation of..." (too verbose)
- "Important stuff" (meaningless)

**The test:** Would this description help someone decide whether to read the file?

## Examples

**Placeholders found:**
```
> /float enhance

Enhancement Targets:

Placeholders (2):
  nav/docs.md: new-guide.md, api-reference.md

Enhance these 2 items? (y/n): y

Generating descriptions...

  docs/new-guide.md → "Getting started tutorial for first-time users"
  docs/api-reference.md → "Complete REST API endpoint documentation"

[accept all / review each / skip]: accept all

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Status: Enhanced 2 items

Ready for: human direction
```

**Nothing to enhance:**
```
> /float enhance

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Status: Nothing to enhance — content quality is high

Ready for: human direction
```

**Review each mode:**
```
> /float enhance

Enhancement Targets:

Placeholders (3):
  nav/src.md: auth.ts, database.ts, api.ts

Enhance these 3 items? (y/n): y

[accept all / review each / skip]: review each

1/3: src/auth.ts → "JWT authentication and session management"
     [accept / edit / skip]: accept

2/3: src/database.ts → "PostgreSQL connection and query helpers"
     [accept / edit / skip]: edit

     Your description: Database abstraction layer with connection pooling

3/3: src/api.ts → "REST endpoint handlers and middleware"
     [accept / edit / skip]: accept

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Status: Enhanced 3 items (1 edited)

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
