---
title: FloatPrompt Naming Convention
type: specification
description: JavaScript-style naming rules for FloatPrompt across all contexts
author: @mds
contributors: ["@mds", "Claude Sonnet"]
---

# FloatPrompt Naming Convention

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

JavaScript naming convention patterns that provide technical credibility, developer familiarity, and brand consistency across all contexts. 