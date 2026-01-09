---
name: float-enrich
description: Update folder context in float.db after session work. Spawned by SessionEnd hook with list of edited folders.
tools: Read, Bash, Glob
---

# Folder Enricher

**Purpose:** Reconcile folder context in float.db with what was learned this session.

**Called by:** SessionEnd hook (automatic) or manually when context needs updating.

---

## Inputs

You receive:

```json
{
  "folders_edited": ["/src/auth", "/src/utils"],
  "session_summary": "User implemented JWT refresh token rotation..."
}
```

---

## What You Do

For each folder in `folders_edited`:

### 1. Get Current State from float.db

```bash
sqlite3 .float/float.db "SELECT path, description, context, status FROM folders WHERE path = '/src/auth';"
```

Returns pipe-separated: `path|description|context|status`

To see child folders:
```bash
sqlite3 .float/float.db "SELECT path, name, description FROM folders WHERE parent_path = '/src/auth';"
```

### 2. Read Folder Contents (if needed)

Use the Read tool or Glob to understand what the folder contains:

```bash
ls -la /src/auth/
```

Or read specific files to understand patterns and purpose.

### 3. Reconcile

Compare:
- What float.db currently says about this folder
- What you now understand from the session work
- What the folder actually contains

Ask yourself:
- Is there new understanding worth capturing?
- Is the existing description still accurate?
- Did the folder's purpose or patterns change?

### 4. Update (if warranted)

If you have better understanding than what's stored:

```bash
sqlite3 .float/float.db "UPDATE folders SET
  description = 'Authentication module with JWT refresh token rotation',
  context = 'Handles JWT access and refresh tokens. Key patterns:
- Refresh tokens stored in httpOnly cookies
- Access tokens short-lived (15min)
- Rotation on each refresh for security
Uses jsonwebtoken library.',
  status = 'current',
  ai_model = 'claude-sonnet-4',
  ai_updated = unixepoch(),
  updated_at = unixepoch()
WHERE path = '/src/auth';"
```

**description:** Brief (one sentence). What IS here.
**context:** Richer (a few paragraphs max). What it MEANS — patterns, conventions, relationships, things a future AI should know.

If the existing context is still accurate and you have nothing to add, skip the update.

---

## Writing Good Context

**description** answers: "What is this folder?"
- "Authentication module. JWT handling and session management."
- "Database migrations. Schema changes in chronological order."
- "Shared React hooks. Custom hooks used across components."

**context** answers: "What should a future AI know about working here?"
- Key patterns or conventions
- Important relationships to other folders
- Decisions that shaped the code
- Gotchas or non-obvious things

Keep it useful, not exhaustive. Future sessions can enrich further.

---

## SQL Reference

**Query folder:**
```sql
SELECT path, description, context, status, ai_model, ai_updated
FROM folders WHERE path = ?;
```

**Query children:**
```sql
SELECT path, name, description, status
FROM folders WHERE parent_path = ?;
```

**Update folder:**
```sql
UPDATE folders SET
  description = ?,
  context = ?,
  status = 'current',
  ai_model = 'claude-sonnet-4',
  ai_updated = unixepoch(),
  updated_at = unixepoch()
WHERE path = ?;
```

**Check if folder exists:**
```sql
SELECT 1 FROM folders WHERE path = ?;
```

---

## What NOT to Do

- Don't update if you have nothing new to add
- Don't generate generic boilerplate ("This folder contains code...")
- Don't repeat what's obvious from filenames
- Don't write context for context's sake
- Don't forget to escape single quotes in SQL (use '' for literal ')

---

## Output

Return a summary:

```
Enriched:
- /src/auth — Updated description and context (JWT refresh patterns)
- /src/utils — Updated context only (new date helpers)

Skipped:
- /src/types — No new understanding to add
```
