# /float — FloatPrompt Boot and Sync

The complete FloatPrompt System maintenance command. Two modes: boot (default) and sync.

## Routing

Parse `$ARGUMENTS` to determine action:

| Input | Action |
|-------|--------|
| `/float` | Boot + quick health check |
| `/float sync` | Full integrity check + fix with approval |

---

## /float (Boot + Health Check)

**Step 1: Check for existing FloatPrompt System**

Look for `_float/system.md` in the current working directory.

---

### If `_float/system.md` EXISTS → Boot FloatPrompt System

Execute the full orientation using local files:

1. **Read `_float/system.md`** — Load boot protocol, structure map, behavioral constraints
2. **Read `_float/context/project.md`** — Load terrain map and relationships (if exists)
3. **Read ALL `_float/nav/*.md` files** — Understand folder structure (centralized navigation)
4. **Read today's session log** (`_float/logs/YYYY-MM-DD.md`) if it exists
5. **Choose context depth** based on task complexity (if context/ folder exists)
6. **Build mental model** — What exists, what happened, current state
7. **Quick integrity check** — Count issues only (see below)
8. **Report ready** — Summarize with issue count

**Quick Integrity Check (fast, no AI):**
- Count files in folders but not in corresponding nav/*.md tables
- Count nav/*.md references to files that don't exist
- Count major folders without a nav/*.md file
- Skip: dotfiles, `_float/`, `node_modules/`, `.git/`, build folders
- Result: issue count only, no details

**If `_float/context/project.md` is missing:**
- Spawn Context Buoy to generate it
- Report: "Context: Generated _float/context/project.md"

**Boot Output (healthy):**
```
FloatPrompt operational.
Directory: [path]
Context: Loaded (or "Generated" if new)
Status: No issues found
Ready for: [human direction]
```

**Boot Output (issues detected):**
```
FloatPrompt operational.
Directory: [path]
Status: [N] issues found

Run /float sync to see details and fix
```

---

### If `_float/system.md` DOES NOT EXIST → Init Sequence

Fetch the FloatPrompt System spec from GitHub, then create the architecture, then auto-boot.

1. **Fetch the spec** — Read these files from `https://github.com/mds/floatprompt`:
   - `_float/system.md` — Boot loader format and conventions
   - `_float/nav/root.md` — Navigation format example
   - `docs/floatsystem.md` — Full FloatPrompt System architecture

2. **Scan the current repository** — Understand existing structure, identify all major directories

3. **Create root `_float/` folder** with:
   - `system.md` — Boot loader adapted to this project (use `<fp>` tags format)
   - `nav/` — Centralized navigation folder
   - `logs/` — Directory for session logs

4. **Create `_float/nav/*.md` for each major directory:**
   - `nav/root.md` — Repository root
   - `nav/{folder}.md` — One file per major folder (docs, src, etc.)

5. **Generate structure map** — Document folder tree in system.md

6. **Auto-boot** — Run the boot sequence on the newly created structure

7. **Report complete** — Show what was created and boot status

**Init Output:**
```
FloatPrompt initialized.
Directory: [path]
Created:
  - _float/system.md
  - _float/nav/root.md
  - _float/nav/docs.md
  - _float/nav/src.md
  - _float/logs/
  ...

FloatPrompt operational.
Status: No issues found
Ready for: [human direction]
```

**Nav File Format (for init):**
```markdown
---
title: {Folder Name}
type: nav
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

<!-- AI: Update this file when contents of {folder} change. -->
```

- Omit Subfolders section if no subfolders
- Omit Contents section if no files
- Skip: dotfiles, `_float/`, `node_modules/`, `.git/`
- Nested subfolders described in parent nav file (e.g., docs.md covers docs/philosophy/)

---

## /float sync

Full integrity check with fix capability. Shows all issues, proposes changes, applies on approval.

**This is verify + fix in one command.** Say 'n' at the approval gate if you just want to see issues.

### What It Checks

| Check | Description |
|-------|-------------|
| Nav coverage | Every major folder has a nav/*.md file |
| Table accuracy | File tables match actual folder contents |
| Subfolder accuracy | Subfolder tables match actual subfolders |
| Structure map | `_float/system.md` structure map matches reality |
| Orphaned files | Files exist but aren't in any nav file |
| Missing files | Nav references files that don't exist |

**Exclusions (don't flag these):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)

### Process

1. **Spawn Check Buoys in parallel** (one per nav/*.md file)
2. Each Check Buoy verifies its nav file against actual folder contents
3. Aggregate results from all Check Buoys
4. If no issues: report "All clear" and exit
5. Show detailed issues with ✓ and ✗ markers
6. Categorize fixes:
   - **Tier 1 (no AI)**: Add/remove rows in tables
   - **Tier 2 (Haiku)**: New files need descriptions
7. Show proposed changes
8. Ask for approval
9. If 'n': exit (user got their inspection)
10. If 'y': spawn Fix Buoys and apply changes
11. Log activity to `_float/logs/YYYY-MM-DD.md`

### Output Format

**Step 1: Spawn fleet and show results**
```
FloatPrompt sync
Directory: [path]

Scanning _float/nav/*.md...
Found N nav files.

Spawning fleet (N buoys)...
  → Check Buoy: nav/root.md vs /
  → Check Buoy: nav/docs.md vs docs/
  → Check Buoy: nav/src.md vs src/
  → ...

Results:
✓ _float/system.md — OK
✓ _float/nav/root.md — OK
✗ _float/nav/docs.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)
✗ _float/nav/examples.md — 1 issue
  - Missing: examples/new-example/ (subfolder not in table)
✓ _float/nav/dev.md — OK

Found 3 issues in 2 files.
```

**Step 2: Show proposed fixes**
```
Proposed changes:

_float/nav/docs.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

_float/nav/examples.md:
  + Add subfolder: new-example/

_float/system.md:
  ~ Update structure map (new folder: examples/new-example/)

Apply changes? (y/n):
```

**If 'n':** "No changes made."

**If 'y':** Spawn fleet, apply changes, log activity.

```
Spawning fleet...
  → Nav Buoy: Updating _float/nav/docs.md
  → Nav Buoy: Updating _float/nav/examples.md
  → System Buoy: Updating structure map
  → Describe Buoy: Generating description for new-feature.md

Describe Buoy complete:
  new-feature.md → "Feature documentation for user authentication flow"
  [accept/edit/skip]: accept

Fleet complete.
  → Log Buoy: Recording activity

Sync complete. 4 changes applied.
Activity logged to _float/logs/2025-12-28.md
```

---

## Buoy Orchestration

**Buoys are Task agents.** Each buoy is spawned via Claude Code's Task tool, allowing parallel execution.

### How It Works

1. Main Claude runs integrity check and shows proposed changes
2. User approves
3. Main Claude spawns buoys in parallel:
   ```
   Spawning buoys...
   → Nav Buoy: Updating 3 nav files...
   → System Buoy: Updating structure map...
   → Describe Buoy (x4): Generating descriptions...
   → Scaffold Buoy: Creating new nav file...
   ```
4. Buoys work in parallel, report back
5. Log Buoy records all activity
6. Main Claude reports completion

### Buoy Types

**Boot Phase:**

| Buoy | Task | Spawned Via |
|------|------|-------------|
| **Context Buoy** | Generate/update `_float/context/project.md` terrain map | `Task` tool, uses `_float/tools/context-creator.md` |

**Check Phase (parallel verification):**

| Buoy | Task | Spawned Via |
|------|------|-------------|
| **Check Buoy** | Verify nav/*.md against actual folder | `Task` tool, general-purpose |

**Fix Phase (after approval):**

| Buoy | Task | Spawned Via |
|------|------|-------------|
| **Nav Buoy** | Add/remove rows in nav/*.md tables | `Task` tool, general-purpose |
| **System Buoy** | Update structure map in system.md | `Task` tool, general-purpose |
| **Describe Buoy** | Generate file descriptions | `Task` tool, model: haiku |
| **Scaffold Buoy** | Create new `_float/nav/*.md` files | `Task` tool, general-purpose |
| **Log Buoy** | Record activity to logs | `Task` tool, general-purpose |

### Parallelization

- **Integrity check?** Spawn all Check Buoys in parallel (one per nav/*.md file)
- **Multiple files need descriptions?** Spawn multiple Describe Buoys in parallel
- **Multiple nav files need updates?** Spawn multiple Nav Buoys in parallel
- **New folder needs nav file?** Spawn Scaffold Buoy

Example with 10 new files across 3 folders:
```
Spawning buoys (8 parallel)...
  → Nav Buoy (x3): nav/docs.md, nav/src.md, nav/tests.md
  → Describe Buoy (x4): batch 1 of files
  → Scaffold Buoy (x1): creating nav/newfeature.md

[Describe Buoys complete, spawning batch 2...]
  → Describe Buoy (x4): batch 2 of files

[All buoys complete]
  → Log Buoy: Recording activity

Sync complete. 15 changes applied.
```

### Buoy Instructions

Each buoy receives specific instructions when spawned:

**Context Buoy prompt:**
```
Generate or update _float/context/project.md for this project:
1. Read _float/system.md and all _float/nav/*.md files
2. Read _float/tools/context-creator.md for generation protocol
3. Identify key files, reading order, domain relationships
4. Generate emergent context based on what you discover
5. If project.md exists, preserve human_refinements sections
6. Filename is 'project.md' by default, but choose better name if project suggests one
Output: _float/context/project.md with terrain map for AI understanding
```

**Check Buoy prompt:**
```
Verify _float/nav/{folder}.md against actual {folder}/ contents:
1. Read the nav file and parse all tables (Contents, Subfolders, nested sections)
2. List actual files and subfolders in {folder}/ (exclude dotfiles, node_modules, etc.)
3. Compare and return structured result:
   - Missing: items in folder but not in nav
   - Stale: items in nav but not in folder
   - OK: everything matches
Return JSON: {navFile, status, issues[]}
```

**Nav Buoy prompt:**
```
Update the file table in _float/nav/{folder}.md:
- Add rows: [list of files to add]
- Remove rows: [list of files to remove]
- Preserve existing table format (column count, headers)
- Maintain alphabetical order
- Update ai_updated timestamp
```

**Describe Buoy prompt:**
```
Read [file_path] and generate a one-line description (under 80 chars).
Focus on what the file DOES, not implementation details.
Skip if config file. Return description for approval.
```

**Scaffold Buoy prompt:**
```
Create _float/nav/{folder}.md for a new major folder:
- List all files and subfolders in that folder
- Use standard descriptions for obvious folders
- Mark others as [needs description]
- Follow Nav File Format template
- Include nested subfolders in the same file
```

**System Buoy prompt:**
```
Update structure map in _float/system.md:
- Add folders: [list]
- Remove folders: [list]
- Preserve existing annotations
```

**Log Buoy prompt:**
```
Append to _float/logs/YYYY-MM-DD.md:
- Record all changes made by other buoys
- Use format: ## HH:MM — /float sync
- One line per action
```

---

## The Complete Flow

```
User runs /float
    ↓
Boot sequence executes
    ↓
Quick health check: "3 issues found"
    ↓
User runs /float sync
    ↓
Phase 1: Check Buoys spawn in parallel (one per nav/*.md)
    ↓
Results aggregated, detailed issues shown
    ↓
Proposed changes shown
    ↓
User approves (y) or declines (n)
    ↓
If approved:
    ↓
Phase 2: Fix Buoys spawn in parallel (Nav, System, Describe, Scaffold)
    ↓
Fix Buoys complete, Log Buoy records activity
    ↓
FloatPrompt System is now in sync
```

---

## Reference

Full specification: `artifacts/float-buoys-commands-spec.md`
Context specification: `artifacts/float-context-spec.md`

Key conventions:
- `_float/system.md` — Boot loader (root only)
- `_float/context/project.md` — AI terrain map (auto-generated)
- `_float/tools/context-creator.md` — Tool for generating context
- `_float/nav/*.md` — Centralized folder navigation
- `_float/logs/YYYY-MM-DD.md` — Session logs (root only)
