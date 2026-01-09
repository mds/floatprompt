# FloatPrompt Plugin Architecture

**Date:** 2026-01-09
**Status:** Current specification
**Supersedes:** All previous plugin specs, PRD assumptions about CLI tooling

---

## The One-Sentence Summary

Human runs `/float`. AI operates everything else.

---

## The Formula

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

Any size. Any depth. Any complexity.

---

## The Problem

Every AI session starts cold. Understanding dies with the session. Without persistent context:

- AI re-discovers the same things every session
- Decisions are lost
- Context doesn't compound
- AI is perpetually a tourist — visiting but never knowing

**CLAUDE.md helps but isn't enough.** It's a note on the door — one file, static, high-level. Projects need institutional knowledge, not just a welcome mat.

---

## The Two Context Problems

FloatPrompt solves two distinct amnesia problems:

### 1. Folder Context (What does this code do?)

AI forgets what folders contain and why they're structured that way. Every session, AI re-discovers the same things.

**Solution:** `folders` table stores `description` + `context` per folder. AI enriches as it learns. Context compounds.

### 2. Session Continuity (Where did we leave off?)

Both AI and humans forget what they were working on between sessions. Days pass, context is lost.

**Solution:** `log_entries` table stores session handoffs. At session end, capture what was worked on and suggested next steps. At next boot, show this context.

**These are complementary.** Folder context tells AI "what is this place." Session continuity tells AI "what were we doing here."

---

## CLAUDE.md vs Float.db

> "CLAUDE.md is a note on the door. Float.db is the institutional knowledge of the building."

| Dimension | CLAUDE.md | Float.db |
|-----------|-----------|----------|
| Structure | One file (flat) | Hierarchical (every folder) |
| Freshness | Static | Fresh-aware (`status: stale`) |
| Granularity | High-level | Folder-specific |
| Evolvability | Human edits | AI writes back |
| Queryable | No (read whole thing) | Yes (SQL) |

They coexist. Float.db extends CLAUDE.md for projects that outgrow a single file.

---

## The Solution

FloatPrompt installs `.float/` in any project:

```
project/
├── .float/
│   ├── float.db      ← SQLite: all context lives here
│   └── Float.md      ← Driver's manual: teaches AI how to operate
└── ... (user's code)
```

**float.db** = Hierarchical, queryable, evolvable context
**Float.md** = Instructions that teach AI to use float.db

When AI opens any folder, it can query:
- What is this folder? (`description`)
- What does it mean? (`context`)
- What decisions were made here? (`log_entries`)
- What scope am I in? (`parent_scope_path`)
- Is this context fresh or stale? (`status`)

---

## The Human Interface

```
/float
```

That's it. One command. Everything else is automatic.

- Human runs `/float` to start a session
- AI reads Float.md and takes over
- AI queries context, does work, enriches understanding
- SessionEnd hook captures learnings automatically
- Next session: AI boots with accumulated understanding

**No other commands needed.** Power users might have escape hatches, but the default experience is one command.

---

## The AI Interface

After `/float`, AI operates the entire system:

| Action | How AI Does It |
|--------|----------------|
| Check if float.db exists | `test -f .float/float.db` |
| Create database | `sqlite3 .float/float.db < schema.sql` |
| Scan folders | Shell script or find + sqlite3 |
| Query folder context | `sqlite3 .float/float.db "SELECT ..."` |
| Update folder context | `sqlite3 .float/float.db "UPDATE ..."` |
| Add log entry | `sqlite3 .float/float.db "INSERT INTO log_entries ..."` |
| Query scope chain | `sqlite3` with recursive CTE |

**AI runs sqlite3 directly.** No CLI wrapper. No ergonomic commands. AI writes SQL.

---

## The Scope Chain

When AI is in `/src/auth/middleware`, it reads context hierarchically:

```
/                        → "Here's the project"
  └── /src               → "Here's the source code"
      └── /src/auth      → "Here's the auth system"
          └── /src/auth/middleware → "Here's what you're working on"
```

Each level adds specificity:
- **Project context** (from root)
- **Domain context** (from relevant scopes)
- **Local context** (from current folder)

CLAUDE.md can't do this. Float.db can.

**Query example:**
```sql
WITH RECURSIVE scope_chain AS (
  SELECT path, parent_path, description, context FROM folders WHERE path = '/src/auth/middleware'
  UNION ALL
  SELECT f.path, f.parent_path, f.description, f.context
  FROM folders f JOIN scope_chain s ON f.path = s.parent_path
)
SELECT * FROM scope_chain;
```

---

## Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.

Think monorepo:
- `/packages/web-app` is a world
- `/packages/web-app/src/auth` is a world within that world
- `/packages/mobile-app` is a different world
- `/infrastructure` is its own world

**What makes a scope:**
- Gets its own boot context (`scope_boot`)
- Gets its own patterns and conventions
- Gets its own buoy teams when needed (future)
- Still connected to parent — changes bubble up

**In the database:**
```sql
is_scope = 1,                    -- TRUE if this folder is a world
parent_scope_path = '/packages', -- pointer to parent scope
scope_boot = '...'               -- scope-specific boot context
```

One SQLite database knows which folders are worlds and treats them specially.

---

## The Three Layers

### Layer 1: Mechanical (instant, code)

- Walk filesystem, detect structure
- Hash files for change detection
- Write to SQLite
- **Runs in milliseconds, no AI judgment needed**

This is the only part that benefits from a script. A simple `scan.sh` that AI runs via Bash.

### Layer 2: AI Generation (agents, parallel)

- For each folder: generate `description` (what's here)
- For each folder: generate `context` (what it means)
- Capture decisions to `log_entries`
- **AI judgment required — agents do this work**

### Layer 3: Ongoing (hooks, automatic)

- SessionEnd hook spawns enrichment agents
- PreCompact hook preserves context before it dies
- Staleness detection triggers re-enrichment
- **No human intervention needed**

---

## Why This Scales

**Mechanical layer** = O(1) hash comparisons
- 10,000 folders? 10,000 rows. SQLite handles billions.
- Hash comparison is instant. Only scan what changed.

**Scopes** = hierarchical, changes only affect ancestors
- Change in `/auth` doesn't rescan `/mobile-app`
- Staleness bubbles UP, not sideways
- Local change, local impact

**Buoys** = parallel, spawn as needed (future)
- 50 folders need context? Spawn 50 buoys.
- 1000 folders changed? Spawn 1000 buoys.
- Cloud handles it. That's the point.

The architecture doesn't care if it's 10 folders or 10,000. Same pattern. Same code. Different scale.

---

## Buoys (Future Architecture)

Claude Code can spawn sub-agents. In FloatPrompt, these are called **buoys**.

The principle: **Never do alone what a fleet of buoys can do together.**

For the Claude Code plugin, we use native agents (float-enricher, float-logger). These run sequentially.

The big vision (beyond this plugin):
- Buoy execution engine
- Vercel Sandbox for parallel execution
- Hundreds/thousands of buoys working in parallel
- Each buoy writes to the database

**The plugin validates the concept.** The big infrastructure may live outside Claude Code entirely.

---

## The AI Civilization

The database isn't just storage. It's infrastructure for AI to operate with full understanding.

**The elements:**
- **Laws** — The schema defines what exists and how it's structured
- **Governance** — `status` tells AI what to trust (current, stale, pending)
- **Provenance** — `ai_model` + `ai_updated` tell AI who wrote what, when
- **Territories** — Scopes are autonomous worlds within worlds
- **History** — `log_entries` are the paper trail of decisions
- **Maps** — `description` is quick orientation for any folder
- **Deep Context** — `context` is full understanding when needed

**A cold AI session can land anywhere and instantly know:**
1. Where am I? (`path`)
2. Can I trust this context? (`status`)
3. Who wrote it and when? (`ai_model`, `ai_updated`)
4. What scope am I in? (`is_scope`, `parent_scope_path`)
5. What decisions have been made here? (`log_entries`)

---

## The Token Economy

This system operates in a **token economy** — but the goal isn't minimizing tokens, it's **maximizing value per token**.

Every piece of context must pass the test:

> "Does this help AI understand and operate better?"

**What makes context valuable:**
- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluff

The industry throws more context window at the problem. FloatPrompt provides *better* context — structured, hierarchical, trustworthy.

---

## Living Context vs Static Modes

A fundamental design principle: **prefer emergent, living systems over static artifacts that rot.**

### The Problem with Static Modes

Manual mode files seem helpful:
- Human creates `deep-auth.md` with context about authentication work
- Human activates mode when working on auth
- AI loads the context loadout

**But static modes decay:**
- Human forgets to update mode after architecture changes
- Mode content drifts from reality
- Human forgets to activate the right mode
- Multiple modes accumulate, none accurate
- Maintenance burden grows

### The Living Alternative: Mode Inference

Instead of creating static mode files, **log activity and infer focus.**

```
Static (stale):
Human creates mode → Mode file sits there → Gets stale → Human forgets to update

Living (fresh):
AI works → logs capture files_read + files_changed →
Next session: Float.md teaches AI to check recent activity →
AI infers focus from actual data → Context is always fresh
```

**The key insight:** Sessions are unpredictable. They span multiple tasks, features, phases. There will be many, many sessions over a project's lifetime. Manually-created artifacts can't keep up. But activity logs are always current.

### How Mode Inference Works

Each session logs what files were read and changed:

```sql
-- Session handoff captures activity
INSERT INTO log_entries (
  topic, files_read, files_changed, decision, ...
) VALUES (
  'session-handoff',
  '["src/auth/jwt.ts", "src/auth/middleware.ts", "docs/auth-spec.md"]',
  '["src/auth/refresh.ts", "src/auth/types.ts"]',
  'Implemented JWT refresh token rotation',
  ...
);
```

At next `/float` boot, Float.md teaches AI:

> "Query recent log_entries. Look at files_read and files_changed patterns across recent sessions. Infer what the human's been focused on. Surface relevant context."

```sql
-- What has the human been working on recently?
SELECT files_read, files_changed, decision, date
FROM log_entries
WHERE topic = 'session-handoff'
  AND date >= date('now', '-7 days')
ORDER BY created_at DESC;
```

AI analyzes the file paths:
- All in `/src/auth/`? → "Recent focus: authentication system"
- Mix of `/tests/` and `/src/`? → "Recent focus: test coverage"
- Scattered everywhere? → "Recent focus: broad refactoring"

### Why This Is Better

| Static Modes | Mode Inference |
|--------------|----------------|
| Human creates | Emerges from activity |
| Gets stale | Always current |
| Human must activate | Automatic |
| Separate artifact to maintain | Built into logging |
| Mode ≠ reality over time | Mode = reality by definition |

### The Principle

> **Log the activity, infer the context. Don't create static artifacts that rot.**

This applies beyond modes:
- Don't write architecture docs that drift — query the code
- Don't maintain folder descriptions manually — AI enriches from actual content
- Don't track "what we're working on" separately — it's in the logs

Float.db is a **living system**. Everything is either:
1. **Mechanical data** — hashes, timestamps, paths (always accurate)
2. **AI-enriched context** — descriptions, understanding (refreshed by activity)
3. **Activity logs** — files_read, files_changed, decisions (captured per session)

Nothing is a static artifact that humans must remember to update.

---

## AI-Native Design

Float.db is built FOR AI, BY AI. This inverts the traditional model:

**Traditional:**
```
Human → writes docs → AI reads → AI works
```

**AI-Native:**
```
AI → discovers/enriches → stores → AI reads → Human audits (occasionally)
```

### Implications

**Markdown is a tax.** Human-readable formatting has overhead. Every header, bullet, and formatting choice is parsing overhead for no benefit. AI doesn't read with eyes.

**Binary storage is correct.** SQLite objections from human perspective ("not git-diffable", "not human-readable") aren't objections from AI perspective. Export when humans need to audit.

**Human touchpoints are explicit.** Day-to-day: AI queries, AI enriches, no human in loop. Humans audit the aggregate, not each change.

**Optimize for queries, not browsing.** AI doesn't navigate folder trees. AI runs SQL.

---

## Plugin Components

### Directory Structure

```
plugins/floatprompt/
├── .claude-plugin/
│   └── plugin.json           ← Plugin manifest
├── commands/
│   └── float.md              ← /float command
├── agents/
│   ├── float-enricher.md     ← Updates folder context
│   ├── float-logger.md       ← Captures decisions + handoffs
│   └── float-organize.md     ← Workshop cleanup (workshop only)
├── hooks/
│   └── hooks.json            ← SessionEnd, PreCompact
├── lib/
│   ├── schema.sql            ← Database schema
│   └── scan.sh               ← Layer 1 scanner (optional)
└── templates/
    └── Float.md              ← Copied to .float/ on init
```

### /float Command

**Purpose:** Human entry point. Loads Float.md, AI takes over.

**What it does:**

1. Check if `.float/float.db` exists
2. If not: create `.float/`, run scan, copy Float.md
3. Load Float.md instructions into context
4. Query latest session-handoff from `log_entries`
5. Display: "Last session: [what]. Options: [next steps]"
6. AI is now equipped to work

**What it teaches AI:**

- How to query float.db for context
- When to query (entering new folder, need understanding)
- How to update context (after learning something)
- That enrichment happens automatically at session end

### float-enricher Agent

**Purpose:** Update folder context in float.db after session work.

**Triggered by:** SessionEnd hook (automatic) or manually

**Inputs:**
```json
{
  "folders_edited": ["/src/auth", "/src/utils"],
  "session_summary": "Implemented JWT refresh token rotation..."
}
```

**Process:**
1. For each folder in `folders_edited`:
2. Query current context: `sqlite3 .float/float.db "SELECT description, context FROM folders WHERE path='...'"`
3. Read folder contents
4. Reconcile: Is there new understanding worth capturing?
5. If yes: `sqlite3 .float/float.db "UPDATE folders SET description='...', context='...', status='current', ai_model='...', ai_updated=... WHERE path='...'"`
6. If no: skip (no noise)

**Uses:** sqlite3 via Bash (no CLI)

### float-logger Agent

**Purpose:** Capture decisions and session continuity to float.db.

**Triggered by:** SessionEnd hook (automatic)

**Writes two kinds of entries:**

| Type | topic | status | When |
|------|-------|--------|------|
| Decisions | `auth-strategy`, etc. | `locked` | If significant decisions were made |
| Session handoff | `session-handoff` | `open` | Always (bridges to next session) |

**Session handoff is mandatory.** This is what `/float` displays next session.

**Session handoff example:**
```sql
INSERT INTO log_entries (folder_path, date, topic, status, title, decision, rationale, files_changed, created_at)
VALUES (
  '/',
  '2026-01-09',
  'session-handoff',
  'open',
  'Session 41 handoff',
  'Refined plugin architecture. Clarified no CLI needed - AI uses sqlite3 directly.',
  'Next options: 1) Update PRD to match new architecture, 2) Build SessionEnd hook, 3) Design Float.md content',
  '["artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md"]',
  unixepoch()
);
```

**Uses:** sqlite3 via Bash (no CLI)

### SessionEnd Hook

**Event:** `SessionEnd`

**What it does:**
1. Detect edited folders via `git diff --name-only | xargs dirname | sort -u`
2. Spawn `float-enricher` with folder list
3. Spawn `float-logger` with session context
4. **Workshop gate:** If `.float-workshop/` exists, also spawn `float-organize`

**Hook configuration (hooks/hooks.json):**
```json
{
  "description": "FloatPrompt session end automation",
  "hooks": {
    "SessionEnd": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/hooks/session-end.sh"
          }
        ]
      }
    ]
  }
}
```

**The session-end.sh script:**
- Runs `git diff --name-only` to find changed files
- Extracts unique folder paths
- Outputs JSON for agent spawning
- Checks for `.float-workshop/` existence

### PreCompact Hook

**Event:** `PreCompact`

**Matchers:** `auto` (triggered by full context window)

**What it does:** Emergency context preservation before autocompact fires.

**Configuration:**
```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/hooks/pre-compact.sh"
          }
        ]
      }
    ]
  }
}
```

**Note:** May not have time to spawn full agents. Testing needed. Simpler approach might be direct sqlite3 insert of session state.

**Discovery (Session 40-41):** Spawning agents via Task tool appears to show reduced context usage (~120k tokens "freed") without triggering autocompact. However, Session 41 observed that context refills once conversation resumes. The "freed" state may be a measurement artifact or temporary compression, not permanent token reduction. Handoff is still valuable as a natural break point for capturing state in artifacts, even if it doesn't actually extend the context window.

---

## Database Schema

### folders table (16 fields)

```sql
CREATE TABLE folders (
  -- Identity (3)
  path TEXT PRIMARY KEY,        -- '/src/auth'
  parent_path TEXT,             -- '/src'
  name TEXT NOT NULL,           -- 'auth'

  -- Governance (2)
  type TEXT,                    -- folder | scope | log_root | log_year | log_month
  status TEXT DEFAULT 'pending', -- pending | current | stale

  -- AI Content (2)
  description TEXT,             -- Quick orientation ("what's here")
  context TEXT,                 -- Deeper understanding ("what it means")

  -- Scope (3)
  is_scope INTEGER DEFAULT 0,   -- TRUE if autonomous world
  parent_scope_path TEXT,       -- Pointer to parent scope
  scope_boot TEXT,              -- Scope-specific boot context

  -- Mechanical (2)
  source_hash TEXT,             -- SHA-256 of children
  last_scanned_at INTEGER,      -- Unix timestamp

  -- AI Attribution (2)
  ai_model TEXT,                -- 'claude-sonnet-4'
  ai_updated INTEGER,           -- When AI last wrote

  -- Timestamps (2)
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

CREATE INDEX idx_folders_parent ON folders(parent_path);
CREATE INDEX idx_folders_scope ON folders(parent_scope_path);
CREATE INDEX idx_folders_status ON folders(status);
```

**Current state:** Database exists but uses `content_md` instead of `context`. Rename needed.

### log_entries table

```sql
CREATE TABLE log_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  folder_path TEXT NOT NULL,    -- '/' for project-wide, or specific folder
  date TEXT NOT NULL,           -- YYYY-MM-DD
  topic TEXT NOT NULL,          -- 'session-handoff' or decision topic
  status TEXT NOT NULL,         -- locked | open | superseded

  title TEXT NOT NULL,
  decision TEXT,                -- What was decided / worked on
  rationale TEXT,               -- Why / next step options
  files_read TEXT,              -- JSON array: files AI read for understanding
  files_changed TEXT,           -- JSON array: files AI modified

  created_at INTEGER NOT NULL
);

CREATE INDEX idx_log_entries_date ON log_entries(date);
CREATE INDEX idx_log_entries_folder ON log_entries(folder_path);
CREATE INDEX idx_log_entries_topic ON log_entries(topic);
CREATE INDEX idx_log_entries_status ON log_entries(status);
```

**files_read vs files_changed:** Both are critical for mode inference. `files_changed` shows what was modified. `files_read` shows what AI explored for understanding — research, context-gathering, exploration. Together they paint a complete picture of session focus.

### files table

```sql
CREATE TABLE files (
  path TEXT PRIMARY KEY,
  folder_path TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,
  last_scanned_at INTEGER NOT NULL
);

CREATE INDEX idx_files_folder ON files(folder_path);
```

---

## Float.md — The Driver's Manual

Float.md is the critical piece. It teaches AI how to operate the system.

### Design Principles

1. **Teach to fish, not give fish** — Don't load all context. Teach AI how to get context.
2. **< 800 tokens** — Concise. AI learns fast. Every token must earn its place.
3. **Actionable** — Not philosophy. Concrete: "run this query to get X."
4. **Trust AI judgment** — Don't micromanage. AI knows when to query.

### What it covers

1. **What is FloatPrompt?** — One sentence. Persistent context that compounds.
2. **How to query context:**
   - Current folder: `sqlite3 .float/float.db "SELECT description, context FROM folders WHERE path='...'"`
   - Scope chain: Recursive CTE query
   - Session handoff: `SELECT * FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1`
3. **When to query:**
   - Entering a new folder and need understanding
   - Checking if context is stale
   - Looking for decisions made in an area
4. **How to check freshness:**
   - `status = 'current'` → trust it
   - `status = 'stale'` → verify before relying
   - `status = 'pending'` → no AI context yet
5. **How to infer recent focus:**
   - Query recent `log_entries` for `files_read` and `files_changed`
   - Look for patterns in file paths to understand what human's been working on
   - Surface relevant context based on inferred focus area
6. **What's automatic:**
   - SessionEnd hook handles enrichment
   - Activity logging (files_read, files_changed) captured each session
   - You don't need to manually update (but you can)
7. **The core loop:**
   - Boot → Work → Learn → (automatic capture) → Next session inherits

### What it does NOT cover

- Full schema documentation
- History of decisions
- Philosophy of the system
- Anything > 800 tokens

---

## The Enrichment Loop

```
Session N:
  /float → AI reads Float.md → AI has instructions
       ↓
  AI queries context for current location
       ↓
  Human + AI work together
       ↓
  AI learns things not in float.db
       ↓
  SessionEnd hook fires
       ↓
  float-enricher updates folder context
  float-logger captures decisions + handoff
       ↓
Session N+1:
  /float → AI reads Float.md
       ↓
  AI queries latest session-handoff
       ↓
  "Last session: [what you worked on]. Options: [next steps]"
       ↓
  Context has compounded. AI starts where it left off.
```

**This is the core value.** Context that learns. Understanding that persists.

---

## Workshop Gate

The plugin includes workshop-specific functionality that only activates when `.float-workshop/` exists.

**Workshop agents:**
- `float-organize` — Moves completed items to done/, updates ACTIVE.md
- `float-update-logs` — Records session decisions to logs/

**Gate logic in SessionEnd hook:**
```bash
if [ -d ".float-workshop" ]; then
  # Spawn workshop agents
fi
```

**Why gate?**
- `.float-workshop/` is the FloatPrompt development workflow
- Users installing the plugin won't have this folder
- Workshop agents are internal tooling, not user-facing

---

## What's NOT in This Architecture

| Excluded | Why |
|----------|-----|
| Custom CLI (`float-db.js`) | AI uses sqlite3 directly |
| TypeScript tooling | Shell scripts + sqlite3 suffice for v1 |
| MCP server | Token overhead from tool descriptions every session |
| Multiple human commands | One command: `/float` |
| npm distribution | Claude Marketplace, not npm |
| Human-facing ergonomics | Human runs /float, AI does the rest |
| Buoy execution engine | Future architecture, beyond this plugin |
| Static mode files | Replaced by mode inference from activity logs |
| `float-mode-suggest` skill | Static modes get stale; inferred focus from `files_read`/`files_changed` is always current |
| Manual mode creation/activation | AI infers focus automatically from logged activity patterns |

---

## Distribution

**Via Claude Marketplace, not npm.**

The npm package `floatprompt` is a **separate product** (FloatPrompt for Web — makes websites AI-readable). Different codebase, different purpose.

```bash
# User adds marketplace (one-time)
/plugin marketplace add mds/floatprompt

# User installs plugin
/plugin install floatprompt@mds

# User updates later
/plugin marketplace update
```

**Repository structure:**
```
github.com/mds/floatprompt/
├── .claude-plugin/
│   └── marketplace.json      ← Lists plugins in this repo
├── plugins/
│   └── floatprompt/          ← The actual plugin
│       ├── .claude-plugin/
│       │   └── plugin.json
│       ├── commands/
│       ├── agents/
│       ├── hooks/
│       ├── lib/
│       └── templates/
├── web/                      ← FloatPrompt for Web (npm, separate)
└── src/                      ← Source TypeScript (if needed)
```

**marketplace.json:**
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

---

## Key Principles

### AI-Native

Float.db is built FOR AI, BY AI:
- AI creates context through work
- AI enriches through learning
- AI maintains through staleness detection
- Human audits occasionally, not constantly

### One Command

Human complexity budget: one command.
- `/float` starts everything
- Everything else is automatic
- Power users can dig deeper, but shouldn't need to

### Queryable Beats Navigable

AI doesn't browse folders. AI runs queries.
- "What's stale?" → `SELECT path FROM folders WHERE status='stale'`
- "Scope chain?" → Recursive CTE
- "What do I know about auth?" → `SELECT * FROM folders WHERE path LIKE '%auth%'`

Optimize for queries, not human readability.

### Context Compounds

Each session builds on the last:
- Session 1: AI learns, writes back
- Session 2: AI boots with Session 1's learning
- Session N: AI has accumulated understanding

This is memory infrastructure for AI.

### Compressed Human Judgment

Context isn't just information. It's **distilled judgment** — decisions, rationale, patterns, understanding. Initially from humans, increasingly from AI.

The compression serves AI. Export to markdown when humans need to audit.

---

## Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Database schema | Exists | Needs `content_md` → `context` rename |
| /float command | Exists as `/float-boot` | Needs rename + update |
| float-enricher agent | Drafted | In `.claude/agents/draft/` |
| float-logger agent | Drafted | In `.claude/agents/draft/` |
| float-organize agent | Exists | Workshop only |
| SessionEnd hook | Not started | Next priority |
| PreCompact hook | Not started | Test timing first |
| Float.md | Not started | Design last |
| Layer 1 scan | Partial | float.db exists, scan script doesn't |
| Plugin structure | Needs reorganization | Move to `plugins/floatprompt/` |
| marketplace.json | Not started | Phase 6 |

---

## Open Questions

1. **Float.md content** — Exact instructions (design last, after everything works)
2. **PreCompact timing** — Is there enough time to spawn agents? May need simpler approach. Testing suggests it works (Session 40 discovery).
3. **Scan approach** — Shell script vs AI does it via find+sqlite3. Defer decision until needed.
4. **Schema rename** — `content_md` → `context`. Check migration approach.

---

## What Success Looks Like

Human runs `/float`.

AI says: "Last session you were implementing JWT refresh tokens. Options: 1) Add token revocation, 2) Implement blacklist, 3) Move to user registration."

Human picks an option or goes a different direction.

They work. AI queries context when entering new folders. AI learns things.

Session ends. Hooks fire. Context is captured.

Next session: same human runs `/float`. AI remembers. Context has compounded.

**No archaeology. No re-explaining. Understanding persists.**

---

## The End State

Human opens Claude Code anywhere in the project.

AI reads Float.md, scope chain, folder context.

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)
- Where they left off (from session-handoff)

**No more "what framework is this?" No more repeating context every session.**

It's just there. Always fresh. Always recursive. Always ready.

---

*2026-01-09 — The definitive FloatPrompt plugin architecture*
