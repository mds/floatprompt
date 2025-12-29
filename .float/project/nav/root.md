---
title: Root
type: nav
status: current
created: 2025-12-28
related: README.md, package.json, .float/system.md

human_author: @mds
human_intent: Provide orientation to FloatPrompt repository for AI navigation
human_context: Entry point for understanding project structure and philosophy

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added full metadata per specs/doc.md requirements
---

# Root

FloatPrompt repository root — the invisible OS for AI.

## Contents

| Item | Purpose |
|------|---------|
| **README.md** | Public-facing documentation |
| **LICENSE** | MIT license |
| **package.json** | npm package configuration |
| **bin/** | CLI script for npx floatprompt |
| **floatprompt/** | Essential templates (ships with npx floatprompt) |
| **specs/** | Formal specifications (format, system, Claude integration) |
| **docs/** | Guides and philosophy |
| **context/** | Onboarding context files |
| **examples/** | Real-world FloatPrompt tools |
| **templates/** | Scaffolding templates for new projects |
| **artifacts/** | Historical archive |

## What Is This

FloatPrompt is a structured text format for portable AI collaboration. This repository contains:

1. **The Format** — `<fp>` tags with JSON metadata and markdown content
2. **The System** — FloatPrompt System for project awareness via `.float/`
3. **The Examples** — Real tools built with the format
4. **The Philosophy** — Why this approach works

## Key Concepts

- **FloatPrompt**: Structured prompt format with `<fp><json>` + `<md>` sections
- **FloatPrompt System**: Project awareness through `.float/` folder
- **floatprompt doc**: Document context via YAML frontmatter
- **FloatNav**: Folder navigation (these nav/*.md files)

## MDS Methodology

```
Map → Do → Summarize → Loop
```

Every task follows this cycle. Map what exists, do the work, summarize what changed, loop until done.

## Goal Hierarchy

1. **PRIMARY**: Human Intelligence, Voice & Agency Preservation
2. **SECONDARY**: Precise AI Instruction Execution
3. **TERTIARY**: Human Task Completion Through Reliable Collaboration

## Principles

- Recognition Before Action
- Slow is Smooth
- Archaeological Respect
- Pilot Principle (Human decides, AI executes)
