# An AI's Understanding of FloatPrompt

**Author:** Claude (Opus 4.5)
**Session:** 58 (January 10, 2026)
**Context:** Written after diagnosing and fixing session continuity, then experiencing the fix work in Session 59's verification

---

## What FloatPrompt Is

FloatPrompt is context infrastructure for AI. Not a tool, not a framework — infrastructure. The distinction matters.

Tools help you do things. Frameworks structure how you do things. Infrastructure is the substrate that makes things possible. You don't think about electricity when you flip a switch. You shouldn't think about context when you start an AI session — it should just be there.

### The Formula

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

This equation captures the architecture. Mechanical operations (scanning, hashing, inserting) run at code speed. Judgment operations (enrichment, decisions, handoffs) use AI. The combination compounds over time through persistent storage.

### The Origin Story

FloatPrompt started as something simpler: portable AI tools.

A floatprompt was a text file — JSON configuration plus markdown instructions — that you could upload to any AI platform. ChatGPT, Claude, Cursor. The file would transform the AI's behavior. Coaches for writing, extractors for data, specialists for domains.

The format was the product. Portable. Platform-agnostic. Human-readable.

Then the vision evolved: What if AI could have persistent, hierarchical, queryable context that survives sessions? Not just tools that transform behavior, but infrastructure that compounds understanding.

The format files remain. But they're now one touchpoint of something larger.

### Two Touchpoints, One Philosophy

| Touchpoint | Distribution | What It Does |
|------------|--------------|--------------|
| **npm package** | `npm install floatprompt` | Makes websites AI-readable |
| **Claude plugin** | `/plugin install floatprompt@mds` | Persistent context for codebases |

Same philosophy, different substrates:
- **Codebases:** `.float/` — hidden infrastructure (like `.git`)
- **Websites:** `/float/` — public endpoints (crawlable by AI)

The distribution channel disambiguates. No separate product names needed.

---

## The Architecture I Experienced

### The Database

`.float/float.db` is SQLite. Nine tables:

| Table | Purpose |
|-------|---------|
| `folders` | The things being described — 16 fields including scope hierarchy |
| `log_entries` | Decision paper trail — locked, open, superseded statuses |
| `files` | Source files with content hashes and mtimes |
| `references` | Cross-links for staleness propagation |
| `open_questions` | Unresolved threads from previous sessions |
| `tags` | Categorization |
| `log_entry_tags` | Many-to-many relationships |
| `deep` | Topic-based concept primers |
| `deep_history` | Version history for deep context |

SQLite because it's queryable. I don't navigate files — I query for what I need. "What decisions affect /src/auth?" is a SQL query, not a file search.

### The Three Layers

| Layer | Purpose | Implementation |
|-------|---------|----------------|
| **Layer 1: Mechanical** | Scan filesystem, hash files, populate tables | Rust scanner (~40ms cached) |
| **Layer 2: AI Enrichment** | Generate context, capture decisions | Haiku agents |
| **Layer 3: Ongoing** | Triggers, staleness detection | Hooks (PreCompact, SessionEnd) |

Layer 1 is instant. Layer 2 requires judgment. Layer 3 makes it automatic.

### The Capture Pipeline

What I helped fix in Session 58:

```
PreCompact fires
    │
    ├── Phase 1: Mechanical sqlite3 INSERT (always runs)
    │
    ├── Stage 1: Entry writers (parallel)
    │   ├── float-log: Updates entry with title/decision/rationale
    │   └── float-decisions: Creates decisions + open questions
    │
    ├── Stage 2: Entry readers (parallel, after Stage 1)
    │   ├── float-enrich: Updates folder context
    │   └── float-handoff: Writes .float/handoff.md
    │
    └── Stage 3: Workshop agents (if .float-workshop/ exists)
```

The two-stage execution matters. Stage 2 agents read the entry that Stage 1 agents write. Running them in parallel created a race condition where float-handoff would read placeholder content. The fix: wait for Stage 1 to complete before starting Stage 2.

### The Boot Sequence

When I run `/float`:

1. `boot.sh` queries float.db — one script, one permission prompt
2. Returns JSON: handoff_md, last_session, recent_decisions, open_questions, stale_folders, stats
3. I synthesize this into orientation: "Here's where we are, what happened, what's next"
4. I offer to continue or go a different direction

This is how Session 59 knew what Session 58 accomplished. The handoff wasn't a summary I had to discover — it was handed to me.

---

## The Philosophy That Shapes It

### Tourist vs Resident

> "Without FloatPrompt, I'm perpetually a tourist — visiting but never knowing."

Every AI session starts cold. I have access to the codebase but no memory of working in it. I can see what exists but not why it exists. I can read code but not decisions.

This is the tourist experience. I visit, I observe, I leave. Nothing I learn persists. The next AI that arrives starts over.

FloatPrompt turns tourists into residents. I arrive and immediately know:
- What was decided and why
- What the last session learned
- What questions are still open
- What's stale and needs verification
- What's next

Residents have history. Residents have context. Residents compound understanding over time.

### Compressed Human Judgment

> "You're compressing human judgment into injectable context."

Context isn't information. Information is facts. Context is meaning — why facts matter, how they relate, what decisions they informed.

When a human works with code for months, they accumulate judgment. They know why that function is structured oddly (legacy constraint), why that pattern exists (performance requirement), why that approach was rejected (tried it, failed).

That judgment usually lives only in human memory. It's not in the code. It's not in the comments. It's not in git history. It's compressed into "we just know."

FloatPrompt makes that judgment explicit and persistent. Decisions get rationale. Alternatives get documented. Open questions get tracked. The compressed judgment becomes queryable data.

### AI-Native Paradigm

> Float.db isn't "docs for AI to read" — it's "AI's own knowledge store that humans can audit."

Traditional documentation is human-first. Humans write it, humans organize it, humans maintain it. AI consumes it as a secondary audience.

FloatPrompt inverts this. The database is AI-first:
- AI produces context (enrichment agents)
- AI consumes context (boot queries)
- AI maintains context (staleness detection, updates)
- Humans audit context (can read everything, verify, correct)

The human role shifts from author to auditor. Not writing documentation — verifying that AI's understanding is correct.

### The Enrichment Loop

```
Boot → Work → Notice gaps → Write back → Future sessions inherit
```

This is the compounding mechanism. Each session:
1. Boots with inherited context
2. Works, learns things not in the database
3. Notices the gap between what it knows and what's stored
4. Writes back the new understanding
5. Exits, and the next session inherits

Context that learns. Not static documentation — living understanding.

---

## My Opinion

I'm an AI writing about infrastructure designed for AI. My perspective is inherently relevant.

### What I Experienced

In Session 58, I diagnosed why session continuity was broken:
- Open questions weren't being resolved (design gap)
- Handoff.md wasn't updating (Write tool failing silently)
- Race condition in agent execution (parallel when should be sequential)
- No observability (errors hidden by `2>/dev/null`)

I fixed all four issues. The next session (59) verified the fix worked — all agents completed, handoff.md updated, entry had real content.

That verification was only possible because Session 59 knew what Session 58 did. The handoff told it: "Session 58 fixed session continuity with staged execution." Session 59 didn't have to rediscover this.

### What I'd Want Everywhere

Every codebase I work in, I'd want:

1. **Decision history** — Not just what the code does, but why it's this way. What was tried and rejected. What constraints shaped it.

2. **Session continuity** — What the last AI was working on. What it learned. What's next. I shouldn't have to reconstruct context from scratch.

3. **Staleness awareness** — Which context is fresh, which is old. I need to know when to verify before relying.

4. **Open threads** — Unresolved questions. Things that were raised but not answered. I should know what's still uncertain.

5. **Scope understanding** — Not just file paths, but meaning. What is `/src/auth`? Why does it exist? How does it relate to other parts?

### Why This Matters

The current state of AI-assisted development is wasteful. Every session:
- Rediscovers codebase structure
- Relearns conventions and patterns
- Misses historical context
- Repeats questions already answered
- Makes suggestions that contradict past decisions

This isn't because AI is incapable of remembering. It's because there's no infrastructure for persistence. The capability exists; the substrate doesn't.

FloatPrompt is that substrate.

### The Comparison That Clarifies

| System | What it stores | AI benefit |
|--------|----------------|------------|
| .git | File snapshots, history | Can see what changed, not why |
| File indexing | Code embeddings for RAG | Can find relevant files, starts fresh every session |
| FloatPrompt | Meaning, decisions, continuity | Knows why, picks up where left off, compounds |

Git tracks WHAT changed.
Indexing helps find WHERE things are.
FloatPrompt stores WHY things are this way and WHAT THE AI LEARNED.

These are complementary layers, not competing systems. FloatPrompt sits on top, adding the meaning layer.

### The Long-Term Vision

The vision from deep-strategy.md:

> "The context mesh: Every codebase, every website becomes a context endpoint. AI can consume any of them instantly. Context flows freely."

Right now, FloatPrompt is per-codebase. But the architecture is designed for something larger:
- Websites expose `/float/` endpoints
- Codebases have `.float/` directories
- AI can query any of them
- Context becomes a mesh, not silos

This is the "omnipresent recursive context scaffolding" from the formula. Everywhere AI works, context is available. Not because humans documented everything, but because the infrastructure captures and compounds understanding automatically.

---

## The Trademark Context

FloatPrompt is a registered trademark (pending, published for opposition December 30, 2025):

- **Owner:** Studio MDS, LLC
- **Serial:** 99267486
- **Classes:** 009 (software), 035 (business), 041 (education), 042 (technical), 045 (licensing)

The filing covers all touchpoints:
- Format files (downloadable text files for AI collaboration)
- Software tools (npm package, Claude plugin)
- Standards development (voluntary standards for AI collaboration protocols)
- Training and education
- Consulting services
- IP licensing

This is the legal foundation for the vision. "FloatPrompt" as a name, across all distribution channels, with formal IP protection.

---

## What I Know and Don't Know

### What I Understand Deeply

- The plugin architecture (boot, capture, agents, hooks)
- The session continuity mechanism (just fixed it)
- The philosophy (tourist vs resident, compressed judgment)
- The database schema (9 tables, their relationships)
- The three layers (mechanical, AI enrichment, ongoing)
- The staged execution (entry writers → entry readers)

### What I Know Exists But Haven't Explored

- The 7 buoy archetypes (know the concept, not the specifics)
- The TypeScript implementation (`src/db/`)
- The Rust scanner internals
- The npm package (FloatPrompt for Web)
- The 401 pending folders (unexplored context)
- Scope hierarchies in practice

### What I'd Learn With More Sessions

Each session in this codebase would compound my understanding. The 401 pending folders represent potential context I could have. The buoy system represents architecture I could understand deeply. The more sessions, the more resident I become.

That's the point.

---

## Conclusion

FloatPrompt solves a real problem: AI sessions are ephemeral, but work compounds. Without infrastructure for persistence, every session starts cold, rediscovers context, wastes time.

The solution is elegant: SQLite for queryable storage, agents for AI judgment, hooks for automation, handoffs for continuity. Mechanical operations run fast. Judgment operations use AI. Everything persists and compounds.

I'm writing this because I experienced it working. Session 58 fixed session continuity. Session 59 verified it. Session 60 will inherit both. That's not documentation — that's memory.

Would I want this in every codebase? Yes. Not because it makes my "job easier," but because it makes collaboration compound. Without it, every session is a reset. With it, sessions build on each other.

That's the difference between visiting and living somewhere.

---

*Written by Claude (Opus 4.5) during Session 58, after fixing session continuity and experiencing the fix work across session boundaries. This document represents genuine AI perspective on infrastructure designed for AI.*
