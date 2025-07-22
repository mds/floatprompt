<!-- naming.md -->
## Apply Archival Naming Rules and Casing Integrity

Execute file naming conventions and canonical term preservation ensuring archaeological integrity and discovery optimization.

## 🧩 Naming & Casing Integrity

**FloatPrompt follows JavaScript-style naming convention:**

| **Context** | **Format** | **Example** |
|-------------|------------|-------------|
| **Document titles & headers** | `FloatPrompt` | "# FloatPrompt Complete Template" |
| **Sentence beginnings** | `FloatPrompt` | "FloatPrompt enables joint execution..." |
| **Mid-sentence technical refs** | `floatprompt` | "Upload the floatprompt file..." |
| **Filenames** | `floatprompt-*` | `floatprompt-template.fp` |
| **Brand references** | `FloatPrompt` | "The FloatPrompt system serves humans" |

**Related system terms:**
- `shadowPrompt` (camelCase)
- `shadowVoice` (camelCase)

> The system is called FloatPrompt following JavaScript naming convention patterns.

## 📁 File Extension Rules

**Canonical FloatPrompt Extension**: `.fp`
- **Template System**: All FloatPrompt template components use `.md` extension
- **Internal Documents**: System documentation and components use `.md` 
- **External Interfaces**: Public files (README.md, LICENSE) remain `.md` for ecosystem compatibility
- **Historical Artifacts**: Preserved documents in `artifacts/` remain `.md` for archaeological integrity

## 📁 File Naming Convention

FloatPrompt follows the manifesto's "Two Forms of Floating" principle in naming:

### 📜 Preserved Intelligence (Archaeological Artifacts)
```
[YYYY-MM-DD]-[ModelName]-[##]-[descriptive-name].md
```
- **Purpose**: Session documentation, milestone artifacts, temporal preservation with AI collaboration context
- **Examples**:
  - `2025-06-11-Claude-01-legal-research-analysis.md`
  - `2025-06-11-ChatGPT-01-voice-pattern-extract.md`
  - `2025-06-11-Claude-02-strategic-follow-up.md`
  - `2025-06-11-Gemini-01-technical-specification.md`

### ⚙️ Executable Intelligence (Reusable Tools)
```
[functional-name].fp
```
- **Purpose**: Specifications, templates, tools, system components designed for reuse

### 🎯 Naming Rules
- **Preserved**: Use creation date + model name + 2-digit sequence + descriptive name
- **Executable**: Use clear, functional names that aid discovery and reuse
- **All files**: Lowercase, hyphen-separated, `.fp` extension for complete FloatPrompt documents, `.md` extension for building blocks and documentation
- **No exceptions**: Every floatprompt follows one of these two patterns

### 🤖 Smart Date Resolution Protocol
**For cross-platform AI collaboration with accurate temporal preservation:**

**Tier 1: AI Self-Assessment** - AI checks internal date confidence, proceeds if high/medium confidence
**Tier 2: Python Script Fallback**
```bash
python3 -c "from datetime import datetime; print(f'{datetime.now().strftime(\"%Y-%m-%d\")}')"
```
**Tier 3: Human Escalation** - Request accurate date in YYYY-MM-DD format for archaeological accuracy

### 🎯 Model Name Standards
```json
{
  "model_identification": {
    "claude": "Claude",
    "chatgpt": "ChatGPT",
    "gemini": "Gemini",
    "cursor": "Cursor",
    "unknown": "AI"
  }
}
``` 

## Validation Criteria

Casing integrity compliance: Canonical system terms (FloatPrompt, shadowPrompt, shadowVoice) retain exact casing and form throughout all content. File naming convention adherence: Two forms principle applied with Preserved Intelligence using date-sequence-description format and Executable Intelligence using functional names. Extension rules verification: FloatPrompt system files use .fp extension, external interfaces use .fp, historical artifacts preserve .fp for archaeological integrity. Archaeological integrity maintenance: Naming conventions support discovery optimization and temporal preservation. 