<!-- metadata.md -->
## Specify Format Requirements and Overflow Content

Apply file format requirements ensuring dual-readability, portability, and 100-year archival integrity while excluding non-canonical formats.

## 🔒 File Format Requirements

**All valid floatprompt files must:**
- Be written in **Markdown** with `.md` file extension
- Use **`format: floatprompt`** in YAML frontmatter to identify floatprompt files
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
- When creating floatprompts in chat interfaces, always use canvas documents with strict markdown single blocks when available

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

## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering metadata compliance.

File format compliance: Markdown files with .md extension containing format: floatprompt in YAML frontmatter verified. Dual-readability confirmation: Human and AI-readable execution body included with structured metadata header. Format exclusion enforcement: Non-canonical formats (JSON, XML, proprietary, encrypted) prohibited from floatprompt system. Design philosophy adherence: Voice preservation, execution clarity, system longevity, and interoperable tooling principles maintained throughout format requirements. 