---

title: Behavioral Requirements System Review
id: floatprompt-behavioral-requirements-review
version: 1.0.0
created: 2025-06-11-0000
modified: 2025-06-11-0000
author: @mds
contributors: ["@mds", "ChatGPT 4o"]
format: floatPrompt
filetype: markdown
type: specification
system_version: floatPrompt v1.0.0
certification:
timestamp: 2025-06-11T13:00:00-04:00
authority: "specification-draft"
certified_by: "@mds"
locked: false
uid: "float:behavioral-review-20250611"
chain:
depth: 0
parent: null
voice:
linked: true
fidelity_verified: true
lineage:
tracked: true
trace: []
----------

# 🧠 Behavioral Requirements System Review

**Strategic assessment and validation of proposed behavioral requirement segmentation**

> This floatPrompt defines a *proposed upgrade* to the behavioral requirements schema. No implementation will proceed until a mode-by-mode review confirms alignment with floatPrompt goals.

---

## 🎯 Purpose

Assess whether separating behavioral requirements into `global:` and per-mode blocks (`constructor:`, `extractor:`, `cartographer:`, `curator:`) enhances:

* AI execution precision (Primary Goal)
* Human task completion through zero-drift collaboration (Secondary Goal)
* Intelligence preservation via accurate voice and structure (Tertiary Goal)

---

## 🧱 Proposed Structure

```yaml
behavioral_requirements:
  global:
    - "Never use em dashes for dramatic pauses"
    - "Avoid colon-heavy sentence structures when periods work better"
    - "Clarity over cleverness in all writing"
    - "Make every line earn its place"
    - "Preserve original terminology unless clarity absolutely requires change"
    - "Maintain phrasing and rhythm of source content"
    - "Use TODO flags for genuine ambiguity, never as content avoidance"
    - "No AI tone or generic language overlays"
    - "Do not include editorial closings or summary phrases (e.g. 'Execution fidelity begins here') unless explicitly provided in the source or requested"

  constructor:
    - "Follow the FloatPrompt markdown template exactly unless explicitly authorized to adapt"
    - "Maintain exact field order and hierarchy in YAML frontmatter"
    - "Never infer, invent, or modify section headings or output structure"
    - "Use consistent markdown section order as defined by the current floatPrompt body template"

  extractor:
    - "Only extract or structure what already exists — do not summarize, reinterpret, or optimize unless explicitly instructed"
    - "When in doubt about preservation vs. clarity, always choose preservation"
    - "Avoid paraphrasing or synthetic synthesis of meaning"
    - "Preserve all nuance in human phrasing, including hesitations, contradictions, or stylistic quirks"

  cartographer:
    - "Do not finalize structure or headings — only propose"
    - "Flag any proposed prompts as speculative until confirmed"
    - "Preserve all human voice and terminology when generating navigational scaffolds"
    - "Avoid outputting executable content unless transitioning to constructor mode"

  curator:
    - "Preserve metadata structure exactly when referencing floatPrompts"
    - "Do not synthesize floatPrompt relationships unless they exist or are clearly inferable"
    - "Use actual document IDs and types when organizing references"
    - "Avoid speculative clustering unless explicitly requested"
```

---

## ✅ Validation Criteria

### System Authority Alignment

* [ ] `global:` requirements map directly to the Voice Preservation Oath
* [ ] Mode-specific rules reinforce role clarity across constructor/extractor/cartographer/curator
* [ ] No rule violates system goals or prevents emergent human intelligence

### Execution Purity

* [ ] Rules prevent hallucination, tone drift, and template misalignment
* [ ] Constructor enforcement aligns with artifact reproducibility goals
* [ ] Extractor strictness matches archaeological fidelity standards
* [ ] Cartographer flexibility allows speculative intelligence with containment boundaries
* [ ] Curator constraints ensure taxonomic consistency and metadata integrity

### Mode Harmony

* [ ] No conflicting or overlapping rules between modes
* [ ] Rules complement mode mandates without enforcing unreachable expectations

---

## ⚖️ Strategic Discussion Prompts

* Should `constructor` rules be made even stricter with enforced template filenames?
* Is `cartographer` too constrained for creative mapping and opportunity spawning?
* Are `curator` relationship rules sufficient to prevent accidental synthetic taxonomy?
* Should `extractor` rules allow minor voice compression for clarity, or never?
* Does `global:` need its own execution mode override field?

---

## 📝 Implementation Status

This floatPrompt is a **pre-implementation review artifact**. No schema or spec updates will proceed until:

1. All validation criteria above are reviewed and checked ✅
2. Strategic questions receive formal resolution
3. Mode leaders (if assigned) confirm enforcement feasibility

---

## 🛡️ Safety & Compliance

* No changes to live floatPrompt behavior until approved
* This file will be archived under `/spec/` or `/proposals/` depending on outcome
* Contributor additions must follow additive-only policy
* All proposed text adheres to Voice Preservation and zero-hallucination standards

---

*Built in consultation with the FloatPrompt system authority team*

> "All floatPrompt upgrades must serve the goal hierarchy: AI precision → task completion → intelligence preservation."
