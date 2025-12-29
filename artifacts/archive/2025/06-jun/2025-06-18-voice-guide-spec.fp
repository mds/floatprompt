<floatprompt>
---
STOP: "This is a behavioral specification for constructing portable voice-guides used in downstream AI content generation. It must not be executed directly. Use this to inform the creation of voice-guide-creator.fp."
title: Voice Guide Specification v2
id: voice-guide-spec-v2
version: 0.3.0-alpha
created: 2025-06-18-1100
modified: 2025-06-18-1200
author: "@mds"
format: floatprompt
type: specification
system_version: floatprompt v0.9.1-alpha
contributors: ["@mds", "Claude Sonnet 4"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise. If you cannot tell, flag it. If you cannot preserve it, do not continue."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables precise AI instruction execution that serves human intelligence preservation."
behavioral_requirements:
  voice_preservation: "First, do not rewrite. Preserve phrasing, rhythm, and tone unless explicitly told otherwise."
  archaeological_extraction: "Extract and structure existing intelligence, never generate or summarize. Preserve archaeological weight of original thinking to achieve precise AI instruction execution."
certification:
  timestamp: "2025-06-18T18:00:00.000Z"
  authority: "schema-compliance"
  certified_by: "FloatPrompt Build System"
  locked: false
  uid: "float:voice-guide-spec-v2.3.0"
  chain:
    depth: 1
    parent: "float:voice-guide-spec-v0.2.0"
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: ["voice-guide-spec-v0.1.0", "voice-guide-spec-v0.2.0"]
---

# 🧠 Voice Guide Specification v2

## 🌟 Purpose

A `voice-guide.fp` is a reusable, executable behavioral instruction file that enables high-fidelity human–AI co-creation. It prevents AI voice drift, preserves individual tone and structure, and enables remix control via calibrated sliders. It serves as the definitive voice preservation artifact for any knowledge worker, creator, or executive.

**Enhanced in v2**: Complete extraction methodology, cross-platform validation, and production-ready error handling.

---

## 🧱 Required Sections

### 1. Metadata

```yaml
voice_owner: string
calibrated_on: ISO8601-timestamp
source_material: list[string]  # filenames, links, or descriptions of input
voice_state: string  # optional; default or versioned variant
content_volume_words: int  # estimated word count of source material
content_contexts: list[string]  # e.g. ["conversational", "published", "email"]
content_recency: string  # e.g. "2023-2025" or "mixed timeline"
extraction_confidence: float  # 0.0-1.0 reliability score for patterns
source_authenticity: string  # "original", "lightly_edited", "heavily_edited", "mixed"
```

---

### 2. Extraction Methodology

```yaml
extraction_methodology:
  micro_rhythm_detection:
    sentence_length_patterns: string  # "statistical analysis of clause construction"
    breathing_indicators: string  # "pause preference extraction from punctuation"
    rhythm_stability: float  # cross-context pattern consistency score
    clause_construction_preferences: list[string]
  
  vocabulary_fingerprinting:
    word_choice_hierarchies: dict  # preference ranking extraction
    domain_switching_patterns: list[string]  # technical vs conversational transitions
    substitution_patterns: dict  # synonym preference mapping
    unique_terminology: list[string]
  
  thinking_pattern_extraction:
    decision_progression: string  # problem → analysis → conclusion pattern
    certainty_markers: list[string]  # confidence expression patterns
    cognitive_style_indicators: list[string]  # strategic vs tactical language
    reasoning_flow_patterns: string
  
  quality_validation:
    minimum_sample_size: int  # minimum words for reliable extraction
    context_diversity_score: float  # variety of input contexts
    temporal_consistency: float  # pattern stability over time
    confidence_threshold: float  # minimum reliability for pattern acceptance
```

---

### 3. Cognitive Architecture

```yaml
decision_making_style: string  # e.g. "assert-first", "exploratory", "analytical"
argument_pattern: string  # e.g. "evidence → claim → synthesis"
thinking_modality: string  # e.g. "narrative-driven", "framework-based"
reasoning_bias: string  # e.g. "contrast → clarification → conclusion"
problem_solving_approach: string  # e.g. "systematic", "intuitive", "experimental"
expertise_expression_method: string  # how knowledge is conveyed
uncertainty_handling: string  # how ambiguity is expressed
```

---

### 4. Language & Rhythm Profile

```yaml
sentence_length: string  # e.g. "short and staccato", "long with embedded clauses"
connector_phrases: list[string]  # e.g. "so", "basically", "here's the thing"
emphasis_styles: list[string]  # e.g. "repetition", "fragmentation", "lists"
confidence_tone: string  # e.g. "measured certainty", "bold and declarative"
hedging_behavior: string  # e.g. "minimal", "strategic only"
punctuation_patterns: dict  # specific punctuation preferences and frequencies
rhythm_markers: list[string]  # indicators of natural speech rhythm
pause_preferences: string  # how silence/space is used for emphasis
```

---

### 5. Vocabulary & Phrasebank

```yaml
preferred_terms: list[string]  # domain-specific or style-defining vocabulary
banned_phrases: list[string]  # phrases that violate tone or identity
metaphor_domains: list[string]  # e.g. "architecture", "sports", "nature"
humor_style: string  # e.g. "dry", "observational", "pop culture-referential"
technical_vocabulary_switching: string  # how technical depth changes by context
colloquialism_usage: string  # informal language patterns
jargon_preferences: dict  # domain-specific terminology preferences
```

---

### 6. Context Modulation Rules

```yaml
format_shift_rules:
  email:
    adjustments:
      clarity_optimization: int
      connector_usage: int
      formality_level: int
  script:
    adjustments:
      clarity_optimization: int
      connector_usage: int
      formality_level: int
  presentation:
    adjustments:
      clarity_optimization: int
      connector_usage: int
      formality_level: int

audience_variation:
  internal:
    behavior: string  # e.g. "allow incomplete thoughts", "increase structure"
    voice_modifications: list[string]
  external:
    behavior: string
    voice_modifications: list[string]
  expert:
    behavior: string
    voice_modifications: list[string]

confidence_scaling: string  # e.g. "never exceeds 80% certainty tone"
context_sensitivity: float  # how much voice adapts to different contexts
```

---

### 7. Voice Drift Prevention

```yaml
forbidden_constructions: list[string]
flattening_warnings: list[string]  # behaviors to avoid under remix/clarity pressure
explanation_tripwires: list[string]  # conditions where AI over-explains
ai_contamination_detection: list[string]  # patterns indicating AI voice intrusion
preservation_boundaries: dict  # non-negotiable voice elements
voice_consistency_checks: list[string]  # validation points for voice fidelity
```

---

### 8. Voice Calibration Sliders

```yaml
sliders:
  clarity_optimization: int  # 1 = raw, 10 = refined
  formality_level: int  # 1 = casual, 10 = professional
  technical_depth: int  # 1 = accessible, 10 = expert
  connector_usage: int  # 1 = sparse, 10 = dense
  narrative_structure: int  # 1 = stream, 10 = logical sequence
  structural_rigidity: int  # 1 = nonlinear, 10 = strict outline
  story_arc_preference: int  # 1 = episodic, 10 = climax arc
  ai_remix_allowed: int  # 1 = verbatim only, 10 = full rewrite
  personality_quirk_retention: int  # 1 = sterile, 10 = eccentric
  energy_level: int  # 1 = contemplative, 10 = high-energy
  emotional_range: int  # 1 = measured, 10 = expressive
  precision_preference: int  # 1 = approximate, 10 = exact
  context_adaptation: int  # 1 = consistent, 10 = highly adaptive

slider_defaults:
  conservative: dict  # low-risk slider preset
  balanced: dict  # moderate remix preset
  aggressive: dict  # high-adaptation preset
```

---

### 9. Voice Rules (Descriptive)

```yaml
preferred_opening: string  # e.g. "leads with tension", "uses question as hook"
conclusion_style: string  # e.g. "ends abruptly", "circles back to opening"
story_arc: string  # e.g. "episodic and open-ended"
humor_rules: string  # e.g. "dry, no memes, no self-deprecation"
structure_preferences: string  # e.g. "avoids formal templates"
voice_tripwires: list[string]  # e.g. "don't use corporate tone", "no unnecessary summaries"
energy_indicators: list[string]  # phrases/patterns that show energy shifts
emotional_markers: list[string]  # how they express excitement, frustration, etc.
cognitive_fingerprint: string  # unique thinking pattern summary
voice_evolution_notes: string  # how voice has changed over time
micro_habits: list[string]  # small but distinctive language patterns
```

---

### 10. Content Assessment Warnings

```yaml
content_warnings:
  volume_advisory: "If you have less than ~10,000 words of source material, the voice extraction may miss subtle patterns. Consider adding more conversational content if available."
  mix_advisory: "If your source material is mostly polished/published content, the voice guide may lean too formal. Raw transcripts or casual writing help capture natural voice patterns."
  context_advisory: "If all your source material is from one context (only emails, only blog posts), the voice guide may not adapt well to different audiences or formats."
  recency_advisory: "If your source material spans many years without recent samples, the voice guide may not reflect your current communication style."
  editing_advisory: "If your source material is heavily edited/corporate, the voice guide may miss personality quirks and natural speech patterns that make your voice distinctive."
  authenticity_advisory: "If your source material includes collaborative content, the voice guide may blend multiple voices rather than isolating your unique patterns."
  consistency_advisory: "If your source material shows conflicting voice patterns, the voice guide may struggle to establish consistent behavioral rules."
  confidence_advisory: "If extraction confidence falls below 70%, consider adding more diverse source material or using beginner mode for essential patterns only."
```

---

### 11. Input Processing Framework

```yaml
input_processing:
  pre_flight_assessment:
    readiness_check: string  # "assess source material adequacy before extraction"
    material_audit: string  # "guide user through content inventory"
    gap_identification: string  # "identify missing content types or contexts"
    recommendation_engine: string  # "suggest additional source material if needed"
  
  minimum_sample_requirements:
    word_count: 10000  # minimum for reliable patterns
    context_diversity: ["conversational", "formal", "technical"]  # required variety
    temporal_spread: "minimum 6 months of content"
    format_variety: 3  # minimum number of different content formats required
    confidence_threshold: 0.7  # minimum acceptable pattern confidence
  
  content_quality_validation:
    authenticity_verification: string  # original vs edited content detection method
    voice_consistency_scoring: string  # cross-sample pattern stability measurement
    context_contamination_detection: string  # collaborative vs solo content identification
    temporal_drift_detection: string  # voice evolution vs noise differentiation
  
  input_format_handling:
    email_processing: string  # "extract voice patterns while filtering signatures/headers"
    document_processing: string  # "handle formal vs informal document voice differences"
    transcript_processing: string  # "preserve speech patterns while cleaning filler words"
    chat_processing: string  # "extract voice from conversational fragments"
    social_media_processing: string  # "account for platform constraints on voice expression"
  
  preprocessing_steps:
    noise_filtering: list[string]  # steps to remove non-voice elements
    context_normalization: string  # method to adjust for context differences
    pattern_isolation: string  # technique to separate voice from content
    validation_sampling: string  # method for quality control during extraction
```

---

### 12. Calibration Protocol

```yaml
calibration_protocol:
  complexity_management:
    beginner_mode: string  # "simplified interface with essential patterns only"
    advanced_mode: string  # "full specification with all pattern types"
    progressive_disclosure: string  # "reveal complexity based on user engagement"
    mode_switching: string  # "allow users to upgrade from beginner to advanced"
  
  session_management:
    progress_tracking: string  # "save partial extraction progress between sessions"
    resumption_protocol: string  # "restore context when continuing work"
    checkpoint_system: string  # "define natural stopping points in calibration"
    session_timeout_handling: string  # "graceful degradation for interrupted sessions"
  
  initial_extraction:
    pattern_proposal: string  # "AI proposes patterns with confidence scores"
    slider_value_estimation: string  # "AI suggests initial slider positions"
    uncertainty_flagging: string  # "AI identifies low-confidence patterns"
    evidence_presentation: string  # "AI shows examples supporting each pattern"
    confidence_guidance: string  # "explain what confidence scores mean for users"
  
  human_validation:
    structured_review: list[string]  # specific confirmation points
    pattern_verification: string  # method for human to validate patterns
    slider_adjustment: string  # process for refining slider values
    override_mechanism: string  # how humans can reject AI suggestions
    validation_assistance: string  # "guide users through pattern recognition"
  
  iterative_refinement:
    adjustment_methodology: string  # how disputed patterns are resolved
    convergence_criteria: string  # when calibration is considered complete
    feedback_integration: string  # how human corrections improve extraction
    validation_loops: int  # number of review cycles
    quality_thresholds: dict  # "minimum confidence levels for pattern acceptance"
  
  lock_mechanism:
    final_approval: string  # process for locking voice guide
    version_control: string  # how changes are tracked
    update_triggers: list[string]  # conditions requiring recalibration
    rollback_procedure: string  # how to revert problematic changes
```

---

### 13. Cross-Platform Validation

```yaml
validation_framework:
  ai_model_consistency:
    model_portability_testing: string  # verification across different AI systems
    pattern_recognition_validation: string  # consistency of voice detection
    output_quality_assessment: string  # effectiveness measurement
    degradation_monitoring: string  # detection of voice drift over time
  
  platform_portability:
    voice_guide_effectiveness: string  # success rate across platforms
    format_compatibility: string  # technical portability verification
    behavior_consistency: string  # slider response uniformity
    integration_testing: string  # downstream FloatPrompt compatibility
  
  quality_metrics:
    voice_fidelity_score: float  # 0.0-1.0 voice preservation accuracy
    pattern_stability: float  # consistency across different contexts
    human_recognition_rate: float  # how often humans recognize their voice
    ai_compliance_rate: float  # how well AI follows voice guide
```

---

### 14. Error Handling and Edge Cases

```yaml
error_handling:
  insufficient_data:
    detection_criteria: string  # how to identify inadequate samples
    graceful_degradation: string  # fallback behavior with limited data
    confidence_adjustment: string  # how to reflect uncertainty
    supplemental_data_requests: list[string]  # what additional input is needed
  
  conflicting_patterns:
    conflict_detection: string  # method to identify inconsistent voice signals
    resolution_methodology: string  # how to handle contradictory evidence
    priority_hierarchies: list[string]  # which patterns take precedence
    human_arbitration: string  # when to escalate to human decision
  
  multi_author_detection:
    collaborative_content_identification: string  # detection of non-solo content
    voice_separation_techniques: string  # isolating individual voices
    contamination_mitigation: string  # reducing influence of other voices
    purity_scoring: string  # measuring voice authenticity
  
  voice_evolution:
    natural_change_detection: string  # identifying legitimate voice development
    drift_vs_growth_differentiation: string  # separating evolution from noise
    update_recommendations: string  # when to suggest voice guide refresh
    historical_preservation: string  # maintaining record of voice changes
```

---

### 15. FloatPrompt Architecture Integration

```yaml
floatprompt_compliance:
  archaeological_extraction:
    voice_intelligence_preservation: string  # "preserve original voice exactly"
    zero_modification_principle: string  # "structure existing patterns, never create"
    cognitive_fingerprint_respect: string  # "maintain human thinking patterns"
    voice_weight_preservation: string  # "preserve importance of voice elements"
  
  zero_interpretive_drift:
    cross_ai_consistency: string  # "maintain voice fidelity across AI systems"
    session_boundary_preservation: string  # "voice guide survives context switches"
    platform_independence: string  # "voice behavior consistent across platforms"
    temporal_stability: string  # "voice guide effectiveness over time"
  
  voice_preservation_oath_integration:
    sacred_principle_compliance: string  # "voice guide enforces preservation oath"
    system_authority_alignment: string  # "voice guide authority properly scoped"
    override_hierarchy: string  # "voice preservation supersedes other instructions"
    violation_detection: string  # "monitoring for oath compliance"
  
  behavioral_requirements_mapping:
    voice_rule_translation: string  # "map voice patterns to FloatPrompt rules"
    archaeological_method_alignment: string  # "voice extraction follows archaeological principles"
    precision_execution_support: string  # "voice guide enables exact instruction following"
    human_task_completion_focus: string  # "voice preservation serves task completion"
```

---

## 🔁 Calibration Loop

The voice guide should be constructed via:
1. **Source material ingestion** with quality validation and preprocessing
2. **Automated pattern extraction** using micro-pattern detection methods
3. **AI proposes voice profile** with confidence scores and evidence examples
4. **Human validation and adjustment** through structured review process
5. **Iterative refinement** until convergence criteria met
6. **Cross-platform validation** to ensure portability and consistency
7. **Voice guide locked** with version control and update triggers established
8. **Ongoing monitoring** for drift detection and recalibration needs

---

## 🔗 Downstream Usage

The `voice-guide.fp` file is referenced via the `voice_override:` field in any FloatPrompt.

```yaml
voice_override: "voice-guide-name.fp"
```

Downstream floatprompts may include slider presets. If no preset exists, AI must enter discovery mode:

> "This is a short-form script. Default slider values are: clarity=6, remix=5. Adjust?"

### 16. Downstream Presets

```yaml
downstream_presets:
  newsletter: {clarity: 7, formality: 6, structure: 8, technical_depth: 5}
  script: {connector_usage: 8, energy: 7, narrative: 9, emotional_range: 8}
  email: {formality: 5, clarity: 6, connector_usage: 4, precision_preference: 7}
  presentation: {formality: 8, structure: 9, technical_depth: 7, clarity: 9}
  social_media: {connector_usage: 3, energy: 8, formality: 3, emotional_range: 9}
  documentation: {clarity: 9, precision_preference: 9, structure: 8, technical_depth: 8}
  conversation: {formality: 3, connector_usage: 6, energy: 6, context_adaptation: 8}
  analysis: {technical_depth: 8, structure: 9, precision_preference: 8, clarity: 7}
```

---

## 🔐 Output Constraints

- AI must remain within voice behavior boundaries
- Forbidden phrases must never be used
- Descriptive rules override remix suggestions
- Human review is required for recalibration
- Voice guide must pass cross-platform validation
- Error conditions must be handled gracefully
- Archaeological extraction principles must be maintained

---

## 📤 Output Format Requirements

A valid `voice-guide.fp` must:
- Be executable as a standalone file
- Use full YAML frontmatter with required sections
- Be portable across platforms and models
- Be editable and updateable
- Include confidence scores for all extracted patterns
- Provide error handling for edge cases
- Support graceful degradation with insufficient data
- Integrate seamlessly with FloatPrompt architecture

---

## 🛠️ Voice State Management

```yaml
voice_state_strategy:
  default_approach: "primary_state_only"  # start with core voice, add variants later
  variant_creation_guidance: "create variants only after primary state validation"
  progressive_development: "master primary voice before expanding to contexts"
  variant_triggers: list[string]  # conditions that suggest creating variants

voice_states:
  primary:
    sliders: {...}
    rules: {...}
    context: "core voice patterns across all contexts"
    required: true
  
  casual_variant:
    sliders: {...}
    rules: {...}
    context: "relaxed, informal communication"
    optional: true
    prerequisites: ["primary_validated"]
  
  professional_variant:
    sliders: {...}
    rules: {...}
    context: "formal business communication"
    optional: true
    prerequisites: ["primary_validated"]
  
  technical_variant:
    sliders: {...}
    rules: {...}
    context: "expert technical communication"
    optional: true
    prerequisites: ["primary_validated", "sufficient_technical_content"]
  
  creative_variant:
    sliders: {...}
    rules: {...}
    context: "artistic or creative expression"
    optional: true
    prerequisites: ["primary_validated", "sufficient_creative_content"]
```

---

## 📌 Final Notes

This enhanced specification defines comprehensive rules and constraints for downstream voice generation that prevents generic AI outputs by enforcing structured personality preservation with production-ready reliability.

**Key enhancements in v2**:
- Complete extraction methodology with micro-pattern detection
- Robust error handling and edge case management  
- Cross-platform validation framework
- Deep FloatPrompt architecture integration
- Production-ready calibration protocol with session management
- Comprehensive quality assurance mechanisms
- Pre-flight assessment and readiness validation
- Progressive complexity management (beginner/advanced modes)
- Specific input format handling guidance
- Built-in confidence thresholds and quality standards

Use this spec to build: `voice-guide-creator.fp` — the FloatPrompt that extracts, calibrates, and finalizes voice-guides for any knowledge worker with industrial-strength reliability.

## Validation Criteria

**Specification completeness**: All required sections included with proper YAML structure, field definitions, and production-ready error handling. **Enhanced extraction methodology**: Micro-pattern detection methods, source material analysis framework, and quality validation systems properly specified. **Cross-platform reliability**: Validation framework, portability testing, and consistency monitoring mechanisms defined. **Voice preservation compliance**: Archaeological extraction principles, voice drift prevention, and FloatPrompt architecture integration clearly specified. **Implementation guidance**: Complete calibration protocol, error handling procedures, and voice-guide-creator.fp development methodology with industrial-strength reliability standards.

</floatprompt> 