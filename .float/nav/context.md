---
title: Context
type: nav
status: current
created: 2025-12-28
related: context/float-map.md, context/float-context.md, context/float-deepdive.md

human_author: @mds
human_intent: Document onboarding context files for AI sessions
human_context: Tiered context loading based on task complexity

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added full metadata per specs/doc.md requirements
---

# Context

Onboarding context files for AI sessions. Choose depth based on task complexity.

## Contents

| File | Depth | Time | Use When |
|------|-------|------|----------|
| **float-map.md** | Quick | ~5 min | Simple tasks, quick questions |
| **float-context.md** | Standard | ~2 min | Need system understanding |
| **float-deepdive.md** | Full | ~15 min | Complex work, system evolution |

## Depth Principle

**Depth scales with complexity.**

- Quick tasks need quick context
- Deep work needs deep context
- Don't over-read for simple requests
- Don't under-read for complex changes

## File Purposes

### float-map.md
6 files, one MDS loop. Gives structural awareness without deep content.

### float-context.md
Conceptual overview. Explains what FloatPrompt is and how it works.

### float-deepdive.md
23+ files, 5 MDS loops. Full context including philosophy, history, and all documentation.

## Usage

Boot sequence in `.float/system.md` references these files. AI chooses appropriate depth based on task.
