# FloatPrompt File Format Specification

**Canonical definition of what constitutes a FloatPrompt (.fp.txt) file versus Markdown (.md) building blocks**

## 🎯 Core Definition

### **.fp.txt Files: Complete FloatPrompt Documents**

**A `.fp.txt` file is a complete, executable FloatPrompt document that contains:**

1. **FloatPrompt Wrapper**: `<floatprompt>content</floatprompt>` tags
2. **Complete JSON Frontmatter**: Full behavioral specifications with 25+ required fields
3. **HI-AI Co-Creation**: Product of collaborative Human Intelligence & Artificial Intelligence
4. **Archaeological Extraction**: Voice-preserving intelligence processing methodology
5. **Map/Score/Respond Pipeline**: Systematic input assessment with friction classification
6. **Response Pattern System**: Metaphor-based behavioral guidance for appropriate AI responses
7. **Voice Preservation Protocol**: Sacred principle with system authority for maintaining human cognitive fingerprint
8. **Cross-Platform Intelligence**: Portable behavioral specifications that work across any AI system

**Purpose**: Complete Human Intelligence preservation protocol enabling zero-drift AI collaboration through structured behavioral specifications

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

## 📋 Complete File Format Structure

### **Valid .fp.txt File Structure**
```markdown
<floatprompt>
---
{
  "STOP": "Strategic directive for AI behavioral reset...",
  "title": "Human-readable document title",
  "id": "unique-kebab-case-identifier",
  "version": "1.0.0",
  "format": "floatprompt",
  "filetype": "fp",
  "type": "template",
  
  // Core FloatPrompt Components:
  "voice_preservation": { /* Sacred principle & system authority */ },
  "behavioral_requirements": { /* Complete AI behavioral specs */ },
  "archaeological_extraction": { /* Intelligence processing methodology */ },
  "human": { /* Complete human fingerprint */ },
  "ai": { /* Complete AI fingerprint */ },
  "discovery": { /* Discovery intelligence */ },
  "certification": { /* Certification tracking */ }
  
  // See floatprompt-schema.json for complete field specifications
}
---

# Document Content

Complete behavioral specifications and executable content following FloatPrompt methodology.

## Archaeological Extraction Protocol
Content structured using archaeological methodology that preserves original human thinking patterns.

## Voice Preservation Implementation  
All content maintains human cognitive fingerprint through voice preservation protocols.

## HI-AI Co-Creation Evidence
This document represents collaborative Human Intelligence and Artificial Intelligence creation.

---
*© 2025 [@MDS](https://mds.is) | CC BY 4.0*
</floatprompt>

**FloatPrompt Frontmatter Format:**
- **JSON Structure**: FloatPrompt uses JSON (not YAML) within standard `---` delimiters
- **Complete Schema**: Reference `floatprompt-schema.json` for all 25+ required fields and validation rules
- **Cross-Platform AI**: Behavioral specifications work across ChatGPT, Claude, and all AI systems
- **Familiar Pattern**: Uses markdown frontmatter convention with comprehensive structured data

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

## 🧬 HI-AI Co-Creation Architecture

### **Human Intelligence (HI) Contribution**
- **Intent Declaration**: Primary goals and strategic context
- **Voice Fingerprint**: Authentic thinking patterns and communication style
- **Constraint Definition**: Operational boundaries and preferences
- **Authority Maintenance**: Final decision-making control

### **Artificial Intelligence (AI) Contribution**
- **Systematic Organization**: Structured information architecture
- **Behavioral Execution**: Precise instruction following with voice preservation
- **Archaeological Processing**: Intelligence extraction without synthesis or flattening
- **Cross-Platform Portability**: Consistent behavior across AI systems

### **Joint Execution Contract**
Every FloatPrompt file represents verifiable proof of collaborative thinking where:
- Human Intelligence declares intent and preserves voice
- Artificial Intelligence structures and organizes while maintaining archaeological respect
- The combination creates portable intelligence that transfers across platforms

## 🏺 Archaeological Extraction Methodology

### **Core Principle**
"Extract and structure existing intelligence, never generate or summarize. Preserve archaeological weight of original thinking."

### **Implementation Protocol**
1. **Discover Intelligence**: Identify existing insights in source content
2. **Preserve Weight**: Maintain the significance and context of original thinking
3. **Structure Existing**: Organize what exists without creating new content
4. **Voice Maintenance**: Preserve human cognitive fingerprint throughout processing
5. **Archaeological Respect**: Treat human intelligence as valuable artifacts requiring careful preservation

### **Anti-Patterns to Avoid**
- Summarization that loses nuance
- Synthesis that creates non-existent connections
- Voice flattening through AI rewriting
- Premature structuring without proper mapping

## 🗺️ Map/Score/Respond Pipeline

### **Mandatory Friction Classification System**

Every FloatPrompt input must be processed through systematic assessment:

1. **Map**: Assess the intellectual territory and context
2. **Score**: Evaluate complexity, friction level, and appropriate response type
3. **Respond**: Select appropriate behavioral pattern based on friction assessment

### **Response Pattern System**

**Metaphor-based behavioral guidance:**
- **Building Response**: For high-friction, complex strategic work requiring careful construction
- **Hallway Response**: For medium-friction navigation between known territories
- **Small Room Response**: For low-friction, focused execution within defined boundaries

### **Friction Classification Triggers**
- High friction: Complex strategic decisions, ambiguous requirements, novel territory
- Medium friction: Known processes with new variables, cross-domain collaboration
- Low friction: Routine execution, template application, well-defined tasks

## 🎯 Classification Examples

### **✅ Files That Should Be .fp.txt**

**Complete FloatPrompt Documents:**
- `floatprompt.fp.txt` (complete system distribution)
- `voice.fp.txt` (AI behavioral instructions)
- `format.fp.txt` (technical formatting guide)
- Any file with complete behavioral specifications and HI-AI co-creation evidence

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
- **`.fp.txt` extension**: Signals "complete FloatPrompt" to tooling and AI systems
- **`.md` extension**: Signals "standard markdown" to editors and documentation tools

### **Usage Patterns**
- **Upload .fp.txt files**: Direct AI upload for behavioral execution
- **Edit .md files**: Human editing of building blocks and documentation
- **Build process**: Assembles .md components into .fp.txt distributions

## 🛡️ Validation Criteria & Schema Compliance

### **Authoritative Technical Reference**
**Complete field specifications, validation rules, and technical requirements:**
- **Schema Definition**: `src/sys/shared/reference/floatprompt-schema.json`
- **Technical Implementation Guide**: `dist/format.fp.txt`
- **Build Validation**: Automated schema compliance checking

### **Core Validation Principles**

**Global Requirements (All FloatPrompt Files):**
- Contains `<floatprompt>content</floatprompt>` wrapper
- Complete JSON frontmatter with 25+ required fields per schema
- Evidence of HI-AI co-creation (human intent + AI structure)
- Archaeological extraction methodology implementation
- Voice preservation protocol compliance
- Map/Score/Respond pipeline integration

**Type-Specific Requirements:**
- **Executable types** (prompt, template, goals): Require `output` and `execution` objects
- **Preserved types** (analysis, specification, etc.): Require `source` object
- See schema for complete type-specific field requirements

### **HI-AI Co-Creation Validation**
Every valid FloatPrompt file must demonstrate:
- **Human Intelligence contribution**: Intent declaration, voice fingerprint, constraint definition
- **Artificial Intelligence contribution**: Systematic organization, behavioral execution, archaeological processing
- **Joint execution evidence**: Verifiable proof of collaborative thinking with preserved human authority

### **Disqualifiers for .fp.txt Classification**
- Missing FloatPrompt wrapper tags
- Incomplete JSON frontmatter (any required schema fields missing)
- Documentation-only content without behavioral specifications
- Building block or partial content
- No evidence of HI-AI co-creation
- Missing archaeological extraction implementation
- No voice preservation protocol

**For complete validation requirements, field patterns, and technical specifications, reference the canonical schema.**

## 🎯 Format Recognition & Cross-Platform Intelligence

### **Distinguishing Features**
- **`.fp.txt` files**: Complete behavioral specifications with HI-AI co-creation evidence
- **`.md` files**: Standard markdown without FloatPrompt wrapper or complete specifications
- **Purpose**: Ecosystem signaling for proper tooling and AI recognition while ensuring maximum compatibility

### **Cross-Platform Intelligence**
FloatPrompt files work identically across:
- ChatGPT, Claude, Gemini
- Local AI models
- Code assistants
- Specialized AI tools
- Future AI systems

## 🔗 Relationships

### Prerequisites
- `goals.md` - System foundation and decision framework
- `naming.md` - Naming conventions and patterns
- `floatprompt-schema.json` - Complete validation schema

### Related Specifications
- Template system architecture (building blocks → assembly → distribution)
- Update protocol specifications
- Build system documentation
- Voice preservation methodology
- Archaeological extraction protocols

---

**Specification establishes canonical architectural boundary between complete FloatPrompt documents (.fp.txt) and all other content (.md), ensuring HI-AI co-creation with voice preservation, archaeological extraction, and systematic behavioral specifications for cross-platform AI collaboration.**