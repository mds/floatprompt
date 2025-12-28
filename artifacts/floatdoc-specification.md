---
title: FloatDoc Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define the floatdoc format for lightweight document context
human_context: Part of FloatPrompt system - floatdoc provides mutual understanding without behavioral modification

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Updated _float.md → float.md naming
  Added related field as optional
  Clarified type can have multiple comma-separated values
  Validated against docs/ files - spec covers all cases
---

# FloatDoc Specification

**Version:** 0.1.0 (Draft)

## Overview

FloatDoc is a lightweight context format within the FloatPrompt system. While floatprompts modify AI behavior, floatdocs provide mutual understanding between humans and AI about what a document IS.

**FloatPrompt System Hierarchy:**

| Component | Purpose | Format |
|-----------|---------|--------|
| **FloatSystem** | Organizational layer | Folder structure |
| **FloatPrompt** | Tools (modify AI behavior) | `<fp><json><md></fp>` in `.txt` |
| **FloatDoc** | Context (mutual understanding) | YAML frontmatter in `.md` |
| **FloatNav** | Navigation (folder map) | `float.md` |

## Core Principles

**Self-documenting**: Every document carries context about what it is.

**Recursive**: AI helps maintain documentation. Human stays in control.

**Portable**: Plain text travels anywhere.

**Flat structure**: No YAML nesting. Prefixes instead.

## Format

FloatDoc uses YAML frontmatter at the top of any markdown file:

```yaml
---
title:
type:
status:
created:
related:

human_author:
human_intent:
human_context:

ai_model:
ai_updated:
ai_notes:
---

# Document content starts here
```

## Field Definitions

### Document Metadata (unprefixed)

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Document name |
| `type` | Yes | What kind of document (emergent, can be multiple comma-separated) |
| `status` | Yes | Current state (emergent) |
| `created` | Yes | Date created (YYYY-MM-DD or YYYY-MM or YYYY) |
| `related` | No | Related files (comma-separated list) |

### Human Attribution (human_ prefix)

| Field | Required | Description |
|-------|----------|-------------|
| `human_author` | Yes | Who created this |
| `human_intent` | Yes | Why this exists (one line) |
| `human_context` | No | Additional context if needed |

### AI Attribution (ai_ prefix)

| Field | Required | Description |
|-------|----------|-------------|
| `ai_model` | No | Which AI contributed |
| `ai_updated` | No | Last AI interaction date |
| `ai_notes` | No | AI observations and breadcrumbs |

## Field Values

### Emergent Fields

`type` and `status` are emergent (freeform). Common values:

**type** (can be multiple, comma-separated):
- article, notes, transcript, research, email
- journal, planning, reference, curriculum
- social, newsletter, documentation, specification
- methodology, guide, manifesto, philosophy

Example: `type: methodology, documentation`

**status:**
- draft, complete, published, archived
- living, raw, processed, sent, active

No fixed list. Use what fits.

### AI-Maintained Fields

AI updates these fields with human approval:

- `ai_updated`: Timestamp of last AI interaction
- `ai_notes`: Observations, suggestions, breadcrumbs

Example:
```yaml
ai_updated: 2025-12-28
ai_notes: |
  3 action items unextracted
  References outdated 2025-06 doc
  Consider archiving deprecated section
```

## Ownership Rules

| Field Group | Who Controls | Who Updates |
|-------------|--------------|-------------|
| Unprefixed (title, type, status, created) | Human | Human |
| human_ fields | Human | Human |
| ai_ fields | Human (approval) | AI (suggests) |

AI acts as QA manager. Human remains in control.

## Examples

### Journal Entry

```yaml
---
title: 2025-01-15 Journal
type: journal
status: complete
created: 2025-01-15

human_author: MDS
human_intent: Daily reflection
human_context: Personal, not for publication

ai_model:
ai_updated:
ai_notes:
---
```

### Living Research Document

```yaml
---
title: AI Tools Landscape
type: research
status: living
created: 2025-02-01

human_author: MDS
human_intent: Track AI design tools as they evolve
human_context: Updated monthly, feeds into course curriculum

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Last full review: 2025-12-15
  3 new tools added since last review
  Suggest archiving "deprecated" section
---
```

### Transcript (Raw)

```yaml
---
title: Dan Martell Coaching Call
type: transcript
status: raw
created: 2025-01-09

human_author: MDS
human_intent: Capture coaching insights
human_context: Needs processing for action items

ai_model: Whisper
ai_updated: 2025-01-09
ai_notes: |
  5 action items to extract
  Key themes: pricing, team hiring
---
```

### External Reference (Archived)

```yaml
---
title: "The Future of Design Tools" by John Doe
type: reference
status: archived
created: 2025-03-15

human_author: John Doe (external)
human_intent: Saved for research
human_context: Original source: example.com/article

ai_model:
ai_updated:
ai_notes: Referenced in 3 other docs
---
```

### Collaboration Document

```yaml
---
title: Q1 2026 Planning
type: planning
status: active
created: 2025-12-15

human_author: MDS, Lillian
human_intent: Quarterly planning
human_context: Internal team document

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  2 decisions pending
  Blocked on budget approval
---
```

## FloatNav (`float.md`)

Every folder has a `float.md` file that serves as navigation:

```yaml
---
title: Artifacts 2025
type: index
status: living
created: 2025-01-01

human_author: MDS
human_intent: Navigate 2025 artifacts
human_context: Historical archive of floatprompt evolution

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: 113 files catalogued
---

# Artifacts 2025

This folder contains historical documentation of FloatPrompt's evolution.

## Contents

- **Specifications** — Core protocol definitions
- **Breakthroughs** — Milestone moments
- **Updates** — Incremental improvements

## Key Files

- `2025-06-05-floatPrompt-specification.md` — Foundational spec
- `2025-06-19-floatprompt-handshake.md` — "The handshake" insight
- `2025-12-28-floatdoc-specification.md` — This format

## Status

Active archive. AI maintains catalogue.
```

The `float.md` naming convention provides clear visibility as the folder's navigation file.

## Relationship to FloatPrompt

| Aspect | FloatPrompt | FloatDoc |
|--------|-------------|----------|
| Purpose | Modify AI behavior | Provide context |
| Format | `<fp><json><md></fp>` | YAML frontmatter |
| Complexity | High (behavioral specs) | Low (metadata) |
| STOP directive | Yes | No |
| Requirements | Yes | No |
| AI role | Defined behavior | Observation only |

**FloatPrompt** = "Do this"
**FloatDoc** = "This is what this is"

## Validation

A valid floatdoc:

1. Begins with `---` and ends section with `---`
2. Has required fields: title, type, status, created, human_author, human_intent
3. Uses flat structure (no nesting)
4. Uses correct prefixes (human_, ai_)

## Future Considerations

- Tooling for validation
- Templates for common types
- Integration with Obsidian, VS Code
- AI automation for maintaining ai_ fields

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
