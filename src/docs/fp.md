---
title: FloatPrompt File Format Specification
type: specification
description: Canonical definition of .fp file format and architectural boundaries
author: @mds
contributors: ["@mds", "Claude Sonnet"]
---

# FloatPrompt File Format Specification

**Canonical definition of what constitutes a FloatPrompt (.fp) file versus Markdown (.md) building blocks**

## 🎯 Core Definition

### **.fp Files: Complete FloatPrompt Documents**

**A `.fp` file is a complete, executable FloatPrompt document that contains:**

1. **FloatPrompt Wrapper**: `<floatprompt>content</floatprompt>` tags
2. **Complete YAML Frontmatter**: Full behavioral specifications and metadata
3. **Executable Content**: Ready for direct AI upload and execution
4. **Joint Intelligence**: Designed for seamless AI & Human collaboration
5. **HI-AI Co-Creation**: Product of collaborative Human Intelligence & Artificial Intelligence
6. **Map/Score/Respond Pipeline**: Mandatory friction classification system for all input processing
7. **Response Pattern System**: Metaphor-based behavioral responses (building/hallway/small room) for friction-appropriate guidance

**Purpose**: "Joint preserved and executable intelligence" format representing HI-AI co-creation with systematic input assessment and intuitive response selection

### **.md Files: Everything Else**

**A `.md` file is any content that does not meet the complete FloatPrompt criteria:**

1. **Building Blocks**: Template components that assemble into complete FloatPrompts
2. **Documentation**: Informational content and specifications
3. **Specifications**: Change descriptions, requirements, rationale
4. **Standard Markdown**: No FloatPrompt wrapper or complete behavioral system

**Purpose**: Building components, documentation, and informational content

## 📋 File Format Structure

### **Valid .fp File Structure**
```markdown
<floatprompt>
---
STOP: "behavioral instruction for AI"
title: Document Title
id: unique-identifier
version: 1.0.0
created: 2025-MM-DD-HHMM
modified: 2025-MM-DD-HHMM
author: @username
format: floatprompt
filetype: fp
type: [template|build|extract|map]
system_version: floatprompt v@latest
contributors: ["@username", "AI Model"]
[additional YAML fields...]
---

# Document Content

Complete behavioral specifications and executable content.

</floatprompt>
```

### **Standard .md File Structure**
```markdown
---
title: Document Title
type: specification
description: Document purpose
author: @username
contributors: ["@username"]
---

# Standard Markdown Content

Documentation, specifications, or building block content without FloatPrompt wrapper.
```

## 🎯 Classification Examples

### **✅ Files That Should Be .fp**

**Complete FloatPrompt Documents:**
- `floatprompt-0.4.1-alpha.fp` (complete system distribution)
- `update-protocol.fp` (complete AI behavioral instructions)
- `update-creator.fp` (complete AI behavioral instructions)
- `task-analyzer.fp` (complete AI behavioral instructions)
- Any file with `<floatprompt>` wrapper and complete behavioral specs

### **✅ Files That Should Be .md**

**Building Blocks:**
- `src/template/header.md` (template component)
- `src/template/voice.md` (template component)
- `src/template/config.md` (template component)

**Documentation:**
- `src/docs/goals.md` (system specification)
- `src/docs/naming.md` (naming conventions)
- `README.md` (project documentation)

**Specifications:**
- `dev/updates/update-extension-phase-1.md` (change specification)
- `artifacts/2025/session-analysis.md` (preserved intelligence)

## 🧱 Architectural Boundaries

### **Build System Logic**
```
.md building blocks → assembly process → .fp complete document
```

**Template Assembly Example:**
- `header.md` + `voice.md` + `config.md` + ... → `floatprompt-X.X.X.fp`

### **Ecosystem Signaling**
- **`.fp` extension**: Signals "complete FloatPrompt" to tooling and AI systems
- **`.md` extension**: Signals "standard markdown" to editors and documentation tools

### **Usage Patterns**
- **Upload .fp files**: Direct AI upload for behavioral execution
- **Edit .md files**: Human editing of building blocks and documentation
- **Build process**: Assembles .md components into .fp distributions

## 🏭 .fp File Origination Patterns

### **Primary Origination: Distribution Build Process**
```
src/template/*.md → scripts/build.mjs → dist/floatprompt-X.X.X.fp
```

**The canonical `.fp` creation pathway:**
- Template components assembled through build system
- Output to `dist/` folder as complete FloatPrompt distributions
- Versioned, tested, and ready for ecosystem distribution

### **Secondary Origination: Downstream Creation**
**FloatPrompts created WITH the main FloatPrompt system:**

1. **Protocol Development**: `dev/update-protocol.fp`, `dev/update-creator.fp`
   - Complete behavioral instructions for system operations
   - Created using FloatPrompt methodology, become part of development toolkit

2. **Specialized Applications**: Custom domain-specific FloatPrompts
   - Legal analysis protocols, content strategy systems, technical frameworks
   - Generated through FloatPrompt collaboration, saved as `.fp` for reuse

3. **Session Extracts**: Preserved intelligence from FloatPrompt sessions
   - Complex analysis preserved in structured form
   - Collaborative outputs that become standalone executable intelligence

### **Creation Hierarchy**
```
1. Core System → dist/floatprompt-X.X.X.fp (foundational distribution)
2. Development Tools → dev/*.fp (system protocols and creators)
3. Domain Applications → Custom specialized .fp files
4. Session Intelligence → Extracted collaborative outputs as .fp
```

**Key Principle**: `.fp` files either emerge from the build system OR are created downstream using FloatPrompt methodology. They represent complete, executable intelligence that can flow between AI systems while preserving human intent and context. Every `.fp` file embodies HI-AI co-creation, where Human Intelligence provides intent, voice, and strategic direction while Artificial Intelligence contributes structure, organization, and systematic execution.

## 🛡️ Validation Criteria

### **Required for .fp Classification**
- [ ] Contains `<floatprompt>content</floatprompt>` wrapper
- [ ] Contains complete YAML frontmatter with behavioral specifications
- [ ] Contains `STOP:` field with AI behavioral instruction
- [ ] Contains `format: floatprompt` field
- [ ] Contains `filetype: fp` field
- [ ] Designed for direct AI upload and execution
- [ ] Represents HI-AI co-creation (Human Intelligence and Artificial Intelligence collaboration)
- [ ] Implements map/score/respond pipeline for systematic input assessment
- [ ] Implements response pattern system with metaphor-based behavioral guidance

### **Disqualifiers for .fp Classification**
- [ ] Missing FloatPrompt wrapper tags
- [ ] Incomplete or missing YAML frontmatter
- [ ] Documentation-only content
- [ ] Building block or partial content
- [ ] No behavioral specifications for AI

## 🎯 Format Recognition

### **Distinguishing Features**
- **`.fp` files**: Contain `<floatprompt>` wrapper and complete behavioral specifications
- **`.md` files**: Standard markdown without FloatPrompt wrapper or incomplete specifications
- **Purpose**: Ecosystem signaling for proper tooling and AI recognition

## 🔗 Relationships

### Prerequisites
- `goals.md` - System foundation and decision framework
- `naming.md` - Naming conventions and patterns

### Related Specifications
- Template system architecture (building blocks → assembly → distribution)
- Update protocol specifications
- Build system documentation

---

**This specification establishes the canonical architectural boundary between complete FloatPrompt documents (.fp) and all other content (.md), ensuring clear semantic distinction for AI precision, tooling recognition, and ecosystem clarity.** 