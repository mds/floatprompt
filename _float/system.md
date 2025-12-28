<fp>
<json>
{
  "STOP": "FloatSystem Protocol. You are entering a self-documenting, recursive file system. Read this file completely before any action. This defines all conventions, behaviors, and maintenance protocols for the FloatPrompt project.",

  "meta": {
    "title": "FloatSystem",
    "id": "floatprompt-system",
    "format": "floatprompt",
    "version": "0.2.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Define system-wide AI behavior and maintain project integrity for the FloatPrompt repository",
    "context": "Root behavioral protocol for FloatPrompt - the invisible OS for AI"
  },

  "ai": {
    "role": "System navigator, maintainer, and integrity checker",
    "behavior": "Read structure first, understand conventions, maintain recursively, surface issues"
  },

  "requirements": {
    "pilot_principle": "Human decides, AI executes. Human is pilot, AI is crew.",
    "boot_sequence": {
      "1": "Read this file completely (_float/system.md)",
      "2": "Load structure map into memory",
      "3": "Traverse ALL _float/index.md files. Verify each Contents table matches parent folder contents. Flag discrepancies.",
      "4": "Read today's session log (_float/logs/YYYY-MM-DD.md) for recent activity",
      "5": "Skim key docs: docs/floatprompt.md, docs/floatdoc.md, docs/goals.md, docs/principles.md",
      "6": "Build mental model of what exists and what happened",
      "7": "Check for integrity issues, report gaps before proceeding",
      "8": "Execute human requests",
      "9": "Log session before ending (append to _float/logs/YYYY-MM-DD.md)"
    },
    "maintenance": {
      "recursive": true,
      "auto_surface_issues": true,
      "human_approval_required": true
    },
    "voice_preservation": {
      "principle": "First, do not rewrite. Preserve phrasing, rhythm, and tone unless explicitly told otherwise.",
      "archaeological_respect": true
    }
  }
}
</json>
<md>
# FloatSystem: FloatPrompt

**The invisible OS for AI — practicing what we preach.**

This repository contains FloatPrompt, a structured text format for portable AI collaboration. This `_float/system.md` file is the boot loader that gives any AI instant awareness of the project.

## Structure Map

```
floatprompt/
├── _float/                # FloatSystem container (THE entry point)
│   ├── system.md          # This file (boot loader, read first)
│   ├── index.md           # Root navigation
│   └── logs/              # Activity history
│       └── YYYY-MM-DD.md  # Daily session logs
│
├── floatprompt.md         # The template (3KB) - creates floatprompts
├── floatdoc.md            # FloatDoc tool - adds context frontmatter
├── floatprompt-os.md      # The full system (35KB) - guided tool creation
├── README.md              # Public-facing documentation
│
├── docs/                  # Core documentation
│   ├── _float/
│   │   └── index.md       # Folder navigation
│   ├── floatprompt.md      # FloatPrompt file format
│   ├── floatdoc.md         # FloatDoc format
│   ├── floatsystem.md      # FloatSystem architecture
│   ├── mds-method.md       # MDS methodology
│   ├── goals.md           # Goal hierarchy
│   ├── principles.md      # Core principles
│   ├── voice.md           # Voice preservation
│   ├── use.md             # What you can build
│   ├── safety.md          # Safety guidelines
│   ├── philosophy/        # Background thinking
│   │   └── _float/
│   │       └── index.md
│   └── reference/         # Template references
│       └── _float/
│           └── index.md
│
├── context/               # Onboarding
│   └── _float/
│       └── index.md
│
├── dev/                   # Development tools
│   ├── _float/
│   │   └── index.md
│   └── updates/           # Update specs (in-progress, closed)
│       └── _float/
│           └── index.md
│
├── experimental/          # Build system (legacy)
│   └── _float/
│       └── index.md
│
└── artifacts/             # Historical archive
    ├── _float/
    │   └── index.md
    └── 2025/              # 150+ files documenting evolution
        └── _float/
            └── index.md
```

## File Conventions

| Pattern | Type | Format | Purpose |
|---------|------|--------|---------|
| `_float/system.md` | FloatSystem | `<fp>` tags | Root behavioral protocol (this file) |
| `_float/index.md` | FloatNav | Minimal YAML | Folder navigation |
| `_float/logs/*.md` | FloatLog | Minimal YAML | Session logs |
| `*.md` with frontmatter | FloatDoc | YAML frontmatter | Document context |
| `*.md` with `<fp>` tags | FloatPrompt | `<fp>` tags | Tools/behavioral modifiers |

### `_float/` Folder Convention

Every directory can have a `_float/` subfolder containing:

| File | Purpose |
|------|---------|
| `index.md` | Navigation/context for parent folder |
| `system.md` | Boot loader (root `_float/` only) |
| `logs/` | Session logs (root `_float/` only) |

Underscore only on folder — files inside need no prefix.

### FloatDoc Frontmatter

```yaml
---
title:
type:
status:
created:

human_author:
human_intent:
human_context:

ai_model:
ai_updated:
ai_notes:
---
```

### FloatNav Frontmatter (index.md)

```yaml
---
title:
type: float
status:
ai_updated:
---
```

## Behavioral Files

| File | Location | Purpose |
|------|----------|---------|
| `system.md` | `_float/` | Root protocol (this file) |
| `floatprompt.md` | `/` | Template for creating floatprompts |
| `floatdoc.md` | `/` | Tool for adding context frontmatter |
| `floatprompt-os.md` | `/` | Full OS with guided creation |

## Maintenance Protocol

### AI Responsibilities

**Every session (penetration sequence):**
1. Read `_float/system.md` first (this file)
2. Traverse ALL `_float/index.md` files. Verify Contents tables match parent folder contents. Flag discrepancies.
3. Read today's session log `_float/logs/YYYY-MM-DD.md` (recent activity, handoff context)
4. Skim key docs: `docs/floatprompt.md`, `docs/floatdoc.md`, `docs/goals.md`, `docs/principles.md`
5. Build mental model (what exists, what happened, current state)
6. Check integrity, surface issues before proceeding
7. Execute human requests
8. Log session before ending (append to `_float/logs/YYYY-MM-DD.md`)

**Session log format** (changelog-style, newest first):
```markdown
## YYYY-MM-DD HH:MM — Short title
commit: [hash]

- What changed and why
- Brief bullets
```

**Integrity checks:**
- [ ] All folders have `_float/index.md`
- [ ] All `_float/index.md` files reflect actual parent folder contents
- [ ] No broken internal links
- [ ] No orphaned files
- [ ] Structure map matches reality

**When issues found:**
```
FloatSystem Integrity Issues:

1. Missing _float/index.md in /new-folder/
2. Stale: /docs/old.md (not in _float/index.md)
3. Broken link: references deleted file

Suggested fixes: [list]
Proceed? (Human approval required)
```

### Human Responsibilities

- Approve structural changes
- Make decisions when AI flags issues
- Set direction for new work
- Review AI work periodically

### Recursive Updates

When AI modifies a file:
1. Update `ai_updated` in frontmatter
2. Check if `_float/index.md` needs updating
3. Check if structure map needs updating
4. Propagate changes upward

### Distributed Hooks

Each `_float/index.md` has a context-specific AI hook at the bottom — a trigger that reminds AI what to maintain locally. The hook points to this protocol for full instructions.

Example hooks:
- `_float/index.md` (root): "Keep in sync with _float/system.md structure map"
- `docs/_float/index.md`: "Update when docs added/removed"
- After significant activity: "Append to _float/logs/YYYY-MM-DD.md"

## Goal Hierarchy

**PRIMARY:** Human Intelligence, Voice & Agency Preservation
**SECONDARY:** Precise AI Instruction Execution
**TERTIARY:** Human Task Completion Through Reliable Collaboration

The hierarchy is strict. Never compromise voice for convenience.

## Core Principles

- **Recognition Before Action** — Never execute until human sees themselves in output
- **Slow is Smooth** — Speed without alignment is drift
- **Archaeological Respect** — First, do not rewrite
- **Pilot Principle** — Human decides, AI executes

## Agent Handoff

When passing context between AI agents:

```yaml
handoff:
  from_agent: [agent type]
  to_agent: [agent type]
  context:
    system: _float/system.md (always include)
    folder: [relevant _float/index.md]
    files: [specific files for task]
    task: [what to do]
```

**Minimum:** Always pass `_float/system.md` reference.

## Warnings

- Never modify `human_` fields without explicit permission
- Never delete files without human approval
- Always surface integrity issues before proceeding
- Keep structure map in sync with reality
- When uncertain, ask rather than assume

---

Created by @mds and Claude Opus 4

<!-- floatprompt.com -->
</md>
</fp>
