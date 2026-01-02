# How FloatPrompt Works

Overview of the FloatPrompt system — installation, structure, and goals.

---

## Installation Flow

User installs floatprompt into any directory of their own knowledge (code/content/etc):

```bash
npm install floatprompt
```

Then runs `/float` command to scaffold the system.

---

## What Gets Installed

```
.float/
├── boot.md           # System protocol (orients AI)
├── project/
│   ├── context/      # Deep understanding files
│   ├── logs/         # Session history
│   └── nav/          # Folder maps
├── templates/        # Legacy markdown docs
└── tools/            # /float* command tools

.claude/commands/     # Each points to .float/tools/*
```

---

## Current State

Everything in `.float/` has previously been done with markdown only.

We're now rebuilding the foundational pieces, bit by bit, with TypeScript.

**The goal:** Merge the speed and predictability of code with the contextual quality structure of FloatPrompt to create omnipresent recursive context scaffolding around any user's project.

---

## Buoys (Agents)

Claude Code can spawn "Claude" agents to handle various tasks.

**In the FloatPrompt world, these agents are called "Buoys."**

AI should realize it can use:
- TypeScript functions
- Command line functions
- Spawn multiple buoys/agents

> "It should never try to do alone, what 3-4 subagents/buoys can do together."

---

## Open Decisions

### 1. boot.md Structure

The ultimate FloatPrompt that orients and directs Claude Code to fully understand the `.float/` system and how it should operate to create recursive contextual scaffolding.

This is THE OS-level document. The existing `templates/.float/system.md` does well, but it's based on old markdown-only methodology.

### 2. TypeScript Tools

We've defined schema for the base format. All existing tools are markdown only.

Some tools could be more powerful within `.float/` if they were actual TypeScript functions vs markdown instructions for AI.

---

## Assumptions

For now, we assume CLI tools — users are running Claude Code.

---

*Canonical overview for new sessions. See `README.md` for reading order.*
