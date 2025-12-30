<fp>
<json>
{
  "STOP": "Format folder. FILE pillar. Everything about what FloatPrompt IS.",

  "meta": {
    "title": "Format",
    "id": "format-folder",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "Define what FloatPrompt IS — templates, specs, docs, examples",
    "context": "FILE pillar root — contains all format-related content"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to FILE pillar contents"
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
| `specs/` | Format specifications |
| `docs/` | Guides and philosophy |
| `examples/` | Real-world FloatPrompt tools |

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

### specs/

| File | Purpose |
|------|---------|
| `floatprompt.md` | `<fp>` format specification |
| `doc.md` | floatprompt doc specification |
| `system.md` | FloatPrompt System architecture |

### docs/

Guides, philosophy, and principles.

### examples/

Real-world FloatPrompt tools demonstrating the format.

## Deployment

`core/` and `tools/` are copied to `.float/core/format/` when users run `npx floatprompt`.

---

*v0.12.0*
</md>
</fp>
