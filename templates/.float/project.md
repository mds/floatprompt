<fp>
<json>
{
  "STOP": "project/ Structure Reference. This describes the dynamic content folder that /float commands maintain.",

  "meta": {
    "title": "project/ Structure",
    "id": "float-project",
    "format": "floatprompt",
    "version": "0.17.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Define project/ folder structure and what each subfolder contains",
    "context": "Read after float.md"
  },

  "ai": {
    "role": "Structure reference for project/ folder",
    "behavior": "Use this to understand what belongs where in project/"
  },

  "requirements": {
    "structure": {
      "nav/": "Folder maps and context (two files per folder)",
      "context/": "Project-wide terrain maps and decision history",
      "logs/": "Session history (one file per day)"
    },
    "ownership": "AI maintains all project/ content via /float commands",
    "formats": {
      "nav/*-map.md": "floatprompt doc (lightweight inventory)",
      "nav/*-context.md": "floatprompt (rich understanding)",
      "context/*.md": "floatprompt (project-wide)",
      "logs/*.md": "changelog style"
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
├── nav/                    # Folder maps + context
│   ├── root-map.md         # Quick inventory
│   ├── root-context.md     # Deep understanding
│   ├── src-map.md
│   └── src-context.md
├── context/                # Project-wide
│   ├── project-context.md  # Overall terrain map
│   └── project-decisions.md
└── logs/                   # Session history
    └── YYYY-MM-DD.md
```

## nav/

Two files per folder: **map** (fast) + **context** (deep).

| Pattern | Format | Purpose |
|---------|--------|---------|
| `{folder}-map.md` | floatprompt doc | Lightweight inventory |
| `{folder}-context.md` | floatprompt | Rich understanding |

**Map files** — read on every boot (fast):

```markdown
---
title: src/
type: map
generated_by: /float-sync
ai_updated: 2025-01-01
---

# src/

## Contents

| Item | Purpose |
|------|---------|
| **components/** | React components |
| **utils/** | Helper functions |
```

**Context files** — read when needed (deep):

```markdown
<fp>
<json>
{
  "STOP": "Deep context for src/ folder.",
  "meta": { "type": "context", "generated_by": "/float-context" },
  "ai": { "behavior": "Reference for patterns and relationships" }
}
</json>
<md>
# src/ — Context

## Architecture
[How pieces fit together]

## Relationships
[Connections to other folders]
</md>
</fp>
```

**Created by:**
- `/float-sync` creates `*-map.md`
- `/float-context` creates `*-context.md`

## context/

Project-wide understanding (not folder-specific).

| File | Purpose | Created by |
|------|---------|------------|
| `project-context.md` | Overall terrain map | `/float-context` |
| `project-decisions.md` | Decision history | AI appends |

**Format:** floatprompt

## logs/

Session logs with date-based naming.

| Pattern | Format |
|---------|--------|
| `YYYY-MM-DD.md` | Changelog style, newest first |

```markdown
# Session Log: 2025-01-01

## 14:30 — Added user auth
commit: abc123

- Implemented JWT authentication
- Added login/logout endpoints
```

## Boot Behavior

| Phase | Reads | Why |
|-------|-------|-----|
| Fast boot | `nav/*-map.md` | Quick inventory |
| Deep dive | `nav/*-context.md` | When understanding needed |
| Project-wide | `context/*.md` | Overall patterns |

## Maintenance

| Command | Creates/Updates |
|---------|-----------------|
| `/float-sync` | `nav/*-map.md` |
| `/float-context` | `nav/*-context.md`, `context/*.md` |
| `/float` | `logs/*.md` (session end) |

</md>
</fp>
