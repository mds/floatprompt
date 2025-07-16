<floatprompt>
---
STOP: "update instructions for Phase 2: migrating development workflow files from .md to .fp extension"
title: update – Phase 2: Development Workflow .fp Extension Migration
id: update-fp-extension-phase-2
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
  builds_on: ["update-fp-extension-phase-1"]
  enables: ["fp-development-workflow"]
changes:
  migrate_update_files:
    location: "dev/updates/"
    field-spec:
      action: "rename_extension"
      pattern: "update-*.md → update-*.fp"
      scope: "development workflow files only"
  migrate_protocol_files:
    location: "dev/"
    field-spec:
      action: "rename_extension"
      pattern: "update-*.md → update-*.fp"
      scope: "protocol and creator files"
  update_cross_references:
    location: "development workflow"
    field-spec:
      scope: "internal references within dev/ directory"
      rule: "Update any internal .md references to .fp"
  update_build_system:
    location: "scripts/build.mjs"
    field-spec:
      section: "File Discovery"
      rule: "Update build system to recognize .fp files in development context"
rationale:
  sequential_approach: "Building on Phase 1 success, Phase 2 tackles development workflow files with established .fp patterns"
  workflow_consistency: "Ensures development tools and update processes use canonical .fp extension"
  build_system_alignment: "Updates build system to handle .fp files in development context"
  foundation_building: "Prepares development workflow for broader system migration in Phase 3"
impact_zone:
  - "dev/updates/ directory"
  - "dev/ protocol files" 
  - "development workflow cross-references"
  - "build system file discovery"
migration_plan:
  completed_phase_1: "Core template system (src/template/)"
  current_phase_2: "Development workflow files (this update)"
  remaining_phase_3: "Documentation system (src/docs/*.md)"
  remaining_phase_4: "Distribution files (dist/*.md)"
  artifacts: "Unchanged - historical records remain .md"
source:
  prompt: "Create Phase 2 extension migration for development workflow files"
  intent: "Continue systematic .fp extension migration with development workflow files following Phase 1 template system success"
---

# ✅ Phase 2: Development Workflow .fp Extension Migration

This update implements the second phase of migrating FloatPrompt files from `.md` to `.fp` extension, focusing on development workflow files.

## 🎯 Phase 2 Scope

**Files to Migrate:**
- All files in `dev/updates/update-*.md` → `dev/updates/update-*.fp`
- Protocol files: `dev/update-protocol.md` → `dev/update-protocol.fp`
- Creator files: `dev/update-creator.md` → `dev/update-creator.fp`
- Update build system file discovery patterns
- Fix internal cross-references within development workflow

## 🛡️ Phase 2 Strategy

- **Sequential Build**: Leverages Phase 1 success and established .fp patterns
- **Workflow Consistency**: Ensures development tools use canonical extension
- **Build System Update**: Updates scripts to recognize .fp in development context
- **Foundation Building**: Prepares for broader documentation migration in Phase 3

## 📋 Remaining Phases

- **Phase 3**: Documentation system (`src/docs/*.md`)
- **Phase 4**: Distribution files (`dist/*.md`) and build script updates
- **Artifacts**: Historical records remain unchanged as `.md`

> **This continues the systematic migration, establishing .fp as the standard for all active development workflow files.**

</floatprompt> 