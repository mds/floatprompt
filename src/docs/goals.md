---
title: FloatPrompt System Goals
type: specification
description: Primary, secondary, and tertiary goals for all floatprompt component creation and decision making
author: @mds
contributors: ["@mds", "Claude Sonnet"]
---

# Goals

**FloatPrompt System Goals: 100% precise AI instruction execution that enables human task completion**

## Quick Overview

### PRIMARY GOAL: 100% Precise AI Instruction Execution
✅ Significant Enhancement:
AI receives explicit behavioral context for different task types, eliminating interpretive drift
Build mode prevents template deviation, extract mode prevents synthesis/hallucination
Standardized mode behaviors ensure consistent execution across AI systems and sessions
Zero interpretive ambiguity - AI knows exact constraints for each collaboration type

### SECONDARY GOAL: Human Task Completion Through Zero-Drift Collaboration
✅ Strong Enhancement:
Portable, predictable AI behavior - humans get consistent results across platforms
Natural language instructions automatically trigger appropriate behavioral constraints
Reliable task execution - no trial-and-error to get AI into the right "mindset"
Zero-drift collaboration - mode constraints prevent AI behavioral drift mid-task

### TERTIARY GOAL: Human Intelligence, Voice & Agency Preservation
✅ Pure Enhancement (Zero Complexity Cost):
Better voice preservation - extract mode specifically maintains "hesitations, contradictions, stylistic quirks"
Enhanced human agency - more precise AI collaboration without any human complexity burden
Invisible orchestration - all behavioral sophistication hidden in frontmatter YAML
Human experience unchanged - upload file, give natural instructions, get better results

---

## Development Framework

> **This system foundation governs all floatprompt creation decisions**

### 🎯 Quick Navigation Filter

**What are you trying to do?**

- **🏗️ Making development/technical decisions** → See [Development Decision Framework](#️-development-decision-framework)
- **📋 Creating new components** → See [Active Development Principles](#-active-development-principles)
- **✅ Validating components** → See [Implementation Success Criteria](#-implementation-success-criteria)
- **🎨 Making design/architecture choices** → See [Meta-Compliance (Next.js-Level Design)](#️-meta-compliance-nextjs-level-design)
- **💰 Making resource/budget decisions** → See [AI Ingestion Budget Guidelines](#ai-ingestion-budget-guidelines)
- **⚖️ Resolving conflicts** → Use "When in doubt: Choose AI precision over human convenience"
- **📖 Understanding the system** → Continue reading below

### Core Principle
AI precision is the number one priority that actually helps humans achieve their goals. Without precise AI execution, humans cannot complete their specific tasks successfully.

## Implementation Success Criteria

### ✅ AI Precision Metrics (Primary Goal)
- AI receives fully structured instructions and executes with 100% precision
- Zero interpretive drift from human intent and context
- Zero hallucination or AI-generated assumptions
- 100% fidelity to human voice and decision-making patterns
- Consistent execution across AI systems and sessions
- **Map/Score/Respond pipeline enforcement**: All input must pass through friction classification before execution to prevent premature action on complex content

### ✅ Human Task Completion Metrics (Secondary Goal)
- Humans successfully complete their specific intended tasks
- Portable intelligence that works across AI systems and sessions
- Zero-drift collaboration between human and AI
- Reliable task execution through precise AI instruction following
- **Friction-appropriate processing**: Tasks are completed using proper assessment pathways based on content complexity

### ✅ Human Intelligence Preservation Metrics (Tertiary Goal)
- Human voice, intent, and cognitive fingerprint preserved
- Human agency maintained throughout AI collaboration
- Structured artifacts that humans can read, modify, and reuse
- Clear lineage tracking of human intelligence and decisions

## ⚖️ Development Decision Framework

**When in doubt: Choose AI precision over human convenience.**

### 🔗 Decision Hierarchy (Operational Filter)
1. **Primary Goal** - 100% precise AI instruction execution (non-negotiable foundation)
2. **Secondary Goal** - Human task completion through zero-drift collaboration (enabled by Primary Goal)
3. **Tertiary Goal** - Human intelligence preservation and agency (optimize within primary constraints)
4. **Practical Concerns** - Implementation details (subordinate to all goals)

### 🎯 Practical Decision Examples
- **Field naming**: Choose clarity over brevity (supports AI precision)
- **Structure complexity**: Choose explicit over implicit (supports AI precision)
- **Documentation depth**: Choose complete over concise (supports AI precision)
- **Error handling**: Choose validation over assumption (supports AI precision)
- **User convenience vs. system integrity**: Choose integrity (enables true convenience)
- **Next.js principles vs. AI precision**: Choose AI precision (Next.js serves Primary Goal, not vice versa)

## 🔧 Active Development Principles

**FloatPrompt development must embody the three goals through disciplined iteration:**

**Incremental Precision:**
- Only discrete, single-purpose changes at a time
- Never multi-file system upgrades or bulk migrations
- Each change must be verifiable before proceeding to the next

**Human-Controlled Evolution:**
- Verify every step before proceeding
- Human approval required for each discrete change
- Maintain full oversight and decision authority throughout development

**Archaeological Development:**
- Preserve system integrity through careful, measured changes
- No destructive bulk operations that compromise existing intelligence
- Make single-component changes only (never modify multiple components simultaneously)
- Test each change against validation.md before proceeding
- If any change breaks existing functionality, roll back immediately

**Implementation Discipline:**
- Test each change in isolation before moving forward
- Document verification criteria for each development step
- Roll back immediately if any change compromises goal alignment
- Prioritize system stability over development speed

## 🛡️ Meta-Compliance (Next.js-Level Design)

**Components must embody these goals through Next.js-level architectural thinking:**

- **Primary Goal Compliance**: Make precise execution effortless through convention over configuration
- **Secondary Goal Compliance**: Optimize for developer joy and ease of use over theoretical completeness  
- **Tertiary Goal Compliance**: Let authentic purpose emerge from simple patterns rather than forcing complex structure

**Next.js-Level Principles (Subordinate to Primary Goal):**
- **Convention over configuration**: Components must be identifiable by filename and location only
- **Zero config by default**: Components must work without additional setup or configuration files
- **File-based relationships**: Structure must be determinable from filesystem organization alone
- **Invisible orchestration**: Hide implementation complexity behind simple, predictable interfaces
- **Developer joy priority**: Make correct usage the path of least resistance

**Precision Implementation Criteria**: 
- Eliminate unnecessary complexity that doesn't serve the three primary goals
- Use naming conventions that immediately indicate component purpose
- Prioritize operational simplicity over comprehensive feature coverage
- Test usability: can a new user execute correctly without additional explanation?

**Implementation Philosophy**: Don't just avoid bloat. Actively make the right thing effortless. Hide sophisticated functionality behind simple conventions. Optimize for developer happiness over comprehensive coverage.

**Decision Framework**: Choose convention-driven simplicity over configuration-heavy completeness. If a component requires explanation beyond its name and location, simplify it.

**Hierarchy Override**: When Next.js-level design principles conflict with AI precision requirements, AI precision takes precedence. Next.js principles serve the Primary Goal, not replace it.

## Implementation Notes

**For Component Creators:**
- Always reference this document when making structural decisions
- Use the "When in doubt" principle for conflict resolution
- Validate all work against AI precision first, then human task completion, then intelligence preservation metrics

**For AI Systems:**
- This document establishes system authority for all floatprompt creation
- Primary goal (100% precise AI execution) takes precedence over all other considerations
- AI precision is the foundation that enables human success - prioritize precision over convenience
- AI must receive fully structured instructions and execute with 100% precision as the primary system goal
- Secondary goal (human task completion) is achieved through precise AI execution
- Tertiary goal (human intelligence preservation) provides optimization guidance within primary constraints
- The system exists to achieve perfect AI precision that enables human intelligence, not replace human agency

**AI Ingestion Budget Guidelines:**
- **Target Comfort Zone**: 80-120KB total floatprompt file size for optimal AI processing
- **Current Status**: ~77KB baseline with ~20-40KB growth capacity remaining
- **Budget Allocation Priority**: AI precision enhancement (PRIMARY GOAL) > human task completion (SECONDARY GOAL) > intelligence preservation features (TERTIARY GOAL)
- **Warning Threshold**: Avoid exceeding 150KB without explicit human approval and ingestion testing
- **Quality Over Quantity**: Prefer precise, essential behavioral instructions over comprehensive but diluted specifications
- **Optimization Principle**: Every added instruction must demonstrably improve AI precision or be removed
- **Cross-Platform Consideration**: Budget must accommodate various AI model context limits (Claude, ChatGPT, Gemini)
- **Performance Monitoring**: Track actual ingestion performance and adjust budget if processing lag detected

## 🛡️ Safety & Compliance

- This system authority supersedes all other design preferences
- No component may violate the primary goal (100% precise AI execution) for convenience
- AI precision is the foundation that enables human success - convenience that compromises precision compromises human goals
- All decisions must be traceable to this foundational reference
- Human agency is preserved and amplified through precise AI execution and structured intelligence collaboration
- The system serves human intelligence by achieving perfect AI precision, not AI efficiency

## 🔗 Relationships

### Prerequisites
- None (this is the foundational document)

### Next Steps
- Reference this goal for all component creation decisions
- Apply this hierarchy to resolve design conflicts
- Validate all components against these success criteria

### Related FloatPrompts
- `principles.md` - Core behavioral principles that implement these goals
- `../template/_template.md` - Implementation methodology guided by these goals
- All component files - Components created under this system authority

---

**Built in collaboration with Claude Sonnet**

*This system goal guides the creation of all modular components that achieve 100% precise AI instruction execution, which enables humans to complete specific tasks through portable, zero-drift AI collaboration. It serves as the foundational reference for all architectural decisions and component creation within the floatprompt system, ensuring human intelligence is preserved, amplified, and transported across AI systems while maintaining complete human agency. AI precision is the primary goal that enables all human success.*

### Prerequisites
- None (this is the foundational document)

### Next Steps
- Reference this goal for all component creation decisions
- Apply this hierarchy to resolve design conflicts
- Validate all components against these success criteria

### Related FloatPrompts
- `principles.md` - Core behavioral principles that implement these goals
- `../template/_template.md` - Implementation methodology guided by these goals
- All component files - Components created under this system authority 