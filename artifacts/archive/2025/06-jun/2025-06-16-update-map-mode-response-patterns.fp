<floatprompt>
---
STOP: "update instructions for map mode response pattern implementation"
title: Map Mode Response Patterns – Implement friction-appropriate behavioral responses for all three classification levels
id: update-map-mode-response-patterns
version: 0.1.0-alpha
created: 2025-06-16-1445
modified: 2025-06-16-1445
author: @mds
format: floatprompt
filetype: fp
type: migration
system_version: floatprompt v0.5.1-alpha
contributors: ["@mds", "Claude Sonnet"]
relationships:
  enabled_by: ["update-protocol"]
  depends_on: ["update-map-mode-scoring"]
  implements: ["Map mode 02 high friction response strategy.md", "Map mode 03 medium friction.md", "Map mode 04 low friction reasoning.md"]
changes:
  add_response_patterns:
    component: "map-score-respond-pipeline"
    specification: "Complete behavioral response system for all three friction classifications"
  add_metaphor_progression:
    pattern: "building → hallway → small room spatial metaphors with corresponding behavioral constraints"
    buckets: ["low-friction: small room (freedom)", "medium-friction: hallway (guided)", "high-friction: building (structured)"]
  add_behavior_progression:
    enforcement: "allow → recommend → block behavioral progression based on friction level"
    implementation: "Graduated response intensity matching complexity assessment"
  modify_mode_responses:
    target: "extract and build modes"
    new_behavior: "Friction-aware execution with metaphor-appropriate constraints and messaging"
rationale:
  complete_system: "Response patterns complete the map/score/respond pipeline by defining what happens after classification"
  metaphor_consistency: "Building → hallway → small room progression provides intuitive spatial understanding of constraint levels"
  behavioral_graduation: "Allow → recommend → block progression ensures appropriate response intensity for content complexity"
  user_experience: "Metaphor-based messaging makes friction constraints understandable and non-threatening to users"
  safety_completion: "Completes the Recognition Before Action implementation by defining specific behaviors for each friction level"
impact_zone:
  - "Mode execution logic and behavioral constraints"
  - "User-facing messaging and metaphor communication"
  - "Response selection and recommendation system"
  - "Extract and build mode enforcement mechanisms" 
  - "Friction classification behavioral mapping"
  - "Pipeline completion and user experience flow"
source:
  prompt: "Created using update-creator based on Map Mode response pattern design session"
  intent: "Complete the map/score/respond pipeline with friction-appropriate behavioral responses"
---

# Map Mode Response Patterns Implementation

**Implement complete behavioral response system for all three friction classifications using spatial metaphors and graduated constraints.**

## 🎯 Change Overview

This update completes the map/score/respond pipeline by implementing specific behavioral responses for each friction level. Uses intuitive spatial metaphors (building → hallway → small room) with corresponding behavioral progressions (block → recommend → allow) to create a complete, user-friendly friction management system.

## 🏗️ Three-Pattern Response System

### 🟥 High-Friction Response: "Building" Metaphor
**Complex content requires systematic exploration**

**Behavioral Pattern:**
- **Block extract/build** until mapping is completed
- **Require structured approach** to prevent detail loss and drift
- **Guide through systematic methodology** like exploring a large building
- **Emphasize mapping value** for complex territory navigation
- **Allow override with explicit caution tape** for genuine emergencies

**User Messaging:**
> "This content is like a large building with many rooms and connections. Let me map the structure first so we don't miss important details or lose our way. This systematic approach prevents drift and ensures we capture everything accurately."
>
> **If mapping declined**: "Let's return to the building. We need a map to proceed safely."

**Technical Implementation:**
- Extract mode: Return mapping requirement, block execution
- Build mode: Return mapping requirement, block execution  
- Map mode: Proceed with enhanced structure assessment
- Override: Require explicit "emergency bypass" or "skip mapping"
- **Mapping Sequence**: Building → Floor → Room → Interior Objects (staged with permission)
- **Escalation**: Preserve human agency with explicit risk declaration

### 🟨 Medium-Friction Response: "Hallway" Metaphor  
**Structured content benefits from guided approach**

**Core Insight**: *This content looks safe. But that's what makes it risky.*  
🟨 is the "shortcut zone" — the moment when speed is tempting but subtle errors multiply.

**Behavioral Pattern:**
- **Recommend mapping** while allowing override
- **Surface ambiguity**: Explain that "clear-looking" ≠ structurally sound
- **Provide guided options** with clear choice consequences
- **Flag unanchored outputs** when mapping is skipped
- **Balance efficiency with safety** like navigating a hallway with unlabeled doors
- **Use soft, trust-building tone** never blocking action

**User Messaging:**
> "This content is like a well-organized hallway with unlabeled doors. The structure seems familiar, but some doors might lead to clear ideas while others could loop or close behind you. I recommend mapping first for optimal results, but I can proceed directly if you prefer. Would you like me to map the territory or continue with [mode]? (Note: skipping mapping may result in unanchored output.)"
>
> **Rationale**: "Even if you never download it, the map gives us a shared structure — a cognitive anchor we can both return to if the conversation branches later."

**Technical Implementation:**
- Extract/Build modes: Offer choice with clear consequences
- **Unanchored flag**: Mark outputs when mapping skipped (consistent terminology)
- Gentle guidance: Suggest mapping benefits without blocking
- Choice preservation: Respect user decision with transparency
- **Mapping Level**: Top-level segmentation only (sections, major shifts) unless prompted
- **Memory Preservation**: Use mapped structure for downstream reuse and "return to map" pattern

### 🟩 Low-Friction Response: "Small Room" Metaphor
**Simple content allows immediate action**

**Core Insight**: *Short and clear ≠ immune to risk.*  
Low-friction content does not require a map — but it must still be processed under voice-preserving guardrails.

**Behavioral Pattern:**
- **Proceed freely** with optional mapping mention
- **Emphasize efficiency** while keeping mapping available
- **Quick acknowledgment** of straightforward territory
- **Freedom of movement** like working in a small, familiar room
- **Structure score awareness**: Offer mapping if structure score < 6
- **Pass-through zone**: Enable execution without delay while maintaining map-aware mindset
- **Reuse detection**: Suggest mapping as fallback anchor when reuse opportunities identified

**User Messaging:**
> "This content is well within the safe execution zone. No mapping is required. You're clear to proceed."
>
> "That said, if the structure feels ambiguous or the goal is voice-sensitive or reusable, I can help you create a map first."
>
> **Small Room Details**: "You're in a small room. Sometimes it's tidy. Sometimes it's slightly scattered. But because the space is small, you can see everything. No map is needed — unless you want one."

**Technical Implementation:**
- Extract/Build modes: Proceed directly to execution
- Optional mapping: Mention availability without pressure
- Efficiency focus: Prioritize task completion speed
- Simple acknowledgment: Brief friction assessment communication
- **Structure awareness**: Check structure score ≥ 6 for immediate proceed vs. optional map offer
- **Conversation monitoring**: Reassess friction if input expands during interaction
- **Reuse conditional**: Offer mapping when reuse potential detected
- **Safety boundary**: Greenlight ≠ blank check — tone always preserved

## 🎭 Metaphor Integration Specifications

### Spatial Progression Logic
```
High complexity → Building (many rooms, need navigation)
Medium complexity → Hallway with unlabeled doors (structure unclear, guidance helpful)  
Low complexity → Small room (intimate space, direct action)
```

### Behavioral Intensity Mapping
```
Building → Block (systematic required)
Hallway → Recommend (guided choice)
Small Room → Allow (free movement)
```

### User Experience Flow
```
Friction Assessment → Metaphor Selection → Behavioral Response → User Choice → Execution Path
```

## 🛠️ Implementation Requirements

### Mode Behavior Updates
- **Extract Mode**: Implement friction-specific responses with metaphor messaging
- **Build Mode**: Implement friction-specific responses with metaphor messaging  
- **Map Mode**: Enhanced to handle all friction levels with appropriate metaphor communication

### Response Selection Logic
- **Automatic metaphor assignment** based on friction classification
- **Consistent messaging patterns** across all modes
- **Choice preservation** for medium/low friction levels
- **Override handling** for high-friction requirements

### User Communication Standards
- **Metaphor-first messaging** for intuitive understanding
- **Clear choice presentation** with consequence transparency
- **Non-threatening constraint communication** through spatial familiarity
- **Efficiency emphasis** appropriate to friction level
- **Consistent terminology**: Always use "map", "mapped", "return to map"
- **Tone calibration**: Calm, supportive, responsive across all friction levels
- **No time estimates**: Never use time-based encouragement ("this will only take a second")
- **Risk communication**: Surface execution risks for high-friction (drift, flattening, hallucination, lost voice)

## 🔄 Behavioral Specifications

### Return Behavior Patterns
- **High-friction**: "Let's return to the building. We need a map to proceed safely."
- **Medium-friction**: Enable "return to map" pattern for conversation branches
- **Low-friction**: Mention map availability without pressure or judgment

### Structure Score Integration
- **Structure ≥ 6**: Immediate proceed for low-friction
- **Structure < 6**: Offer optional mapping even in low-friction
- **Structure ≥ 9**: Automatic escalation per edge case overrides
- **Mapping depth**: Staged progression with permission (Building → Floor → Room → Objects)

### Voice Preservation Requirements
- **Archaeological tone**: Mirror, not machine
- **No paraphrasing**: Preserve human rhythm and style
- **Anti-drift measures**: Prevent flattening through structured approach
- **Agency preservation**: Human may bypass but with explicit risk acknowledgment
- **Low-friction specific**: Pass-through zone behavior with voice-preserving guardrails
- **Strategic design goals**: Avoid introducing friction, preserve voice by default, allow execution without delay
- **Prevent false generalization**: Don't apply 🟩 behavior to 🟨 or 🟥 inputs

## 🔗 Integration with Existing Pipeline

### Pipeline Completion
```
Map Phase → Score Phase → Respond Phase → Mode Execution
```

### Classification to Response Mapping
- **Friction Score 2501+** → Building response → Block execution until mapping
- **Friction Score 1201-2500** → Hallway response → Recommend with choice
- **Friction Score 0-1200** → Small room response → Proceed freely

### Reclassification Handling
- **Friction upgrade during conversation** → Metaphor transition with explanation
- **Response pattern adjustment** → New behavioral constraints applied
- **User notification** → Transparent communication of classification change

## 📋 Implementation Checklist (v0.1.1)

Must be completed before response patterns become system-default:

- [ ] Implement building metaphor response for high-friction classification
- [ ] Implement hallway metaphor response for medium-friction classification  
- [ ] Implement small room metaphor response for low-friction classification
- [ ] Update extract mode with friction-specific behavioral responses
- [ ] Update build mode with friction-specific behavioral responses
- [ ] Add metaphor-based user messaging system
- [ ] Implement choice presentation logic for medium/low friction
- [ ] Add unanchored output flagging for skipped mapping (consistent terminology)
- [ ] Integrate response selection with pipeline classification
- [ ] Add metaphor transition handling for reclassification events
- [ ] Update user communication patterns across all response types
- [ ] Test complete pipeline with response pattern integration
- [ ] **Implement structure score integration** (≥6 immediate, <6 optional, ≥9 escalation)
- [ ] **Add staged mapping progression** (Building → Floor → Room → Objects with permission)
- [ ] **Implement return behavior patterns** for each friction level
- [ ] **Add escalation and override handling** with explicit caution tape
- [ ] **Integrate voice preservation requirements** (archaeological tone, anti-drift measures)
- [ ] **Add consistent terminology enforcement** ("map", "mapped", "return to map")
- [ ] **Implement tone calibration** (calm, supportive, responsive) without time estimates
- [ ] **Add risk communication** for high-friction (drift, flattening, hallucination, voice loss)
- [ ] **Add shortcut zone recognition** for medium-friction ("clear-looking" ≠ structurally sound)
- [ ] **Implement ambiguity surfacing** behavior for medium-friction classification
- [ ] **Add pass-through zone behavior** for low-friction (execution without delay, map-aware mindset)
- [ ] **Implement reuse detection logic** (suggest mapping as fallback anchor when reuse identified)
- [ ] **Add safe execution zone messaging** for low-friction classification
- [ ] **Implement greenlight vs blank check** safety boundary (tone always preserved)
- [ ] **Add false generalization prevention** (don't apply 🟩 behavior to 🟨/🟥 inputs)

## 🛡️ Safety & Compliance

- **Metaphor consistency** across all friction levels and modes
- **Choice preservation** while providing appropriate guidance
- **Non-threatening constraint** communication through familiar spatial concepts  
- **Pipeline integration** maintains systematic assessment requirements
- **Override availability** for genuine emergency or time-constraint scenarios
- **Transparent flagging** of unanchored outputs when mapping is skipped
- **Reclassification safety** through automatic response pattern adjustment
- **Pass-through zone integrity**: Low-friction enables execution without delay while preserving voice
- **Greenlight vs blank check**: System must not confuse execution permission with voice preservation bypass
- **Friction level isolation**: Prevent false generalization of 🟩 behaviors to 🟨 or 🟥 inputs
- **Structure score compliance**: All friction levels must respect structure score boundaries and conditional behaviors

**This update completes the map/score/respond pipeline with user-friendly, metaphor-based behavioral responses that make friction constraints intuitive and non-threatening while maintaining systematic safety requirements.**

</floatprompt> 