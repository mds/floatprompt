---
title: Claude Code Integration
type: reference
status: active
created: 2025-12-28

human_author: @mds
human_intent: Document the Claude Code integration for FloatPrompt System maintenance
human_context: How /float commands work with the FloatPrompt System

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Updated for v0.8.0 — specs moved to specs/claude/, docs/ now contains guides only.
  Full command spec: specs/claude/commands.md
  Buoy pattern spec: specs/claude/buoys.md
---

# Claude Code Integration

Claude Code integration for the FloatPrompt System.

**Full specifications:**
- [Command System](../specs/claude/commands.md)
- [Buoy Pattern](../specs/claude/buoys.md)

---

## Overview

The FloatPrompt System uses a centralized `.float/` folder to maintain AI-readable context about your project. This integration:

1. **Boots** the FloatPrompt System at session start
2. **Syncs** `.float/project/nav/` files when they drift from reality

No daemon. No npm install. Just slash commands.

---

## Commands

### /float

Boot the FloatPrompt System and run a quick health check.

```
/float
```

**What it does:**
1. Reads `.float/system.md` (boot protocol)
2. Reads all `.float/project/nav/*.md` files (centralized navigation)
3. Builds mental model of the project
4. Counts any integrity issues
5. Reports status

**Output (healthy):**
```
FloatPrompt operational.
Directory: /path/to/project
Status: No issues found
Ready for: [human direction]
```

**Output (issues detected):**
```
FloatPrompt operational.
Directory: /path/to/project
Status: 3 issues found

Run /float sync to see details and fix
```

**Output (new project — no FloatPrompt System yet):**
```
FloatPrompt initialized.
Directory: /path/to/project
Created:
  - .float/system.md
  - .float/project/nav/root.md
  - .float/project/nav/src.md
  - .float/project/nav/docs.md
  - .float/project/logs/
  ...

FloatPrompt operational.
Status: No issues found
Ready for: [human direction]
```

---

### /float sync

Full integrity check with fix capability. Shows issues, proposes changes, applies on approval.

```
/float sync
```

**What it does:**
1. Checks all `.float/project/nav/*.md` tables against actual folder contents
2. Checks subfolder tables against actual subfolders
3. Checks structure map in `.float/system.md`
4. Shows detailed issues
5. Proposes fixes
6. Waits for approval
7. Spawns buoys (fleet) to apply changes
8. Logs activity

**Output:**
```
FloatPrompt sync
Directory: /path/to/project

Checking integrity...

✓ .float/system.md — OK
✓ .float/project/nav/root.md — OK
✗ .float/project/nav/docs.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)

Found 2 issues in 1 file.

Proposed changes:

.float/project/nav/docs.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

Apply changes? (y/n):
```

**If you say 'n':** No changes made. You got your inspection.

**If you say 'y':** Fleet spawns in parallel, buoys apply changes, log activity.

**After sync completes:** Check for incomplete descriptions.

```
Checking descriptions...
Found 23 items with [needs description]:
  - src.md: 18 files
  - components.md: 5 files

Fill in descriptions now? (y/n):
```

If 'y': Describe Buoys read each file and generate descriptions.
If 'n': "Descriptions skipped. Run /float enhance anytime to fill them in."

---

### /float enhance

Fill in `[needs description]` placeholders and improve content quality.

```
/float enhance
```

Scans all `.float/project/nav/*.md` files for `[needs description]` and weak content, spawns Describe Buoys to read each file and generate descriptions, then updates the nav tables.

Can be run independently anytime — not just after sync.

---

## Buoy Orchestration

**Buoys are Task agents.** Each buoy is spawned via Claude Code's Task tool, allowing parallel execution across your directory. A collection of buoys working together is a **fleet**.

| Buoy | Purpose | Model |
|------|---------|-------|
| **Nav Buoy** | Add/remove rows in project/nav/*.md tables | general-purpose |
| **System Buoy** | Update structure map | general-purpose |
| **Scaffold Buoy** | Create missing `.float/project/nav/*.md` | general-purpose |
| **Describe Buoy** | Generate file descriptions | haiku |
| **Log Buoy** | Record activity to logs | general-purpose |

**Parallel execution:** Multiple buoys spawn simultaneously. If 10 files need descriptions, multiple Describe Buoys work in parallel.

```
Spawning fleet...
  → Nav Buoy (x3): nav/docs.md, nav/src.md, nav/tests.md
  → Describe Buoy (x4): batch of files
  → Scaffold Buoy: creating nav/newfeature.md

Fleet complete.
  → Log Buoy: Recording activity

Sync complete.
```

---

## The Flow

```
/float        → Boot → "3 issues detected"
                          ↓
/float sync   → Details → Approval → Fleet → Done
```

Two commands. Simple.

---

## Files

| File | Purpose |
|------|---------|
| `.claude/commands/float.md` | The command definition |
| `artifacts/float-buoys-commands-spec.md` | Full specification |
| `artifacts/float-buoys-context.md` | Design decisions and rationale |

---

## What Gets Checked

| Check | Description |
|-------|-------------|
| Nav coverage | Every major folder has a `project/nav/*.md` file |
| Table accuracy | File tables match actual folder contents |
| Subfolder accuracy | Subfolder tables match actual subfolders |
| Structure map | `.float/system.md` structure map matches reality |
| Orphaned files | Files exist but aren't in any nav file |
| Missing files | Nav references files that don't exist |

**Exclusions (not flagged as issues):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `.float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files

---

## Architecture

The FloatPrompt System (v0.9.0) uses **meta/project separation**:

```
.float/
├── system.md          # Boot loader
├── meta/              # FloatPrompt internals (don't modify)
│   ├── core/          # Templates
│   └── tools/         # /float command tools
└── project/           # Your project's data
    ├── context/       # Terrain maps
    ├── nav/           # Folder navigation
    │   ├── root.md
    │   ├── docs.md
    │   └── src.md
    └── logs/          # Session logs
        └── YYYY-MM-DD.md
```

**Why this structure?**
- meta = don't touch (system files)
- project = your stuff
- Instant clarity from folder names

---

## Status

**Current:** Specification complete, command file implemented.

**Testing:** Being validated on the floatprompt repo itself.

**Roadmap:**
- Test in other repositories
- Refine buoy behavior based on real usage
- Consider daemon approach if real-time sync proves necessary (see `float-buoys-daemon-spec.md`)

---

## Related

- **[specs/system.md](../specs/system.md)** — Full FloatPrompt System architecture
- **[specs/doc.md](../specs/doc.md)** — floatprompt doc YAML frontmatter format
- **[specs/floatprompt.md](../specs/floatprompt.md)** — FloatPrompt tool format

---

© 2025 @MDS
