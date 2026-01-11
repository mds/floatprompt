# Git as Layer 1: The Architectural Insight

**Date:** 2026-01-10 (Session 60)
**Status:** Active realization
**Context:** Objective analysis of FloatPrompt architecture

---

## The Realization

FloatPrompt may have accidentally rebuilt what Git already does, when it could have simply built on top of Git.

---

## The Origin Story

**Where FloatPrompt started:**
- Personal vision documents in Dropbox
- Transcripts, notes, files that would never be pushed to GitHub
- Need: change detection and AI context for *any folder*
- These folders had no git — just files on a filesystem

**What got built:**
- A Rust scanner with merkle tree hashing
- File walking, SHA-256 content hashing, mtime caching
- Platform-specific binaries (darwin-arm64, darwin-x64, linux-x64)
- 230x faster than bash fallback (~40ms cached vs ~35s)
- Independence from git — works on any folder

**What the product became:**
- A Claude Code plugin
- Target user: developers
- Context: codebases
- Reality: virtually all codebases are git repos

---

## The Mismatch

Built **general-purpose filesystem infrastructure** for the original use case (non-git folders).

Shipped a **developer tool** that runs in contexts where git is already present.

The Rust merkle scanner solves a problem that git already solved for 99% of actual users.

---

## What Git Already Provides

| Need | Git Command | Notes |
|------|-------------|-------|
| List all files | `git ls-files` | Instant |
| What changed? | `git status` | Instant |
| File content hashes | `git hash-object` | SHA-1 (or SHA-256 in newer git) |
| Tree structure with hashes | `git ls-tree -r HEAD` | Full merkle tree |
| Folder hash | `git rev-parse HEAD:path/to/folder` | Tree object hash |
| Change detection | `git diff --name-only` | Which files changed |
| History | `git log` | When and why |

Git's object model IS a merkle tree:
- Blob objects = file content hashes
- Tree objects = folder hashes (hash of children)
- Commit objects = root tree hash + metadata

---

## What Merkle Trees Are For

From industry examples:

| System | Uses Merkle Trees For |
|--------|----------------------|
| **Git** | Sync with remote repositories |
| **Cursor** | Sync with cloud indexing server |
| **Dynamo** | Sync across distributed nodes |

Common thread: **efficient sync between two separate systems over a network**.

Key insight: Merkle trees shine when you need to minimize network transfer.

**FloatPrompt currently:**
- No remote server
- No cloud sync
- Purely local operation
- No network transfer to optimize

The merkle tree is over-engineered for local-only change detection.

---

## Current Architecture

```
Filesystem → Rust Scanner → float.db
                              ├── files (path, content_hash, mtime)
                              ├── folders (path, source_hash, ...)
                              ├── folders.description (AI)
                              ├── folders.context (AI)
                              ├── log_entries (decisions)
                              └── open_questions
```

**Layer 1 (Mechanical):** Scanner duplicates what git does
**Layer 2 (AI Enrichment):** The actual unique value

---

## Git-Native Architecture (What Could Have Been)

```
Git repo → git commands → float.db
                            ├── folders.description (AI)
                            ├── folders.context (AI)
                            ├── folders.status (AI trust level)
                            ├── log_entries (decisions, handoffs)
                            ├── open_questions
                            └── deep (topic contexts)
```

**No files table.** Git tracks files.
**No source_hash computation.** Git has tree hashes.
**No scanner.** Git is the scanner.

Layer 1 becomes three lines:
```bash
git ls-files              # what exists
git status                # what changed
git ls-tree HEAD          # structure with hashes
```

All engineering effort goes to Layer 2 — the part that's actually novel.

---

## The Schema Difference

### Current float.db

| Table | Purpose | Git Overlap |
|-------|---------|-------------|
| `files` | Track files, hashes, mtime | **Full overlap** with git |
| `folders` (source_hash) | Merkle hash of folder | **Full overlap** with git tree objects |
| `folders` (description, context) | AI understanding | **Unique value** |
| `log_entries` | Decisions, handoffs | **Unique value** |
| `open_questions` | Uncertainty tracking | **Unique value** |
| `deep` | Topic contexts | **Unique value** |

### Git-Native float.db

| Table | Purpose |
|-------|---------|
| `folders` | AI descriptions, context, status (no hashes) |
| `log_entries` | Decisions, session handoffs, rationale |
| `open_questions` | Unresolved threads |
| `deep` | Topic-based context primers |

Simpler. Focused on what's actually new.

---

## The Unique Value (What Git Doesn't Have)

1. **Folder-level semantic descriptions** — "what is this and why"
2. **AI-generated context** — understanding, not just structure
3. **Trust levels** — pending/current/stale for AI reasoning
4. **Decision rationale** — WHY, not just WHAT changed
5. **Session handoffs** — AI-to-AI continuity
6. **Open questions** — tracked uncertainty
7. **Scope hierarchy** — "worlds within worlds" for AI

This is Layer 2. This is the product. This is what git doesn't do.

---

## Why This Happened

1. **Original problem:** Personal docs in Dropbox (no git)
2. **Built infrastructure:** General-purpose scanner (git-independent)
3. **Product evolved:** Claude Code plugin for developers
4. **Target context:** Git repos (virtually always)
5. **Infrastructure carried:** Assumptions from original problem

Classic case: the solution matched the original problem, not the eventual product.

---

## Options Now

### Option 1: Keep the Scanner
- It works, it's fast
- Sunk cost argument
- Supports non-git folders (original use case)
- More code to maintain

### Option 2: Replace with Git-Native Layer 1
- Simpler architecture
- Less code to maintain
- Battle-tested (git is 20 years old)
- Requires git (reasonable for Claude Code users)

### Option 3: Git-First with Scanner Fallback
- Use git when present (99% of cases)
- Fall back to scanner when not
- Best of both worlds
- More complexity than pure git-native

### Option 4: Separate Products
- Claude Code plugin: git-native (developers)
- Standalone FloatPrompt: scanner-based (personal docs)
- Different infrastructure for different use cases

---

## The Requirement Question

**Is requiring git for the Claude Code plugin reasonable?**

Arguments for YES:
- Target users are developers
- Developers use git
- `git init` works locally (even for Dropbox folders)
- Every Claude Code context is effectively a project
- Projects have git

Arguments for NO:
- Reduces flexibility
- Some users might have non-git folders
- The scanner already exists and works

**Likely answer:** Yes, requiring git for the Claude Code plugin is reasonable. The user can always `git init` a folder if they want FloatPrompt tracking.

---

## Implications for Merkle Scanner

The Rust merkle scanner would become valuable IF:

1. **FloatPrompt Cloud** — Sync context across machines/team
2. **Offline-first sync** — Like git, but for AI context
3. **Non-git contexts** — Web package, personal docs
4. **Performance edge cases** — Very large repos where git queries are slow

Without a remote sync component, the merkle tree architecture is premature optimization.

---

## The Lesson

> Build on top of existing infrastructure when it serves your use case.
> Only build custom infrastructure when existing tools can't do what you need.

For the Claude Code plugin:
- Git handles Layer 1 (mechanical tracking)
- FloatPrompt handles Layer 2 (AI context)

The unique value is Layer 2. That's where the moat is. That's what git can't do.

---

## Next Steps (If Acting on This)

1. **Validate assumption:** What % of Claude Code users have git in their projects? (Likely 99%+)

2. **Prototype git-native Layer 1:**
   ```bash
   git ls-files | wc -l                    # file count
   git status --porcelain                  # changes
   git ls-tree -r --name-only HEAD         # all paths
   ```

3. **Measure:** Is git fast enough? (Almost certainly yes)

4. **Decide:** Keep scanner as fallback, or remove entirely?

5. **Simplify schema:** Remove `files` table, remove `source_hash` computation

---

## Related

- Current scanner: `plugins/floatprompt/lib/scanner/`
- Current schema: `plugins/floatprompt/lib/schema.sql`
- Plugin README: `plugins/floatprompt/README.md`
- January decisions: `.float-workshop/logs/2026/01-jan/01-jan.md`

---

*Documented: Session 60, January 10, 2026*
*Context: Objective analysis room — stepping outside the FloatPrompt builder mindset*
