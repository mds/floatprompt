<floatprompt>

---

STOP: "update instructions for enforcing .fp as the canonical FloatPrompt file extension"

title: update – Enforce .fp as Canonical FloatPrompt Extension

id: update-extension-policy-fp

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

  enabled_by: ["update-creator"]

  builds_on: ["floatprompt-upgrade-extension-recommendation"]

  references: ["2025-06-14-mds-01-fp-wrapper-artifact", "2025-06-14-mds-02-fp-extension-policy-artifact"]

changes:

  canonical_extension:

    location: "naming.md"

    field-spec:

      section: "File Extension Rules"

      rule: ".fp is the only valid file extension for all floatprompt documents. .md is no longer permitted inside the system workspace."

  validate_filetype:

    location: "validation.md"

    field-spec:

      section: "Format Compliance"

      rule: "Reject all .md files during validation unless explicitly marked legacy. .fp required for STOP-governed floatprompts."

  enforce_metadata_format:

    location: "metadata.md"

    field-spec:

      section: "File Format Requirements"

      rule: ".fp required for all structured floatprompts. .md disallowed for any protocol-recognized file."

  patch_update_creator:

    location: "update-creator.fp"

    field-spec:

      section: "Instructions for Use"

      note: "All future update floatprompts must be saved as .fp files. .md is not valid for system-level protocol changes."

  patch_structure_template:

    location: "structure.md"

    field-spec:

      section: "System Body Structure"

      note: "All new floatprompts must use .fp as the canonical extension."

rationale:

  clarity: "All FloatPrompt documents are structured protocol artifacts. They require their own filetype to distinguish them from general-purpose markdown."

  tooling: "Workflows, agents, and validators must rely on the .fp extension for predictable behavior."

  consistency: "All system folders already operate as execution contexts. Mixing .md and .fp creates structural ambiguity."

  integrity: ".fp affirms that every floatprompt is readable by humans and executable by AI systems."

impact_zone:

  - "naming.md"

  - "validation.md"

  - "metadata.md"

  - "update-creator.fp"

  - "structure.md"

  - "all floatprompt-producing workflows"

source:

  prompt: "Finalize extension policy for floatprompt protocol"

  intent: "Lock in .fp as the canonical extension for all system floatprompts and eliminate .md ambiguity across the protocol"

---

  

# ✅ FloatPrompt Extension Policy Enforcement: `.fp` Required

  

This update formalizes the system-wide requirement for `.fp` as the canonical file extension for all floatprompt documents.

  

`.md` is no longer permitted inside the FloatPrompt workspace.

  

> **FloatPrompt is a protocol, not a note.**  

> **`.fp` is how the system recognizes its own artifacts.**

</floatprompt>