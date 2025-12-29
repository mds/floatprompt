---
title: Float Buoys Test Plan
type: test
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Step-by-step test plan for validating /float and /float sync
human_context: Testing the buoy system before declaring it production-ready

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Comprehensive test scenarios for both init and sync flows
---

# Float Buoys Test Plan

Step-by-step validation of the `/float` and `/float sync` commands.

---

## Prerequisites

- Fresh Claude Code session (not the session that built this)
- Terminal access
- A test directory (or use an existing project)

---

## Test 1: Boot Existing FloatSystem

**Location:** floatprompt repo (has `.float/system.md`)

**Steps:**

1. Start new Claude Code session in floatprompt directory
2. Run:
   ```
   /float
   ```

**Expected:**
```
FloatSystem: BOOTED
Directory: /path/to/floatprompt
Status: No issues found (or "[N] issues found")

Run /float sync to see details and fix
```

**Verify:**
- Boot sequence reads `.float/system.md`
- All `.float/index.md` files traversed
- Issue count reported (not details)
- Mental model built

**Pass criteria:** Boot completes, issue count shown (if any)

---

## Test 2: Sync Existing FloatSystem

**Location:** floatprompt repo

**Steps:**

1. After Test 1, run:
   ```
   /float sync
   ```

**Expected:**
```
FloatSystem Sync
Directory: /path/to/floatprompt

Checking integrity...

✓ .float/system.md — OK
✓ .float/index.md — OK
[... list of all index files with ✓ or ✗ ...]

Found [N] issues in [M] files.

Proposed changes:
[... if any ...]

Apply changes? (y/n):
```

**Verify:**
- Detailed integrity check shown
- Each `.float/index.md` file checked
- Issues clearly identified
- Proposed changes make sense
- Approval gate works

**Test both paths:**
- Say `n` → "No changes made"
- Say `y` → Buoys apply changes, activity logged

**Pass criteria:** Full check runs, approval gate works, changes apply correctly

---

## Test 3: Create File, Then Sync

**Location:** floatprompt repo

**Steps:**

1. Create a new file:
   ```bash
   echo "# Test File" > docs/test-file.md
   ```

2. Run:
   ```
   /float
   ```

**Expected:**
```
FloatSystem: BOOTED
...
Status: 1 issue detected

Run /float sync to see details and fix
```

3. Run:
   ```
   /float sync
   ```

**Expected:**
```
✗ docs/.float/index.md — 1 issue
  - Missing: docs/test-file.md (file exists, not in table)

Proposed changes:

docs/.float/index.md:
  + Add: test-file.md — [needs description]

Apply changes? (y/n):
```

4. Say `y`

**Expected:**
- Describe Buoy generates description
- Prompt: `test-file.md → "..." [accept/edit/skip]:`
- Index Buoy updates table
- Log Buoy records activity

5. Verify:
   ```bash
   cat docs/.float/index.md | grep test-file
   cat .float/logs/2025-12-28.md | tail -20
   ```

**Pass criteria:** New file detected, description generated, index updated, activity logged

---

## Test 4: Delete File, Then Sync

**Location:** floatprompt repo

**Steps:**

1. Delete the test file:
   ```bash
   rm docs/test-file.md
   ```

2. Run:
   ```
   /float sync
   ```

**Expected:**
```
✗ docs/.float/index.md — 1 issue
  - Stale: docs/test-file.md (file deleted, still in table)

Proposed changes:

docs/.float/index.md:
  - Remove: test-file.md (file deleted)

Apply changes? (y/n):
```

3. Say `y`

**Expected:**
- Index Buoy removes row
- Log Buoy records activity

**Pass criteria:** Deleted file detected, row removed, activity logged

---

## Test 5: Create Folder, Then Sync

**Location:** floatprompt repo

**Steps:**

1. Create a new folder with files:
   ```bash
   mkdir docs/new-section
   echo "# Guide" > docs/new-section/guide.md
   echo "# Reference" > docs/new-section/reference.md
   ```

2. Run:
   ```
   /float sync
   ```

**Expected:**
```
✗ docs/.float/index.md — 1 issue
  - Missing: docs/new-section/ (folder has no .float/index.md)

Proposed changes:

docs/.float/index.md:
  + Add folder: new-section/

docs/new-section/.float/index.md:
  + Create: new index file with 2 files listed

Apply changes? (y/n):
```

3. Say `y`

**Expected:**
- Scaffold Buoy creates `docs/new-section/.float/index.md`
- Index Buoy updates parent `docs/.float/index.md` folder table
- System Buoy updates structure map (if applicable)
- Describe Buoy generates descriptions for new files

4. Verify:
   ```bash
   cat docs/new-section/.float/index.md
   cat docs/.float/index.md | grep new-section
   ```

**Pass criteria:** Folder detected, index scaffolded, parent updated

---

## Test 6: Initialize New Project

**Location:** Empty test directory (NOT floatprompt)

**Steps:**

1. Create test directory:
   ```bash
   mkdir ~/float-test-project
   cd ~/float-test-project
   mkdir src docs
   echo "console.log('hello')" > src/index.js
   echo "# README" > README.md
   ```

2. Start new Claude Code session there

3. Run:
   ```
   /float
   ```

**Expected:**
```
FloatSystem: INITIALIZED
Directory: ~/float-test-project
Created:
  - .float/system.md
  - .float/index.md
  - .float/logs/
  - src/.float/index.md
  - docs/.float/index.md

FloatSystem: BOOTED
Status: No issues found
Ready for: [human direction]
```

- No `.float/system.md` found → Init sequence triggers
- Creates `.float/` structure
- Auto-boots on newly created structure
- Reports "INITIALIZED" then "BOOTED"

4. Verify:
   ```bash
   ls -la .float/
   cat .float/system.md
   cat .float/index.md
   cat src/.float/index.md
   ```

**Pass criteria:** Full FloatSystem initialized, all folders have index files

---

## Test 7: Sync Right After Init

**Location:** Same test directory from Test 6

**Steps:**

1. After init completes (which already auto-booted), run:
   ```
   /float sync
   ```

**Expected:**
```
FloatSystem Sync
Directory: ~/float-test-project

Checking integrity...

All clear. No issues found.
```

**Why:** Init creates accurate indexes, auto-boot confirmed no issues. Sync should confirm.

**Pass criteria:** Fresh init has no issues, sync confirms

---

## Test 8: Table Format Preservation

**Location:** floatprompt repo (has 3-column tables in docs/)

**Steps:**

1. Check existing format:
   ```bash
   head -30 docs/.float/index.md
   ```
   (Should show `| File | Intent | Purpose |`)

2. Create new file:
   ```bash
   echo "# Test" > docs/format-test.md
   ```

3. Run `/float sync` and approve

4. Verify format preserved:
   ```bash
   cat docs/.float/index.md | grep format-test
   ```

**Expected:** New row uses same 3-column format

**Pass criteria:** Index Buoy detects and preserves existing table format

---

## Test 9: Config File Skip

**Location:** Any project

**Steps:**

1. Create config files:
   ```bash
   echo '{}' > package.json
   echo '{}' > tsconfig.json
   ```

2. Run `/float sync`

**Expected:**
- Files added to index
- Description shows "Configuration file" or similar
- Describe Buoy does NOT call AI for these files

**Pass criteria:** Config files handled without AI description generation

---

## Test 10: Approval Decline

**Location:** Any project with issues

**Steps:**

1. Create a situation with issues
2. Run `/float sync`
3. At approval gate, say `n`

**Expected:**
```
No changes made. Run /float sync again when ready.
```

4. Verify nothing changed:
   ```bash
   git status
   ```

**Pass criteria:** Declining approval makes no changes

---

## Cleanup

After testing:

```bash
# In floatprompt repo
rm -f docs/test-file.md
rm -rf docs/new-section
rm -f docs/format-test.md
git checkout -- docs/.float/index.md

# Remove test project
rm -rf ~/float-test-project
```

---

## Results Log

| Test | Status | Notes |
|------|--------|-------|
| 1. Boot existing | | |
| 2. Sync existing | | |
| 3. Create file + sync | | |
| 4. Delete file + sync | | |
| 5. Create folder + sync | | |
| 6. Init new project | | |
| 7. Init then sync | | |
| 8. Table format preservation | | |
| 9. Config file skip | | |
| 10. Approval decline | | |

---

## Open Questions During Testing

1. How does the system handle very large folders (100+ files)?
2. Edge cases found during testing?
3. Any unclear output or confusing UX?

---

## After Testing

Update:
- `docs/floatclaude.md` — Change status from "Testing" to "Validated"
- `artifacts/float-buoys-commands-spec.md` — Add any learnings
- `.claude/commands/float.md` — Fix any issues found

---

© 2025 @MDS
