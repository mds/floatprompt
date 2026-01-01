---
title: templates/
type: nav
status: current
created: 2025-12-31
related: templates/, bin/floatprompt.js

human_author: @mds
human_intent: Source of truth for scaffolding
human_context: These files are copied to user projects by npx floatprompt init

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: Scaffolded by /float-sync
---

# templates/

Source of truth for `npx floatprompt init` scaffolding.

## Structure

```
templates/
├── .claude/          # Claude Code command wrappers
│   └── commands/     # /float-* command files
└── .float/           # FloatPrompt system files
    ├── float.md      # Boot loader template
    ├── project.md    # project/ structure template
    ├── tools/        # /float command tools
    ├── templates/    # Format templates
    └── project/      # Dynamic content structure
```

## How It Works

`bin/floatprompt.js` copies these templates to the user's project, creating:
- `.float/` folder with system files
- `.claude/commands/` with command wrappers

## Editing

Changes to templates/ are the source of truth. After editing:
1. Test with `npx floatprompt init` in a test project
2. Bump version in tools if behavior changed
