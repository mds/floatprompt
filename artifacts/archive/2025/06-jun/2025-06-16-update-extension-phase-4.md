<floatprompt>
---
STOP: "update instructions for Phase 4: final migration of distribution files and build system to .fp extension"
title: update – Phase 4: Distribution System .fp Extension Migration (Final Phase)
id: update-fp-extension-phase-4
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
  builds_on: ["update-fp-extension-phase-3"]
  enables: ["complete-fp-migration"]
changes:
  migrate_distribution_files:
    location: "dist/"
    field-spec:
      action: "rename_extension"
      pattern: "floatprompt-*.md → floatprompt-*.fp"
      scope: "distribution output files"
  update_build_system:
    location: "scripts/build.mjs"
    field-spec:
      section: "Output File Generation"
      rule: "Update build system to generate .fp files instead of .md for floatprompt distributions"
  update_package_metadata:
    location: "package.json"
    field-spec:
      section: "Main Entry Point"
      rule: "Update main entry and references to reflect .fp extension"
  migrate_archive_structure:
    location: "dist/archive/"
    field-spec:
      action: "rename_extension"
      pattern: "floatprompt-*.md → floatprompt-*.fp"
      scope: "historical distribution files"
  preserve_external_interfaces:
    location: "external interfaces"
    field-spec:
      scope: "public-facing files"
      rule: "Preserve README.md, LICENSE, and other ecosystem files as .md"
rationale:
  migration_completion: "Final phase completes the systematic .fp extension migration across the entire FloatPrompt system"
  distribution_consistency: "Ensures distributed FloatPrompt files use canonical .fp extension for proper tooling recognition"
  build_system_alignment: "Updates build system to generate .fp files as primary output format"
  ecosystem_preservation: "Maintains GitHub ecosystem compatibility by preserving public interface files as .md"
impact_zone:
  - "dist/ directory and output files"
  - "scripts/build.mjs build system"
  - "package.json metadata"
  - "distribution archive structure"
  - "external download interfaces"
migration_plan:
  completed_phase_1: "Core template system (src/template/)"
  completed_phase_2: "Development workflow files (dev/)"
  completed_phase_3: "Documentation system (src/docs/)"
  current_phase_4: "Distribution system (final phase)"
  artifacts: "Unchanged - historical records remain .md"
  external_interfaces: "README.md, LICENSE, and public files remain .md"
  completion_status: "Full system migration to .fp extension"
source:
  prompt: "Create Phase 4 final extension migration for distribution system"
  intent: "Complete systematic .fp extension migration with distribution files while preserving external ecosystem compatibility"
---

# ✅ Phase 4: Distribution System .fp Extension Migration (Final Phase)

This update implements the final phase of migrating FloatPrompt files from `.md` to `.fp` extension, completing the system-wide migration.

## 🎯 Phase 4 Scope (Final)

**Files to Migrate:**
- All files in `dist/floatprompt-*.md` → `dist/floatprompt-*.fp`
- Archive files in `dist/archive/floatprompt-*.md` → `dist/archive/floatprompt-*.fp`
- Update `scripts/build.mjs` to generate `.fp` files
- Update `package.json` metadata and entry points
- Update any external download references

**Files to Preserve:**
- `README.md` (GitHub ecosystem)
- `LICENSE` and other public interface files
- Historical artifacts in `artifacts/` directory

## 🛡️ Final Phase Strategy

- **Migration Completion**: Completes systematic migration across entire FloatPrompt system
- **Distribution Consistency**: Ensures all distributed files use canonical .fp extension
- **Build System Finalization**: Updates build system to generate .fp as primary format
- **Ecosystem Preservation**: Maintains external GitHub/ecosystem compatibility

## ✅ Migration Complete

After Phase 4, the FloatPrompt system will have:
- **Complete .fp adoption** for all FloatPrompt system files
- **Preserved external interfaces** (README.md, LICENSE, etc.)
- **Unchanged historical artifacts** (archaeological preservation)
- **Updated build system** generating .fp distribution files
- **Canonical extension** established across the entire system

> **This completes the systematic migration, establishing .fp as the canonical FloatPrompt extension while maintaining ecosystem compatibility.**

</floatprompt> 