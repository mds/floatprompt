---
title: FloatPrompt Templates
type: nav
status: current
created: 2025-12-28
related: floatprompt/core/template.md, floatprompt/core/doc.md, floatprompt/core/os.md, floatprompt/tools/update.md, floatprompt/tools/, bin/floatprompt.js

human_author: @mds
human_intent: Document core templates that ship with npx floatprompt
human_context: Minimum viable FloatPrompt setup for new projects

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Templates organized in floatprompt/core/ and floatprompt/tools/.
---

# FloatPrompt Templates

The essential FloatPrompt files that ship with `npx floatprompt`.

## Contents

| File | Purpose |
|------|---------|
| **template.md** | Basic FloatPrompt template for creating AI tools |
| **doc.md** | floatprompt doc tool for adding YAML frontmatter context |
| **os.md** | Full FloatPrompt Operating System with advanced features |
| **update.md** | Structured planning tool for significant changes |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **core/** | Core templates (template.md, doc.md, os.md) |
| **tools/** | Tool files (update.md, tool-sync.md) |

### core/

| File | Purpose |
|------|---------|
| **template.md** | Basic FloatPrompt template for creating AI tools |
| **doc.md** | floatprompt doc tool for adding YAML frontmatter context |
| **os.md** | Full FloatPrompt Operating System with advanced features |

### tools/

| File | Purpose |
|------|---------|
| **update.md** | Structured planning tool for significant changes |
| **tool-sync.md** | Verify FloatPrompt tools are consistent (run via `/float-tools`) |

## What Ships

When users run `npx floatprompt init`, these files are copied to their project. They represent the minimum viable FloatPrompt setup.

## File Purposes

### template.md
Template for creating new FloatPrompt tools. Provides the `<fp><json>` + `<md>` structure with placeholder fields.

### doc.md
A FloatPrompt tool that helps add context frontmatter to any markdown file. Upload a file, get back the file with proper YAML frontmatter.

### os.md
The complete FloatPrompt Operating System with guided tool creation, voice preservation, and advanced features.

### update.md
A FloatPrompt tool for planning significant changes. Creates structured update plans with impact assessments, phased checklists, and validation frameworks. For human+AI collaboration on complex changes.
