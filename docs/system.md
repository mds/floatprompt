---
title: FloatPrompt System
type: documentation
status: current
created: 2025-12-28

human_author: MDS
human_intent: Document the FloatPrompt System architecture for project awareness
human_context: The invisible OS for AI — instant project awareness from a single entry point

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added subsystems documentation for nested .float/ folders in large projects
---

# FloatPrompt System

**The invisible OS for AI.**

Feed a single `.float/system.md` file to any AI. It boots up, reads centralized navigation, builds rich context, and becomes aware of everything—what exists, how it connects, what needs attention.

**One file turns the lights on.**

## The Problem

Without structure, AI starts every session blind:
- Asks basic questions about your project
- Doesn't know what files exist
- Can't maintain context between sessions
- No awareness of relationships or history

## The Solution

The FloatPrompt System gives AI instant awareness through a centralized pattern:

```
any-project/
├── .float/                  # FloatPrompt System
│   ├── system.md            # Boot loader (read first)
│   ├── nav/                 # Centralized navigation
│   │   ├── root.md          # Describes project root
│   │   ├── src.md           # Describes src/
│   │   └── docs.md          # Describes docs/
│   └── logs/                # Session history
│       └── YYYY-MM-DD.md
│
├── src/
├── docs/
└── [project files]
```

## How It Works

**Boot sequence:**

1. AI reads `.float/system.md`
2. Loads structure map into memory
3. Reads all `.float/nav/*.md` files
4. Reads today's session log
5. Builds mental model of project
6. Ready to work with full context

**Result:** Rich awareness from one location.

## File Structure

Centralized pattern: all navigation in `.float/nav/`.

### The `.float/` folder

| Item | Purpose |
|------|---------|
| `system.md` | Boot loader — behavioral protocol |
| `nav/` | Folder navigation files |
| `logs/` | Session history folder |

### Navigation: `nav/*.md`

| File | Describes |
|------|-----------|
| `root.md` | Project root |
| `src.md` | src/ folder |
| `docs.md` | docs/ folder |
| `[folder].md` | Any folder... |

**Why centralized?** AI reads one location for all folder context. No hunting for scattered files. Clean project folders.

### Example

```
my-project/
├── .float/                # All system files here
│   ├── system.md          # Boot loader
│   ├── nav/               # All navigation
│   │   ├── root.md
│   │   ├── src.md
│   │   └── docs.md
│   └── logs/              # Session history
│       └── 2025-12-28.md
│
├── src/                   # Clean — no _float.md
├── docs/                  # Clean — no _float.md
└── README.md
```

## File Types

| Pattern | Type | Purpose |
|---------|------|---------|
| `.float/system.md` | FloatPrompt System | Boot loader, behavioral protocol |
| `.float/nav/*.md` | Nav files | Folder navigation (centralized) |
| `.float/logs/*.md` | Logs | Session history |
| `*.md` with frontmatter | floatprompt doc | Document context |
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

```bash
mkdir -p .float/nav .float/logs
touch .float/system.md
touch .float/nav/root.md
```

### Option 2: npm (coming soon)

```bash
npm install -g floatprompt
npx floatprompt init
```

### Then

Give your AI the `.float/system.md` file. It takes over from there.

## Token Efficiency

Structure IS compression.

| Component | Tokens |
|-----------|--------|
| .float/system.md | 300-500 |
| nav/*.md (per file) | 30-50 |
| Session log | 50-150 |

**10-folder project:** ~1000 tokens for complete awareness.

## Why This Pattern

- **Centralized** — all navigation in one place
- **Clean folders** — no scattered `_float.md` files
- **Sorts to top** — underscore prefix always visible
- **Clear signal** — "this is a system/meta folder"
- **Zero collision** — won't conflict with project files
- **Installable** — `npx floatprompt init` creates structure

## Relationship to FloatPrompt

| | FloatPrompt | FloatPrompt System |
|--|-------------|---------------------|
| **Purpose** | Build AI tools | Project awareness |
| **Format** | `<fp>` tags | `.float/` folder |
| **Scope** | Single tool | Entire project |
| **Use** | Upload to AI | AI reads automatically |

FloatPrompt = tools you build.
FloatPrompt System = awareness AI gains.

They work together. The FloatPrompt System can contain FloatPrompt tools.

## Subsystems

Large projects may have subfolders complex enough to be their own projects. These can have their own `.float/` folders.

```
monorepo/
├── .float/                  # Root system
├── packages/
│   ├── frontend/
│   │   └── .float/          # Subsystem
│   └── backend/
│       └── .float/          # Subsystem
```

**Behavior:**
- Each `.float/` is independent — not nested or inherited
- When working in a subfolder, check for local `.float/`
- If found, boot that system for local context
- Root and subsystem contexts don't merge

**When to use subsystems:**
- Subfolder is essentially its own project
- Has distinct structure worth documenting
- Would benefit from its own nav files and context

**When NOT to use:**
- Simple subfolders (just use root nav)
- Folders that are part of a unified structure

Subsystems are optional. Most projects need only root `.float/`.

## Learn More

- See `.float/system.md` in this repo for a live example
- See `artifacts/floatprompt-npm-scaffold-spec.md` for npm tool spec

---

© 2025 @MDS | CC BY 4.0
