# Architecture Gaps

**Purpose:** Valuable content from PRD that should be added to the architecture artifact.

**Source:** `floatprompt-plugin-PRD.md` (Sessions 38-39)
**Target:** `artifacts/2026/01-jan/2026-01-09-floatprompt-plugin-architecture.md`

---

## Worth Adding to Architecture

### 1. Who This Is For

The architecture implies the target user but doesn't state it explicitly.

```markdown
## Who This Is For

**Claude Code users** who want persistent context that survives sessions.

**The workflow:**
1. Human cd's to project directory
2. Human runs `claude`
3. Human types `/float`
4. AI boots with full context — where you left off, what folders mean, decisions made
5. Human & AI work together
6. SessionEnd hook captures learnings automatically
7. Next session: `/float` picks up where you left off

**When CLAUDE.md is sufficient:**
- Small projects (< 10 folders)
- One-off sessions
- Projects where the whole thing fits in your head

**When float.db adds value:**
- Projects you return to across 3+ sessions
- 20+ folders (where CLAUDE.md becomes unwieldy)
- Codebases where "what does this folder do?" is a recurring question
- Long-term projects where understanding should accumulate

**The goal:** Make `/float` the ONLY command needed. Everything else is automatic.
```

**Recommendation:** Add "Who This Is For" section to architecture after "The One-Sentence Summary".

---

### 2. Zero Configuration Philosophy

Architecture doesn't mention this. PRD has:

```markdown
**Philosophy:** Zero configuration for v1. `/float` just works.

- No environment variables required
- No plugin settings required
- No `.float/config.json` needed
- Plugin uses Claude Code's existing auth
```

**Recommendation:** Add to architecture or note in "What's NOT in This Architecture" section.

---

### 3. Error Handling

Architecture has no error handling specification. PRD has:

| Scenario | Behavior |
|----------|----------|
| float.db missing | `/float` creates it (Layer 1 scan) |
| float.db corrupted | Delete and recreate |
| Layer 1 scan fails | Error message: "Scan failed. Try `/float` again." |
| Enricher agent fails | Log error, skip that folder, continue with others |
| Network offline | Claude Code doesn't work anyway — not plugin's problem |
| `.float/` deleted mid-session | Nothing breaks, run `/float` next session to recreate |

**Philosophy:** Fail gracefully, never block user's work. Context is enhancement, not requirement.

**Recommendation:** Add "Error Handling" section to architecture.

---

### 4. Out of Scope (Product Scope)

Architecture has "What's NOT in This Architecture" (technical exclusions). PRD has product scope exclusions:

| Excluded | Rationale |
|----------|-----------|
| Multi-repo federation | Solo dev focus, one project at a time |
| Team/concurrent handling | Not needed — anyone enriching same folder helps the db |
| Static context export | Future architecture. Code exists in `src/export.ts` if needed. |
| Manual context editing UI | AI edits via conversation. No direct editing. |
| Custom enrichment prompts | Later. May emerge naturally through conversation patterns. |

**Recommendation:** Merge into "What's NOT in This Architecture" or add separate "Out of Scope (v1)" section.

---

### 5. Git Integration

Architecture doesn't cover git strategy. PRD has:

```markdown
**Commit `.float/` to git** — context compounds and shares across team/machines.

| File | Git Status | Rationale |
|------|------------|-----------|
| `.float/float.db` | Committed | Context persists, new clones have it |
| `.float/Float.md` | Committed | Same instructions for everyone |

**Merge conflicts:** If two people enrich the same folder, git can't merge SQLite.
Resolution: pick newer version, re-enrich if needed. Rare for solo dev (v1 target).
```

**Recommendation:** Add "Git Integration" section to architecture.

---

### 6. Skills (float-mode-suggest) — **RESOLVED: OUT OF SCOPE**

~~Architecture doesn't mention skills at all. PRD has float-mode-suggest.~~

**Resolution:** Static mode creation is replaced by mode inference. See Q1 below for full rationale.

The concept of "detecting deep topic work and offering to save as mode" is superseded by:
- Logging `files_read` and `files_changed` every session
- AI inferring focus from activity patterns at boot
- No static mode files to create or maintain

This is a better solution because modes are always current (inferred from actual activity) rather than static files that get stale.

---

### 7. Success Criteria Checklist

Architecture has narrative "What Success Looks Like." PRD has testable checklist:

**Must Have (v1):**
- [ ] `/float` creates float.db on first run
- [ ] `/float` loads Float.md instructions on subsequent runs
- [ ] `/float` shows session continuity from last session
- [ ] AI can query float.db on-demand for context
- [ ] SessionEnd hook detects edited folders via git diff
- [ ] `float-enricher` agent enriches edited folders at session end
- [ ] `float-logger` agent writes session-handoff entry (always)
- [ ] Workshop agent only runs when `.float-workshop/` exists
- [ ] Context compounds across sessions (measurable)

**Should Have (v1):**
- [ ] Float.md is < 800 tokens
- [ ] Enrichment doesn't block main conversation
- [ ] Error states are graceful (never blocks user)
- [ ] First-run experience is smooth

**Nice to Have (v1):**
- [ ] PreCompact hook preserves learnings
- [ ] Staleness count shown at boot

**Recommendation:** Add "Success Criteria" section with checkboxes to architecture.

---

### 8. Future Tables

Architecture schema section doesn't mention future tables. PRD lists:

| Table | Purpose |
|-------|---------|
| `references` | Cross-folder staleness detection |
| `open_questions` | Unresolved items |
| `tags` | Categorization |
| `log_entry_tags` | Many-to-many for tags |
| `deep` | Topic-based context (concept primers) |
| `deep_history` | Version history for deep contexts |

**Recommendation:** Add note to schema section: "These tables exist in schema, unused in v1."

---

### 9. Workshop → float.db Mapping

PRD has useful conceptual mapping:

| Workshop (Manual) | float.db (Automatic) |
|-------------------|----------------------|
| `active/ACTIVE.md` | `log_entries WHERE topic = 'session-handoff'` |
| `logs/*.md` | `log_entries WHERE status = 'locked'` |
| Folder context docs | `folders.description` + `folders.context` |

**Recommendation:** Add to "The Two Context Problems" section as context for how the design evolved.

---

## Stale Content in PRD (Do Not Port)

These items are superseded by the architecture and should NOT be added:

| Item | Why Stale |
|------|-----------|
| All `float-db` CLI references | AI uses sqlite3 directly |
| `boot.md` naming | Now `Float.md` |
| `lib/float-db.js` | No bundled CLI |
| Implementation phases referencing CLI | CLI removed |
| Phase 2c, 6c (CLI bundling) | CLI removed |

---

## Open Questions (Need Decisions)

### Q1: Is float-mode-suggest skill in scope? — **RESOLVED: NO**

**Decision:** Static mode creation is OUT of scope. Replaced by **mode inference** from activity logs.

**The Problem with Static Modes:**
- Human creates mode file → file sits there → gets stale → human forgets to update
- Mode content drifts from reality over time
- Human must remember to activate the right mode
- Maintenance burden grows as modes accumulate

**The Living Alternative:**
- Each session logs `files_read` (what AI explored) and `files_changed` (what AI modified)
- Float.md teaches AI: "Query recent log_entries. Look at files_read/files_changed patterns. Infer what the human's been focused on."
- AI surfaces relevant context based on actual activity, not stale mode files

**Key Insight:** Sessions are unpredictable — they span multiple tasks, features, phases. There will be many sessions over a project's lifetime. Manually-created artifacts can't keep up. But activity logs are always current.

**Changes Made:**
1. Added `files_read` column to `log_entries` schema
2. Added "Living Context vs Static Modes" section to architecture
3. Updated Float.md section to include focus inference
4. Added static modes and `float-mode-suggest` to "What's NOT in This Architecture"

**The Principle:** Log the activity, infer the context. Don't create static artifacts that rot.

---

### Q2: Should architecture have implementation phases?

PRD has detailed phases with dependencies. Architecture has "Implementation Status" table.

Options:
- **Keep status table only** — simpler, architecture stays focused on "what" not "when"
- **Add phases** — more actionable for implementation

### Q3: Resolved questions history — worth preserving?

PRD has 17 resolved questions with answers. This is decision history.

Options:
- **Add to architecture** — useful context for why things are the way they are
- **Keep separate** — architecture stays clean, history lives in PRD or logs

---

## Recommended Action

1. Add sections 1-5 and 7-9 to architecture (Users, Zero Config, Error Handling, Out of Scope, Git, Success Criteria, Future Tables, Workshop Mapping)

2. ~~Decide on Q1 (skills) — then add or exclude~~ **DONE** — float-mode-suggest is OUT, replaced by mode inference

3. Keep phases/history in PRD or deprecate PRD entirely

4. Update `plugin-features.json` to remove CLI-related features

5. Decide on Q2 (implementation phases) and Q3 (resolved questions history)

---

*Generated Session 42 — Extracting valuable PRD content for architecture consolidation*
