# Verify tools are synced (maintainer only)

**Internal command for FloatPrompt system maintenance.**

This command is for FloatPrompt maintainers only. It does not ship to user projects.

Read and execute `.float/tools/tool-sync.md`.

## What It Checks

| Check | Description |
|-------|-------------|
| Version sync | All tools at same version |
| Structure sync | All tools have required sections |
| Command sync | Each tool has a command wrapper |
| Template sync | Templates match source files |
| Deployment sync | bin/floatprompt.js lists all tools and commands |

## When to Use

- Before releasing a new version
- After adding or modifying tools
- After creating new command wrappers
- When something feels out of sync
