# Dual CLI Architecture

## Two Execution Contexts

FloatPrompt tools run in two contexts:

| Aspect | `npm float <cmd>` | `/float-<cmd>` |
|--------|-------------------|----------------|
| **Runtime** | Node CLI | Claude Code |
| **AI Access** | Anthropic API (direct) | Claude Code session |
| **Mode** | Headless | Interactive |
| **Human** | Not in loop | In the loop |
| **Use Case** | CI/CD, automation, scripting | Conversation, decisions |
| **Cost** | API pay-per-use | Subscription |
| **Context** | Filesystem only | Full conversation history |
| **Speed** | Fast (no chat UI) | Conversational pace |

---

## npm float Commands

Headless, scriptable, CI/CD-friendly:

### Build Commands (No AI)

```bash
npm float build              # Compile all templates → .md
npm float build:tools        # Tools only
npm float build:nav          # Nav files only
npm float build:context      # Context files only
```

These are pure compilation — Handlebars + data → output. No AI involved.

### Validation Commands (Optional AI)

```bash
npm float validate           # Check structure integrity
npm float validate --strict  # Fail on any drift
```

Can run without AI (structural checks) or with AI (semantic checks).

### Sync Commands (AI-Powered)

```bash
npm float sync               # Scan folders → regenerate nav
npm float sync --dry-run     # Preview changes
npm float sync --fix         # Auto-fix drift
```

Uses Anthropic API for intelligent decisions.

### Init Command

```bash
npm float init               # Scaffold .float/ in user project
npm float init --interactive # Ask configuration questions
npm float init --config .floatrc.json  # Use config file
```

Renders templates with user-specific values.

---

## Slash Commands (Claude Code)

Interactive, conversational, human-in-loop:

```
/float              # Boot, show status
/float-sync         # Interactive sync with conversation
/float-fix          # Discuss fixes, approve changes
/float-context      # Generate with human decisions
/float-enhance      # Interactive enhancement
/float-think        # Route to appropriate tool
```

### Key Difference: Conversation Context

Slash commands have access to:
- Full conversation history
- Prior decisions in this session
- Human clarification in real-time
- Nuanced judgment calls

npm commands have access to:
- Filesystem
- Config files
- API (if configured)
- No conversation context

---

## Same Tools, Different Interfaces

The underlying tool logic is shared:

```
┌─────────────────────────────────────────┐
│           TOOL LOGIC (shared)            │
│                                          │
│  - Validation rules                      │
│  - Scan patterns                         │
│  - Fix strategies                        │
│  - Output formats                        │
└────────────────┬────────────────────────┘
                 │
        ┌────────┴────────┐
        │                 │
        ▼                 ▼
┌───────────────┐ ┌───────────────┐
│  npm CLI      │ │  /slash cmd   │
│               │ │               │
│ - Headless    │ │ - Interactive │
│ - Scriptable  │ │ - Conversat.  │
│ - API-based   │ │ - Session     │
└───────────────┘ └───────────────┘
```

### Example: float-sync

**npm float sync:**
1. Scan folders
2. Compare to nav files
3. Generate diff
4. Apply fixes (if --fix)
5. Exit with status code

**\/float-sync:**
1. Scan folders
2. Compare to nav files
3. Show drift to human
4. Discuss: "Should I fix X?"
5. Human approves/modifies
6. Apply approved fixes
7. Continue conversation

---

## CI/CD Integration

```yaml
# .github/workflows/validate.yml
name: FloatPrompt Validation

on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm install
      - run: npm float validate --strict
```

Fail the build if FloatPrompt structure drifts.

---

## API Configuration

For npm commands that use AI:

```json
// .floatrc.json
{
  "api": {
    "provider": "anthropic",
    "model": "claude-sonnet-4-20250514"
  },
  "author": "@username",
  "project": "my-project"
}
```

Or environment variable:
```bash
export ANTHROPIC_API_KEY=sk-...
npm float sync
```

---

## Command Summary

| Command | AI? | Purpose |
|---------|-----|---------|
| `npm float build` | No | Compile templates |
| `npm float validate` | Optional | Check structure |
| `npm float sync` | Yes | Scan + regenerate |
| `npm float init` | No | Scaffold project |
| `/float-sync` | Yes (session) | Interactive sync |
| `/float-fix` | Yes (session) | Interactive fix |
| `/float-think` | Yes (session) | Route to tool |

---

## Why Both?

**npm CLI for:**
- Automation (CI/CD pipelines)
- Scripting (batch operations)
- Speed (no conversation overhead)
- Reproducibility (same input → same output)

**Slash commands for:**
- Exploration (what should I do?)
- Judgment calls (is this the right fix?)
- Learning (teach me about this)
- Complex decisions (multiple valid paths)

Users choose based on need. Power users use both.
