<fp>
<json>
{
  "STOP": "System folder. SYSTEM pillar. Documentation about how FloatPrompt System works.",

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
    "question_answered": "How does FloatPrompt work?",
    "audience": "Developers building with FloatPrompt"
  }
}
</json>
<md>
# System

**SYSTEM pillar** — How FloatPrompt WORKS

## Contents

| File | Purpose |
|------|---------|
| `commands.md` | /float command system specification |
| `buoys.md` | Float Buoys parallel execution pattern |
| `maintenance.md` | System maintenance tool |

## Audience

This folder is for developers who want to understand how the FloatPrompt System works internally. For format documentation, see `specs/`.

---

*v0.12.0*
</md>
</fp>
