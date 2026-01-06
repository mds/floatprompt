# Deep Context: FloatPrompt System

**Status:** Current
**Updated:** 2026-01-05 (Session 30)
**Supersedes:** Session 18 version (archived to done/)

---

## The Core Value Proposition

> **"You're compressing human judgment into injectable context."**
> — Unprompted insight from Test 2A fresh AI

FloatPrompt solves **context amnesia** in AI sessions. Instead of humans re-explaining their projects every conversation, context lives in SQLite and AI reads it on boot.

Context isn't information — it's **compressed human judgment**. When someone writes "this folder handles authentication," they're encoding years of experience, decisions, trade-offs. That judgment persists and becomes queryable.

---

## The Vision

**Omnipresent recursive context scaffolding** around any user's project.

```
= mechanical speed (code)
+ contextual quality (AI judgment)
+ infinite parallelization (buoys)
+ hierarchical scoping (autonomous scopes)
+ persistent storage (SQLite)
```

### The End State

```
Human opens Claude Code anywhere in project
        ↓
AI reads: boot.md → scope chain → folder context
        ↓
AI has: project understanding + domain knowledge + local details + decision history
        ↓
No more "what framework is this?" — context is just there.
```

---

## The Three Layers

| Layer | Purpose | Status |
|-------|---------|--------|
| **1: Mechanical** | Scan filesystem, hash files, write to SQLite | COMPLETE |
| **2: AI Generation** | Generate context per folder via buoys/agents | PARTIAL (Track 1 in progress) |
| **3: Ongoing** | Triggers, staleness detection, auto-refresh | NOT STARTED |

### Layer 1: Mechanical (complete)
- Walk filesystem, detect structure
- Hash files for change detection
- Write to SQLite
- Runs in milliseconds, no AI needed
- **65 folders, 446 files** currently in float.db

### Layer 2: AI Generation (partial)
- For each folder: generate `description` (what's here)
- For each folder: generate `content_md` (what it means)
- Detect scopes (autonomous worlds)
- Buoys work in parallel — hundreds if needed
- **Track 1 plugin** implements this via Claude Code native patterns

### Layer 3: Ongoing (future)
- File watcher, git hook, manual command
- Detect changes, mark folders as stale
- Re-run AI for affected areas only
- Context stays fresh without human prompting

---

## The Data Model

**Folders are the primary unit of context** — not files, not functions.

### Core Tables

| Table | Purpose |
|-------|---------|
| `folders` | The things being described (16 fields) |
| `files` | Source files being tracked (change detection) |
| `log_entries` | Paper trail (decisions, why) |
| `references` | Cross-links (staleness propagation) |
| `deep` | Topic-based context (concept primers) |
| `deep_history` | Version history for deep contexts |

### Folder Fields (16)

| Category | Fields |
|----------|--------|
| **Identity** | path, parent_path, name |
| **Governance** | type, status |
| **AI Content** | description, content_md |
| **Scope** | is_scope, parent_scope_path, scope_boot |
| **Mechanical** | source_hash, last_scanned_at |
| **Attribution** | ai_model, ai_updated |
| **Timestamps** | created_at, updated_at |

### Key Concepts

| Concept | Meaning |
|---------|---------|
| **Status** | Can AI trust this? (pending / current / stale) |
| **Scope** | A "world" — autonomous context with its own boot |
| **Description** | Quick orientation — "what's here" (1-2 sentences) |
| **Content_md** | Deep understanding — "what it means" (adaptive length) |

---

## Autonomous Scopes

Some folders are just folders. Some are **worlds** — their own mini FloatPrompt system.

**What makes a scope:**
- Root `/` is always a scope
- Folders with `package.json` (monorepo packages)
- Major subsystems (auth, api, database layer)
- Any folder marked `is_scope = TRUE`

**In the database:**
- `is_scope = TRUE`
- `parent_scope_path` points to nearest ancestor scope
- `scope_boot` contains scope-specific boot context

**Scope chain:** When AI opens a folder, it reads context from root → intermediate scopes → current folder. Each layer adds specificity.

---

## Claude Code Integration (Track 1)

**Priority 1:** A Claude Code plugin that makes float.db useful via native patterns.

### Components

| Component | Type | Purpose |
|-----------|------|---------|
| `floatdb` | Skill | Auto-loads when asking about files/folders |
| `/float` | Command | Boot, orient, check staleness |
| `/float-deepen [path]` | Command | Write session learnings to float.db |
| `/float-handoff` | Command | End session, offer to deepen changed folders |
| `float-context-generator` | Agent | Generate/update context for a folder |

### Lifecycle

```
/float (boot)
    ↓
[Work — skill notices enrichment opportunities]
    ↓
/float-deepen [path] (capture understanding)
    ↓
/float-handoff (end session, cleanup)
```

### Key Insight: Context Evolves

Initial context is hypothesis. As human and AI work together, understanding deepens. The skill notices "you know more than float.db" and suggests capturing it.

**This is "context that learns."**

---

## CLI Interface

All commands output JSON. Database at `.float/float.db`.

### Orientation
```bash
float-db status                    # pending/current/stale counts
float-db folders --depth N         # list folders at depth N
float-db scope-chain /path         # hierarchy from root to path
```

### Context
```bash
float-db details /path             # folder info + children
float-db details /path --include-contents  # with file contents
```

### Writing
```bash
float-db update /path --json '{"description": "...", "content_md": "..."}'
```

### Deep Context
```bash
float-db deep list                 # all deep contexts
float-db deep show <slug>          # show content
float-db deep create <slug> --title "..." --content "..."
```

---

## What's Built

### Database Layer (`src/db/`)
- `schema.ts` — Zod schemas + SQL DDL for 9 tables
- `client.ts` — Database connection, CRUD operations
- `scan.ts` — Layer 1 filesystem scanner
- `generate.ts` — Layer 2 functions
- `import.ts` — Markdown → SQLite parser
- `deep-schema.ts` — Deep context schema

### Buoy System (`src/buoys/`)
- `schema.ts` — Zod schemas for buoy templates
- `parser.ts` — FloatPrompt format parser
- `registry.ts` — Buoy discovery + composition
- `dispatch.ts` — 3-layer prompt building
- `execute.ts` — Buoy execution engine (Claude API)
- 4 validated buoys: context-generator, staleness-checker, scope-detector, decision-logger

### CLI (`src/cli/float-db.ts`)
Full command set for orientation, context, writing, buoys, deep context.

### Claude Code Components (`.claude/`)
- `commands/float-boot.md` — Workshop boot (this project)
- `commands/float-handoff.md` — Workshop handoff
- `agents/float-organize.md` — Workshop cleanup
- `agents/float-update-logs.md` — Decision logging

### Database (`.float/float.db`)
- 65 folders scanned
- 446 files with content hashes
- Schema complete (9 tables)

---

## Two Layers of Context Management

| Layer | Purpose | Components |
|-------|---------|------------|
| **Workshop** | Human project management | `/float-boot`, `/float-handoff`, float-organize, float-update-logs |
| **Plugin** | AI knowledge management | `floatdb` skill, `/float`, `/float-deepen`, float-context-generator |

Workshop layer manages `.float-workshop/` (ACTIVE, LATER, logs).
Plugin layer manages `float.db` (folder context, enrichment).

---

## Methodology

**Map → Decide → Structure** is a GATE, not suggestion.

> "Can I write a complete spec for this code without gaps?"
> If NO → don't write code yet.

**Anti-patterns:**
- "Let me build this to see if it works" — Code is not a thinking tool
- "I'll figure it out as I go" — You'll build the wrong thing
- Treating "do 1 and 2" as permission to skip planning

---

## Open Questions

### Enrichment Detection
How does the skill notice "you know more than float.db"? Currently prompt instruction. Could there be mechanical signals?
- More files read than float.db knows about
- More patterns inferred than content_md describes
- Decisions made not in log_entries

### Scope Chain Loading
When you `/float` in a deep folder, how much scope chain gets loaded? All of it? Summaries only? Token budget management.

### Staleness Propagation
If `/src/auth` changes and `/src/api` references it, does `/src/api` become stale? The `references` table exists for this, but logic isn't implemented.

---

## Principles

### SQLite Serves AI
SQLite is the query interface for AI. Humans benefit indirectly. Flat files are mental model, database is source of truth.

### Token Economy
Goal isn't minimizing tokens — it's **maximizing value per token**. Context must be relevant, accurate, rich, precise.

### Buoy Principle
Never do alone what a fleet of buoys can do together. Mechanical tasks → code. Judgment tasks → buoys.

### Containment
FloatPrompt tools only write inside `.float/`. They scan project files but never modify them. Delete `.float/` = zero trace.

---

## Related Documents

| Document | Location |
|----------|----------|
| Vision | `docs/vision.md` |
| Track 1 Spec | `.float-workshop/active/track1-workshop-plugin-spec.md` |
| January Decisions | `.float-workshop/logs/2026/01-jan/01-jan.md` |
| Schema | `src/db/schema.ts` |
| CLI | `src/cli/float-db.ts` |
| Boot Draft | `.float/boot-draft.md` |

---

*Deep context for FloatPrompt system — Session 30, 2026-01-05*
