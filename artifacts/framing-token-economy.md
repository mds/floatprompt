# Framing: Token Economy & Archival Structure

**Status:** Captured 2026-01-02. Integrate into docs/sys/problem.md.

---

## The Core Insight

FloatPrompt is an information retrieval system optimized for AI token economy.

```
Goal: Minimum tokens → Maximum accuracy
Method: Right information → Right time
Structure: Archival arrangement + routing descriptions
```

**The invisible OS metaphor:**
- OS manages compute resources efficiently
- FloatPrompt manages context resources efficiently
- Both are invisible — user just sees things working

---

## The Archival Science Lens

Borrowed from archival science "arrangement and description":

```
Collection → Series → Subseries → File → Item
```

Each level has:
- **Compression** — Less detail than level below
- **Pointers** — Can always drill down
- **Description** — Routing signal ("do I need to go deeper?")

**Real-world parallels:**
- Archives: Collection → Series → File → Item
- Military intelligence: Spot reports → Daily INTSUM → Weekly → Monthly
- Accounting: Transactions → Journals → Ledgers → Financial statements
- Legal: Full opinions → Headnotes → Digests → Treatises

**The common principle:** Compression at each level, with citations/pointers that preserve drill-down capability.

---

## For FloatPrompt

One archival folder, not multiple:

```
.float/project/
├── nav/        # maps (stays)
└── archive/    # ONE place for all records
    ├── index.md       # collection-level description
    ├── decisions/     # series
    │   └── index.md   # series description
    └── sessions/      # series
        └── index.md   # series description
```

Items fold into Files. Files summarized in Series index. Series summarized in Collection index.

---

## The Token Math

**With structure:**
```
AI reads archive/index.md        →  50 tokens (map)
AI reads decisions/index.md      →  30 tokens (series map)
AI reads 2026-Q1.md frontmatter  →  20 tokens (file summary)
AI reads specific decision       →  100 tokens (the item)
                                   ─────────
                                   200 tokens to find one decision
```

**Without structure:** 10,000+ tokens reading everything, noise, confusion.

---

## Execution Model

```
AI (orchestrator)
├── TypeScript  — indexing, parsing, writing (mechanical)
├── CLI         — git, filesystem, quick operations
├── Buoys       — parallel execution
└── Cognition   — routing, summarizing, judgment
```

**For the archival system:**
- **TypeScript:** `scan()` indexes structure, `parse()` extracts frontmatter, `write()` maintains indices
- **CLI:** `git log archive/`, `find archive/ -mtime -7`, quick checks
- **AI:** Read maps, decide where to drill, generate summaries
- **Buoys:** Scan multiple series in parallel

---

## The Tagline

> Structure context. Route precisely. Minimum tokens, maximum understanding.

---

*Next session: Read this, read problem.md, integrate.*
