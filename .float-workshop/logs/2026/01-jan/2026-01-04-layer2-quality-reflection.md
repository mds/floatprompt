# Layer 2 Quality Reflection

**Date:** 2026-01-04
**Session:** 12
**Status:** Open (tests pending)

---

## What Was Accomplished

- Full generation loop executed: 65 folders processed
- All folders now have `description` + `content_md`
- Context Generator buoy-boot created
- CLI pipeline verified working

---

## Honest Assessment

### What Worked

| Aspect | Status |
|--------|--------|
| Infrastructure | Solid — generate.ts + CLI held up |
| Data model | Correct — 16 fields, status transitions |
| Pipeline | Complete — query → generate → update |
| Autonomous execution | Successful — no clarification needed |

### What's Shallow

| Issue | Reality |
|-------|---------|
| Context quality | Generated from folder names, not file contents |
| Archive folders | One-liner descriptions, minimal insight |
| Scope detection | Everything points to root — no real hierarchy |
| Buoy-boot usage | File exists but wasn't actually loaded/used |
| Validation | None — didn't test if context helps fresh AI |

---

## Future Tests

### Test 1: Agent-Spawned Context Generation

**Hypothesis:** A spawned agent using the buoy-boot file produces better context than inline generation.

**Method:**
```bash
# Spawn agent with buoy-boot as system prompt
# Give it one folder's details
# Compare output to current database content
```

**What to measure:**
- Does agent read files or just infer from names?
- Is context more specific/useful?
- Does it follow buoy-boot guidance?

### Test 2: Fresh Session Orientation

**Hypothesis:** Generated context helps a fresh AI session understand the project.

**Method:**
1. Start new Claude Code session
2. Ask "What is /src/db for?"
3. Compare answer WITH context vs WITHOUT context

**What to measure:**
- Accuracy of understanding
- Time to useful response
- Whether AI finds the right files

### Test 3: Scope Detection Quality

**Hypothesis:** Current scope detection is too shallow (everything → root).

**Method:**
1. Manually identify which folders SHOULD be scopes
2. Compare to current `is_scope` values
3. Test scope chain traversal

**Expected scopes:**
- `/` (root) — yes
- `/examples/*` — maybe each example is a scope?
- `/src` — maybe (major subsystem)
- `/templates/.float` — maybe (self-contained system)

### Test 4: Staleness Detection

**Hypothesis:** After file changes, context becomes stale.

**Method:**
1. Modify a file in `/src/db/`
2. Run scanner to update hashes
3. Check if folder status changes to stale
4. Regenerate and compare

### Test 5: Parallel Buoy Spawning

**Hypothesis:** Multiple buoys can process siblings in parallel.

**Method:**
1. Get all depth-2 folders
2. Spawn 5 agents in parallel with Task tool
3. Each agent processes one folder
4. Verify all complete without conflicts

**Infrastructure needed:**
- TypeScript orchestrator (future)
- OR: Use Claude Code Task tool as prototype

---

## Quality Improvements for Next Generation Run

1. **Actually read key files** — README, package.json, index files
2. **Sample file contents** — First 50 lines of .ts/.md files
3. **Better scope detection** — Use heuristics table from buoy-boot
4. **Richer content_md** — Include specific file purposes, not just folder purpose
5. **Validate output** — Check description isn't just folder name restated

---

## The Real Test

> Does a fresh AI session, reading only boot.md + scope chain + folder context, understand the project well enough to help?

Until we test this, Layer 2 is "complete" but not "validated."

---

*Created 2026-01-04 — Honest reflection on Layer 2 quality*
