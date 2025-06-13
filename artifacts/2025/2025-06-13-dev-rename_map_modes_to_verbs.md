---
STOP: "Patch instructions for renaming"
title: Rename Map – Modes to Verbs
id: rename-map-modes-to-verbs
version: 0.1.0-alpha
created: 2025-06-12-0000
modified: 2025-06-12-0000
author: @mds
format: floatprompt
filetype: markdown
type: migration
system_version: floatprompt v0.3.1-alpha
contributors: ["@mds", "ChatGPT"]
relationships:
  enabled_by: ["dev-update-floatprompt"]
  constructed_by: ["patch-update-creation"]
rename:
  cartographer: map
  extractor: extract
  constructor: build
rationale:
  cartographer: "Reduces metaphor abstraction; better aligns with developer mental model and CLI-style commands."
  extractor: "Clarifies functional behavior and encourages preservation-first mindset."
  constructor: "Matches established developer terminology (e.g., build tools, pipelines)."
impact_zone:
  - "template modular components"
  - "all internal mode references"
  - "execution and validation chains"
  - "docs referencing mode names"
  - "README and public-facing terms"
source:
  prompt: "Created using patch-update-creation"
  intent: "Refactor internal mode names from role-based metaphors to actionable verbs"
execution:
  status: "completed"
  timestamp: "2025-06-12T22:30:00.000Z"
  files_updated:
    - "src/template/modes.md"
    - "src/template/config.md" 
    - "src/template/header.md"
    - "src/template/types.md"
    - "src/template/chaining.md"
    - "src/template/_build.md"
    - "README.md"
---