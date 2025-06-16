---
title: FloatPrompt Naming Convention
type: specification
description: JavaScript-style naming rules for FloatPrompt across all contexts
author: @mds
contributors: ["@mds", "Claude Sonnet"]
---

# FloatPrompt Naming Convention

**JavaScript-style naming rules for FloatPrompt across all contexts**

## 🎯 Naming Rules

| **Context** | **Format** | **Example** |
|-------------|------------|-------------|
| **Document titles & headers** | `FloatPrompt` | "# FloatPrompt Complete Template" |
| **Sentence beginnings** | `FloatPrompt` | "FloatPrompt enables joint execution..." |
| **Mid-sentence technical refs** | `floatprompt` | "Upload the floatprompt file..." |
| **Filenames** | `floatprompt` | `floatprompt-0.5.0-alpha.fp`, `floatprompt-goals.md` |
| **Brand references** | `FloatPrompt` | "The FloatPrompt system serves humans" |

## 📁 File Extension Rules

| **File Type** | **Extension** | **Example** |
|---------------|---------------|-------------|
| **Complete FloatPrompts** | `.fp` | `floatprompt-0.5.0-alpha.fp` |
| **Building blocks** | `.md` | `header.md`, `voice.md` |
| **Documentation** | `.md` | `README.md`, `goals.md` |

_For complete extension specifications, see `src/docs/fp.md`._

## ✅ Quick Examples

**✅ Correct:**
- "FloatPrompt is a portable AI instruction set."
- "Upload the floatprompt file to activate collaboration."
- "The FloatPrompt system enables zero-drift workflows."
- File: `floatprompt-0.5.0-alpha.fp` (complete FloatPrompt)
- File: `floatprompt-goals.md` (documentation)

**❌ Incorrect:**
- "Float Prompt is a portable AI instruction set." (two words)
- "Upload the FloatPrompt file to activate..." (wrong context)
- "The floatprompt system enables..." (brand reference should be title case)

## 🎯 Rationale

- **Technical credibility** - Follows JavaScript naming convention patterns
- **Developer familiarity** - Uses established programming language patterns
- **Brand consistency** - Clear distinction between title case and lowercase usage
- **Flexible application** - Works across different contexts without confusion
- **Architectural clarity** - File extensions signal complete FloatPrompts vs building blocks

---

**Apply this convention in all FloatPrompt documentation, code, and communication.** 