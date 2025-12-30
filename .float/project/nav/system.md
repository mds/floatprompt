---
title: System
type: nav
status: current
created: 2025-12-30
related: system/float.md, .float/system.md

human_author: @mds
human_intent: Navigate the SYSTEM pillar — how FloatPrompt works
human_context: Commands, buoys, maintenance documentation

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: Mirrored structure — tools now in system/claude/tools/ (source of truth for .float/)
---

# System

SYSTEM pillar — How FloatPrompt WORKS.

## Contents

| Item | Purpose |
|------|---------|
| **float.md** | Folder context |
| **manual.md** | Tool building guide |
| **architecture/** | System architecture docs |
| **claude/** | Claude Code integration |
| **maintenance/** | System maintenance |

### architecture/

| File | Purpose |
|------|---------|
| `overview.md` | FloatPrompt System architecture (.float/ folder) |

### claude/

| File | Purpose |
|------|---------|
| `integration.md` | Claude Code integration guide |
| `commands.md` | /float command system |
| `buoys.md` | Float Buoys pattern |
| `tools/` | Source of truth for /float commands |

#### claude/tools/

| File | Purpose |
|------|---------|
| `float.md` | Boot FloatPrompt |
| `float-sync.md` | Verify nav files match folders |
| `float-fix.md` | Hunt stale references and broken links |
| `float-context.md` | Generate project terrain map |
| `float-enhance.md` | Fill placeholders and improve descriptions |
| `float-build.md` | Build new FloatPrompt tools |
| `float-delta.md` | Track changes for updates |
| `float-focus.md` | Focus on specific area |
| `float-harvest.md` | Extract patterns from content |
| `float-relate.md` | Find related files |
| `update.md` | Structured update planning |
| `tool-sync.md` | Verify tools are synced |
| `types/` | Tool type templates |

#### claude/tools/types/

| File | Purpose |
|------|---------|
| `extractor.md` | Extractor tool type |
| `pipeline.md` | Pipeline tool type |
| `processor.md` | Processor tool type |
| `reconciler.md` | Reconciler tool type |
| `reference.md` | Reference tool type |
| `scorer.md` | Scorer tool type |

### maintenance/

| File | Purpose |
|------|---------|
| `checklist.md` | System maintenance checklist |

## Key Concepts

- **Architecture**: How the .float/ system is structured
- **Claude**: Slash commands (/float, /float-sync, etc.) and buoy patterns
- **Maintenance**: Keeping the FloatPrompt System healthy
- **Tools**: Source of truth for all /float command implementations
