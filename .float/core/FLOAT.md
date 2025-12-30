<fp>
<json>
{
  "STOP": ".float/core/ folder. FloatPrompt internals. Don't modify unless updating FloatPrompt itself.",

  "meta": {
    "title": ".float/core/",
    "id": "float-core-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "System internals — format templates, tools, type definitions",
    "context": "Read index.md for structural reference"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to core structure"
  },

  "requirements": {
    "structure": {
      "index.md": "Structural reference",
      "manual.md": "Tool building guide",
      "format/": "Format templates (template, doc, os, update)",
      "tools/": "/float command tools (10 tools)",
      "tools/types/": "Tool type definitions (6 types)"
    }
  }
}
</json>
<md>
# .float/core/

**FloatPrompt internals** — don't modify unless updating FloatPrompt

## Quick Reference

See `index.md` for full structural reference.

## Contents

| Item | Purpose |
|------|---------|
| `index.md` | Structural reference |
| `manual.md` | Tool building guide |
| `format/` | Format templates |
| `tools/` | /float command tools |
| `tools/types/` | Tool type definitions |

## Don't Modify

These files are managed by FloatPrompt. User data belongs in `project/`.

---

*v0.12.0*
</md>
</fp>
