#!/bin/bash
#
# FloatPrompt Automatic Handoff
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

# Read hook input from stdin
INPUT=$(cat)

# Extract fields from JSON input
SESSION_ID=$(echo "$INPUT" | jq -r '.session_id // empty')
TRANSCRIPT_PATH=$(echo "$INPUT" | jq -r '.transcript_path // empty')
CWD=$(echo "$INPUT" | jq -r '.cwd // empty')
REASON=$(echo "$INPUT" | jq -r '.reason // empty')
HOOK_EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // empty')

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
# Early exit: Deduplication - skip if handoff already ran recently (5 min)
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
# Early exit: Skip if no changes
# -----------------------------------------------------------------------------
cd "$PROJECT_DIR"
# Include both staged and unstaged changes
CHANGED_FILES=$(git diff --name-only HEAD 2>/dev/null || echo "")
STAGED_FILES=$(git diff --cached --name-only 2>/dev/null || echo "")
# Combine and dedupe
CHANGED_FILES=$(echo -e "$CHANGED_FILES\n$STAGED_FILES" | sort -u | grep -v '^$' || echo "")

if [ -z "$CHANGED_FILES" ]; then
  # No changes, nothing to capture
  exit 0
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

ENTRY_ID=$(sqlite3 "$FLOAT_DB" "
INSERT INTO log_entries (
  folder_path,
  date,
  topic,
  status,
  title,
  decision,
  rationale,
  files_read,
  files_changed,
  created_at
) VALUES (
  '/',
  '$CURRENT_DATE',
  'session-handoff',
  'open',
  'Session end (awaiting enrichment)',
  'Session ended. Files modified: ${FILES_CHANGED_JSON//\'/\'\'}',
  'Pending AI enrichment.',
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

  # ---------------------------------------------------------------------------
  # PHASE 2: AI synthesis via float-log agent
  # ---------------------------------------------------------------------------
  if command -v claude &> /dev/null; then
    claude -p "You are the float-log agent. A session is about to compact.

Session info:
- Entry ID to update: $ENTRY_ID
- Files changed: $FILES_CHANGED_JSON
- Folders edited: $FOLDERS_EDITED
- Transcript: $TRANSCRIPT_PATH
- Database: $FLOAT_DB

## Your TWO jobs:

### Job 1: Update the session handoff (MANDATORY)
Update the pending entry with a meaningful summary:

sqlite3 \"$FLOAT_DB\" \"UPDATE log_entries SET
  title = 'Session [N]: [brief description]',
  decision = '[What was accomplished - be specific]',
  rationale = 'Next options: 1) [option], 2) [option], 3) [option]'
WHERE id = $ENTRY_ID;\"

### Job 2: Log folder-level decisions (IF ANY)
For each folder where a SIGNIFICANT DECISION was made, create a locked entry:

sqlite3 \"$FLOAT_DB\" \"INSERT INTO log_entries (
  folder_path, date, topic, status, title, decision, rationale, files_changed, created_at
) VALUES (
  '/path/to/folder',
  '$CURRENT_DATE',
  'topic-slug',
  'locked',
  'Decision title',
  'What was decided',
  'Why this approach was chosen',
  '[]',
  unixepoch()
);\"

**What counts as a decision:**
- Architectural choices (use X instead of Y)
- Schema changes (added column, renamed field)
- Pattern establishments (all hooks do X)
- Trade-off resolutions (prioritize A over B)

**What does NOT count:**
- Routine implementation
- Bug fixes without broader implications
- Work in progress

**Examples of good folder-level entries:**
- folder_path='/src/db', topic='schema-rename', title='Renamed content_md to context'
- folder_path='/plugins/floatprompt', topic='hook-architecture', title='PreCompact + SessionEnd dual trigger'
- folder_path='/src/auth', topic='token-strategy', title='Bearer tokens over cookies'

Read the transcript, then execute the SQL commands. Be selective - only log actual decisions.
" --model haiku --allowedTools Bash,Read --max-turns 5 2>/dev/null || true
  fi

  # ---------------------------------------------------------------------------
  # PHASE 3: AI enrichment via float-enrich agent
  # ---------------------------------------------------------------------------
  if command -v claude &> /dev/null && [ "$FOLDERS_EDITED" != "[]" ]; then
    claude -p "You are the float-enrich agent. A session is about to compact.

Folders that were edited: $FOLDERS_EDITED
Database: $FLOAT_DB

Your task:
1. For each folder in the list, check if it exists in float.db
2. If it exists, read the folder contents and current context
3. Decide if there's new understanding worth capturing
4. If yes, update the folder's description and context

Use sqlite3 directly:
- Query: sqlite3 $FLOAT_DB \"SELECT path, description, context FROM folders WHERE path = '...'\"
- Update: sqlite3 $FLOAT_DB \"UPDATE folders SET description='...', context='...', status='current', ai_model='haiku', ai_updated=unixepoch() WHERE path='...'\"

Be selective. Only update if you have genuinely new understanding.
" --model haiku --allowedTools Bash,Read,Glob --max-turns 5 2>/dev/null || true
  fi

  # ---------------------------------------------------------------------------
  # PHASE 4: Workshop agents (only if .float-workshop/ exists)
  # ---------------------------------------------------------------------------
  if [ -d "$PROJECT_DIR/.float-workshop" ]; then

    # Spawn float-organize agent (workshop cleanup)
    if command -v claude &> /dev/null; then
      claude -p "You are the float-organize agent for the FloatPrompt workshop.

Workshop directory: $PROJECT_DIR/.float-workshop
Files changed this session: $FILES_CHANGED_JSON

Your task:
1. Check active/ folder - if more than 3 items, suggest moving to later/
2. Check later/ folder - if more than 10 items, suggest cleanup
3. Update ACTIVE.md with current status if needed

Read the workshop README for conventions: $PROJECT_DIR/.float-workshop/README.md
" --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 3 2>/dev/null || true
    fi

    # Spawn float-update-logs agent (workshop logging)
    if command -v claude &> /dev/null; then
      claude -p "You are the float-update-logs agent for the FloatPrompt workshop.

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
" --model haiku --allowedTools Bash,Read,Write,Glob --max-turns 8 2>/dev/null || true
    fi
  fi

fi  # End PreCompact-only section

exit 0
