# AI-Native Context Architecture

**Date:** 2026-01-06
**Status:** Reference

---

## The Paradigm Shift

Most context systems are designed for humans to write, AI to read:

```
Human → writes docs → AI reads → AI works
```

Float.db inverts this:

```
AI → discovers/enriches → stores → AI reads → Human audits (occasionally)
```

**The key insight:** Float.db is solely and exclusively for AI to create, enrich, and maintain. Humans surface information on request. Export to markdown for verification. But the primary user is AI, not human.

---

## Two Paradigms

| Dimension | Human-Facing (CLAUDE.md) | AI-Native (float.db) |
|-----------|--------------------------|----------------------|
| Written by | Humans | AI (and humans initially) |
| Consumed by | AI | AI |
| Maintained by | Humans | AI |
| Human role | Author | Auditor |
| Readable format | Requirement | Export option |
| Optimization target | Human comprehension | Query speed |

---

## Implications

### 1. Markdown Is a Tax

Human-readable formatting has overhead:

```markdown
# /src/db

**Status:** current

## Description

Database layer for FloatPrompt. SQLite schema, queries, CRUD operations.
```

AI-native format is dense:

```json
{"path": "/src/db", "status": "current", "description": "Database layer for FloatPrompt. SQLite schema, queries, CRUD operations."}
```

Every header, bullet, and formatting choice is parsing overhead for no benefit. AI doesn't read with eyes. Markdown is only valuable when:
- Humans need to audit
- Complex explanations benefit from structure
- Export is explicitly requested

### 2. Binary Storage Is Correct

SQLite objections from a human-facing perspective:
- "Not git-diffable"
- "Not human-readable"
- "Can't edit in text editor"

From AI-native perspective, these aren't objections:
- Git diffs? Humans aren't reviewing context changes line by line
- Human-readable? Export when needed
- Text editor? AI writes via CLI, not editors

SQLite benefits compound:
- Sub-millisecond queries
- Structured in, structured out
- No parsing overhead
- Dense storage

### 3. Human Touchpoints Are Explicit

| Action | Purpose | Frequency |
|--------|---------|-----------|
| `/float-export [path]` | Human wants to see what AI knows | Occasional |
| `/float-verify` | Human audits AI understanding | Rare |
| Direct SQL query | Debugging, verification | Development only |
| Markdown in `content_md` | Complex explanations | When needed |

Day-to-day operation: AI queries, AI enriches, no human in the loop.

### 4. AI as Knowledge Authority

Traditional model:
- Human is the knowledge authority
- Human writes documentation
- AI consumes and follows
- Human maintains and updates

AI-native model:
- AI discovers through work
- AI enriches from session learning
- AI maintains via staleness detection
- Human verifies when needed

This doesn't mean humans are irrelevant. Humans:
- Set initial direction
- Audit AI understanding
- Correct errors when found
- Make strategic decisions

But the **maintenance burden** shifts. AI notices staleness. AI proposes updates. AI writes back. Human approves or corrects.

---

## Why This Matters

### The Enrichment Loop Unlocked

When AI is the producer AND consumer:

```
Session 1: Boot → Work → Learn → Write back (no human approval needed)
Session 2: Boot with Session 1's learning → Work → Learn more → Write back
Session 3: Boot with accumulated understanding → ...
```

No human bottleneck. Context compounds automatically.

### Optimized for AI Reasoning

AI reasoning patterns:
- "What's stale?" → SQL query
- "Scope chain for X?" → Structured traversal
- "What do I know about auth?" → Indexed lookup

Human reasoning patterns:
- Browse folder structure
- Read markdown files
- Ctrl+F search

Optimizing for AI means: queryable, dense, indexed, structured. Not: navigable, readable, formatted, prose.

### Speed Compounds

Every query AI makes benefits from optimization:
- 100 queries per session × sub-millisecond = negligible
- 100 queries per session × 100ms each = 10 seconds of latency

At scale, the speed difference between "optimized for AI" and "readable for humans" becomes significant.

---

## The "Compressed Human Judgment" Reframe

Original framing: Context is compressed human judgment — distilled understanding for AI consumption.

Deeper framing: Context is compressed **judgment** — initially from humans, increasingly from AI. Stored densely for AI. Expandable for humans when needed.

The compression serves AI. The expansion serves humans. Don't conflate the two.

---

## Practical Consequences

### For Storage Design

- Prefer binary/structured over text/markdown
- Optimize for query patterns, not browsing patterns
- Index what AI asks about frequently
- Don't add human-readability overhead to internal formats

### For Interface Design

- CLI returns JSON, not prose
- Structured input, structured output
- No "pretty printing" by default
- Human-friendly output is a flag, not default

### For Enrichment Design

- AI writes structured data, not formatted markdown
- Validation is schema-based, not human review
- Auto-enrichment doesn't need human approval for every write
- Human audits the aggregate, not each change

### For Export Design

- Export is explicit action, not default state
- Multiple export formats (markdown, JSON, summary)
- Export for verification, not daily use
- Export regenerates from source of truth (SQLite)

---

## Relationship to CLAUDE.md

CLAUDE.md is valuable. It's the "note on the door" — quick orientation for any AI session.

Float.db is the "institutional knowledge of the building" — deep, queryable, maintained context.

They coexist:
- CLAUDE.md: Human-written, project-level, static-ish
- Float.db: AI-maintained, hierarchical, dynamic

Float.db doesn't replace CLAUDE.md. It extends it for projects that outgrow a single file.

The paradigm shift is about **who maintains the deep context**. CLAUDE.md stays human-maintained. Float.db becomes AI-maintained with human oversight.

---

*AI-native context: built for AI, by AI, audited by humans.*
