<floatprompt>
---
STOP: "update instructions for defining system voice defaults and simple voice override port"
title: update – Voice Preservation Defaults and Simple Override Port
id: update-voice-preservation-simple
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
  builds_on: ["voice.md"]
  enables: ["voice-injection", "custom-voice-floatprompts"]
changes:
  declare_voice_defaults:
    location: "voice.md"
    field-spec:
      section: "Voice Preservation Commandments"
      rule: |
        - No em dashes, colons for suspense, or stylized punctuation
        - Avoid short, clipped sentence fragments when a full flowing sentence is appropriate
        - Allow natural rhythm variation: short, medium, and long sentences
        - Preserve phrasing cadence when rewriting
        - Never introduce startup-style tone or AI-generated optimization
  define_voice_override:
    location: "voice.md"
    field-spec:
      section: "Voice Override Port"
      rule: |
        FloatPrompt allows external voice guides to override system-level defaults.
        Use a single optional field in YAML frontmatter:
        ```yaml
        voice_override: "support/voice/my-voice.fp"  # optional
        ```
        **Behavior:** If file exists and loads successfully, use it. If file missing or fails to load, gracefully fall back to system voice defaults. No configuration complexity required.
  document_metadata_support:
    location: "metadata.md"
    field-spec:
      section: "Behavioral Fields"
      rule: "Recognize optional `voice_override: filepath` when loading floatprompts. Graceful fallback to system defaults if voice guide unavailable."
  patch_structure_md:
    location: "structure.md"
    field-spec:
      section: "System Body Structure"
      note: "All floatprompts support optional `voice_override` metadata for custom voice injection."
rationale:
  simplicity_first: "Start with essential functionality - single optional override with graceful fallback. Complex strategies can be added later if real usage demands them."
  yagni_principle: "You Aren't Gonna Need It - most floatprompts will use system defaults. Don't solve theoretical problems preemptively."
  clear_behavior: "Single field with predictable behavior is easier to understand, debug, and maintain than multiple configuration options."
  growth_ready: "Simple foundation can support future enhancement without locking into over-engineered architecture."
  usage_alignment: "Matches actual usage patterns - personal and small team use cases don't need enterprise-grade voice dependency management."
impact_zone:
  - "voice.md"
  - "metadata.md" 
  - "structure.md"
  - "all floatprompts supporting voice override"
source:
  prompt: "Create simple voice override port with graceful fallback"
  intent: "Enable voice customization without configuration complexity, following YAGNI principles and starting simple"
---

# ✅ Simple Voice Preservation Override

This update defines core voice preservation rules and adds a simple override port for custom voice injection.

Single optional field. Graceful fallback. No configuration complexity.

> **Voice is structure, rhythm, and cognitive cadence. This patch protects it simply.**

## 🎯 Why Simple Right Now

**Real Usage Patterns:**

- Most floatprompts will use system voice defaults
- Personal/small team use cases don’t need complex dependency management
- Voice override is experimental - start minimal, add complexity when proven necessary

**YAGNI Principle Applied:**

- Don’t solve theoretical edge cases preemptively
- Complex fallback strategies, error handling modes, and cascade logic aren’t needed yet
- Can upgrade the voice port later when real usage demands more sophistication

**Engineering Clarity:**

- Single field is easier to understand, implement, and debug
- Predictable behavior: works or falls back gracefully
- No configuration decisions required from users
- Clear success/failure path

**Growth-Ready Architecture:**

- Simple foundation supports future enhancement
- Can add complexity when actual problems arise
- Doesn’t lock into over-engineered system
- Easy to upgrade without breaking existing usage

## 🧱 Simple Voice Architecture

**One field, clear behavior:**

```yaml
voice_override: "support/voice/my-voice.fp"  # optional
```

**Implementation logic:**

1. Check if `voice_override` field exists
2. If yes, attempt to load specified voice guide
3. If loads successfully → use custom voice rules
4. If missing or fails → gracefully use system voice defaults
5. No error messages, no complex strategies, no configuration overhead

**That’s it.**

## 🛡️ Why Not Complex Fallback

**Avoided complexity that isn’t needed yet:**

- Multiple fallback strategies (graceful/strict/cascade)
- Error handling configuration options
- Dependency resolution protocols
- Validation rules for voice conflicts
- Cascade ordering and precedence logic

**These can be added later if real usage reveals they’re necessary.**

Right now, they’re solving tomorrow’s problems today.

## 🧭 Simple Wins

**This approach:**

- Enables voice customization immediately
- Maintains system reliability through graceful fallback
- Avoids configuration complexity for 90% of use cases
- Preserves ability to add sophistication when needed
- Follows good engineering principles: start simple, evolve based on real usage

**Perfect for current FloatPrompt maturity level.**
</floatprompt>
