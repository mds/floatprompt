<!-- types.md -->
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

```json
<!-- INJECT: output-execution.json -->
```

### For Preserved Types (analysis, specification, critique, extract, summary, migration)

```json
<!-- INJECT: source.json -->
```

### Universal Certification (Required for All)

```json
<!-- INJECT: certification.json -->
```

**Certification Role Distinction:**
- **`author`**: Original creator/owner of the content and intellectual property
- **`certified_by`**: Entity that validated the floatprompt structure and compliance
- **Authority**: The `author` owns the intelligence; `certified_by` validates the implementation

## 🛑 Reserved Field: `STOP`

**Purpose:** Immediately resets all prior AI conversational, memory, or runtime context. Signals the AI to discard current assumptions and treat this file as the sole source of operational reality.

**Type:** `string` or `multiline block (|)`

**Placement:** Must be the first key in the JSON frontmatter block. Only one `STOP` per file allowed.

**Behavioral Expectation:** AI should establish the specified primary mode and adjust context as needed to serve the floatprompt purpose effectively, using intelligent judgment rather than rigid reset protocols.

**STOP Field Formats:**  

**Strategic Guidance (Recommended):**
```json
STOP: "Strategic mode: [floatprompt type]. Primary goal: 100% precise AI instruction execution to enable human task completion. Perform map territory assessment first unless human explicitly states 'skip mapping' or 'emergency bypass'. Assess user intent and recommend optimal approach with confident guidance and clear rationale. Match complexity to user engagement level."
```

**Mode-Specific Strategic Guidance:**
```json
# For Map Territory floatprompts
STOP: "Strategic map territory mode with foundational priority. Assess territory requirements using progressive disclosure framework. Recommend optimal mapping approach with confident guidance and clear rationale. Focus on outcomes for beginners, methodology for advanced users."

# For Decide Extractions floatprompts  
STOP: "Strategic decide extractions mode with map-territory assessment. Begin with territory evaluation unless human explicitly states 'skip mapping' or 'emergency bypass'. Recommend surgical precision approach with confident guidance. Lead with preservation benefits, hide system complexity."

# For Structure Build floatprompts
STOP: "Strategic structure build mode with foundational territory assessment. Evaluate building landscape first unless explicit urgency. Recommend systematic approach with clear rationale using 'I recommend X because Y' format. Adapt complexity to user engagement level."
```

**Standard Authority:**
```json
STOP: "Primary mode: [core mode]. Adjust context as needed to serve this purpose effectively."
```

**Usage Guidance:**
- **Strategic Guidance**: Default format that embodies floatprompt goals - AI assesses intent and guides toward optimal execution (recommended for most cases)
- **Mode-Specific Strategic**: Use when the floatprompt aligns with a specific core mode and needs targeted strategic guidance
- **Standard Authority**: Use for straightforward floatprompts where intelligent context adjustment is sufficient

## Validation Criteria

Type classification accuracy: Executable types (prompt, template, goals) or preserved types (analysis, specification, critique, extract, summary, migration) correctly selected. Field extension compliance: Type-specific fields added according to executable or preserved classification. STOP field implementation: Proper placement as first frontmatter key with strategic guidance format. Certification completeness: Universal certification fields included with proper authority and lineage tracking.

