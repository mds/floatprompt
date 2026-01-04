# Test 1: Agent-Spawned Generation Confirmed

**Date:** 2026-01-04
**Session:** 13
**Status:** Locked

---

## Hypothesis

A spawned agent using the buoy-boot file produces better context than inline generation.

---

## Method

1. Selected `/src/db` as test folder (5 TypeScript files, real code)
2. Retrieved current context from database (generated inline in Session 12)
3. Spawned dedicated agent via Task tool with:
   - Full buoy-boot (context-generator.md) as system prompt
   - Folder details including file contents
4. Compared outputs

---

## Results

| Metric | Inline | Agent-Spawned |
|--------|--------|---------------|
| Description length | 77 chars | 124 chars |
| Content word count | ~120 words | ~280 words |
| Technologies mentioned | None | better-sqlite3, SHA-256, Zod, CHECK constraints |
| Architecture details | File list only | 16-field schema, status lifecycle, transaction wrapping |
| Relationships | None | Links to /src/cli, notes orchestration role |

### Inline (shallow)

```markdown
## Key Files

- **schema.ts** — Zod schemas + SQL DDL for folders, files, log_entries
- **scan.ts** — Layer 1 filesystem scanner
```

### Agent-Spawned (deep)

```markdown
## Key Files

- **schema.ts** - Defines Zod validation schemas and SQL DDL for 5 tables:
  `folders`, `files`, `log_entries`, `references`, `open_questions`.
  The folder schema is central with 16 fields tracking description,
  content_md, status (pending/current/stale), scope detection, and source hashes.

- **scan.ts** - Layer 1 filesystem scanner. Walks directory tree, populates
  folders/files tables, computes SHA-256 hashes. Detects staleness when
  source changes after AI-generated content. Transaction-wrapped with
  smart ignore patterns (node_modules, .git, dist).
```

---

## Decision

**Hypothesis confirmed.** Agent-spawned generation with fresh context window produces significantly richer, more useful context.

Key observations:
- Agent read actual file contents (not just names)
- Agent understood implementation details
- Agent explained architectural patterns
- Agent connected folder to siblings

---

## Implication

**Fleet mode is not optional — it's required for quality.**

Single-chat inline generation spreads attention across 65 folders. Each folder gets shallow, name-inferred context.

Dedicated buoys give each folder:
- Fresh context window
- Full attention on that folder's files
- Ability to read and understand actual code
- Quality output following buoy-boot guidance

---

## Next Steps

1. Design fleet mode orchestrator (TypeScript or Task tool based)
2. Re-run generation with dedicated buoys per folder
3. Test 2: Validate the richer context actually helps fresh sessions

---

*Locked 2026-01-04 — Test 1 complete, fleet mode validated*
