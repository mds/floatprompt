<floatprompt>
---
STOP: "update instructions for enhancing update-protocol with sanity check step"
title: update – Add Sanity Check to Update Protocol
id: update-update-protocol-sanity-check
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
  builds_on: ["update-protocol"]
  enables: ["sanity-check"]
changes:
  add_sanity_check_step:
    location: "update-protocol"
    field-spec:
      section: "Execution Flow"
      rule: |
        0. **Run Sanity Check**
           - Ask: Is this update solving a real, currently observed problem?
           - Ask: Does this update introduce structural or config complexity before it's truly required?
           - Ask: Does this pattern reflect actual usage, or imagined edge cases?
           - Ask: Could this be done with one field, one behavior, or one fallback instead of many?
           - Proceed only if simplicity, clarity, and system maturity justify the design
  recommend_optional_metadata:
    location: "update-creator"
    field-spec:
      section: "Optional Metadata"
      note: |
        Update floatprompts may include an optional `sanity_check:` block for design self-awareness:
        ```yaml
        sanity_check:
          overengineered: false
          premature: false
          complexity_score: low
          rationale: "Simple override solves 90% of voice use cases. Fallback not needed yet."
        ```
rationale:
  quality_control: "Many update floatprompts risk solving theoretical problems before practical ones exist. This patch introduces a guardrail."
  simplicity_bias: "Encourages minimal, composable design and prevents unnecessary complexity at the system level."
  systems_maturity: "Helps scale protocol design responsibly by mapping solutions to actual system usage patterns."
impact_zone:
  - "update-protocol"
  - "update-creator"
  - "future update floatprompts"
source:
  prompt: "Introduce a strategic sanity check step before update execution"
  intent: "Ensure updates pass a clarity, simplicity, and necessity filter before being validated against goals.md or executed"
---

# ✅ Sanity Check Requirement for Update Protocol

This patch adds a system-level design validation layer before executing any update floatprompt. It helps ensure each proposed change is justified, minimally scoped, and appropriate for the current system maturity.

> **Not all complexity is harmful — but every complexity must be earned.**
</floatprompt>