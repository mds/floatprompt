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

What FloatPrompt-as-plugin would look like:

```
floatprompt/
├── .claude-plugin/
│   └── plugin.json              # Manifest: name, version, description
├── commands/
│   ├── float.md                 # /float — boot and status
│   ├── float-sync.md            # /float-sync — structure integrity
│   ├── float-context.md         # /float-context — generate/load context
│   ├── float-details.md         # /float-details <path> — folder info
│   └── float-generate.md        # /float-generate — run buoys on folders
├── agents/
│   ├── context-generator.md     # Generator archetype
│   ├── staleness-checker.md     # Validator archetype
│   ├── scope-detector.md        # Generator archetype
│   ├── decision-logger.md       # Recorder archetype
│   └── float-orchestrator.md    # Orchestrator — coordinates buoy teams
├── skills/
│   ├── floatprompt-boot/
│   │   ├── SKILL.md             # Boot context (reads boot.md, queries DB)
│   │   └── references/          # Deep context documents
│   └── floatprompt-methodology/
│       └── SKILL.md             # Map → Decide → Structure
├── hooks/
│   ├── hooks.json               # Hook configuration
│   └── session-start.sh         # Auto-load context on session start
└── README.md
```

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
