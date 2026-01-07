<fp>
<json>
{
  "STOP": "Plugin Architecture Exploration. How FloatPrompt maps to Claude Code plugins.",

  "meta": {
    "title": "Plugin Architecture",
    "id": "plugin-architecture",
    "status": "exploring",
    "created": "2026-01-05",
    "session": 23
  },

  "human": {
    "author": "@mds",
    "intent": "Explore FloatPrompt as a Claude Code plugin — fastest path to market, validates concepts"
  },

  "ai": {
    "role": "Technical architect evaluating migration path"
  }
}
</json>
<md>
# Plugin Architecture

**Status:** Exploring
**Created:** 2026-01-05 (Session 23)

---

## Context

FloatPrompt was built after seeing Claude Code's `/commands` pattern. The architecture already mirrors plugin concepts:

- Slash commands (`/float sync`, `/float context`)
- Buoy teams (orchestrator + parallel workers)
- Tool capability mapping
- Human checkpoints

Claude Code has since formalized this pattern as **plugins**. This document explores migrating FloatPrompt to that official structure.

### Why Consider This

| Benefit | Details |
|---------|---------|
| **Distribution** | Plugin marketplace vs convincing users to `npm install` |
| **Integration** | Native to Claude Code, not bolted on |
| **Validation** | Test concepts with real users before going standalone |
| **Blueprint** | Plugin-dev provides exact structure to follow |

### What We'd Defer (Not Lose)

The original vision was "portable across ChatGPT, Claude, Cursor." A plugin is Claude-specific. But:

- The core (SQLite + buoy logic) stays portable
- The plugin is the *interface layer* for Claude
- Other interfaces (Cursor extension, ChatGPT action) could come later

**"Work with Claude first"** is pragmatic. Nail one platform, prove the value, then generalize.

---

## Migration Map

### Old FloatPrompt → Plugin Components

| Old FloatPrompt | Plugin Equivalent |
|-----------------|-------------------|
| `.float-old/tools/float-*.md` | `commands/*.md` |
| Buoys (Check, Nav, Context, etc.) | `agents/*.md` |
| `duality` (condition → action) | Command logic |
| `tool_capabilities` mapping | Agent trigger descriptions |
| `float-report --phase=map` | Structured output |
| `human_checkpoint: "Always"` | User approval pattern |
| `max_parallel: 4` | Concurrency control |

### Current FloatPrompt → Plugin Components

| Current | Plugin Equivalent |
|---------|-------------------|
| boot.md | SessionStart hook or Skill (auto-loads on session) |
| 7 buoy archetypes | 7 agent types |
| `float-db` CLI commands | Slash commands (`/float status`, `/float details`) |
| Context depth levels | Progressive disclosure (skill tiers) |
| Staleness detection | PreToolUse hooks |
| SQLite queries | Bash via CLI or MCP server |

---

## Plugin Structure

Official Claude Code plugin structure (from docs):

```
floatprompt/
├── .claude-plugin/
│   └── plugin.json              # ONLY manifest here (name, version, description)
├── commands/                    # At root, NOT inside .claude-plugin/
│   ├── status.md                # /floatprompt:status → float-db status
│   ├── details.md               # /floatprompt:details $ARGUMENTS → float-db details
│   ├── sync.md                  # /floatprompt:sync → rescan + generate
│   └── generate.md              # /floatprompt:generate → run buoys
├── agents/
│   ├── context-generator.md     # Buoy as agent
│   ├── staleness-checker.md     # Buoy as agent
│   ├── scope-detector.md        # Buoy as agent
│   └── decision-logger.md       # Buoy as agent
├── skills/
│   └── floatprompt-context/
│       └── SKILL.md             # Auto-invoked: loads project context
├── hooks/
│   └── hooks.json               # SessionStart → boot context
├── .mcp.json                    # Optional: SQLite as MCP server
└── README.md
```

**Key rules from official docs:**
- Commands namespaced: `/floatprompt:status` (plugin name becomes prefix)
- Arguments: `$ARGUMENTS` for full input, `$1`, `$2` for positional
- Skills auto-invoke based on context (Claude decides when to use)
- Test with: `claude --plugin-dir ./floatprompt`
- Hooks in `hooks/hooks.json`, NOT in `.claude-plugin/`

---

## FloatPrompt Deviation: Hybrid Format

**Status:** EXPERIMENTAL — Testing for better specificity

Official Claude Code plugins use YAML frontmatter + markdown body. FloatPrompt uses `<fp><json><md>` for richer behavior encoding. Rather than abandon FloatPrompt format, we combine them:

```markdown
---
name: context-generator
description: Generate folder context using FloatPrompt buoy system
model: sonnet
---

<fp>
<json>
{
  "STOP": "Context Generator Buoy. Generate description and context for a folder.",
  "meta": { "title": "Context Generator", "id": "context-generator" },
  "human": { "author": "@mds", "intent": "..." },
  "ai": { "role": "...", "behavior": "..." },
  "requirements": { "duality": {...}, "buoys": {...} }
}
</json>
<md>
# Methodology

Detailed methodology here...
</md>
</fp>
```

### Why This Works

| Layer | Audience | Purpose |
|-------|----------|---------|
| YAML frontmatter | Claude Code (the system) | Plugin metadata, model selection |
| `<fp><json>` | Claude (the model) | Rich behavior encoding, duality, requirements |
| `<md>` | Claude (the model) | Detailed methodology |

**The YAML is for the system. The `<fp>` is for the AI.**

### What FloatPrompt Format Adds

| Feature | YAML Can't Do | `<fp><json>` Does |
|---------|---------------|-------------------|
| `STOP` forcing function | ❌ | ✅ Forces Claude to pause and read |
| Duality patterns | Awkward | First-class condition/action pairs |
| Nested requirements | Verbose | Natural JSON structure |
| Human/AI separation | No concept | Explicit intent vs behavior |
| Tool capability maps | ❌ | ✅ Route findings to tools |

### Hypothesis

YAML frontmatter alone is *sufficient* for simple plugins. But for FloatPrompt's buoys — which encode complex judgment tasks, duality patterns, and orchestration logic — the `<fp>` format provides specificity that YAML lacks.

**Testing:** Build agents both ways, compare output quality.

---

### Component Mapping

| Component | Purpose | Source |
|-----------|---------|--------|
| **Commands** | User-triggered actions | Old `/float-*` tools |
| **Agents** | Buoy workers for judgment tasks | `src/buoys/templates/` |
| **Skills** | Progressive disclosure of context | boot.md + deep context |
| **Hooks** | Event-driven automation | Staleness detection, auto-boot |

---

## Relevant Plugins to Study

From Claude Code's official plugins:

| Plugin | Why Relevant |
|--------|--------------|
| **ralph-wiggum** | Iteration loops — could automate buoy execution across 65+ folders |
| **plugin-dev** | 7 skills + 8-phase workflow — blueprint for building plugins |
| **feature-dev** | 7-phase workflow + 3 agents — parallels Map → Decide → Structure |
| **hookify** | Create hooks without coding — could automate freshness checks |
| **agent-sdk-dev** | If FloatPrompt moves to Agent SDK, this scaffolds apps |

### Ralph Wiggum Pattern

Particularly interesting for the "run buoys on all folders" problem:

```bash
/ralph-loop "Generate context for all pending folders.
For each depth level 0-7:
  1. Get folders at this depth
  2. Run context-generator buoy on each
  3. Update database
Output <promise>COMPLETE</promise> when all folders processed." \
  --completion-promise "COMPLETE" \
  --max-iterations 100
```

### Plugin-Dev Pattern

Progressive disclosure matches FloatPrompt's context depth:

| Tier | Plugin-Dev | FloatPrompt |
|------|------------|-------------|
| 1 | Metadata (always loaded) | `description` field |
| 2 | Core SKILL.md (when triggered) | `content_md` field |
| 3 | References (as needed) | Deep context documents |

---

## Using the Plugin-Dev Plugin

The **plugin-dev** plugin from Anthropic (`claude-plugins-official`) is the primary tool for building Claude Code plugins. Understanding how it works is essential for FloatPrompt migration.

### Activation Model

Plugin-dev uses **automatic activation** — you don't explicitly invoke it. The system works through:

1. **Skill Activation**: Claude detects when your request matches a skill's description and loads it
2. **Agent Delegation**: Specialized agents run proactively after you create/modify components
3. **Progressive Loading**: Skills only load into context when semantically relevant

### Available Skills

| Skill | Triggers On |
|-------|-------------|
| `create-plugin` | "create a plugin", "scaffold a plugin" |
| `agent-development` | "create an agent", "write a subagent" |
| `command-development` | "create a slash command", "add a command" |
| `hook-development` | "create a hook", "PreToolUse hook" |
| `mcp-integration` | "add MCP server", "integrate MCP" |
| `plugin-settings` | "plugin settings", "store plugin config" |
| `plugin-structure` | "plugin structure", "organize plugin" |
| `skill-development` | "create a skill", "add a skill" |

### Agent Validators

These run automatically after you create components:

| Agent | Purpose |
|-------|---------|
| `plugin-validator` | Validates plugin structure and components |
| `skill-reviewer` | Reviews skill quality and best practices |
| `agent-creator` | Helps build new agents |

### How It Stays Available

The plugin is **enabled but selectively loaded**:

1. **Startup**: Only names/descriptions of skills are loaded (fast)
2. **Match Detection**: When your request matches, Claude asks to use the skill
3. **Full Load**: The complete skill content loads into context
4. **Execution**: Claude follows the skill's instructions

This prevents context bloat while keeping all capabilities accessible.

### Practical Workflow

When you say *"Create a new plugin for context management"*:

1. Claude recognizes this matches `/plugin-dev:plugin-structure`
2. The full skill content loads into context
3. Claude guides you through plugin creation
4. After completion, `plugin-validator` automatically validates
5. If you create a skill, `skill-reviewer` proactively reviews

### Explicit Invocation

If automatic detection doesn't trigger, you can be explicit:

- "Use the plugin-validator agent to check my plugin"
- "Help me with `/plugin-dev:hook-development`"
- "I want to create a slash command" (triggers command-development)

### Implications for FloatPrompt

| Plugin-Dev Pattern | FloatPrompt Application |
|--------------------|-------------------------|
| Auto-activation | Users say "show me context" → FloatPrompt skill loads |
| Progressive disclosure | Context depth levels map to skill tiers |
| Agent validators | Could validate buoy output quality |
| Skill + agents combo | Skills for read operations, agents for generation |

---

## Open Questions

Before deciding to build:

### Architecture

1. **Plugin scope** — Full FloatPrompt, or just the context layer? (Buoy execution could stay separate)
2. **MCP vs Bash** — Should SQLite be an MCP server, or keep CLI approach?
3. **Portability trade-off** — How hard to extract Claude-specific layer later?

### Distribution

4. **Plugin marketplace** — What's the actual submission/approval process?
5. **Versioning** — How do plugin updates work for installed users?

### Hybrid Approach

6. **Plugin + npm** — Plugin for Claude Code, npm package for programmatic use?
7. **Shared core** — Can the same SQLite/buoy code serve both interfaces?

---

## What This Changes

If FloatPrompt becomes a Claude Code plugin:

| Current | Plugin Version |
|---------|----------------|
| `.float/boot.md` read manually | SessionStart hook auto-loads context |
| `float-db details /path` via Bash | `/float-details /path` slash command |
| Buoy templates in `src/buoys/` | Agents in `agents/` with YAML frontmatter |
| Manual `buoy execute` | Agents auto-triggered or via `/float-generate` |
| No staleness trigger | PreToolUse hook checks freshness |

---

## Next Steps (If We Proceed)

1. **Validate hypothesis** — Install a few official plugins, understand the DX
2. **Prototype one command** — Convert `/float status` to plugin format
3. **Test agent mapping** — Does `context-generator.md` work as a plugin agent?
4. **Decide on MCP** — Research MCP server setup complexity vs Bash CLI
5. **Lock or defer** — Make a decision after prototyping

---

## Decision Status

**Status: EXPLORING**

This is Map territory. We're documenting the landscape, not committing to a direction. If prototyping validates the approach, this becomes a decision. If not, it's documented research.

---

*Session 23: Plugin architecture exploration — FloatPrompt maps naturally to Claude Code plugin structure*
</md>
</fp>
