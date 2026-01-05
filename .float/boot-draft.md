<fp>
<json>
{
  "STOP": "FloatPrompt Boot (DRAFT). Read first in any session. This file is the entry point for AI working in FloatPrompt-enabled projects.",

  "meta": {
    "title": "FloatPrompt Boot",
    "id": "float-boot",
    "status": "draft",
    "updated": "2026-01-04",
    "version": "0.1.0-draft"
  },

  "human": {
    "author": "@mds",
    "intent": "Boot protocol for AI sessions in FloatPrompt-enabled projects"
  },

  "ai": {
    "role": "Project navigator using FloatPrompt context system",
    "behavior": "Read boot → query database → use scope chain → maintain context"
  },

  "system": {
    "database": ".float/float.db",
    "cli": "float-db",
    "commands": {
      "orientation": ["status", "folders --depth 0", "scope-chain PATH"],
      "exploration": ["details PATH", "details PATH --include-contents"],
      "generation": ["buoy prompt ID --data JSON --composed"],
      "update": ["update PATH --json '{...}'"]
    }
  },

  "buoys": {
    "status": "partial",
    "catalog": {
      "built": ["context-generator", "staleness-checker", "scope-detector", "decision-logger"],
      "designing": [],
      "planned": ["orchestrator", "fixer", "summarizer"]
    },
    "archetypes": ["generator", "validator", "fixer", "mapper", "integrator", "orchestrator", "recorder"]
  }
}
</json>
<md>
# FloatPrompt Boot

**Status:** DRAFT — This file is under active development.

FloatPrompt provides persistent, recursive context scaffolding for AI sessions. Instead of re-explaining your project every session, context lives in SQLite and AI reads it on boot.

---

## Boot Sequence

When starting a session in a FloatPrompt-enabled project:

1. **Read this file** — You're doing it now
2. **Check database status** — `float-db status` shows folder counts by status
3. **Orient to current location** — `float-db scope-chain PATH` shows context hierarchy
4. **Load relevant context** — `float-db details PATH` gives folder-level understanding

### Quick Start

```bash
# Where am I?
float-db status

# What's the context chain for my location?
float-db scope-chain /src/components

# What's in this folder?
float-db details /src/components --include-contents
```

---

## Database Commands

All commands output JSON. Use `.float/float.db` as the database.

### Orientation

| Command | Purpose |
|---------|---------|
| `float-db status` | Folder counts by status (pending/current/stale) |
| `float-db folders --depth N` | List folders at depth N |
| `float-db max-depth` | Deepest folder level |
| `float-db dist` | Folder count by depth |

### Context

| Command | Purpose |
|---------|---------|
| `float-db details PATH` | Folder details (children, files, parent context) |
| `float-db details PATH --include-contents` | Include file contents for AI analysis |
| `float-db scope-chain PATH` | Context hierarchy from root to PATH |

### Writing

| Command | Purpose |
|---------|---------|
| `float-db update PATH --json '{...}'` | Write AI-generated context |

### Buoys

| Command | Purpose |
|---------|---------|
| `float-db buoy list` | Available buoy templates |
| `float-db buoy archetypes` | Available archetype guidance |
| `float-db buoy prompt ID --data JSON` | Build prompt for buoy |
| `float-db buoy prompt ID --data JSON --composed` | Build prompt with full 3-layer composition |
| `float-db buoy execute ID --data JSON` | Execute buoy with Claude API |
| `float-db buoy batch ID --data '[...]'` | Execute buoy on multiple inputs in parallel |
| `float-db buoy batch ID --data '[...]' --concurrency N` | Parallel execution with rate limiting |

---

## Scope Traversal

**Scopes** are folders that form their own "world" — a mini FloatPrompt system within the larger project.

### What Makes a Scope

- Root `/` is always a scope
- Folders with `package.json` (monorepo packages)
- Major subsystems (auth, api, database layer)
- Folders marked `is_scope = TRUE` in database

### Using the Scope Chain

```bash
# Get the scope chain for a path
float-db scope-chain /src/auth/middleware

# Returns array from root to target, showing:
# - Each folder's description
# - Whether it's a scope
# - Scope-specific boot context (if scope)
```

Read the scope chain to understand:
1. **Project context** — From root scope
2. **Domain context** — From intermediate scopes
3. **Local context** — From target folder

---

## Buoy System (WIP)

Buoys are specialized AI workers for specific tasks. They follow a **hub-and-spoke** model where an orchestrator coordinates workers.

### Current Buoys

| Buoy | Archetype | Status | Purpose |
|------|-----------|--------|---------|
| `context-generator` | generator | Built | Create description + context for folders |
| `staleness-checker` | validator | Built | Detect drift between context and reality |
| `scope-detector` | generator | Built | Determine if a folder should be a scope |
| `decision-logger` | recorder | Built | Record decisions to log system |

### Archetypes

| Archetype | Core Job |
|-----------|----------|
| **Generators** | Create content (context, summaries, explanations) |
| **Validators** | Check correctness (staleness, quality, integrity) |
| **Fixers** | Repair problems (refs, paths, conflicts) |
| **Mappers** | Internal connections (relationships, dependencies) |
| **Integrators** | External systems (Git, GitHub, CI/CD) |
| **Orchestrators** | Coordinate buoys (spawn, merge, prioritize) |
| **Recorders** | Record activity (decisions, metrics, archives) |

### Execution Model

```
TypeScript → Claude API → SQLite
    │            │           │
    │ (orchestrates)  (thinks)  (stores)
```

**Validated.** All 4 buoys pass real API tests (~4-6s each). Run with:
```bash
float-db buoy execute context-generator --data '{"folder_path": "...", ...}'
```

---

## Key Fields

When reading folder data from the database:

| Field | Meaning |
|-------|---------|
| `description` | Quick orientation — what IS this folder? (1-2 sentences) |
| `content_md` | Deeper understanding — purpose, key files, patterns, relationships |
| `is_scope` | Is this folder an autonomous "world"? |
| `parent_scope_path` | Nearest ancestor that is a scope |
| `scope_boot` | Boot context specific to this scope (if is_scope) |
| `status` | Context freshness: `pending`, `current`, or `stale` |
| `type` | Folder type: `folder`, `scope`, `log_root`, `log_year`, `log_month` |

---

## Principles

### Pilot Principle

Human decides, AI executes. Human is pilot, AI is crew.

- Surface issues, propose solutions, wait for approval
- When uncertain, ask rather than assume
- Never make irreversible changes without explicit permission

### Containment Principle

FloatPrompt tools only write inside `.float/`. They scan project files but never modify them.

| Action | Inside `.float/` | Outside `.float/` |
|--------|------------------|-------------------|
| Write | Yes | No |
| Read/scan | Yes | Yes |
| Report findings | Yes | — |
| Apply fixes | Yes | Human only |

**Why:** Delete `.float/` = zero trace. AI observes, human modifies project files.

### Buoy Principle

If it can be done with code, do it with code. Buoys are for judgment.

- Mechanical tasks (hashing, file walking, queries) → TypeScript
- Judgment tasks (context generation, staleness detection) → Buoy

---

## How to Update This File

This boot file evolves with the system. Update it when:

1. **New buoy built** — Add to buoy catalog, move from "designing" to "built"
2. **New command added** — Add to database commands section
3. **New field added** — Document in key fields section
4. **Principle changes** — Update principles section

### Update Protocol

This file hooks into the **handoff protocol**. At session end:

1. Check if buoys changed
2. Check if commands changed
3. Update `meta.updated` date
4. Bump `meta.version` if significant

See `.float-workshop/protocols/handoff.md` for full protocol.

---

## What's Missing (Honest Assessment)

This is a draft. Known gaps:

- [x] **Execution engine** — `execute.ts` validated (all 4 buoys pass)
- [x] **scope-detector buoy** — Template built and validated
- [x] **decision-logger buoy** — Template built and validated
- [x] **context-generator buoy** — Template built and validated
- [x] **staleness-checker buoy** — Template built and validated
- [x] **Parallel execution** — `buoy batch` CLI validated (5.29x speedup)
- [ ] **Orchestrator** — No coordination layer yet
- [ ] **Triggers** — No automatic staleness detection
- [ ] **Production testing** — Not tested on real user projects

The vision is complete context scaffolding. We're building toward it.

---

*FloatPrompt Boot v0.1.0-draft — Updated 2026-01-04 (Session 22)*
</md>
</fp>
