---
name: float-capture
description: Manually capture session context to float.db. Use mid-session to save significant work.
---

# /float-capture — Manual Context Capture

**Capture context NOW, without ending the session.**

---

## When to Use

| Automatic (hooks) | Manual (/float-capture) |
|-------------------|-------------------------|
| PreCompact — context filling up | Just completed significant work |
| SessionEnd — leaving | Want to checkpoint mid-session |
| You don't think about it | Intentional "save point" |

**Use `/float-capture` when:**
- You finished a significant feature or decision
- You're about to switch to a different area of the codebase
- You want to ensure context is preserved before a risky operation
- Session has 50%+ context left but you want to save now

---

## What It Does

1. **Gathers session data:**
   - Files changed (via `git diff`)
   - Folders edited (derived from changed files)
   - Current date

2. **Phase 1: Mechanical capture** (always)
   - Inserts session-handoff to `log_entries`
   - Captures `files_changed` JSON array

3. **Phase 2: AI synthesis** (spawns float-log agent)
   - Enriches the session-handoff with:
     - `files_read` (what you explored)
     - `decision` (what was accomplished)
     - `rationale` (next step options)

4. **Phase 3: Folder enrichment** (spawns float-enrich agent)
   - Updates `description` and `context` for edited folders
   - Sets `status = 'current'`

---

## How to Run

Just invoke:
```
/float-capture
```

AI will:
1. Check for `.float/float.db` (skip if not initialized)
2. Check for recent capture (skip if captured in last 5 min)
3. Run the capture phases
4. Report what was captured

---

## Implementation

Run the capture script directly:

```bash
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || pwd)
FLOAT_DB="$REPO_ROOT/.float/float.db"

# Check if initialized
if [ ! -f "$FLOAT_DB" ]; then
  echo "FloatPrompt not initialized. Run /float first."
  exit 0
fi

# Run capture (same script as hooks, but forced)
echo '{"hook_event_name": "PreCompact", "cwd": "'$REPO_ROOT'"}' | \
  ${CLAUDE_PLUGIN_ROOT}/hooks/float-capture.sh
```

**Note:** We pass `PreCompact` as the event to get full AI enrichment (not just mechanical capture).

---

## Relationship to Automatic Capture

| Trigger | Phase 1 (sqlite3) | Phases 2-3 (agents) |
|---------|-------------------|---------------------|
| PreCompact (auto) | Yes | Yes |
| SessionEnd (auto) | Yes | No (terminal closing) |
| /float-capture (manual) | Yes | Yes |

Manual capture behaves like PreCompact — full enrichment while session is alive.

---

## After Capture

Continue working. The capture is a checkpoint, not an endpoint.

Next time you run `/float`, you'll see:
- "Last session: [what you captured]"
- Folder context will be up-to-date
- Decisions and rationale preserved
