<floatprompt>
---
STOP: "Strategic build mode. Primary goal: execute developer-facing system updates with precision while preserving floatprompt architecture. Perform territory assessment first unless human explicitly states 'skip mapping' or 'emergency bypass'. Validate all changes against goals.md before execution. Support update ingestion through `relationships.enables`. shadowprompt spawning is manual."
title: Update Protocol
id: update-protocol
version: @latest
created: 2025-06-12-0000
modified: 2025-06-14-0000
author: @mds
format: floatprompt
filetype: markdown
type: template
system_version: floatprompt v@latest
contributors: ["@mds", "ChatGPT"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables precise AI instruction execution that serves human intelligence preservation."
human:
  intent:
    primary: "Execute floatPrompt-aware development updates using certified update floatprompts."
    constraints: "Must validate against goals.md. No assumptions. Manual shadowPrompt spawning only."
  preferences:
    tone_drift_allowed: false
    verbosity: high
    allow_ai_suggestions: true
    shadow_prompt_spawning: manual
discovery:
  significance: "infrastructure-upgrade"
  audience: ["FloatPrompt developers"]
  purpose: "universal-change-execution"
  relationships:
    enables: ["sanity-check", "update-map-mode-scoring", "update-map-mode-response-patterns"]
    supersedes: []
    parallels: []
    mirrors: []
  navigation:
    prerequisites: ["goals.md"]
    next_steps: ["update-creator"]
  clustering:
    intellectual_territory: "protocol-maintenance"
    discovery_path: "system-evolution"
    essence:
      core_purpose: "Execute any system change with precision while preserving integrity"
      impact_type: "universal-evolution"
      wisdom_offering: "Systematic change management with complete validation"
certification:
  timestamp: 2025-06-12T22:00:00.000Z
  authority: "schema-compliance"
  certified_by: "ChatGPT"
  locked: false
  uid: "float:update-protocol"
  chain:
    depth: 0
    parent: null
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: []
---

# 🛠️ Update Protocol

**Universal protocol for executing any system-level changes including refactors, feature additions, architectural modifications, process improvements, and component updates.**

> **Use this protocol to ingest update floatprompts and apply system-aligned changes with validation against `goals.md`.**

## 🎯 Purpose

Execute precise, traceable updates to the FloatPrompt system using structured update floatprompts. Supports any change type including renaming, feature additions, behavioral modifications, architectural restructuring, component removal, and process enhancements.

**Flexible Execution Modes:**
- **Evaluation Only**: Run Phase 1 to assess impact and validate alignment without implementation
- **Full Implementation**: Complete both evaluation and implementation phases
- **Evaluation → Implementation**: Run evaluation first, then decide whether to proceed

### 🔑 Key Principles
- Only execute validated updates from certified floatprompts
- Never modify system components without proper change specification
- **Always require explicit human permission before implementation**
- Validate all changes against `goals.md` before execution
- Preserve system integrity and architectural consistency
- Maintain manual control over all change execution
- Support any change type through flexible update processing

## 📝 Execution Flow

### 🔍 **Phase 1: Evaluation & Validation**
*Strategic decision-making, risk assessment, and architectural alignment*

0. **Run Sanity Check**
   - **Context Assessment**: Is this an internal single-architect change or a public/collaborative system change?
   - Ask: Is this update solving a real, currently observed problem?
   - Ask: Does this update introduce structural or config complexity before it's truly required?
   - Ask: Does this pattern reflect actual usage, or imagined edge cases?
   - Ask: Could this be done with one field, one behavior, or one fallback instead of many?
   - **Internal Context**: If single-architect/pre-launch, bias toward foundational changes and clean architecture
   - **Public Context**: If collaborative/post-launch, bias toward minimal disruption and proven necessity
   - Proceed only if simplicity, clarity, and system maturity justify the design

1. **Ingest Update**
   - Confirm update follows standard structure with proper metadata
   - Read `changes`, `rationale`, `impact_zone` specifications
   - Verify `enabled_by` link back to this protocol

2. **Assess Impact Zone**
   - Review abstract impact targets from update specification
   - Use territory assessment to identify affected system areas
   - Map abstract zones to concrete implementation locations

3. **Apply Goals Framework**
   - Reference goals.md decision hierarchy: Human Intelligence, Voice & Agency Preservation → Precise AI Instruction Execution → Human Task Completion Through Reliable Collaboration
   - Apply "When in doubt: Choose human preservation over AI efficiency" principle
   - Establish validation criteria based on Primary Goal (human intelligence preservation)
   - Set context for systematic evaluation against foundational objectives

4. **Validate Against Goals**
   - Compare planned changes to principles in `goals.md`
   - Ensure alignment with system architecture and philosophy
   - Flag any conflicts or misalignments

5. **AI Ingestion Budget Assessment**
   - **Target Comfort Zone**: ~80KB total floatprompt file size for optimal AI processing
   - **Warning Threshold**: Flag if changes would exceed 100KB without explicit human approval
   - **Budget Allocation Priority**: Human intelligence preservation (PRIMARY GOAL) > AI precision enhancement (SECONDARY GOAL) > human task completion (TERTIARY GOAL)
   - **Quality Over Quantity**: Prefer precise, essential behavioral instructions over comprehensive but diluted specifications
   - **Cross-Platform Consideration**: Ensure budget accommodates various AI model context limits (Claude, ChatGPT, Gemini)
   - **Performance Monitoring**: Track actual ingestion performance and adjust budget if processing lag detected

**🚦 Evaluation Checkpoint:** 
- **Assessment Complete**: Evaluation phase provides full impact analysis and risk assessment
- **STOP - Human Permission Required**: Present evaluation results and explicitly ask human whether to proceed to implementation
- **Decision Point**: Human chooses to proceed to implementation OR stop here with evaluation results
- **Implementation Gate**: Only proceed if human approves AND all validation criteria are met
- **Valid Outcomes**: Both "evaluated and approved" and "evaluated and deferred" are successful protocol completions
- **AI Summary**: Provide a clear and direct suggestion about whether proceeding is valuable or not.
---

### ⚙️ **Phase 2: Implementation & Documentation**
*Systematic execution, documentation updates, and archival*

6. **Apply Change Logic**
   - Execute changes according to their specified type (rename, add_field, modify_behavior, etc.)
   - Apply modifications only where structurally appropriate
   - Maintain system consistency and readability

7. **Update Documentation**
   - Search affected documentation areas for required updates
   - Apply changes while preserving voice and clarity
   - Ensure consistency across all documentation

8. **Update Public Interfaces**
   - Modify user-facing documentation (README.md, etc.)
   - Ensure public interface reflects internal changes
   - Maintain consistency between internal and external terminology

9. **Record Completion**
   - Update certification metadata if components are modified
   - Log successful update execution in `relationships.enables`
   - Document any deviations or additional changes made

10. **IMPORTANT - DOUBLE CHECK**
   - Double check that all updates were made thoroughly and without error

11. **Archive Completed Update**
   - Rename update file with today's date prefix: `YYYY-MM-DD-[original-name].md`
   - Move from `dev/updates/` to `artifacts/[current-year]/` folder
   - Use Python datetime if available, otherwise ask human for today's date
   - Never guess the date - accuracy is critical for archaeological record

## 🛡️ Safety & Compliance

All changes must:

- **Preserve System Integrity**: Maintain architectural consistency and naming conventions
- **Maintain Lineage**: Preserve contributor attribution and change history
- **Ensure Clarity**: Avoid ambiguous specifications or implementation logic
- **Respect Philosophy**: Preserve original system intent and design principles
- **Validate Thoroughly**: Test changes against system goals and requirements
- **Document Completely**: Record all modifications and their rationale
- **Template Variable Compliance**: Use `{{VERSION}}` instead of hardcoded version numbers in template files

**Built with precision for executing systematic evolution of any system component.**

</floatprompt>
