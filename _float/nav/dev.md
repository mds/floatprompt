---
title: Development
type: nav
ai_updated: 2025-12-28
---

# Development

Development tools and update management.

## Contents

| File | Purpose |
|------|---------|
| **update-creator.md** | FloatPrompt tool for creating update specs |
| **update-protocol.md** | Protocol for managing updates |

## Subfolders

### updates/

Update specifications organized by status.

| Subfolder | Purpose |
|-----------|---------|
| **in-progress/** | Updates currently being worked on |
| **closed/** | Completed or archived updates |

## Update Workflow

1. Create update spec using `update-creator.md`
2. Place in `updates/in-progress/`
3. Work on implementation
4. Move to `updates/closed/` when done

## Safety Requirements

When working in dev/:
- Never delete update specs without approval
- Keep update-protocol.md in sync with actual workflow
- Document breaking changes clearly
