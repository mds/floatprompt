#!/bin/bash
#
# capture.sh - FloatPrompt Session Capture
#
# Two-tier capture system:
#
#   AUTO (PreCompact/SessionEnd) → Mechanical only: sqlite3 INSERT
#     - Fires automatically, compaction doesn't wait for agents
#     - Saves facts: files changed, folders edited, timestamp
#     - Safety net: never lose data
#
#   MANUAL (/float-capture)      → Full pipeline: sqlite3 + AI agents
#     - User controls timing, agents complete reliably
#     - Saves understanding: title, decision, rationale, handoff.md
#     - Primary method for context transfer
#
# Key message: "PreCompact saves facts. Manual capture saves understanding."
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

# Capture actual diff content (ground truth for what changed)
# Truncate to 300 lines to avoid context overload while preserving signal
DIFF_CONTENT=$(git diff HEAD 2>/dev/null | head -300)
if [ -z "$DIFF_CONTENT" ]; then
  DIFF_CONTENT="(no diff available)"
fi

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
# PHASES 2-4: AI enrichment (manual capture only)
# -----------------------------------------------------------------------------
# Auto-triggers (PreCompact/SessionEnd) = mechanical only
#   - Compaction doesn't wait for agents to complete
#   - Agents get orphaned, handoff.md not reliably written
#   - But we ALWAYS get the mechanical log entry (facts saved)
#
# Manual capture (/float-capture) = full pipeline
#   - User controls timing, agents complete reliably
#   - Full enrichment: title, decision, rationale, handoff.md
#
# Key message: "PreCompact saves facts. Manual capture saves understanding."

if [ "$REASON" != "manual" ]; then
  # Auto-trigger: just log and exit after mechanical capture
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $HOOK_EVENT: mechanical capture entry $ENTRY_ID (agents skipped)" >> /tmp/float-capture-debug.log
  exit 0
fi

# Skip agents for research sessions (no file changes = nothing to enrich)
# Saves ~$0.34 per capture by not sending 260k tokens to 5 agents
if [ "$SESSION_TYPE" = "research" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] Research session: mechanical only (no files changed, agents skipped)" >> /tmp/float-capture-debug.log
  exit 0
fi

# Manual capture with file changes: run full agent pipeline
if [ "$REASON" = "manual" ]; then

  # Get plugin root directory (where agents/ lives)
  SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
  PLUGIN_ROOT="$(dirname "$SCRIPT_DIR")"

  # ---------------------------------------------------------------------------
  # OBSERVABILITY: Agent execution logging
  # ---------------------------------------------------------------------------
  AGENT_LOG="/tmp/float-agents-$(date +%Y%m%d-%H%M%S).log"
  echo "=== FloatPrompt Capture Started ===" >> "$AGENT_LOG"
  echo "Timestamp: $(date '+%Y-%m-%d %H:%M:%S')" >> "$AGENT_LOG"
  echo "ENTRY_ID: $ENTRY_ID" >> "$AGENT_LOG"
  echo "SESSION_TYPE: $SESSION_TYPE" >> "$AGENT_LOG"
  echo "FILES_CHANGED: $FILES_CHANGED_JSON" >> "$AGENT_LOG"
  echo "FOLDERS_EDITED: $FOLDERS_EDITED" >> "$AGENT_LOG"
  echo "DIFF_LINES: $(echo "$DIFF_CONTENT" | wc -l | tr -d ' ')" >> "$AGENT_LOG"
  echo "" >> "$AGENT_LOG"

  # ---------------------------------------------------------------------------
  # Pre-process: Truncate transcript to recent context only
  # ---------------------------------------------------------------------------
  # Full transcripts can be huge. Agents only need recent context for handoffs.
  # Extract last 500 lines — enough for context, not overwhelming.
  TRANSCRIPT_TRUNCATED="/tmp/float-transcript-tail-$$.txt"
  if [ -n "$TRANSCRIPT_PATH" ] && [ -f "$TRANSCRIPT_PATH" ]; then
    tail -n 500 "$TRANSCRIPT_PATH" > "$TRANSCRIPT_TRUNCATED"
    echo "Transcript: $TRANSCRIPT_PATH (truncated to 500 lines)" >> "$AGENT_LOG"
  else
    echo "(No transcript available)" > "$TRANSCRIPT_TRUNCATED"
    echo "Transcript: (none available)" >> "$AGENT_LOG"
  fi
  echo "" >> "$AGENT_LOG"

  # ---------------------------------------------------------------------------
  # STAGE 1: Entry writers (must complete before Stage 2)
  # ---------------------------------------------------------------------------
  # float-log: Updates entry with title/decision/rationale
  # float-decisions: Creates decision entries + open questions
  # Stage 2 agents read the entry, so Stage 1 must complete first.

  if command -v claude &> /dev/null; then
    # Export variables for agents to use (use truncated transcript)
    export ENTRY_ID FILES_CHANGED_JSON FOLDERS_EDITED FLOAT_DB CURRENT_DATE SESSION_TYPE DIFF_CONTENT
    export TRANSCRIPT_PATH="$TRANSCRIPT_TRUNCATED"

    echo "--- STAGE 1: Entry writers ---" >> "$AGENT_LOG"

    # --- float-log agent (session handoff) ---
    echo "[$(date '+%H:%M:%S')] Spawning float-log" >> "$AGENT_LOG"
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

## Git Diff (ground truth - what actually changed)

\`\`\`diff
$DIFF_CONTENT
\`\`\`
" --print --model haiku --allowedTools Bash,Read --max-turns 8 2>>"$AGENT_LOG" &
    FLOAT_LOG_PID=$!

    # --- float-decisions agent (folder decisions + questions) ---
    echo "[$(date '+%H:%M:%S')] Spawning float-decisions" >> "$AGENT_LOG"
    AGENT_PROMPT_DECISIONS=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-decisions.md")
    claude "$AGENT_PROMPT_DECISIONS

## Session Context (injected by hook)

- FILES_CHANGED_JSON: $FILES_CHANGED_JSON
- FOLDERS_EDITED: $FOLDERS_EDITED
- TRANSCRIPT_PATH: $TRANSCRIPT_PATH
- FLOAT_DB: $FLOAT_DB
- CURRENT_DATE: $CURRENT_DATE
" --print --model haiku --allowedTools Bash,Read --max-turns 8 2>>"$AGENT_LOG" &
    FLOAT_DECISIONS_PID=$!

    # Wait for Stage 1 to complete (entry now has real content)
    wait $FLOAT_LOG_PID
    echo "[$(date '+%H:%M:%S')] float-log completed (exit: $?)" >> "$AGENT_LOG"
    wait $FLOAT_DECISIONS_PID
    echo "[$(date '+%H:%M:%S')] float-decisions completed (exit: $?)" >> "$AGENT_LOG"
    echo "" >> "$AGENT_LOG"
  fi

  # ---------------------------------------------------------------------------
  # STAGE 2: Entry readers (entry now populated by Stage 1)
  # ---------------------------------------------------------------------------
  # float-enrich: Updates folder context
  # float-handoff: Reads entry, writes handoff.md
  # These agents can now read the real entry content.

  if command -v claude &> /dev/null; then
    echo "--- STAGE 2: Entry readers ---" >> "$AGENT_LOG"

    # --- float-enrich agent (folder context) ---
    if [ "$FOLDERS_EDITED" != "[]" ]; then
      echo "[$(date '+%H:%M:%S')] Spawning float-enrich" >> "$AGENT_LOG"
      AGENT_PROMPT=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-enrich.md")
      claude "$AGENT_PROMPT

## Session Context (injected by hook)

- FOLDERS_EDITED: $FOLDERS_EDITED
- FLOAT_DB: $FLOAT_DB
" --print --model haiku --allowedTools Bash,Read,Glob --max-turns 10 2>>"$AGENT_LOG" &
      FLOAT_ENRICH_PID=$!
    fi

    # --- float-handoff agent (writes handoff.md) ---
    # NOTE: Using Bash,Read only (no Write) - agent uses cat heredoc to write
    echo "[$(date '+%H:%M:%S')] Spawning float-handoff" >> "$AGENT_LOG"
    AGENT_PROMPT=$(sed '/^---$/,/^---$/d' "$PLUGIN_ROOT/agents/float-handoff.md")
    claude "$AGENT_PROMPT

## Session Context (injected by hook)

- TRANSCRIPT_PATH: $TRANSCRIPT_PATH
- FLOAT_DB: $FLOAT_DB
- PROJECT_DIR: $PROJECT_DIR
- ENTRY_ID: $ENTRY_ID
- FILES_CHANGED_JSON: $FILES_CHANGED_JSON
- FOLDERS_EDITED: $FOLDERS_EDITED
" --print --model haiku --allowedTools Bash,Read --max-turns 10 2>>"$AGENT_LOG" &
    FLOAT_HANDOFF_PID=$!

    # Wait for Stage 2
    if [ -n "$FLOAT_ENRICH_PID" ]; then
      wait $FLOAT_ENRICH_PID
      echo "[$(date '+%H:%M:%S')] float-enrich completed (exit: $?)" >> "$AGENT_LOG"
    fi
    wait $FLOAT_HANDOFF_PID
    echo "[$(date '+%H:%M:%S')] float-handoff completed (exit: $?)" >> "$AGENT_LOG"
    echo "" >> "$AGENT_LOG"
  fi

  # ---------------------------------------------------------------------------
  # STAGE 3: Workshop agents (only if .float-workshop/ exists)
  # ---------------------------------------------------------------------------
  if [ -d "$PROJECT_DIR/.float-workshop" ]; then
    echo "--- STAGE 3: Workshop agents ---" >> "$AGENT_LOG"

    # Spawn float-organize agent (workshop cleanup)
    if command -v claude &> /dev/null; then
      echo "[$(date '+%H:%M:%S')] Spawning float-organize" >> "$AGENT_LOG"
      claude "You are the float-organize agent for the FloatPrompt workshop.

Workshop directory: $PROJECT_DIR/.float-workshop
Files changed this session: $FILES_CHANGED_JSON

Your task:
1. Check active/ folder - if more than 3 items, suggest moving to later/
2. Check later/ folder - if more than 10 items, suggest cleanup
3. Update ACTIVE.md with current status if needed

Read the workshop README for conventions: $PROJECT_DIR/.float-workshop/README.md
" --print --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 3 2>>"$AGENT_LOG" &
      FLOAT_ORGANIZE_PID=$!
    fi

    # Spawn float-update-logs agent (workshop logging)
    if command -v claude &> /dev/null; then
      echo "[$(date '+%H:%M:%S')] Spawning float-update-logs" >> "$AGENT_LOG"
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
" --print --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 8 2>>"$AGENT_LOG" &
      FLOAT_UPDATE_LOGS_PID=$!
    fi

    # Wait for workshop agents
    if [ -n "$FLOAT_ORGANIZE_PID" ]; then
      wait $FLOAT_ORGANIZE_PID
      echo "[$(date '+%H:%M:%S')] float-organize completed (exit: $?)" >> "$AGENT_LOG"
    fi
    if [ -n "$FLOAT_UPDATE_LOGS_PID" ]; then
      wait $FLOAT_UPDATE_LOGS_PID
      echo "[$(date '+%H:%M:%S')] float-update-logs completed (exit: $?)" >> "$AGENT_LOG"
    fi
    echo "" >> "$AGENT_LOG"
  fi

  # ---------------------------------------------------------------------------
  # Cleanup and final logging
  # ---------------------------------------------------------------------------
  echo "=== FloatPrompt Capture Completed ===" >> "$AGENT_LOG"
  echo "Finished: $(date '+%Y-%m-%d %H:%M:%S')" >> "$AGENT_LOG"
  echo "Log file: $AGENT_LOG" >> "$AGENT_LOG"

  # Cleanup temp transcript
  rm -f "$TRANSCRIPT_TRUNCATED" 2>/dev/null || true

fi  # End manual capture section

exit 0
