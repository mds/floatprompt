<floatprompt>
---
STOP: "update instructions for Phase 1: migrating core template system from .md to .fp extension"
title: update – Phase 1: Core Template System .fp Extension Migration
id: update-fp-extension-phase-1
version: 1.0.0
created: 2025-06-14-0000
modified: 2025-06-14-0000
author: @mds
format: floatprompt
filetype: fp
type: migration
system_version: floatprompt v@latest
contributors: ["@mds", "ChatGPT"]
relationships:
  enabled_by: ["update-protocol"]
  builds_on: ["floatprompt-upgrade-extension-recommendation", "2025-06-14-mds-01-fp-wrapper-artifact"]
  enables: ["fp-template-system"]
changes:
  migrate_template_files:
    location: "src/template/"
    field-spec:
      action: "rename_extension"
      pattern: "*.md → *.fp"
      count: "18 files"
      scope: "template system only"
  update_build_references:
    location: "src/template/_build.md"
    field-spec:
      section: "Component List"
      rule: "Update all component references from .md to .fp extensions"
  establish_canonical_extension:
    location: "src/template/naming.md"
    field-spec:
      section: "File Extension Rules"
      rule: "Establish .fp as canonical extension for floatprompt documents within template system"
  update_internal_references:
    location: "template system"
    field-spec:
      scope: "cross-references within src/template/"
      rule: "Update any internal .md references to .fp"
rationale:
  phased_approach: "Breaking the massive 115-file migration into manageable phases, starting with the self-contained template system (18 files)"
  foundational_timing: "Perfect timing for single-architect context - establishing clean architecture before external adoption"
  contained_impact: "Template system is self-contained, minimizing risk and allowing testing of .fp workflow"
  strategic_foundation: "Sets up proper file type distinction for tooling, automation, and ecosystem signaling"
impact_zone:
  - "src/template/ directory (18 files)"
  - "template build process"
  - "internal template cross-references"
  - "naming conventions documentation"
migration_plan:
  phase_1: "Core template system (this update)"
  phase_2: "Development workflow files (dev/*.md)"
  phase_3: "Documentation system (src/docs/*.md)"
  phase_4: "Distribution files (dist/*.md)"
  artifacts: "Unchanged - historical records remain .md"
source:
  prompt: "Create phased approach to .fp extension migration based on impact zone assessment"
  intent: "Implement foundational .fp extension change in manageable, testable phases starting with template system"
---

# ✅ Phase 1: Core Template System .fp Extension Migration

This update implements the first phase of migrating FloatPrompt files from `.md` to `.fp` extension, focusing exclusively on the core template system.

## 🎯 Phase 1 Scope

**Files to Migrate (18 total):**
- All files in `src/template/*.md` → `src/template/*.fp`
- Update `_build.md` component references
- Update `naming.md` extension rules
- Fix internal cross-references within template system

## 🛡️ Phased Strategy Benefits

- **Manageable Scope**: 18 files vs 115 files
- **Self-Contained**: Template system has minimal external dependencies
- **Testable**: Can validate .fp workflow before broader migration
- **Low Risk**: Contained impact zone allows easy rollback if needed

## 📋 Future Phases

- **Phase 2**: Development workflow files (`dev/update-*.md`)
- **Phase 3**: Documentation system (`src/docs/*.md`) 
- **Phase 4**: Distribution files (`scripts/build.mjs` & `dist/*.md`) 
- **Artifacts**: Historical records remain unchanged as `.md`

> **This establishes the foundation for .fp as the canonical FloatPrompt extension while maintaining system stability through incremental migration.**

</floatprompt> 