# /float — FloatSystem Boot and Sync

The complete FloatSystem maintenance command. Two modes: boot (default) and sync.

## Routing

Parse `$ARGUMENTS` to determine action:

| Input | Action |
|-------|--------|
| `/float` | Boot + quick health check |
| `/float sync` | Full integrity check + fix with approval |

---

## /float (Boot + Health Check)

**Step 1: Check for existing FloatSystem**

Look for `_float/system.md` in the current working directory.

---

### If `_float/system.md` EXISTS → Boot Sequence

Execute the full orientation using local files:

1. **Read `_float/system.md`** — Load boot protocol, structure map, behavioral constraints
2. **Read `_float/index.md`** — Understand repository structure
3. **Traverse ALL `_float/index.md` files** — Note discrepancies (don't report details yet)
4. **Read today's session log** (`_float/logs/YYYY-MM-DD.md`) if it exists
5. **Choose context depth** based on task complexity (if context/ folder exists)
6. **Build mental model** — What exists, what happened, current state
7. **Quick integrity check** — Count issues only (see below)
8. **Report ready** — Summarize with issue count

**Quick Integrity Check (fast, no AI):**
- Count files in folders but not in index tables
- Count index references to files that don't exist
- Count folders without `_float/index.md`
- Skip: dotfiles, `_float/`, `node_modules/`, `.git/`, build folders
- Result: issue count only, no details

**Boot Output (healthy):**
```
FloatSystem: BOOTED
Directory: [path]
Status: No issues found
Ready for: [human direction]
```

**Boot Output (issues detected):**
```
FloatSystem: BOOTED
Directory: [path]
Status: [N] issues found

Run /float sync to see details and fix
```

---

### If `_float/system.md` DOES NOT EXIST → Init Sequence

Fetch the FloatSystem spec from GitHub, then create the architecture, then auto-boot.

1. **Fetch the spec** — Read these files from `https://github.com/mds/floatprompt`:
   - `_float/system.md` — Boot loader format and conventions
   - `_float/index.md` — Navigation format
   - `docs/floatsystem.md` — Full architecture documentation

2. **Scan the current repository** — Understand existing structure, identify all directories

3. **Create root `_float/` folder** with:
   - `system.md` — Boot loader adapted to this project (use `<fp>` tags format)
   - `index.md` — Root navigation (see Index File Format below)
   - `logs/` — Directory for session logs

4. **Create `_float/index.md` in each major directory** — Use Index File Format below

5. **Generate structure map** — Document folder tree in system.md

6. **Auto-boot** — Run the boot sequence on the newly created structure

7. **Report complete** — Show what was created and boot status

**Init Output:**
```
FloatSystem: INITIALIZED
Directory: [path]
Created:
  - _float/system.md
  - _float/index.md
  - _float/logs/
  - [folder]/_float/index.md
  - [folder]/_float/index.md
  ...

FloatSystem: BOOTED
Status: No issues found
Ready for: [human direction]
```

**Index File Format (for init):**
```markdown
---
title: {Folder Name}
type: float
status: current
ai_updated: {YYYY-MM-DD}
---

# {Folder Name}

{Brief description}

## Contents

| File | Purpose |
|------|---------|
| **{filename}** | [needs description] |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **{subfolder}/** | [needs description] |

---

<!-- AI: Update this file when contents change. -->
```

- Omit Subfolders section if no subfolders
- Omit Contents section if no files
- Skip: dotfiles, `_float/`, `node_modules/`, `.git/`

---

## /float sync

Full integrity check with fix capability. Shows all issues, proposes changes, applies on approval.

**This is verify + fix in one command.** Say 'n' at the approval gate if you just want to see issues.

### What It Checks

| Check | Description |
|-------|-------------|
| Index coverage | Every folder has `_float/index.md` |
| Table accuracy | File tables match actual folder contents |
| Folder accuracy | Folder tables match actual subfolders |
| Structure map | `_float/system.md` structure map matches reality |
| Orphaned files | Files exist but aren't in any index |
| Missing files | Index references files that don't exist |

**Exclusions (don't flag these):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` subfolders
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)

### Process

1. Run full integrity check
2. If no issues: report "All clear" and exit
3. Show detailed issues with ✓ and ✗ markers
4. Categorize fixes:
   - **Tier 1 (no AI)**: Add/remove rows in tables
   - **Tier 2 (Haiku)**: New files need descriptions
5. Show proposed changes
6. Ask for approval
7. If 'n': exit (user got their inspection)
8. If 'y': spawn buoys and apply changes
9. Log activity to `_float/logs/YYYY-MM-DD.md`

### Output Format

**Step 1: Show integrity check results**
```
FloatSystem Sync
Directory: [path]

Checking integrity...

✓ _float/system.md — OK
✓ _float/index.md — OK
✗ docs/_float/index.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)
✗ examples/_float/index.md — 1 issue
  - Missing: examples/new-example/ (folder has no _float/index.md)
✓ dev/_float/index.md — OK

Found 3 issues in 2 files.
```

**Step 2: Show proposed fixes**
```
Proposed changes:

docs/_float/index.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

examples/_float/index.md:
  + Create: examples/new-example/_float/index.md

_float/system.md:
  ~ Update structure map (new folder: examples/new-example/)

Apply changes? (y/n):
```

**If 'n':** "No changes made."

**If 'y':** Generate descriptions, spawn buoys, apply changes, log activity.

---

## Buoy Behavior

Sync spawns specialized buoys (via Task tool) for each task type:

### Index Buoy (No AI)
- Add/remove rows in file and folder tables
- Detect and preserve table format (2-column vs 3-column)
- Maintain alphabetical order
- Update `ai_updated` timestamp

### System Buoy (No AI)
- Update structure map in `_float/system.md`
- Add/remove folders from tree

### Scaffold Buoy (Minimal AI)
- Create `_float/index.md` for new folders
- Use standard descriptions for obvious folders (`docs/`, `src/`, etc.)
- Mark non-obvious as `[TODO: Add description]`

### Describe Buoy (Haiku)
- Generate one-line descriptions (under 80 chars)
- Skip config files (`.json`, `.yaml`, `.env`, etc.)
- Return for human approval: `[accept/edit/skip]`

### Log Buoy (No AI)
- Append activity to `_float/logs/YYYY-MM-DD.md`
- Create log file if doesn't exist

---

## The Complete Flow

```
User runs /float
    ↓
Boot sequence executes
    ↓
Quick health check: "3 issues detected"
    ↓
User runs /float sync
    ↓
Full integrity check with detailed output
    ↓
Proposed changes shown
    ↓
User approves (y) or declines (n)
    ↓
If approved: Buoys spawn, changes apply, activity logged
    ↓
FloatSystem is now in sync
```

---

## Reference

Full specification: `artifacts/float-buoys-commands-spec.md`

Key conventions:
- `_float/system.md` — Boot loader (root only)
- `_float/index.md` — Folder navigation (every folder)
- `_float/logs/YYYY-MM-DD.md` — Session logs (root only)
