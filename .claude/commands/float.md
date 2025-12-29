# /float — FloatPrompt Boot and Sync

The complete FloatPrompt System maintenance command. Three modes: boot (default), sync, and context.

## Routing

Parse `$ARGUMENTS` to determine action:

| Input | Action |
|-------|--------|
| `/float` | Boot + quick health check |
| `/float sync` | Full integrity check + fix with approval |
| `/float context` | Generate or load project context |

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
5. **Build mental model** — What exists, what happened, current state
6. **Quick integrity check** — Count issues only (see below)
7. **Report ready** — Summarize with context and issue status

**Quick Integrity Check (fast, no AI):**
- Count files in folders but not in corresponding nav/*.md tables
- Count nav/*.md references to files that don't exist
- Count major folders without a nav/*.md file
- Skip: dotfiles, `_float/`, `node_modules/`, `.git/`, build folders
- Result: issue count only, no details

**Boot Output (healthy, with context):**
```
FloatPrompt operational.
Directory: [path]
Context: Loaded
Status: No issues found
Ready for: [human direction]
```

**Boot Output (healthy, no context):**
```
FloatPrompt operational.
Directory: [path]
Context: Missing (run /float context to generate)
Status: No issues found
Ready for: [human direction]
```

**Boot Output (issues detected):**
```
FloatPrompt operational.
Directory: [path]
Context: Loaded (or "Missing")
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

## /float context

Generate or load project context. Explicit command for context operations.

### If `_float/context/project.md` DOES NOT EXIST → Generate

Spawn Context Buoy to create the terrain map:

1. **Read `_float/tools/context-creator.md`** — Load generation protocol
2. **Discover** — Scan system.md, nav/*.md, README, key entry points
3. **Clarify** — If uncertain, ask 1-3 brief questions (see context-creator.md)
4. **Generate** — Create `_float/context/project.md` with emergent content
5. **Report** — Show what was discovered

**Output (generating):**
```
FloatPrompt context
Directory: [path]

Scanning project structure...
Reading nav files and key entry points...

[If uncertain, asks questions here]

Generating context...

Context generated: _float/context/project.md
Key discoveries:
  - [pattern or relationship found]
  - [reading order identified]
  - [domain relationships mapped]

Run /float to boot with context loaded.
```

### If `_float/context/project.md` EXISTS → Load Deep Context

Read context and follow reading order for deeper understanding:

1. **Read `_float/context/project.md`** — Load terrain map
2. **Follow reading order** — Read the key files listed
3. **Build rich mental model** — Understand relationships, not just structure
4. **Report** — Summarize understanding

**Output (loading):**
```
FloatPrompt context
Directory: [path]

Loading context: _float/context/project.md
Following reading order (7 files)...
  → _float/system.md
  → docs/goals.md
  → docs/principles.md
  → core/prompt.md
  → ...

Context loaded. Understanding depth: [deep]
Key concepts:
  - [discovered pattern]
  - [important relationship]

Ready for: [human direction]
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

**Context Phase (`/float context`):**

| Buoy | Task | Spawned Via |
|------|------|-------------|
| **Context Buoy** | Generate/update `_float/context/project.md` terrain map | `Task` tool, uses `_float/tools/context-creator.md` |

**Check Phase (`/float sync` — parallel verification):**

| Buoy | Task | Spawned Via |
|------|------|-------------|
| **Check Buoy** | Verify nav/*.md against actual folder | `Task` tool, general-purpose |

**Fix Phase (`/float sync` — after approval):**

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
Boot sequence executes (reads existing files)
    ↓
Report: "Context: Missing" or "Context: Loaded"
Report: "3 issues found" or "No issues"
    ↓
    ├── If context missing → User runs /float context
    │       ↓
    │   Context Buoy generates terrain map
    │       ↓
    │   context/project.md created
    │
    ├── If issues found → User runs /float sync
    │       ↓
    │   Check Buoys spawn in parallel
    │       ↓
    │   Results aggregated, fixes proposed
    │       ↓
    │   User approves (y) or declines (n)
    │       ↓
    │   Fix Buoys apply changes, Log Buoy records
    │
    └── If all good → Ready for work
```

---

## Reference

Full specification: `artifacts/float-buoys-commands-spec.md`
Context specification: `artifacts/float-context-spec.md`
Buoy pattern: `docs/buoys.md`

**Commands:**
- `/float` — Boot (fast, reads existing files)
- `/float sync` — Verify + fix nav files
- `/float context` — Generate or load deep context

**Key conventions:**
- `_float/system.md` — Boot loader (root only)
- `_float/context/project.md` — AI terrain map (generated via `/float context`)
- `_float/tools/context-creator.md` — Tool for generating context
- `_float/nav/*.md` — Centralized folder navigation
- `_float/logs/YYYY-MM-DD.md` — Session logs (root only)
