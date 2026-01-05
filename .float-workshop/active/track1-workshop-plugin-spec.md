# Track 1: Workshop Plugin with float.db

**Date:** 2026-01-05
**Status:** Primary
**Priority:** 1

---

## Summary

Simpler workshop approach using Claude Code native patterns (skills, agents, commands) to do Layer 2 context generation. No autonomous monitoring — optional Ralph Wiggum loop for periodic staleness checks.

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE SKILLS                        │
│  (Knowledge — auto-invoked when relevant)                   │
│                                                              │
│  floatdb-schema    → Knows tables, fields, queries          │
│  floatdb-context   → How to interpret folder context        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE AGENTS                        │
│  (Workers — do the actual generation)                       │
│                                                              │
│  float-context-generator  → Creates description + content_md│
│  float-scope-detector     → Determines if folder is scope   │
│  float-staleness-checker  → For Ralph loop                  │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    CLAUDE CODE COMMANDS                      │
│  (Triggers — user invokes)                                  │
│                                                              │
│  /float-generate [path]  → Generate context for folder      │
│  /float-status           → Show current/stale/pending       │
│  /float-refresh          → Regenerate stale contexts        │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    RALPH WIGGUM (Optional)                   │
│  (Periodic staleness checking — not continuous)             │
│                                                              │
│  Run /ralph-wiggum:ralph-loop with staleness task           │
│  Checks every N iterations, flags stale contexts            │
└─────────────────────────────────────────────────────────────┘
```

---

## Component Mapping

| Buoy (src/buoys/) | Claude Code Equivalent | Type |
|-------------------|------------------------|------|
| `global.md` | `floatdb-schema` | Skill |
| `context-generator.md` | `float-context-generator` | Agent |
| `scope-detector.md` | `float-scope-detector` | Agent |
| `staleness-checker.md` | `float-staleness-checker` | Agent |

---

## What Already Exists

### float.db (Layer 1 + partial Layer 2)

- **65 folders** scanned with AI-generated context
- **446 files** tracked for change detection
- Schema: `folders`, `files`, `log_entries`, `references`, `deep`

### Key Tables

```sql
folders (
  path TEXT PRIMARY KEY,     -- '/src/db'
  description TEXT,          -- Quick orientation (1-2 sentences)
  content_md TEXT,           -- Deeper context (markdown)
  status TEXT,               -- 'pending' | 'current' | 'stale'
  is_scope INTEGER,          -- 1 if autonomous scope
  parent_scope_path TEXT,    -- Pointer to parent scope
  scope_boot TEXT,           -- Boot context for scopes
  ai_model TEXT,             -- Which model wrote this
  ai_updated INTEGER         -- When AI last wrote
)
```

### CLI (src/cli/float-db.ts)

```bash
float-db folders --depth N --status S    # Query by depth/status
float-db details PATH --include-contents # Full folder info for AI
float-db update PATH --json '{...}'      # Write AI content back
float-db status                          # Count by status
float-db scope-chain PATH                # Get parent scopes
```

### Buoy Templates (src/buoys/templates/)

| Template | Input | Output |
|----------|-------|--------|
| `context-generator.md` | folder_details, parent_context | description, content_md, is_scope, type |
| `scope-detector.md` | folder_details, heuristics | is_scope, type, scope_boot |
| `staleness-checker.md` | current_context, file_changes | is_stale, reason |
| `decision-logger.md` | topic, decision, rationale | log_entry record |

---

## Skills to Create

### 1. floatdb-schema

**Purpose:** Teach Claude the database schema and query patterns.

**When invoked:** User asks about project structure, folder context, what's where.

**Content:**
- Table schemas (folders, files, log_entries)
- Common queries (get context, check status, find stale)
- How to call float-db CLI
- How to interpret results

### 2. floatdb-context (optional, may merge with above)

**Purpose:** How to use folder context effectively.

**When invoked:** Claude needs to understand a part of the codebase.

**Content:**
- What description vs content_md mean
- How scope chains work
- Status field interpretation
- When to trust vs regenerate

---

## Agents to Create

### 1. float-context-generator

**Purpose:** Generate description + content_md for a folder.

**Trigger description:** "Use when generating or regenerating context for a folder in float.db"

**Tools:** Read, Bash (for float-db CLI), Write

**Based on:** `src/buoys/templates/context-generator.md`

**Output:** JSON with description, content_md, is_scope, type, parent_scope_path

### 2. float-scope-detector

**Purpose:** Determine if a folder is an autonomous scope.

**Trigger description:** "Use when determining if a folder should be marked as a scope"

**Tools:** Read, Bash, Glob

**Based on:** `src/buoys/templates/scope-detector.md`

**Output:** JSON with is_scope, type, scope_boot (if scope)

### 3. float-staleness-checker

**Purpose:** Check if folder context is stale (for Ralph loop).

**Trigger description:** "Use when checking if folder context needs regeneration"

**Tools:** Read, Bash, Glob

**Based on:** `src/buoys/templates/staleness-checker.md`

**Output:** JSON with is_stale, reason, files_changed

---

## Commands to Create

### 1. /float-generate [path]

**Purpose:** Generate context for a specific folder.

**Flow:**
1. Call `float-db details PATH`
2. Spawn `float-context-generator` agent
3. Write result via `float-db update PATH`

### 2. /float-status

**Purpose:** Show context status across the project.

**Flow:**
1. Call `float-db status`
2. Show counts: current/stale/pending
3. List stale folders if any

### 3. /float-refresh

**Purpose:** Regenerate all stale contexts.

**Flow:**
1. Query stale folders
2. For each: spawn context-generator
3. Report results

---

## Ralph Wiggum Integration

**Concept:** Use `/ralph-wiggum:ralph-loop` for periodic staleness checking.

**Setup:**
1. Create a task that runs `float-staleness-checker`
2. Loop checks folders, flags stale ones
3. Optionally auto-regenerates or just reports

**Example invocation:**
```
/ralph-wiggum:ralph-loop

Task: Check all folders in float.db for staleness.
For each stale folder, log it.
After checking all, summarize what needs regeneration.
Run every 5 iterations.
```

---

## Open Questions

### 1. Skill scope
- One skill with all knowledge, or split (schema vs usage)?
- **Lean:** One skill. Simpler.

### 2. Agent format
- Keep `<fp><json><md>` in body (hybrid), or pure YAML + markdown?
- **Lean:** Pure YAML + markdown for Claude Code native. Buoys stay as reference.

### 3. CLI wrapper
- Agents call `float-db` via Bash, or rewrite queries inline?
- **Lean:** Keep float-db CLI. It's tested, works, no duplication.

### 4. Ralph trigger
- Manual `/ralph-loop` or SessionStart hook that suggests it?
- **Lean:** Manual for now. Auto-suggest is Layer 3 territory.

---

## Implementation Order

1. **Skill: floatdb-schema** — Foundation, teaches Claude the system
2. **Command: /float-status** — Simple, validates CLI works
3. **Agent: float-context-generator** — Core generation capability
4. **Command: /float-generate** — User-triggered generation
5. **Agent: float-staleness-checker** — For Ralph integration
6. **Ralph setup** — Optional periodic checking

---

## Success Criteria

- [ ] Claude can query float.db via skill knowledge
- [ ] `/float-status` shows current state
- [ ] `/float-generate /src/db` produces valid context
- [ ] Context written back to float.db correctly
- [ ] Ralph loop can check staleness periodically

---

## Related Documents

| Document | Location |
|----------|----------|
| Vision (3 layers) | `.float-workshop/ref/vision.md` |
| Schema spec | `src/db/schema.ts` |
| Generate functions | `src/db/generate.ts` |
| Context-generator buoy | `src/buoys/templates/context-generator.md` |
| Scope-detector buoy | `src/buoys/templates/scope-detector.md` |
| Staleness-checker buoy | `src/buoys/templates/staleness-checker.md` |
| Global buoy instructions | `src/buoys/global.md` |
| Two-track exploration | `.float-workshop/active/two-track-exploration.md` |

---

*Track 1: Layer 2 via Claude Code native patterns — skills, agents, commands*
