# FloatPrompt

> **The invisible OS for AI**

FloatPrompt is a portable protocol for human-AI collaboration. It preserves your voice, your context, and your thinking — across any AI platform.

---

## Quick Start

1. **Upload a template** from `templates/` to any AI system
2. **Say** `"run floatprompt on [my content]"` or use triggers like `float map`, `float extract`, `float build`
3. **Get better AI collaboration** — your voice preserved, your context intact

### Templates

| File | Purpose |
|------|---------|
| [`floatprompt.md`](templates/floatprompt.md) | Core behavioral tool template (frontmatter format) |
| [`float-doc.md`](templates/float-doc.md) | Lightweight context frontmatter for any document |
| [`float-doc-robust.md`](templates/float-doc-robust.md) | Full-featured document frontmatter |
| [`float-os.md`](templates/float-os.md) | Complete OS template (modes, methodology, voice) |

---

## Format

FloatPrompt uses YAML frontmatter plus a markdown body. It is a dual-audience format. The frontmatter carries behavioral context for the AI, and the body carries readable content for humans. No wrapper tags. The `---` fences mark the boundary, the same shape the industry later standardized as Agent Skills.

- **`metadata.config`** holds the structured behavioral payload (STOP directive, human intent, AI role, requirements)
- **the markdown body** holds readable methodology for humans

```
---
name: my-tool
description: "What this does and when to use it, with trigger phrases."
metadata:
  config: {
    "STOP": "Mode directive that forces the AI to pause and read",
    "version": "0.1.0",
    "archetype": "behavioral",
    "human": { "author": "...", "intent": "...", "context": "..." },
    "ai": { "model": "..." },
    "requirements": { }
  }
---

# Human-readable content here
```

Top-level keys are **name**, **description**, and **metadata**. Inside `metadata.config` the behavioral fields are **STOP**, **human**, **ai**, and **requirements**. Everything tool-specific nests inside `requirements`.

---

## A note on timing

FloatPrompt's first working build shipped June 11, 2025.

Anthropic announced Agent Skills (the `SKILL.md` format) on October 16, 2025, and published it as an open standard on December 18, 2025.

FloatPrompt arrived about four months before the feature and six months before the standard. The core idea was the same from day one. Package behavior and context into one portable plain-text file, with structured frontmatter for the AI and readable markdown for the human, then upload it anywhere to turn a general model into a specialized tool. The earliest package description even called it "smart sticky notes for AI that work everywhere."

This release aligns FloatPrompt's shape with the now-official Agent Skills convention. Not because FloatPrompt followed it, but because the two converged on the same answer, and there is now a shared standard worth meeting.

---

## Documentation

### Philosophy
- **[Manifesto](docs/manifesto.md)** — Vision: "Start where you left off"
- **[Goals](docs/goals.md)** — Three-tier hierarchy: voice preservation > AI precision > task completion
- **[Principles](docs/principles.md)** — Core system principles
- **[Voice](docs/voice.md)** — Voice preservation methodology
- **[Safety](docs/safety.md)** — Safety systems and human authority
- **[Value](docs/value.md)** — What FloatPrompt provides

### Method & Format
- **[MDS Method](docs/mds-method.md)** — Map / Decide / Structure
- **[FP Format](docs/fp.md)** — Format specification
- **[Naming](docs/naming.md)** — Naming conventions
- **[Orientation](docs/orientation.md)** — How to get started
- **[Discovery](docs/discovery.md)** — Research and cognitive efficiency
- **[Use](docs/use.md)** — Usage patterns
- **[Context](docs/context.md)** — Context architecture

---

## Modular System

The `src/` directory contains the modular template system:

```
src/sys/           15 markdown modules (boot, modes, chaining, enforcement, etc.)
src/sys/shared/    17 YAML behavioral components (voice-preservation, certification, etc.)
src/lib/voice/     Voice guide components
src/shared/        Shared footer
scripts/build.mjs  Build system — assembles modules into complete templates
```

Build with `npm run build` to compile modules into a single output file.

---

## Core Ideas

- **Voice preservation** — "First, do not rewrite." Your phrasing, rhythm, tone stay intact.
- **Archaeological extraction** — Structure what exists. Never generate what doesn't.
- **Recognition before action** — AI reflects your intent back before acting.
- **Cross-platform freedom** — Plain text files that work everywhere, outlast any platform.
- **Human authority** — You keep complete control. AI executes, doesn't decide.

---

## License

[Creative Commons Attribution 4.0](LICENSE)

---
(c) 2025 [MDS](https://mds.is) | CC BY 4.0
