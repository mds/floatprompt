## Specify Format Requirements and Overflow Content

Apply file format requirements ensuring dual-readability, portability, and 100-year archival integrity while excluding non-canonical formats.

## 🔒 File Format Requirements

**All valid floatprompt files must:**
- Be written in **Markdown** with `.md` file extension
- Use **`format: floatprompt`** in YAML frontmatter to identify floatprompt files
- Begin with a **YAML frontmatter header** for structured metadata
- Contain a human- and AI-readable **execution or content body**

### 🎯 Why This Format
- **Dual-readable**: Designed for both human and AI systems
- **Portable**: Can be pasted into any text-based interface that accepts markdown
- **Transparent**: No runtime, no compiler, no UI layer
- **Archivable**: 100-year readability in plain text
- **Traceable**: All metadata visible and versionable
- **Universal**: Works with every markdown processor and editor

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