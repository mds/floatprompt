<floatprompt>
---
title: "FloatPrompt vNext — Protocol Specification"
id: "floatprompt-vnext-spec-v1"
version: "0.12.0"
type: "specification"
format: "floatprompt"
system_version: "floatprompt v0.11.0-alpha"
created: "2025-07-02"
modified: "2025-07-02"
author: "@mds"
contributors: ["@mds", "ChatGPT-4o"]
voice_preservation:
  sacred_principle: "Evolve without rupture — this is a continuity spec, not a reinvention"
  system_authority: "This spec defines the next official version of the FloatPrompt protocol"
behavioral_requirements:
  voice_preservation: "Use builder language — minimal, clear, absolute"
  strategic_consultation: "Only extend the protocol where it improves function, safety, or precision"
  progressive_disclosure: "All new fields must be declared optional unless clearly required"
  benefit_forward_communication: "Enable AI agents and collaborators to reliably interpret and validate floatprompts"
  execution_precision:
    - "Declare new field types"
    - "Add UID chaining logic"
    - "Include ripple dependency model"
    - "Document enhanced execution modes"
mode_constraints:
  spec: "Protocol logic only — not vision or philosophy"
content_standards:
  - "Full YAML field list with examples"
  - "Builder.fp fencing and floatprompt structure"
  - "Backward compatibility declared"
source:
  prompt: "Declared in floatprompt-ecosystem-map-v1 as foundational system upgrade"
  intent: "Define the next phase of the FloatPrompt protocol — v0.12.0+"
human:
  intent:
    primary: "Enable structured prompt chaining, UID validation, and safer prompt execution"
    constraints: "Do not break backward compatibility without cause"
    preferences:
      tone_drift_allowed: false
      verbosity: "precise + schema-aware"
      allow_ai_suggestions: false
discovery:
  significance: "protocol-evolution"
  audience: ["prompt engineers", "framework developers", "system architects"]
  purpose: "specification definition"
  relationships:
    builds_on: ["builder.fp"]
    enables: ["floatprompt-os-software-vision.fp", "project-logbook.fp"]
    supersedes: []
  navigation:
    prerequisites: ["read builder.fp"]
    next_steps: ["implement chaining logic", "extend builder validator"]
    learning_sequence: ["spec → tool → validator"]
temporal:
  journey: "v0.11 → v0.12 protocol enhancement"
  phase: "protocol upgrade"
  progression: "observed needs → formal inclusion"
clustering:
  intellectual_territory: "prompt architecture, validation protocols, content schema"
  discovery_path: "map-driven spec update from ecosystem evolution"
essence:
  core_purpose: "Add structural power to FloatPrompt while maintaining voice, clarity, and modularity"
  metaphor: "Adding rails to a train system — not changing the destination, just ensuring safe transit"
  impact_type: "schema evolution"
  ceremonial_significance: "Marks the first deliberate post-builder version upgrade"
  wisdom_offering: "Precision scales clarity"
  universe_contained: "New prompt fields, execution modes, structural constraints"
certification:
  timestamp: "2025-07-02T23:10:00-05:00"
  authority: "protocol-upgrade"
  certified_by: "ChatGPT-4o"
  locked: false
  uid: "float:floatprompt-vnext-spec-v1"
  chain:
    depth: 1
    parent: "float:floatprompt-ecosystem-map-v1"
  voice:
    linked: true
    fidelity_verified: true
lineage:
  tracked: true
  trace: ["builder.fp", "floatprompt-ecosystem-map-v1"]
output:
  format: "floatprompt"
  joint_execution_required: true
execution:
  triggers: ["protocol upgrade", "builder extension", "prompt chaining"]
  fallback: "Use this spec to validate new floatprompt schemas or chain-aware behaviors"
  source: "next-protocol-def"
  voice_guide: "mds"
  risk_level: "medium"
  execution_mode: "protocol-definition"
  usage_pattern: "Integrate into builder, prompt templates, and validator engines"
  ai_role: "schema interpreter, chaining validator"
planned_prompts: []
---

# 🧱 FloatPrompt vNext Protocol Spec (v0.12.0)

## ✅ Additions to Base Schema

### 1. `uid`
```yaml
uid: "float:filename-or-short-id"
```
- Globally unique prompt identifier
- Required for chaining, project lineage, system navigation

### 2. `chain:`
```yaml
chain:
  depth: 1
  parent: "float:parent-uid"
```
- Captures hierarchy: child of what? part of what?
- Enables recursive structure + prompt ancestry tracking

### 3. `ripple:` *(optional)*
```yaml
ripple:
  depends_on: ["uid_1", "uid_2"]
  invalidates: ["uid_3"]
```
- Declares dependency logic
- Useful for compound prompt builds (e.g. spec → doc → code)

### 4. `execution_mode:` (extended)
```yaml
execution_mode: "build-once | build-loop | validate-only | system-critical"
```
- Controls how AI agents treat the floatprompt
- Enables stricter validation, rerun rules, or idempotence

### 5. `locked: true`
- Already used but now **validated explicitly**
- Prevents edits without forking

---

## 🧠 Backward Compatibility
- All fields from v0.11 remain valid
- All new fields are optional unless marked required (`uid`, `chain.parent` if dependent)

---

## 🪞 Final Note
This version increases **structural precision** without burdening existing workflows.

It lays the groundwork for:
- Multi-prompt projects
- Visual graph navigation
- Agent chaining and smart execution

> “The floatprompt is now aware of its siblings.”

</floatprompt>

