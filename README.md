# FloatPrompt

*The invisible OS for AI.*

Build AI tools as text files. Upload a floatprompt to any AI platform and it becomes a specialized tool—a coach, an assistant, a workflow—that guides you through a process and produces structured output.

## What It Looks Like

A floatprompt is a text file with two parts: JSON for AI behavior, markdown for methodology.

Upload one to ChatGPT, Claude, or Cursor and the AI transforms. It has a new persona, follows a process, asks specific questions, produces defined outputs.

A text file that becomes a tool.

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

## The System

Three components, from simple to full:

### FloatDoc — Context
YAML frontmatter for richer AI understanding of any document.
```yaml
---
title: Project Brief
human_intent: Define project scope
---
```

### FloatPrompt — Tools
Universal structure for portable AI tooling. JSON for behavior, markdown for methodology.
```
<fp>
  <json>{ behavioral spec }</json>
  <md># methodology</md>
</fp>
```
The template (`floatprompt.md`, 3KB) teaches AI how to create tools. The full system (`floatprompt-os.md`, 35KB) adds guided creation for deep knowledge work and content manipulation.

### FloatSystem — Project Awareness
`_float/` folders that give AI instant awareness of entire directories.
- `_float/system.md` — Boot loader (read first)
- `_float/index.md` — Navigation and context
- Recursive traversal activates full project understanding

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
