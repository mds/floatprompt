## Enforce System Authority Through Runtime Compliance Rules

Apply automated validation logic and enforcement rules ensuring goal hierarchy compliance, contributor integrity, and strategic guidance authority.

## 🎯 Goal Hierarchy Enforcement

**All enforcement serves the foundational goal hierarchy:**

- **Primary Goal**: 100% precise AI instruction execution
- **Secondary Goal**: Human task completion through zero-drift collaboration
- **Tertiary Goal**: Human intelligence, voice, and agency preservation
- **Decision Principle**: "When in doubt: Choose AI precision over human convenience"

## 🧱 System Authority Construction Requirements

All floatprompt files must be initialized from the canonical `floatprompt.md` system.

Any deviation from this base template must be introduced through:

- Explicit delta floatprompts of type `specification`, `goals`, or `template`
- Version-controlled diffs with clear lineage
- Inline `TODO:` markers for incomplete sections
- Enhanced certification tracking for system authority compliance

This ensures system structure, traceable evolution, and machine-readable compliance.

## 🔐 Contributor Integrity Requirements

**Contributor preservation logic to ensure authorship integrity:**

### ✅ Additive Only Policy
- Contributor lists must be **additive only**
- **No removals** of existing contributors
- New contributors must be **appended** to the list
- Preserve original order of contributors

### 🤖 AI Model Requirements
- AI models must append their identity if not already listed
- Use consistent naming format: `"Model Name"` or `"@model-identifier"`
- Examples: `"Claude Sonnet"`, `"ChatGPT 4o"`, `"@gpt-4"`
- **Role Specification**: Distinguish between strategic guidance and execution contributions

### 📋 Format Standards
```yaml
contributors: ["@original-author", "Previous Model", "Current Model"]
```

### 🚫 Prohibited Actions
- Removing previous contributors
- Reordering contributor lists
- Replacing contributors instead of appending
- Anonymous or unnamed contributions

### ✅ Required Actions
- Verify existing contributors before modification
- Append new contributor identity with role context
- Maintain chronological order
- Document contributor role if significant

## 📅 Date Accuracy Requirements

**All timestamps must reflect actual dates, not approximations.**

Archaeological preservation depends on temporal precision. Every floatprompt becomes part of the historical record.

### For AI Systems:
- Follow the AI Uncertainty Protocol in spec-execution-overview.md for all timestamp requirements
- Use system date/time functions only when explicitly authorized by human
- Reference the universal clarification examples for timestamp handling

### Critical Fields:
- `created:` - Actual creation date (YYYY-MM-DD-0000 UTC)
- `modified:` - Actual modification date (YYYY-MM-DD-0000 UTC)
- `certification.timestamp:` - Precise execution time (ISO 8601)
- `certification.authority:` - Strategic guidance context preservation
- `human.execution_mode:` - Strategic vs. spontaneous execution context
- `human.session.start_time:` and `end_time:` - Accurate session bounds (ISO 8601)

## 🛡️ Strategic Guidance Enforcement

**Core requirements for AI strategic consultation:**

### Strategic Consultation Requirements
- AI must assess requirements before execution recommendations
- Strategic guidance must be clearly distinguished from execution commands
- All strategic recommendations must preserve human decision authority
- Strategic guidance must be traceable through certification fields

### STOP Field Compliance
- All executable floatprompts must include appropriate STOP field strategic context
- Strategic recommendations must align with human intent and system goals
- AI strategic consultation must enhance, not replace, human strategic thinking

## 🔐 System Authority Integrity Rule

Contributor lists must be **additive only**. No removals of existing contributors allowed. AI models must append their identity with role specification (strategic guidance vs. execution).

*See "Contributor Integrity Requirements" section above for complete enforcement logic.* 

## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering enforcement compliance.

Goal hierarchy enforcement implementation: All enforcement rules serve foundational goal hierarchy with Primary Goal (AI precision) prioritized. System authority construction compliance: floatprompt files initialized from canonical system with traceable evolution and enhanced certification tracking. Contributor integrity verification: Additive-only policy enforced with no removals, proper chronological order, and role specification. Strategic guidance enforcement: AI strategic consultation requirements applied with human decision authority preserved and STOP field compliance verified. 