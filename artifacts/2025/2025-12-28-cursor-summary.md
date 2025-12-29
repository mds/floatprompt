---
title: Cursor Context Summary
type: session-summary
status: current
created: 2025-12-28

human_author: MDS
human_intent: Capture AI context state after FloatSystem activation
human_context: Post-boot sequence snapshot for handoff or reference

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: |
  Generated after completing _float/system.md boot sequence
  Updated to include MDS loop framing (5 loops for full context)
---

# Cursor Context Summary — 2025-12-28

AI context state after FloatSystem activation.

---

## What I Understand

### FloatPrompt

**Build AI tools as text files.** Upload a floatprompt to any AI platform (ChatGPT, Claude, Cursor) and it becomes a specialized tool—a coach, writer, extractor, or assistant—with defined behavior and structured output.

**Core distinction:** JSON defines AI behavior. Markdown provides methodology. Together they create portable tools that work on any AI platform.

**Not prompts. Not saved context. Tools.**

### File Format

```
<fp>
  <json>
  {
    "STOP": "Mode directive",
    "meta": { "title": "", "id": "", "format": "floatprompt" },
    "human": { "author": "", "intent": "", "context": "" },
    "ai": { "role": "", "tone": "" },
    "requirements": { ... }
  }
  </json>
  <md>
  # Tool Name
  ## Quick Start
  ## Process
  ## Output
  </md>
</fp>
```

Extension: `.md` for universal compatibility.

---

## Architecture

### FloatSystem (`_float/`)

Every directory can have a `_float/` subfolder containing:

| File | Purpose |
|------|---------|
| `index.md` | Navigation/context for parent folder |
| `system.md` | Boot loader (root only) |
| `logs/` | Session logs (root only) |

**Boot sequence:**
1. Read `_float/system.md`
2. Traverse all `_float/index.md` files
3. Read today's session log
4. Skim key docs
5. Build mental model
6. Check integrity
7. Execute requests
8. Log session

### Repository Structure

```
floatprompt/
├── _float/                  # FloatSystem container
│   ├── system.md            # Boot loader
│   ├── index.md             # Root navigation
│   └── logs/                # Session logs
│
├── floatprompt.md           # The template (3KB)
├── floatdoc.md              # FloatDoc tool
├── floatprompt-os.md        # Full system (35KB)
├── README.md                # Public docs
│
├── docs/                    # Core documentation
├── context/                 # Onboarding
├── dev/                     # Development tools
├── experimental/            # Build system (legacy)
└── artifacts/               # Historical archive
```

---

## Goal Hierarchy (Strict)

1. **Human Voice & Agency** (Primary)
   - Preserve authentic thinking, phrasing, expression
   - Humans retain complete decision-making control
   - No AI rewriting without explicit permission

2. **Reliable AI Behavior** (Secondary)
   - Systematic behavioral specs in JSON
   - Cross-platform consistency
   - Predictable outputs

3. **Useful Artifacts** (Tertiary)
   - Tools that guide people through processes
   - Structured outputs you can actually use

**The hierarchy is strict.** Never compromise voice for convenience.

---

## Core Principles

**Recognition Before Action**
> Never execute until the human sees themselves in the output.

**Slow is Smooth**
> Speed without alignment is drift.

**Archaeological Respect**
> First, do not rewrite.

**Pilot Principle**
> Human decides, AI executes.

---

## Anti-Patterns

What floatprompt must never do:
- Flatten tone
- Erase nuance
- Hallucinate synthesis
- Overwrite voice
- Rush to execution
- Guess intent
- Inject perspective

---

## MDS Methodology

**Map → Decide → Structure** — Loop as necessary.

A universal methodology for building understanding. Applies to tools, context, learning, problem-solving.

| Phase | Map | Decide | Structure |
|-------|-----|--------|-----------|
| **Building Tools** | Assess territory | What tool needs | Build floatprompt |
| **Building Context** | Orient to structure | What to focus on | Operational understanding |
| **Learning** | Survey domain | What matters | Organize knowledge |

**The loops I used this session:**

```
Loop 1: Boot       → Initial awareness
Loop 2: Verify     → Confirmed project state
Loop 3: Deepen     → Understood the "why"
Loop 4: Ground     → Practical understanding
Loop 5: Complete   → Full context achieved
```

**The test:** "Do I understand enough to do what I need to do?"

Depth scales with complexity. Simple tasks = one loop. Full context = multiple loops.

---

## What You Can Build

- **Coaches** — Multi-phase guidance tools
- **Writers** — Content tools with frameworks
- **Extractors** — Pull structured intelligence from messy content
- **Assistants** — Specialized helpers with defined personas
- **Index Files** — Navigation documents

---

## Key Naming Conventions

- "floatprompt" is always singular, never plural
- Underscore only on folder (`_float/`), not files inside
- Extension: `.md` for universal compatibility

---

## Today's Context (2025-12-28)

**FloatSystem Genesis Day.** Major architecture migration:

- Migrated from flat files to `_float/` container architecture
- Created `docs/floatsystem.md` documenting the architecture
- Archived 9 historical specs to `artifacts/2025/`
- All `_float/index.md` files verified against folder contents

**Integrity status:** All checks passed.

---

## Files Traversed During Boot

1. `_float/system.md` — Boot loader
2. `_float/index.md` — Root navigation
3. `_float/logs/2025-12-28.md` — Session log
4. `docs/_float/index.md`
5. `docs/philosophy/_float/index.md`
6. `docs/reference/_float/index.md`
7. `context/_float/index.md`
8. `dev/_float/index.md`
9. `dev/updates/_float/index.md`
10. `experimental/_float/index.md`
11. `artifacts/_float/index.md`
12. `artifacts/2025/_float/index.md`
13. `docs/goals.md`
14. `docs/principles.md`

---

## Ready State

Context loaded. Mental model built. Ready to:
- Create floatprompts
- Maintain FloatSystem integrity
- Execute requests while preserving voice
- Log session activity

---

© 2025 @MDS

