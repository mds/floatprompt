# Claude Code PRD Toolkit

Templates for building apps with Claude Code. Optimized for solo developers who want structured, testable requirements that Claude can execute against.

---

## Document Precedence

When documents conflict, this is the priority order (highest to lowest):

| Priority | Document | Authority |
|----------|----------|-----------|
| 1 | `features.json` | **Execution truth** — what Claude verifies against |
| 2 | `prd.md` | **Build spec** — detailed requirements |
| 3 | `spec.md` | **Boundaries** — what's in/out of scope |
| 4 | `tech-stack.md` | **Technology** — source of truth for dependencies |
| 5 | `design.md` | **Aesthetics** — visual judgment |
| 6 | `decisions.md` | **Rationale** — why choices were made |
| 7 | `vision.md` | **Aspiration** — north star (not for execution) |

**Rule:** If `prd.md` says X and `spec.md` says Y, follow `prd.md`. If `features.json` says a feature is required, it's required — even if PRD is ambiguous.

---

## For Claude Code

The `CLAUDE.md` file (created from `CLAUDE-template.md`) contains full agent instructions. Key points:

**Session Start:** Read `CLAUDE.md` → `claude-progress.md` → `features.json` → `prd.md`

**During Implementation:**
- One feature at a time, verify before marking done
- Follow Implementation Order in PRD
- Update `features.json` status immediately after verification

**Session End:** Commit code → Update `claude-progress.md` → Leave codebase clean

**Conflict Resolution:**
- features.json > PRD > spec (for execution decisions)
- PRD Implementation Order > features.json `depends_on`
- When unsure → ask the human

> See `CLAUDE-template.md` for the full agent instructions template.

---

## Philosophy

Traditional PRDs are written for **humans to interpret**. These templates are written for **Claude to execute and verify**.

| Traditional PRD | Claude Code PRD |
|-----------------|-----------------|
| Describes intent | Describes completion criteria |
| Narrative-heavy | Table-heavy |
| Open to interpretation | Explicit and testable |
| One big document | Progressive disclosure (multiple files) |
| Read once, discussed | Read every session, referenced constantly |

---

## Two Phases: Planning vs Building

### Phase 1: You Create These First

Before Claude builds anything, **you** create the planning documents. Do them in order:

| Step | Document | What You're Deciding |
|------|----------|---------------------|
| 1 | `vision.md` | Why does this exist? What's the north star? |
| 2 | `spec.md` | What's in scope? What's out? What's the data model? |
| 3 | `tech-stack.md` | What technologies? Why these over alternatives? |
| 4 | `decisions.md` | Record the "why" for major choices (ADRs) |
| 5 | `design.md` | What should it look/feel like? |
| 6 | `prd.md` | What exactly gets built? Features, acceptance criteria. |
| 7 | `features.json` | Extract every testable feature from the PRD |
| 8 | `CLAUDE.md` | How should Claude work? What files, what rules? |
| 9 | `claude-progress.md` | Initialize empty progress log |

**Output:** A `.float/` folder with your planning docs + `CLAUDE.md` at project root.

---

### Phase 2: Claude Builds With These

Once planning is complete, Claude only needs **4 files** to start building:

| File | Why Claude Needs It |
|------|---------------------|
| `CLAUDE.md` | Entry point — tells Claude what to read and how to work |
| `claude-progress.md` | What happened in previous sessions |
| `features.json` | The checklist — what's done, what's not |
| `prd.md` | The build spec — what to build and how |

**Claude references these only when needed:**
- `spec.md` — boundary questions
- `tech-stack.md` — setup, dependency questions
- `design.md` — UI implementation details
- `decisions.md` — "why did we choose X?"
- `vision.md` — rarely needed during build

---

### The Handoff

```
You (Planning)                    Claude (Building)
─────────────────                 ─────────────────
1. vision.md
2. spec.md
3. tech-stack.md
4. decisions.md
5. design.md
6. prd.md                ───────► prd.md
7. features.json         ───────► features.json
8. CLAUDE.md             ───────► CLAUDE.md (entry point)
9. claude-progress.md    ───────► claude-progress.md

                                  Claude reads 4 files,
                                  references 5 others as needed
```

**The goal:** Don't overwhelm Claude with context. You do the thinking, Claude does the building.

---

## Files in This Toolkit

### Build-Time (Claude reads these every session)

| File | Purpose |
|------|---------|
| `CLAUDE-template.md` | **Entry point** — agent instructions, read first |
| `prd-template.md` | **Build spec** — features, acceptance criteria, implementation order |
| `claude-progress-template.md` | **Session log** — what was done, blockers, notes |
| `features-schema.json` | JSON Schema for features.json validation |
| `features-example.json` | Example features.json showing the schema in action |

### Planning (Human writes these, Claude references when needed)

| File | Purpose |
|------|---------|
| `vision-template.md` | Aspirational "why" — north star, not for execution |
| `spec-template.md` | Scope and boundaries — what it is/isn't, data schema |
| `tech-stack-template.md` | Technology choices and rationale |
| `design-template.md` | Aesthetic principles — judgment, not pixels |
| `decisions-template.md` | Architecture Decision Records (ADRs) |

---

## Recommended Project Structure

```
my-project/
├── CLAUDE.md                   ← ENTRY POINT: Agent instructions (read first)
│
├── .float/                     ← Project documentation
│   │
│   │ # Build-time (Claude reads every session)
│   ├── prd.md                  ← BUILD SPEC: Features, acceptance criteria
│   ├── features.json           ← CHECKLIST: Testable features with status
│   ├── claude-progress.md      ← SESSION LOG: What was done, blockers
│   │
│   │ # Reference (Claude reads when needed)
│   ├── spec.md                 ← BOUNDARIES: Scope, data schema
│   ├── tech-stack.md           ← TECHNOLOGY: Decisions and rationale
│   ├── design.md               ← AESTHETICS: Visual principles
│   ├── decisions.md            ← RATIONALE: ADRs
│   ├── vision.md               ← NORTH STAR: Aspirational (rarely needed)
│   └── reference/              ← SUPPORTING: Screenshots, docs, assets
│       ├── visuals/
│       ├── docs/
│       └── vendor/
│
├── src/                        ← Your code
├── .git/
└── package.json
```

**Key insight:** `CLAUDE.md` is the entry point. It tells Claude what files to read and how to work. The `.float/` folder contains the actual documentation.

---

## Workflow

### 1. Start with Vision

Copy `vision-template.md` to `.float/vision.md`. This is the aspirational "why" document.

Structure: Problem → Opportunity → Conviction → Strategy

Dream big here. This isn't for Claude to execute — it's for you to clarify your thinking.

### 2. Define the Spec

Copy `spec-template.md` to `.float/spec.md`. Define scope, boundaries, and data schema.

This establishes: what it is, what it isn't, core concepts, constraints, and data structures.

### 3. Document Tech Stack & Initial Decisions

Copy `tech-stack-template.md` to `.float/tech-stack.md`. Document your technology choices and rationale.

Copy `decisions-template.md` to `.float/decisions.md`. Record major technology decisions as ADRs.

**These happen together** because tech stack choices are decisions worth documenting. Add an ADR for each significant "why X over Y" choice.

### 4. Create the PRD

Copy `prd-template.md` to `.float/prd.md` and fill it out. This is the **build spec** that synthesizes vision + spec into actionable work.

The PRD **references** tech-stack.md for dependencies (don't duplicate). The PRD's Configuration section lists variables; tech-stack.md explains them in detail.

### 5. Define Design Principles

Copy `design-template.md` to `.float/design.md`. Capture aesthetic direction.

Principles, not pixels. Give AI judgment to work from: "minimal, Swiss-inspired" not "#F5F5F5".

### 6. Generate features.json

Extract every testable requirement from the PRD into `.float/features.json`. Features come from:

- Every row in a **Feature table** (ID, behavior, acceptance criteria)
- Every **Success Criteria** checkbox
- Every **Configuration variable** (as setup verification)
- Every **Error Handling** row (as resilience verification)

Use `features-schema.json` to validate your features.json.

### 7. Create Agent Instructions

Copy `CLAUDE-template.md` to `CLAUDE.md` (in project root, not `.float/`). Customize:

- Project overview and current status
- Directory structure for your project
- Environment variables needed
- Quick commands (dev, build, test)

This is the **entry point** for Claude. It tells Claude what to read and how to work.

### 8. Initialize Progress Log

Copy `claude-progress-template.md` to `.float/claude-progress.md`. Initialize with project metadata and empty session log.

### 9. Build with Claude

Run Claude Code. Claude reads (in order):
1. `CLAUDE.md` — how to work (entry point)
2. `claude-progress.md` — what happened before
3. `features.json` — what's done and what's not
4. `prd.md` — what to build

Claude references other docs (`spec.md`, `tech-stack.md`, `design.md`, `decisions.md`) only when needed.

### 10. Track Progress

Claude updates `features.json` status after verifying each feature. Claude updates `claude-progress.md` at the end of each session with:
- What was completed
- What's in progress
- Any blockers
- Notes for next session

### 11. Record Decisions (Ongoing)

As significant architectural decisions arise during development, add ADRs to `decisions.md`. This creates a record of "why we did it this way."

---

## PRD Template Sections

| Section | Required | Purpose |
|---------|----------|---------|
| Core Problem | Yes | 1-2 sentences grounding the "why" |
| Overview | Yes | What, who, domain, source of truth |
| Users | Yes | Who uses this and when |
| Technical Stack | Yes | Technologies and key libraries |
| Configuration | Yes | Environment variables |
| Data Schema | If applicable | Tables, fields, types |
| Features | Yes | Tables with ID, behavior, acceptance criteria |
| UI Philosophy | If applicable | Brief design direction |
| Caching & Performance | If applicable | Web apps, APIs |
| Error Handling | Yes | Graceful failure behaviors |
| Out of Scope | Yes | Explicit exclusions (prevents scope creep) |
| Implementation Order | Yes | Sequence for building |
| Success Criteria | Yes | Must/Should/Nice-to-have with checkboxes |
| Key Deliverables | Optional | Priority-ranked deliverable list |
| Design Progress | Optional | Track what's drafted vs done |
| Open Questions | Yes | Resolved and unresolved decisions |
| References | Yes | Pointers to other .float/ files |
| Setup Instructions | If applicable | Bootstrap sequence |
| Build-Ready Checklist | Yes | Confidence indicator |

---

## features.json Fields

| Field | Required | Description |
|-------|----------|-------------|
| `id` | Yes | Unique ID matching PRD (e.g., AUTH-001) |
| `area` | Yes | Category (authentication, navigation, etc.) |
| `feature` | Yes | Short name |
| `behavior` | Yes | What it does (from PRD Behavior column) |
| `acceptance_criteria` | Yes | How to verify it works |
| `priority` | No | must-have, should-have, nice-to-have |
| `status` | Yes | untested, in_progress, passing, failing, blocked, skipped |
| `verification_method` | No | manual, automated, visual, curl, browser |
| `verified_at` | No | Timestamp of last verification |
| `notes` | No | Implementation notes or blockers |
| `depends_on` | No | Feature IDs this depends on |

**Status definitions:**
- `untested` — not yet started
- `in_progress` — actively being implemented
- `passing` — verified working
- `failing` — verified broken
- `blocked` — waiting on dependency or external factor
- `skipped` — intentionally deferred

---

## Best Practices

### Do

- **Use tables** — Claude parses structure better than prose
- **Make features testable** — If you can't verify it, it's not done
- **Be explicit about Out of Scope** — Prevents gold-plating
- **Follow Implementation Order** — It's a command, not a suggestion
- **Update Design Progress** — Helps Claude understand current state

### Don't

- **Don't write prose where tables work** — Harder to parse
- **Don't mix v1 and future features** — Confuses priority
- **Don't skip acceptance criteria** — Features become unverifiable
- **Don't leave Open Questions unresolved** — Blocks build-readiness

---

## Where Things Live (Avoiding Duplication)

Some concepts appear in multiple templates. Here's the source of truth for each:

| Concept | Source of Truth | Other Docs Reference It |
|---------|-----------------|-------------------------|
| **Environment Variables** | `tech-stack.md` (full details) | PRD lists names only |
| **Data Schema** | `spec.md` (full schema) | PRD references spec |
| **Technology Choices** | `tech-stack.md` (with rationale) | PRD has summary table |
| **Exclusions/Boundaries** | `spec.md` ("What This Is Not") | PRD has "Out of Scope (v1)" for version-specific |
| **Open Questions** | `spec.md` (pre-build) | PRD (during-build, with resolutions) |
| **Design Direction** | `design.md` (full principles) | PRD has brief "UI Philosophy" |

**Rule of thumb:**
- `spec.md` = strategic decisions (what/why boundaries)
- `prd.md` = tactical decisions (how to build v1)
- `tech-stack.md` = technical decisions (with what tools)

---

## Quick Start

```bash
# Create new project with .float/ structure
mkdir -p my-project/.float/reference/{visuals,docs,vendor}

# Copy templates
cp CLAUDE-template.md my-project/CLAUDE.md              # Entry point (root)
cp vision-template.md my-project/.float/vision.md
cp spec-template.md my-project/.float/spec.md
cp tech-stack-template.md my-project/.float/tech-stack.md
cp decisions-template.md my-project/.float/decisions.md
cp prd-template.md my-project/.float/prd.md
cp design-template.md my-project/.float/design.md
cp claude-progress-template.md my-project/.float/claude-progress.md

# Edit in order (Planning Phase):
# 1. vision.md (clarify your thinking)
# 2. spec.md (define boundaries + data schema)
# 3. tech-stack.md + decisions.md (lock in technology, record ADRs)
# 4. prd.md (the build spec)
# 5. design.md (aesthetic principles)
# 6. Extract features to features.json
# 7. CLAUDE.md (customize agent instructions)
# 8. Initialize claude-progress.md

# Start building (Building Phase)
cd my-project
claude
# Claude reads CLAUDE.md first, then follows instructions
```

---

## Credits

Developed through analysis of:
- Anthropic's Claude Code best practices
- Real-world PRDs (FloatPrompt, Dropbox Docs Viewer)
- ChatPRD community guidance
- Solo developer workflows with AI coding assistants
