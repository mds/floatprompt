<fp>
<json>
{
  "STOP": "Execution Plan. Detailed phased approach with parallel buoys and validation gates. Read decisions.md first for context.",

  "meta": {
    "title": "Execution Plan",
    "id": "great-restructuring-execution",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-execution"
  },

  "human": {
    "author": "@mds",
    "intent": "Define exact operations, phases, buoy coordination, and validation for the restructuring",
    "context": "Parallel buoys + phased validation gates"
  },

  "ai": {
    "role": "Execution coordinator",
    "behavior": "Follow phases exactly, spawn buoys as specified, validate before proceeding"
  },

  "requirements": {
    "phases": 9,
    "pattern": "Parallel workers within phases, sequential validation between phases",
    "tools_used": ["float-delta", "float-sync", "float-fix", "float-context"],
    "rollback_strategy": "Git branch, commit per phase"
  }
}
</json>
<md>
# Execution Plan

Detailed phased execution with parallel buoys and validation gates.

---

## Orchestration Pattern

```
┌─────────────────────────────────────────────────────────────────┐
│                     ORCHESTRATOR BUOY                           │
│                  (coordinates all phases)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
   ┌─────────┐          ┌─────────┐          ┌─────────┐
   │ Phase 1 │    →     │ Phase 2 │    →     │ Phase 3 │  → ...
   └─────────┘          └─────────┘          └─────────┘
        │                     │                     │
   ┌────┴────┐           ┌────┴────┐           ┌────┴────┐
   ▼         ▼           ▼         ▼           ▼         ▼
Worker A  Worker B    Worker A  Worker B    Worker A  Worker B
   │         │           │         │           │         │
   └────┬────┘           └────┬────┘           └────┬────┘
        ▼                     ▼                     ▼
   Validator              Validator             Validator
        │                     │                     │
        └──── GATE ───────────┴──── GATE ──────────┘
```

**Pattern:** Parallel workers WITHIN phases, sequential validation BETWEEN phases.

---

## Pre-Flight

### Before starting:

1. **Create branch:**
   ```bash
   git checkout -b great-restructuring
   ```

2. **Run /float-delta:**
   - Capture current state snapshot
   - Creates baseline for comparison

3. **Verify clean state:**
   ```bash
   git status  # should be clean
   ```

---

## Phase 1: Create New Folder Structure

**Goal:** Create empty target folders.

### Worker Buoys (parallel):

| Buoy | Operation |
|------|-----------|
| Worker A | `mkdir -p format/core format/tools` |
| Worker B | `mkdir -p system` |
| Worker C | `mkdir -p .float/core/format .float/core/tools/types` |

### Validation Buoy:

```bash
# Verify folders exist
test -d format/core && test -d format/tools && \
test -d system && \
test -d .float/core/format && test -d .float/core/tools/types
```

### Commit:
```
Phase 1: Create new folder structure
```

---

## Phase 2: Move FILE Pillar Content

**Goal:** Move `floatprompt/` → `format/`

### Worker Buoys (parallel):

| Buoy | Operation |
|------|-----------|
| Worker A | `git mv floatprompt/core/* format/core/` |
| Worker B | `git mv floatprompt/tools/* format/tools/` |

### After workers complete:

```bash
rmdir floatprompt/core floatprompt/tools floatprompt
```

### Validation Buoy:

```bash
# Verify files moved
test -f format/core/template.md && \
test -f format/core/doc.md && \
test -f format/core/os.md && \
test -f format/tools/update.md && \
test ! -d floatprompt  # old folder gone
```

### Commit:
```
Phase 2: Move floatprompt/ → format/
```

---

## Phase 3: Move SYSTEM Pillar Content

**Goal:** Create `system/` and populate it.

### Worker Buoys (parallel):

| Buoy | Operation |
|------|-----------|
| Worker A | `git mv specs/claude/commands.md system/` |
| Worker A | `git mv specs/claude/buoys.md system/` |
| Worker B | `git mv MAINTENANCE.md system/maintenance.md` |

### After workers complete:

```bash
rmdir specs/claude
```

### Validation Buoy:

```bash
# Verify files moved
test -f system/commands.md && \
test -f system/buoys.md && \
test -f system/maintenance.md && \
test ! -d specs/claude && \
test ! -f MAINTENANCE.md
```

### Commit:
```
Phase 3: Create system/ and move SYSTEM pillar content
```

---

## Phase 4: Restructure .float/

**Goal:** Rename .float/floatprompt/ → .float/core/ and reorganize.

### Worker Buoys (sequential — dependencies):

| Step | Buoy | Operation |
|------|------|-----------|
| 4.1 | Worker A | `git mv .float/floatprompt .float/core` |
| 4.2 | Worker B | `git mv .float/core/core .float/core/format` |
| 4.3 | Worker C | `git mv .float/core/types .float/core/tools/types` |

**Note:** These must be sequential due to path dependencies.

### Validation Buoy:

```bash
# Verify structure
test -d .float/core && \
test -d .float/core/format && \
test -d .float/core/tools && \
test -d .float/core/tools/types && \
test ! -d .float/floatprompt && \
test -f .float/core/tools/float.md && \
test -f .float/core/tools/types/extractor.md
```

### Commit:
```
Phase 4: Restructure .float/floatprompt/ → .float/core/
```

---

## Phase 5: Eliminate Root context/

**Goal:** Remove root `context/` folder (content will be absorbed into FLOAT.md files later).

### Worker Buoy:

| Buoy | Operation |
|------|-----------|
| Worker A | Archive `context/*.md` files |

**Decision:** Archive (locked). These files will be referenced when creating FLOAT.md files.

```bash
mkdir -p artifacts/archive/2025/12-dec/context-files
git mv context/*.md artifacts/archive/2025/12-dec/context-files/
rmdir context
```

### Validation Buoy:

```bash
test ! -d context
```

### Commit:
```
Phase 5: Archive root context/ to artifacts/archive/
```

---

## Phase 6: Run /float-fix

**Goal:** Find and fix all stale references.

### Tool Buoy:

```
/float-fix
```

**Expected findings:**
- References to `floatprompt/` → update to `format/`
- References to `specs/claude/` → update to `system/`
- References to `.float/floatprompt/` → update to `.float/core/`
- References to `MAINTENANCE.md` → update to `system/maintenance.md`
- References to `context/` → remove or update

### Files likely needing updates:

| File | Expected changes |
|------|------------------|
| `bin/floatprompt.js` | Deployment paths (CRITICAL) |
| `.claude/commands/*.md` | Tool paths |
| `README.md` | Documentation references |
| `docs/*.md` | Various references |
| `specs/*.md` | Various references |
| `.float/project/nav/*.md` | Folder references |
| `.float/system.md` | Boot paths |
| `.float/core/index.md` | Structure references |
| `.float/core/manual.md` | Example paths |

### Validation Buoy:

```bash
# Grep for old paths - should return nothing
grep -r "floatprompt/" --include="*.md" . | grep -v ".float/core" | grep -v "format" || true
grep -r "specs/claude" --include="*.md" . || true
grep -r "\.float/floatprompt" --include="*.md" . || true
```

### Commit:
```
Phase 6: Fix all stale references via /float-fix
```

---

## Phase 7: Create FLOAT.md Files

**Goal:** Add FLOAT.md to every folder.

### Worker Buoys (parallel):

| Buoy | Folders |
|------|---------|
| Worker A | `format/`, `format/core/`, `format/tools/` |
| Worker B | `system/`, `specs/`, `docs/`, `examples/` |
| Worker C | `.float/`, `.float/core/`, `.float/project/` |
| Worker D | Root `FLOAT.md` |

**Format:** ALL folders use full `<fp><json><md>` format (Decision #9).

### Template for ALL folders:

```xml
<fp>
<json>
{
  "STOP": "[Folder name]. [One-line purpose].",

  "meta": {
    "title": "[Folder Name]",
    "id": "[folder-id]",
    "format": "floatprompt",
    "version": "0.12.0",
    "type": "context"
  },

  "human": {
    "author": "@mds",
    "intent": "[Purpose of this folder]",
    "context": "[What's in here]"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Orient reader to folder purpose and contents"
  },

  "requirements": {
    "contents": ["file1.md", "file2.md", "subfolder/"],
    "reading_order": ["Start here", "Then this"]
  }
}
</json>
<md>
# [Folder Name]

[Description]

## Contents

[List of files/subfolders with purposes]

## Purpose

[Why this folder exists]
</md>
</fp>
```

### Validation Buoy:

```bash
# Check FLOAT.md exists in key locations
test -f FLOAT.md && \
test -f format/FLOAT.md && \
test -f system/FLOAT.md && \
test -f .float/FLOAT.md && \
test -f .float/core/FLOAT.md
```

### Commit:
```
Phase 7: Add FLOAT.md to all folders
```

---

## Phase 8: Update templates/

**Goal:** Mirror new structure in npm scaffolding templates.

### Worker Buoys (parallel):

| Buoy | Operation |
|------|-----------|
| Worker A | Update `templates/.float/` structure to match |
| Worker B | Update `bin/floatprompt.js` deployment logic |

### Key changes to templates/.float/:

```
templates/.float/
├── system.md           (update paths)
├── core/               (was floatprompt/)
│   ├── format/         (was core/)
│   └── tools/
│       └── types/      (moved from sibling)
└── project/
```

### Validation Buoy:

```bash
# Structure matches
diff <(find .float -type d | sort) <(find templates/.float -type d | sort)
```

### Commit:
```
Phase 8: Update templates/ to match new structure
```

---

## Phase 9: Final Validation

**Goal:** Full system test.

### Validation Buoys (sequential):

| Step | Buoy | Test |
|------|------|------|
| 9.1 | Validator A | Run `/float-sync` — verify nav matches folders |
| 9.2 | Validator B | Run `/float-context` — regenerate terrain maps |
| 9.3 | Validator C | Test `npx floatprompt init` in temp directory |
| 9.4 | Validator D | Run `/float` boot — verify system works |

### npx test:

```bash
cd /tmp
mkdir test-project && cd test-project
npx floatprompt init
# Verify .float/ structure is correct
ls -la .float/core/
```

### Final Commit:
```
Phase 9: Final validation complete

The great restructuring is complete:
- format/ (FILE pillar)
- system/ (SYSTEM pillar)
- .float/core/ (running system)
- FLOAT.md in all folders

🤖 Generated with Claude Code
```

---

## Post-Execution

### Merge to main:

```bash
git checkout main
git merge great-restructuring
git push
```

### Archive this artifact:

```bash
git mv artifacts/2025-12-30-great-restructuring artifacts/archive/2025/12-dec/
```

### Update version:

Bump to `0.12.0` in all version fields.

---

## Rollback Strategy

If any phase fails:

1. **Within phase:** Fix and retry
2. **Phase completed but broken:** `git revert HEAD` to undo that phase
3. **Multiple phases broken:** `git reset --hard origin/main` and start over
4. **Nuclear option:** Delete branch, start fresh

Each phase has its own commit, so surgical rollback is possible.

---

## Buoy Summary

| Phase | Workers | Validator | Parallel? |
|-------|---------|-----------|-----------|
| 1 | 3 | 1 | Yes |
| 2 | 2 | 1 | Yes |
| 3 | 2 | 1 | Yes |
| 4 | 3 | 1 | No (sequential) |
| 5 | 1 | 1 | N/A |
| 6 | 1 (tool) | 1 | N/A |
| 7 | 4 | 1 | Yes |
| 8 | 2 | 1 | Yes |
| 9 | 4 | - | No (sequential) |

**Total buoys:** ~20 worker instances, 9 validator instances

---

## /float-* Tools Usage

| Phase | Tool | Purpose |
|-------|------|---------|
| Pre | `/float-delta` | Snapshot before state |
| 6 | `/float-fix` | Find/fix stale references |
| 9.1 | `/float-sync` | Verify nav matches folders |
| 9.2 | `/float-context` | Regenerate terrain maps |
| 9.4 | `/float` | Verify boot works |

---

**Ready for execution.**

*Created: 2025-12-30*
</md>
</fp>
