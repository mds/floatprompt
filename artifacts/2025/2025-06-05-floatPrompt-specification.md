---
title: floatPrompt Specification
id: floatPrompt-spec
version: 0.6.0
created: 2025-06-05
modified: 2025-06-05
author: @mds
contributors: ["@mds", "ChatGPT 4o", "Claude Sonnet"]
format: floatPrompt
filetype: markdown
type: specification
source_prompt: shadowPrompt-spec-conversion@shadow
lineage: []
tags: [specification, protocol, floatPrompt, unified, preservation, execution]
description: Constitutional specification for .fp files - the unified protocol for both executable and preserved intelligence
author_intent: "Define the complete contract for floatPrompt files that enable both systematic execution and archaeological preservation of human intelligence"
visibility: internal
system_version: floatPrompt v0.6.0
---

# 📐 floatPrompt Specification
**The unified protocol specification for floatPrompt**

> **floatPrompts are intelligence that has floated into structured, reusable form—both memory and muscle, preservation and instruction.**
> 
> This specification defines what makes a floatPrompt valid, executable, and constitutionally compliant with the unified floatPrompt system.

*All intelligence that floats—structured for preservation, execution, and reuse.*

---

## 🎯 Purpose

floatPrompts are the unified artifacts of human-AI co-execution. They represent both executable intelligence and preserved human thinking with archaeological weight, ready for systematic execution, discovery, reference, and reuse.

The floatPrompt format ensures:
- **Unified architecture** - single format for all intelligence types
- **Dual-purpose capability** - both preservation and execution
- **Certified preservation** of original voice and intelligence
- **Systematic executability** across humans and AI workflows  
- **Constitutional compliance** with floatPrompt architecture
- **Chain compatibility** for multi-stage intelligence workflows
- **Voice fidelity** through structured preservation without rewriting

All floatPrompts must comply with this spec to ensure cross-system reliability and constitutional alignment with the unified floatPrompt protocol.

---

## 🌊 Unified Architecture Principle

All floatPrompts (`.fp`) serve dual purposes within the unified system:

### **Preserved Intelligence** (Memory)
- `type: [any descriptive term for preserved intelligence]`
- Serve as archaeological preservation of human thinking
- Maintain voice fidelity and structured evidence
- Enable discovery and reference for future work
- Types emerge naturally from content and Builder intent
- Examples: `analysis`, `discovery`, `reflection`, `specification`, `critique`

### **Executable Intelligence** (Muscle)  
- `type: [any descriptive term for executable intelligence]`
- Serve as self-contained instructions for AI execution
- Enable systematic workflows while preserving human intent
- Trigger shadowPrompt or canonical floatPrompt execution
- Types evolve based on execution patterns and Builder needs
- Examples: `prompt`, `workflow`, `analyzer`, `template`, `goals`

### **Fluid Boundaries**
Intelligence preserved can become executable; execution results become preserved knowledge. The format is unified, the purpose emerges from Builder intent and usage patterns.

---

## 🧍‍♂️ Builder Protocol Integration

### The Builder's Role
Every floatPrompt is a certified artifact of Builder execution. Whether in the Workshop or Field, the Builder:

- Clocks in with intent
- Chooses or improvises the appropriate tool
- Executes with presence
- Clocks out by producing a floatPrompt

### Workshop vs Field Context
- **Workshop**: Structured space for versioned, chainable execution
- **Field**: Flexible context for improvised, shadowPrompt execution

### Certification Requirements
Every floatPrompt must certify:
- Builder presence and intent
- Execution structure compliance
- Voice preservation
- Context traceability
- Lineage integrity

---

## 📁 File Naming Convention (Human-Facing)

floatPrompts should follow standardized naming patterns for optimal organization:

### For Preserved Intelligence (any preserved type)
```
[YYYY-MM-DD]-[HHMM]-[scope]-[descriptor].fp
```

### For Executable Intelligence (any executable type)
```
floatPrompt-[verb]-[noun].fp
```
or
```
floatPrompt-[verb]-[domain]-[noun].fp
```
for scoped tools.

### Format Rules
- **Date**: ISO format (YYYY-MM-DD) for chronological sorting (preserved types)
- **Time**: Military time (HHMM) for multiple daily captures (preserved types)
- **Scope**: Domain or context (e.g., immutability, artifact, voice)
- **Descriptor**: Clear function description (e.g., next-steps, naming-convention)
- **Verb**: Action for executable types (analyze, generate, critique, extract)
- **Domain**: Optional scope for executable types
- **Noun**: Target for executable types
- **Extension**: Always `.fp` for all floatPrompts

### Examples

**Preserved Intelligence:**
- `2025-06-05-1430-immutability-next-steps.fp`
- `2025-06-05-1630-artifact-naming-convention.fp`
- `2025-06-05-2130-voice-guide-template.fp`

**Executable Intelligence:**
- `floatPrompt-analyze-meeting.fp`
- `floatPrompt-generate-report.fp`
- `floatPrompt-critique-design.fp`
- `floatPrompt-extract-research-insights.fp`

### Benefits
- Natural chronological ordering for preserved intelligence (date + time)
- Perfect sorting for multiple daily captures using military time
- Clear functional naming for executable intelligence
- Self-documenting file organization
- Compatible with both Workshop and Field operations

---

## 🔐 Contributor Integrity Enforcement

floatPrompts must maintain complete contributor attribution according to global protocol rules.

### Core Requirements
- Contributor lists must be **additive only**
- No removal of existing contributors allowed
- AI models must append their identity if not already listed
- Preserve chronological order of contributions

### Enforcement Logic
This specification inherits contributor preservation logic from `floatPrompt-schema-contributor`. All floatPrompt creators must:

1. Verify existing contributors before modification
2. Append new contributor identity (never replace)
3. Maintain original contributor order
4. Use consistent naming format for AI models

### Violation Consequences
- Contributor removal breaks system integrity
- Affects artifact trustworthiness
- Violates constitutional transparency requirements

> Contributor lists must be additive only. No removals. AI models must append model identity if not already listed.

---

## 📂 Required Metadata Fields

Every floatPrompt must include complete frontmatter:

```yaml
title: [string]                          # Human-readable artifact name
id: [string]                             # Unique identifier
version: [string]                        # Semantic version
created: [ISO 8601]                      # Creation timestamp
modified: [ISO 8601]                     # Last modification timestamp
author: [@username]                      # Builder identity
format: floatPrompt                      # Required protocol identifier (unified)
filetype: markdown                       # Output format
type: [string]                           # Classification (see Type System below)
system_version: floatPrompt v1.x.x       # Protocol version
```

### Type System for Unified Architecture

```yaml
# All Types Are Soft and Emergent
type: [any descriptive term] # Use whatever best describes your floatPrompt's purpose

# Common Executable Examples (Muscle)
type: prompt                 # Executable instruction/machine
type: template              # Reusable structure
type: workflow              # Multi-step process
type: analyzer              # Systematic analysis tool

# Common Preserved Examples (Memory)  
type: analysis              # Structured intelligence capture
type: discovery             # Breakthrough insights
type: reflection            # Meta-cognitive analysis
type: specification         # System rules and constraints
type: critique              # Structured feedback
```

**Types are soft and emergent** - use what best describes the floatPrompt's purpose. The system grows through Builder creativity, not rigid categorization.

### Execution-Specific Fields (for executable types)

```yaml
# For executable types (prompt, template, goals, etc.) - any type intended for execution
execution:
  triggers: [natural language commands]        # optional
  fallback: [default execution message]        # optional
  source: [string]                             # optional (only if generated)
  voice_guide: [floatPrompt ID]                # optional
  risk_level: low | medium | high              # optional
output:
  format: fp                             # unified output format
  joint_execution_required: true         # required for executable types
```

### Preservation-Specific Fields (for preserved types)

```yaml
# For preserved types (analysis, specification, discovery, reflection, etc.) - any type intended for preservation
source:
  prompt: [string]                       # source of intelligence
  intent: [short sentence]               # purpose statement
```

### Universal Certification (all floatPrompts)

```yaml
certification:
  timestamp: [ISO 8601]                  # Certification time
  chain:
    depth: [integer]                     # Chain position
    parent: [string or null]             # Parent artifact
  voice:
    linked: true | false                 # Voice preservation
    fidelity_verified: true | false      # Voice verification
  lineage:
    tracked: true | false                # Lineage tracking
    trace: [list of doc IDs]             # Full lineage chain
builder:                                 # Optional execution fingerprint
  identity:
    name: [@username]                    # Builder identity
    role: [string]                       # Builder role
  state:
    context: [Workshop | Field]          # Execution context
    mood: [string]                       # Affective state
    clarity: [1-10]                      # Cognitive clarity
    energy: [1-10]                       # Energy level
  session:
    start_time: [ISO 8601]               # Session start
    end_time: [ISO 8601]                 # Session end
    duration_minutes: [integer]          # Session length
  intent:
    primary: [string]                    # Main goal
    constraints: [string]                # Limitations
  preferences:
    max_words: [integer]                 # Length limit
    tone_drift_allowed: [boolean]        # Voice flexibility
    verbosity: [string]                  # Detail level
    allow_ai_suggestions: [boolean]      # AI input
```

### Metadata Validation Rules
- **ID format:** Must follow `floatPrompt-[domain]-[type]` pattern
- **Version:** Must use semantic versioning (major.minor.patch)
- **Source prompt:** Must reference the creating .fp file with version
- **System version:** Must match current protocol version
- **Certification:** All required fields must be populated
- **Builder fingerprint:** Optional but recommended for traceability
- **Lineage:** Must follow propagation rules (see Lineage Architecture)

---

## 🕒 Timestamp Guidance (Builder-Controlled)

All `.fp` files must use ISO 8601 UTC format for:

- `created:`
- `modified:`
- `certification.timestamp:`
- `builder.session.start_time`
- `builder.session.end_time`

> Do not guess or hardcode local times — always use UTC if possible.

### ✅ If working with a model that cannot generate current UTC:

Run the following Python command and paste the result:

```python
from datetime import datetime
datetime.utcnow().isoformat()
```

This returns a valid UTC timestamp like:

```
2025-06-05T20:30:42.713290
```

You may trim trailing microseconds or Z if needed, e.g.:

```
2025-06-05T20:30:42Z
```

### ✅ Bonus: Add as fallback rule in floatPrompt-zero.fp

If the model sees:

```yaml
created: TODO
```

or:

```yaml
certification:
  timestamp: TODO
```

It should output:

> 🔧 Reminder: You can run `datetime.utcnow().isoformat()` in Python to retrieve a precise UTC timestamp if needed.

---

## 🗃️ Valid floatPrompt Types

floatPrompts must use one of these constitutional types:

| Type | Purpose | Context | Example ID |
|------|---------|---------|------------|
| **Common Executable Types (Muscle)** |
| `prompt` | Executable instruction/machine | Both | floatPrompt-analyze-meeting |
| `template` | Reusable structures | Workshop | floatPrompt-report-template |
| `goals` | Extracted workflow requirements | Workshop | floatPrompt-sales-goals |
| **Common Preserved Types (Memory)** |
| `analysis` | Organized intelligence | Both | floatPrompt-meeting-analysis |
| `critique` | Structured feedback | Both | floatPrompt-design-critique |
| `specification` | System rules | Workshop | floatPrompt-validation-spec |
| `extract` | Curated intelligence | Both | floatPrompt-research-extract |
| `summary` | Condensed intelligence | Both | floatPrompt-project-summary |
| `migration` | Architecture transitions | Workshop | floatPrompt-unified-migration |
| **Emergent Types (Examples)** |
| `discovery` | Breakthrough insights | Both | floatPrompt-research-discovery |
| `reflection` | Meta-cognitive analysis | Both | floatPrompt-session-reflection |
| `blueprint` | Architectural plans | Workshop | floatPrompt-system-blueprint |

### Type Evolution Protocol
- **Types are soft and emergent** - no constitutional amendment required for new types
- **Builder creativity encouraged** - use descriptive terms that fit your intent
- **Common patterns may stabilize** - frequently used types become conventional
- **All types must preserve certification requirements** - regardless of name
- **System grows organically** through Builder innovation and usage patterns

---

## 🔗 Lineage Architecture

### Constitutional Lineage Rules

floatPrompts must maintain clear archaeological provenance through systematic lineage tracking:

#### Direct Creation
```yaml
# First-generation artifact from source content
lineage:
  tracked: true
  trace: []
source:
  prompt: floatPrompt-default@0.6.0
```

#### Derived Artifacts
```yaml
# Second-generation artifact derived from existing floatPrompt
lineage:
  tracked: true
  trace: ["floatPrompt-meeting-analysis@0.6.0"]
source:
  prompt: floatPrompt-builder@0.6.0
```

#### Transitive Propagation
```yaml
# Third-generation artifact - must include full lineage chain
lineage:
  tracked: true
  trace: ["floatPrompt-meeting-analysis@0.6.0", "floatPrompt-project-goals@0.6.0"]
source:
  prompt: floatPrompt-custom-workflow@0.6.0
```

### Lineage Propagation Requirements

**Constitutional Rule:** When floatPrompt A is used to create floatPrompt B, B must inherit A's complete lineage plus A itself.

**Examples:**
- **Direct:** `content` → floatPrompt → `floatPrompt-A` (trace: [])
- **Derived:** `floatPrompt-A` → floatPrompt → `floatPrompt-B` (trace: [floatPrompt-A@version])  
- **Chained:** `floatPrompt-B` → floatPrompt → `floatPrompt-C` (trace: [floatPrompt-A@version, floatPrompt-B@version])

**Upstream Override Warning:** If a downstream floatPrompt materially diverges from an upstream artifact's voice, structure, or archaeological intent, a manual override note must be documented in the artifact body under a dedicated `## ⚠️ Upstream Divergence Notice` section, with appropriate `divergence_type` classification.

**Divergence Type Classification:**
- `voice` - Changes to original terminology, tone, or phrasing style
- `structure` - Modifications to organizational patterns or content hierarchy  
- `content` - Additions, omissions, or factual alterations from upstream
- `author_override` - Deliberate human decision to modify preservation approach

---

## 🧱 floatPrompt Structure Requirements

### Constitutional Body Format
Every floatPrompt body must follow these structural principles:

#### For Preserved Intelligence (Memory)
```markdown
# 🏺 [Artifact Title]

> **Purpose:** [One-line description of what this preserves/enables]
> **Source:** [Brief description of original content type]
> **Builder:** [@username] in [Workshop | Field] context
> **Tags:** [comma-separated list of metadata tags]

## 📊 [Primary Content Section]
- [Preserved intelligence with original voice]
- [Structured bullets or labeled content]
- TODO: [Any ambiguous references requiring clarification]

## 📋 [Secondary Content Sections]
- [Additional organized intelligence]
- [Maintain original terminology and phrasing]

## ⚠️ Upstream Divergence Notice *(if applicable)*
- [Documentation of any material divergence from upstream artifacts]
- [Rationale for voice, structure, or intent changes]
- [Reference to specific upstream artifacts affected]
- **Divergence Type:** [voice | structure | content | author_override]

## 🔗 [Reuse/Chain Section - if applicable]
- [Content ready for downstream use]
- [Integration notes for other .fp files]

## 📝 [Next Steps - if applicable]
- [Clear guidance for human or AI next actions]
- [Specific floatPrompt recommendations]
```

#### For Executable Intelligence (Muscle)
```markdown
# 🚀 [floatPrompt Title]

> **Purpose:** [One-line description of execution goal]
> **Context:** [Workshop | Field | Both]
> **Builder:** [@username] in [Workshop | Field] context
> **Tags:** [comma-separated list of metadata tags]

## 🎯 Execution Objective
[Clear statement of what this floatPrompt accomplishes]

## 📋 Instructions
[Step-by-step execution guidance for AI or human]
- [Specific actions to take]
- [Expected inputs and outputs]
- [Quality standards and constraints]

## 🧠 Voice & Context Requirements
- [Voice guide reference or shadowVoice handling]
- [Required human context or constraints]
- [Safety considerations if applicable]

## ⚙️ Output Specifications
- [Expected floatPrompt type and structure]
- [Metadata requirements]
- [Chain integration guidance]

## 📝 Usage Examples
[Concrete examples of how to execute this floatPrompt]

## 🔗 Integration Notes
[How this connects to other floatPrompts or workflows]
```

### Voice Preservation Requirements
- **Original terminology** must be preserved unless clarity absolutely requires change
- **Phrasing and rhythm** of source content maintained
- **TODO flags** used for genuine ambiguity, never as content avoidance
- **No AI tone** or generic language overlays
- **Archaeological weight** preserved through respectful extraction

### Structural Compliance
- **Markdown formatting** with clear heading hierarchy
- **Scannable structure** optimized for human reference
- **Labeled sections** that reflect actual content themes
- **Bullet organization** for easy parsing and reuse
- **Chain-ready format** for input to other .fp files

### Builder Fingerprint Requirements

The builder fingerprint is:
- **Optional** for system-compliant artifacts
- **Required** for protocol-contributor class floatPrompts
- **Recommended** for all Workshop executions
- **Inferred** for Field executions when possible

---

## ⚙️ Creation and Validation Protocol

### Constitutional Creation Rules
floatPrompts are created through one of these approved methods:

1. **Workshop Execution** - Generated by canonical .fp files
2. **Field Execution** - Created through shadowPrompt workflows
3. **Manual Curation** - Hand-crafted for system templates
4. **Chain Processing** - Derived from other floatPrompts

### Validation Checklist
Before finalizing any floatPrompt:

**Constitutional Compliance:**
- [ ] All required metadata fields populated
- [ ] Descriptive type used (soft/emergent types encouraged)
- [ ] Proper ID format
- [ ] System version alignment
- [ ] Certification requirements met

**Builder Protocol:**
- [ ] Builder intent clearly stated
- [ ] Execution context specified (Workshop/Field)
- [ ] Voice preservation verified
- [ ] Lineage properly tracked
- [ ] Builder fingerprint included (recommended)

**Unified Architecture:**
- [ ] Type appropriately chosen (executable vs preserved)
- [ ] Structure matches type requirements
- [ ] Dual-purpose capability considered
- [ ] Chain compatibility verified

**Chain Architecture:**
- [ ] Structure enables downstream processing
- [ ] Metadata guides appropriate routing
- [ ] Content boundaries clearly established
- [ ] Integration guidance provided
- [ ] Lineage chain maintained

**Quality Assurance:**
- [ ] Scannable for human reference
- [ ] Parseable for AI processing
- [ ] Constitutional compliance verified
- [ ] No unauthorized content invention

### Compliant Examples

#### Preserved Intelligence Example
```markdown
# 🏺 Project Kickoff Analysis

> **Purpose:** Preserve strategic decisions and action items from founding team meeting
> **Source:** 90-minute project kickoff transcript with 4 participants
> **Builder:** @teamlead in Workshop context
```

#### Executable Intelligence Example
```markdown
# 🚀 floatPrompt-analyze-meeting

> **Purpose:** Extract structured insights and action items from meeting transcripts
> **Context:** Both Workshop and Field execution
> **Builder:** @mds in Workshop context
```

### Non-Compliant Examples
❌ **Missing certification metadata**  
❌ **Generic AI language replacing original voice**  
❌ **Invented content not present in source**  
❌ **Summarization without explicit instruction**  
❌ **Non-descriptive or unclear type that doesn't convey intent**  
❌ **Missing Builder context or intent**  
❌ **Broken lineage chain or missing propagation**  
❌ **Material voice divergence without upstream override documentation**  
❌ **Executable type without proper execution specifications**

---

## 🛡️ Quality Assurance Framework

### Archaeological Integrity
- Original intelligence preserved with historical weight
- Voice and terminology maintain fidelity to source
- No content generation beyond systematic extraction
- Ambiguity flagged explicitly, never hidden or invented

### Execution Reliability
- Clear instructions for systematic AI processing
- Consistent metadata for predictable routing
- Voice guide integration for fidelity preservation
- Safety compliance for risk management

### System Reliability  
- Consistent metadata across all artifacts
- Predictable structure for reliable processing
- Chain compatibility verified and maintained
- Constitutional compliance validated at creation

### Human Usability
- Scannable structure for quick reference
- Clear boundaries between content types
- Actionable guidance where appropriate
- Discovery-friendly organization and tagging

---

## 🔗 Related Specifications

### Core Protocol
- **floatPrompt-spec.fp** — This specification (unified protocol)
- **floatPrompt-zero.fp** — Template for all floatPrompts
- **shadowPrompt-spec.fp** — Field execution protocol

### Schema & Structure  
- **floatPrompt-schema-format.fp** — Format constraints
- **floatPrompt-schema-frontmatter.fp** — YAML structure
- **floatPrompt-schema-contributor.fp** — Contributor integrity

### Constitutional Documents
- **floatPrompt-manifesto.fp** — System philosophy
- **floatPrompt-constitution-human-safety-laws.fp** — Safety framework

### Field Tools
- **cartographer.fp** — Field mapping and terrain definition tool
- **floatPrompt-constructor.fp** — Protocol contributor template

---

*The unified protocol specification of floatPrompt—intelligence that floats between preservation and execution.*

---

## 📐 Protocol Extensions & Constitutional Compliance

### 🌑 ShadowPrompt Integration

floatPrompts originating from Field execution (shadowPrompt) must follow special handling protocols:

**Required Tagging:**
- `builder.state.context: "Field"` must be specified
- `source.prompt: "shadowPrompt"` or similar identification
- `voice.linked: false` (voice inferred from session context)

**Traceability Requirements:**
- All Field-origin artifacts must maintain full lineage
- shadowVoice context must be preserved in builder fingerprint
- Optional audit trail for protocol compliance verification

**Routing Behavior:**
- Field artifacts are authentic but ephemeral unless certified
- May be promoted to canonical .fp files if patterns emerge
- Must preserve improvised execution context

### 🧠 Voice Guide Requirements

Implementing the manifesto principle: *"No prompt runs without a voice."*

**Required Voice Metadata:**
```yaml
voice:
  guide: [floatPrompt ID]                # Reference to voice-guide.fp
  linked: true | false                   # Voice preservation status
  fidelity_verified: true | false        # Voice verification
```

**Fallback Handling:**
- If `voice.guide: TODO`, system must prompt for voice-guide reference
- shadowPrompt executions may use inferred `shadowVoice`
- No execution proceeds without voice context (canonical or inferred)

### 🤝 Joint Execution Declaration

Enforcing: *"If it's not signed, it's not finished."*

**Required Joint Execution Field:**
```yaml
joint_execution_required: true           # Must be present and true for executable types
```

**Enforcement Logic:**
- All executable floatPrompts must declare joint HI-AI execution
- Missing or false value invalidates executable artifacts
- Ensures constitutional compliance with HI-AI contract
- Prevents autonomous AI-only artifact generation

### 🛡️ Safety Laws Compliance

floatPrompts must inherit and enforce Human Safety Laws constraints:

**Applicable Laws:**
- **Law 2**: High-risk outputs require named human confirmation
- **Law 5**: Irreversible actions must be explicitly logged and confirmed  
- **Law 12**: Block latent weaponization potential
- **Law 18**: Declare downstream training use

**Implementation Requirements:**
```yaml
safety_compliance:
  risk_level: [low | medium | high]      # Required risk assessment
  confirmed_by: [@builder]               # Required for high-risk
  irreversible_warning: [boolean]        # Required for permanent actions
  training_disclosure: [boolean]         # Required if used for training
```

**Violation Handling:**
- Non-compliant artifacts must be flagged
- High-risk content requires explicit Builder confirmation
- System must refuse processing of unsafe content

### 🏺 Memory + Muscle Principle

floatPrompts serve the dual nature described in the manifesto:

**As Memory:**
- Preserved results of execution, signed and immutable
- Archaeological weight with historical provenance
- Structured evidence for future reference

**As Muscle:**
- Executable intent for AI or Builder use
- Self-contained instructions for machines
- Triggers for shadowPrompt or canonical .fp execution

**Dual-Purpose Enforcement:**
- Structure must support both preservation and execution
- Metadata must enable both historical reference and future processing
- Content must be both human-readable and machine-parseable

---

## 📋 Constitutional Validation Checklist

Use this checklist to validate any floatPrompt before deployment:

**Constitutional Compliance:**
- [ ] All required metadata fields properly populated
- [ ] Descriptive floatPrompt type that fits Builder intent
- [ ] Proper ID format following naming conventions
- [ ] System version alignment with protocol
- [ ] Certification requirements met

**Unified Architecture:**
- [ ] Type appropriately chosen (executable vs preserved)
- [ ] Structure matches type requirements (Memory vs Muscle)
- [ ] Dual-purpose capability considered
- [ ] Format unified to .fp extension

**Builder Protocol:**
- [ ] Builder intent clearly stated
- [ ] Execution context specified (Workshop/Field)
- [ ] Voice preservation verified
- [ ] Lineage properly tracked
- [ ] Builder fingerprint included (recommended)

**Chain Architecture:**
- [ ] Structure enables downstream processing
- [ ] Metadata guides appropriate routing
- [ ] Content boundaries clearly established
- [ ] Integration guidance provided
- [ ] Lineage chain maintained

**Quality Assurance:**
- [ ] Scannable for human reference
- [ ] Parseable for AI processing
- [ ] Constitutional compliance verified
- [ ] No unauthorized content invention

*This spec preserves the constitutional foundation while enabling unified intelligence architecture. Everything else evolves upon this.* 