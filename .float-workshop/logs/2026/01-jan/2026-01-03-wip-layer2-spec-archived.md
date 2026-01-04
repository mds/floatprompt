# Layer 2 Spec

**Date:** 2026-01-03
**Status:** Draft

Layer 2 = AI generation. Populate `description`, `content_md`, `type`, `is_scope`, `scope_boot` for folders in SQLite.

---

## What We're Replacing

The old system (`.float-old/tools/`) was AI-only:
- `/float` → reads markdown files, checks health
- `/float-sync` → verifies nav files match folders
- `/float-context` → generates terrain maps

**Problems:**
- No source of truth — AI couldn't tell if files were stale
- No mechanical change detection — had to re-read everything
- Parallel AI work ("buoys") but no coordination layer
- Slow — every operation involved reading many files

**What worked:**
- Duality pattern (condition → action)
- Status output format
- Next-step logic
- Buoy prompts for parallel work

---

## What Layer 2 Does

Given: 65 folders with `status='pending'`, all AI fields NULL

Layer 2 populates:
- `type` — folder | scope | log_root | log_year | log_month
- `description` — quick orientation (1-2 sentences)
- `content_md` — deeper understanding (flexible prose)
- `is_scope` — boolean (is this a "world"?)
- `parent_scope_path` — pointer to parent scope
- `scope_boot` — boot context for scopes

And sets:
- `status` → 'current'
- `ai_model` → which model wrote this
- `ai_updated` → timestamp

---

## Open Questions

### Q1: Generation Trigger

**Question:** How does Layer 2 get invoked?

**Options:**
- A) CLI command: `float generate`
- B) Automatic after scan
- C) Per-folder on demand
- D) Batch via orchestrator

**Considerations:**
- Need to support first-time full generation (all 65 folders)
- Need to support incremental (only stale folders)
- Need to support manual single-folder regeneration

**Answer:** [TBD]

---

### Q2: Scope Detection

**Question:** How do we decide a folder is a scope (a "world")?

**Options:**
- A) Package.json presence
- B) README.md presence
- C) Folder depth heuristic (e.g., depth 1 = scope)
- D) AI judgment based on content
- E) Manual flag only
- F) Combination: heuristic + AI confirmation

**Considerations:**
- Scopes get their own boot context
- Scopes can spawn their own buoy teams
- Too many scopes = overhead
- Too few scopes = not enough granularity

**Answer:** [TBD]

---

### Q3: Order of Operations

**Question:** What order do we generate context?

**Options:**
- A) Top-down: root → children → grandchildren
- B) Bottom-up: leaves → parents → root
- C) Scopes first, then fill in children
- D) Parallel all at once, no ordering

**Considerations:**
- Parent context might need children's descriptions
- Children might need parent's patterns
- Scopes are natural boundaries

**Answer:** [TBD]

---

### Q4: What AI Reads

**Question:** What does AI read to generate context for a folder?

**Options:**
- A) All files in folder (full content)
- B) File names + first N lines
- C) File names + file sizes + types
- D) Children's descriptions (if already generated)
- E) Combination based on folder size

**Considerations:**
- Token budget per folder
- Large folders could overflow context
- Need enough to understand purpose

**Answer:** [TBD]

---

### Q5: Buoy Architecture

**Question:** How do parallel AI agents work?

**Options:**
- A) One buoy per folder
- B) One buoy per scope (handles all children)
- C) Batches of N folders per buoy
- D) Orchestrator spawns buoys based on workload

**Considerations:**
- Vercel Sandbox for isolated execution
- Coordination overhead vs parallelism benefit
- Database concurrency (SQLite handles concurrent reads, single writer)

**Answer:** [TBD]

---

### Q6: Status Transitions

**Question:** How does `status` change?

**Current understanding:**
- `pending` → `current`: AI writes for first time
- `current` → `stale`: scan.ts detects source change
- `stale` → `current`: AI regenerates

**Open questions:**
- Does AI always update `ai_model` and `ai_updated`? YES
- Can human manually mark as stale? (Future)
- What about partial updates (just description)?

**Answer:** [TBD]

---

### Q7: Content Format

**Question:** What format should AI content use?

**`description`:**
- A) One sentence
- B) One paragraph (3-5 sentences)
- C) Structured (purpose | contains | relates to)

**`content_md`:**
- A) Free prose (whatever fits)
- B) Structured sections (Patterns, Relationships, Insights)
- C) Markdown with headers

**Considerations:**
- `description` is for quick routing — should be scannable
- `content_md` is for deep understanding — can be rich
- Consistency helps AI read context across folders

**Answer:** [TBD]

---

## From Old Tools: What to Keep

### Duality Pattern

Every operation has two paths:
```
if (condition_a) → action_a
if (condition_b) → action_b
```

Layer 2 equivalent:
```
if (status == 'pending') → generate fresh
if (status == 'stale') → regenerate
if (status == 'current') → skip (or force with flag)
```

### Status Output Format

```
FloatPrompt [operation] complete.
Directory: [path]
Status: [result]

[Next step recommendation]
```

### Buoy Prompts

Self-contained instructions for parallel AI work. Example from old `/float-sync`:

```
Verify .float/project/nav/{folder}.md against actual {folder}/ contents:
1. Read the nav file and parse the Contents table
2. List actual files in {folder}/
3. Compare nav entries to actual contents
4. Return JSON: { status: "ok" | "issues", missing: [], stale: [] }
```

Layer 2 will have similar prompts for context generation.

---

## Proposed Commands

### `float generate`

**Purpose:** Generate AI content for pending/stale folders

**Usage:**
```bash
float generate              # All pending/stale
float generate /src         # Specific folder
float generate --force      # Regenerate all (ignore status)
```

**Flow:**
1. Query folders with `status IN ('pending', 'stale')`
2. Group by scope boundaries
3. Spawn buoys for parallel generation
4. Each buoy reads folder contents, generates description/content
5. Orchestrator collects results, writes to SQLite
6. Update `status = 'current'`, `ai_model`, `ai_updated`

### `float status`

**Purpose:** Show current state

**Output:**
```
FloatPrompt Status
==================

Folders: 65 total
  - Current: 0
  - Pending: 65
  - Stale: 0

Scopes: 0 detected

Run: float generate
```

---

## Next Steps

1. Answer Q1-Q7 via discussion
2. Lock answers into this spec
3. Design buoy prompt templates
4. Implement `src/db/generate.ts`
5. Test on real folders (src/, bin/, docs/)

---

*Draft 2026-01-03 — Layer 2 planning*
