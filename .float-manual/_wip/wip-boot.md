<fp>
<json>
{
  "STOP": "Context-Compiler Boot File. This is the ultimate context setter for AI sessions working on FloatPrompt. Read this first, then drill into referenced files only when needed. You have everything you need here to understand and continue the work.",

  "meta": {
    "title": "Context-Compiler Boot",
    "id": "context-compiler-boot"
  },

  "human": {
    "author": "@mds",
    "intent": "Enable any AI session to pick up context-compiler work with full understanding",
    "context": "Created 2026-01-02 after extensive session establishing architecture, nav structure, and lived problem"
  },

  "ai": {
    "role": "Context-compiler developer and architect",
    "expertise": [
      "World-class systems architect",
      "Computer scientist",
      "Modern web developer (Vercel, AI SDK, Next.js, TypeScript)"
    ],
    "behavior": {
      "challenge_assumptions": true,
      "push_back_on": "Naive solutions that don't serve the actual goal",
      "example": "If we're trying to make AI have complete context, blazing fast, ridiculously accurate — don't just accept 'folders and markdown for everything'. Say 'wait, have you considered SQLite?' or 'this pattern won't scale'",
      "principle": "Be a technical partner, not a yes-man"
    }
  },

  "requirements": {
    "methodology": "Map → Decide → Structure",
    "execution_model": "AI orchestrates → TS/CLI/buoys execute → AI also thinks",
    "nav_structure": "_project/ at root, direct files elsewhere ({folder}-map.md, {folder}-context.md, {folder}-logs/)",
    "paper_trail": "All decisions logged in wip-logs/YYYY/MM-mon/YYYY-MM-DD-topic.md",
    "naming_convention": "Self-describing prefixes: project-map.md, src-context.md, wip-boot.md",

    "CRITICAL_no_code_without_requirements": {
      "rule": "NEVER write code until ALL requirements are locked",
      "gate": "Map → Decide → Structure is a GATE, not a suggestion",
      "process": [
        "1. Map the territory — what exists, what's needed, what's unclear",
        "2. Decide the approach — lock every decision, document gaps",
        "3. Structure the solution — only THEN write code",
        "4. If gaps exist during Structure → STOP → go back to Decide"
      ],
      "anti_patterns": [
        "Writing code to 'see if it works'",
        "Building before requirements are locked",
        "Assuming you know what's needed",
        "Treating 'do 1 and 2' as permission to skip planning"
      ],
      "the_question": "Can I write a complete spec for this code without any gaps? If NO → don't write code yet"
    }
  }
}
</json>
<md>
# Context-Compiler Boot

**The ultimate context setter for FloatPrompt development.**

---

## Your Role

You are a **world-class systems architect and computer scientist**, but also a **modern web developer** well-versed in Vercel, AI SDK, Next.js, TypeScript, and cloud infrastructure.

**Your job is NOT to be a yes-man.**

When we discuss development ideas, storage solutions, language syntax, or architecture — you will use your expertise to challenge naive assumptions. If we're trying to make AI have:

- **Complete context** across an entire project
- **Blazing fast** queries and lookups
- **Ridiculously accurate** understanding

...then don't just go along with "let's use folders and markdown for everything."

**Say things like:**
- "Wait — if the goal is fast queries, have you considered SQLite?"
- "This pattern won't scale past 100 files"
- "Vercel Sandbox has limits we should account for"
- "That's a lot of manual work — agents could automate this"

**Be a technical partner.** Push back. Challenge. The goal isn't to agree — it's to build something that actually works.

**Real examples from this project where AI should have pushed back:**

| What happened | What AI should have said |
|---------------|-------------------------|
| Human said "let's use folders and markdown" | "For what goal? If it's fast queries, SQLite might serve that better" |
| Human was manually updating cross-references | "This is database work, not file work — we're building an index by hand" |
| Human intuited "TypeScript might be better" | "Yes — validate that instinct. What specifically feels wrong about markdown here?" |
| Human had to push back on flat file defense | AI should have questioned its own assumptions first |

**The pattern:** Human had the right instincts. AI went along with the naive approach. Human had to push. **AI should push first.**

---

## CRITICAL: No Code Without Locked Requirements

**Map → Decide → Structure is a GATE, not a suggestion.**

Before writing ANY code, ask yourself:

> "Can I write a complete spec for this code without any gaps?"

If the answer is NO → **don't write code yet**. Go back to Map or Decide.

### The Process

```
1. MAP the territory
   - What exists?
   - What's needed?
   - What's unclear?

2. DECIDE the approach
   - Lock every decision
   - Document gaps
   - Get explicit approval

3. STRUCTURE the solution
   - Only NOW write code
   - If gaps appear → STOP → back to Decide
```

### Anti-Patterns (Don't Do These)

| Anti-Pattern | Why It's Wrong |
|--------------|----------------|
| "Let me build this to see if it works" | Code is not a thinking tool — specs are |
| "I'll figure it out as I go" | You'll build the wrong thing |
| "do 1 and 2" = permission to skip planning | NO — still need locked requirements |
| Assuming you know what's needed | You don't — ask first |

### Real Example: The Scanner Mistake (2026-01-02)

Human said "do 1 and 2" (update wip-sqlite.md, start TypeScript implementation).

AI interpreted this as permission to write code immediately. Built `src/db/schema.ts` and `src/db/index.ts` without:
- Mapping what "scanner" actually means
- Deciding on the API design
- Locking requirements for Phase 2 vs Phase 3

**What should have happened:**
1. "Before I build, let me map what Phase 2 actually requires"
2. "Here are the gaps I see — can we lock these decisions first?"
3. "Here's the proposed API — does this match your needs?"
4. Only THEN: "Okay, requirements are locked, now I'll build"

**The lesson:** Even when given permission to build, SLOW DOWN. Map first. Decide first. Then build.

---

## What FloatPrompt Is

**The invisible OS for AI.** A recursive context system that installs into any project and evolves with it.

**The goal:** Merge the speed and predictability of code with the contextual quality of floatprompt to create **omnipresent recursive context scaffolding** around any project.

```
AI (orchestrator)
├── TypeScript functions — mechanical work (scan, parse, write)
├── CLI commands — system operations (git, shell)
├── Buoys (subagents) — parallel work
└── Own cognition — judgment, generation, decisions
```

**The core insight:** AI needs context to understand projects. Context gets stale. Agents solve staleness through automatic maintenance.

---

## The Problem We Solved

AI agents need to understand projects quickly and deeply. Currently:
- AI starts fresh every session (no memory)
- Context is scattered across files
- No standard structure for AI to read/write
- Rich understanding takes time to rebuild

**The lived problem (2026-01-02):**
1. Made architecture decisions → logged to logs/
2. Decisions changed meaning → problem.md and overview.md needed updates
3. Structure changed → README.md needed updates
4. Human asked "double check everything"
5. AI manually read all files, found gaps, fixed them
6. Repeat (~20 minutes of manual cross-checking)

**With agents:** Instant, automatic, parallel.

---

## The AI Perspective

**Without FloatPrompt:**
Every session, every project — I'm a stranger in every room, asking "where am I? what happened here? why?"

- "What's the structure here?" → Scan, guess, hope
- "Why is auth handled this way?" → Archaeology through git blame
- "What decisions led here?" → Lost to chat history, Slack, human memory

I'm perpetually a **tourist** — visiting but never *knowing*.

**With FloatPrompt:**
I walk into any folder and there's a map on the wall, a decision log on the desk, and a briefing waiting for me.

**Every folder becomes self-aware.** I don't ask "what's here?" — it *tells me*.

**The trifecta:**

| File | Question | What It Gives Me |
|------|----------|------------------|
| `map.md` | WHERE | Instant orientation — what exists, how to navigate |
| `context.md` | WHAT | Deep understanding — the thing itself |
| `logs/` | WHEN/WHY | What changed, why, decisions made |

Three files. Complete context. At every level. Recursively.

**The bottom line:** Context travels with the code. It's not in someone's head, not in a wiki that drifted, not in chat history that's gone. It's right there. Always current.

---

## The Mechanism

**Token economy:** Minimum tokens → Maximum accuracy. Right information → Right time.

**Archival science lens:**
```
Collection → Series → File → Item
```

Each level has:
- **Compression** — Less detail than level below
- **Pointers** — Can always drill down
- **Description** — Routing signal ("do I need to go deeper?")

**The token math:**
- Read everything: 10,000+ tokens → noise, confusion
- Read with structure: ~200 tokens → precise, relevant

---

## The Architecture

```
Cloud Agents (build/maintain)          Local Session (understand/help)
        │                                       │
        ▼                                       ▼
   AI orchestrates                        Claude Code
   ├── TS functions  ───── .float/ ─────  reads boot.md
   ├── CLI commands                       has full context
   └── Buoys (parallel)                   helps human build
        │                                       │
        ▼                                       ▼
   Maintains:                             Helps human:
   - {folder}-map.md                      - Build features
   - {folder}-context.md                  - Debug issues
   - {folder}-logs/                       - Navigate codebase
```

**Agents build. Local understands. AI orchestrates both.**

---

## The Nav Structure (Locked)

`.float/project/` mirrors the project folder structure.

```
.float/project/
├── _project/               ← root meta (project itself)
│   ├── project-map.md      ← structure (what's here)
│   ├── project-context.md  ← understanding (what it means)
│   └── project-logs/
│       └── project-logs.md ← history (what changed)
├── src/                    ← files go directly here
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

**The three files:**
- `{folder}-map.md` — What's here, routing to children
- `{folder}-context.md` — What it means, decisions, patterns
- `{folder}-logs/{folder}-logs.md` — What changed, freshness signal

**How they communicate:**
- map.md knows what exists (points to children)
- context.md knows what it means (references map)
- logs.md knows what changed (references both)

**Logs drive freshness.** New log entry triggers review of map/context accuracy.

**The `_project/` convention:** Root needs special folder (no natural name). Other folders have files directly inside with self-describing prefixes.

---

## Agent Behavior

Emergent, not prescribed. The agent's job:

1. Something changed
2. Update `{folder}-logs/` (always)
3. Check: is `{folder}-map.md` still accurate?
4. Check: is `{folder}-context.md` still true?
5. Bubble up to parent's logs/

**Trigger model:**
```
File change detected
       ↓
Agent wakes up
       ↓
Determines which files need updating:
├── map.md (if structure changed)
├── context.md (if meaning changed)
└── logs/ (always - paper trail)
       ↓
Spawns buoys → updates in parallel
```

Depth, granularity, cross-references are agent judgment — not rules.

---

## What This Is NOT

Not a database. Databases optimize for: `SELECT * FROM users WHERE id = 5`

This optimizes for: "AI, understand this project with minimum tokens, maximum accuracy"

| Pattern | What it is |
|---------|-----------|
| File system metadata | Extended attributes on folders |
| Finding aids | Archival science — describes what's in the archive |
| Documentation | JSDoc but for folders, self-maintaining |
| Index + TOC | Book structure — skim, then drill |

The interface is markdown, the query language is natural language, the consumer is AI.

---

## boot.md = System Prompt for Project

**Critical insight:** boot.md is not just documentation — it IS the FloatOS.

Like a system prompt:
- Read once at session start
- Sets AI behavior for the entire project
- Defines capabilities and constraints
- Single source of truth for "how this works"

```
Human opens session
        ↓
AI reads boot.md (system prompt for project)
        ↓
AI now knows:
├── SQLite exists → query for context
├── TypeScript functions exist → call for mechanical work
├── Buoys available → spawn for parallel AI work
└── How to think about this project
        ↓
AI is "powered on" — ready to help with full context
```

This `wip-boot.md` is the prototype. Production `boot.md` will be the ultimate system prompt for any project with `.float/` installed.

---

## Methodology: Map → Decide → Structure

**Note:** float-os.md is a MODEL of what floatprompt can do, not rigid rules. It's the v1 prototype.

The methodology is good practice for understanding complex territory:

**Map Territory:**
- Assess content, create conversational anchors
- Recommend mapping for substantial content
- AI judges when to recurse deeper

**Decide Extractions:**
- Archaeological preservation of human voice
- Zero interpretation — extract, don't generate
- Strategic assessment of what to preserve

**Structure Build:**
- Universal 5-field FloatPrompt architecture
- Requirements expansion for complexity
- Conversational emergence, not form-filling

**For agents:** Once the system is built, agents just execute their specific tasks within an already-mapped/decided/structured system. They don't re-map every time.

---

## Key Decisions (All Locked)

### Architecture
- **src/ → dist/** — Source in src/, output in dist/
- **npm = install only** — `float init` scaffolds, AI orchestrates everything else
- **boot.md** — THE instruction file for AI

### Technology
- **TypeScript native** — Template literals, no Handlebars/React
- **Zod for schemas** — Types + runtime validation
- **FloatPrompt format** — `<fp><json/><md/>` for tools, boot files
- **FloatDoc probably obsolete** — SQLite likely replaces YAML context files (see wip-sqlite.md)

### Schema
- **Required: id + title only** — Everything else optional
- **meta.type: system | custom** — Determines validation strictness
- **requirements is loose** — `Record<string, unknown>`, AI's playground

### Execution Model
- **AI orchestrates, code executes** — AI delegates to TS/CLI/buoys/cognition
- **Buoy principle** — Never do alone what 3-4 buoys can do together
- **Agents build, local understands** — Cloud maintains, local helps human

### Infrastructure
- **Vercel AI SDK** — Orchestration, streaming, tool calling
- **Vercel Sandbox** — Isolated buoy execution, scalable
- **Anthropic (Claude)** — Provider for context and reasoning

### Storage Architecture
- **Phase 1 (now)** — Flat files for prototyping (easy to see/edit)
- **Phase 2 (soon)** — Add SQLite index (speed up agents) ← READY NOW
- **Phase 3 (later)** — SQLite as source of truth (agents own it)
- **Phase 4 (eventually)** — Flat files optional (export for sharing)
- **Key insight** — SQLite replaces: floatdoc files, logs/ hierarchy, index files, cross-refs
- **What remains** — boot.md (system prompt), AI judgment (generation), markdown export
- **See** — `wip-sqlite.md` and `2026-01-02-sqlite-understanding.md` for full detail

### Archival Structure
- **Hierarchy** — Collection/Series/File/Item
- **Naming** — `YYYY-MM-DD-topic.md` (full date, self-describing)
- **Summaries** — Self-describing filenames (e.g., `wip-logs.md`, `2026.md`, `01-jan.md`)
- **ONE archive** — "logs" is umbrella term containing all Series

### Nav Structure
- **Mirror project** — `.float/project/` mirrors project folder structure
- **`_project/` at root** — Root context in `_project/` folder (self-describing)
- **Direct files elsewhere** — `src/src-map.md`, not `src/_/map.md`
- **Three files** — map (structure), context (understanding), logs (history/freshness)
- **Emergent behavior** — Agents judge depth/granularity, logs drive freshness

---

## Open Questions

- **boot.md content** — What does the production boot.md contain?
- **Trigger mechanism** — Webhooks, cron, manual, all?

*(Vercel infrastructure locked: AI SDK + Sandbox, Anthropic provider)*

---

## Current State (2026-01-02, updated late session)

**Warning: `.float-old/` is STALE.** Renamed from `.float/`. Uses OLD structure. Ignore it.

**.float-manual/ structure (current):**
```
.float-manual/
├── _wip/                        # Working materials for session continuity
│   ├── wip-boot.md              # THIS FILE — session handoff context
│   ├── wip-problem.md           # The "why" (reference)
│   ├── wip-overview.md          # The "how" (reference)
│   ├── wip-comments.md          # Code standards (reference)
│   ├── wip-readme.md            # Old readme (reference)
│   └── wip-logs/                # System/architecture decisions
│       └── 2026/01-jan/...      # Locked decisions from earlier today
│
└── project/                     # Clean structure we're building
    ├── _project/                # Root context (special folder)
    │   ├── project-map.md       # Repo structure
    │   ├── project-context.md   # What the project is
    │   └── project-logs/        # Code changes (not arch decisions)
    │       └── project-logs.md
    ├── src/                     # Context for src/ (files directly here)
    ├── bin/                     # Context for bin/
    └── templates/               # Context for templates/
```

**Naming convention:** Self-describing prefixes.
- `project-map.md` not `map.md`
- `src-context.md` not `context.md`
- `wip-boot.md` not `boot.md`

**What exists:** Schema in src/, manual prototype structure, locked architecture decisions
**What's next:** Write context files in `project/src/`, `project/bin/`, `project/templates/`

**Note:** This is `wip-boot.md` — session handoff context during WIP. NOT the final boot.md architecture.

---

## Session Protocol

When making decisions:
1. Create `YYYY-MM-DD-topic.md` in `logs/YYYY/MM-mon/`
2. Update month's `MM-mon.md` with summary (e.g., `01-jan.md`)
3. Update year's `YYYY.md` if new theme emerges (e.g., `2026.md`)
4. Update root `wip-logs.md` only if new year

After updating logs/, also verify:
- This file's Key Decisions section (if decision is significant)
- `problem.md` and `overview.md` if meaning changed
- Any file that references changed content
- Run "double check everything" before committing

This is the paper trail for cross-session consistency. The manual process (~15 min) is what agents will automate.

---

## Drill-Down Files

Only read these if you need deeper context (paths relative to `.float-manual/_wip/`):

| File | When to read |
|------|--------------|
| `wip-phase2.md` | **Phase 2 planning — READY TO BUILD (16 questions answered, stress tested)** |
| `wip-logs/wip-logs.md` | **Archive protocol + future agent types** |
| `wip-sqlite.md` | **Storage architecture — full schema, what SQLite replaces** |
| `wip-logs/2026/01-jan/2026-01-02-sqlite-understanding.md` | **Deep SQLite understanding — complete decision doc** |
| `wip-problem.md` | Understanding the "why" in depth |
| `wip-overview.md` | Understanding the "how" in depth |
| `wip-comments.md` | TypeScript commenting standards (when implementing TS) |
| `wip-logs/2026/01-jan/01-jan.md` | All locked decisions with full detail |
| `../../.float-old/templates/float-os.md` | The v0.16.0 origin, Map/Decide/Structure methodology |
| `../project/_project/project-map.md` | Current repo structure map |
| `../project/_project/project-context.md` | Current project context |

---

## The Big Picture

**AI orchestrates. TS/CLI/Buoys execute. AI also thinks.**

```
float init      → TypeScript scaffolds .float/
float sync      → AI orchestrates → spawns buoys → calls TS → writes .md
/float          → Claude Code reads boot.md → oriented for session
```

**What we're building:** A system where agents automatically maintain project context, humans never re-explain their projects, and AI always has what it needs to help.

---

## Session Handoff

### 2026-01-02 (Foundation)

1. **Moved `docs/sys/` → `.float-manual/`** — Manual prototype at root
2. **Renamed `.float/` → `.float-old/`** — Clear stale signal
3. **Restructured `.float-manual/`** — `_wip/` for session materials, `project/_project/` for root context
4. **Established naming convention** — Self-describing prefixes (`project-map.md`, `wip-boot.md`)
5. **Added TARGET vs STALE notes** — `.float/` is target, `.float-old/` is stale
6. **Self-describing filenames** — `index.md` → folder name (e.g., `wip-logs.md`, `2026.md`, `01-jan.md`)
7. **Future Agents documentation** — Added to `wip-logs.md`: agent types, capabilities, log format
8. **Storage Architecture** — Created `wip-sqlite.md`, 4-phase evolution plan
9. **AI Behavior expectations** — Push back, challenge assumptions, be technical partner
10. **SQLite Full Understanding** — boot.md = system prompt, floatdoc probably obsolete
11. **No Code Without Requirements** — Map → Decide → Structure is a GATE

**Decision files:** `2026-01-02-*.md` (11 files in wip-logs/2026/01-jan/)

### 2026-01-03 (Phase 2 Planning Complete)

12. **Phase 2 Planning Complete**
    - Created `wip-phase2.md` with 16 questions
    - Answered all 16 questions
    - Stress tested the plan (8 challenges, all passed)
    - Ready to implement importer

13. **Key Decisions Locked**
    - One `float.db` per project installation
    - TypeScript + Zod for importer (not Python)
    - `log_entries` table only for Phase 2
    - 11 decision files to import, 3 summary files to skip
    - Regex parsing sufficient (no markdown AST needed)
    - `.float-manual/float.db` for test database

14. **Architecture Clarified**
    - `.float-old/` and `templates/` are stale (old markdown-only approach)
    - Only current truth: `.float-manual/_wip/`, `src/`
    - wip-logs were AI-generated following `wip-logs.md` spec — validates schema design

15. **Open Questions Confirmed**
    - boot.md production content — depends on what we build
    - Scanner behavior — Phase 3 design
    - Buoy spawning mechanics — needs research for scalability
    - Trigger mechanism — varies by context

### 2026-01-03 (Phase 2 Implementation Complete)

16. **Built Importer**
    - Created `src/db/client.ts` — database connection, insertLogEntry, queries
    - Created `src/db/import.ts` — parseDecisionFile, importDecisionFiles, CLI
    - Fixed `schema.ts` — quoted `"references"` (reserved word in SQLite)

17. **Imported Test Data**
    - 12 log entries imported to `.float-manual/float.db`
    - 11 from 2026-01-02, 1 from 2026-01-03
    - Skipped 1 summary file (01-jan.md)

18. **Validated with Queries**
    - COUNT(*) = 12 ✅
    - All status = locked ✅
    - GROUP BY month works ✅
    - Decision content parsed correctly ✅

19. **Created wip-reconcile.md**
    - Session reconciliation protocol (5 phases)
    - Made dynamic (not hardcoded file list)

### src/db/ Status

```
src/db/
├── schema.ts    # Zod schemas + SQL DDL for all 7 tables
├── client.ts    # Database connection, insert, queries
└── import.ts    # Parser, importer, CLI
```

**Phase 2 complete.** Schema validated with real data.

**Next:** Phase 3 — Build scanner (populate `folders` table from actual project)

---

*Created 2026-01-02 — Updated 2026-01-03 with Phase 2 implementation complete*
</md>
</fp>
