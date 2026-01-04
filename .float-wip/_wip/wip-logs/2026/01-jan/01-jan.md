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
- **Summaries** — Self-describing filenames (`wip-logs.md`, `2026.md`, `01-jan.md`)

### Nav Structure
- **Mirror project** — `.float/project/` mirrors project folder structure
- **`_project/` at root** — Root context in `_project/` folder (self-describing)
- **Direct files elsewhere** — `src/src-map.md`, not `src/_/map.md`
- **Three files** — map (structure), context (understanding), logs (history/freshness)
- **Emergent behavior** — Agents judge depth/granularity, logs drive freshness

### Storage Architecture
- **Phase 1 (now)** — Flat files for prototyping
- **Phase 2 (complete)** — SQLite index built, importer working, 15 entries imported
- **Phase 3 (complete)** — Scanner built, 65 folders + 446 files in `.float/float.db`
- **Phase 4 (eventually)** — Flat files optional (export only)

### SQLite Replaces
- **floatdoc context files** — `folders` table with `description` + `content_md`
- **logs/ folder hierarchy** — `log_entries` table with date fields + queries
- **Summary files** (01-jan.md, 2026.md) — `folders` rows with `type = 'log_month'`, etc.
- **Cross-reference tracking** — `references` table + JOINs

### Data Model
- **Folder structure is conceptual** — `artifacts/float-folder-structure.md` is data model, not literal files
- **SQLite is source of truth** — Every folder = row, every folder's logs = `log_entries` WHERE `folder_path`
- **Export is optional** — Markdown output for humans/GitHub, not the source

### What Remains
- **boot.md** — THE system prompt for the project
- **AI judgment** — AI still generates summaries, SQLite stores them
- **Markdown export** — Optional, for GitHub/sharing

### Methodology
- **Map → Decide → Structure** — GATE, not suggestion
- **No code without requirements** — Must be able to write complete spec first
- **The question** — "Can I write a complete spec without gaps?" If NO → don't code yet

---

## Files

| File | Summary |
|------|---------|
| [2026-01-02-founding.md](2026-01-02-founding.md) | Original architecture, technology, schema, execution decisions |
| [2026-01-02-archival-structure.md](2026-01-02-archival-structure.md) | Archival folder hierarchy and naming |
| [2026-01-02-archive-unity.md](2026-01-02-archive-unity.md) | ONE archive with Series inside, "logs" as umbrella term |
| [2026-01-02-nav-structure.md](2026-01-02-nav-structure.md) | Mirror project structure, `_/` convention, three files |
| [2026-01-02-vercel-infrastructure.md](2026-01-02-vercel-infrastructure.md) | Vercel AI SDK + Sandbox, Anthropic provider |
| [2026-01-02-manual-prototype-location.md](2026-01-02-manual-prototype-location.md) | Manual prototype at `.float-wip/`, not `docs/sys/` |
| [2026-01-02-project-folder-naming.md](2026-01-02-project-folder-naming.md) | `_/` → `_project/` at root, direct files elsewhere |
| [2026-01-02-self-describing-filenames.md](2026-01-02-self-describing-filenames.md) | `index.md` → self-describing names (`wip-logs.md`, `2026.md`, etc.) |
| [2026-01-02-storage-architecture.md](2026-01-02-storage-architecture.md) | Flat files → SQLite evolution in 4 phases |
| [2026-01-02-sqlite-understanding.md](2026-01-02-sqlite-understanding.md) | **Full SQLite understanding** — schema, what it replaces, boot.md = system prompt |
| [2026-01-02-no-code-without-requirements.md](2026-01-02-no-code-without-requirements.md) | **Methodology enforcement** — Map → Decide → Structure is a GATE |
| [2026-01-03-phase2-planning.md](2026-01-03-phase2-planning.md) | **Phase 2 planning** — 16 questions for importer design |
| [2026-01-03-phase2-planning-complete.md](2026-01-03-phase2-planning-complete.md) | **Phase 2 planning complete** — 16 questions answered, stress tested, ready to build |
| [2026-01-03-phase2-implementation-complete.md](2026-01-03-phase2-implementation-complete.md) | **Phase 2 implementation complete** — importer built, 15 entries imported, schema validated |
| [2026-01-03-phase3-planning-complete.md](2026-01-03-phase3-planning-complete.md) | **Phase 3 planning complete** — Scanner planned, 15 questions answered, ready to build |
| [2026-01-03-phase3-implementation-complete.md](2026-01-03-phase3-implementation-complete.md) | **Phase 3 implementation complete** — Scanner built, verified, 65 folders + 446 files |
| [2026-01-03-schema-drift-fix.md](2026-01-03-schema-drift-fix.md) | **Schema drift fix** — mtime column missing from files table, fixed scan.ts |
| [2026-01-03-wip-archival.md](2026-01-03-wip-archival.md) | **WIP archival** — Archived 4 stale wip files superseded by wip-vision.md |
| [2026-01-03-summaries-in-folders.md](2026-01-03-summaries-in-folders.md) | **Summaries in folders** — Summary files are `folders` rows with `type`, no new table |
| [2026-01-03-schema-spec-locked.md](2026-01-03-schema-spec-locked.md) | **Schema spec locked** — 16 fields via Q&A, AI civilization + token economy concepts |
| [2026-01-03-schema-implementation.md](2026-01-03-schema-implementation.md) | **Schema implementation** — TypeScript/Zod implementation of locked spec, rescan with new schema |
| [2026-01-03-generate-spec-complete.md](2026-01-03-generate-spec-complete.md) | **Generate spec complete** — Layer 2 functions, single-pass algorithm, orchestration + AI instructions |

### Archived Reference Material

| File | Summary |
|------|---------|
| [2026-01-03-wip-schema-spec-archived.md](2026-01-03-wip-schema-spec-archived.md) | 16-field schema spec — IMPLEMENTED |
| [2026-01-03-wip-layer2-spec-archived.md](2026-01-03-wip-layer2-spec-archived.md) | Layer 2 spec draft — superseded by generate-spec |
| [2026-01-03-wip-overview-archived.md](2026-01-03-wip-overview-archived.md) | "How it works" — superseded by wip-vision.md |
| [2026-01-03-wip-problem-archived.md](2026-01-03-wip-problem-archived.md) | "The problem" — superseded by wip-vision.md |
| [2026-01-03-wip-phase3-archived.md](2026-01-03-wip-phase3-archived.md) | Phase 3 scanner planning — COMPLETE |
| [2026-01-03-wip-sqlite-archived.md](2026-01-03-wip-sqlite-archived.md) | SQLite architecture deep dive — superseded by wip-vision.md |

---

*See individual files for full rationale and before/after.*
