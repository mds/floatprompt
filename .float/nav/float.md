---
title: FloatPrompt System
type: nav
ai_updated: 2025-12-29
---

# FloatPrompt System

The `.float/` folder — self-documenting system layer for AI project awareness.

## Contents

| Item | Purpose |
|------|---------|
| **system.md** | Boot loader — read first, always |
| **.version** | Installed floatprompt package version |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **context/** | AI terrain maps for project understanding |
| **core/** | Local copy of core templates (prompt, doc, os) |
| **tools/** | FloatPrompt tools for system maintenance |
| **nav/** | Centralized folder navigation (these files) |
| **logs/** | Session history (YYYY-MM-DD.md format) |

## context/

| File | Purpose |
|------|---------|
| **floatprompt.md** | Project-wide terrain map (auto-generated) |
| **decisions.md** | Decision history and rationale |

## core/

| File | Purpose |
|------|---------|
| **prompt.md** | FloatPrompt template |
| **doc.md** | floatprompt doc tool |
| **os.md** | Full FloatPrompt OS |

## tools/

| File | Purpose |
|------|---------|
| **context-creator.md** | FloatPrompt tool for generating context files |

## nav/

| File | Describes |
|------|-----------|
| **float.md** | This file (self-documentation) |
| **root.md** | Repository root |
| **core.md** | core/ folder |
| **docs.md** | docs/ folder |
| **context.md** | context/ folder (onboarding) |
| **examples.md** | examples/ folder |
| **artifacts.md** | artifacts/ folder |

## logs/

Session logs use date-based naming: `YYYY-MM-DD.md`

One file per day. Multiple sessions append to same file. Newest entries first.

---

<!-- AI: Update this file when .float/ structure changes. -->
