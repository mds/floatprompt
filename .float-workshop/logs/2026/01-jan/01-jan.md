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

### Naming
- **Buoys, not agents** — Parallel task workers are called "buoys" (differentiation, less threatening, thematic coherence with Float)

### Infrastructure
- **Vercel AI SDK** — Orchestration, streaming, tool calling
- **Vercel Sandbox** — Isolated buoy execution, scalable
- **Anthropic (Claude)** — Provider for context and reasoning
- **AI SDK Migration** — 4-phase path from raw Anthropic API to SDK + Sandbox + MCP

### Archival Structure
- **Hierarchy** — Collection/Series/File/Item → logs/year/month/entries
- **Naming** — `YYYY-MM-DD-topic.md` (full date, self-describing)
- **Summaries** — Self-describing filenames (`logs.md`, `2026.md`, `01-jan.md`)

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

### Buoy Architecture
- **7 Buckets** — Generators, Validators, Fixers, Mappers, Integrators, Orchestrators, Recorders
- **AI vs Code** — Buoys are for judgment, code is for mechanics
- **Hub-and-Spoke** — Buoys never talk directly, all through orchestrator
- **Nested Hierarchy** — Top Orchestrator → Coordinator → Worker
- **Schema** — meta (identity), ai (role/archetype/autonomy), input (receives/defaults), output (produces)
- **Philosophy** — Tight on identity/contracts, loose on format/judgment
- **3-Layer Composition** — Global → Archetype → Specific (scales to 55+ buoys)
- **Execution Model** — TypeScript → Claude API (TS orchestrates, Claude thinks, SQLite stores)

### Production Boot
- **Location** — `.float/boot-draft.md` during development, renamed to `boot.md` when stable
- **Purpose** — Entry point for AI sessions in user projects (not workshop)
- **Co-evolution** — Boot and buoys built together, evolving as we learn

### Deep Context
- **Topic-based** — `deep` table for concept primers (buoys, vision, fleet, brand)
- **Not location-based** — Complements folders table, spans multiple locations
- **Auto-detect watches** — Creation buoy determines staleness triggers
- **Version history** — `deep_history` table for diffing and rollback
- **Command** — `/float deep <slug>` to recall into session

### Layer 3: Ongoing System
- **99% case optimization** — Repeat users are the target, not first-time setup
- **Amortization principle** — Pay AI cost once, read artifacts forever
- **Two boot modes** — `create-floatprompt` (first time) vs `snapshot boot` (repeat, <800 tokens)
- **Background buoys** — pattern-detector, decision-logger, context-linker, next-steps run during sessions
- **Continuous synthesis** — Handoff isn't discrete event, it's ongoing
- **Workshop graduation** — Protocols become automated infrastructure, workshop becomes override layer
- **Migration path** — Parallel → Assisted → Supervised → Fully Automatic

### Handoff Agents
- **float-* naming** — All handoff agents use `float-` prefix (float-session-boot, float-session-handoff, float-update-logs, float-organize)
- **Thin agent pattern** — Agents reference protocol files for logic, not inline
- **2-agent handoff** — Consolidated from 4 to 2: update-logs (decisions) + organize (state/files/archive)
- **Session-boot frozen** — ~150 lines of static content only (vision, methodology, layers, structure)
- **Dynamic state** — AI reads ACTIVE/LATER/logs for current state, recommends next steps interactively

### Protocol Migration (Session 26)
- **Native Claude Code patterns** — Workshop protocols migrated to commands + agents
- **Commands** — `/float-boot` and `/float-handoff` (self-contained, no protocol references)
- **Agents** — `float-organize` and `float-update-logs` (self-contained)
- **Protocols archived** — Original protocols moved to `done/protocol-*.md`
- **Workshop vs Core** — Workshop layer uses Claude Code patterns, FloatPrompt core (buoys, SQLite) stays custom

### Track 1 Workshop Plugin (Session 28-29)
- **Priority 1** — Track 1 (workshop plugin with float.db) is now top priority
- **Rationale** — Smaller scope, validates patterns, uses existing infrastructure
- **Layer 2 only** — AI generation, no autonomous monitoring (Layer 3)
- **Native Claude Code patterns** — Pure YAML + markdown format (not hybrid `<fp>`)

**Components (locked Session 29):**
- **Skill (1)** — `floatdb` (query float.db + notice enrichment opportunities)
- **Agent (1)** — `float-context-generator` (generates context, includes scope detection)
- **Commands (3)** — `/float` (boot), `/float-deepen` (enrich), `/float-handoff` (end session)
- **CLI interface** — Agent uses `float-db` CLI via Bash (not raw sqlite3)

**Lifecycle:** `/float` (boot) → work → `/float-deepen` (as needed) → `/float-handoff` (cleanup)

### Templates
- **Flat structure** — `templates/workshop/`, `templates/agents/` (not `templates/.float/workshop/`)
- **Rationale** — `.float/` implies generated/ephemeral, but these are source templates

### Non-Features
- **No wikilinks** — `[[links]]` in markdown don't serve the vision. Relationships belong in `references` table, not prose. SQLite queries are AI navigation, wikilinks are human flatfile navigation.

### Context Philosophy (Session 30)
- **Compressed human judgment** — Context is not just information, it's distilled judgment calls, rationale, and understanding
- **CLAUDE.md extension** — Float.db extends CLAUDE.md for projects that outgrow one file
- **Adoption criteria** — 50+ folders, dynamic context, long-term AI collaboration
- **AI perspective** — "Every session starts cold, understanding dies with session" — float.db solves this
- **Queryable vs navigable** — Flat files for humans (navigable), SQLite for AI (queryable) — same structure, different interface
- **Plugin extension** — `/float init` extends `/init`, not replaces — FloatPrompt extends Claude Code
- **PreCompact hook** — Claude Code's `PreCompact` hook (matcher `auto`) enables future auto-handoff when context fills; threshold warnings (80-90%) and real-time % are feature request territory

### Modes System (Sessions 31-32)
- **Modes as loadouts** — modes/ folder for context loadouts, "getting dressed for the work"
- **Framework** — Role, Activate when, Exit when, Load, Hold, Ignore
- **CLAUDE.md baseline** — Operational guidance every session needs; "note on the door" vs modes as "institutional knowledge"
- **Mode generator** — /float-mode command with hypothesis-first approach (analyzes session, proposes mode)
- **Organize integration** — float-organize agent registers new modes in MODES.md
- **Activate/create duality** — /float-mode handles both activation and creation, with smart session state detection
- **deep-plugin mode** — Implementer role for Track 1 work, spec as compass (not rigid map)
- **Boot integration** — /float-boot step 5 offers mode activation after reading state

### Track 1 Spec Revision (Session 34)
- **Command rename** — `/float-boot` → `/float` (simpler, like `/init`)
- **Skill + agent pattern** — `/float-deepen` replaced by `float-enrich` skill + `float-enricher` agent
- **Two operations clarified** — Mode crystallization (cross-cutting topic, `/float-mode`) vs folder enrichment (specific folder, skill + agent)
- **Enrichment paths** — Organic (skill notices gap during work) and batched (handoff offers at session end)
- **Context-efficient deep knowledge** — float.db solves context bloat (50k tokens → 3-5k tokens via query-on-demand)
- **Context hygiene principle** — All float components must REDUCE context, not add to it

### Track 1 Architecture (Session 35)
- **Four enrichment paths** — Manual (`/float-enrich`), Organic (skill notices), Batched (handoff), Emergency (PreCompact hook)
- **Modes stay markdown** — Human-curated, not in float.db. Future: store in DB, export to markdown for editing
- **Folder tracking** — AI memory at handoff, transcript parse for PreCompact
- **Component pattern** — Command + Agent + Skill for each capability (trigger, work, awareness)
- **Implementation phases** — Phase 1 (Core), Phase 2 (Integration), Phase 3 (Emergency), Phase 4 (Polish)
- **Boot.md refined last** — Don't over-specify until components exist

### Adoption-First Plugin (Session 36)
- **One command interface** — `/float` is the entire user interface, no other commands for users
- **Skills as automated protocols** — Skills notice opportunities, spawn agents automatically; "the skill IS the protocol, automated"
- **Hooks for lifecycle** — Hooks trigger handoff at session end, users don't invoke manually
- **Proactive mode suggestions** — System recommends modes based on detected patterns, not required
- **Track framing dropped** — No more "Track 1/Track 2" terminology, just "the plugin"
- **Old spec archived** — `track1-workshop-plugin-spec.md` → `done/track1-workshop-plugin-spec-historical.md`

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
| [2026-01-03-orchestration-decisions.md](2026-01-03-orchestration-decisions.md) | **Orchestration locked** — O1-O3: CLI interface, no MCP, DB is progress |
| [2026-01-03-layer2-implementation.md](2026-01-03-layer2-implementation.md) | **Layer 2 implementation** — generate.ts (5 functions) + CLI wrapper (7 commands) |
| [2026-01-03-context-architecture.md](2026-01-03-context-architecture.md) | **Context architecture** — City metaphor, buoy-boot templates, lean/full context depth (superseded by buoy-schema-locked) |
| [2026-01-04-buoy-architecture.md](2026-01-04-buoy-architecture.md) | **Buoy architecture** — 55+ workers, assembly pattern, domain fleets, Recon Buoy pattern |
| [2026-01-04-buoy-naming.md](2026-01-04-buoy-naming.md) | **Buoy naming** — Parallel workers are "buoys" not "agents" (differentiation, less threatening, thematic fit) |
| [2026-01-04-buoy-schema-locked.md](2026-01-04-buoy-schema-locked.md) | **Buoy schema locked** — 7 buckets, hub-and-spoke, AI vs code separation, schema spec |
| [2026-01-04-workshop-restructure-spec.md](2026-01-04-workshop-restructure-spec.md) | **Workshop restructure spec** — .float-wip → .float-workshop, protocols/ + docs/ + logs/, split wip-logs.md |
| [2026-01-04-handoff-naming.md](2026-01-04-handoff-naming.md) | **Handoff naming** — reconcile.md → handoff.md (describes primary purpose better) |
| [2026-01-04-layer2-buoy-spec.md](2026-01-04-layer2-buoy-spec.md) | **Layer 2 buoy spec** — A1-A4 answered, Context Generator buoy created, full generation complete |
| [2026-01-04-layer2-quality-reflection.md](2026-01-04-layer2-quality-reflection.md) | **Layer 2 quality reflection** — Honest assessment, 5 future tests, validation criteria |
| [2026-01-04-test1-agent-spawned-generation.md](2026-01-04-test1-agent-spawned-generation.md) | **Test 1 confirmed** — Agent-spawned generation produces 2x richer context than inline, fleet mode validated |
| [2026-01-04-test2a-fresh-orientation.md](2026-01-04-test2a-fresh-orientation.md) | **Test 2A validated** — Fresh AI orients from ~500 tokens, 5/5 passed, independently articulated value prop: "compressing human judgment into injectable context" |
| [2026-01-04-buoy-system-formalized.md](2026-01-04-buoy-system-formalized.md) | **Buoy system formalized** — TypeScript infrastructure in src/buoys/, CLI commands, staleness-checker template |
| [2026-01-04-archetype-plan-ready.md](2026-01-04-archetype-plan-ready.md) | **Archetype plan ready** — 3-layer composition plan complete, 4 areas flagged for implementation attention |
| [2026-01-04-archetype-externalization-complete.md](2026-01-04-archetype-externalization-complete.md) | **Archetype externalization complete** — 3-layer composition implemented (global + archetype + specific), 8 new files, CLI updated |
| [2026-01-04-deep-context-spec.md](2026-01-04-deep-context-spec.md) | **Deep context spec** — Topic-based context via `deep` + `deep_history` tables, `/float deep <slug>` command, auto-detect watches |
| [2026-01-04-boot-draft-and-buoys.md](2026-01-04-boot-draft-and-buoys.md) | **Boot draft + buoys** — Production boot at `.float/boot-draft.md`, execution model (TS→Claude API), scope-detector + decision-logger buoys |
| [2026-01-04-buoy-execution-test.md](2026-01-04-buoy-execution-test.md) | **Buoy execution test** — All 4 buoys validated with real API calls, CLI `buoy execute` command added |
| [2026-01-04-cli-batch-command.md](2026-01-04-cli-batch-command.md) | **CLI batch command** — `buoy batch` for parallel execution with optional concurrency limiting |
| [2026-01-04-deep-context-floatprompt-created.md](2026-01-04-deep-context-floatprompt-created.md) | **Deep context created** — First manual deep context document for system orientation, 5 design decisions answered |
| [2026-01-04-layer3-vision-captured.md](2026-01-04-layer3-vision-captured.md) | **Layer 3 vision captured** — Ongoing system spec, background buoys, snapshot boots, workshop graduation, 6-angle problem framing |
| [2026-01-04-deep-context-implementation.md](2026-01-04-deep-context-implementation.md) | **Deep context implementation** — `deep` + `deep_history` tables, CRUD functions, CLI commands, first deep context imported |
| [2026-01-04-wikilinks-not-needed.md](2026-01-04-wikilinks-not-needed.md) | **Wikilinks not needed** — `[[links]]` don't serve vision, relationships belong in `references` table not markdown prose |
| [2026-01-04-test2b-full-orientation.md](2026-01-04-test2b-full-orientation.md) | **Test 2B validated** — boot.md + DB context provides comprehensive orientation, 7/7 passed, "70-80% for productive work" |
| [2026-01-04-vercel-infrastructure-evolution.md](2026-01-04-vercel-infrastructure-evolution.md) | **Vercel infrastructure evolution** — FdI + Self-Driving parallels to FloatPrompt's folder-defined context and background buoys |
| [2026-01-04-vercel-sdk-integration-spec.md](2026-01-04-vercel-sdk-integration-spec.md) | **Vercel SDK integration spec** — AI SDK, Sandbox, MCP migration path with 4 phases |
| [2026-01-04-float-build-spec-drafted.md](2026-01-04-float-build-spec-drafted.md) | **float build spec drafted** — Static context generation MVP, decisions locked (path encoding, location, tier), ready for lock |
| [2026-01-04-priority-update.md](2026-01-04-priority-update.md) | **Priority update** — Reset to core vision: run buoys on 65 folders, fill SQLite, then vision works. Tabled `float build` and `float sync`. |
| [2026-01-05-plugin-architecture-exploration.md](2026-01-05-plugin-architecture-exploration.md) | **Plugin architecture exploration** — FloatPrompt as Claude Code plugin, hybrid format decision (YAML + `<fp>`), database state corrected. |
| [2026-01-05-handoff-agent-architecture.md](2026-01-05-handoff-agent-architecture.md) | **Handoff agent architecture** — 5 agents with float-* naming, `<fp><json><md>` format, thin agents referencing protocols, float-update-boot runs last. |
| [2026-01-05-session-consolidation.md](2026-01-05-session-consolidation.md) | **Session consolidation** — 2-agent handoff (update-logs + organize), session-boot frozen (~150 lines static), templates naming flattened. |
| [2026-01-05-protocol-to-native-migration.md](2026-01-05-protocol-to-native-migration.md) | **Protocol to native migration** — Workshop protocols → Claude Code commands/agents, protocols archived to done/. |
| [2026-01-05-track1-workshop-plugin-decision.md](2026-01-05-track1-workshop-plugin-decision.md) | **Track 1 workshop plugin** — Priority 1, Claude Code native patterns (skills + agents + commands), Layer 2 only. |
| [2026-01-05-track1-plugin-spec-locked.md](2026-01-05-track1-plugin-spec-locked.md) | **Track 1 plugin spec locked** — 1 skill (floatdb), 3 commands (/float, /float-deepen, /float-handoff), 1 agent (float-context-generator). Pure YAML + markdown format. |
| [2026-01-05-session30-context-philosophy.md](2026-01-05-session30-context-philosophy.md) | **Context philosophy locked** — Context is "compressed human judgment", AI perspective documented, queryable vs navigable distinction, plugin extension vision. |
| [2026-01-06-modes-system.md](2026-01-06-modes-system.md) | **Modes system locked** — Context loadouts via modes/ folder, CLAUDE.md baseline, /float-mode with activate/create duality, deep-plugin mode, compass framing. |
| [2026-01-06-ai-native-context.md](2026-01-06-ai-native-context.md) | **AI-native context** — What AI needs (queryable, typed, hierarchical) vs human navigation patterns. Reference doc created. |
| [2026-01-06-track1-spec-revision.md](2026-01-06-track1-spec-revision.md) | **Track 1 spec revision** — `/float-boot` → `/float`, skill + agent replaces `/float-deepen`, mode crystallization vs folder enrichment clarified, context hygiene principle. |
| [2026-01-06-track1-architecture.md](2026-01-06-track1-architecture.md) | **Track 1 architecture** — Four enrichment paths, component pattern (command + agent + skill), phased implementation, boot.md refined last. |
| [2026-01-07-adoption-first-plugin.md](2026-01-07-adoption-first-plugin.md) | **Adoption-first plugin** — ONE command (`/float`), skills as automated protocols, hooks for lifecycle, track framing dropped. |

### Archived Reference Material

| File | Summary |
|------|---------|
| [2026-01-03-wip-schema-spec-archived.md](2026-01-03-wip-schema-spec-archived.md) | 16-field schema spec — IMPLEMENTED |
| [2026-01-03-wip-layer2-spec-archived.md](2026-01-03-wip-layer2-spec-archived.md) | Layer 2 spec draft — superseded by generate-spec |
| [2026-01-03-wip-overview-archived.md](2026-01-03-wip-overview-archived.md) | "How it works" — superseded by wip-vision.md |
| [2026-01-03-wip-problem-archived.md](2026-01-03-wip-problem-archived.md) | "The problem" — superseded by wip-vision.md |
| [2026-01-03-wip-phase3-archived.md](2026-01-03-wip-phase3-archived.md) | Phase 3 scanner planning — COMPLETE |
| [2026-01-03-wip-sqlite-archived.md](2026-01-03-wip-sqlite-archived.md) | SQLite architecture deep dive — superseded by wip-vision.md |
| [2026-01-03-wip-layer2-capabilities-archived.md](2026-01-03-wip-layer2-capabilities-archived.md) | Layer 2 capabilities — superseded by wip-generate-spec.md |
| [2026-01-03-wip-phase4-qa-archived.md](2026-01-03-wip-phase4-qa-archived.md) | Phase 4 QA — schema implemented, decisions answered |

---

*See individual files for full rationale and before/after.*
