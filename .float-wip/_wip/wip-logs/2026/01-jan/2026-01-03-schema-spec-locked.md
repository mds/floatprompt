# Schema Spec Locked

**Date:** 2026-01-03
**Status:** Locked

---

## Decision

Locked the `folders` table schema with 16 fields, defined via Q&A session.

Full spec: `wip-schema-spec.md`

---

## The Schema

**Identity (3):**
- `path` — PRIMARY KEY, every folder gets a row
- `parent_path` — hierarchy (NULL for root)
- `name` — folder name

**Governance (2):**
- `type` — folder | scope | log_root | log_year | log_month
- `status` — pending | current | stale

**AI Content (2):**
- `description` — quick orientation ("the map")
- `content_md` — deeper understanding ("the context")

**Scope (3):**
- `is_scope` — boolean
- `parent_scope_path` — pointer to parent scope
- `scope_boot` — scope-specific boot context

**Mechanical (2):**
- `source_hash` — SHA-256 of children
- `last_scanned_at` — Unix timestamp

**AI Attribution (2):**
- `ai_model` — which model wrote this
- `ai_updated` — when AI last wrote

**Timestamps (2):**
- `created_at`
- `updated_at`

---

## Removed from Original Design

- `title` → redundant with first line of `description`
- `map_summary` → renamed to `description`
- `map_children` → replaced by SQLite query
- `context_what`, `context_why`, `context_patterns` → replaced by `content_md`

---

## Key Concepts Added

**AI Civilization:** The database is a structured world where AI agents operate with full understanding. Has laws (schema), governance (status), provenance (ai_model), territories (scopes), history (log_entries).

**Token Economy:** Goal isn't minimizing tokens — it's maximizing value per token. Context must be relevant, accurate, rich, and precise.

---

## Rationale

Each field was evaluated against the value test: "Does this help AI understand and operate better?"

The flat file mental model (`*-map.md`, `*-context.md`, `*-logs/`) maps directly to database fields. SQLite makes it queryable instead of navigable.

---

## Files Changed

| File | Change |
|------|--------|
| `wip-schema-spec.md` | Created — full spec with rationale |
| `wip-vision.md` | Updated schema section |
| `how-floatprompt-works.md` | Added AI civilization + token economy |
| `float-folder-structure.md` | Added SQLite mapping table |
| `wip-boot.md` | Updated session summary |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Schema implementation | TypeScript (not agent) |
| Context generation | `context_generator` (Layer 2, AI buoys) |

---

*Locked 2026-01-03 via Q&A session*
