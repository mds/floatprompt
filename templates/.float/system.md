---
title: FloatPrompt System
type: system
status: current
created: [scaffold date]
related: .float/floatprompt/index.md, .float/project/project.md

human_author: [update to your handle]
human_intent: Boot protocol and behavioral constraints for AI working in this project
human_context: Read first in any session — defines conventions, boot sequence, maintenance

ai_model: [first AI to update this]
ai_updated: [scaffold date]
ai_notes: |
  Scaffolded by npx floatprompt.
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
    "version": "0.11.0"
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
    "boot_sequence": {
      "1": "Read this file completely",
      "2": "Load structure map into memory",
      "3": "Read .float/project/context/decisions.md if exists (decision history)",
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
│   ├── system.md           # This file (boot loader) — "how it works"
│   ├── floatprompt/        # FloatPrompt internals (don't modify)
│   │   ├── index.md        # Structural reference — "what's here"
│   │   ├── tools/          # System tools
│   │   │   ├── float.md
│   │   │   ├── float-sync.md
│   │   │   ├── float-fix.md
│   │   │   ├── float-context.md
│   │   │   └── float-enhance.md
│   │   └── core/           # FloatPrompt templates
│   │       ├── template.md   # Tool creation template
│   │       ├── doc.md        # Document context tool
│   │       ├── os.md         # Full FloatPrompt OS
│   │       └── update.md     # Structured update planning
│   └── project/            # Your project's data
│       ├── project.md      # Structure reference for project/
│       ├── nav/            # Centralized navigation
│       │   └── root.md     # Repository root
│       ├── context/        # AI terrain maps
│       │   ├── {name}.md   # Project context (named for project)
│       │   └── decisions.md # Decision history and rationale
│       └── logs/           # Session history
└── [project files]
```

## File Conventions

| Pattern | Type | Purpose |
|---------|------|---------|
| `.float/system.md` | FloatPrompt System | Boot loader (this file) |
| `.float/floatprompt/*` | FloatPrompt | System internals (don't modify) |
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

## Creating Tools

Use `.float/floatprompt/core/template.md` as template for new FloatPrompt tools.
Use `.float/floatprompt/core/doc.md` to add context frontmatter to documents.
Use `.float/floatprompt/core/os.md` for guided tool creation with voice preservation.
Use `.float/floatprompt/core/update.md` for planning significant changes.

## FloatPrompt Source

This system was scaffolded by [floatprompt](https://github.com/mds/floatprompt).

For full documentation, specs, and examples:
- GitHub: https://github.com/mds/floatprompt
- Docs: https://floatprompt.com

</md>
</fp>
