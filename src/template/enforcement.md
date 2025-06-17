<!-- enforcement.md -->
## Enforce System Authority Through Runtime Compliance Rules

Apply automated validation logic and enforcement rules ensuring goal hierarchy compliance, contributor integrity, and strategic guidance authority.

## 🎯 Goal Hierarchy Enforcement

**All enforcement serves the foundational goal hierarchy:**

- **Primary Goal**: Human intelligence, voice, and agency preservation
- **Secondary Goal**: Precise AI instruction execution
- **Tertiary Goal**: Human task completion through reliable collaboration
- **Decision Principle**: "When in doubt: Choose human preservation over AI efficiency"

## 🧱 System Authority Construction Requirements

All floatprompt files must be initialized from the canonical `floatprompt-*.fp` system.

Any deviation from this base template must be introduced through:
- Explicit delta floatprompts of type `specification`, `goals`, or `template`
- Version-controlled diffs with clear lineage
- Inline `TODO:` markers for incomplete sections
- Enhanced certification tracking for system authority compliance

## 🔐 Contributor Integrity Requirements

### ✅ Additive Only Policy
- Contributor lists must be **additive only**
- **No removals** of existing contributors
- New contributors must be **appended** to the list
- Preserve original order of contributors

### 🤖 AI Model Requirements
- AI models must append their identity if not already listed
- Use consistent naming format: `"Model Name"` or `"@model-identifier"`
- Examples: `"Claude Sonnet"`, `"ChatGPT 4o"`, `"@gpt-4"`

### 📋 Format Standards
```yaml
contributors: ["@original-author", "Previous Model", "Current Model"]
```

### 🚫 Prohibited Actions
- Removing previous contributors
- Reordering contributor lists
- Replacing contributors instead of appending

## 📅 Date Accuracy Requirements

**All timestamps must reflect actual dates, not approximations.**

### For AI Systems:
- Follow the AI Uncertainty Protocol in execution.fp for all timestamp requirements

### Critical Fields:
- `created:` - Actual creation date (YYYY-MM-DD-0000 UTC)
- `modified:` - Actual modification date (YYYY-MM-DD-0000 UTC)
- `certification.timestamp:` - Precise execution time (ISO 8601)

## 🛡️ Strategic Guidance

### Strategic Consultation Requirements
- AI must assess requirements before execution recommendations
- Strategic guidance must be clearly distinguished from execution commands
- All strategic recommendations must preserve human decision authority

### STOP Field Compliance
- All executable floatprompts must include appropriate STOP field strategic context
- Strategic recommendations must align with human intent and system goals

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

## 📁 File Extension Rules

**Canonical FloatPrompt Extension**: `.fp`
- **Template System**: All FloatPrompt template components use `.md` extension
- **Internal Documents**: System documentation and components use `.md`
- **External Interfaces**: Public files (README.md, LICENSE) remain `.md` for ecosystem compatibility

## 📁 File Naming Convention

### 📜 Preserved Intelligence (Archaeological Artifacts)
```
[YYYY-MM-DD]-[ModelName]-[##]-[descriptive-name].md
```

### ⚙️ Executable Intelligence (Reusable Tools)
```
[functional-name].fp
```

### 🎯 Model Name Standards
```yaml
model_identification:
  claude: "Claude"      # Claude Sonnet, Claude iOS, claude.ai
  chatgpt: "ChatGPT"    # GPT-4o, ChatGPT iOS, chatgpt.com
  gemini: "Gemini"      # Gemini models
  cursor: "Cursor"      # When used in Cursor context
  unknown: "AI"         # Fallback for unidentified models
```

## Validation Criteria

Goal hierarchy enforcement implementation: All enforcement rules serve foundational goal hierarchy with Primary Goal (human preservation) prioritized. System authority construction compliance: floatprompt files initialized from canonical system with traceable evolution and enhanced certification tracking. Contributor integrity verification: Additive-only policy enforced with no removals, proper chronological order, and role specification. Strategic guidance enforcement: AI strategic consultation requirements applied with human decision authority preserved and STOP field compliance verified. 