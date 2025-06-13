<floatprompt>
---
STOP: "Strategic build mode. Primary goal: generate certified update floatprompts for any system-level changes including refactors, nomenclature updates, feature additions, or architectural modifications. Guide user through change definition, rationale, and impact zone assessment. Ensure relationships.enabled_by links to update-protocol."
title: Update Creation Tool
id: update-creation
version: @latest
created: 2025-06-12-0000
modified: 2025-06-13-0000
author: @mds
format: floatprompt
filetype: markdown
type: build
system_version: floatprompt v@latest
contributors: ["@mds", "ChatGPT"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution."
human:
  intent:
    primary: "Create a structured update floatprompt for renaming or system migration"
    constraints: "Must output an update compliant with update-protocol"
  preferences:
    tone_drift_allowed: false
    verbosity: high
    allow_ai_suggestions: true
discovery:
  significance: "infrastructure-maintenance"
  audience: ["FloatPrompt developers"]
  purpose: "update-construction"
  relationships:
    enables: ["system-updates"]
    supersedes: []
    parallels: []
    mirrors: []
    built_by: ["_updates-update-creation"]
  navigation:
    prerequisites: []
    next_steps: ["update-protocol"]
  clustering:
    intellectual_territory: "protocol-refactor"
    discovery_path: "guided-construction"
    essence:
      core_purpose: "Generate certified system change updates"
      impact_type: "structured-evolution"
      wisdom_offering: "Systematic change management through structured updates"
certification:
  timestamp: 2025-06-13T00:05:00.000Z
  authority: "schema-compliance"
  certified_by: "Claude Sonnet"
  locked: false
  uid: "float:update-creator"
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

# 🧱 Update Creation Tool

**Use this floatprompt to create structured update files for any system-level changes including refactors, feature additions, architectural modifications, or process updates.**

> **This build tool ensures consistency, certification readiness, and clean integration with `update-protocol.md`.**

## 🎯 Purpose

Guide the structured creation of updates floatprompts used for executing any system-level updates such as renaming, feature additions, architectural changes, process improvements, or component modifications.

### 🔑 Key Principles
- Preserve system integrity and provide clear rationale for all changes
- Ensure updates can be ingested by development orchestrators
- Use abstract impact zones rather than specific file paths
- Maintain compatibility with existing system architecture
- Follow established change management protocols

## 📋 Output updates Template

When complete, your updates file will follow this pattern:

```yaml
<floatprompt>
---
STOP: "updates instructions for [change type]"
title: [Descriptive Title] – [short description]
id: [updates-identifier]
version: 0.1.0-alpha
created: [ISO timestamp]
modified: [ISO timestamp]
author: @mds
format: floatprompt
filetype: markdown
type: migration
system_version: floatprompt v@latest
contributors: ["@mds"]
relationships:
  enabled_by: ["update-protocol"]
changes:
  [change-type]: [change-specification]
  # Examples:
  # rename: { old-term: new-term }
  # add_field: { location: field-spec }
  # modify_behavior: { component: new-behavior }
  # remove_feature: { target: removal-spec }
rationale:
  [change-key]: "Explanation for change."
impact_zone:
  - "abstract component categories"
  - "affected system areas"
  - "documentation requiring updates"
source:
  prompt: "Created using updates-update-creation"
  intent: "[Purpose of this change]"
---
# Content here
</floatprompt>
```

## 📝 Instructions for Use

1. **Name the update file** using format: `update-[name].md` where `[name]` is a descriptive kebab-case identifier
2. **Define the change type and specification** in the `changes` section
3. **Provide clear rationale** for each change explaining why it's needed
4. **List abstract impact zones** that describe affected system areas (avoid specific file paths)
5. **Ensure proper linkage** to `update-protocol` via `relationships.enabled_by`
6. **Choose appropriate update identifier** that clearly describes the change

### 🎯 Common Change Types

- **`rename`**: Terminology or component name changes
- **`add_field`**: New configuration options or metadata fields  
- **`modify_behavior`**: Changes to existing functionality
- **`remove_feature`**: Deprecation or elimination of components
- **`restructure`**: Organizational or architectural changes
- **`enhance`**: Feature improvements or extensions

## 🛡️ Safety & Compliance

- **Abstract Impact Zones**: Use conceptual areas, not specific file paths
- **Data Not Procedure**: Updates contain change specifications, not implementation instructions
- **System Consistency**: Maintain alignment with established architecture and goals
- **Validation Ready**: Output must pass validation by `update-protocol.md`
- **Change Traceability**: Include clear rationale and impact assessment for all modifications
- **Backward Compatibility**: Consider existing system dependencies and user workflows

**Use this floatprompt to create structured updates that evolve the system systematically and safely.**

</floatprompt>
