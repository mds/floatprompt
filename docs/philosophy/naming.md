---
title: Naming Convention
type: reference
status: current
created: 2025-06

human_author: @mds
human_intent: Define naming standards - FloatPrompt as the brand, everything else under it
human_context: Brand consistency, FloatPrompt [X] pattern, casual shorthand allowed

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Final revision - FloatPrompt is the namespace, everything lives under it
---

# FloatPrompt Naming Convention

**FloatPrompt is the brand. Everything lives under it.**

*Official naming uses "FloatPrompt [descriptor]". Casual shorthand is allowed but not in documentation.*

## The Core Principle

**FloatPrompt** is the only proper noun. Everything else is either:
- **FloatPrompt + descriptor** for official naming
- **Lowercase shorthand** for casual use

## Official Naming (docs, README, external)

| Thing | Official Name | Pattern |
|-------|---------------|---------|
| The brand/ecosystem | **FloatPrompt** | Proper noun, trademark |
| The `.float/` architecture | **FloatPrompt System** | FloatPrompt + descriptor |
| A specific tool | **FloatPrompt [ToolName]** | FloatPrompt Voice Guide |
| A doc with YAML frontmatter | **floatprompt doc** | lowercase + descriptor |
| Nav files | **nav files** | just descriptive |
| Session logs | **session logs** | just descriptive |
| Parallel agents | **buoys** | nautical vocabulary |
| Collection of buoys | **fleet** | nautical vocabulary |

### Tool Naming

Specific tools use the pattern **FloatPrompt [ToolName]**:

| Tool | Official Name |
|------|---------------|
| AI Portfolio Coach | FloatPrompt Portfolio Coach |
| Design Feedback Extractor | FloatPrompt Feedback Extractor |
| MDS Voice Guide | FloatPrompt Voice Guide |
| Shortform Script Writer | FloatPrompt Script Writer |

### Heading Examples

```markdown
# FloatPrompt System
# FloatPrompt Voice Guide  
# floatprompt doc Format
```

## Casual Shorthand (conversation, internal)

Shorthand is allowed in casual use but **not in official documentation**.

| Shorthand | Means | When to use |
|-----------|-------|-------------|
| "a floatprompt" | A `<fp>` tool file | When context is clear |
| "floatdoc" | A floatprompt doc | Off the record, casual |
| "the system" | FloatPrompt System | When context is clear |
| "floatsystem" | FloatPrompt System | Quick internal reference |

## The Nautical Metaphor

Everything **floats** — surfacing human intelligence to AI.

| Term | What It Means |
|------|---------------|
| **float** | Surface context to AI (verb) |
| **`.float/`** | Floats to top of file structure |
| **buoy** | A focused parallel agent |
| **fleet** | A collection of buoys working together |

## Capitalization Rules

| Context | Format | Example |
|---------|--------|---------|
| **Brand references** | `FloatPrompt` | "FloatPrompt is the invisible OS for AI" |
| **System references** | `FloatPrompt System` | "Boot the FloatPrompt System" |
| **Tool names** | `FloatPrompt [Name]` | "Use FloatPrompt Voice Guide" |
| **Doc references** | `floatprompt doc` | "Add a floatprompt doc to this file" |
| **Filenames** | lowercase | `floatprompt.md`, `system.md`, `doc.md` |
| **Casual shorthand** | lowercase | "a floatprompt", "floatdoc" |

## Never Plural Rule

**FloatPrompt is never plural** — consistent with JavaScript, Python, Markdown.

**✅ Correct:**
- "FloatPrompt tools"
- "multiple floatprompt docs"
- "several FloatPrompt files"

**❌ Incorrect:**
- "FloatPrompts"
- "floatprompts"
- "multiple FloatPrompts"

## File Extension Strategy

### Unified .md Extension

| File Type | Extension | Example |
|-----------|-----------|---------|
| Core templates | `.md` | `format/core/template.md`, `format/core/os.md` |
| Documentation | `.md` | `floatprompt.md`, `system.md`, `doc.md` |
| Nav files | `.md` | `nav/root.md`, `nav/docs.md` |
| Session logs | `.md` | `2025-12-28.md` |

**Why .md:** Universal compatibility, better rendering, one extension to explain.

## Current File Structure

```
floatprompt/
├── .float/                      # FloatPrompt System
│   ├── system.md                # Boot loader
│   ├── nav/                     # Navigation files
│   └── logs/                    # Session logs
├── floatprompt/                 # Core templates
│   ├── core/
│   │   ├── template.md          # Template (creates floatprompt tools)
│   │   ├── doc.md               # Creates floatprompt docs
│   │   └── os.md                # Full system
│   └── tools/
│       └── update.md            # Structured update planning
├── docs/                        # Documentation
└── examples/                    # FloatPrompt [ToolName] examples
```

## Validation Examples

### ✅ Correct

**Official:**
- "FloatPrompt is the invisible OS for AI."
- "The FloatPrompt System gives AI project awareness."
- "Add a floatprompt doc to provide context."
- "Use FloatPrompt Voice Guide to preserve your style."

**Casual:**
- "Boot the system and add a floatdoc."
- "That floatprompt needs voice preservation."

### ❌ Incorrect

- "FloatSystem gives AI awareness." (use "FloatPrompt System")
- "Add a FloatDoc to the file." (use "floatprompt doc" or casual "floatdoc")
- "Multiple FloatPrompts can work together." (never plural)

## Summary

| Term | Official | Casual | Notes |
|------|----------|--------|-------|
| **The brand** | FloatPrompt | — | Always capitalized |
| **The architecture** | FloatPrompt System | "the system", "floatsystem" | |
| **A tool file** | FloatPrompt [Name] | "a floatprompt" | |
| **A doc with frontmatter** | floatprompt doc | "floatdoc" | lowercase official |
| **Parallel agents** | buoys | buoys | nautical |
| **Agent collection** | fleet | fleet | nautical |

**One brand. Everything under it. Shorthand for casual use only.**
