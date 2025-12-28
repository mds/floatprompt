---
title: FloatSystem Genesis Session
type: session-summary
status: complete
created: 2025-12-28

human_author: MDS
human_intent: Transfer full session context to future AI sessions
human_context: Deep 4+ hour conversation developing FloatSystem architecture from scratch

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Comprehensive handoff document. Read this to understand all FloatSystem decisions and rationale.
---

# FloatSystem Genesis Session

## What We Built

FloatPrompt is "the invisible OS for AI." Feed a single `system.md` to any AI, it boots up, penetrates folder structure, builds rich context, becomes aware of everything.

**One file turns the lights on.**

## The Core Insight

Text files are to AI what binary is to computers. The atomic unit of machine understanding.

FloatSystem defines the instruction set:
- How to structure context
- How to encode behavior
- How to maintain awareness
- How to pass understanding between sessions and agents

## Key Decisions Made

### 1. YAML over JSON for FloatDoc

**Decision:** Use YAML frontmatter, not `<fp><json>` tags, for document context.

**Why:**
- FloatDoc provides context (mutual understanding)
- FloatPrompt modifies behavior (AI instructions)
- YAML is lighter, more readable, better for "skimming"
- `<fp>` tags reserved for behavioral tools only

### 2. Flat YAML, No Nesting

**Decision:** `human_author` not `human.author`

**Why:**
- Nesting is easy to get wrong (indentation errors)
- Flat is scannable
- Prefixes (human_, ai_) create logical grouping without hierarchy

### 3. The 10 Fields

```yaml
title:          # What is this
type:           # Category
status:         # Current state
created:        # When born

human_author:   # Who made it
human_intent:   # Why it exists
human_context:  # Background

ai_model:       # Which AI touched it
ai_updated:     # When AI last updated
ai_notes:       # AI observations
```

Unprefixed = document metadata
human_ = human attribution
ai_ = AI attribution

### 4. Simple File Names

**Decision:** `system.md`, `float.md` — no underscores, no prefixes

**Why:**
- Next.js uses `index.tsx` not `_index.tsx`
- Simpler is better
- Universal compatibility

### 5. Everything is .md

**Decision:** All files are markdown, differentiated by content not extension.

**Why:**
- Works everywhere
- No tooling dependencies
- AI understands markdown natively

### 6. The Pilot Principle

**Human = Pilot. AI = Crew.**

| Role | Human | AI |
|------|-------|-----|
| Decides | ✓ | |
| Approves | ✓ | |
| Creates files | | ✓ |
| Maintains docs | | ✓ |
| Logs sessions | | ✓ |
| Flags issues | | ✓ |

**Human decides. AI executes.**

This is the core contract. AI does almost all heavy lifting. Human steers.

## The Six Components

| Component | File | Purpose |
|-----------|------|---------|
| FloatStructure | (architecture) | Overall OS |
| FloatFolder | folder + float.md | Folder pattern |
| FloatSystem | `system.md` | Boot loader |
| FloatIndex | `float.md` | Navigation |
| FloatDoc | YAML frontmatter | Document context |
| FloatPrompt | `<fp>` tags | Behavioral tools |
| FloatLog | `sessions/` | Activity history |

## The Penetration Sequence

When AI receives `system.md`:

1. Read system.md → behavioral rules, structure map
2. Follow map to each float.md → folder purposes
3. Skim floatdoc frontmatter → document understanding
4. Read recent session logs → recent activity, handoff context
5. Build mental model → full project awareness
6. Ready for any task → complete context
7. Monitor and maintain → flag issues, suggest updates
8. Log session before ending → record activity, leave handoff

**Result:** ~3100 tokens = complete project awareness for 50-file project

## What Was Created

### Specifications (artifacts/)

| File | Purpose |
|------|---------|
| `floatdoc-specification.md` | YAML frontmatter format |
| `floatsystem-specification.md` | system.md boot loader format |
| `floatstructure-specification.md` | Root OS architecture |
| `floatlog-specification.md` | Session logging format |
| `floatprompt-vision-2025-12-28.md` | Vision document |

### Context Files (CLAUDE.md)

- Root CLAUDE.md (248 lines, full repo context)
- artifacts/2025/CLAUDE.md (TOC for 113 historical files)
- docs/CLAUDE.md
- docs/philosophy/CLAUDE.md
- dev/CLAUDE.md
- experimental/CLAUDE.md

## What Was Deferred

These concepts exist but don't need immediate implementation:

- `.float/` hidden config folder
- `behavior.md` subfolder behavioral modifier
- FloatFolder as a named/marketed concept
- FloatStructure as a named/marketed concept
- Templates system

The core (system.md, float.md, floatdoc frontmatter, sessions/) is solid and complete.

## Stress Tests Passed

FloatDoc format was validated against 8 scenarios:

1. Personal journal entry
2. AI transcript (human questions, AI answers)
3. Social media post archive
4. External article (archived)
5. Living documentation
6. Email correspondence
7. Course curriculum
8. Collaborative document

All scenarios handled cleanly with the 10-field format.

## Token Efficiency

| Component | Tokens |
|-----------|--------|
| system.md | 300-500 |
| float.md (per folder) | 30-50 |
| floatdoc frontmatter | 40-60 |
| session log | 50-150 |

Structure IS compression. Conventions eliminate verbosity.

## For the Next AI

If you're reading this in a fresh session:

1. **Read system.md first** (when it exists) — it's the boot loader
2. **The vision is simple:** One file turns the lights on
3. **FloatDoc ≠ FloatPrompt:** Context vs behavior
4. **Human decides, AI executes:** Don't wait for permission to maintain
5. **Token efficiency matters:** Rich context, small footprint

The specifications are drafts. They need real-world validation. But the architecture is sound.

## Session Statistics

- Duration: ~4 hours
- Files created: 16
- Lines added: 2706
- Commit: `5d18fd5`
- Pushed to: github.com/mds/floatprompt

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
