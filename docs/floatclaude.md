---
title: FloatClaude
type: reference
status: active
created: 2025-12-28

human_author: MDS
human_intent: Document the Claude Code integration for FloatSystem maintenance
human_context: How /float commands work with FloatSystem

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Updated for centralized architecture (v0.6.0) — nav/*.md instead of scattered _float.md
---

# FloatClaude

Claude Code integration for FloatSystem. Two commands that keep your `_float/` files accurate.

---

## Overview

FloatSystem uses a centralized `_float/` folder to maintain AI-readable context about your project. FloatClaude is the Claude Code integration that:

1. **Boots** FloatSystem at session start
2. **Syncs** `_float/nav/` files when they drift from reality

No daemon. No npm install. Just slash commands.

---

## Commands

### /float

Boot FloatSystem and run a quick health check.

```
/float
```

**What it does:**
1. Reads `_float/system.md` (boot protocol)
2. Reads all `_float/nav/*.md` files (centralized navigation)
3. Builds mental model of the project
4. Counts any integrity issues
5. Reports status

**Output (healthy):**
```
FloatSystem: BOOTED
Directory: /path/to/project
Status: No issues found
Ready for: [human direction]
```

**Output (issues detected):**
```
FloatSystem: BOOTED
Directory: /path/to/project
Status: 3 issues found

Run /float sync to see details and fix
```

**Output (new project — no FloatSystem yet):**
```
FloatSystem: INITIALIZED
Directory: /path/to/project
Created:
  - _float/system.md
  - _float/nav/root.md
  - _float/nav/src.md
  - _float/nav/docs.md
  - _float/logs/
  ...

FloatSystem: BOOTED
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
1. Checks all `_float/nav/*.md` tables against actual folder contents
2. Checks subfolder tables against actual subfolders
3. Checks structure map in `_float/system.md`
4. Shows detailed issues
5. Proposes fixes
6. Waits for approval
7. Spawns "buoys" to apply changes
8. Logs activity

**Output:**
```
FloatSystem Sync
Directory: /path/to/project

Checking integrity...

✓ _float/system.md — OK
✓ _float/nav/root.md — OK
✗ _float/nav/docs.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)

Found 2 issues in 1 file.

Proposed changes:

_float/nav/docs.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

Apply changes? (y/n):
```

**If you say 'n':** No changes made. You got your inspection.

**If you say 'y':** Buoys spawn in parallel, apply changes, log activity.

---

## Buoy Orchestration

**Buoys are Task agents.** Each buoy is spawned via Claude Code's Task tool, allowing parallel execution across your directory.

| Buoy | Purpose | Model |
|------|---------|-------|
| **Nav Buoy** | Add/remove rows in nav/*.md tables | general-purpose |
| **System Buoy** | Update structure map | general-purpose |
| **Scaffold Buoy** | Create missing `_float/nav/*.md` | general-purpose |
| **Describe Buoy** | Generate file descriptions | haiku |
| **Log Buoy** | Record activity to logs | general-purpose |

**Parallel execution:** Multiple buoys spawn simultaneously. If 10 files need descriptions, multiple Describe Buoys work in parallel.

```
Spawning buoys...
  → Nav Buoy (x3): nav/docs.md, nav/src.md, nav/tests.md
  → Describe Buoy (x4): batch of files
  → Scaffold Buoy: creating nav/newfeature.md

All buoys complete.
  → Log Buoy: Recording activity

Sync complete.
```

---

## The Flow

```
/float        → Boot → "3 issues detected"
                          ↓
/float sync   → Details → Approval → Buoys → Done
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
| Nav coverage | Every major folder has a `nav/*.md` file |
| Table accuracy | File tables match actual folder contents |
| Subfolder accuracy | Subfolder tables match actual subfolders |
| Structure map | `_float/system.md` structure map matches reality |
| Orphaned files | Files exist but aren't in any nav file |
| Missing files | Nav references files that don't exist |

**Exclusions (not flagged as issues):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files

---

## Architecture

FloatSystem v0.6.0 uses **centralized navigation**:

```
_float/
├── system.md          # Boot loader
├── nav/               # All folder navigation here
│   ├── root.md        # Repository root
│   ├── docs.md        # docs/ folder (includes subfolders)
│   ├── src.md         # src/ folder
│   └── ...            # One file per major folder
└── logs/
    └── YYYY-MM-DD.md  # Session logs
```

**Why centralized?**
- AI reads one location for complete context
- Project folders stay clean (no scattered `_float.md` files)
- Easier to maintain (all nav in one place)

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

- **floatsystem.md** — Full FloatSystem architecture
- **floatdoc.md** — FloatDoc YAML frontmatter format
- **floatprompt.md** — FloatPrompt tool format

---

© 2025 @MDS
