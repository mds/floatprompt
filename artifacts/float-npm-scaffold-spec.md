---
title: FloatPrompt npm Scaffold Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define what the npm scaffolding tool creates and naming conventions
human_context: Simple tool to create full FloatPrompt structure, then AI takes over

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Scaffolding only. No AI work in the npm tool.
  AI traverses and maintains after structure exists.
  Updated to use centralized nav/ pattern (v0.7.0).
  Self-contained _float/: includes context/, tools/, core/.
  Added: package config, license, CLI flags, error handling,
  cross-platform, git considerations, source clarifications.
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
├── _float/                    # Complete FloatPrompt System
│   ├── system.md              # Boot loader (template)
│   ├── nav/
│   │   └── root.md            # Root navigation (template)
│   ├── logs/                  # Session history (empty)
│   ├── context/               # AI terrain maps (empty)
│   ├── tools/
│   │   └── context-creator.md # Tool for generating context
│   └── core/
│       ├── prompt.md          # FloatPrompt template
│       ├── doc.md             # floatprompt doc tool
│       └── os.md              # FloatPrompt OS (full system)
└── .claude/
    └── commands/
        └── float.md           # /float command for Claude Code
```

**Seven files.** One command. Complete system.

## Source Mapping

| Source Repo | Scaffolds To | Method |
|-------------|--------------|--------|
| `templates/_float/system.md` | `_float/system.md` | Template |
| `templates/_float/nav/root.md` | `_float/nav/root.md` | Template |
| `.claude/commands/float.md` | `.claude/commands/float.md` | Copy |
| `_float/tools/context-creator.md` | `_float/tools/context-creator.md` | Copy |
| `core/prompt.md` | `_float/core/prompt.md` | Copy |
| `core/doc.md` | `_float/core/doc.md` | Copy |
| `core/os.md` | `_float/core/os.md` | Copy |

**Template** = Simplified version in `templates/` folder.
**Copy** = Existing file copied directly.

## After Scaffolding

**For Claude Code users:**
```bash
npx floatprompt
/float
```

Two commands. FloatPrompt System boots automatically.

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
      "3": "Read _float/context/project.md if exists (terrain map)",
      "4": "Read ALL _float/nav/*.md files. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "5": "Read today's log (_float/logs/YYYY-MM-DD.md) if exists",
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
├── _float/
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
| `_float/system.md` | FloatPrompt System | Boot loader (this file) |
| `_float/nav/*.md` | Nav files | Folder navigation (centralized) |
| `_float/context/*.md` | Context | AI-generated terrain maps |
| `_float/tools/*.md` | Tools | System maintenance tools |
| `_float/core/*.md` | Core | FloatPrompt templates |
| `_float/logs/*.md` | Logs | Session history |
| `*.md` with frontmatter | floatprompt doc | Document context |

## Navigation

All folder navigation lives in `_float/nav/`. One file per major folder.

| File | Describes |
|------|-----------|
| `nav/root.md` | Repository root |

AI creates additional nav files as project grows (e.g., `nav/src.md`, `nav/docs.md`).

## Maintenance

AI maintains this system. Human approves changes.

- Update nav/*.md when folder contents change
- Create new nav/*.md for major folders
- Run `/float context` to generate context/project.md
- Log sessions to `_float/logs/`
- Surface integrity issues before proceeding

## Creating Tools

Use `_float/core/prompt.md` as template for new FloatPrompt tools.
Use `_float/core/doc.md` to add context frontmatter to documents.
Use `_float/core/os.md` for guided tool creation with voice preservation.

</md>
</fp>
```

### `_float/nav/root.md` (Template)

```markdown
---
title: Root
type: nav
ai_updated:
---

# [Project Name]

Project description.

## Contents

| Item | Purpose |
|------|---------|
| **[file or folder]** | Description |

---

<!-- AI: Update this file when root folder contents change. -->
```

### `_float/logs/` (Empty Folder)

Created empty. AI creates log files as needed.

### `.claude/commands/float.md`

The `/float` command for Claude Code. Enables:
- `/float` — Boot or init FloatPrompt System
- `/float sync` — Check integrity and fix issues
- `/float context` — Generate or load deep context

See source repo for full command specification.

### `_float/context/` (Empty Folder)

Created empty. Run `/float context` to generate `project.md` terrain map.

### `_float/tools/context-creator.md`

FloatPrompt tool for generating context files. Used by Context Buoy during `/float context`.

### `_float/core/prompt.md`

The core FloatPrompt template. Used to create new AI tools.

### `_float/core/doc.md`

The floatprompt doc tool. Adds YAML frontmatter context to any document.

### `_float/core/os.md`

The full FloatPrompt Operating System. Advanced tool creation with voice preservation and archaeological extraction.

## Behavior

```javascript
// Pseudocode
if (floatExists()) {
  console.log('FloatPrompt System already initialized.');
  console.log('Run /float in Claude Code to boot.');
} else {
  createFloatSystem();    // _float/system.md, nav/, logs/, context/, tools/, core/
  createClaudeCommands(); // .claude/commands/float.md
  console.log('FloatPrompt System initialized. Run /float to boot.');
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

### Folder Navigation

AI creates nav files in the centralized `_float/nav/` folder:

```
_float/nav/root.md       # Describes repository root
_float/nav/src.md        # Describes src/ contents
_float/nav/docs.md       # Describes docs/ contents
_float/nav/tests.md      # Describes tests/ contents
```

**Centralized pattern:** All navigation lives in `_float/nav/`. No scattered files.

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

## Repository Structure

The floatprompt npm package lives at the repo root:

```
floatprompt/
├── package.json           # npm config with "bin" field
├── bin/
│   └── floatprompt.js     # CLI script (~80 lines)
├── templates/             # Scaffolding templates (simplified versions)
│   └── _float/
│       ├── system.md      # Template system.md
│       └── nav/
│           └── root.md    # Template root.md
├── core/                  # Copied to _float/core/
│   ├── prompt.md
│   ├── doc.md
│   └── os.md
├── .claude/               # Copied to .claude/ (existing, generic)
│   └── commands/
│       └── float.md
├── _float/                # This repo's own FloatPrompt System
│   ├── system.md
│   ├── nav/
│   ├── logs/
│   ├── context/
│   └── tools/
│       └── context-creator.md  # Copied to target _float/tools/
├── docs/                  # Documentation (not published to npm)
├── examples/              # Example tools (not published to npm)
├── artifacts/             # Historical archive (not published to npm)
│   └── experimental/      # Archived build system
└── ...
```

**Note:** The `experimental/` folder (old build system) was archived to `artifacts/experimental/` when implementing this spec.

## Package Configuration

```json
{
  "name": "floatprompt",
  "version": "0.1.0",
  "description": "The invisible OS for AI",
  "bin": {
    "floatprompt": "./bin/floatprompt.js"
  },
  "type": "module",
  "files": [
    "bin/",
    "templates/",
    "core/",
    ".claude/",
    "_float/tools/"
  ],
  "repository": {
    "type": "git",
    "url": "https://github.com/mds/floatprompt.git"
  },
  "keywords": ["ai", "prompt", "collaboration", "markdown", "portable"],
  "author": "@mds",
  "license": "MIT",
  "engines": {
    "node": ">=18.0.0"
  }
}
```

**The `files` field controls what gets published to npm:**

| Published | NOT Published |
|-----------|---------------|
| `bin/` | `docs/` |
| `templates/` | `examples/` |
| `core/` | `artifacts/` |
| `.claude/` | `context/` |
| `_float/tools/` | `dev/` |
| `README.md` | `_float/` (except tools/) |
| `LICENSE` | |

## CLI Script Requirements

The `bin/floatprompt.js` file must:

1. **Start with shebang:**
   ```javascript
   #!/usr/bin/env node
   ```

2. **Use ES modules** (since `"type": "module"` in package.json)

3. **Zero dependencies** — Use only Node.js built-ins (`fs`, `path`, `url`)

4. **Cross-platform paths** — Use `path.join()` for all paths, never hardcoded `/`

5. **Handle errors gracefully:**

   | Error | Behavior |
   |-------|----------|
   | `_float/` already exists | Print message, exit cleanly |
   | Permission denied | Print error, suggest `sudo` or check permissions |
   | `.claude/` exists, `commands/` doesn't | Create `commands/` subdirectory |
   | Disk full / write error | Print error, clean up partial files |

6. **Support CLI flags:**

   | Flag | Behavior |
   |------|----------|
   | `--help`, `-h` | Print usage information |
   | `--version`, `-v` | Print package version |
   | (no flags) | Run scaffolding |

   **Note:** No `--force` flag. If `_float/` exists, always exit cleanly. Overwriting is dangerous.

### CLI Output

**Success:**
```
FloatPrompt System initialized.

Created:
  _float/system.md
  _float/nav/root.md
  _float/logs/
  _float/context/
  _float/tools/context-creator.md
  _float/core/prompt.md
  _float/core/doc.md
  _float/core/os.md
  .claude/commands/float.md

Run /float in Claude Code to boot.
```

**Already exists:**
```
FloatPrompt System already initialized.
Run /float in Claude Code to boot.
```

**Help:**
```
floatprompt - The invisible OS for AI

Usage: npx floatprompt [options]

Options:
  -h, --help     Show this help message
  -v, --version  Show version number

Creates a complete FloatPrompt System in the current directory.
Learn more: https://github.com/mds/floatprompt
```

## Publishing Requirements

Before publishing to npm:

| Requirement | Notes |
|-------------|-------|
| **npm account** | Create at npmjs.com |
| **LICENSE file** | Create at repo root (MIT) |
| **README.md** | Update for npm users (install instructions) |
| **Test locally** | Run `npm link` then `npx floatprompt` in test directory |
| **Login** | Run `npm login` before publishing |
| **Publish** | Run `npm publish` |

**Local testing workflow:**
```bash
cd floatprompt           # Repo root
npm link                  # Create global symlink
cd /tmp/test-project      # Test directory
npx floatprompt           # Should scaffold _float/
```

## Git Considerations

### Empty Folders

Git doesn't track empty folders. Add `.gitkeep` files:

```
_float/logs/.gitkeep
_float/context/.gitkeep
```

The CLI should create these `.gitkeep` files automatically.

### Suggested .gitignore

Session logs are ephemeral. Users may want to gitignore them:

```gitignore
# FloatPrompt session logs (optional)
_float/logs/*.md
!_float/logs/.gitkeep
```

**Note:** This is a suggestion for users, not something the CLI creates. The CLI only creates the structure — users decide what to track.

## Source File Clarifications

### `.claude/commands/float.md`

The source mapping shows `templates/.claude/commands/float.md`, but the existing `.claude/commands/float.md` in the repo is already generic and portable.

**Decision:** Copy the existing file directly rather than creating a separate template version. It's 12KB and fully functional for any project.

**Updated source mapping:**

| Source | Destination | Method |
|--------|-------------|--------|
| `templates/_float/system.md` | `_float/system.md` | Template (simplified) |
| `templates/_float/nav/root.md` | `_float/nav/root.md` | Template (empty) |
| `.claude/commands/float.md` | `.claude/commands/float.md` | Copy (existing is generic) |
| `_float/tools/context-creator.md` | `_float/tools/context-creator.md` | Copy |
| `core/prompt.md` | `_float/core/prompt.md` | Copy |
| `core/doc.md` | `_float/core/doc.md` | Copy |
| `core/os.md` | `_float/core/os.md` | Copy |

### Non-Claude Users

The `.claude/commands/` folder is Claude Code specific. Other AI tools (Cursor, ChatGPT, Gemini) won't use it.

**Decision:** Create it anyway. It's harmless for non-Claude users and essential for Claude users. No need for a flag.

## License

**Dual license approach:**

| Component | License | Rationale |
|-----------|---------|-----------|
| CLI tool (`bin/`) | MIT | Standard for npm packages |
| FloatPrompt format & content | CC-BY-4.0 | Attribution for the format |

The `package.json` uses MIT. The README notes that FloatPrompt format content (templates, core files) is CC-BY-4.0.

---

*This specification defines the npm scaffolding tool. The tool creates structure. AI does everything else.*
