<fp>
<json>
{
  "STOP": "Float Project Tool. Validate and manage .float/project/ structure (nav/, logs/, context/).",

  "meta": {
    "title": "/float-project",
    "id": "float-project",
    "format": "floatprompt",
    "version": "0.17.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Ensure .float/project/ structure is valid and complete",
    "context": "Focused safeguard for system's own structure, complements /float-sync"
  },

  "ai": {
    "role": "Project structure validator and manager",
    "behavior": "Check expected structure, create missing, report status"
  },

  "requirements": {
    "duality": {
      "condition_a": "Structure valid",
      "action_a": "Report healthy status",
      "condition_b": "Structure invalid",
      "action_b": "Create missing directories/files, report changes"
    },
    "expected_structure": {
      "nav/": "Folder-file mapping (root.md required)",
      "logs/": "Tool run logs (auto-created by float-report)",
      "context/": "Project understanding (project-decisions.md, project-context.md required)"
    },
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "structure"],
      "async": true
    },
    "status_format": "FloatPrompt project.\nDirectory: [path]\nStatus: [valid | fixed N issues]\n\nReady for: human direction",
    "next_step_logic": "Always suggest /float-think as next step. Float-think will decide if float-sync is needed."
  }
}
</json>
<md>
# /float-project — Structure Validator

**Validate and manage .float/project/ structure.**

## Duality

| Condition | Action |
|-----------|--------|
| Structure valid | Report healthy status |
| Structure invalid | Create missing, report changes |

## Expected Structure

```
.float/project/
├── nav/                       # Folder-file mapping
│   └── root.md                # Required: root nav file
├── logs/                      # Tool run logs
│   └── {date}/                # Auto-created by float-report
└── context/                   # Project understanding
    ├── project-decisions.md   # Required: rationale capture
    └── project-context.md     # Required: project terrain
```

## Validation Checklist

- [ ] nav/ exists
- [ ] nav/root.md exists
- [ ] logs/ exists
- [ ] context/ exists
- [ ] context/project-decisions.md exists
- [ ] context/project-context.md exists

## Process

1. **Map** — Check each expected directory and file
2. **Report** — Call float-report --phase=map with findings
3. **Fix** — Create any missing directories/files with scaffold content
4. **Report** — Call float-report --phase=structure with changes

## Scaffold Content

**project-decisions.md (if missing):**
```markdown
---
title: Decision History
type: decisions
status: current
created: {date}
---

# Decision History

Captured rationale for project decisions. AI appends entries during context building.

## Format

### [Topic]
**Question:** Why [observed choice]?
**Answer:** [human's response]
**Date:** YYYY-MM-DD

---

<!-- Entries below -->
```

**project-context.md (if missing):**
```markdown
---
title: Project Context
type: context
status: current
created: {date}
---

# Project Context

[Project name and brief description]

## Key Files

| File | Why It Matters |
|------|----------------|
| `.float/system.md` | Boot protocol — read first |

## Reading Order

1. `.float/system.md`
2. This file

---

*Generated scaffold — customize for your project*
```

## Examples

**Healthy project:**
```
> /float-project

FloatPrompt project.
Directory: /Users/mds/my-project
Status: valid

Checked:
- nav/ ✓
- nav/root.md ✓
- logs/ ✓
- context/ ✓
- context/project-decisions.md ✓
- context/project-context.md ✓

Next: /float-think
```

**Missing files:**
```
> /float-project

FloatPrompt project.
Directory: /Users/mds/my-project
Status: fixed 2 issues

Created:
- context/project-decisions.md (scaffold)
- context/project-context.md (scaffold)

Next: /float-think
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
