---
STOP: "Patch instructions for component filename comment addition to improve maintenance traceability"
title: FloatPrompt Component Filename Comments Patch
id: floatprompt-component-comments-patch
version: 0.1.0-alpha
created: 2025-06-13T00:00:00.000Z
modified: 2025-06-13T00:00:00.000Z
author: @mds
format: floatprompt
filetype: markdown
type: enhance
system_version: floatprompt v0.4.0-alpha
contributors: ["@mds", "Claude Sonnet"]
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution."
relationships:
  enabled_by: ["_dev-update-floatprompt"]
changes:
  enhance: 
    target: "source template components"
    specification: "Add HTML comment with filename as first line of each component file"
    format: "<!-- filename.md -->"
    scope: "all src/template/*.md files except header.md"
    purpose: "maintenance traceability and development efficiency"
rationale:
  maintenance_efficiency: "When using compiled floatprompt in production and discovering needed changes, filename comments enable instant source component identification instead of searching through 12+ files"
  archaeological_integrity: "Preserves build lineage by making each section traceable to its source component, maintaining clear separation between different concerns"
  development_velocity: "Enables surgical updates with Find → Edit → Rebuild workflow instead of Find → Search → Maybe Find → Edit → Rebuild cycle"
  collaboration_enhancement: "Anyone can quickly identify which component to modify without deep system knowledge"
  future_maintenance: "Supports systematic refactors like the recent curator removal by providing clear component boundaries in compiled output"
impact_zone:
  - "source template components (src/template/*.md)"
  - "build system compilation process"
  - "compiled distribution file structure"
  - "development workflow efficiency"
  - "maintenance and debugging processes"
  - "component boundary identification"
  - "archaeological build lineage preservation"
implementation_notes:
  - "Add comment as first line of each component file"
  - "Exception: header.md (becomes frontmatter, no comment needed)"
  - "Format: <!-- filename.md --> exactly"
  - "Rebuild required to see comments in compiled output"
  - "Comments will appear at natural section boundaries"
source:
  prompt: "Created using floatprompt-development-patch-creator from component comments enhancement discussion"
  intent: "Improve maintenance traceability and development efficiency through component filename comments"
certification:
  timestamp: 2025-06-13T00:00:00.000Z
  authority: "schema-compliance"
  certified_by: "Claude Sonnet"
  locked: false
  uid: "float:component-comments-patch"
  chain:
    depth: 0
    parent: null
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: ["floatprompt-development-patch-creator"]
---

# 🔧 FloatPrompt Component Filename Comments Patch

**Systematic patch for adding filename comments to source template components to improve maintenance traceability and development efficiency.**

> **Core Objective**: Enable instant source component identification in compiled floatprompt output through HTML filename comments.

## 🎯 Enhancement Specification

### Add Component Filename Comments
- **Target**: All source template components in `src/template/*.md`
- **Exception**: `header.md` (becomes frontmatter, no comment needed)
- **Format**: `<!-- filename.md -->` as first line of each file
- **Purpose**: Maintenance traceability and development efficiency

### Implementation Details
- **Comment placement**: First line of each component file
- **Consistent format**: `<!-- filename.md -->` exactly
- **Build integration**: Comments appear at section boundaries in compiled output
- **Maintenance workflow**: Enable Find → Edit → Rebuild instead of search cycles

## 🔍 Rationale

### **Maintenance Efficiency Enhancement**
When using compiled floatprompt in production and discovering needed changes (like the recent curator removal), filename comments enable instant source component identification instead of searching through 12+ files.

### **Archaeological Integrity Preservation**
Preserves build lineage by making each section traceable to its source component, maintaining clear separation between different concerns and enabling precise reconstruction.

### **Development Velocity Improvement**
Enables surgical updates with streamlined workflow: identify issue in compiled output → see filename comment → edit specific component → rebuild. Eliminates cognitive load of mental mapping between compiled sections and source files.

### **Collaboration Enhancement**
Anyone can quickly identify which component to modify without deep system knowledge, improving team development efficiency and reducing onboarding complexity.

## 🎯 Impact Assessment

### **Positive Impacts**
- **Faster iteration cycles** for maintenance and updates
- **Reduced cognitive load** during development
- **Better archaeological preservation** of build lineage
- **Improved collaboration** through clear component boundaries
- **Systematic refactor support** for future changes

### **Implementation Requirements**
- Add comments to all applicable source components
- Rebuild system to generate updated distribution
- Verify comments appear at appropriate section boundaries
- Test maintenance workflow with comment-guided updates

## 🛡️ Safety & Compliance

### **System Integrity**
- Comments are HTML format, invisible to AI processing
- No impact on floatprompt functionality or behavior
- Maintains all existing system architecture and goals
- Preserves voice preservation and archaeological extraction principles

### **Backward Compatibility**
- Existing floatprompts remain fully functional
- No breaking changes to user workflows
- Comments enhance but don't modify core functionality
- Build system continues normal operation

**Status**: Ready for implementation through `_dev-update-floatprompt` execution protocol. 