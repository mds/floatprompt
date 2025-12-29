# FloatPrompt

*The invisible OS for AI*

Upload a floatprompt to any AI platform and it becomes a specialized tool—a coach, an assistant, a workflow—that guides you through a process and produces structured output.

Context, behavior, and tools.

---

## Why

AI was supposed to amplify human intelligence, not diminish it.

But your brilliant conversations disappear. Your voice gets flattened into generic output. Your context vanishes when you switch platforms. You spend more time re-explaining than creating.

FloatPrompt fixes this. Your intelligence becomes portable. Your voice travels with your work. Your context never dies.

*Start where you left off*, not where the AI thinks you should start.

---

## What It Looks Like

A floatprompt is a text file with two parts: JSON for AI behavior, markdown for methodology.

Upload one to ChatGPT, Claude, or Cursor and the AI transforms. It has a new persona, follows a process, asks specific questions, produces defined outputs.

**Example:** The AI Portfolio Coach floatprompt (700+ lines) turns any AI into a portfolio coach that:
- Guides designers through 5 phases (Map → Decide → Structure → Details → Logistics)
- Asks questions progressively, one phase at a time
- Preserves the designer's voice ("no em dashes," "sound selective not desperate")
- Produces a personalized HTML planning document with project-by-project image plans

The output isn't chat. It's a 500-line artifact the designer opens in their browser and works from.

That's a floatprompt. A text file that becomes a tool.

---

## Which File?

**[`core/prompt.md`](core/prompt.md)** (3KB) — The template
- Use when: Building a floatprompt through conversation
- What it does: Teaches AI how to create floatprompts
- Best for: Experienced users who know what they want to build

**[`core/doc.md`](core/doc.md)** — floatprompt doc tool
- Use when: Adding context frontmatter to any document
- What it does: Generates YAML frontmatter for mutual understanding
- Best for: Documenting what files ARE (not modifying behavior)

**[`core/os.md`](core/os.md)** (35KB) — The full system
- Use when: You want guided tool creation
- What it does: Boot sequence, friction scoring, step-by-step methodology
- Best for: First-time users, complex tools, when you want more structure

Start with the OS if you're new. Graduate to the template when you know what you're building.

---

## Quick Start

**Any AI platform:**
1. Download [`core/os.md`](core/os.md) (full system) or [`core/prompt.md`](core/prompt.md) (template only)
2. Upload to ChatGPT, Claude, Cursor, or any AI
3. Follow the guided flow (OS) or say "float build [what you need]" (template)
4. Collaborate through conversation
5. Receive a custom floatprompt for your use case

**Claude Code:**
1. Clone this repo
2. Run `/float` — boots the system or inits a new project

---

## The System

Three components, from simple to full:

### floatprompt doc — Context

YAML frontmatter for richer AI understanding of any document.

```yaml
---
title: Project Brief
human_intent: Define project scope
---
```

Doesn't modify AI behavior. Just provides context.

### FloatPrompt — Tools

Universal structure for portable AI tooling. JSON for behavior, markdown for methodology.

```
<fp>
  <json>{ behavioral spec }</json>
  <md># methodology</md>
</fp>
```

The template (`core/prompt.md`, 3KB) teaches AI how to create tools. The full system (`core/os.md`, 35KB) adds guided creation for deep knowledge work.

### FloatPrompt System — Project Awareness

`_float/` folders that give AI instant awareness of entire directories.

- `_float/system.md` — Boot loader (read first)
- `_float/nav/*.md` — Centralized navigation
- `_float/logs/` — Session continuity

**Boot sequence:** AI reads system.md, reads all nav/*.md files, builds mental model, checks integrity, then executes.

**Claude Code users:** Clone this repo and run `/float` to:
- **Boot** an existing FloatPrompt System (reads `_float/system.md`, runs full orientation)
- **Init** a new project (fetches spec from this repo, creates `_float/` architecture)

The command is auto-available — no installation needed.

---

## Examples

Real floatprompts solving real problems:

| Example | Type | Lines | What It Does |
|---------|------|-------|--------------|
| [AI Portfolio Coach](examples/ai%20portfolio%20coach/) | Coach | 729 | Multi-phase guidance producing HTML artifacts |
| [Design Feedback Extractor](examples/design%20feedback%20extractor/) | Extractor | 86 | Archaeological extraction preserving voice |
| [MDS Voice Guide](examples/mds%20voice%20guide/) | Voice | — | Voice preservation and calibration system |
| [Shortform Caption Writer](examples/shortform%20caption%20writer/) | Writer | — | Social media caption generation |
| [Shortform Script Writer](examples/shortform%20script%20writer/) | Writer | 200 | Transforms extractions into viral scripts |

Study these to see the format in action. Depth scales with complexity.

---

## Goal Hierarchy

FloatPrompt operates with a strict priority:

1. **Human Voice & Agency** (primary) — Preserve authentic thinking, phrasing, expression
2. **Reliable AI Behavior** (secondary) — Consistent cross-platform execution
3. **Useful Artifacts** (tertiary) — Tools that produce real results

The hierarchy is strict. A feature that improves usefulness but compromises voice is not a feature.

---

## Why Text Files

- **Portable**: Works on ChatGPT, Claude, Cursor, Gemini—any AI that accepts file uploads
- **Readable**: Open it, see exactly what it does, modify it
- **Shareable**: Send someone a file and they have the tool
- **Durable**: No platform lock-in, no dependencies, no accounts

---

## What You Can Build

**Coaches** that guide people through multi-phase processes and produce planning documents.

**Writers** that apply specific frameworks (hooks, structure, payoffs) while preserving authentic voice.

**Extractors** that pull structured intelligence from messy content without flattening it.

**Assistants** with defined personas, methodologies, and output formats.

Anything you'd want an AI to do repeatedly, with specific behavior, producing consistent outputs.

---

## Core Principles

**Tools, not prompts.** Floatprompts transform AI behavior, they don't just provide context.

**Voice preservation.** Your phrasing, rhythm, and thinking patterns—maintained, not flattened.

**Artifacts, not chat.** The goal is structured output you can use, not conversation.

**Portable by default.** If it only works on one platform, it's not a floatprompt.

**Recognition before action.** Never execute until the human sees themselves in the output.

---

## Context Depth

Choose how deep to go:

| File | Depth | Time | Use When |
|------|-------|------|----------|
| [`context/float-map.md`](context/float-map.md) | Quick | ~5 min | Simple tasks, first contact |
| [`context/float-context.md`](context/float-context.md) | Standard | ~2 min | Conceptual understanding |
| [`context/float-deepdive.md`](context/float-deepdive.md) | Full | ~15 min | Complex tools, system evolution |

---

## Documentation

- [What You Can Build](docs/use.md)
- [FloatPrompt Format](docs/floatprompt.md)
- [floatprompt doc Format](docs/doc.md)
- [FloatPrompt System Architecture](docs/system.md)
- [MDS Methodology](docs/mds-method.md) (Map → Decide → Structure)
- [Goals](docs/goals.md) | [Principles](docs/principles.md) | [Voice](docs/voice.md) | [Safety](docs/safety.md)

---

© 2025 [@MDS](https://mds.is) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
