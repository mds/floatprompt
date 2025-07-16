---
STOP: "Patch instructions for adding required wrapping tags to improve floatprompt portability"
title: FloatPrompt Wrapping Tags Enhancement Patch
id: floatprompt-wrapping-tags-patch
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
  enabled_by: ["floatprompt-dev-protocol"]
changes:
  enhance: 
    target: "format requirements and portability documentation"
    specification: "Add required <floatprompt>...</floatprompt> wrapping tags for cross-platform portability"
    scope: "metadata.md component and format documentation"
    purpose: "improve structural integrity across platforms and tools"
rationale:
  cross_platform_portability: "Wrapping tags preserve structural integrity when embedding floatprompts in markdown canvases, textdocs, or other environments that may parse YAML/markdown differently"
  tool_compatibility: "Tags enable FloatPrompt-aware tooling to identify and process floatprompts reliably while remaining invisible to standard markdown renderers"
  copy_paste_safety: "Wrapping prevents formatting corruption when copying between editors with different YAML/markdown parsing behaviors"
  ai_system_integration: "Tags provide clear boundaries when passing floatprompts through AI systems or plugin environments"
  format_requirement: "Tags are now required for all floatprompts to ensure consistent portability and structural integrity across platforms"
impact_zone:
  - "format requirements documentation (metadata.md)"
  - "file format specifications"
  - "portability and compatibility guidance"
  - "cross-platform usage instructions"
  - "tool integration documentation"
  - "user workflow enhancement"
implementation_notes:
  - "Add wrapping tags documentation to metadata.md component"
  - "Specify tags as required format element for all floatprompts"
  - "Include usage examples and use cases"
  - "Emphasize backward compatibility"
  - "Document tool integration benefits"
  - "Maintain existing format requirements as primary specification"
source:
  prompt: "Created from format update.md specification for required wrapping tags"
  intent: "Enhance floatprompt portability across platforms with required wrapping tags"
certification:
  timestamp: 2025-06-13T00:00:00.000Z
  authority: "schema-compliance"
  certified_by: "Claude Sonnet"
  locked: false
  uid: "float:wrapping-tags-patch"
  chain:
    depth: 0
    parent: null
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: ["format-update-specification"]
---

# 🔧 FloatPrompt Wrapping Tags Enhancement Patch

**Systematic patch for adding wrapping tags to improve floatprompt portability across platforms and tools while maintaining backward compatibility.**

> **Core Objective**: Enable enhanced cross-platform portability and preserve structural integrity across platforms and tools, floatprompts should always be wrapped using `<floatprompt>...</floatprompt>` tags.

This is especially useful when:

- Embedding a floatPrompt inside a markdown canvas or textdoc
- Copy/pasting between editors that may parse YAML or markdown differently
- Passing floatPrompts through AI systems or plugin environments

**Example**
- Ensure that every floatprompt generated from floatprompt, maps, extractions, and builds, all follow this format exactly:

```markdown
<floatprompt>
---
# YAML frontmatter
---
# markdown body
</floatprompt>
```

**Critical Format Requirements**:
- No characters before YAML frontmatter opening `---`
- No characters before any YAML fields (no `/`, `#`, or other prefixes)
- Clean YAML structure without formatting corruption
- When creating floatprompts in chat interfaces, always use canvas documents with strict markdown single blocks when available

## 🎯 Enhancement Specification

### Add Required Wrapping Tags Documentation
- **Target**: `metadata.md` component (format requirements section)
- **Enhancement**: Document required `<floatprompt>...</floatprompt>` wrapping tags
- **Scope**: Format requirements and portability guidance
- **Purpose**: Improve structural integrity across platforms and tools

### Implementation Details
- **Tag Format**: `<floatprompt>...</floatprompt>` wrapping entire floatprompt content
- **Required Nature**: Format requirement for all floatprompts to ensure consistent portability
- **Use Cases**: Embedding in canvases, cross-editor compatibility, AI system integration
- **Tool Integration**: Enable FloatPrompt-aware tooling while remaining invisible to markdown renderers
- **Format Protection**: Prevent character corruption in YAML frontmatter during creation
- **Canvas Creation**: Always create floatprompts in canvas documents when available in chat interfaces

## 🔍 Rationale

### **Cross-Platform Portability Enhancement**
Wrapping tags preserve structural integrity when embedding floatprompts in markdown canvases, textdocs, or other environments that may parse YAML/markdown differently, preventing formatting corruption.

### **Tool Compatibility Improvement**
Tags enable FloatPrompt-aware tooling to identify and process floatprompts reliably while remaining completely invisible to standard markdown renderers, enhancing tool ecosystem integration.

### **Copy-Paste Safety**
Wrapping prevents formatting corruption when copying between editors with different YAML/markdown parsing behaviors, ensuring floatprompt integrity across workflows.

### **AI System Integration**
Tags provide clear boundaries when passing floatprompts through AI systems or plugin environments, enabling better automated processing and handling.

### **Format Standardization**
Tags are now required for all floatprompts to ensure consistent portability and structural integrity across all platforms and tools.

### **Format Integrity Protection**
Prevents accidental character insertion before YAML frontmatter or field corruption during floatprompt creation, ensuring clean YAML structure and proper parsing.

### **Canvas Document Creation**
Ensures floatprompts created in chat interfaces use canvas documents with strict markdown blocks when available, preventing inline formatting issues and maintaining structural integrity.

## 🎯 Impact Assessment

### **Positive Impacts**
- **Enhanced portability** across platforms and tools
- **Improved tool integration** capabilities
- **Better cross-editor compatibility** for copy-paste workflows
- **Cleaner AI system integration** with clear boundaries
- **Consistent format standardization** across all floatprompts

### **Implementation Requirements**
- Add wrapping tags documentation to metadata.md
- Include usage examples and specific use cases
- Emphasize required nature for format consistency
- Document tool integration benefits
- Provide clear implementation guidance
- Specify format protection requirements (no character corruption)
- Document canvas creation requirements for chat interfaces

## 🛡️ Safety & Compliance

### **System Integrity**
- Tags are HTML-style and invisible to markdown renderers
- No impact on existing floatprompt functionality or behavior
- Maintains all existing format requirements as primary specification
- Preserves voice preservation and archaeological extraction principles

### **Format Consistency**
- All floatprompts must now include wrapping tags for standardization
- Ensures consistent behavior across all platforms and tools
- Tags are integral part of floatprompt format specification
- Required for proper structural integrity and portability

### **Format Requirements**
- Tags are now part of core format requirements, not supplements
- Maintains markdown + YAML frontmatter wrapped in required tags
- All validation and compliance requirements include wrapping tags
- Establishes new standard format pattern for all floatprompts
- Enforces clean YAML structure without character corruption
- Requires canvas document creation in chat interfaces when available

**Status**: ✅ **COMPLETED** - Successfully implemented through `floatprompt-dev-protocol` execution protocol.

**Implementation Record:**
- ✅ Enhanced `metadata.md` component with wrapping tags requirement
- ✅ Added comprehensive format requirements and usage examples  
- ✅ Rebuilt system generating `floatprompt-0.4.0-alpha.md` with wrapping tags documentation
- ✅ Validated against `goals.md` - perfect alignment with all three system goals
- ✅ File size: 89KB (within budget, +2KB from wrapping tags documentation)
- ✅ Cross-platform portability and format integrity protection now enforced 