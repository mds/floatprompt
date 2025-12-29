---
title: FloatPrompt npm Scaffold Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define what the npm scaffolding tool creates and naming conventions
human_context: Simple tool to create full FloatPrompt structure, then AI takes over

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Scaffolding only. No AI work in the npm tool.
  AI traverses and maintains after structure exists.
  Updated to include .claude/commands and .floatprompt templates.
---

# FloatPrompt npm Scaffold Specification

## Purpose

A simple scaffolding tool that creates the complete FloatPrompt structure in any project. The tool creates files. AI does everything else.

**What the npm tool does:** Creates structure
**What the npm tool does NOT do:** AI work, scanning, generating content

## Usage

```bash
cd any-project
npx floatprompt
```

One command. No subcommands needed.

## What It Creates

```
any-project/
├── _float/
│   ├── system.md          # Boot loader (template)
│   ├── index.md           # Root navigation (empty template)
│   └── logs/              # Session history folder
├── .claude/
│   └── commands/
│       └── float.md       # /float command for Claude Code
└── .floatprompt/
    ├── prompt.md          # FloatPrompt template
    ├── doc.md             # FloatDoc tool
    └── os.md              # FloatPrompt OS (full system)
```

**Six files.** One command. Done.

## Source Mapping

| Source Repo | Scaffolds To |
|-------------|--------------|
| `_float/system.md` (template) | `_float/system.md` |
| `_float/index.md` (template) | `_float/index.md` |
| `.claude/commands/float.md` | `.claude/commands/float.md` |
| `core/prompt.md` | `.floatprompt/prompt.md` |
| `core/doc.md` | `.floatprompt/doc.md` |
| `core/os.md` | `.floatprompt/os.md` |

Names match 1:1 — no renaming during scaffold.

## After Scaffolding

**For Claude Code users:**
```bash
npx floatprompt
/float
```

Two commands. FloatSystem boots automatically.

**For other AI platforms:**
1. Open AI of choice (Cursor, ChatGPT, etc.)
2. Give AI the `_float/system.md` file
3. AI takes over: traverses, understands, maintains

## File Templates

### `_float/system.md` (Template)

```markdown
<fp>
<json>
{
  "STOP": "FloatSystem Protocol. Read this file completely before any action.",

  "meta": {
    "title": "FloatSystem",
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
    "behavior": "Read structure first, traverse all _float/index.md files, maintain recursively"
  },

  "requirements": {
    "pilot_principle": "Human decides, AI executes",
    "boot_sequence": {
      "1": "Read this file completely",
      "2": "Load structure map into memory",
      "3": "Traverse ALL _float/index.md files. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "4": "Read today's log (_float/logs/YYYY-MM-DD.md) if exists",
      "5": "Build mental model of project structure",
      "6": "Flag discrepancies before proceeding",
      "7": "Execute human requests",
      "8": "Log session before ending"
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
├── _float/
│   ├── system.md      # This file
│   ├── index.md       # Root navigation
│   └── logs/          # Session history
└── [project files]
```

## File Conventions

| Pattern | Type | Purpose |
|---------|------|---------|
| `_float/system.md` | FloatSystem | Boot loader (this file) |
| `_float/index.md` | FloatNav | Folder navigation |
| `_float/logs/*.md` | FloatLog | Session history |
| `*.md` with frontmatter | FloatDoc | Document context |

## Maintenance

AI maintains this system. Human approves changes.

- Update `_float/index.md` when files change
- Create `subfolder/_float/index.md` for new folders
- Log sessions to `_float/logs/`
- Surface integrity issues before proceeding

</md>
</fp>
```

### `_float/index.md` (Template)

```markdown
---
title: Project Root
type: float
status: current
ai_updated:
---

# [Project Name]

Project description.

## Contents

| Item | Purpose |
|------|---------|
| **[file or folder]** | Description |

<!-- AI: Verify this list matches actual folder contents. -->
```

### `_float/logs/` (Empty Folder)

Created empty. AI creates log files as needed.

### `.claude/commands/float.md`

The `/float` command for Claude Code. Enables:
- `/float` — Boot or init FloatSystem
- `/float sync` — Check integrity and fix issues

See source repo for full command specification.

### `.floatprompt/prompt.md`

The core FloatPrompt template. Used to create new AI tools.

### `.floatprompt/doc.md`

The FloatDoc tool. Adds YAML frontmatter context to any document.

### `.floatprompt/os.md`

The full FloatPrompt Operating System. Advanced tool creation with voice preservation and archaeological extraction.

## Behavior

```javascript
// Pseudocode
if (floatSystemExists()) {
  console.log('FloatSystem already initialized.');
  console.log('Run /float in Claude Code to boot.');
} else {
  createFloatSystem();
  createClaudeCommands();
  createFloatPromptTemplates();
  console.log('FloatSystem initialized. Run /float to boot.');
}
```

## Naming Conventions

### Log Files (`_float/logs/`)

```
YYYY-MM-DD.md
```

Example: `2025-12-28.md`

One file per day. Multiple sessions append to same file.

### Log Entry Format

```markdown
## HH:MM — Short title

- What changed
- Brief bullets
```

Newest entries at top.

### Subfolder Navigation

When AI creates `_float/index.md` in subfolders:

```
src/_float/index.md      # Describes src/ contents
docs/_float/index.md     # Describes docs/ contents
tests/_float/index.md    # Describes tests/ contents
```

## What This Is NOT

- **Not a CLI for AI operations** — AI reads files, not CLI output
- **Not a scanner** — AI scans the project
- **Not a generator** — AI generates navigation files
- **Not required** — Human can create structure manually

The npm tool is convenience, not necessity.

## Summary

```
Human runs:     npx floatprompt
Human runs:     /float
AI takes over:  traverses, understands, maintains
```

**Text files are the binary of AI. This tool just creates the initial files.**

---

*This specification defines the npm scaffolding tool. The tool creates structure. AI does everything else.*
