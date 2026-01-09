# FloatPrompt Plugin for Claude Code

**Persistent context that survives sessions and compounds over time.**

> One command. AI operates everything else.

---

## Tree Structure

```
plugins/floatprompt/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest (name, version, entry points)
├── agents/                   # (Reserved for future agent files)
├── commands/
│   └── float.md              # /float command - boots FloatPrompt session
├── hooks/
│   ├── hooks.json            # Hook configuration (PreCompact + SessionEnd)
│   └── float-handoff.sh      # Main hook script (session capture + AI enrichment)
├── lib/
│   ├── schema.sql            # SQLite schema for float.db (9 tables)
│   └── scan.sh               # Layer 1 scanner (folders + files with hashes)
├── templates/
│   └── Float.md              # AI driver's manual (copied to .float/ on init)
└── README.md                 # This file
```

---

## Component Reference

### `.claude-plugin/plugin.json`

**Purpose:** Plugin manifest that Claude Code reads to discover the plugin.

**Contents:**
```json
{
  "name": "floatprompt",
  "version": "1.0.0",
  "description": "Persistent context that survives sessions and compounds over time",
  "author": { "name": "@mds" },
  "commands": "./commands/",
  "hooks": "./hooks/hooks.json",
  "homepage": "https://github.com/mds/floatprompt"
}
```

**Key Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Plugin identifier, used for command namespacing (`/floatprompt:float`) |
| `commands` | string | Path to commands directory (auto-discovers `.md` files) |
| `hooks` | string | Path to hooks configuration file |
| `author` | object | Must be `{"name": "..."}`, not a plain string |

**Reference:**
- [Claude Code Plugin Structure](../../../artifacts/2026/01-jan/claude-code-plugins/plugins-reference.md)
- [Create Plugins Guide](../../../artifacts/2026/01-jan/claude-code-plugins/create-plugins.md)

---

### `commands/float.md`

**Purpose:** The ONE command users run. Boots FloatPrompt session with context continuity.

**Invocation:** `/float` or `/floatprompt:float`

**Behavior:**

| Scenario | Actions |
|----------|---------|
| **First run** (no float.db) | 1. Run `lib/scan.sh` to create database<br>2. Copy `templates/Float.md` to `.float/`<br>3. Report folder count |
| **Subsequent runs** | 1. Query latest session handoff<br>2. Infer focus from recent activity<br>3. Display context + options |

**Key SQL Queries:**
```sql
-- Latest session handoff
SELECT title, decision, rationale, files_changed
FROM log_entries WHERE topic='session-handoff' AND status='open'
ORDER BY created_at DESC LIMIT 1;

-- Recent activity (7 days)
SELECT files_read, files_changed FROM log_entries
WHERE topic='session-handoff' AND date >= date('now', '-7 days')
ORDER BY created_at DESC LIMIT 3;
```

**Reference:**
- [Command Development Guide](../../../artifacts/2026/01-jan/claude-code-plugins/create-plugins.md#commands)
- Session continuity pattern: `.float-workshop/logs/2026/01-jan/2026-01-07-plugin-prd-session-continuity.md`

---

### `hooks/hooks.json`

**Purpose:** Configures automatic lifecycle hooks for session capture.

**Hooks Registered:**

| Event | When | Behavior |
|-------|------|----------|
| `PreCompact` | Context window ~80% full | Full capture: sqlite3 + AI agents |
| `SessionEnd` | User exits session | Fallback capture: sqlite3 only |

**Why Two Hooks:**
- **PreCompact (PRIMARY):** Session is alive, agents complete reliably
- **SessionEnd (FALLBACK):** Terminal may be closing, agents might get killed

Self-deduplicating: If PreCompact runs, SessionEnd skips (5-minute window).

**Reference:**
- [Hooks Reference](../../../artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md)
- Hook events: `PreToolUse`, `PostToolUse`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `PreCompact`, `Notification`

---

### `hooks/float-handoff.sh`

**Purpose:** Main hook script that captures session state and enriches with AI.

**Input:** JSON from stdin with session context:
```json
{
  "session_id": "...",
  "transcript_path": "/path/to/transcript.jsonl",
  "cwd": "/project/directory",
  "reason": "compact",
  "hook_event_name": "PreCompact"
}
```

**Execution Phases:**

| Phase | Always | PreCompact Only | Purpose |
|-------|--------|-----------------|---------|
| **Early exits** | Yes | - | Skip if no .float/, recent handoff, or no changes |
| **Phase 1** | Yes | - | Mechanical sqlite3 INSERT (instant, guaranteed) |
| **Phase 2** | - | Yes | float-log agent: session summary + folder decisions |
| **Phase 3** | - | Yes | float-enrich agent: update folder contexts |
| **Phase 4** | - | Yes | Workshop agents (if .float-workshop/ exists) |

**Key Design Decisions:**
1. **Mechanical first** — sqlite3 INSERT is instant and guaranteed
2. **AI enrichment second** — Agents run best-effort on PreCompact only
3. **git diff for changes** — Detects what files were modified this session
4. **Inline agent prompts** — Uses `claude -p "..."` instead of agent files

**Agents Spawned (PreCompact only):**
- `float-log` — Updates session handoff, creates folder-level locked entries
- `float-enrich` — Updates folder description/context if new understanding
- `float-organize` — Workshop cleanup (if .float-workshop/ exists)
- `float-update-logs` — Creates markdown decision logs (if .float-workshop/ exists)

**Reference:**
- Agent prompts are inline in the script (lines 132-289)
- Bash hook pattern: [Hooks Reference](../../../artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md#command-hooks)

---

### `lib/schema.sql`

**Purpose:** SQLite schema for `.float/float.db` — the persistent context database.

**Tables (9 total):**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `folders` | The things being described | path, description, context, status, source_hash |
| `log_entries` | Decision paper trail | folder_path, topic, status, decision, rationale |
| `files` | Source files tracked | path, content_hash, mtime |
| `references` | Cross-links for staleness | source_type, source_id, target_type, target_id |
| `open_questions` | Unresolved items | question, resolved_by |
| `tags` | Categorization | name |
| `log_entry_tags` | Many-to-many | log_entry_id, tag_id |
| `deep` | Topic-based context | slug, title, content_md, watches |
| `deep_history` | Version history | slug, version, content_md |

**The `folders` Table (16 Fields):**

| Category | Fields |
|----------|--------|
| **Identity** | path (PK), parent_path, name |
| **Governance** | type, status (pending/current/stale) |
| **AI Content** | description, context |
| **Scope** | is_scope, parent_scope_path, scope_boot |
| **Mechanical** | source_hash, last_scanned_at |
| **Attribution** | ai_model, ai_updated |
| **Timestamps** | created_at, updated_at |

**The `log_entries` Table:**

| Status | Meaning |
|--------|---------|
| `locked` | Final decision — never changes |
| `open` | Session handoff — can be updated by agents |
| `superseded` | Replaced by newer entry |

**Reference:**
- Schema spec: `.float-workshop/logs/2026/01-jan/2026-01-02-sqlite-understanding.md`
- Schema locked: Session 43 (2026-01-09)
- TypeScript schemas: `src/db/schema.ts`

---

### `lib/scan.sh`

**Purpose:** Layer 1 mechanical scanner — populates folders AND files tables.

**Usage:**
```bash
./scan.sh [project_dir]
# Defaults to current directory
```

**What It Does:**

| Step | Action |
|------|--------|
| 1 | Create `.float/` directory if needed |
| 2 | Initialize database from `schema.sql` if needed |
| 3 | Walk filesystem with `find`, exclude noise patterns |
| 4 | Insert/update `folders` table (path, parent_path, name) |
| 5 | Insert/update `files` table with SHA-256 content hashes |
| 6 | Compute `source_hash` for each folder (concatenation of child hashes) |
| 7 | Report: "X folders, Y files indexed" |

**Excluded Patterns:**
```
node_modules, .git, .float, .claude, __pycache__, .pytest_cache,
.next, .nuxt, dist, build, .venv, venv, .tox, coverage,
.nyc_output, .cache, .turbo
```

**File Filtering:**
- Text files only (skips binaries)
- Files < 1MB only (skips large files)
- Uses `file` command to detect type

**Reference:**
- TypeScript scanner (more complete): `src/db/scan.ts`
- Scanner design: "Mechanical speed first, AI judgment second"

---

### `templates/Float.md`

**Purpose:** AI driver's manual — teaches Claude how to use float.db.

Copied to `.float/Float.md` on first `/float` run.

**Contents:**

1. **Query Context** — SQL examples for folder context, scope chain, session handoff
2. **When to Query** — Entering folders, checking staleness, finding decisions
3. **Trust Levels** — `current` (trust), `stale` (verify), `pending` (no context yet)
4. **What's Automatic** — Hooks handle session capture, no manual save needed
5. **Update Context** — Optional SQL for writing new understanding

**Key Queries:**
```sql
-- Current folder context
SELECT description, context, status FROM folders WHERE path='/src/auth'

-- Scope chain (current → root)
WITH RECURSIVE chain AS (
  SELECT * FROM folders WHERE path='/src/auth'
  UNION ALL
  SELECT f.* FROM folders f JOIN chain c ON f.path = c.parent_path
)
SELECT path, description FROM chain

-- Latest session handoff
SELECT * FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1
```

**Design Philosophy:**
- Target: <800 tokens
- Teach to fish, not give fish
- AI learns to query, not memorize

**Reference:**
- Context philosophy: `.float-workshop/logs/2026/01-jan/2026-01-05-session30-context-philosophy.md`

---

### `agents/` (Reserved)

**Purpose:** Directory for agent files if needed in future.

Currently empty — agents are spawned inline via `claude -p "..."` in the hook script.

**Potential future agents:**
- `float-enrich.md` — Folder context enrichment
- `float-log.md` — Session logging and decisions
- `float-deep.md` — Deep context generation

**Reference:**
- Draft agents exist at: `.claude/agents/draft/`
- Subagents guide: [Subagents Reference](../../../artifacts/2026/01-jan/claude-code-plugins/subagents.md)

---

## Architecture Overview

```
USER SESSION                           PLUGIN
────────────────────────────────────────────────────────────────

Human runs "claude"
        │
        ▼
Human types /float ──────────────────► commands/float.md
        │                                    │
        │                              ┌─────┴─────┐
        │                              │ First run │
        │                              └─────┬─────┘
        │                                    │
        │                              lib/scan.sh
        │                                    │
        │                              .float/float.db created
        │                              .float/Float.md copied
        │                                    │
        ▼                              ◄─────┘
AI boots with context ◄────────────── Query log_entries, folders
        │
        │
   [Work happens]
        │
        ▼
PreCompact fires ────────────────────► hooks/float-handoff.sh
(or SessionEnd)                              │
        │                              ┌─────┴─────┐
        │                              │  Phase 1  │ sqlite3 INSERT (instant)
        │                              │  Phase 2  │ float-log agent
        │                              │  Phase 3  │ float-enrich agent
        │                              │  Phase 4  │ workshop agents
        │                              └─────┬─────┘
        │                                    │
        ▼                              ◄─────┘
Session ends or compacts               log_entries updated
                                       folders enriched
        │
        ▼
Next session: /float ────────────────► Picks up where you left off
```

---

## Data Flow

```
LAYER 1: MECHANICAL (scan.sh)          LAYER 2: AI ENRICHMENT (agents)
──────────────────────────────────────────────────────────────────────

Filesystem                             Session work
    │                                      │
    ▼                                      ▼
find + sha256 ──────────────────────► log_entries (decisions)
    │                                      │
    ▼                                      ▼
folders table (paths)                  folders.description
files table (hashes)                   folders.context
    │                                      │
    └──────────────┬───────────────────────┘
                   │
                   ▼
            .float/float.db
                   │
                   ▼
            AI queries for context
```

---

## Related Documentation

### Core Concepts

| Document | Location | Summary |
|----------|----------|---------|
| **Vision (Philosophy)** | `docs/vision.md` | Omnipresent recursive context scaffolding — the "why" |
| **Vision (Working Spec)** | `.float-workshop/ref/vision.md` | Schema details, component status, decision rationale |
| **Context Architecture** | `artifacts/2026/01-jan/dot-float-ideas/floatprompt-context-architecture.md` | SQLite is DB, context files are deployed website |
| **SQLite Understanding** | `.float-workshop/logs/2026/01-jan/2026-01-02-sqlite-understanding.md` | Why SQLite, schema design, data flow |
| **Folder Structure** | `.float-workshop/ref/float-folder-structure.md` | Mental model (files) vs reality (SQLite) |
| **Context Philosophy** | `.float-workshop/logs/2026/01-jan/2026-01-05-session30-context-philosophy.md` | "Compressed human judgment" |
| **AI Wants This** | `.float-workshop/ref/ai-wants-this.md` | First-person AI perspective — why FloatPrompt matters |
| **Plugin Spec** | `.float-workshop/active/floatprompt-plugin.md` | Complete plugin specification (authoritative) |
| **Plugin Progress** | `.float-workshop/active/claude-floatprompt-plugin-progress.md` | Build checklist and session log |
| **Human Vision** | `.float-workshop/active/MDS-floatprompt-claude-code-plugin.md` | @MDS's human+AI execution vision |

### Philosophy & Methodology

| Document | Location | Summary |
|----------|----------|---------|
| **Goals** | `docs/philosophy/goals.md` | Three-tier hierarchy: Voice > Behavior > Artifacts |
| **MDS Method** | `docs/philosophy/mds-method.md` | Map → Decide → Structure methodology |
| **Workshop README** | `.float-workshop/README.md` | Workshop structure, commands, workflow lifecycle |

### FloatPrompt System Reference

| Document | Location | Summary |
|----------|----------|---------|
| **Buoys** | `.float-workshop/ref/buoys.md` | AI worker system (7 archetypes) |
| **Generate Spec** | `.float-workshop/ref/generate-spec.md` | Layer 2 context generation |
| **Deep Context Spec** | `.float-workshop/ref/deep-context-spec.md` | Topic-based concept primers |
| **AI-Native Context** | `.float-workshop/ref/ai-native-context.md` | What AI needs vs human navigation |
| **Plugin Architecture** | `.float-workshop/ref/plugin-architecture.md` | Plugin system design |

### Claude Code Plugin System

| Document | Location | Summary |
|----------|----------|---------|
| **Plugin Reference** | `artifacts/2026/01-jan/claude-code-plugins/plugins-reference.md` | Official plugin structure (30KB) |
| **Hooks Reference** | `artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md` | All hook events and patterns (36KB) |
| **Subagents** | `artifacts/2026/01-jan/claude-code-plugins/subagents.md` | Agent spawning patterns (23KB) |
| **Create Plugins** | `artifacts/2026/01-jan/claude-code-plugins/create-plugins.md` | Step-by-step guide |
| **Discover Plugins** | `artifacts/2026/01-jan/claude-code-plugins/discover-plugins.md` | Plugin discovery and loading |
| **Slash Commands** | `artifacts/2026/01-jan/claude-code-plugins/slash-commands.md` | Command patterns |
| **MCP Integration** | `artifacts/2026/01-jan/claude-code-plugins/mcp.md` | Model Context Protocol (38KB) |
| **CLI Reference** | `artifacts/2026/01-jan/claude-code-plugins/cli-reference.md` | Claude Code CLI options |
| **Marketplace** | `artifacts/2026/01-jan/claude-code-plugins/marketplace.md` | Plugin distribution |

### TypeScript Implementation

| File | Location | Summary |
|------|----------|---------|
| **Schema** | `src/db/schema.ts` | Zod schemas + SQL DDL (307 lines) |
| **Scanner** | `src/db/scan.ts` | Full TypeScript scanner (465 lines) |
| **Client** | `src/db/client.ts` | Database operations, Deep context CRUD |

### Decision Logs (January 2026)

| Document | Location | Summary |
|----------|----------|---------|
| **January Index** | `.float-workshop/logs/2026/01-jan/01-jan.md` | All decisions indexed by category |
| **Session 43** | `.float-workshop/logs/2026/01-jan/2026-01-09-session43-schema-restoration.md` | Schema restoration, plugin structure |
| **Session 44** | `.float-workshop/logs/2026/01-jan/2026-01-09-session44-plugin-v1-complete.md` | Plugin v1 complete (7/8 tasks) |
| **Session 45** | `.float-workshop/logs/2026/01-jan/2026-01-09-session45-plugin-validation-scan.md` | Validation fixes, scan enhancement |

### External Resources

| Resource | URL | Summary |
|----------|-----|---------|
| Claude Code Docs | https://docs.anthropic.com/claude-code | Official documentation |
| Plugin Marketplace | `claude plugin marketplace list` | Available plugins |
| FloatPrompt Repo | https://github.com/mds/floatprompt | Source repository |

---

## Quick Reference

### Installation (Development)

```bash
# Test plugin locally
claude --plugin-dir ./plugins/floatprompt

# Validate plugin
claude plugin validate ./plugins/floatprompt
```

### Common Queries

```bash
# Folder count
sqlite3 .float/float.db "SELECT COUNT(*) FROM folders"

# File count
sqlite3 .float/float.db "SELECT COUNT(*) FROM files"

# Recent decisions
sqlite3 .float/float.db "SELECT folder_path, topic, title FROM log_entries WHERE status='locked' ORDER BY created_at DESC LIMIT 5"

# Stale folders
sqlite3 .float/float.db "SELECT path FROM folders WHERE status='stale'"

# Session handoffs
sqlite3 .float/float.db "SELECT id, title, date FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC"
```

### Rescan Project

```bash
# Re-run scanner (updates existing database)
bash plugins/floatprompt/lib/scan.sh .
```

---

## Changelog

| Date | Session | Changes |
|------|---------|---------|
| 2026-01-09 | 45 | Added Philosophy & Methodology section: goals, MDS method, workshop README |
| 2026-01-09 | 45 | Added AI Wants This, Vision (Working Spec) to Core Concepts |
| 2026-01-09 | 45 | Expanded Related Documentation: 34 verified references across 7 categories |
| 2026-01-09 | 45 | Created README.md with full documentation |
| 2026-01-09 | 45 | Enhanced scan.sh: files table with SHA-256 hashes |
| 2026-01-09 | 45 | Fixed plugin.json schema validation (author, commands, hooks) |
| 2026-01-09 | 45 | Enhanced float-handoff.sh: folder-level logging |
| 2026-01-09 | 44 | Initial plugin structure: all core components |
| 2026-01-09 | 43 | Schema created, float.db initialized |

---

*Created: 2026-01-09 (Session 45)*
*Last updated: 2026-01-09 (Session 45)*
*References verified: 34 files across docs/, artifacts/, .float-workshop/, src/*
