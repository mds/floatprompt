# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

FloatPrompt is context infrastructure for AI — "the invisible OS for AI." It provides persistent, hierarchical, queryable context that survives sessions and compounds over time.

**Two systems exist:**
1. **FloatPrompt format** — Portable AI tools (JSON + markdown files that transform AI behavior)
2. **FloatPrompt context system** — SQLite-backed context database with CLI and buoy architecture

## Build Commands

```bash
npm run build          # Compile TypeScript (src/ → dist/)
npm run clean          # Remove dist/
```

No test suite currently configured.

## CLI Tools

**Public CLI (npm package):**
```bash
float init             # Create .float/ in a project
float update           # Update tools/templates
```

**Internal CLI (context database):**
```bash
node dist/cli/float-db.js <command>

# Orientation
float-db status                          # Folder counts by status
float-db folders --depth N [--status S]  # List folders at depth
float-db scope-chain /path               # Get scope hierarchy

# Context
float-db details /path                   # Folder info + children
float-db details /path --include-contents  # With file contents
float-db update /path --json '{...}'     # Write context back

# Buoys
float-db buoy list                       # Available buoys
float-db buoy prompt ID --data JSON      # Build prompt
float-db buoy execute ID --data JSON     # Run buoy (requires ANTHROPIC_API_KEY)

# Deep context
float-db deep list                       # Topic-based contexts
float-db deep show <slug>                # View deep context
```

## Architecture

### Source Structure

```
src/
├── db/                 # SQLite database layer
│   ├── schema.ts       # Zod schemas (folders: 16 fields, log_entries, files, etc.)
│   ├── client.ts       # Database connection, CRUD operations
│   ├── scan.ts         # Filesystem walker (Layer 1)
│   ├── generate.ts     # Context generation functions (Layer 2)
│   └── import.ts       # Markdown → SQLite parser
├── buoys/              # AI worker system
│   ├── schema.ts       # Buoy template schemas
│   ├── registry.ts     # Buoy discovery + composition
│   ├── dispatch.ts     # 3-layer prompt building (global → archetype → specific)
│   └── execute.ts      # Claude API execution
├── cli/
│   └── float-db.ts     # Database CLI (all commands)
└── schema/             # FloatPrompt format validation
```

### The Three Layers

| Layer | Purpose | Status |
|-------|---------|--------|
| Layer 1: Mechanical | Scan filesystem, hash files, write to SQLite | Complete |
| Layer 2: AI Generation | Generate context per folder via buoys | Partial |
| Layer 3: Ongoing | Triggers, staleness detection, auto-refresh | Future |

### Database Schema

The `folders` table has 16 fields organized by purpose:
- **Identity:** path (PK), parent_path, name
- **Governance:** type, status (pending/current/stale)
- **AI Content:** description, content_md
- **Scope:** is_scope, parent_scope_path, scope_boot
- **Mechanical:** source_hash, last_scanned_at
- **Attribution:** ai_model, ai_updated
- **Timestamps:** created_at, updated_at

### Buoy System

Buoys are AI workers for judgment tasks. 7 archetypes: Generators, Validators, Fixers, Mappers, Integrators, Orchestrators, Recorders.

Templates live in `src/buoys/templates/`. Prompts are composed in 3 layers: global instructions → archetype patterns → specific buoy.

## Workshop Development

This repo uses `.float-workshop/` for development workflow:

```bash
/float-boot            # Session start (reads ACTIVE, LATER, logs)
/float-handoff         # Session end (spawns update-logs, organize agents)
```

Workshop structure: `active/` (limit 3), `later/` (limit 10), `done/`, `ref/`, `modes/`, `logs/`.

**Modes** are context loadouts: `modes/deep-strategy.md` for strategic planning sessions.

## Key Patterns

- **Methodology:** Map → Decide → Structure (gate, not suggestion)
- **SQLite serves AI:** Queryable beats navigable for AI reasoning
- **Buoys for judgment, code for mechanics:** If it's deterministic, write TypeScript
- **Context is compressed human judgment:** Not just information
