---
title: FloatPrompt Quick Map
type: context
status: current
created: 2025-12-28

human_author: MDS
human_intent: Provide minimal context for quick orientation to FloatPrompt
human_context: 6 files, ~5 minutes, one MDS loop

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Quick orientation path for simple tasks
---

# FloatPrompt Quick Map

**Minimal context for quick tasks.** 6 files, ~5 minutes, one MDS loop.

---

## When to Use

- Quick questions about FloatPrompt
- Simple tasks that don't require deep context
- First contact with the system
- Time-constrained sessions

---

## The Loop

```
Loop 1: Orient
├── Map: Read boot loader and index
├── Decide: What do I need for this task?
└── Structure: Minimal working understanding
```

---

## File List (6 files)

Read in this order:

| # | File | What You'll Learn |
|---|------|-------------------|
| 1 | `_float/system.md` | Boot protocol, structure map, behavioral constraints |
| 2 | `_float/nav/root.md` | Repository structure, file format overview |
| 3 | `docs/goals.md` | Goal hierarchy: voice > behavior > artifacts |
| 4 | `docs/principles.md` | Recognition before action, slow is smooth |
| 5 | `core/prompt.md` | The template with placeholders |
| 6 | `context/float-context.md` | Conceptual overview of the three components |

---

## Result

After reading these 6 files, you understand:

- **What** FloatPrompt is (portable AI tools as text files)
- **Why** it exists (preserve human intelligence)
- **How** it's structured (JSON + Markdown in `<fp>` tags)
- **Rules** to follow (goal hierarchy, principles)

---

## What You Won't Have

- Deep understanding of the methodology
- Knowledge of real examples
- Historical context
- Full operational depth

For those, use `float-deepdive.md`.

---

## The Test

> "Do I understand enough to do what I need to do?"

If yes → Proceed
If no → Read more files or use `float-deepdive.md`

---

## Quick Reference

**Three components:**
- **floatprompt doc** — YAML frontmatter for context (doesn't modify behavior)
- **FloatPrompt** — `<fp>` tags for tools (modifies behavior)
- **FloatPrompt System** — `_float/` folders for project awareness

**Goal hierarchy (strict):**
1. Human Voice & Agency (primary)
2. Reliable AI Behavior (secondary)
3. Useful Artifacts (tertiary)

**Core principles:**
- Recognition before action
- Slow is smooth
- Archaeological respect
- Pilot principle (human decides, AI executes)

---

© 2025 @MDS

