<fp>
<json>
{
  "STOP": "Specs folder. Format specifications. FILE pillar.",

  "meta": {
    "title": "Specifications",
    "id": "specs-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Formal specifications for FloatPrompt formats",
    "context": "FILE pillar — technical specifications"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to format specifications"
  },

  "requirements": {
    "pillar": "FILE",
    "specs": ["floatprompt.md", "doc.md", "system.md"]
  }
}
</json>
<md>
# Specifications

**FILE pillar** — Format specifications

## Contents

| File | Purpose |
|------|---------|
| `floatprompt.md` | FloatPrompt `<fp>` format specification |
| `doc.md` | floatprompt doc (YAML frontmatter) specification |
| `system.md` | FloatPrompt System architecture specification |

## Relationship to system/

- `specs/` = Format specifications (what the files look like)
- `system/` = Runtime documentation (how the system behaves)

---

*v0.12.0*
</md>
</fp>
