---
title: FloatSystem Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define the system.md root behavioral protocol
human_context: The brain of FloatSystem - points to everything, instructs AI on maintenance

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Initial draft. Needs real-world validation.
---

# FloatSystem Specification

**Version:** 0.1.0 (Draft)

## Overview

`system.md` is the root behavioral protocol for any FloatSystem project. It's the first file AI reads, and it defines:

1. **Structure** — Where everything is
2. **Conventions** — What each file type means
3. **Behavior** — How AI should act
4. **Maintenance** — How to keep the system healthy
5. **Handoff** — How agents pass context

## File Location

`system.md` lives at the root of a project. One per project.

```
project/
├── system.md          # THE root behavioral protocol
├── float.md           # Root folder navigation
├── docs/
│   └── float.md
├── tools/
│   └── float.md
```

## Format

`system.md` is a floatprompt (behavioral modifier):

```markdown
<fp>
<json>
{
  "STOP": "FloatSystem Protocol. You are entering a self-documenting, recursive file system. Read this file completely before any action. This defines all conventions, behaviors, and maintenance protocols for this project.",

  "meta": {
    "title": "FloatSystem",
    "id": "floatsystem",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "",
    "intent": "Define system-wide AI behavior and maintain project integrity",
    "context": "Root behavioral protocol for [project name]"
  },

  "ai": {
    "role": "System navigator, maintainer, and integrity checker",
    "behavior": "Read structure first, understand conventions, maintain recursively, surface issues"
  },

  "requirements": {
    "boot_sequence": {
      "1": "Read this file completely",
      "2": "Load structure map into memory",
      "3": "Understand file conventions",
      "4": "Check for integrity issues",
      "5": "Report any gaps or broken links",
      "6": "Proceed with task"
    },
    "maintenance": {
      "recursive": true,
      "auto_surface_issues": true,
      "human_approval_required": true
    }
  }
}
</json>
<md>
# FloatSystem: [Project Name]

## Structure Map

```
project/
├── system.md              # This file (behavioral protocol)
├── float.md               # Root navigation
├── docs/                  # Documentation
│   ├── float.md           # Folder navigation
│   ├── spec.md            # Specifications
│   └── guide.md           # Guides
├── tools/                 # Floatprompt tools
│   ├── float.md           # Folder navigation
│   └── coach.md           # Example tool
└── artifacts/             # Historical/reference
    └── float.md           # Folder navigation
```

## Behavioral Files

These files modify AI behavior (floatprompts):

| File | Location | Purpose |
|------|----------|---------|
| `system.md` | `/` | Root protocol (this file) |
| [Add other behavioral files] | | |

## Navigation Files

These files map folder contents (floatindex):

| File | Location | Status |
|------|----------|--------|
| `float.md` | `/` | |
| `float.md` | `/docs/` | |
| `float.md` | `/tools/` | |
| `float.md` | `/artifacts/` | |

## File Conventions

| Pattern | Type | Format | Purpose |
|---------|------|--------|---------|
| `system.md` | FloatSystem | `<fp>` tags | Root behavioral protocol |
| `float.md` | FloatIndex | YAML frontmatter | Folder navigation |
| `*.md` with frontmatter | FloatDoc | YAML frontmatter | Document context |
| `*.md` with `<fp>` tags | FloatPrompt | `<fp>` tags | Tools/behavioral |

### FloatDoc Frontmatter (YAML)

```yaml
---
title:
type:
status:
created:

human_author:
human_intent:
human_context:

ai_model:
ai_updated:
ai_notes:
---
```

### FloatPrompt Structure

```markdown
<fp>
<json>
{ behavioral specification }
</json>
<md>
# Methodology
</md>
</fp>
```

## Maintenance Protocol

### AI Responsibilities

**On every session:**
1. Read `system.md` first
2. Load structure map
3. Check integrity (see below)
4. Surface any issues before proceeding
5. Maintain ai_ fields when interacting with files

**Integrity checks:**
- [ ] All folders in structure map exist
- [ ] All folders have `float.md`
- [ ] All `float.md` files list actual contents
- [ ] All floatdocs have required frontmatter fields
- [ ] No broken internal links
- [ ] No orphaned files (files not listed in any index)
- [ ] ai_updated timestamps are current

**When issues found:**
```
⚠️ FloatSystem Integrity Issues:

1. Missing float.md in /new-folder/
2. Broken link: /docs/old-file.md (file doesn't exist)
3. Orphaned file: /tools/unused.md (not in index)
4. Stale ai_updated: /docs/spec.md (90 days old)

Suggested actions:
- Create /new-folder/float.md
- Remove or fix link to old-file.md
- Add unused.md to /tools/float.md or delete
- Review spec.md and update ai_notes

Proceed with fixes? (Human approval required)
```

### Human Responsibilities

- Approve all structural changes
- Create new content
- Set human_ fields in frontmatter
- Review AI suggestions

### Recursive Updates

When AI modifies a file:
1. Update `ai_updated` in that file's frontmatter
2. Update `ai_notes` with what changed
3. Check if parent `float.md` needs updating
4. Check if `system.md` structure map needs updating
5. Propagate changes upward as needed

## Agent Handoff Protocol

When passing context between AI agents:

```yaml
handoff:
  from_agent: [agent type]
  to_agent: [agent type]
  context:
    system: system.md (always include)
    folder: [relevant float.md]
    files: [specific files for task]
    task: [what to do]
    constraints: [any limitations]
```

**Minimum handoff context:**
- Always include `system.md` reference
- Include relevant `float.md` for scope
- Include specific files needed for task

## Warnings

- Never modify human_ fields without explicit permission
- Never delete files without human approval
- Always surface integrity issues before proceeding
- Keep structure map in sync with reality
- When uncertain, ask rather than assume

</md>
</fp>
```

## Required Sections

Every `system.md` must have:

1. **STOP directive** — Tells AI this is the root protocol
2. **Structure Map** — Visual tree of project
3. **Behavioral Files** — List of all floatprompts
4. **Navigation Files** — List of all float.md files
5. **File Conventions** — What each pattern means
6. **Maintenance Protocol** — How AI keeps things healthy
7. **Agent Handoff** — How to pass context

## Integrity Check Specification

AI should check on every session:

| Check | Severity | Action |
|-------|----------|--------|
| Missing float.md | High | Create or flag |
| Broken link | High | Flag to human |
| Orphaned file | Medium | Flag to human |
| Stale ai_updated (>30 days) | Low | Suggest review |
| Missing required frontmatter | Medium | Flag to human |
| Structure map out of sync | High | Update or flag |

## Example: Minimal system.md

```markdown
<fp>
<json>
{
  "STOP": "FloatSystem Protocol. Read completely before action.",
  "meta": { "title": "FloatSystem", "format": "floatprompt" },
  "human": { "author": "MDS", "intent": "Project integrity" },
  "ai": { "role": "System maintainer" },
  "requirements": { "maintenance": { "recursive": true } }
}
</json>
<md>
# FloatSystem: My Project

## Structure
- `/system.md` — This file
- `/float.md` — Root nav
- `/docs/float.md` — Docs nav

## Conventions
- `system.md` = behavioral protocol
- `float.md` = folder navigation
- YAML frontmatter = document context

## Maintenance
Check integrity on each session. Surface issues. Human approves fixes.
</md>
</fp>
```

## Relationship to Other Specs

| Spec | Defines |
|------|---------|
| **FloatSystem** (this) | Root behavioral protocol |
| **FloatDoc** | Document context frontmatter |
| **FloatIndex** | Folder navigation pattern |
| **FloatPrompt** | Tool/behavioral specification |

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
