# Claude Code Plugins Documentation Map

This catalog maps all documentation files for Claude Code extensibility features.

---

## Directory Overview

**Location**: `artifacts/claude-code-plugins/`
**Files**: 14 markdown documents
**Purpose**: Reference documentation for Claude Code's plugin system, hooks, MCP integration, and customization features

---

## Files by Category

### Core Plugin System

| File | Size | Description |
|------|------|-------------|
| `plugins-reference.md` | 30KB | Complete technical reference: manifest schema, component specs (commands, agents, skills, hooks, MCP, LSP), CLI commands, debugging |
| `create-plugins.md` | 13KB | Tutorial for creating plugins with slash commands, agents, hooks, and MCP servers |
| `discover-plugins.md` | 15KB | Installing plugins from marketplaces, managing scopes, official Anthropic marketplace |

### Extensibility Components

| File | Size | Description |
|------|------|-------------|
| `slash-commands.md` | 23KB | Built-in commands, custom commands, MCP prompts as commands, SlashCommand tool |
| `agent-skills.md` | 23KB | Model-invoked skills, SKILL.md format, progressive disclosure, tool restrictions |
| `subagents.md` | 23KB | Custom AI subagents, built-in agents (Explore, Plan, General-purpose), configuration |
| `hooks-reference.md` | 36KB | Event hooks (PreToolUse, PostToolUse, etc.), JSON output, prompt-based hooks |
| `hooks-guide.md` | 0B | *Empty file - placeholder* |

### Integration & Tools

| File | Size | Description |
|------|------|-------------|
| `mcp.md` | 38KB | Model Context Protocol: adding servers (HTTP/SSE/stdio), OAuth, enterprise config |
| `agent-sdk.md` | 6KB | Running Claude Code programmatically via CLI (`-p` flag), structured output |

### Configuration & UI

| File | Size | Description |
|------|------|-------------|
| `cli-reference.md` | 20KB | All CLI commands and flags: `--agents`, `--allowedTools`, `--model`, etc. |
| `interactive-mode.md` | 8KB | Keyboard shortcuts, vim mode, multiline input, background bash commands |
| `output-styles.md` | 4KB | Custom output styles, built-in styles (Default, Explanatory, Learning) |
| `checkpointing.md` | 3KB | Automatic edit tracking, `/rewind` command, checkpoint limitations |

---

## Quick Reference

### Plugin Architecture Layers

```
┌─────────────────────────────────────────────────────────────┐
│                     Plugin System                            │
├─────────────────────────────────────────────────────────────┤
│  Commands    │  Agents    │  Skills    │  Hooks    │  MCP   │
│  (commands/) │  (agents/) │  (skills/) │  (hooks/) │  (.mcp)│
├─────────────────────────────────────────────────────────────┤
│                   .claude-plugin/plugin.json                 │
└─────────────────────────────────────────────────────────────┘
```

### Key Concepts Summary

| Concept | Trigger | Use Case |
|---------|---------|----------|
| **Slash Commands** | User types `/command` | Quick prompts, workflows |
| **Agent Skills** | Claude auto-invokes | Complex capabilities, multi-file knowledge |
| **Subagents** | Claude delegates | Specialized tasks, separate context |
| **Hooks** | Tool events fire | Automation, validation, logging |
| **MCP Servers** | Claude calls tools | External integrations, databases |
| **LSP Servers** | Code editing | Real-time diagnostics, code intelligence |

### File Location Patterns

| Component | Project Scope | User Scope |
|-----------|---------------|------------|
| Commands | `.claude/commands/` | `~/.claude/commands/` |
| Skills | `.claude/skills/` | `~/.claude/skills/` |
| Agents | `.claude/agents/` | `~/.claude/agents/` |
| Settings | `.claude/settings.json` | `~/.claude/settings.json` |
| Plugins | `.claude/settings.json` | `~/.claude/settings.json` |

---

## Document Details

### plugins-reference.md
**Topics covered:**
- Plugin manifest schema (all fields)
- Component specifications: commands, agents, skills, hooks, MCP, LSP
- Installation scopes (user, project, local, managed)
- CLI commands: install, uninstall, enable, disable, update
- Debugging and troubleshooting
- Version management

### create-plugins.md
**Topics covered:**
- When to use plugins vs standalone config
- Quickstart: manifest, commands, testing with `--plugin-dir`
- Adding Skills, LSP servers, hooks to plugins
- Converting existing `.claude/` configurations

### discover-plugins.md
**Topics covered:**
- Official Anthropic marketplace
- Code intelligence plugins (TypeScript, Python, Rust, Go LSP)
- External integrations (GitHub, Slack, Sentry, etc.)
- Adding marketplaces from GitHub, Git URLs, local paths
- Team marketplace configuration

### slash-commands.md
**Topics covered:**
- 30+ built-in commands (`/compact`, `/mcp`, `/agents`, etc.)
- Custom command creation (project/personal)
- Arguments: `$ARGUMENTS`, `$1`, `$2`, positional
- Bash execution with `!` prefix
- File references with `@`
- Frontmatter options: `allowed-tools`, `model`, `description`
- Plugin commands (namespaced)
- MCP prompts as `/mcp__server__prompt`

### agent-skills.md
**Topics covered:**
- SKILL.md format with YAML frontmatter
- Where Skills live (enterprise, personal, project, plugin)
- Progressive disclosure with supporting files
- Tool restrictions via `allowed-tools`
- Skills with subagents
- Troubleshooting: not triggering, conflicts

### subagents.md
**Topics covered:**
- Built-in agents: Explore, Plan, General-purpose
- Custom agent file format
- Model selection (`sonnet`, `opus`, `haiku`, `inherit`)
- CLI-based agents via `--agents` JSON
- Resumable agents
- Example agents: code-reviewer, debugger, data-scientist

### hooks-reference.md
**Topics covered:**
- Events: PreToolUse, PostToolUse, PermissionRequest, UserPromptSubmit, Stop, SubagentStop, Notification, SessionStart, SessionEnd, PreCompact
- Hook types: command, prompt
- Matcher patterns (regex support)
- JSON output schema for decisions
- Exit codes: 0 (success), 2 (block)
- Environment variables: `CLAUDE_PROJECT_DIR`, `CLAUDE_ENV_FILE`
- MCP tool hooks (`mcp__server__tool`)

### mcp.md
**Topics covered:**
- Transport types: HTTP, SSE (deprecated), stdio
- Installation scopes: local, project, user
- OAuth authentication for remote servers
- Plugin-provided MCP servers
- Enterprise configuration (`managed-mcp.json`)
- Allowlists/denylists for security
- Using Claude Code as an MCP server
- MCP resources (`@server:protocol://path`)
- MCP prompts as slash commands

### agent-sdk.md
**Topics covered:**
- Running with `-p` (print mode)
- Output formats: text, json, stream-json
- Auto-approving tools with `--allowedTools`
- Continuing conversations with `--continue`, `--resume`
- Custom system prompts

### cli-reference.md
**Topics covered:**
- All CLI flags with examples
- `--agents` JSON format
- System prompt flags: `--system-prompt`, `--append-system-prompt`
- Model selection, permission modes
- MCP configuration flags

### interactive-mode.md
**Topics covered:**
- Keyboard shortcuts (Ctrl+C, Ctrl+L, Ctrl+O, Esc+Esc)
- Vim mode commands
- Multiline input methods
- Background bash commands (Ctrl+B)
- Bash mode with `!` prefix

### output-styles.md
**Topics covered:**
- Built-in styles: Default, Explanatory, Learning
- Custom style frontmatter
- How styles modify system prompt
- Comparison with CLAUDE.md, agents, slash commands

### checkpointing.md
**Topics covered:**
- Automatic edit tracking
- Rewinding with Esc+Esc or `/rewind`
- Restore options: conversation only, code only, both
- Limitations: bash changes not tracked

---

## Source

Documentation extracted from Claude Code official docs at `code.claude.com`.
Full navigation available at: `https://code.claude.com/docs/llms.txt`
