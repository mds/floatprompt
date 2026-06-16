---
title: FloatPrompt File Format Specification
type: specification
description: Canonical definition of the FloatPrompt format and architectural boundaries
author: @mds
contributors: ["@mds", "Claude Sonnet"]
---

# FloatPrompt File Format Specification

**Canonical definition of what constitutes a complete FloatPrompt versus Markdown (.md) building blocks**

## 🎯 Core Definition

### **Complete FloatPrompt Documents**

**A complete FloatPrompt is a document that contains:**

1. **YAML Frontmatter**: `name`, `description`, and `metadata` between `---` fences, no wrapper tags
2. **Behavioral Config**: `metadata.config` holding the full behavioral specification (STOP directive, human intent, AI role, requirements)
3. **Markdown Body**: Readable methodology and content for humans
4. **Executable Content**: Ready for direct AI upload and execution
5. **Joint Intelligence**: Designed for seamless AI and Human collaboration
6. **HI-AI Co-Creation**: Product of collaborative Human Intelligence and Artificial Intelligence
7. **Map/Score/Respond Pipeline**: Mandatory friction classification system for input processing
8. **Response Pattern System**: Metaphor-based behavioral responses (building/hallway/small room) for friction-appropriate guidance

**Purpose**: "Joint preserved and executable intelligence" format representing HI-AI co-creation with systematic input assessment and intuitive response selection

This is the same shape Anthropic later standardized as Agent Skills (`SKILL.md`): frontmatter plus a markdown body, identified by structure rather than a wrapper.

### **.md Files: Everything Else**

**A `.md` file is content that does not meet the complete FloatPrompt criteria:**

1. **Building Blocks**: Template components that assemble into FloatPrompts
2. **Documentation**: Informational content and specifications
3. **Specifications**: Change descriptions, requirements, rationale
4. **Standard Markdown**: No FloatPrompt frontmatter or behavioral system

**Purpose**: Building components, documentation, and informational content

## 🏷️ Why Frontmatter, No Wrapper

**YAML frontmatter solves cross-platform compatibility without any wrapper tags:**

- **Portability**: The `---` fences are universally recognized, so structural integrity is preserved across platforms
- **Boundary Detection**: AI systems distinguish FloatPrompt instructions from regular markdown by the frontmatter block
- **Tooling Integration**: Standard frontmatter is parseable by editors, static site generators, and skill tooling alike
- **Convention Alignment**: Matches the Agent Skills standard, so FloatPrompts read as skills and skills read as FloatPrompts
- **Future-Proofing**: A stable, well-understood container for evolving internal structures

**Maximum portability with zero dependencies. Frontmatter works everywhere.**

## 📋 File Format Structure

### **Valid FloatPrompt Structure**
```markdown
---
name: unique-identifier
description: "What this does and when to use it, with trigger phrases."
metadata:
  config: {
    "STOP": "behavioral instruction for the AI",
    "version": "1.0.0",
    "archetype": "behavioral",
    "format": "floatprompt",
    "human": { "author": "@username", "intent": "...", "context": "..." },
    "ai": { "model": "AI Model" },
    "requirements": { }
  }
---

# Document Content

Complete behavioral specifications and executable content.
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

Documentation, specifications, or building block content without FloatPrompt behavioral config.
```

## 🎯 Classification Examples

### **✅ Complete FloatPrompts**

**Behavioral documents:**
- `floatprompt-0.10.0-alpha.fp` (complete system distribution)
- `voice-guide-creator.fp` (AI behavioral instructions)
- `task-analyzer.md` (AI behavioral instructions)
- Any file with `name`, `description`, and a `metadata.config` behavioral specification

### **✅ Files That Should Be .md (building blocks / docs)**

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
.md building blocks → assembly process → complete FloatPrompt distribution
```

**Template Assembly Example:**
- `src/sys/header.md` + `src/sys/voice.md` + `src/sys/config.md` + `src/shared/footer.md` → `floatprompt-X.X.X.fp`

**Shared Components Architecture:**
- `src/shared/` contains components used across multiple FloatPrompts
- `src/sys/` contains core FloatPrompt system components
- `src/lib/` contains specialized application components
- Build system resolves shared dependencies automatically

### **Ecosystem Signaling**
- **`.fp` extension**: Signals "compiled FloatPrompt distribution" to tooling and AI systems
- **`.md` extension**: The production authoring format for FloatPrompts and the standard for building blocks and documentation

Both extensions carry the same frontmatter shape. The `.fp` extension marks a versioned build artifact; `.md` is what humans author and what most AI platforms ingest with zero configuration.

### **Usage Patterns**
- **Upload a FloatPrompt**: Direct AI upload for behavioral execution (`.md` or `.fp`)
- **Edit .md files**: Human editing of building blocks, documentation, and source FloatPrompts
- **Build process**: Assembles .md components into a versioned `.fp` distribution

## 🏭 FloatPrompt Origination Patterns

### **Primary Origination: Distribution Build Process**
```
src/sys/*.md + src/shared/*.md → scripts/build.mjs → dist/floatprompt-X.X.X.fp
```

**Canonical creation pathway:**
- Template components assembled through build system with shared components
- Output to `dist/` folder as FloatPrompt distributions
- Versioned, tested, and ready for ecosystem distribution

### **Secondary Origination: Downstream Creation**
**FloatPrompts created WITH the main FloatPrompt system:**

1. **Protocol Development**: `dev/update-protocol.fp`, `dev/update-creator.fp`
   - Behavioral instructions for system operations
   - Created using FloatPrompt methodology, become part of development toolkit

2. **Specialized Applications**: Custom domain-specific FloatPrompts
   - Legal analysis protocols, content strategy systems, technical frameworks
   - Generated through FloatPrompt collaboration, saved for reuse

3. **Session Extracts**: Preserved intelligence from FloatPrompt sessions
   - Complex analysis preserved in structured form
   - Collaborative outputs that become standalone executable intelligence

### **Creation Hierarchy**
```
1. Core System → dist/floatprompt-X.X.X.fp (foundational distribution)
2. Applications → dist/voice-guide-creator.fp, etc. (specialized tools)
3. Domain Applications → Custom specialized FloatPrompts
4. Session Intelligence → Extracted collaborative outputs
```

**Key Principle**: FloatPrompts either emerge from the build system OR are created downstream using FloatPrompt methodology. They represent executable intelligence that can flow between AI systems while preserving human intent and context. Every FloatPrompt embodies HI-AI co-creation, where Human Intelligence provides intent, voice, and strategic direction while Artificial Intelligence contributes structure, organization, and systematic execution.

## 🛡️ Validation Criteria

### **Required for FloatPrompt Classification**
- [ ] Contains YAML frontmatter between `---` fences
- [ ] Contains top-level `name` and `description`
- [ ] Contains `metadata.config` with the behavioral specification
- [ ] Contains a `STOP` field inside config with AI behavioral instruction
- [ ] Contains `format: floatprompt` inside config
- [ ] Designed for direct AI upload and execution
- [ ] Represents HI-AI co-creation (Human Intelligence and Artificial Intelligence collaboration)
- [ ] Implements map/score/respond pipeline for systematic input assessment
- [ ] Implements response pattern system with metaphor-based behavioral guidance

### **Disqualifiers for FloatPrompt Classification**
- [ ] Missing frontmatter or missing `metadata.config`
- [ ] Missing `STOP` directive
- [ ] Documentation-only content
- [ ] Building block or partial content
- [ ] No behavioral specifications for AI

## 🎯 Format Recognition

### **Distinguishing Features**
- **Complete FloatPrompts**: Contain `name`, `description`, and a `metadata.config` behavioral specification
- **Plain .md files**: Standard markdown without FloatPrompt behavioral config, or incomplete specifications
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

**Specification establishes the canonical architectural boundary between complete FloatPrompts and all other content (.md building blocks and docs), ensuring clear semantic distinction for AI precision, tooling recognition, and ecosystem clarity.**
