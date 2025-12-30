---
title: FloatPrompt System
type: documentation
status: current
created: 2025-12-28

human_author: @mds
human_intent: Document the FloatPrompt System architecture for project awareness
human_context: The invisible OS for AI — instant project awareness from a single entry point

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: Updated structure to v0.11.0 (meta/ → floatprompt/)
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
│   ├── floatprompt/         # FloatPrompt internals
│   │   ├── index.md         # Structure reference
│   │   ├── core/            # Core templates
│   │   ├── tools/           # /float command tools
│   │   └── types/           # Tool type definitions
│   └── project/             # Your project's data
│       ├── context/         # Terrain maps
│       ├── nav/             # Folder navigation
│       │   ├── root.md
│       │   ├── src.md
│       │   └── docs.md
│       └── logs/            # Session history
│           └── YYYY-MM-DD.md
│
├── src/
├── docs/
└── [project files]
```

## How It Works

**Boot sequence:**

1. AI reads `.float/system.md`
2. Loads structure map into memory
3. Reads all `.float/project/nav/*.md` files
4. Reads today's session log
5. Builds mental model of project
6. Ready to work with full context

**Result:** Rich awareness from one location.

## File Structure

Centralized pattern: floatprompt/ for system internals, project/ for your data.

### The `.float/` folder

| Item | Purpose |
|------|---------|
| `system.md` | Boot loader — behavioral protocol |
| `floatprompt/` | FloatPrompt internals (don't modify) |
| `project/` | Your project's FloatPrompt data |

### floatprompt/

| Item | Purpose |
|------|---------|
| `index.md` | Structure reference |
| `manual.md` | Tool building guide |
| `core/` | Core templates (template.md, doc.md, os.md) |
| `tools/` | /float command tools (10 tools) |
| `types/` | Tool type definitions (6 types) |

### project/

| Item | Purpose |
|------|---------|
| `context/` | Terrain maps, decisions |
| `nav/` | Folder navigation files |
| `logs/` | Session history |

### Navigation: `project/nav/*.md`

| File | Describes |
|------|-----------|
| `root.md` | Project root |
| `src.md` | src/ folder |
| `docs.md` | docs/ folder |
| `[folder].md` | Any folder... |

**Why this structure?** floatprompt/ = don't touch (system files). project/ = your stuff. Instant clarity from folder names.

### Example

```
my-project/
├── .float/                # FloatPrompt System
│   ├── system.md          # Boot loader
│   ├── floatprompt/       # System internals
│   │   ├── index.md       # Structure reference
│   │   ├── core/          # Core templates
│   │   ├── tools/         # Command tools
│   │   └── types/         # Tool types
│   └── project/           # Your project's data
│       ├── context/       # Terrain maps
│       ├── nav/           # Navigation files
│       │   ├── root.md
│       │   ├── src.md
│       │   └── docs.md
│       └── logs/          # Session history
│           └── 2025-12-28.md
│
├── src/                   # Clean — no _float.md
├── docs/                  # Clean — no _float.md
└── README.md
```

## File Types

| Pattern | Type | Purpose |
|---------|------|---------|
| `.float/system.md` | FloatPrompt System | Boot loader, behavioral protocol |
| `.float/project/nav/*.md` | Nav files | Folder navigation (centralized) |
| `.float/project/logs/*.md` | Logs | Session history |
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
mkdir -p .float/core/{core,tools,types} .float/project/{nav,logs,context}
touch .float/system.md
touch .float/core/index.md
touch .float/project/nav/root.md
```

### Option 2: npm

```bash
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
- See `.float/core/index.md` for full structure reference

---

© 2025 @MDS | CC BY 4.0
