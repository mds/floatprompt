<fp>
<json>
{
  "STOP": "Float Delta Tool. Analyze changes and trace ripple effects to find what else might be stale.",

  "meta": {
    "title": "/float-delta",
    "id": "float-delta",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Detect invisible staleness caused by changes propagating through the codebase",
    "context": "Run after making changes to find files that might need updates"
  },

  "ai": {
    "role": "Ripple effect analyzer and staleness detector",
    "behavior": "Analyze changes, trace dependencies, detect staleness, propose fixes"
  },

  "requirements": {
    "duality": {
      "condition_a": "Ripples detected",
      "action_a": "Show ripple report with severity levels, propose fixes",
      "condition_b": "No ripples",
      "action_b": "Report clean status"
    },
    "status_format": "FloatPrompt delta.\nDirectory: [path]\nChanges: [N files]\nRipples: [HIGH: n, MEDIUM: n, LOW: n | None detected]\n\n[Report or Ready for: human direction]",
    "next_step_logic": "HIGH ripples? Propose fixes first. MEDIUM? Show for review. LOW? List for manual check. None? Ready for: human direction",
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide"],
      "async": true
    }
  }
}
</json>
<md>
# /float-delta — Ripple Analysis

**Analyze changes and trace ripple effects to find what else might be stale.**

Changes in one file can cause invisible staleness elsewhere. This tool traces dependencies and detects what might need updating.

## Duality

| Condition | Action |
|-----------|--------|
| Ripples detected | Show report with severity, propose fixes |
| No ripples | Report clean status |

## Input Options

```bash
/float-delta                # Auto: unstaged + staged changes
/float-delta --staged       # Only staged changes
/float-delta --commit HEAD  # Changes in last commit
/float-delta --files a.md b.md  # Specific files
```

## Architecture: The Ripple Pattern

```
Changed Files (git diff)
         │
         ▼
  ┌────────────┐
  │   Change   │
  │  Analyzer  │ ← What changed? (content, names, structure)
  └─────┬──────┘
        │
        ▼
  ┌────────────┐
  │   Impact   │
  │   Tracer   │ ← What depends on what changed?
  └─────┬──────┘
        │
        ▼
  ┌────────────┐
  │ Staleness  │
  │  Detector  │ ← Are dependents now outdated?
  └─────┬──────┘
        │
        ▼
  Ripple Report
```

## Process

### 1. Identify Changes

```bash
# Get changed files
git diff --name-only
git diff --staged --name-only

# Categorize changes
# - content: file content modified
# - structure: file moved/renamed
# - naming: identifiers changed
# - version: version numbers updated
```

### 2. Analyze Changes

**Change Analyzer (haiku):**
- Read diff for each changed file
- Categorize change type
- Extract key changes (new functions, renamed vars, moved paths)
- Note version changes

**Report:** Call float-report --phase=map

### 3. Trace Impact

**Impact Tracer (sonnet):**

Find dependents via:
- `related:` fields in frontmatter
- Import/require statements
- Path references in content
- Documentation that describes the changed file

```bash
# Find files with related: pointing to changed file
grep -r "related:.*changed-file" --include="*.md"

# Find references in content
grep -r "changed-file" --include="*.md" --include="*.js"
```

### 4. Detect Staleness

**Staleness Detector (sonnet):**

For each dependent:
- Read the dependent file
- Check if it references changed content
- Determine if reference is now stale
- Assign severity:
  - **HIGH**: Definitely stale (path changed, referenced content deleted)
  - **MEDIUM**: Possibly stale (content changed, reference might be outdated)
  - **LOW**: Check manually (general reference, probably fine)

**Report:** Call float-report --phase=decide

## Severity Levels

| Severity | Meaning | Action |
|----------|---------|--------|
| **HIGH** | Definitely stale | Propose fix |
| **MEDIUM** | Possibly stale | Show for review |
| **LOW** | Check manually | List only |

## Output Format

```
Change: [file path]
  Type: [content | structure | naming | version]
  Key changes: [summary]

Ripples:
  HIGH: [file] — [reason]
  MEDIUM: [file] — [reason]
  LOW: [file] — [reason]
```

## Buoys

| Buoy | Model | Purpose |
|------|-------|---------|
| `change_analyzer` | haiku | Categorize changes (content, structure, naming, version) |
| `impact_tracer` | sonnet | Find dependents via related:, imports, references |
| `staleness_detector` | sonnet | Check if dependents contain outdated info |

## Examples

**Ripples detected:**
```
> /float-delta

FloatPrompt delta.
Directory: /Users/mds/Documents/_Github/floatprompt
Changes: 2 files

Analyzing changes...

Changed (2 files):
  - .float/core/tools/float-enhance.md
    Type: content (+frontmatter_buoy section)

  - system/buoys.md
    Type: content (+Frontmatter Buoy)

Tracing ripples...

Ripple Report:

HIGH (definitely stale):
  ⚠ docs/claude.md
    Line 47: describes /float-enhance
    Reason: New buoy not mentioned

MEDIUM (possibly stale):
  ? .float/project/context/project-context.md
    References tool system
    Reason: Might want buoy mention

LOW (check manually):
  · README.md
    General /float description
    Reason: Probably fine, verify manually

Fix HIGH ripples? [yes / review / skip]:
```

**After fixing:**
```
Fixed:
  ✓ docs/claude.md — added frontmatter_buoy to buoy list

Remaining:
  MEDIUM: 1 (review recommended)
  LOW: 1 (manual check)

Ready for: human direction
```

**No ripples:**
```
> /float-delta

FloatPrompt delta.
Directory: /Users/mds/Documents/_Github/floatprompt
Changes: 1 file

Changed:
  - .float/project/logs/2025-12-30.md
    Type: content (session log update)

No ripples detected.
Session logs don't have dependents.

Ready for: human direction
```

**Path/structure change:**
```
> /float-delta

FloatPrompt delta.
Directory: /Users/mds/Documents/_Github/floatprompt
Changes: 5 files (structure change detected)

Changed:
  - .float/meta/ → .float/core/ (RENAME)

HIGH ripples (28 files):
  Path references found in 28 files.

  Run /float-fix to update all path references?
  [yes / list / skip]:
```

## Integration with Other Tools

| Scenario | Recommended Flow |
|----------|------------------|
| After refactor | `/float-delta` → fix ripples |
| Path changes | `/float-delta` → `/float-fix` |
| Version bump | `/float-delta --commit HEAD` |
| Pre-commit | `/float-delta --staged` |

## Auto-Fix Capabilities

Simple fixes can be auto-applied:
- Path updates (old path → new path)
- Version number updates
- Simple text replacements

Complex fixes require human review:
- Content descriptions
- Conceptual updates
- Structural changes

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
