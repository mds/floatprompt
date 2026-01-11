# Git-Native Architecture Plan

**Date:** 2026-01-10 (Session 60)
**Status:** Plan — Ready for implementation
**Context:** Objective analysis of FloatPrompt architecture, stepping outside builder mindset

---

## The Realization

FloatPrompt accidentally rebuilt what Git already does. The mechanical layer (scan.sh, merkle trees, files table, source_hash) duplicates Git's core functionality.

**The insight:** Build ON TOP OF Git, not parallel to it.

---

## Related Documents (This Session)

| Document | Path | Purpose |
|----------|------|---------|
| Git Layer 1 Insight | `active/2026-01-10-git-layer1-insight.md` | Full analysis of the redundancy |
| Deep Context Snapshot | `modes/2026-01-10-deep-context-snapshot.md` | Session 60 full context for future recall |
| Plugin README | `plugins/floatprompt/README.md` | Current architecture diagrams |

---

## Current Architecture (What Exists)

```
LAYER 1: MECHANICAL (scan.sh)          LAYER 2: AI ENRICHMENT (agents)
──────────────────────────────────────────────────────────────────────

Filesystem                             Session work
    │                                      │
    ▼                                      ▼
find + sha256 ──────────────────────► log_entries (decisions)
    │                                      │
    ▼                                      ▼
folders table (paths)                  folders.description
files table (hashes)                   folders.context
```

**Problems:**
- `files` table duplicates `git ls-files`
- `folders.source_hash` duplicates git tree hashes
- Rust scanner duplicates `git status` + `git diff`
- Staleness detection reimplements what git does natively

---

## Proposed Architecture (Git-Native)

```
GIT (Layer 1 - FREE)                   FLOAT.DB (Layer 2 - THE PRODUCT)
────────────────────────────────────────────────────────────────────────

git ls-files ──────────────────────►  folders.description
git status                            folders.context
git diff $LAST_CAPTURE HEAD           folders.status
git log                    ────────►  log_entries + git_commit ref
git branch                            open_questions
                                      deep contexts

         │                                    │
         └────────────────┬───────────────────┘
                          │
                          ▼
                    boot.sh output
                   (git context + AI context)
```

**Git handles:** What exists, what changed, history, branches
**FloatPrompt handles:** AI understanding, decisions, session continuity

---

## Schema Changes

### Remove

```sql
-- DELETE entirely: files table
DROP TABLE files;

-- DELETE from folders:
-- - source_hash (use git tree hashes)
-- - last_scanned_at (git has timestamps)
```

### Add

```sql
-- Add to log_entries for snapshot references:
ALTER TABLE log_entries ADD COLUMN git_commit TEXT;
ALTER TABLE log_entries ADD COLUMN git_branch TEXT;
```

### Simplified folders table

```sql
CREATE TABLE folders (
  path TEXT PRIMARY KEY,
  parent_path TEXT,
  name TEXT,

  -- AI context (THE ACTUAL VALUE)
  description TEXT,
  context TEXT,
  status TEXT DEFAULT 'pending',  -- pending/current/stale

  -- Scope hierarchy
  is_scope INTEGER DEFAULT 0,
  parent_scope_path TEXT,
  scope_boot TEXT,

  -- Attribution
  ai_model TEXT,
  ai_updated TEXT,

  -- Timestamps
  created_at TEXT,
  updated_at TEXT

  -- REMOVED: source_hash, last_scanned_at
);
```

---

## File Changes

### lib/boot.sh — Git-Enhanced

**Current:** Queries float.db for handoff, decisions, questions, stats

**Proposed additions:**

```json
{
  "git": {
    "branch": "main",
    "commit": "abc123f",
    "status": "clean|dirty",
    "ahead": 2,
    "behind": 0,
    "uncommitted_folders": ["/src/auth"],
    "recent_commits": [
      {"hash": "abc123f", "message": "Fix auth bug", "date": "2026-01-10"}
    ]
  },

  "staleness": {
    "last_capture_commit": "def456a",
    "current_commit": "abc123f",
    "changed_since_capture": ["/src/auth", "/src/api"],
    "commits_since_capture": 1
  }
}
```

**Key git commands to add:**

```bash
# Branch and commit
git branch --show-current
git rev-parse HEAD

# Status
git status --porcelain

# Remote tracking
git rev-list --count @{u}..HEAD  # ahead
git rev-list --count HEAD..@{u}  # behind

# Recent commits
git log --oneline -5

# Staleness detection (THE KEY INSIGHT)
LAST_CAPTURE=$(sqlite3 .float/float.db "SELECT git_commit FROM log_entries WHERE topic='session-handoff' ORDER BY created_at DESC LIMIT 1")
git diff --name-only $LAST_CAPTURE HEAD | xargs dirname | sort -u
```

### lib/scan.sh — Dramatically Simplified

**Current:**
- Rust scanner OR bash fallback
- File walking, SHA-256 hashing, merkle trees
- Updates folders + files tables

**Proposed:**

```bash
#!/bin/bash
PROJECT_ROOT=$(git rev-parse --show-toplevel)
FLOAT_DB="$PROJECT_ROOT/.float/float.db"

# Initialize if needed
if [ ! -f "$FLOAT_DB" ]; then
  mkdir -p "$PROJECT_ROOT/.float"
  sqlite3 "$FLOAT_DB" < schema.sql
fi

# Get all folders from git (ONE LINE)
git ls-files | xargs -I{} dirname {} | sort -u | while read folder; do
  [ -z "$folder" ] && folder="."
  sqlite3 "$FLOAT_DB" "INSERT OR IGNORE INTO folders (path, name, status, created_at)
    VALUES ('/$folder', '$(basename $folder)', 'pending', datetime('now'))"
done

# Root folder
sqlite3 "$FLOAT_DB" "INSERT OR IGNORE INTO folders (path, name, status, created_at)
  VALUES ('/', '(root)', 'pending', datetime('now'))"

echo "Indexed folders from git."
```

**No files table. No hashing. No merkle trees. No Rust.**

### hooks/capture.sh — Records Git State

**Add to Phase 1 (mechanical INSERT):**

```bash
GIT_COMMIT=$(git rev-parse HEAD)
GIT_BRANCH=$(git branch --show-current)

sqlite3 "$FLOAT_DB" "UPDATE log_entries
  SET git_commit='$GIT_COMMIT', git_branch='$GIT_BRANCH'
  WHERE id=$ENTRY_ID"
```

Now every capture is pinned to a git commit. Staleness = `git diff` between commits.

---

## The Staleness Flow (New)

### On Capture

```
Session ends
    │
    ▼
Record git_commit = HEAD in log_entry
    │
    ▼
Context is "current" as of this commit
```

### On Boot

```
/float runs
    │
    ▼
Get last capture's git_commit
    │
    ▼
git diff --name-only $LAST_COMMIT HEAD
    │
    ▼
Derive changed folders
    │
    ▼
These folders are potentially stale
    │
    ▼
Present to AI: "Since last capture, /src/auth and /src/api changed"
```

**No scanner. No hash comparison. Git tells us exactly what changed.**

---

## What Gets Removed

| Component | Current | Proposed |
|-----------|---------|----------|
| `lib/scanner/` | Rust merkle scanner | **DELETE** |
| `files` table | Tracks all files + hashes | **DELETE** |
| `folders.source_hash` | Merkle hash of folder | **DELETE** |
| `folders.last_scanned_at` | Scanner timestamp | **DELETE** |
| Bash fallback scanner | find + shasum | **DELETE** |

**Lines of code removed:** ~2000+ (Rust scanner, bash fallback, schema, queries)

---

## What Gets Added

| Component | Purpose |
|-----------|---------|
| `log_entries.git_commit` | Snapshot reference for staleness |
| `log_entries.git_branch` | Branch context |
| Git queries in boot.sh | Branch, status, recent commits |
| Git diff in boot.sh | Staleness detection |

**Lines of code added:** ~50

---

## Benefits

1. **Simpler** — Remove 2000+ lines, add 50
2. **Faster** — Git is optimized, no hash computation
3. **Accurate** — Git is the source of truth for file state
4. **Native** — Works with branches, merges, PRs naturally
5. **Less maintenance** — No Rust binaries, no platform builds
6. **Git workflows** — Hooks, blame, history all work

---

## Implementation Steps

### Phase 1: Schema Migration
1. Add `git_commit`, `git_branch` to log_entries
2. Remove `files` table
3. Remove `source_hash`, `last_scanned_at` from folders
4. Update schema.sql

### Phase 2: boot.sh Enhancement
1. Add git context queries (branch, status, commits)
2. Add staleness detection via git diff
3. Update JSON output structure
4. Test boot output

### Phase 3: scan.sh Simplification
1. Replace with git ls-files approach
2. Remove Rust scanner dependency
3. Test initialization flow

### Phase 4: capture.sh Update
1. Record git_commit and git_branch on capture
2. Update Phase 1 mechanical INSERT
3. Test capture → boot staleness flow

### Phase 5: Cleanup
1. Remove `lib/scanner/` directory
2. Remove Rust build configuration
3. Update README diagrams
4. Update plugin documentation

---

## Open Questions

1. **Non-git projects:** Require git init? Or keep minimal fallback?
   - Recommendation: Require git. Users can `git init` any folder.

2. **Large repos:** Is `git ls-files` fast enough for 10k+ files?
   - Likely yes. Git is highly optimized. Test to confirm.

3. **Untracked files:** Should FloatPrompt see files git ignores?
   - Recommendation: No. If git ignores it, FloatPrompt ignores it.

4. **Submodules:** Handle git submodules as scopes?
   - Future consideration. Not blocking for v1.

---

## The Core Insight

> **Git is Layer 1. FloatPrompt is Layer 2.**
>
> Git tracks WHAT exists and WHAT changed.
> FloatPrompt tracks WHY it matters and WHAT AI should know.
>
> Don't rebuild Layer 1. Build on top of it.

---

## Success Criteria

- [ ] Boot shows git context (branch, status, recent commits)
- [ ] Staleness detected via git diff, not hash comparison
- [ ] No files table in schema
- [ ] No source_hash computation
- [ ] scan.sh under 30 lines
- [ ] Rust scanner removed
- [ ] All existing tests pass (adapted)

---

*Plan created: Session 60, January 10, 2026*
*Next: /float-capture to preserve this session, then implement in future session*
