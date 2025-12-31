<fp>
<json>
{
  "STOP": "Float Enhance Tool. Improve content quality — fill placeholders, complete frontmatter, fix stale descriptions.",

  "meta": {
    "title": "/float enhance",
    "id": "float-enhance",
    "format": "floatprompt",
    "version": "0.15.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Elevate quality of FloatPrompt System content",
    "context": "Run when /float sync adds placeholders, frontmatter is incomplete, or content needs improvement"
  },

  "ai": {
    "role": "Quality enhancer and content curator",
    "behavior": "Find weak content, generate improvements, apply inside .float/ only. Report suggestions for project files."
  },

  "requirements": {
    "containment": ".float/ tools only write inside .float/. Enhancements to project files are suggested in logs/, human applies.",
    "duality": {
      "condition_a": "Weak/stale content exists",
      "action_a": "Apply improvements inside .float/; suggest improvements for project files via logs/",
      "condition_b": "High quality",
      "action_b": "Report OK, nothing to enhance"
    },
    "status_format": "FloatPrompt enhance complete.\nDirectory: [path]\nEnhanced: [N] inside .float/\nSuggested: [N] for project files (see logs/)\n\nReady for: human to apply project file suggestions",
    "next_step_logic": "If project file suggestions exist, human reviews logs/ and applies. After applying: run /float-think to continue.",
    "buoys": {
      "frontmatter_buoy": "Check frontmatter completeness for files in one nav scope (parallel)",
      "describe_buoy": "Generate one file description (model: haiku, parallel)"
    },
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    }
  }
}
</json>
<md>
# /float enhance — Quality Improvement Tool

**Improve content quality — fill placeholders, complete frontmatter, fix stale descriptions.**

This command replaces `/float describe` with broader quality enhancement.

## Duality

| Condition | Action |
|-----------|--------|
| Weak/stale content exists | Apply inside `.float/`; suggest for project files via `logs/` |
| High quality | Report OK, nothing to enhance |

## Containment Principle

This tool applies changes **only inside `.float/`**. For project files outside `.float/`:
- Suggestions are written to `logs/{date}/float-enhance-run-{n}/`
- Human reviews and applies suggestions manually

**Why:** Delete `.float/` = zero trace. AI observes, human modifies project files.

## What It Enhances

1. **`[needs description]` placeholders** — Generate meaningful descriptions
2. **Incomplete frontmatter** — Missing required/recommended YAML or `<fp>` metadata fields
3. **Stale descriptions** — Don't match actual file contents
4. **Outdated references** — Version numbers, file paths that changed
5. **Weak descriptions** — Too generic, too short, unhelpful

## Process

### 1. Scan (Shell-Assisted)

Use shell to find enhancement targets:

```bash
# Find placeholder descriptions
grep -r "\[needs description\]" .float/project/nav/

# Find placeholder frontmatter fields
grep -r "\[scaffold date\]\|\[update to your handle\]\|\[first AI" .float/

# List nav files for staleness check
ls .float/project/nav/*.md
```

For each nav file, compare descriptions to actual file contents:
- Read file, check if description matches purpose
- Flag descriptions that are generic ("Main file", "Code", etc.)
- Flag descriptions that reference old names/structure

**Frontmatter discovery via navigation structure:**
```
.float/system.md (entry)
  → .float/tools/ → lists floatprompt/ files
  → .float/project/project.md → lists project/ structure
        → project/nav/*.md → each lists files in a project folder
              → Check frontmatter for each documented file
```

Spawn Frontmatter Buoys (one per nav scope) to check completeness.

**Report:** Call float-report --phase=map

### 2. Report

Show what needs enhancement:

```
Enhancement Targets:

Incomplete frontmatter (4):
  .float/system.md: missing ai_updated
  docs/new-guide.md: missing human_author, human_intent, ai_notes
  specs/api.md: missing related, ai_model
  context/terrain.md: missing status, created

Placeholders (3):
  nav/docs.md: new-guide.md, api-reference.md
  nav/src.md: utils.ts

Stale descriptions (1):
  nav/docs.md: setup.md — says "Installation guide" but now covers deployment

Weak descriptions (2):
  nav/src.md: index.ts — "Main file" (too generic)
  nav/src.md: types.ts — "Types" (too generic)

Total: 10 items to enhance
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

**Report:** Call float-report --phase=decide

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

**Report:** Call float-report --phase=structure

## Status Output

```
FloatPrompt enhance complete.
Directory: /path/to/project
Enhanced: [N] inside .float/
Suggested: [N] for project files (see logs/)

Ready for: human to apply project file suggestions
```

**Results:**
- "Enhanced 4 inside .float/, Suggested 2 for project files"
- "Enhanced 6 inside .float/, no project file suggestions"
- "Nothing to enhance — content quality is high"

## Next Step Logic

If project file suggestions were written to logs/, human applies them first.

**After applying (or if no suggestions):**

```
Next: /float-think
```

Float-think will decide if any follow-up is needed.

## Buoy Prompts

### Frontmatter Buoy

```
Verify frontmatter for files documented in {nav_file}:
1. Read {nav_file}, extract file paths from Contents table
2. For each file:
   - If in .float/tools/ → expect <fp> JSON format
   - Otherwise → expect YAML frontmatter
3. Check required fields:
   YAML: title, type, status, created, human_author, human_intent
   <fp>: STOP, meta.title, meta.id, human.author, human.intent
4. Check recommended fields:
   YAML: related, human_context, ai_model, ai_updated, ai_notes
   <fp>: meta.version, human.context, ai.role, ai.behavior
5. Return JSON:
   {
     scope: string,
     files_checked: number,
     complete: string[],
     partial: [{ file: string, missing_required: string[], missing_recommended: string[] }],
     none: string[]
   }
```

**Scope:** One nav file = one buoy (Goldilocks-sized)
**Parallelization:** Spawn multiple Frontmatter Buoys for different nav scopes

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
- "CLI entry point for float init and update commands"
- "Defines TypeScript interfaces for configuration options"
- "Step-by-step guide for integrating with existing projects"

**Bad descriptions:**
- "Main file" (too generic)
- "Code" (says nothing)
- "This file contains the implementation of..." (too verbose)
- "Important stuff" (meaningless)

**The test:** Would this description help someone decide whether to read the file?

## Examples

**Nav file placeholders (inside .float/):**
```
> /float enhance

Enhancement Targets:

Inside .float/ (will apply):
  Placeholders (2):
    nav/docs.md: new-guide.md, api-reference.md

Enhance? (y/n): y

Generating descriptions...

  nav/docs.md updated:
    new-guide.md → "Getting started tutorial for first-time users"
    api-reference.md → "Complete REST API endpoint documentation"

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Enhanced: 2 inside .float/
Suggested: 0 for project files

Ready for: human direction
```

**Mixed targets (inside + outside .float/):**
```
> /float enhance

Enhancement Targets:

Inside .float/ (will apply):
  Placeholders (2):
    nav/src.md: auth.ts, database.ts

Outside .float/ (will suggest):
  Incomplete frontmatter (2):
    docs/new-guide.md: missing human_author, human_intent
    src/config.ts: missing ai_notes

Enhance? (y/n): y

Applying inside .float/...
  nav/src.md updated: 2 descriptions

Writing suggestions for project files...
  logs/2025-12-30/float-enhance-run-1/decide.md

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Enhanced: 2 inside .float/
Suggested: 2 for project files (see logs/)

Ready for: human to apply project file suggestions
```

**Nothing to enhance:**
```
> /float enhance

FloatPrompt enhance complete.
Directory: /Users/mds/projects/my-app
Enhanced: 0
Suggested: 0

Nothing to enhance — content quality is high
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
