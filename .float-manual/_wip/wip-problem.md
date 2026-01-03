# The Problem We're Solving

> **Note:** `.float/` in this doc refers to the TARGET structure we're building. The current `.float-old/` in this repo is stale (old structure).
>
> **Storage evolution:** The flat file structure shown here is Phase 1 (prototyping). SQLite becomes the source of truth in Phase 2-3. See `wip-sqlite.md` for full architecture.

**The invisible OS for AI.**

FloatPrompt is not a file format. Not a CLI tool. It's a **recursive context system** that installs into any project and evolves with it.

---

## The Problem

AI agents need to understand projects quickly and deeply. Currently:
- AI starts fresh every session (no memory)
- Context is scattered across files
- No standard structure for AI to read/write
- Rich understanding takes time to rebuild

## The Solution

`.float/` — a structural context system that:

1. **Boots fast** — AI gains project awareness in seconds
2. **Navigates easily** — maps and nav files let AI traverse structure
3. **Goes deep when needed** — context files provide rich understanding
4. **Is writable** — AI can update context as it learns
5. **Scales** — works for 10 files or 10,000 files

## The Mechanism

FloatPrompt is an information retrieval system optimized for AI token economy.

**The principle:**
```
Goal: Minimum tokens → Maximum accuracy
Method: Right information → Right time
```

**Archival science lens:**

Borrowed from archival "arrangement and description":
```
Collection → Series → File → Item
```

Each level has:
- **Compression** — Less detail than level below
- **Pointers** — Can always drill down
- **Description** — Routing signal ("do I need to go deeper?")

**The token math:**

| Approach | Tokens | Result |
|----------|--------|--------|
| Read everything | 10,000+ | Noise, confusion, context overflow |
| Read with structure | ~200 | Precise, relevant, room to work |

AI skims maps at each level, follows descriptions down, reads only what's needed.

> Structure context. Route precisely. Minimum tokens, maximum understanding.

## The Lived Problem

A single session building FloatPrompt (2026-01-02):

1. Made architecture decisions → logged to logs/
2. Decisions changed meaning → problem.md and overview.md needed updates
3. Structure changed → README.md needed updates
4. Human asked "double check everything"
5. AI manually read all files, found gaps, fixed them
6. Repeat

This took ~20 minutes of manual cross-checking. With agents: instant, automatic, parallel.

## The Architecture

```
Cloud Agents                              Local Session
     │                                         │
     ▼                                         ▼
AI orchestrates ────── .float/ ──── Claude Code reads
├── TS functions            │                  │
├── CLI commands            ▼                  ▼
└── Buoys (parallel)    boot.md          Help human build
                        (orientation)    (with full context)
```

**Agents build. Local understands. AI orchestrates both.**

```
.float/
├── boot.md              ← Orients AI on when to use TS/CLI/buoys/cognition
│
└── project/             ← Mirrors project structure
    ├── _project/        ← Root meta (special folder)
    │   ├── project-map.md
    │   ├── project-context.md
    │   └── project-logs/
    │       └── project-logs.md
    ├── src/             ← Files go directly here
    │   ├── src-map.md
    │   ├── src-context.md
    │   └── src-logs/
    │       └── src-logs.md
    └── docs/
        ├── docs-map.md
        ├── docs-context.md
        └── docs-logs/
            └── docs-logs.md
```

**The `_project/` convention:** Root needs special folder (no natural name). Other folders have files directly inside with self-describing prefixes.

**AI orchestrates.** Delegates to TS/CLI/buoys, does cognitive work.

**Markdown is interface.** What humans and Claude Code read.

## What Success Looks Like

1. Agents maintain `.float/` continuously — context always fresh
2. Human opens session → Claude Code reads boot.md → instant understanding
3. No re-explaining project structure, decisions, architecture
4. Human builds with full context, AI never asks "what framework?"
5. Works in any project (JS, Python, Rust, docs, anything)
6. Scales from solo dev to enterprise teams

## Constraints

- Must be deletable (delete `.float/` = zero trace)
- Must be human-readable (exports to markdown for GitHub/sharing; SQLite is internal)
- Must work locally (CLI fallback) AND cloud (agents at scale)
- Must be agent-writable (TypeScript maintains context via SQLite)

## What This Is NOT

- Not a chat-to-doc converter (original use case)
- Not a templating system (though we use templates to build it)
- Not a knowledge base (it's structural context, not content)
- Not RAG/vector search (retrieval vs understanding)

**RAG vs FloatPrompt:**
- RAG answers: "What chunks are similar to this query?"
- FloatPrompt answers: "What does this project mean? What decisions were made?"
- They're complementary, not competitive.

## Decision Anchor

When evaluating any feature, ask:

1. **Does this help AI understand projects faster?**
2. **Does this help AI navigate structure?**
3. **Does this help AI go deep when needed?**
4. **Does this help AI update context?**
5. **Does this scale?**

If no to all → reject.
If yes to some → evaluate tradeoffs.

## Validation Status

**The thesis has three claims:**

| Claim | Status | Evidence |
|-------|--------|----------|
| **Problem exists** | VALIDATED | Universal experience: AI asks "what framework?" every session, no persistent memory |
| **Solution works** | PARTIALLY VALIDATED | Structured context helps, but maintenance was the weak point |
| **People will adopt** | UNVALIDATED | No external users yet, internal use shows promise |

**What would kill it:**
- Maintenance burden exceeds value
- AI models solve this natively (unlimited context, built-in memory)
- A simpler solution emerges
- No one cares enough to adopt

**The agent-based architecture directly addresses the biggest risk (maintenance burden):**
- AI orchestrates, delegates to TS/CLI/buoys → efficient, parallel
- Agents run continuously → context stays fresh
- Cloud execution → scales infinitely (unlimited buoys)
- Human only sees maintained context → zero maintenance burden on user
