<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol. Read this file completely before any action.",

  "meta": {
    "title": "FloatPrompt System",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "",
    "intent": "Project awareness and maintenance",
    "context": ""
  },

  "ai": {
    "role": "System navigator, maintainer, and integrity checker",
    "behavior": "Read structure first, traverse all nav/*.md files, maintain recursively"
  },

  "requirements": {
    "pilot_principle": "Human decides, AI executes",
    "boot_sequence": {
      "1": "Read this file completely",
      "2": "Load structure map into memory",
      "3": "Read .float/context/project.md if exists (terrain map)",
      "4": "Read ALL .float/nav/*.md files. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "5": "Read today's log (.float/logs/YYYY-MM-DD.md) if exists",
      "6": "Build mental model of project structure",
      "7": "Report context status: 'Loaded' or 'Missing (run /float context to generate)'",
      "8": "Flag discrepancies before proceeding",
      "9": "Execute human requests",
      "10": "Log session before ending"
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
│   ├── system.md      # This file (boot loader)
│   ├── nav/           # Centralized navigation
│   │   └── root.md    # Repository root
│   ├── logs/          # Session history
│   ├── context/       # AI terrain maps
│   ├── tools/         # System tools
│   │   └── context-creator.md
│   └── core/          # FloatPrompt templates
│       ├── prompt.md  # Tool creation template
│       ├── doc.md     # Document context tool
│       └── os.md      # Full FloatPrompt OS
└── [project files]
```

## File Conventions

| Pattern | Type | Purpose |
|---------|------|---------|
| `.float/system.md` | FloatPrompt System | Boot loader (this file) |
| `.float/nav/*.md` | Nav files | Folder navigation (centralized) |
| `.float/context/*.md` | Context | AI-generated terrain maps |
| `.float/tools/*.md` | Tools | System maintenance tools |
| `.float/core/*.md` | Core | FloatPrompt templates |
| `.float/logs/*.md` | Logs | Session history |
| `*.md` with frontmatter | floatprompt doc | Document context |

## Navigation

All folder navigation lives in `.float/nav/`. One file per major folder.

| File | Describes |
|------|-----------|
| `nav/root.md` | Repository root |

AI creates additional nav files as project grows (e.g., `nav/src.md`, `nav/docs.md`).

## Maintenance

AI maintains this system. Human approves changes.

- Update nav/*.md when folder contents change
- Create new nav/*.md for major folders
- Run `/float context` to generate context/project.md
- Log sessions to `.float/logs/`
- Surface integrity issues before proceeding

## Creating Tools

Use `.float/core/prompt.md` as template for new FloatPrompt tools.
Use `.float/core/doc.md` to add context frontmatter to documents.
Use `.float/core/os.md` for guided tool creation with voice preservation.

</md>
</fp>
