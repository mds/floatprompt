---
title: Documentation
type: float
status: current
ai_updated: 2025-12-28
---

# Documentation

Core documentation for FloatPrompt. Start here to understand the system.

## Essential (Read First)

| File | Purpose |
|------|---------|
| **fp.md** | File format specification — the `<fp><json><md></fp>` structure |
| **mds-method.md** | The methodology — Map → Decide → Structure |
| **goals.md** | Three-tier goal hierarchy (voice > behavior > artifacts) |

## Principles

| File | Purpose |
|------|---------|
| **principles.md** | Recognition before action. Slow is smooth. Anti-patterns. |
| **voice.md** | Voice preservation rules. What to preserve, what to avoid. |
| **safety.md** | Safety guidelines. Human oversight, no weaponization. |

## Practical

| File | Purpose |
|------|---------|
| **use.md** | What you can build: coaches, writers, extractors, assistants |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **philosophy/** | Background thinking. Origin story, manifesto, naming decisions. |
| **reference/** | Template references at three complexity levels. |

## Key Concepts

**File Format**: JSON for behavior, Markdown for methodology. Wrapped in `<fp></fp>` tags.

**MDS Method**: Map (understand) → Decide (choose) → Structure (build). Depth scales with complexity.

**Goal Hierarchy**: Voice preservation is primary. Everything else serves it.

**Voice Preservation**: Preserve phrasing, rhythm, tone. Avoid generic rewriting, em dashes, corporate smoothing.

---

See also: CLAUDE.md in this folder for Claude Code specific guidance.
