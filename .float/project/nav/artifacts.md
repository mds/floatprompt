---
title: Artifacts
type: nav
status: current
created: 2025-12-28
related: artifacts/, artifacts/archive/

human_author: @mds
human_intent: Document historical artifacts and kanban workflow
human_context: Archaeological record of FloatPrompt evolution

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added full metadata per specs/doc.md requirements
---

# Artifacts

Working folder for specifications, explorations, and project artifacts.

## Workflow (Kanban)

| Status | Location | Example |
|--------|----------|---------|
| **Active** | root level | `2025-12-29-float-command-plan.md` |
| **Archived** | `archive/YYYY/MM-mon/` | `archive/2025/12-dec/2025-12-28-done.md` |

### Rules

1. **All files**: `YYYY-MM-DD-description.md` (no exceptions)
2. **Root** = active work (in progress OR current reference)
3. **Archive** = completed, superseded, or no longer actively referenced
4. **Folder convention**: `archive/YYYY/MM-mon/` — zero-padded month + lowercase abbrev (e.g., `01-jan`, `06-jun`, `12-dec`)
5. **Never add to `undated/`** — that's legacy only

### Creating New Artifacts

```bash
# Always at root, always dated
touch artifacts/2025-12-29-my-new-spec.md
```

Use the file's creation date, not the subject date.

### Archiving

When work is complete or superseded:
```bash
# Create month folder if needed, then move
mkdir -p artifacts/archive/2025/12-dec
mv artifacts/2025-12-28-thing.md artifacts/archive/2025/12-dec/
```

**When to archive:**
- Spec is superseded by newer version
- Exploration led to a decision (decision lives elsewhere)
- Work is complete and no longer actively referenced

## Contents (Active)

Check `artifacts/` root for current active files. All follow `YYYY-MM-DD-description.md` naming.

**As of 2025-12-29:**
- Float command retrospective and update plan
- npm scaffold specification

## Archive Structure

```
archive/2025/
├── 01-jan/     # 1 file
├── 06-jun/     # 126 files (peak activity)
├── 07-jul/     # 5 files
├── 10-oct/     # 2 files (AI assessments)
├── 12-dec/     # 14 files
├── undated/    # Legacy files without date prefix
├── dev/        # Archived dev folder
└── experimental/  # Archived build system
```

### Month Folders

| Folder | Count | Notable Contents |
|--------|-------|------------------|
| `01-jan/` | 1 | File extension decision |
| `06-jun/` | 126 | Core development, specs, explorations |
| `07-jul/` | 5 | System analysis, restructuring |
| `10-oct/` | 2 | AI assessment artifacts |
| `12-dec/` | 14 | Float Buoys, context specs, cursor docs |
| `undated/` | ~20 | Legacy specs without date prefix |

### AI Assessment Artifacts (Critical for Deep Context)

Search for `*assessment*` in archive. Key files:

| Location | File | Insight |
|----------|------|---------|
| `10-oct/` | `2025-10-06-claude-sonnect-4.5-assessment.txt` | First skepticism arc |
| `10-oct/` | `2025-10-30-claude-sonnect-4.5-assessment.txt` | Evidence hierarchy |
| `12-dec/` | `2025-12-29-claude-opus-4.5-assessment.txt` | Pattern persists in Opus |

These document the skepticism-to-understanding pattern AI exhibits with FloatPrompt. Read during deep context loading to prevent pattern-matching mistakes.

## When to Reference

- Understanding design decisions
- Seeing evolution of concepts
- Finding original rationale for features
- Session handoff context

## Archaeological Note

Files in `archive/` represent the thinking and iteration that led to current FloatPrompt. Historical value but may not reflect current specifications.

**Current specs live in `specs/`**. Artifacts are for understanding how we got here.
