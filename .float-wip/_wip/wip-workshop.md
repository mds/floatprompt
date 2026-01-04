# Workshop Concept

**Date:** 2026-01-03
**Status:** Concept (not spec'd)

---

## The Insight

The wip-boot pattern works. It's working *right now* for FloatPrompt development:

- **Session handoff** — AI reads `wip-boot.md`, knows exactly where to pick up
- **Paper trail** — Decisions logged in `wip-logs/`, not lost to conversation history
- **Reconciliation** — Explicit process (`wip-reconcile.md`) to sync all files before handoff

These aren't FloatPrompt-specific. **Any project building with AI benefits from this.**

---

## The Concept

A productized version of the wip-boot system that any project can use.

```
.float/
├── float.db              ← Knowledge layer (what exists)
├── system.md             ← System boot instructions
├── boot-workshop.md      ← Workshop boot (current work session)
└── workshop/             ← Process layer (what we're doing)
    ├── spec/             ← Active specs being developed
    ├── draft/            ← Work in progress
    └── logs/             ← Decision archive
```

**What it becomes:** "How to build with AI" — process scaffolding for any repo.

---

## Same DB or Separate?

**Recommendation: Same `float.db`.**

Reasons:
- `folders` table already has `type` field: `folder | scope | log_root | log_year | log_month`
- Add new types: `workshop_boot`, `workshop_spec`, `workshop_draft`
- `log_entries` table already works for decision logging
- Workshop folders ARE part of the project — they should be indexed

The workshop isn't separate from the project. It's **the process of building the project**.

---

## What Goes in `workshop/`

| Folder/File | Purpose |
|-------------|---------|
| `boot-workshop.md` | Current session context (lives at `.float/` root, like system.md) |
| `workshop/spec/` | Active specifications (like wip-generate-spec.md) |
| `workshop/draft/` | Work in progress before spec is ready |
| `workshop/logs/{YYYY}/{MM-mon}/` | Decision archive (locked decisions) |

---

## How It Integrates

When `float sync` runs, workshop files get indexed like any other folder:
- `workshop/` row in `folders` with `type = 'workshop_root'`
- AI reads `boot-workshop.md` first, then scope chain, then folder context
- Decisions get logged to both `log_entries` table AND markdown files

**The beauty:** Workshop context inherits project context. AI working in workshop knows the full codebase because it has `float.db`.

---

## What `boot-workshop.md` Contains

Mirrors wip-boot.md structure:

```markdown
## Last Session
What happened, what was decided, what changed.

## This Session
Pick up here: what's next, what to read.

## Your Role
How AI should behave during development work.

## Current State
What exists, what's active, what's stale.

## Open Questions
Unresolved issues awaiting decision.
```

---

## New `type` Values

| Type | Purpose |
|------|---------|
| `workshop_root` | The `workshop/` folder itself |
| `workshop_spec` | Active specification documents |
| `workshop_draft` | Work in progress |
| `workshop_log_year` | Year folder in logs |
| `workshop_log_month` | Month folder in logs |

These parallel the existing log types (`log_root`, `log_year`, `log_month`).

---

## Why This Matters

1. **Session continuity** — No more re-explaining context every conversation
2. **Decision memory** — Paper trail of why things are the way they are
3. **Process formalization** — "How we build" becomes explicit, not tribal knowledge
4. **AI handoff** — Any AI (same model, different model, different day) can pick up work

---

## What This Replaces

In FloatPrompt development, we currently have:
- `.float-wip/_wip/wip-boot.md` — becomes `boot-workshop.md`
- `.float-wip/_wip/wip-*.md` — becomes `workshop/spec/*.md` or `workshop/draft/*.md`
- `.float-wip/_wip/wip-logs/` — becomes `workshop/logs/`
- `.float-wip/_wip/wip-reconcile.md` — becomes a floatprompt tool or built-in process

---

## Open Questions

| Question | Options |
|----------|---------|
| Where does boot-workshop.md live? | A) `.float/boot-workshop.md`, B) `.float/workshop/boot.md` |
| Separate reconcile tool? | A) Yes, `/float reconcile`, B) Built into session end |
| Workshop types in schema now? | A) Add now, B) Wait until core is done |
| Draft vs spec distinction? | A) Keep both, B) Just `workshop/active/` |

---

## Relationship to Current Work

**Layer 2 first.** Workshop is a product feature, not infrastructure.

Priority:
1. Finish `generate.ts` — populate context for 65 folders
2. Build `boot.md` — production system prompt
3. Then productize the workshop pattern

The workshop pattern is *proven* (we're using it). The question is packaging it for others.

---

*Created 2026-01-03 — Capturing the workshop concept from session discussion*
