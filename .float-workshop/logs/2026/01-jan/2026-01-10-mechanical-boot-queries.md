# Mechanical Boot Queries Pattern

**Session:** 51
**Date:** 2026-01-10
**Folders:** `plugins/floatprompt/lib/`, `plugins/floatprompt/commands/`

## Summary

Established a pattern where mechanical queries (SQL, file checks, stats) live in bash scripts, and AI judgment lives in agents/commands. Created boot.sh as first implementation of this pattern for session bootstrap.

## Decision

**Mechanical queries belong in scripts (bash/sh), judgment belongs in AI (agents/commands).**

- `boot.sh` fetches: last handoff, recent decisions, open questions, stale folders, stats, permissions status
- `/float` command receives JSON output and presents it to AI for judgment
- AI decides what matters, what to surface, what actions to suggest

### What boot.sh Does (Mechanical)
```bash
# Pure SQL + bash queries
- SELECT last handoff from log_entries
- SELECT recent locked decisions
- SELECT open questions
- SELECT stale folders and stats
- Check if permissions are set in settings.json
- Output JSON for AI
```

### What `/float` Command Does (Judgment)
```
- Parse boot.sh JSON
- Present context to AI
- AI interprets: "Is the DB stale? What should user focus on? Any blockers?"
- AI suggests next steps interactively
```

## Rationale

This pattern aligns with FloatPrompt's core principle: **"SQLite serves AI"** and **"Buoy principle: mechanical (code) vs judgment (AI)."**

### Why Separate?
1. **Efficiency** — Mechanical queries are deterministic, fast, repeatable
2. **Clarity** — Script doesn't need to interpret; AI doesn't need to write SQL
3. **Testability** — boot.sh output is verifiable JSON; AI behavior is logged in transcripts
4. **Scalability** — Easy to add new queries to boot.sh without touching commands
5. **Offline resilience** — boot.sh works even if Claude API is down (limited but useful)

### Why boot.sh vs Bundled in /float?
- **Reusability** — Other commands can call boot.sh (not just `/float`)
- **Modularity** — Changes to queries don't require redeploy
- **Debugging** — Can run `./boot.sh` manually to verify state
- **Documentation** — Script IS the documentation of what state we track

## Technical Details

### boot.sh Query Structure
```json
{
  "exists": boolean,
  "project_root": string,
  "handoff_md": string (contents of .float/handoff.md),
  "last_session": {...},
  "recent_decisions": [...],
  "open_questions": [...],
  "stale_folders": [...],
  "stats": {
    "folders": number,
    "files": number,
    "stale": number,
    "pending": number,
    "current": number
  },
  "permissions_set": boolean
}
```

### Calling Convention
```bash
boot_context=$(./lib/boot.sh "$project_dir")
# Pass $boot_context as environment variable or stdin to /float command
```

## Files Changed

- **lib/boot.sh** — NEW (165 lines) — All mechanical boot queries
- **commands/float.md** — Updated to call boot.sh and present results to AI

## Impact

- **Established pattern** — Future queries (scan status, folder staleness, etc.) follow same script→JSON→AI flow
- **Session boot performance** — Single boot.sh call replaces multiple individual queries
- **AI decision quality** — AI has complete, structured state context before suggesting next steps
- **Maintenance** — Adding new boot data doesn't require command changes
