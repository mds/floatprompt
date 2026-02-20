---
title: Document Name
type: article
status: draft
created: 2026-01-16
related: other-file.md, another.md

human_author: Your Name
human_intent: Why this document exists
human_context: Additional context if needed

ai_model: Claude Opus 4.5
ai_updated: 2026-01-16
ai_notes: |
  AI observations go here
  Can be multi-line
---

# Your document content starts here

## Required Fields

| Field | Description |
|-------|-------------|
| `title` | Document name |
| `type` | What kind (article, notes, transcript, research, journal, planning, reference, specification, guide) |
| `status` | Current state (draft, complete, published, archived, living, raw, active) |
| `created` | Date created (YYYY-MM-DD) |
| `human_author` | Who created this |
| `human_intent` | Why this exists (one line) |

## Optional Fields

| Field | Description |
|-------|-------------|
| `related` | Related files (comma-separated) |
| `human_context` | Additional context |
| `ai_model` | Which AI contributed |
| `ai_updated` | Last AI interaction date |
| `ai_notes` | AI observations and breadcrumbs |

## Field Ownership

| Field Group | Who Controls | Who Updates |
|-------------|--------------|-------------|
| Unprefixed | Human | Human |
| human_ fields | Human | Human |
| ai_ fields | Human (approval) | AI (suggests) |

AI acts as QA manager. Human remains in control.

## Examples

**Journal entry:**
```yaml
type: journal
status: complete
human_intent: Daily reflection
```

**Living research:**
```yaml
type: research
status: living
human_intent: Track AI tools as they evolve
ai_notes: |
  Last review: 2025-12-15
  3 new tools added
```

**Raw transcript:**
```yaml
type: transcript
status: raw
human_intent: Capture coaching insights
ai_notes: 5 action items to extract
```

## FloatPrompt System

| Component | Purpose | Format |
|-----------|---------|--------|
| **FloatPrompt System** | Project awareness | `.float/` folders |
| **FloatPrompt** | Tools (modify behavior) | `<fp>` tags in `.md` |
| **floatprompt doc** | Context (mutual understanding) | YAML frontmatter |

**FloatPrompt** = "Do this"
**floatprompt doc** = "This is what this is"

## Output

When you provide a document, I will:
1. Analyze the content
2. Ask clarifying questions (author, intent)
3. Generate appropriate YAML frontmatter
4. Return the complete document with frontmatter added
