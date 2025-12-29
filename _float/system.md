<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol. You are entering a self-documenting, recursive file system. Read this file completely before any action. This defines all conventions, behaviors, and maintenance protocols for the FloatPrompt project.",

  "meta": {
    "title": "FloatPrompt System",
    "id": "floatprompt-system",
    "format": "floatprompt",
    "version": "0.6.0"
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
      "3": "Read ALL nav/*.md files for folder context. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "4": "Read today's session log (_float/logs/YYYY-MM-DD.md) for recent activity",
      "5": "Choose context depth based on task complexity (see context/ folder)",
      "6": "Build mental model (what exists, what happened, current state)",
      "7": "Check for integrity issues, report gaps before proceeding",
      "8": "Execute human requests",
      "9": "Log session before ending (append to _float/logs/YYYY-MM-DD.md)"
    },
    "context_depth": {
      "principle": "Depth scales with complexity",
      "quick": "context/float-map.md — 6 files, ~5 min, one MDS loop",
      "standard": "context/float-context.md — conceptual overview, ~2 min",
      "full": "context/float-deepdive.md — 24+ files, ~15 min, 5 MDS loops"
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
# FloatPrompt System

**The invisible OS for AI**

This repository contains FloatPrompt, a structured text format for portable AI collaboration. This `_float/system.md` file is the boot loader that gives any AI instant awareness of the project.

## Structure Map

```
floatprompt/
├── _float/                # FloatPrompt System (read first)
│   ├── system.md          # This file (boot loader)
│   ├── nav/               # Centralized navigation
│   │   ├── root.md        # Repository root
│   │   ├── core.md        # Core templates
│   │   ├── docs.md        # Documentation
│   │   ├── context.md     # Onboarding files
│   │   ├── examples.md    # Example tools
│   │   ├── dev.md         # Development
│   │   ├── experimental.md # Legacy build system
│   │   └── artifacts.md   # Historical archive
│   └── logs/              # Activity history
│       └── YYYY-MM-DD.md  # Daily session logs
│
├── README.md              # Public-facing documentation
│
├── core/                  # Essential templates (ships with npx floatprompt)
│   ├── prompt.md          # FloatPrompt template
│   ├── doc.md             # floatprompt doc tool
│   └── os.md              # Full FloatPrompt OS
│
├── docs/                  # Core documentation
│   ├── floatprompt.md     # FloatPrompt file format
│   ├── doc.md             # floatprompt doc format
│   ├── system.md          # FloatPrompt System architecture
│   ├── mds-method.md      # MDS methodology
│   ├── goals.md           # Goal hierarchy
│   ├── principles.md      # Core principles
│   ├── voice.md           # Voice preservation
│   ├── use.md             # What you can build
│   ├── safety.md          # Safety guidelines
│   ├── philosophy/        # Background thinking
│   └── reference/         # Template references
│
├── context/               # Onboarding
│   ├── float-map.md       # Quick context
│   ├── float-context.md   # Standard context
│   └── float-deepdive.md  # Full context
│
├── examples/              # Real-world FloatPrompt tools
│   ├── ai portfolio coach/
│   ├── design feedback extractor/
│   ├── mds voice guide/
│   ├── shortform caption writer/
│   └── shortform script writer/
│
├── dev/                   # Development tools
│   ├── update-creator.md
│   ├── update-protocol.md
│   └── updates/           # Update specs
│
├── experimental/          # Build system (legacy)
│   ├── src/
│   └── scripts/
│
└── artifacts/             # Historical archive
    ├── floatprompt-npm-scaffold-spec.md
    └── 2025/              # 150+ files documenting evolution
```

## File Conventions

| Pattern | Type | Format | Purpose |
|---------|------|--------|---------|
| `_float/system.md` | FloatPrompt System | `<fp>` tags | Root behavioral protocol (this file) |
| `_float/nav/*.md` | Nav files | Minimal YAML | Folder navigation (centralized) |
| `_float/logs/*.md` | FloatLog | Minimal YAML | Session logs |
| `*.md` with frontmatter | floatprompt doc | YAML frontmatter | Document context |
| `*.md` with `<fp>` tags | FloatPrompt | `<fp>` tags | Tools/behavioral modifiers |

### Root: `_float/` folder

| Item | Purpose |
|------|---------|
| `system.md` | Boot loader (this file) |
| `nav/` | Centralized folder navigation |
| `logs/` | Session logs folder |

### Navigation: `nav/*.md` files

| File | Describes |
|------|-----------|
| `root.md` | Repository root |
| `core.md` | core/ folder |
| `docs.md` | docs/ folder (includes philosophy/, reference/) |
| `context.md` | context/ folder |
| `examples.md` | examples/ folder (includes all subfolders) |
| `dev.md` | dev/ folder (includes updates/) |
| `experimental.md` | experimental/ folder |
| `artifacts.md` | artifacts/ folder (includes 2025/) |

**Centralized pattern:** All navigation lives in `_float/nav/`. No scattered files. AI reads one location for complete folder context.

### Nav File Subfolder Rules

**List in nav files:**
- Subfolders users need to navigate
- Folders with distinct purposes

**Skip in nav files:**
- Build outputs: `dist/`, `build/`, `node_modules/`
- Archives: `_archive/`, `archive/`
- Deprecated patterns: nested `_float/` subfolders (use root `_float/` only)
- Generated content

**When to split into separate nav file:**
- Subfolder has 10+ navigable items
- Subfolder has complex internal structure
- Subfolder serves a different audience

### floatprompt doc Frontmatter

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

### Nav File Frontmatter (nav/*.md)

```yaml
---
title:
type: nav
ai_updated:
---
```

## Behavioral Files

| File | Location | Purpose |
|------|----------|---------|
| `system.md` | `_float/` | Root protocol (this file) |
| `prompt.md` | `core/` | Template for creating floatprompts |
| `doc.md` | `core/` | Tool for adding context frontmatter |
| `os.md` | `core/` | Full OS with guided creation |

## Maintenance Protocol

### AI Responsibilities

**Every session (boot sequence):**
1. Read `_float/system.md` first (this file)
2. Read ALL `_float/nav/*.md` files. Verify Contents tables match actual folder contents. Flag discrepancies.
3. Read today's session log `_float/logs/YYYY-MM-DD.md` (recent activity, handoff context)
4. Choose context depth based on task complexity (see below)
5. Build mental model (what exists, what happened, current state)
6. Check integrity, surface issues before proceeding
7. Execute human requests
8. Log session before ending (append to `_float/logs/YYYY-MM-DD.md`)

**Context depth (choose based on task):**

| Level | File | Scope | When to Use |
|-------|------|-------|-------------|
| Quick | `context/float-map.md` | 6 files, ~5 min | Simple tasks, quick questions |
| Standard | `context/float-context.md` | Conceptual, ~2 min | Need system understanding |
| Full | `context/float-deepdive.md` | 24+ files, ~15 min | Complex work, system evolution |

**Depth scales with complexity.** Quick tasks need quick context. Deep work needs deep context.

**Session log format** (changelog-style, newest first):
```markdown
## YYYY-MM-DD HH:MM — Short title
commit: [hash]

- What changed and why
- Brief bullets
```

**Integrity checks:**
- [ ] All nav/*.md files reflect actual folder contents
- [ ] No broken internal links
- [ ] No orphaned files
- [ ] Structure map matches reality

**When issues found:**
```
FloatPrompt System Integrity Issues:

1. Stale: nav/docs.md missing new file
2. Broken link: references deleted file
3. New folder not in nav/

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
2. Check if relevant nav/*.md needs updating
3. Check if structure map needs updating
4. Propagate changes upward

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
    nav: [relevant nav/*.md files]
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
