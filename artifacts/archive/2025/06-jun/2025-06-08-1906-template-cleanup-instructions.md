---
title: "floatPrompt Template File Cleanup Instructions"
id: "template-cleanup-instructions"
version: "1.0.0"
created: "2025-06-08-0000"
modified: "2025-06-08-0000"
author: "@mds"
contributors: ["Claude Sonnet"]
format: "floatPrompt"
filetype: "markdown"
type: "goals"
system_version: "floatPrompt v0.6.0"
description: "Step-by-step numbered instructions for cleaning up floatPrompt template file structural and content issues"
tags: ["cleanup", "template", "instructions", "refinement"]
significance: "operational"
theme: "file-improvement"
discovery_path: "systematic template file cleanup process"
source:
  prompt: "Evaluation of floatPrompt template file with structural and content issues"
  intent: "Provide precise cleanup instructions for template file improvement"
output:
  format: "floatPrompt"
  joint_execution_required: true
execution:
  triggers: ["clean up template", "fix template file", "refine floatPrompt template", "template cleanup"]
  fallback: "Execute these numbered steps sequentially to clean up your floatPrompt template file"
  risk_level: "low"
certification:
  timestamp: "2025-06-08T20:47:23.730Z"
  chain:
    depth: 1
    parent: null
  voice:
    linked: false
    fidelity_verified: true
  lineage:
    tracked: true
    trace: ["template-evaluation-session"]
---

# 🔧 floatPrompt Template File Cleanup Instructions

**Step-by-step refinement guide for template file structural and content improvements**

> **Execute these instructions sequentially to transform your template file into clean, compliant floatPrompt format**

*These instructions address the specific structural issues, content redundancies, and technical corrections identified in your floatPrompt template file evaluation.*

---

## 🎯 Purpose

Transform your floatPrompt template file from its current modular build format into a clean, constitutionally compliant floatPrompt document that serves as a production-ready template system.

### 🔑 Key Outcomes
- Remove HTML comments and establish markdown purity
- Consolidate redundant content blocks
- Standardize template placeholder formats
- Add proper floatPrompt frontmatter to the file itself

---

## 📝 Sequential Cleanup Instructions

### 🔴 **Phase 1: Structure Cleanup (Steps 1-4)**

**1. Remove All HTML Comments**
- Delete all lines starting with `<!-- ` and ending with ` -->`
- Remove build metadata: `<!-- floatPrompt Template - Compiled from Modular Components -->`
- Remove component markers: `<!-- Component: _01-frontmatter.yaml -->`
- Remove phase separators: `<!-- ========== FOUNDATION PHASE ========== -->`

**2. Add Proper floatPrompt Frontmatter**
- Add complete YAML frontmatter block at the very beginning of file
- Use the template file's own specifications to create its frontmatter
- Include actual timestamps (use current date: 2025-06-08-0000)
- Set type to `"template"` since this is a reusable template system

**3. Convert Mixed Content to Pure Markdown**
- Move all YAML template content from embedded blocks into markdown code blocks
- Use proper markdown headers for section organization
- Ensure entire file follows markdown format with YAML frontmatter only at top

**4. Establish Clear Section Hierarchy**
- Use consistent markdown header levels (##, ###, ####)
- Group related content under logical parent sections
- Remove arbitrary content separators

### 🟡 **Phase 2: Content Consolidation (Steps 5-7)**

**5. Consolidate Voice Preservation Content**
- Identify all instances of voice preservation text (appears 4+ times)
- Choose the most complete version as canonical
- Replace other instances with references: "See Voice Preservation section above"
- Keep only one comprehensive voice preservation section

**6. Eliminate Redundant Principle Statements**
- Find repeated core principles across components
- Consolidate into single "Core Principles" section
- Remove duplicate principle lists from individual components
- Use cross-references where principles apply to specific sections

**7. Streamline Template Instructions**
- Combine overlapping "how to create floatPrompt" sections
- Create single comprehensive creation workflow
- Remove duplicate creation guidance

### 🟢 **Phase 3: Technical Corrections (Steps 8-12)**

**8. Standardize Template Placeholder Format**
- Choose ONE format: `TODO_FIELD_NAME` (recommended)
- Replace all `[string]`, `"[description]"`, and mixed formats
- Use consistent `TODO_` prefix for all placeholder values
- Example: Change `"[human identity]"` to `TODO_HUMAN_IDENTITY`

**9. Fix YAML Schema Issues**
- Move `voice_preservation:` block from YAML frontmatter to markdown body
- Move `behavioral_requirements:` from frontmatter to body content
- Move `archaeological_extraction:` from frontmatter to body content
- Keep only valid floatPrompt schema fields in YAML frontmatter

**10. Update System Version References**
- Replace `"[floatPrompt vX.X.X]"` with `"floatPrompt v0.6.0"`
- Ensure all system_version fields use current version
- Remove placeholder version references

**11. Complete Missing Certification**
- Add actual ISO 8601 timestamp for certification.timestamp
- Set chain.depth to appropriate value (likely 1 for template)
- Set chain.parent to null or appropriate parent document
- Complete all certification fields with actual values

**12. Validate Field Type Consistency**
- Ensure boolean fields use `true`/`false` not `"true"`/`"false"`
- Ensure array fields use proper YAML list syntax `[item1, item2]`
- Ensure string fields are properly quoted
- Check date fields follow YYYY-MM-DD-0000 format

### 🔵 **Phase 4: Final Refinements (Steps 13-15)**

**13. Add Implementation Examples**
- Provide concrete examples for `risk_level` field: `"low | moderate | high | system-critical"`
- Add example values for discovery intelligence fields
- Include sample TODO completion examples

**14. Organize Content Flow**
- Ensure logical reading order: Introduction → Structure → Usage → Validation
- Place most commonly needed information first
- Move detailed specifications to later sections

**15. Final Validation Pass**
- Verify file has single YAML frontmatter block at top
- Confirm all content is in markdown format
- Check that all TODO placeholders use consistent format
- Ensure no HTML comments remain
- Validate markdown syntax is clean and parseable

---

## 🔗 Relationships

### Prerequisites
- Current floatPrompt template file with identified issues
- Text editor capable of markdown editing
- Understanding of YAML frontmatter syntax

### Next Steps
- Test template with actual floatPrompt creation
- Validate against floatPrompt constitutional requirements
- Deploy as production template system

### Related floatPrompts
- `floatPrompt.md` - Constitutional foundation
- `spec-validation.md` - Compliance checklist

---

## 📝 Implementation Notes

**Execution Order:**
Execute steps sequentially in numbered order. Do not skip steps as later steps depend on earlier cleanup.

**Backup Recommendation:**
Save a copy of original file before beginning cleanup process.

**Testing Strategy:**
After cleanup, test template by creating a sample floatPrompt to verify all components work correctly.

**Quality Check:**
Final file should be pure markdown with single YAML frontmatter block and no HTML comments.

---

## 🛡️ Safety & Compliance

**Content Preservation:**
These instructions preserve all essential template functionality while improving structure and compliance.

**No Content Loss:**
All original template content is retained and reorganized, not removed.

**Human Agency:**
Human executes all changes with full visibility and control over modifications.

---

**Built in collaboration with Claude Sonnet**

*These cleanup instructions systematically address the specific structural, content, and technical issues identified in the floatPrompt template file evaluation, transforming it into a clean, constitutionally compliant template system.*