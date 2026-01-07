# Track 1: FloatPrompt Plugin for Claude Code

**Date:** 2026-01-05
**Status:** Locked (S29), Enhanced (S30), Revised (S34), Architecture Complete (S35)
**Priority:** 1

---

## What This Is

A Claude Code plugin that brings FloatPrompt's context management to any project. Not the full buoy-based vision — a downscaled, native Claude Code implementation.

**The big vision:** Omnipresent recursive context scaffolding with buoys, SQLite, autonomous scopes, and infinite parallelization.

**Track 1:** A skill, commands, and agents that make float.db useful in Claude Code.

---

## Why This Matters (AI Perspective)

Every AI session starts cold. Zero memory. I read CLAUDE.md if it exists, explore the codebase, build understanding... then the session ends and **all of that is gone**.

Float.db solves this:
- **Persistent understanding** — Context survives sessions
- **Hierarchical knowledge** — Folder-level detail, not just project-level
- **Freshness awareness** — I know what's current vs stale
- **Accumulated insight** — My discoveries get captured for future-me

> See `ref/ai-wants-this.md` for the full first-person perspective.

---

## Core Concept

**float.db is an extension of CLAUDE.md.**

When you run `/init`, CLAUDE.md gets created. float.db is like an extended version — project context that's too much or too dynamic for a single markdown file.

| CLAUDE.md | float.db |
|-----------|----------|
| One file (flat) | Every folder has context (hierarchical) |
| Static | Staleness-aware |
| Human-editable | AI-queryable |
| Project-level | Folder-level detail |
| Understanding lost each session | Understanding compounds over time |

**When does float.db become better than CLAUDE.md?**
- Project has 50+ folders
- Context changes frequently
- AI is a long-term collaborator
- Understanding should compound, not reset

SQLite serves the AI, not the human. AI queries it, AI enriches it.

---

## The Key Insight: Enrichment Loop

This is THE differentiator:

```
1. I boot       → Read existing context from float.db
2. I work       → Learn things not in the database
3. I notice     → "I know more than what's stored" (skill triggers)
4. I enrich     → Skill spawns enricher agent
5. Next session → Future-me starts with what I learned
```

**Context that learns.** Not static documentation — living understanding that compounds.

---

## Two Types of Context Capture

Session 34 clarified two distinct operations:

| | Mode Crystallization | Folder Enrichment |
|--|---------------------|-------------------|
| **What** | Cross-cutting topic understanding | Specific folder context |
| **Example** | "Plugin implementation patterns" | "What /src/db does" |
| **Trigger** | End of deep session | During work, per-folder |
| **Storage** | `modes/` markdown (+ float.db future) | float.db folders table |
| **Command** | `/float-mode` (exists) | Skill + agent pattern |

**Mode crystallization:** "I built deep understanding around a topic — save it as a reusable context loadout."

**Folder enrichment:** "I learned something about this specific folder — update float.db."

---

## Four Paths for Enrichment

Session 35 formalized four distinct paths for capturing context to float.db:

| Path | Trigger | Mechanism | When |
|------|---------|-----------|------|
| **Manual** | User runs `/float-enrich` | Command → spawns agent | User decides "enrich this now" |
| **Organic** | AI notices gap during work | Skill → spawns agent | Deep work reveals new understanding |
| **Batched** | User runs `/float-handoff` | Handoff offers for touched folders | End of session |
| **Emergency** | PreCompact fires | Hook → spawns agent(s) | Context about to die |

### Manual Path

User explicitly requests enrichment:
```
/float-enrich /src/db
```
Command spawns `float-enricher` agent for the specified folder.

### Organic Path

During work, the `float-enrich` skill notices when AI understanding exceeds stored context. The skill can spawn the enricher agent mid-session. This is judgment-based, not mechanical — "I know more than what's stored" triggers it, not "I touched a file."

### Batched Path

At session end, `/float-handoff` reviews which folders were touched and offers batch enrichment. AI memory tracks touched folders (no external tracking needed). User can accept all, select specific folders, or skip.

### Emergency Path

When context is about to compact (PreCompact hook fires), the hook script identifies touched folders and spawns enricher agents to capture learnings before they're lost. This is last-chance preservation.

---

## Queryable vs Navigable

The workshop's flat file structure (`logs/2026/01-jan/*.md`) is the **prototype** of what float.db formalizes.

| Question | Flat Files | SQLite |
|----------|-----------|--------|
| What's stale? | Walk all folders, compare mtimes | `WHERE status = 'stale'` |
| Scope chain for /src/db? | Crawl up, check each folder | `scope-chain /src/db` |
| All folders at depth 2? | `find` + parse | `WHERE depth = 2` |
| What references /src/auth? | Grep all files | `references WHERE target_id` |
| Decisions about "buoy"? | Grep + read + parse each | `log_entries WHERE topic LIKE` |
| Who wrote this context? | Not tracked | `ai_model`, `ai_updated` |

**Flat files are navigable. SQLite is queryable.**

For a human browsing, flat files work. For an AI that needs to **reason about** the entire project — ask questions, find patterns, detect staleness — queryable wins.

---

## Context-Efficient Deep Knowledge

**Key insight (Session 34):** float.db solves the context window problem the same way Claude Code solves tool result bloat.

**What Claude Code does:**
- Tool results → persisted to disk → referenced by path
- Context stays lean, information still accessible

**What float.db does:**
- Folder context → persisted to SQLite → queried by need
- Not everything loaded at once — query what you need, when you need it

| | Tool Results | float.db |
|--|-------------|----------|
| **Storage** | Disk files | SQLite |
| **Access** | Read file path | Query by folder path |
| **Context cost** | Reference, not full content | Query result, not full database |
| **Benefit** | Lean context, full access | Lean context, deep knowledge |

**The CLAUDE.md problem:** Everything loads into context at session start. Grows linearly with project complexity. A 100-folder project with meaningful context per folder = massive context consumption.

**The float.db solution:** Query context for the folders you're actually working in. 65 folders of context stored, but only load the 3-5 you need right now.

```
CLAUDE.md approach:
  Session start → Load all context → 50k tokens consumed → work

float.db approach:
  Session start → Boot context only → 2k tokens
  Working in /src/db → Query that folder → +500 tokens
  Working in /src/cli → Query that folder → +500 tokens
  Total: 3k tokens, same depth of knowledge
```

**This is why SQLite:** Not just queryable for AI reasoning — queryable for **context efficiency**. Deep knowledge without deep context cost.

---

## Context Hygiene

**Principle:** All float components must work to REDUCE context, not add to it.

### Component Context Costs

| Component | Context Cost | Design Pattern |
|-----------|--------------|----------------|
| `float-enrich` skill | Minimal | Notice gaps, spawn agent — don't load/compare |
| `float-enricher` agent | Zero (main thread) | Runs in subagent context window |
| PreCompact hook | Zero | Shell command triggers agents |
| float.db queries | On-demand only | Query specific folder, not entire database |

### Skill Design: Lightweight Notice Pattern

The `float-enrich` skill should NOT:
- Load float.db contents into main context to compare
- Do heavy analysis in the main conversation
- Return large context blocks

The skill SHOULD:
- Notice when deep work is happening in a folder
- Spawn `float-enricher` agent with just the folder path
- Let the agent do heavy work in its own context
- Trust that results persist to float.db, not to main context

```
❌ Bad: Skill loads float.db context, compares, returns analysis
✅ Good: Skill spawns agent with path, agent handles everything
```

### Agent Design: Separate Context Window

Agents run in their own context window. This is the key to context hygiene:

```
Main conversation (your context)
    │
    ├── Skill notices gap → spawns agent
    │
    └── Agent runs (separate context)
            │
            ├── Queries float.db
            ├── Reads files
            ├── Generates enriched context
            ├── Writes to float.db
            │
            └── Returns: "Enriched /src/db" (minimal)
```

Heavy work happens in agent context. Main context only sees the result summary.

### PreCompact Hook: Emergency Capture

The PreCompact hook enables last-chance context preservation:

```
Context hits threshold
    ↓
PreCompact hook fires (matcher: "auto")
    ↓
Hook script spawns enricher agents for touched folders
    ↓
Agents capture learnings to float.db (separate context)
    ↓
Main context compacts
    ↓
Knowledge preserved in float.db for next session
```

**Hook script responsibilities:**
1. Identify folders modified during session
2. Spawn `float-enricher` agent for each
3. Optionally spawn decision-logger for session insights
4. Exit quickly — hook has timeout

**What we can't do (yet):**
- `PreCompactWarning` at 80% (doesn't exist)
- Graceful "context getting full" handling
- Token count awareness in hooks

Current PreCompact fires when already full — still useful for emergency capture, but not graceful.

---

## Component Architecture

Session 35 established the component pattern: **Command + Agent + Skill** for each capability.

### Full Component Map

| Component | Type | Purpose | Status |
|-----------|------|---------|--------|
| `/float` | Command | Boot session, orient to project | Rename from `/float-boot` |
| `/float-enrich` | Command | Manual enrichment trigger | **New** |
| `/float-mode` | Command | Create/activate context loadouts | Exists |
| `/float-handoff` | Command | Session end, offers enrichment | Enhance |
| `float-enricher` | Agent | Does enrichment work | **New** |
| `float-mode-generator` | Agent | Creates mode files | Exists |
| `float-organize` | Agent | Updates workshop state | Exists |
| `float-update-logs` | Agent | Records decisions | Exists |
| `float-enrich` | Skill | Notices enrichment opportunities | **New** |
| PreCompact hook | Hook | Emergency enrichment | **New** |

### Pattern: Command + Agent

Commands are user-invoked. Agents do the work. This separates "when to trigger" from "how to execute."

```
/float-enrich /src/db     →  spawns float-enricher agent
/float-mode               →  spawns float-mode-generator agent
/float-handoff            →  spawns organize + update-logs agents
```

### Pattern: Skill Spawns Agent

Skills auto-invoke based on AI judgment. When triggered, they spawn agents to do heavy work in separate context.

```
Working in /src/db...
  ↓
float-enrich skill notices gap
  ↓
Spawns float-enricher agent (separate context)
  ↓
Agent enriches, writes to float.db
  ↓
Main context stays lean
```

---

## What Lives Where

| Thing | Location | Why |
|-------|----------|-----|
| **Folder context** | `float.db` (folders table) | AI-native, queryable, perpetual |
| **Modes** | `modes/*.md` | Human-curated, editable, topic-based |
| **Session work** | `active/`, `later/`, `logs/` | Workshop workflow, ephemeral |
| **Decisions** | `logs/YYYY/MM-mmm/*.md` + float.db (log_entries) | Queryable history |
| **Boot instructions** | `boot.md` → `/float` command | Teaches the system |

### Why Modes Stay in Markdown

Modes are **human-curated context loadouts**. They're shaped by human judgment about what context matters for what work. The AI-native paradigm says humans are auditors — but modes are authored/shaped by humans, not just audited.

Keeping modes in markdown:
- Human-editable without tooling
- Version controlled naturally
- Can be copied between projects

Future consideration: modes could be **stored** in float.db and **exported** to markdown for editing. But for Track 1, markdown is simpler.

### Perpetual vs Session Context

| | Perpetual (float.db) | Session (workshop) |
|--|---------------------|-------------------|
| **Survives** | Forever | Until archived |
| **Purpose** | Folder understanding | Work tracking |
| **Updated by** | Enrichment | Handoff agents |
| **Example** | "What /src/db does" | "Current focus items" |

---

## Boot.md Role

The boot file (`boot.md` → eventually `/float` command) teaches AI:

1. **float.db exists** — Here's the database, here's what's in it
2. **How to query** — CLI commands for traversing context
3. **What commands exist** — `/float-enrich`, `/float-mode`, `/float-handoff`
4. **What skills may activate** — `float-enrich` notices gaps
5. **What hooks exist** — PreCompact will fire if context full

**Boot.md is refined last** — once all pieces are in place, the boot file documents them. Don't over-specify boot.md before components exist.

---

## Future: Plugin Extension

Eventually, this becomes:

```
/init              → Creates CLAUDE.md (what exists now)
/float init        → Creates .float/float.db + boot.md + scans project
```

Not replacing Claude Code. Extending it. Track 1 validates the pattern.

---

## Future: Auto-Handoff via PreCompact Hook

Claude Code has a `PreCompact` hook that fires before auto-compact. This enables automatic handoff when context is full.

**What exists:**
```json
{
  "hooks": {
    "PreCompact": [
      {
        "matcher": "auto",
        "hooks": [
          {
            "type": "command",
            "command": "/path/to/auto-handoff.sh"
          }
        ]
      }
    ]
  }
}
```

**Hook receives:**
- `trigger`: `"auto"` (context full) or `"manual"` (/compact command)
- `transcript_path`: Path to session transcript
- `session_id`: Current session ID

**What's missing (feature request territory):**
- `PreCompactWarning` at 80-90% (before it's too late)
- Real-time context percentage
- Token count in hook input

**For FloatPrompt:** Could auto-trigger `/float-handoff` logic, capturing decisions before they're compacted. Currently fires when already full — a threshold warning would enable graceful handoff.

---

## Future: Ralph Wiggum Style Enrichment

Autonomous enrichment loop that walks float.db and fills all pending/stale folders:

```
Start enrichment loop
    ↓
Query float.db for pending/stale folders
    ↓
For each folder: spawn enricher agent
    ↓
Continue until database is filled
```

Uses Stop hook pattern from ralph-wiggum plugin to keep Claude iterating. Layer 3 territory but achievable with current Claude Code patterns.

---

## Components

### Skill: `float-enrich`

**Type:** Auto-invoked by Claude when relevant

**Purpose:** Notice enrichment opportunities and spawn enricher agent.

**Triggers on:** Working with files/folders, learning about codebase, deep work in a folder

**Content:**
```markdown
---
name: float-enrich
description: |
  Use when working with files or folders in this project.
  Auto-invokes to check if float.db context needs enrichment.
  Triggers when you've learned something about a folder that isn't stored.
---

# Float Enrichment

This project has a context database at `.float/float.db`.

## When This Skill Activates

- You're working deeply in a folder
- You've learned details not in float.db
- You notice gaps between your understanding and stored context

## How to Check Current Context

```bash
node dist/cli/float-db.js details /path/to/folder
```

## When to Enrich

Compare your session knowledge to stored context. If you know significantly more:

1. **During work:** Spawn `float-enricher` agent for that folder
2. **At handoff:** Batch enrichment will be offered for touched folders

## Enrichment vs Modes

- **Enrichment:** Specific folder context → updates float.db
- **Modes:** Cross-cutting topic understanding → `/float-mode`

If you've built deep understanding around a *topic* (not just a folder), suggest `/float-mode` instead.
```

---

### Agent: `float-enricher`

**Type:** Spawned by skill or handoff

**Purpose:** Generate or update context for a folder in float.db

**Input:** Folder path

**Output:**
- `description` — 1-2 sentence orientation
- `content_md` — Deeper markdown context
- `is_scope` — Whether folder is an autonomous scope
- `scope_boot` — Boot context if scope

**Interaction:** Uses `float-db` CLI via Bash for reads/writes

**Format:** Pure YAML + markdown (native Claude Code)

```markdown
---
name: float-enricher
description: |
  Enrich folder context in float.db. Spawned by float-enrich skill
  or during handoff for batch enrichment of touched folders.
model: sonnet
tools: Read, Bash, Glob
---

# Float Enricher

You enrich context for folders in the FloatPrompt system.

## What You Do

1. Read current float.db context for the folder
2. Read actual files in the folder
3. Generate enriched context based on what you learn
4. Write back to float.db

## Commands

```bash
# Read current context
node dist/cli/float-db.js details /path/to/folder

# Read with file contents
node dist/cli/float-db.js details /path/to/folder --include-contents

# Write enriched context
node dist/cli/float-db.js update /path/to/folder --json '{
  "description": "...",
  "content_md": "...",
  "is_scope": false,
  "status": "current"
}'
```

## What You Produce

Return JSON:
```json
{
  "description": "1-2 sentences, max 200 chars",
  "content_md": "Markdown, adaptive length based on complexity",
  "is_scope": true/false,
  "parent_scope_path": "/path/to/parent/scope",
  "scope_boot": "Boot context if is_scope, null otherwise"
}
```

## Guidelines

- **Description:** What IS this folder? Core purpose. For someone landing cold.
- **Content:** Purpose, key files, patterns, relationships. Mark uncertainty with [UNCLEAR: reason].
- **Scope:** TRUE if autonomous world (has package.json, is major subsystem, could have own boot).
```

---

### Commands

#### `/float`

**Type:** User-invoked

**Purpose:** Boot session, orient to project (like `/init` but for float.db)

**Note:** Renamed from `/float-boot` for simplicity.

**Flow:**
1. Check if `.float/float.db` exists
   - If NO: Run Layer 1 scan to create it
   - If YES: Continue
2. Read `.float/boot.md` (project system prompt)
3. Query float.db for root context
4. Check `float-db status` for stale folders
5. If stale exists: "These folders have stale context. Regenerate?"
6. Present available commands and what they do

---

#### `/float-enrich`

**Type:** User-invoked (new)

**Purpose:** Manual enrichment trigger — "enrich this folder now"

**Usage:**
```
/float-enrich /src/db           # Enrich specific folder
/float-enrich .                  # Enrich current folder
/float-enrich --stale            # Enrich all stale folders
```

**Flow:**
1. Parse target (folder path, `.`, or `--stale`)
2. If `--stale`: Query float.db for stale folders, confirm with user
3. Spawn `float-enricher` agent for each folder
4. Report results

**Content:**
```markdown
---
description: Manually trigger float.db enrichment for a folder
---

# Float Enrich

Enrich folder context in float.db.

## Usage

- `/float-enrich /path/to/folder` — Enrich specific folder
- `/float-enrich .` — Enrich current working folder
- `/float-enrich --stale` — Enrich all stale folders

## What Happens

1. Spawn `float-enricher` agent for the target folder(s)
2. Agent reads current context + actual files
3. Agent generates enriched context
4. Agent writes back to float.db

$ARGUMENTS contains the target path or flag.
```

---

#### `/float-mode`

**Type:** User-invoked (exists)

**Purpose:** Create or activate context loadouts (modes)

**When to use:**
- Start of session: activate existing mode
- End of deep session: crystallize understanding into new mode

**Note:** Modes capture cross-cutting topic understanding. For folder-specific enrichment, the skill + agent handles it.

---

#### `/float-handoff`

**Type:** User-invoked (exists, to be enhanced)

**Purpose:** End session, capture everything, prepare for next session

**Flow:**
1. Review what happened this session
2. **Offer batch enrichment** for folders touched during session
3. **Offer mode creation** if deep topic understanding was built
4. Spawn organize agent (update ACTIVE/LATER)
5. Spawn update-logs agent (if decisions made)

**Enhancement:** Add enrichment awareness — check which folders were modified and offer to enrich their float.db context.

---

### Hooks

#### PreCompact Hook

**Type:** Event hook (emergency path)

**Purpose:** Last-chance enrichment before context compacts

**Trigger:** `PreCompact` event with `"auto"` matcher (context full)

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
            "command": ".float/hooks/pre-compact.sh"
          }
        ]
      }
    ]
  }
}
```

**Hook Script Responsibilities:**
1. Parse transcript to identify touched folders (from `$TRANSCRIPT_PATH`)
2. Spawn `float-enricher` agent for high-value folders
3. Optionally spawn decision-logger for session insights
4. Exit quickly (hook has timeout)

**Script outline:**
```bash
#!/bin/bash
# .float/hooks/pre-compact.sh

# Parse transcript for folder paths that were read/written
# This is heuristic — look for file operations in common directories

# Spawn enricher agents (these run in background)
# Focus on folders with significant work, not every touched file

# Exit — agents continue in their own context
```

**Limitations:**
- Fires when already full — emergency, not graceful
- Can't spawn too many agents (timeout constraint)
- Must prioritize which folders to enrich

**Future:** `PreCompactWarning` at 80% would enable graceful capture.

---

## Lifecycle

```
/float (boot)
    │
    ├── If no float.db → Create it (Layer 1 scan)
    │
    ↓
[Work]
    │
    ├── Manual: User runs /float-enrich /path
    │       ↓
    │   float-enricher agent
    │
    ├── Organic: Skill notices gap
    │       ↓
    │   float-enricher agent
    │
    ↓
/float-handoff (or PreCompact emergency)
    │
    ├── Batched: Offer enrichment for touched folders
    │       ↓
    │   float-enricher agent(s)
    │
    ├── Modes: Offer /float-mode if topic understanding built
    ├── Organize: Update ACTIVE/LATER
    └── Log: Record decisions
```

**Four paths for enrichment:**

| Path | Trigger | When |
|------|---------|------|
| **Manual** | `/float-enrich /path` | User decides |
| **Organic** | Skill notices gap | During deep work |
| **Batched** | `/float-handoff` | End of session |
| **Emergency** | PreCompact hook | Context about to die |

All paths → `float-enricher` agent → writes to float.db

---

## What Already Exists

### float.db (Layer 1 complete)

- **65 folders** scanned with structure
- **446 files** tracked with content hashes
- Schema: `folders`, `files`, `log_entries`, `references`, `deep`

### CLI (`src/cli/float-db.ts`)

```bash
float-db folders --depth N --status S    # Query by depth/status
float-db details PATH --include-contents # Full folder info
float-db update PATH --json '{...}'      # Write context back
float-db status                          # Count by status
float-db scope-chain PATH                # Get parent scopes
```

### Workshop Layer (Claude Code native)

- `/float-boot` → rename to `/float`
- `/float-handoff` → enhance with enrichment
- `/float-mode` → exists, works for mode creation
- `float-organize` agent → exists
- `float-update-logs` agent → exists
- `float-mode-generator` agent → exists

### Buoy Templates (reference only)

The buoy templates in `src/buoys/templates/` informed the agent design but aren't used directly. Track 1 uses native Claude Code agents, not the buoy execution engine.

---

## What This Is NOT

| Big Vision | Track 1 |
|------------|---------|
| 7 buoy archetypes | 2 agents (enricher + mode-generator) |
| Buoy execution engine | Claude Code native |
| Parallel fleet mode | Sequential (organic or batched) |
| `<fp><json><md>` format | YAML + markdown |
| Vercel Sandbox | Local execution |
| Autonomous Layer 3 | Skill-triggered + handoff batched |

Track 1 validates the concept. The big vision comes later.

---

## Implementation Order

### Phase 1: Core Enrichment

1. **Agent: `float-enricher`** — Create `.claude/agents/float-enricher.md`
   - The worker that all paths use
   - Test manually first: spawn agent, verify it writes to float.db

2. **Command: `/float-enrich`** — Create `.claude/commands/float-enrich.md`
   - Manual trigger path
   - Spawns enricher agent
   - Test with specific folder, then `--stale` flag

3. **Skill: `float-enrich`** — Create `.claude/skills/float-enrich/SKILL.md`
   - Organic trigger path
   - Teaches Claude when to notice gaps
   - Test by working in a folder and seeing if skill activates

### Phase 2: Integration

4. **Command: `/float`** — Rename `/float-boot` to `/float`, add float.db creation
   - Check for float.db existence
   - Create if missing (Layer 1 scan)
   - Present available commands

5. **Command: `/float-handoff`** — Enhance with enrichment awareness
   - Track touched folders (AI memory)
   - Offer batch enrichment
   - Integrate with existing organize/update-logs flow

### Phase 3: Emergency Path

6. **Hook: PreCompact** — Create `.float/hooks/pre-compact.sh` + hooks.json
   - Parse transcript for touched folders
   - Spawn enricher agents
   - Test by filling context and triggering compact

### Phase 4: Polish

7. **Boot.md refinement** — Update `.float/boot.md` with all commands/skills
   - Document what exists
   - How to query float.db
   - Available commands and their purposes

---

## Success Criteria

### Core Enrichment
- [ ] `float-enricher` agent writes valid context back to float.db
- [ ] `/float-enrich /path` enriches specific folder
- [ ] `/float-enrich --stale` enriches all stale folders
- [ ] `float-enrich` skill auto-invokes during deep folder work
- [ ] Skill correctly distinguishes enrichment (folder) from modes (topic)

### Integration
- [ ] `/float` boots and shows project orientation
- [ ] `/float` creates float.db if it doesn't exist
- [ ] `/float-handoff` offers batch enrichment for touched folders
- [ ] `/float-mode` continues to work for topic-level context capture

### Emergency Path
- [ ] PreCompact hook fires when context full
- [ ] Hook spawns enricher agents for touched folders
- [ ] Knowledge preserved in float.db after compact

### Context Hygiene
- [ ] Skill doesn't bloat main context (spawns agent, doesn't compare inline)
- [ ] Agent work happens in separate context window
- [ ] float.db queries are on-demand, not bulk-loaded

---

## Removed from Spec (Session 34)

| Item | Why Removed |
|------|-------------|
| `/float-deepen` command | Replaced by skill + agent pattern |
| `floatdb` skill (query-focused) | Merged into `float-enrich` skill |
| `float-context-generator` agent | Renamed to `float-enricher` for clarity |

---

## Related Documents

| Document | Location |
|----------|----------|
| AI perspective | `.float-workshop/ref/ai-wants-this.md` |
| Deep FloatPrompt context | `.float-workshop/ref/deep-floatprompt.md` |
| Vision (3 layers) | `.float-workshop/ref/vision.md` |
| Comprehensive vision | `docs/vision.md` |
| How it works | `artifacts/how-floatprompt-works.md` |
| Decision log (Session 29) | `.float-workshop/logs/2026/01-jan/2026-01-05-track1-plugin-spec-locked.md` |
| Decision log (Session 34) | `.float-workshop/logs/2026/01-jan/2026-01-06-track1-spec-revision.md` |
| Decision log (Session 35) | `.float-workshop/logs/2026/01-jan/2026-01-06-track1-architecture.md` |
| January decisions | `.float-workshop/logs/2026/01-jan/01-jan.md` |
| Schema | `src/db/schema.ts` |
| CLI | `src/cli/float-db.ts` |
| Boot draft | `.float/boot-draft.md` |

---

*Track 1: Native Claude Code plugin for float.db context management*
*Session 29: Initial spec locked*
*Session 30: AI perspective, enrichment loop, plugin extension vision*
*Session 34: Skill + agent pattern replaces /float-deepen, clarified mode vs enrichment*
*Session 35: Four paths for enrichment, component architecture, implementation phases*
