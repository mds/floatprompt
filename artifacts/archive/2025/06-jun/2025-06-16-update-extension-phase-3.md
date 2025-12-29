<floatprompt>
---
STOP: "update instructions for Phase 3: migrating documentation system files from .md to .fp extension"
title: update – Phase 3: Documentation System .fp Extension Migration
id: update-fp-extension-phase-3
version: 1.0.0
created: 2025-06-16-0000
modified: 2025-06-16-0000
author: @mds
format: floatprompt
filetype: fp
type: migration
system_version: floatprompt v@latest
contributors: ["@mds"]
relationships:
  enabled_by: ["update-protocol"]
  builds_on: ["update-fp-extension-phase-2"]
  enables: ["fp-documentation-system"]
changes:
  migrate_docs_files:
    location: "src/docs/"
    field-spec:
      action: "rename_extension"
      pattern: "*.md → *.fp"
      scope: "documentation system files"
  update_readme_references:
    location: "README.md"
    field-spec:
      section: "File Structure Documentation"
      rule: "Update any references to .md files in src/docs/ to .fp"
  update_internal_links:
    location: "documentation system"
    field-spec:
      scope: "cross-references within src/docs/"
      rule: "Update internal documentation links from .md to .fp"
  maintain_external_interfaces:
    location: "public interfaces"
    field-spec:
      scope: "external-facing documentation"
      rule: "Preserve README.md and other public .md files unchanged"
rationale:
  systematic_progression: "Building on Phase 1 & 2 success, Phase 3 tackles documentation system with established .fp migration patterns"
  documentation_consistency: "Ensures internal documentation uses canonical .fp extension while preserving public .md interfaces"
  external_compatibility: "Maintains GitHub and ecosystem compatibility by preserving README.md and other public interfaces"
  preparation_for_final: "Prepares system for final Phase 4 distribution file migration"
impact_zone:
  - "src/docs/ directory"
  - "documentation cross-references"
  - "README.md file structure documentation"
  - "internal documentation links"
migration_plan:
  completed_phase_1: "Core template system (src/template/)"
  completed_phase_2: "Development workflow files (dev/)"
  current_phase_3: "Documentation system (this update)"
  remaining_phase_4: "Distribution files (dist/*.md)"
  artifacts: "Unchanged - historical records remain .md"
  external_interfaces: "README.md and public interfaces remain .md"
source:
  prompt: "Create Phase 3 extension migration for documentation system files"
  intent: "Continue systematic .fp extension migration with documentation system while preserving external .md interfaces"
---

# ✅ Phase 3: Documentation System .fp Extension Migration

This update implements the third phase of migrating FloatPrompt files from `.md` to `.fp` extension, focusing on the internal documentation system.

## 🎯 Phase 3 Scope

**Files to Migrate:**
- All files in `src/docs/*.md` → `src/docs/*.fp`
- Update cross-references within documentation system
- Update README.md references to documentation structure
- Fix internal documentation links and navigation

**Files to Preserve:**
- `README.md` (external interface)
- Other public-facing `.md` files (ecosystem compatibility)

## 🛡️ Phase 3 Strategy

- **Systematic Progression**: Builds on Phase 1 & 2 success with established patterns
- **Internal Consistency**: Migrates internal docs to canonical .fp extension
- **External Compatibility**: Preserves public .md interfaces for GitHub/ecosystem compatibility
- **Final Preparation**: Sets up system for final Phase 4 distribution migration

## 📋 Final Phase

- **Phase 4**: Distribution files (`dist/*.md`) and final build script updates
- **Artifacts**: Historical records remain unchanged as `.md`
- **Public Interfaces**: README.md and external-facing files remain `.md`

> **This phase establishes .fp as the standard for all internal documentation while maintaining external ecosystem compatibility.**

</floatprompt> 