# 📖 Update Development README

**Complete guide for systematic FloatPrompt system updates.**

> **Ensures consistent, safe, and traceable system evolution through structured development practices.**

## 🎯 Purpose

Guide complete update lifecycle: identifying needed changes through creation, validation, execution, and archival of system updates.

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
Use `update-creator.fp` to generate structured update specification:

```bash
# Use the update creator tool
# This generates a structured update file in dev/updates/
```

**Update file naming**: `update-[descriptive-name].fp`

### **Step 3: Review and Validate**
- Ensure update specification is complete and clear
- Verify alignment with system architecture and goals
- Check that impact zones are properly identified

### **Step 4: Execute Update**
Use `update-protocol.fp` to systematically apply the update:

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
Move completed update to `dev/3-closed/`:

```bash
# Example:
mv dev/updates/update-wrapping-tags.fp dev/3-closed/
# Optional date prefix if requested:
# mv dev/updates/update-wrapping-tags.fp dev/3-closed/2025-06-13-update-wrapping-tags.fp
```

## 🛠️ Development Tools

### **`update-creator.fp`**
- **Purpose**: Creates structured update specifications
- **Input**: Change requirements and rationale
- **Output**: Certified update floatprompt ready for execution

### **`update-protocol.fp`**
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