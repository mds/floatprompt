---
title: FloatPrompt npm Scaffold Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define what the npm scaffolding tool creates and naming conventions
human_context: Simple tool to create _float/ structure, then AI takes over

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Scaffolding only. No AI work in the npm tool.
  AI traverses and maintains after structure exists.
---

# FloatPrompt npm Scaffold Specification

## Purpose

A simple scaffolding tool that creates the `_float/` structure in any project. The tool creates files. AI does everything else.

**What the npm tool does:** Creates structure
**What the npm tool does NOT do:** AI work, scanning, generating content

## Installation

```bash
npm install -g floatprompt
```

## Usage

```bash
cd any-project
npx floatprompt init
```

## What `init` Creates

```
any-project/
└── _float/
    ├── system.md       # Boot loader (template)
    ├── index.md        # Root navigation (empty template)
    └── logs/           # Session history folder
```

That's it. Three things.

## After Scaffolding

Human opens their AI of choice:
- Claude Code
- Cursor
- ChatGPT
- Codex
- Any AI

Human gives AI the `_float/system.md` file. AI takes over:
1. Reads boot sequence
2. Traverses project
3. Creates `_float/index.md` files in subfolders
4. Builds mental model
5. Maintains everything going forward

**The npm tool scaffolds. AI operates.**

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
type: index
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

commit: [hash] (if applicable)

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

### Artifact Files (Optional Convention)

For projects using `artifacts/` folder:

```
YYYY-MM-DD-short-description.md
```

Example: `2025-12-28-api-refactor-notes.md`

Freeform also acceptable. This is human workspace.

## Optional Commands (Future)

```bash
npx floatprompt version    # Show version
npx floatprompt help       # Show help
```

No scan. No generate. AI does that work.

## What This Is NOT

- **Not a CLI for AI operations** — AI reads files, not CLI output
- **Not a scanner** — AI scans the project
- **Not a generator** — AI generates navigation files
- **Not required** — Human can create `_float/` structure manually

The npm tool is convenience, not necessity.

## Summary

```
Human installs: npm install -g floatprompt
Human scaffolds: npx floatprompt init
Human opens AI: claude, cursor, chatgpt, etc.
Human provides: _float/system.md
AI takes over: traverses, understands, maintains
```

**Text files are the binary of AI. This tool just creates the initial files.**

---

*This specification defines the npm scaffolding tool. The tool creates structure. AI does everything else.*
