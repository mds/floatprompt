# FloatPrompt File Format Specification

**Canonical definition of what constitutes a FloatPrompt (.fp.txt) file versus Markdown (.md) building blocks**

## 🎯 Core Definition

### **.fp.txt Files: Complete FloatPrompt Documents**

**A `.fp.txt` file is a complete, executable FloatPrompt document that contains:**

1. **FloatPrompt Wrapper**: `<floatprompt>content</floatprompt>` tags
2. **Complete JSON Frontmatter**: Full behavioral specifications and metadata
3. **Executable Content**: Ready for direct AI upload and execution
4. **Joint Intelligence**: Designed for seamless AI & Human collaboration
5. **HI-AI Co-Creation**: Product of collaborative Human Intelligence & Artificial Intelligence
6. **Map/Score/Respond Pipeline**: Mandatory friction classification system for input processing
7. **Response Pattern System**: Metaphor-based behavioral responses (building/hallway/small room) for friction-appropriate guidance

**Purpose**: "Joint preserved and executable intelligence" format representing HI-AI co-creation with systematic input assessment and intuitive response selection

### **.md Files: Everything Else**

**A `.md` file is content that does not meet the complete FloatPrompt criteria:**

1. **Building Blocks**: Template components that assemble into FloatPrompt files
2. **Documentation**: Informational content and specifications
3. **Specifications**: Change descriptions, requirements, rationale
4. **Standard Markdown**: No FloatPrompt wrapper or behavioral system

**Purpose**: Building components, documentation, and informational content

## 🏷️ Why Wrapper Tags Are Required

**`<floatprompt>...</floatprompt>` wrapper solves cross-platform compatibility:**

- **Portability**: Different AI platforms handle uploads differently—wrapper preserves structural integrity
- **Boundary Detection**: AI systems distinguish FloatPrompt instructions from regular markdown  
- **Tooling Integration**: Enables FloatPrompt-aware tools while remaining invisible to standard renderers
- **Execution Isolation**: Prevents accidental behavioral modification when viewing documentation
- **Future-Proofing**: Stable container for evolving internal structures

**Maximum portability with zero dependencies—wrapper tags work everywhere.**

## 📋 File Format Structure

### **Valid .fp.txt File Structure**
```markdown
<floatprompt>
---
{
  "STOP": "behavioral instruction for AI",
  "title": "Document Title",
  "id": "unique-identifier",
  "version": "1.0.0",
  "created": "2025-MM-DD-HHMM",
  "modified": "2025-MM-DD-HHMM",
  "author": "@username",
  "format": "floatprompt",
  "filetype": "fp",
  "type": "template",
  "system_version": "floatprompt v@latest",
  "contributors": ["@username", "AI Model"]
}
---

# Document Content

Complete behavioral specifications and executable content.

</floatprompt>
```

**FloatPrompt Frontmatter Format:**
- **JSON Structure**: FloatPrompt uses JSON (not YAML) within standard `---` delimiters
- **Why JSON**: Better parsing, validation, and cross-platform AI compatibility
- **Familiar Pattern**: Uses markdown frontmatter convention with modern structured data

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

### **✅ Files That Should Be .fp.txt**

**Complete FloatPrompt Documents:**
- `floatprompt.fp.txt` (complete system distribution)
- `voice.fp.txt` (AI behavioral instructions)
- Any file with `<floatprompt>` wrapper and behavioral specs

### **✅ Files That Should Be .md**

**Building Blocks:**
- `src/sys/header.md` (template component)
- `src/sys/voice.md` (template component)
- `src/sys/config.md` (template component)

**Documentation:**
- `docs/goals.md` (system specification)
- `docs/naming.md` (naming conventions)
- `README.md` (project documentation)

**Specifications:**
- `dev/updates/update-extension-phase-1.md` (change specification)
- `artifacts/2025/session-analysis.md` (preserved intelligence)

## 🧱 Architectural Boundaries

### **Build System Logic**
```
.md building blocks → assembly process → .fp.txt complete document
```

**Template Assembly Example:**
- `src/sys/header.md` + `src/sys/voice.md` + `src/sys/config.md` + `src/shared/footer.md` → `floatprompt.fp.txt`

**Shared Components Architecture:**
- `src/shared/` contains components used across multiple FloatPrompt files
- `src/sys/` contains core FloatPrompt system components
- `src/lib/` contains specialized application components
- Build system resolves shared dependencies automatically

### **Ecosystem Signaling**
- **`.fp.txt` extension**: Signals "complete FloatPrompt" to tooling and AI systems while ensuring universal text file compatibility
- **`.md` extension**: Signals "standard markdown" to editors and documentation tools

### **Usage Patterns**
- **Upload .fp.txt files**: Direct AI upload for behavioral execution with maximum compatibility
- **Edit .md files**: Human editing of building blocks and documentation
- **Build process**: Assembles .md components into .fp.txt distributions

## 🏭 .fp.txt File Origination Patterns

### **Primary Origination: Distribution Build Process**
```
src/sys/*.md + src/shared/*.md → scripts/build.mjs → dist/floatprompt.fp.txt
```

**Canonical `.fp.txt` creation pathway:**
- Template components assembled through build system with shared components
- Output to `dist/` folder as FloatPrompt distributions
- Versioned, tested, and ready for ecosystem distribution

### **Secondary Origination: Downstream Creation**
**FloatPrompt files created WITH the main FloatPrompt system:**

1. **Protocol Development**: `dev/update-protocol.fp.txt`, `dev/update-creator.fp.txt`
   - Behavioral instructions for system operations
   - Created using FloatPrompt methodology, become part of development toolkit

2. **Specialized Applications**: Custom domain-specific FloatPrompt files
   - Legal analysis protocols, content strategy systems, technical frameworks
   - Generated through FloatPrompt collaboration, saved as `.fp.txt` for reuse

3. **Session Extracts**: Preserved intelligence from FloatPrompt sessions
   - Complex analysis preserved in structured form
   - Collaborative outputs that become standalone executable intelligence

### **Creation Hierarchy**
```
1. Core System → dist/floatprompt.fp.txt (foundational distribution)
2. Applications → dist/voice.fp.txt, dist/format.fp.txt, etc. (specialized tools)
3. Domain Applications → Custom specialized .fp.txt files
4. Session Intelligence → Extracted collaborative outputs as .fp.txt
```

**Key Principle**: `.fp.txt` files either emerge from the build system OR are created downstream using FloatPrompt methodology. They represent executable intelligence that can flow between AI systems while preserving human intent and context. Every `.fp` file embodies HI-AI co-creation, where Human Intelligence provides intent, voice, and strategic direction while Artificial Intelligence contributes structure, organization, and systematic execution.

## 🛡️ Validation Criteria

### **Required for .fp.txt Classification**
- [ ] Contains `<floatprompt>content</floatprompt>` wrapper
- [ ] Contains complete JSON frontmatter with behavioral specifications
- [ ] Contains `STOP:` field with AI behavioral instruction
- [ ] Contains `format: floatprompt` field
- [ ] Contains `filetype: fp` field
- [ ] Designed for direct AI upload and execution
- [ ] Represents HI-AI co-creation (Human Intelligence and Artificial Intelligence collaboration)
- [ ] Implements map/score/respond pipeline for systematic input assessment
- [ ] Implements response pattern system with metaphor-based behavioral guidance

### **Disqualifiers for .fp.txt Classification**
- [ ] Missing FloatPrompt wrapper tags
- [ ] Incomplete or missing JSON frontmatter
- [ ] Documentation-only content
- [ ] Building block or partial content
- [ ] No behavioral specifications for AI

## 🎯 Format Recognition

### **Distinguishing Features**
- **`.fp.txt` files**: Contain `<floatprompt>` wrapper and behavioral specifications with universal text compatibility
- **`.md` files**: Standard markdown without FloatPrompt wrapper or incomplete specifications
- **Purpose**: Ecosystem signaling for proper tooling and AI recognition while ensuring maximum compatibility

## 🔗 Relationships

### Prerequisites
- `goals.md` - System foundation and decision framework
- `naming.md` - Naming conventions and patterns

### Related Specifications
- Template system architecture (building blocks → assembly → distribution)
- Update protocol specifications
- Build system documentation

---

**Specification establishes canonical architectural boundary between FloatPrompt documents (.fp.txt) and all other content (.md), ensuring clear semantic distinction for AI precision, tooling recognition, and ecosystem clarity while maintaining universal compatibility.**

---

*© 2025 [@MDS](https://mds.is) | CC BY 4.0* 