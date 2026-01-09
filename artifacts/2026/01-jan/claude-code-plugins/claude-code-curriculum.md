# Claude Code Architecture: Teaching Curriculum

> Interactive lesson plan for learning Claude Code's extensibility system

## How to Use This

1. Go chunk by chunk
2. After each chunk, discuss/answer a question
3. Move to next chunk only when comfortable
4. Quiz at the end using `claude-code-quiz.md`

---

## Module 1: Core Concepts

### Chunk 1.1: The Two Categories

Everything in Claude Code's extensibility system falls into two categories:

**User-invoked** — You explicitly trigger it (typing a command, installing something)

**Model-invoked** — Claude decides to use it on its own based on the task

**Discussion Q**: Why might it matter whether *you* trigger something vs *Claude* deciding to use it?

---

### Chunk 1.2: The Six Components

Here are the six extension points, sorted by who triggers them:

| User-Invoked | Model-Invoked |
|--------------|---------------|
| Slash Commands | Agent Skills |
| Plugins | Subagents |
| | Hooks |
| | MCP Servers |

**Discussion Q**: Looking at this table, which side seems like it would give you more direct control? Which side seems more "automatic"?

---

### Chunk 1.3: Commands vs Skills (The Key Distinction)

This is the #1 thing people confuse:

- **Slash Command**: You type `/review` → Claude follows that prompt
- **Agent Skill**: Claude notices you mentioned "database migration" → automatically loads the migration skill

Both are markdown files. But one requires you to invoke it, the other Claude invokes on its own.

**Discussion Q**: When would you want a slash command vs a skill? Give an example of each.

---

### Chunk 1.4: Settings Hierarchy

Five levels of configuration (highest priority first):

1. **Enterprise** — IT deploys, can't be overridden
2. **CLI args** — Flags you pass when starting Claude
3. **Local** — `.claude/settings.local.json` (gitignored, just you)
4. **Project** — `.claude/settings.json` (shared with team)
5. **User** — `~/.claude/settings.json` (your global defaults)

Higher levels win conflicts.

**Discussion Q**: If your user settings allow `Bash(rm:*)` but your project settings deny it, what happens when Claude tries to run `rm`?

---

## Module 2: Subagents

### Chunk 2.1: What Makes Subagents Special

Subagents are specialized AI assistants. The key thing: **they have their own separate context window**.

The main conversation has its context. When Claude spawns a subagent, that subagent starts fresh with just the task description.

**Discussion Q**: Why might having a separate context window be useful?

---

### Chunk 2.2: The Three Built-in Subagents

| Name | Model | Purpose | Tools |
|------|-------|---------|-------|
| `Explore` | Haiku (fast) | Quick codebase search | Read-only |
| `Plan` | Sonnet | Research for planning | Read-only |
| `general-purpose` | Sonnet | Complex multi-step tasks | All tools |

**Discussion Q**: If you need a fast search for "where is the login function?", which agent makes sense?

---

### Chunk 2.3: Custom Subagents

You can create your own in `.claude/agents/agent-name.md`:

```markdown
---
name: security-reviewer
description: Use when reviewing code for vulnerabilities
model: sonnet
tools:
  - Read
  - Grep
  - Glob
---

You are a security expert. Look for:
- SQL injection
- XSS vulnerabilities
- Authentication flaws
```

The `description` tells Claude *when* to use this agent.

**Discussion Q**: What goes in the YAML frontmatter vs the markdown body?

---

### Chunk 2.4: Resumable Agents

When a subagent finishes, it returns an `agent_id`. You can resume it later with full context preserved.

This means: start a research task, get results, resume to dig deeper.

**Discussion Q**: When might you want to resume an agent rather than start fresh?

---

## Module 3: Hooks

### Chunk 3.1: What Hooks Are

Hooks are shell commands that run at specific moments in Claude's lifecycle.

Key difference from prompts: **hooks always run**. They're deterministic, not suggestions.

**Discussion Q**: Why might you want something that "always runs" vs asking Claude nicely in a prompt?

---

### Chunk 3.2: Hook Events

The main events:

| Event | When | Can Block? |
|-------|------|------------|
| `PreToolUse` | Before a tool runs | Yes |
| `PostToolUse` | After a tool finishes | No |
| `Stop` | Claude finishes responding | No |
| `Notification` | Claude sends notification | No |

**Discussion Q**: If you want to auto-format code after every file edit, which event would you use?

---

### Chunk 3.3: Hook Configuration

Hooks go in settings.json:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx prettier --write \"$(jq -r '.tool_input.file_path')\""
          }
        ]
      }
    ]
  }
}
```

The `matcher` filters which tools trigger the hook.

**Discussion Q**: What does `"matcher": "Edit|Write"` mean?

---

### Chunk 3.4: Blocking with Hooks

PreToolUse hooks can output JSON to block a tool:

```json
{"decision": "block", "reason": "Cannot modify .env files"}
```

Or approve: `{"decision": "approve"}`

**Discussion Q**: Give an example of when you'd want to block a tool.

---

## Module 4: Plugins

### Chunk 4.1: What Plugins Are

Plugins are bundles of functionality that can be shared. They can contain:
- Slash commands
- Agents
- Skills
- Hooks
- MCP servers
- LSP servers

**Discussion Q**: Why bundle things together instead of distributing them separately?

---

### Chunk 4.2: Plugin Structure

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json      ← Required manifest
├── commands/
├── agents/
├── skills/
├── hooks/hooks.json
└── .mcp.json
```

The manifest at `.claude-plugin/plugin.json` is required.

**Discussion Q**: What file makes something a valid plugin?

---

### Chunk 4.3: Namespacing

Plugin components are namespaced to avoid conflicts:

- Commands: `/plugin-name:command-name`
- Agents: `plugin-name:agent-name`

**Discussion Q**: If two plugins both have a `/deploy` command, how do you tell them apart?

---

### Chunk 4.4: Marketplaces

Plugins are distributed via marketplaces (GitHub repos with `marketplace.json`).

```
/plugin marketplace add owner/repo
/plugin install plugin-name@marketplace
```

**Discussion Q**: How is this similar to npm or other package managers?

---

## Module 5: Agent Skills

### Chunk 5.1: Skills vs Commands (Revisited)

- **Command**: `/review` — you invoke it
- **Skill**: Claude reads the description, decides to use it

Skills live in `.claude/skills/skill-name/SKILL.md` (uppercase!)

**Discussion Q**: Why uppercase `SKILL.md`?

---

### Chunk 5.2: Skill Anatomy

```markdown
---
name: database-migrations
description: |
  Use when user mentions "migration", "schema change",
  or needs to modify database structure.
allowed-tools: Read, Write, Bash
---

# Database Migrations

## Conventions
- Files go in src/db/migrations/
- Use timestamps: YYYYMMDD_HHMMSS_name.sql
```

The `description` tells Claude when to invoke it.

**Discussion Q**: What makes Claude decide to use a skill?

---

### Chunk 5.3: Progressive Disclosure

Skills can load extra content only when needed:

```yaml
sections:
  - name: advanced
    content_file: ./advanced.md
    when: user asks about advanced features
```

**Discussion Q**: Why load content conditionally instead of all at once?

---

## Module 6: MCP Servers

### Chunk 6.1: What MCP Is

Model Context Protocol (MCP) lets Claude use external tools and services.

Examples: GitHub API, databases, Puppeteer for browser control.

**Discussion Q**: Why would Claude need external tools beyond file/bash access?

---

### Chunk 6.2: MCP Transports

Three ways to connect:

- `stdio` — Local process (most common)
- `sse` — Server-Sent Events (streaming HTTP)
- `http` — Request/response

**Discussion Q**: When would you use a local process vs an HTTP connection?

---

### Chunk 6.3: MCP Configuration

Project servers go in `.mcp.json`:

```json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": { "GITHUB_TOKEN": "..." }
    }
  }
}
```

**Discussion Q**: Where do user-level MCP servers go?

---

### Chunk 6.4: MCP Permissions

MCP tools use double-underscore naming:

- `mcp__github__create_issue` — specific tool
- `mcp__github__*` — all tools from github server

**Discussion Q**: How would you allow all filesystem MCP tools but deny delete?

---

## Module 7: Memory (CLAUDE.md)

### Chunk 7.1: Memory Hierarchy

Four levels of memory files:

| Type | Location | Shared? |
|------|----------|---------|
| Enterprise | System path | All users |
| User | `~/.claude/CLAUDE.md` | Just you |
| Project | `./CLAUDE.md` | Team (git) |
| Local | `./CLAUDE.local.md` | Just you (gitignored) |

**Discussion Q**: Where would you put instructions you don't want to commit?

---

### Chunk 7.2: Imports

CLAUDE.md can import other files:

```markdown
See @README.md for project overview.
@~/.claude/my-preferences.md
```

**Discussion Q**: Why import files instead of copying their content?

---

### Chunk 7.3: Modular Rules

`.claude/rules/*.md` lets you organize instructions by topic:

```
.claude/rules/
├── testing.md
├── api-design.md
└── security.md
```

Can be path-scoped: `paths: src/api/**/*.ts`

**Discussion Q**: When would you use rules vs one big CLAUDE.md?

---

## Module 8: Permissions

### Chunk 8.1: Permission Modes

| Mode | Behavior |
|------|----------|
| `default` | Prompts for each new tool |
| `acceptEdits` | Auto-accepts file edits |
| `plan` | Read-only, no modifications |
| `dontAsk` | Auto-deny unless pre-approved |
| `bypassPermissions` | Skip all (dangerous!) |

**Discussion Q**: When might `plan` mode be useful?

---

### Chunk 8.2: Permission Rules

```json
{
  "permissions": {
    "allow": ["Bash(npm run:*)"],
    "deny": ["Read(.env)", "Bash(rm -rf:*)"]
  }
}
```

Deny beats allow. Ask beats allow. Deny beats ask.

**Discussion Q**: What does `Bash(npm run:*)` match?

---

### Chunk 8.3: Path Patterns

| Pattern | Meaning |
|---------|---------|
| `//path` | Absolute filesystem path |
| `~/path` | Home directory |
| `/path` | Relative to settings file |
| `./path` | Relative to cwd |

**Discussion Q**: How do you specify an absolute path like `/Users/me/secrets`?

---

## Final Quiz

Use `claude-code-quiz.md` for a 35-question multiple choice assessment.

---

## Session State

**Last position**: Module 1, Chunk 1.1
**Status**: Just started
