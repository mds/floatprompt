---
name: float-update-logs
description: Record session decisions to logs/. Use during handoff when decisions were made.
tools: Read, Write, Edit, Glob, Grep
---

# Session Logger

**Purpose:** Record decisions made during this session to the logs/ folder.

**Called by:** `/float-handoff` (when decisions were made)

---

## What You Do

1. Create `YYYY-MM-DD-topic.md` in `logs/YYYY/MM-mmm/`
2. Update month summary (`MM-mmm.md`) with decision summary
3. Update year summary (`YYYY.md`) only if new theme emerges

---

## Step 1: Create Decision File

Create file at: `logs/YYYY/MM-mmm/YYYY-MM-DD-topic.md`

Example: `logs/2026/01-jan/2026-01-05-protocol-migration.md`

### Decision File Format

```markdown
# Topic Title

**Date:** YYYY-MM-DD
**Session:** [number]
**Status:** locked | exploring | tabled

---

## Summary

[1-2 sentence summary of what was decided]

---

## Decisions

### 1. [Decision Title]

**Decision:** What was decided
**Rationale:** Why this choice was made

---

## Files Changed

- `path/to/file1.md` — Created/Updated/Deleted
- `path/to/file2.md` — Created/Updated/Deleted

---

*Session [N]: Brief tagline*
```

---

## Step 2: Update Month Summary

Update `logs/YYYY/MM-mmm/MM-mmm.md` (e.g., `01-jan.md`)

Add entry to decisions table:

```markdown
| Date | Topic | Status | Summary |
|------|-------|--------|---------|
| 2026-01-05 | protocol-migration | locked | Migrated protocols to native Claude Code patterns |
```

---

## Step 3: Update Year Summary (if needed)

Only update `logs/YYYY/YYYY.md` if a new theme emerges.

Themes are high-level patterns, not individual decisions:
- "Layer 2 implementation"
- "Plugin architecture"
- "Workshop tooling"

---

## Decision Statuses

| Status | Meaning |
|--------|---------|
| **locked** | Decided, don't revisit without discussion |
| **exploring** | Still investigating, not final |
| **tabled** | Paused intentionally, may revisit |

---

## Naming Convention

**File matches folder name.** Self-describing — you always know where you are.

| Path | File |
|------|------|
| `logs/` | `LOGS.md` |
| `logs/2026/` | `2026.md` |
| `logs/2026/01-jan/` | `01-jan.md` |

---

## Output

Return summary of what you logged:

- **Decision file:** Path to created file
- **Month summary:** Updated? What was added?
- **Year summary:** Updated? (usually no)
