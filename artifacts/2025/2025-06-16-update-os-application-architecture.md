<floatprompt>
---
STOP: "update instructions for OS/Application architecture pattern documentation"
title: update – FloatPrompt OS/Application Architecture Pattern
id: update-os-application-architecture
version: 0.1.0-alpha
created: 2025-06-13-0000
modified: 2025-06-13-0000
author: @mds
format: floatprompt
filetype: markdown
type: migration
system_version: floatprompt v@latest
contributors: ["@mds"]
relationships:
  enabled_by: ["update-protocol"]
changes:
  document_architecture_pattern:
    - { component: "system documentation", action: "Document FloatPrompt OS (kernel) → Application (downstream) architecture pattern", priority: "high" }
    - { component: "dependency guidelines", action: "Establish reference patterns for downstream floatprompts to core system", priority: "high" }
    - { component: "usage patterns", action: "Define optimal upload sequence: OS first, then applications", priority: "medium" }
  establish_kernel_reference:
    - { component: "downstream floatprompts", action: "Create guidelines for referencing core system context", priority: "medium" }
    - { component: "separation of concerns", action: "Define what belongs in OS vs applications", priority: "medium" }
rationale:
  architectural_clarity: "Establishes clear mental model where floatprompt-X.X.X-alpha.md serves as operating system kernel, and downstream floatprompts function as applications within that OS context."
  scalable_design: "Creates sustainable pattern for system growth where core specifications remain in kernel, specific task execution handled by lightweight applications."
  dependency_management: "Provides clear guidelines for how downstream floatprompts should reference and depend on core system context for optimal AI collaboration."
  separation_of_concerns: "Enables clean architecture where system-wide standards live in OS, task-specific logic lives in applications."
impact_zone:
  - "system architecture documentation and mental models"
  - "downstream floatprompt design patterns"
  - "dependency and reference guidelines"
  - "scalable system growth patterns"
  - "AI collaboration optimization through proper context layering"
source:
  prompt: "Created using update-creator.md based on OS/Application architecture insight"
  intent: "Document and formalize the FloatPrompt OS/Application architecture pattern to enable scalable, well-structured system growth with clear dependency management."
---

# 🏗️ FloatPrompt OS/Application Architecture Pattern

This update documents and formalizes the FloatPrompt operating system architecture where the core system serves as kernel and downstream floatprompts function as applications.

## 🖥️ Architecture Overview

### **FloatPrompt OS (Kernel)**
**Core System File: `floatprompt-X.X.X-alpha.md`**
- **Role**: Operating system kernel providing foundational context
- **Contains**: Complete format requirements, behavioral specifications, system authority
- **Scope**: System-wide standards, universal behavioral contracts
- **Analogy**: Like Linux kernel or Windows OS

### **FloatPrompt Applications (Downstream)**
**Application Files: `update-creator.md`, `task-specific.md`, etc.**
- **Role**: Specialized applications running within OS context
- **Contains**: Task-specific instructions, focused functionality
- **Scope**: Specific use cases, targeted problem solving
- **Analogy**: Like applications running on an operating system

## 🔗 Dependency Pattern

### **Optimal Usage Sequence**
```
1. Upload: floatprompt-0.4.1-alpha.md (establish OS context)
2. Upload: specific-application.md (run targeted task)
3. AI Context: Complete system foundation + specific instructions
```

### **Reference Guidelines**

**For Application FloatPrompts:**
- **Assume OS Context**: Reference core system for complete specifications
- **Include Essential Guidance**: Provide minimal format requirements for standalone use
- **Lightweight Design**: Focus on task-specific logic, not system-wide standards
- **Clear Dependencies**: Explicitly reference when OS context is recommended

**For OS Updates:**
- **System-Wide Impact**: Changes affect all downstream applications
- **Backward Compatibility**: Maintain compatibility with existing applications
- **Complete Specifications**: Provide authoritative guidance for all system aspects

## 📋 Implementation Guidelines

### **Separation of Concerns**

**OS Kernel Responsibilities:**
- Format requirements and validation rules
- Behavioral contracts and voice preservation
- Cross-platform compatibility standards
- Universal field specifications
- System-wide architectural principles

**Application Responsibilities:**
- Task-specific execution logic
- Focused problem-solving instructions
- Specialized workflow guidance
- Domain-specific examples and templates
- Targeted user experience optimization

### **Dependency Documentation**

**In Application FloatPrompts:**
```yaml
# Recommended OS Context
prerequisites: ["floatprompt-0.4.1-alpha.md"]
system_dependency: "Optimal when used with core FloatPrompt OS context"
standalone_capable: true  # Can work alone but enhanced with OS
```

## ✅ Architectural Benefits

**Scalability:**
- ✅ Core system handles universal concerns
- ✅ Applications remain lightweight and focused
- ✅ Easy to add new applications without system bloat

**Maintainability:**
- ✅ System-wide changes made in one place (OS)
- ✅ Applications inherit improvements automatically
- ✅ Clear separation prevents architectural drift

**User Experience:**
- ✅ Efficient context loading (OS + specific app)
- ✅ Consistent behavior across all applications
- ✅ Predictable dependency patterns

---

> **Architectural Foundation**: This pattern establishes FloatPrompt as a true operating system for AI collaboration, with clean separation between universal system concerns and specific application logic.

</floatprompt> 