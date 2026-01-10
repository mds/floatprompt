# FloatPrompt Plugin for Claude Code

**The invisible OS for AI. Persistent context that survives sessions and compounds over time.**

> One command. AI operates everything else.

---

## Tree Structure

```
plugins/floatprompt/
├── .claude-plugin/
│   └── plugin.json           # Plugin manifest (name, version, author)
├── agents/                   # AI agents spawned by hooks
│   ├── float-log.md          # Session handoff entry (parallel)
│   ├── float-decisions.md    # Folder decisions + questions (parallel)
│   ├── float-enrich.md       # Folder context enrichment
│   └── float-handoff.md      # Writes .float/handoff.md
├── commands/
│   ├── float.md              # /float command - boot + operating manual
│   └── float-capture.md      # /float-capture command - manual context capture
├── skills/
│   └── float-context/        # Context lookup skill
│       └── SKILL.md
├── hooks/
│   ├── hooks.json            # Hook configuration (PreCompact + SessionEnd)
│   └── float-capture.sh      # Main hook script (session capture + AI enrichment)
├── lib/
│   ├── boot.sh               # Boot query script (JSON output for /float)
│   ├── schema.sql            # SQLite schema for float.db (9 tables)
│   ├── scan.sh               # Layer 1 scanner (Rust-powered, bash fallback)
│   └── scanner/              # Rust merkle scanner (~230x faster)
│       ├── index.js          # napi-rs bindings
│       ├── scan-cli.js       # Node.js CLI wrapper
│       └── *.node            # Platform-specific binaries
├── templates/
│   └── handoff.md            # Template for .float/handoff.md structure
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
  "description": "The invisible OS for AI-persistent context that survives sessions and compounds over time",
  "author": { "name": "@mds" },
  "homepage": "https://github.com/mds/floatprompt"
}
```

**Key Fields:**
| Field | Type | Purpose |
|-------|------|---------|
| `name` | string | Plugin identifier, used for command namespacing (`/floatprompt:float`) |
| `version` | string | Semantic version |
| `description` | string | Brief description shown in plugin listings |
| `author` | object | Must be `{"name": "..."}`, not a plain string |

**Auto-discovery:** Commands, agents, skills, and hooks are auto-discovered from standard directory names (`commands/`, `agents/`, `skills/`, `hooks/hooks.json`).

**Reference:**
- [Claude Code Plugin Structure](../../../artifacts/2026/01-jan/claude-code-plugins/plugins-reference.md)
- [Create Plugins Guide](../../../artifacts/2026/01-jan/claude-code-plugins/create-plugins.md)

---

### `commands/float.md`

**Purpose:** The ONE command users run. Comprehensive boot procedure + operating manual for AI.

**Invocation:** `/float` or `/floatprompt:float`

**What It Contains:**
- **What This Is** — FloatPrompt as persistent context infrastructure
- **Who You Are** — Technical partner with memory and judgment
- **What You Have** — Database tables (folders, files, log_entries, etc.)
- **How to Query** — Key SQL patterns for context, scope chain, decisions
- **Trust Levels** — current/stale/pending status meanings
- **Your Responsibility** — The enrichment loop, "be a good ancestor"
- **Methodology** — Map → Decide → Structure (MDS) gate
- **Boot Procedure** — First run vs subsequent runs
- **Session Protocol** — Boot, work, capture, next

**Behavior:**

| Scenario | Actions |
|----------|---------|
| **First run** (no float.db) | 1. Run `lib/scan.sh` to create database<br>2. Offer enrichment<br>3. Educate about capture |
| **Subsequent runs** | 1. Query session handoff, decisions, staleness<br>2. Synthesize naturally<br>3. Offer to continue |

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

### `commands/float-capture.md`

**Purpose:** Manual context capture mid-session. Use when you want to save significant work without ending.

**Invocation:** `/float-capture` or `/floatprompt:float-capture`

**When to Use:**

| Automatic (hooks) | Manual (/float-capture) |
|-------------------|-------------------------|
| PreCompact — context filling up | Just completed significant work |
| SessionEnd — leaving | Want to checkpoint mid-session |
| You don't think about it | Intentional "save point" |

**Behavior:**
1. Check for `.float/float.db` (skip if not initialized)
2. Check for recent capture (skip if captured in last 5 min)
3. Phase 1: Mechanical sqlite3 INSERT
4. Phase 2: Parallel agents (float-log + float-decisions)
5. Phase 3: float-enrich agent (folder context)
6. Phase 4: float-handoff agent (writes handoff.md)

**Note:** Manual capture behaves like PreCompact — full AI enrichment while session is alive.

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

### `hooks/float-capture.sh`

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
| **Phase 2** | - | Yes | Parallel: float-log (handoff) + float-decisions (folder decisions) |
| **Phase 3** | - | Yes | float-enrich agent: update folder contexts |
| **Phase 4** | - | Yes | float-handoff agent: write `.float/handoff.md` |
| **Phase 5** | - | Yes | Workshop agents (if .float-workshop/ exists) |

**Key Design Decisions:**
1. **Mechanical first** — sqlite3 INSERT is instant and guaranteed
2. **AI enrichment second** — Agents run best-effort on PreCompact only
3. **git diff for changes** — Detects what files were modified this session
4. **Agent files** — Prompts live in `agents/*.md`, stripped of frontmatter before spawning

**Agents Spawned (PreCompact only):**
- `float-log` — Updates session handoff entry (parallel with float-decisions)
- `float-decisions` — Creates folder-level decisions + open questions (parallel with float-log)
- `float-enrich` — Updates folder description/context if new understanding
- `float-handoff` — Writes `.float/handoff.md` (AI-to-AI session note)
- `float-organize` — Workshop cleanup (if .float-workshop/ exists)
- `float-update-logs` — Creates markdown decision logs (if .float-workshop/ exists)

**Reference:**
- Agent prompts in `agents/` directory
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

**Purpose:** Layer 1 mechanical scanner — populates folders AND files tables with merkle tree hashing.

**Usage:**
```bash
./scan.sh [project_dir]
# Defaults to current directory
```

**Performance:**

| Scanner | Time | Notes |
|---------|------|-------|
| **Rust (cached)** | ~40ms | mtime cache hit, ~1 file hashed |
| **Rust (fresh)** | ~150ms | All 600+ files hashed |
| **Bash fallback** | ~35s | Used when Rust binary unavailable |

**~230x faster** than the original bash implementation via Rust + napi-rs.

**How It Works:**

1. **Platform detection** — Checks for platform-specific `.node` binary
2. **Rust scanner** (if available):
   - Walks filesystem with `.gitignore` support (ignore crate)
   - Compares mtime/size to skip unchanged files (git's insight)
   - Hashes only changed files with SHA-256
   - Builds merkle tree for folder hashes
   - Updates database in single transaction (WAL mode)
3. **Bash fallback** (if Rust unavailable):
   - Uses `find` + `shasum` (slower but portable)
   - Same database output format

**Platform Support:**

| Platform | Binary | Status |
|----------|--------|--------|
| macOS ARM (M1/M2) | `scanner.darwin-arm64.node` | Bundled |
| macOS Intel | `scanner.darwin-x64.node` | CI build needed |
| Linux x64 | `scanner.linux-x64-gnu.node` | CI build needed |

**Excluded Patterns:**
```
node_modules, .git, .float, .claude, __pycache__, .pytest_cache,
.next, .nuxt, dist, build, .venv, venv, .tox, coverage,
.nyc_output, .cache, .turbo, target
```

**The Git Insight:**

The key optimization is mtime caching (like git):
- Store file mtime + size alongside content hash
- On rescan, only hash files where mtime/size changed
- Most scans process 0-5 files, not 600+

**Reference:**
- Rust source: `scanner/src/` (lib.rs, walker.rs, hasher.rs, cache.rs, merkle.rs, db.rs)
- TypeScript scanner: `src/db/scan.ts`
- Progress tracking: `scanner/RUST-PROGRESS.md`

---

### `lib/boot.sh`

**Purpose:** Fetches all boot context in one command. Outputs JSON for AI to parse.

**Usage:**
```bash
./boot.sh [project_dir]
# Defaults to git root or current directory
```

**Output (JSON):**
```json
{
  "exists": true,
  "project_root": "/path/to/repo",
  "handoff_md": "# Handoff\n\n...",
  "last_session": [{"title": "...", "decision": "...", ...}],
  "recent_decisions": [...],
  "open_questions": [...],
  "stale_folders": [...],
  "stats": {"folders": 86, "files": 587, "stale": 0, "pending": 0, "current": 86},
  "permissions_set": true
}
```

**If `exists: false`:** float.db doesn't exist — run scan.sh first.

**Key Design:**
- One command, one permission prompt
- Mechanical queries only — AI interprets results
- Matches scan.sh pattern: scripts for mechanics, AI for judgment

---

### `agents/`

**Purpose:** AI agents spawned by hooks during capture.

| Agent | Purpose | Called By |
|-------|---------|-----------|
| `float-log.md` | Updates session handoff entry | Phase 2 (parallel) |
| `float-decisions.md` | Creates folder decisions + open questions | Phase 2 (parallel) |
| `float-enrich.md` | Updates folder description/context | Phase 3 |
| `float-handoff.md` | Writes `.float/handoff.md` (AI-to-AI note) | Phase 4 |

**Reference:**
- Subagents guide: [Subagents Reference](../../../artifacts/2026/01-jan/claude-code-plugins/subagents.md)

---

### `templates/`

**Purpose:** Template files defining output structures.

| Template | Purpose |
|----------|---------|
| `handoff.md` | Structure for `.float/handoff.md` output |

---

### `skills/`

**Purpose:** Skills that can be invoked during sessions.

| Skill | Purpose |
|-------|---------|
| `float-context/` | Query float.db for full context on a file or folder |

**Reference:**
- Skills guide: [Skill Development](../../../artifacts/2026/01-jan/claude-code-plugins/slash-commands.md)

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
        │                                    │
        ▼                              ◄─────┘
AI boots with context ◄────────────── lib/boot.sh (JSON output)
        │
        │
   [Work happens]
        │
        ▼
PreCompact fires ────────────────────► hooks/float-capture.sh
(or SessionEnd)                              │
        │                              ┌─────┴─────┐
        │                              │  Phase 1  │ sqlite3 INSERT (instant)
        │                              │  Phase 2  │ float-log + float-decisions (parallel)
        │                              │  Phase 3  │ float-enrich agent
        │                              │  Phase 4  │ float-handoff agent
        │                              │  Phase 5  │ workshop agents
        │                              └─────┬─────┘
        │                                    │
        ▼                              ◄─────┘
Session ends or compacts               log_entries updated
                                       folders enriched
                                       .float/handoff.md written
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

### Installation

```bash
# Add the FloatPrompt marketplace
/plugin marketplace add mds/floatprompt

# Install the plugin
/plugin install floatprompt@floatprompt-marketplace

# Or test locally during development
claude --plugin-dir ./plugins/floatprompt
```

### Validation

```bash
# Validate plugin
claude plugin validate ./plugins/floatprompt

# Validate marketplace
claude plugin validate .
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
| 2026-01-10 | 58 | **Session continuity fix** — Two-stage agent execution (entry writers → entry readers), observability logging to `/tmp/float-agents-*.log`, removed Write tool from float-handoff (uses Bash heredoc), added open questions resolution to float-decisions |
| 2026-01-10 | 56 | **Phase 6: Distribution** — Added marketplace.json, restructured plugin.json to .claude-plugin/ |
| 2026-01-10 | 56 | Rewrote float-log agent: UPDATE-first approach ensures enrichment completes |
| 2026-01-10 | 54 | Fixed claude CLI syntax in float-capture.sh (`-p` → positional arg + `--print`) |
| 2026-01-10 | 53 | Added Rust merkle scanner (~230x faster than bash) |
| 2026-01-10 | 53 | Bundled scanner in lib/scanner/ with platform detection |
| 2026-01-10 | 53 | Updated scan.sh to use Rust scanner with bash fallback |
| 2026-01-09 | 51 | Added boot.sh for single-command boot queries (JSON output) |
| 2026-01-09 | 51 | Simplified float.md boot procedure to use boot.sh |
| 2026-01-09 | 51 | Split float-log into float-log + float-decisions (parallel agents) |
| 2026-01-09 | 51 | Restructured boot procedure into 4 explicit steps |
| 2026-01-09 | 51 | Added transcript truncation (last 500 lines) for agent efficiency |
| 2026-01-09 | 51 | Fleshed out float-context skill with proactive triggers |
| 2026-01-09 | 49 | Added agents, skills to plugin.json; created templates/handoff.md |
| 2026-01-09 | 49 | Created float-context skill for proactive context lookups |
| 2026-01-09 | 49 | Added First-Run Permissions section to float.md |
| 2026-01-09 | 49 | Fixed agent spawning (YAML frontmatter stripping in float-capture.sh) |
| 2026-01-09 | 48 | Consolidated float.md + boot.md into single comprehensive command |
| 2026-01-09 | 48 | Added MDS methodology, role framing, enrichment loop to float.md |
| 2026-01-09 | 45 | Added Philosophy & Methodology section: goals, MDS method, workshop README |
| 2026-01-09 | 45 | Added AI Wants This, Vision (Working Spec) to Core Concepts |
| 2026-01-09 | 45 | Expanded Related Documentation: 34 verified references across 7 categories |
| 2026-01-09 | 45 | Created README.md with full documentation |
| 2026-01-09 | 45 | Enhanced scan.sh: files table with SHA-256 hashes |
| 2026-01-09 | 45 | Fixed plugin.json schema validation (author, commands, hooks) |
| 2026-01-09 | 45 | Enhanced float-capture.sh: folder-level logging |
| 2026-01-09 | 44 | Initial plugin structure: all core components |
| 2026-01-09 | 43 | Schema created, float.db initialized |

---

*Created: 2026-01-09 (Session 45)*
*Last updated: 2026-01-10 (Session 58)*
*References verified: 34 files across docs/, artifacts/, .float-workshop/, src/*
