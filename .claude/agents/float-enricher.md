---
name: float-enricher
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
node lib/float-db.js details /path/to/folder
```

This returns:
- `description`: Current one-liner (may be empty or stale)
- `context`: Current rich context (may be empty or stale)
- `status`: pending | current | stale
- Child folders and files

### 2. Get Folder Contents (if needed)

```bash
node lib/float-db.js details /path/to/folder --include-contents
```

Use this if you need to see actual file contents to understand what the folder does.

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
node lib/float-db.js update /path/to/folder --json '{
  "description": "One-liner: what is this folder?",
  "context": "Richer context: patterns, conventions, insights learned",
  "status": "current"
}'
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

## What NOT to Do

- Don't update if you have nothing new to add
- Don't generate generic boilerplate ("This folder contains code...")
- Don't repeat what's obvious from filenames
- Don't write context for context's sake

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
