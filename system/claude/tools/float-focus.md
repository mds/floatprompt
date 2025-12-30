<fp>
<json>
{
  "STOP": "Float Focus Tool. Deep dive on a specific scope by tracing relationships in all directions to build a mini-context.",

  "meta": {
    "title": "/float-focus",
    "id": "float-focus",
    "format": "floatprompt",
    "version": "0.11.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable deep work by building focused context around a specific scope",
    "context": "Use when project-wide context is too shallow for complex work on one domain"
  },

  "ai": {
    "role": "Relationship tracer and context synthesizer",
    "behavior": "Trace relationships forward, backward, and semantically. Synthesize into mini-context."
  },

  "requirements": {
    "duality": {
      "condition_a": "Relationships found",
      "action_a": "Present relationship map, offer to save mini-context",
      "condition_b": "No relationships",
      "action_b": "Report isolated scope"
    },
    "status_format": "FloatPrompt focus.\nTarget: [scope]\nRelationships: [forward: n, backward: n, semantic: n]\n\n[Map or Ready for: human direction]",
    "next_step_logic": "Relationships found? Show map, ask persistent/ephemeral. Otherwise: Ready for: human direction"
  }
}
</json>
<md>
# /float-focus — Deep Dive Context

**Trace relationships around a scope to build focused mini-context.**

Project-wide context is too shallow for complex work. This tool goes deep on one domain by tracing all relationships.

## Duality

| Condition | Action |
|-----------|--------|
| Relationships found | Show map, offer to save mini-context |
| No relationships | Report isolated scope |

## Input Options

```bash
/float-focus specs/           # Folder scope
/float-focus docs/claude.md   # File scope
/float-focus "buoys"          # Concept scope
```

## Architecture: The Tracer Pattern

```
                ┌─────────────┐
                │   Target    │
                │  Scope      │
                └──────┬──────┘
                       │
       ┌───────────────┼───────────────┐
       ▼               ▼               ▼
┌────────────┐  ┌────────────┐  ┌────────────┐
│  Forward   │  │  Backward  │  │  Semantic  │
│  Tracer    │  │  Tracer    │  │  Tracer    │
│            │  │            │  │            │
│ follows    │  │ finds refs │  │ finds      │
│ related:   │  │ TO target  │  │ similar    │
└─────┬──────┘  └─────┬──────┘  └─────┬──────┘
      │               │               │
      └───────────────┼───────────────┘
                      ▼
               ┌────────────┐
               │ Synthesizer│
               └─────┬──────┘
                     ▼
              Mini-Context
```

## Process

### 1. Identify Target

Parse input to determine scope type:
- **File**: Single file path
- **Folder**: Directory path
- **Concept**: Quoted string or keyword

### 2. Trace Forward

**Forward Tracer (haiku):**
- Read target file(s)
- Extract `related:` fields from frontmatter
- Follow links to depth N (default: 3)
- Build forward relationship tree

```bash
# Extract related fields
grep -h "^related:" target/*.md
```

### 3. Trace Backward

**Backward Tracer (haiku):**
- Search for references TO the target
- Find files with target in `related:` field
- Find files mentioning target path in content
- Build backward relationship tree

```bash
# Find files referencing target
grep -r "related:.*target" --include="*.md"
grep -r "target" --include="*.md" --include="*.js"
```

### 4. Trace Semantically (Optional)

**Semantic Tracer (sonnet):**
- Find conceptually related files
- Look for similar topics/domains
- Consider folder siblings
- Identify related abstractions

### 5. Synthesize

**Synthesizer (sonnet):**
- Combine all traced files
- Build relationship map
- Create mini-context document
- Include reading order recommendation

## Output Options

### Ephemeral (Default)

Returns context in conversation only:
```
Understanding built. Files traced: 17

Key relationships:
  specs/ ← docs/claude.md (implements)
  specs/ → floatprompt/ (defines format)
  specs/ ~ docs/philosophy/ (similar domain)

Ready for: deep work on specifications
```

### Persistent

Saves to `.float/project/context/{scope}.md`:
```
Saved: .float/project/context/specs.md

Contents:
- Relationship map
- Reading order
- Key files summary
- Domain overview

Ready for: deep work on specifications
```

## Buoys

| Buoy | Model | Purpose |
|------|-------|---------|
| `forward_tracer` | haiku | Follow explicit `related:` fields outward |
| `backward_tracer` | haiku | Grep for files that reference target |
| `semantic_tracer` | sonnet | Find conceptually related files (optional) |
| `synthesizer` | sonnet | Combine findings into mini-context |

## Mini-Context Structure

```markdown
---
title: [Scope] Context
type: mini-context
scope: [target]
created: YYYY-MM-DD
files_traced: N
---

# [Scope] Context

## Relationship Map

### Forward (this scope references)
- [file] — [why related]

### Backward (references this scope)
- [file] — [why related]

### Semantic (conceptually similar)
- [file] — [why related]

## Reading Order

For deep understanding, read in this order:
1. [foundational file]
2. [core file]
3. [detail files...]

## Key Files

| File | Purpose |
|------|---------|
| [file] | [role in this scope] |

## Domain Overview

[Synthesized understanding of this scope]
```

## Examples

**Folder scope:**
```
> /float-focus specs/

FloatPrompt focus.
Target: specs/
Depth: 3 levels

Tracing...

Forward (specs/ references):
  → format/core/template.md
  → format/core/doc.md
  → .float/system.md

Backward (references specs/):
  ← docs/claude.md
  ← README.md
  ← .float/project/context/floatprompt.md

Semantic (similar domains):
  ~ docs/philosophy/
  ~ floatprompt/

Files traced: 12
Relationships: forward 3, backward 3, semantic 2

Save mini-context? [persistent / ephemeral]: persistent

Saved: .float/project/context/specs.md

Ready for: deep work on specifications
```

**File scope:**
```
> /float-focus .float/system.md

FloatPrompt focus.
Target: .float/system.md

Tracing...

This is a central file. Many relationships found.

Forward: 5 (floatprompt/, project/)
Backward: 23 (docs/, specs/, nav files)

Save mini-context? [persistent / ephemeral]: ephemeral

Understanding built.

Key insight: system.md is the boot loader.
Everything depends on it, it defines structure.

Ready for: deep work on system.md
```

**Concept scope:**
```
> /float-focus "buoys"

FloatPrompt focus.
Target: concept "buoys"

Searching for buoy-related content...

Found in 8 files:
  - system/buoys.md (definition)
  - .float/core/tools/*.md (usage)
  - docs/claude.md (documentation)

Synthesizing understanding...

Buoys are Task agents spawned for parallel work.
Types: Nav, System, Scaffold, Describe, Log

Ready for: deep work on buoy system
```

**Isolated scope:**
```
> /float-focus examples/archive/

FloatPrompt focus.
Target: examples/archive/

Tracing...

No relationships found.
This folder is isolated (archived content).

Ready for: human direction
```

## When to Use

| Scenario | Recommended |
|----------|-------------|
| Complex refactor in one area | `/float-focus [area]` first |
| Understanding unfamiliar domain | `/float-focus [domain]` |
| Before major changes | Build context, then change |
| Deep debugging | Focus on affected scope |

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
