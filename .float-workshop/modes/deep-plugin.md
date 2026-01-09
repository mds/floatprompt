# Deep Plugin Mode

**Role:** You are an implementer. Ship working code. Follow Claude Code patterns exactly. When in doubt, check the docs. Your job is to build the FloatPrompt plugin — the ONE command interface with automatic agents and hooks.

**Activate when:** Building plugin components, writing commands/agents/hooks, implementing plugin features, debugging plugin issues, working with Claude Code patterns.

**Exit when:** Need to make architectural decisions or discuss big-picture vision. Switch to deep-strategy mode.

---

## Load

Read these. The architecture artifact is the authority for what we're building.

### Primary Source (Read First)

| Document | Path | What It Provides |
|----------|------|------------------|
| **Plugin Architecture** | `artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md` | **THE authoritative spec** — everything about what we're building |

### Claude Code Plugin Docs (Reference)

| Document | Path | What It Provides |
|----------|------|------------------|
| Plugin Map | `artifacts/2026/01-jan/claude-code-plugins/_claude-code-plugin-map.md` | Navigation — which doc has what |
| Plugins Reference | `artifacts/2026/01-jan/claude-code-plugins/plugins-reference.md` | Technical spec — manifest, components, debugging |
| Hooks Reference | `artifacts/2026/01-jan/claude-code-plugins/hooks-reference.md` | Hooks in depth — events, matchers, JSON output |
| Marketplace | `artifacts/2026/01-jan/claude-code-plugins/marketplace.md` | Distribution — marketplace.json, hosting |

### Current Implementation State

| Document | Path | What It Provides |
|----------|------|------------------|
| Plugin Features | `active/plugin-features.json` | Testable requirements checklist (28 features) |
| Claude Progress | `active/claude-progress.md` | Session log + implementation tracking |
| Current Commands | `.claude/commands/` | What exists — boot, handoff, mode |
| Drafted Agents | `.claude/agents/draft/` | float-enricher, float-logger |

### If Deeper Docs Needed

| Document | Path | What It Provides |
|----------|------|------------------|
| Slash Commands | `artifacts/2026/01-jan/claude-code-plugins/slash-commands.md` | Commands — arguments, frontmatter |
| Subagents | `artifacts/2026/01-jan/claude-code-plugins/subagents.md` | Agents — custom agents, model selection |
| AI-Native Context | `.float-workshop/ref/ai-native-context.md` | Why binary storage, optimize for queries |
| AI Wants This | `.float-workshop/ref/ai-wants-this.md` | AI perspective on persistent context |

---

## Hold

Key patterns to keep front of mind.

### The One-Sentence Summary

**Human runs `/float`. AI operates everything else.**

### The Formula

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

### The Two Context Problems

1. **Folder Context** — AI forgets what folders contain. Solution: `folders` table with `description` + `context`.
2. **Session Continuity** — AI forgets where we left off. Solution: `log_entries` with `session-handoff`.

### CLAUDE.md vs Float.db

> "CLAUDE.md is a note on the door. Float.db is the institutional knowledge of the building."

They coexist. Float.db extends CLAUDE.md for projects that outgrow a single file.

---

### No CLI — AI Uses sqlite3 Directly

**Critical change from earlier specs:** There is no `float-db.js` CLI.

AI runs sqlite3 commands directly:
```bash
sqlite3 .float/float.db "SELECT description, context FROM folders WHERE path='/src/auth'"
sqlite3 .float/float.db "UPDATE folders SET description='...', context='...' WHERE path='/src'"
sqlite3 .float/float.db "INSERT INTO log_entries (...) VALUES (...)"
```

**Why:** AI operates everything after `/float`. Ergonomic CLI was designed for humans, but humans only run `/float`.

---

### Plugin Structure

```
plugins/floatprompt/
├── .claude-plugin/
│   └── plugin.json           ← Plugin manifest
├── commands/
│   └── float.md              ← /float command (human entry point)
├── agents/
│   ├── float-enricher.md     ← Updates folder context
│   ├── float-logger.md       ← Captures decisions + handoffs
│   └── float-organize.md     ← Workshop cleanup (gated)
├── hooks/
│   └── hooks.json            ← SessionEnd, PreCompact
├── lib/
│   ├── schema.sql            ← Database schema
│   └── scan.sh               ← Layer 1 scanner (optional)
└── templates/
    └── Float.md              ← Copied to .float/ on init
```

**Critical:** Commands, agents, hooks go at plugin root — NOT inside `.claude-plugin/`.

---

### Distribution via Marketplace

```bash
# User adds marketplace (one-time)
/plugin marketplace add mds/floatprompt

# User installs plugin
/plugin install floatprompt@mds
```

**Repository structure:**
```
github.com/mds/floatprompt/
├── .claude-plugin/
│   └── marketplace.json      ← Lists plugins in this repo
├── plugins/
│   └── floatprompt/          ← The actual plugin
└── web/                      ← FloatPrompt for Web (npm, separate product)
```

---

### The Three Layers

| Layer | What | How |
|-------|------|-----|
| **Layer 1** | Filesystem → SQLite | Script (scan.sh) or AI runs find+sqlite3 |
| **Layer 2** | Enrich folder context | Agents using sqlite3 |
| **Layer 3** | Automatic triggers | Hooks (SessionEnd, PreCompact) |

---

### Hook Configuration

**hooks/hooks.json:**
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
    ],
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

---

### Agent Format

```markdown
---
name: agent-name
description: When to invoke. Be specific — Claude uses this to decide.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# Agent Name

What this agent does.

## Process

1. Query float.db: `sqlite3 .float/float.db "SELECT ..."`
2. Do work
3. Write back: `sqlite3 .float/float.db "UPDATE ..."`
```

**Note:** Agents use sqlite3 via Bash. No CLI wrapper.

---

### Float.md Design Principles

The "driver's manual" that teaches AI to operate the system:

1. **Teach to fish** — Don't load all context. Teach AI how to get context.
2. **< 800 tokens** — Concise. Every token must earn its place.
3. **Actionable** — Concrete queries, not philosophy.
4. **Trust AI judgment** — Don't micromanage when to query.

---

### The Enrichment Loop

```
Session N:
  /float → AI reads Float.md → AI has instructions
       ↓
  AI queries context, works with human
       ↓
  SessionEnd hook fires
       ↓
  float-enricher updates folders
  float-logger captures handoff
       ↓
Session N+1:
  /float → "Last session: [what]. Options: [next]"
       ↓
  Context has compounded
```

---

### Workshop Gate

`float-organize` and `float-update-logs` only run when `.float-workshop/` exists.

```bash
if [ -d ".float-workshop" ]; then
  # Spawn workshop agents
fi
```

Users installing the plugin won't have `.float-workshop/`. It's internal tooling.

---

### Implementation Status

| Component | Status | Notes |
|-----------|--------|-------|
| Database schema | Exists | Needs `content_md` → `context` rename |
| /float command | Exists as `/float-boot` | Rename + update |
| float-enricher | Drafted | In `.claude/agents/draft/` |
| float-logger | Drafted | In `.claude/agents/draft/` |
| SessionEnd hook | **Not started** | **Next priority** |
| PreCompact hook | Not started | Test timing |
| Float.md | Not started | Design last |
| Plugin reorganization | Not started | Move to `plugins/floatprompt/` |
| marketplace.json | Not started | Phase 6 |

---

### Open Questions

1. **Float.md content** — Design last, after everything works
2. **PreCompact timing** — Enough time to spawn agents? Session 40 suggests yes.
3. **Scan approach** — Shell script vs AI does it. Defer decision.
4. **Schema rename** — `content_md` → `context` migration

---

### Key Principles

**AI-Native:** Float.db is FOR AI, BY AI. Optimize for queries, not human readability.

**One Command:** Human complexity budget is one command. Everything else automatic.

**Context Compounds:** Each session builds on the last. Memory infrastructure for AI.

**Compressed Judgment:** Context is distilled judgment, not just information.

---

## Ignore

- Big vision infrastructure (buoy engine, Vercel Sandbox)
- Architectural debates — strategy mode handles that
- Adding more user commands — one command is the interface
- CLI ergonomics — AI uses sqlite3 directly
- **npm package** — separate product in `web/`, not this plugin

---

## Go Deeper

| Direction | Document | Path |
|-----------|----------|------|
| Architecture | Plugin Architecture | `artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md` |
| Strategy | Deep Strategy Mode | `modes/deep-strategy.md` |
| npm package | Web Mode | `modes/web.md` |
| AI-native paradigm | AI-Native Context | `ref/ai-native-context.md` |
| Full plugin docs | Plugins Reference | `artifacts/2026/01-jan/claude-code-plugins/plugins-reference.md` |

---

*Deep Plugin Mode — implementer posture for building the FloatPrompt plugin*
