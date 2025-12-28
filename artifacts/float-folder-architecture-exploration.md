---
title: "_float/ Folder Architecture Exploration"
type: exploration, specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Explore architectural shift to _float/ container folders
human_context: Considering npm installable FloatSystem that works in any existing project

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Created for validation with separate AI agent.
  Significant architectural shift from current approach.
  Need to validate tradeoffs before implementation.
---

# _float/ Folder Architecture Exploration

## Context

FloatSystem is evolving toward an installable tool (`npm install -g floatprompt`) that can be added to any existing project. This creates new requirements:

1. **No collisions** — Can't assume folder names like `sessions/` or `docs/` are available
2. **Clear namespace** — Easy to distinguish FloatSystem files from project files
3. **Visibility** — FloatSystem philosophy values plain text visibility over hidden files
4. **Portability** — Structure should work in any project regardless of existing layout

## Current Architecture

```
project/
├── _system.md              # Boot loader (root only)
├── _float.md               # Navigation (in every folder)
├── sessions/
│   ├── _float.md
│   └── log-2025-12-28.md
├── docs/
│   ├── _float.md
│   └── [doc files]
└── src/
    └── [project code]
```

**Problems with current approach:**
- `sessions/` might collide with existing project folder
- `_float.md` files scattered throughout project
- Hard to distinguish FloatSystem from project structure
- Unclear what to delete if removing FloatSystem

## Proposed Architecture: `_float/` Container

### Core Idea

Every directory gets a `_float/` subfolder that contains all FloatSystem files for that scope.

```
project/
├── _float/                     # Root FloatSystem container
│   ├── system.md               # Boot loader
│   ├── index.md                # Root context/navigation
│   ├── logs/
│   │   └── 2025-12-28.md
│   └── config.md               # Optional settings
│
├── src/
│   ├── _float/                 # Src-level context
│   │   └── index.md            # Context for src/
│   └── [project code]
│
├── docs/
│   ├── _float/                 # Docs-level context
│   │   └── index.md
│   └── [doc files]
│
└── package.json
```

### File Naming Inside `_float/`

**Underscore only on the folder.** Files inside need no prefix — the folder IS the namespace.

| Current | Proposed | Purpose |
|---------|----------|---------|
| `_system.md` | `_float/system.md` | Boot loader (root only) |
| `_float.md` | `_float/index.md` | Context/navigation for parent folder |
| `sessions/log-2025-12-28.md` | `_float/logs/2025-12-28.md` | Session logs |
| (new) | `_float/config.md` | Optional project settings |

**Standard files inside `_float/`:**
- `index.md` — Main context file (like index.html)
- `system.md` — Boot loader (root `_float/` only)
- `logs/` — Session log folder
- `config.md` — Optional settings

Clean, familiar conventions. No redundant prefixes.

### Benefits

1. **Zero collision risk** — `_float/` is a unique namespace
2. **Clear boundaries** — Everything FloatSystem is in `_float/` folders
3. **Easy removal** — Delete all `_float/` folders to uninstall
4. **Sorts to top** — Underscore prefix on folder
5. **Clean project structure** — Project files stay uncluttered
6. **Installable** — `npx floatprompt init` creates `_float/` structure

### Boot Sequence (Revised)

```json
{
  "boot_sequence": {
    "1": "Read _float/system.md completely",
    "2": "Load structure map into memory",
    "3": "Traverse ALL _float/index.md files. Verify Contents tables match parent folder contents.",
    "4": "Read today's log (_float/logs/YYYY-MM-DD.md)",
    "5": "Build mental model of project structure",
    "6": "Flag discrepancies before proceeding",
    "7": "Execute human requests",
    "8": "Log session before ending"
  }
}
```

### Penetration Pattern

```
AI reads: project/_float/system.md
       → project/_float/index.md
       → project/src/_float/index.md
       → project/docs/_float/index.md
       → project/_float/logs/2025-12-28.md
       → Ready to work
```

## Detailed Structure

### Root `_float/`

```
_float/
├── system.md           # Boot loader, behavioral protocol
├── index.md              # Root navigation (what's in project root)
├── logs/
│   ├── 2025-12-28.md   # Daily session logs
│   └── 2025-12-27.md
└── config.md           # Optional: project-specific settings
```

### Subfolder `_float/`

```
src/_float/
└── index.md              # Navigation for src/ contents
```

Minimal. Just navigation. Inherits behavior from root `_float/system.md`.

### Optional: Nested Logs

For large projects, logs could be scoped:

```
src/_float/
├── index.md
└── logs/               # Optional: src-specific logs
    └── 2025-12-28.md
```

But default is centralized logs in root `_float/logs/`.

## Installation Flow

```bash
$ cd my-project
$ npx floatprompt init

Creating FloatSystem structure...
  ✓ _float/system.md
  ✓ _float/index.md
  ✓ _float/logs/

FloatSystem initialized.
- Edit _float/index.md to document your project structure
- AI sessions will log to _float/logs/
- Run 'npx floatprompt scan' to auto-generate index.md files
```

### Scan Command

```bash
$ npx floatprompt scan

Scanning project structure...
  ✓ Created src/_float/index.md (12 files)
  ✓ Created docs/_float/index.md (8 files)
  ✓ Created tests/_float/index.md (24 files)
  ✓ Updated _float/index.md (root)

4 navigation files created/updated.
```

## Tradeoffs

### Pros

| Benefit | Description |
|---------|-------------|
| **Isolation** | FloatSystem is self-contained |
| **No collisions** | Works in any project |
| **Clear ownership** | Obvious what's FloatSystem vs project |
| **Easy cleanup** | `rm -rf **/_float` removes everything |
| **Tooling friendly** | Easy to write install/scan/update commands |
| **Gitignore friendly** | Can ignore `_float/logs/` if desired |

### Cons

| Drawback | Description |
|----------|-------------|
| **Deeper nesting** | `_float/system.md` vs `_system.md` |
| **More folders** | Each scope gets a `_float/` folder |
| **Discovery** | Slightly less visible than root-level files |
| **Breaking change** | Requires migration from current structure |

### Mitigations

- **Deeper nesting**: One extra folder level is minimal cost
- **More folders**: Only created where needed, not everywhere
- **Discovery**: `_float/` sorts to top, still visible
- **Breaking change**: Migration script can automate

## Open Questions

### 1. Naming Inside `_float/`

Should files inside `_float/` keep underscore prefixes?

```
Option A: _float/system.md, _float/index.md (no underscore, folder provides namespace)
Option B: _float/_system.md, _float/_index.md (underscore for consistency)
```

Recommendation: **Option A** — folder is the namespace, no need for double-prefixing.

### 2. Log Location

Centralized vs distributed logs?

```
Option A: All logs in root _float/logs/ (centralized)
Option B: Each _float/ can have its own logs/ (distributed)
Option C: Centralized default, distributed optional
```

Recommendation: **Option C** — Simple default, flexibility when needed.

### 3. Config File

Should there be a `_float/config.md` or `_float/config.json`?

```yaml
# _float/config.md
---
project_name: my-project
ai_models_allowed: [claude, gpt-4]
log_retention_days: 30
auto_scan: true
---
```

Recommendation: **Optional** — Not required for basic usage.

### 4. Index File Naming — DECIDED

**`index.md`** — Familiar convention (like index.html), universally understood as "entry point."

No underscore needed since `_float/` folder is the namespace.

### 5. Subfolder Threshold

When should a subfolder get its own `_float/index.md`?

- Every folder? (comprehensive but verbose)
- Only folders with 5+ files? (threshold)
- Only when explicitly created? (manual)
- Auto-generated on scan? (tooling-driven)

Recommendation: **Tooling-driven** — `npx floatprompt scan` creates where useful.

## Validation Questions

For the reviewing agent:

1. **Does this architecture solve the collision problem** for installing into existing projects?

2. **Is `_float/` the right folder name?** Alternatives: `.float/`, `__float__/`, `_context/`, `_ai/`

3. **Should index.md describe its parent folder or its sibling files?** (i.e., does `src/_float/index.md` describe what's in `src/` or what's in `src/_float/`?)

4. **Is the boot sequence clear?** Would an AI know how to penetrate this structure?

5. **What's missing?** Are there use cases this doesn't handle?

6. **Migration path?** How would existing FloatPrompt projects migrate to this structure?

## Next Steps (If Validated)

1. Update all specifications to reflect `_float/` architecture
2. Migrate floatprompt repository to new structure
3. Build `npx floatprompt init` command
4. Build `npx floatprompt scan` command
5. Update documentation
6. Test with external projects

---

*This document is for architectural validation. Do not implement until reviewed.*
