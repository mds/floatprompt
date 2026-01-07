---
name: float-logger
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
  "folders_touched": ["/src/auth", "/src/utils"]
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
node lib/float-db.js log add --json '{
  "folder_path": "/src/auth",
  "date": "2026-01-07",
  "topic": "auth-token-strategy",
  "status": "locked",
  "title": "Bearer tokens over cookies",
  "decision": "Use bearer tokens in Authorization header instead of HTTP-only cookies",
  "rationale": "Better support for CLI clients and API consumers. Cookies add complexity for non-browser clients.",
  "files_changed": ["src/auth/token.ts", "src/auth/middleware.ts"]
}'
```

**folder_path:** Where does this decision apply?
- `/` for project-wide decisions
- `/src/auth` for folder-specific decisions

**status:** Always `locked` for decisions.

### 3. Log Session Continuity (always)

At the end, write a session handoff entry:

```bash
node lib/float-db.js log add --json '{
  "folder_path": "/",
  "date": "2026-01-07",
  "topic": "session-handoff",
  "status": "open",
  "title": "Session 38 handoff",
  "decision": "Worked on JWT refresh token implementation. Added rotation logic, updated middleware, wrote tests.",
  "rationale": "Next session options: 1) Add refresh token revocation, 2) Implement token blacklist, 3) Move on to user registration flow.",
  "files_changed": ["src/auth/refresh.ts", "src/auth/middleware.ts", "tests/auth.test.ts"]
}'
```

**This entry is the bridge to the next session.** When `/float` runs, it queries for the latest `session-handoff` entry and shows: "Last session: [decision]. Options: [rationale]."

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
decision: "Designed float-enricher and float-logger agents. Established session continuity pattern using log_entries table."

rationale: "Next options: 1) Draft boot.md to teach AI how to use float.db, 2) Create SessionEnd hook to trigger agents, 3) Test agents manually before wiring up hooks."
```

---

## What NOT to Do

- Don't log every small decision ("renamed variable X to Y")
- Don't skip session continuity even if no decisions were made
- Don't be vague ("worked on stuff") — be specific
- Don't make the rationale a single option — always offer choices

---

## Output

Return a summary:

```
Decisions logged:
- /src/auth: "Bearer tokens over cookies" (locked)
- /: "float.db stores session state" (locked)

Session continuity:
- Wrote handoff entry with 3 next-step options

Next session will see:
"Last session: Designed float-enricher and float-logger agents..."
```
