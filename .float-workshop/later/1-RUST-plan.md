# Rust Merkle Scanner Plan

**Status:** High Confidence (pending battle-testing)
**Goal:** Replace 26-second bash scan with <100ms Rust scanner via napi-rs
**Session:** 52 (updated with git mtime insights)

---

## Why

Current `scan.sh` is slow because:
- Individual subprocess per file (shasum, stat, file)
- Individual sqlite3 call per row
- Full O(n) walk every time, even when nothing changed
- Hashes EVERY file on EVERY scan (no caching)

**Measured:** 26 seconds for 605 files = ~44ms per file (subprocess overhead)

**Critical gap discovered:** scan.sh only runs on FIRST boot. After initialization, files can change between sessions without detection. No staleness updates.

Merkle tree + Rust + mtime caching solves:
- O(log n) change detection (compare root hash first)
- mtime caching (only hash files that might have changed)
- Native hashing (no subprocess overhead)
- Batched SQLite writes (single transaction)
- Parallel file walking (rayon)
- **Runs every boot** — fast enough to always be fresh

**Research sources:**
- Cursor's indexing approach (Aman Sanger thread) — Rust + napi + merkle
- Git's index — mtime/size caching to avoid re-hashing

---

## The Git Insight: mtime Caching

Git's index stores stat info for every tracked file:
```
.gitignore
  ctime: 1767616758:294611871
  mtime: 1767616758:294611871
  dev: 16777231  ino: 236302637
  uid: 501  gid: 20
  size: 173  flags: 0
```

When `git status` runs:
1. Stat every file (fast — just metadata, no I/O)
2. Compare mtime + size to cached values
3. **If unchanged → skip hashing** (use cached hash)
4. If changed → hash the file, compare to stored

This is why `git status` is fast even on huge repos.

**We already have mtime in our files table!**
```sql
CREATE TABLE files (
  path TEXT PRIMARY KEY,
  folder_path TEXT NOT NULL,
  content_hash TEXT NOT NULL,
  mtime INTEGER NOT NULL,        -- EXISTS, NOT USED!
  last_scanned_at INTEGER NOT NULL
);
```

---

## Architecture

```
┌─────────────────────────────────────────────┐
│  boot.sh                                    │
│  1. Call scanner (fast)                     │
│  2. Scanner updates staleness               │
│  3. Query float.db for context              │
│  4. Return JSON                             │
├─────────────────────────────────────────────┤
│  scanner.js (napi-rs generated loader)      │
│  - Detects platform at runtime              │
│  - Loads correct .node binary               │
├─────────────────────────────────────────────┤
│  scanner.darwin-arm64.node                  │
│  scanner.darwin-x64.node                    │
│  scanner.linux-x64.node                     │
│  (Rust compiled via napi-rs)                │
└─────────────────────────────────────────────┘
```

**Key change:** Scanner runs on EVERY `/float`, not just first boot. Merkle + mtime makes this fast enough (<50ms typical).

---

## Interface

### Input

```typescript
interface ScanOptions {
  projectDir: string       // Root directory to scan
  dbPath: string           // Path to float.db
  excludePatterns?: string[] // Additional patterns to exclude
}
```

### Output

```typescript
interface ScanResult {
  // Change detection
  changed: string[]        // Paths with different hashes
  added: string[]          // New paths not in DB
  removed: string[]        // Paths in DB but not on disk

  // Statistics
  stats: {
    folders: number        // Total folders in DB after scan
    files: number          // Total files in DB after scan
    filesWalked: number    // Files stat'd during walk
    filesHashed: number    // Files actually hashed (mtime changed)
    filesSkipped: number   // Files skipped (mtime unchanged, used cache)
    duration_ms: number    // Total scan time
  }

  // Merkle
  rootHash: string         // New root hash
  previousRootHash: string | null  // Previous root hash (null if first scan)
  unchanged: boolean       // True if root hash matches (no changes at all)

  // Warnings (non-fatal issues)
  warnings: Array<{
    path: string
    message: string
    code: 'PERMISSION_DENIED' | 'SYMLINK_LOOP' | 'PARSE_ERROR'
  }>
}
```

---

## Algorithm: The Full Picture

```rust
fn scan(project_dir: &Path, db_path: &Path) -> ScanResult {
    let db = open_db(db_path);  // Creates if not exists, WAL mode
    let stored_root_hash = db.get_root_hash();

    // =========================================
    // PHASE 1: Filesystem walk (fast, parallel)
    // =========================================
    // Using `ignore` crate — respects .gitignore
    let entries = walk_filesystem(project_dir);  // Returns (path, mtime, size)

    // =========================================
    // PHASE 2: mtime comparison (no disk I/O)
    // =========================================
    let mut to_hash: Vec<&Entry> = vec![];
    let mut unchanged: Vec<&Entry> = vec![];
    let mut new_files: Vec<&Entry> = vec![];
    let mut removed: Vec<String> = vec![];

    // Compare against stored file metadata
    let stored_files = db.get_all_files();  // HashMap<path, (hash, mtime, size)>

    for entry in &entries {
        match stored_files.get(&entry.path) {
            Some(stored) => {
                if entry.mtime != stored.mtime || entry.size != stored.size {
                    // mtime or size changed — need to re-hash
                    to_hash.push(entry);
                } else {
                    // mtime + size unchanged — trust cached hash
                    entry.hash = stored.hash.clone();
                    unchanged.push(entry);
                }
            }
            None => {
                // New file — need to hash
                new_files.push(entry);
            }
        }
    }

    // Find removed files (in DB but not on disk)
    for path in stored_files.keys() {
        if !entries.iter().any(|e| e.path == *path) {
            removed.push(path.clone());
        }
    }

    // =========================================
    // PHASE 3: Hash only changed/new files
    // =========================================
    // This is the expensive part — but we minimize it
    for entry in &mut to_hash {
        entry.hash = hash_file(&entry.path);  // SHA-256
    }
    for entry in &mut new_files {
        entry.hash = hash_file(&entry.path);
    }

    // =========================================
    // PHASE 4: Build merkle tree
    // =========================================
    // Combine all entries (unchanged use cached hash, changed use new hash)
    let all_files: Vec<&Entry> = unchanged.iter()
        .chain(to_hash.iter())
        .chain(new_files.iter())
        .collect();

    let tree = build_merkle_tree(&all_files);
    let new_root_hash = tree.root_hash();

    // =========================================
    // PHASE 5: Early exit if nothing changed
    // =========================================
    if new_root_hash == stored_root_hash && removed.is_empty() {
        return ScanResult {
            unchanged: true,
            stats: Stats {
                filesHashed: 0,
                filesSkipped: entries.len(),
                duration_ms: elapsed(),
                ...
            },
            ...
        };
    }

    // =========================================
    // PHASE 6: Update database (single transaction)
    // =========================================
    db.transaction(|tx| {
        // Update changed files
        for entry in &to_hash {
            tx.update_file(&entry.path, &entry.hash, entry.mtime, entry.size);
        }

        // Insert new files
        for entry in &new_files {
            tx.insert_file(&entry.path, &entry.hash, entry.mtime, entry.size);
        }

        // Remove deleted files
        for path in &removed {
            tx.delete_file(path);
        }

        // Update folder hashes (merkle)
        for (folder_path, folder_hash) in tree.folder_hashes() {
            tx.update_folder_hash(folder_path, folder_hash);
        }

        // Mark changed folders as stale
        for folder_path in tree.changed_folders() {
            tx.mark_folder_stale(folder_path);
        }
    });

    ScanResult {
        changed: to_hash.iter().map(|e| e.path.clone()).collect(),
        added: new_files.iter().map(|e| e.path.clone()).collect(),
        removed,
        unchanged: false,
        stats: Stats {
            filesHashed: to_hash.len() + new_files.len(),
            filesSkipped: unchanged.len(),
            ...
        },
        ...
    }
}
```

**Key insight:** Phase 3 only hashes files where mtime/size changed. For a 10,000 file repo where 3 files changed:
- Phase 1: Walk 10,000 files (fast, parallel)
- Phase 2: Compare 10,000 mtimes (in-memory, instant)
- Phase 3: Hash 3 files (the expensive part — but only 3!)
- Phase 4: Build tree using 9,997 cached + 3 new hashes
- Result: ~50ms instead of minutes

---

## Merkle Tree Design

### Hash computation

```
file_hash = SHA256(file_contents)
folder_hash = SHA256(sorted([
    child_name + ":" + child_hash
    for child in (files + subfolders)
]))
root_hash = folder_hash of "/"
```

**Key difference from current:** Folder hash includes BOTH file hashes AND subfolder hashes. Current scan.sh only includes files, so staleness doesn't propagate up the tree.

### Change propagation

When `/src/db/schema.ts` changes:
```
schema.ts hash changes
  → /src/db/ folder hash changes
    → /src/ folder hash changes
      → / (root) folder hash changes
```

On next scan, comparing root hash instantly detects "something changed." Then traverse down to find what.

---

## Decisions (High Confidence)

### 1. SQLite Schema: Same column, new algorithm ✓

**Decision:** Recompute `source_hash` with proper merkle algorithm. No schema migration.

**Rationale:**
- Column's semantic purpose unchanged ("detect if folder changed")
- Current implementation is just broken (doesn't include subfolders)
- First scan after upgrade recalculates everything anyway
- No external systems depend on hash format
- Migration would add complexity for no benefit

**Confidence:** High

---

### 2. File Walking: Use `ignore` crate ✓

**Decision:** Use the `ignore` crate (same as ripgrep) for .gitignore-aware walking.

**Rationale:**
- Battle-tested (ripgrep, fd, etc.)
- Handles nested .gitignore files correctly
- Users expect .gitignore to be respected
- Edge cases (wanting to index something in .gitignore) are rare
- Can add `.floatignore` or config later if needed

**Confidence:** High

---

### 3. Concurrency: WAL mode + rusqlite ✓

**Decision:** Enable WAL mode for SQLite. Let rusqlite handle locking.

**Rationale:**
- WAL is standard pattern for concurrent SQLite access
- Writers don't block readers, readers don't block writers
- rusqlite handles locking automatically
- Transient files (.db-wal, .db-shm) cleaned up on checkpoint

**Additional requirement:** Document that `.db-wal` and `.db-shm` should be gitignored.

**Confidence:** High

---

### 4. Error Handling: Throw fatal, warnings in result ✓

**Decision:**
- Fatal errors (corrupt DB, disk full) → throw JS exception
- Per-file issues (permission denied, symlink loop) → include in `result.warnings`

**Confidence:** High

---

### 5. Binary Size: Accept it, don't commit to git ✓

**Decision:** Accept 15-30MB total for binaries. Build in CI, don't commit to source repo.

**Confidence:** High

---

### 6. Build/CI: Use napi-rs package template ✓

**Decision:** Use the official napi-rs GitHub Actions template for cross-platform builds.

**Confidence:** High

---

### 7. mtime Caching: Like git does ✓ (NEW)

**Decision:** Use mtime + size comparison to skip hashing unchanged files.

**Rationale:**
- This is exactly how git makes `git status` fast
- We already have `mtime` column in files table — just need to use it
- Reduces hashing from O(all files) to O(changed files)
- 10,000 file repo with 3 changes: hash 3 files, not 10,000

**Algorithm:**
1. Stat file (get current mtime, size)
2. Compare to stored mtime, size in database
3. If both match → use cached content_hash, skip hashing
4. If either differs → hash file, update database

**Confidence:** High

---

### 8. Scanner runs every boot ✓ (NEW)

**Decision:** Scanner runs at the start of every `/float`, not just first boot.

**Rationale:**
- Current gap: scan.sh only runs on initialization
- Files change between sessions, but database doesn't know
- With merkle + mtime, scanner is fast enough to run every time
- No changes → <20ms (compare root hash, done)
- 3 files changed → <50ms (stat all, hash 3, update)

**Integration:**
```bash
# boot.sh (updated)
# Step 1: Run scanner
SCAN_RESULT=$(node -e "
  const { scan } = require('${PLUGIN_ROOT}/lib/scanner');
  console.log(JSON.stringify(scan({
    projectDir: '$PROJECT_DIR',
    dbPath: '$FLOAT_DB'
  })));
")

# Step 2: Continue with existing queries
# (Scanner has already updated staleness)
```

**Confidence:** High

---

## Rust Crates

| Crate | Purpose | Status |
|-------|---------|--------|
| `napi` + `napi-derive` | Node.js bindings | Decided |
| `napi-build` | Build script for bindings | Decided |
| `sha2` | SHA-256 hashing | Decided |
| `ignore` | .gitignore-aware walking | Decided |
| `rayon` | Parallel iteration | Decided |
| `rusqlite` (bundled) | SQLite access (WAL mode) | Decided |

---

## File Structure

```
plugins/floatprompt/
├── lib/
│   ├── scanner/                    # Rust source (NOT committed: binaries)
│   │   ├── Cargo.toml
│   │   ├── build.rs
│   │   ├── package.json            # napi-rs package config
│   │   └── src/
│   │       ├── lib.rs              # napi exports
│   │       ├── merkle.rs           # Tree construction
│   │       ├── walker.rs           # Filesystem walking (ignore crate)
│   │       ├── hasher.rs           # SHA-256 computation
│   │       ├── cache.rs            # mtime comparison logic (NEW)
│   │       └── db.rs               # SQLite operations (WAL mode)
│   ├── scanner.js                  # Generated loader (committed)
│   ├── scanner.d.ts                # TypeScript types (committed)
│   ├── scanner.darwin-arm64.node   # Binary (in releases, not source)
│   ├── scanner.darwin-x64.node     # Binary (in releases, not source)
│   ├── scanner.linux-x64.node      # Binary (in releases, not source)
│   ├── schema.sql                  # Existing
│   └── boot.sh                     # Updated to call scanner first
```

---

## Implementation Steps

### Phase 1: Rust Core (no napi yet)

1. [ ] Set up Cargo project in lib/scanner/
2. [ ] Implement walker.rs (filesystem walking with `ignore` crate)
3. [ ] Implement hasher.rs (SHA-256 with `sha2`)
4. [ ] Implement cache.rs (mtime comparison, skip unchanged files)
5. [ ] Implement merkle.rs (tree construction, folder hash computation)
6. [ ] Implement db.rs (rusqlite with WAL mode, batched transactions)
7. [ ] Write lib.rs main function (CLI for testing)
8. [ ] Test: standalone binary works, compare output to scan.sh
9. [ ] Benchmark: verify mtime caching reduces hash count

### Phase 2: napi Bindings

10. [ ] Initialize with napi-rs package template
11. [ ] Add napi dependencies to Cargo.toml
12. [ ] Wrap main function with #[napi]
13. [ ] Define TypeScript types in index.d.ts
14. [ ] Test: Node can require() and call scanner

### Phase 3: Plugin Integration

15. [ ] Update boot.sh to call scanner before queries
16. [ ] Remove scan.sh (archive to done/)
17. [ ] Test: /float works with new scanner
18. [ ] Verify PreCompact hook still works
19. [ ] Add .db-wal/.db-shm to gitignore docs

### Phase 4: Cross-Platform Build

20. [ ] Set up GitHub Actions from napi-rs template
21. [ ] Build darwin-arm64, darwin-x64, linux-x64
22. [ ] Test on each platform (CI matrix)
23. [ ] Attach binaries to GitHub release
24. [ ] Update plugin packaging for marketplace

### Phase 5: Optimization (if needed)

25. [ ] Benchmark: measure actual speedup vs scan.sh
26. [ ] Profile: identify any bottlenecks
27. [ ] Consider: parallel hashing with rayon for first-time scan
28. [ ] Consider: memory-mapped file reading for large files

---

## Success Criteria

| Metric | Current | Target | Stretch |
|--------|---------|--------|---------|
| Scan (600 files, first run) | 26s | <500ms | <200ms |
| Scan (600 files, no changes) | 26s | <20ms | <5ms |
| Scan (600 files, 3 changed) | 26s | <50ms | <15ms |
| Scan (10k files, no changes) | ~7 min | <50ms | <10ms |
| Scan (10k files, 10 changed) | ~7 min | <100ms | <30ms |
| Files hashed (no changes) | 600 | 0 | 0 |
| Files hashed (3 changed) | 600 | 3 | 3 |
| Memory usage | N/A | <50MB | <20MB |
| Binary size per platform | N/A | <10MB | <5MB |

**Key metric:** "Files hashed" — mtime caching should reduce this to only changed files.

---

## Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| napi-rs learning curve | Medium | Medium | Follow official examples, use template |
| Cross-compile issues | Low | Medium | Use napi-rs CI template (battle-tested) |
| SQLite version mismatch | Low | High | Bundle rusqlite (statically linked) |
| Plugin size concerns | Low | Low | Performance gain justifies size |
| WAL file confusion | Low | Low | Document in gitignore recommendations |
| mtime clock skew | Low | Low | Fall back to hashing if mtime in future |
| mtime granularity | Low | Low | Also check size; both must match to skip |

---

## Battle-Test Checklist

Before locking, validate these angles:

- [ ] **Fresh project:** Does first scan work correctly on empty float.db?
- [ ] **No changes:** Does mtime caching skip all hashing when nothing changed?
- [ ] **Few changes:** Does it only hash the changed files (not all)?
- [ ] **Incremental merkle:** Does root hash comparison work?
- [ ] **Edge cases:** Symlinks, permission denied, empty folders, binary files?
- [ ] **Concurrency:** PreCompact firing during scan — no corruption?
- [ ] **Large repo:** Test on 5k+ file repo — still fast?
- [ ] **gitignore:** Nested .gitignore files respected?
- [ ] **Cross-platform:** Binaries work on Intel Mac, M1 Mac, Linux?
- [ ] **Integration:** /float command works end-to-end with new scanner?
- [ ] **Boot speed:** Is total /float boot time acceptable with scanner?

---

## References

- [napi-rs documentation](https://napi.rs/)
- [napi-rs package template](https://github.com/napi-rs/package-template)
- [ignore crate docs](https://docs.rs/ignore/latest/ignore/)
- [rusqlite docs](https://docs.rs/rusqlite/latest/rusqlite/)
- [Cursor's approach](https://twitter.com/amanrsanger) — Merkle + Rust + napi
- [Grok analysis](session notes) — Rust as "key enabler" for performance
- [Git index format](https://git-scm.com/docs/index-format) — mtime caching inspiration

---

## Open for Battle-Testing

This plan is **high confidence** but not locked. Areas to stress-test:

1. **Merkle correctness** — Does the hash algorithm actually detect all changes?
2. **mtime reliability** — Any edge cases where mtime doesn't reflect changes?
3. **ignore crate behavior** — Any surprises with .gitignore edge cases?
4. **WAL mode in practice** — Any issues with concurrent access patterns?
5. **napi-rs in plugin context** — Does the loader work when plugin is installed via marketplace?
6. **Binary distribution** — What's the actual experience for users installing the plugin?
7. **Boot latency** — Is adding scanner to every boot acceptable UX?

---

*Created: 2026-01-10 (Session 52)*
*Updated: Added mtime caching insight from git, scanner-every-boot decision*
*Status: High Confidence — awaiting battle-testing before lock*
