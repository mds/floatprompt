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
    "behavior": "Understand how the code layer detects changes and produces data for scout-map"
  },

  "requirements": {
    "runtime": "Node.js",
    "scope": "Entire project directory with standard ignores",
    "output": "Raw change data for scout-map (via scout-detect)",
    "always_on": "Runs continuously while active"
  }
}
</json>
<md>
# Filesystem Watcher Specification

**The code layer that detects changes and triggers the buoy chain.**

Pure Node.js. No AI calls. Runs continuously, detects filesystem events, gathers raw data via scout-detect, and passes non-trivial changes to scout-map.

---

## Overview

```
┌─────────────────────────────────────────┐
│  Filesystem Watcher                     │
│                                         │
│  ┌─────────────┐    ┌────────────────┐ │
│  │  Event      │───→│  scout-detect  │ │
│  │  Listener   │    │  (code)        │ │
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
                             ▼ (if non-trivial)
                      scout-map (AI)
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

### Version Source

Where does the watcher get the current project version?

```javascript
async function getCurrentVersion() {
  // Primary: package.json
  const pkgPath = path.join(projectRoot, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    if (pkg.version) return pkg.version;
  }

  // Fallback: .float/project/context/*.md frontmatter
  const contextFiles = await glob('.float/project/context/*.md');
  for (const file of contextFiles) {
    const frontmatter = await parseFrontmatter(file);
    if (frontmatter?.version) return frontmatter.version;
  }

  // No version found
  return null;
}
```

**Priority:**
1. `package.json` version field (standard for Node projects)
2. Context file frontmatter version (fallback for non-npm projects)
3. `null` if no version found (version checking disabled)

---

## Raw Change Data Output

What scout-detect passes to scout-map (for non-trivial changes):

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

Watcher state persisted to `.float/project/.watcher.json`:

```json
{
  "status": "running",
  "pid": 12345,
  "started": "2025-12-30T14:00:00Z",
  "project_root": "/Users/mds/project",
  "files_tracked": 147,
  "last_event": "2025-12-30T14:32:00Z",
  "pending_scouts": 0,
  "offline_queue": [],
  "config": {
    "debounce_ms": 500,
    "batch_window_ms": 1000,
    "flood_threshold": 20
  }
}
```

**Location rationale:** `.float/project/` is for project-specific data (not system internals). Watcher state is project-specific.

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

1. Check `.float/project/.watcher.json` for status
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
Check .float/project/.watcher.json exists?
      │
      ├── Yes, running → Report status, exit
      ├── Yes, stale → Clean up, start fresh
      │
      ▼
Start filesystem watcher
      │
      ▼
Run initial scan (scout-detect → scout-map if needed)
      │
      ▼
Report status
      │
      ▼
Enter watch loop
```

---

## Initial Scan

On startup, watcher runs a full scan checking all staleness types:

```javascript
async function initialScan() {
  const currentVersion = await getCurrentVersion();
  const files = await glob('**/*', { ignore: ignorePatterns });
  const issues = [];

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const frontmatter = await parseFrontmatter(file);

    // 1. Broken references
    const refs = await checkReferences(file);
    if (refs.broken_refs.length > 0) {
      issues.push({ file, type: 'broken_refs', details: refs.broken_refs });
    }

    // 2. Timestamp drift (ai_updated older than file mtime)
    if (frontmatter) {
      const timestamps = await checkTimestamps(file, frontmatter);
      if (timestamps.is_stale) {
        issues.push({ file, type: 'timestamp_drift', details: timestamps });
      }
    }

    // 3. Version mismatches
    if (currentVersion) {
      const versions = await checkVersions(content, currentVersion);
      if (versions.mismatches.length > 0) {
        issues.push({ file, type: 'version_mismatch', details: versions.mismatches });
      }
    }

    // 4. Missing frontmatter (for files that should have it)
    if (shouldHaveFrontmatter(file) && !frontmatter) {
      issues.push({ file, type: 'missing_frontmatter', details: null });
    }
  }

  // 5. Orphaned nav entries (files listed in nav that don't exist)
  const navOrphans = await checkNavOrphans();
  issues.push(...navOrphans);

  // If issues found, trigger scout-map with batch
  if (issues.length > 0) {
    await triggerScoutMap({ type: 'initial_scan', issues });
  }

  return { files_tracked: files.length, issues_found: issues.length };
}

function shouldHaveFrontmatter(filePath) {
  // Files in these locations should have frontmatter
  const frontmatterPaths = ['.float/', 'docs/', 'specs/'];
  return frontmatterPaths.some(p => filePath.includes(p)) && filePath.endsWith('.md');
}

async function checkNavOrphans() {
  const orphans = [];
  const navFiles = await glob('.float/project/nav/*.md');

  for (const navFile of navFiles) {
    const content = await fs.readFile(navFile, 'utf8');
    // Parse table rows for file references
    const fileRefs = parseNavTableFiles(content);

    for (const ref of fileRefs) {
      if (!await fs.pathExists(ref)) {
        orphans.push({ file: navFile, type: 'orphan_entry', details: ref });
      }
    }
  }

  return orphans;
}
```

### Staleness Types Checked

| Type | What It Catches |
|------|-----------------|
| broken_refs | Links that don't resolve |
| timestamp_drift | ai_updated older than file mtime |
| version_mismatch | Old version strings in content |
| missing_frontmatter | Files that should have frontmatter but don't |
| orphan_entry | Nav entries pointing to non-existent files |

---

*Watcher specification for the filesystem watcher.*
</md>
</fp>
