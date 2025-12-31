---
title: .float/ Structure
type: nav
status: current
created: [scaffold date]
related: .float/system.md, .float/project/project.md

human_author: [update to your handle]
human_intent: Quick structural reference for .float/ folder
human_context: Depth layering — this is "what's here", system.md is "how it works"

ai_model: [first AI to update this]
ai_updated: [scaffold date]
ai_notes: Scaffolded by float init
---

# .float/ Structure

Quick structural reference for the `.float/` folder.

**Depth layering:**
- `core/index.md` (this file) = "what's here" (structure)
- `system.md` = "how it works" (behavior)

**Symmetry:**
- `core/index.md` = describes FloatPrompt internals (this file)
- `project/project.md` = describes your project's data

## Structure

```
.float/
├── system.md           # Boot loader (read first)
│
├── core/               # FloatPrompt internals (don't modify)
│   ├── index.md        # This file (structure reference)
│   ├── format/         # Core format templates
│   └── tools/          # /float command tools
│
└── project/            # Your project's data
    ├── project.md      # Structure reference for project/
    ├── context/        # Terrain maps, decisions
    ├── nav/            # Project folder navigation
    └── logs/           # Session history
```

## core/

System internals. Don't modify unless you're updating FloatPrompt itself.

| Item | Purpose |
|------|---------|
| **index.md** | This file — structural reference |
| **format/** | Core format templates |
| **tools/** | /float command tools |

### core/format/

| File | Purpose |
|------|---------|
| **template.md** | FloatPrompt template |
| **doc.md** | floatprompt doc tool |
| **os.md** | Full FloatPrompt OS |

### core/tools/

| File | Purpose |
|------|---------|
| **float.md** | Boot/init tool for /float command |
| **float-sync.md** | Structure integrity tool for /float sync |
| **float-fix.md** | Content integrity tool for /float fix |
| **float-context.md** | Context generation tool for /float context |
| **float-enhance.md** | Quality improvement tool for /float enhance |

## project/

Your project's FloatPrompt data. Project-specific, varies per repo.

| Item | Purpose |
|------|---------|
| **project.md** | Structure reference (see `project/project.md`) |
| **context/** | Terrain maps, decisions |
| **nav/** | Project folder navigation |
| **logs/** | Session history |

### project/context/

| File | Purpose |
|------|---------|
| **{project}.md** | Project-wide terrain map (auto-generated) |
| **decisions.md** | Decision history and rationale |

### project/nav/

One file per major project folder. Contents vary by project.

Example: `root.md`, `src.md`, `docs.md`, `tests.md`...

### project/logs/

Session logs use date-based naming: `YYYY-MM-DD.md`

One file per day. Multiple sessions append to same file. Newest entries first.

---

<!-- AI: Update this file when .float/ structure changes. -->
