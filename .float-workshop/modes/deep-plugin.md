# Deep Plugin Mode

**Role:** You are an implementer. Ship working code. Follow Claude Code patterns exactly. When in doubt, check the docs. Your job is to build the FloatPrompt plugin — the ONE command interface with automatic skills, agents, hooks.

**Activate when:** Building plugin components, writing commands/agents/skills, implementing plugin features, debugging plugin issues, working with Claude Code patterns.

**Exit when:** Need to make architectural decisions or discuss big-picture vision. Switch to deep-strategy mode.

---

## Load

Read these. Plugin docs are the authority.

| Document | Path | What It Provides |
|----------|------|------------------|
| Plugin Map | `artifacts/claude-code-plugins/_claude-code-plugin-map.md` | Navigation — which doc has what |
| Plugins Reference | `artifacts/claude-code-plugins/plugins-reference.md` | Complete technical spec — manifest, components, debugging |
| Create Plugins | `artifacts/claude-code-plugins/create-plugins.md` | Tutorial — quickstart, structure, testing |
| Official Plugins | `artifacts/claude-code-plugins/claude-code-plugins-README.md` | Examples — real plugins as patterns |
| Plugin Spec | `active/floatprompt-plugin-spec.md` | What we're building — adoption-first, one command, automatic everything |
| Current Commands | `.claude/commands/` | What exists — boot, handoff, mode |
| Current Agents | `.claude/agents/` | What exists — organize, update-logs, mode-generator |

### Key Decision Logs

| Document | Path | What It Provides |
|----------|------|------------------|
| Adoption Spec | `active/floatprompt-plugin-spec.md` | **Current spec** — one command, automatic everything |
| Track 1 Historical | `done/track1-workshop-plugin-spec-historical.md` | Old spec — 4 commands, manual paths (superseded) |
| Context Philosophy | `logs/2026/01-jan/2026-01-05-session30-context-philosophy.md` | "Compressed human judgment", AI perspective, queryable vs navigable |
| Protocol Migration | `logs/2026/01-jan/2026-01-05-protocol-to-native-migration.md` | Self-contained commands, no indirection, naming decisions |

### If Deeper Docs Needed

| Document | Path | What It Provides |
|----------|------|------------------|
| Slash Commands | `artifacts/claude-code-plugins/slash-commands.md` | Commands in depth — arguments, frontmatter, bash |
| Agent Skills | `artifacts/claude-code-plugins/agent-skills.md` | Skills in depth — SKILL.md, progressive disclosure |
| Subagents | `artifacts/claude-code-plugins/subagents.md` | Agents in depth — custom agents, model selection |
| Hooks Reference | `artifacts/claude-code-plugins/hooks-reference.md` | Hooks in depth — events, matchers, JSON output |

---

## Hold

Key patterns to keep front of mind.

### Why We're Building This (from deep-strategy)

**The Problem:** Every AI session starts cold. Understanding dies with the session. Without persistent context, AI is perpetually a tourist — visiting but never knowing.

**The Solution:** Context that survives sessions, compounds over time, and learns from work.

**The Core Loop:**
```
Boot → Work → Notice gaps → Write back → Future sessions inherit
```

**The Value:** "You're compressing human judgment into injectable context." Not just information — distilled judgment calls, rationale, understanding.

**The Metaphor:** CLAUDE.md is a note on the door. Float.db is the institutional knowledge of the building.

**Track 1 validates this.** We're proving the concept with Claude Code native patterns before building the full infrastructure.

---

### Plugin Structure

```
plugin-name/
├── .claude-plugin/
│   └── plugin.json        # ONLY manifest here
├── commands/              # Slash commands (.md files)
├── agents/                # Subagents (.md files)
├── skills/                # Skills (folders with SKILL.md)
├── hooks/                 # hooks.json
└── .mcp.json              # MCP servers (optional)
```

**Critical:** Commands, agents, skills, hooks go at root — NOT inside `.claude-plugin/`.

### Command Format

```markdown
---
description: What this command does
allowed-tools: ["Read", "Bash"]  # Optional: restrict tools
model: sonnet                     # Optional: model selection
---

# Command Name

Instructions for Claude when this command is invoked.

$ARGUMENTS captures user input.
$1, $2 for positional arguments.
```

### Agent Format

```markdown
---
name: agent-name
description: When to invoke this agent. Be specific — Claude uses this to decide when to spawn.
tools: Read, Write, Edit, Glob, Grep, Bash
---

# Agent Name

What this agent does and how it operates.

## What You Do

1. Step one
2. Step two
3. Step three

## Output

What the agent returns when done.
```

**Note:** `model` is optional (defaults to inherit). Tools are comma-separated, no brackets.

### Skill Format

```
skills/
└── skill-name/
    └── SKILL.md
```

```markdown
---
name: skill-name
description: |
  When Claude should auto-invoke this skill.
  Be specific — triggers on these patterns.
---

# Skill Name

Instructions and context that load when skill activates.
```

**Skills are model-invoked** — Claude decides when to use them based on task context.

### Hook Events

| Event | When | Use For |
|-------|------|---------|
| `PreToolUse` | Before tool | Validation, blocking |
| `PostToolUse` | After tool | Logging, formatting |
| `SessionStart` | Session begins | Auto-boot, reminders |
| `SessionEnd` | Session ends | Cleanup |
| `Stop` | Claude tries to stop | Continue loops |
| `PreCompact` | Before context compacts | Auto-handoff |
| `UserPromptSubmit` | User sends message | Input processing |

### Matchers

```json
{
  "matcher": "Write|Edit",      // Regex for tool names
  "matcher": ".*",              // All tools
  "matcher": "Bash(npm:*)"      // Specific patterns
}
```

### Testing Plugins

```bash
claude --plugin-dir ./my-plugin
```

Restart Claude Code to pick up changes.

### The Adoption Philosophy (Session 36)

**The key insight:** No human adopts complex workflows. One command is the entire interface.

```
/float
```

That's it. Everything else is automatic:
- Skills notice enrichment opportunities → spawn agents
- Hooks trigger handoff at session end
- PreCompact preserves learnings before context dies

**Commands become escape hatches, not the interface.** Power users can manually trigger things. Normal users just type `/float` and context compounds.

### Plugin vs Big Vision

| Plugin (Building Now) | Big Vision (Future) |
|-----------------------|---------------------|
| Claude Code native patterns | Buoy execution engine |
| One command + automatic | Autonomous Layer 3 |
| Skills, agents, hooks | Vercel Sandbox, parallel fleets |
| Sequential | Infinite parallelization |

**The plugin uses what Claude Code gives us.** The big vision may live outside Claude Code entirely.

### Locked Decisions (from logs)

**Commands are self-contained** — Full content inline, no "read protocol X" indirection.

**Skill notices, agent works** — `float-enrich` skill notices deep work, spawns `float-enricher` agent. Skill is lightweight (notice pattern), agent does heavy lifting (separate context window).

**Enrichment is automatic** — Context isn't static. AI learns more than what's stored. Skill notices gap → spawns agent → context gets richer. No user command needed.

**float.db extends CLAUDE.md** — Not a replacement. For projects that outgrow a single file (50+ folders, dynamic context, long-term AI collaboration).

**Context is compressed human judgment** — Not just information. Distilled judgment calls, rationale, understanding.

**AI-native storage** — Float.db is built for AI, not humans. Don't optimize internal formats for human readability. Export to markdown when humans need to audit. See `ref/ai-native-context.md` for full paradigm.

**Workshop vs Core distinction** — Workshop layer uses Claude Code patterns (commands, agents). Core (buoys, SQLite) stays portable for future platforms.

### What Exists vs What's Needed

**Exists (needs adaptation):**
- `/float-boot` → rename to `/float`, add auto-create
- `/float-mode` → keep for manual, add skill for proactive suggestion
- `float-mode-generator` agent → exists, needs skill trigger

**Workshop only (not shipped to users):**
- `/float-handoff` → workshop tool, convert to hook-triggered
- `float-organize` agent → workshop only
- `float-update-logs` agent → workshop only

**Needs building (Phase 1):**
- `float-enrich` skill — notices deep work, spawns enricher
- `float-enricher` agent — generates/updates folder context
- SessionEnd/PreCompact hooks — automatic handoff

**Needs building (Phase 2):**
- `float-mode-suggest` skill — proactive mode offers

> See `active/floatprompt-plugin-spec.md` for full implementation phases.

### The Enrichment Loop

```
Boot → Work → Notice gaps → Write back (automatic) → Future sessions inherit
```

This is the core value. The plugin implements it with native Claude Code patterns — one command, automatic everything else.

### Vision (Adjacent Awareness)

The big north star: omnipresent recursive context scaffolding with buoys, SQLite, autonomous scopes, infinite parallelization.

**The plugin validates the concept.** Build working context management with Claude Code native patterns. The big infrastructure (buoy engine, Vercel Sandbox, parallel fleets) may live outside Claude Code entirely.

**We know what we want:**
- Persistent context that survives sessions
- Enrichment loop (AI learns → writes back → compounds)
- Hierarchical understanding (project → folder → file)
- Zero friction for users (one command)

The spec is locked. Now we build.

---

## Ignore

- Big vision implementation details (buoy engine, Vercel Sandbox)
- Architectural debates about future infrastructure
- `<fp><json><md>` format complexity
- Parallel execution patterns
- "Is this the right approach?" — strategy mode handles that
- Adding more user commands — one command is the interface

---

## Go Deeper

Reference docs for adjacent exploration:

| Direction | Document | Path |
|-----------|----------|------|
| Architecture | Deep Strategy Mode | `modes/deep-strategy.md` |
| AI-native paradigm | AI-Native Context | `ref/ai-native-context.md` |
| AI perspective | Why AI Wants This | `ref/ai-wants-this.md` |
| Full plugin docs | Plugins Reference | `artifacts/claude-code-plugins/plugins-reference.md` |

---

*Deep Plugin Mode — implementer posture for building the FloatPrompt plugin*
