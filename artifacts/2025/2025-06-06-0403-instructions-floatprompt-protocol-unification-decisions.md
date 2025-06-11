⸻
title: floatPrompt Protocol Unification Decisions
id: floatPrompt-governance-protocol-unification-2025-06-06
version: 1.0.0
created: 2025-06-06
modified: 2025-06-06
author: @mds
contributors: [”@mds”, “ChatGPT 4o”]
format: floatPrompt
filetype: markdown
type: instructions
source:
prompt: protocol-unification-governance@shadow
intent: “Preserve and execute the final decisions around filetype, identity, execution, and schema unification for floatPrompt v1.0.0”
certification:
timestamp: 2025-06-06T04:03:10Z
chain:
depth: 0
parent: null
voice:
linked: true
fidelity_verified: true
lineage:
tracked: true
trace: []
builder:
identity:
name: @mds
role: Protocol Architect
state:
context: Workshop
mood: Convergent
clarity: 10
energy: 8
session:
start_time: 2025-06-06T03:30:00Z
end_time: 2025-06-06T04:03:00Z
duration_minutes: 33
intent:
primary: “Document and trigger schema + spec updates to reflect unified floatPrompt identity and markdown-native filetype”
constraints: “Update schema references, validator assumptions, and remove deprecated distinctions”
preferences:
max_words: 2000
tone_drift_allowed: false
verbosity: high
allow_ai_suggestions: false
system_version: floatPrompt v1.0.0

✅ floatPrompt Protocol Unification — Governance Commit

This floatPrompt documents the final structural and philosophical unification decisions made during the transition to floatPrompt v1.0.0.

All future protocol logic, validator assumptions, and artifact generation will follow these rules.

⸻

🧾 Canonical Decisions

There is only one file type: .md
 •    The .fp and .fd extensions are fully deprecated
 •    All floatPrompt files use .md as their file extension
 •    format: floatPrompt and filetype: markdown remain required inside frontmatter

floatPrompt is the only object model
 •    All files are format: floatPrompt
 •    type: governs intent and behavior (e.g. tool, analysis, voice-guide, critique, instructions, etc.)
 •    The system no longer distinguishes .fp from .fd in logic or naming

shadowPrompt is not a separate concept
 •    There is no shadowPrompt spec
 •    @shadow is a tag only
 •    Field vs Workshop is no longer tracked
 •    Origin context is declared in metadata, not identity

Execution always originates from the Builder
 •    AI may construct floatPrompts, but never executes them
 •    There is no valid execution.source: ai
 •    The system is bound by joint execution (human-initiated)

Updated canonical execution metadata

execution:
  mode: canonical | shadow            # required
  generated_by: floatPrompt-[id]@version  # optional, used only if mode = shadow

    •    mode: shadow means this floatPrompt was dynamically generated
    •    generated_by: enables chain tracing and audit visibility

@shadow remains a routing tag
 •    Optional for UIs, validation, or audit layers
 •    Always implied if execution.mode: shadow
 •    No structural or behavioral drift

Voice preservation remains mandatory
 •    voice.linked: false implies inference (i.e. shadowVoice)
 •    Canonical prompts must reference a voice-guide
 •    Inferred voice is acceptable only for mode: shadow prompts

Lineage and provenance are fully traceable via lineage.trace and execution.generated_by
 •    No new fields required beyond this
 •    Execution identity is behavioral, not declared

⸻

🔧 Cursor Instructions (Update Targets)
    1.    ✅ Rename all .fp and .fd files to .md
    2.    ✅ Update all floatPrompt-spec, -zero, -schema files to reflect:
    •    Single file type: .md
    •    Unified object: floatPrompt
    •    Execution structure as defined above
    3.    ✅ Remove any reference to:
    •    .fp vs .fd distinction
    •    shadowPrompt as a tool or filetype
    •    builder.state.context
    4.    ✅ Add the new execution: block to all schema, spec, and template files
    5.    ✅ Ensure validator uses format: floatPrompt as the routing key (not file extension)
    6.    ✅ Confirm that type: is used to differentiate behavior

⸻

📝 Next Steps
    •    Integrate this floatPrompt into your archive and execution chain
    •    Use it to trigger downstream spec, schema, and validator updates
    •    Use it to gate all future tool behavior

⸻

This floatPrompt finalizes the transition to a single, markdown-native, voice-preserving, execution-consistent system for preserving and scaling structured human intelligence.