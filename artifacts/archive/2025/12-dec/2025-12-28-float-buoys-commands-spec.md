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
  Updated to centralized architecture (v0.6.0).
  Navigation now lives in .float/nav/*.md instead of scattered .float/index.md files.
  Renamed Index Buoy to Nav Buoy. Scaffold Buoy creates nav/*.md files.
---

# Float Buoys Commands Specification

**On-demand FloatSystem maintenance via Claude Code slash commands.** No daemon, no install, no background process. Just commands that spawn buoys — specialized Task agents that work in parallel on your directory.

---

## Philosophy

The daemon approach (see `float-buoys-daemon-spec.md`) provides real-time sync but adds complexity: Node.js, npm install, background process, API key config.

This spec offers a lighter alternative:

> AI only reads context when you start a session. Stale-for-5-minutes doesn't matter. Stale-for-3-days matters.

**Two commands. That's it.**

1. `/float` — Boot the system, see if there are issues
2. `/float sync` — See the issues, fix them with approval

No separate verify step. Sync shows you everything and asks before changing anything. Say 'n' at the approval gate if you just want to see issues.

**Position:** Start here. Graduate to daemon if you need always-on sync.

---

## Architecture: Centralized Navigation

FloatSystem v0.6.0 uses **centralized navigation**:

```
.float/
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
- No traversing entire directory tree

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

**If `.float/system.md` exists → Boot Sequence:**
1. Read boot loader
2. Read all `.float/nav/*.md` files
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

**If `.float/system.md` doesn't exist → Init Sequence:**
- Fetch spec from GitHub
- Create `.float/` structure with centralized `nav/` folder
- Auto-boot on newly created structure
- Report: "INITIALIZED" + "BOOTED" + "No issues found"

**Quick Integrity Check (during boot):**
- Count files not in nav file tables
- Count nav references to missing files
- Count major folders without a nav/*.md file
- Don't report details — just the count
- Fast: no AI, no full diff, just existence checks

---

## /float sync

Full integrity check with fix capability. Shows all issues, proposes changes, applies on approval.

**This is verify + fix in one command.** Say 'n' at the approval gate if you just want to see issues.

### What It Checks

| Check | Description |
|-------|-------------|
| **Nav coverage** | Every major folder has a `nav/*.md` file |
| **Table accuracy** | File tables match actual folder contents |
| **Subfolder accuracy** | Subfolder tables match actual subfolders |
| **Structure map** | `.float/system.md` structure map matches reality |
| **Orphaned files** | Files exist but aren't in any nav file |
| **Missing files** | Nav references files that don't exist |

**Exclusions (don't flag these as issues):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `.float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)
- Project's ignore patterns

A file is only "orphaned" if it's not in the nav file AND not in the exclusion list.

### How It Works

1. **Spawn Check Buoys in parallel** (one per nav/*.md file)
2. Each Check Buoy verifies its nav file against actual folder contents
3. Aggregate results from all Check Buoys
4. If no issues: report "All clear" and exit
5. Show detailed issues (same format as old verify)
6. Categorize fixes:
   - **Tier 1 (no AI)**: Add/remove rows in tables
   - **Tier 2 (Haiku)**: New files need descriptions
7. Show proposed changes
8. Wait for approval
9. If 'n': exit (user got their inspection)
10. If 'y': spawn Fix Buoys and apply changes

### Buoy Types

**Check Phase (parallel verification):**

| Buoy | Handles | AI Needed? |
|------|---------|-----------|
| **Check Buoy** | Verify one nav/*.md file against actual folder | No |

**Fix Phase (parallel fixes after approval):**

| Buoy | Handles | AI Needed? |
|------|---------|-----------|
| **Nav Buoy** | Add/remove file rows in nav/*.md tables | No |
| **System Buoy** | Update structure map | No |
| **Describe Buoy** | Write descriptions for new files | Yes (Haiku) |
| **Scaffold Buoy** | Create new `.float/nav/*.md` files | Minimal |
| **Log Buoy** | Record activity to `.float/logs/` | No |

**Describe Buoy notes:**
- Model: Haiku (fast, cheap, sufficient for descriptions)
- Skip config files: `.json`, `.yaml`, `.env`, `package.json`, etc.
- Show proposed description, allow edit before apply

### Output Format

**Step 1: Spawn Check Buoys and show results**
```
FloatSystem Sync
Directory: /Users/mds/Projects/floatprompt

Scanning .float/nav/*.md...
Found 8 nav files.

Spawning Check Buoys (8 parallel)...
  → Check Buoy: nav/root.md vs /
  → Check Buoy: nav/core.md vs core/
  → Check Buoy: nav/docs.md vs docs/
  → ...

Results:
✓ .float/system.md — OK
✓ .float/nav/root.md — OK
✗ .float/nav/docs.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (file deleted, still in table)
✗ .float/nav/examples.md — 1 issue
  - Missing: examples/new-example/ (subfolder not in table)
✓ .float/nav/dev.md — OK

Found 3 issues in 2 files.
```

**Step 2: Show proposed fixes**
```
Proposed changes:

.float/nav/docs.md:
  + Add: new-feature.md — [needs description]
  - Remove: api.md (file deleted)

.float/nav/examples.md:
  + Add subfolder: new-example/

.float/system.md:
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
  ✓ Nav Buoy: Updated .float/nav/docs.md
  ✓ Nav Buoy: Updated .float/nav/examples.md
  ✓ Describe Buoy: new-feature.md → "Feature documentation for..."
  ✓ System Buoy: Updated structure map
  ✓ Log Buoy: Recorded activity

Sync complete. 4 changes applied.
Activity logged to .float/logs/2025-12-28.md
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

**Buoys are Task agents.** Each buoy is spawned via Claude Code's Task tool, allowing parallel execution across your directory.

### Two Phases

**Phase 1: Check (parallel verification)**
```
Scanning .float/nav/*.md...
Found N nav files.

Spawning Check Buoys (N parallel)...
  → Check Buoy: nav/{file1}.md vs {folder1}/
  → Check Buoy: nav/{file2}.md vs {folder2}/
  → ...

All Check Buoys complete. Aggregating results...
```

**Phase 2: Fix (parallel fixes after approval)**
```
Spawning Fix Buoys...
  → Nav Buoy (x2): Updating nav files
  → Describe Buoy (x3): Generating descriptions
  → System Buoy: Updating structure map
```

### Example: 3 new files need descriptions

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

Parallel execution keeps sync fast even with multiple files and folders.

**How buoys are spawned:**

| Buoy | Task Tool Config |
|------|------------------|
| Check Buoy | `subagent_type: "general-purpose"` |
| Nav Buoy | `subagent_type: "general-purpose"` |
| System Buoy | `subagent_type: "general-purpose"` |
| Describe Buoy | `subagent_type: "general-purpose"`, `model: "haiku"` |
| Scaffold Buoy | `subagent_type: "general-purpose"` |
| Log Buoy | `subagent_type: "general-purpose"` |

Multiple buoys of the same type can run simultaneously (e.g., 8 Check Buoys verifying all nav files at once, or 4 Describe Buoys processing different files).

---

## Nav File Format Reference

Canonical format for `.float/nav/*.md` files. Buoys must understand and preserve this structure.

### Frontmatter (Required)

```yaml
---
title: {Folder Name}
type: nav
ai_updated: {YYYY-MM-DD}
---
```

### Structure

```markdown
# {Folder Name}

{One-line description of folder purpose}

## Contents

| File | Purpose |
|------|---------|
| **filename.md** | Description of file |
| **another.md** | Description of file |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **subfolder/** | Description of folder |
| **another/** | Description of folder |

---

<!-- AI: Update this file when contents of {folder} change. -->
```

### Table Format Variations

Different nav files may use different column structures:

| Format | Columns | Example |
|--------|---------|---------|
| Simple | File, Purpose | Root files |
| Detailed | File, Intent, Purpose | Documentation |
| Folder | Folder, Purpose | Subfolder listings |

**Rule:** Buoys must detect and preserve existing format. Never force a format change.

### Exclusions

These items are NEVER added to nav tables:
- `.float/` folder
- Dotfiles and hidden files
- `node_modules/`, `dist/`, `build/`
- Lock files (`*.lock`, `package-lock.json`)
- Hidden/system files

### Section Logic

When a file is added:
1. Check if sections exist in the nav file
2. If file type matches a section name (e.g., "Formats", "Tools"), add there
3. If no clear match, add to the first/main "Contents" or "Files" section
4. If multiple sections and unclear, flag for human review

### Nested Subfolders

Nav files describe their folder AND nested subfolders. For example, `nav/docs.md` includes:
- Files directly in `docs/`
- The `docs/philosophy/` subfolder with its contents
- The `docs/reference/` subfolder with its contents

This keeps everything for a major folder in one nav file.

---

## Buoy Instructions

Detailed behavior for each buoy type. These instructions are embedded in the command file and passed to spawned agents.

### Check Buoy

**Purpose:** Verify one nav/*.md file against actual folder contents.

**Input:**
- Path to nav/*.md file (e.g., `.float/nav/docs.md`)
- Folder it describes (e.g., `docs/`)

**Behavior:**

1. **Read the nav file**
   - Parse the Contents table (files)
   - Parse the Subfolders table (if exists)
   - Parse any nested subfolder sections

2. **Scan the actual folder**
   - List all files (excluding dotfiles, ignored patterns)
   - List all subfolders
   - For nested subfolders in nav file, scan those too

3. **Compare and report**
   - **Missing in nav:** File/folder exists but not in table
   - **Stale in nav:** Entry in table but file/folder doesn't exist
   - **OK:** Everything matches

4. **Return structured result**
   ```json
   {
     "navFile": ".float/nav/docs.md",
     "status": "issues_found",
     "issues": [
       {"type": "missing", "item": "docs/new-file.md", "itemType": "file"},
       {"type": "stale", "item": "docs/old-file.md", "itemType": "file"}
     ]
   }
   ```

**Exclusions (never flag):**
- Dotfiles (`.DS_Store`, etc.)
- `.float/` folder
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files

**No AI needed.** Pure file comparison.

---

### Nav Buoy

**Purpose:** Add or remove rows in `.float/nav/*.md` file and folder tables.

**Input:**
- Path to `.float/nav/*.md` file
- List of changes: `{action: "add"|"remove", type: "file"|"folder", name: string, description?: string}`

**Behavior:**

1. **Read and parse the nav file**
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
   - If sections exist, use section logic (see Nav File Format Reference)

4. **For each "add" action:**
   - Check exclusion list first (see Nav File Format Reference)
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
- `.float/` folder
- Dotfiles and hidden files
- Items matching ignore patterns (see Nav File Format Reference)

**No AI needed.** Pure file manipulation with format preservation.

---

### System Buoy

**Purpose:** Update the structure map in `.float/system.md`.

**Input:**
- List of structural changes: new folders, removed folders, renamed folders

**Behavior:**
1. Read `.float/system.md`
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

**Purpose:** Create new `.float/nav/*.md` files for major folders that don't have one.

**Input:**
- Folder path that needs a nav file
- Existing nav file format (for style consistency)

**Behavior:**

1. **Scan the folder**
   - List all files (excluding dotfiles, ignored patterns)
   - List all subfolders
   - Note if folder is empty

2. **Generate `nav/{folder}.md`**

   Use this template, adapting based on folder contents:

```markdown
---
title: {Folder Name}
type: nav
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

3. **Template adaptation rules:**
   - **No files?** Omit the Files/Contents table entirely
   - **No subfolders?** Omit the Subfolders table entirely
   - **Empty folder?** Just frontmatter + heading + "Empty folder" note
   - **Match parent style:** If existing nav files use 3-column tables, use 3-column

4. **Folder description generation:**
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

5. **File listing rules:**
   - List files alphabetically
   - Use `**bold**` for filenames
   - Add trailing `/` for folders
   - All purposes start as `[needs description]`
   - Describe Buoy fills these in later (or human)

6. **Nested subfolder handling:**
   - Include nested subfolders in the same nav file
   - Use subsections: `### subfolder/`
   - Example: `nav/docs.md` includes `docs/philosophy/` as a subsection

7. **AI hook comment:**
   - Always add maintenance comment at bottom
   - Format: `<!-- AI: Update this file when contents of {Folder Name} change. -->`

**Minimal AI:** Only needed if folder name is non-obvious and description can't be inferred. Otherwise purely template-based.

---

### Log Buoy

**Purpose:** Record sync activity to `.float/logs/YYYY-MM-DD.md`.

**Input:**
- List of actions taken by other buoys

**Behavior:**
1. Determine today's log file: `.float/logs/{YYYY-MM-DD}.md`
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
.float/
├── system.md          # Boot loader
├── nav/               # Centralized navigation
│   ├── root.md
│   ├── docs.md
│   ├── src.md
│   └── ...
└── logs/
    └── YYYY-MM-DD.md

.claude/commands/
└── float.md           # Handles: /float (boot) and /float sync
```

Single command file routes based on `$ARGUMENTS`. No additional files needed.

**Integration with FloatSystem:**
- `/float` reads `.float/system.md` for boot protocol
- `/float` reads all `.float/nav/*.md` files for context
- `/float sync` modifies nav files and system.md via buoys
- Activity logged to `.float/logs/YYYY-MM-DD.md`

---

## Logging

`/float sync` logs activity to `.float/logs/YYYY-MM-DD.md`:

```markdown
## 14:32 — /float sync

- Updated: .float/nav/docs.md (+1 file, -1 file)
- Updated: .float/nav/examples.md (+1 subfolder)
- Described: new-feature.md → "Feature documentation for..."
- Updated: .float/system.md (structure map)
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
- Logging to `.float/logs/`

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
5. New major folders get nav files (via Scaffold Buoy)
6. Activity logged to `.float/logs/` (via Log Buoy)
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

1. ✅ Update `/float` command for centralized architecture
2. ✅ Update spec for centralized architecture
3. ✅ Rename Index Buoy → Nav Buoy
4. Test on floatprompt repo
5. Iterate based on real usage

---

© 2025 @MDS
