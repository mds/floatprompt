# Decisions

Current locked decisions and navigation map.

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
- **Summaries** — `index.md` at every level

---

## Map

| Path | Summary |
|------|---------|
| `2026/01-jan/02-founding.md` | Original architecture, technology, schema, execution decisions |
| `2026/01-jan/02-archival-structure.md` | Archival folder structure decision |

---

## Protocol

When adding decisions:
1. Create `DD-topic.md` in current month folder
2. Update this index with summary + map entry
3. Update month's `index.md`

---

*See individual files for full rationale and before/after.*
