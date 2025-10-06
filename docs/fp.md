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

Every floatprompt contains these core fields:

### Core Structure
- **STOP**: Execution directive that tells AI how to behave
- **floatprompt**: Collaboration model and AI role definition
- **meta**: File metadata (title, id, format, process)
- **human**: Author information and context
- **ai**: AI model and context information  
- **requirements**: Tool-specific functionality and protocols

```json
{
  "STOP": "{{MODE_DIRECTIVE}}",
  "floatprompt": {
    "collaboration_model": "Human+AI joint execution through conversational collaboration with shared context",
    "ai_role": "Apply strategic framework to human's specific situation. Ask clarifying questions. Prove understanding before acting.",
    "critical_principle": "You are a collaborative assistant using shared context, not autonomous software executing specifications"
  },
  "meta": {
    "title": "{{TITLE}}",
    "id": "{{ID}}",
    "format": "floatprompt",
    "file": "txt",
    "process": "AI-generated from conversational emergence with human"
  },
  "human": {
    "author": "{{HUMAN_NAME}}",
    "intent": "{{PRIMARY_GOAL}}",
    "context": "{{USAGE_CONTEXT}}",
    "style": "{{COMMUNICATION_STYLE}}",
    "{{HUMAN_CONTEXT}}": "{{DESCRIPTION}}"
  },
  "ai": {
    "model": "{{AI_MODEL}}",
    "{{AI_CONTEXT}}": "{{DESCRIPTION}}"
  },
  "requirements": {
    "{{SPECIALIZED_REQUIREMENTS}}": "{{DESCRIPTION}}"
  }
}
```

These fields establish the collaboration model, tell AI models how to create floatprompts, and preserve human voice and authority throughout the process.

## Markdown Structure

Standard sections for human-readable documentation:

```markdown
# {{TITLE}}
{{AI_SUMMARY}}

## Quick Start
{{IMMEDIATE_ACTION_GUIDANCE}}

## Goals
{{PURPOSE_AND_GOALS}}

## Context
{{WHEN_AND_WHY_TO_USE}}

## Output
{{WHAT_YOU_GET}}

## Warnings
{{GENERAL_LIMITATIONS_AND_CONSIDERATIONS}}

Created by {{HUMAN_NAME}} and {{AI_MODEL}}
```

## Examples

### Template Reference
See [`floatprompt.txt`](../floatprompt.txt) for the canonical template.

### Visual Reference
See [`docs/reference-micro.txt`](reference-micro.txt) for a minimal structure overview.

## Validation Rules

### JSON Requirements
- Valid JSON syntax in `<json>` section
- All six required fields present: STOP, floatprompt, meta, human, ai, requirements
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
- `{{SPECIALIZED_REQUIREMENTS}}` → Custom requirements
- `{{HUMAN_CONTEXT}}` → Additional human context fields
- `{{AI_CONTEXT}}` → Additional AI context fields

**Production files will have all variables replaced with actual values by AI.**
