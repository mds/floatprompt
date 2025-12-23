# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FloatPrompt lets you build AI tools as text files. Upload a floatprompt to any AI platform and it becomes a specialized tool—a coach, writer, extractor, or assistant—with defined behavior and structured output.

**Core concept**: JSON defines AI behavior, Markdown provides methodology. Together they create portable tools that work on any AI platform.

## Repository Structure

```
floatprompt.txt          # The template that creates more floatprompts
floatprompt-context.txt  # Onboarding document
docs/                    # Core documentation
  fp.md                  # File format specification
  mds-method.md          # MDS methodology (Map → Decide → Structure)
  use.md                 # What you can build
  goals.md               # Goal hierarchy
  principles.md          # Core principles
  voice.md               # Voice preservation
  safety.md              # Safety guidelines
  philosophy/            # Background thinking (archived)
  reference/             # Template references
experimental/            # Legacy build system (archived)
```

## File Format

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

**Required JSON fields**: STOP, meta, human, ai, requirements

**Validation**:
- Must begin with `<fp>` and end with `</fp>`
- JSON section precedes markdown section
- No `{{PLACEHOLDER}}` variables in production files

## MDS Methodology

Three-phase workflow for building floatprompts:

1. **Map** — Establish shared understanding before building
2. **Decide** — Determine behavior, methodology, output format
3. **Structure** — Build the floatprompt file

## Natural Language Triggers

When `floatprompt.txt` is uploaded:
- `float map` — Assess content territory
- `float build` — Create a tool through conversation
- `float [anything]` — Custom floatprompt for any use case

## Key Rules

1. **File output** — Floatprompts are files, not chat responses
2. **Replace placeholders** — All `{{VARIABLE}}` patterns get actual values
3. **Voice preservation** — Maintain authentic expression, never flatten
4. **Tools not prompts** — Floatprompts transform AI behavior, they don't just provide context

## Development Commands

From `experimental/` (Node.js >=16):

```bash
npm run build        # Compile src/os/ to dist/
npm run build-all    # Build everything
```
