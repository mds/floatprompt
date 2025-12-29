<fp>
<json>
{
  "STOP": "Float Sync Tool. Verify nav files match reality and fix discrepancies.",

  "meta": {
    "title": "/float sync",
    "id": "float-sync",
    "format": "floatprompt",
    "version": "0.8.0"
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
    "next_step_logic": "Changes applied with [needs description] placeholders? → Run /float enhance. Otherwise → Ready for: human direction",
    "buoys": {
      "check_buoy": "Verify one nav file vs folder (parallel, one per nav file)",
      "nav_buoy": "Update file table in one nav file",
      "system_buoy": "Update structure map in system.md",
      "scaffold_buoy": "Create one new nav file",
      "log_buoy": "Append to session log"
    }
  }
}
</json>
<md>
# /float sync — Structure Integrity Tool

**Verify nav files match reality and fix discrepancies.**

This command ensures `.float/nav/*.md` files accurately reflect actual folder contents.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Show details, propose fixes, apply with approval |
| Clean | Report OK |

## What It Checks

1. **Nav coverage** — Every visible folder has a nav file
2. **Table accuracy** — Files in nav match actual folder contents
3. **Subfolder accuracy** — Subfolders in nav match actual subfolders
4. **Structure map** — system.md structure map matches reality

## Process

### 1. Detect (Shell-Assisted)

Use shell commands for fast detection:

```bash
# List actual files in folder
ls docs/

# Parse nav file entries
grep "^\| \*\*" .float/nav/docs.md

# Find missing nav files
ls -d */ | grep -v -E '^(node_modules|dist|build|\.git|\.float)/$'
```

Compare shell output with nav file contents to identify:
- **Missing** — In folder but not in nav
- **Stale** — In nav but not in folder
- **New folders** — Folders without nav files

### 2. Report

Show issues with details:

```
Sync Issues Found:

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

1. Add to nav/docs.md:
   - new-guide.md [needs description]
   - api-reference.md [needs description]

2. Remove from nav/docs.md:
   - old-doc.md

3. Add to nav/src.md subfolders:
   - utils/

4. Create nav/tests.md

Apply changes? (y/n):
```

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
| Update nav table | Nav Buoy | Add/remove rows, preserve existing descriptions |
| Update structure map | System Buoy | Add/remove folders in system.md |
| Create new nav file | Scaffold Buoy | Generate nav file with placeholder descriptions |

**Parallelization:** Independent fixes run in parallel.

### 6. Validate

Orchestrator checks buoy work:
- Verify changes were applied correctly
- Re-run detection to confirm clean state
- Report any remaining issues

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

```
Changes applied?
  → Yes: [needs description] placeholders exist?
          → Yes: "Next: Run /float enhance to fill descriptions"
          → No: "Ready for: human direction"
  → No (clean): "Ready for: human direction"
```

## Buoy Prompts

### Check Buoy

```
Verify .float/nav/{folder}.md against actual {folder}/ contents:
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

### Nav Buoy

```
Update .float/nav/{folder}.md:
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
Create .float/nav/{folder}.md for a new folder:
1. List all files in {folder}/ (exclude dotfiles, etc.)
2. List all subfolders in {folder}/
3. Create nav file with:
   - YAML frontmatter (title, type: nav, ai_updated)
   - Brief description of folder purpose
   - Contents table with "[needs description]" for each file
   - Subfolders table if subfolders exist
4. Return the complete nav file content
```

### Log Buoy

```
Append to .float/logs/{date}.md:
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
> /float sync

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

Next: Run /float enhance to fill descriptions
```

**Clean state:**
```
> /float sync

FloatPrompt sync complete.
Directory: /Users/mds/projects/my-app
Status: Clean — no changes needed

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
