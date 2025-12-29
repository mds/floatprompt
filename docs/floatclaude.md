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
ai_notes: Initial documentation of the /float command system
---

# FloatClaude

Claude Code integration for FloatSystem. Two commands that keep your `_float/` files accurate.

---

## Overview

FloatSystem uses `_float/` folders to maintain AI-readable context about your project. FloatClaude is the Claude Code integration that:

1. **Boots** FloatSystem at session start
2. **Syncs** `_float/` files when they drift from reality

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
2. Traverses all `_float/index.md` files
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
  - _float/index.md
  - _float/logs/
  - src/_float/index.md
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
1. Checks all `_float/index.md` tables against actual folder contents
2. Checks folder tables against actual subfolders
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
✓ _float/index.md — OK
✗ docs/_float/index.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)

Found 2 issues in 1 file.

Proposed changes:

docs/_float/index.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

Apply changes? (y/n):
```

**If you say 'n':** No changes made. You got your inspection.

**If you say 'y':** Buoys apply changes, descriptions generated, activity logged.

---

## Buoys

Sync spawns specialized agents called "buoys" for each task type:

| Buoy | Purpose | AI? |
|------|---------|-----|
| **Index Buoy** | Add/remove rows in file tables | No |
| **System Buoy** | Update structure map | No |
| **Scaffold Buoy** | Create missing `_float/index.md` | Minimal |
| **Describe Buoy** | Generate file descriptions | Yes (Haiku) |
| **Log Buoy** | Record activity to logs | No |

Most operations are pure file manipulation. AI is only used for generating descriptions of new files.

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
| Index coverage | Every folder has `_float/index.md` |
| Table accuracy | File tables match actual folder contents |
| Folder accuracy | Folder tables match actual subfolders |
| Structure map | `_float/system.md` structure map matches reality |
| Orphaned files | Files exist but aren't in any index |
| Missing files | Index references files that don't exist |

**Exclusions (not flagged as issues):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` subfolders themselves
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files

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
