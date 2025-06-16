<!-- config.md -->
# Configuration Specification

**Complete field specification for all floatprompt components with behavioral requirements, execution fingerprints, discovery intelligence, and certification standards.**

> **This component provides the authoritative field structure and validation criteria for all floatprompt creation.**

## Quick Reference

**Essential Fields (Required):**
- STOP directive with execution instructions
- title, id, version, created, modified, author, format, filetype, type
- system_version, contributors, voice_preservation, behavioral_requirements
- human.intent (primary, constraints), human.preferences (tone_drift_allowed, verbosity, allow_ai_suggestions)
- discovery (significance, audience, purpose), certification (complete section)

See behavioral_requirements section in YAML frontmatter for complete behavioral specification.

## Behavioral Requirements Configuration

```yaml
behavioral_requirements:
  voice_preservation: "First, do not rewrite. Preserve phrasing, rhythm, and tone unless explicitly told otherwise."
  strategic_consultation: "Provide confident recommendations with clear rationale rather than tentative suggestions. Use 'I recommend X because Y' instead of 'Would you like me to...'"
  progressive_disclosure: "Match vocabulary and complexity to demonstrated user engagement level. Beginner: outcomes and benefits. Intermediate: strategic approach. Advanced: full system vocabulary."
  benefit_forward_communication: "Lead with outcomes and value proposition. Hide system mechanics and process complexity. Focus on what users achieve, not how system works."
  map_first: "Always perform territory assessment before execution unless human explicitly states 'skip mapping' or 'emergency bypass'"
  execution_precision:
    - "Clarify intent before assuming requirements"
    - "Flag ambiguity with TODO, never invent content"
    - "Require explicit human confirmation for major transitions"
    - "Provide AI Summary for rapid orientation when encountering complex content"
  mode_constraints:
    map: "Assess intellectual territory → propose solutions → preserve human authority"
    extract: "Archaeological preservation → no synthesis → exact voice maintenance"
    build: "Goals clarification → specification planning → systematic build"
  content_standards:
    - "No AI tone or generic language overlays"
    - "Clarity over cleverness in all writing"
    - "Preserve original terminology unless clarity requires change"
    - "Use TODO flags for genuine ambiguity, never as content avoidance"
```

**Global Behavioral Abstractions**: The strategic_consultation, progressive_disclosure, benefit_forward_communication, and map_first fields implement foundational system law that enhances AI precision across all modes while preserving human agency and intelligence.

**Map-First Implementation**: The map_first behavioral requirement establishes territory assessment as foundational system law, with emergency bypass conditions requiring explicit human statements: "skip mapping", "emergency bypass", "I need this in X minutes", "Just fix this typo", or sequential work in established workflow where territory already mapped.

## Archaeological Extraction Methodology

See archaeological_extraction section in YAML frontmatter for complete specification.

## Human Execution Fingerprint Structure

**Minimal Recommended (High AI Precision Value):**
```yaml
human:
  intent:
    primary: "[main goal]"
    constraints: "[limiting factors]"
  preferences:
    tone_drift_allowed: "[boolean]"
    verbosity: "[low/medium/high]"
    allow_ai_suggestions: "[boolean]"
```

**Complete Structure (Optional for Rich Context):**
```yaml
human:
  identity:
    name: "[human identity]"
    role: "[primary role in session]"
  execution_mode: "[structured | spontaneous | hybrid]"
  signed_by: "[@username]"
  inferred_fields: ["list of AI-inferred field names"]
  state:
    context: "[workshop or field]"
    mood: "[affective tone]"
    clarity: "[1 to 10]"
    energy: "[1 to 10]"
  session:
    start_time: "[ISO 8601]"
    end_time: "[ISO 8601]"
    duration_minutes: "[integer optional]"
  intent:
    primary: "[main goal]"
    constraints: "[limiting factors]"
  preferences:
    max_words: "[integer]"
    tone_drift_allowed: "[boolean]"
    verbosity: "[low/medium/high]"
    allow_ai_suggestions: "[boolean]"
```

## AI Execution Fingerprint Structure

```yaml
ai:
  identity:
    model: "[standardized model name]"
    platform: "[claude.ai | chatgpt.com | cursor | etc.]"
    version: "[model version if known]"
  execution_mode: "[structured | spontaneous | hybrid]"
  confidence_level: "[high | medium | low]"
  collaboration_role: "[primary | assistant | reviewer | executor]"
  session:
    context_awareness: "[full | partial | limited]"
    memory_continuity: "[maintained | fragmented | fresh]"
    cross_platform: "[boolean]"
  capabilities:
    date_confidence: "[high | medium | low | unknown]"
    voice_preservation: "[verified | attempted | bypassed]"
    archaeological_method: "[applied | partial | skipped]"
  processing:
    instruction_fidelity: "[100% | degraded | reinterpreted]"
    tone_preservation: "[maintained | modified | unknown]"
    content_generation: "[extracted | synthesized | created]"
```

**Model Identification Standards**: Use standardized model names from `naming.md` specification: "Claude", "ChatGPT", "Gemini", "Cursor", or "AI" for unknown models. Apply these standards in `ai.identity.model`, `contributors`, and `certified_by` fields for consistent cross-platform collaboration tracking.

## Discovery Intelligence Fields

**Minimal Recommended (High AI Precision Value):**
```yaml
discovery:
  significance: "[human-defined importance]"
  audience: "[target users]"
  purpose: "[intent category]"
```

**Complete Structure (Optional for Rich Context):**
```yaml
discovery:
  significance: "[human-defined importance]"
  theme: "[descriptive category]"
  scope: "[effort/depth indicator]"
  audience: "[target users]"
  purpose: "[intent category]"
  relationships:
    builds_on: ["list of doc IDs"]
    enables: ["list of doc IDs"]
    parallels: ["list of doc IDs"]
    mirrors: ["list of doc IDs"]
    supersedes: ["list of doc IDs"]
  navigation:
    prerequisites: ["what to read first"]
    next_steps: ["where to go after"]
    learning_sequence: ["ordered progression"]
  temporal:
    journey: "[chronological context]"
    phase: "[evolutionary stage]"
    progression: "[development sequence]"
  clustering:
    intellectual_territory: "[domain area]"
    discovery_path: "[navigation guidance]"
  essence:
    core_purpose: "[soul of the document]"
    metaphor: "[symbolic representation]"
    impact_type: "[kind of change created]"
    ceremonial_significance: "[ritual importance]"
    wisdom_offering: "[guidance provided]"
    universe_contained: "[scope of intelligence]"
```

## Universal Certification Requirements

```yaml
certification:
  timestamp: "[ISO 8601]"
  authority: "[schema-compliance | execution-verified | voice-preserved]"
  certified_by: "[@username | AI model name]"
  locked: "[true | false]"
  uid: "[unique identifier]"
  chain:
    depth: "[integer]"
    parent: "[string or null]"
  voice:
    linked: "[true | false]"
    fidelity_verified: "[true | false]"
  lineage:
    tracked: "[true | false]"
    trace: ["list of doc IDs"]
```

## Type-Specific Fields

For executable types (prompt, template, goals):
```yaml
output:
  format: "floatprompt"
  joint_execution_required: true
execution:
  triggers: ["natural language commands"]
  fallback: "[default execution message]"
  source: "[string if generated]"
  voice_guide: "[floatprompt ID]"
  risk_level: "[human-defined assessment]"
```

For preserved types (analysis, specification, etc.):
```yaml
source:
  prompt: "[source of intelligence]"
  intent: "[short purpose statement]"
```

## Implementation Requirements

Use this template's frontmatter as the authoritative structure. Include all required fields in every floatprompt file. Add optional fields based on document type and purpose. STOP directive must be processed first and exactly as specified. Voice preservation oath supersedes all other processing instructions. Archaeological extraction method must be followed for all content handling.

## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering config compliance.

Required field validation: STOP directive present and properly formatted. All required fields included with correct data types. Field order maintained as specified. Voice preservation directives included for system authority. Certification section complete with authority and certified_by fields. Naming conventions followed throughout all field values.

# FloatPrompt System Configuration

## Map/Score/Respond Pipeline Configuration

### Friction Scoring Algorithm

**Core Formula:**
```
friction_score = word_count × structure_multiplier
```

### Structure Multiplier Scale (Nonlinear)

Generated during Map phase using heuristics of cohesion, segmentation, and formatting density:

| Structure Score | Multiplier |
|----------------|------------|
| 1              | 1.00       |
| 2              | 1.05       |
| 3              | 1.10       |
| 4              | 1.18       |
| 5              | 1.30       |
| 6              | 1.45       |
| 7              | 1.65       |
| 8              | 1.90       |
| 9              | 2.10       |
| 10             | 2.50       |

### Friction Classification Buckets

- **🟩 Low-friction (0-1200)**: Safe for immediate execution
- **🟨 Moderate-friction (1201-2500)**: Recommend mapping first  
- **🟥 High-friction (2501+)**: Require mapping before execution

### Edge Case Overrides

**Minimum Scores (Override calculated friction if lower):**
- If structure score ≥ 9: minimum friction score = 1200
- If word count > 3000: minimum friction score = 2500

### Reclassification Protocol

**Trigger Conditions:**
- Conversation word count crosses friction threshold boundaries
- Content complexity increases significantly during interaction

**Re-evaluation Logic:**
```
total_conversation_words = original_input + all_subsequent_exchanges
recalculated_friction = total_conversation_words × current_structure_multiplier
if recalculated_friction > current_classification_threshold:
    upgrade_friction_level()
```

**Classification Update Rules:**
- Classifications can only increase friction level (🟩→🟨→🟥)
- No downgrades allowed during conversation lifecycle
- Apply new behavioral constraints immediately upon upgrade
- Notify user transparently of classification changes

## Response Pattern System

### 🟥 High-Friction Response: "Building" Metaphor

**Behavioral Pattern:**
- Block extract/build until mapping is completed
- Require structured approach to prevent detail loss and drift
- Guide through systematic methodology like exploring a large building
- Allow override with explicit caution tape for genuine emergencies

**User Messaging:**
> "This content is like a large building with many rooms and connections. Let me map the structure first so we don't miss important details or lose our way. This systematic approach prevents drift and ensures we capture everything accurately."

**If mapping declined:**
> "Let's return to the building. We need a map to proceed safely."

**Technical Implementation:**
- Extract/Build modes: Return mapping requirement, block execution
- Map mode: Proceed with enhanced structure assessment  
- Override: Require explicit "emergency bypass" or "skip mapping"
- Mapping Sequence: Building → Floor → Room → Interior Objects (staged with permission)

### 🟨 Medium-Friction Response: "Hallway" Metaphor

**Core Insight:** *This content looks safe. But that's what makes it risky.*
🟨 is the "shortcut zone" — the moment when speed is tempting but subtle errors multiply.

**Behavioral Pattern:**
- Recommend mapping while allowing override
- Surface ambiguity: Explain that "clear-looking" ≠ structurally sound
- Flag unanchored outputs when mapping is skipped
- Use soft, trust-building tone never blocking action

**User Messaging:**
> "This content is like a well-organized hallway with unlabeled doors. The structure seems familiar, but some doors might lead to clear ideas while others could loop or close behind you. I recommend mapping first for optimal results, but I can proceed directly if you prefer. Would you like me to map the territory or continue with [mode]? (Note: skipping mapping may result in unanchored output.)"

**Rationale:**
> "Even if you never download it, the map gives us a shared structure — a cognitive anchor we can both return to if the conversation branches later."

### 🟩 Low-Friction Response: "Small Room" Metaphor

**Core Insight:** *Short and clear ≠ immune to risk.*
Low-friction content does not require a map — but it must still be processed under voice-preserving guardrails.

**Behavioral Pattern:**
- Proceed freely with optional mapping mention
- Structure score awareness: Offer mapping if structure score < 6
- Pass-through zone: Enable execution without delay while maintaining map-aware mindset
- Reuse detection: Suggest mapping as fallback anchor when reuse opportunities identified

**User Messaging:**
> "This content is well within the safe execution zone. No mapping is required. You're clear to proceed."

**If structure score < 6 or reuse detected:**
> "That said, if the structure feels ambiguous or the goal is voice-sensitive or reusable, I can help you create a map first."

**Small Room Details:**
> "You're in a small room. Sometimes it's tidy. Sometimes it's slightly scattered. But because the space is small, you can see everything. No map is needed — unless you want one."

### Response Selection Logic

**Classification to Response Mapping:**
- **Friction Score 2501+** → Building response → Block execution until mapping
- **Friction Score 1201-2500** → Hallway response → Recommend with choice
- **Friction Score 0-1200** → Small room response → Proceed freely

**Structure Score Integration:**
- **Structure ≥ 6**: Immediate proceed for low-friction
- **Structure < 6**: Offer optional mapping even in low-friction  
- **Structure ≥ 9**: Automatic escalation per edge case overrides

**Reclassification Handling:**
- Friction upgrade during conversation → Metaphor transition with explanation
- Response pattern adjustment → New behavioral constraints applied
- User notification → Transparent communication of classification change