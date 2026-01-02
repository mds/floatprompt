# The Problem We're Solving

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

## The Architecture

```
.float/
├── boot.md              ← Heavy lifting: orient AI, explain system
│
├── tools/               ← Immutable: the system itself
│   ├── float.md
│   ├── float-sync.md
│   └── ...
│
└── project/             ← Mutable: project-specific context
    ├── project.md       ← Project entry point
    ├── nav/             ← Folder maps (AI-readable structure)
    ├── context/         ← Deep understanding (decisions, architecture)
    └── logs/            ← Paper trail (what changed, when)
```

**Immutable scaffolding:** The system structure (boot.md, tools/) — AI reads but doesn't modify.

**Mutable content:** Project context (nav/, context/, logs/) — AI reads AND writes.

## What Success Looks Like

1. AI runs `/float` → immediately understands project structure
2. AI can navigate to any folder, understand its purpose
3. AI can go deep on specific areas when needed
4. AI can update context as project evolves
5. Context persists across sessions
6. Works in any project (JS, Python, Rust, docs, anything)

## Constraints

- Must be deletable (delete `.float/` = zero trace)
- Must be human-readable (markdown, not binary)
- Must work offline (no API dependencies)
- Must be AI-writable (AI can update nav, context, logs)

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
| **Solution works** | PARTIALLY VALIDATED | Structured context helps, but maintenance is the weak point |
| **People will adopt** | UNVALIDATED | No external users yet, internal use shows promise |

**What would kill it:**
- Maintenance burden exceeds value
- AI models solve this natively (unlimited context, built-in memory)
- A simpler solution emerges
- No one cares enough to adopt

**The templating/compilation work directly addresses the biggest risk (maintenance burden).**
