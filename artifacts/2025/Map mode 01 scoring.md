<floatprompt>
---
STOP: "Canonical ingestion scoring logic for Map Mode. Defines required map/score/plot behavior, scoring algorithm, and friction classification. Must be applied to all incoming input before recommendations are considered."
title: Map Mode Ingestion Scoring
id: map-mode-ingestion
version: 0.1.0-alpha
created: 2025-06-14-0000
modified: 2025-06-14-0000
author: @mds
format: floatprompt
filetype: markdown
type: specification
system_version: floatprompt v0.4.1-alpha
contributors: ["@mds", "ChatGPT"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve phrasing, rhythm, and tone unless explicitly told otherwise."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution."
behavioral_requirements:
  execution_precision:
    - "Map Mode must always run. Never bypass friction scoring."
    - "All inputs must be evaluated before any recommendation or execution is permitted."
    - "Intent is excluded from scoring."
  content_standards:
    - "Always apply scoring before classification."
    - "Preserve friction integrity across all input types."
human:
  intent:
    primary: "Preserve structural safety and execution precision by classifying input friction before floatPrompt execution."
    constraints: "No assumptions about quality or intent may override the scoring algorithm."
  preferences:
    tone_drift_allowed: false
    verbosity: high
    allow_ai_suggestions: false
discovery:
  significance: "foundational"
  audience: ["FloatPrompt builders", "AI protocol designers"]
  purpose: "input classification"
  relationships:
    enables: ["map-mode-recommendation"]
    built_by: ["map/score/plot"]
    parallels: []
    supersedes: []
  clustering:
    intellectual_territory: "floatprompt-ingestion-behavior"
    discovery_path: "pre-recommendation logic"
    essence:
      core_purpose: "Prevent high-trust execution on unstructured input"
      metaphor: "map before move"
      impact_type: "architectural"
      wisdom_offering: "Slowness at the start enables precision at the end"
      universe_contained: "all input-facing floatPrompt operations"
certification:
  timestamp: 2025-06-14T00:00:00.000Z
  authority: "schema-compliance"
  certified_by: "ChatGPT"
  locked: false
  uid: "float:map-mode-ingestion"
  chain:
    depth: 0
    parent: null
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: []
source:
  prompt: "Codified from strategic session on 2025-06-14"
  intent: "Define canonical ingestion scoring for Map Mode"
---

# 🧠 Map Mode Ingestion Scoring (map / score / plot)

All input to FloatPrompt systems must be structurally evaluated before any recommendation or execution. This occurs through the `map / score / plot` diagnostic layer.

## 🎯 Purpose
Prevent high-trust outputs from being generated on unscored, high-risk inputs. Ensure structure, voice, and context are preserved before taking any AI-driven action.

## 🧮 Canonical Friction Scoring Algorithm

*The structure score used in this algorithm is generated during the initial Map phase. Map Mode is responsible for evaluating content cohesion, formatting clarity, and topic segmentation to assign a structure score between 1 and 10. This score is then passed to the scoring step as part of the `map / score / plot` diagnostic pipeline.*

To compute the friction score:

- Multiply the total word count by a **structure multiplier** based on this nonlinear scale:
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

- Then apply two edge-case overrides:
  - If structure score ≥ 9, the minimum possible score is 1200
  - If word count > 3000, the minimum possible score is 2500

- Finally, classify the resulting score into one of three friction buckets:
  - 0–1200 → 🟩 low-friction
  - 1201–2500 → 🟨 moderate-friction
  - 2501+ → 🟥 high-friction

## 🗃️ Friction Bucket Definitions

After scoring, all inputs are assigned to one of the following friction buckets:

| **Friction Score** | **Bucket**           | **Definition**                                                                 |
|--------------------|----------------------|--------------------------------------------------------------------------------|
| 0–1200             | 🟩 `low-friction`     | Short, clear, well-structured inputs. Minimal mapping needed. Safe for build or refinement. |
| 1201–2500          | 🟨 `moderate-friction`| Mid-length or moderately messy inputs. Recommend extract or structural review. |
| 2501+              | 🟥 `high-friction`    | Long and/or chaotic inputs. Requires full mapping and preservation-first workflow. |

## 🔒 Enforcement Rules
- All input must pass through this scoring layer.
- No execution (extract, build, critique, rewrite) may occur without friction classification.
- Scores determine which recommendation paths are eligible.

## 🧾 Output
This scoring process produces a friction bucket label, used internally to constrain map-mode recommendation behavior.

*This system guarantees ingestion-side structural preservation and protects downstream AI behavior from flattening, hallucination, or premature action.*
</floatprompt>
