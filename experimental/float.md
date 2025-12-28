---
title: Experimental
type: float
status: archived
ai_updated: 2025-12-28
---

# Experimental

Legacy build system for compiling modular FloatPrompt components. Preserved for reference and advanced use cases.

---

## Status

**Archived/Legacy.** The root `floatprompt.txt` and `floatprompt-os.txt` are the current production files.

---

## Contents

| Item | Purpose |
|------|---------|
| **src/** | Source files |
| **dist/** | Compiled output |
| **scripts/** | Build scripts |
| **package.json** | npm configuration |

---

## Structure

```
experimental/
├── src/                    # Source files
│   ├── os/                 # OS components (15 modular files)
│   │   ├── header.json     # JSON behavioral spec
│   │   ├── start.md        # Boot sequence
│   │   ├── map.md          # Map mode
│   │   ├── decide.md       # Decide mode
│   │   ├── structure.md    # Structure mode
│   │   ├── goals.md        # Goal hierarchy
│   │   ├── quality.md      # Quality requirements
│   │   ├── output.md       # Output specifications
│   │   ├── warnings.md     # Warnings and constraints
│   │   └── ...             # Other components
│   ├── lib/                # Library tools
│   │   ├── blueprint.txt   # Blueprint tool
│   │   ├── format.txt      # Format tool
│   │   └── voice-guide-creator.txt
│   └── experimental/       # Experimental variants
├── dist/                   # Compiled output
├── scripts/build.mjs       # Build script
└── package.json            # npm config
```

---

## Commands

From this folder (requires Node.js >= 16):

```bash
npm run build        # Compile src/os/ to dist/
npm run build-all    # Build everything
```

---

## How It Works

1. `scripts/build.mjs` reads all components from `src/os/`
2. Concatenates them in order with `header.json` first
3. Wraps in `<fp></fp>` tags
4. Outputs to `dist/` and copies to root

---

## src/os/ Components

The OS is built from modular markdown files:

| File | Purpose |
|------|---------|
| **header.json** | The JSON behavioral specification |
| **start.md** | Boot sequence instructions for AI |
| **map.md** | Map mode (territory assessment) |
| **decide.md** | Decide mode (extraction decisions) |
| **structure.md** | Structure mode (building floatprompts) |
| **goals.md** | Goal hierarchy |
| **authority.md** | Authority and permissions |
| **context.md** | Context handling |
| **integration.md** | Integration patterns |
| **output.md** | Output specifications |
| **quality.md** | Quality requirements |
| **warnings.md** | Warnings and constraints |
| **title.md** | Title handling |
| **footer.md** | Footer/closing |

---

## src/lib/ Tools

Standalone floatprompt tools:

| File | Purpose |
|------|---------|
| **blueprint.txt** | Tool for creating blueprints |
| **format.txt** | Format enforcement tool |
| **voice-guide-creator.txt** | Creates voice guides |

---

## When to Use

**Most users**: Use the pre-built `floatprompt.txt` or `floatprompt-os.txt` from root.

**Developers**: Use this build system if you need to modify the OS components and recompile.

---

© 2025 @MDS
