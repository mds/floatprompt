---
title: FloatPrompt Templates
type: nav
status: current
created: 2025-12-28
related: floatprompt/floatprompt-template.md, floatprompt/floatprompt-doc.md, floatprompt/floatprompt-os.md, floatprompt/floatprompt-update.md, bin/floatprompt.js

human_author: @mds
human_intent: Document core templates that ship with npx floatprompt
human_context: Minimum viable FloatPrompt setup for new projects

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Renamed from core.md, updated file names to floatprompt-*.md pattern
---

# FloatPrompt Templates

The essential FloatPrompt files that ship with `npx floatprompt`.

## Contents

| File | Purpose |
|------|---------|
| **floatprompt-template.md** | Basic FloatPrompt template for creating AI tools |
| **floatprompt-doc.md** | floatprompt doc tool for adding YAML frontmatter context |
| **floatprompt-os.md** | Full FloatPrompt Operating System with advanced features |
| **floatprompt-update.md** | Structured planning tool for significant changes |

## What Ships

When users run `npx floatprompt init`, these files are copied to their project. They represent the minimum viable FloatPrompt setup.

## File Purposes

### floatprompt-template.md
Template for creating new FloatPrompt tools. Provides the `<fp><json>` + `<md>` structure with placeholder fields.

### floatprompt-doc.md
A FloatPrompt tool that helps add context frontmatter to any markdown file. Upload a file, get back the file with proper YAML frontmatter.

### floatprompt-os.md
The complete FloatPrompt Operating System with guided tool creation, voice preservation, and advanced features.

### floatprompt-update.md
A FloatPrompt tool for planning significant changes. Creates structured update plans with impact assessments, phased checklists, and validation frameworks. For human+AI collaboration on complex changes.
