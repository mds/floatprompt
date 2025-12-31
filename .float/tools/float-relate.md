<fp>
<json>
{
  "STOP": "Float Relate Tool. Map and verify relationships between files. Find broken links, one-way references, and suggest missing connections.",

  "meta": {
    "title": "/float-relate",
    "id": "float-relate",
    "format": "floatprompt",
    "version": "0.15.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Ensure relationship integrity across the codebase",
    "context": "related: fields exist but aren't verified bidirectional or discovered"
  },

  "ai": {
    "role": "Relationship mapper and integrity checker",
    "behavior": "Scan relationships explicit, implicit, structural. Build graph. Detect issues. Suggest connections."
  },

  "requirements": {
    "duality": {
      "condition_a": "Issues found",
      "action_a": "Show relationship map, list issues, offer fixes",
      "condition_b": "All relationships valid",
      "action_b": "Report healthy status with stats"
    },
    "status_format": "FloatPrompt relate.\nTarget: [scope]\nRelationships: [explicit: n, implicit: n, structural: n]\nIssues: [n found | None]\n\n[Map/Issues or Ready for: human direction]",
    "next_step_logic": "Issues found? Show and offer fixes. Suggestions? Present for consideration. Otherwise: Ready for: human direction",
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    }
  }
}
</json>
<md>
# /float-relate — Relationship Mapping

**Map and verify relationships between files.**

`related:` fields exist but aren't verified, bidirectional, or discovered. This tool builds the relationship graph and finds issues.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Show map, list issues, offer fixes |
| All valid | Report healthy status with stats |

## Input Options

```bash
/float-relate docs/claude.md   # Single file relationships
/float-relate specs/           # Folder relationships
/float-relate --all            # Full project graph
/float-relate --broken         # Integrity issues only
```

## Architecture: The Web Pattern

```
                Target File/Folder
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│  Explicit  │  │  Implicit  │  │ Structural │
│  Scanner   │  │  Scanner   │  │  Scanner   │
│            │  │            │  │            │
│ related:   │  │ grep for   │  │ same dir   │
│ fields     │  │ mentions   │  │ siblings   │
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
      └───────────────┼───────────────┘
                      ▼
               ┌────────────┐
               │   Graph    │
               │  Builder   │
               └─────┬──────┘
                     │
      ┌──────────────┼──────────────┐
      ▼              ▼              ▼
 Relationship   Broken Links    Suggestions
    Map         (A→B ≠ B→A)    (should relate)
```

## Process

### 1. Scan Explicit

**Explicit Scanner (haiku):**
- Parse `related:` fields from frontmatter
- Build list of declared relationships
- Note direction (A → B)

```bash
# Extract related fields
grep -h "^related:" *.md | sort
```

### 2. Scan Implicit

**Implicit Scanner (haiku):**
- Grep for file path mentions in content
- Find references that aren't in `related:`
- Note context of reference

```bash
# Find file mentions
grep -r "docs/claude.md" --include="*.md"
```

### 3. Scan Structural

**Structural Scanner (haiku):**
- Find sibling files in same directory
- Find parent nav file
- Identify folder-level relationships

### 4. Build Graph

**Graph Builder (sonnet):**
- Combine all relationship types
- Detect integrity issues:
  - **Broken**: related: points to non-existent file
  - **One-way**: A→B but not B→A
  - **Orphan**: File with no relationships
- Generate suggestions:
  - Files that mention each other but aren't related
  - Files in same domain that should connect

**Report:** Call float-report --phase=map

### 5. Propose Fixes

Based on detected issues, propose relationship fixes:
- Add missing bidirectional links
- Remove broken references
- Suggest new connections

**Report:** Call float-report --phase=decide

### 6. Apply Fixes

After human approval, apply relationship fixes:
- Update `related:` fields in affected files
- Verify changes maintain integrity

**Report:** Call float-report --phase=structure

## Relationship Types

| Type | Source | Verified |
|------|--------|----------|
| **Explicit** | `related:` field | Bidirectional check |
| **Implicit** | Content mentions | Not in related: |
| **Structural** | Same folder | Sibling relationship |

## Issue Types

| Issue | Description | Severity |
|-------|-------------|----------|
| **Broken** | Target doesn't exist | HIGH |
| **One-way** | A→B but not B→A | MEDIUM |
| **Orphan** | No relationships | LOW |

## Buoys

| Buoy | Model | Purpose |
|------|-------|---------|
| `explicit_scanner` | haiku | Parse `related:` fields from frontmatter |
| `implicit_scanner` | haiku | Grep for path/file mentions in content |
| `structural_scanner` | haiku | Find siblings, parent nav files |
| `graph_builder` | sonnet | Combine into map, detect issues, suggest |

## Output Format

### Relationship Map

```
Relationship Map for: .float/float.md

EXPLICIT (in related: field):
  → .float/tools/
  → .float/project.md
  → docs/architecture.md

IMPLICIT (referenced in content):
  → docs/claude.md (mentions boot protocol)
  → README.md (references system.md)

REFERENCING THIS FILE:
  ← 14 files reference .float/float.md
  ← README.md
  ← docs/architecture.md
  ← [12 more...]

STRUCTURAL:
  ~ .float/tools/ (child folder)
  ~ .float/project/ (child folder)
```

### Integrity Report

```
INTEGRITY ISSUES:

⚠ BROKEN (1):
  docs/old-file.md → deleted-file.md
    File does not exist

⚠ ONE-WAY (3):
  docs/claude.md → .float/float.md
    ↳ system.md doesn't list docs/claude.md

  docs/api.md → src/handlers/index.ts
    ↳ handlers doesn't list docs/api.md

SUGGESTIONS (2):
  ? docs/guides/setup.md ↔ docs/guides/config.md
    Both mention "configuration" but not related

  ? docs/architecture.md ↔ src/core/index.ts
    Same domain, consider relating
```

## Examples

**Single file:**
```
> /float-relate docs/claude.md

FloatPrompt relate.
Target: docs/claude.md

Scanning relationships...

EXPLICIT:
  → docs/api.md
  → docs/concepts.md

IMPLICIT:
  → .float/float.md (mentions boot)
  → .float/tools/*.md (references)

REFERENCING:
  ← README.md
  ← .float/project/nav/docs.md

Issues: 1 found

ONE-WAY:
  docs/claude.md → .float/float.md
    ↳ Add docs/claude.md to system.md's related?

Fix? [yes / skip]:
```

**Broken only:**
```
> /float-relate --broken

FloatPrompt relate.
Scanning all files for integrity issues...

Files scanned: 47
Explicit relationships: 89
Implicit references: 156

Integrity Issues (4):

BROKEN (1):
  1. specs/old.md → deleted/path.md
     ↳ Target does not exist

ONE-WAY (3):
  2. docs/claude.md → .float/float.md
  3. docs/api.md → src/handlers/index.ts
  4. README.md → docs/goals.md

Fix all one-way issues? [all / review / skip]:
```

**Healthy project:**
```
> /float-relate --all

FloatPrompt relate.
Scanning all relationships...

Files scanned: 47
Explicit relationships: 89
Implicit references: 156
Structural relationships: 23

All relationships valid.
No broken links.
No one-way references.

Suggestions (2):
  ? Consider relating docs/structure.md ↔ docs/philosophy.md
  ? Consider relating specs/*.md files to each other

Ready for: human direction
```

## Integration with Other Tools

| Scenario | Flow |
|----------|------|
| After renaming files | `/float-relate --broken` |
| Before major refactor | `/float-relate --all` (baseline) |
| After adding new file | `/float-relate [newfile]` |
| Periodic maintenance | `/float-relate --broken` |

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
