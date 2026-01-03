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

## What Scanner Does

From `wip-sqlite.md`:
> Scanner walks project, creates rows in `folders` table with map_* and context_* columns

From schema.ts `folders` table:
```sql
CREATE TABLE IF NOT EXISTS folders (
  path TEXT PRIMARY KEY,
  parent_path TEXT,
  map_json TEXT,           -- AI-generated structure map
  map_updated_at INTEGER,
  context_summary TEXT,    -- AI-generated understanding
  context_updated_at INTEGER,
  open_questions TEXT,     -- JSON array
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
```

**Scanner's job (Layer 1):**
- Populate: path, parent_path, created_at, updated_at
- Leave NULL: map_json, context_summary (Layer 2 fills these)

---

## Questions to Answer

### Scope

**Q1: What folders to scan?**
- Answer: Config file approach. Default: scan parent directory of `.float/` (the project root). For manual testing prototype, hardcode `.float-manual/` path. Config file will eventually allow overrides.
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
| Q1 | Config file, scan parent of .float/, hardcode .float-manual/ for prototype |
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
8. **BUILD SCANNER** ← Ready

---

## Ready to Build

All 15 questions answered. 11 locked decisions, 4 working theories.

Scanner spec summary:
- **Input:** Database handle + ScanOptions (rootPath, ignore, include)
- **Output:** ScanResult with counts of created/updated/removed
- **Behavior:**
  1. Walk filesystem recursively from rootPath
  2. Skip ignored patterns (smart defaults + config)
  3. For each folder: upsert to `folders` table
  4. For each file: compute SHA-256 hash, upsert to `files` table
  5. Remove DB entries for deleted folders/files
  6. Leave map_json and context_summary NULL (Layer 2 fills these)

---

*Created 2026-01-03*
*Updated with layered architecture context*
*All questions answered — ready to build*
</md>
</fp>
