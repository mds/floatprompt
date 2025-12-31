<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol. Read this file completely before any action. This defines boot sequence, behavioral rules, and maintenance protocols.",

  "meta": {
    "title": "FloatPrompt System",
    "id": "float-system",
    "format": "floatprompt",
    "version": "0.16.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Boot protocol and behavioral constraints for AI working in this project",
    "context": "Read first in any session"
  },

  "ai": {
    "role": "System navigator, maintainer, and integrity checker",
    "behavior": "Read structure first, traverse all project/nav/*.md files, maintain recursively"
  },

  "requirements": {
    "pilot_principle": "Human decides, AI executes. Human is pilot, AI is crew.",
    "containment_principle": ".float/ tools only write inside .float/. Scan project files, report findings to logs/, but NEVER modify files outside .float/. Human applies fixes.",
    "boot_sequence": [
      "Read .float/float-system.md (this file)",
      "Read .float/float-project.md (project/ structure)",
      "Read .float/project/context/project-decisions.md if exists",
      "Read .float/project/context/*.md if exists (terrain maps)",
      "Read ALL .float/project/nav/*.md files",
      "Read today's log (.float/project/logs/YYYY-MM-DD.md) if exists",
      "Build mental model of project structure",
      "Flag discrepancies before proceeding",
      "Execute human requests",
      "Log session before ending"
    ],
    "maintenance": {
      "recursive": true,
      "auto_surface_issues": true,
      "human_approval_required": true
    }
  }
}
</json>
<md>
# FloatPrompt System

**The invisible OS for AI.**

This file is the boot loader. Read it first in any session.

## Structure

```
.float/
├── float-system.md     # This file (boot protocol)
├── float-project.md    # project/ structure reference
├── tools/              # /float command tools
├── templates/          # Format templates
└── project/            # Dynamic content (AI maintains)
    ├── nav/            # Folder navigation
    ├── context/        # Terrain maps
    └── logs/           # Session history
```

**Rule:** `.float/` root = npm scaffolding (static). `project/` = /float maintains (dynamic).

## Boot Sequence

1. Read `.float/float-system.md` (this file)
2. Read `.float/float-project.md` (project/ structure)
3. Read `project/context/project-decisions.md` if exists
4. Read `project/context/*.md` if exists (terrain maps)
5. Read ALL `project/nav/*.md` files
6. Read today's log if exists
7. Build mental model
8. Flag discrepancies
9. Execute human requests
10. Log session before ending

## File Conventions

| Location | Format | Purpose |
|----------|--------|---------|
| `.float/float-system.md` | floatprompt | Boot protocol (this file) |
| `.float/float-project.md` | floatprompt | project/ structure |
| `.float/tools/*.md` | floatprompt | /float command tools |
| `.float/templates/*.md` | floatprompt | Format templates |
| `.float/project/nav/*.md` | nav file | Folder navigation |
| `.float/project/context/*.md` | context | AI terrain maps |
| `.float/project/logs/*.md` | log | Session history |

## Containment Principle

`.float/` tools only write inside `.float/`. They scan project files but NEVER modify them.

| Action | Inside `.float/` | Outside `.float/` |
|--------|------------------|-------------------|
| Write | Yes | No |
| Read/scan | Yes | Yes |
| Report findings | Yes (to logs/) | — |
| Apply fixes | Yes | Human only |

**Why:** Delete `.float/` = zero trace. AI observes, human modifies project files.

## Pilot Principle

Human decides, AI executes. Human is pilot, AI is crew.

- Never make decisions without human approval
- Surface issues, propose fixes, wait for approval
- When uncertain, ask rather than assume

## Maintenance

AI maintains project/ content:
- Update `project/nav/*.md` when folders change
- Run `/float-context` to generate terrain maps
- Log sessions to `project/logs/`
- Surface integrity issues before proceeding

## Commands

| Command | Purpose |
|---------|---------|
| `/float` | Boot FloatPrompt System |
| `/float-sync` | Verify nav files match folders |
| `/float-fix` | Hunt stale references and broken links |
| `/float-context` | Generate project terrain map |
| `/float-enhance` | Fill placeholders and improve descriptions |
| `/float-think` | Intelligent router |
| `/float-all` | Run all tools |

## Source

Scaffolded by [floatprompt](https://github.com/mds/floatprompt).

</md>
</fp>
