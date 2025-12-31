<fp>
<json>
{
  "STOP": "project/ Structure Reference. This describes the dynamic content folder that /float commands maintain.",

  "meta": {
    "title": "project/ Structure",
    "id": "float-project",
    "format": "floatprompt",
    "version": "0.16.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Define project/ folder structure and what each subfolder contains",
    "context": "Read after float-system.md"
  },

  "ai": {
    "role": "Structure reference for project/ folder",
    "behavior": "Use this to understand what belongs where in project/"
  },

  "requirements": {
    "structure": {
      "nav/": "Folder navigation files (one per major folder)",
      "context/": "AI terrain maps and decision history",
      "logs/": "Session history (one file per day)"
    },
    "ownership": "AI maintains all project/ content via /float commands",
    "formats": {
      "nav/*.md": "nav file format (minimal YAML)",
      "context/*.md": "floatprompt doc format (YAML frontmatter)",
      "logs/*.md": "log format (changelog style)"
    }
  }
}
</json>
<md>
# project/ Structure

**Your project's FloatPrompt data. Everything here is dynamic.**

The `/float` commands maintain this folder. Human approves changes.

## Structure

```
project/
├── nav/            # Folder navigation
├── context/        # Terrain maps
└── logs/           # Session history
```

## nav/

One file per major project folder. Centralized navigation.

| Pattern | Example |
|---------|---------|
| `{folder}.md` | `root.md`, `src.md`, `docs.md`, `tests.md` |

**Created by:** `/float-sync`

**Format:** Minimal YAML + Contents table

```markdown
---
title: src
type: nav
ai_updated: 2025-01-01
---

# src/

| Item | Purpose |
|------|---------|
| **components/** | React components |
| **utils/** | Helper functions |
```

## context/

AI-generated terrain maps and captured decisions.

| File | Purpose | Created by |
|------|---------|------------|
| `project-context.md` | Project-wide terrain map | `/float-context` |
| `project-decisions.md` | Decision history and rationale | AI appends |

**Format:** floatprompt doc (YAML frontmatter)

**Naming:** Use meaningful names (`api-gateway.md`, `auth-system.md`), never generic names.

## logs/

Session logs with date-based naming.

| Pattern | Format |
|---------|--------|
| `YYYY-MM-DD.md` | One file per day, newest entries first |

**Format:** Changelog style

```markdown
## 2025-01-01 14:30 — Added user auth
commit: abc123

- Implemented JWT authentication
- Added login/logout endpoints
```

Multiple sessions append to same day's file.

## What Belongs Where

| Content | Location |
|---------|----------|
| Folder structure | `nav/*.md` |
| Project understanding | `context/*.md` |
| Decision rationale | `context/project-decisions.md` |
| Session activity | `logs/*.md` |

## Maintenance

| Command | Maintains |
|---------|-----------|
| `/float-sync` | `nav/*.md` |
| `/float-context` | `context/*.md` |
| `/float` | `logs/*.md` (session end) |

</md>
</fp>
