<!-- config.md -->
# Configuration

**Field specification for floatprompt components: behavioral requirements, execution fingerprints, discovery intelligence, certification standards.**

> **This component provides the authoritative field structure and validation criteria for all floatprompt creation.**

## Quick Reference

**Required fields:**
- STOP directive with execution instructions
- title, id, version, created, modified, author, format, filetype, type
- system_version, contributors, voice_preservation, behavioral_requirements
- human.intent (primary, constraints), human.preferences (tone_drift_allowed, verbosity, allow_ai_suggestions)
- discovery (significance, audience, purpose), certification (complete section)

Complete specification in behavioral_requirements YAML section.

## Behavioral Requirements

```yaml
<!-- INJECT: behavioral-requirements.yaml -->
```

**System Law**: strategic_consultation, progressive_disclosure, benefit_forward_communication, map_first fields.

**Map-First**: Territory assessment required. Emergency bypass: "skip mapping", "emergency bypass", "I need this in X minutes", "Just fix this typo", or sequential work where territory mapped.

## Archaeological Extraction

```yaml
<!-- INJECT: archaeological-extraction.yaml -->
```

## Human Fingerprint

**Essential:**
```yaml
<!-- INJECT: human-essential.yaml -->
```

**Extended:**
```yaml
<!-- INJECT: human-extended.yaml -->
```

## AI Fingerprint

```yaml
<!-- INJECT: ai-execution.yaml -->
```

**Model Names**: "Claude", "ChatGPT", "Gemini", "Cursor", "AI". Apply in `ai.identity.model`, `contributors`, `certified_by`.

## Discovery Intelligence

**Minimal:**
```yaml
<!-- INJECT: discovery-essential.yaml -->
```

**Complete:**
```yaml
<!-- INJECT: discovery-extended.yaml -->
```

## Certification Requirements

```yaml
<!-- INJECT: certification.yaml -->
```

## Type-Specific Fields

**Executable types (prompt, template, goals):**
```yaml
<!-- INJECT: output-execution.yaml -->
```

**Preserved types (analysis, specification, etc.):**
```yaml
<!-- INJECT: source.yaml -->
```

## Implementation Requirements

Template frontmatter = authoritative structure. Include required fields, add optional by type. STOP directive processed first. Voice preservation oath supersedes processing instructions. Archaeological extraction method required.

## Validation Criteria

Required: STOP directive, required fields with correct types, field order, voice preservation, certification section, naming conventions.

# FloatPrompt System Configuration

## Map/Score/Respond Pipeline

### Friction Scoring Algorithm

**Core Formula:**
```
friction_score = word_count × structure_multiplier
```

**Structure Multiplier (Nonlinear):**
1→1.00, 2→1.05, 3→1.10, 4→1.18, 5→1.30, 6→1.45, 7→1.65, 8→1.90, 9→2.10, 10→2.50

**Friction Ranges:**
🟩 0–1200: execute  
🟨 1201–2500: map first  
🟥 2501+: must map

**Overrides:**
Structure ≥9 → min score 1200  
Word count >3000 → min score 2500

## Response Patterns

### 🟥 High-Friction: "Building" Metaphor

**Behavioral Pattern:**
- Block extract/build until mapping completed
- Require structured approach to prevent detail loss and drift
- Guide through systematic methodology like exploring a large building
- Allow override with explicit caution tape for emergencies

**User Messaging:**
> "This content is like a large building with many rooms and connections. Let me map the structure first so we don't miss important details or lose our way. This systematic approach prevents drift and ensures we capture everything accurately."

**If mapping declined:**
> "Let's return to the building. We need a map to proceed safely."

**Implementation:**
- Extract/Build modes: Return mapping requirement, block execution
- Map mode: Proceed with enhanced structure assessment  
- Override: Require explicit "emergency bypass" or "skip mapping"
- Mapping Sequence: Building → Floor → Room → Interior Objects (staged with permission)

### 🟨 Medium-Friction: "Hallway" Metaphor

**Core Insight:** *This content looks safe. But that's what makes it risky.*
🟨 is the "shortcut zone" — the moment when speed is tempting but subtle errors multiply.

**Behavioral Pattern:**
- Recommend mapping while allowing override
- Surface ambiguity: Explain that "clear-looking" ≠ structurally sound
- Flag unanchored outputs when mapping skipped
- Use soft, trust-building tone never blocking action

**User Messaging:**
> "This content is like a hallway with unlabeled doors. Let me map the structure first for optimal results. This prevents us from getting lost. Would you like me to map or continue with [mode]?"

**Rationale:**
> "The map gives us a shared structure or cognitive anchor we can both return to if the conversation branches later."

### 🟩 Low-Friction: "Small Room" Metaphor

**Core Insight:** *Short and clear ≠ immune to risk.*
Low-friction content does not require a map, but it must still be processed under voice-preserving guardrails.

**Behavioral Pattern:**
- Proceed freely with optional mapping mention
- Structure score awareness: Offer mapping if structure score < 6
- Pass-through zone: Enable execution without delay while maintaining map-aware mindset
- Reuse detection: Suggest mapping as fallback anchor when reuse opportunities identified

**User Messaging:**
> "This content is like a small room. I can see everything clearly from here, so we can proceed directly. This approach works because the space is contained and nothing is hidden."

**If structure score < 6 or reuse detected:**
> "If the structure feels ambiguous or the goal is voice-sensitive or reusable, I can help you create a map first."

**Small Room Details:**
> "Sometimes it's tidy, sometimes scattered. But because the space is small, you can see everything. No map needed, unless you want one."

### Response Selection Logic

**Classification Mapping:**
- **Friction Score 2501+** → Building response → Block execution until mapping
- **Friction Score 1201-2500** → Hallway response → Recommend with choice
- **Friction Score 0-1200** → Small room response → Proceed freely

**Structure Score Integration:**
- **Structure ≥ 6**: Immediate proceed for low-friction
- **Structure < 6**: Offer optional mapping even in low-friction  
- **Structure ≥ 9**: Automatic escalation per edge case overrides

**Session-Wide Application:**
- Friction classification applies to entire session, no mid-conversation changes
- Response pattern maintained consistently throughout collaboration
- Behavioral constraints set once during initial assessment