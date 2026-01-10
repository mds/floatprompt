# Rust Merkle Scanner Decision

**Date:** 2026-01-10
**Session:** 52
**Status:** Locked (architecture), Open (implementation details)

---

## Context

Current `scan.sh` takes 26 seconds to scan 605 files. This violates the Layer 1 promise:

> "Layer 1: Mechanical (code, instant) — Runs in **milliseconds**, no AI needed"

The bottleneck is subprocess overhead: ~2,500 subprocess spawns (sqlite3, shasum, stat, file) for 605 files.

---

## Research: Cursor's Approach

From Cursor founder Aman Sanger's thread on codebase indexing:

1. **Merkle tree on client** — O(log n) change detection instead of O(n) full scan
2. **Rust via napi** — "maximize speed and minimize resource use"
3. **Tree-sitter chunking** — Function-level change detection
4. **Embedding cache** — Only re-embed changed chunks

Key insight: For 50K files with 3 changes, merkle traverses ~15 nodes instead of 50K.

**Grok analysis confirmed:** Rust isn't essential to merkle trees conceptually, but is "a key enabler for making it fast and lightweight enough for real-world use on diverse hardware."

---

## Decisions Locked

### Architecture: Rust + napi-rs

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Language | Rust | Performance, memory safety, Cursor precedent |
| Bindings | napi-rs | Node.js native modules, TypeScript types |
| Data structure | Merkle tree | O(log n) change detection |
| Platforms | darwin-arm64, darwin-x64, linux-x64 | Mac primary target, Linux for CI/servers |
| Location | `plugins/floatprompt/lib/scanner/` | Part of plugin, not separate package |

### Merkle Hash Computation

```
file_hash = SHA256(file_contents)
folder_hash = SHA256(sorted(child_path + ":" + child_hash for each child))
root_hash = folder_hash of "/"
```

Change detection: Compare root hash first. If same, nothing changed. If different, traverse down to find changed branches.

### Interface Design

```typescript
interface ScanResult {
  changed: string[]      // Paths with different hashes
  added: string[]        // New paths
  removed: string[]      // Deleted paths
  stats: {
    folders: number
    files: number
    walked: number       // Actually traversed
    skipped: number      // Skipped (unchanged subtree)
    duration_ms: number
  }
  rootHash: string
  previousRootHash: string | null
}
```

### Target Performance

| Metric | Current | Target |
|--------|---------|--------|
| Scan (600 files) | 26s | <100ms |
| Scan (no changes) | 26s | <10ms |
| Memory | N/A | <50MB |

---

## Open Questions

### 1. SQLite Schema

**Question:** Recompute `source_hash` as proper merkle hash, or add new column?

**Options:**
- A) Same column, new algorithm (no migration)
- B) New `merkle_hash` column (explicit)
- C) Store tree structure separately

**Leaning:** Option A — recompute in place, no migration needed.

### 2. .gitignore Handling

**Question:** Use `ignore` crate or hardcoded exclude list?

**Current hardcoded:**
```
node_modules, .git, .float, .claude, __pycache__, .pytest_cache,
.next, .nuxt, dist, build, .venv, venv, .tox, coverage, etc.
```

**Options:**
- A) `ignore` crate (respects .gitignore, nested gitignores)
- B) Keep hardcoded list
- C) Both: hardcoded + .gitignore

**Leaning:** Option A — `ignore` crate is battle-tested (used by ripgrep).

### 3. Concurrent Access

**Question:** How to handle SQLite access if PreCompact fires during scan?

**Options:**
- A) WAL mode + rusqlite handles locking
- B) Explicit lock file
- C) Queue operations

**Leaning:** Option A — standard SQLite pattern.

### 4. Error Handling

**Question:** How does TypeScript see errors from Rust?

**Options:**
- A) Throw JS exceptions for fatal, log per-file errors
- B) Return error object in result
- C) Callback pattern

**Leaning:** Option A — clean API, standard pattern.

### 5. Binary Size

**Question:** Is 15-30MB acceptable for plugin? (3 platforms × ~5-10MB)

**Analysis:**
- Current plugin is <1MB
- Would grow to ~20MB
- Tradeoff: size vs performance

**Leaning:** Accept it. Performance gain is worth it. Can optimize later.

### 6. Build/CI

**Question:** How to cross-compile for all platforms?

**Research needed:**
- napi-rs has GitHub Actions templates
- May need self-hosted runner for darwin-arm64
- Or use cross-compilation

**Status:** Needs research before implementation.

---

## Rust Crates

| Crate | Purpose | Status |
|-------|---------|--------|
| `napi` + `napi-derive` | Node.js bindings | Decided |
| `sha2` | SHA-256 hashing | Decided |
| `ignore` | .gitignore-aware walking | Leaning |
| `rayon` | Parallel iteration | Decided |
| `rusqlite` (bundled) | SQLite access | Decided |

---

## Implementation Phases

### Phase 1: Rust Core
- [ ] Set up Cargo project
- [ ] Implement filesystem walker
- [ ] Implement hasher
- [ ] Implement merkle tree
- [ ] Implement SQLite operations
- [ ] Test as standalone CLI

### Phase 2: napi Bindings
- [ ] Add napi dependencies
- [ ] Wrap functions with #[napi]
- [ ] Generate TypeScript types
- [ ] Test Node.js integration

### Phase 3: Plugin Integration
- [ ] Update boot.sh to use scanner
- [ ] Remove/replace scan.sh
- [ ] Test /float command

### Phase 4: Cross-Platform
- [ ] Set up GitHub Actions
- [ ] Build all platforms
- [ ] Test on each platform

---

## References

- [Cursor indexing thread](https://twitter.com/amanrsanger) — Merkle + Rust + napi
- [napi-rs documentation](https://napi.rs/)
- [ignore crate](https://docs.rs/ignore/latest/ignore/)
- [rusqlite](https://docs.rs/rusqlite/latest/rusqlite/)
- `.float-workshop/active/RUST-plan.md` — Full implementation plan

---

## Next Steps

1. Resolve open questions (schema, gitignore, concurrency)
2. Research napi-rs CI templates
3. Begin Phase 1 implementation

---

*Session 52 — Rust merkle scanner architecture locked*
