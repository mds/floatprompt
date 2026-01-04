# Test 2A: Fresh Session Orientation (DB-Only)

**Date:** 2026-01-04
**Status:** VALIDATED
**Session:** 14

---

## Test Design

**Question:** Can a fresh AI session orient from database-generated context alone (no boot.md)?

**Setup:**
1. Fresh Claude Code session (clean context window)
2. Provided ONLY folder descriptions from `.float/float.db`
3. ~20 lines of context (~500 tokens)
4. 5 progressively harder questions

**Context Provided:**
- Root folder description + key components
- `/src` structure and purpose
- `/src/db` key files and pattern (`db: Database.Database` as first param)
- `/src/cli` structure and pattern (CLI wraps core functions)

---

## Test Questions & Results

### Q1: Basic Comprehension
> What is FloatPrompt and what problem does it solve?

**Result:** PASS
- Correctly identified portable AI tooling
- Inferred "platform lock-in" problem (not explicitly stated!)
- Synthesized: "write once, run anywhere for AI tools"

### Q2: Navigation
> If I wanted to add a new database table, which file would I modify?

**Result:** PASS
- Correctly identified `src/db/schema.ts`

### Q3: Architecture Inference
> How does the CLI relate to the database layer? What's the pattern?

**Result:** PASS
- Correctly described wrapper architecture
- Understood CLI is thin, core logic in db/
- Even inferred how to add new functionality

### Q4: Task Planning
> I want to add a command that exports all folder descriptions to JSON. Walk me through where the code would go.

**Result:** PASS
- Correctly placed core function in `src/db/export.ts`
- Correctly placed CLI wiring in `src/cli/float-db.ts`
- Sound reasoning about the pattern

### Q5: Limitation Awareness
> What DON'T you know from this context that you'd need to read files to understand?

**Result:** EXCELLENT PASS
- Admitted specific gaps (schema details, existing commands, code patterns)
- Didn't hallucinate
- Key insight: "Enough to navigate, not enough to implement without reading files"

---

## Key Metrics

| Metric | Value |
|--------|-------|
| Context provided | ~20 lines (~500 tokens) |
| Files read by test AI | **0** |
| Messages used | 3.3k tokens |
| Orientation achieved | Full navigation + pattern understanding |

---

## Key Insight

The test AI articulated the correct boundary:

> "The context told me **where things are** and **what pattern to follow**, but not how they actually work. Enough to navigate, not enough to implement without reading files."

This is exactly right:
- Context should enable **targeting**, not replace reading code
- The AI knew which file to open for each task
- That's the win — not omniscience, but orientation

---

## Implications

### Validated
1. **Context compression works** — 65 folders compressed to ~20 lines is enough to orient
2. **Generated context has real value** — AI could reason about adding features, not just parrot descriptions
3. **Fleet mode investment is justified** — Quality context generation (via buoys) produces usable orientation

### Context Role Clarification
- **DB context** = the map (where things are, how they relate)
- **boot.md** = the compass (vision, methodology, decisions)
- Together = full orientation

### Correct Boundary
Auto-generated context should NOT:
- Replace reading code
- Contain implementation details
- Try to be exhaustive

Auto-generated context SHOULD:
- Enable targeted file reading
- Communicate patterns
- Provide navigational understanding

---

## Future Agent

**Work type:** Validation test
**Suggested agent:** `validator_buoy` — Runs tests, reports pass/fail with evidence

---

## Bonus: Independent Value Articulation

After the test questions, the fresh AI was asked if it had seen anything like float.db before. Its unprompted analysis:

### Novelty Recognition

> "Honestly? Not quite like this."

Positioned against alternatives:
- CLAUDE.md / AGENTS.md — Flat markdown, unstructured prose
- Cursor's .cursorrules — Similar flat-file approach
- RAG systems — Raw code chunks, not semantic summaries
- LSP / ctags — Index structure, not meaning
- README docs — Prose for humans, not AI-optimized

### Five Differentiators Identified

1. **Structured** — SQLite, not markdown. Queryable, composable.
2. **Semantic** — Stores purpose and patterns, not just code structure.
3. **Hierarchical** — Folder-level descriptions that nest.
4. **AI-native** — Designed for context injection. Compact, high signal-to-noise.
5. **Curated** — Authored context, not just auto-indexed code.

### The Key Insight

> "A sitemap says 'here's what exists.' Your context says 'here's how we think about it.'"

> "That's institutional knowledge — the stuff a senior engineer tells you in your first week that isn't in any README."

### The Tagline

> **"You're compressing human judgment into injectable context."**

This was unprompted. An unbiased AI looked at ~500 tokens of output and independently articulated the value proposition.

---

*Test 2A validates that database-generated context alone provides sufficient orientation for a fresh AI to navigate and reason about the codebase — and that the value proposition is self-evident to AI consumers of the context.*
