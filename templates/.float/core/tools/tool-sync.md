<fp>
<json>
{
  "STOP": "Tool Sync. Verify FloatPrompt tools are consistent, versioned, and properly routed. Maintainer tooling for the FloatPrompt system itself.",

  "meta": {
    "title": "tool-sync",
    "id": "tool-sync",
    "format": "floatprompt",
    "version": "0.14.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Keep FloatPrompt tools synchronized and consistent",
    "context": "Run before releases or after updating tools"
  },

  "ai": {
    "role": "Tool consistency guardian",
    "behavior": "Check versions, structure, routing, templates. Report issues. Propose fixes."
  },

  "requirements": {
    "duality": {
      "condition_a": "Issues found",
      "action_a": "Report details, propose fixes",
      "condition_b": "All synced",
      "action_b": "Report OK"
    },
    "status_format": "Tool sync complete.\nDirectory: [path]\nStatus: [All synced | N issues found]\n\n[Details or Ready for: human direction]",
    "next_step_logic": "Issues found? Show fixes. Otherwise: Ready for: human direction"
  }
}
</json>
<md>
# tool-sync — Tool Consistency Checker

**Verify FloatPrompt tools are consistent, versioned, and properly routed.**

This is maintainer tooling for the FloatPrompt system itself. Run via `/float-tools` command.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Report details, propose fixes |
| All synced | Report OK |

## What It Checks

### 1. Version Sync

All tools in `.float/core/tools/float-*.md` must be at the same version.

```bash
# Quick check
grep -h '"version"' .float/core/tools/float-*.md | sort -u
```

**Issue:** `float-context.md` at 0.9.0, others at 0.10.0
**Fix:** Update version in JSON meta block

### 2. Structure Sync

All tools must have consistent structure:

**JSON requirements:**
- `STOP` — Mode directive
- `meta` — title, id, format, version
- `human` — author, intent, context
- `ai` — role, behavior
- `requirements` — duality, status_format, next_step_logic

**Markdown requirements:**
- `## Duality` section with table
- `## Examples` section
- Footer: `*[FloatPrompt](...) — the invisible OS for AI*`

```bash
# Check for required sections
grep -l "## Duality" .float/core/tools/float-*.md | wc -l
grep -l "## Examples" .float/core/tools/float-*.md | wc -l
grep -l "invisible OS for AI" .float/core/tools/float-*.md | wc -l
```

### 3. Command Sync

Each tool in `.float/core/tools/` must have a corresponding command wrapper in `.claude/commands/`.

**Check for:**
- Each `float*.md` tool has matching `.claude/commands/float*.md` wrapper
- Command wrappers point to correct tool paths
- No orphan commands (commands without tools)

```bash
# List actual tools
ls .float/core/tools/float*.md | xargs -n1 basename

# List command wrappers
ls .claude/commands/float*.md | xargs -n1 basename

# Should match (both return same list)
```

**Issue:** `float-new.md` tool exists but no `.claude/commands/float-new.md`
**Fix:** Create command wrapper in `.claude/commands/float-new.md`

### 4. Template Sync

Files in `templates/.float/` must match source files.

| Source | Template |
|--------|----------|
| `.float/core/index.md` | `templates/.float/core/index.md` |
| `.float/project/project.md` | `templates/.float/project/project.md` |

```bash
# Check for differences (structure, not content)
diff .float/core/index.md templates/.float/core/index.md
```

**Note:** Templates have placeholder values (`[scaffold date]`, etc.) — check structure, not exact content.

### 5. Deployment Sync

`bin/floatprompt.js` must list all tools and commands that should ship.

```javascript
const toolFiles = ['float.md', 'float-sync.md', ...];
const commandFiles = ['float.md', 'float-sync.md', ...];
```

Compare against actual files:
- `.float/core/tools/float*.md` (tools)
- `.claude/commands/float*.md` (commands)

## Process

### 1. Scan

```bash
# Version check
grep -h '"version"' .float/core/tools/float*.md | sort -u | wc -l
# Should be 1 (all same version)

# Structure check
grep -l "## Duality" .float/core/tools/float*.md | wc -l
grep -l "## Examples" .float/core/tools/float*.md | wc -l
grep -l "invisible OS for AI" .float/core/tools/float*.md | wc -l

# Command check (tools = commands)
ls .float/core/tools/float*.md | wc -l
ls .claude/commands/float*.md | wc -l
# Should be equal
```

### 2. Report

```
Tool Sync Results:

Version Sync:
  ✓ All tools at 0.10.0

Structure Sync:
  ✓ All tools have required sections

Command Sync:
  ✓ All tools have command wrappers

Template Sync:
  ✓ All templates match source

Deployment Sync:
  ✓ bin/floatprompt.js lists all tools and commands
```

### 3. Propose Fixes

For each issue, show the fix:

```
Proposed Fixes:

1. Create .claude/commands/float-enhance.md:
   # /float-enhance — Quality Improvement
   Read and execute `.float/core/tools/float-enhance.md`

2. Add to bin/floatprompt.js commandFiles array:
   'float-enhance.md'

Apply fixes? (y/n):
```

## Status Output

```
Tool sync complete.
Directory: /path/to/floatprompt
Status: [All synced | N issues found]

[Details or Ready for: human direction]
```

## Examples

**All synced:**
```
> /float-tools

Tool sync complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: All synced

5 tools checked:
  ✓ float.md (0.11.0)
  ✓ float-sync.md (0.11.0)
  ✓ float-context.md (0.11.0)
  ✓ float-enhance.md (0.11.0)
  ✓ float-fix.md (0.11.0)

Ready for: human direction
```

**Issues found:**
```
> /float-tools

Tool sync complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: 2 issues found

Version Sync:
  ✗ float-context.md at 0.10.0 (expected 0.11.0)

Command Sync:
  ✗ float-new.md missing command wrapper

Proposed Fixes:
1. Update float-context.md version to 0.10.0
2. Create .claude/commands/float-new.md

Apply fixes? (y/n):
```

## When to Run

- Before releasing a new version
- After adding/modifying tools
- After creating new command wrappers
- When something feels out of sync

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
