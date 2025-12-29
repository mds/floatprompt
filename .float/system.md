<fp>
<json>
{
  "STOP": "FloatPrompt System Protocol. You are entering a self-documenting, recursive file system. Read this file completely before any action. This defines all conventions, behaviors, and maintenance protocols for the FloatPrompt project.",

  "meta": {
    "title": "FloatPrompt System",
    "id": "floatprompt-system",
    "format": "floatprompt",
    "version": "0.10.0"
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
      "1": "Read this file completely (.float/system.md)",
      "2": "Load structure map into memory",
      "3": "Read .float/project/context/decisions.md for decision history (if exists)",
      "4": "Read .float/project/context/*.md for terrain maps and relationships (if exists)",
      "5": "Read ALL .float/project/nav/*.md files for folder context. Verify Contents tables match actual folder contents. Flag discrepancies.",
      "6": "Read today's session log (.float/project/logs/YYYY-MM-DD.md) for recent activity",
      "7": "Choose context depth based on task complexity (see context/ folder)",
      "8": "Build mental model (what exists, what happened, current state)",
      "9": "Check for integrity issues, report gaps before proceeding",
      "10": "Execute human requests",
      "11": "Log session before ending (append to .float/project/logs/YYYY-MM-DD.md)"
    },
    "context_depth": {
      "principle": "Depth scales with complexity",
      "quick": "context/float-map.md — 6 files, ~5 min, one MDS loop",
      "standard": "context/float-context.md — conceptual overview, ~2 min",
      "full": "context/float-deepdive.md — 24+ files, ~15 min, 5 MDS loops",
      "deep_understanding": {
        "assessments": "artifacts/2025/*-assessment.txt",
        "purpose": "Prevent AI skepticism pattern that persists even after full deep dive",
        "note": "Read these to understand why AI misunderstands FloatPrompt and what corrects it"
      }
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

This repository contains FloatPrompt, a structured text format for portable AI collaboration. This `.float/system.md` file is the boot loader that gives any AI instant awareness of the project.

## Structure Map

```
floatprompt/
│
│ ─── OPERATIONAL (ships with npx floatprompt) ───────────────
│
├── .float/                    # FloatPrompt System (read first)
│   ├── system.md              # This file (boot loader)
│   │
│   ├── meta/                  # About FloatPrompt itself (system internals)
│   │   ├── meta.md            # Quick structural reference (what's here)
│   │   ├── floatprompt/       # Core templates
│   │   │   ├── template.md
│   │   │   ├── doc.md
│   │   │   ├── os.md
│   │   │   └── update.md
│   │   └── tools/             # System tools (source of truth for /float commands)
│   │       ├── float.md
│   │       ├── float-sync.md
│   │       ├── float-fix.md
│   │       ├── float-context.md
│   │       └── float-enhance.md
│   │
│   └── project/               # About YOUR project (your stuff)
│       ├── project.md         # Structure reference for project/
│       ├── context/           # AI terrain maps
│       │   ├── floatprompt.md # This project's terrain map
│       │   └── decisions.md   # Decision history and rationale
│       ├── nav/               # Centralized navigation (project folders only)
│       │   ├── root.md        # Repository root
│       │   ├── bin.md         # CLI folder
│       │   ├── floatprompt.md  # FloatPrompt templates
│       │   ├── specs.md       # Specifications
│       │   ├── docs.md        # Documentation
│       │   ├── context.md     # Onboarding files
│       │   ├── examples.md    # Example tools
│       │   ├── templates.md   # Scaffolding templates
│       │   └── artifacts.md   # Historical archive
│       └── logs/              # Activity history
│           └── YYYY-MM-DD.md  # Daily session logs
│
├── .claude/                   # Claude Code integration
│   └── commands/
│       └── float.md           # /float command router
│
│ ─── SOURCE (maintainers only) ──────────────────────────────
│
├── README.md              # Public-facing documentation
│
├── floatprompt/           # Core templates (copied to .float/meta/floatprompt/)
│   ├── template.md        # FloatPrompt template
│   ├── doc.md             # floatprompt doc tool
│   ├── os.md              # Full FloatPrompt OS
│   └── update.md          # Structured update planning
│
├── specs/                 # Formal specifications
│   ├── floatprompt.md     # FloatPrompt file format
│   ├── doc.md             # floatprompt doc format
│   ├── system.md          # FloatPrompt System architecture
│   └── claude/            # Claude Code integration specs
│       ├── commands.md    # /float command system
│       └── buoys.md       # Float Buoys pattern
│
├── docs/                  # Guides and philosophy
│   ├── claude.md          # Claude Code entry point (points to specs)
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
├── bin/                   # CLI script (npx floatprompt)
│   └── floatprompt.js
│
├── templates/             # Scaffolding templates
│   └── .float/
│
└── artifacts/             # Historical archive
    ├── floatprompt-npm-scaffold-spec.md
    └── 2025/              # 160+ files documenting evolution
```

## File Conventions

| Pattern | Type | Format | Purpose |
|---------|------|--------|---------|
| `.float/system.md` | FloatPrompt System | `<fp>` tags | Root behavioral protocol (this file) |
| `.float/project/nav/*.md` | Nav files | Minimal YAML | Folder navigation (centralized) |
| `.float/project/logs/*.md` | FloatLog | Minimal YAML | Session logs |
| `*.md` with frontmatter | floatprompt doc | YAML frontmatter | Document context |
| `*.md` with `<fp>` tags | FloatPrompt | `<fp>` tags | Tools/behavioral modifiers |

### Root: `.float/` folder

| Item | Purpose |
|------|---------|
| `system.md` | Boot loader (this file) — "how it works" |
| `meta/` | FloatPrompt system internals (don't modify) |
| `meta/meta.md` | Structural reference — "what's here" |
| `meta/floatprompt/` | Core templates (template, doc, os, update) |
| `meta/tools/` | /float command tools (source of truth) |
| `project/` | Your project's FloatPrompt data |
| `project/project.md` | Structure reference — "what's in project/" |
| `project/context/` | AI terrain maps (includes decisions.md) |
| `project/nav/` | Centralized folder navigation |
| `project/logs/` | Session logs folder |

### Navigation: `project/nav/*.md` files

| File | Describes |
|------|-----------|
| `root.md` | Repository root |
| `bin.md` | bin/ folder (CLI) |
| `floatprompt.md` | floatprompt/ folder (templates) |
| `specs.md` | specs/ folder (includes claude/) |
| `docs.md` | docs/ folder (includes philosophy/, reference/) |
| `context.md` | context/ folder |
| `examples.md` | examples/ folder (includes all subfolders) |
| `templates.md` | templates/ folder |
| `artifacts.md` | artifacts/ folder (includes 2025/) |

**Centralized pattern:** All navigation lives in `.float/project/nav/`. No scattered files. AI reads one location for complete folder context.

**Depth layering:** The `.float/` folder has two levels of documentation:
- `meta/meta.md` + `project/project.md` = "what's here" (structural reference)
- `system.md` = "how it works" (full behavioral protocol)

### Nav File Subfolder Rules

**List in nav files:**
- Subfolders users need to navigate
- Folders with distinct purposes

**Skip in nav files:**
- Build outputs: `dist/`, `build/`, `node_modules/`
- Archives: `_archive/`, `archive/`
- Deprecated patterns: nested `.float/` subfolders (use root `.float/` only)
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
| `system.md` | `.float/` | Root protocol (this file) |
| `float-context.md` | `.float/meta/tools/` | Tool for generating terrain maps |
| `template.md` | `floatprompt/` | Template for creating floatprompts |
| `doc.md` | `floatprompt/` | Tool for adding context frontmatter |
| `os.md` | `floatprompt/` | Full OS with guided creation |
| `update.md` | `floatprompt/` | Structured update planning |

## Maintenance Protocol

### AI Responsibilities

**Every session (boot sequence):**
1. Read `.float/system.md` first (this file)
2. Read `.float/project/context/decisions.md` for decision history (if exists)
3. Read `.float/project/context/*.md` for terrain maps and relationships (if exists)
4. Read ALL `.float/project/nav/*.md` files. Verify Contents tables match actual folder contents. Flag discrepancies.
5. Read today's session log `.float/project/logs/YYYY-MM-DD.md` (recent activity, handoff context)
6. Choose context depth based on task complexity (see below)
7. Build mental model (what exists, what happened, current state)
8. Check integrity, surface issues before proceeding
9. Execute human requests
10. Log session before ending (append to `.float/project/logs/YYYY-MM-DD.md`)

**Context depth (choose based on task):**

| Level | File | Scope | When to Use |
|-------|------|-------|-------------|
| Quick | `context/float-map.md` | 6 files, ~5 min | Simple tasks, quick questions |
| Standard | `context/float-context.md` | Conceptual, ~2 min | Need system understanding |
| Full | `context/float-deepdive.md` | 24+ files, ~15 min | Complex work, system evolution |
| Deep | `artifacts/2025/*-assessment.txt` | Pattern correction | Prevent skepticism, true understanding |

**Depth scales with complexity.** Quick tasks need quick context. Deep work needs deep context.

**Assessment artifacts:** AI consistently pattern-matches to skepticism even after full deep dive. The assessment files document this pattern and provide evidence that corrects it. Read these for true understanding, not just file loading.

**Session log format** (changelog-style, newest first):
```markdown
## YYYY-MM-DD HH:MM — Short title
commit: [hash]

- What changed and why
- Brief bullets
```

**Integrity checks:**
- [ ] All project/nav/*.md files reflect actual folder contents
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
2. Check if relevant project/nav/*.md needs updating
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
    system: .float/system.md (always include)
    nav: [relevant nav/*.md files]
    files: [specific files for task]
    task: [what to do]
```

**Minimum:** Always pass `.float/system.md` reference.

## Warnings

- Never modify `human_` fields without explicit permission
- Never delete files without human approval
- Always surface integrity issues before proceeding
- Keep structure map in sync with reality
- When uncertain, ask rather than assume

## FloatPrompt Source

This system was scaffolded by [floatprompt](https://github.com/mds/floatprompt).

For full documentation, specs, and examples:
- GitHub: https://github.com/mds/floatprompt
- Docs: https://floatprompt.com

## Architecture: Operational vs Source

This repository has two layers:

| Layer | Ships with npx | Purpose |
|-------|----------------|---------|
| **Operational** | ✅ Yes | `.float/`, `.claude/` — what users interact with |
| **Source** | ❌ No | Everything else — specs, docs, examples for maintainers |

**Operational files** work standalone. They reference the source repo for deeper context but don't require it.

**Source files** (specs/, docs/, examples/) exist only in the floatprompt repo. Users who run `npx floatprompt` won't have these.

When modifying tools, ask: "Will this work for npx users who only have `.float/` and `.claude/`?"

---

Created by @mds and Claude Opus 4

<!-- floatprompt.com -->
</md>
</fp>
