<fp>
<json>
{
  "STOP": "Tool Sync. Verify FloatPrompt tools are consistent, versioned, and properly routed. Maintainer tooling for the FloatPrompt system itself.",

  "meta": {
    "title": "tool-sync",
    "id": "tool-sync",
    "format": "floatprompt",
    "version": "0.10.0"
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

This is maintainer tooling for the FloatPrompt system itself. Run via `/meta` command.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Report details, propose fixes |
| All synced | Report OK |

## What It Checks

### 1. Version Sync

All tools in `.float/meta/tools/float-*.md` must be at the same version.

```bash
# Quick check
grep -h '"version"' .float/meta/tools/float-*.md | sort -u
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
grep -l "## Duality" .float/meta/tools/float-*.md | wc -l
grep -l "## Examples" .float/meta/tools/float-*.md | wc -l
grep -l "invisible OS for AI" .float/meta/tools/float-*.md | wc -l
```

### 3. Router Sync

`.claude/commands/float.md` routing table must match actual tools.

**Check for:**
- All tools in `.float/meta/tools/float-*.md` are routed
- No routes to non-existent tools
- Routing table descriptions match tool purposes

```bash
# List actual tools
ls .float/meta/tools/float-*.md | xargs -n1 basename | sed 's/.md$//'

# Parse routes from router
grep -o 'float-[a-z]*' .claude/commands/float.md | sort -u
```

**Issue:** `float-new.md` exists but not routed
**Fix:** Add to routing table in `.claude/commands/float.md`

### 4. Template Sync

Files in `templates/.float/` must match source files.

| Source | Template |
|--------|----------|
| `.float/meta/meta.md` | `templates/.float/meta/meta.md` |
| `.float/project/project.md` | `templates/.float/project/project.md` |

```bash
# Check for differences (structure, not content)
diff .float/meta/meta.md templates/.float/meta/meta.md
```

**Note:** Templates have placeholder values (`[scaffold date]`, etc.) — check structure, not exact content.

### 5. Deployment Sync

`bin/floatprompt.js` must list all tools that should ship.

```javascript
const toolFiles = ['float.md', 'float-sync.md', ...];
```

Compare against actual `.float/meta/tools/float-*.md` files.

## Process

### 1. Scan

```bash
# Version check
grep -h '"version"' .float/meta/tools/float-*.md | sort -u | wc -l
# Should be 1 (all same version)

# Structure check
for f in .float/meta/tools/float-*.md; do
  echo "=== $(basename $f) ==="
  grep -c "## Duality" "$f"
  grep -c "## Examples" "$f"
  grep -c "invisible OS for AI" "$f"
done

# Router check
ls .float/meta/tools/float-*.md | wc -l
grep -c 'float-.*\.md' .claude/commands/float.md
```

### 2. Report

```
Tool Sync Results:

Version Sync:
  ✓ All tools at 0.10.0

Structure Sync:
  ✓ All tools have required sections

Router Sync:
  ✗ float-enhance.md not in routing table

Template Sync:
  ✓ All templates match source

Deployment Sync:
  ✓ bin/floatprompt.js lists all tools
```

### 3. Propose Fixes

For each issue, show the fix:

```
Proposed Fixes:

1. Add to .claude/commands/float.md routing table:
   | `/float enhance` | `.float/meta/tools/float-enhance.md` | Quality improvement |

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
> /meta

Tool sync complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: All synced

5 tools checked:
  ✓ float.md (0.10.0)
  ✓ float-sync.md (0.10.0)
  ✓ float-context.md (0.10.0)
  ✓ float-enhance.md (0.10.0)
  ✓ float-fix.md (0.10.0)

Ready for: human direction
```

**Issues found:**
```
> /meta

Tool sync complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: 2 issues found

Version Sync:
  ✗ float-context.md at 0.9.0 (expected 0.10.0)

Router Sync:
  ✗ float-enhance.md missing from routing table

Proposed Fixes:
1. Update float-context.md version to 0.10.0
2. Add float-enhance.md to .claude/commands/float.md

Apply fixes? (y/n):
```

## When to Run

- Before releasing a new version
- After adding/modifying tools
- After updating `.claude/commands/float.md`
- When something feels out of sync

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
