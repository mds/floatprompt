<fp>
<json>
{
  "STOP": "Float Boot/Init Tool. Boot the FloatPrompt System or initialize if none exists.",

  "meta": {
    "title": "/float",
    "id": "float-boot",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Boot the FloatPrompt System for project awareness",
    "context": "Entry point command — run this first in any session"
  },

  "ai": {
    "role": "System bootloader and health checker",
    "behavior": "Fast boot, minimal overhead, report status and next step"
  },

  "requirements": {
    "duality": {
      "condition_a": "No .float/system.md exists",
      "action_a": "Init sequence",
      "condition_b": "Has .float/system.md",
      "action_b": "Boot sequence"
    },
    "status_format": "FloatPrompt operational.\nDirectory: [path]\nContext: [Loaded | Missing]\nStatus: [No issues found | N issues found]\n\n[Next step or Ready for: human direction]\n\nCommands:\n  /float-sync      Structure integrity\n  /float-fix       Content integrity\n  /float-context   Generate terrain map\n  /float-enhance   Fill placeholders\n  /float-focus     Deep dive into topic\n  /float-harvest   Mine knowledge\n  /float-relate    Map relationships\n  /float-delta     Ripple analysis\n  /float-build     Build tools",
    "next_step_logic": "Structure issues (missing nav/folders)? → /float-sync. Content issues (stale refs)? → /float-fix. Both? → /float-sync then /float-fix. Context missing? → /float-context. Otherwise → Ready for: human direction"
  }
}
</json>
<md>
# /float — Boot/Init Tool

**Boot the FloatPrompt System or initialize if none exists.**

This is the entry point command. Run `/float` first in any session to gain project awareness.

## Duality

| Condition | Action |
|-----------|--------|
| No `.float/system.md` | Init: create folder structure, auto-boot |
| Has `.float/system.md` | Boot: read files, quick health check |

## Init Sequence

When no FloatPrompt System exists:

1. **Create `.float/` folder structure:**
   ```
   .float/
   ├── system.md           # Boot loader
   ├── floatprompt/        # System internals
   │   ├── core/           # Templates
   │   └── tools/          # /float command tools
   └── project/            # Project data
       ├── context/        # Terrain maps (empty initially)
       ├── nav/            # Folder navigation
       └── logs/           # Session logs
   ```

2. **Create `system.md`** — Boot loader with structure map

3. **Create `project/nav/*.md`** for each visible folder:
   - Use shell to detect all folders: `ls -d */`
   - Exclude: `.git/`, `node_modules/`, `dist/`, `build/`, `.float/`
   - Create one nav file per folder with placeholder descriptions

4. **Create `project/logs/` directory** — Ready for session logs

5. **Auto-boot** — Execute boot sequence on newly created system

## Boot Sequence

When FloatPrompt System exists:

1. **Read `.float/system.md`** — Load boot protocol
2. **Read `.float/project/context/decisions.md`** (if exists) — Load decision history
3. **Read `.float/project/context/*.md`** (if exists) — Load terrain maps
4. **Read ALL `.float/project/nav/*.md`** — Load folder navigation
5. **Read today's session log** (if exists) — Load recent activity
6. **Quick integrity check** — Count issues only, no details:
   - Structure: nav files exist, folders exist
   - Content: stale references
   - System: router ↔ tools alignment
7. **Report status + next step**

## Shell Optimization

Boot is designed to be fast. Use shell commands where possible:

```bash
# Check if system exists
test -f .float/system.md

# Count nav files
ls .float/project/nav/*.md 2>/dev/null | wc -l

# List folders for init
ls -d */ | grep -v -E '^(node_modules|dist|build|\.git)/$'

# Check router ↔ tools alignment
test -f .claude/commands/float.md && echo "router exists"
ls .float/floatprompt/tools/float*.md 2>/dev/null | wc -l
```

## Status Output

```
FloatPrompt operational.
Directory: /path/to/project
Context: [Loaded | Missing]
Status: [No issues found | N issues found]

[Next step recommendation]

Commands:
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-focus     Deep dive into topic
  /float-harvest   Mine knowledge
  /float-relate    Map relationships
  /float-delta     Ripple analysis
  /float-build     Build tools
```

**Note:** Only `/float` shows the Context line and Commands list. Other commands omit them.

## Next Step Logic

```
Issues found?
  → Structure issues (missing nav files, folders)?
      → "Next: Run /float-sync to fix structure"
  → Content issues (stale references inside files)?
      → "Next: Run /float-fix to repair references"
  → System issues (router ↔ tools mismatch)?
      → "Next: Run /float-fix to repair system alignment"
  → Multiple types?
      → "Next: Run /float-sync (structure) then /float-fix (content + system)"
  → No issues: Context missing?
      → Yes: "Next: Run /float-context to generate terrain map"
      → No: "Ready for: human direction"
```

**Issue type detection:**
- **Structure**: nav file doesn't exist, folder doesn't exist, nav/folder mismatch
- **Content**: reference inside a file points to old/wrong path
- **System**: router missing, tool missing, router ↔ tools mismatch

## Buoys

None. Boot is a fast operation — no spawning needed.

## Examples

**Fresh project (init):**
```
> /float

FloatPrompt initialized.
Directory: /Users/mds/projects/my-app
Context: Missing
Status: No issues found

Created:
- .float/system.md
- .float/floatprompt/
- .float/project/nav/src.md
- .float/project/nav/tests.md
- .float/project/nav/docs.md

Next: Run /float-context to generate terrain map

Commands:
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-focus     Deep dive into topic
  /float-harvest   Mine knowledge
  /float-relate    Map relationships
  /float-delta     Ripple analysis
  /float-build     Build tools
```

**Existing project (boot):**
```
> /float

FloatPrompt operational.
Directory: /Users/mds/Documents/_Github/floatprompt
Context: Loaded (floatprompt.md)
Status: 2 issues found

Next: Run /float-sync to see details and fix

Commands:
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-focus     Deep dive into topic
  /float-harvest   Mine knowledge
  /float-relate    Map relationships
  /float-delta     Ripple analysis
  /float-build     Build tools
```

**Healthy project:**
```
> /float

FloatPrompt operational.
Directory: /Users/mds/Documents/_Github/floatprompt
Context: Loaded (floatprompt.md)
Status: No issues found

Ready for: human direction

Commands:
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-focus     Deep dive into topic
  /float-harvest   Mine knowledge
  /float-relate    Map relationships
  /float-delta     Ripple analysis
  /float-build     Build tools
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
