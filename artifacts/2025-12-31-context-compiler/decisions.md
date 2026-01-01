---
title: Context Compiler Decisions
type: decisions
created: 2025-12-31

human_author: @mds
human_intent: Consolidated WHY for all choices made

ai_model: Claude Opus 4.5
ai_notes: Single source of truth for decision status and rationale
---

# Context Compiler — Decisions

**WHY things are the way they are.**

---

## Decision Status Legend

| Status | Meaning |
|--------|---------|
| **Locked** | Decided. Do not revisit. |
| **Leaning** | Strong direction, not final until implementation proves it. |
| **Open** | Needs decision before or during implementation. |

---

## Locked Decisions

### 1. Use Templating

**Decision:** Build a templating system for FloatPrompt tools and context files.

**Alternatives considered:**
- Keep manual .md files
- Use a database/CMS
- Code generation without templates

**Rationale:**
- 16 tools with copy-pasted patterns
- Version bump = edit 16 files
- Pattern fix = edit 16 files
- Drift is inevitable

**Evidence:** See `07-templating-audit.md` for churn analysis.

**Do not revisit:** The maintenance pain is real and documented.

---

### 2. Partials/Functions for Shared Patterns

**Decision:** Extract repeated patterns (duality, buoys, footer, etc.) into reusable units.

**Alternatives considered:**
- Full tool templates with duplication
- Inheritance/extends model
- Mixins

**Rationale:**
- Same patterns appear in 12-16 tools
- One fix should propagate everywhere
- Composition > inheritance for this use case

**Do not revisit:** This is the core value of templating.

---

### 3. Dual CLI Model

**Decision:** Two execution contexts: `npm float` (headless) and `/float` (interactive).

**Alternatives considered:**
- npm only
- /slash only
- Single unified CLI

**Rationale:**
- npm: CI/CD, scripts, automation, no AI needed
- /slash: Interactive, AI judgment, human-in-loop
- Same templates power both

**Evidence:** See `04-dual-cli.md` for full breakdown.

**Do not revisit:** Both contexts have distinct, valid use cases.

---

### 4. MDS Trifecta Naming

**Decision:** Deep context anchors use `map.md` / `decisions.md` / `context.md`.

**Alternatives considered:**
- `structure.md` instead of `context.md`
- `rationale.md` instead of `decisions.md`
- Single combined file

**Rationale:**
- Each file answers one question (WHERE / WHY / WHAT)
- "Context" is clearer than "structure" for AI consumption
- "Structure" collides with folder structure, architecture concepts
- FloatPrompt is literally about context — use the native term

---

### 5. Nav Folder Structure Pattern

**Decision:** Nav topics use folders with trifecta + optional extensions, not flat files.

**Alternatives considered:**
- Flat files: `nav/api-map.md`, `nav/api-decisions.md`, `nav/api-context.md`
- Single file per topic: `nav/api.md`
- Hybrid (simple = file, complex = folder)

**Rationale:**
- Folders scale infinitely, flat files get messy
- Natural grouping — everything about `api/` is in `api/`
- Enables nesting: `nav/api/auth/map.md`
- Allows extension files beyond the trifecta

**Pattern:**
```
nav/api/
├── map.md           ← WHERE (required)
├── decisions.md     ← WHY (required)
├── context.md       ← WHAT (required)
├── auth.md          ← additional context (optional)
├── rate-limits.md   ← additional context (optional)
└── versioning.md    ← additional context (optional)
```

**AI traversal:**
1. Read `map.md` → see what's available
2. Read `context.md` → understand the whole
3. Read specific `*.md` as needed → go deeper on subtopics

**Do not revisit:** Progressive disclosure requires extensibility.

---

### 6. TypeScript Native (No Handlebars)

**Decision:** Use TypeScript template literals for all templating. No Handlebars.

**Alternatives considered:**
- Handlebars (original direction)
- EJS, Mustache, other templating engines
- React/JSX for templating

**Rationale:**
- Partials are just functions — no engine overhead
- No new syntax to learn (already know TypeScript)
- Type safety catches schema drift at build time
- Same language as CLI tooling
- Template literals are native, IDE-supported, type-checked

**Comparison:**
| Handlebars | TypeScript |
|------------|------------|
| `{{> duality}}` | `duality({...})` |
| `{{#each}}` | `.map()` |
| `{{#if}}` | `&&` or ternary |
| New syntax | Already know it |
| Runtime engine | Zero dependency |

**Evidence:** Experienced context loading pain in session — 47 files with repeated patterns. TypeScript functions solve this cleanly.

**Do not revisit:** The simpler tool wins. Template literals are boring and sufficient.

---

### 7. No React for Build System

**Decision:** React is NOT used for the build/templating system. Period.

**Alternatives considered:**
- React/JSX for component-style templates
- Other component frameworks

**Rationale:**
- This is a compilation problem, not a UI problem
- React solves: state, interactivity, rendering
- This needs: string concatenation with type safety
- Template literals do the job without dependencies
- Build system is invisible — users see .md files

**When React IS appropriate:**
- floatprompt.com product UI (if built)
- Visual tools, dashboards
- Anything with actual interactivity

**Do not revisit:** Don't add complexity for no user benefit.

---

## Open Decisions

### 8. Exact Config Schema Shape

**Status:** Open.

**Question:** What's the JSON structure for tool configs?

**Options explored:**
- Flat: `{ name, purpose, patterns: [...] }`
- Nested: `{ tool: { name, type }, patterns: { duality: true } }`
- TypeScript types as schema

**Guidance:** Schema should be minimal. Only what templates need.

**Decide when:** During Phase 1 implementation.

---

### 9. Build Tooling

**Status:** Open.

**Question:** What runs the TypeScript templates?

**Options:**
- `tsx` (fast, zero-config)
- `esbuild` (bundling if needed)
- `ts-node` (established, slower)
- Plain `tsc` + Node

**Guidance:** Start simple. `tsx` or plain Node with `--experimental-strip-types`.

**Decide when:** First implementation session.

---

### 10. Partial/Function Organization

**Status:** Open.

**Question:** How to organize shared functions?

**Options:**
- Single `partials.ts` file
- `partials/` folder with one file per partial
- Inline in a `lib/` folder

**Guidance:** Start with single file, split when it grows.

**Decide when:** During implementation.

---

### 11. Context Depth Detection Tool

**Status:** Open.

**Question:** Which tool determines when nav folders need additional context files beyond the trifecta?

**Options:**
- Extend `/float-context` (add depth analysis)
- New tool `/float-depth` (dedicated analyzer)
- Manual decision (human adds files when needed)

**Signals that might trigger depth:**
- Folder has >10 files
- High churn (frequently modified)
- Many cross-references
- Complex subdirectory structure

**Guidance:** Decide during implementation. May not need automation at all.

**Decide when:** After nav folder pattern is in use.

---

## Do Not Revisit

These are closed. If you're a future AI session, don't reopen them:

1. **Whether to use templating** — Yes. Decided. See churn analysis.
2. **Whether partials are needed** — Yes. 12-16 tools share patterns.
3. **Whether dual CLI makes sense** — Yes. Different contexts, different needs.
4. **TypeScript vs Handlebars** — TypeScript. Template literals are native, typed, zero-dependency.
5. **React for build system** — No. This is compilation, not UI. React is for floatprompt.com only.

---

## Decision Evolution

This artifact shows thinking evolving over time:

```
03-technology.md     →  Handlebars locked
        ↓
08-technology-reassessment.md  →  Wait, TypeScript might be better
        ↓
12-typescript-direction.md     →  Lean TypeScript, sketch the shape
        ↓
2026-01-01 session   →  TypeScript LOCKED, React NO
```

**What changed:** Experienced the context loading pain firsthand. Read 47 template files that follow the same pattern. Felt the context window ceiling. TypeScript template literals solve this without new syntax or dependencies.

This is intentional. Breadcrumbs capture the journey, not just the destination.
