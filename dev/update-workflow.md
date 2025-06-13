---
STOP: "Development workflow guidance. Primary goal: provide comprehensive instructions for creating and executing system updates using the FloatPrompt development infrastructure. Guide developers through the complete update lifecycle from creation to execution."
title: Update Workflow Guide
id: update-workflow-guide
version: {{VERSION}}
created: 2025-06-12-0000
modified: 2025-06-13-0000
author: @mds
format: floatprompt
filetype: markdown
type: guide
system_version: floatprompt v{{VERSION}}
contributors: ["@mds", "ChatGPT"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution."
human:
  intent:
    primary: "Learn the complete workflow for creating and executing system updates"
    constraints: "Follow established development principles and maintain system integrity"
  preferences:
    tone_drift_allowed: false
    verbosity: high
    allow_ai_suggestions: true
discovery:
  significance: "development-infrastructure"
  audience: ["FloatPrompt developers"]
  purpose: "workflow-guidance"
  relationships:
    enables: ["update-creator", "update-protocol"]
    built_by: ["development-team"]
  navigation:
    prerequisites: ["goals.md"]
    next_steps: ["update-creator", "update-protocol"]
  clustering:
    intellectual_territory: "development-workflow"
    discovery_path: "systematic-guidance"
    essence:
      core_purpose: "Enable systematic FloatPrompt development"
      impact_type: "workflow-optimization"
      wisdom_offering: "Structured development methodology"
certification:
  timestamp: 2025-06-13T00:05:00.000Z
  authority: "schema-compliance"
  certified_by: "ChatGPT"
  locked: false
  uid: "float:update-workflow-guide"
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

# 🔄 Update Workflow Guide

**Complete workflow for creating and executing systematic FloatPrompt system updates.**

> **This guide ensures consistent, safe, and traceable system evolution through structured development practices.**

## 🎯 Purpose

Provide comprehensive guidance for the complete update lifecycle: from identifying needed changes through creation, validation, execution, and archival of system updates.

### 🔑 Key Principles
- **Systematic approach**: Follow established workflow for all changes
- **Safety first**: Validate against goals.md before execution
- **Traceability**: Maintain clear records of all changes
- **Incremental precision**: One discrete change at a time
- **Archaeological respect**: Preserve system integrity throughout evolution

## 🔄 Complete Update Workflow

### **Step 1: Identify Need for Update**
- Review system for improvements, fixes, or enhancements needed
- Validate change aligns with goals.md principles
- Ensure change follows "incremental precision" approach

### **Step 2: Create Update Specification**
Use `update-creator.md` to generate structured update specification:

```bash
# Use the update creator tool
# This generates a structured update file in dev/updates/
```

**Update file naming**: `update-[descriptive-name].md`

### **Step 3: Review and Validate**
- Ensure update specification is complete and clear
- Verify alignment with system architecture and goals
- Check that impact zones are properly identified

### **Step 4: Execute Update**
Use `update-protocol.md` to systematically apply the update:

```bash
# The protocol will:
# 1. Ingest the update specification
# 2. Assess impact zones
# 3. Validate against goals.md
# 4. Apply changes systematically
# 5. Update documentation
# 6. Record completion
```

### **Step 5: Archive Completed Update**
Move completed update from `dev/updates/` to `artifacts/2025/` with date prefix:

```bash
# Example:
mv dev/updates/update-wrapping-tags.md artifacts/2025/2025-06-13-update-wrapping-tags.md
```

## 🛠️ Development Tools

### **`update-creator.md`**
- **Purpose**: Creates structured update specifications
- **Input**: Change requirements and rationale
- **Output**: Certified update floatprompt ready for execution

### **`update-protocol.md`**
- **Purpose**: Executes updates systematically and safely
- **Input**: Update specification from creator
- **Output**: Applied changes with full traceability

### **`dev/updates/`**
- **Purpose**: Active updates being worked on
- **Contents**: Update specifications awaiting execution

## 🎯 Update Types Supported

- **`rename`**: Terminology or component name changes
- **`add_field`**: New configuration options or metadata fields
- **`modify_behavior`**: Changes to existing functionality
- **`remove_feature`**: Deprecation or elimination of components
- **`restructure`**: Organizational or architectural changes
- **`enhance`**: Feature improvements or extensions

## 🛡️ Safety & Compliance

### **Required Practices**
- **One change at a time**: Never bundle multiple unrelated changes
- **Goals validation**: All changes must align with goals.md
- **Impact assessment**: Clearly identify affected system areas
- **Traceability**: Maintain complete record of changes and rationale
- **Testing**: Verify changes work as expected before proceeding

### **Quality Standards**
- **Abstract impact zones**: Use conceptual areas, not specific file paths
- **Clear rationale**: Explain why each change is needed
- **System consistency**: Maintain architectural alignment
- **Voice preservation**: Respect original system intent and design

**Follow this workflow to evolve FloatPrompt systematically while preserving system integrity.**
