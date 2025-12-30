<fp>
<json>
{
  "STOP": "System folder. SYSTEM pillar. How FloatPrompt WORKS.",

  "meta": {
    "title": "System",
    "id": "system-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Document how the FloatPrompt System works — commands, buoys, maintenance",
    "context": "SYSTEM pillar root — for developers building with/on FloatPrompt"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to system documentation"
  },

  "requirements": {
    "pillar": "SYSTEM",
    "subfolders": ["guides/", "concepts/", "reference/", "tools/"]
  }
}
</json>
<md>
# System

**SYSTEM pillar** — How FloatPrompt WORKS

## Contents

| Folder | Purpose |
|--------|---------|
| `guides/` | How to integrate and maintain |
| `concepts/` | Architecture and patterns |
| `reference/` | Quick lookups |
| `tools/` | Source of truth for /float commands |

### guides/

- `integration.md` — Claude Code integration guide
- `checklist.md` — System maintenance checklist

### concepts/

- `architecture.md` — FloatPrompt System architecture
- `buoys.md` — Float Buoys parallel execution pattern

### reference/

- `commands.md` — /float command system specification

### tools/

Source of truth for all /float command implementations. Deployed to `.float/core/tools/` by npx floatprompt.

---

*v0.12.0*
</md>
</fp>
