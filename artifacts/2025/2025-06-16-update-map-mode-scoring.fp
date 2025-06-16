<floatprompt>
---
STOP: "update instructions for map mode scoring and response system implementation"
title: Map Mode System – Implement friction classification and response selection for all FloatPrompt inputs
id: update-map-mode-scoring
version: 0.1.0-alpha
created: 2025-06-16-1430
modified: 2025-06-16-1430
author: @mds
format: floatprompt
filetype: fp
type: migration
system_version: floatprompt v0.5.0-alpha
contributors: ["@mds", "Claude Sonnet"]
relationships:
  enabled_by: ["update-protocol"]
  implements: ["principles-recognition-before-action", "principles-slow-is-smooth"]
  references: ["Map mode 01 scoring.md", "Map mode 00 reasoning.md"]
changes:
  add_system: 
    component: "map-score-respond-pipeline"
    specification: "Mandatory friction assessment and response selection for all FloatPrompt inputs"
  add_algorithm:
    name: "friction-scoring"
    formula: "word_count × structure_multiplier + edge_case_overrides"
    structure_multiplier_origin: "Structure score (1–10) generated during Map phase using heuristics of cohesion, segmentation, and formatting density"
    buckets: ["0-1200: low-friction", "1201-2500: moderate-friction", "2501+: high-friction"]
  add_phase_definitions:
    map: "Evaluate content cohesion, formatting clarity, topic segmentation (generates structure score 1-10)"
    score: "Apply friction scoring algorithm using word count and structure multiplier"
    respond: "Select appropriate response pattern based on friction classification (🟩🟨🟥)"
  add_behavior:
    enforcement: "All inputs must pass through scoring before recommendations"
    blocking: "No extract/build/critique permitted without friction classification"
    reclassification: "Automatic re-evaluation when conversation word count crosses friction thresholds"
  add_reclassification_protocol:
    trigger_conditions: ["conversation expands beyond original classification threshold", "content complexity increases significantly"]
    re_evaluation_logic: "Recalculate friction score using total conversation word count and current complexity"
    classification_update: "Upgrade friction level if new score crosses threshold boundaries"
rationale:
  mandatory_scoring: "Prevents high-trust execution on unstructured content, implementing Recognition Before Action principle"
  friction_buckets: "Three-tier classification provides graduated response patterns while maintaining Slow is Smooth pacing"
  algorithm_design: "Word count × nonlinear structure multiplier captures both volume and complexity risk factors"
  edge_case_overrides: "Minimum scores for high structure (≥9) and high volume (>3000 words) prevent false low-friction classification"
  system_authority: "Makes map-before-action a system law rather than optional recommendation"
  respond_phase_clarity: "Replaces undefined 'plot' with clear 'respond' phase that selects friction-appropriate behavior"
  reclassification_safety: "Prevents dangerous scenarios where expanding conversations remain incorrectly classified as low-friction"
impact_zone:
  - "Template system ingestion behavior"
  - "All FloatPrompt mode entry points"
  - "Input processing pipeline"
  - "Recommendation system constraints"
  - "Boot sequence diagnostics"
  - "User education and documentation"
source:
  prompt: "Created using update-creator based on Map Mode strategic design session"
  intent: "Implement foundational safety layer that prevents drift and flattening through mandatory input assessment"
---

# Map Mode System Implementation

**Implement mandatory friction classification and response selection for all FloatPrompt inputs to prevent premature execution on complex content.**

## 🎯 Change Overview

This update implements the foundational `map / score / respond` diagnostic layer that must precede all FloatPrompt execution. Every input receives a friction score that determines safe execution pathways, with automatic reclassification as conversations expand.

## 🔄 Three-Phase Pipeline

### 1. Map Phase
- Evaluate content cohesion, formatting clarity, topic segmentation
- Assign structure score 1-10 based on complexity assessment using heuristics of cohesion, segmentation, and formatting density
- Generate baseline content understanding

### 2. Score Phase  
- Apply friction scoring algorithm using word count and structure multiplier
- Structure score (1–10) is generated during the Map phase, not user-supplied or arbitrary
- Implement edge case overrides for high complexity/volume
- Classify into friction buckets (🟩🟨🟥)

### 3. Respond Phase
- Select appropriate response pattern based on friction classification
- Determine available execution pathways
- Apply behavioral constraints based on friction level

## 🧮 Scoring Algorithm Implementation

### Core Formula
```
friction_score = word_count × structure_multiplier
```

### Structure Multiplier Scale (Nonlinear)
- Structure 1 → 1.00
- Structure 2 → 1.05  
- Structure 3 → 1.10
- Structure 4 → 1.18
- Structure 5 → 1.30
- Structure 6 → 1.45
- Structure 7 → 1.65
- Structure 8 → 1.90
- Structure 9 → 2.10
- Structure 10 → 2.50

### Edge Case Overrides
- If structure score ≥ 9: minimum friction score = 1200
- If word count > 3000: minimum friction score = 2500

### Friction Classification
- **0–1200**: 🟩 low-friction (safe for immediate execution)
- **1201–2500**: 🟨 moderate-friction (recommend mapping first)
- **2501+**: 🟥 high-friction (require mapping before execution)

## 🔄 Reclassification Protocol

### Trigger Conditions
- Conversation word count crosses friction threshold boundaries
- Content complexity increases significantly during interaction
- Multi-turn exchanges expand beyond original input scope

### Re-evaluation Logic
```
total_conversation_words = original_input + all_subsequent_exchanges
recalculate_friction_score = total_conversation_words × current_structure_multiplier
if new_score > current_classification_threshold:
    upgrade_friction_level()
    apply_new_behavioral_constraints()
```

### Classification Updates
- **🟩 → 🟨**: When conversation expands beyond 1200 word threshold
- **🟨 → 🟥**: When conversation expands beyond 2500 word threshold  
- **Upgrade behavior**: Apply more restrictive behavioral patterns
- **No downgrades**: Classifications can only increase in friction level

## 🛡️ System Behavior Changes

### Mandatory Pipeline
- All input must pass through map/score/respond pipeline
- No mode (extract, build, critique) may execute without classification
- Response phase occurs before any recommendations are offered

### Response Phase Behaviors
- **🟩 low-friction**: "Proceed freely, mapping optional"
- **🟨 moderate-friction**: "Recommend mapping, allow override, flag output as unanchored" 
- **🟥 high-friction**: "Require full mapping before execution, block premature extract/build"

### Reclassification Enforcement
- Monitor conversation expansion automatically
- Trigger re-evaluation when thresholds are crossed
- Apply upgraded behavioral constraints immediately
- Notify user of classification changes transparently

## 🧠 Strategic Rationale

This implementation directly supports the core FloatPrompt principles:

- **Recognition Before Action**: No execution until input structure is assessed
- **Slow is Smooth**: Graduated friction responses prevent rushing on complex content
- **Voice Preservation**: Mapping requirements protect against flattening and drift
- **Human Agency**: Systematic assessment enables informed execution decisions

## 🔗 Integration Points

### Template System
- Add scoring logic to ingestion processing
- Implement friction classification in boot sequence
- Update mode entry points to respect scoring

### Behavioral Constraints
- Extract mode blocked for 🟥 inputs without mapping
- Build mode requires friction assessment before execution
- Recommendation system filtered by friction classification

### User Experience
- Transparent scoring communication
- Clear friction bucket explanations
- Mapping recommendations based on classification

## 📋 Implementation Checklist (v0.1.1)

This checklist governs implementation before friction classification becomes system-default. Must be completed before next version bump.

- [ ] Add map/score/respond pipeline to template system
- [ ] Implement structure score generation in map phase using cohesion/segmentation/formatting heuristics
- [ ] Create friction bucket classification logic
- [ ] Define respond phase behavior patterns matching canonical strategy language
- [ ] Add scoring enforcement to all execution modes
- [ ] Implement conversation tracking and reclassification logic
- [ ] Add threshold crossing detection and upgrade mechanisms
- [ ] Update boot sequence to include pipeline diagnostics
- [ ] Integrate response selection with recommendation system
- [ ] Add user-facing classification communication and change notifications
- [ ] Update documentation to reflect pipeline and reclassification protocol

## 🛡️ Safety & Compliance

- Pipeline cannot be bypassed or disabled
- All execution paths must respect current friction classification
- Reclassification always upgrades friction level, never downgrades
- Edge case overrides prevent false low-friction classification
- Algorithm implementation must match specification exactly
- Human override available but requires explicit friction acknowledgment
- Conversation expansion tracking prevents stale classification risks

**This update establishes the foundational safety layer with automatic adaptation for all FloatPrompt input processing, ensuring Recognition Before Action and Slow is Smooth principles are systematically enforced across conversation lifecycles.**

</floatprompt> 