#!/bin/bash
#
# FloatPrompt Automatic Capture
#
# Fires on: PreCompact (context full) OR SessionEnd (user exits)
# Whichever comes first. Self-deduplicating.
#
# Strategy:
#   PreCompact (PRIMARY)  → Full capture: sqlite3 + agents
#                           Session alive, agents complete reliably
#   SessionEnd (FALLBACK) → Mechanical only: sqlite3
#                           Terminal closing, agents might get killed
#
# Safety net + value-add: never lose data, enhance when possible
#

set -e

# Check for --manual flag (used by /float-capture command)
if [ "$1" = "--manual" ]; then
  # Manual invocation: try to find transcript
  CWD="$(pwd)"
  REASON="manual"

  # Try to find current transcript (most recent .jsonl in claude projects)
  # Claude escapes paths: / → - and _ → -
  ESCAPED_PATH=$(echo "$CWD" | sed 's|/|-|g; s|_|-|g')
  CLAUDE_PROJECT_DIR="$HOME/.claude/projects/$ESCAPED_PATH"
  if [ -d "$CLAUDE_PROJECT_DIR" ]; then
    TRANSCRIPT_PATH=$(ls -t "$CLAUDE_PROJECT_DIR"/*.jsonl 2>/dev/null | head -1)
  fi

  if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
    # Found transcript - run full capture with agents
    SESSION_ID=$(basename "$TRANSCRIPT_PATH" .jsonl)
    HOOK_EVENT="PreCompact"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Manual capture with transcript: $TRANSCRIPT_PATH" >> /tmp/float-capture-debug.log
  else
    # No transcript found - mechanical only
    SESSION_ID=""
    TRANSCRIPT_PATH=""
    HOOK_EVENT="SessionEnd"
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] Manual capture (no transcript found)" >> /tmp/float-capture-debug.log
  fi
else
  # Hook invocation: read JSON from stdin
  INPUT=$(cat)

  # Debug: log the raw input to help diagnose hook issues
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Hook fired. Input: $INPUT" >> /tmp/float-capture-debug.log

  # Extract fields from JSON input
  SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
  TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty')
  CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
  REASON=$(echo "$INPUT" | jq -r '.reason // empty')
  HOOK_EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')
fi

# Use CWD if available, otherwise current directory
PROJECT_DIR="${CWD:-$(pwd)}"
FLOAT_DB="$PROJECT_DIR/.float/float.db"

# -----------------------------------------------------------------------------
# Early exit: Skip if no .float/ directory (plugin not initialized)
# -----------------------------------------------------------------------------
if [ ! -f "$FLOAT_DB" ]; then
  exit 0
fi

# -----------------------------------------------------------------------------
# Early exit: Deduplication - skip if capture already ran recently (5 min)
# -----------------------------------------------------------------------------
# This prevents double-firing when PreCompact runs and then SessionEnd follows
RECENT_HANDOFF=$(sqlite3 "$FLOAT_DB" "
  SELECT 1 FROM log_entries
  WHERE topic = 'session-handoff'
  AND created_at > unixepoch() - 300
  LIMIT 1;
" 2>/dev/null || echo "")

if [ -n "$RECENT_HANDOFF" ]; then
  # Already captured recently, skip
  exit 0
fi

# -----------------------------------------------------------------------------
# Check for changes
# -----------------------------------------------------------------------------
cd "$PROJECT_DIR"
# Include both staged and unstaged changes
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || echo "")
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")
# Combine and dedupe
CHANGED_FILES=$(echo -e "$CHANGED_FILES\n$STAGED_FILES" | sort -u | grep -v '^$' || echo "")

# Determine session type
if [ -z "$CHANGED_FILES" ]; then
  if [ "$REASON" = "manual" ]; then
    # Manual capture with no file changes = research session
    SESSION_TYPE="research"
  else
    # Automatic capture with no changes = nothing to capture
    exit 0
  fi
else
  SESSION_TYPE="development"
fi

# -----------------------------------------------------------------------------
# Gather data
# -----------------------------------------------------------------------------

# Convert changed files to JSON array
FILES_CHANGED_JSON=$(echo "$CHANGED_FILES" | jq -R -s -c 'split("\n") | map(select(length > 0))')

# Extract unique folders from changed files
FOLDERS_EDITED=$(echo "$CHANGED_FILES" | xargs -I{} dirname {} | sort -u | jq -R -s -c 'split("\n") | map(select(length > 0))')

# Get current date
CURRENT_DATE=$(date +%Y-%m-%d)

# -----------------------------------------------------------------------------
# PHASE 1: Mechanical capture (guaranteed, instant)
# -----------------------------------------------------------------------------
# Insert an open session-handoff entry with mechanical data
# This ensures we ALWAYS have something, even if AI enrichment fails
# Status is 'open' (can be updated by agents) - schema allows: locked, open, superseded

# Set appropriate placeholder based on session type
if [ "$SESSION_TYPE" = "research" ]; then
  PLACEHOLDER_TITLE="Research session (awaiting enrichment)"
  PLACEHOLDER_DECISION="Research/verification session. No files modified."
else
  PLACEHOLDER_TITLE="Session end (awaiting enrichment)"
  PLACEHOLDER_DECISION="Session ended. Files modified: ${FILES_CHANGED_JSON//\'/\'\'}"
fi

ENTRY_ID=$(sqlite3 "$FLOAT_DB" "
INSERT INTO log_entries (
  folder_path,
  date,
  topic,
  status,
  title,
  decision,
  rationale,
  trigger,
  files_read,
  files_changed,
  created_at
) VALUES (
  '/',
  '$CURRENT_DATE',
  'session-handoff',
  'open',
  '$PLACEHOLDER_TITLE',
  '$PLACEHOLDER_DECISION',
  'Pending AI enrichment.',
  '${HOOK_EVENT:-manual}',
  '[]',
  '${FILES_CHANGED_JSON//\'/\'\'}',
  unixepoch()
);
SELECT last_insert_rowid();
")

# -----------------------------------------------------------------------------
# PHASES 2-4: AI enrichment (PreCompact only)
# -----------------------------------------------------------------------------
# Only run agents on PreCompact - session is alive, agents complete reliably
# Skip on SessionEnd - terminal might be closing, agents could get killed
#
# SessionEnd still gets mechanical capture (Phase 1) as fallback

if [ "$HOOK_EVENT" = "PreCompact" ]; then

  # Get plugin root directory (where agents/ lives)
  SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
  PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

  # ---------------------------------------------------------------------------
  # Pre-process: Truncate transcript to recent context only
  # ---------------------------------------------------------------------------
  # Full transcripts can be huge. Agents only need recent context for handoffs.
  # Extract last 500 lines — enough for context, not overwhelming.
  TRANSCRIPT_TRUNCATED="/tmp/float-transcript-tail-$$.txt"
  if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
    tail -n 500 "$TRANSCRIPT_PATH" > "$TRANSCRIPT_TRUNCATED"
  else
    echo "(No transcript available)" > "$TRANSCRIPT_TRUNCATED"
  fi

  # ---------------------------------------------------------------------------
  # PHASE 2: AI synthesis (parallel agents)
  # ---------------------------------------------------------------------------
  # float-log: Updates session handoff entry
  # float-decisions: Logs folder decisions and open questions
  # Both run in parallel for speed

  if command -v claude &> /dev/null; then
    # Export variables for agents to use (use truncated transcript)
    export ENTRY_ID FILES_CHANGED_JSON FOLDERS_EDITED FLOAT_DB CURRENT_DATE SESSION_TYPE
    export TRANSCRIPT_PATH="$TRANSCRIPT_TRUNCATED"

    # --- float-log agent (session handoff) ---
    AGENT_PROMPT_LOG=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-log.md")
    claude "$AGENT_PROMPT_LOG

## Session Context (injected by hook)

- ENTRY_ID: $ENTRY_ID
- FILES_CHANGED_JSON: $FILES_CHANGED_JSON
- FOLDERS_EDITED: $FOLDERS_EDITED
- TRANSCRIPT_PATH: $TRANSCRIPT_PATH
- FLOAT_DB: $FLOAT_DB
- CURRENT_DATE: $CURRENT_DATE
- SESSION_TYPE: $SESSION_TYPE
" --print --model haiku --allowedTools Bash,Read --max-turns 8 2>/dev/null &

    # --- float-decisions agent (folder decisions + questions) ---
    AGENT_PROMPT_DECISIONS=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-decisions.md")
    claude "$AGENT_PROMPT_DECISIONS

## Session Context (injected by hook)

- FILES_CHANGED_JSON: $FILES_CHANGED_JSON
- FOLDERS_EDITED: $FOLDERS_EDITED
- TRANSCRIPT_PATH: $TRANSCRIPT_PATH
- FLOAT_DB: $FLOAT_DB
- CURRENT_DATE: $CURRENT_DATE
" --print --model haiku --allowedTools Bash,Read --max-turns 8 2>/dev/null &

    # Don't wait - let Phase 2 agents run in parallel with Phase 3+4
  fi

  # ---------------------------------------------------------------------------
  # PHASE 3: AI enrichment via float-enrich agent (parallel)
  # ---------------------------------------------------------------------------
  if command -v claude &> /dev/null && [ "$FOLDERS_EDITED" != "[]" ]; then
    # Export variables for agent to use
    export FOLDERS_EDITED FLOAT_DB

    # Read agent file, strip YAML frontmatter (starts with ---), inject context
    AGENT_PROMPT=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-enrich.md")

    claude "$AGENT_PROMPT

## Session Context (injected by hook)

- FOLDERS_EDITED: $FOLDERS_EDITED
- FLOAT_DB: $FLOAT_DB
" --print --model haiku --allowedTools Bash,Read,Glob --max-turns 10 2>/dev/null &
  fi

  # ---------------------------------------------------------------------------
  # PHASE 4: Write handoff.md via float-handoff agent (parallel)
  # ---------------------------------------------------------------------------
  if command -v claude &> /dev/null; then
    # Read agent file, strip YAML frontmatter, inject context
    AGENT_PROMPT=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-handoff.md")

    claude "$AGENT_PROMPT

## Session Context (injected by hook)

- TRANSCRIPT_PATH: $TRANSCRIPT_PATH
- FLOAT_DB: $FLOAT_DB
- PROJECT_DIR: $PROJECT_DIR
- ENTRY_ID: $ENTRY_ID
- FILES_CHANGED_JSON: $FILES_CHANGED_JSON
- FOLDERS_EDITED: $FOLDERS_EDITED
" --print --model haiku --allowedTools Bash,Read,Write --max-turns 10 2>/dev/null &
  fi

  # ---------------------------------------------------------------------------
  # PHASE 5: Workshop agents (only if .float-workshop/ exists) - parallel
  # ---------------------------------------------------------------------------
  if [ -d "$PROJECT_DIR/.float-workshop" ]; then

    # Spawn float-organize agent (workshop cleanup)
    if command -v claude &> /dev/null; then
      claude "You are the float-organize agent for the FloatPrompt workshop.

Workshop directory: $PROJECT_DIR/.float-workshop
Files changed this session: $FILES_CHANGED_JSON

Your task:
1. Check active/ folder - if more than 3 items, suggest moving to later/
2. Check later/ folder - if more than 10 items, suggest cleanup
3. Update ACTIVE.md with current status if needed

Read the workshop README for conventions: $PROJECT_DIR/.float-workshop/README.md
" --print --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 3 2>/dev/null &
    fi

    # Spawn float-update-logs agent (workshop logging)
    if command -v claude &> /dev/null; then
      claude "You are the float-update-logs agent for the FloatPrompt workshop.

Workshop logs: $PROJECT_DIR/.float-workshop/logs/
Transcript: $TRANSCRIPT_PATH
Files changed: $FILES_CHANGED_JSON
Folders edited: $FOLDERS_EDITED

## Your job: Create decision log entries

For each SIGNIFICANT DECISION made this session, create a log file.

### Step 1: Read transcript
Read $TRANSCRIPT_PATH to understand what happened.

### Step 2: Identify decisions
**What counts as a decision:**
- Architectural choices (use X instead of Y)
- Schema changes (added column, renamed field)
- Plugin design decisions (hook strategy, agent responsibilities)
- Pattern establishments (naming conventions, folder structure)

**What does NOT count:**
- Routine implementation work
- Bug fixes without broader implications
- Research/exploration without conclusions

### Step 3: Create log files (if any decisions found)
For each decision, create: logs/2026/01-jan/$CURRENT_DATE-topic-slug.md

**Format:**
\`\`\`markdown
# Decision Title

**Session:** [N]
**Date:** $CURRENT_DATE
**Folders:** [list affected folders]

## Summary
[1-2 sentences on what was decided]

## Decision
[The actual decision - what approach was chosen]

## Rationale
[Why this approach - trade-offs considered]

## Files Changed
[List key files modified]
\`\`\`

### Step 4: Update 01-jan.md summary (if decisions were logged)
Add entries to the 'Current (Locked)' section in $PROJECT_DIR/.float-workshop/logs/2026/01-jan/01-jan.md

Check existing logs for examples: $PROJECT_DIR/.float-workshop/logs/2026/01-jan/
" --print --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 8 2>/dev/null &
    fi
  fi

  # Wait for all parallel agents to complete
  wait

  # Cleanup temp transcript
  rm -f "$TRANSCRIPT_TRUNCATED" 2>/dev/null || true

fi  # End PreCompact-only section

exit 0
