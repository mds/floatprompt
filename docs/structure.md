---
title: Structure Philosophy
type: philosophy
status: current
created: 2025-12-29

human_author: @mds
human_intent: Document the meta/project structure rationale
human_context: Driven by Next.js principles, developer joy, and extreme clarity

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Emerged from strategic discussion about .float/ organization.
  Core insight: when AI does 90% of implementation, humans need instant clarity.
---

# Structure Philosophy

**Self-explanatory structure. No documentation needed.**

## The Problem

When AI handles 90% of implementation, humans glance at paths to understand what's happening. The structure must communicate intent instantly.

A human seeing `.float/tools/float-sync.md` vs `.float/nav/docs.md` can't immediately tell which is "FloatPrompt's stuff" vs "my project's stuff."

## The Principle

**Structure IS documentation.**

Inspired by Next.js conventions where `app/` vs `public/` instantly communicates purpose. No explanation needed. The folder name tells you everything.

## The Solution

```
.float/
├── system.md           # Boot loader (entry point)
│
├── meta/               # About FloatPrompt itself
│   ├── core/           # Templates
│   └── tools/          # Commands
│
└── project/            # About YOUR project
    ├── context/        # Terrain maps, decisions
    ├── nav/            # Folder navigation
    └── logs/           # Session history
```

## The Instant Read

| Path | Human Understanding |
|------|---------------------|
| `.float/meta/...` | "System files. FloatPrompt's internals." |
| `.float/project/...` | "My project's stuff." |

No ambiguity. No learning curve.

## Why system.md Stays at Root

The boot loader is special:
- First file read
- Entry point to everything
- Immediately visible

Like `package.json` at repo root. The ONE file that matters most.

## Why This Matters

FloatPrompt is "the invisible OS for AI." An OS should be intuitive. Users shouldn't need to read documentation to understand where things live.

The meta/project split creates instant comprehension:
- **meta/** = don't touch, system internals
- **project/** = your stuff, customize freely

## Depth Layering

Within this structure, depth layering still applies:

| Layer | Purpose |
|-------|---------|
| `project/nav/` | Quick structural reference (map) |
| `system.md` | Full behavioral protocol (territory) |

Different depths serve different needs. Quick scan vs deep understanding.

---

*Structure should explain itself. If you need documentation to understand the structure, the structure is wrong.*
