#!/bin/bash
#
# FloatPrompt Boot Query
#
# Fetches all context needed for session boot in one command.
# Outputs JSON for AI to parse and present.
#
# Usage: ./boot.sh [project_dir]
#
# Mechanical queries only - no AI judgment here.
# AI's job: interpret results and present context.
#

set -e

# Detect project root: use argument, or find git root, or use cwd
if [ -n "$1" ]; then
  PROJECT_DIR="$1"
elif git rev-parse --show-toplevel &>/dev/null; then
  PROJECT_DIR="$(git rev-parse --show-toplevel)"
else
  PROJECT_DIR="$(pwd)"
fi

FLOAT_DB="$PROJECT_DIR/.float/float.db"
HANDOFF_FILE="$PROJECT_DIR/.float/handoff.md"

# -----------------------------------------------------------------------------
# Check if float.db exists
# -----------------------------------------------------------------------------
if [ ! -f "$FLOAT_DB" ]; then
  echo "{\"exists\": false, \"project_root\": \"$PROJECT_DIR\"}"
  exit 0
fi

# -----------------------------------------------------------------------------
# Helper: escape JSON strings
# -----------------------------------------------------------------------------
json_escape() {
  local str="$1"
  # Escape backslashes, quotes, and control characters
  str="${str//\\/\\\\}"
  str="${str//\"/\\\"}"
  str="${str//$'\n'/\\n}"
  str="${str//$'\r'/\\r}"
  str="${str//$'\t'/\\t}"
  echo "$str"
}

# -----------------------------------------------------------------------------
# Read handoff.md if it exists
# -----------------------------------------------------------------------------
HANDOFF_CONTENT=""
if [ -f "$HANDOFF_FILE" ]; then
  HANDOFF_CONTENT=$(cat "$HANDOFF_FILE")
fi

# -----------------------------------------------------------------------------
# Helper: run sqlite3 -json and ensure empty results return []
# -----------------------------------------------------------------------------
query_json() {
  local result
  result=$(sqlite3 -json "$FLOAT_DB" "$1" 2>/dev/null)
  if [ -z "$result" ]; then
    echo "[]"
  else
    echo "$result"
  fi
}

# -----------------------------------------------------------------------------
# Query: Last session handoff from log_entries
# -----------------------------------------------------------------------------
LAST_HANDOFF=$(query_json "
  SELECT title, decision, rationale, before_state, after_state, created_at
  FROM log_entries
  WHERE topic='session-handoff'
  ORDER BY created_at DESC
  LIMIT 1
")

# -----------------------------------------------------------------------------
# Query: Recent locked decisions
# -----------------------------------------------------------------------------
RECENT_DECISIONS=$(query_json "
  SELECT date, folder_path, title, decision
  FROM log_entries
  WHERE status='locked'
  ORDER BY created_at DESC
  LIMIT 5
")

# -----------------------------------------------------------------------------
# Query: Open questions (unresolved)
# -----------------------------------------------------------------------------
OPEN_QUESTIONS=$(query_json "
  SELECT question, context, created_at
  FROM open_questions
  WHERE resolved_at IS NULL
  ORDER BY created_at DESC
  LIMIT 5
")

# -----------------------------------------------------------------------------
# Query: Stale folders
# -----------------------------------------------------------------------------
STALE_FOLDERS=$(query_json "
  SELECT path, name
  FROM folders
  WHERE status='stale'
  ORDER BY path
  LIMIT 10
")

# -----------------------------------------------------------------------------
# Query: Stats
# -----------------------------------------------------------------------------
FOLDER_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders" 2>/dev/null || echo "0")
FILE_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM files" 2>/dev/null || echo "0")
STALE_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders WHERE status='stale'" 2>/dev/null || echo "0")
PENDING_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders WHERE status='pending'" 2>/dev/null || echo "0")
CURRENT_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders WHERE status='current'" 2>/dev/null || echo "0")

# -----------------------------------------------------------------------------
# Query: Check permissions status
# -----------------------------------------------------------------------------
SETTINGS_FILE="$PROJECT_DIR/.claude/settings.json"
PERMISSIONS_SET="false"
if [ -f "$SETTINGS_FILE" ]; then
  # Check for all required permissions: git, sqlite3, and the plugin scripts
  HAS_GIT=$(grep -q "git" "$SETTINGS_FILE" 2>/dev/null && echo "1" || echo "0")
  HAS_SQLITE=$(grep -q "sqlite3" "$SETTINGS_FILE" 2>/dev/null && echo "1" || echo "0")
  HAS_BOOT=$(grep -q "boot.sh" "$SETTINGS_FILE" 2>/dev/null && echo "1" || echo "0")
  HAS_SCAN=$(grep -q "scan.sh" "$SETTINGS_FILE" 2>/dev/null && echo "1" || echo "0")
  HAS_CAPTURE=$(grep -q "float-capture.sh" "$SETTINGS_FILE" 2>/dev/null && echo "1" || echo "0")

  if [ "$HAS_GIT" = "1" ] && [ "$HAS_SQLITE" = "1" ] && [ "$HAS_BOOT" = "1" ] && [ "$HAS_SCAN" = "1" ] && [ "$HAS_CAPTURE" = "1" ]; then
    PERMISSIONS_SET="true"
  fi
fi

# -----------------------------------------------------------------------------
# Output JSON
# -----------------------------------------------------------------------------
ESCAPED_HANDOFF=$(json_escape "$HANDOFF_CONTENT")

cat << EOF
{
  "exists": true,
  "project_root": "$PROJECT_DIR",
  "handoff_md": "$ESCAPED_HANDOFF",
  "last_session": $LAST_HANDOFF,
  "recent_decisions": $RECENT_DECISIONS,
  "open_questions": $OPEN_QUESTIONS,
  "stale_folders": $STALE_FOLDERS,
  "stats": {
    "folders": $FOLDER_COUNT,
    "files": $FILE_COUNT,
    "stale": $STALE_COUNT,
    "pending": $PENDING_COUNT,
    "current": $CURRENT_COUNT
  },
  "permissions_set": $PERMISSIONS_SET
}
EOF
