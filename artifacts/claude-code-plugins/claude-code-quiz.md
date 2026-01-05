# Claude Code Architecture Quiz

Test your understanding of Claude Code's extensibility system. Choose the best answer for each question.

---

## Section 1: Core Concepts

### Question 1
What is the fundamental difference between **slash commands** and **agent skills**?

- A) Slash commands are faster than skills
- B) Slash commands are user-invoked, skills are model-invoked
- C) Skills can only read files, commands can write
- D) Slash commands require plugins, skills don't

<details>
<summary>Answer</summary>

**B) Slash commands are user-invoked, skills are model-invoked**

Slash commands require the user to explicitly type `/command-name`. Agent skills are automatically invoked by Claude when it determines they're relevant to the current task.
</details>

---

### Question 2
Where does Claude Code store **user-level** settings that apply to all projects?

- A) `.claude/settings.json`
- B) `~/.claude/settings.json`
- C) `/etc/claude-code/settings.json`
- D) `~/.claude.json`

<details>
<summary>Answer</summary>

**B) `~/.claude/settings.json`**

User settings go in `~/.claude/settings.json`. Project settings go in `.claude/settings.json`. The `~/.claude.json` file stores preferences, OAuth sessions, and MCP server configs (different from settings).
</details>

---

### Question 3
What is the **settings precedence order** from highest to lowest?

- A) User → Project → Enterprise → CLI args
- B) Enterprise → CLI args → Local → Project → User
- C) CLI args → Enterprise → Project → User → Local
- D) Project → Local → User → Enterprise

<details>
<summary>Answer</summary>

**B) Enterprise → CLI args → Local → Project → User**

Enterprise managed settings have the highest precedence and cannot be overridden. Then CLI arguments, then local project settings (`.claude/settings.local.json`), then shared project settings, then user settings.
</details>

---

## Section 2: Subagents

### Question 4
What is the key architectural feature that distinguishes subagents from the main Claude conversation?

- A) Subagents use different models
- B) Subagents have their own separate context window
- C) Subagents can only use read-only tools
- D) Subagents run in a sandbox

<details>
<summary>Answer</summary>

**B) Subagents have their own separate context window**

Subagents operate with a completely separate context window from the main conversation. This allows them to work on focused tasks without cluttering the main context, and they can be resumed later with their context preserved.
</details>

---

### Question 5
Which built-in subagent uses the **Haiku** model for fast, lightweight operations?

- A) general-purpose
- B) Plan
- C) Explore
- D) Code-reviewer

<details>
<summary>Answer</summary>

**C) Explore**

The Explore agent uses Haiku for fast codebase searches. It has read-only tools (Glob, Grep, Read) and is optimized for quick exploration. General-purpose and Plan agents use Sonnet.
</details>

---

### Question 6
In a custom subagent definition, what does the `allowMcp: true` frontmatter option do?

- A) Allows the agent to create new MCP servers
- B) Allows the agent to use MCP tools from configured servers
- C) Enables MCP protocol for communication
- D) Allows the agent to modify MCP configuration

<details>
<summary>Answer</summary>

**B) Allows the agent to use MCP tools from configured servers**

By default, subagents cannot access MCP tools. Setting `allowMcp: true` in the frontmatter grants the subagent permission to use tools provided by MCP servers.
</details>

---

## Section 3: Hooks

### Question 7
Which hook event can **block** a tool from executing?

- A) PostToolUse
- B) SessionStart
- C) PreToolUse
- D) Notification

<details>
<summary>Answer</summary>

**C) PreToolUse**

PreToolUse runs before a tool executes and can return `{"decision": "block", "reason": "..."}` to prevent the tool from running. PostToolUse runs after the tool completes so it can't block. PermissionRequest can also block.
</details>

---

### Question 8
What is the correct JSON output to **approve** a tool use in a PreToolUse hook?

- A) `{"allow": true}`
- B) `{"decision": "approve"}`
- C) `{"approved": true}`
- D) `{"status": "allowed"}`

<details>
<summary>Answer</summary>

**B) `{"decision": "approve"}`**

Hook decision output uses the format `{"decision": "approve"}`, `{"decision": "block", "reason": "..."}`, or `{"decision": "ask"}` to fall back to the normal permission flow.
</details>

---

### Question 9
Which hook event fires when Claude **finishes responding** in the main conversation?

- A) SessionEnd
- B) PostToolUse
- C) Stop
- D) Notification

<details>
<summary>Answer</summary>

**C) Stop**

The `Stop` event fires when Claude finishes responding. `SubagentStop` fires when a subagent completes. `SessionEnd` fires when the entire session ends (user exits Claude Code).
</details>

---

### Question 10
What environment variable provides the **plugin installation directory** in plugin hooks?

- A) `CLAUDE_PROJECT_DIR`
- B) `CLAUDE_PLUGIN_ROOT`
- C) `PLUGIN_PATH`
- D) `CLAUDE_INSTALL_DIR`

<details>
<summary>Answer</summary>

**B) `CLAUDE_PLUGIN_ROOT`**

`CLAUDE_PLUGIN_ROOT` points to the plugin's installation directory (in the cache). `CLAUDE_PROJECT_DIR` points to the user's project directory. Use `CLAUDE_PLUGIN_ROOT` in hooks to reference files bundled with your plugin.
</details>

---

## Section 4: Plugins

### Question 11
What is the **required file** for a valid Claude Code plugin?

- A) `plugin.json`
- B) `.claude-plugin/plugin.json`
- C) `manifest.json`
- D) `.claude/plugin.json`

<details>
<summary>Answer</summary>

**B) `.claude-plugin/plugin.json`**

The plugin manifest must be at `.claude-plugin/plugin.json` inside the plugin directory. This file defines the plugin's name, version, description, and metadata.
</details>

---

### Question 12
How are plugin components **namespaced** to avoid conflicts?

- A) By file path
- B) By plugin-name:component-name
- C) By version number
- D) They're not namespaced

<details>
<summary>Answer</summary>

**B) By plugin-name:component-name**

Plugin components use namespacing: `/plugin-name:command-name` for commands, `plugin-name:agent-name` for agents. This prevents conflicts when multiple plugins define similarly-named components.
</details>

---

### Question 13
In a marketplace's `plugin.json`, what does `"strict": false` mean?

- A) The plugin doesn't require validation
- B) The plugin source doesn't need its own plugin.json
- C) Permission rules are relaxed
- D) The plugin can modify system files

<details>
<summary>Answer</summary>

**B) The plugin source doesn't need its own plugin.json**

When `strict: false`, the marketplace entry itself defines everything about the plugin - no separate `plugin.json` is required in the plugin source. When `strict: true` (default), the plugin must have its own manifest.
</details>

---

## Section 5: Agent Skills

### Question 14
What is the required filename format for an agent skill?

- A) `skill.md`
- B) `SKILL.md`
- C) `index.md`
- D) Any `.md` file in skills/

<details>
<summary>Answer</summary>

**B) `SKILL.md`**

Skills must be named `SKILL.md` (uppercase) and placed in a directory under `.claude/skills/`. The directory name becomes part of the skill's identity. Example: `.claude/skills/database-migrations/SKILL.md`
</details>

---

### Question 15
What frontmatter field tells Claude **when** to invoke a skill?

- A) `name`
- B) `trigger`
- C) `description`
- D) `when`

<details>
<summary>Answer</summary>

**C) `description`**

The `description` field in YAML frontmatter tells Claude when the skill is relevant. Example: `description: Use when user mentions "migration" or needs to modify database structure.` Claude uses this to decide whether to invoke the skill.
</details>

---

### Question 16
What feature allows skills to load additional content **only when needed**?

- A) Lazy loading
- B) Progressive disclosure (sections)
- C) Dynamic imports
- D) Conditional compilation

<details>
<summary>Answer</summary>

**B) Progressive disclosure (sections)**

Skills support `sections` in frontmatter that load additional content files only when certain conditions are met. Example: `when: user asks about advanced features` loads `content_file: ./advanced.md` only when relevant.
</details>

---

## Section 6: MCP Servers

### Question 17
What are the three transport types supported by MCP servers?

- A) HTTP, WebSocket, gRPC
- B) stdio, sse, http
- C) TCP, UDP, Unix socket
- D) REST, GraphQL, RPC

<details>
<summary>Answer</summary>

**B) stdio, sse, http**

MCP supports three transports: `stdio` (local process, most common), `sse` (Server-Sent Events for streaming), and `http` (request/response). Most local MCP servers use stdio.
</details>

---

### Question 18
What is the permission rule format for allowing **all tools** from an MCP server named "github"?

- A) `mcp:github:*`
- B) `mcp__github__*`
- C) `github.*`
- D) `MCP(github:*)`

<details>
<summary>Answer</summary>

**B) `mcp__github__*`**

MCP tool permissions use double underscores: `mcp__servername__toolname`. The wildcard `mcp__github__*` matches all tools from the github server. Specific tools: `mcp__github__create_issue`.
</details>

---

### Question 19
Where are **project-scoped** MCP servers configured?

- A) `~/.claude.json`
- B) `.mcp.json`
- C) `.claude/mcp.json`
- D) `mcp-servers.json`

<details>
<summary>Answer</summary>

**B) `.mcp.json`**

Project-scoped MCP servers go in `.mcp.json` at the project root. User-scoped MCP servers go in `~/.claude.json` under the `mcpServers` key. The `.mcp.json` file can be committed to share servers with your team.
</details>

---

## Section 7: Memory & CLAUDE.md

### Question 20
Which CLAUDE.md file is **automatically gitignored**?

- A) `CLAUDE.md`
- B) `.claude/CLAUDE.md`
- C) `CLAUDE.local.md`
- D) `~/.claude/CLAUDE.md`

<details>
<summary>Answer</summary>

**C) `CLAUDE.local.md`**

`CLAUDE.local.md` is automatically gitignored, making it ideal for personal project-specific preferences that shouldn't be committed. Regular `CLAUDE.md` and `.claude/CLAUDE.md` are intended to be shared with the team.
</details>

---

### Question 21
What syntax does CLAUDE.md use to **import** another file's contents?

- A) `#include "file.md"`
- B) `@path/to/file.md`
- C) `{{file.md}}`
- D) `[import](file.md)`

<details>
<summary>Answer</summary>

**B) `@path/to/file.md`**

CLAUDE.md uses `@path/to/file` syntax to import files. Supports relative paths, absolute paths, and home directory (`@~/.claude/preferences.md`). Imports can be recursive up to 5 levels deep.
</details>

---

### Question 22
What is the purpose of `.claude/rules/*.md` files?

- A) Define permission rules
- B) Modular, topic-specific project instructions
- C) Configure hook rules
- D) Define linting rules

<details>
<summary>Answer</summary>

**B) Modular, topic-specific project instructions**

The `.claude/rules/` directory allows organizing instructions into focused files (e.g., `testing.md`, `api-design.md`) instead of one large CLAUDE.md. Rules can be path-scoped using `paths:` frontmatter.
</details>

---

## Section 8: Permissions

### Question 23
What permission mode **auto-accepts file edits** but still prompts for other tools?

- A) `default`
- B) `acceptEdits`
- C) `dontAsk`
- D) `bypassPermissions`

<details>
<summary>Answer</summary>

**B) `acceptEdits`**

The `acceptEdits` mode automatically accepts file edit permissions for the session while still prompting for other potentially dangerous operations like bash commands.
</details>

---

### Question 24
In permission rules, what does `Bash(npm run:*)` match?

- A) Exactly "npm run"
- B) Any command containing "npm run"
- C) Commands starting with "npm run"
- D) Only "npm run *" with a space

<details>
<summary>Answer</summary>

**C) Commands starting with "npm run"**

Bash permission rules use **prefix matching** with the `:*` suffix. `Bash(npm run:*)` matches any command that starts with "npm run", like "npm run test", "npm run build", etc.
</details>

---

### Question 25
Which path pattern represents an **absolute filesystem path** in Read/Edit rules?

- A) `/Users/alice/file`
- B) `//Users/alice/file`
- C) `~/file`
- D) `./file`

<details>
<summary>Answer</summary>

**B) `//Users/alice/file`**

Double-slash `//` indicates an absolute filesystem path. Single-slash `/path` is **relative to the settings file location** (not the filesystem root!). Use `~/` for home directory, `./` for current directory.
</details>

---

## Section 9: Slash Commands

### Question 26
What placeholder in a slash command gets replaced with **user input after the command**?

- A) `${INPUT}`
- B) `$ARGUMENTS`
- C) `{{args}}`
- D) `%USER_INPUT%`

<details>
<summary>Answer</summary>

**B) `$ARGUMENTS`**

When a user types `/review src/app.ts`, the `$ARGUMENTS` placeholder in the command file is replaced with "src/app.ts". This allows commands to accept dynamic input.
</details>

---

### Question 27
What frontmatter field **restricts which tools** a slash command can use?

- A) `tools`
- B) `permissions`
- C) `allowed-tools`
- D) `tool-whitelist`

<details>
<summary>Answer</summary>

**C) `allowed-tools`**

The `allowed-tools` frontmatter field restricts which tools Claude can use when executing the command. Example: `allowed-tools: Read, Grep, Glob` limits the command to read-only operations.
</details>

---

### Question 28
What does `@file.txt` do inside a slash command's markdown content?

- A) Creates a link to the file
- B) Includes the file's contents inline
- C) Attaches the file to the message
- D) Validates the file exists

<details>
<summary>Answer</summary>

**B) Includes the file's contents inline**

The `@file.txt` syntax in slash commands (and CLAUDE.md) includes the referenced file's contents directly in the prompt. This lets commands reference project files, templates, or configuration.
</details>

---

## Section 10: Advanced Concepts

### Question 29
What tool does Claude use to **spawn a subagent**?

- A) `Subagent`
- B) `Agent`
- C) `Task`
- D) `Spawn`

<details>
<summary>Answer</summary>

**C) `Task`**

Claude uses the `Task` tool to spawn subagents. The tool accepts parameters like `subagent_type`, `prompt`, `model`, and `run_in_background`. Subagent results are returned to the main conversation.
</details>

---

### Question 30
What is the difference between `PostToolUse` and `Stop` hook events?

- A) PostToolUse fires after each tool, Stop fires when Claude finishes its response
- B) They're the same event with different names
- C) PostToolUse is for errors, Stop is for success
- D) Stop fires first, then PostToolUse

<details>
<summary>Answer</summary>

**A) PostToolUse fires after each tool, Stop fires when Claude finishes its response**

`PostToolUse` fires after every individual tool execution (potentially many times per response). `Stop` fires once when Claude has finished its complete response and is waiting for user input.
</details>

---

### Question 31
In enterprise deployments, which file **cannot be overridden** by user or project settings?

- A) `~/.claude/settings.json`
- B) `.claude/settings.json`
- C) `managed-settings.json`
- D) `.claude/settings.local.json`

<details>
<summary>Answer</summary>

**C) `managed-settings.json`**

Enterprise `managed-settings.json` (deployed to system directories like `/Library/Application Support/ClaudeCode/`) has the highest precedence and cannot be overridden by any user or project settings.
</details>

---

### Question 32
What does the `strictKnownMarketplaces` enterprise setting control?

- A) Which plugins can be installed
- B) Which marketplaces users can add
- C) Which tools are allowed
- D) Which models can be used

<details>
<summary>Answer</summary>

**B) Which marketplaces users can add**

`strictKnownMarketplaces` is an enterprise-only setting that controls which plugin marketplaces users can add. An empty array `[]` means complete lockdown - no new marketplaces can be added.
</details>

---

## Section 11: Tools & Capabilities

### Question 33
Which tools require **permission approval** by default?

- A) Read, Glob, Grep
- B) Write, Edit, Bash, WebFetch
- C) Task, TodoWrite, AskUserQuestion
- D) All tools require permission

<details>
<summary>Answer</summary>

**B) Write, Edit, Bash, WebFetch**

Tools that modify files (Write, Edit, NotebookEdit), execute commands (Bash), or make network requests (WebFetch, WebSearch) require permission. Read-only tools (Read, Glob, Grep, Task, TodoWrite) don't require approval.
</details>

---

### Question 34
What is the `Skill` tool used for?

- A) Creating new skills
- B) Executing an agent skill within the conversation
- C) Listing available skills
- D) Editing skill files

<details>
<summary>Answer</summary>

**B) Executing an agent skill within the conversation**

The `Skill` tool executes a skill (from `.claude/skills/` or plugins) within the main conversation. Claude invokes this tool when it determines a skill is relevant to the current task.
</details>

---

### Question 35
What does the `ExitPlanMode` tool do?

- A) Ends the Claude Code session
- B) Cancels the current plan
- C) Prompts user to exit plan mode and start coding
- D) Saves the current plan to a file

<details>
<summary>Answer</summary>

**C) Prompts user to exit plan mode and start coding**

`ExitPlanMode` signals that Claude has finished planning and is ready for user approval to proceed with implementation. It's used when Claude is in plan mode (read-only research phase).
</details>

---

## Scoring Guide

| Score | Level |
|-------|-------|
| 32-35 | Expert - You deeply understand Claude Code architecture |
| 26-31 | Advanced - Strong grasp with minor gaps |
| 20-25 | Intermediate - Good foundation, review weak areas |
| 14-19 | Beginner - Re-read the documentation |
| 0-13 | Novice - Start with the basics |

---

## Quick Reference Card

### Component Summary

| Component | Trigger | Location | Key File |
|-----------|---------|----------|----------|
| Slash Commands | User types `/cmd` | `.claude/commands/` | `command.md` |
| Plugins | Installation | `.claude-plugin/` | `plugin.json` |
| Agent Skills | Claude auto-invokes | `.claude/skills/` | `SKILL.md` |
| Subagents | Claude spawns via Task | `.claude/agents/` | `agent.md` |
| Hooks | Events fire | settings.json | `hooks` key |
| MCP Servers | Claude calls tools | `.mcp.json` | `mcpServers` key |

### Settings Precedence
```
Enterprise (highest)
    ↓
CLI Arguments
    ↓
Local (.claude/settings.local.json)
    ↓
Project (.claude/settings.json)
    ↓
User (~/.claude/settings.json) (lowest)
```

### Memory Precedence
```
Enterprise CLAUDE.md
    ↓
User (~/.claude/CLAUDE.md)
    ↓
Project (CLAUDE.md)
    ↓
Local (CLAUDE.local.md)
```
