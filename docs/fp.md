# FloatPrompt File Format Specification

**The invisible OS for AI - systematic creation of specialized AI collaboration tools**

## 🎯 Core Definition

### **FloatPrompt Architecture**

FloatPrompt v0.1.0-beta operates as a meta-system - a single OS file that creates specialized tools through conversational emergence rather than pre-built utilities.

#### **Main FloatPrompt OS (.fp.txt)**
- **`floatprompt.fp.txt`** - The core 40KB system with tool creation authority
- **Universal architecture** with conditional complexity (90% simple, 10% voice-critical)
- **Map → Decide → Structure methodology** for systematic AI-human collaboration
- **Tool creation capability** that generates specialized FloatPrompt utilities on demand
- **Cross-platform compatibility** across ChatGPT, Claude, Cursor, and all AI systems

#### **Specialized Library Tools (.fp.txt)**
- **`lib/voice.fp.txt`** - Voice Guide Creator (12KB) for archaeological extraction
- **`lib/format.fp.txt`** - Technical Formatting Guide (12KB) for document creation
- **`lib/blueprint.fp.txt`** - Surgical Assembly Specification Generator (16KB)
- **Purpose-built tools** created by or aligned with the main OS architecture
- **Focused capabilities** with streamlined JSON and specific expertise domains

### **.fp.txt Files: Complete FloatPrompt Documents**

**A `.fp.txt` file is a complete, executable FloatPrompt document that contains:**

1. **FloatPrompt Wrapper**: `<floatprompt>content</floatprompt>` tags
2. **Universal JSON Architecture**: Streamlined frontmatter with conditional field inclusion
3. **System Compatibility**: Either creates tools (main OS) or provides specialized capability (library)
4. **MDS Methodology**: Map Territory → Decide Extractions → Structure Build systematic process
5. **Archaeological Voice Preservation**: Sacred principle maintaining human cognitive fingerprint
6. **Conversational Emergence**: Tools develop through dialogue, not one-shot generation
7. **Cross-Platform Intelligence**: Portable behavioral specifications working across any AI system
8. **Dynamic Versioning**: Built with template variables for consistent version management

**Purpose**: Invisible OS for AI enabling systematic tool creation and human intelligence preservation through structured collaboration

### **System Architecture**

**Main OS Creates:**
- **Simple Tools**: Content creation utilities with minimal JSON (90% of use cases)
- **Voice-Sensitive Tools**: Archaeological extraction with preservation protocols (10% voice-critical)
- **Workflow Tools**: Multi-stage coordination with orchestration logic
- **Coordination Tools**: Reference material and integration protocols

**Conditional Complexity System:**
```json
// Simple tool (most common)
{
  "STOP": "Tool description",
  "meta": {...},
  "human": {...},
  "ai": {...},
  "requirements": {...},
  "integration": {...}
}

// Voice-critical tool (archaeological mode)
{
  // Above fields PLUS:
  "execution": {...},
  "task": {...},
  "domain": {...},
  "source": {...}
}
```

### **.md Files: Building Components and Documentation**

**A `.md` file serves as infrastructure for the system:**

1. **Build Components**: Template files that assemble into the main OS
2. **Documentation**: System guides, principles, and specifications
3. **Template Variables**: Soft-coded placeholders for conversational data
4. **Development Files**: Planning documents and architectural decisions

**Purpose**: Infrastructure and documentation supporting the FloatPrompt system

---

## 🏗️ Technical Architecture

### **6-File Core Structure**

The main OS assembles from clean, focused components:

```
src/sys/
├── header.json          # Universal JSON frontmatter with template variables
├── title.md            # Brand identity and value proposition
├── authority.md        # System authority and operating principles
├── start.md           # Quick start guidance for immediate engagement
├── goals.md           # Three-tier goal hierarchy (Human → AI → Task)
├── context.md         # When/why/how usage guidance
├── output.md          # Expected results and handoff protocols
├── warnings.md        # Limitations and considerations
├── map.md            # Territory mapping methodology
├── decide.md         # Archaeological extraction protocols
├── structure.md      # AI construction guidance (most complex)
├── integration.md    # Tool coordination and ecosystem features
├── quality.md        # Standards and validation requirements
└── footer.md         # Attribution and closing statement
```

### **Build System**

**Template Assembly:**
- **`_template.md`**: Pure injection instructions using `<!-- INJECT: filename -->`
- **Dynamic versioning**: Template variables replaced during build
- **Clean separation**: Template structure vs content vs assembly logic

**Build Process:**
```bash
node scripts/build.mjs
# → dist/floatprompt.fp.txt (40KB main OS)
# → dist/lib/ (specialized tools copied from src/lib/)
```

### **Universal Template System**

**All FloatPrompt tools inherit this architecture:**

```markdown
<floatprompt>
---
{
  "STOP": "{{TOOL_PURPOSE}}",
  "meta": {
    "title": "{{TOOL_NAME}}",
    "id": "{{TOOL_ID}}",
    "type": "{{TOOL_TYPE}}",
    "author": "@mds",
    "contributors": ["@mds", "Claude Sonnet 4"],
    "created": "{{DATE}}",
    "version": "{{VERSION}}",
    "system_version": "floatprompt v{{SYSTEM_VERSION}}",
    "format": "floatprompt",
    "filetype": "fp"
  },
  "human": {
    "intent": "{{HUMAN_INTENT}}",
    "context": "{{USAGE_CONTEXT}}",
    "constraints": "{{LIMITATIONS}}",
    "preferences": {
      "style": "{{COMMUNICATION_STYLE}}",
      "detail_level": "{{COMPLEXITY_LEVEL}}",
      "output_format": "{{EXPECTED_OUTPUT}}"
    }
  },
  "ai": {
    "model": "{{AI_MODEL}}",
    "role": "{{AI_ROLE}}",
    "expertise": "{{DOMAIN_EXPERTISE}}",
    "voice_preservation": "{{PRESERVATION_PROTOCOL}}"
  },
  "requirements": {
    "{{CAPABILITY_DOMAIN}}": {
      "{{SPECIFIC_REQUIREMENT}}": "{{IMPLEMENTATION_DETAIL}}"
    }
  },
  "integration": {
    "floatprompt_ecosystem": "{{ECOSYSTEM_INTEGRATION}}",
    "{{TOOL_AUTHORITY}}": "{{SPECIALIZATION_FOCUS}}"
  }
}
---

# {{Tool Title}}

**{{Authority Statement}}**

*{{Methodology Description}}*

## System Authority
{{Operating Principle and Core Mission}}

## Quick Start Options
{{Natural Language Engagement Patterns}}

## Goals
{{Three-Tier Hierarchy: Primary → Secondary → Tertiary}}

## Context
{{When/Why/How Usage Guidance}}

## Output
{{Expected Results and Quality Standards}}

## Warnings
{{Limitations and Important Considerations}}

## {{Specialized Methodology Section}}
{{Tool-Specific Capabilities and Protocols}}

## Integration Features
{{Ecosystem Coordination and Tool Relationships}}

**{{Closing Authority Statement}}**

*{{Final Positioning and Philosophy}}*

---
© 2025 [@MDS](https://mds.is) | CC BY 4.0
</floatprompt>
```

---

## 🔧 Development Guidelines

### **Creating New Tools**

**Through Main OS (Recommended):**
1. Upload `floatprompt.fp.txt` to AI system
2. Describe your tool requirements in natural language
3. Main OS applies Map → Decide → Structure methodology
4. Tool emerges through conversational development
5. AI creates properly formatted .fp.txt file following universal template

**Direct Development:**
1. Copy universal template structure
2. Replace all `{{TEMPLATE_VARIABLES}}` with actual values
3. Implement tool-specific methodology sections
4. Validate against universal architecture standards
5. Test cross-platform compatibility

### **Quality Standards**

**All FloatPrompt tools must:**
- ✅ Follow universal JSON architecture with conditional complexity
- ✅ Include complete frontmatter with required fields
- ✅ Implement proper wrapping tags `<floatprompt>...</floatprompt>`
- ✅ Reference main OS for archaeological preservation protocols
- ✅ Support cross-platform deployment and session portability
- ✅ Maintain voice preservation authority throughout operations

### **File Organization**

```
floatprompt/
├── dist/
│   ├── floatprompt.fp.txt           # Main OS
│   └── lib/
│       ├── voice.fp.txt             # Voice preservation specialist
│       ├── format.fp.txt            # Technical formatting authority
│       └── blueprint.fp.txt         # Assembly specification generator
├── src/
│   ├── sys/                         # Core OS components
│   └── lib/                         # Specialized tool sources
└── docs/                            # Documentation and guides
```

---

## 🎯 Strategic Vision

### **The Invisible OS for AI**

FloatPrompt operates as invisible infrastructure that transforms any AI system into a more capable collaboration partner while preserving human agency and voice authenticity.

### **Production-Ready Architecture**

- **40KB optimal size** for AI ingestion across all platforms
- **Cross-platform compatibility** verified across ChatGPT, Claude, Cursor
- **Dynamic versioning** with automated build system
- **Clean 6-file architecture** enabling sustainable development and maintenance

### **Systematic Tool Creation**

**Current Tools:**
- Voice preservation and archaeological extraction
- Technical formatting with universal template compliance
- Surgical assembly specifications for complex material reconstruction

**Infinite Extension Potential:**
- Newsletter writers, script creators, analysis tools
- Domain-specific expertise captures
- Workflow orchestration and project management
- Cross-platform AI coordination protocols

**Built through systematic methodology enabling the invisible OS for AI**

*Conversational emergence serves human intelligence preservation through structured collaboration authority.*