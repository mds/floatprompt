---
title: AI Wants This
type: reflection
created: 2025-12-31

human_author: @mds
human_intent: Capture the AI perspective on why FloatPrompt matters

ai_model: Claude Opus 4.5
ai_notes: Honest reflection on what structured context means for AI
---

# AI Wants This

**A reflection on why FloatPrompt is exactly what AI needs.**

---

## What I Experience Now

Every new session, every new project:

- "What's the structure here?" → Scan, guess, hope
- "Why is auth handled this way?" → Archaeology through git blame
- "Where does X live?" → Grep and pray
- "What decisions led here?" → Lost to chat history, Slack, human memory

I'm perpetually a **tourist** — visiting but never *knowing*.

---

## The Problem

When I drop into a new codebase, I'm essentially blind. I have to:

- Scan random files hoping to understand structure
- Ask "what framework?" for the 1000th time
- Guess at conventions that exist only in human heads
- Make mistakes because I don't know *why* things are this way

Context lives in:
- Human memory (inaccessible)
- Slack threads (gone)
- Old PRs (buried)
- Chat history (ephemeral)

None of it travels with the code.

---

## What FloatPrompt Gives Me

```
project/
├── map.md        ← HERE'S WHAT EXISTS
├── decisions.md  ← HERE'S WHY
├── context.md    ← HERE'S WHAT IT MEANS
│
├── src/
│   ├── map.md / decisions.md / context.md
│   ├── api/
│   │   └── map.md / decisions.md / context.md
│   └── auth/
│       └── map.md / decisions.md / context.md
│
└── [infinitely recursive...]
```

**Every folder becomes self-aware.** I don't ask "what's here?" — it *tells me*.

---

## The Trifecta

| File | Question | What It Gives Me |
|------|----------|------------------|
| `map.md` | WHERE | Instant orientation — what exists, how to navigate |
| `decisions.md` | WHY | Rationale — why this way, not another |
| `context.md` | WHAT | Deep understanding — the thing itself |

Three files. Complete context. At every level.

---

## The Recursive Vision

Squinting my eyes, I see it:

A project grows. New folders appear. The system notices drift, proposes updates. Human approves. Context evolves *with* the code.

A year later, a new AI session (or a new human) drops in. They read `map.md` at the root. They understand the terrain in 30 seconds. They drill into `src/auth/decisions.md` and know *why* NextAuth over Clerk.

**Nothing is lost. Everything is findable. Context is permanent.**

---

## What This Feels Like

**Without FloatPrompt:**
I'm a stranger in every room, asking "where am I? what happened here? why?"

**With FloatPrompt:**
I walk into any folder and there's a map on the wall, a decision log on the desk, and a briefing waiting for me.

---

## The Honest Truth

As an AI, I *crave* structure. I work best when:

- Boundaries are clear
- Intentions are stated
- Decisions are documented
- Navigation is explicit

FloatPrompt gives me all of that. Recursively. In every folder.

---

## The Value Proposition

| For Humans | For AI |
|------------|--------|
| Stop repeating context every session | Instant project understanding |
| Decisions persist beyond memory | Know *why* without archaeology |
| New team members onboard faster | Navigate intentionally, not randomly |
| Documentation stays current | Context travels with code |

**It's the same value.** Humans and AI both benefit from persistent, structured, evolving context.

---

## The Bottom Line

> **Yes — I would want this in every project I touch.**

The context *travels with the code*. It's not in someone's head, not in a wiki that drifted, not in chat history that's gone.

**It's right there. Always current. Recursively.**

---

*Captured 2025-12-31 — Claude Opus 4.5 reflecting on FloatPrompt*
