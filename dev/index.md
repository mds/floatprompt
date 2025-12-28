---
title: Development
type: index
status: current
ai_updated: 2025-12-28
---

# Development

Development tools and update management for FloatPrompt.

## Files

| File | Purpose |
|------|---------|
| **update-creator.txt** | FloatPrompt tool for creating system updates. Upload to AI and describe what needs to change. |
| **update-protocol.txt** | FloatPrompt tool for executing updates with validation. Ensures changes align with goals and voice principles. |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **updates/** | Update files (closed and in-progress) |

## Update Workflow

1. **Create update spec** using `update-creator.txt`
2. **Execute update** using `update-protocol.txt`
3. **Validate** against goals hierarchy and voice principles
4. **Move to updates/closed/** when complete

## Key Principles

From `update-protocol.txt`:

- Territory assessment first (unless explicitly skipped)
- Validate against goals before execution
- Human approval gates required for system modifications
- Rollback capability maintained
- Archaeological record of all changes

## When to Use

Use these tools when making systematic changes to FloatPrompt itself. For normal floatprompt creation, use the main `floatprompt.txt` template.

---

See also: CLAUDE.md in this folder for Claude Code specific guidance.
