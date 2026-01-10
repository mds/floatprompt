#!/bin/bash
#
# FloatPrompt Layer 1 Scan
#
# Rust-powered merkle scanner for O(log n) change detection.
# ~230x faster than the original bash implementation.
#
# Usage: ./scan.sh [project_dir]
#

set -e

PROJECT_DIR="${1:-$(pwd)}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
SCANNER_DIR="${SCRIPT_DIR}/scanner"

# Detect platform for native binary
detect_scanner() {
  local arch=$(uname -m)
  local os=$(uname -s | tr '[:upper:]' '[:lower:]')

  case "$os" in
    darwin)
      case "$arch" in
        arm64) echo "scanner.darwin-arm64.node" ;;
        x86_64) echo "scanner.darwin-x64.node" ;;
      esac
      ;;
    linux)
      case "$arch" in
        x86_64) echo "scanner.linux-x64-gnu.node" ;;
        aarch64) echo "scanner.linux-arm64-gnu.node" ;;
      esac
      ;;
  esac
}

SCANNER_BINARY=$(detect_scanner)

# Check if Rust scanner is available for this platform
if [ -f "$SCANNER_DIR/index.js" ] && [ -n "$SCANNER_BINARY" ] && [ -f "$SCANNER_DIR/$SCANNER_BINARY" ]; then
  # Use fast Rust scanner
  node "$SCANNER_DIR/scan-cli.js" "$PROJECT_DIR"
else
  # Fallback to original bash implementation
  echo "Note: Rust scanner not available for this platform, using bash fallback (slower)"

  FLOAT_DB="$PROJECT_DIR/.float/float.db"
  SCHEMA_FILE="${SCRIPT_DIR}/schema.sql"

  # Ensure .float/ directory exists
  mkdir -p "$PROJECT_DIR/.float"

  # Initialize database if needed
  if [ ! -f "$FLOAT_DB" ]; then
    if [ -f "$SCHEMA_FILE" ]; then
      sqlite3 "$FLOAT_DB" < "$SCHEMA_FILE"
    else
      echo "Error: schema.sql not found at $SCHEMA_FILE"
      exit 1
    fi
  fi

  # Patterns to exclude
  EXCLUDE_PATTERNS=(
    "node_modules" ".git" ".float" ".claude" "__pycache__" ".pytest_cache"
    ".next" ".nuxt" "dist" "build" ".venv" "venv" ".tox" "coverage"
    ".nyc_output" ".cache" ".turbo" "target"
  )

  EXCLUDE_ARGS=""
  for pattern in "${EXCLUDE_PATTERNS[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS -path '*/$pattern' -prune -o -path '*/$pattern/*' -prune -o"
  done

  cd "$PROJECT_DIR"
  NOW=$(date +%s)

  echo "Scanning folders..."
  eval "find . -type d $EXCLUDE_ARGS -type d -print" | while read -r dir; do
    if [ "$dir" = "." ]; then path="/"; else path="${dir#.}"; fi
    if [ "$path" = "/" ]; then parent_path=""; else
      parent_path=$(dirname "$path")
      [ "$parent_path" = "/" ] || [ "$parent_path" = "." ] && parent_path="/"
    fi
    name=$(basename "$path")
    [ "$path" = "/" ] && name="(root)"
    sqlite3 "$FLOAT_DB" "
      INSERT INTO folders (path, parent_path, name, type, status, created_at, updated_at, last_scanned_at)
      VALUES ('$path', '$parent_path', '$name', 'folder', 'pending', $NOW, $NOW, $NOW)
      ON CONFLICT(path) DO UPDATE SET last_scanned_at = $NOW, updated_at = $NOW;
    "
  done

  echo "Scanning files..."
  eval "find . -type d $EXCLUDE_ARGS -type f -print" | while read -r file; do
    if [ -f "$file" ] && [ "$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)" -lt 1048576 ]; then
      if file "$file" | grep -qE 'text|JSON|XML|empty'; then
        path="${file#.}"
        folder_path=$(dirname "$path")
        [ "$folder_path" = "." ] && folder_path="/"
        if command -v shasum &> /dev/null; then
          content_hash=$(shasum -a 256 "$file" | cut -d' ' -f1)
        elif command -v sha256sum &> /dev/null; then
          content_hash=$(sha256sum "$file" | cut -d' ' -f1)
        else
          content_hash="no-hash-tool"
        fi
        mtime=$(stat -f%m "$file" 2>/dev/null || stat -c%Y "$file" 2>/dev/null)
        escaped_path="${path//\'/\'\'}"
        escaped_folder="${folder_path//\'/\'\'}"
        sqlite3 "$FLOAT_DB" "
          INSERT INTO files (path, folder_path, content_hash, mtime, last_scanned_at)
          VALUES ('$escaped_path', '$escaped_folder', '$content_hash', $mtime, $NOW)
          ON CONFLICT(path) DO UPDATE SET
            folder_path = '$escaped_folder', content_hash = '$content_hash',
            mtime = $mtime, last_scanned_at = $NOW;
        "
      fi
    fi
  done

  echo "Computing folder hashes..."
  sqlite3 "$FLOAT_DB" "
    UPDATE folders SET source_hash = (
      SELECT COALESCE(
        (SELECT group_concat(content_hash, '') FROM (
          SELECT content_hash FROM files WHERE folder_path = folders.path ORDER BY path
        )), 'empty'
      )
    );
  "

  FOLDER_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM folders")
  FILE_COUNT=$(sqlite3 "$FLOAT_DB" "SELECT COUNT(*) FROM files")
  echo "Scan complete: $FOLDER_COUNT folders, $FILE_COUNT files indexed in .float/float.db"
fi
