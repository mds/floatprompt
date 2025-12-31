---
title: project/ Structure
type: nav
status: current
created: [scaffold date]
related: .float/core/index.md, .float/system.md

human_author: [update to your handle]
human_intent: Quick structural reference for project/ folder
human_context: Your project's FloatPrompt data — context, nav, logs

ai_model: [first AI to update this]
ai_updated: [scaffold date]
ai_notes: Scaffolded by float init
---

# project/ Structure

Your project's FloatPrompt data. Everything here is project-specific.

**Symmetry:**
- `core/index.md` = describes FloatPrompt internals
- `project/project.md` = describes your project's data (this file)

## Structure

```
project/
├── project.md      # This file (structure reference)
├── context/        # Terrain maps, decisions
├── nav/            # Project folder navigation
└── logs/           # Session history
```

## context/

AI-generated terrain maps and captured decisions.

| File | Purpose |
|------|---------|
| **project-context.md** | Project-wide terrain map |
| **project-decisions.md** | Decision history and rationale |

**Naming rule:** Context files use meaningful names (`floatprompt.md`, `api-gateway.md`), never generic `project.md`.

## nav/

One nav file per major project folder. Centralized navigation.

| Pattern | Example |
|---------|---------|
| `{folder}.md` | `root.md`, `src.md`, `docs.md`, `tests.md` |

**What belongs here:** Nav files for actual project folders (src/, docs/, tests/, etc.)

**What doesn't:** System documentation (that's in core/)

## logs/

Session logs with date-based naming.

| Pattern | Format |
|---------|--------|
| `YYYY-MM-DD.md` | One file per day, newest entries first |

Multiple sessions append to same day's file. Changelog-style entries:

```markdown
## YYYY-MM-DD HH:MM — Short title
commit: [hash]

- What changed and why
- Brief bullets
```

---

<!-- AI: Update this file when project/ structure changes. -->
