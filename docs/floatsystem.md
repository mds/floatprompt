---
title: FloatSystem
type: documentation
status: current
created: 2025-12-28

human_author: MDS
human_intent: Document the FloatSystem architecture for project awareness
human_context: The invisible OS for AI — instant project awareness from a single entry point

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Created after migrating to _float/ container architecture
---

# FloatSystem

**The invisible OS for AI.**

Feed a single `_float/system.md` file to any AI. It boots up, traverses the folder structure, builds rich context, and becomes aware of everything—what exists, how it connects, what needs attention.

**One file turns the lights on.**

## The Problem

Without structure, AI starts every session blind:
- Asks basic questions about your project
- Doesn't know what files exist
- Can't maintain context between sessions
- No awareness of relationships or history

## The Solution

FloatSystem gives AI instant awareness through a simple folder convention:

```
any-project/
├── _float/                  # FloatSystem container
│   ├── system.md            # Boot loader (read first)
│   ├── index.md             # Root navigation
│   └── logs/                # Session history
│       └── YYYY-MM-DD.md
│
├── src/
│   └── _float/
│       └── index.md         # Describes src/
│
├── docs/
│   └── _float/
│       └── index.md         # Describes docs/
│
└── [project files]
```

## How It Works

**Boot sequence:**

1. AI reads `_float/system.md`
2. Loads structure map into memory
3. Traverses all `_float/index.md` files
4. Reads today's session log
5. Builds mental model of project
6. Ready to work with full context

**Result:** Rich awareness from minimal files.

## The `_float/` Folder

Every directory can have a `_float/` subfolder containing:

| File | Purpose |
|------|---------|
| `system.md` | Boot loader (root only) |
| `index.md` | Navigation for parent folder |
| `logs/` | Session history (root only) |

**Underscore only on folder** — files inside need no prefix.

## File Types

| Pattern | Type | Purpose |
|---------|------|---------|
| `_float/system.md` | FloatSystem | Boot loader, behavioral protocol |
| `_float/index.md` | FloatNav | Folder navigation |
| `_float/logs/*.md` | FloatLog | Session history |
| `*.md` with frontmatter | FloatDoc | Document context |
| `*.md` with `<fp>` tags | FloatPrompt | Tools, behavioral modifiers |

## The Pilot Principle

**Human = Pilot. AI = Crew.**

| Human | AI |
|-------|-----|
| Decides | Executes |
| Approves | Creates files |
| Sets direction | Maintains structure |
| Reviews | Logs sessions |

AI does the heavy lifting. Human stays in control.

## Getting Started

### Option 1: Manual

Create the structure yourself:

```
mkdir -p _float/logs
touch _float/system.md
touch _float/index.md
```

### Option 2: npm (coming soon)

```bash
npm install -g floatprompt
npx floatprompt init
```

### Then

Give your AI the `_float/system.md` file. It takes over from there.

## Token Efficiency

Structure IS compression.

| Component | Tokens |
|-----------|--------|
| system.md | 300-500 |
| index.md (per folder) | 30-50 |
| Session log | 50-150 |

**10-folder project:** ~1500 tokens for complete awareness.

## Why `_float/`

- **Zero collision** — unique namespace, won't conflict with project files
- **Sorts to top** — underscore prefix
- **Clear boundaries** — all FloatSystem files in one place
- **Easy removal** — delete `_float/` folders to uninstall
- **Installable** — `npx floatprompt init` creates structure

## Relationship to FloatPrompt

| | FloatPrompt | FloatSystem |
|--|-------------|-------------|
| **Purpose** | Build AI tools | Project awareness |
| **Format** | `<fp>` tags | `_float/` folders |
| **Scope** | Single tool | Entire project |
| **Use** | Upload to AI | AI reads automatically |

FloatPrompt = tools you build.
FloatSystem = awareness AI gains.

They work together. FloatSystem can contain FloatPrompt tools.

## Learn More

- See `_float/system.md` in this repo for a live example
- See `artifacts/floatprompt-npm-scaffold-spec.md` for npm tool spec

---

© 2025 @MDS | CC BY 4.0
