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
ai_notes: Updated to centralized architecture — all navigation in _float/nav/, no scattered files
---

# FloatSystem

**The invisible OS for AI.**

Feed a single `_float/system.md` file to any AI. It boots up, reads centralized navigation, builds rich context, and becomes aware of everything—what exists, how it connects, what needs attention.

**One file turns the lights on.**

## The Problem

Without structure, AI starts every session blind:
- Asks basic questions about your project
- Doesn't know what files exist
- Can't maintain context between sessions
- No awareness of relationships or history

## The Solution

FloatSystem gives AI instant awareness through a centralized pattern:

```
any-project/
├── _float/                  # FloatSystem container
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

1. AI reads `_float/system.md`
2. Loads structure map into memory
3. Reads all `_float/nav/*.md` files
4. Reads today's session log
5. Builds mental model of project
6. Ready to work with full context

**Result:** Rich awareness from one location.

## File Structure

Centralized pattern: all navigation in `_float/nav/`.

### The `_float/` folder

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
├── _float/                # All system files here
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
| `_float/system.md` | FloatSystem | Boot loader, behavioral protocol |
| `_float/nav/*.md` | FloatNav | Folder navigation (centralized) |
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

```bash
mkdir -p _float/nav _float/logs
touch _float/system.md
touch _float/nav/root.md
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
| _float/system.md | 300-500 |
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

| | FloatPrompt | FloatSystem |
|--|-------------|-------------|
| **Purpose** | Build AI tools | Project awareness |
| **Format** | `<fp>` tags | `_float/` folder |
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
