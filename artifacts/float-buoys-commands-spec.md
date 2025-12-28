---
title: Float Buoys Commands Specification
type: spec
status: active
created: 2025-12-28

human_author: MDS
human_intent: Specify Claude Code slash commands for FloatSystem maintenance
human_context: Lighter alternative to daemon — on-demand buoys during session

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Active approach — simpler than daemon, no software to build
---

# Float Buoys Commands Specification

**On-demand FloatSystem maintenance via Claude Code slash commands.** No daemon, no install, no background process. Just commands that spawn buoys when you need them.

---

## Philosophy

The daemon approach (see `float-buoys-spec.md`) provides real-time sync but adds complexity: Node.js, npm install, background process, API key config.

This spec offers a lighter alternative:

> AI only reads context when you start a session. Stale-for-5-minutes doesn't matter. Stale-for-3-days matters.

If you can remember to run `/float-verify` at session start, you don't need a daemon. The simpler tool wins.

**Position:** Start here. Graduate to daemon if you need always-on sync.

---

## The Commands

```
/float          # Boot/orientation
/float verify   # Check integrity, report issues
/float sync     # Fix issues by spawning buoys
```

Single command file (`.claude/commands/float.md`) handles all subcommands via `$ARGUMENTS`. Works immediately when repo is cloned.

---

## /float (Existing)

Already built. Boots FloatSystem or initializes new projects.

**If `_float/system.md` exists:**
- Read boot loader
- Traverse all index files
- Build mental model
- Report status

**If `_float/system.md` doesn't exist:**
- Fetch spec from GitHub
- Create `_float/` structure
- Start watching

---

## /float verify

Check integrity of all `_float/` files. Report issues. No changes. (This is essentially the Integrity Buoy, on-demand.)

### What It Checks

| Check | Description |
|-------|-------------|
| **Index coverage** | Every folder has `_float/index.md` |
| **Table accuracy** | File tables match actual folder contents |
| **Structure map** | `_float/system.md` structure map matches reality |
| **Orphaned files** | Files exist but aren't in any index |
| **Missing files** | Index references files that don't exist |
| **Stale timestamps** | `ai_updated` older than file modification |

### Output Format

```
FloatSystem Integrity Check
Directory: /Users/mds/Projects/floatprompt

✓ _float/system.md — OK
✓ _float/index.md — OK
✗ docs/_float/index.md — 2 issues
  - Missing: docs/new-feature.md (file exists, not in table)
  - Stale: docs/api.md (removed, still in table)
✗ examples/_float/index.md — 1 issue
  - Missing: examples/new-example/ (folder has no _float/index.md)
✓ dev/_float/index.md — OK

Summary: 3 issues in 2 files
Run /float sync to fix
```

### Implementation

```markdown
# /float verify

Check FloatSystem integrity. Report issues without making changes.

## Steps

1. Find all `_float/index.md` files in the project
2. For each index file:
   - Read the file table
   - List actual contents of parent folder
   - Compare and note discrepancies
3. Check `_float/system.md` structure map against reality
4. Report findings in structured format
5. Suggest `/float sync` if issues found
```

---

## /float sync

Fix issues found by verify. Spawns buoys for each task type.

### How It Works

1. Run verify internally
2. Categorize issues:
   - **Simple** (Tier 1): Add/remove rows in tables
   - **Complex** (Tier 2): New files need descriptions
3. Show proposed changes
4. Apply on approval
5. Spawn appropriate buoys

### Buoy Types

| Buoy | Handles | AI Needed? |
|------|---------|-----------|
| **Index Buoy** | Add/remove file rows in tables | No |
| **System Buoy** | Update structure map | No |
| **Describe Buoy** | Write descriptions for new files | Yes (Haiku) |
| **Scaffold Buoy** | Create missing `_float/index.md` files | Minimal |
| **Log Buoy** | Record activity to `_float/logs/` | No |

Same buoys as the daemon spec — just spawned on-demand instead of running continuously.

**Describe Buoy notes:**
- Model: Haiku (fast, cheap, sufficient for descriptions)
- Skip config files: `.json`, `.yaml`, `.env`, `package.json`, etc.
- Show proposed description, allow edit before apply

### Output Format

```
FloatSystem Sync
Directory: /Users/mds/Projects/floatprompt

Proposed changes:

docs/_float/index.md:
  + Add: new-feature.md — [needs description]
  + Add: config.json — [skip description]
  - Remove: api.md (file deleted)

examples/_float/index.md:
  + Create: examples/new-example/_float/index.md

_float/system.md:
  ~ Update structure map (new folder: examples/new-example/)

Apply changes? (y/n): y

Generating descriptions...
  new-feature.md → "Feature documentation for user authentication flow"
  [accept/edit/skip]: accept

Spawning buoys...
  ✓ Index Buoy: Updated docs/_float/index.md
  ✓ Scaffold Buoy: Created examples/new-example/_float/index.md
  ✓ Describe Buoy: new-feature.md → "Feature documentation for..."
  ✓ System Buoy: Updated structure map
  ✓ Log Buoy: Recorded activity

Sync complete. 4 changes applied.
```

### Implementation

```markdown
# /float sync

Fix FloatSystem issues by spawning buoys.

## Steps

1. Run /float verify internally
2. If no issues, report "All clear" and exit
3. Categorize issues by type
4. Show proposed changes, ask for approval
5. Spawn appropriate buoys:
   - Index Buoy → table updates
   - Describe Buoy → new file descriptions (parallel)
   - Scaffold Buoy → create missing index.md
   - System Buoy → update structure map
   - Log Buoy → record activity
6. Report results
```

---

## Buoy Spawning

Uses Claude Code's Task tool to spawn buoys in parallel where possible.

**Example: 3 new files need descriptions**

```
Spawning Describe Buoys (3 parallel)...
  → Buoy 1: Reading src/auth.js...
  → Buoy 2: Reading src/utils.js...
  → Buoy 3: Reading docs/setup.md...

Results:
  ✓ src/auth.js → "Authentication middleware with JWT validation"
  ✓ src/utils.js → "Utility functions for string and date formatting"
  ✓ docs/setup.md → "Setup guide for local development environment"
```

Parallel execution keeps sync fast even with multiple files.

---

## Comparison: Commands vs Daemon

| Aspect | /float-* Commands | Float Buoys Daemon |
|--------|-------------------|-------------------|
| Install | None (clone repo) | npm install -g |
| Background process | No | Yes |
| Real-time sync | No | Yes |
| Manual trigger | Yes | No |
| Complexity | Low | Medium |
| Dependencies | Claude Code only | Node.js, npm, API key |
| Best for | Session-based workflow | Always-fresh requirement |

**Recommendation:** Start with commands. Add daemon later if needed.

---

## File Structure

```
.claude/commands/
└── float.md           # Handles all: /float, /float verify, /float sync
```

Single command file routes based on `$ARGUMENTS`. No additional files needed.

---

## Logging

`/float sync` logs activity to `_float/logs/YYYY-MM-DD.md`:

```markdown
## 14:32 — /float sync

- Updated: docs/_float/index.md (+1 file, -1 file)
- Created: examples/new-example/_float/index.md
- Described: new-feature.md → "Feature documentation for..."
- Updated: _float/system.md (structure map)
```

Same format as daemon logs. Compatible if you upgrade later.

---

## Ignore Patterns

Inherits from project. Commands skip:

```
node_modules/
.git/
.DS_Store
dist/
build/
```

Uses same logic as daemon spec for consistency.

---

## MVP Scope

**In:**
- `/float verify` — full integrity checking
- `/float sync` — table updates, scaffold creation
- Parallel buoy spawning for descriptions
- Logging to `_float/logs/`

**Out (for later):**
- Automatic triggering (that's the daemon)
- Complex conflict resolution
- Cloud sync

---

## Success Criteria

1. `/float verify` reports all integrity issues
2. `/float sync` fixes issues with approval
3. New files get meaningful descriptions
4. Missing `_float/index.md` files are created
5. Activity logged to `_float/logs/`
6. No manual file editing required after sync

---

## Migration Path

If commands aren't enough, upgrade to daemon:

1. Commands teach you what sync actually does
2. Daemon automates the same operations
3. Same log format, same file structures
4. No breaking changes

The specs are designed to be compatible.

---

## Next Steps

1. Update `/float` command to handle subcommands
2. Implement `verify` subcommand
3. Implement `sync` subcommand
4. Test on floatprompt repo
5. Iterate based on real usage

---

© 2025 @MDS
