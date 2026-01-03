<fp>
<json>
{
  "STOP": "Phase 3 Planning — Scanner. Map → Decide → Structure before building.",

  "meta": {
    "title": "Phase 3: Scanner Planning",
    "id": "wip-phase3"
  },

  "human": {
    "author": "@mds",
    "intent": "Plan the folder scanner before building it"
  },

  "ai": {
    "role": "Architect — no code until all questions answered and locked"
  },

  "requirements": {
    "methodology": "Map → Decide → Structure is a GATE",
    "goal": "Populate `folders` table from actual project structure",
    "questions_format": "Question → Answer → Status (open/working-theory/locked)"
  }
}
</json>
<md>
# Phase 3: Scanner Planning

**Goal:** Build scanner to populate `folders` table from project structure.

**Methodology:** Answer all questions, lock decisions, THEN build.

---

## The Problem We're Solving

Context loss.

Mid-session, AI context compacts. Nuance from earlier discussion disappears. Human has to re-explain things. This happened during this very planning session — we lost details from Q1-Q6 discussion when context compacted.

Without FloatPrompt:
- Context lives in chat history → compaction loses it → human repeats themselves
- Every new session starts from zero
- AI asks "what framework is this?" for the 1000th time
- Decisions made last week are forgotten

With FloatPrompt:
- Context lives in SQLite → persists across sessions → AI picks up where it left off
- Every session has full project understanding from moment one
- Decisions are logged, searchable, connected to the folders they affect
- Context evolves and gets richer over time

The scanner is the foundation. It creates the structure that everything else builds on.

---

## Required Reading

Before building, understand the full vision:

- **`artifacts/how-floatprompt-works.md`** — The complete vision document. Autonomous scopes, three layers, infinite scalability, the formula.
- **`wip-logs/2026/01-jan/2026-01-02-sqlite-understanding.md`** — Why SQLite, what it replaces, what it doesn't replace.
- **`wip-logs/2026/01-jan/2026-01-02-nav-structure.md`** — The mirror structure pattern (now in SQLite instead of folders).
- **`src/db/schema.ts`** — The actual schema we're populating.

---

## The /float Layered Architecture

Understanding where the scanner fits in the bigger picture:

### Layer 1: Mechanical Discovery (Code — Fast)

This is the scanner's domain:
- Walk the filesystem
- Hash files for change detection
- Detect structure (what folders exist, what files are in them)
- Populate `folders` table with path, parent_path, timestamps
- Populate `files` table with path, folder_path, content_hash
- **Pure code, no AI, runs in milliseconds**

### Layer 2: AI Generation (Buoys — Parallel)

After mechanical discovery:
- AI reads the structure from Layer 1
- Generates `map_json` — lightweight TOC of what's in each folder
- Generates `context_summary` — what this folder means, why it exists
- Hypothesizes about relationships, patterns, architecture
- **Buoys work in parallel, one per folder or scope**

### Layer 3: Ongoing Triggers

Keeps context fresh over time:
- File watchers (local development)
- Git hooks (on commit)
- Manual commands (`/float sync`)
- Session reconciliation (end of each session)

### The Key Insight

From `2025-12-31-ai-wants-this.md`:
> "The value proposition is NOT 'humans can read markdown files.' The value proposition IS 'AI has complete context across your entire project.'"

The map is a **lightweight TOC** — scannable documentation of terrain. It lets AI understand structure without reading every file. Main goal: **maximum context with minimum tokens**.

---

## Autonomous Scopes

Some folders are just folders. But some folders are complex enough to be their own "world" — their own mini FloatPrompt system within the larger system.

Think monorepo:
```
/big-company-monorepo          ← ROOT SCOPE (.float/ installed here)
├── /packages
│   ├── /web-app               ← AUTONOMOUS SCOPE (complex enough to be its own world)
│   │   └── /src/auth          ← AUTONOMOUS SCOPE (security domain, deep complexity)
│   └── /mobile-app            ← AUTONOMOUS SCOPE
└── /infrastructure            ← AUTONOMOUS SCOPE (devops world)
```

**What makes a folder an autonomous scope?**
- High friction (many files, deep nesting, complex domain)
- AI judges this during Layer 2 generation
- Gets its own boot context, patterns, buoy teams when needed
- Changes bubble up through scope hierarchy

**Database representation:**
```sql
-- Future schema additions (not yet in schema.ts)
is_scope BOOLEAN DEFAULT FALSE,     -- TRUE = autonomous scope
parent_scope_path TEXT,             -- nearest ancestor that is a scope
scope_boot TEXT,                    -- like boot.md but for this scope
```

**Scanner's role:** Scanner (Layer 1) creates the folder rows. Layer 2 (AI) decides which folders become scopes based on friction assessment.

---

## Friction Scoring (Mental Model)

From `float-os.md`, the friction scoring concept:

| Friction Level | Signals | Treatment |
|----------------|---------|-----------|
| Low | 1-5 files, no subfolders, simple utilities | Brief context, list in parent's map |
| Medium | 6-20 files, some nesting | Full context, own map |
| High | 20+ files, deep nesting, complex domain | Autonomous scope, own boot context |

This isn't a literal implementation — it's a mental model for how AI (Layer 2) decides depth and complexity. The scanner just creates the structure. AI judges what level of context each folder needs.

**Signals AI might use:**
- File count
- Subfolder count / nesting depth
- File complexity (lines of code, imports)
- Cross-references (how many other folders reference this one)
- Domain keywords (auth, payment, api = likely high friction)

---

## Context Evolution

**Initial context = AI's hypothesis**
- Generated from reading the files
- Best guess about what things mean
- Stored in `folders.context_*` fields

**Evolved context = Human + AI insights**
- As human and AI work together, insights emerge
- System can tell when something is novel (check against what exists)
- Novel insights get captured, context evolves

**The database tracks both:**
- `folders.context_*` = current understanding (latest state)
- `log_entries` = paper trail of how we got there

**Example flow:**
1. Scanner creates `/src/auth` row (Layer 1)
2. AI generates initial context: "Authentication layer using JWT" (Layer 2)
3. Human and AI discuss, discover it's actually OAuth + JWT hybrid
4. AI updates context, creates log_entry documenting the insight
5. Future sessions have the evolved understanding

---

## What Scanner Does

From `wip-sqlite.md`:
> Scanner walks project, creates rows in `folders` table with map_* and context_* columns

**The Real Schema (from `src/db/schema.ts`):**

```sql
-- folders table
CREATE TABLE IF NOT EXISTS folders (
  path TEXT PRIMARY KEY,        -- '/', '/src', '/src/auth'
  parent_path TEXT,             -- For hierarchy queries
  name TEXT NOT NULL,           -- 'src', 'auth'

  -- Map (WHERE - structure) — AI-generated
  map_summary TEXT,             -- "Contains React components for UI"
  map_children TEXT,            -- JSON: [{name, type, description}]

  -- Context (WHAT - understanding) — AI-generated
  context_what TEXT,            -- "This is the authentication layer"
  context_why TEXT,             -- "Separated for security isolation"
  context_patterns TEXT,        -- JSON: ["repository pattern", "DI"]

  -- Staleness detection
  source_hash TEXT,             -- SHA-256 of folder contents
  last_scanned_at INTEGER,      -- When scanner last ran

  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);

-- files table
CREATE TABLE IF NOT EXISTS files (
  path TEXT PRIMARY KEY,        -- '/src/auth/login.ts'
  folder_path TEXT NOT NULL,    -- '/src/auth'
  content_hash TEXT NOT NULL,   -- SHA-256 of file content
  last_scanned_at INTEGER NOT NULL
);
```

**Scanner's job (Layer 1):**
- Populate in `folders`: path, parent_path, name, source_hash, last_scanned_at, created_at, updated_at
- Populate in `files`: path, folder_path, content_hash, last_scanned_at
- Leave NULL: map_summary, map_children, context_what, context_why, context_patterns (Layer 2 fills these)

**Map fields (AI-generated in Layer 2):**
- `map_summary`: One-sentence description ("React components for user interface")
- `map_children`: JSON array of `{name, type, description}` for each child

**Context fields (AI-generated in Layer 2):**
- `context_what`: What this folder is ("The authentication layer")
- `context_why`: Why it exists / why structured this way ("Separated for security isolation")
- `context_patterns`: JSON array of patterns used (["OAuth", "middleware", "JWT"])

---

## Questions to Answer

### Scope

**Q1: What folders to scan?**
- Answer: Config file approach. Default: scan parent directory of `.float/` (the project root). For manual testing prototype, hardcode `.float-wip/` path. Config file will eventually allow overrides.
- Status: **locked**

**Q2: What folders to ignore?**
- Answer: Smart defaults + configurable via config file.
  - **Default ignore list:**
    - `node_modules/`
    - `.git/`
    - `dist/`, `build/`, `out/` (build outputs)
    - `coverage/` (test coverage)
    - Hidden folders (starting with `.`) EXCEPT `.float*` and `.claude/`
  - Config file can add/remove from this list
- Status: **locked**

**Q3: Recursive or configurable depth?**
- Answer: Recursive by default. No depth limit unless specified in config.
- Status: **locked**

### Content

**Q4: How to populate `map_json`?**
- Answer: Scanner (Layer 1) does NOT populate this. It leaves `map_json` NULL. After scanner completes, Layer 2 (AI generation via buoys) populates this field with a lightweight TOC of folder contents — what files exist, brief descriptions, navigation hints.
- Status: **working-theory** (may evolve during implementation)

**Q5: How to populate `context_summary`?**
- Answer: Scanner (Layer 1) does NOT populate this. It leaves `context_summary` NULL. Layer 2 (AI) generates understanding: what this folder means, why it exists, patterns used, architectural significance.
- Status: **working-theory** (may evolve during implementation)

**Q6: Should scanner call AI, or leave columns NULL for later?**
- Answer: Both layers run in sequence during `/float` command:
  1. Layer 1 (scanner) runs first — mechanical, fast, populates structure
  2. Layer 2 (AI buoys) runs immediately after — parallel generation

  This is NOT "leave NULL for later" — both layers execute as part of a single `/float` invocation. The separation is for clarity and efficiency: mechanical work is code, understanding work is AI.
- Status: **working-theory** (may evolve during implementation)

### Files Table

**Q7: Does scanner also populate `files` table?**
- Answer: Yes. Scanner (Layer 1) populates both tables:
  - `folders`: path, parent_path, timestamps
  - `files`: path, folder_path, content_hash, timestamps

  Files table enables change detection at the file level, which is more granular than folder-level. AI (Layer 2) uses this data to know which folders have stale context.
- Status: **locked**

**Q8: What hash algorithm for `content_hash`?**
- Answer: SHA-256. It's what git uses, widely supported, and "fast enough" for our use case. We're detecting changes, not securing data, but SHA-256 is universal and avoids questions about hash collisions.
- Status: **locked**

### Incremental Updates

**Q9: How to detect folders that need rescanning?**
- Answer: Compare stored file hashes against current state:
  1. List all files in folder
  2. Compare to `files` table entries for that folder
  3. If any file added, removed, or hash changed → folder needs rescan

  The scanner is idempotent — running it twice produces same result if nothing changed.
- Status: **locked**

**Q10: Rescan on file mtime change, content hash change, or both?**
- Answer: Two-phase check for efficiency:
  1. **Quick check:** Has mtime changed? (filesystem metadata, very fast)
  2. **If mtime changed:** Compute content hash and compare
  3. **If hash changed:** Mark folder for AI regeneration (Layer 2)

  mtime catches most changes fast. Hash confirms actual content change (avoids false positives from touch commands).
- Status: **locked**

### Interface

**Q11: CLI interface?**
- Answer: For prototype, no CLI — just TypeScript function. CLI wrapper comes later when we have float commands scaffolded. The function is the API; CLI is a thin wrapper.
- Status: **locked**

**Q12: Programmatic API signature?**
- Answer:
  ```typescript
  interface ScanOptions {
    rootPath: string;          // Where to start scanning
    ignore?: string[];         // Additional patterns to ignore
    include?: string[];        // Override default ignores
  }

  interface ScanResult {
    foldersCreated: number;
    foldersUpdated: number;
    filesCreated: number;
    filesUpdated: number;
    filesRemoved: number;
  }

  function scan(db: Database, options: ScanOptions): Promise<ScanResult>
  ```

  Takes database handle and options, returns summary of what changed.
- Status: **working-theory** (signature may evolve)

### Edge Cases

**Q13: How to handle symlinks?**
- Answer: Skip symlinks. Following symlinks risks infinite loops and scanning outside the project. Safe default is to ignore them. Can revisit if a real use case emerges.
- Status: **locked**

**Q14: How to handle very large folders (node_modules)?**
- Answer: Ignored by default (see Q2). If user explicitly includes, warn about performance.
- Status: **locked**

**Q15: What if folder is deleted between scans?**
- Answer: Remove from database. Scanner should reconcile DB state with filesystem state:
  - Folder in DB but not on disk → DELETE from folders table
  - Files in DB but not on disk → DELETE from files table

  This keeps the database as a true reflection of current project state.
- Status: **locked**

---

## Locked Decisions

| Question | Decision |
|----------|----------|
| Q1 | Config file, scan parent of .float/, hardcode .float-wip/ for prototype |
| Q2 | Smart defaults (node_modules, .git, dist, build, out, coverage, hidden except .float*, .claude/) + configurable |
| Q3 | Recursive by default |
| Q7 | Scanner populates both `folders` and `files` tables |
| Q8 | SHA-256 for content hashing |
| Q9 | Compare stored hashes vs current state to detect changes |
| Q10 | Two-phase: mtime check first (fast), then hash if mtime changed |
| Q11 | TypeScript function first, CLI later |
| Q13 | Skip symlinks (avoid infinite loops) |
| Q14 | node_modules ignored by default (Q2), warn if user includes explicitly |
| Q15 | Remove deleted folders/files from database to keep DB = filesystem |

## Working Theories

These may evolve during implementation:

| Question | Theory |
|----------|--------|
| Q4 | Scanner leaves NULL, AI populates map_json in Layer 2 |
| Q5 | Scanner leaves NULL, AI populates context_summary in Layer 2 |
| Q6 | Both layers run in sequence during /float, not "later" |
| Q12 | API signature: `scan(db, options) → ScanResult` |

---

## Key Design Principles

From founding decisions and discussion:

1. **AI orchestrates, code executes** — AI decides what needs doing, code does mechanical work
2. **Buoy principle** — "Never do alone what 3-4 buoys can do together"
3. **Map as lightweight TOC** — scannable documentation, not full file contents
4. **Minimum tokens, maximum context** — the whole point of FloatPrompt
5. **Working theories evolve** — some decisions are hypotheses until implementation proves them

---

## Next Steps

1. ~~Answer Q1-Q3 (Scope)~~ ✓ Locked
2. ~~Answer Q4-Q6 (Content)~~ ✓ Working theory
3. ~~Answer Q7-Q8 (Files Table)~~ ✓ Locked
4. ~~Answer Q9-Q10 (Incremental Updates)~~ ✓ Locked
5. ~~Answer Q11-Q12 (Interface)~~ ✓ Locked/Working theory
6. ~~Answer Q13, Q15 (remaining Edge Cases)~~ ✓ Locked
7. ~~Lock remaining decisions~~ ✓ All answered
8. ~~BUILD SCANNER~~ ✓ Complete

---

## Implementation Complete

**Built:** `src/db/scan.ts`

**Results:**
- 65 folders scanned
- 446 files scanned
- `.float/float.db` created

**Verified:**
- Folder hierarchy (no orphans)
- File-folder integrity (no orphans)
- Ignore patterns (.float, .git, node_modules)
- Allowed hidden (.claude)
- Idempotency (re-run = 0 changes)
- Change detection (add/remove)
- Hash bubbling (folder hashes update)
- TypeScript build (compiles cleanly)

**Post-Implementation Fix (2026-01-03):**
- Found schema drift: `mtime` column missing from actual database
- Root cause: `CREATE TABLE IF NOT EXISTS` doesn't add missing columns
- Fix: Dropped files table, updated scan.ts INSERT/UPDATE to include mtime, rescanned
- Verified: All 446 files now have proper mtime values

---

## The Infinite Scalability Vision

Why this architecture matters:

**Mechanical layer = O(1) hash comparisons, milliseconds**
- 10,000 folders? 10,000 rows. SQLite handles billions.
- Scanner runs in milliseconds, no matter project size.

**Scopes = hierarchical, changes only affect ancestors**
- Change in /auth doesn't rescan /mobile-app
- Staleness bubbles UP, not sideways
- Each scope can have its own buoy team

**Buoys = parallel, spawn as needed**
- 50 scopes changed? Spawn 50 buoys.
- 1000 folders need context? Spawn 1000 buoys.
- Cloud handles it. That's the point.

**The formula (from how-floatprompt-works.md):**

```
omnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)
```

**Any size. Any depth. Any complexity.**

The scanner is Layer 1. It's the foundation everything else builds on. Get this right, and the rest follows.

---

## The End State

Human opens Claude Code anywhere in the project:

1. AI reads boot.md (root system prompt)
2. AI reads scope chain up to current location
3. AI reads map + context for current folder

AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)

No more "what framework is this?"
No more "can you explain the auth system?"
No more repeating context every session.

It's just... there. Always fresh. Always recursive. Always ready.

---

*Created 2026-01-03*
*Updated 2026-01-03 — Implementation complete, scanner built and verified*
</md>
</fp>
