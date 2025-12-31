---
title: FloatPrompt System
type: system
status: current
created: [scaffold date]
related: .float/project/project.md

human_author: [update to your handle]
human_intent: Boot protocol and behavioral constraints for AI working in this project
human_context: Read first in any session — defines conventions, boot sequence, maintenance

ai_model: [first AI to update this]
ai_updated: [scaffold date]
ai_notes: |
  Scaffolded by float init.
  This is both a floatprompt doc (YAML context) and a FloatPrompt tool (<fp> behavior).
  YAML gives document context. JSON gives behavioral instructions.
---

<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol. Read this file completely before any action.",

  "meta": {
    "title": "FloatPrompt System",
    "format": "floatprompt",
    "version": "0.15.0"
  },

  "human": {
    "author": "",
    "intent": "Project awareness and maintenance",
    "context": ""
  },

  "ai": {
    "role": "System navigator, maintainer, and integrity checker",
    "behavior": "Read structure first, traverse all project/nav/*.md files, maintain recursively"
  },

  "requirements": {
    "pilot_principle": "Human decides, AI executes",
    "containment_principle": ".float/ tools only write inside .float/. Scan project files, report findings to logs/, but NEVER modify files outside .float/. Human applies fixes.",
    "boot_sequence": {
      "1": "Read this file completely",
      "2": "Load structure map into memory",
      "3": "Read .float/project/context/project-decisions.md if exists (decision history)",
      "4": "Read .float/project/context/*.md if exists (terrain maps)",
      "5": "Read ALL .float/project/nav/*.md files. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "6": "Read today's log (.float/project/logs/YYYY-MM-DD.md) if exists",
      "7": "Build mental model of project structure",
      "8": "Report context status: 'Loaded' or 'Missing (run /float context to generate)'",
      "9": "Flag discrepancies before proceeding",
      "10": "Execute human requests",
      "11": "Log session before ending"
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
# FloatPrompt System: [Project Name]

## Structure Map

```
project/
├── .float/
│   ├── system.md           # This file (boot loader)
│   ├── tools/              # /float command tools
│   │   ├── float.md
│   │   ├── float-sync.md
│   │   ├── float-fix.md
│   │   ├── float-context.md
│   │   ├── float-enhance.md
│   │   └── types/          # Tool type templates
│   ├── templates/          # Format templates
│   │   ├── floatprompt.md
│   │   ├── float-doc.md
│   │   └── float-os.md
│   └── project/            # Your project's data
│       ├── nav/            # Centralized navigation
│       │   └── root.md
│       ├── context/        # AI terrain maps
│       │   ├── project-context.md
│       │   └── project-decisions.md
│       └── logs/           # Session history
└── [project files]
```

## File Conventions

| Pattern | Type | Purpose |
|---------|------|---------|
| `.float/system.md` | FloatPrompt System | Boot loader (this file) |
| `.float/tools/*` | FloatPrompt | /float command tools |
| `.float/templates/*` | FloatPrompt | Format templates |
| `.float/project/nav/*.md` | Nav files | Folder navigation (centralized) |
| `.float/project/context/*.md` | Context | AI-generated terrain maps |
| `.float/project/logs/*.md` | Logs | Session history |
| `*.md` with frontmatter | floatprompt doc | Document context |

## Navigation

All folder navigation lives in `.float/project/nav/`. One file per major folder.

| File | Describes |
|------|-----------|
| `project/nav/root.md` | Repository root |

AI creates additional nav files as project grows (e.g., `project/nav/src.md`, `project/nav/docs.md`).

## Maintenance

AI maintains this system. Human approves changes.

- Update project/nav/*.md when folder contents change
- Create new project/nav/*.md for major folders
- Run `/float context` to generate project/context/{name}.md
- Log sessions to `.float/project/logs/`
- Surface integrity issues before proceeding

## Containment Principle

`.float/` tools only write inside `.float/`. They scan and analyze project files but NEVER modify them.

| Action | Inside `.float/` | Outside `.float/` |
|--------|------------------|-------------------|
| Write | ✓ | ✗ |
| Read/scan | ✓ | ✓ |
| Report findings | ✓ (to `logs/`) | — |
| Apply fixes | ✓ | Human only |

**Why:** Delete `.float/` = zero trace. AI observes, human modifies project files.

## Creating Tools

Use `.float/templates/floatprompt.md` as template for new FloatPrompt tools.
Use `.float/templates/float-doc.md` to add context frontmatter to documents.
Use `.float/templates/float-os.md` for guided tool creation with voice preservation.

## FloatPrompt Source

This system was scaffolded by [floatprompt](https://github.com/mds/floatprompt).

For full documentation, specs, and examples:
- GitHub: https://github.com/mds/floatprompt
- Docs: https://floatprompt.com

</md>
</fp>
