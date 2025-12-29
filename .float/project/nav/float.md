---
title: FloatPrompt System
type: nav
status: current
created: 2025-12-29
related: .float/system.md, .float/project/context/floatprompt.md

human_author: @mds
human_intent: Document .float/ folder structure for AI navigation
human_context: Self-documentation of the FloatPrompt System operational layer

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Updated for v0.9.0 meta/project structure
---

# FloatPrompt System

The `.float/` folder — self-documenting system layer for AI project awareness.

**This is the operational layer.** It ships with `npx floatprompt` and works standalone.

## Structure

```
.float/
├── system.md           # Boot loader (read first)
│
├── meta/               # FloatPrompt internals (don't modify)
│   ├── floatprompt/    # Core templates
│   └── tools/          # /float command tools
│
└── project/            # Your project's data
    ├── context/        # Terrain maps, decisions
    ├── nav/            # Folder navigation (these files)
    └── logs/           # Session history
```

## Contents

| Item | Purpose |
|------|---------|
| **system.md** | Boot loader — read first, always |
| **meta/** | FloatPrompt system internals (don't touch) |
| **project/** | Your project's FloatPrompt data |

## meta/

System internals. Don't modify unless you're updating FloatPrompt itself.

### meta/floatprompt/

| File | Purpose |
|------|---------|
| **template.md** | FloatPrompt template |
| **doc.md** | floatprompt doc tool |
| **os.md** | Full FloatPrompt OS |
| **update.md** | Structured update planning |

### meta/tools/

| File | Purpose |
|------|---------|
| **float.md** | Boot/init tool for /float command |
| **float-sync.md** | Structure integrity tool for /float sync |
| **float-fix.md** | Content integrity tool for /float fix |
| **float-context.md** | Context generation tool for /float context |
| **float-enhance.md** | Quality improvement tool for /float enhance |

## project/

Your project's FloatPrompt data. This is where project-specific context lives.

### project/context/

| File | Purpose |
|------|---------|
| **{project}.md** | Project-wide terrain map (auto-generated) |
| **decisions.md** | Decision history and rationale |

### project/nav/

| File | Describes |
|------|-----------|
| **float.md** | This file (self-documentation) |
| **root.md** | Repository root |
| **bin.md** | bin/ folder (CLI) |
| **floatprompt.md** | floatprompt/ folder (templates) |
| **specs.md** | specs/ folder (specifications) |
| **docs.md** | docs/ folder |
| **context.md** | context/ folder (onboarding) |
| **examples.md** | examples/ folder |
| **templates.md** | templates/ folder (scaffolding) |
| **artifacts.md** | artifacts/ folder |

### project/logs/

Session logs use date-based naming: `YYYY-MM-DD.md`

One file per day. Multiple sessions append to same file. Newest entries first.

---

<!-- AI: Update this file when .float/ structure changes. -->
