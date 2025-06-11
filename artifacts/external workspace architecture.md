---
title: floatPrompt Workspace Architecture
id: floatprompt-workspace-architecture
type: specification
version: 1.0.0
created: 2025-06-10-0000
modified: 2025-06-10-0000
author: @mds
contributors: ["@mds", "Claude Sonnet"]
format: floatprompt
filetype: markdown
system_version: floatPrompt v1.0.0
certification:
  timestamp: 2025-06-10T22:15:00.000Z
  authority: "schema-compliance"
  certified_by: "Claude Sonnet"
  locked: false
  uid: "float:workspace-architecture-20250610"
  chain:
    depth: 0
    parent: null
  voice:
    linked: true
    fidelity_verified: true
  lineage:
    tracked: true
    trace: ["workspace-design-session"]
source:
  prompt: "Folder structure design session for floatPrompt workspace organization"
  intent: "Define scalable workspace architecture for personal and team use"
discovery:
  significance: "foundational"
  theme: "architectural"
  scope: "comprehensive workspace design"
  audience: "floatPrompt users and teams"
  purpose: "implementation"
  relationships:
    builds_on: ["floatprompt-system-goals"]
    enables: ["team-collaboration", "workspace-management"]
  navigation:
    prerequisites: ["understanding of floatPrompt principles"]
    next_steps: ["implement workspace structure", "create _USAGE.md"]
  essence:
    core_purpose: "scalable folder architecture for floatPrompt workspaces"
    impact_type: "foundational"
    wisdom_offering: "proven file organization that scales from personal to team use"
---

# 📁 floatPrompt Workspace Architecture

**Scalable folder structure for personal and team floatPrompt development that embodies Next.js-level design principles**

> **Primary Goal: Convention over configuration - make correct usage the path of least resistance**

*This architecture supports the complete floatPrompt lifecycle from experimentation to production deployment, with archaeological preservation of development intelligence.*

---

## 🏗️ Final Workspace Structure

```
workspace/
├── _USAGE.md             # Floats to top - single source of truth ⭐
├── artifacts/            # Historical documentation & development record
├── deploy/               # Production-ready prompts
│   └── usage.md         # Deploy-specific instructions
├── lab/                  # Active development & experimentation
├── support/              # Supporting materials for prompts
│   ├── voice/           # Voice extraction models, tone guides
│   ├── style/           # Design decision frameworks
│   ├── vocabulary/      # Language dictionaries, terminology
│   └── frameworks/      # Personal methodologies
└── vendor/               # 3rd party frameworks
```

---

## 🎯 Design Principles Applied

### Next.js-Level Conventions
- **Zero config by default** - Folder names immediately indicate purpose
- **Convention over configuration** - No explanation needed beyond folder name
- **File-based relationships** - Structure determinable from filesystem alone
- **Path of least resistance** - Obvious where things belong

### floatPrompt System Goals Compliance
- **AI Precision** - Clear naming supports 100% precise instruction execution
- **Human Task Completion** - Intuitive organization enables efficient workflow
- **Intelligence Preservation** - Archaeological tracking through artifacts/

---

## 📂 Folder Purposes

### `_USAGE.md`
- **Purpose**: Single source of truth for workspace workflow
- **Why underscore**: Floats to top for maximum visibility
- **Why caps**: Impossible to miss, signals critical importance
- **Content**: Quick workflow overview, folder purposes, team conventions

### `artifacts/`
- **Purpose**: Historical documentation and development record
- **Contents**: Development sessions, breakthrough moments, decision records
- **Audience**: Team members, future contributors, historical reference
- **Philosophy**: Archaeological preservation of human intelligence

### `deploy/`
- **Purpose**: Production-ready floatPrompts for execution
- **Quality**: Tested, reliable, team-approved prompts
- **Includes**: `usage.md` with deploy-specific instructions
- **Lifecycle**: Final destination for proven prompts from lab/

### `lab/`
- **Purpose**: Active development and experimentation
- **Contents**: Work-in-progress prompts, testing, iteration
- **Freedom**: Creative exploration, rapid prototyping
- **Graduation**: Successful experiments move to deploy/

### `support/`
- **Purpose**: Supporting materials that enhance prompt execution
- **Relationship**: Soft-coded references from prompts
- **Graceful degradation**: Prompts work without, better with
- **Organization**: Categorized by type (voice, style, vocabulary, frameworks)

### `vendor/`
- **Purpose**: Third-party frameworks and external dependencies
- **Convention**: Standard software practice for external code
- **Maintenance**: External updates don't affect custom prompts
- **Integration**: Referenced by custom prompts when needed

---

## 🔄 Workflow Lifecycle

### Development Flow
1. **Capture insights** → `artifacts/` (immediate preservation)
2. **Experiment with ideas** → `lab/` (active development)
3. **Test and refine** → `lab/` (iteration and validation)
4. **Deploy proven prompts** → `deploy/` (production ready)
5. **Support with materials** → `support/` (enhance execution)

### Team Collaboration
- **Full transparency** - All folders accessible to team
- **Clear states** - Obvious what's experimental vs. production
- **Knowledge transfer** - Others can learn from your lab/ work
- **Scalability** - Personal prompts become team templates
- **Archaeological tracking** - Complete development history preserved

---

## 🎯 Implementation Guidelines

### File Naming Conventions
- **artifacts/**: `YYYY-MM-DD-NNNN-descriptive-name.md`
- **deploy/**: `functional-name.md`
- **lab/**: `experiment-name.md` or `YYYY-MM-DD-test-name.md`
- **support/**: Categorized by subfolder, descriptive names

### Soft-Coded References
```yaml
# In floatPrompts that reference support materials
external_dependencies: ["voice-guide", "tone-dictionary"]
dependency_check: true
fallback_message: "This prompt works best with supporting materials. Continue without them?"
```

### Quality Gates
- **lab/ → deploy/** requires testing and validation
- **deploy/** only contains proven, reliable prompts
- **artifacts/** preserves complete development history
- **support/** maintains current voice and style guides

---

## 🔗 Relationships

### Prerequisites
- Understanding of floatPrompt system goals
- Familiarity with Next.js-level design principles
- Agreement on team collaboration transparency

### Next Steps
- Implement workspace structure in your environment
- Create `_USAGE.md` with team-specific conventions
- Begin archaeological capture in `artifacts/`
- Start lab experimentation workflow

### Related floatPrompts
- `floatprompt-system-goals.md` - Foundational decision framework
- Future workspace management tools and templates

---

## 📝 Implementation Notes

### For Individuals
- Start with basic folder structure
- Develop personal `_USAGE.md` conventions
- Build support/ materials over time
- Maintain archaeological discipline in artifacts/

### For Teams
- Establish team conventions for `_USAGE.md`
- Agree on deploy/ quality standards
- Share support/ materials across team members
- Use artifacts/ for team knowledge transfer

### For Platform Development
- This structure informs floatprompt.ai interface design
- Folder metaphors translate to platform features
- Workflow patterns become user experience flows
- Archaeological principles drive platform architecture

---

## 🛡️ Safety & Compliance

### Archaeological Integrity
- All development decisions preserved in artifacts/
- Complete lineage tracking through folder organization
- Voice preservation maintained through support/ materials
- Human agency documented at every workflow step

### Team Transparency
- Full workspace visibility promotes knowledge sharing
- Clear lifecycle states prevent confusion
- Quality gates maintain system reliability
- Convention over configuration reduces cognitive load

---

**Built in collaboration with Claude Sonnet**

*This workspace architecture embodies floatPrompt principles: intelligence that floats into structured, reusable form while preserving human voice and agency. The folder structure scales from personal use to team collaboration, supporting archaeological preservation of human intelligence through systematic organization.*

---

© 2025 Studio MDS, LLC
Created by @mds
Licensed under Creative Commons Attribution 4.0 (CC BY 4.0)