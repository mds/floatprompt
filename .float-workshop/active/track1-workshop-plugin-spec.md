# Track 1: FloatPrompt Plugin for Claude Code

**Date:** 2026-01-05
**Status:** Locked (Session 29), Enhanced (Session 30)
**Priority:** 1

---

## What This Is

A Claude Code plugin that brings FloatPrompt's context management to any project. Not the full buoy-based vision — a downscaled, native Claude Code implementation.

**The big vision:** Omnipresent recursive context scaffolding with buoys, SQLite, autonomous scopes, and infinite parallelization.

**Track 1:** A skill, three commands, and one agent that make float.db useful in Claude Code.

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
3. I notice     → "I know more than what's stored"
4. I write back → /float-deepen captures my understanding
5. Next session → Future-me starts with what I learned
```

**Context that learns.** Not static documentation — living understanding that compounds.

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

## Components

### Skill: `floatdb`

**Type:** Auto-invoked by Claude when relevant

**Purpose:** Teach Claude that float.db exists and how to use it.

**Triggers on:** Questions about files, folders, project structure, "what does X do", "how does Y work"

**Content:**
```markdown
---
name: floatdb
description: |
  Use when user asks about files, folders, project structure,
  "do you know", "what is", or needs context about any part of the codebase.
  Also use when you've been working deeply in a folder.
---

# FloatDB Context System

This project has a context database at `.float/float.db`.

## When to Query

- Questions about files or folders
- "What does X do?"
- "How does Y work?"
- Any task where you need to understand a part of the codebase

## How to Query

- `float-db details /path` — Get context for a folder
- `float-db scope-chain /path` — Get parent scopes for hierarchy
- `float-db status` — See what's current vs stale

Query first, then work.

## Enrichment Awareness

When you've been working in a folder and have learned details not in float.db:
- Compare your session knowledge to stored context
- If you know significantly more than what's stored, suggest:
  "I've learned a lot about this folder. Run `/float-deepen /path` to capture this context?"
```

---

### Commands

#### `/float`

**Type:** User-invoked

**Purpose:** Boot, orient to project, check staleness

**Flow:**
1. Read `.float/boot.md` (project system prompt)
2. Query float.db for root context
3. Check `float-db status` for stale folders
4. If stale exists: "These folders have stale context. Regenerate?"

---

#### `/float-deepen [path]`

**Type:** User-invoked

**Purpose:** Write session learnings back to float.db

**Flow:**
1. Gather what Claude learned about the folder during session
2. Spawn `float-context-generator` agent
3. Write enriched context to float.db via `float-db update`

**When to use:**
- After deep work in a folder
- When skill suggests enrichment opportunity
- Explicitly when user wants to capture understanding

---

#### `/float-handoff`

**Type:** User-invoked

**Purpose:** End session, offer to deepen changed folders, cleanup

**Flow:**
1. Check what folders were touched during session
2. Offer to run `/float-deepen` on changed folders
3. Log decisions made during session
4. Clean up state files

---

### Agent: `float-context-generator`

**Type:** Spawned by commands

**Purpose:** Generate or update context for a folder

**Input:** Folder path, folder details from float.db

**Output:**
- `description` — 1-2 sentence orientation
- `content_md` — Deeper markdown context
- `is_scope` — Whether folder is an autonomous scope
- `scope_boot` — Boot context if scope

**Interaction:** Uses `float-db` CLI via Bash for reads/writes

**Format:** Pure YAML + markdown (native Claude Code)

```markdown
---
name: float-context-generator
description: |
  Use when generating or updating context for a folder in float.db.
  Spawned by /float-deepen or when context generation is needed.
model: sonnet
tools:
  - Read
  - Bash
  - Glob
---

# Context Generator

You generate context for folders in the FloatPrompt system.

## What You Receive

Folder details from `float-db details PATH`:
- Path, name, parent
- Files with sizes and extensions
- Child folders
- Heuristics (hasPackageJson, hasReadme, fileCount)
- Parent context

## What You Produce

Return JSON:
{
  "description": "1-2 sentences, max 200 chars",
  "content_md": "Markdown, adaptive length based on complexity",
  "is_scope": true/false,
  "parent_scope_path": "/path/to/parent/scope",
  "scope_boot": "Boot context if is_scope, null otherwise"
}

## Guidelines

- Description: What IS this folder? Core purpose. For someone landing cold.
- Content: Purpose, key files, patterns, relationships. Mark uncertainty with [UNCLEAR: reason].
- Scope: TRUE if autonomous world (has package.json, is major subsystem, could have own boot).
```

---

## Lifecycle

```
/float (boot)
    ↓
[Work — skill auto-queries float.db, notices enrichment opportunities]
    ↓
/float-deepen [path] (optional, as needed)
    ↓
/float-handoff (end session, offer deepen, cleanup)
```

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

### Buoy Templates (reference only)

The buoy templates in `src/buoys/templates/` informed the agent design but aren't used directly. Track 1 uses native Claude Code agents, not the buoy execution engine.

---

## What This Is NOT

| Big Vision | Track 1 |
|------------|---------|
| 7 buoy archetypes | 1 agent |
| Buoy execution engine | Claude Code native |
| Parallel fleet mode | Sequential |
| `<fp><json><md>` format | YAML + markdown |
| Vercel Sandbox | Local execution |
| Autonomous Layer 3 | Manual commands |

Track 1 validates the concept. The big vision comes later.

---

## Implementation Order

1. **Skill: `floatdb`** — Create `.claude/skills/floatdb/SKILL.md`
2. **Command: `/float`** — Create `.claude/commands/float.md`
3. **Agent: `float-context-generator`** — Create `.claude/agents/float-context-generator.md`
4. **Command: `/float-deepen`** — Create `.claude/commands/float-deepen.md`
5. **Command: `/float-handoff`** — Update existing or create new

---

## Success Criteria

- [ ] Skill auto-loads when asking about folders/files
- [ ] `/float` boots and shows project orientation
- [ ] `/float-deepen /src/db` enriches context from session
- [ ] Agent writes valid context back to float.db
- [ ] `/float-handoff` offers to deepen changed folders

---

## Related Documents

| Document | Location |
|----------|----------|
| AI perspective | `.float-workshop/ref/ai-wants-this.md` |
| Deep FloatPrompt context | `.float-workshop/ref/deep-floatprompt.md` |
| Vision (3 layers) | `.float-workshop/ref/vision.md` |
| Comprehensive vision | `docs/vision.md` |
| How it works | `artifacts/how-floatprompt-works.md` |
| Decision log | `.float-workshop/logs/2026/01-jan/2026-01-05-track1-plugin-spec-locked.md` |
| January decisions | `.float-workshop/logs/2026/01-jan/01-jan.md` |
| Schema | `src/db/schema.ts` |
| CLI | `src/cli/float-db.ts` |
| Boot draft | `.float/boot-draft.md` |

---

*Track 1: Native Claude Code plugin for float.db context management*
*Enhanced Session 30 with AI perspective, enrichment loop, plugin extension vision*
