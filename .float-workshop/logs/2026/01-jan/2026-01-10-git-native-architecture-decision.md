# Git-Native Architecture Decision

**Session:** 60
**Date:** 2026-01-10
**Folders:** `.float-workshop/modes`, `plugins/floatprompt`, `src/db/`

## Summary

Discovered that FloatPrompt Layer 1 (filesystem scanning, merkle trees, files table, source_hash) duplicates what Git already provides. Decided to adopt a git-native architecture for the Claude Code plugin: use Git for mechanical change detection, reserve FloatPrompt for AI context enrichment (Layer 2).

## Decision

**Replace merkle-tree-based Layer 1 with git-native Layer 1:**
- Git commands (`git ls-files`, `git status`, `git diff`) become the source of truth for "what exists" and "what changed"
- Remove `files` table and `source_hash` computation from float.db schema
- Record `git_commit` and `git_branch` in `log_entries` to track staleness via git diff
- Simplify `scan.sh` from ~2000 lines (Rust scanner, merkle trees) to ~30 lines (git queries)
- Remove Rust scanner and its platform-specific binaries entirely

**Rationale for this approach:**
- Target users are developers; codebases are virtually always git repos
- Git is 20 years old, battle-tested, highly optimized
- Merkle trees shine when syncing across networks; FloatPrompt is local-only
- Duplicating git's functionality is over-engineering for non-existent requirements (no remote sync, no cloud)
- Frees engineering effort to focus on Layer 2 — the actual unique value (AI context, decisions, session continuity)

## Rationale

**Why this matters:**
- **Simplification:** Removes ~2000 lines of code, adds ~50
- **Correctness:** Git is the authoritative source for file state; no hashing divergence
- **Maintenance:** No Rust builds, no platform binaries, no manual file scanning
- **Integration:** Works naturally with branches, merges, git workflows, blame, history
- **Focus:** Forces concentration on what FloatPrompt uniquely provides (Layer 2)

**Why it wasn't obvious:**
- Original problem was personal docs in Dropbox (no git)
- Built general-purpose scanner to solve it
- Product evolved to Claude Code plugin for developers
- Sunk cost bias: infrastructure was built and working
- Architectural assumption (git-independent) persisted past its usefulness

**The insight:**
> Build on top of existing infrastructure when it serves your use case. Only build custom infrastructure when existing tools can't do what you need.

For Claude Code: Git handles Layer 1 (what exists, what changed, history). FloatPrompt handles Layer 2 (AI understanding, decisions, scope hierarchies).

## Files Changed

- `.float-workshop/active/2026-01-10-git-layer1-insight.md` — Full analysis document
- `.float-workshop/active/2026-01-10-git-native-architecture-plan.md` — Implementation plan with 5 phases
- `.float-workshop/modes/MODES.md` — Updated to reference new snapshot mode
- `.float-workshop/modes/2026-01-10-deep-context-snapshot.md` — Full context snapshot for future recall

## Open Questions for Implementation

1. **Non-git projects:** Require git init, or keep fallback?
   - Recommendation: Require git. Users can `git init` any folder.

2. **Large repos:** Is `git ls-files` fast enough for 10k+ files?
   - Likely yes, but needs testing.

3. **Untracked files:** Should FloatPrompt see git-ignored files?
   - Recommendation: No. Respect .gitignore.

4. **Submodules:** Handle git submodules as scopes?
   - Future consideration; not blocking for v1.

---

*Decision: Session 60, January 10, 2026*
*Status: Plan complete, ready for implementation in future session*
