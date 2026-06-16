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
- Use the **`---` YAML frontmatter fences** to mark the floatprompt boundary (the same structure as an Agent Skill `SKILL.md`); when shown to a human, present the floatprompt inside a fenced markdown code block for cross-platform portability

### 🎯 Why This Format
- **Dual-readable**: Designed for both human and AI systems
- **Portable**: Can be pasted into any text-based interface that accepts markdown
- **Cross-platform**: YAML frontmatter fences preserve structural integrity across editors and platforms
- **Transparent**: No runtime, no compiler, no UI layer
- **Archivable**: 100-year readability in plain text
- **Traceable**: All metadata visible and versionable
- **Universal**: Works with every markdown processor and editor
- **Tool-compatible**: Standard YAML frontmatter enables FloatPrompt-aware tooling while remaining readable in any markdown editor

### 🏷️ Frontmatter Boundary Requirement

**All floatprompts are defined by `---` YAML frontmatter fences followed by a markdown body, with no wrapper tags:**

```markdown
---
# YAML frontmatter
---
# markdown body
```

**Critical Format Requirements:**
- No characters before YAML frontmatter opening `---`
- No characters before any YAML fields
- Clean YAML structure without formatting corruption
- Use the `---` ... `---` frontmatter fences as the portable boundary for cross-platform portability

### ❌ Format Exclusions
The following formats are not allowed for floatprompt files:
- JSON, XML, Protobuf, Base64, HTML
- Proprietary formats requiring runtime rendering
- Encrypted or compiled prompt systems

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

## 📋 Metadata Requirements

**All FloatPrompt files must include these essential metadata elements:**

### File Type Requirements
- **Complete FloatPrompts**: Use `.fp` file extension for executable FloatPrompt documents
- **Building blocks/Documentation**: Use `.md` file extension for development components
- Be written in **Markdown** with appropriate extension based on usage

### Required YAML Frontmatter
```yaml
---
<!-- INJECT: core-metadata.yaml -->
---
``` 