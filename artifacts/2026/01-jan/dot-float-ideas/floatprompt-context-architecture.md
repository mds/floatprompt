# FloatPrompt: The Context Management System

> **From database to deployed context in milliseconds.**

---

## The Realization

We've been building a CMS this whole time.

Not a Content Management System — a **Context Management System**.

The pattern is identical:

| Traditional CMS | FloatPrompt CMS |
|-----------------|-----------------|
| Database stores content | SQLite stores folder metadata, relationships, logs |
| Admin interface for editing | AI + human collaboration updates context |
| Build step generates static HTML | Build step generates static context files |
| CDN serves pages instantly | AI reads pre-assembled context instantly |
| Rebuild on content change | Rebuild on file/folder change |

WordPress doesn't query MySQL on every page view. It pre-renders. Gatsby doesn't hit the CMS on every request. It builds static files.

**FloatPrompt shouldn't query SQLite on every AI session. It should serve pre-built context.**

---

## The Problem (Precisely Stated)

### Current Architecture

```
AI Session Starts
       ↓
Read boot.md (file I/O)
       ↓
Query SQLite: current folder
       ↓
Query SQLite: parent scope
       ↓
Query SQLite: root scope
       ↓
Query SQLite: relevant log entries
       ↓
Assemble context in memory
       ↓
Feed to AI
```

**Six operations minimum.** For a deep path like `/packages/web-app/src/features/auth/hooks`, that's:

- 1 boot.md read
- 5+ folder queries (one per path segment)
- 1+ log queries per relevant folder
- String concatenation to assemble final context

It's not *slow* — SQLite is fast. But it's **unnecessary work repeated every session**.

### The Deeper Problem

The real cost isn't query time. It's **cognitive overhead**:

1. **Assembly logic lives somewhere** — code that knows how to traverse the scope chain, what to include, what to exclude, how to format it. This logic runs every time.

2. **No caching layer** — every session does the same work. Session A and Session B hitting `/src/auth` both query and assemble from scratch.

3. **Context shape isn't guaranteed** — the assembly might produce slightly different results based on timing, race conditions, or code changes. AI gets inconsistent context.

4. **Debugging is hard** — when AI behaves unexpectedly, you can't easily see "what context did it actually receive?" You'd have to replay the assembly logic.

5. **No preview** — humans can't easily review what context AI will see for a given location.

---

## The Vision (Precisely Stated)

### The End State

```
AI Session Starts
       ↓
Determine current path
       ↓
Read one file: .float/context/{path-hash}.md
       ↓
Feed to AI
```

**One file read. Zero queries. Zero assembly.**

The context file contains everything:
- Root boot context
- Full scope chain (already traversed)
- Current folder context
- Relevant log entries (already filtered)
- Cross-references to related scopes (already resolved)

Pre-computed. Pre-formatted. Ready to consume.

### The Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     SOURCE OF TRUTH                          │
│                                                              │
│  .float/float.db                                             │
│  ├── folders (65 rows)      ← structure, metadata, AI content│
│  ├── files (447 rows)       ← hashes for change detection    │
│  ├── log_entries            ← decision history               │
│  └── ...                                                     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ BUILD STEP
                              │ (triggered by changes)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                     STATIC CONTEXT LAYER                     │
│                                                              │
│  .float/context/                                             │
│  ├── _root.md               ← root scope, always included    │
│  ├── src.md                 ← /src scope chain               │
│  ├── src--auth.md           ← /src/auth full context         │
│  ├── src--auth--hooks.md    ← /src/auth/hooks full context   │
│  ├── packages--web-app.md   ← /packages/web-app scope        │
│  └── ...                                                     │
│                                                              │
│  (One file per folder. Pre-assembled. Ready to read.)        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              │ AI SESSION
                              │ (reads one file)
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                        AI CONTEXT                            │
│                                                              │
│  Single markdown file containing:                            │
│  - Project boot (from root)                                  │
│  - Scope chain (ancestors with is_scope=true)                │
│  - Current folder context                                    │
│  - Relevant logs                                             │
│  - Navigation hints                                          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### The Analogy

**SQLite is the database. Context files are the deployed website.**

You don't give users access to your MySQL database. You build HTML and serve that.

You don't give AI access to raw SQLite. You build context files and serve those.

---

## The Static Context File Format

Each generated context file is a complete, standalone document. AI reads it and has everything needed for that location.

### Structure

```markdown
# FloatPrompt Context: /src/auth

> Generated: 2026-01-03T14:32:00Z
> Source: .float/float.db (hash: a1b2c3d4)
> Status: current

---

## Project Boot

[Contents of root scope_boot — the foundational system prompt]

This is FloatPrompt, the invisible OS for AI...

---

## Scope Chain

### / (root)
FloatPrompt: The invisible OS for AI. A portable format for AI tools 
that preserves human voice and produces structured artifacts.

### /src (scope)
TypeScript source code. Database layer, CLI tools, and context 
generation for FloatPrompt system.

---

## Current Location: /src/auth

### Description
Authentication module. JWT handling, session management, and 
permission checks for the FloatPrompt API.

### Context
[Full content_md for this folder — patterns, conventions, insights]

### Contents
- `jwt.ts` — JWT token generation and validation
- `session.ts` — Session lifecycle management  
- `permissions.ts` — Role-based access control
- `index.ts` — Public API exports

### Recent Decisions
**2026-01-02: Switched from cookies to bearer tokens**
Rationale: Better support for CLI and API clients...

**2025-12-28: Added refresh token rotation**
Rationale: Security best practice...

---

## Navigation

**Parent:** /src (TypeScript source)
**Siblings:** /src/db, /src/cli, /src/tools
**Children:** none

**Related Scopes:** 
- /docs/specs (API specification)
- /templates (ships auth patterns to users)

---

*Context generated by FloatPrompt. Source of truth: .float/float.db*
```

### Key Properties

1. **Self-contained** — No external references needed to understand
2. **Hierarchical** — Scope chain is pre-traversed, included in order
3. **Timestamped** — AI knows how fresh this context is
4. **Navigable** — Hints for where to look next
5. **Auditable** — Human can read exactly what AI will see

---

## The Build System

### Trigger Conditions

Context files are rebuilt when:

1. **File changes** — Scanner detects new hash for files in a folder
2. **Folder changes** — New folder created, folder deleted, folder renamed
3. **Context updates** — AI writes new `description` or `content_md` to database
4. **Log entries** — New decision logged for a folder
5. **Manual command** — `float build` forces full rebuild
6. **Scope change** — Folder marked as scope, or scope unmarked

### Rebuild Strategy

**Not everything rebuilds on every change.**

```
Change in /src/auth/jwt.ts
       ↓
Mark /src/auth as stale
       ↓
Rebuild /src/auth context file
       ↓
Mark /src as stale (parent)
       ↓
Rebuild /src context file
       ↓
Mark / as stale (root)
       ↓
Rebuild / context file
       ↓
Done (siblings like /src/db NOT rebuilt)
```

**Staleness bubbles UP, not sideways.**

A change in `/src/auth` affects:
- `/src/auth` (direct)
- `/src` (parent scope)
- `/` (root scope)

It does NOT affect:
- `/src/db` (sibling)
- `/packages/web-app` (unrelated scope)
- `/docs` (unrelated)

### Parallel Rebuilding (Buoys)

When many folders are stale, spawn parallel workers:

```
50 folders marked stale
       ↓
Spawn 50 buoys (one per folder)
       ↓
Each buoy:
  1. Query SQLite for folder + ancestors + logs
  2. Assemble context markdown
  3. Write to .float/context/{path-hash}.md
       ↓
All 50 complete in ~same time as 1
```

The build step is embarrassingly parallel. No folder's context depends on another folder's context (ancestors are queried from SQLite, not from other context files).

---

## The Token Economy

### Problem: Context Files Could Be Huge

A deep folder like `/packages/web-app/src/features/auth/components/LoginForm` would include:

- Root boot (500 tokens)
- `/packages` scope (200 tokens)
- `/packages/web-app` scope (800 tokens)
- `/packages/web-app/src` (300 tokens)
- `/packages/web-app/src/features` (200 tokens)
- `/packages/web-app/src/features/auth` scope (600 tokens)
- `/packages/web-app/src/features/auth/components` (400 tokens)
- Current folder (500 tokens)
- Logs for all relevant folders (??? tokens)

Could easily hit 5,000+ tokens before AI does anything.

### Solution: Tiered Context

Generate multiple versions of each context file:

```
.float/context/
├── src--auth.minimal.md    (< 500 tokens — description only)
├── src--auth.standard.md   (< 2000 tokens — scope chain + context)
├── src--auth.full.md       (< 5000 tokens — everything including logs)
└── src--auth.deep.md       (unlimited — full history, all cross-refs)
```

**AI (or tooling) chooses the tier based on task:**

- Quick question → minimal
- Normal work → standard  
- Debugging/archaeology → full
- Deep research → deep

### Solution: Scope Summarization

Instead of including full `content_md` for every ancestor, include **summarized** versions:

```markdown
## Scope Chain (summarized)

### / (root)
FloatPrompt: Portable AI tools preserving human voice.

### /src
TypeScript implementation: DB, CLI, context generation.

### /src/auth (current)
[FULL content_md here — no summarization for current location]
```

Ancestors get one-line descriptions. Current location gets full context.

### Solution: Log Windowing

Don't include all logs. Include:

- Last 5 decisions for current folder
- Last 2 decisions for each ancestor scope
- Any decision tagged as "architectural" or "breaking"

```markdown
### Recent Decisions (windowed)

**Current folder (/src/auth):**
- 2026-01-02: Switched to bearer tokens
- 2025-12-28: Added refresh rotation
- 2025-12-15: Extracted from monolith

**Parent scope (/src):**
- 2026-01-01: Adopted strict TypeScript
- 2025-12-20: Moved to ESM

**Architectural (any scope):**
- 2025-11-01: SQLite chosen over Postgres
```

---

## The Invalidation Problem

### Cache Invalidation Is Hard

The classic computer science problem. When is a context file stale?

**Easy cases:**
- File in folder changes → folder is stale
- Folder's `content_md` updated → folder is stale
- New log entry for folder → folder is stale

**Hard cases:**
- Ancestor scope's boot changes → all descendants are stale
- Cross-reference target changes → referencing folders are stale
- Schema migration → everything might be stale

### Solution: Generation Hashing

Each context file includes a hash of its inputs:

```markdown
> Source Hash: sha256(folder.content_md + ancestor_hashes + log_hashes)
```

Build system can quickly check:
1. Compute current input hash
2. Compare to stored hash in context file
3. If different → rebuild

This is how static site generators work. Gatsby, Hugo, Next.js — all use content hashing to avoid unnecessary rebuilds.

### Solution: Dependency Tracking

Store explicit dependencies in the database:

```sql
context_dependencies (
  context_path TEXT,      -- '/src/auth'
  depends_on_path TEXT,   -- '/src' (ancestor)
  depends_on_type TEXT,   -- 'scope_boot' | 'content_md' | 'log_entry'
  depends_on_id TEXT      -- specific row/entry ID
)
```

When anything changes, query: "What context files depend on this?"

Rebuild exactly those. Nothing more.

---

## The Developer Experience

### Commands

```bash
# Full rebuild (nuclear option)
float build

# Rebuild specific path
float build /src/auth

# Rebuild stale only (smart rebuild)
float build --stale

# Watch mode (rebuild on change)
float watch

# Preview context for a path (without writing file)
float context /src/auth

# Validate all context files against database
float validate
```

### Integration with Existing Workflow

```bash
# Scanner runs (Layer 1 — mechanical)
float scan
# Result: float.db updated, stale folders marked

# AI generates context (Layer 2 — buoys)
float generate --stale
# Result: description and content_md populated in float.db

# Build static context (NEW — Layer 2.5)
float build --stale
# Result: .float/context/ files generated

# AI session reads context (Layer 3 — runtime)
# (Handled by boot.md pointing to context files)
```

### Git Integration

```
.float/
├── float.db          ← .gitignore (local state)
├── context/          ← .gitignore (generated, rebuild from DB)
└── boot.md           ← tracked (system prompt, rarely changes)
```

Context files are **generated artifacts**. Like `node_modules` or `dist/`. Don't commit them. Rebuild on clone.

Alternative: commit context files for instant cold start (no rebuild needed). Trade-off: merge conflicts, repo bloat.

---

## The AI Experience

### Before (Query-Based)

```
AI: I need context for /src/auth.

1. Read boot.md
2. Connect to SQLite
3. SELECT * FROM folders WHERE path = '/src/auth'
4. SELECT * FROM folders WHERE path = '/src'
5. SELECT * FROM folders WHERE path = '/'
6. SELECT * FROM log_entries WHERE folder_path = '/src/auth'
7. Assemble all results into context string
8. Process context string
9. Begin task
```

### After (Static Context)

```
AI: I need context for /src/auth.

1. Read .float/context/src--auth.standard.md
2. Begin task
```

**From 9 steps to 2.**

### boot.md Changes

The boot.md file teaches AI how to use the system. It changes from:

**Before:**
```markdown
## How to Get Context

1. Connect to .float/float.db
2. Query folders table for current path
3. Traverse parent_scope_path to build scope chain
4. Query log_entries for relevant decisions
5. Assemble context from query results
```

**After:**
```markdown
## How to Get Context

Read .float/context/{path}.standard.md

That file contains everything you need:
- Project boot
- Scope chain (pre-traversed)
- Current folder context
- Recent decisions

If you need more detail, read the .full.md version.
If you need history, read the .deep.md version.
```

Simpler instructions. Faster execution. Same result.

---

## The Implementation Path

### Phase 1: Context Builder (MVP)

```typescript
// src/build/context.ts

interface BuildOptions {
  path?: string;        // specific path, or all if omitted
  tier?: 'minimal' | 'standard' | 'full' | 'deep';
  force?: boolean;      // rebuild even if not stale
}

async function buildContext(db: Database, options: BuildOptions): Promise<void> {
  // 1. Get folders to build
  const folders = options.path 
    ? [await db.getFolder(options.path)]
    : await db.getStaleFolders();
  
  // 2. For each folder, assemble context
  for (const folder of folders) {
    const context = await assembleContext(db, folder, options.tier);
    const outputPath = getContextPath(folder.path, options.tier);
    await writeFile(outputPath, context);
    await db.markFolderBuilt(folder.path);
  }
}

async function assembleContext(
  db: Database, 
  folder: Folder, 
  tier: string
): Promise<string> {
  // 1. Get scope chain
  const scopeChain = await db.getScopeChain(folder.path);
  
  // 2. Get logs (windowed based on tier)
  const logs = await db.getLogsForContext(folder.path, tier);
  
  // 3. Get navigation hints
  const nav = await db.getNavigation(folder.path);
  
  // 4. Assemble markdown
  return renderContextMarkdown({
    folder,
    scopeChain,
    logs,
    nav,
    tier,
    generatedAt: new Date(),
    sourceHash: computeSourceHash(folder, scopeChain, logs)
  });
}
```

### Phase 2: Staleness Tracking

Add to database:

```sql
ALTER TABLE folders ADD COLUMN context_hash TEXT;
ALTER TABLE folders ADD COLUMN context_built_at INTEGER;
```

Build system checks:
```typescript
function needsRebuild(folder: Folder): boolean {
  const currentHash = computeSourceHash(folder, ...);
  return folder.context_hash !== currentHash;
}
```

### Phase 3: Watch Mode

```typescript
// Using chokidar or similar
const watcher = chokidar.watch(projectRoot, { ignoreInitial: true });

watcher.on('change', async (filePath) => {
  const folderPath = dirname(filePath);
  
  // Mark folder and ancestors as stale
  await db.markStale(folderPath);
  
  // Trigger rebuild
  await buildContext(db, { path: folderPath });
});
```

### Phase 4: Parallel Building (Buoys)

```typescript
async function buildAllStale(db: Database): Promise<void> {
  const staleFolders = await db.getStaleFolders();
  
  // Spawn parallel workers
  await Promise.all(
    staleFolders.map(folder => 
      buildContext(db, { path: folder.path })
    )
  );
}
```

For Claude Code buoys, this becomes spawning sub-agents instead of Promise.all.

---

## The Competitive Advantage

### What Exists Today

| Tool | Approach | Limitation |
|------|----------|------------|
| Cursor Rules | Static .cursorrules file | Single level, no hierarchy |
| CLAUDE.md | Static markdown file | Single level, no hierarchy |
| Codebase RAG | Embed chunks, retrieve | No structure, no relationships |
| Copilot Workspace | Black box context | No user control, no inspection |
| LangChain | Orchestration framework | Developer builds everything |

### What FloatPrompt Does Differently

1. **Hierarchical** — Scopes within scopes, context inherits
2. **Pre-computed** — No runtime assembly, instant load
3. **Inspectable** — Human reads same file AI reads
4. **Evolving** — Context improves through collaboration
5. **Structured** — Not just text, but relationships and history
6. **Portable** — Works with any AI (Claude, GPT, local models)

### The Moat

**The schema is the moat.**

Anyone can write a boot.md. Few will build:
- Recursive scope detection
- Parallel context generation
- Incremental rebuilding
- Log entry integration
- Cross-reference resolution
- Tiered context levels

FloatPrompt isn't a prompt. It's infrastructure.

---

## Open Questions

### 1. Path Encoding

How to encode paths as filenames?

Options:
- `src--auth.md` (double dash for separator)
- `src_auth.md` (underscore — conflicts with folder names)
- `src/auth.md` (nested folders — matches structure but deeper)
- `a1b2c3d4.md` (hash — opaque but safe)

Recommendation: Double dash (`--`) is readable, reversible, safe.

### 2. Context File Location

Where do generated context files live?

Options:
- `.float/context/` — clean separation
- `.float/deploy/` — emphasizes "built artifact" mental model
- `{folder}/.context.md` — co-located but clutters project

Recommendation: `.float/context/` — single location, easy to gitignore, easy to nuke.

### 3. Tier Selection

Who decides which tier to load?

Options:
- boot.md specifies default tier
- AI decides based on task
- User specifies in command
- Tool detects based on token budget

Recommendation: Default to `standard`, AI can request `full` or `deep` if needed.

### 4. Cross-Scope References

How to handle "Related Scopes" that might be in different parts of tree?

Options:
- Store explicit references in database
- AI infers from content analysis
- Human tags relationships manually

Recommendation: Start with AI inference, add explicit tagging as enhancement.

---

## The Name

FloatPrompt started as a prompt format. It evolved into:

- A file format (floatprompt)
- A system (FloatPrompt System)
- A methodology (FloatPrompt methodology)

Now it's becoming **infrastructure**. A **Context Management System**.

Possible names for this layer:
- **FloatContext** — the static context system
- **FloatBuild** — the build/deploy system
- **FloatDeploy** — emphasizes the "deploy" mental model
- **float.ctx** — the context layer

Or keep it all under FloatPrompt. The build step is just part of the system.

---

## Summary

### The Insight

FloatPrompt is a CMS — a **Context Management System**.

Like any CMS:
- Database stores the truth (SQLite)
- Build step generates static output (context files)
- Runtime reads static files (AI sessions)

### The Architecture

```
float.db (source of truth)
    ↓ build step
.float/context/*.md (static context)
    ↓ AI session
One file read, full understanding
```

### The Benefits

1. **Speed** — One file read vs. multiple queries
2. **Consistency** — AI always gets same context for same location
3. **Inspectability** — Human can read exactly what AI sees
4. **Debuggability** — Context is a file, not runtime assembly
5. **Portability** — Context files work with any AI
6. **Scalability** — Build step parallelizes infinitely

### The Path Forward

1. Build `float build` command (context generation)
2. Add staleness tracking to database
3. Implement tiered context (minimal/standard/full/deep)
4. Add watch mode for continuous rebuilding
5. Integrate with boot.md (teach AI to read context files)

---

*The invisible OS for AI — now with static context deployment.*

*2026-01-04*
