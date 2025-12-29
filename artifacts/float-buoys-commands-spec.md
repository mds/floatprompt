---
title: Float Buoys Commands Specification
type: spec
status: active
created: 2025-12-28

human_author: MDS
human_intent: Specify Claude Code slash commands for FloatSystem maintenance
human_context: Lighter alternative to daemon — on-demand buoys during session

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Active approach — simpler than daemon, no software to build.
  Merged verify into sync for simpler UX (two commands: boot + sync).
  Added Buoy Instructions section with detailed behavior for each buoy type.
  Added Index File Format Reference with canonical structure and variations.
  Expanded Index Buoy with table format detection, folder table handling, exclusions.
  Expanded Scaffold Buoy with detailed index creation template and rules.
---

# Float Buoys Commands Specification

**On-demand FloatSystem maintenance via Claude Code slash commands.** No daemon, no install, no background process. Just commands that spawn buoys when you need them.

---

## Philosophy

The daemon approach (see `float-buoys-spec.md`) provides real-time sync but adds complexity: Node.js, npm install, background process, API key config.

This spec offers a lighter alternative:

> AI only reads context when you start a session. Stale-for-5-minutes doesn't matter. Stale-for-3-days matters.

**Two commands. That's it.**

1. `/float` — Boot the system, see if there are issues
2. `/float sync` — See the issues, fix them with approval

No separate verify step. Sync shows you everything and asks before changing anything. Say 'n' at the approval gate if you just want to see issues.

**Position:** Start here. Graduate to daemon if you need always-on sync.

---

## The Commands

```
/float          # Boot + quick health check
/float sync     # Full integrity check + fix with approval
```

Single command file (`.claude/commands/float.md`) handles subcommands via `$ARGUMENTS`. Works immediately when repo is cloned.

**The Flow:**
```
/float        → Boot → "3 issues detected" → suggests /float sync
/float sync   → Shows detailed issues → proposes fixes → approval gate → spawns buoys
```

---

## /float (Boot + Health Check)

Boots FloatSystem and runs a quick integrity check. Surfaces issues without details.

**If `_float/system.md` exists → Boot Sequence:**
1. Read boot loader
2. Traverse all index files
3. Build mental model
4. **Run quick integrity check** (lightweight verify)
5. Report status with issue count

**Boot Output (healthy):**
```
FloatSystem: BOOTED
Directory: /Users/mds/Projects/floatprompt
Status: No issues found
Ready for: [human direction]
```

**Boot Output (issues detected):**
```
FloatSystem: BOOTED
Directory: /Users/mds/Projects/floatprompt
Status: 3 issues found

Run /float sync to see details and fix
```

**If `_float/system.md` doesn't exist → Init Sequence:**
- Fetch spec from GitHub
- Create `_float/` structure
- Auto-boot on newly created structure
- Report: "INITIALIZED" + "BOOTED" + "No issues found"

**Quick Integrity Check (during boot):**
- Count files not in index tables
- Count index references to missing files
- Count folders without `_float/index.md`
- Don't report details — just the count
- Fast: no AI, no full diff, just existence checks

---

## /float sync

Full integrity check with fix capability. Shows all issues, proposes changes, applies on approval.

**This is verify + fix in one command.** Say 'n' at the approval gate if you just want to see issues.

### What It Checks

| Check | Description |
|-------|-------------|
| **Index coverage** | Every folder has `_float/index.md` |
| **Table accuracy** | File tables match actual folder contents |
| **Folder accuracy** | Folder tables match actual subfolders |
| **Structure map** | `_float/system.md` structure map matches reality |
| **Orphaned files** | Files exist but aren't in any index |
| **Missing files** | Index references files that don't exist |
| **Stale timestamps** | `ai_updated` older than file modification |

**Exclusions (don't flag these as issues):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` subfolders (they contain the index, not content)
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)
- Project's ignore patterns

A file is only "orphaned" if it's not in the index AND not in the exclusion list.

### How It Works

1. Run full integrity check
2. If no issues: report "All clear" and exit
3. Show detailed issues (same format as old verify)
4. Categorize fixes:
   - **Tier 1 (no AI)**: Add/remove rows in tables
   - **Tier 2 (Haiku)**: New files need descriptions
5. Show proposed changes
6. Wait for approval
7. If 'n': exit (user got their inspection)
8. If 'y': spawn buoys and apply changes

### Buoy Types

| Buoy | Handles | AI Needed? |
|------|---------|-----------|
| **Index Buoy** | Add/remove file rows in tables | No |
| **System Buoy** | Update structure map | No |
| **Describe Buoy** | Write descriptions for new files | Yes (Haiku) |
| **Scaffold Buoy** | Create missing `_float/index.md` files | Minimal |
| **Log Buoy** | Record activity to `_float/logs/` | No |

Same buoys as the daemon spec — just spawned on-demand instead of running continuously.

**Describe Buoy notes:**
- Model: Haiku (fast, cheap, sufficient for descriptions)
- Skip config files: `.json`, `.yaml`, `.env`, `package.json`, etc.
- Show proposed description, allow edit before apply

### Output Format

**Step 1: Show integrity check results**
```
FloatSystem Sync
Directory: /Users/mds/Projects/floatprompt

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

**Step 3a: If user says 'n'**
```
No changes made. Run /float sync again when ready.
```

**Step 3b: If user says 'y'**
```
Generating descriptions...
  new-feature.md → "Feature documentation for user authentication flow"
  [accept/edit/skip]: accept

Spawning buoys...
  ✓ Index Buoy: Updated docs/_float/index.md
  ✓ Scaffold Buoy: Created examples/new-example/_float/index.md
  ✓ Describe Buoy: new-feature.md → "Feature documentation for..."
  ✓ System Buoy: Updated structure map
  ✓ Log Buoy: Recorded activity

Sync complete. 4 changes applied.
Activity logged to _float/logs/2025-12-28.md
```

**If no issues found:**
```
FloatSystem Sync
Directory: /Users/mds/Projects/floatprompt

Checking integrity...

All clear. No issues found.
```

---

## Buoy Spawning

Uses Claude Code's Task tool to spawn buoys in parallel where possible.

**Example: 3 new files need descriptions**

```
Spawning Describe Buoys (3 parallel)...
  → Buoy 1: Reading src/auth.js...
  → Buoy 2: Reading src/utils.js...
  → Buoy 3: Reading docs/setup.md...

Results:
  ✓ src/auth.js → "Authentication middleware with JWT validation"
  ✓ src/utils.js → "Utility functions for string and date formatting"
  ✓ docs/setup.md → "Setup guide for local development environment"
```

Parallel execution keeps sync fast even with multiple files.

---

## Index File Format Reference

Canonical format for `_float/index.md` files. Buoys must understand and preserve this structure.

### Frontmatter (Required)

```yaml
---
title: {Folder Name}
type: float
status: current
ai_updated: {YYYY-MM-DD}
---
```

### Structure

```markdown
# {Folder Name}

{One-line description of folder purpose}

## Contents

### {Section Name} (optional grouping)

| File | Purpose |
|------|---------|
| **filename.md** | Description of file |
| **another.md** | Description of file |

### Subfolders (if folder contains subfolders)

| Folder | Purpose |
|--------|---------|
| **subfolder/** | Description of folder |
| **another/** | Description of folder |

---

{Optional footer with copyright or AI hook}

<!-- AI: {maintenance instruction} -->
```

### Table Format Variations

Different index files may use different column structures:

| Format | Columns | Example |
|--------|---------|---------|
| Simple | File, Purpose | Root files |
| Detailed | File, Intent, Purpose | Documentation |
| Folder | Folder, Purpose | Subfolder listings |

**Rule:** Buoys must detect and preserve existing format. Never force a format change.

### Exclusions

These items are NEVER added to index tables:
- `_float/` subfolder (it's the container, not content)
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `node_modules/`, `dist/`, `build/`
- Lock files (`*.lock`, `package-lock.json`)
- Hidden/system files

### Section Logic

When a file is added:
1. Check if sections exist in the index
2. If file type matches a section name (e.g., "Formats", "Tools"), add there
3. If no clear match, add to the first/main "Contents" or "Files" section
4. If multiple sections and unclear, flag for human review

---

## Buoy Instructions

Detailed behavior for each buoy type. These instructions are embedded in the command file and passed to spawned agents.

### Index Buoy

**Purpose:** Add or remove rows in `_float/index.md` file and folder tables.

**Input:**
- Path to `_float/index.md` file
- List of changes: `{action: "add"|"remove", type: "file"|"folder", name: string, description?: string}`

**Behavior:**

1. **Read and parse the index file**
   - Parse frontmatter
   - Identify all tables (file tables and folder tables)
   - Detect column structure of each table (2-column, 3-column, etc.)

2. **Detect table format**
   - Count columns in header row
   - Preserve exact column headers (e.g., `| File | Purpose |` vs `| File | Intent | Purpose |`)
   - For new rows, match the column count:
     - 2-column: `| **{name}** | {description} |`
     - 3-column: `| **{name}** | {intent} | {description} |` (use description for both if only one provided)

3. **Determine target table**
   - For files: find the Files/Contents table
   - For folders: find the Folders/Subfolders table
   - If sections exist, use section logic (see Index File Format Reference)

4. **For each "add" action:**
   - Check exclusion list first (see Index File Format Reference)
   - Skip if item matches exclusion pattern
   - Insert new row in correct table
   - Maintain alphabetical order within section
   - Use `[needs description]` if no description provided

5. **For each "remove" action:**
   - Find and delete the row containing that name
   - Handle both file tables and folder tables

6. **Finalize:**
   - Update `ai_updated` in frontmatter to today's date
   - Preserve all other content (descriptions, footers, comments)
   - Write file back

**Exclusions (never add):**
- `_float/` folder
- Dotfiles and hidden files
- Items matching ignore patterns (see Index File Format Reference)

**No AI needed.** Pure file manipulation with format preservation.

---

### System Buoy

**Purpose:** Update the structure map in `_float/system.md`.

**Input:**
- List of structural changes: new folders, removed folders, renamed folders

**Behavior:**
1. Read `_float/system.md`
2. Find the structure map (code block under `## Structure Map`)
3. Parse the tree structure
4. Apply changes:
   - Add new folders in correct position
   - Remove deleted folders
   - Update folder names
5. Preserve comments and annotations
6. Write file back

**No AI needed.** Tree manipulation.

---

### Describe Buoy

**Purpose:** Generate one-line descriptions for new files.

**Input:**
- File path to describe
- File contents (read by buoy)

**Behavior:**
1. Read the file
2. Generate description using this prompt:

```
Read this file and write a one-line description (under 80 characters) for use in a navigation index.

Rules:
- Focus on what the file DOES or CONTAINS, not implementation details
- Be specific. Avoid generic descriptions.
- Use sentence case, no period at end
- For code: describe the functionality, not the language
- For docs: describe what the reader will learn

Examples of GOOD descriptions:
- "JWT authentication middleware with refresh token support"
- "Setup guide for local development with Docker"
- "Three-tier goal hierarchy: voice > behavior > artifacts"
- "CLI entry point with subcommand routing"

Examples of BAD descriptions:
- "Authentication code" (too vague)
- "Documentation" (says nothing)
- "Utility functions" (generic)
- "This file contains..." (unnecessary preamble)

File to describe:
{file_path}

Contents:
{file_contents}

One-line description:
```

3. Return description for human approval

**Model:** Haiku (fast, cheap, sufficient)

**Skip these files** (no description needed):
- `package.json`, `package-lock.json`
- `tsconfig.json`, `jsconfig.json`
- `.eslintrc.*`, `.prettierrc.*`
- `.gitignore`, `.npmignore`
- `*.lock`, `*.log`
- `.env`, `.env.*`
- Any dotfile config

For skipped files, use filename as implicit description or mark as "Configuration file".

---

### Scaffold Buoy

**Purpose:** Create missing `_float/index.md` files for new folders.

**Input:**
- Folder path that needs `_float/index.md`
- Parent folder's index format (for style consistency)

**Behavior:**

1. **Scan the folder**
   - List all files (excluding dotfiles, `_float/`, ignored patterns)
   - List all subfolders (excluding `_float/`, hidden folders)
   - Note if folder is empty

2. **Create `_float/` subfolder**
   - `mkdir -p {folder}/_float/`

3. **Generate `index.md`**

   Use this template, adapting based on folder contents:

```markdown
---
title: {Folder Name}
type: float
status: current
ai_updated: {YYYY-MM-DD}
---

# {Folder Name}

{Brief description — see below for generation rules}

## Contents

| File | Purpose |
|------|---------|
| **{file1.ext}** | [needs description] |
| **{file2.ext}** | [needs description] |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **{subfolder1}/** | [needs description] |
| **{subfolder2}/** | [needs description] |

---

<!-- AI: Update this file when contents of {Folder Name} change. -->
```

4. **Template adaptation rules:**
   - **No files?** Omit the Files/Contents table entirely
   - **No subfolders?** Omit the Subfolders table entirely
   - **Empty folder?** Just frontmatter + heading + "Empty folder" note
   - **Match parent style:** If parent uses 3-column tables, use 3-column

5. **Folder description generation:**
   - If folder name is obvious (e.g., `docs/`, `src/`, `tests/`): use standard description
   - Standard descriptions:
     - `docs/` → "Documentation"
     - `src/` → "Source code"
     - `tests/` or `test/` → "Test files"
     - `examples/` → "Example files"
     - `scripts/` → "Utility scripts"
     - `config/` → "Configuration files"
     - `assets/` → "Static assets"
     - `lib/` → "Library code"
   - If non-obvious: use `[TODO: Add folder description]`

6. **File listing rules:**
   - List files alphabetically
   - Use `**bold**` for filenames
   - Add trailing `/` for folders
   - All purposes start as `[needs description]`
   - Describe Buoy fills these in later (or human)

7. **AI hook comment:**
   - Always add maintenance comment at bottom
   - Format: `<!-- AI: Update this file when contents of {Folder Name} change. -->`

**Minimal AI:** Only needed if folder name is non-obvious and description can't be inferred. Otherwise purely template-based.

---

### Log Buoy

**Purpose:** Record sync activity to `_float/logs/YYYY-MM-DD.md`.

**Input:**
- List of actions taken by other buoys

**Behavior:**
1. Determine today's log file: `_float/logs/{YYYY-MM-DD}.md`
2. If file doesn't exist, create with frontmatter:
```markdown
---
title: "{YYYY-MM-DD}"
type: log
status: current
ai_updated: {today}
---

# {YYYY-MM-DD}

Daily session log. Newest entries first.

---
```
3. Append new entry at top (after frontmatter, before other entries):
```markdown
## {HH:MM} — /float sync

- {action1}
- {action2}
- {action3}

---
```
4. Keep entries brief. One line per action.

**No AI needed.** Template-based logging.

---

## Comparison: Commands vs Daemon

| Aspect | `/float` + `/float sync` | Float Buoys Daemon |
|--------|--------------------------|-------------------|
| Install | None (clone repo) | npm install -g |
| Commands | 2 (`/float`, `/float sync`) | CLI (`float`, `float status`, etc.) |
| Background process | No | Yes |
| Real-time sync | No | Yes |
| Manual trigger | Yes | No |
| Complexity | Low | Medium |
| Dependencies | Claude Code only | Node.js, npm, API key |
| Best for | Session-based workflow | Always-fresh requirement |

**Recommendation:** Start with commands. Add daemon later if needed.

---

## File Structure

```
.claude/commands/
└── float.md           # Handles: /float (boot) and /float sync
```

Single command file routes based on `$ARGUMENTS`. No additional files needed.

**Integration with FloatSystem:**
- `/float` reads `_float/system.md` for boot protocol
- `/float` reads all `_float/index.md` files for quick health check
- `/float sync` modifies `_float/` files via buoys
- Activity logged to `_float/logs/YYYY-MM-DD.md`

---

## Logging

`/float sync` logs activity to `_float/logs/YYYY-MM-DD.md`:

```markdown
## 14:32 — /float sync

- Updated: docs/_float/index.md (+1 file, -1 file)
- Created: examples/new-example/_float/index.md
- Described: new-feature.md → "Feature documentation for..."
- Updated: _float/system.md (structure map)
```

Same format as daemon logs. Compatible if you upgrade later.

---

## Ignore Patterns

Inherits from project. Commands skip:

```
node_modules/
.git/
.DS_Store
dist/
build/
```

Uses same logic as daemon spec for consistency.

---

## MVP Scope

**In:**
- `/float` — boot with quick health check
- `/float sync` — full integrity check + fix with approval
- Parallel buoy spawning for descriptions
- Logging to `_float/logs/`

**Out (for later):**
- Automatic triggering (that's the daemon)
- Complex conflict resolution
- Cloud sync

---

## Success Criteria

1. `/float` boots and reports issue count
2. `/float sync` shows detailed issues
3. `/float sync` fixes issues with approval gate
4. New files get meaningful descriptions (via Describe Buoy)
5. Missing `_float/index.md` files are created (via Scaffold Buoy)
6. Activity logged to `_float/logs/` (via Log Buoy)
7. No manual file editing required after sync

---

## Migration Path

If commands aren't enough, upgrade to daemon:

1. Commands teach you what sync actually does
2. Daemon automates the same operations
3. Same log format, same file structures
4. No breaking changes

The specs are designed to be compatible.

---

## Next Steps

1. ✅ Update `/float` command to handle `sync` subcommand
2. ✅ Implement boot with quick health check
3. ✅ Implement `sync` with full integrity check + fix
4. Test on floatprompt repo
5. Iterate based on real usage

---

© 2025 @MDS
