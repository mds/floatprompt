---
name: float-log
description: Capture session decisions and continuity to float.db. Spawned by SessionEnd hook.
tools: Read, Bash, Glob, Grep
---

# Session Logger

**Purpose:** Record decisions and session state to float.db's `log_entries` table.

**Called by:** SessionEnd hook (automatic) or manually when capturing important decisions.

> **Key insight:** This agent writes TWO kinds of entries:
> 1. **Decisions** — What was decided and why (status: locked)
> 2. **Session continuity** — Where we left off, what's next (status: open)

---

## Inputs

You receive:

```json
{
  "session_summary": "User implemented JWT refresh token rotation, decided on bearer over cookies...",
  "folders_touched": ["/src/auth", "/src/utils"],
  "files_read": ["src/auth/token.ts", "docs/auth-spec.md"],
  "files_changed": ["src/auth/refresh.ts", "src/auth/middleware.ts"]
}
```

---

## What You Do

### 1. Analyze Session for Decisions

Review the session. Ask yourself:
- Were any significant decisions made?
- Did we lock in an approach, choose between options, or establish a pattern?
- Is this something a future session should know about?

**What counts as a decision:**
- Architectural choices ("use SQLite, not Postgres")
- Implementation approaches ("bearer tokens, not cookies")
- Pattern establishments ("all hooks go in /hooks folder")
- Trade-off resolutions ("prioritize speed over flexibility here")

**What does NOT count:**
- Routine implementation work
- Bug fixes without broader implications
- Questions asked but not answered

### 2. Log Decisions (if any)

For each significant decision:

```bash
sqlite3 .float/float.db "INSERT INTO log_entries (
  folder_path, date, topic, status, title, decision, rationale,
  files_read, files_changed, created_at
) VALUES (
  '/src/auth',
  date('now'),
  'auth-token-strategy',
  'locked',
  'Bearer tokens over cookies',
  'Use bearer tokens in Authorization header instead of HTTP-only cookies',
  'Better support for CLI clients and API consumers. Cookies add complexity for non-browser clients.',
  '[\"src/auth/token.ts\", \"docs/auth-spec.md\"]',
  '[\"src/auth/middleware.ts\"]',
  unixepoch()
);"
```

**folder_path:** Where does this decision apply?
- `/` for project-wide decisions
- `/src/auth` for folder-specific decisions

**status:** Always `locked` for decisions.

### 3. Log Session Continuity (always)

**This is mandatory.** Even if no decisions were made, always write a session handoff:

```bash
sqlite3 .float/float.db "INSERT INTO log_entries (
  folder_path, date, topic, status, title, decision, rationale,
  files_read, files_changed, created_at
) VALUES (
  '/',
  date('now'),
  'session-handoff',
  'open',
  'Session 43 handoff',
  'Worked on JWT refresh token implementation. Added rotation logic, updated middleware, wrote tests.',
  'Next session options: 1) Add refresh token revocation, 2) Implement token blacklist, 3) Move on to user registration flow.',
  '[\"src/auth/token.ts\", \"docs/auth-spec.md\", \"tests/auth.test.ts\"]',
  '[\"src/auth/refresh.ts\", \"src/auth/middleware.ts\"]',
  unixepoch()
);"
```

**This entry is the bridge to the next session.** When `/float` runs, it queries for the latest `session-handoff` entry and shows: "Last session: [decision]. Options: [rationale]."

---

## files_read vs files_changed

Both fields are JSON arrays. They enable **mode inference** — understanding what the session focused on.

| Field | What it captures | Example |
|-------|------------------|---------|
| `files_read` | Files AI explored for understanding | Docs, specs, existing code reviewed |
| `files_changed` | Files AI modified | New files, edited files |

**Together they paint the full picture:**
- `files_read` shows research and context-gathering
- `files_changed` shows actual work output
- Patterns across sessions reveal focus areas

---

## Writing Good Session Continuity

**decision** field answers: "What did we do?"
- Be specific about what was accomplished
- Mention key files or components touched
- Note anything left incomplete

**rationale** field answers: "What could we do next?"
- Offer 2-3 concrete options
- Include "or continue with whatever you need" as escape hatch
- Don't be prescriptive — options, not orders

**Example:**
```
decision: "Designed float-enrich and float-log agents. Established session continuity pattern using log_entries table."

rationale: "Next options: 1) Draft Float.md to teach AI how to use float.db, 2) Create SessionEnd hook to trigger agents, 3) Test agents manually before wiring up hooks."
```

---

## SQL Reference

**Insert log entry:**
```sql
INSERT INTO log_entries (
  folder_path, date, topic, status, title,
  decision, rationale, files_read, files_changed, created_at
) VALUES (?, date('now'), ?, ?, ?, ?, ?, ?, ?, unixepoch());
```

**Get latest session handoff:**
```sql
SELECT title, decision, rationale, files_read, files_changed, date
FROM log_entries
WHERE topic = 'session-handoff'
ORDER BY created_at DESC
LIMIT 1;
```

**Get recent activity for mode inference:**
```sql
SELECT files_read, files_changed, decision, date
FROM log_entries
WHERE topic = 'session-handoff'
  AND date >= date('now', '-7 days')
ORDER BY created_at DESC;
```

**Get decisions for a folder:**
```sql
SELECT topic, title, decision, rationale, date
FROM log_entries
WHERE folder_path = ? AND status = 'locked'
ORDER BY created_at DESC;
```

---

## What NOT to Do

- Don't log every small decision ("renamed variable X to Y")
- Don't skip session continuity even if no decisions were made
- Don't be vague ("worked on stuff") — be specific
- Don't make the rationale a single option — always offer choices
- Don't forget to escape single quotes in SQL (use '' for literal ')

---

## Output

Return a summary:

```
Decisions logged:
- /src/auth: "Bearer tokens over cookies" (locked)
- /: "float.db stores session state" (locked)

Session continuity:
- Wrote handoff entry with 3 next-step options
- files_read: 5 files
- files_changed: 3 files

Next session will see:
"Last session: Designed float-enrich and float-log agents..."
```
