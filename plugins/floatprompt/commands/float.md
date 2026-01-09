---
name: float
description: Boot FloatPrompt session. Queries float.db for context and session continuity.
---

# FloatPrompt Boot

**One command. AI operates everything else.**

---

## First Run (no float.db)

If `.float/float.db` doesn't exist:
1. Run Layer 1 scan: `${CLAUDE_PLUGIN_ROOT}/lib/scan.sh`
2. Copy Float.md template: `cp ${CLAUDE_PLUGIN_ROOT}/templates/Float.md .float/Float.md`
3. Report: "FloatPrompt initialized. X folders indexed."
4. Load Float.md instructions below

---

## Subsequent Runs

1. Query latest session handoff:
```sql
sqlite3 .float/float.db "SELECT title, decision, rationale, files_changed
FROM log_entries WHERE topic='session-handoff' AND status='open'
ORDER BY created_at DESC LIMIT 1"
```

2. Infer recent focus from activity:
```sql
sqlite3 .float/float.db "SELECT files_read, files_changed FROM log_entries
WHERE topic='session-handoff' AND date >= date('now', '-7 days')
ORDER BY created_at DESC LIMIT 3"
```

3. Display to user:
   - Last session summary
   - Recent focus area (inferred from file patterns)
   - Next step options

---

## Float.md Instructions

Read and internalize `.float/Float.md` — it teaches you how to operate float.db.

**Core queries:**
- Folder context: `SELECT description, context FROM folders WHERE path='...'`
- Scope chain: Recursive CTE from current folder to root
- Decisions: `SELECT * FROM log_entries WHERE folder_path='...'`
- Freshness: `status = 'current'` (trust) vs `'stale'` (verify)

**When to query:**
- Entering a new folder
- Need to understand what something does
- Looking for past decisions

**Enrichment is automatic** — PreCompact hook handles it.

---

## Session Protocol

1. Boot with context (this command)
2. Work together
3. PreCompact or SessionEnd fires automatically
4. Next `/float` picks up where you left off

**No manual handoff needed.**
