---
title: Artifact Map
type: map
created: 2025-12-31

human_author: @mds
human_intent: Visual navigation of document relationships

ai_model: Claude Opus 4.5
ai_notes: WHERE things are and how they connect
---

# Context Compiler — Map

**Read this first. Orients you to everything else.**

---

## The Central Insight

FloatPrompt is not a file format. It's a **context compilation pipeline**.

```
Config + Templates → Build → .md files → AI consumption
```

The `.md` files are build artifacts, not source files.

---

## Breadcrumb Warning

**These are breadcrumbs, not specs.**

All documents capture thinking at a point in time. They show evolution:
- 03 says Handlebars → 08 challenges that → 12 leans TypeScript

This is archaeology of decisions, not architecture of systems.

---

## Key Decisions (Summary)

| Decision | Status | Detail |
|----------|--------|--------|
| Use templating | **Locked** | Maintenance pain is real |
| Technology | **Locked** | TypeScript native, no Handlebars, no React |
| CLI model | **Locked** | npm (headless) + /slash (interactive) |
| Trifecta naming | **Locked** | map.md / decisions.md / context.md |
| Implementation | **Ready** | See 20-implementation-plan.md |

---

## The Trifecta (Read These First)

| File | Role | Purpose |
|------|------|---------|
| `map.md` | WHERE | **You are here** — navigation and orientation |
| `decisions.md` | WHY | Consolidated rationale for all choices |
| `context.md` | WHAT | Deep understanding of the concept |

---

## All Files (One-Line Each)

| File | Purpose |
|------|---------|
| `01-foundation.md` | FloatPrompt format primer, the problem it solves |
| `02-architecture.md` | Three layers (config → template → output), two-stage templating |
| `03-technology.md` | Initial decision: Handlebars (later challenged) |
| `04-dual-cli.md` | npm commands vs /slash commands, two execution contexts |
| `05-implementation.md` | Directory structure, configs, partials organization |
| `06-tool-templates.md` | How /float-* tools become Handlebars templates |
| `07-templating-audit.md` | Churn analysis of current 16 tools |
| `07-output-templates.md` | How nav/context files get generated |
| `08-migration.md` | Plan for converting 16 static tools to templates |
| `08-technology-reassessment.md` | Challenges 03, suggests TypeScript instead |
| `09-strategic-framing.md` | THE WHAT — product framing, invisible build system |
| `09-product-path.md` | floatprompt.com vision, web UI, API possibilities |
| `10-vision-stack.md` | THE WHY — business case, vertical labs, stability |
| `10-mds-trifecta.md` | map/decisions/structure pattern for deep context |
| `11-validation-assessment.md` | Tests vision against reality, proves/disproves |
| `12-typescript-direction.md` | Current lean: TypeScript native over Handlebars |
| `13-when.md` | WHEN to implement — triggers, sequencing, anti-triggers |
| `14-schema-first.md` | Schema before templates — implementation sequencing |
| `15-extended-trifecta.md` | Optional extensions: owners, quickstart, status, history |
| `16-float-interview.md` | Context extraction through AI-human dialogue |
| `17-mutable-immutable.md` | What AI can evolve vs what AI must preserve |
| `18-root-map-architecture.md` | Root map as THE lily pad — context constraints |
| `20-implementation-plan.md` | **THE PLAN** — 9 phases, TypeScript native, supersedes 05/06/08 |
| `examples/` | Working Handlebars examples (float-sync, partials) — outdated |

---

## Visual Structure

```
artifacts/2025-12-31-context-compiler/
│
├── TRIFECTA (read first)
│   ├── map.md              ← START HERE (navigation)
│   ├── decisions.md        ← WHY (rationale)
│   └── context.md          ← WHAT (deep understanding)
│
├── STRATEGIC LAYER
│   ├── 10-vision-stack.md      ← THE WHY (business case)
│   ├── 09-strategic-framing.md ← THE WHAT (product framing)
│   └── 11-validation-assessment.md ← PROVES/DISPROVES
│
├── CONCEPTUAL LAYER
│   ├── 01-foundation.md        ← FloatPrompt format primer
│   ├── 02-architecture.md      ← Three layers, two-stage
│   └── 10-mds-trifecta.md      ← map/decisions/structure pattern
│
├── TECHNOLOGY LAYER
│   ├── 03-technology.md        ← Initial: Handlebars
│   ├── 08-technology-reassessment.md ← Challenge: TypeScript?
│   └── 12-typescript-direction.md    ← Lean: TypeScript native
│
├── IMPLEMENTATION LAYER
│   ├── 20-implementation-plan.md  ← **THE PLAN** (supersedes 05/06/08)
│   ├── 04-dual-cli.md             ← npm vs /slash contexts
│   ├── 05-implementation.md       ← (outdated, Handlebars)
│   ├── 06-tool-templates.md       ← (outdated, Handlebars)
│   ├── 07-templating-audit.md     ← Churn analysis (still valid)
│   ├── 07-output-templates.md     ← Nav/context generation
│   └── 08-migration.md            ← (outdated, Handlebars)
│
├── PRODUCT LAYER
│   ├── 09-product-path.md      ← floatprompt.com vision
│   ├── 13-when.md              ← Triggers and sequencing
│   └── 14-schema-first.md      ← Schema before templates
│
├── EXTENSIONS LAYER
│   ├── 15-extended-trifecta.md ← Optional: owners, quickstart, status, history
│   ├── 16-float-interview.md   ← Context extraction via dialogue
│   ├── 17-mutable-immutable.md ← What AI can/cannot update
│   └── 18-root-map-architecture.md ← THE lily pad, context constraints
│
└── examples/                   ← Working Handlebars examples
    ├── system.json
    ├── float-sync.tool.json
    ├── float-sync.hbs
    ├── nav-folder.hbs
    └── partials/
```

---

## Document Relationships

```
                    ┌─────────────────┐
                    │  10-vision-stack │ ← Ultimate WHY
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
    ┌─────────────┐  ┌──────────────┐  ┌────────────┐
    │ 09-strategic│  │ 01-foundation│  │09-product  │
    │   framing   │  │              │  │   path     │
    └──────┬──────┘  └──────┬───────┘  └────────────┘
           │                │
           ▼                ▼
    ┌─────────────┐  ┌──────────────┐
    │ 02-architect│  │ 10-mds      │
    │     ure     │  │   trifecta  │
    └──────┬──────┘  └─────────────┘
           │
           ├──────────────────────────────┐
           ▼                              ▼
    ┌─────────────┐                ┌─────────────┐
    │03-technology│ ──challenges──▶│08-technology│
    │ (Handlebars)│                │reassessment │
    └─────────────┘                └──────┬──────┘
                                          │
                                          ▼
                                   ┌─────────────┐
                                   │12-typescript│ ← Current lean
                                   │  direction  │
                                   └─────────────┘
```

---

## Reading Paths

### Path A: Strategic Understanding
```
map.md → 10-vision-stack → 09-strategic-framing → 11-validation-assessment
```
Answer: Why build this? What's the product? Does it hold up?

### Path B: Technical Deep Dive
```
map.md → context.md → 02-architecture → 12-typescript-direction
```
Answer: How does it work? What's the technology choice?

### Path C: Implementation Ready
```
map.md → 20-implementation-plan.md → (start building)
```
Answer: How do I build this? **Start here.**

### Path D: Evolution of Thinking
```
03-technology → 08-technology-reassessment → 12-typescript-direction
```
Answer: How did the technology decision evolve?

---

## Entry Points by Role

| Role | Start With | Then Read |
|------|------------|-----------|
| **Executive** | map.md → 10-vision-stack | 09-strategic-framing |
| **Architect** | map.md → context.md | 02-architecture, 12-typescript-direction |
| **Implementer** | map.md → **20-implementation-plan.md** | (start building) |
| **New Claude session** | map.md | decisions.md, context.md |

---

## Related Artifacts

- `artifacts/2025-12-31-modular-floatprompt.md` — Earlier exploration, led to this artifact
