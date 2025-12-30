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

## Three Pillars

```
floatprompt/
├── format/      ← FILE: What FloatPrompt IS
├── system/      ← SYSTEM: How it WORKS
└── package/     ← PACKAGE: How it SHIPS
```

## Which File?

**[`format/core/template.md`](format/core/template.md)** (3KB) — The template
- Use when: Building a floatprompt through conversation
- What it does: Teaches AI how to create floatprompts
- Best for: Experienced users who know what they want to build

**[`format/core/doc.md`](format/core/doc.md)** — floatprompt doc tool
- Use when: Adding context frontmatter to any document
- What it does: Generates YAML frontmatter for mutual understanding
- Best for: Documenting what files ARE (not modifying behavior)

**[`format/core/os.md`](format/core/os.md)** (35KB) — The full system
- Use when: You want guided tool creation
- What it does: Boot sequence, friction scoring, step-by-step methodology
- Best for: First-time users, complex tools, when you want more structure

Start with the OS if you're new. Graduate to the template when you know what you're building.

---

## Quick Start

**Any AI platform:**
1. Download [`format/core/os.md`](format/core/os.md) (full system) or [`format/core/template.md`](format/core/template.md) (template only)
2. Upload to ChatGPT, Claude, Cursor, or any AI
3. Follow the guided flow (OS) or say "float build [what you need]" (template)
4. Collaborate through conversation
5. Receive a custom floatprompt for your use case

**Any project (FloatPrompt System):**
```
npx floatprompt
```
Creates `.float/` folder with system.md, nav files, and the `/float` command for Claude Code.

Update an existing install:
```
npx floatprompt --update
```

**Claude Code (this repo):**
1. Clone this repo
2. Run `/float` — boots the system

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

The template (`format/core/template.md`, 3KB) teaches AI how to create tools. The full system (`format/core/os.md`, 35KB) adds guided creation for deep knowledge work.

### FloatPrompt System — Project Awareness

`.float/` folders that give AI instant awareness of entire directories.

- `.float/system.md` — Boot loader (read first)
- `.float/core/` — FloatPrompt internals (templates, tools)
- `.float/project/` — Your project's data (nav, context, logs)

**Boot sequence:** AI reads system.md, reads all project/nav/*.md files, builds mental model, checks integrity, then executes.

**Get started:** Run `npx floatprompt` in any project to create a `.float/` folder with everything you need.

**Claude Code commands:**
- `/float` — Boot the system
- `/float-sync` — Verify nav files match folders
- `/float-fix` — Hunt stale references and broken links
- `/float-context` — Generate project terrain map
- `/float-enhance` — Fill placeholders, complete frontmatter

---

## Examples

Real floatprompts solving real problems:

| Example | Type | Lines | What It Does |
|---------|------|-------|--------------|
| [AI Portfolio Coach](format/examples/ai%20portfolio%20coach/) | Coach | 729 | Multi-phase guidance producing HTML artifacts |
| [Design Feedback Extractor](format/examples/design%20feedback%20extractor/) | Extractor | 86 | Archaeological extraction preserving voice |
| [MDS Voice Guide](format/examples/mds%20voice%20guide/) | Voice | — | Voice preservation and calibration system |
| [Shortform Caption Writer](format/examples/shortform%20caption%20writer/) | Writer | — | Social media caption generation |
| [Shortform Script Writer](format/examples/shortform%20script%20writer/) | Writer | 200 | Transforms extractions into viral scripts |

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

Context is now provided via float.md files in each folder. Read the float.md in any folder for local context.

For historical context files, see `artifacts/archive/2025/12-dec/context-files/`.

---

## Documentation

**Specifications:**
- [FloatPrompt Format](format/specs/floatprompt.md)
- [floatprompt doc Format](format/specs/doc.md)
- [FloatPrompt System Architecture](system/architecture.md)

**Guides:**
- [What You Can Build](format/docs/use.md)
- [MDS Methodology](format/docs/mds-method.md) (Map → Decide → Structure)
- [Goals](format/docs/goals.md) | [Principles](format/docs/principles.md) | [Voice](format/docs/voice.md) | [Safety](format/docs/safety.md)

---

© 2025 [@MDS](https://mds.is) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
