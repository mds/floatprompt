<!-- types.fp -->
## Classify FloatPrompt Intelligence Through Type System

Apply type classification and field extensions to structure executable and preserved intelligence with proper certification and lineage tracking.

## 🎯 Type System (Choose One)

**Executable Types:**
- `prompt` - Executable instruction/machine
- `template` - Reusable structure  
- `goals` - Extracted requirements

**Preserved Types:**
- `analysis` - Structured intelligence capture
- `specification` - System rules and constraints
- `critique` - Structured feedback
- `extract` - Curated intelligence
- `summary` - Condensed intelligence
- `migration` - Architecture transitions

*Types are soft-coded - create new categories as needed based on human intent.*

## 🌊 Type-Specific Extensions

### For Executable Types (prompt, template, goals)

Add these fields to frontmatter:
```yaml
output:
  format: floatprompt
  joint_execution_required: true
execution:
  triggers: [TODO_NATURAL_LANGUAGE_COMMANDS]
  fallback: TODO_DEFAULT_EXECUTION_MESSAGE
  source: TODO_STRING_IF_GENERATED
  voice_guide: TODO_FLOATPROMPT_ID
  risk_level: TODO_HUMAN_DEFINED_ASSESSMENT
```

### For Preserved Types (analysis, specification, critique, extract, summary, migration)

Add these fields to frontmatter:
```yaml
source:
  prompt: TODO_SOURCE_OF_INTELLIGENCE
  intent: TODO_SHORT_PURPOSE_STATEMENT
```

### Universal Certification (Required for All - Enhanced Schema)

```yaml
certification:
  timestamp: TODO_ISO_8601_PRECISE_EXECUTION_TIME
  authority: TODO_CERTIFICATION_TYPE  # schema-compliance | execution-verified | voice-preserved
  certified_by: TODO_CERTIFIER_IDENTITY  # @username or AI model name
  locked: TODO_BOOLEAN  # true for immutable, false for modifiable
  uid: TODO_UNIQUE_IDENTIFIER  # format: "float:hash" or symbolic
  chain:
    depth: TODO_INTEGER
    parent: TODO_STRING_OR_NULL
  voice:
    linked: TODO_TRUE_OR_FALSE
    fidelity_verified: TODO_TRUE_OR_FALSE
  lineage:
    tracked: TODO_TRUE_OR_FALSE
    trace: [TODO_LIST_OF_DOC_IDS]
```

**Certification Role Distinction:**
- **`author`**: Original creator/owner of the content and intellectual property (human @username)
- **`certified_by`**: Entity that validated the floatprompt structure and compliance (@username or AI model name)
- **Authority**: The `author` owns the intelligence; `certified_by` validates the implementation

This distinction eliminates ambiguity: authorship indicates intellectual ownership, certification indicates structural validation.

## 🛑 Reserved Field: `STOP`

**Purpose:**  
Immediately resets all prior AI conversational, memory, or runtime context. Signals the AI to discard current assumptions and treat this file as the sole source of operational reality.

**Type:**  
`string` or `multiline block (|)`

**Placement:**  
Must be the first key in the YAML frontmatter block. Only one `STOP` per file allowed.

**Behavioral Expectation:**  
AI should establish the specified primary mode and adjust context as needed to serve the floatprompt purpose effectively, using intelligent judgment rather than rigid reset protocols.

**Behavioral Guidance:**  
When processing a STOP field, AI should:
1. **Assess context alignment**: Determine if current context serves the stated purpose
2. **Adjust as needed**: Reset context only if necessary for effective purpose fulfillment
3. **Respond appropriately**: Use natural, purpose-aligned communication style
4. **Maintain authority**: Operate within the established primary mode throughout interaction

**STOP Field Formats:**  

**Strategic Guidance (Recommended):**
```yaml
STOP: "Strategic mode: [floatprompt type]. Primary goal: 100% precise AI instruction execution to enable human task completion. Perform map territory assessment first unless human explicitly states 'skip mapping' or 'emergency bypass'. Assess user intent and recommend optimal approach with confident guidance and clear rationale. Match complexity to user engagement level."
```

**Map-First Strategic Guidance:**
```yaml
# Foundational map territory assessment
STOP: "Foundational map mode. Perform territory assessment as system law unless human explicitly states 'skip mapping' or 'emergency bypass'. Assess intellectual landscape, identify work opportunities, and recommend optimal mapping approach with confident guidance. Use progressive disclosure: beginners get outcomes focus, advanced users get full methodology."

# Enhanced mode-specific with map-first integration
STOP: "Strategic [mode] mode with map-first foundation. Begin with territory assessment unless human explicitly states 'skip mapping' or 'emergency bypass'. Assess requirements and recommend optimal approach using 'I recommend X because Y' format. Match vocabulary to demonstrated user engagement level."
```

**Mode-Specific Strategic Guidance:**
```yaml
# For Map floatprompts (Enhanced)
STOP: "Strategic map mode with foundational priority. Assess territory requirements using progressive disclosure framework. Recommend optimal mapping approach with confident guidance and clear rationale. Focus on outcomes for beginners, methodology for advanced users."

# For Extract floatprompts  
STOP: "Strategic extract mode with map-first assessment. Begin with territory evaluation unless human explicitly states 'skip mapping' or 'emergency bypass'. Recommend surgical precision approach with confident guidance. Lead with preservation benefits, hide system complexity."

# For Build floatprompts
STOP: "Strategic build mode with foundational territory assessment. Evaluate building landscape first unless explicit urgency. Recommend systematic approach with clear rationale using 'I recommend X because Y' format. Adapt complexity to user engagement level."
```

**Standard Authority:**
```yaml
STOP: "Primary mode: [core mode]. Adjust context as needed to serve this purpose effectively."
```

**Critical Context Shift:**
```yaml
STOP: "COMPLETE AI CONTEXT SHIFT. You are now working with [floatprompt purpose]. Previous conversation is background. Read this entire document thoroughly, then respond EXACTLY as follows: 'I am now in [core mode] mode and fully understand [primary objective]. How would you like me to proceed? 1. [contextual option] 2. [contextual option] 3. [contextual option] 4. Something else?'"
```

**Usage Guidance:**
- **Strategic Guidance**: Default format that embodies floatprompt goals - AI assesses intent and guides toward optimal execution (recommended for most cases)
- **Mode-Specific Strategic**: Use when the floatprompt aligns with a specific core mode and needs targeted strategic guidance
- **Standard Authority**: Use for straightforward floatprompts where intelligent context adjustment is sufficient
- **Critical Context Shift**: Use for high-stakes floatprompts requiring guaranteed clean slate and precise execution protocol


## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering type classification compliance.

Type classification accuracy: Executable types (prompt, template, goals) or preserved types (analysis, specification, critique, extract, summary, migration) correctly selected. Field extension compliance: Type-specific fields added according to executable or preserved classification. STOP field implementation: Proper placement as first frontmatter key with strategic guidance format. Certification completeness: Universal certification fields included with proper authority and lineage tracking.

