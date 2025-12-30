<fp>
<json>
{
  "STOP": "Decision Log Specification. Paper trail format for AI decisions in the filesystem watcher system.",

  "meta": {
    "title": "Decision Log Specification",
    "id": "decision-log-spec",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Define the paper trail format so humans can review and correct AI decisions",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Logging format reference",
    "behavior": "Understand what gets logged, where, and why"
  },

  "requirements": {
    "principle": "Every AI decision logged with rationale",
    "purpose": "Human can trace back, understand why, and fix mistakes",
    "format": "Structured markdown for human readability, JSON for machine parsing"
  }
}
</json>
<md>
# Decision Log Specification

**Every AI decision needs a paper trail.**

When the filesystem watcher makes decisions through Scout, Map, and Think buoys, those decisions must be logged with enough detail that a human can:

1. Understand what happened
2. Understand why it happened
3. Trace back if something went wrong
4. Correct mistakes

---

## Location

Decision logs live in `.float/project/logs/decisions/`:

```
.float/project/logs/
├── 2025-12-30.md           # Session log (existing)
└── decisions/
    ├── 2025-12-30.md       # Day's decisions
    └── 2025-12-29.md       # Previous day
```

---

## Format

Each decision entry follows this structure:

```markdown
## [timestamp] — [buoy name]

**Change ID:** [unique identifier]
**Trigger:** [what caused this decision]
**Assessment:** [buoy's analysis]
**Decision:** [what action was taken]
**Rationale:** [why this action was chosen]
**Executed:** [what actually ran]
**Result:** [success/failure + details]
**Human Review:** [pending | approved | corrected]
```

---

## Entry Examples

### Routine Change

```markdown
## 2025-12-30 14:32:03 — Think Buoy

**Change ID:** chg_20251230_143200_auth
**Trigger:** Scout report — src/auth.ts modified (+245 bytes)
**Assessment:** Map Buoy flagged nav/src.md as stale (certain), docs/safety.md as possible (conceptual mention only)
**Decision:** Run /float-sync for nav/src.md only
**Rationale:** Direct reference in nav file. Safety doc mention is conceptual, not structural — deferring to human review.
**Executed:** /float-sync nav/src.md
**Result:** Success. Updated description: "Authentication utilities" → "Authentication utilities with token refresh"
**Human Review:** pending

**Deferred:**
- docs/safety.md: Conceptual mention of auth. Flagged for human review, no auto-update.
```

### Significant Change

```markdown
## 2025-12-30 15:10:22 — Think Buoy

**Change ID:** chg_20251230_151000_restructure
**Trigger:** Scout report — 12 files modified in src/api/
**Assessment:** Map Buoy detected structural change. Confidence: significant. Multiple nav files affected.
**Decision:** Run /float-plan to chunk changes, then /float-sync for each nav file
**Rationale:** Large change set requires coordination. Running sync individually for verification.
**Executed:**
1. /float-plan src/api/ → Chunked into 3 groups
2. /float-sync nav/api.md (group 1)
3. /float-sync nav/src.md (group 2)
4. /float-sync nav/root.md (group 3)
**Result:** Success. 8 descriptions updated, 2 new files added to nav.
**Human Review:** pending
```

### Needs Judgment

```markdown
## 2025-12-30 16:45:11 — Think Buoy

**Change ID:** chg_20251230_164500_config
**Trigger:** Scout report — .float/system.md modified externally
**Assessment:** Map Buoy confidence: needs-judgment. System file modified outside watcher.
**Decision:** Defer to human. Log change, do not auto-modify.
**Rationale:** System files are sensitive. External modification could be intentional human edit or accidental corruption. Cannot determine intent.
**Executed:** None (deferred)
**Result:** Logged for human review
**Human Review:** **NEEDS ATTENTION**

**Context:**
- File: .float/system.md
- Change: Structure map section modified
- Possible causes: Human edit, merge conflict, external tool
- Recommendation: Human should verify system.md is correct, then run /float to re-sync
```

---

## JSON Sidecar

For machine parsing, each markdown entry has a JSON sidecar:

```json
{
  "change_id": "chg_20251230_143200_auth",
  "timestamp": "2025-12-30T14:32:03Z",
  "buoy": "think",
  "trigger": {
    "type": "scout_report",
    "file": "src/auth.ts",
    "event": "modify"
  },
  "assessment": {
    "source": "map_buoy",
    "confidence": "routine",
    "affected": {
      "certain": ["nav/src.md"],
      "possible": ["docs/safety.md"]
    }
  },
  "decision": {
    "actions": ["/float-sync nav/src.md"],
    "deferred": ["docs/safety.md"]
  },
  "rationale": "Direct reference in nav file. Safety doc is conceptual only.",
  "executed": {
    "command": "/float-sync nav/src.md",
    "result": "success",
    "changes": ["Updated description for auth.ts"]
  },
  "human_review": "pending"
}
```

JSON sidecars stored in `.float/project/logs/decisions/json/`:

```
.float/project/logs/decisions/
├── 2025-12-30.md
└── json/
    ├── chg_20251230_143200_auth.json
    └── chg_20251230_151000_restructure.json
```

---

## Human Review States

| State | Meaning |
|-------|---------|
| pending | Decision made, human hasn't reviewed yet |
| approved | Human reviewed, decision was correct |
| corrected | Human reviewed, made corrections |
| reverted | Human reviewed, reverted the change |

### Correction Format

When human corrects a decision:

```markdown
## 2025-12-30 14:32:03 — Think Buoy

... [original entry] ...

**Human Review:** corrected

**Correction (2025-12-30 17:00):**
- Reviewer: @mds
- Issue: Should have updated docs/safety.md too
- Action taken: Manually ran /float-enhance docs/safety.md
- Notes: Auth changes affect security documentation. Add relationship to map logic.
```

---

## Aggregation

Daily summary at end of each decision log:

```markdown
---

## Daily Summary

| Metric | Value |
|--------|-------|
| Total decisions | 23 |
| Routine | 19 |
| Significant | 3 |
| Needs judgment | 1 |
| Success rate | 100% |
| Human corrections | 1 |

**Patterns detected:**
- src/api/ had 12 changes — consider if this folder needs dedicated nav tracking
- docs/safety.md flagged 3 times as "possible" — may need explicit relationship

**Pending review:** 22 decisions awaiting human review
```

---

## Retention

- **Active logs:** Current month in `.float/project/logs/decisions/`
- **Archive:** Older logs move to `.float/project/logs/decisions/archive/`
- **JSON sidecars:** Keep as long as markdown exists
- **Suggested retention:** 90 days active, then archive

---

## Integration with /float

When `/float` boots, it checks decision logs:

```
FloatPrompt operational.
Directory: /Users/mds/project
Context: Loaded
Status: No issues found

Watcher: running
Decisions today: 23 (22 pending review)
Corrections needed: 0

Ready for: human direction
```

If corrections are pending:

```
Watcher: running
Decisions today: 23
**Needs attention:** 1 decision flagged for human review

Run /float decisions to review
```

---

## Commands

### /float decisions

Review pending decisions:

```
> /float decisions

Pending review: 22 decisions

Recent:
1. [14:32] src/auth.ts → nav/src.md updated (routine)
2. [15:10] src/api/* → 8 descriptions updated (significant)
3. [16:45] .float/system.md modified — NEEDS ATTENTION

Review all? (y/n/[number]):
```

### /float decisions approve

Batch approve routine decisions:

```
> /float decisions approve routine

Approved 19 routine decisions.
3 non-routine decisions still pending.
```

---

*Paper trail specification for the filesystem watcher.*
</md>
</fp>
