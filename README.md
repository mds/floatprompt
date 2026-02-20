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
| [`floatprompt.md`](templates/floatprompt.md) | Core `<fp>` format — behavioral tool template |
| [`float-doc.md`](templates/float-doc.md) | Lightweight context frontmatter for any document |
| [`float-doc-robust.md`](templates/float-doc-robust.md) | Full-featured document frontmatter |
| [`float-os.md`](templates/float-os.md) | Complete OS template (modes, methodology, voice) |

---

## Format

FloatPrompt uses `<fp><json><md></fp>` — a dual-audience format:

- **`<json>`** — structured metadata for AI behavioral context (STOP directive, human intent, AI role, requirements)
- **`<md>`** — readable content for humans

```
<fp>
<json>
{
  "STOP": "Mode directive — forces AI to pause and read",
  "meta": { "title": "...", "id": "...", "format": "floatprompt" },
  "human": { "author": "...", "intent": "...", "context": "..." },
  "ai": { "role": "...", "behavior": "..." },
  "requirements": { ... }
}
</json>
<md>
# Human-readable content here
</md>
</fp>
```

Five universal fields: **STOP**, **meta**, **human**, **ai**, **requirements**. Everything else nests inside `requirements`.

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
