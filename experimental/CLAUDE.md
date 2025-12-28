# CLAUDE.md - Experimental Build System

Legacy build system for compiling modular floatprompt components. Preserved for reference and advanced use cases.

## Overview

This folder contains a Node.js build system that compiles modular markdown/JSON components into the final `floatprompt-os.txt` file.

**Status**: Archived/Legacy. The root `floatprompt.txt` and `floatprompt-os.txt` are the current production files.

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

## Commands

```bash
npm run build        # Compile src/os/ to dist/
npm run build-all    # Build everything
```

Requires Node.js >= 16.

## How It Works

1. `scripts/build.mjs` reads all components from `src/os/`
2. Concatenates them in order with `header.json` first
3. Wraps in `<fp></fp>` tags
4. Outputs to `dist/` and copies to root

## src/os/ Components

The OS is built from modular markdown files:

- **header.json** - The JSON behavioral specification
- **start.md** - Boot sequence instructions for AI
- **map.md** - Map mode (territory assessment)
- **decide.md** - Decide mode (extraction decisions)
- **structure.md** - Structure mode (building floatprompts)
- **goals.md** - Goal hierarchy
- **authority.md** - Authority and permissions
- **context.md** - Context handling
- **integration.md** - Integration patterns
- **output.md** - Output specifications
- **quality.md** - Quality requirements
- **warnings.md** - Warnings and constraints
- **title.md** - Title handling
- **footer.md** - Footer/closing

## src/lib/ Tools

Standalone floatprompt tools:

- **blueprint.txt** - Tool for creating blueprints
- **format.txt** - Format enforcement tool
- **voice-guide-creator.txt** - Creates voice guides

## When to Use

**Most users**: Use the pre-built `floatprompt.txt` or `floatprompt-os.txt` from root.

**Developers**: Use this build system if you need to modify the OS components and recompile.
