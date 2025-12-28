# FloatPrompt

**Build AI tools as text files.**

Upload a floatprompt to any AI platform and it becomes a specialized tool—a coach, an assistant, a workflow—that guides you through a process and produces structured output.

Not prompts. Not saved context. **Tools.**

## What It Looks Like

A floatprompt is a text file with two parts: JSON for AI behavior, markdown for methodology.

Upload one to ChatGPT, Claude, or Cursor and the AI transforms. It has a persona, follows a process, asks specific questions, produces defined outputs.

**Example:** The AI Portfolio Coach floatprompt (700 lines) turns any AI into a portfolio coach that:
- Guides designers through 5 phases (Map → Decide → Structure → Details → Logistics)
- Asks questions progressively, one phase at a time
- Preserves the designer's voice ("no em dashes," "sound selective not desperate")
- Produces a personalized HTML planning document with project-by-project image plans

The output isn't chat. It's a 500-line artifact the designer opens in their browser and works from.

That's a floatprompt. A text file that becomes a tool.

## Which File?

**[`floatprompt.md`](floatprompt.md)** (3KB) — The template
- Use when: Building a floatprompt through conversation
- What it does: Teaches AI how to create floatprompts
- Best for: Experienced users who know what they want to build

**[`floatdoc.md`](floatdoc.md)** — FloatDoc tool
- Use when: Adding context frontmatter to any document
- What it does: Generates YAML frontmatter for mutual understanding
- Best for: Documenting what files ARE (not modifying behavior)

**[`floatprompt-os.md`](floatprompt-os.md)** (35KB) — The full system
- Use when: You want guided tool creation
- What it does: Boot sequence, friction scoring, step-by-step methodology
- Best for: First-time users, complex tools, when you want more structure

Start with the OS if you're new. Graduate to the template when you know what you're building.

## Quick Start

1. Download [`floatprompt-os.md`](floatprompt-os.md) (full system) or [`floatprompt.md`](floatprompt.md) (template only)
2. Upload to any AI (ChatGPT, Claude, Cursor)
3. Follow the guided flow (OS) or say "float build [what you need]" (template)
4. Collaborate through conversation
5. Receive a custom floatprompt for your use case

## The Format

```
<fp>
  <json>
    AI behavioral specification
    - Persona and tone
    - Interaction patterns
    - Output requirements
    - Voice preservation rules
  </json>
  <md>
    Methodology and content
    - Process phases
    - Framework details
    - Templates and examples
  </md>
</fp>
```

**JSON** tells the AI how to behave. **Markdown** tells it what to do. Together they create a tool that works identically on any AI platform.

## Why Text Files

- **Portable**: Works on ChatGPT, Claude, Cursor, Gemini—any AI that accepts file uploads
- **Readable**: Open it, see exactly what it does, modify it
- **Shareable**: Send someone a .txt file and they have the tool
- **Durable**: No platform lock-in, no dependencies, no accounts

## What You Can Build

**Coaches** that guide people through multi-phase processes and produce planning documents.

**Writers** that apply specific frameworks (hooks, structure, payoffs) while preserving authentic voice.

**Extractors** that pull structured intelligence from messy content without flattening it.

**Assistants** with defined personas, methodologies, and output formats.

Anything you'd want an AI to do repeatedly, with specific behavior, producing consistent outputs.

## Core Principles

**Tools, not prompts.** Floatprompts transform AI behavior, they don't just provide context.

**Voice preservation.** Your phrasing, rhythm, and thinking patterns—maintained, not flattened.

**Artifacts, not chat.** The goal is structured output you can use, not conversation.

**Portable by default.** If it only works on one platform, it's not a floatprompt.

## Documentation

- [What You Can Build](docs/use.md)
- [FloatPrompt Format](docs/floatprompt.md)
- [FloatDoc Format](docs/floatdoc.md)
- [MDS Methodology](docs/mds-method.md) (Map → Decide → Structure)
- [Goals](docs/goals.md) | [Principles](docs/principles.md) | [Voice](docs/voice.md) | [Safety](docs/safety.md)

---

© 2025 [@MDS](https://mds.is) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
