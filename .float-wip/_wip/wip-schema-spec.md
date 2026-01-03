# Schema Spec

**Date:** 2026-01-03
**Status:** Locked

Schema for `folders` table — 16 fields defined via Q&A session.

---

## Fields

### 1. `path`

**What it is:** The unique identifier for each folder.

**Questions:**
- Is `/` the root (the project itself)?
- Does every folder get a row, or only folders with meaningful context?

**Answer:**
- Yes, `/` is the project root (whatever directory `.float/` is installed in)
- Every folder gets a row — consistency beats optimization
- Some rows will be sparse (no AI content) but schema is uniform
- No special logic for "is this folder important enough?"

**Decision:** LOCKED — `path` is PRIMARY KEY, every folder gets a row, `/` is root

---

### 2. `parent_path`

**What it is:** Points to the parent folder.

**Flat file equivalent:** The folder structure itself (bin/ is inside project/).

**SQLite translation:**
- `/src/auth` has `parent_path = '/src'`
- `/src` has `parent_path = '/'`
- `/` (root) has `parent_path = NULL`

**Decision:** LOCKED — Mechanical, derived from path. Enables "get children of X" queries.

---

### 3. `name`

**What it is:** The folder's name.

**Flat file equivalent:** The folder name itself (bin, src, auth).

**SQLite translation:**
- `/src/auth` has `name = 'auth'`
- `/bin` has `name = 'bin'`
- `/` has `name = ''` or `'root'` (TBD)

**Decision:** LOCKED — Mechanical, derived from path. Last segment of the path.

---

### 4. `type`

**What it is:** What kind of folder this is.

**Flat file equivalent:** Implicit in the structure:
- Regular folders = most things
- Log folders = `*-logs/2026/01-jan/`
- Scopes = folders that are "worlds" (like `/packages/web-app`)

**SQLite translation:** Enum field with values:
- `folder` — regular project folder
- `scope` — autonomous scope (a "world")
- `log_root` — like `project-logs/`
- `log_year` — like `2026/`
- `log_month` — like `01-jan/`

**Decision:** LOCKED — AI-determined or heuristic. Enables filtering by folder type.

---

### 5. `status`

**What it is:** Governance signal — can AI trust this context?

**Flat file equivalent:** No direct equivalent. In flat files, you'd have to check file dates manually.

**SQLite translation:** Enum field with values:
- `pending` — No AI content yet (Layer 1 only, scanner created the row)
- `current` — AI content is fresh (written after last source change)
- `stale` — Source changed since AI last wrote (needs refresh)

**Why it matters:** A cold AI session needs to know instantly: "Should I trust this context, or should I re-read the source?" This is governance for the AI civilization.

**Decision:** LOCKED — Computed/updated by system. Essential for AI trust.

---

### 6. `description`

**What it is:** Quick orientation — "what's here."

**Flat file equivalent:** The content of `bin-map.md`, `src-map.md`, etc.

**SQLite translation:** Text field. AI-generated. One-liner or short paragraph.

**Example:** "CLI entry points for float commands. Contains floatprompt.js."

**Decision:** LOCKED — AI-generated (Layer 2). The "map" content.

---

### 6. `content_md`

**What it is:** Deeper understanding — "what it means."

**Flat file equivalent:** The content of `bin-context.md`, `src-context.md`, etc.

**SQLite translation:** Text field. AI-generated. Flexible prose — patterns, relationships, insights, anything that helps AI understand this folder.

**Example:** "The bin/ folder contains the CLI entry point that gets installed globally via npm. It delegates to TypeScript functions in src/. The scaffold command creates .float/ in user projects..."

**Decision:** LOCKED — AI-generated (Layer 2). The "context" content.

---

### 7. `is_scope`

**What it is:** Boolean flag — is this folder an autonomous scope (a "world")?

**Flat file equivalent:** No direct equivalent. In flat files, scopes would have their own boot context file.

**SQLite translation:** Boolean. When TRUE, this folder:
- Gets its own boot context (`scope_boot`)
- Can spawn its own buoy teams
- Is a boundary for context traversal

**Example:** `/packages/web-app` might be a scope in a monorepo.

**Decision:** LOCKED — AI-determined (Layer 2). Enables hierarchical scoping.

---

### 8. `parent_scope_path`

**What it is:** Pointer to the parent scope.

**Flat file equivalent:** The folder hierarchy, but only for scopes.

**SQLite translation:**
- If `/packages/web-app/src/auth` is a scope, and `/packages/web-app` is also a scope, then `parent_scope_path = '/packages/web-app'`
- Different from `parent_path` — skips non-scope folders in between

**Decision:** LOCKED — Computed when scope is identified. Enables scope chain queries.

---

### 9. `scope_boot`

**What it is:** Boot context specific to this scope.

**Flat file equivalent:** Would be a `scope-boot.md` file inside the scope folder.

**SQLite translation:** Text field. Like a mini boot.md for this scope. AI reads this when entering this scope.

**Example:** "This is the web-app package. Uses React 18, TypeScript strict mode. Auth is in src/auth/..."

**Decision:** LOCKED — AI-generated (Layer 2). Only populated when `is_scope = TRUE`.

---

### 10. `source_hash`

**What it is:** Fingerprint of the folder's contents for change detection.

**Flat file equivalent:** No equivalent — this is a mechanical optimization.

**SQLite translation:** SHA-256 hash of immediate children (their paths + their hashes). Not recursive — staleness bubbles up naturally.

**Decision:** LOCKED — Mechanical (Layer 1). Scanner computes this.

---

### 11. `last_scanned_at`

**What it is:** When the scanner last looked at this folder.

**Flat file equivalent:** No equivalent.

**SQLite translation:** Unix timestamp. Used with `source_hash` for staleness detection.

**Decision:** LOCKED — Mechanical (Layer 1). Scanner sets this.

---

### 12. `ai_model`

**What it is:** Which AI model generated the description/content.

**Flat file equivalent:** No equivalent (could be in frontmatter).

**SQLite translation:** String like "claude-3-opus" or "claude-sonnet-4".

**Decision:** LOCKED — Set by Layer 2 when AI writes to this row. Attribution.

---

### 13. `ai_updated`

**What it is:** When AI last wrote to this row.

**Flat file equivalent:** File modification time.

**SQLite translation:** Unix timestamp. Different from `updated_at` which could be mechanical updates.

**Decision:** LOCKED — Set by Layer 2. Tracks AI freshness separately from scan freshness.

---

### 14. `created_at`

**What it is:** When this row was created.

**Flat file equivalent:** File creation time.

**SQLite translation:** Unix timestamp. Set once when scanner first sees folder.

**Decision:** LOCKED — Mechanical (Layer 1).

---

### 15. `updated_at`

**What it is:** When this row was last modified (any field).

**Flat file equivalent:** File modification time.

**SQLite translation:** Unix timestamp. Updated on any change (scan or AI).

**Decision:** LOCKED — Mechanical. Standard timestamp field.

---

## Columns to Remove (from current schema)

### `map_summary`

**Replaced by:** `description`

**Rationale:** Same purpose — quick orientation. Renamed for clarity.

---

### `map_children`

**Replaced by:** SQLite query

**Rationale:** `SELECT * FROM folders WHERE parent_path = '/src'` gives you children. No need to store a JSON array of children — the database already knows the hierarchy.

---

### `context_what`

**Replaced by:** `content_md`

**Rationale:** Over-structured. "What" and "why" are artificial separations. AI should write flexible prose that captures whatever matters.

---

### `context_why`

**Replaced by:** `content_md`

**Rationale:** Same as above. The "why" can be part of the prose.

---

### `context_patterns`

**Replaced by:** `content_md`

**Rationale:** Patterns can be mentioned in prose. A JSON array of pattern names is less useful than natural language describing how patterns are used.

---

## Summary

The new `folders` table has 16 fields:

**Identity (3):**
- `path` — PRIMARY KEY
- `parent_path` — hierarchy
- `name` — folder name

**Governance (2):**
- `type` — folder | scope | log_root | log_year | log_month
- `status` — pending | current | stale (can AI trust this?)

**AI Content (2):**
- `description` — the "map" (quick orientation)
- `content_md` — the "context" (deeper understanding)

**Scope (3):**
- `is_scope` — boolean
- `parent_scope_path` — pointer to parent scope
- `scope_boot` — scope-specific boot context

**Mechanical (2):**
- `source_hash` — change detection
- `last_scanned_at` — scan timestamp

**AI Attribution (2):**
- `ai_model` — which model wrote this (provenance)
- `ai_updated` — when AI last wrote

**Timestamps (2):**
- `created_at`
- `updated_at`

**Removed (5):**
- `map_summary` → `description`
- `map_children` → query
- `context_what` → `content_md`
- `context_why` → `content_md`
- `context_patterns` → `content_md`

---

## The Token Economy

This schema operates in a **token economy** — but the goal isn't minimizing tokens, it's **maximizing value per token**.

Every field passes the value test:

> **"Does this help AI understand and operate better?"**

If yes → worth the tokens.
If no → cut it.

**What makes context valuable:**
- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluff

The schema enables all four:
- **Relevant** → `description` for quick hits, `content_md` for depth
- **Accurate** → `status` tells AI if it can trust this
- **Rich** → `content_md` can hold as much detail as needed
- **Precise** → AI writes it, AI reads it — same language

---

## The Mental Model

This isn't just a database. It's an **AI civilization**:

- **Laws** — The schema defines what exists
- **Governance** — `status` tells AI what to trust
- **Provenance** — `ai_model` + `ai_updated` tell AI who wrote what, when
- **Territories** — Scopes are autonomous worlds within worlds
- **History** — `log_entries` are the paper trail of decisions
- **Maps** — `description` is quick orientation
- **Deep Context** — `content_md` is full understanding

A cold AI session can land anywhere and instantly know:
1. Where am I?
2. Can I trust this context?
3. Who wrote it and when?
4. What scope am I in?
5. What decisions have been made here?

---

*Spec locked 2026-01-03 via Q&A session*
