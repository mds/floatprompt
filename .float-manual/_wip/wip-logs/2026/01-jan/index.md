# January 2026 Decisions

Foundational month for context-compiler. Established architecture, execution model, and archival structure.

---

## Current (Locked)

### Architecture
- **src/ → dist/** — Source in src/, output in dist/
- **npm = install only** — `float init` scaffolds, AI orchestrates everything else
- **boot.md** — THE instruction file for AI (renamed from system.md)

### Technology
- **TypeScript native** — Template literals, no Handlebars/React
- **Zod for schemas** — Types + runtime validation
- **Two formats** — FloatPrompt (`<fp>`) for tools, FloatDoc (YAML) for context

### Schema
- **Required: id + title only** — Everything else optional
- **meta.type: system | custom** — Determines validation strictness
- **ai.role only** — Behavior goes in requirements
- **requirements is loose** — `Record<string, unknown>`, AI's playground

### Execution Model
- **AI orchestrates, code executes** — AI delegates to TS/CLI/buoys/cognition
- **Buoy principle** — Never do alone what 3-4 buoys can do together
- **Agents build, local understands** — Cloud maintains, local helps human

### Infrastructure
- **Vercel AI SDK** — Orchestration, streaming, tool calling
- **Vercel Sandbox** — Isolated buoy execution, scalable
- **Anthropic (Claude)** — Provider for context and reasoning

### Archival Structure
- **Hierarchy** — Collection/Series/File/Item → logs/year/month/entries
- **Naming** — `YYYY-MM-DD-topic.md` (full date, self-describing)
- **Summaries** — `index.md` at every level, richest at month level

### Nav Structure
- **Mirror project** — `.float/project/` mirrors project folder structure
- **`_/` convention** — Each folder gets `_/` containing map.md, context.md, logs/
- **Three files** — map (structure), context (understanding), logs (history/freshness)
- **Emergent behavior** — Agents judge depth/granularity, logs drive freshness

---

## Files

| File | Summary |
|------|---------|
| [2026-01-02-founding.md](2026-01-02-founding.md) | Original architecture, technology, schema, execution decisions |
| [2026-01-02-archival-structure.md](2026-01-02-archival-structure.md) | Archival folder hierarchy and naming |
| [2026-01-02-archive-unity.md](2026-01-02-archive-unity.md) | ONE archive with Series inside, "logs" as umbrella term |
| [2026-01-02-nav-structure.md](2026-01-02-nav-structure.md) | Mirror project structure, `_/` convention, three files |
| [2026-01-02-vercel-infrastructure.md](2026-01-02-vercel-infrastructure.md) | Vercel AI SDK + Sandbox, Anthropic provider |
| [2026-01-02-manual-prototype-location.md](2026-01-02-manual-prototype-location.md) | Manual prototype at `.float-manual/`, not `docs/sys/` |

---

*See individual files for full rationale and before/after.*
