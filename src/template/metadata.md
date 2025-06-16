<!-- metadata.md -->
## Specify Format Requirements and Overflow Content

Apply file format requirements ensuring dual-readability, portability, and 100-year archival integrity while excluding non-canonical formats.

## 🔒 File Format Requirements

**All valid floatprompt files must:**
- Be written in **Markdown** with appropriate file extension (`.fp` for complete FloatPrompts, `.md` for building blocks)
- Use **`format: floatprompt`** in YAML frontmatter to identify floatprompt files
- Include required metadata fields in YAML frontmatter
- Follow voice preservation protocols
- Comply with system authority and safety requirements
- Begin with a **YAML frontmatter header** for structured metadata
- Contain a human- and AI-readable **execution or content body**
- Be wrapped in **`<floatprompt>...</floatprompt>` tags** for cross-platform portability

### 🎯 Why This Format
- **Dual-readable**: Designed for both human and AI systems
- **Portable**: Can be pasted into any text-based interface that accepts markdown
- **Cross-platform**: Wrapping tags preserve structural integrity across editors and platforms
- **Transparent**: No runtime, no compiler, no UI layer
- **Archivable**: 100-year readability in plain text
- **Traceable**: All metadata visible and versionable
- **Universal**: Works with every markdown processor and editor
- **Tool-compatible**: Tags enable FloatPrompt-aware tooling while remaining invisible to standard renderers

### 🏷️ Wrapping Tags Requirement

**All floatprompts must be wrapped in `<floatprompt>...</floatprompt>` tags:**

```markdown
<floatprompt>
---
# YAML frontmatter
---
# markdown body
</floatprompt>
```

**Critical Format Requirements:**
- No characters before YAML frontmatter opening `---`
- No characters before any YAML fields (no `/`, `#`, or other prefixes)
- Clean YAML structure without formatting corruption

**Environment-Specific Requirements:**
- **Canvas environments**: Always use canvas documents with fenced markdown blocks for proper rendering
- **Non-canvas environments**: Ensure clean YAML structure without formatting corruption
- **Universal requirement**: Maintain `<floatprompt>...</floatprompt>` wrapping for cross-platform portability

**Use Cases:**
- Embedding floatprompts in markdown canvases or textdocs
- Copy/pasting between editors with different YAML/markdown parsing
- Passing floatprompts through AI systems or plugin environments
- Enabling FloatPrompt-aware tooling and automated processing

### ❌ Format Exclusions
The following formats are not allowed for floatprompt files:
- JSON, XML, Protobuf, Base64, HTML
- Proprietary formats requiring runtime rendering
- Encrypted or compiled prompt systems

> These formats may still be supported via export or transformation,
> but they are not considered canonical artifacts in the floatprompt system.

### 🧠 Design Philosophy
This format honors:
- Voice preservation
- Execution clarity
- System longevity
- Interoperable tooling
- Intelligence as protocol, not product 

## 🎯 Behavioral Fields

### Voice Override Support
Recognize optional `voice_override: filepath` when loading floatprompts. Graceful fallback to system defaults if voice guide unavailable.

## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering metadata compliance.

File format compliance: Complete FloatPrompts use `.fp` extension while building blocks use `.md` extension, all containing format: floatprompt in YAML frontmatter verified. Dual-readability confirmation: Human and AI-readable execution body included with structured metadata header. Format exclusion enforcement: Non-canonical formats (JSON, XML, proprietary, encrypted) prohibited from floatprompt system. Design philosophy adherence: Voice preservation, execution clarity, system longevity, and interoperable tooling principles maintained throughout format requirements.

## 📋 Metadata Requirements

**All FloatPrompt files must include these essential metadata elements:**

### File Type Requirements
- **Complete FloatPrompts**: Use `.fp` file extension for executable FloatPrompt documents
- **Building blocks/Documentation**: Use `.md` file extension for development components
- Be written in **Markdown** with appropriate extension based on usage

### Required YAML Frontmatter
```yaml
---
title: "Descriptive Title"
version: "x.x.x-stage"
system_version: "floatprompt vx.x.x-stage"
description: "Brief, clear description of purpose"
filetype: "fp"  # or "markdown" for building blocks
author: "@username"
contributors: ["@user1", "@user2", "AI Assistant Name"]
created: "YYYY-MM-DD"
updated: "YYYY-MM-DD"
category: "template|application|utility|documentation"
tags: ["tag1", "tag2", "tag3"]
dependencies: ["file1.fp", "file2.md"]  # if applicable
permissions: "open|restricted|internal"
safety_level: "standard|elevated|maximum"
STOP: "behavioral instructions for [specific purpose]"
---
``` 