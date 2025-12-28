---
title: Float Buoys Specification
type: spec
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Specify a background daemon that keeps FloatSystem files accurate
human_context: Dropbox-style sync for AI context

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: MVP spec from conversation — keep it simple, avoid YAGNI
---

# Float Buoys Specification

**Dropbox for AI context.** A background daemon that keeps `_float/` files accurate so any AI dropping into a project has current, reliable context.

---

## Philosophy

**FloatSystem works without Float Buoys.** The text files are the source of truth. They work on any AI platform, with no dependencies, no accounts, no daemon required.

Float Buoys is an optional convenience layer that keeps those files accurate automatically. Like how Git works without GitHub, but GitHub adds convenience.

Position: **Power-user enhancement, not requirement.**

---

## Overview

```
npm install -g floatprompt
float
```

The `float` CLI starts a daemon that watches directories containing `_float/system.md`. When files change, the daemon updates relevant `_float/` files automatically.

Human works. Buoys maintain context. AI always has accurate information.

---

## The Buoys

| Buoy | Watches | Does |
|------|---------|------|
| **Watch Buoy** | Filesystem | Detects changes, populates watchlist |
| **Index Buoy** | `_float/index.md` files | Keeps file tables accurate |
| **System Buoy** | `_float/system.md` | Keeps structure map accurate |
| **Log Buoy** | `_float/logs/` | Records all buoy activity |
| **Integrity Buoy** | Everything | Periodic drift check (startup + hourly) |

### Integrity Buoy

Runs on daemon startup and periodically (hourly) to catch drift that event-based watching misses:

- All folders have `_float/index.md`?
- All index tables match actual folder contents?
- Structure map in `_float/system.md` matches reality?
- Any orphaned files not in indexes?

Logs issues, queues fixes for other buoys.

---

## Two-Tier Architecture

### Tier 1: Local (No AI)

Instant, free, runs on every file change.

**Triggers:**
- File created
- File deleted
- File renamed
- File moved
- Folder created
- Folder deleted

**Actions:**
- Update `_float/index.md` file tables (add/remove rows)
- Update `ai_updated` timestamps
- Add entry to watchlist if Tier 2 needed
- Log activity via Log Buoy

### Tier 2: AI-Powered

Triggered when watchlist updates. Calls Claude API.

**Triggers:**
- New file needs description
- Significant structural change (multiple files/folders)
- Structure map out of sync
- Integrity issue detected

**Actions:**
- Read changed files, understand meaning
- Write meaningful descriptions for new files
- Update structure map in `_float/system.md`
- Flag files for human review (FloatDoc frontmatter)*
- Log activity via Log Buoy

*Note: FloatDoc auto-add or smart filter may be added later. MVP flags for human.

**Voice preservation note:** Tier 2 descriptions are system-generated metadata, not human expression. These describe what files ARE, not what humans think or feel. This is indexing, not authoring — no voice preservation conflict.

---

## Watchlist

Location: `_float/watchlist.md`

```markdown
---
updated: 2025-12-28T16:45:00Z
---

# Watchlist

| Time | Type | Path | Status |
|------|------|------|--------|
| 16:45 | new_file | docs/api/auth.md | pending |
| 16:44 | structure | docs/api/ | pending |
| 16:42 | new_file | src/utils.js | processed |
```

When a row is added with status `pending`, Tier 2 wakes up and processes it.

---

## Log Format

Location: `_float/logs/YYYY-MM-DD.md`

```markdown
---
date: 2025-12-28
---

# Activity Log

## 16:45 — Index Buoy
- Added: docs/api/auth.md
- Updated: docs/_float/index.md

## 16:44 — System Buoy
- New folder detected: docs/api/
- Updated structure map

## 16:42 — Tier 2 AI
- Described: src/utils.js → "Utility functions for date formatting and validation"
- Model: claude-sonnet-4-20250514
```

---

## CLI Commands

```bash
float                  # Start daemon, watch current directory
float status           # Show what's being watched, buoy status
float stop             # Stop daemon
float logs             # Show recent activity
float process          # Manually trigger Tier 2 processing
```

---

## Configuration

Location: `~/.floatrc` or `_float/config.json`

```json
{
  "directory": "~/Projects/floatprompt",
  "model": "claude-3-5-haiku-20241022",
  "api_key_env": "ANTHROPIC_API_KEY",
  "tier2_debounce_ms": 5000,
  "log_retention_days": 30
}
```

---

## Detection Logic

**How does a directory become watched?**

1. User runs `float` in a directory with `_float/system.md`
2. If no `_float/system.md`, daemon offers to initialize FloatSystem

**How does Tier 1 know to escalate to Tier 2?**

- New file (any file created needs description)
- New folder (needs index.md created, structure map updated)
- More than 3 files changed in 10 seconds (significant restructure)
- `_float/system.md` modified externally

---

## Ignore Patterns

Default ignores (never watched, never indexed):

```
node_modules/
.git/
.DS_Store
*.log
dist/
build/
coverage/
.env*
```

Configurable via `_float/config.json`:

```json
{
  "ignore": ["vendor/", "*.min.js", "temp/"]
}
```

---

## Conflict Handling

**Principle: Human authority.** If human and daemon both touch a file, human wins.

When daemon detects external changes to `_float/` files:
1. Pause pending updates for that file
2. Log: "Human edited docs/_float/index.md, skipping daemon update"
3. Resume watching for next change

The daemon never overwrites human work. Pilot principle applies.

---

## Error Handling

**Tier 2 API failures:**

1. **First failure:** Retry after 5 seconds
2. **Second failure:** Retry after 30 seconds
3. **Third failure:** Log error, move item to `failed` status in watchlist
4. **Manual retry:** `float process --retry-failed`

Failed items stay in watchlist for human review. Daemon continues processing other items.

**File system errors:**

- Permission denied → Log warning, skip file
- File deleted mid-process → Log, remove from watchlist
- Disk full → Stop daemon, alert user

---

## Init Flow

When you run `float` in a directory without `_float/system.md`:

```
$ float

No FloatSystem detected.
Initialize? (y/n): y

Creating FloatSystem...
  ✓ _float/system.md (boot loader)
  ✓ _float/index.md (root navigation)
  ✓ _float/logs/ (activity logs)

Scanning folders...
  ✓ docs/_float/index.md
  ✓ src/_float/index.md
  ✓ examples/_float/index.md

FloatSystem initialized.
Watching 23 files.
Buoys: 5 active

Ready.
```

**What gets created:**
- `_float/system.md` — Boot loader with structure map
- `_float/index.md` — Root navigation with file table
- `_float/logs/` — Empty directory for logs
- `{folder}/_float/index.md` — For each non-ignored subfolder

---

## Daemon State

Location: `_float/.daemon.json`

```json
{
  "pid": 12345,
  "started": "2025-12-28T16:00:00Z",
  "watching": 47,
  "watchlist_pending": 2,
  "last_sync": "2025-12-28T16:45:00Z",
  "buoys": {
    "watch": "active",
    "index": "active",
    "system": "active",
    "log": "active",
    "integrity": "idle"
  }
}
```

The `/float` command reads this file to show daemon status. File is deleted when daemon stops cleanly.

---

## Integration with /float

The `/float` Claude Code slash command becomes aware of the daemon:

```
FloatSystem: BOOTED
Directory: /Users/mds/Projects/floatprompt
Daemon: running (watching 47 files)
Buoys: 4 active, all healthy
Watchlist: 2 items pending
Last sync: 3 min ago
Ready for: [human direction]
```

The command reads daemon state and reports it alongside boot info.

---

## Tech Stack

- **Runtime:** Node.js
- **File watching:** chokidar
- **AI:** @anthropic-ai/sdk
- **CLI:** commander or yargs
- **Config:** cosmiconfig
- **Install:** npm

---

## File Structure

```
floatprompt/              # npm package
├── bin/
│   └── float.js          # CLI entry point
├── src/
│   ├── daemon.js         # Main daemon loop
│   ├── buoys/
│   │   ├── watch.js      # Watch Buoy
│   │   ├── index.js      # Index Buoy
│   │   ├── system.js     # System Buoy
│   │   └── log.js        # Log Buoy
│   ├── tier1.js          # Local processing
│   ├── tier2.js          # AI processing
│   ├── watchlist.js      # Watchlist management
│   └── config.js         # Configuration handling
├── package.json
└── README.md
```

---

## MVP Scope

**In:**
- Watch Buoy (file detection)
- Index Buoy (table updates)
- System Buoy (structure map)
- Log Buoy (activity logging)
- Integrity Buoy (drift detection)
- Tier 1 local processing
- Tier 2 AI processing (new file descriptions)
- Basic CLI (float, float status, float stop)
- Single directory watching (multi-project later)
- Ignore patterns
- Conflict handling (human authority)
- Error handling with retry
- Init flow for new projects

**Out (for later):**
- Multi-directory watching
- FloatDoc auto-add (flag for human instead)
- Smart filtering by file type
- Cloud sync (floatprompt.ai)
- Per-file sync icons
- Complex integrity checks

---

## Human-Piloted (Active Claude Session)

The daemon handles maintenance. Humans handle creation:

- **FloatDoc creation** — Add frontmatter via `/float` session
- **FloatPrompt creation** — Build tools via `/float` session
- **Directing work** — Tell buoys what to focus on

Daemon flags, human decides.

---

## Success Criteria

1. `npm install -g floatprompt` works
2. `float` starts watching current directory
3. Add a file → `_float/index.md` updates automatically
4. New file gets description via Tier 2
5. All activity logged to `_float/logs/`
6. `/float` shows daemon status

---

## Open Questions

1. Should the daemon run as a proper system service (launchd/systemd) or just a background process?
2. ~~How to handle conflicts if human and daemon edit same file?~~ → Resolved: Human authority
3. Rate limiting for Tier 2 API calls? (Currently: debounce + retry backoff)
4. Should `float` auto-start on system boot, or require manual start each session?

---

## Next Steps

1. Scaffold npm package structure
2. Implement Watch Buoy + Tier 1
3. Implement Index Buoy
4. Add Tier 2 with Claude API
5. Add System Buoy + Log Buoy
6. Add Integrity Buoy
7. CLI commands
8. Test with floatprompt repo

---

© 2025 @MDS
