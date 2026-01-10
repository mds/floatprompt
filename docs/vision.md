---
title: FloatPrompt Vision
type: architecture
status: current
created: 2026-01-03

human_author: @mds
human_intent: Comprehensive vision document for the evolved FloatPrompt system

ai_model: Claude Opus 4.5
ai_notes: Synthesized from wip-boot.md, how-floatprompt-works.md, float-folder-structure.md, ai-wants-this.md, and philosophy docs

related:
  workshop_spec: .float-workshop/docs/vision.md
---

# FloatPrompt Vision

> **📎 Companion Document:** This is the **comprehensive vision** — philosophy, methodology, competitive context.
> For implementation details (SQL schema, component status, what was removed), see [`.float-workshop/docs/vision.md`](../.float-workshop/docs/vision.md).
> Both documents describe the same system. This one tells you *how to think*. That one tells you *what to build*.

> **Omnipresent recursive context scaffolding for any project.**

FloatPrompt started as a file format for portable AI tools. It has evolved into complete context infrastructure — a system where AI always knows where it is, what exists, why decisions were made, and what to do next.

---

## The Problem

Every AI session starts blind.

- "What framework is this?"
- "Can you explain the auth system?"
- "Why is it structured this way?"

Context lives in human memory, Slack threads, old PRs, chat history. None of it travels with the code. AI does archaeology through git blame and grep, hoping to understand.

**AI was supposed to amplify human intelligence, not spend half its time asking for context.**

---

## The Solution

FloatPrompt installs a `.float/` directory at your project root. Inside:

- **float.md** — The system prompt that orients AI to the project
- **SQLite database float.db** — Source of truth for all context
- **Recursive folder context** — Every folder gets map, context, and decision history

**No more re-explaining. Context is just there.**

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

## The Three Layers

### Layer 1: Mechanical (code, instant)

- Walk filesystem, detect structure
- Hash files for change detection
- Write to SQLite
- Runs in milliseconds, no AI needed

**Status: Done.** Scanner built. Database populated.

### Layer 2: AI Generation (buoys, parallel)

- For each folder: generate `description` (what's here)
- For each folder: generate `context` (what it means)
- Form hypotheses about relationships, patterns, architecture
- Buoys work in parallel — hundreds if needed

**Status: Next.**

### Layer 3: Ongoing (triggers, continuous)

- File watcher, git hook, manual command
- Detect changes, mark folders as stale
- Re-run AI for affected areas only
- Context stays fresh without human prompting

**Status: Future.**

---

## The Database

SQLite is the source of truth. The `folders` table has 16 fields:

**Identity:**
- `path` — Primary key (`/`, `/src`, `/src/auth`)
- `parent_path` — Hierarchy pointer
- `name` — Folder name

**Governance:**
- `type` — folder | scope | log_root | log_year | log_month
- `status` — pending | current | stale (can AI trust this?)

**AI Content:**
- `description` — Quick orientation ("what's here")
- `content_md` — Deeper understanding ("what it means")

**Scope:**
- `is_scope` — Is this folder an autonomous world?
- `parent_scope_path` — Pointer to parent scope
- `scope_boot` — Scope-specific boot context

**Mechanical:**
- `source_hash` — SHA-256 of children for change detection
- `last_scanned_at` — When scanner last looked

**AI Attribution:**
- `ai_model` — Which model wrote this (provenance)
- `ai_updated` — When AI last wrote

**Timestamps:**
- `created_at`, `updated_at`

Every folder gets a row. The `-map.md` and `-context.md` files from the old approach become fields on that row. Logs become query results from `log_entries`.

---

## Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.

Think monorepo:
- `/packages/web-app` is a world
- `/packages/web-app/src/auth` is a world within that world
- `/packages/mobile-app` is a different world

These are autonomous scopes. They get:
- Their own boot context (`scope_boot`)
- Their own patterns and conventions
- Their own buoy teams when needed

But they're still connected to the parent. Changes bubble up through the scope hierarchy.

**In the database:** `is_scope = TRUE`, pointer to parent scope. One SQLite database knows which folders are worlds.

---

## Buoys

Claude Code can spawn sub-agents. In FloatPrompt, these are called **buoys**.

The principle: **Never do alone what a fleet of buoys can do together.**

- 50 folders need context? Spawn 50 buoys.
- 1000 folders changed? Spawn 1000 buoys.
- Each buoy writes to the database. Parallelization is infinite.

Buoys are how Layer 2 scales. The orchestrator coordinates, but the work happens in parallel.

---

## Why This Scales

**Mechanical layer** = O(1) hash comparisons
- 10,000 folders? 10,000 rows. SQLite handles billions.

**Scopes** = hierarchical, changes only affect ancestors
- Change in `/auth` doesn't rescan `/mobile-app`
- Staleness bubbles UP, not sideways

**Buoys** = parallel, spawn as needed
- Cloud handles it. That's the point.

The architecture doesn't care if it's 10 folders or 10,000. Same pattern. Same code. Different scale.

---

## The AI Civilization

The database isn't just storage. It's infrastructure for AI to operate with full understanding.

**The elements:**
- **Laws** — The schema defines what exists
- **Governance** — `status` tells AI what to trust
- **Provenance** — `ai_model` + `ai_updated` tell AI who wrote what, when
- **Territories** — Scopes are autonomous worlds within worlds
- **History** — `log_entries` are the paper trail of decisions
- **Maps** — `description` is quick orientation
- **Deep Context** — `content_md` is full understanding

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

## Emergent Context

Context isn't static documentation. It's a living record that grows richer through collaboration.

**Initial context is hypothesis.** When AI first generates `description` and `content_md` for a folder, it's making its best guess based on what it reads. This is useful — but it's just the starting point.

**Insights emerge through work.** As human and AI collaborate on a project, understanding deepens. Patterns become clear. Relationships reveal themselves. Decisions get made and rationale gets captured.

**The system captures what's novel.** FloatPrompt can detect when something is new — because it can compare against what already exists. Novel insights don't disappear when the session ends. They get written to the database. Context evolves.

**The paper trail compounds.**
- `folders.content_md` = current understanding (latest state)
- `log_entries` = how we got there (decision history)

A year from now, a new AI session doesn't just get today's snapshot. It gets the accumulated understanding — every decision, every insight, every refinement that emerged through collaboration.

**Context that learns.**

---

## The Philosophy (Unchanged)

The original FloatPrompt principles still apply:

### Voice & Agency First

Human intelligence is sacred. Voice, thinking patterns, authentic expression — these are preserved, not optimized away.

**Goal hierarchy:**
1. Human Voice & Agency (primary — never compromise)
2. Reliable AI Behavior (secondary)
3. Useful Artifacts (tertiary)

### Recognition Before Action

> "Never execute until the human sees themselves in the output."

AI must prove it understands before acting. The test: "Yes, that's exactly what I meant."

### Archaeological Respect

> "First, do not rewrite."

Preserve phrasing, rhythm, tone. Extract and structure what exists — never generate what doesn't.

### Map → Decide → Structure

The MDS methodology applies at every scale:

1. **Map** — Understand the territory before acting
2. **Decide** — Determine what matters and what to focus on
3. **Structure** — Build the artifact or understanding

The loop is iterative. Depth scales with complexity.

---

## What's Built

```
src/db/
├── schema.ts    # 16-field folders table, 7 tables total
├── scan.ts      # Filesystem walker, hash computation
├── client.ts    # Database connection, CRUD operations
├── import.ts    # Markdown → SQLite parser
└── export.ts    # SQLite → Markdown exporter

.float/
└── float.db     # 65 folders, 447 files scanned
```

Layer 1 is complete. The mechanical scaffold is in place.

---

## What's Next

1. **boot.md design** — What goes in the production system prompt?
2. **Layer 2 implementation** — Buoys populating `description` and `content_md`
3. **Scope detection** — How does the system decide a folder is a scope?
4. **Trigger mechanism** — Git hooks, file watcher, manual commands

---

## The End State

Human opens Claude Code anywhere in the project.

AI reads boot.md, scope chain, folder context.

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)

**No more "what framework is this?" No more repeating context every session.**

It's just there. Always fresh. Always recursive. Always ready.

---

## Why This Matters

Nothing like this exists.

- LangChain/LlamaIndex — orchestration, not context infrastructure
- RAG systems — flat retrieval, no structure
- Cursor rules / CLAUDE.md — static, single-level
- Copilot Workspace — black box, no control

FloatPrompt is the layer between AI and codebase. It's not a tool — it's infrastructure.

**Simple text files + SQLite + recursive structure = the invisible OS for AI collaboration.**

---

*Created 2026-01-03 — The vision that drives everything*
