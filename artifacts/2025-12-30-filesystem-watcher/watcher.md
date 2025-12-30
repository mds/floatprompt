<fp>
<json>
{
  "STOP": "Filesystem Watcher Specification. The code layer that detects changes and triggers the buoy chain.",

  "meta": {
    "title": "Filesystem Watcher Specification",
    "id": "filesystem-watcher",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Specify the Node.js watcher that monitors the filesystem and feeds the buoy chain",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Watcher specification reference",
    "behavior": "Understand how the code layer detects changes and produces data for Scout Buoy"
  },

  "requirements": {
    "runtime": "Node.js",
    "scope": "Entire project directory with standard ignores",
    "output": "Raw change data for Scout Buoy",
    "always_on": "Runs continuously while active"
  }
}
</json>
<md>
# Filesystem Watcher Specification

**The code layer that detects changes and triggers the buoy chain.**

Pure Node.js. No AI calls. Runs continuously, detects filesystem events, gathers raw data, and passes to Scout Buoy.

---

## Overview

```
┌─────────────────────────────────────────┐
│  Filesystem Watcher                     │
│                                         │
│  ┌─────────────┐    ┌────────────────┐ │
│  │  Event      │───→│  Detect        │ │
│  │  Listener   │    │  Functions     │ │
│  └─────────────┘    └────────────────┘ │
│                            │            │
│                            ▼            │
│                     ┌────────────────┐  │
│                     │  Raw Change    │  │
│                     │  Data          │  │
│                     └────────────────┘  │
│                            │            │
└────────────────────────────│────────────┘
                             │
                             ▼
                      Scout Buoy
```

---

## Starting the Watcher

### Via npx (Phase 2)

```bash
npx floatprompt
```

If `.float/` exists: Start watcher, run initial scout
If `.float/` doesn't exist: Initialize, then start watcher

### Via /float (Claude Code)

```
/float
```

Checks watcher status, starts if not running.

---

## Events Detected

| Event | Description |
|-------|-------------|
| create | New file created |
| modify | Existing file content changed |
| delete | File deleted |
| rename | File renamed (detected as delete + create) |
| move | File moved (detected as delete + create) |

Folder events are inferred from file events within them.

---

## Ignore Patterns

**Default ignores (never watched):**

```
node_modules/
.git/
.DS_Store
*.log
dist/
build/
coverage/
.env*
*.lock
package-lock.json
```

**Configurable via `.float/config.json`:**

```json
{
  "watcher": {
    "ignore": [
      "vendor/",
      "*.min.js",
      "temp/",
      "*.generated.*"
    ]
  }
}
```

---

## Detect Functions

Pure code that gathers context about a change.

### Reference Checker

Finds what references a file and what it references:

```javascript
// Input: changed file path
// Output: { references_to: [], referenced_by: [] }

async function checkReferences(filePath) {
  const fileName = path.basename(filePath);
  const relativePath = path.relative(projectRoot, filePath);

  // What references this file? (grep for path/name in .float/ and docs)
  const referencedBy = await grep(relativePath, ['.float/', 'docs/']);

  // What does this file reference? (if it has frontmatter with 'related')
  const frontmatter = await parseFrontmatter(filePath);
  const referencesTo = frontmatter?.related || [];

  return { references_to: referencesTo, referenced_by: referencedBy };
}
```

### Frontmatter Parser

Extracts YAML or `<fp><json>` metadata:

```javascript
// Input: file path
// Output: parsed metadata object or null

async function parseFrontmatter(filePath) {
  const content = await fs.readFile(filePath, 'utf8');

  // Try YAML frontmatter
  const yamlMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (yamlMatch) {
    return yaml.parse(yamlMatch[1]);
  }

  // Try floatprompt JSON
  const fpMatch = content.match(/<json>([\s\S]*?)<\/json>/);
  if (fpMatch) {
    return JSON.parse(fpMatch[1]);
  }

  return null;
}
```

### Broken Reference Checker

Verifies links actually exist:

```javascript
// Input: file path, its references
// Output: array of broken references

async function findBrokenRefs(filePath, references) {
  const broken = [];

  for (const ref of references) {
    const refPath = path.resolve(path.dirname(filePath), ref);
    if (!await fs.pathExists(refPath)) {
      broken.push(ref);
    }
  }

  return broken;
}
```

### Timestamp Comparator

Checks if ai_updated is older than file modification:

```javascript
// Input: file path, frontmatter
// Output: { file_mtime, ai_updated, is_stale }

async function checkTimestamps(filePath, frontmatter) {
  const stat = await fs.stat(filePath);
  const fileMtime = stat.mtime;
  const aiUpdated = frontmatter?.ai_updated
    ? new Date(frontmatter.ai_updated)
    : null;

  return {
    file_mtime: fileMtime,
    ai_updated: aiUpdated,
    is_stale: aiUpdated && fileMtime > aiUpdated
  };
}
```

### Version Checker

Compares version strings to current project version:

```javascript
// Input: file content
// Output: { versions_found: [], current_version, mismatches: [] }

async function checkVersions(content, currentVersion) {
  const versionPattern = /v?\d+\.\d+\.\d+/g;
  const found = content.match(versionPattern) || [];
  const mismatches = found.filter(v => v !== currentVersion && v !== `v${currentVersion}`);

  return {
    versions_found: found,
    current_version: currentVersion,
    mismatches
  };
}
```

---

## Raw Change Data Output

What the watcher passes to Scout Buoy:

```json
{
  "event": "modify",
  "path": "src/auth.ts",
  "relative_path": "src/auth.ts",
  "timestamp": "2025-12-30T14:32:00Z",
  "file_type": "typescript",
  "size": 2847,
  "size_delta": 245,
  "references_to": [],
  "referenced_by": ["nav/src.md", "docs/safety.md"],
  "broken_refs": [],
  "frontmatter": null,
  "timestamps": {
    "file_mtime": "2025-12-30T14:32:00Z",
    "ai_updated": null,
    "is_stale": false
  },
  "versions": {
    "versions_found": [],
    "current_version": "0.11.0",
    "mismatches": []
  }
}
```

---

## Debouncing

Rapid changes are debounced to avoid flooding:

```javascript
const DEBOUNCE_MS = 500;

// Multiple saves to same file within 500ms = one change event
// Multiple files changed within 500ms = batched to Scout
```

**Configurable:**

```json
{
  "watcher": {
    "debounce_ms": 500,
    "batch_window_ms": 1000
  }
}
```

---

## Flood Detection

Large change sets trigger special handling:

```javascript
const FLOOD_THRESHOLD = 20; // files in batch_window

if (batchedChanges.length > FLOOD_THRESHOLD) {
  // Don't send to Scout individually
  // Send flood alert to Think Buoy
  // Think triggers /float-plan
}
```

---

## State File

Watcher state persisted to `.float/.watcher.json`:

```json
{
  "status": "running",
  "pid": 12345,
  "started": "2025-12-30T14:00:00Z",
  "project_root": "/Users/mds/project",
  "files_tracked": 147,
  "last_event": "2025-12-30T14:32:00Z",
  "pending_scouts": 0,
  "config": {
    "debounce_ms": 500,
    "batch_window_ms": 1000,
    "flood_threshold": 20
  }
}
```

---

## CLI Interface

```bash
# Start watcher (foreground)
npx floatprompt

# Start watcher (background, Phase 3)
npx floatprompt --daemon

# Check status
npx floatprompt status

# Stop watcher
npx floatprompt stop

# View recent activity
npx floatprompt logs

# Force re-scan
npx floatprompt scan
```

---

## Integration with /float

When `/float` runs in Claude Code:

1. Check `.float/.watcher.json` for status
2. If running: Report status, continue to boot
3. If not running: Start watcher, then boot
4. If crashed: Restart watcher, report recovery

```
FloatPrompt operational.
Directory: /Users/mds/project
Context: Loaded
Status: No issues found

Watcher: running (147 files, last event 3m ago)

Ready for: human direction
```

---

## Error Handling

| Error | Response |
|-------|----------|
| Permission denied | Log warning, exclude file from watch |
| File disappeared mid-read | Log, skip, continue |
| Too many open files | Reduce watch scope, alert user |
| Watcher crash | Auto-restart, log incident |

---

## Tech Stack

```json
{
  "dependencies": {
    "chokidar": "^3.x",
    "yaml": "^2.x",
    "gray-matter": "^4.x"
  }
}
```

- **chokidar** — Cross-platform filesystem watching
- **yaml** — YAML parsing for frontmatter
- **gray-matter** — Frontmatter extraction

---

## File Structure

```
floatprompt/
├── bin/
│   └── floatprompt.js      # CLI entry (existing, extend)
├── src/
│   └── watcher/
│       ├── index.js        # Main watcher module
│       ├── events.js       # Event handling
│       ├── detect.js       # Detect functions
│       ├── state.js        # State management
│       └── config.js       # Configuration
```

---

## Startup Flow

```
npx floatprompt
      │
      ▼
Check .float/ exists?
      │
      ├── No → Initialize .float/
      │
      ▼
Check .watcher.json exists?
      │
      ├── Yes, running → Report status, exit
      ├── Yes, stale → Clean up, start fresh
      │
      ▼
Start filesystem watcher
      │
      ▼
Run initial scan (Scout Buoy)
      │
      ▼
Report status
      │
      ▼
Enter watch loop
```

---

## Initial Scan

On startup, watcher runs a full scan:

```javascript
async function initialScan() {
  // Get all tracked files
  const files = await glob('**/*', { ignore: ignorePatterns });

  // Check for obvious issues (broken refs, missing frontmatter)
  const issues = [];
  for (const file of files) {
    const refs = await checkReferences(file);
    if (refs.broken_refs.length > 0) {
      issues.push({ file, type: 'broken_refs', refs: refs.broken_refs });
    }
  }

  // If issues found, trigger Scout Buoy with batch
  if (issues.length > 0) {
    await triggerScout({ type: 'initial_scan', issues });
  }

  return { files_tracked: files.length, issues_found: issues.length };
}
```

---

*Watcher specification for the filesystem watcher.*
</md>
</fp>
