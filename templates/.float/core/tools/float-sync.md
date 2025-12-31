<fp>
<json>
{
  "STOP": "Float Sync Tool. Verify nav files match reality and fix discrepancies.",

  "meta": {
    "title": "/float sync",
    "id": "float-sync",
    "format": "floatprompt",
    "version": "0.12.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Keep structure files synchronized with actual folder contents",
    "context": "Run when /float reports issues or after major file changes"
  },

  "ai": {
    "role": "Structure integrity guardian",
    "behavior": "Detect discrepancies, propose fixes, apply with approval, validate results"
  },

  "requirements": {
    "duality": {
      "condition_a": "Issues found",
      "action_a": "Show details, propose fixes, apply with approval",
      "condition_b": "Clean",
      "action_b": "Report OK"
    },
    "status_format": "FloatPrompt sync complete.\nDirectory: [path]\nStatus: [result]\n\n[Next step or Ready for: human direction]",
    "next_step_logic": "Always suggest /float-think as next step. Float-think will analyze results and decide if float-enhance is needed.",
    "buoys": {
      "check_buoy": "Verify one nav file vs folder (parallel, one per nav file)",
      "structural_buoy": "Create missing core/index.md or project/project.md",
      "nav_buoy": "Update file table in one nav file",
      "system_buoy": "Update structure map in system.md",
      "scaffold_buoy": "Create one new nav file",
      "log_buoy": "Append to session log"
    },
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    }
  }
}
</json>
<md>
# /float sync — Structure Integrity Tool

**Verify nav files match reality and fix discrepancies.**

This command ensures `.float/project/nav/*.md` files accurately reflect actual folder contents.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Show details, propose fixes, apply with approval |
| Clean | Report OK |

## What It Checks

1. **Structural references** — `core/index.md` and `project/project.md` exist
2. **Nav coverage** — Every visible project folder has a nav file
3. **Table accuracy** — Files listed in nav match actual folder contents
4. **Subfolder accuracy** — Subfolders listed in nav match actual subfolders
5. **Structure map** — system.md structure map matches reality

## Process

### 1. Detect (Shell-Assisted)

Use shell commands for fast detection:

```bash
# Check structural reference files exist
test -f .float/core/index.md && echo "index.md OK" || echo "index.md MISSING"
test -f .float/project/project.md && echo "project.md OK" || echo "project.md MISSING"

# List actual files in folder
ls docs/

# Parse nav file entries
grep "^\| \*\*" .float/project/nav/docs.md

# Find missing nav files
ls -d */ | grep -v -E '^(node_modules|dist|build|\.git|\.float)/$'
```

Compare shell output with nav file contents to identify:
- **Missing structural refs** — `core/index.md` or `project/project.md` doesn't exist
- **Missing** — In folder but not in nav
- **Stale** — In nav but not in folder
- **New folders** — Folders without nav files

**Report:** Call float-report --phase=map with findings

### 2. Report

Show issues with details:

```
Sync Issues Found:

Structural references:
  Missing: core/index.md

docs/:
  Missing: new-guide.md, api-reference.md
  Stale: old-doc.md (deleted)

src/:
  Missing subfolder: utils/

New folders without nav:
  tests/
```

### 3. Propose

Offer fixes:

```
Proposed Fixes:

1. Create core/index.md (structural reference)

2. Add to nav/docs.md:
   - new-guide.md [needs description]
   - api-reference.md [needs description]

3. Remove from nav/docs.md:
   - old-doc.md

4. Add to nav/src.md subfolders:
   - utils/

5. Create nav/tests.md

Apply changes? (y/n):
```

**Report:** Call float-report --phase=decide with proposed actions

### 4. Wait for Approval

| Response | Action |
|----------|--------|
| `y` or `yes` | Apply all proposed changes |
| `n` or `no` | Cancel, no changes made |
| Specific feedback | Address feedback, re-propose |

### 5. Fix via Buoys

Spawn targeted buoys for fixes:

| Fix Type | Buoy | Task |
|----------|------|------|
| Create structural ref | Structural Buoy | Generate core/index.md or project/project.md |
| Update nav table | Nav Buoy | Add/remove rows, preserve existing descriptions |
| Update structure map | System Buoy | Add/remove folders in system.md |
| Create new nav file | Scaffold Buoy | Generate nav file with placeholder descriptions |

**Parallelization:** Independent fixes run in parallel.

### 6. Validate

Orchestrator checks buoy work:
- Verify changes were applied correctly
- Re-run detection to confirm clean state
- Report any remaining issues

**Report:** Call float-report --phase=structure with results

### 7. Log

Append activity to session log via Log Buoy:

```markdown
## HH:MM — /float sync

- Added 2 files to nav/docs.md
- Removed 1 stale entry from nav/docs.md
- Created nav/tests.md
```

## Status Output

```
FloatPrompt sync complete.
Directory: /path/to/project
Status: [result]

[Next step recommendation]
```

**Results:**
- "Clean — no changes needed"
- "Fixed 3 issues"
- "Fixed 3 issues, 5 descriptions pending"

## Next Step Logic

**Always suggest `/float-think` as the next step:**

```
Next: /float-think
```

Float-think will analyze the sync results and decide if float-enhance is needed for placeholders.

## Buoy Prompts

### Check Buoy

```
Verify .float/project/nav/{folder}.md against actual {folder}/ contents:
1. Read the nav file and parse the Contents table
2. List actual files in {folder}/ (exclude: dotfiles, node_modules, .git, dist, build)
3. List actual subfolders in {folder}/
4. Compare nav entries to actual contents
5. Return JSON: {
     navFile: string,
     status: "ok" | "issues",
     missing: string[],
     stale: string[],
     missingSubfolders: string[],
     staleSubfolders: string[]
   }
```

### Structural Buoy

```
Create missing structural reference file:
1. Determine which file is missing: core/index.md or project/project.md
2. Read templates/.float/core/index.md or templates/.float/project/project.md
3. Copy template to appropriate location
4. Update created date to today
5. Return confirmation
```

### Nav Buoy

```
Update .float/project/nav/{folder}.md:
1. Add these files to Contents table: [list]
2. Remove these files from Contents table: [list]
3. Add these subfolders: [list]
4. Remove these subfolders: [list]
5. Preserve existing descriptions for unchanged rows
6. Use "[needs description]" for new entries
7. Maintain alphabetical order
8. Update ai_updated timestamp
9. Return the updated file content
```

### System Buoy

```
Update structure map in .float/system.md:
1. Add these folders to structure map: [list]
2. Remove these folders: [list]
3. Preserve existing annotations and comments
4. Maintain tree formatting
5. Return the updated structure map section
```

### Scaffold Buoy

```
Create .float/project/nav/{folder}.md for a new folder:
1. List all files in {folder}/ (exclude dotfiles, etc.)
2. List all subfolders in {folder}/
3. Create nav file with full floatprompt doc metadata:

   ---
   title: {Folder Name}
   type: nav
   status: current
   created: {YYYY-MM-DD}
   related: {folder}/

   human_author: @mds
   human_intent: Document {folder}/ contents for AI navigation
   human_context: [needs description]

   ai_model: Claude Opus 4.5
   ai_updated: {YYYY-MM-DD}
   ai_notes: Scaffolded by /float sync
   ---

4. Add heading and description of folder purpose
5. Add Contents table with "[needs description]" for each file
6. Add Subfolders table if subfolders exist
7. Return the complete nav file content

Note: human_author defaults to @mds. Override from package.json author if available.
```

### Log Buoy

```
Append to .float/project/logs/{date}.md:
1. Create file if it doesn't exist (with date header)
2. Add entry at top (newest first):
   ## HH:MM — {action}
   - {change 1}
   - {change 2}
3. Keep entries concise (one line per change)
4. Return confirmation
```

## Exclusions

These are never flagged as issues:

- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `.float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)

## AI Discretion

**The 3+ Rule:** Spawn buoys when 3+ parallel operations needed. Below threshold, direct execution OK.

| Operations | Approach |
|------------|----------|
| 1-2 | Direct execution acceptable |
| 3+ | Spawn fleet for parallelization |

**Descriptions:** AI judges obvious vs complex — write directly or use `[needs description]` placeholders.

Outcomes matter, method is flexible.

## Examples

**Issues found:**
```
> /float-sync

Sync Issues Found:

docs/:
  Missing: new-guide.md
  Stale: old-doc.md

Proposed Fixes:
1. Add to nav/docs.md: new-guide.md [needs description]
2. Remove from nav/docs.md: old-doc.md

Apply changes? (y/n): y

FloatPrompt sync complete.
Directory: /Users/mds/projects/my-app
Status: Fixed 2 issues, 1 description pending

Next: /float-think
```

**Clean state:**
```
> /float-sync

FloatPrompt sync complete.
Directory: /Users/mds/projects/my-app
Status: Clean — no changes needed

Next: /float-think
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
