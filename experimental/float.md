---
title: Experimental
type: float
status: archived
ai_updated: 2025-12-28
---

# Experimental

Legacy build system for compiling modular FloatPrompt components. Preserved for reference and advanced use cases.

## Status

**Archived/Legacy.** The root `floatprompt.txt` and `floatprompt-os.txt` are the current production files.

## Structure

| Item | Purpose |
|------|---------|
| **src/** | Source files (os/, lib/, experimental/) |
| **dist/** | Compiled output |
| **scripts/** | Build scripts |
| **package.json** | npm configuration |

## Commands

From this folder (requires Node.js >= 16):

```bash
npm run build        # Compile src/os/ to dist/
npm run build-all    # Build everything
```

## How It Works

1. `scripts/build.mjs` reads all components from `src/os/`
2. Concatenates them in order with `header.json` first
3. Wraps in `<fp></fp>` tags
4. Outputs to `dist/` and copies to root

## When to Use

**Most users**: Use the pre-built `floatprompt.txt` or `floatprompt-os.txt` from root.

**Developers**: Use this build system if you need to modify the OS components and recompile.

---

See also: CLAUDE.md in this folder for detailed component documentation.
