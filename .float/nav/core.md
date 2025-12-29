---
title: Core Templates
type: nav
ai_updated: 2025-12-28
---

# Core Templates

The essential FloatPrompt files that ship with `npx floatprompt`.

## Contents

| File | Purpose |
|------|---------|
| **prompt.md** | Basic FloatPrompt template for creating AI tools |
| **doc.md** | floatprompt doc tool for adding YAML frontmatter context |
| **os.md** | Full FloatPrompt Operating System with advanced features |

## What Ships

When users run `npx floatprompt init`, these files are copied to their project. They represent the minimum viable FloatPrompt setup.

## File Purposes

### prompt.md
Template for creating new FloatPrompt tools. Provides the `<fp><json>` + `<md>` structure with placeholder fields.

### doc.md
A FloatPrompt tool that helps add context frontmatter to any markdown file. Upload a file, get back the file with proper YAML frontmatter.

### os.md
The complete FloatPrompt Operating System with guided tool creation, voice preservation, and advanced features.
