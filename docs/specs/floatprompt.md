---
title: FloatPrompt Format
type: specification
status: complete
created: 2025-06
related: doc.md, system.md, goals.md, principles.md

human_author: @mds
human_intent: Define the <fp><json><md></fp> file structure
human_context: Core format specification - how floatprompt files are structured

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Renamed from fp.md to floatprompt.md for naming consistency
---

# FloatPrompt Format

A floatprompt is a text file with two sections: JSON for AI behavior, Markdown for methodology.

## Structure

```
<fp>
  <json>
    { behavioral specification }
  </json>
  <md>
    # Methodology and content
  </md>
</fp>
```

## JSON Section

Tells the AI how to behave.

```json
{
  "STOP": "Mode directive - what this tool does",

  "meta": {
    "title": "Tool name",
    "id": "tool-id",
    "format": "floatprompt"
  },

  "human": {
    "author": "@username",
    "intent": "What this tool helps accomplish",
    "context": "When to use it"
  },

  "ai": {
    "role": "How AI should behave",
    "tone": "Communication style"
  },

  "requirements": {
    "voice_preservation": { ... },
    "output": { ... },
    "custom_rules": { ... }
  }
}
```

**Required fields:**
- `STOP` — The mode directive AI sees first
- `meta` — Title and identification
- `human` — Author and intent
- `ai` — Role and behavior
- `requirements` — Tool-specific rules

**The `requirements` object** is where complexity scales. Simple tools have minimal requirements. Complex tools define conversation flows, output formats, phase structures, and behavioral constraints here.

## Markdown Section

Tells the AI what to do.

```markdown
# Tool Name

Brief description.

## Quick Start
How to begin using this tool.

## Process / Phases
The methodology or workflow.

## Output
What gets produced.

## Warnings
Constraints and limitations.
```

The markdown structure depends on what you're building. Coaches have phases. Writers have frameworks. Extractors have templates. Match the structure to the tool.

## File Requirements

- **Extension**: `.md`
- **Encoding**: UTF-8
- **Size**: Under 100KB recommended for optimal AI ingestion
- **Wrapper**: Must begin with `<fp>` and end with `</fp>`
- **Order**: JSON section before markdown section

## Examples

**Minimal floatprompt** (index file):
```json
{
  "STOP": "Project navigation index",
  "meta": { "title": "Project Index" },
  "human": { "author": "@mds", "intent": "Navigate project assets" },
  "ai": { "role": "Reference for file locations" },
  "requirements": {}
}
```

**Complex floatprompt** (coaching tool):
```json
{
  "STOP": "Portfolio Coach Mode. Guide through 5 phases...",
  "meta": { "title": "AI Portfolio Coach", "id": "portfolio-coach" },
  "human": { "author": "@mds", "intent": "Help designers plan portfolios" },
  "ai": { "role": "Warm, direct coach", "tone": "Supportive but challenging" },
  "requirements": {
    "conversation_flow": {
      "lead_with_opinion": true,
      "minimal_effort_responses": true,
      "phase_progression": "Complete each before moving on"
    },
    "voice_preservation": {
      "preserve": "Their phrasing, energy, authentic expression",
      "avoid": "Corporate speak, AI-optimized language"
    },
    "output": {
      "format": "HTML file",
      "generation": "After all phases complete"
    }
  }
}
```

The JSON grows with complexity. The pattern stays the same.
