---
name: float-context
description: Query float.db for full context on a file or folder. Use when user mentions a path, asks about folder context, says "what do we know about X?", or BEFORE modifying any unfamiliar code. Proactive use prevents mistakes.
---

# Float Context Lookup

Query everything float.db knows about a given path. **Use this proactively, not just when asked.**

---

## When to Invoke This Skill

### Reactive (user asks)
- User mentions a file/folder path
- User asks "what do we know about /src/auth?"
- User says "what's the context for X?"

### Proactive (you decide)
**Invoke this BEFORE modifying code you haven't worked on recently:**
- About to edit files in an unfamiliar directory
- Making changes that could affect other parts of the system
- Unsure about existing patterns or conventions in an area
- Working on code another session touched

**Why proactive matters:** Previous sessions may have made decisions you shouldn't contradict. Context may be stale (files changed). There may be open questions you can resolve.

---

## What to Query

All queries use the project's `.float/float.db` directly:

### 1. Folder Context
```bash
sqlite3 .float/float.db "SELECT path, description, context, status, ai_updated FROM folders WHERE path = '/given/path'"
```

### 2. Locked Decisions
```bash
sqlite3 .float/float.db "SELECT date, title, decision, rationale FROM log_entries WHERE folder_path LIKE '/given/path%' AND status = 'locked' ORDER BY created_at DESC LIMIT 5"
```

### 3. Open Questions
```bash
sqlite3 .float/float.db "SELECT question, context FROM open_questions WHERE folder_path = '/given/path' AND resolved_at IS NULL"
```

### 4. Scope Chain
```bash
sqlite3 .float/float.db "WITH RECURSIVE chain AS (SELECT * FROM folders WHERE path = '/given/path' UNION ALL SELECT f.* FROM folders f JOIN chain c ON f.path = c.parent_path) SELECT path, description, status FROM chain"
```

---

## Interpreting Status

| Status | Meaning | What to Do |
|--------|---------|------------|
| `current` | Context is fresh and trustworthy | Rely on it confidently |
| `stale` | Files changed since last enrichment | **Verify before relying** — read actual files to confirm context still applies |
| `pending` | No AI context exists yet | You're the first — **write good context** for future sessions |

### Stale Context Warning

If status is `stale`, tell the user:
> "This folder's context is stale — files have changed since it was last analyzed. I'll verify the current state before making changes."

Then read the actual files to confirm or update your understanding.

### Pending Context Opportunity

If status is `pending`, you have a responsibility:
> "This folder has no context yet. As I work here, I'll capture what I learn so future sessions start with understanding."

---

## What to Surface

**Always tell the user what you found.** Don't silently query and move on.

### Warnings (surface immediately)
- **Stale context** — "Context for /src/auth is stale. Verifying current state."
- **Locked decisions** — "There's a locked decision about token handling here. I'll work within that constraint."
- **Open questions** — "Session 44 left an open question: 'Should we support OAuth?' Want to resolve it now?"
- **Scope conflicts** — If parent scope has constraints that affect this work

### Presentation Format

> **Context for `/src/auth`**
>
> **Description:** Authentication middleware and JWT handling
>
> **Status:** STALE — files changed since last enrichment
>
> **Locked Decisions:**
> - Session 42: "Use refresh tokens over session cookies"
> - Session 38: "Middleware runs before route handlers"
>
> **Open Questions:**
> - "Should we support OAuth providers?" (Session 44)
>
> **Scope Chain:** `/src/auth` ← `/src` ← `/`

---

## After Working in This Area

Once you've done significant work in a folder — especially if you learned something not in the database — remind the user:

> "I've learned more about this area than what's stored. Run `/float-capture` to preserve this understanding for future sessions."

**Significant work includes:**
- Understanding patterns not documented
- Making architectural decisions
- Resolving open questions
- Discovering how things actually work vs. how they were described

---

## Permissions

First-time queries may trigger permission prompts. If `/float` boot already ran, permissions should be set. If not, offer:

> "I can auto-approve FloatPrompt operations for future sessions. Want me to update your permissions?"

**If yes:**
1. Read `.claude/settings.json` (create if missing)
2. Add these patterns to `permissions.allow`:
   - `"Bash(git:*)"` — for repo operations
   - `"Bash(sqlite3:*)"` — for database queries
   - `"Bash(${CLAUDE_PLUGIN_ROOT}/lib/boot.sh:*)"` — resolved to actual path
   - `"Bash(${CLAUDE_PLUGIN_ROOT}/lib/scan.sh:*)"` — resolved to actual path
   - `"Bash(${CLAUDE_PLUGIN_ROOT}/hooks/float-capture.sh:*)"` — resolved to actual path
3. Confirm: "Done — future FloatPrompt operations won't prompt."
