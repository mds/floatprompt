<fp>
<json>
{
  "STOP": "Format folder. What FloatPrompt IS. FILE pillar.",

  "meta": {
    "title": "Format",
    "id": "format-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Core format templates, specifications, guides, and examples",
    "context": "FILE pillar — everything about what FloatPrompt IS"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to format structure"
  },

  "requirements": {
    "pillar": "FILE",
    "subfolders": ["core/", "specs/", "guides/", "concepts/", "reference/", "examples/"]
  }
}
</json>
<md>
# Format

**FILE pillar** — What FloatPrompt IS

## Contents

| Folder | Purpose |
|--------|---------|
| `core/` | Core format templates (template.md, doc.md, os.md) |
| `specs/` | Format specifications |
| `guides/` | How to use FloatPrompt |
| `concepts/` | Principles and philosophy |
| `reference/` | Quick lookups |
| `examples/` | Real-world FloatPrompt tools |

### core/

The three core templates:
- `template.md` — The FloatPrompt template (3KB)
- `doc.md` — floatprompt doc tool
- `os.md` — Full FloatPrompt OS (35KB)

### guides/

How to use FloatPrompt:
- `use.md` — What you can build
- `mds-method.md` — MDS methodology

### concepts/

Principles and philosophy merged:
- Goals, principles, voice, safety
- Manifesto, structure, context, discovery, naming, orientation, value

### reference/

Quick lookups:
- `claude.md` — Claude Code entry point
- `reference-*.md` — Template references

---

*v0.12.0*
</md>
</fp>
