---
title: Strategic Framing
type: vision
created: 2025-12-31
status: foundational

human_author: @mds
human_intent: Ground all technical decisions in the actual goal
human_context: Clarification provided mid-session that reframes everything

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: This document should be read before any implementation decisions. Technology choices are downstream of this.
---

# Strategic Framing

What we're actually building and why it matters.

---

## The Goal

**Deep, rich contextual enhancement for any folder structure.**

Not a file format. Not a CLI tool. Not a templating system.

A **recursive contextual system** that:
- Installs into any project
- Evolves with the project
- Gives AI instant, accurate understanding
- Stays fresh automatically

---

## The Big Picture

```
FloatPrompt (stable, open source)
        ↓
    npm install
        ↓
Any folder structure gets rich, evolving context
        ↓
Platform for verticals (legal, research, docs, etc.)
        ↓
Knowledge work transformed
```

### Phase 1: Core System
- `npx floatprompt init` → `.float/` appears
- `/float-*` commands maintain context
- Works in any project, any language

### Phase 2: Stability & Open Source
- Predictable, well-documented
- Community adoption
- Bug reports → improvements

### Phase 3: Verticals
- "FloatPrompt for Legal"
- "FloatPrompt for Research"
- "FloatPrompt for Docs"
- Built on stable core

### Phase 4: Product
- floatprompt.com
- Visual tools
- Hosted offerings
- Next.js + Vercel (your stack)

---

## What Stability Requires

| Requirement | What It Means |
|-------------|---------------|
| **Predictable output** | Same input → same `.md` every time |
| **Easy to debug** | Users understand what went wrong |
| **Minimal dependencies** | Less breakage over time |
| **Clear mental model** | Users grok it in minutes |
| **Extensible** | Verticals can build on top |
| **Well-documented** | Schema, contracts, examples |

---

## What Users See vs What We Build

### Users See

```
.float/
├── float.md          # Boot protocol
├── project.md        # Project structure
├── tools/            # /float commands
└── project/
    ├── nav/          # Folder maps
    ├── context/      # Terrain maps
    └── logs/         # Session history
```

They run `/float-sync` and nav files update.
They run `/float-context` and terrain maps generate.
**They never see the build system.**

### We Build

- Config schemas (JSON)
- Build pipeline (TypeScript, Handlebars, whatever)
- Validation logic
- Extension points for verticals

**The build technology is invisible to users.**

---

## Implication for Technology Choices

### What Matters

| Decision | Impact |
|----------|--------|
| **Config schema** | How tools are defined (users see this) |
| **Output format** | `.md` with `<fp>` tags (users see this) |
| **Extension model** | How verticals build on top (users see this) |
| **Documentation** | How people learn (users see this) |

### What Doesn't Matter (to users)

| Decision | Impact |
|----------|--------|
| Build language | TypeScript, Handlebars, shell — invisible |
| Partial syntax | `{{> foo}}` vs `${foo()}` — invisible |
| File structure of source | `src/tools/*.ts` vs whatever — invisible |

---

## The Real Work

### 1. Schema & Contracts

Define clearly:
- What a tool config must have
- What's optional
- What values are valid
- How tools relate to each other

### 2. Validation

Fail fast with clear errors:
- "Missing required field: STOP"
- "Invalid buoy configuration"
- "Unknown tool type: foo"

### 3. Documentation

For users:
- How to install
- How to use commands
- How to customize

For vertical builders:
- How to create custom tools
- How to extend the schema
- How to publish extensions

### 4. Predictability

Same input → same output. Always.
- Deterministic builds
- No random IDs
- Sorted outputs
- Reproducible

---

## Your Stack Alignment

| Layer | Technology | Why |
|-------|------------|-----|
| **Distribution** | npm | Standard for web dev |
| **Build** | TypeScript | You maintain it, type safety helps |
| **Product** | Next.js + Vercel | Your stack, excellent for this |
| **Config** | JSON | Universal, validatable, tooling exists |
| **Output** | Markdown + `<fp>` | Already decided, works |

---

## What This Means for Current Work

### Context Compiler Artifact

The templating discussion is valid but **downstream**. The real questions:

1. **What's the schema?** — Define tool config structure
2. **What's the contract?** — Required vs optional fields
3. **What's the validation?** — How do we catch errors early
4. **What's the extension model?** — How do verticals build on top

### Technology Choice

**Use TypeScript** — not because it's the best templating language, but because:
- You'll maintain it
- Type safety catches errors
- Same language as the CLI
- Users never see it anyway

---

## Success Criteria

FloatPrompt is successful when:

1. **Install works** — `npx floatprompt init` in any project
2. **Commands work** — `/float-*` reliably maintains context
3. **Output is consistent** — Same project → same context
4. **Docs are clear** — New users productive in 10 minutes
5. **Extensible** — Someone builds "FloatPrompt for X"
6. **Stable** — Breaking changes are rare and documented

---

## Next Steps (Reframed)

| Priority | Task | Why |
|----------|------|-----|
| 1 | Define tool config schema | Foundation for everything |
| 2 | Implement one tool end-to-end | Prove the system works |
| 3 | Document the schema | Enable early adopters |
| 4 | Migrate remaining tools | Complete the system |
| 5 | Extension documentation | Enable verticals |

The templating technology (TypeScript, Handlebars, etc.) is decided in step 2 — whatever works reliably.

---

## Key Insight

> **The build system is invisible. The schema is the product.**

Users don't care how `.md` files are generated. They care that:
- They're correct
- They're consistent
- They're useful
- They're maintainable

Focus on schema, contracts, and documentation. The rest is implementation detail.
