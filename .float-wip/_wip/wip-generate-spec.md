# generate.ts Specification

**Date:** 2026-01-03
**Status:** Ready for implementation

---

## The Big Picture

### The Problem

65 folders need context. But they have **dependencies**:
- Child folders need parent scope context
- `parent_scope_path` must exist before children can inherit
- Descriptions of parents help AI understand children

### The Solution: Level-Order Traversal

Process folders by depth — parents complete before children start.

```
Depth 0: /                    → process completely
Depth 1: /src, /bin, /docs    → process completely (root done)
Depth 2: /src/db, /docs/specs → process completely (depth 1 done)
...
```

**One pass. Level by level. Everything for each folder before moving deeper.**

### Why This Works

- Parents always finish before children start
- Siblings are independent — can run in parallel
- AI generates ALL fields at once (scope + description + content)
- No need for multiple passes

### The Algorithm

```typescript
for (let depth = 0; depth <= maxDepth; depth++) {
  const folders = getFoldersByDepth(depth, 'pending');

  for (const folder of folders) {  // or parallel in fleet mode
    const details = getFolderDetails(folder.path, { includeContents: true });

    // AI generates everything:
    // - is_scope, type, parent_scope_path
    // - description, content_md
    // - scope_boot (if is_scope)

    updateFolderContext(folder.path, aiResult, 'claude-opus-4.5');
  }
}
```

**Single chat mode:** Process folders one by one within each level.
**Fleet mode:** Spawn buoys to process level in parallel, wait, then next level.

---

## What This File Does

`src/db/generate.ts` provides TypeScript functions that AI calls to populate context in SQLite.

**NOT what it does:**
- Does not contain AI logic
- Does not call AI APIs
- Does not make decisions about content

**What it does:**
- Query database for folders needing context
- Provide folder details for AI to read
- Write AI-generated content back to database
- Handle status transitions

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    generate.ts                          │
│  getFoldersByDepth | getMaxDepth | getFolderDetails    │
│  updateFolderContext | getScopeChain                   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              CLI wrapper (bin/float-db.ts)              │
│  Parses args → calls functions → outputs JSON           │
└────────────────────────┬────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          ▼                             ▼
┌─────────────────────┐     ┌─────────────────────────────┐
│   Single Chat Mode  │     │        Fleet Mode           │
│   Claude calls via  │     │   TypeScript orchestrator   │
│   Bash, orchestrates│     │   spawns buoys, each buoy   │
│   the loop itself   │     │   calls CLI for its folder  │
└─────────────────────┘     └─────────────────────────────┘
```

**Same functions. Same CLI. Different orchestrator.**

---

## Functions Needed

### 1. `getFoldersByDepth(depth: number, status?: FolderStatus)`

**Purpose:** Return folders at a specific depth level for level-order processing.

**Query:**
```sql
SELECT path, name, parent_path, type, is_scope, status,
       description, content_md, parent_scope_path
FROM folders
WHERE CASE WHEN path = '/' THEN 0
      ELSE LENGTH(path) - LENGTH(REPLACE(path, '/', ''))
      END = ?
  AND (status = ? OR ? IS NULL)
ORDER BY path
```

**Return:** `FolderRow[]`

**Example usage:**
```typescript
// Process all pending folders, level by level
for (let depth = 0; depth <= maxDepth; depth++) {
  const folders = getFoldersByDepth(depth, 'pending');
  // Process this level (parallel safe within level)
}
```

**Depth calculation:**
- Root `/` → depth 0 (special case)
- `/src` → 1 slash → depth 1
- `/src/db` → 2 slashes → depth 2

**Actual distribution (65 folders):**
| Depth | Count | Examples |
|-------|-------|----------|
| 0 | 1 | `/` |
| 1 | 7 | `/src`, `/bin`, `/docs` |
| 2 | 18 | `/src/db`, `/docs/specs` |
| 3 | 10 | ... |
| 4-7 | 29 | deeper folders |

---

### 2. `getMaxDepth(status?: FolderStatus)`

**Purpose:** Find the deepest folder level to know when to stop iterating.

**Query:**
```sql
SELECT MAX(
  CASE WHEN path = '/' THEN 0
  ELSE LENGTH(path) - LENGTH(REPLACE(path, '/', ''))
  END
) as max_depth
FROM folders
WHERE status = ? OR ? IS NULL
```

**Return:** `number` (currently 7 for this repo)

---

### 3. `getFolderDetails(path: string, options?: { includeContents?: boolean })`

**Purpose:** Give AI enough information to generate context for one folder.

**Options:**
- `includeContents: false` (default) — For buoy fleet: names + sizes only (fast, parallel)
- `includeContents: true` — For single chat: include file contents (rich, slower)

**Return shape:**
```typescript
{
  path: string
  name: string
  parent_path: string | null
  depth: number

  // What's IN this folder
  files: {
    name: string
    size: number
    extension: string
    content?: string  // Only if includeContents: true
  }[]
  childFolders: string[]

  // Context from hierarchy (from DB, already generated in earlier passes)
  parentDescription?: string
  parentScopeBoot?: string    // If parent is a scope
  siblingNames?: string[]

  // Existing content (for stale regeneration)
  currentDescription?: string
  currentContentMd?: string

  // Scope heuristics (mechanical, not AI judgment)
  heuristics: {
    hasPackageJson: boolean
    hasReadme: boolean
    fileCount: number
    childFolderCount: number
  }
}
```

**Note:** Heuristics included here (not separate function) since we're already reading the folder.

---

### 4. `updateFolderContext(path: string, context: UpdateContext, ai_model: string)`

**Purpose:** Write AI-generated content to database.

**Input shape:**
```typescript
interface UpdateContext {
  // Required
  description: string        // 1-2 sentence orientation ("what's here")
  content_md: string         // Deeper understanding ("what it means")

  // Optional (for scope detection in Pass 1)
  type?: FolderType          // folder | scope | log_root | log_year | log_month
  is_scope?: boolean         // Is this folder an autonomous world?
  scope_boot?: string        // Boot context for scopes
  parent_scope_path?: string // Pointer to parent scope
}
```

**`ai_model` parameter:** Passed by caller (e.g., `"claude-opus-4.5"`, `"claude-haiku"`). Enables provenance tracking — know which model wrote which content.

**SQL:**
```sql
UPDATE folders SET
  description = ?,
  content_md = ?,
  type = COALESCE(?, type),
  is_scope = COALESCE(?, is_scope),
  scope_boot = COALESCE(?, scope_boot),
  parent_scope_path = COALESCE(?, parent_scope_path),
  status = 'current',
  ai_model = ?,
  ai_updated = ?,
  updated_at = ?
WHERE path = ?
```

---

### 5. `getScopeChain(path: string)`

**Purpose:** Get boot context chain for a folder.

**Logic:**
```
/packages/web-app/src/auth
→ Walk up via parent_scope_path until NULL
→ Return: [root_scope, web_app_scope, auth_scope (if is_scope)]
```

**Return:**
```typescript
{
  path: string
  scope_boot: string | null
}[]
```

**Use case:** When generating content for `/packages/web-app/src/auth`, AI can see the boot context from all parent scopes to understand the full hierarchy.

---

## Answered Questions

### Query/Return Questions

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| Q1 | Return all folders or paginate? | **C) By depth level** | Level-order traversal. Return all folders at depth N, process, then depth N+1 |
| Q2 | Additional fields for pending? | **B) Include depth** | Need depth for level-order processing |
| Q3 | Same shape for stale vs pending? | **B) Stale includes current values** | AI needs to see what exists to update it |

### Folder Details Questions

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| Q4 | Read file contents? | **D) Dual mode** | `includeContents: boolean` option. Names+size for fleet, full content for single chat |
| Q5 | How much hierarchy context? | **B) Parent + siblings** | Parent description for context, sibling names for positioning |
| Q6 | Include file previews? | **Superseded by Q4** | Dual mode covers both cases |

### Update Questions

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| Q7 | ai_model value? | **B) Passed as param** | Caller knows which model. Enables provenance tracking |
| Q8 | Validate input? | **C) Basic checks only** | Check required fields exist, trust content. AI is the author |

### Scope Questions

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| Q9 | getScopeChain for generation? | **A) Yes, AI needs it** | During Pass 2, children need parent scope's boot context |
| Q10 | Scope heuristics separate? | **B) Part of getFolderDetails** | Already reading folder anyway, return heuristics object |
| Q11 | Trust high-confidence heuristics? | **B) Trust high, confirm medium/low** | Root and package.json = auto-scope. Others need AI judgment |

---

## Dependencies

**Imports from existing files:**
- `schema.ts` — FolderSchema, FolderType, FolderStatus
- `client.ts` — getDb(), database connection

**New imports needed:**
- `fs` — for reading file info
- `path` — for path manipulation
- `crypto` — if we need to hash anything

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| Folder path doesn't exist in DB | Throw error |
| Update fails | Throw error with path |
| File read fails | Skip file, continue |
| Empty folder | Valid, return empty arrays |

---

## Function Summary

| Function | Purpose |
|----------|---------|
| `getFoldersByDepth(depth, status?)` | Get folders at depth N for level-order processing |
| `getMaxDepth(status?)` | Find deepest level to know when to stop |
| `getFolderDetails(path, options?)` | Full folder info + heuristics for AI |
| `updateFolderContext(path, context, ai_model)` | Write all AI-generated content to DB |
| `getScopeChain(path)` | Get parent scopes for context inheritance |

---

## Testing Plan

1. **Unit tests:**
   - `getFoldersByDepth` returns correct subset at each level
   - `getFolderDetails` returns expected shape (with/without contents)
   - `updateFolderContext` writes correctly, sets status='current'
   - `getScopeChain` walks hierarchy correctly

2. **Integration test:**
   - Full generation: level-by-level, all 65 folders
   - Verify all folders reach status='current'
   - Verify scope chains are correct

---

## Assumptions to Verify

Before implementing, confirm these are correct:

### Database Assumptions

| Assumption | Status | Notes |
|------------|--------|-------|
| 65 folders exist with `status='pending'` | ✓ Verified | All need initial context |
| Depth 0-7 is the range | ✓ Verified | 8 levels total |
| Root is `/`, children use `/name` format | ✓ Verified | Relative paths, not full filesystem |
| `parent_path` is set correctly for all folders | ✓ Verified | Root has NULL, children point to parent |
| Files table has content for `includeContents` mode | ✗ NO | Files table only has `content_hash`, not actual content |

**Important:** `includeContents` mode must read from filesystem, not database. The `files` table stores:
- `path` (file path)
- `folder_path` (parent folder)
- `content_hash` (for change detection)
- `mtime` (modification time)

To get actual content, we read from disk using the project root + relative path.

### Algorithm Assumptions

| Assumption | Status |
|------------|--------|
| Siblings are independent | ✓ True — they don't reference each other |
| Parents must complete before children | ✓ True — level-order guarantees this |
| AI generates all fields at once | ✓ Simpler than multi-pass |
| Level-order = correct dependency order | ✓ Verified by database structure |

### Scope Detection Assumptions

| Assumption | Notes |
|------------|-------|
| Root `/` is always a scope | Obvious |
| `package.json` presence = scope | Monorepo pattern |
| AI confirms medium/low confidence | User decides borderline cases |
| `parent_scope_path` points to nearest ancestor scope | Not just parent folder |

### Resolved Concerns

| Concern | Resolution |
|---------|------------|
| Pass 1 needs folder content? | Yes — AI needs full context for scope detection. Single pass. |
| Two passes or one? | **One pass.** Level-order guarantees parents before children. |
| What triggers it? | Single command: `float generate` (or similar) |

---

---

## Orchestration

**Who calls the functions? How does the loop run?**

### Single Chat Mode (Phase 1)

Human runs a command, AI orchestrates within the conversation:

```
Human: "Run float generate"

AI:
1. Calls getMaxDepth() → 7
2. For depth 0..7:
   - Calls getFoldersByDepth(depth, 'pending')
   - For each folder:
     - Calls getFolderDetails(path, { includeContents: true })
     - Generates context (description, content_md, scope fields)
     - Calls updateFolderContext(path, result, 'claude-opus-4.5')
   - Reports progress: "Depth 2 complete (18 folders)"
3. Done: "65 folders processed"
```

**Trigger:** Slash command `/float generate` or similar.

**Who orchestrates:** The AI in the conversation. Functions are tools it calls.

### Fleet Mode (Phase 2 — Future)

TypeScript orchestrator spawns buoys:

```typescript
// src/orchestrate.ts (future)
for (let depth = 0; depth <= maxDepth; depth++) {
  const folders = getFoldersByDepth(depth, 'pending');

  // Spawn buoys in parallel for this level
  await Promise.all(folders.map(folder =>
    spawnBuoy('folder-context', { path: folder.path })
  ));

  // Wait for level to complete before next depth
}
```

**Trigger:** CLI command `float generate --fleet`

**Who orchestrates:** TypeScript code. Buoys are AI agents with the floatprompt.

### Orchestration Decisions (Locked)

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| O1 | Where do functions live? | **generate.ts + CLI wrapper** | Functions exported from generate.ts, thin CLI wraps them for Bash access |
| O2 | How does AI call them? | **Bash + CLI** | No MCP overhead. CLI outputs JSON. Claude parses. Simple. |
| O3 | Progress reporting? | **Database IS progress** | Query `status` field. No special mechanism needed. |

### Why Not MCP?

MCP requires:
- Running MCP server process
- Configuring Claude Code to connect
- Another thing to debug

CLI requires:
- `npx float-db folders --depth 2 --status pending` → JSON
- Claude calls via Bash
- Done

Same power, less infrastructure.

### CLI Interface

```bash
# Get folders at depth
float-db folders --depth 2 --status pending
# → [{ "path": "/src/db", "name": "db", ... }, ...]

# Get folder details
float-db details /src/db --include-contents
# → { "path": "/src/db", "files": [...], "heuristics": {...} }

# Update folder context
float-db update /src/db --json '{"description": "...", "content_md": "..."}'
# → { "success": true, "path": "/src/db" }

# Get max depth
float-db max-depth --status pending
# → { "maxDepth": 7 }

# Get scope chain
float-db scope-chain /src/db
# → [{ "path": "/", "scope_boot": "..." }]
```

---

## AI Instructions

**What prompt tells AI how to generate folder context?**

### Input (what AI receives)

The output of `getFolderDetails()`:

```json
{
  "path": "/src/db",
  "name": "db",
  "parent_path": "/src",
  "depth": 2,
  "files": [
    { "name": "schema.ts", "size": 4521, "extension": ".ts", "content": "..." },
    { "name": "client.ts", "size": 2103, "extension": ".ts", "content": "..." }
  ],
  "childFolders": [],
  "parentDescription": "Source code for the FloatPrompt system",
  "siblingNames": ["cli", "utils"],
  "heuristics": {
    "hasPackageJson": false,
    "hasReadme": false,
    "fileCount": 5,
    "childFolderCount": 0
  }
}
```

### Output (what AI must return)

```json
{
  "description": "Database layer for FloatPrompt. SQLite schema, queries, and CRUD operations.",
  "content_md": "## Purpose\n\nThis folder contains the persistence layer...\n\n## Key Files\n\n- `schema.ts` — Zod schemas and SQL DDL\n- `client.ts` — Database connection and queries\n...",
  "is_scope": false,
  "type": "folder",
  "parent_scope_path": "/"
}
```

### Instructions (the prompt)

```markdown
You are generating context for a folder in a codebase.

## Your Task

Given folder details, generate:

1. **description** (required)
   - 1-2 sentences
   - What IS this folder? What's its purpose?
   - Write for someone landing here cold

2. **content_md** (required)
   - Markdown, 100-500 words
   - Deeper understanding: key files, patterns, relationships
   - What would help someone work here effectively?

3. **is_scope** (required)
   - Is this folder an "autonomous world"?
   - TRUE if: has package.json, is a major subsystem, could have its own boot context
   - FALSE if: just a folder grouping related files

4. **type** (required)
   - "folder" (default)
   - "scope" (if is_scope = true)
   - "log_root", "log_year", "log_month" (for log hierarchies)

5. **parent_scope_path** (required)
   - Path to the nearest ancestor that is a scope
   - Walk up from parent until you find is_scope = true
   - Root "/" is always a scope

6. **scope_boot** (only if is_scope = true)
   - Boot context for this scope
   - What should AI know when entering this world?

## Heuristics

Use these mechanical signals:
- hasPackageJson = true → likely a scope
- hasReadme = true at depth 1-2 → consider scope
- Root "/" → always a scope

## Output Format

Return valid JSON matching the UpdateContext interface.
```

### Questions

| Question | Options |
|----------|---------|
| How verbose should content_md be? | A) 100-300 words, B) 300-500 words, C) Adaptive to folder size |
| Include file-by-file breakdown? | A) Yes always, B) Only for small folders, C) Only key files |
| Scope detection confidence? | A) Binary yes/no, B) Include confidence level |
| Format of scope_boot? | A) Prose, B) Bullet points, C) Structured sections |

---

## Next Steps

1. ~~Answer Q1-Q11~~ ✓ All answered
2. ~~Lock algorithm~~ ✓ Single-pass, level-order
3. ~~Verify assumptions~~ ✓ Database verified, concerns resolved
4. ~~Spec orchestration~~ ✓ Single chat + fleet modes defined
5. ~~Spec AI instructions~~ ✓ Input/output/prompt defined
6. ~~Lock O1-O3~~ ✓ CLI interface, no MCP, DB is progress
7. **Answer A1-A4** ← AI instruction details (or defer to implementation)
8. **Implement generate.ts** ← 5 functions
9. **Build CLI wrapper** ← float-db command
10. Build test coverage
11. Create floatprompt tool for orchestration

---

*Updated 2026-01-03 — O1-O3 locked: CLI interface, no MCP, database is progress tracker*
