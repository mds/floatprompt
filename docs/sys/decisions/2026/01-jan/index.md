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

### Archival Structure
- **Hierarchy** — Collection/Series/File/Item → decisions/year/month/logs
- **Naming** — `YYYY/MM-mon/DD-topic.md`
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
| [02-founding.md](02-founding.md) | Original architecture, technology, schema, execution decisions |
| [02-archival-structure.md](02-archival-structure.md) | Archival folder hierarchy and naming |
| [02-archive-unity.md](02-archive-unity.md) | ONE archive with Series inside, "logs" as umbrella term |
| [02-nav-structure.md](02-nav-structure.md) | Mirror project structure, `_/` convention, three files |

---

*See individual files for full rationale and before/after.*
