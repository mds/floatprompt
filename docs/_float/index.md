---
title: Documentation
type: float
status: current
ai_updated: 2025-12-28
---

# Documentation

Core documentation for FloatPrompt. Start here to understand the system.

---

## Contents

### Formats (Read First)

| File | Intent | Purpose |
|------|--------|---------|
| **floatprompt.md** | Define the `<fp><json><md></fp>` file structure | FloatPrompt format (tools) |
| **floatdoc.md** | Define YAML frontmatter format | FloatDoc format (documents) |
| **floatsystem.md** | Document the `_float/` architecture | FloatSystem (project awareness) |

### Methodology

| File | Intent | Purpose |
|------|--------|---------|
| **mds-method.md** | Explain Map → Decide → Structure methodology | The core methodology |
| **goals.md** | Define three-tier goal hierarchy | Voice > behavior > artifacts |

### Principles

| File | Intent | Purpose |
|------|--------|---------|
| **principles.md** | Define core principles | Recognition before action. Slow is smooth. |
| **voice.md** | Define voice preservation rules | What to preserve, what to avoid. |
| **safety.md** | Define safety guidelines | Human oversight, no weaponization. |

### Practical

| File | Intent | Purpose |
|------|--------|---------|
| **use.md** | Show practical applications | Coaches, writers, extractors, assistants |

### Subfolders

| Folder | Purpose |
|--------|---------|
| **philosophy/** | Background thinking. Origin story, manifesto, naming decisions. |
| **reference/** | Template references at three complexity levels. |

---

## Reading Order

**Formats (read first):**
1. **floatprompt.md** - FloatPrompt format. The `<fp><json><md></fp>` structure for tools.
2. **floatdoc.md** - FloatDoc format. YAML frontmatter for documents.
3. **floatsystem.md** - FloatSystem architecture. The `_float/` folder convention.

**Methodology:**
4. **mds-method.md** - The methodology: Map → Decide → Structure
5. **goals.md** - Three-tier goal hierarchy (voice > behavior > artifacts)

**Principles:**
6. **principles.md** - Recognition before action. Slow is smooth. Anti-patterns.
7. **voice.md** - Voice preservation rules. What to preserve, what to avoid.
8. **safety.md** - Safety guidelines. Human oversight, no weaponization.

**Practical:**
9. **use.md** - What you can build: coaches, writers, extractors, assistants

---

## Key Concepts

### File Format

JSON for behavior, Markdown for methodology. Wrapped in `<fp></fp>` tags.

```
<fp>
  <json>{ behavioral specification }</json>
  <md># methodology and content</md>
</fp>
```

### MDS Method

**Map** (understand) → **Decide** (choose) → **Structure** (build)

Depth scales with complexity. Simple tools skip elaborate mapping. Complex tools benefit from thorough upfront work.

### Goal Hierarchy

1. **Voice preservation** (primary) — preserve authentic human expression
2. **Reliable AI behavior** (secondary) — consistent cross-platform execution
3. **Useful artifacts** (tertiary) — tools that produce real results

The hierarchy is strict. Never compromise voice for usefulness.

### Voice Preservation

**Preserve**: Phrasing, rhythm, tone, hesitations, quirks

**Avoid**: Generic rewriting, em dashes, corporate smoothing, over-optimization

**The test**: Read aloud. Does it sound like the person, or like AI wrote it?

---

## Subfolders

### philosophy/

Background thinking and origin documents. Read for context on why FloatPrompt exists.

| File | Intent | Purpose |
|------|--------|---------|
| manifesto.md | Core manifesto - why human intelligence gets lost | "Start where you left off" |
| orientation.md | Quick start guide - what FloatPrompt is | System orientation |
| discovery.md | Document empirical findings | Cognitive benefits research |
| context.md | Explain contextual anchoring | When FloatPrompt adds value |
| value.md | Explain business value | Three-layer architecture, ROI |
| naming.md | Define naming standards | Capitalization, file extensions |

### reference/

Template references at three complexity levels:

| File | Purpose |
|------|---------|
| reference-full.md | All fields, full structure |
| reference-mini.md | Minimal viable template |
| reference-micro.md | Absolute minimum |

---

© 2025 @MDS

<!-- AI: Update this file when docs are added, removed, or reorganized. -->
