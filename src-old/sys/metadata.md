<!-- metadata.md -->
## Specify Format Requirements and Overflow Content

Apply file format requirements ensuring dual-readability, portability, and 100-year archival integrity while excluding non-canonical formats.

## 🔒 File Format Requirements

**All valid floatprompt files must:**
- Be written in **Markdown** with appropriate file extension (`.fp` for complete FloatPrompts, `.md` for building blocks)
- Use **JSON frontmatter** (not YAML) within standard `---` delimiters
- Use **`format: floatprompt`** in JSON frontmatter to identify floatprompt files
- Include required metadata fields in JSON frontmatter
- Follow voice preservation protocols
- Comply with system authority and safety requirements
- Begin with a **JSON frontmatter header** for structured metadata
- Contain a human- and AI-readable **execution or content body**
- Be wrapped in fenced markdown code blocks: **```<floatprompt>...</floatprompt>```** for cross-platform portability

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
{
  "title": "Document Title",
  "format": "floatprompt",
  "type": "template"
}
---
# markdown body
</floatprompt>
```

**Critical Format Requirements:**
- No characters before JSON frontmatter opening `---`
- No characters before JSON opening brace `{`
- Clean JSON structure without syntax errors
- Maintain `<floatprompt>...</floatprompt>` wrapping for cross-platform portability

### 📋 FloatPrompt Frontmatter Specification

**FloatPrompt (.fp) files use JSON frontmatter within markdown-style delimiters:**

- **Format**: JSON (not YAML) - FloatPrompt protocol uses JSON for better parsing and validation
- **Delimiters**: `---` (standard markdown frontmatter convention)
- **Extension**: `.fp` (FloatPrompt files define their own format standards)
- **Content**: Valid JSON with required FloatPrompt fields
- **Purpose**: Portable AI collaboration instructions with cross-platform compatibility

**Why JSON in `---` delimiters:**
- Familiar markdown frontmatter pattern developers recognize
- JSON provides superior parsing, validation, and tooling over YAML
- `.fp` extension establishes FloatPrompt as its own file format with defined conventions
- Maintains ecosystem compatibility while using modern structured data format

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

### Required JSON Frontmatter
```json
---
<!-- INJECT: core-metadata.json -->
---
``` 