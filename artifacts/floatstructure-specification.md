---
title: FloatStructure Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define the root OS architecture for FloatSystem
human_context: Folder structure, core files, behavioral hierarchy, and the pilot principle

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Comprehensive spec for FloatSystem as an invisible OS for AI. Core document.
---

# FloatStructure Specification

**Version:** 0.1.0 (Draft)

## The Vision

**FloatPrompt is the invisible OS for AI.**

Feed a single `system.md` file to any AI. It boots up, penetrates the folder structure, builds rich context, and becomes aware of everything—what exists, how it connects, what's healthy, what needs attention.

**One file turns the lights on.**

Text files are the binary of AI. The atomic unit of machine understanding.

---

## The Pilot Principle

**Human = Pilot. AI = Crew.**

| Role | Human | AI |
|------|-------|-----|
| **Decides** | ✓ | |
| **Approves** | ✓ | |
| **Sets direction** | ✓ | |
| **Creates files** | | ✓ |
| **Writes documentation** | | ✓ |
| **Maintains index.md** | | ✓ |
| **Updates frontmatter** | | ✓ |
| **Scaffolds folders** | | ✓ |
| **Logs sessions** | | ✓ |
| **Flags issues** | | ✓ |
| **Fixes issues** | | ✓ (with approval) |

**Human decides. AI executes.**

The human is the decision-maker and pilot, not the file creator or note taker. AI does almost all of the heavy lifting:
- File creation
- Documentation
- Building and maintaining index.md files
- Updating frontmatter
- Scaffolding new folders
- Writing behavior.md files
- Logging sessions
- Maintaining system health

The human:
- Sets direction
- Makes decisions
- Approves changes
- Reviews AI work

**This is the core contract of FloatSystem.**

---

## The Six Components

| Component | File/Pattern | Purpose | Format |
|-----------|--------------|---------|--------|
| **FloatStructure** | Root architecture | Overall OS | — |
| **FloatFolder** | Any folder with index.md | Folder pattern | — |
| **FloatSystem** | `system.md` | Boot loader, root behavioral | `<fp>` tags |
| **FloatIndex** | `index.md` | Folder navigation | Minimal YAML |
| **FloatDoc** | `*.md` | Document context | Full YAML frontmatter |
| **FloatPrompt** | `*.md` | Tools, behavioral modifiers | `<fp>` tags |
| **FloatLog** | `sessions/` | Activity history | Session YAML |

Plus:
- **behavior.md** — Subfolder behavioral modifier (optional)
- **.float/** — Hidden config and templates (optional)

---

## Root Structure

### Core (Always Exist)

```
/
├── system.md           # Boot loader, root behavioral
├── index.md            # Root navigation
└── sessions/           # Activity log
    └── index.md
```

These three are sacred. Every FloatSystem has them.

### Full Structure (With Optional Components)

```
/
├── system.md           # Root behavioral (CORE)
├── index.md            # Root navigation (CORE)
├── sessions/           # Activity log (CORE)
│   └── index.md
│
├── .float/             # Hidden config (OPTIONAL)
│   ├── config.md       # Preferences, settings
│   └── templates/      # Scaffolding templates
│       ├── project.md
│       ├── journal.md
│       └── research.md
│
├── projects/           # Work folders (SUGGESTED)
│   ├── index.md
│   └── my-project/
│       ├── index.md
│       ├── behavior.md # Folder-specific rules (OPTIONAL)
│       ├── sessions/   # Project-level logs (OPTIONAL)
│       └── docs/
│           └── index.md
│
├── users/              # Team members (SUGGESTED for teams)
│   ├── index.md
│   ├── mds/
│   │   └── index.md
│   └── lillian/
│       └── index.md
│
└── shared/             # Shared resources (OPTIONAL)
    ├── index.md
    ├── tools/          # Team floatprompts
    └── assets/         # Common files
```

---

## FloatFolder

**A FloatFolder is any folder with an index.md.**

```
any-folder/
├── index.md           # Required — makes it a FloatFolder
├── behavior.md        # Optional — folder-specific rules
├── sessions/          # Optional — folder-level logging
└── [contents]         # Files and subfolders
```

**Minimum:** `index.md`

**Optional additions:**
- `behavior.md` — extends/overrides root system.md for this folder
- `sessions/` — local activity logging (for high-activity folders)

**Every folder in FloatStructure should be a FloatFolder.** AI creates and maintains index.md for each folder.

**Nesting:** FloatFolders can contain FloatFolders. Each has its own index.md. Behavior cascades from parent to child.

```
projects/                    # FloatFolder
├── index.md
└── website-redesign/        # FloatFolder (nested)
    ├── index.md
    ├── behavior.md          # Optional local rules
    └── docs/                # FloatFolder (nested)
        └── index.md
```

---

## File Specifications

### system.md (Root Behavioral)

One per project. Lives at root. Boot loader for AI.

**Format:** FloatPrompt (`<fp>` tags)

```markdown
<fp>
<json>
{
  "STOP": "FloatSystem Protocol. Read this first...",
  "meta": { "title": "FloatSystem", "format": "floatprompt" },
  "human": { "author": "", "intent": "" },
  "ai": { "role": "System navigator and maintainer" },
  "requirements": {
    "pilot_principle": "Human decides, AI executes",
    "boot_sequence": { ... },
    "maintenance": { ... }
  }
}
</json>
<md>
# Structure Map
# File Conventions
# Maintenance Protocol
</md>
</fp>
```

**Contains:**
- Structure map (folder tree)
- File conventions
- Behavioral rules
- Maintenance protocol
- Boot sequence

### index.md (Folder Navigation)

One per folder. Minimal. Just enough to map contents.

**Format:** Minimal YAML frontmatter

```yaml
---
title: Folder Name
type: index
status: current
ai_updated: 2025-12-28
---

# Folder Name

Brief description.

## Contents

- **file.md** — description
- **subfolder/** — description
```

**Fields:** 4 (title, type, status, ai_updated)

Lean. AI maintains it.

### floatdoc (Document Context)

Any .md file with frontmatter. Full context.

**Format:** Full YAML frontmatter

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

# Document content
```

**Fields:** 10 (full spec)

### behavior.md (Subfolder Behavioral)

Optional. Extends/overrides root system.md for specific folder.

**Format:** YAML frontmatter + rules

```yaml
---
title: Project Behavior
type: behavior
extends: ../system.md
---

# Folder-Specific Rules

This folder has additional constraints:

- All docs require `status: reviewed` before complete
- AI should flag any file older than 14 days
- Use formal tone in all outputs

## Custom Conventions

- Files named `draft-*` are work in progress
- Files in `archive/` should not be modified
```

AI reads root `system.md` first, then checks for local `behavior.md` and applies both.

### sessions/ (Activity Log)

One at root (required). Optional in subfolders for project-level logging.

**Structure:**
```
sessions/
├── index.md
├── 2025-12-28.md
└── 2025-12-29.md
```

**Session log format:**
```yaml
---
title: Session 2025-12-28
type: session
created: 2025-12-28
ai_model: Claude Opus 4
ai_updated: 2025-12-28
---

## Summary
Brief description.

## Activity
- [x] Action taken
- [x] Another action

## Files Modified
| File | Action |
|------|--------|
| /docs/guide.md | Created |

## Handoff Notes
Context for next session.
```

### .float/ (Hidden Config)

Optional. For power users who want templates and config.

```
.float/
├── config.md           # Preferences, settings
└── templates/          # Scaffolding templates
    ├── project.md
    ├── journal.md
    └── research.md
```

Most users skip this. AI can scaffold without it.

---

## The Penetration Sequence

When AI receives `system.md`:

```
1. Read system.md
   → Understand behavioral rules
   → Load structure map

2. Follow map to each index.md
   → Understand folder purposes
   → See file listings

3. Skim floatdoc frontmatter
   → Understand each document
   → Note status, intent, relationships

4. Read recent session logs
   → Understand recent activity
   → See pending issues
   → Get handoff context

5. Build mental model
   → Full project awareness
   → Lightweight, in memory

6. Ready for any task
   → Complete context
   → Can navigate intelligently

7. Monitor and maintain
   → Flag issues
   → Suggest updates
   → Keep system healthy

8. Log session before ending
   → Record activity
   → Update sessions/index.md
   → Leave handoff notes
```

**Result:** Extremely rich context. Minimal token footprint. Full audit trail.

---

## Token Efficiency

Structure IS compression.

| Component | Tokens (approx) |
|-----------|-----------------|
| system.md | 300-500 |
| index.md (per folder) | 30-50 |
| floatdoc frontmatter | 40-60 |
| session log (recent) | 50-150 |
| behavior.md | 50-100 |

**Example: 10-folder project, 50 files**
- 1 system.md: 400 tokens
- 10 index.md: 400 tokens
- 50 frontmatters: 2000 tokens (skimmed)
- 3 recent sessions: 300 tokens

**~3100 tokens = complete project awareness + recent history**

Deep dive only when task requires.

---

## Scaffolding

AI creates folder structures on human request.

**Human:** "Create a new project for the website redesign"

**AI:**
1. Creates `/projects/website-redesign/`
2. Creates `index.md` with frontmatter
3. Creates suggested subfolders (docs/, assets/, archive/)
4. Creates `index.md` in each subfolder
5. Logs activity in `/sessions/`
6. Updates root `index.md`
7. Reports back: "Project scaffolded. Ready to use."

**Human approves.** AI executes.

### Template-Based Scaffolding (Optional)

If `.float/templates/` exists, AI uses templates:

```markdown
<!-- .float/templates/project.md -->
---
title: Project Template
type: template
---

# Project Scaffold

## Folders
- docs/
- assets/
- archive/
- sessions/ (optional, for project-level logging)

## Files
- index.md (in each folder)
- behavior.md (optional)

## Conventions
- docs/ for documentation
- assets/ for files, images
- archive/ for completed/old items
```

If no templates exist, AI uses sensible defaults.

---

## Multi-User / Team Structure

For teams, suggested structure:

```
/
├── system.md
├── index.md
├── sessions/
│
├── users/
│   ├── index.md
│   ├── mds/
│   │   ├── index.md
│   │   └── drafts/
│   └── lillian/
│       ├── index.md
│       └── drafts/
│
├── projects/           # Shared projects
│   └── index.md
│
└── shared/             # Shared resources
    ├── tools/          # Team floatprompts
    └── assets/
```

**users/** is suggested for teams, not required.

Each user folder can have:
- Personal drafts
- Personal notes
- Personal behavior.md (preferences)

Shared work lives in `/projects/` or `/shared/`.

---

## Folder Naming

**Freeform.** No enforced convention.

All of these are valid:
- `my-project`
- `My Project`
- `myProject`
- `2025-12-28-meeting-notes`

AI handles whatever naming humans prefer.

---

## Behavioral Hierarchy

How behavioral rules cascade:

```
1. system.md (root)
   ↓ applies everywhere

2. behavior.md (folder-specific)
   ↓ extends/overrides for this folder

3. floatprompt (tool-specific)
   ↓ overrides for specific tool use
```

**Resolution:**
- Start with root `system.md` rules
- Layer folder `behavior.md` on top
- Apply tool-specific rules if using a floatprompt

More specific wins. But root rules always provide the foundation.

---

## Maintenance Protocol

### AI Responsibilities

**Every session:**
1. Read system.md first (boot)
2. Check integrity
3. Surface issues before proceeding
4. Execute human requests
5. Log session before ending

**Integrity checks:**
- All folders have index.md
- All index.md files reflect actual contents
- No broken internal links
- No orphaned files
- Structure map matches reality
- Stale files flagged (configurable threshold)

**When issues found:**
```
⚠️ FloatSystem Integrity Issues:

1. Missing index.md in /new-folder/
2. Stale: /docs/old.md (90 days)
3. Orphaned: /assets/unused.png not in any index

Suggested fixes:
- Create /new-folder/index.md
- Review /docs/old.md
- Add unused.png to /assets/index.md or delete

Proceed with fixes? (Human approval required)
```

### Human Responsibilities

- Approve structural changes
- Make decisions when AI flags issues
- Set direction for new work
- Review AI work periodically

---

## Summary

**FloatPrompt** = The invisible OS for AI

**Core (always):**
- `system.md` — boot loader
- `index.md` — navigation (every folder)
- `sessions/` — activity log

**Optional:**
- `behavior.md` — subfolder behavioral rules
- `.float/` — hidden config and templates

**Pilot Principle:**
- Human decides, AI executes
- AI does the heavy lifting
- Human approves changes

**Penetration:**
- 8-step sequence from boot to session log
- Rich context, minimal tokens

**Structure:**
- Freeform folder naming
- Suggested patterns for common use cases
- Multi-user ready with `/users/`

**Everything is .md.** Simple. Portable. Universal.

---

## Related Specifications

| Spec | Defines |
|------|---------|
| **FloatStructure** (this) | Root OS architecture |
| **FloatSystem** | system.md boot loader format |
| **FloatDoc** | Document frontmatter format |
| **FloatLog** | Session logging format |
| **FloatPrompt** | Tool/behavioral specification |

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
