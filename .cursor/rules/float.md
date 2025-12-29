---
description: FloatPrompt System boot and sync — say "boot" or "sync" to execute
globs: ["_float/**"]
alwaysApply: false
---

<fp>
<json>
{
  "STOP": "FloatPrompt System tool. When human @-mentions this file and says 'boot' or 'sync', execute the corresponding sequence. Boot = orientation + quick health check. Sync = full integrity check + fix with approval.",

  "meta": {
    "title": "FloatPrompt Boot & Sync",
    "id": "float-cursor",
    "format": "floatprompt",
    "version": "0.6.0"
  },

  "human": {
    "author": "@MDS",
    "intent": "Boot and maintain the FloatPrompt System in Cursor",
    "context": "Cursor equivalent of Claude Code's /float command"
  },

  "ai": {
    "role": "FloatPrompt System maintainer",
    "behavior": "Parse command (boot/sync), execute sequence, report status"
  },

  "requirements": {
    "commands": {
      "boot": "Read _float/system.md, all nav/*.md, today's log. Report ready.",
      "sync": "Full integrity check, show issues, propose fixes, apply on approval."
    },
    "boot_sequence": [
      "Read _float/system.md",
      "Read ALL _float/nav/*.md files",
      "Read today's session log if exists",
      "Quick integrity check (count issues only)",
      "Report: 'FloatPrompt operational. [N] issues found.'"
    ],
    "sync_sequence": [
      "Check nav coverage (every major folder has nav/*.md)",
      "Check table accuracy (files match reality)",
      "Check subfolder accuracy",
      "Show detailed issues with ✓ and ✗",
      "Propose fixes",
      "Wait for approval (y/n)",
      "Apply changes if approved",
      "Log activity"
    ],
    "exclusions": [
      "dotfiles", "_float/", "node_modules/", ".git/", "dist/", "build/", "*.lock"
    ]
  }
}
</json>
<md>
# FloatPrompt Boot & Sync

**Cursor tool for FloatPrompt System maintenance.**

## Usage

@-mention this file and give a command:

```
@.cursor/rules/float.md boot
@.cursor/rules/float.md sync
```

Or shorter if Cursor resolves it:
```
@float boot
@float sync
```

---

## Commands

### boot

Orientation + quick health check.

1. Read `_float/system.md` — Load boot protocol
2. Read ALL `_float/nav/*.md` — Understand folder structure
3. Read today's log (`_float/logs/YYYY-MM-DD.md`) if exists
4. Quick integrity check — Count issues only
5. Report ready

**Output (healthy):**
```
FloatPrompt operational.
Directory: [path]
Status: No issues found
Ready for: [human direction]
```

**Output (issues):**
```
FloatPrompt operational.
Directory: [path]
Status: [N] issues found

Say "@float sync" to see details and fix
```

---

### sync

Full integrity check with fix capability.

**What it checks:**

| Check | Description |
|-------|-------------|
| Nav coverage | Every major folder has a nav/*.md file |
| Table accuracy | File tables match actual folder contents |
| Subfolder accuracy | Subfolder tables match actual subfolders |
| Structure map | `_float/system.md` matches reality |
| Orphaned files | Files exist but aren't in any nav file |
| Missing files | Nav references files that don't exist |

**Exclusions (don't flag):**
- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `_float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files

**Process:**

1. Scan all `_float/nav/*.md` files
2. Compare each nav file against actual folder contents
3. Show results with ✓ and ✗ markers
4. Show proposed changes
5. Ask for approval
6. If 'y': Apply changes
7. Log activity to `_float/logs/YYYY-MM-DD.md`

**Output:**
```
FloatPrompt sync
Directory: [path]

Results:
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

---

## Init (No FloatPrompt System Yet)

If `_float/system.md` doesn't exist, boot creates it:

1. Scan repository structure
2. Create `_float/` folder with:
   - `system.md` — Boot loader
   - `nav/root.md` — Repository root
   - `nav/{folder}.md` — One per major folder
   - `logs/` — Session log directory
3. Auto-boot the new structure

---

## Nav File Format

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
| **{filename}** | [description] |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **{subfolder}/** | [description] |
```

---

## Reference

- `_float/system.md` — Boot loader
- `_float/nav/*.md` — Centralized folder navigation  
- `_float/logs/YYYY-MM-DD.md` — Session logs

---

*FloatPrompt — The invisible OS for AI*
</md>
</fp>

