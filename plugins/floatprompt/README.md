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
│   └── capture.sh            # Main capture script (auto=mechanical, manual=full)
├── lib/
│   ├── boot.sh               # Boot query script (JSON output for /float)
│   ├── schema.sql            # SQLite schema for float.db (8 tables)
│   └── scan.sh               # Layer 1 scanner (git-native)
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
  "version": "1.1.1",
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

**Purpose:** The primary way to save session context. Run when you've done significant work.

**Invocation:** `/float-capture` or `/floatprompt:float-capture`

**Two-Tier System:**

| Trigger | What Runs | What You Get |
|---------|-----------|--------------|
| **Manual** (`/float-capture`) | Full pipeline | Facts + understanding + handoff.md |
| Auto (PreCompact/SessionEnd) | Mechanical only | Facts only (files, folders, timestamp) |

> **"PreCompact saves facts. Manual capture saves understanding."**

**When to Run:**
- Just finished a feature or significant fix
- Made an important decision
- Before ending a long session
- Anytime context matters

**Skips For:**
- Research sessions (no file changes) — mechanical only, saves ~$0.34

---

### `hooks/hooks.json`

**Purpose:** Configures automatic lifecycle hooks for session capture.

**Hooks Registered:**

| Event | When | Behavior |
|-------|------|----------|
| `PreCompact` | Context window ~80% full | Mechanical capture only |
| `SessionEnd` | User exits session | Mechanical capture only |

**Why Mechanical Only:**

Auto-triggers (PreCompact/SessionEnd) run mechanical capture only because compaction doesn't wait for AI agents to complete. Agents would get orphaned.

For full AI enrichment (title, decision, handoff.md), run `/float-capture` manually.

> **"PreCompact saves facts. Manual capture saves understanding."**

Self-deduplicating: 5-minute window prevents duplicate entries.

**Reference:**
- [Hooks Reference](../../../artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md)
- Hook events: `PreToolUse`, `PostToolUse`, `Stop`, `SubagentStop`, `SessionStart`, `SessionEnd`, `UserPromptSubmit`, `PreCompact`, `Notification`

---

### `hooks/capture.sh`

**Purpose:** Main capture script implementing two-tier capture system.

**Input:** JSON from stdin (hook) or `--manual` flag (command).

**Two-Tier Design:**

| Trigger | Behavior | What You Get |
|---------|----------|--------------|
| **Auto** (PreCompact/SessionEnd) | Mechanical only | Facts: files, folders, timestamp |
| **Manual** (`/float-capture`) | Full pipeline | Understanding: title, decision, handoff.md |

> **"PreCompact saves facts. Manual capture saves understanding."**

**Execution Phases:**

| Phase | Auto | Manual | Purpose |
|-------|------|--------|---------|
| **Early exits** | Yes | Yes | Skip if no .float/, recent handoff, or no changes |
| **Phase 1** | Yes | Yes | Mechanical sqlite3 INSERT (instant, guaranteed) |
| **Phase 2** | - | Yes | Parallel: float-log + float-decisions |
| **Phase 3** | - | Yes | Parallel: float-enrich + float-handoff |
| **Phase 4** | - | Yes | Workshop agents (if .float-workshop/ exists) |

**Why Auto = Mechanical Only:**

Compaction doesn't wait for agents to complete. Agents spawned during PreCompact get orphaned. Mechanical capture is instant and guaranteed.

**Research Session Skip:**

If no files changed (research/verification session), agents are skipped entirely even for manual capture. Saves ~$0.34 per capture by not spawning 5 agents to analyze an empty diff.

**Agents Spawned (Manual only):**
- `float-log` — Updates entry with title, decision, rationale
- `float-decisions` — Creates open questions, resolves previous ones
- `float-enrich` — Updates folder description/context
- `float-handoff` — Writes `.float/handoff.md` (AI-to-AI session note)
- `float-organize` — Workshop cleanup (if .float-workshop/ exists)
- `float-update-logs` — Creates markdown decision logs (if .float-workshop/ exists)

**Reference:**
- Agent prompts in `agents/` directory
- Bash hook pattern: [Hooks Reference](../../../artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md#command-hooks)

---

### `lib/schema.sql`

**Purpose:** SQLite schema for `.float/float.db` — the persistent context database.

**Tables (8 total):**

| Table | Purpose | Key Fields |
|-------|---------|------------|
| `folders` | The things being described | path, description, context, status |
| `log_entries` | Decision paper trail | folder_path, topic, status, decision, git_commit |
| `references` | Cross-links for staleness | source_type, source_id, target_type, target_id |
| `open_questions` | Unresolved items | question, resolved_by |
| `tags` | Categorization | name |
| `log_entry_tags` | Many-to-many | log_entry_id, tag_id |
| `deep` | Topic-based context | slug, title, content_md, watches |
| `deep_history` | Version history | slug, version, content_md |

> **Note:** `files` table removed in v1.2.0 — git is now the source of truth for file tracking.

**The `folders` Table (16 Fields):**

| Category | Fields |
|----------|--------|
| **Identity** | path (PK), parent_path, name |
| **Governance** | type, status (pending/current/stale) |
| **AI Content** | description, context |
| **Scope** | is_scope, parent_scope_path, scope_boot |
| **Mechanical** | source_hash, last_scanned_at *(legacy, unused)* |
| **Attribution** | ai_model, ai_updated |
| **Timestamps** | created_at, updated_at |

**The `log_entries` Table:**

| Status | Meaning |
|--------|---------|
| `locked` | Final decision — never changes |
| `open` | Session handoff — can be updated by agents |
| `superseded` | Replaced by newer entry |

**Git Context (v1.2.0):** `git_commit` and `git_branch` fields pin each entry to a specific commit.

**Reference:**
- Schema spec: `.float-workshop/logs/2026/01-jan/2026-01-02-sqlite-understanding.md`
- Schema updated: Session 61 (2026-01-10) - Git-native Layer 1
- TypeScript schemas: `src/db/schema.ts`

---

### `lib/scan.sh`

**Purpose:** Layer 1 scanner — populates folders table using git as source of truth.

**Usage:**
```bash
./scan.sh [project_dir]
# Defaults to git root or current directory
```

**Requires:** Git repository. Non-git folders will show an error prompting `git init`.

**How It Works (v1.2.0 - Git-Native):**

1. Detects git root via `git rev-parse --show-toplevel`
2. Creates `.float/float.db` if needed
3. Enumerates folders from `git ls-files`
4. Inserts into `folders` table with `status='pending'`
5. Outputs JSON stats

**Output:**
```json
{"folders": 493, "files": 642, "source": "git", "project_root": "/path"}
```

**What Changed in v1.2.0:**

| Before (Rust Scanner) | After (Git-Native) |
|----------------------|-------------------|
| ~150 lines + ~2000 lines Rust | ~70 lines bash |
| Custom merkle tree hashing | Git is the merkle tree |
| Platform-specific binaries | No binaries, just `git` |
| `find` + `sha256` fallback | `git ls-files` only |

> **Rationale:** Git is always present in developer contexts. The Rust scanner duplicated what git already provides. See `.float-workshop/active/2026-01-10-git-layer1-insight.md`.

**Reference:**
- TypeScript scanner: `src/db/scan.ts` (legacy, for reference)
- Git-native architecture: `.float-workshop/active/2026-01-10-git-native-architecture-plan.md`

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
  "git": {
    "branch": "main",
    "commit": "abc123f",
    "dirty_files": 3,
    "last_capture_commit": "def456a",
    "changed_since_capture": ["/src/auth", "/src/api"]
  },
  "permissions_set": true
}
```

**Git Context (v1.2.0):** The `git` section provides:
- Current branch and commit
- Dirty file count (uncommitted changes)
- Last capture's commit (for staleness)
- Folders changed since last capture (via `git diff`)

**If `exists: false`:** float.db doesn't exist — run scan.sh first.

**Key Design:**
- One command, one permission prompt
- Mechanical queries only — AI interprets results
- Git integration for staleness detection (no custom hashing)

---

### `agents/`

**Purpose:** AI agents spawned by hooks during capture.

| Agent | Purpose | Phase |
|-------|---------|-------|
| `float-log.md` | Updates entry with title, decision, rationale | Phase 2 (parallel) |
| `float-decisions.md` | Creates/resolves open questions | Phase 2 (parallel) |
| `float-enrich.md` | Updates folder description/context | Phase 3 (parallel) |
| `float-handoff.md` | Writes `.float/handoff.md` (AI-to-AI note) | Phase 3 (parallel) |

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
PreCompact fires ────────────────────► hooks/capture.sh
(or SessionEnd)                              │
        │                              Phase 1 only (mechanical)
        │                              sqlite3 INSERT → exit
        │                              (facts saved, no agents)
        │
        ▼
Session compacts
        │
        │
   [More work...]
        │
        ▼
User runs /float-capture ────────────► hooks/capture.sh --manual
        │                                    │
        │                              ┌─────┴─────┐
        │                              │  Phase 1  │ sqlite3 INSERT
        │                              │  Phase 2  │ float-log + float-decisions
        │                              │  Phase 3  │ float-enrich + float-handoff
        │                              │  Phase 4  │ workshop agents
        │                              └─────┬─────┘
        │                                    │
        ▼                              ◄─────┘
Context saved                          log_entries enriched
                                       .float/handoff.md written
        │
        ▼
Next session: /float ────────────────► Picks up where you left off
```

---

## Data Flow

```
LAYER 1: GIT (scan.sh)                 LAYER 2: AI ENRICHMENT (agents)
──────────────────────────────────────────────────────────────────────

Git repository                         Session work
    │                                      │
    ▼                                      ▼
git ls-files ──────────────────────► log_entries (decisions)
    │                                      │
    ▼                                      ▼
folders table (paths)                  folders.description
                                       folders.context
    │                                      │
    └──────────────┬───────────────────────┘
                   │
                   ▼
            .float/float.db
                   │
                   ▼
            AI queries for context

STALENESS DETECTION (v1.2.0)
────────────────────────────
Last capture: git_commit = "abc123"
Current:      HEAD = "def456"
              │
              ▼
git diff abc123..def456 --name-only
              │
              ▼
Changed folders since capture
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

# File count (via git, not database)
git ls-files | wc -l

# Recent decisions
sqlite3 .float/float.db "SELECT folder_path, topic, title FROM log_entries WHERE status='locked' ORDER BY created_at DESC LIMIT 5"

# Stale folders
sqlite3 .float/float.db "SELECT path FROM folders WHERE status='stale'"

# Session handoffs with git context
sqlite3 .float/float.db "SELECT id, title, date, git_commit, git_branch FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC"

# What changed since last capture
LAST_COMMIT=$(sqlite3 .float/float.db "SELECT git_commit FROM log_entries WHERE topic='session-handoff' AND git_commit IS NOT NULL ORDER BY created_at DESC LIMIT 1")
git diff --name-only $LAST_COMMIT HEAD
```

### Rescan Project

```bash
# Re-run scanner (updates existing database)
bash plugins/floatprompt/lib/scan.sh .
```

---

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for full version history.

**Current version:** 1.2.0

---

*Created: 2026-01-09 (Session 45)*
*Last updated: 2026-01-10 (Session 61) - Git-native Layer 1*
