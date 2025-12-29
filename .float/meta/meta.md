---
title: .float/ Structure
type: nav
status: current
created: 2025-12-29
related: .float/system.md, .float/project/project.md

human_author: @mds
human_intent: Quick structural reference for .float/ folder
human_context: Depth layering — this is "what's here", system.md is "how it works"

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Moved from project/nav/float.md to meta/meta.md (v0.10.0)
---

# .float/ Structure

Quick structural reference for the `.float/` folder.

**Depth layering:**
- `meta.md` / `project.md` = "what's here" (structure)
- `system.md` = "how it works" (behavior)

**Symmetry:**
- `meta/meta.md` = describes FloatPrompt internals (this file)
- `project/project.md` = describes your project's data

## Structure

```
.float/
├── system.md           # Boot loader (read first)
│
├── meta/               # FloatPrompt internals (don't modify)
│   ├── meta.md         # This file (structure reference)
│   ├── floatprompt/    # Core templates
│   └── tools/          # /float command tools
│
└── project/            # Your project's data
    ├── project.md      # Structure reference for project/
    ├── context/        # Terrain maps, decisions
    ├── nav/            # Project folder navigation
    └── logs/           # Session history
```

## meta/

System internals. Don't modify unless you're updating FloatPrompt itself.

| Item | Purpose |
|------|---------|
| **meta.md** | This file — structural reference |
| **floatprompt/** | Core templates |
| **tools/** | /float command tools |

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
