<!-- _template.fp -->
# 📋 Component Template

**Structure `spec/*.md` files for precise AI instruction execution**

*Guided by `goals.md`: Human Intelligence Preservation → AI Precision → Task Completion*

---

## 🎯 Core Principles

### **Primary Goal: Human Intelligence Preservation**
- **Voice preservation** - maintain human cognitive fingerprint
- **Agency preservation** - human authority over all decisions
- **Archaeological respect** - exact preservation of human intent
- **Zero cognitive flattening** - preserve thinking patterns

### **Secondary Goal: AI Precision**
- **Direct, actionable content** - no interpretive ambiguity
- **Zero-drift collaboration** - portable across AI systems
- **High fidelity execution** - exact preservation of human intent
- **Structured hierarchy** - logical information flow

### **Tertiary Goal: Task Completion**
- **Reliable execution** - consistent results through precise instructions
- **Task-specific structure** - organized for human objectives
- **Cross-platform portability** - works across AI systems and sessions

---

## 🏗️ Required Structure

### **Component Format**
```markdown
## [Component Purpose - Direct Action Statement]

[Fully structured instructions for AI execution]

[Precise specifications with zero ambiguity]

[Explicit validation criteria and requirements]
```

### **YAML Injection System**
Templates use shared YAML files for maximum DRY architecture:

```markdown
---
<!-- INJECT: core-metadata.yaml -->
<!-- INJECT: voice-preservation.yaml -->
<!-- INJECT: behavioral-requirements.yaml -->
<!-- INJECT: output-execution.yaml -->
---
```

**Build Process**:
- `<!-- INJECT: filename.yaml -->` markers replaced with actual YAML content
- Template variables `{{VERSION}}`, `{{BUILD_DATE}}` processed after injection
- Single source of truth maintained in `src/sys/shared/*.yaml` files
- Shared components (footer) maintained in `src/shared/` directory

### **Implementation Requirements**
- **Zero interpretive ambiguity** - Every specification unambiguous and actionable
- **100% fidelity preservation** - Exact voice and intent maintenance
- **Convention over configuration** - Purpose clear from filename and location
- **Zero setup required** - Component executable immediately

### **Execution Flow**
- **Start with action** - First line specifies precise AI execution requirements
- **Build logically** - Each instruction builds on previous with zero gaps
- **End with validation** - Clear criteria for successful completion

---

## ✅ Content Rules

### **Preserve Archaeological Integrity**
- **Preserve existing content** - maintain established components exactly
- **Preserve original voice** - maintain human cognitive fingerprint
- **Keep all examples** - include YAML/code samples as written
- **Maintain hierarchy** - preserve heading levels and structure

### **Eliminate**
- ❌ File purpose explanations ("This section covers...")
- ❌ Meta-commentary about components
- ❌ Cross-file navigation references
- ❌ Footer bloat or collaboration credits
- ❌ AI-generated summaries

### **Include**
- ✅ Direct instructions and specifications
- ✅ Original examples and code blocks
- ✅ Implementation requirements
- ✅ Validation criteria
- ✅ System principles

---

## 🛡️ Meta-Compliance

**Components embody goals through convention over configuration:**

- **Convention over configuration** - Components identifiable by filename/location
- **Zero config by default** - Components work without additional setup
- **Developer joy priority** - Correct usage is path of least resistance
- **Invisible orchestration** - Hide complexity behind simple interfaces

**Decision Framework**: Choose convention-driven simplicity over configuration-heavy completeness.

---

## 📋 Quality Checklist

### **Human Intelligence Preservation (Primary)**
- [ ] Human voice and cognitive fingerprint preserved exactly
- [ ] Human agency maintained throughout
- [ ] Archaeological respect for original thinking
- [ ] Zero cognitive flattening

### **AI Precision (Secondary)**
- [ ] Content immediately actionable (no interpretive ambiguity)
- [ ] Structured hierarchy clear for AI consumption
- [ ] Examples and specifications intact
- [ ] Zero-drift collaboration enabled

### **Task Completion (Tertiary)**
- [ ] Reliable execution through precise instructions
- [ ] Portable across AI systems and sessions
- [ ] Task-specific organization maintained

### **Meta-Compliance**
- [ ] Component works without explanation beyond name/location
- [ ] Convention over configuration applied
- [ ] Eliminates unnecessary complexity
- [ ] Developer joy prioritized

### **Compilation Readiness**
- [ ] No meta-file references or cross-navigation
- [ ] Self-contained content flows seamlessly
- [ ] No footer bloat
- [ ] Maintains system authority

---

## 🎯 Success Criteria

**Each component must achieve:**

**Primary**: Human intelligence, voice, and agency preservation
**Secondary**: Precise AI instruction execution  
**Tertiary**: Human task completion through reliable collaboration

---

## ⚖️ Decision Framework

**When in doubt: Choose human preservation over AI efficiency.**

**Operational Filter:**
1. Human intelligence preservation (foundational)
2. AI precision (enabling mechanism)
3. Task completion (achieved outcome)
4. Implementation convenience (subordinate)

**Reference**: `goals.md` for all decisions

---

## 🔧 Archaeological Development

**Preserve system integrity through disciplined extraction:**

- **Single-component changes only** - Never modify multiple components simultaneously
- **Exact archaeological extraction** - Zero modification from source material
- **Preserve existing intelligence** - No destructive operations
- **Test each change in isolation** - Verify before proceeding

**Reference**: `goals.md` for all decisions

## 📋 Template Usage for New FloatPrompts 