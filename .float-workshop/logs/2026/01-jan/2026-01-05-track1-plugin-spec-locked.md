# Track 1 Plugin Spec Locked

**Date:** 2026-01-05
**Session:** 29
**Status:** Locked

---

## Summary

Solidified the Track 1 workshop plugin architecture through Q&A. Separated skill, agent, and command responsibilities. Downscaled from full buoy vision to native Claude Code patterns.

---

## Decisions

### 1. Skill: `floatdb`

**Decision:** One skill that teaches Claude how to use float.db and notice enrichment opportunities.

**Content:**
- "float.db exists, query it when you need context about files/folders"
- How to query: `float-db details`, `float-db scope-chain`, `float-db status`
- Enrichment awareness: "If you know more than float.db, suggest `/float-deepen`"

**Rationale:** Skill is a trigger, not a reference manual. It points Claude to the database, doesn't contain the knowledge itself.

### 2. Commands: Three commands

**Decision:** `/float`, `/float-deepen [path]`, `/float-handoff`

| Command | Purpose |
|---------|---------|
| `/float` | Boot, orient to project, check staleness |
| `/float-deepen [path]` | Write session learnings back to float.db |
| `/float-handoff` | End session, offer to deepen changed folders, cleanup |

**Rationale:** Clean lifecycle. Boot → Work → Handoff. Enrichment is explicit via `/float-deepen`.

### 3. Agent: One agent

**Decision:** `float-context-generator` — generates/updates context for a folder (includes scope detection).

**Rationale:** Context generation naturally includes scope detection. No need for separate scope-detector or staleness-checker agents. Staleness is checked via CLI query, not a separate agent.

### 4. Format: Pure YAML + Markdown

**Decision:** Native Claude Code format, not hybrid `<fp><json><md>`.

**Rationale:** Track 1 validates Claude Code patterns. `<fp>` format is for buoys in the bigger vision. Keep it simple.

### 5. CLI Interface: float-db wrapper

**Decision:** Agent uses `float-db` CLI (not raw sqlite3) to interact with float.db.

**Rationale:** Speed difference is negligible (~150ms vs 3-6s for AI generation). Cleaner interface wins.

---

## Full Component List

| Component | Type | Purpose |
|-----------|------|---------|
| `floatdb` | Skill | Query float.db + notice enrichment opportunities |
| `/float` | Command | Boot, orient, check staleness |
| `/float-deepen [path]` | Command | Write session learnings to float.db |
| `/float-handoff` | Command | End session, offer deepen, cleanup |
| `float-context-generator` | Agent | Generate/update context for a folder |

---

## Lifecycle

```
/float (boot)
    ↓
[Work — skill auto-queries, notices enrichment opportunities]
    ↓
/float-handoff (deepen + cleanup)
```

---

## Key Clarifications

### float.db is an extension of CLAUDE.md

When you run `/init`, CLAUDE.md gets created. float.db is like an extended version — project context that's too much or too dynamic for a single file. SQLite serves the AI, not the human.

### Skill teaches behavior, not contains knowledge

The `floatdb` skill doesn't contain project context. It teaches Claude:
- "float.db exists"
- "Here's how to query it"
- "Notice when you know more than it does"

The actual knowledge lives in float.db.

### Enrichment is the key insight

Context isn't static. As user works, Claude learns more than what's stored. The skill notices this gap, `/float-deepen` captures it. Context gets richer over time.

---

## Removed from Original Spec

| Item | Why Removed |
|------|-------------|
| `floatdb-context` skill | Merged into single `floatdb` skill |
| `float-scope-detector` agent | Scope detection is part of context-generator |
| `float-staleness-checker` agent | Staleness checked via CLI, not separate agent |
| `/float-generate` command | Replaced by `/float-deepen` |
| `/float-status` command | Folded into `/float` boot |
| `/float-refresh` command | Handled by boot + handoff flow |
| Hybrid `<fp>` format | Using native Claude Code YAML + markdown |

---

*Session 29: Track 1 plugin spec locked — skill, agent, commands solidified*
