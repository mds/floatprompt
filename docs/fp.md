# FloatPrompt File Format Specification

**Structured format for portable AI collaboration tools**

## Format Definition

A **floatprompt file** is a structured text document that contains AI behavioral specifications and human-readable documentation in a single portable format.

### File Structure

```
<fp>
  <json>
    { ... metadata and requirements ... }
  </json>
  <md>
    # Title and documentation
  </md>
</fp>
```

### File Extensions
- **Current**: `.txt` (universal compatibility)
- **Future**: `.fp` (dedicated ecosystem support)

## Required Fields

Every floatprompt contains these fields:

```json
{
  "STOP": "{{MODE_DIRECTIVE}}",
  "meta": {
    "title": "{{TITLE}}",
    "id": "{{ID}}",
    "format": "floatprompt",
    "file": "txt",
    "process": "AI-generated from human conversation"
  },
  "human": {
    "author": "{{HUMAN_NAME}}",
    "intent": "{{PRIMARY_GOAL}}",
    "context": "{{USAGE_CONTEXT}}",
    "style": "{{COMMUNICATION_STYLE}}"
  },
  "ai": {
    "model": "{{AI_MODEL}}"
  },
  "requirements": {
    "{{TOOL_SPECIFIC_FUNCTIONALITY}}": "{{DESCRIPTION}}"
  }
}
```

### Standard Requirements

All floatprompt files include:

```json
"requirements": {
  "output_format": "Must follow exact floatprompt structure with JSON header and markdown body",
  "output_creation": "Create in a new file, never output in conversation",
  "human_intelligence_gathering": "Engage in conversation to understand human intent before creating floatprompt by asking clarifying questions rather than making assumptions",
  "output_audience": {
    "human_comprehension": "Clear explanation for human understanding",
    "ai_behavior": "Precise execution guidance for AI processing"
  },
  "voice_preservation": {
    "preserve_exactly": "Maintain exact phrasing, rhythm, tone, and hesitations from source",
    "no_interpretation": "Extract and structure only, never generate or summarize content",
    "flag_ambiguity": "Mark unclear content with TODO rather than making assumptions"
  }
}
```

These requirements tell AI models what floatprompt is, how to create them, and to not overwrite your human voice.

## Markdown Structure

Standard sections for human-readable documentation:

```markdown
# {{TITLE}}
{{AI_SUMMARY}}

## Quick Start
{{IMMEDIATE_ACTION_GUIDANCE}}

## Goals
{{TOOL_PURPOSE_AND_GOALS}}

## Context
{{WHEN_AND_WHY_TO_USE}}

## Output
{{WHAT_YOU_GET}}

## Warnings
{{GENERAL_LIMITATIONS_AND_CONSIDERATIONS}}

© 2025 [@MDS](https://mds.is) | CC BY 4.0
```

## Examples

### Minimal Example
See [`src/floatprompt.txt`](../src/floatprompt.txt) for the canonical template.

### Visual Reference
See [`docs/reference.txt`](reference.txt) for a minimal structure overview.

## Validation Rules

### JSON Requirements
- Valid JSON syntax in `<json>` section
- All five required fields present
- No template variables (`{{VARIABLE}}`) in production files

### Structure Requirements
- Must begin with `<fp>` and end with `</fp>`
- Contains exactly one `<json>` and one `<md>` section
- JSON section precedes markdown section

### File Requirements
- UTF-8 encoding
- `.txt` extension for universal compatibility
- Maximum recommended size: 100KB for optimal AI ingestion

## Template Variables

During development, use template variables that get replaced:
- `{{TITLE}}` → Actual tool name
- `{{HUMAN_NAME}}` → Author name  
- `{{AI_MODEL}}` → AI system used
- `{{MODE_DIRECTIVE}}` → Specific execution instruction
- `{{TOOL_SPECIFIC_FUNCTIONALITY}}` → Custom requirements

**Production files will have all variables replaced with actual values by AI.**
