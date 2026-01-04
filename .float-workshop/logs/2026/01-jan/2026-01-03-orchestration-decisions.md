# Orchestration Decisions Locked

**Date:** 2026-01-03
**Status:** Locked

---

## Context

Session 6 debated how AI calls generate.ts functions:
- Simple prompt approach (AI runs SQL directly)?
- MCP tools?
- CLI wrapper?

## Decisions

### O1: Where do functions live?

**Answer:** generate.ts + CLI wrapper

**Rationale:**
- Functions exported from generate.ts (testable, reusable)
- Thin CLI wraps them for Bash access
- Same code serves single-chat and fleet mode

### O2: How does AI call them?

**Answer:** Bash + CLI (not MCP)

**Rationale:**
- MCP requires running server, configuration, debugging overhead
- CLI requires: `npx float-db details /src/db` → JSON
- Same power, less infrastructure
- Claude already excellent at parsing JSON from Bash

### O3: Progress reporting?

**Answer:** Database IS progress

**Rationale:**
- `status` field already tracks: pending → current
- Query: `SELECT status, COUNT(*) FROM folders GROUP BY status`
- No special progress mechanism needed
- Both single-chat and fleet mode poll DB for status

## CLI Interface

```bash
float-db folders --depth 2 --status pending
float-db details /src/db --include-contents
float-db update /src/db --json '{"description": "...", "content_md": "..."}'
float-db max-depth --status pending
float-db scope-chain /src/db
```

## Architecture

```
generate.ts → CLI wrapper → Bash → Claude
                         → TypeScript orchestrator (fleet mode)
```

Same functions, same CLI, different orchestrator.

## Also Discussed

**Workshop as separate layer:**
- float.db is infrastructure
- Workshop is a city built on top
- Doesn't change current DB structure
- Workshop types can be added later when that layer is designed

---

*Locked 2026-01-03 session 6*
