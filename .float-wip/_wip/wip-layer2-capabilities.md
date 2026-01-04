# Layer 2 Capabilities — What We Actually Need

**Date:** 2026-01-03
**Purpose:** Define capabilities for AI generation layer (not preserve old patterns)

---

## The Problem

65 folders with `status='pending'`. All AI fields NULL.

We need to populate:
- `description` — Quick orientation (1-2 sentences)
- `content_md` — Deeper understanding (flexible prose)
- `type` — folder | scope | log_root | log_year | log_month
- `is_scope` — Boolean (is this a "world"?)
- `scope_boot` — Boot context for scopes
- `parent_scope_path` — Pointer to parent scope

---

## Capabilities Needed

### C1: Batch Context Generation

**What:** Given N folders, generate descriptions + content for all of them.

**Input:** List of folder paths (from `SELECT path FROM folders WHERE status IN ('pending', 'stale')`)

**Output:** For each folder: `{ description, content_md, type }`

**Considerations:**
- Could be 5 folders or 500
- Each folder is independent — parallelizable
- Token budget per folder (don't read entire codebase for one folder)

**Implementation options:**
- Vercel AI SDK `generateText` in parallel
- Vercel Sandbox for isolated execution
- Stream results as they complete

---

### C2: Scope Detection

**What:** Determine which folders are "worlds" (autonomous scopes).

**Input:** Folder metadata (path, children count, file types present)

**Output:** `{ is_scope: boolean, scope_boot?: string, parent_scope_path?: string }`

**Heuristics (code, not AI):**
- Has `package.json` → likely scope
- Has `README.md` at depth 1 or 2 → likely scope
- Is root → always scope
- Has 50+ files → consider scope

**AI judgment (when heuristics unclear):**
- "Does this folder represent a distinct domain?"
- "Would this benefit from its own boot context?"

**Considerations:**
- Could be purely heuristic (fast, deterministic)
- Could be AI-assisted (slower, more nuanced)
- Could be hybrid (heuristic proposes, AI confirms)

---

### C3: Folder Reading

**What:** Read enough about a folder to generate context.

**Input:** Folder path

**Output:** Structured summary for AI to consume

**Options:**
- A) File names only — Fast, might miss purpose
- B) File names + first N lines — Middle ground
- C) Full file contents — Complete but expensive
- D) Adaptive — More for small folders, less for huge ones

**Token budget thinking:**
- 65 folders × 4K tokens each = 260K tokens total (one big prompt? no)
- 65 parallel calls × 4K each = 4K per call (feasible)
- Or: batch into scope groups

---

### C4: Parent-Child Context Flow

**What:** Ensure children know about parent patterns, parents summarize children.

**Options:**
- A) Top-down: Generate root first, pass context to children
- B) Bottom-up: Generate leaves first, summarize upward
- C) Scopes first: Generate scope boots, then fill in children
- D) No flow: Each folder generated independently (simpler but less coherent)

**Trade-offs:**
- Top-down needs multiple passes (parent before children)
- Bottom-up might miss high-level patterns
- Independent is fastest but context might be inconsistent

---

### C5: Staleness Handling

**What:** When source changes, mark AI content as stale.

**Already built:** Scanner sets `status='stale'` when `source_hash` changes and `ai_updated` is not NULL.

**Needed:** Regeneration strategy
- Regenerate immediately on detection?
- Batch regenerations periodically?
- On-demand only (human triggers)?
- Configurable per-scope?

---

### C6: Scope Chain Traversal

**What:** Given a folder path, get the boot context chain.

**Example:**
```
/packages/web-app/src/auth
→ scope chain: [root, /packages/web-app, /packages/web-app/src/auth (if scope)]
→ boot context: root_boot + web_app_boot + auth_boot
```

**Implementation:** SQL query walking `parent_scope_path` up to NULL.

**Question:** Is this a TypeScript function or SQL view?

---

### C7: Log Entry Integration

**What:** Connect AI-generated context with decision history.

**Current:** `log_entries` table with `folder_path` column.

**Need:** Query pattern like "get folder + its decisions"
```sql
SELECT f.*, GROUP_CONCAT(l.title) as decisions
FROM folders f
LEFT JOIN log_entries l ON l.folder_path = f.path
WHERE f.path = ?
```

---

## What We DON'T Need

### Cargo Cult from Old System

| Old Pattern | Why We Don't Need It |
|-------------|---------------------|
| Duality tables | TypeScript handles conditionals naturally |
| Status output format | Return structured data, caller formats |
| 3-4 buoy limit | Vercel Sandbox has no such limit |
| MDS reporting for everything | SQLite timestamps ARE the paper trail |
| Human checkpoints everywhere | Configurable autonomy, not mandatory |
| Tool types (6 types) | These were prompt organization, not architecture |
| Markdown tool files | These become TypeScript functions |

### What Was Actually Prompt Engineering

- `STOP` directives — for Claude to read, not code
- `ai.role` / `ai.behavior` — prompt shaping, not runtime config
- Buoy prompts in markdown — become function parameters
- "Read this first" instructions — code just calls functions

---

## Architecture Questions

### Q1: Where does AI run?

**Options:**
- A) Vercel AI SDK in Node.js process (simple, local)
- B) Vercel Sandbox per-folder (isolated, scalable)
- C) AI SDK orchestrator → Sandbox workers (hybrid)
- D) External API (e.g., Anthropic direct)

### Q2: How much parallelism?

**Options:**
- A) Sequential (simple, slow for 65 folders)
- B) Fixed batch size (e.g., 10 at a time)
- C) Unlimited parallel (rate limits?)
- D) Adaptive based on API response times

### Q3: How does CLI invoke this?

**Options:**
- A) `float generate` — explicit command
- B) `float sync` — bundled with structure sync
- C) Automatic after scan detects pending
- D) Background daemon

### Q4: Autonomy levels?

**Options:**
- A) Full auto — no human approval needed
- B) Confirm on first run, auto after
- C) Always confirm scopes, auto for folders
- D) Configurable per-project

---

## Next: Answer These

Pick a question, lock an answer, move forward.

The old tools are **reference material**, not **architecture to preserve**.

---

*Rewritten 2026-01-03 — Capabilities over patterns*
