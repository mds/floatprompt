# Track 1 Spec Revision

**Date:** 2026-01-06
**Session:** 34
**Status:** locked

---

## Summary

Revised Track 1 spec based on clearer understanding of two distinct operations: mode crystallization (cross-cutting topic) vs folder enrichment (specific folder context). Replaced `/float-deepen` command with skill + agent pattern.

---

## Decisions

### 1. `/float-boot` → `/float`

**Decision:** Rename `/float-boot` to `/float`
**Rationale:** Simpler, like `/init`. Session kickoff command.

### 2. `/float-deepen` Replaced by Skill + Agent

**Decision:** Remove `/float-deepen` command, replace with `float-enrich` skill + `float-enricher` agent
**Rationale:** Skills auto-invoke based on context. More organic enrichment during work, not just explicit command.

### 3. Two Types of Context Capture Clarified

**Decision:** Mode crystallization and folder enrichment are distinct operations

| | Mode Crystallization | Folder Enrichment |
|--|---------------------|-------------------|
| **Scope** | Cross-cutting topic | Specific folder |
| **Command** | `/float-mode` | Skill + agent |
| **Storage** | `modes/` markdown | float.db folders table |

**Rationale:** Original spec conflated these. Modes are "plugin implementation patterns" (topic). Enrichment is "what /src/db does" (folder).

### 4. Skill: `float-enrich`

**Decision:** Create skill that auto-invokes when working on files/folders
**Behavior:**
- Notices gaps between session knowledge and float.db
- Can spawn enricher agent during work
- Distinguishes enrichment (folder) from modes (topic)

### 5. Agent: `float-enricher`

**Decision:** Rename `float-context-generator` to `float-enricher`
**Rationale:** Clearer name. Called by skill or handoff for batch enrichment.

### 6. Handoff Enhancement

**Decision:** `/float-handoff` offers batch enrichment for touched folders
**Rationale:** Two paths for enrichment:
- Organic: skill notices gap during work
- Batched: handoff offers at session end

### 7. Ralph Wiggum Style Enrichment (Future)

**Decision:** Document as future enhancement, not Track 1 core
**Rationale:** Autonomous enrichment loop using Stop hook pattern. Layer 3 territory but achievable with Claude Code patterns.

### 8. Context-Efficient Deep Knowledge

**Decision:** Add section articulating float.db's context efficiency value
**Insight:** float.db solves context bloat the same way Claude Code solves tool result bloat:
- Tool results → persisted to disk → referenced by path
- Folder context → persisted to SQLite → queried by need

**The math:**
- CLAUDE.md: 100 folders × 500 tokens = 50k tokens at session start
- float.db: Boot context (2k) + query 3-5 folders as needed (1.5-2.5k) = 3-5k tokens

**Why this matters:** Deep knowledge without deep context cost. SQLite isn't just queryable for AI reasoning — it's queryable for context efficiency.

### 9. Context Hygiene Principle

**Decision:** Add "Context Hygiene" section — all float components must REDUCE context, not add to it

**Design patterns:**
- Skills: Lightweight notice pattern. Spawn agent, don't load/compare.
- Agents: Separate context window. Heavy work there, minimal return to main.
- Hooks: Shell commands that spawn agents. Zero context cost.
- Queries: On-demand only. Query specific folder, not entire database.

**PreCompact hook architecture:**
```
Hook fires → Script spawns agents → Agents capture to float.db → Context compacts → Knowledge preserved
```

**Constraint:** PreCompact fires when already full. Can't do graceful "getting full" handling until `PreCompactWarning` exists.

---

## Files Changed

- `.float-workshop/active/track1-workshop-plugin-spec.md` — Major revision

---

## Implementation Order (Updated)

1. Skill: `float-enrich`
2. Agent: `float-enricher`
3. Command: `/float` (rename from `/float-boot`)
4. Command: `/float-handoff` (enhance with enrichment)

---

*Session 34: Skill + agent pattern replaces /float-deepen, mode vs enrichment clarified*
