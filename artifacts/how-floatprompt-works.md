User installs floatprompt into any directory of their own knowledge (code/content/etc) via npm install floatprompt

.float/ is installed at root level along with:
- boot.md
- project/
- templates/
- tools/
  - float*tools

.claude/commands are also installed and each one points to .float/tools/*

Everything in .float/ has previously been done with markdown only

We're now in the process of rebuilding the foundational pieces, bit by bit, with typescript.

The goals is to merge the speed and predictability of code and the contextual quality structue of floatprompt to create omnipresent recursive context scaffolding around any users' project

Users install floatprompt (npm install floatprompt) then run /float command

The system is built and ready for recursive context

---

For now, we are assuming CLI tools, users are running Claude Code

Claude Code can spawn "Claude" agents to handle various tasks. These agents in the floatprompt world are called "Buoys"

Moving forward beyond where we're at now, we need to decide the absolutely best:

boot.md (aka system.md) floatprompt structure and OS-level document—similar to templates/.float/templates/float-os.md that would ORIENT AND DIRECT CLAUDE CODE to fully understand the .float/ system and how it should operate to create recursive contextual scaffolding THIS IS THE ULTIMATE FLOATPROMPT to define the full system and how it operates. the existing file does pretty well, but it's all based on old markdown methodology

we, also need to determine the best typescript setup for floatprompt tools (we've already defined schema for base format) all existing tools are markdown only, but they could probably be more powerful within .float/ if some/most of them were actual typescript functions vs markdown instruction for AI

AI needs to realize that it can use typescript functions, command line functions, AND the ability to SPAWN multiple(hundreds/thousands?) buoys/agents to accomplish various tasks in this .float/ system. It should never try to do alone, what a fleet of subagents/buoys can do together.

Pushing all of this floatprompt philosophy into typescript, sqlite, vercel sandbox, ai sdk, makes this a powerhouse of AI metadata wherever it's installed.

---

## Autonomous Scopes (the recursive scaling model)

Some folders are just folders. But some folders are complex enough to be their own "world" — their own mini FloatPrompt system within the larger system.

Think monorepo:
- /packages/web-app is a world
- /packages/web-app/src/auth is a world within that world
- /packages/mobile-app is a different world
- /infrastructure is its own world

These are "autonomous scopes" — they get their own boot context, their own patterns, their own buoy teams when needed. But they're still connected to the parent. Changes bubble up through the scope hierarchy.

The database tracks this. No extra folders needed. Just a flag: is_scope = TRUE. And a pointer to the parent scope. The whole thing stays in one SQLite database, but the system knows which folders are "worlds" and treats them specially.

---

## The Three Layers

Layer 1: Mechanical (code, instant)
- Walk filesystem, detect structure
- Hash files for change detection
- Write to SQLite
- Runs in milliseconds, no AI needed

Layer 2: AI Generation (buoys, parallel)
- For each folder/scope: generate map (what's here)
- For each folder/scope: generate context (what it means)
- Form hypothesis about relationships, patterns, architecture
- Buoys work in parallel — one per scope if needed

Layer 3: Ongoing (triggers, continuous)
- File watcher, git hook, manual command
- Detect changes, mark scopes as stale
- Re-run AI for affected scopes only
- Context stays fresh without human prompting

The scanner we're building is Layer 1. It's the foundation everything else builds on.

---

## Why This Scales Infinitely

Mechanical layer = O(1) hash comparisons, milliseconds
- 10,000 folders? 10,000 rows. SQLite handles billions.

Scopes = hierarchical, changes only affect ancestors
- Change in /auth doesn't rescan /mobile-app
- Staleness bubbles UP, not sideways

Buoys = parallel, spawn as needed
- 50 scopes changed? Spawn 50 buoys.
- 1000 folders need context? Spawn 1000 buoys.
- Cloud handles it. That's the point.

The architecture doesn't care if it's a 10-folder project or a 10,000-folder monorepo. Same pattern. Same code. Different scale.

---

## Context Evolution

Initial context is AI's hypothesis — generated from reading the files, best guess about what things mean.

But as human and AI work together, insights emerge. The system can tell when something is novel because it can check against what exists. Novel insights get captured. Context evolves.

- folders.context_* = current understanding (latest state)
- log_entries = paper trail of how we got there

The context isn't static. It's a living record that gets richer over time.

---

## The End State

Human opens Claude Code anywhere in the project:

AI reads (in order):
1. boot.md (root system prompt)
2. Scope chain up to current location
3. Map + context for current folder

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)

No more "what framework is this?"
No more "can you explain the auth system?"
No more repeating context every session.

It's just... there. Always fresh. Always recursive. Always ready.

---

## The Formula

omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)

Any size. Any depth. Any complexity.

---

## The AI Civilization (added 2026-01-03)

The database isn't just storage. It's an **AI civilization** — a structured world where AI agents can operate with full understanding.

**The elements:**

- **Laws** — The schema defines what exists and how it's structured
- **Governance** — `status` field tells AI what to trust (current, stale, pending)
- **Provenance** — `ai_model` + `ai_updated` tell AI who wrote what, when
- **Territories** — Scopes are autonomous worlds within worlds
- **History** — `log_entries` are the paper trail of decisions
- **Maps** — `description` is quick orientation for any folder
- **Deep Context** — `content_md` is full understanding when needed

**A cold AI session can land anywhere and instantly know:**

1. Where am I? (`path`)
2. Can I trust this context? (`status`)
3. Who wrote it and when? (`ai_model`, `ai_updated`)
4. What scope am I in? (`is_scope`, `parent_scope_path`)
5. What decisions have been made here? (`log_entries`)

---

## The Token Economy (added 2026-01-03)

This system operates in a **token economy** — but the goal isn't minimizing tokens, it's **maximizing value per token**.

Every piece of context must pass the value test:

> **"Does this help AI understand and operate better?"**

**What makes context valuable:**

- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluff

Context that is so relevant, so accurate, so rich, and so precise — it's worth spending tokens on.

