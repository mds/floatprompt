#!/bin/bash
#
# FloatPrompt Layer 1 Scan (Git-Native)
#
# Enumerates folders from git and populates float.db.
# Replaced Rust merkle scanner in Session 61 - git is now the source of truth.
#
# Usage: ./scan.sh [project_dir]
#

set -e

# Detect project root
if [ -n "$1" ]; then
  PROJECT_DIR="$1"
elif git rev-parse --show-toplevel &>/dev/null; then
  PROJECT_DIR="$(git rev-parse --show-toplevel)"
else
  echo '{"error": "Not a git repository. Run git init first.", "exists": false}'
  exit 1
fi

FLOAT_DIR="$PROJECT_DIR/.float"
FLOAT_DB="$FLOAT_DIR/float.db"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEMA_FILE="$SCRIPT_DIR/schema.sql"

# Create .float directory if needed
mkdir -p "$FLOAT_DIR"

# Initialize database if needed
if [ ! -f "$FLOAT_DB" ]; then
  if [ -f "$SCHEMA_FILE" ]; then
    sqlite3 "$FLOAT_DB" < "$SCHEMA_FILE"
  else
    echo '{"error": "schema.sql not found", "exists": false}'
    exit 1
  fi
fi

NOW=$(date +%s)

# Insert root folder first
sqlite3 "$FLOAT_DB" "
  INSERT INTO folders (path, parent_path, name, type, status, created_at, updated_at)
  VALUES ('/', NULL, '(root)', 'folder', 'pending', $NOW, $NOW)
  ON CONFLICT(path) DO UPDATE SET updated_at = $NOW;
"

# Get all folders from git-tracked files
git -C "$PROJECT_DIR" ls-files 2>/dev/null | while read -r file; do
  folder=$(dirname "$file")
  [ "$folder" = "." ] && continue  # Skip root-level files

  # Build path with leading slash
  FOLDER_PATH="/$folder"
  FOLDER_NAME=$(basename "$folder")
  PARENT_PATH=$(dirname "$FOLDER_PATH")
  [ "$PARENT_PATH" = "/" ] || [ "$PARENT_PATH" = "/." ] && PARENT_PATH="/"

  # Escape single quotes for SQL
  ESCAPED_PATH="${FOLDER_PATH//\'/\'\'}"
  ESCAPED_PARENT="${PARENT_PATH//\'/\'\'}"
  ESCAPED_NAME="${FOLDER_NAME//\'/\'\'}"

  sqlite3 "$FLOAT_DB" "
    INSERT INTO folders (path, parent_path, name, type, status, created_at, updated_at)
    VALUES ('$ESCAPED_PATH', '$ESCAPED_PARENT', '$ESCAPED_NAME', 'folder', 'pending', $NOW, $NOW)
    ON CONFLICT(path) DO UPDATE SET updated_at = $NOW;
  "
done

# Output stats as JSON
FOLDER_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders")
FILE_COUNT=$(git -C "$PROJECT_DIR" ls-files 2>/dev/null | wc -l | tr -d ' ')

echo "{\"folders\": $FOLDER_COUNT, \"files\": $FILE_COUNT, \"source\": \"git\", \"project_root\": \"$PROJECT_DIR\"}"
