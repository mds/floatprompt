# FloatPrompt Plugin — PRD

**Status:** Draft (Session 38-39 updates)
**Date:** 2026-01-09
**Reference:** `floatprompt-plugin-spec.md` (vision/philosophy)

---

## Overview

Claude Code plugin that provides persistent, hierarchical context that survives sessions and compounds over time. One command (`/float`) activates the system; everything else is automatic.

**Domain:** Any project directory with `.float/` installed

---

## The Two Context Problems

FloatPrompt solves two distinct amnesia problems:

### 1. Folder Context (What does this code do?)

AI forgets what folders contain and why they're structured that way. Every session, AI re-discovers the same things.

**Solution:** `folders` table stores `description` + `context` per folder. AI enriches as it learns. Context compounds.

### 2. Session Continuity (Where did we leave off?)

Both AI and humans forget what they were working on between sessions. Days pass, context is lost.

**Solution:** `log_entries` table stores session handoffs. At session end, capture what was worked on and suggested next steps. At next boot, show this context.

> **Key insight:** The `.float-workshop/` manual workflow (ACTIVE.md, LATER.md, logs/) is the prototype. The plugin automates this with float.db as the storage layer instead of markdown files.

| Workshop (Manual) | float.db (Automatic) |
|-------------------|----------------------|
| `active/ACTIVE.md` | `log_entries WHERE topic = 'session-handoff'` |
| `logs/*.md` | `log_entries WHERE status = 'locked'` |
| Folder context docs | `folders.description` + `folders.context` |

**No folder structure needed.** Everything lives in the database. Queries replace navigation.

---

## Users

**Target:** Solo developers on personal and work projects.

| User Type | Description | Use Case |
|-----------|-------------|----------|
| Solo dev | Individual developer working on their own projects | Personal projects, freelance work, solo repos |

**Minimum viable project size:**
- Projects you return to across 3+ sessions
- 20+ folders (where CLAUDE.md becomes unwieldy)
- Codebases where "what does this folder do?" is a recurring question

**When CLAUDE.md is sufficient:**
- Small projects (< 10 folders)
- One-off sessions
- Projects where the whole thing fits in your head

**When float.db adds value:**
- Returning to the same project repeatedly
- Complex folder structures
- Long-term projects where understanding accumulates

**Future consideration:** `.float/` lives in the repo (like `.git/`) so it *could* be shared with a team later — but team collaboration is out of scope for v1.

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Runtime | Claude Code (CLI) |
| Database | SQLite (`.float/float.db`) |
| Plugin format | Claude Code native (commands/, agents/, hooks/) |
| AI calls | Uses Claude Code's existing auth (Max subscription or API plan) |
| float-db CLI | Bundled scripts in plugin (`lib/float-db.js`) |

**No separate API key required** — the plugin uses Claude Code's built-in authentication. Agents run as subprocesses within Claude Code's context.

**No MCP server** — float-db is bundled as scripts, not an MCP server. Avoids token overhead from tool descriptions in system prompt every session. Hooks/agents call scripts directly via Bash.

---

## Distribution

**Claude Code plugins are NOT distributed via npm.** They use the Claude Marketplace system.

### User Installation

```bash
# Add marketplace (one-time)
/plugin marketplace add mds/floatprompt

# Install plugin
/plugin install floatprompt@mds

# Update later
/plugin marketplace update
```

### Distribution via npm (FloatPrompt for Web)

The npm package `floatprompt` is a **separate product** (FloatPrompt for Web) — makes websites AI-readable. Different codebase, different purpose.

| Channel | Product | Install |
|---------|---------|---------|
| **Claude Marketplace** | FloatPrompt for Repos (this plugin) | `/plugin install floatprompt@mds` |
| **npm** | FloatPrompt for Web | `npx floatprompt generate ./dist` |

**No collision.** Same name, different distribution channels.

### Repository Structure for Marketplace

```
github.com/mds/floatprompt/
├── .claude-plugin/
│   └── marketplace.json       ← Lists plugin(s) in this repo
├── plugins/
│   └── floatprompt/           ← The actual plugin
│       ├── .claude-plugin/
│       │   └── plugin.json    ← Plugin manifest
│       ├── commands/
│       ├── agents/
│       ├── hooks/
│       └── lib/
│           └── float-db.js    ← Bundled CLI
├── web/                       ← Float-web (npm package, separate)
└── src/                       ← Source TypeScript (float-db CLI)
```

### marketplace.json

```json
{
  "name": "floatprompt",
  "owner": { "name": "MDS" },
  "plugins": [{
    "name": "floatprompt",
    "source": "./plugins/floatprompt",
    "description": "Persistent context that survives sessions and compounds over time",
    "version": "1.0.0"
  }]
}
```

**Key insight:** When users install, Claude Code copies the plugin to a cache location. Files outside the plugin directory (like `../shared`) won't be copied. Bundle everything needed inside `plugins/floatprompt/`.

---

## Configuration

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| None | — | Plugin uses Claude Code's existing auth |

### Plugin Settings

| Setting | Location | Description |
|---------|----------|-------------|
| None required | — | Plugin works out of the box |

### Float Configuration

| Setting | Location | Description |
|---------|----------|-------------|
| None required | — | No `.float/config.json` needed for v1 |

**Philosophy:** Zero configuration for v1. `/float` just works.

---

## Data Schema

### float.db Tables

> **Pending schema change:** Rename `content_md` → `context` for semantic clarity. Check if done before implementing.

**v1 Active Tables:**

**folders** (16 fields)
| Field | Type | Description |
|-------|------|-------------|
| path | TEXT PK | Canonical path (e.g., `/src/components`) |
| parent_path | TEXT | Parent folder path |
| name | TEXT | Folder name |
| type | TEXT | `folder` / `scope` / `log_root` / `log_year` / `log_month` |
| status | TEXT | `pending` / `current` / `stale` |
| description | TEXT | AI-generated one-liner ("what's here") |
| content_md | TEXT | AI-generated context ("what it means") — **may be renamed to `context`** |
| is_scope | BOOLEAN | Is this a scope boundary (autonomous world)? |
| parent_scope_path | TEXT | Nearest parent scope |
| scope_boot | TEXT | Boot context for this scope |
| source_hash | TEXT | SHA-256 hash of folder contents (change detection) |
| last_scanned_at | INTEGER | Last Layer 1 scan timestamp (Unix) |
| ai_model | TEXT | Model that generated context (e.g., `claude-sonnet-4`) |
| ai_updated | INTEGER | When AI last updated (Unix timestamp) |
| created_at | INTEGER | Row creation time |
| updated_at | INTEGER | Row update time |

**files**
| Field | Type | Description |
|-------|------|-------------|
| path | TEXT PK | File path |
| folder_path | TEXT | Parent folder |
| content_hash | TEXT | SHA-256 of file contents |
| mtime | INTEGER | File modification time |
| last_scanned_at | INTEGER | Last scan timestamp |

**log_entries** (serves two purposes)
| Field | Type | Description |
|-------|------|-------------|
| id | INTEGER PK | Auto-increment ID |
| folder_path | TEXT | `/` for project-wide, or specific folder path |
| date | TEXT | Entry date (YYYY-MM-DD) |
| topic | TEXT | `session-handoff` for continuity, or decision topic |
| status | TEXT | `locked` (decision) / `open` (session handoff) / `superseded` |
| title | TEXT | Entry title |
| decision | TEXT | What was decided / what was worked on |
| rationale | TEXT | Why / next step options |
| files_changed | TEXT | JSON array of affected files |
| created_at | INTEGER | Row creation time |

**Two usage patterns:**

| Pattern | topic | status | decision field | rationale field |
|---------|-------|--------|----------------|-----------------|
| **Decisions** | `auth-strategy`, etc. | `locked` | What was decided | Why this choice |
| **Session handoff** | `session-handoff` | `open` | What we worked on | Next step options |

**CLI commands (implemented):**
```bash
# Add entry
float-db log add --json '{...}'

# List with filters
float-db log list --topic session-handoff --limit 5

# Get latest (for boot continuity)
float-db log latest --topic session-handoff
```

**Future Tables (exist in schema, unused in v1):**

| Table | Purpose |
|-------|---------|
| `references` | Cross-folder staleness detection |
| `open_questions` | Unresolved items |
| `tags` | Categorization |
| `log_entry_tags` | Many-to-many for tags |
| `deep` | Topic-based context (concept primers) |
| `deep_history` | Version history for deep contexts |

---

## The /float Command

### First Run (No float.db)

```
User runs /float
    │
    ├── Check for .float/float.db
    │   └── NOT FOUND
    │
    ├── Create .float/ directory
    │
    ├── Run Layer 1 scan (filesystem → SQLite)
    │   └── Command: node dist/cli/float-db.js scan
    │   └── Walks filesystem, hashes files, writes to SQLite
    │   └── Runs in milliseconds (no AI needed)
    │
    ├── Load boot.md instructions
    │   └── Teaches AI how to query float.db
    │
    └── Output: "FloatPrompt initialized. X folders indexed."
```

### Subsequent Runs (float.db exists)

```
User runs /float
    │
    ├── Check for .float/float.db
    │   └── FOUND
    │
    ├── Load boot.md instructions
    │   └── HOW to use float.db (not the content itself)
    │
    ├── Query session continuity
    │   └── float-db log latest --topic session-handoff
    │   └── If found: Show "Last session: [decision]. Options: [rationale]"
    │
    ├── Query staleness count
    │   └── SELECT COUNT(*) FROM folders WHERE status = 'stale'
    │
    ├── Enable machinery (skills become active)
    │
    └── Output: "FloatPrompt active. X folders indexed."
```

**Session continuity bridges sessions.** When float-logger writes a session-handoff entry at the end of session N, `/float` at the start of session N+1 displays it. Human and AI both remember where they left off.

### Boot Context Architecture

**Two-layer boot:**

| Layer | What | Tokens |
|-------|------|--------|
| **boot.md** | Instructions on HOW to use float.db | ~500-800 |
| **On-demand queries** | Actual context from float.db as needed | Variable |

**boot.md teaches AI:**
1. What is FloatPrompt / float.db?
2. How to query context for current location
3. How to query the scope chain
4. When to query vs. just work
5. How to know if context is stale

**AI queries float.db on-demand:**
- Working in `/src/auth`? → `float-db details /src/auth`
- Need scope chain? → `float-db scope-chain /src/auth`
- Context loads when relevant, not all at once

**boot.md is a critical deliverable** — needs its own design pass. It's the "driver's manual" for the whole system.

---

## Skills

> **Architecture change:** `float-enrich` skill removed. Enrichment detection moved to SessionEnd hook using git diff. Simpler — no skill state to manage.

### ~~float-enrich~~ (Removed)

Replaced by SessionEnd hook. The hook:
1. Runs `git diff --name-only` to find changed files
2. Derives which folders had edits
3. Spawns `float-enricher` agent for those folders

### float-mode-suggest

**Purpose:** Offer to create mode when deep topic work detected

**Trigger:** Significant context built around a topic (not a folder)

**Tone (casual, not pushy):**
```
"You've been deep in [topic] this session.
Want to save this as a mode for future sessions? Or nah."
```

**Action:** If user accepts, spawn `float-mode-generator` agent

---

## Agents

### float-enricher

**Purpose:** Generate/update folder context in float.db

**Runs:** In background (separate context window), doesn't block main conversation

**Inputs:**
```json
{
  "folders_edited": ["/src/auth", "/src/utils"],
  "session_context": "User was implementing JWT refresh tokens..."
}
```

**Process:**
1. For each folder in `folders_edited`:
2. Read current float.db context for that folder
3. Read folder contents via `float-db details /path --include-contents`
4. **Reconcile:** Compare what was stored vs what's there now
5. If new understanding worth capturing: generate updated `description` + `context`
6. Write to float.db: `float-db update /path --json '{...}'`
7. If no new understanding, skip (no noise)

**Model:** Uses Claude Code's model (inherits from session)

**Key insight:** No "merge vs replace" policy — agent reconciles what was there vs what is there now. Uses judgment about what's worth updating. Some edits are trivial (typo fixes) and don't warrant context changes.

**Agent drafted:** `.claude/agents/float-enricher.md`

### float-logger

**Purpose:** Capture decisions AND session continuity to float.db's `log_entries` table

**Runs:** At session end, alongside enricher (separate context window)

**Inputs:**
```json
{
  "session_summary": "User implemented JWT refresh tokens, decided on bearer over cookies...",
  "folders_touched": ["/src/auth"]
}
```

**Writes two kinds of entries:**

| Entry Type | topic | status | When |
|------------|-------|--------|------|
| **Decisions** | `auth-strategy`, etc. | `locked` | If significant decisions were made |
| **Session handoff** | `session-handoff` | `open` | Always (bridges to next session) |

**Process:**
1. Analyze session for significant decisions
2. For each decision worth logging:
   - `folder_path`: `/` for project-wide, or specific folder
   - `status`: `locked`
   - Write via: `float-db log add --json '{...}'`
3. **Always** write session handoff entry:
   - `folder_path`: `/`
   - `topic`: `session-handoff`
   - `status`: `open`
   - `decision`: What we worked on this session
   - `rationale`: Next step options (2-3 choices)
   - Write via: `float-db log add --json '{...}'`

**Key insight:** Decisions are optional (not every session has them). Session handoff is mandatory (always bridge to next session).

**Agent drafted:** `.claude/agents/float-logger.md`

### float-mode-generator

**Purpose:** Create mode file from session context

**Already exists:** `.claude/agents/float-mode-generator.md`

**Inputs:** User approval + session context
**Outputs:** Mode file written to `.float-workshop/modes/`

### float-organize (Workshop Only)

**Purpose:** Workshop file cleanup

**Already exists:** `.claude/agents/float-organize.md`

**Gate:** Only runs when `.float-workshop/` exists

**Inputs:** Session context
**Outputs:** Moves completed items to done/, updates ACTIVE.md

---

## Hooks

### SessionEnd Hook

**Event:** `SessionEnd`

**Detection:**
```bash
# Get folders with changes
git diff --name-only HEAD | xargs -I {} dirname {} | sort -u
```

**Actions:**
1. **Always (if `.float/` exists):**
   - Derive edited folders from git diff
   - Spawn `float-enricher` for those folders
   - Spawn `float-logger` for decision capture
2. **If `.float-workshop/` exists:**
   - Also spawn `float-organize`

**Workshop gate:** Workshop agent only runs when `.float-workshop/` directory exists.

### PreCompact Hook (Nice to Have)

**Event:** `PreCompact`

**Action:** Emergency context preservation before context window compacts

**Open question:** Is there enough time to spawn agents before compact? May need to be simpler — just log what was being worked on.

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| float.db missing | `/float` creates it (Layer 1 scan) |
| float.db corrupted | Delete and recreate |
| Layer 1 scan fails | Error message: "Scan failed. Try `/float` again." |
| Enricher agent fails | Log error, skip that folder, continue with others |
| Network offline | Claude Code doesn't work anyway — not plugin's problem |
| `.float/` deleted mid-session | Nothing breaks, run `/float` next session to recreate |

**Philosophy:** Fail gracefully, never block user's work. Context is enhancement, not requirement.

---

## Directory Structure

### In User Projects

```
project/
├── .float/                 ← Plugin creates this
│   ├── float.db           ← SQLite database (COMMITTED to git)
│   └── boot.md            ← Instructions for AI (COMMITTED to git)
└── ... (user's code)
```

### Git Integration

**Commit `.float/` to git** — context compounds and shares across team/machines.

| File | Git Status | Rationale |
|------|------------|-----------|
| `.float/float.db` | Committed | Context persists, new clones have it |
| `.float/boot.md` | Committed | Same instructions for everyone |

**Merge conflicts:** If two people enrich the same folder, git can't merge SQLite. Resolution: pick newer version, re-enrich if needed. Rare for solo dev (v1 target).

### In FloatPrompt Repo (Development)

```
floatprompt/
├── .float/                 ← Test instance of plugin
│   ├── float.db
│   └── boot.md
│
├── .float-workshop/        ← Development workflow (manual, human)
│   ├── active/
│   ├── later/
│   ├── logs/
│   └── modes/
│
└── .claude/                ← Plugin components
    ├── commands/
    ├── agents/
    └── hooks/
```

### Plugin Package Structure (Inside plugins/floatprompt/)

```
plugins/floatprompt/
├── .claude-plugin/
│   └── plugin.json         ← Plugin manifest
├── commands/
│   └── float.md            ← /float command
├── agents/
│   ├── float-enricher.md   ← Folder context enrichment
│   ├── float-logger.md     ← Decision logging
│   └── float-organize.md   ← Workshop cleanup (workshop only)
├── hooks/
│   └── hooks.json          ← SessionEnd, PreCompact hooks
├── lib/
│   └── float-db.js         ← Bundled CLI (compiled TypeScript)
└── templates/
    └── boot.md             ← Copied to .float/ on init
```

**These are orthogonal systems:**
- `.float/` = AI context management (the product users get)
- `.float-workshop/` = FloatPrompt development workflow (internal to this repo)
- `plugins/floatprompt/` = The distributable plugin package
- `web/` = FloatPrompt for Web (npm package, separate product)

---

## Out of Scope (v1)

Explicit exclusions for initial release:

| Excluded | Rationale |
|----------|-----------|
| Multi-repo federation | Solo dev focus, one project at a time |
| Team/concurrent handling | Not needed — anyone enriching same folder helps the db |
| Static context export | Future architecture (see `floatprompt-context-architecture.md`). Code exists in `src/export.ts` if needed later. |
| Manual context editing UI | AI edits via conversation ("show me, change X"). No direct editing. |
| Custom enrichment prompts | Later. May emerge naturally through conversation patterns. |
| Buoy execution engine | Separate system in `src/`, not part of plugin |
| Vercel Sandbox / remote execution | Big vision, future |
| Parallel enrichment fleets | Sequential Claude Code agents for v1 |

---

## Implementation Order

| Phase | Component | Depends On | Complexity | Notes |
|-------|-----------|------------|------------|-------|
| **0** | Schema rename `content_md` → `context` | — | Low | Check if already done |
| **1a** | Design boot.md | — | Medium | Critical — the "driver's manual" |
| **1b** | Design float-enricher agent | — | Medium | What prompts make it effective? |
| **1c** | Design float-logger agent | — | Medium | What's "decision-worthy"? |
| **2a** | Rename `/float-boot` → `/float` | 1a | Low | |
| **2b** | Add float.db creation to `/float` | 2a | Medium | First-run experience |
| **2c** | Bundle float-db CLI in plugin | — | Medium | `lib/float-db.js` |
| **3a** | Create `float-enricher` agent | 1b | Medium | Does the enrichment |
| **3b** | Create `float-logger` agent | 1c | Medium | Logs decisions |
| **3c** | Create SessionEnd hook | 3a, 3b | Medium | Git diff → spawn agents |
| **3d** | Add workshop gate to hook | 3c | Low | `.float-workshop/` check |
| **4a** | Create `float-mode-suggest` skill | — | Low | Proactive mode offers |
| **4b** | Wire mode-generator to skill | 4a | Low | |
| **5** | Polish `/float` output | 2-4 | Low | Clean boot experience |
| **6a** | Create `marketplace.json` | — | Low | At repo root `.claude-plugin/` |
| **6b** | Reorganize plugin into `plugins/floatprompt/` | 3c | Medium | Move from `.claude/` |
| **6c** | Bundle float-db.js | 6b | Medium | Copy compiled CLI to `lib/` |
| **6d** | Test marketplace install | 6a-6c | Low | `/plugin marketplace add`, `/plugin install` |

**Phase 1 is design.** Phase 2-3 is the core loop. Phase 4-5 is polish. **Phase 6 is distribution.**

---

## Success Criteria

### Must Have (v1)

- [ ] `/float` creates float.db on first run (Layer 1 scan)
- [ ] `/float` loads boot.md instructions on subsequent runs
- [ ] `/float` shows session continuity from last session (if exists)
- [ ] AI can query float.db on-demand for context
- [ ] SessionEnd hook detects edited folders via git diff
- [ ] `float-enricher` agent enriches edited folders at session end
- [ ] `float-logger` agent captures decisions to log_entries
- [ ] `float-logger` agent writes session-handoff entry (always)
- [ ] Workshop agent (`float-organize`) only runs when `.float-workshop/` exists
- [ ] Context compounds across sessions (measurable)
- [ ] `.float/` committed to git (float.db + boot.md)

### Should Have (v1)

- [ ] boot.md is < 800 tokens
- [ ] Enrichment doesn't block main conversation (background agent)
- [ ] Mode suggestions are helpful, not annoying
- [ ] Error states are graceful (never blocks user)
- [ ] First-run experience is smooth (scan completes, clear feedback)

### Nice to Have (v1)

- [ ] PreCompact hook preserves learnings
- [ ] Staleness count shown at boot
- [ ] Power user can manually trigger enrichment

---

## Key Deliverables

| Deliverable | Type | Priority | Notes |
|-------------|------|----------|-------|
| **boot.md design** | Design doc | P0 | Critical — the "driver's manual" |
| **float-enricher design** | Design doc | P0 | What prompts make it effective? |
| **float-logger design** | Design doc | P0 | What's "decision-worthy"? |
| Schema rename | Migration | P0 | `content_md` → `context` (check if done) |
| `/float` command | Command | P0 | Rename + add db creation |
| `float-enricher` agent | Agent | P0 | Do the enrichment |
| `float-logger` agent | Agent | P0 | Log decisions |
| SessionEnd hook | Hook | P0 | Git diff → spawn agents |
| Plugin bundle | Package | P0 | `lib/float-db.js` bundled |
| **marketplace.json** | Distribution | P0 | At repo root `.claude-plugin/` |
| **Plugin reorganization** | Distribution | P0 | Move to `plugins/floatprompt/` |
| `float-mode-suggest` skill | Skill | P1 | Proactive mode offers |
| PreCompact hook | Hook | P2 | Emergency preservation |

---

## Open Questions (Resolved)

| Question | Answer |
|----------|--------|
| Who is this for? | Solo devs on personal/work projects |
| Enrichment triggers? | Any folder with edits — agent decides if worth saving |
| How to track edits? | SessionEnd hook uses git diff (no skill needed) |
| API key needed? | No — uses Claude Code's auth |
| What loads at boot? | boot.md (instructions), then on-demand queries |
| Token budget? | boot.md < 800 tokens, context queried as needed |
| Workshop separation? | `.float-workshop/` directory presence gates workshop agents |
| MCP vs bundled scripts? | Bundled scripts — avoids MCP token overhead |
| Git integration? | Commit `.float/` (float.db + boot.md) |
| Working directory? | Current directory (keep it simple) |
| Future tables? | Already exist in schema, just unused |
| Session continuity? | `log_entries` with `topic=session-handoff`, `status=open`. Written always at session end. Queried at boot. (S38) |
| Workshop → float.db mapping? | Workshop folders become database queries. No folder structure needed in plugin. (S38) |
| float-logger dual purpose? | Writes decisions (locked) + session handoff (open). Handoff is mandatory. (S38) |
| Plugin distribution? | Claude Marketplace, NOT npm. Users: `/plugin marketplace add mds/floatprompt` then `/plugin install floatprompt@mds`. (S39) |
| npm package conflict? | No conflict. npm `floatprompt` is FloatPrompt for Web (separate product). Different channels. (S39) |
| Repo structure for marketplace? | `plugins/floatprompt/` contains distributable plugin. `marketplace.json` at repo root `.claude-plugin/`. (S39) |

## Open Questions (Remaining)

1. **boot.md content:** Exact instructions need design pass (save for last after agents finalized)
2. **PreCompact timing:** Is there enough time to spawn agents before compact?

## Design Progress (Session 38-39)

| Component | Status | Location |
|-----------|--------|----------|
| `float-enricher` agent | **Drafted** | `.claude/agents/float-enricher.md` |
| `float-logger` agent | **Drafted** | `.claude/agents/float-logger.md` |
| CLI `log` command | **Implemented** | `src/cli/float-db.ts` (add, list, latest) |
| Session continuity pattern | **Designed** | Uses `log_entries` table |
| Distribution model | **Designed** | Claude Marketplace (S39) |
| boot.md | Not started | Save for last |
| SessionEnd hook | Not started | Next |
| marketplace.json | Not started | Phase 6 |
| Plugin reorganization | Not started | Phase 6 |

---

*PRD — Agents drafted, CLI implemented, distribution designed. Next: SessionEnd hook, then boot.md (last), then marketplace setup (Phase 6).*
