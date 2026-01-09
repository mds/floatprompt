#!/bin/bash
#
# FloatPrompt Layer 1 Scan
#
# Walks filesystem, populates folders AND files tables
# No AI judgment - just mechanical data capture
#
# Usage: ./scan.sh [project_dir]
#
# Phase 1: Mechanical (this script) - lightning fast
# Phase 2: AI enrichment (agents) - background
#

set -e

PROJECT_DIR="${1:-$(pwd)}"
FLOAT_DB="$PROJECT_DIR/.float/float.db"
# Schema is in same directory as this script
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCHEMA_FILE="${SCRIPT_DIR}/schema.sql"

# -----------------------------------------------------------------------------
# Ensure .float/ directory exists
# -----------------------------------------------------------------------------
mkdir -p "$PROJECT_DIR/.float"

# -----------------------------------------------------------------------------
# Initialize database if needed
# -----------------------------------------------------------------------------
if [ ! -f "$FLOAT_DB" ]; then
  if [ -f "$SCHEMA_FILE" ]; then
    sqlite3 "$FLOAT_DB" < "$SCHEMA_FILE"
  else
    echo "Error: schema.sql not found at $SCHEMA_FILE"
    exit 1
  fi
fi

# -----------------------------------------------------------------------------
# Patterns to exclude (common noise)
# -----------------------------------------------------------------------------
EXCLUDE_PATTERNS=(
  "node_modules"
  ".git"
  ".float"
  ".claude"
  "__pycache__"
  ".pytest_cache"
  ".next"
  ".nuxt"
  "dist"
  "build"
  ".venv"
  "venv"
  ".tox"
  "coverage"
  ".nyc_output"
  ".cache"
  ".turbo"
)

# Build find exclude arguments
EXCLUDE_ARGS=""
for pattern in "${EXCLUDE_PATTERNS[@]}"; do
  EXCLUDE_ARGS="$EXCLUDE_ARGS -path '*/$pattern' -prune -o -path '*/$pattern/*' -prune -o"
done

# -----------------------------------------------------------------------------
# Scan and insert folders
# -----------------------------------------------------------------------------
cd "$PROJECT_DIR"

# Get current timestamp
NOW=$(date +%s)

echo "Scanning folders..."

# Find all directories, excluding noise
eval "find . -type d $EXCLUDE_ARGS -type d -print" | while read -r dir; do
  # Normalize path (remove leading ./)
  if [ "$dir" = "." ]; then
    path="/"
  else
    path="${dir#.}"
  fi

  # Calculate parent path
  if [ "$path" = "/" ]; then
    parent_path=""
  else
    parent_path=$(dirname "$path")
    [ "$parent_path" = "/" ] || [ "$parent_path" = "." ] && parent_path="/"
  fi

  # Get folder name
  name=$(basename "$path")
  [ "$path" = "/" ] && name="(root)"

  # Insert or update (upsert)
  sqlite3 "$FLOAT_DB" "
    INSERT INTO folders (path, parent_path, name, type, status, created_at, updated_at, last_scanned_at)
    VALUES ('$path', '$parent_path', '$name', 'folder', 'pending', $NOW, $NOW, $NOW)
    ON CONFLICT(path) DO UPDATE SET
      last_scanned_at = $NOW,
      updated_at = $NOW;
  "
done

# -----------------------------------------------------------------------------
# Scan and insert files with content hashes
# -----------------------------------------------------------------------------
echo "Scanning files..."

# Find all files, excluding noise directories
eval "find . -type d $EXCLUDE_ARGS -type f -print" | while read -r file; do
  # Skip binary files and very large files (> 1MB)
  if [ -f "$file" ] && [ "$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)" -lt 1048576 ]; then
    # Check if it's a text file (skip binaries)
    if file "$file" | grep -qE 'text|JSON|XML|empty'; then
      # Normalize path
      path="${file#.}"

      # Get folder path
      folder_path=$(dirname "$path")
      [ "$folder_path" = "." ] && folder_path="/"

      # Compute SHA-256 hash
      if command -v shasum &> /dev/null; then
        content_hash=$(shasum -a 256 "$file" | cut -d' ' -f1)
      elif command -v sha256sum &> /dev/null; then
        content_hash=$(sha256sum "$file" | cut -d' ' -f1)
      else
        content_hash="no-hash-tool"
      fi

      # Get mtime
      mtime=$(stat -f%m "$file" 2>/dev/null || stat -c%Y "$file" 2>/dev/null)

      # Escape single quotes in path
      escaped_path="${path//\'/\'\'}"
      escaped_folder="${folder_path//\'/\'\'}"

      # Insert or update
      sqlite3 "$FLOAT_DB" "
        INSERT INTO files (path, folder_path, content_hash, mtime, last_scanned_at)
        VALUES ('$escaped_path', '$escaped_folder', '$content_hash', $mtime, $NOW)
        ON CONFLICT(path) DO UPDATE SET
          folder_path = '$escaped_folder',
          content_hash = '$content_hash',
          mtime = $mtime,
          last_scanned_at = $NOW;
      "
    fi
  fi
done

# -----------------------------------------------------------------------------
# Compute source_hash for each folder (hash of children)
# -----------------------------------------------------------------------------
echo "Computing folder hashes..."

sqlite3 "$FLOAT_DB" "
  UPDATE folders SET source_hash = (
    SELECT COALESCE(
      (SELECT group_concat(content_hash, '') FROM (
        SELECT content_hash FROM files WHERE folder_path = folders.path ORDER BY path
      )),
      'empty'
    )
  );
"

# -----------------------------------------------------------------------------
# Report
# -----------------------------------------------------------------------------
FOLDER_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders")
FILE_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM files")
echo "Scan complete: $FOLDER_COUNT folders, $FILE_COUNT files indexed in .float/float.db"
