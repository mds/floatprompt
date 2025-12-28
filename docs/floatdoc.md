---
title: FloatDoc Format
type: specification
status: complete
created: 2025-12-28
related: floatprompt.md, floatsystem.md

human_author: MDS
human_intent: Define the FloatDoc YAML frontmatter format for document context
human_context: Lightweight context format - mutual understanding, not behavioral modification

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Created from artifacts/2025/floatdoc-specification.md, cleaned up for official docs
---

# FloatDoc Format

A FloatDoc is any markdown file with YAML frontmatter that provides context about what the document IS.

**FloatPrompt** = "Do this" (modifies AI behavior)
**FloatDoc** = "This is what this is" (provides context)

## Format

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

## Fields

### Document Metadata (required)

| Field | Description |
|-------|-------------|
| `title` | Document name |
| `type` | What kind of document (emergent, freeform) |
| `status` | Current state (emergent, freeform) |
| `created` | Date created (YYYY-MM-DD or YYYY-MM or YYYY) |

### Document Metadata (optional)

| Field | Description |
|-------|-------------|
| `related` | Related files (comma-separated list) |

### Human Attribution (required)

| Field | Description |
|-------|-------------|
| `human_author` | Who created this |
| `human_intent` | Why this exists (one line) |

### Human Attribution (optional)

| Field | Description |
|-------|-------------|
| `human_context` | Additional context if needed |

### AI Attribution (optional)

| Field | Description |
|-------|-------------|
| `ai_model` | Which AI contributed |
| `ai_updated` | Last AI interaction date |
| `ai_notes` | AI observations and breadcrumbs |

## Emergent Fields

`type` and `status` are freeform. Use what fits.

**Common types:**
- documentation, specification, guide, methodology
- article, notes, transcript, research
- journal, planning, reference, curriculum

**Common statuses:**
- draft, complete, published, archived
- living, raw, processed, current, active

## Ownership Rules

| Field Group | Who Controls |
|-------------|--------------|
| Unprefixed (title, type, status, created) | Human |
| human_ fields | Human |
| ai_ fields | AI (with human approval) |

AI can suggest updates to `ai_` fields. Human approves.

## Examples

### Documentation

```yaml
---
title: Goals
type: documentation
status: complete
created: 2025-06
related: principles.md, voice.md

human_author: MDS
human_intent: Establish the three-tier goal hierarchy
human_context: Core principle - the hierarchy is strict

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Added FloatDoc frontmatter
---
```

### Living Research

```yaml
---
title: AI Tools Landscape
type: research
status: living
created: 2025-02-01

human_author: MDS
human_intent: Track AI design tools as they evolve
human_context: Updated monthly

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Last full review: 2025-12-15
  3 new tools added since last review
---
```

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
---
```

## Relationship to FloatPrompt

| Aspect | FloatPrompt | FloatDoc |
|--------|-------------|----------|
| Purpose | Modify AI behavior | Provide context |
| Format | `<fp><json><md></fp>` | YAML frontmatter |
| Complexity | High (behavioral specs) | Low (metadata) |
| STOP directive | Yes | No |
| AI role | Defined behavior | Observation only |

## Validation

A valid FloatDoc:

1. Begins with `---` and ends section with `---`
2. Has required fields: title, type, status, created, human_author, human_intent
3. Uses flat structure (no YAML nesting)
4. Uses correct prefixes (human_, ai_)

---

See also: [FloatPrompt Format](floatprompt.md) | [FloatSystem](floatsystem.md)
