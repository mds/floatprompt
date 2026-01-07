# FloatPrompt

Portable AI tools. Text files that transform AI behavior.

---

## The Tooling (Stable)

**[`templates/`](templates/)** — Production-ready floatprompt templates.

| File | Size | Use |
|------|------|-----|
| [`floatprompt.md`](templates/floatprompt.md) | 3KB | Build floatprompts through conversation |
| [`float-os.md`](templates/float-os.md) | 35KB | Guided tool creation with full methodology |
| [`float-doc.md`](templates/float-doc.md) | 5KB | Add context frontmatter to any document |

**Quick start:** Upload any of these to ChatGPT, Claude, or Cursor. Jointly create the output.

```bash
npm install -g floatprompt    # Install CLI
float init                    # Create .float/ in any project
float update                  # Update to latest templates
```

---

## The Vision (In Development)

Everything else in this repo is building toward something larger.

Context that survives sessions. Understanding that compounds over time. AI that remembers what you were working on, what decisions you made, why things are structured the way they are. Not through conversation history, but through persistent, queryable knowledge that lives alongside your code.

The invisible OS for AI.

**Status:** Manual templates are being tested and used in Claude Code. The context infrastructure (`src/`, `.float-workshop/`, the SQLite layer) is active development — the architecture is semi-locked, implementation is ongoing.

---

## Examples

Real floatprompts in [`examples/`](examples/):

- **AI Portfolio Coach** (729 lines) — Multi-phase guidance producing HTML artifacts
- **Design Feedback Extractor** — Archaeological extraction preserving voice
- **Shortform Script Writer** — Transforms extractions into shortform scripts
+ a ton of others that I haven't added here

---

## Documentation

- [FloatPrompt Format](docs/specs/floatprompt.md)
- [MDS Methodology](docs/philosophy/mds-method.md) (Map → Decide → Structure)

---

© 2025 [@MDS](https://mds.is) | [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
