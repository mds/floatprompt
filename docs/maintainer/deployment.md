---
title: Deployment Architecture
type: guide
status: current
created: 2025-12-30

human_author: @mds
human_intent: Document how FloatPrompt deploys from source to user projects
human_context: Critical for maintainers to understand the source → package → deploy chain

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  Created to fill documentation gap — no prior doc explained deployment.
  This is the "how it ships" documentation.
---

# Deployment Architecture

How FloatPrompt goes from source repository to user projects via `float init`.

---

## The Chain

```
SOURCE (this repo)                   PACKAGE (npm)           USER PROJECT
─────────────────                   ─────────────           ────────────
templates/.float/core/tools/*.md →  bin/floatprompt.js  →   .float/core/tools/*.md
templates/.float/core/format/*.md → copies from source  →   .float/core/format/*.md
templates/.float/float-system.md       →  scaffolding         →   .float/float-system.md
.claude/commands/                →  copies directly     →   .claude/commands/*.md
```

---

## Source of Truth

**templates/.float/ IS the product.** This is what ships to users.

| Content | Source Location | Deployed To |
|---------|-----------------|-------------|
| /float command tools | `templates/.float/core/tools/*.md` | `.float/core/tools/*.md` |
| Tool type templates | `templates/.float/core/tools/types/*.md` | `.float/core/tools/types/*.md` |
| Format templates | `templates/.float/core/format/*.md` | `.float/core/format/*.md` |
| System boot loader | `templates/.float/float-system.md` | `.float/float-system.md` |
| Nav root template | `templates/.float/project/nav/root.md` | `.float/project/nav/root.md` |
| Command wrappers | `.claude/commands/*.md` | `.claude/commands/*.md` |
| Tool building guide | `templates/.float/core/tools/manual.md` | `.float/core/manual.md` |

**Key insight:** `templates/.float/` is THE source of truth. What's there is what ships. `system/` contains documentation and guides only (doesn't ship).

---

## bin/floatprompt.js

The deployment script that runs when users execute `float init` or `float update`.

### What It Does

**Init mode** (no `.float/` exists):
1. Creates `.float/` folder structure
2. Copies tools from `templates/.float/core/tools/` → `.float/core/tools/`
3. Copies format templates from `templates/.float/core/format/` → `.float/core/format/`
4. Copies boot loader from `templates/.float/float-system.md`
5. Creates empty `project-decisions.md` in context/
6. Copies Claude commands to `.claude/commands/`

**Update mode** (`float update`):
1. Updates tools (preserves user's nav, logs, context)
2. Updates format templates
3. Updates Claude commands
4. Writes version file

### Critical Arrays

The script has hardcoded file lists that MUST be updated when adding tools:

```javascript
// Tools deployed to .float/core/tools/
const toolFiles = [
  'float.md', 'float-sync.md', 'float-context.md',
  'float-enhance.md', 'float-fix.md', 'float-build.md',
  'float-harvest.md', 'float-delta.md', 'float-focus.md',
  'float-relate.md', 'float-report.md',
  'update.md', 'tool-sync.md'
];

// Commands deployed to .claude/commands/
const commandFiles = [
  'float.md', 'float-sync.md', 'float-fix.md',
  'float-context.md', 'float-enhance.md', 'float-build.md',
  'float-harvest.md', 'float-delta.md', 'float-focus.md',
  'float-relate.md', 'float-report.md'
];
```

**When adding a new tool:**
1. Create tool in `system/tools/`
2. Create command wrapper in `.claude/commands/`
3. Add to BOTH arrays in `bin/floatprompt.js`
4. Update `package.json` files array if needed

---

## package.json

Defines what gets published to npm:

```json
{
  "files": [
    "bin/",
    "templates/",
    ".claude/"
  ]
}
```

**Only these folders ship with the npm package.** Everything else (docs, examples, specs, artifacts) stays in the repo.

**templates/.float/ IS the product.** No duplication needed.

---

## templates/ Folder

**templates/.float/ IS the product.** This is what ships to user projects.

```
templates/
└── .float/
    ├── system.md              # Boot loader
    ├── core/
    │   ├── index.md           # Structure reference
    │   ├── tools/             # ALL /float command tools
    │   │   ├── float.md
    │   │   ├── float-sync.md
    │   │   ├── float-fix.md
    │   │   ├── ...
    │   │   ├── manual.md      # Tool building guide
    │   │   └── types/         # Tool type templates
    │   └── format/            # Format templates
    │       ├── template.md
    │       ├── doc.md
    │       └── os.md
    └── project/
        ├── project.md         # Project reference template
        └── nav/
            └── root.md        # Root nav template
```

**Source of truth:** Edits to tools go HERE. No duplication.

---

## Adding a New Tool

Complete checklist:

### 1. Create the Tool
```bash
# Create tool implementation in templates (source of truth)
touch templates/.float/core/tools/float-newtool.md
```

### 2. Create Command Wrapper
```bash
# Create thin wrapper that routes to tool
touch .claude/commands/float-newtool.md
```

Wrapper content:
```markdown
# /float-newtool

[Description]

Read and execute `.float/core/tools/float-newtool.md`
```

### 3. Update Deployment Script
```javascript
// In bin/floatprompt.js, add to both arrays:
const toolFiles = [..., 'float-newtool.md'];
const commandFiles = [..., 'float-newtool.md'];
```

### 4. Update package.json (if needed)
Usually not needed — `system/tools/` is already included.

### 5. Update Documentation
- Add to `system/reference/commands.md`
- Add to `system/guides/integration.md`
- Update `.float/float-system.md` structure map if visible to users

### 6. Validate
```bash
/float-tools    # Check tool consistency
node bin/floatprompt.js --help  # Verify script runs
```

---

## User Project Structure

What users get after `float init`:

```
user-project/
├── .float/
│   ├── system.md                    # Boot loader
│   ├── .version                     # Installed version
│   ├── core/
│   │   ├── index.md                 # Structure reference
│   │   ├── manual.md                # Tool building guide
│   │   ├── format/                  # Format templates
│   │   │   ├── template.md
│   │   │   ├── doc.md
│   │   │   └── os.md
│   │   └── tools/                   # /float command tools
│   │       ├── float.md
│   │       ├── float-sync.md
│   │       └── ...
│   └── project/
│       ├── context/
│       │   └── decisions.md         # Decision history
│       ├── nav/
│       │   └── root.md              # Root navigation
│       └── logs/
│           └── .gitkeep
└── .claude/
    └── commands/
        ├── float.md
        ├── float-sync.md
        └── ...
```

---

## Version Management

### Checking Installed Version
```bash
cat .float/.version
```

### Updating
```bash
float update
```

### What Gets Updated
- `.float/core/tools/*` — All tool implementations
- `.float/core/format/*` — Format templates
- `.float/core/manual.md` — Tool building guide
- `.float/core/index.md` — Structure reference
- `.claude/commands/*` — Command wrappers

### What Gets Preserved
- `.float/project/nav/*` — User's navigation files
- `.float/project/logs/*` — Session history
- `.float/project/context/*` — Terrain maps, decisions
- `.float/float-system.md` — User may have customized

---

## Troubleshooting

### Tool Not Available After Adding
Check both arrays in `bin/floatprompt.js` — tool must be in both `toolFiles` and `commandFiles`.

### Command Works in Repo But Not User Project
Check `package.json` files array — source folder must be included.

### Version Mismatch
Run `float update` to sync.

### Missing Files After Init
Check `templates/` folder has all required scaffolding files.

---

*Deployment architecture for FloatPrompt maintainers*
