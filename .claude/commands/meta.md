# /meta — FloatPrompt Maintainer Tooling

**Internal command for FloatPrompt system maintenance.**

This command is for FloatPrompt maintainers only. It does not ship to user projects.

## Execution

Read and execute `floatprompt/meta/tool-sync.md`.

## What It Does

Verifies FloatPrompt tools are consistent:

| Check | Description |
|-------|-------------|
| Version sync | All tools at same version |
| Structure sync | All tools have required sections |
| Router sync | Routing table matches actual tools |
| Template sync | Templates match source files |
| Deployment sync | bin/floatprompt.js lists all tools |

## Usage

```
/meta           Run full tool sync check
```

## When to Use

- Before releasing a new version
- After adding or modifying tools
- After updating `.claude/commands/float.md`
- When something feels out of sync

## Related

- `floatprompt/meta/tool-sync.md` — The tool specification
- `.float/meta/tools/` — The tools being checked
- `.claude/commands/float.md` — The user-facing router
