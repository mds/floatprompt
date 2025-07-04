# FloatPrompt Naming Convention

## 🎯 Naming Rules

| **Context** | **Format** | **Example** |
|-------------|------------|-------------|
| **Document titles & headers** | `FloatPrompt` | "# FloatPrompt Complete Template" |
| **Sentence beginnings** | `FloatPrompt` | "FloatPrompt enables joint execution..." |
| **Mid-sentence technical refs** | `floatprompt` | "Upload the floatprompt file..." |
| **Filenames** | `floatprompt` | `floatprompt-0.10.0-alpha.fp`, `floatprompt-goals.md` |
| **Brand references** | `FloatPrompt` | "The FloatPrompt system serves humans" |
| **Plural references** | `FloatPrompt files` | "Multiple FloatPrompt files can be chained" |

## 🚫 Never Plural

**FloatPrompt is never plural** - just like JavaScript, Python, or HTML.

- ✅ **Correct**: "FloatPrompt files", "multiple FloatPrompt files", "several FloatPrompt files"
- ❌ **Incorrect**: "FloatPrompts", "floatprompts", "multiple FloatPrompts"

## 📁 File Extension Rules

| **File Type** | **Extension** | **Example** |
|---------------|---------------|-------------|
| **Core FloatPrompt System** | `.fp` | `floatprompt-0.10.0-alpha.fp` |
| **FloatPrompt Applications** | `.fp` | `voice-guide-creator.fp` |
| **Building blocks** | `.md` | `header.md`, `voice.md` |
| **Documentation** | `.md` | `README.md`, `goals.md` |

## ✅ Quick Examples

**✅ Correct:**
- "FloatPrompt is a portable AI instruction set."
- "Upload the floatprompt file to activate collaboration."
- "The FloatPrompt system enables zero-drift workflows."
- "Multiple FloatPrompt files can be chained together."
- File: `floatprompt-0.10.0-alpha.fp` (core system)
- File: `voice-guide-creator.fp` (application)
- File: `floatprompt-goals.md` (documentation)

**❌ Incorrect:**
- "Float Prompt is a portable AI instruction set." (two words)
- "Upload the FloatPrompt file to activate..." (wrong context)
- "The floatprompt system enables..." (brand reference should be title case)
- "Multiple FloatPrompts can be chained..." (never plural)
- "Several floatprompts were created..." (never plural)

## 🎯 Application Naming Convention

**Core System vs Applications:**
- **Core System**: `floatprompt-{version}.fp` (e.g., `floatprompt-0.10.0-alpha.fp`)
- **Applications**: `{functional-name}.fp` (e.g., `voice-guide-creator.fp`)

**Rationale**: Following OS/Application architecture pattern where the core system gets versioned naming while applications get functional names. Both maintain synchronized version metadata internally.

## 🎯 Rationale

JavaScript naming convention patterns that provide technical credibility, developer familiarity, and brand consistency across all contexts.

---

*© 2025 [@MDS](https://mds.is) | CC BY 4.0* 