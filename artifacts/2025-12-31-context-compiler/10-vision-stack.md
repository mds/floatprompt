---
title: Vision Stack
type: vision
created: 2025-12-31
status: foundational

human_author: @mds
human_intent: Document the full vision — not just templating, but the context operating system
human_context: Emerged from discussion about RAG vs FloatPrompt, what this actually solves

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: This is the "why" behind everything. Read before implementation decisions.
---

# Vision Stack

FloatPrompt is not a file format. It's a **context operating system** for AI.

---

## The Gap in the Market

```
┌─────────────────────────────────────────────────────────────┐
│                     CURRENT AI CONTEXT                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Vector DBs          Chat History        IDE Context        │
│   (Pinecone, RAG)     (conversation)      (open files)       │
│                                                              │
│   "Find similar"      "What we said"      "What's visible"   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              ↓
                        WHAT'S MISSING
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   Structure           Decisions           Evolution          │
│   (what exists)       (why it's this way) (how it changes)   │
│                                                              │
│   "The map"           "The memory"        "The metabolism"   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**No one is doing this well.**

---

## RAG vs FloatPrompt: Different Problems

| RAG / Pinecone | FloatPrompt |
|----------------|-------------|
| **Retrieval** — find relevant chunks | **Structure** — know what exists and how it relates |
| **Similarity** — semantic matching | **Navigation** — intentional traversal |
| **Passive** — query → results | **Active** — context evolves with project |
| **Generic** — any text corpus | **Specific** — project understanding |
| **Stateless** — each query fresh | **Stateful** — decisions persist |

RAG answers: "What chunks are similar to this query?"

FloatPrompt answers: "What does this project mean? What decisions were made? What should I read to understand X?"

**They're complementary, not competitive.**

---

## The Difference: Understanding vs Retrieval

### RAG Response
```
Query: "How do we handle auth?"

Result: [5 text chunks mentioning "auth"]
- chunk from README.md
- chunk from old blog post
- chunk from deprecated code
- chunk from config file
- chunk from random comment
```

### FloatPrompt Router Response
```
Query: "How do we handle auth?"

Result:
Auth is handled in `src/auth/`.

Decision (2024-12-15): Using NextAuth over Clerk
Reason: Self-hosting requirements for enterprise clients

Key files:
- src/auth/config.ts (main configuration)
- src/auth/providers/ (OAuth providers)

Related: See decisions.md entry #14

Want me to read those files?
```

**The difference is understanding vs retrieval.**

---

## The Vision Stack

```
┌─────────────────────────────────────────────┐
│            VERTICAL LABS                     │
│   Legal | Research | Docs | Code | Support   │
├─────────────────────────────────────────────┤
│            CONTEXT ENGINE                    │
│   Recursive evolution, drift detection       │
├─────────────────────────────────────────────┤
│            CONTEXT ROUTER                    │
│   Intelligent traversal, layered access      │
├─────────────────────────────────────────────┤
│            FLOATPROMPT CORE                  │
│   .float/, nav/, context/, tools/            │
├─────────────────────────────────────────────┤
│            SCHEMA & CONTRACTS                │
│   Tool configs, extension points             │
└─────────────────────────────────────────────┘
```

Each layer builds on the one below. Each layer is independently valuable.

---

## Layer 0: Schema & Contracts

The foundation everything else builds on.

**What it is:**
- JSON schema for tool configs
- Required vs optional fields
- Extension points for verticals
- Validation rules

**Why it matters:**
- Stability for users
- Extensibility for verticals
- Predictability for the engine

---

## Layer 1: FloatPrompt Core

The current focus. What exists today (mostly).

```
.float/
├── system.md       # Boot protocol
├── project/
│   ├── nav/        # Structure maps
│   ├── context/    # Terrain maps
│   └── logs/       # Session history
└── tools/          # /float commands
```

**What it does:**
- `npx floatprompt init` → .float/ appears
- `/float-*` commands maintain context
- AI reads structured context on boot

**Value proposition:**
- Any AI, any project, instant context
- Portable across Claude, ChatGPT, Cursor, etc.
- Self-maintaining (with human approval)

---

## Layer 2: Context Router

Intelligent traversal of the context structure.

```
Query: "How do we handle auth?"
         ↓
   Context Router
         ↓
   Reads: .float/project/nav/*.md
         ↓
   Finds: "auth" mentioned in nav/src.md → src/auth/
         ↓
   Reads: .float/project/context/auth.md (deep context)
         ↓
   Reads: Actual files if needed
         ↓
   Returns: Precise, layered context
```

**What it does:**
- Takes a query or intent
- Navigates the context structure
- Returns layered, relevant context
- Knows when to go deeper vs stop

**How it's different from RAG:**
- Semantic navigation, not similarity search
- Structured traversal, not chunk retrieval
- Understands relationships, not just keywords

---

## Layer 3: Context Engine

Recursive evolution of the context structure.

```
Project changes
      ↓
Engine detects drift
      ↓
Updates nav/, context/
      ↓
Surfaces decisions needed
      ↓
Human confirms
      ↓
Context evolves
```

**What it does:**
- Watches for project changes
- Detects drift between context and reality
- Proposes updates
- Learns from human corrections

**The metabolism:**
- Context isn't static — it evolves
- Changes propagate intelligently
- Decisions are captured, not lost
- The system gets smarter over time

---

## Layer 4: Vertical Labs

Domain-specific tools and patterns.

```
FloatPrompt Core
      ↓
   ┌──┴──┬──────┬──────┬──────┐
   ↓     ↓      ↓      ↓      ↓
Legal  Research Docs  Code   Support
   ↓     ↓      ↓      ↓      ↓
Custom tools, custom context patterns
```

**Examples:**

### Legal
- Case file context
- Precedent linking
- Client matter structure
- Deadline tracking

### Research
- Literature maps
- Citation graphs
- Hypothesis tracking
- Method documentation

### Docs
- Content structure
- Cross-reference validation
- Version tracking
- Translation context

### Code
- Architecture maps
- Dependency graphs
- Decision records
- Technical debt tracking

### Support
- Knowledge base structure
- Ticket context
- Escalation patterns
- Resolution tracking

**Each vertical:**
- Uses the core schema
- Adds domain-specific tools
- Shares patterns back to core
- Benefits from engine improvements

---

## Why This Matters

### The Problem
AI lacks persistent, accurate, evolving project context.

### Current Solutions
- RAG: Good for retrieval, bad for structure
- Chat history: Ephemeral, unstructured
- IDE context: Proprietary, limited

### FloatPrompt Solution
- Structured: Maps, not chunks
- Persistent: Survives sessions
- Evolving: Changes with project
- Portable: Works anywhere
- Extensible: Verticals can build on it

---

## Priority Order

| Priority | Layer | Why |
|----------|-------|-----|
| **1** | Schema & Contracts | Foundation for everything |
| **2** | Core (stable) | Must work reliably before expansion |
| **3** | Context Router | Intelligent access to context |
| **4** | Context Engine | Self-maintaining context |
| **5** | Vertical Labs | Domain-specific value |

**You can't skip layers.** Each depends on the ones below.

---

## Success Metrics by Layer

### Layer 0: Schema
- Schema is documented
- Validation catches errors
- Extension points are clear

### Layer 1: Core
- Install works everywhere
- Commands work reliably
- Context stays accurate

### Layer 2: Router
- Queries return relevant context
- Navigation is intelligent
- Deep context accessible on demand

### Layer 3: Engine
- Drift detected automatically
- Updates proposed intelligently
- Human corrections improve system

### Layer 4: Verticals
- First vertical ships
- Community builds extensions
- Patterns emerge and share

---

## The Honest Assessment

**RAG solves:** "Find relevant text in a corpus."

**FloatPrompt solves:** "Give AI persistent, structured, evolving project understanding."

These are different problems. And the second one is unsolved.

You're not building a better RAG. You're building something that doesn't exist: a **context operating system** for AI.

---

## What Would Make This Work

1. **Core must be rock solid** — Before router, before engine, before verticals
2. **Schema must be extensible** — Verticals need to add without breaking
3. **Router needs to be smart** — Not just keyword matching
4. **Engine needs to be invisible** — Context evolves without manual work
5. **Verticals need clear boundaries** — What's core vs what's custom

---

## The Tagline

> **FloatPrompt: The invisible OS for AI.**

Not a file format. Not a CLI tool. Not a templating system.

A context operating system that gives any AI instant, accurate, evolving understanding of any project.
