# FloatPrompt Plugin

**Status:** Authoritative specification
**Updated:** 2026-01-09 (Session 42)
**Supersedes:** All prior plugin docs (architecture artifact, PRD, early notes)

---

## The One-Sentence Summary

Human runs `/float`. AI operates everything else.

---

## Glossary

| Term | Meaning |
|------|---------|
| **float.db** | SQLite database at `.float/float.db` storing folder context, file hashes, decision logs |
| **Layer 1** | Mechanical scanning — walk filesystem, hash files, write to SQLite (no AI) |
| **Layer 2** | AI generation — generate descriptions and context per folder |
| **Layer 3** | Ongoing — hooks and triggers that keep context fresh |
| **Float.md** | The "driver's manual" — instructions that teach AI how to operate float.db (naming TBD: could be `boot.md`, `float.md`, or `FLOAT.MD`) |
| **SessionEnd** | Claude Code hook event that fires when session is ending |
| **PreCompact** | Claude Code hook event that fires before context window auto-compacts |
| **files_read** | JSON array of files AI read for understanding (logged per session) |
| **files_changed** | JSON array of files AI modified (logged per session) |
| **Mode inference** | AI infers focus area from files_read/files_changed patterns (replaces static modes) |

---

## Who This Is For

**Claude Code users** who want persistent context that survives sessions.

**The workflow:**
1. Human cd's to project directory
2. Human runs `claude`
3. Human types `/float`
4. AI boots with full context — where you left off, what folders mean, decisions made
5. Human & AI work together
6. SessionEnd hook captures learnings automatically
7. Next session: `/float` picks up where you left off

**When CLAUDE.md is sufficient:**
- Small projects (< 10 folders)
- One-off sessions
- Projects where the whole thing fits in your head

**When float.db adds value:**
- Projects you return to across 3+ sessions
- 20+ folders (where CLAUDE.md becomes unwieldy)
- Codebases where "what does this folder do?" is a recurring question
- Long-term projects where understanding should accumulate

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

## The Analogy: .float is .git for AI context

Developers already understand `.git` — invisible infrastructure that tracks state.

| .git | .float |
|------|--------|
| Tracks code changes | Tracks context/understanding |
| Manual commits | Automatic enrichment |
| You push/pull | It breathes |
| Version history | Decision history |
| Invisible infrastructure | Invisible infrastructure |

**The difference:** Git requires discipline (`git add`, `git commit`, `git push`). Float requires ONE command and then gets out of the way.

**.git changed how developers work.** You don't think about it — it's just there, tracking everything.

**.float does the same for AI collaboration.** You don't think about context — it's just there, compounding every session.

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

### Workshop Origin

The `.float-workshop/` manual workflow was the prototype:

| Workshop (Manual) | float.db (Automatic) |
|-------------------|----------------------|
| `active/ACTIVE.md` | `log_entries WHERE topic = 'session-handoff'` |
| `logs/*.md` | `log_entries WHERE status = 'locked'` |
| Folder context docs | `folders.description` + `folders.context` |

The plugin automates this with float.db as the storage layer.

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

### Why One Command (Not Zero)

Zero commands (auto-boot via SessionStart) feels presumptuous. Sometimes you're fixing a typo. You don't need the full context machinery.

`/float` respects agency. It's like running `git init` — an intentional opt-in.

| Commands | Problem |
|----------|---------|
| **Zero** | Too assumptive — not every session needs context machinery |
| **One** | Intentional, respectful, minimal friction |
| **Many** | Won't get adopted — humans don't learn complex AI workflows |

The adoption truth: No human adopts a complex new AI workflow unless it's wildly better than what they're already doing — with near-zero friction.

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

### The Principle

> **Log the activity, infer the context. Don't create static artifacts that rot.**

Float.db is a **living system**. Everything is either:
1. **Mechanical data** — hashes, timestamps, paths (always accurate)
2. **AI-enriched context** — descriptions, understanding (refreshed by activity)
3. **Activity logs** — files_read, files_changed, decisions (captured per session)

Nothing is a static artifact that humans must remember to update.

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

## The Token Economy

This system operates in a **token economy** — but the goal isn't minimizing tokens, it's **maximizing value per token**.

Every piece of context must pass the test:

> "Does this help AI understand and operate better?"

**What makes context valuable:**
- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluff

### Context Hygiene

**Principle:** All float components must REDUCE context, not add to it.

| Component | Context Cost | Pattern |
|-----------|--------------|---------|
| `/float` command | ~2k tokens (boot only) | Load instructions, not all context |
| Float.md | < 800 tokens | Teach to fish, not give fish |
| Agents | Zero (main thread) | Separate context window |
| Hooks | Zero | Shell commands spawn agents |
| float.db queries | On-demand | Query specific folder, not bulk |

**The CLAUDE.md problem:** Everything loads at session start. 100 folders = massive context.

**The float.db solution:** Query what you need, when you need it. Store hundreds of folders, load 3-5 as needed.

---

## Technical Stack

| Component | Technology |
|-----------|------------|
| Runtime | Claude Code (CLI) |
| Database | SQLite (`.float/float.db`) |
| Plugin format | Claude Code native (commands/, agents/, hooks/) |
| AI calls | Uses Claude Code's existing auth (Max subscription or API plan) |
| DB access | AI runs `sqlite3` directly via Bash |

**No separate API key required** — the plugin uses Claude Code's built-in authentication. Agents run as subprocesses within Claude Code's context.

**No MCP server** — AI uses sqlite3 directly, not an MCP server. Avoids token overhead from tool descriptions in system prompt every session.

---

## Configuration

**Philosophy:** Zero configuration for v1. `/float` just works.

- No environment variables required
- No plugin settings required
- No `.float/config.json` needed
- Plugin uses Claude Code's existing auth

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

## Git Integration

**Commit `.float/` to git** — context compounds and shares across team/machines.

| File | Git Status | Rationale |
|------|------------|-----------|
| `.float/float.db` | Committed | Context persists, new clones have it |
| `.float/Float.md` | Committed | Same instructions for everyone |

**Merge conflicts:** If two people enrich the same folder, git can't merge SQLite. Resolution: pick newer version, re-enrich if needed. Rare for solo dev (v1 target).

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

### Future Tables (exist in schema, unused in v1)

| Table | Purpose |
|-------|---------|
| `references` | Cross-folder staleness detection |
| `open_questions` | Unresolved items |
| `tags` | Categorization |
| `log_entry_tags` | Many-to-many for tags |
| `deep` | Topic-based context (concept primers) |
| `deep_history` | Version history for deep contexts |

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

**Critical:** Commands, agents, hooks go at plugin root — NOT inside `.claude-plugin/`.

### /float Command

**Purpose:** Human entry point. Loads Float.md, AI takes over.

**First run (no float.db):**
1. Check if `.float/float.db` exists — NOT FOUND
2. Create `.float/` directory
3. Run Layer 1 scan (filesystem → SQLite)
4. Copy Float.md to `.float/`
5. Load Float.md instructions into context
6. Output: "FloatPrompt initialized. X folders indexed."

**Subsequent runs (float.db exists):**
1. Check if `.float/float.db` exists — FOUND
2. Load Float.md instructions into context
3. Query latest session-handoff from `log_entries`
4. Display: "Last session: [what]. Options: [next steps]"
5. AI is now equipped to work

**What it teaches AI:**
- How to query float.db for context
- When to query (entering new folder, need understanding)
- How to update context (after learning something)
- How to infer recent focus from files_read/files_changed
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
INSERT INTO log_entries (folder_path, date, topic, status, title, decision, rationale, files_read, files_changed, created_at)
VALUES (
  '/',
  '2026-01-09',
  'session-handoff',
  'open',
  'Session 42 handoff',
  'Consolidated plugin docs. Clarified mode inference replaces static modes.',
  'Next options: 1) Build SessionEnd hook, 2) Update agents to sqlite3, 3) Design Float.md',
  '["artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md", "active/floatprompt-plugin-PRD.md"]',
  '["active/floatprompt-plugin.md"]',
  unixepoch()
);
```

**Uses:** sqlite3 via Bash (no CLI)

### Automatic Handoff Hook

**Triggers:** PreCompact (primary) OR SessionEnd (fallback)

**Strategy:**
| Trigger | sqlite3 | Agents | Why |
|---------|---------|--------|-----|
| **PreCompact** | Yes | Yes | Session alive, agents complete reliably |
| **SessionEnd** | Yes | No | Terminal closing, agents might die |

**What it does:**
1. Early exit if no `.float/float.db` (not initialized)
2. Early exit if handoff ran in last 5 min (deduplication)
3. Early exit if no `git diff` changes
4. **Phase 1:** Mechanical sqlite3 INSERT (always, instant)
5. **If PreCompact:** Spawn float-log, float-enrich, workshop agents
6. **If SessionEnd:** Exit (mechanical capture is enough)

**Hook configuration (hooks/hooks.json):**
```json
{
  "description": "FloatPrompt automatic handoff - PreCompact or SessionEnd",
  "hooks": {
    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [{
          "type": "command",
          "command": "${CLAUDE_PLUGIN_ROOT}/hooks/float-handoff.sh",
          "timeout": 120
        }]
      }
    ],
    "SessionEnd": [
      {
        "hooks": [{
          "type": "command",
          "command": "${CLAUDE_PLUGIN_ROOT}/hooks/float-handoff.sh",
          "timeout": 120
        }]
      }
    ]
  }
}
```

**The float-handoff.sh script:**
- Same script for both triggers, different behavior based on `HOOK_EVENT`
- Deduplication via sqlite3 query (recent handoff check)
- Hybrid approach: mechanical capture (floor) + AI enrichment (ceiling)
- Workshop gate: only spawns workshop agents if `.float-workshop/` exists

---

## Float.md — The Driver's Manual

> **Naming TBD:** Could be `boot.md`, `float.md`, or `FLOAT.MD`. The file will exist in `.float/`; final name undecided.

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
  float-logger captures decisions + handoff (with files_read, files_changed)
       ↓
Session N+1:
  /float → AI reads Float.md
       ↓
  AI queries latest session-handoff
       ↓
  AI infers recent focus from files_read/files_changed patterns
       ↓
  "Last session: [what you worked on]. Recent focus: [inferred area]. Options: [next steps]"
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

## What's NOT in This Plugin

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
| Multi-repo federation | Solo dev focus, one project at a time |
| Team/concurrent handling | Not needed — anyone enriching same folder helps the db |
| Static context export | Future architecture |
| Manual context editing UI | AI edits via conversation |
| Custom enrichment prompts | Later. May emerge naturally. |

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

### Context Compounds

Each session builds on the last:
- Session 1: AI learns, writes back
- Session 2: AI boots with Session 1's learning
- Session N: AI has accumulated understanding

This is memory infrastructure for AI.

### Compressed Human Judgment

Context isn't just information. It's **distilled judgment** — decisions, rationale, patterns, understanding. Initially from humans, increasingly from AI.

> "You're compressing human judgment into injectable context."

When someone writes "this folder handles authentication," they're encoding years of experience, decisions, trade-offs. That judgment persists and becomes queryable. Float.db stores compressed judgment. AI enriches it automatically. Humans audit occasionally.

### Living Over Static

Log the activity, infer the context. Don't create static artifacts that rot.

---

## Success Criteria

### Must Have (v1)

- [ ] `/float` creates float.db on first run (Layer 1 scan)
- [ ] `/float` loads Float.md instructions on subsequent runs
- [ ] `/float` shows session continuity from last session (if exists)
- [ ] AI can query float.db on-demand for context
- [ ] SessionEnd hook detects edited folders via git diff
- [ ] `float-enricher` agent enriches edited folders at session end
- [ ] `float-logger` agent writes session-handoff entry (always)
- [ ] `float-logger` captures files_read and files_changed
- [ ] Workshop agent only runs when `.float-workshop/` exists
- [ ] Context compounds across sessions (measurable)
- [ ] `.float/` committed to git (float.db + Float.md)

### Should Have (v1)

- [ ] Float.md is < 800 tokens
- [ ] Enrichment doesn't block main conversation (background agent)
- [ ] Error states are graceful (never blocks user)
- [ ] First-run experience is smooth (scan completes, clear feedback)
- [ ] Mode inference works (AI surfaces recent focus from activity logs)

### Nice to Have (v1)

- [x] PreCompact hook preserves learnings — **Done** (integrated with automatic handoff)
- [ ] Staleness count shown at boot
- [ ] Power user can manually trigger enrichment

---

## Implementation Status

| Component | Status | Location |
|-----------|--------|----------|
| Database schema | **Done** | `plugins/floatprompt/lib/schema.sql` |
| float.db | **Done** | `.float/float.db` — 86 folders, 582 files, 3 log entries |
| float-enrich agent | **Done** | `.claude/agents/draft/float-enrich.md` — sqlite3 direct |
| float-log agent | **Done** | `.claude/agents/draft/float-log.md` — folder-level logging |
| float-organize agent | Exists | `.claude/agents/float-organize.md` — workshop only |
| /float command | **Done** | `plugins/floatprompt/commands/float.md` |
| Automatic handoff hook | **Done** | `plugins/floatprompt/hooks/float-handoff.sh` — enhanced prompts |
| Float.md | **Done** | `plugins/floatprompt/templates/Float.md` |
| Layer 1 scan | **Done** | `plugins/floatprompt/lib/scan.sh` — folders + files with hashes |
| Plugin manifest | **Done** | `plugins/floatprompt/.claude-plugin/plugin.json` — validated |
| Plugin validation | **Done** | Session 45 — schema issues fixed |
| End-to-end test | **In Progress** | Plugin loads, commands work |
| marketplace.json | Not started | After testing |

---

## Open Questions

1. **Float.md content** — Exact instructions (design last, after everything works)
2. **Float.md naming** — Could be `boot.md`, `float.md`, or `FLOAT.MD`. The file will exist; name TBD.
3. **PreCompact timing** — Is there enough time to spawn agents? Testing needed.
4. ~~**Scan approach** — Shell script vs AI does it via find+sqlite3.~~ **DONE** (Session 45) — Shell script populates folders + files
5. ~~**Schema rename** — `content_md` → `context`.~~ **DONE** (Session 43)
6. ~~**Files table population** — Shell script needed to match TypeScript scanner.~~ **DONE** (Session 45)

---

## Resolved Questions (Historical)

| Question | Answer |
|----------|--------|
| Who is this for? | Solo devs on personal/work projects |
| Enrichment triggers? | SessionEnd hook uses git diff — agent decides if worth saving |
| API key needed? | No — uses Claude Code's auth |
| What loads at boot? | Float.md (instructions), then on-demand queries |
| Token budget? | Float.md < 800 tokens, context queried as needed |
| Workshop separation? | `.float-workshop/` directory presence gates workshop agents |
| MCP vs bundled scripts? | AI uses sqlite3 directly — avoids MCP token overhead |
| Git integration? | Commit `.float/` (float.db + Float.md) |
| Session continuity? | `log_entries` with `topic=session-handoff`. Written always at session end. Queried at boot. |
| float-logger dual purpose? | Writes decisions (locked) + session handoff (open). Handoff is mandatory. |
| Plugin distribution? | Claude Marketplace, NOT npm |
| npm package conflict? | No conflict. npm `floatprompt` is FloatPrompt for Web (separate product). |
| Static modes? | OUT — replaced by mode inference from `files_read`/`files_changed` |
| float-mode-suggest skill? | OUT — static modes get stale; inferred focus is always current |

---

## What Success Looks Like

Human runs `/float`.

AI says: "Last session you were implementing JWT refresh tokens. Recent focus: authentication system. Options: 1) Add token revocation, 2) Implement blacklist, 3) Move to user registration."

Human picks an option or goes a different direction.

They work. AI queries context when entering new folders. AI learns things.

Session ends. Hooks fire. Context is captured (including files_read and files_changed).

Next session: same human runs `/float`. AI remembers. AI infers focus. Context has compounded.

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
- Inferred focus area (from files_read/files_changed patterns)

**No more "what framework is this?" No more repeating context every session.**

It's just there. Always fresh. Always recursive. Always ready.

---

*FloatPrompt Plugin — The authoritative specification*
*Session 42 — Consolidated from architecture, PRD, and session discussions*
