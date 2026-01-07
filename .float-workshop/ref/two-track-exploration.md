# Two-Track Exploration: Plugin vs Full Vision

**Date:** 2026-01-05
**Status:** Exploring
**Session:** 27

---

## The Split

Two distinct products emerged from plugin exploration:

| Track | Name | Scope | Complexity |
|-------|------|-------|------------|
| **Track 1** | FloatWorkshop Plugin | Session management + light context | Low |
| **Track 2** | FloatPrompt Core | Deep recursive context generation | High |

These are **not competing** — Track 1 validates patterns, Track 2 is the full vision.

---

## Track 1: FloatWorkshop Plugin

### What It Is

A Claude Code plugin for structured session management. Any project can adopt `.float-workshop/` and get:

- Boot/handoff protocols
- Decision logging
- Work state management (active/later/done)
- Light project context (no SQLite)

### Already Built

- `.claude/commands/`: `float-boot`, `float-handoff`
- `.claude/agents/`: `float-organize`, `float-update-logs`

### What to Add

| Component | Type | Purpose |
|-----------|------|---------|
| `/float-status` | Command | Show active items, recent decisions |
| `/float-log "topic"` | Command | Quick decision logging |
| `floatworkshop-context` | Skill | Auto-load workshop state when relevant |
| SessionStart hook | Hook | Remind user to run `/float-boot` |

### Context Strategy (Light)

No SQLite. Instead:

1. **Skill-based**: Claude learns to read `.float-workshop/` structure
2. **File-based**: Key files read on demand (ACTIVE.md, LATER.md, recent logs)
3. **No scanning**: User maintains structure, Claude reads it

### Distribution

- Publishable to Claude Code marketplace
- Anyone can install, add `.float-workshop/` to their project
- Zero dependencies beyond Claude Code

---

## Track 2: FloatPrompt Core

### What It Is

The full vision: recursive context scaffolding for entire codebases.

- SQLite database at `.float/float.db`
- Every folder gets `description` + `content_md`
- Scope detection, staleness tracking
- Buoy-based AI generation

### Already Built

- Layer 1: Filesystem scanning → SQLite
- Layer 2: Buoy templates (context-generator, scope-detector, etc.)
- CLI: `float-db` commands

### What's Missing

| Gap | Description |
|-----|-------------|
| **Orchestration** | How to run buoys across 65+ folders |
| **Triggers** | When does regeneration happen? |
| **Integration** | How does Claude Code consume float.db? |
| **Distribution** | npm package? Heavy plugin? Both? |

### Integration Options

**Option A: CLI-only**
- `float-db` stays standalone
- Claude Code calls it via Bash
- Simple, but clunky

**Option B: MCP Server**
- float.db exposed as MCP tools
- `float_get_context(path)`, `float_update_context(path)`
- Claude calls tools naturally
- Requires building MCP server

**Option C: Heavy Plugin**
- Full FloatPrompt as Claude Code plugin
- Agents for generation, MCP for queries
- Most integrated, most complex

**Option D: Hybrid**
- npm package for core (scan, db, buoy execution)
- Light plugin for Claude Code integration
- Best of both: portable core, native integration

---

## Decision Points

### 1. Should Track 1 include any float.db?

| Choice | Implication |
|--------|-------------|
| **No** | Pure workshop management, no context generation |
| **Minimal** | Root-only context (like `/init` but structured) |
| **Light** | Top-level folders only, no deep recursion |

**Lean:** No. Keep Track 1 pure. Context is Track 2's job.

### 2. How does Track 2 integrate with Claude Code?

| Choice | Effort | Integration |
|--------|--------|-------------|
| CLI only | Low | Bash calls |
| MCP server | Medium | Native tools |
| Full plugin | High | Seamless |

**Lean:** MCP server. Claude Code already supports MCP. We'd build one server that exposes float.db operations.

### 3. Can someone use Track 2 without Claude Code?

| Choice | Implication |
|--------|-------------|
| **Yes** | Core must be portable (npm package) |
| **No** | Can be Claude-specific |

**Lean:** Yes. The original vision was platform-agnostic. Keep core portable, make Claude Code integration a layer on top.

### 4. What's the relationship between tracks?

| Model | Description |
|-------|-------------|
| **Independent** | Two separate products |
| **Layered** | Track 2 includes Track 1 |
| **Complementary** | Different purposes, can coexist |

**Lean:** Complementary. Track 1 is about session workflow. Track 2 is about codebase understanding. A project could use both.

---

## Exploration Tasks

### Track 1 Deep Dive

- [ ] Design skill for workshop context loading
- [ ] Prototype `/float-status` command
- [ ] Test SessionStart hook for boot reminder
- [ ] Draft plugin.json manifest
- [ ] Test with `--plugin-dir`

### Track 2 Deep Dive

- [ ] Research MCP server implementation (complexity, patterns)
- [ ] Design MCP tool schema for float.db
- [ ] Prototype one MCP tool (`get_folder_context`)
- [ ] Test agent-based context generation (quality check)
- [ ] Design orchestration pattern (ralph-wiggum style?)

### Cross-Track

- [ ] Define clear boundary: what's Track 1, what's Track 2
- [ ] Decide: does Track 2 plugin include Track 1 features?
- [ ] Name decision: "FloatWorkshop" vs "FloatPrompt" branding

---

## Open Questions

1. **MCP complexity** — How hard is it to build an MCP server? What's the minimum viable implementation?

2. **Plugin marketplace** — What's the actual process to publish? Is it ready for external plugins?

3. **Buoy quality** — Do buoys-as-agents produce the same quality as buoys-via-CLI? Need to test.

4. **User adoption** — Would someone use Track 1 without Track 2? Is workshop-only valuable?

5. **Naming** — Is "FloatWorkshop" confusing vs "FloatPrompt"? Should Track 1 have its own identity?

---

## Recommended Next Steps

1. **Lock the split** — Confirm Track 1 and Track 2 are the right framing
2. **Track 1 first** — It's smaller, validates patterns, ships faster
3. **MCP research** — Before committing to Track 2 integration approach
4. **Prototype, don't plan** — Build one thing from each track to learn

---

*Session 27: Two-track exploration — practical split between plugin and full vision*
