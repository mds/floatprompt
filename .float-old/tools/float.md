<fp>
<json>
{
  "STOP": "Float Boot Tool. Boot the FloatPrompt System for project awareness.",

  "meta": {
    "title": "/float",
    "id": "float-boot",
    "format": "floatprompt",
    "version": "0.15.0"
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
      "condition_a": "No .float/float.md exists",
      "action_a": "Not installed: instruct user to run npx float init",
      "condition_b": "Has .float/float.md",
      "action_b": "Boot sequence"
    },
    "status_format": "FloatPrompt operational.\nDirectory: [path]\nContext: [Loaded | Missing]\nStatus: [No issues found | N issues found]\n\nNext: /float-think (will likely call [tools] to [action])\n\nCommands:\n  /float-think     Intelligent router (recommended)\n  /float-sync      Structure integrity\n  /float-fix       Content integrity\n  /float-context   Generate terrain map\n  /float-enhance   Fill placeholders\n  /float-all       Run all tools",
    "next_step_logic": "Always suggest /float-think as next step. Include prediction: 'will likely call float-sync, float-fix to resolve N issues' or 'will likely confirm healthy status'. Float-think is the intelligent router.",
    "reporting": {
      "protocol": "float-report",
      "phases": ["map"],
      "async": true
    }
  }
}
</json>
<md>
# /float — Boot Tool

**Boot the FloatPrompt System for project awareness.**

This is the entry point command. Run `/float` first in any session to gain project awareness.

## Duality

| Condition | Action |
|-----------|--------|
| No `.float/float.md` | Not installed: instruct user to run `npx float init` |
| Has `.float/float.md` | Boot: read files, quick health check |

## Not Installed

When no FloatPrompt System exists, output:

```
FloatPrompt not found.

Run: npx float init

Learn more: https://github.com/mds/floatprompt
```

Do not attempt to create files. The `.float/` structure is created by the npm package.

## Boot Sequence

When FloatPrompt System exists:

1. **Read `.float/float.md`** — Load boot protocol
2. **Read `.float/project/context/project-decisions.md`** (if exists) — Load decision history
3. **Read `.float/project/context/*.md`** (if exists) — Load terrain maps
4. **Read ALL `.float/project/nav/*.md`** — Load folder navigation
5. **Read today's session log** (if exists) — Load recent activity
6. **Quick integrity check** — Count issues only, no details:
   - Structure: nav files exist, folders exist
   - Content: stale references
   - System: router ↔ tools alignment
7. **Report status + next step**
8. **Report** — Call float-report with map data (what was loaded, any issues found)

## Shell Optimization

Boot is designed to be fast. Use shell commands where possible:

```bash
# Check if system exists
test -f .float/float.md

# Count nav files
ls .float/project/nav/*.md 2>/dev/null | wc -l

# Check router ↔ tools alignment
test -f .claude/commands/float.md && echo "router exists"
ls .float/tools/float*.md 2>/dev/null | wc -l
```

## Status Output

```
FloatPrompt operational.
Directory: /path/to/project
Context: [Loaded | Missing]
Status: [No issues found | N issues found]

Next: /float-think (will likely call [tools] to [action])

Commands:
  /float-think     Intelligent router (recommended)
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-all       Run all tools
```

**Note:** Only `/float` shows the Context line and Commands list. Other commands omit them.

## Next Step Logic

**Always recommend `/float-think` as the next step.** Include a prediction of what it will likely do:

```
Issues found?
  → "Next: /float-think (will likely call float-sync, float-fix to resolve N issues)"

No issues, context missing?
  → "Next: /float-think (will likely call float-context to generate terrain map)"

No issues, healthy?
  → "Next: /float-think (will likely confirm healthy status)"

  OR simply: "Ready for: human direction"
```

float-think is the intelligent router — it analyzes findings and calls the right tools. The human doesn't need to decide which tool to run.

## Buoys

None. Boot is a fast operation — no spawning needed.

## Examples

**Not installed:**
```
> /float

FloatPrompt not found.

Run: npx float init

Learn more: https://github.com/mds/floatprompt
```

**Boot with issues:**
```
> /float

FloatPrompt operational.
Directory: /Users/mds/Documents/_Github/floatprompt
Context: Loaded (project-context.md)
Status: 2 issues found

Next: /float-think (will likely call float-sync, float-fix to resolve 2 issues)

Commands:
  /float-think     Intelligent router (recommended)
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-all       Run all tools
```

**Healthy project:**
```
> /float

FloatPrompt operational.
Directory: /Users/mds/Documents/_Github/floatprompt
Context: Loaded (project-context.md)
Status: No issues found

Next: /float-think (will likely confirm healthy status)

Commands:
  /float-think     Intelligent router (recommended)
  /float-sync      Structure integrity
  /float-fix       Content integrity
  /float-context   Generate terrain map
  /float-enhance   Fill placeholders
  /float-all       Run all tools
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
