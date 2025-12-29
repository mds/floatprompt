---
title: floatprompt doc Format
type: specification
status: current
created: 2025-12-28
related: floatprompt.md, system.md

human_author: @mds
human_intent: Define the floatprompt doc YAML frontmatter format for document context
human_context: Rich context format that enables integrity checking via explicit relationships

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Strengthened field requirements. All fields now required. Added integrity section.
---

# floatprompt doc Format

A floatprompt doc is any markdown file with YAML frontmatter that provides context about what the document IS.

**FloatPrompt** = "Do this" (modifies AI behavior)
**floatprompt doc** = "This is what this is" (provides context)

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

Every field serves a purpose. Complete metadata enables integrity checking, prevents drift, and maintains explicit relationships between documents.

### Document Metadata

| Field | Description | Why It Matters |
|-------|-------------|----------------|
| `title` | Document name | Identity |
| `type` | What kind of document | Categorization, filtering |
| `status` | Current state | Know if current, draft, deprecated |
| `created` | Date created (YYYY-MM-DD) | Age tracking, staleness detection |
| `related` | Related files (comma-separated) | **Link graph for integrity checking** |

### Human Attribution

| Field | Description | Why It Matters |
|-------|-------------|----------------|
| `human_author` | Who created/owns this | Ownership, who to ask |
| `human_intent` | Why this exists (one line) | Purpose preservation, don't break intent |
| `human_context` | Additional context | Deeper understanding when needed |

### AI Attribution

| Field | Description | Why It Matters |
|-------|-------------|----------------|
| `ai_model` | Which AI contributed | Track AI involvement |
| `ai_updated` | Last AI interaction date | Freshness, when last touched |
| `ai_notes` | AI observations and breadcrumbs | Context for future sessions |

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
| Unprefixed (title, type, status, created, related) | Human |
| human_ fields | Human (always the authorizing human, even if AI creates the file) |
| ai_ fields | AI (with human approval) |

AI can suggest updates to `ai_` fields. Human approves.

**Note:** `human_author` is always the human who authorized creation, not "system" or "AI". If you instruct AI to create a file, you are the author.

## Integrity Checking

The `related` field enables automated integrity checking:

```yaml
related: system.md, context/floatprompt.md, tools/float.md
```

**What this enables:**

1. **Link validation** — Check if related files exist
2. **Bidirectional checking** — If A relates to B, does B relate to A?
3. **Change propagation** — When X changes, check files that relate to X
4. **Orphan detection** — Find files with broken relationships

**How `/float fix` uses this:**

```
Scanning related fields...

nav/float.md relates to:
  ✓ system.md (exists)
  ✓ context/floatprompt.md (exists)
  ✗ tools/context-creator.md (MISSING — renamed to float-context.md)

Proposed fix: Update related field
```

**Best practices:**

- List files this document directly depends on or references
- Use relative paths from repository root
- Keep relationships bidirectional when logical
- Update `related` when renaming or moving files

## Examples

### Nav File

```yaml
---
title: FloatPrompt System
type: nav
status: current
created: 2025-12-29
related: .float/system.md, .float/context/floatprompt.md

human_author: @mds
human_intent: Document .float/ folder structure for AI navigation
human_context: Self-documentation of the FloatPrompt System

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Added /float fix tool to tools table
---
```

### Documentation

```yaml
---
title: Goals
type: documentation
status: current
created: 2025-06-01
related: principles.md, voice.md

human_author: @mds
human_intent: Establish the three-tier goal hierarchy
human_context: Core principle - the hierarchy is strict

ai_model: Claude Opus 4.5
ai_updated: 2025-12-28
ai_notes: Added floatprompt doc frontmatter
---
```

### Specification

```yaml
---
title: FloatPrompt File Format
type: specification
status: current
created: 2025-06-05
related: doc.md, system.md

human_author: @mds
human_intent: Define the <fp> tag structure for portable AI tools
human_context: The core format that everything else builds on

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Cross-referenced with doc.md and system.md
---
```

### Living Research

```yaml
---
title: AI Tools Landscape
type: research
status: living
created: 2025-02-01
related:

human_author: @mds
human_intent: Track AI design tools as they evolve
human_context: Updated monthly

ai_model: Claude Opus 4.5
ai_updated: 2025-12-28
ai_notes: |
  Last full review: 2025-12-15
  3 new tools added since last review
---
```

## Relationship to FloatPrompt

| Aspect | FloatPrompt | floatprompt doc |
|--------|-------------|----------|
| Purpose | Modify AI behavior | Provide context |
| Format | `<fp><json><md></fp>` | YAML frontmatter |
| Complexity | High (behavioral specs) | Low (metadata) |
| STOP directive | Yes | No |
| AI role | Defined behavior | Observation only |

## Validation

A valid floatprompt doc:

1. Begins with `---` and ends section with `---`
2. Has all document metadata fields: title, type, status, created, related
3. Has all human attribution fields: human_author, human_intent, human_context
4. Has AI attribution fields when AI has touched the file: ai_model, ai_updated, ai_notes
5. Uses flat structure (no YAML nesting except for multi-line ai_notes)
6. Uses correct prefixes (human_, ai_)

**Why all fields?**

Lightweight metadata creates drift. We built `/float fix` specifically to hunt down inconsistencies that richer metadata would have prevented. Every field serves integrity:

| Field | Integrity Function |
|-------|-------------------|
| `created` | Staleness detection |
| `related` | Link graph validation |
| `status` | Know what's current vs deprecated |
| `human_intent` | Don't accidentally break purpose |
| `ai_updated` | Know when last touched |

The cost of filling out metadata once is far less than hunting stale references repeatedly.

---

See also: [FloatPrompt Format](floatprompt.md) | [FloatPrompt System](system.md)
