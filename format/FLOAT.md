<fp>
<json>
{
  "STOP": "Format folder. FILE pillar. Contains FloatPrompt format templates and tools.",

  "meta": {
    "title": "Format",
    "id": "format-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Define what FloatPrompt IS — the format specification and templates",
    "context": "FILE pillar root — format templates copied to .float/core/format/ during init"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to format templates"
  },

  "requirements": {
    "pillar": "FILE",
    "question_answered": "What is FloatPrompt?",
    "deployed_to": ".float/core/format/"
  }
}
</json>
<md>
# Format

**FILE pillar** — What FloatPrompt IS

## Contents

| Subfolder | Purpose |
|-----------|---------|
| `core/` | Core format templates |
| `tools/` | Format-level tools |

### core/

| File | Purpose |
|------|---------|
| `template.md` | The FloatPrompt template (3KB) |
| `doc.md` | floatprompt doc tool |
| `os.md` | Full FloatPrompt OS (35KB) |

### tools/

| File | Purpose |
|------|---------|
| `update.md` | Structured update planning |
| `tool-sync.md` | Tool consistency checker |

## Deployment

These files are copied to `.float/core/format/` when users run `npx floatprompt`.

---

*v0.12.0*
</md>
</fp>
