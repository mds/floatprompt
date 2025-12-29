---
title: CLI
type: nav
status: current
created: 2025-12-29
related: bin/floatprompt.js, package.json, core/

human_author: @mds
human_intent: Document CLI scaffolding tool for npx floatprompt
human_context: Entry point for users creating FloatPrompt System in their projects

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added full metadata per specs/doc.md requirements
---

# CLI

The `bin/` folder — CLI script for `npx floatprompt`.

## Contents

| File | Purpose |
|------|---------|
| **floatprompt.js** | CLI entry point for scaffolding FloatPrompt System |

## What It Does

When users run `npx floatprompt`, this script:
1. Creates `.float/` folder structure
2. Copies core templates from `core/`
3. Scaffolds nav files for existing folders
4. Sets up the FloatPrompt System

---

<!-- AI: Update this file when contents of bin/ change. -->
