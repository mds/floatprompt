<fp>
<json>
{
  "STOP": "Implementation Plan. Build plan for orchestration architecture with 5 phases and 5 workstreams. Ready for human approval to begin.",

  "meta": {
    "title": "Structure: Implementation Plan",
    "id": "float-orchestration-structure-implementation",
    "format": "floatprompt",
    "version": "0.11.0",
    "type": "artifact-structure"
  },

  "human": {
    "author": "@mds",
    "intent": "Define the build plan for orchestration architecture",
    "context": "MDS methodology - Structure phase"
  },

  "ai": {
    "role": "Implementation planner",
    "behavior": "Break work into phases and workstreams, identify dependencies, list deliverables"
  },

  "requirements": {
    "phases": 5,
    "sub_phases": "Phase 3 split into 3A/3B/3C/3D",
    "workstreams": 5,
    "new_tools": ["float-report", "float-project", "float-all"],
    "tools_to_update": 10,
    "git_commits": 8,
    "human_checkpoints": 8,
    "buoy_team_size": "1 orchestrator + 3 workers",
    "failure_protocols": ["worker_output_contract", "partial_failure", "session_resume", "context_limit"],
    "status": "In progress — Phase 3C complete, Phase 3D next"
  }
}
</json>
<md>
# Structure: Implementation Plan

Build plan for the orchestration architecture.

## Overview

```
Phase 1: Foundation     → float-report, logs/ structure      [COMMIT 1]
Phase 2: Project Tool   → float-project.md                   [COMMIT 2]
Phase 3A: Core Tools    → float, float-sync, float-fix       [COMMIT 3]
Phase 3B: Context Tools → float-context, enhance, focus      [COMMIT 4]
Phase 3C: Expansion     → float-harvest, delta, relate       [COMMIT 5]
Phase 3D: Build Tool    → float-build                        [COMMIT 6]
Phase 4: Orchestration  → float-all, buoy teams              [COMMIT 7]
Phase 5: Validation     → Full system test                   [COMMIT 8]
```

---

## Session Snapshots

For session handoff/resume, see:
- `session-snapshot-2025-12-30.md` — Progress through Phase 3C (9 tools updated)

---

## Execution Protocol

**Every phase follows this pattern:**

```
1. Human approves phase start
2. Orchestrator buoy spawns 3 worker buoys
3. Workers execute in parallel
4. Orchestrator collects results
5. Validator buoy checks work
6. Git commit with descriptive message
7. Human reviews commit, approves next phase
```

**Git Commit Pattern:**
```bash
git add .
git commit -m "Phase N: [description]

[List of changes]

🤖 Generated with Claude Code

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>"
```

---

## Human Checkpoint Protocol

| Checkpoint | After | Review | Approval Criteria |
|------------|-------|--------|-------------------|
| CP1 | Phase 1 | float-report works, logs/ structure created | Can manually call float-report |
| CP2 | Phase 2 | float-project validates structure | Run /float-project, see output |
| CP3 | Phase 3A | Core tools have reporting | Run /float-sync, check logs/ |
| CP4 | Phase 3B | Context tools have reporting | Run /float-context, check logs/ |
| CP5 | Phase 3C | Expansion tools have reporting | Run /float-delta, check logs/ |
| CP6 | Phase 3D | Build tool has reporting | Run /float-build, check logs/ |
| CP7 | Phase 4 | float-all orchestrates correctly | Run /float-all, verify sequence |
| CP8 | Phase 5 | All tests pass | Full validation suite green |

**If checkpoint fails:**
1. Identify failing component
2. Fix without moving forward
3. Amend commit or new fix commit
4. Re-validate checkpoint
5. Only proceed when green

---

## Buoy Team Composition

**Standard Team (Phases 1, 2, 4, 5):**
```
Orchestrator (1)
     │
     ├── Worker A ──┐
     ├── Worker B ──┼── parallel
     └── Worker C ──┘
           │
           ▼
     Validator (1) ── sequential
```

**Phase 3 Teams (3A, 3B, 3C):**
```
Orchestrator (1)
     │
     ├── Tool Worker 1 ── updates tool 1
     ├── Tool Worker 2 ── updates tool 2
     └── Tool Worker 3 ── updates tool 3
           │
           ▼
     Validator (1) ── runs each updated tool, checks logs/
```

**Phase 3D (single tool):**
```
Orchestrator (1)
     │
     └── Tool Worker ── updates float-build
           │
           ▼
     Validator (1) ── runs /float-build test
```

---

## Worker Output Contract

Workers return ONLY this structure to orchestrator:

```json
{
  "status": "success | failed",
  "file": "path/to/tool.md",
  "changes": [
    "Added reporting JSON to requirements",
    "Added float-report calls to process"
  ],
  "error": null
}
```

**Rules:**
- Do NOT return file contents (context overflow)
- Do NOT include diffs (orchestrator doesn't need them)
- Keep `changes` array to 3-5 items max
- If failed, `error` contains one-line description

**Example failure:**
```json
{
  "status": "failed",
  "file": "system/claude/tools/float-enhance.md",
  "changes": [],
  "error": "Could not locate process section to add reporting calls"
}
```

---

## Partial Failure Protocol

**If N-1 of N workers succeed:**

1. Orchestrator collects all results
2. Reports to human:
   ```
   Phase 3A: 2/3 workers succeeded

   ✓ float.md — success
   ✓ float-sync.md — success
   ✗ float-fix.md — [error description]

   Options:
   1. Retry failed worker only
   2. Commit partial, fix manually
   3. Rollback all, investigate
   ```
3. Human decides — orchestrator does NOT auto-commit partial work
4. If retry: spawn single worker for failed tool
5. If rollback: `git checkout -- system/claude/tools/`

**Never auto-proceed with partial success.**

---

## Session Resume Protocol

**If session dies mid-phase or human returns later:**

New session starts by:

1. **Read plan:**
   ```
   Read: artifacts/2025-12-30-float-orchestration/structure-implementation.md
   ```

2. **Check git status:**
   ```bash
   git log --oneline -5
   git status --short
   ```

3. **Identify last checkpoint:**
   - Find most recent "Phase N:" commit
   - That checkpoint is complete

4. **Check validation list:**
   - Go to that checkpoint's validation section
   - Any unchecked items = resume point

5. **Resume or start next:**
   - If all items checked → start next phase
   - If items unchecked → complete validation first

**Example resume:**
```
Last commit: "Phase 3A: Core Tools - Add MDS reporting"

Checking CP3 validation:
- [x] Run /float — logs/ has map.md
- [x] Run /float-sync — logs/ has map.md, decide.md, structure.md
- [ ] Run /float-fix — NOT YET VALIDATED

Resume: Validate /float-fix, then proceed to Phase 3B
```

---

## Orchestrator Context Limit

**Before spawning workers, orchestrator reads ONLY:**

| Read | Why |
|------|-----|
| `structure-implementation.md` | The plan |
| Current phase section only | What to do now |
| Update Pattern section | What workers apply |
| Worker Output Contract | What to expect back |

**Do NOT pre-read:**
- Tool files (workers do that)
- Other phase sections (not relevant yet)
- Previous checkpoint details (git has that)

**Orchestrator prompt template:**
```
You are the orchestrator for Phase [N].

Your job:
1. Spawn [N] worker buoys in parallel
2. Each worker updates one tool per Worker Output Contract
3. Collect results
4. If all succeed → spawn validator
5. If partial fail → report to human, await decision

Workers to spawn:
- Worker 1: [tool path]
- Worker 2: [tool path]
- Worker 3: [tool path]

Do not read tool files yourself. Workers handle that.
```

---

## Phase 1: Foundation

**Goal:** Establish the MDS logging infrastructure.

### 1A. Create float-report.md

Location: `system/claude/tools/float-report.md`

**Responsibilities:**
- Accept phase data (map/decide/structure)
- Create `logs/{date}/{tool}-run-{n}/` folder
- Write appropriate .md file
- Spawn report_buoy for async write

**Interface:**
```
/float-report --tool=float-sync --phase=map --content="..."
/float-report --tool=float-sync --phase=decide --content="..."
/float-report --tool=float-sync --phase=structure --content="..."
```

**Or programmatic (called by tools):**
```
Report to: logs/2025-12-30/float-sync-run-1/map.md
```

### 1B. Create logs/ structure

Update templates and bin/floatprompt.js:
- `logs/{date}/` folders created per-day
- `logs/{date}/{tool}-run-{n}/` per tool execution
- `session.md` for high-level notes

### 1C. Create command wrapper

Location: `.claude/commands/float-report.md`

### 1D. Checkpoint (CP1)

**Git Commit:**
```
Phase 1: Foundation - float-report and logs/ structure

- Created system/claude/tools/float-report.md
- Created .claude/commands/float-report.md
- Updated package/templates/ with logs/ structure
- Updated package/bin/floatprompt.js
```

**Validation:**
- [ ] Can run `/float-report --tool=test --phase=map --content="test"`
- [ ] Creates `logs/{date}/test-run-1/map.md`
- [ ] Human approves → proceed to Phase 2

---

## Phase 2: Project Tool

**Goal:** Convert project.md from doc to tool.

### 2A. Create float-project.md

Location: `system/claude/tools/float-project.md`

**Responsibilities:**
- Define expected structure for nav/, logs/, context/
- Validate structure exists
- Create missing directories/files
- Coordinate with /float-sync for nav/ validation

**Duality:**
- Structure valid → Report healthy status
- Structure invalid → Create missing, report changes

### 2B. Rename context files

- `decisions.md` → `project-decisions.md`
- `floatprompt.md` → `project-context.md`

### 2C. Update templates

Ensure new projects get correct structure.

### 2D. Create command wrapper

Location: `.claude/commands/float-project.md`

### 2E. Checkpoint (CP2)

**Git Commit:**
```
Phase 2: Project Tool - float-project.md

- Created system/claude/tools/float-project.md
- Created .claude/commands/float-project.md
- Renamed decisions.md → project-decisions.md
- Renamed floatprompt.md → project-context.md
- Updated package/templates/
```

**Validation:**
- [ ] Can run `/float-project`
- [ ] Reports structure status
- [ ] Creates missing directories if needed
- [ ] Human approves → proceed to Phase 3A

---

## Phase 3: Tool Updates

**Goal:** Add MDS reporting to all existing tools.

### Update Pattern (Applied to All Tools)

Add to each tool's requirements:
```json
"reporting": {
  "protocol": "float-report",
  "phases": ["map", "decide", "structure"],
  "async": true
}
```

Add to each tool's process:
1. After scan → call float-report --phase=map
2. After plan → call float-report --phase=decide
3. After execute → call float-report --phase=structure

---

### Phase 3A: Core Tools (3 parallel workers)

**Tools:**
| Tool | Phases Used | Notes |
|------|-------------|-------|
| float.md | map only | Boot status, no changes |
| float-sync.md | map, decide, structure | Full MDS |
| float-fix.md | map, decide, structure | Full MDS |

**Buoy Assignment:**
- Worker 1 → float.md
- Worker 2 → float-sync.md
- Worker 3 → float-fix.md

**Checkpoint (CP3):**

**Git Commit:**
```
Phase 3A: Core Tools - Add MDS reporting

- Updated float.md with map reporting
- Updated float-sync.md with full MDS reporting
- Updated float-fix.md with full MDS reporting
```

**Validation:**
- [ ] Run `/float` — check logs/ for map.md
- [ ] Run `/float-sync` — check logs/ for map.md, decide.md, structure.md
- [ ] Run `/float-fix` — check logs/ for map.md, decide.md, structure.md
- [ ] Human approves → proceed to Phase 3B

---

### Phase 3B: Context Tools (3 parallel workers)

**Tools:**
| Tool | Phases Used | Notes |
|------|-------------|-------|
| float-context.md | map, structure | No decide (auto-generates) |
| float-enhance.md | map, decide, structure | Full MDS |
| float-focus.md | map, structure | Context building |

**Buoy Assignment:**
- Worker 1 → float-context.md
- Worker 2 → float-enhance.md
- Worker 3 → float-focus.md

**Checkpoint (CP4):**

**Git Commit:**
```
Phase 3B: Context Tools - Add MDS reporting

- Updated float-context.md with map, structure reporting
- Updated float-enhance.md with full MDS reporting
- Updated float-focus.md with map, structure reporting
```

**Validation:**
- [ ] Run `/float-context` — check logs/
- [ ] Run `/float-enhance` — check logs/
- [ ] Run `/float-focus [scope]` — check logs/
- [ ] Human approves → proceed to Phase 3C

---

### Phase 3C: Expansion Tools (3 parallel workers)

**Tools:**
| Tool | Phases Used | Notes |
|------|-------------|-------|
| float-harvest.md | map, decide, structure | Mining |
| float-delta.md | map, decide | Analysis, may not structure |
| float-relate.md | map, decide, structure | Relationship fixing |

**Buoy Assignment:**
- Worker 1 → float-harvest.md
- Worker 2 → float-delta.md
- Worker 3 → float-relate.md

**Checkpoint (CP5):**

**Git Commit:**
```
Phase 3C: Expansion Tools - Add MDS reporting

- Updated float-harvest.md with full MDS reporting
- Updated float-delta.md with map, decide reporting
- Updated float-relate.md with full MDS reporting
```

**Validation:**
- [ ] Run `/float-delta` — check logs/
- [ ] Run `/float-relate --broken` — check logs/
- [ ] Run `/float-harvest --week` — check logs/
- [ ] Human approves → proceed to Phase 3D

---

### Phase 3D: Build Tool (1 worker)

**Tools:**
| Tool | Phases Used | Notes |
|------|-------------|-------|
| float-build.md | map, decide, structure | Guided build |

**Buoy Assignment:**
- Worker 1 → float-build.md

**Checkpoint (CP6):**

**Git Commit:**
```
Phase 3D: Build Tool - Add MDS reporting

- Updated float-build.md with full MDS reporting
```

**Validation:**
- [ ] Run `/float-build` — walk through build process
- [ ] Check logs/ for map.md, decide.md, structure.md
- [ ] Human approves → proceed to Phase 4

---

## Phase 4: Orchestration

**Goal:** Build float-all and buoy team pattern.

### 4A. Create float-all.md

Location: `system/claude/tools/float-all.md`

**Sequence:**
```
float → sync → fix → context → enhance
```

**Orchestration:**
1. Spawn orchestrator buoy
2. Orchestrator spawns worker buoys (up to 3)
3. Workers execute in parallel where possible
4. Validator buoy checks results
5. Combined MDS logs written

### 4B. Define Buoy Team Pattern

Document in manual.md:
```
Team of 4-5:
├── Orchestrator (1) — spawns, collects
├── Workers (2-3) — parallel execution
└── Validator (1) — sequential check
```

### 4C. Create command wrapper

Location: `.claude/commands/float-all.md`

### 4D. Checkpoint (CP7)

**Git Commit:**
```
Phase 4: Orchestration - float-all and buoy team pattern

- Created system/claude/tools/float-all.md
- Created .claude/commands/float-all.md
- Updated system/manual.md with buoy team pattern
- Updated package/bin/floatprompt.js
```

**Validation:**
- [ ] Run `/float-all`
- [ ] Verify sequence: float → sync → fix → context → enhance
- [ ] Verify combined logs in logs/{date}/float-all-run-1/
- [ ] Verify buoy team pattern (parallel workers, sequential validator)
- [ ] Human approves → proceed to Phase 5

---

## Phase 5: Validation

**Goal:** Full system test.

### Test Scenarios

1. **Single tool run:**
   - Run `/float-sync`
   - Verify `logs/{date}/float-sync-run-1/` created
   - Verify map.md, decide.md, structure.md exist

2. **Multiple runs:**
   - Run `/float-sync` twice
   - Verify `float-sync-run-1/` and `float-sync-run-2/` both exist

3. **float-all orchestration:**
   - Run `/float-all`
   - Verify all tools run in sequence
   - Verify combined logs in `float-all-run-1/`
   - Verify buoy team pattern (parallel workers, sequential validator)

4. **Project structure:**
   - Run `/float-project`
   - Verify nav/, logs/, context/ all valid
   - Verify `project-decisions.md` and `project-context.md` exist

### 5A. Checkpoint (CP8)

**Git Commit:**
```
Phase 5: Validation - Full system test complete

- All test scenarios passed
- Documented any edge cases found
- Updated documentation as needed
```

**Validation:**
- [ ] All 4 test scenarios pass
- [ ] No regressions in existing functionality
- [ ] logs/ structure populates correctly
- [ ] Human approves → Implementation complete

---

## Appendix A: New Tool Templates

### float-report.md Template

```
<fp>
<json>
{
  "STOP": "Float Report Tool. Write MDS logs (map/decide/structure) for tool runs to logs/ folder.",

  "meta": {
    "title": "/float-report",
    "id": "float-report",
    "format": "floatprompt",
    "version": "0.12.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Persistent logging for all tool runs — civilization of context",
    "context": "Called by tools at phase boundaries, or directly for manual logging"
  },

  "ai": {
    "role": "Log writer and folder manager",
    "behavior": "Create logs folder structure, write phase files, maintain run numbering"
  },

  "requirements": {
    "duality": {
      "condition_a": "Phase data provided",
      "action_a": "Write to logs/{date}/{tool}-run-{n}/{phase}.md",
      "condition_b": "No phase data",
      "action_b": "Report current logs/ status"
    },
    "status_format": "FloatPrompt report.\nWrote: logs/{date}/{tool}-run-{n}/{phase}.md\n\nReady for: next phase or human direction",
    "next_step_logic": "After write, return to calling tool or human"
  }
}
</json>
<md>
# /float-report — MDS Logging

**Write MDS logs for tool runs.**

## Duality

| Condition | Action |
|-----------|--------|
| Phase data provided | Write to logs/{date}/{tool}-run-{n}/{phase}.md |
| No phase data | Report current logs/ status |

## Interface

```bash
/float-report --tool=float-sync --phase=map --content="..."
/float-report --tool=float-sync --phase=decide --content="..."
/float-report --tool=float-sync --phase=structure --content="..."
```

## Folder Structure

```
.float/project/logs/
├── 2025-12-30/
│   ├── float-sync-run-1/
│   │   ├── map.md
│   │   ├── decide.md
│   │   └── structure.md
│   └── float-sync-run-2/
│       └── ...
```

## Run Numbering

- First run of tool today: `{tool}-run-1`
- Subsequent runs: increment run number
- Check existing folders to determine next number

## Phase File Format

### map.md
```markdown
---
tool: {tool}
phase: map
run: {n}
timestamp: {ISO timestamp}
---

# Map: {tool}

## Scanned
{what was analyzed}

## Findings
{what exists}

## Gaps
{what's missing or wrong}
```

### decide.md
```markdown
---
tool: {tool}
phase: decide
run: {n}
timestamp: {ISO timestamp}
depends_on: map.md
---

# Decide: {tool}

## Proposed Actions
{numbered list of changes}

## Rationale
{why each action}
```

### structure.md
```markdown
---
tool: {tool}
phase: structure
run: {n}
timestamp: {ISO timestamp}
depends_on: decide.md
---

# Structure: {tool}

## Actions Taken
{numbered list with ✓}

## Result
{summary of changes}

## Next
{what to do next}
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
```

### float-project.md Template

```
<fp>
<json>
{
  "STOP": "Float Project Tool. Validate and manage .float/project/ structure (nav/, logs/, context/).",

  "meta": {
    "title": "/float-project",
    "id": "float-project",
    "format": "floatprompt",
    "version": "0.12.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Ensure .float/project/ structure is valid and complete",
    "context": "Focused safeguard for system's own structure, complements /float-sync"
  },

  "ai": {
    "role": "Project structure validator and manager",
    "behavior": "Check expected structure, create missing, report status"
  },

  "requirements": {
    "duality": {
      "condition_a": "Structure valid",
      "action_a": "Report healthy status",
      "condition_b": "Structure invalid",
      "action_b": "Create missing directories/files, report changes"
    },
    "expected_structure": {
      "nav/": "Folder-file mapping (root.md required)",
      "logs/": "Tool run logs (auto-created)",
      "context/": "Project understanding (project-decisions.md, project-context.md required)"
    },
    "status_format": "FloatPrompt project.\nDirectory: [path]\nStatus: [valid | fixed N issues]\n\nReady for: human direction"
  }
}
</json>
<md>
# /float-project — Structure Validator

**Validate and manage .float/project/ structure.**

## Duality

| Condition | Action |
|-----------|--------|
| Structure valid | Report healthy status |
| Structure invalid | Create missing, report changes |

## Expected Structure

```
.float/project/
├── project.md              # This file (structure reference)
├── nav/                    # Folder-file mapping
│   └── root.md             # Required: root nav file
├── logs/                   # Tool run logs
│   └── {date}/             # Auto-created by float-report
└── context/                # Project understanding
    ├── project-decisions.md  # Required: rationale capture
    └── project-context.md    # Required: project terrain
```

## Validation Checklist

- [ ] nav/ exists
- [ ] nav/root.md exists
- [ ] logs/ exists
- [ ] context/ exists
- [ ] context/project-decisions.md exists
- [ ] context/project-context.md exists

## Process

1. Check each expected directory
2. Check required files
3. If missing: create with scaffold content
4. Report status

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
```

### float-all.md Template

```
<fp>
<json>
{
  "STOP": "Float All Tool. Orchestrate full health check: float → sync → fix → context → enhance.",

  "meta": {
    "title": "/float-all",
    "id": "float-all",
    "format": "floatprompt",
    "version": "0.12.0"
  },

  "human": {
    "author": "@mds",
    "intent": "One command to make project healthy",
    "context": "Orchestrates tool sequence with buoy teams"
  },

  "ai": {
    "role": "Tool orchestrator",
    "behavior": "Spawn buoy teams, coordinate sequence, collect results, produce combined report"
  },

  "requirements": {
    "duality": {
      "condition_a": "Issues found",
      "action_a": "Run full sequence, fix issues, report changes",
      "condition_b": "Already healthy",
      "action_b": "Report healthy status (fast path)"
    },
    "sequence": ["float", "float-sync", "float-fix", "float-context", "float-enhance"],
    "buoy_team": {
      "orchestrator": 1,
      "workers": 3,
      "validator": 1
    },
    "status_format": "FloatPrompt all.\nDirectory: [path]\nTools run: [N]\nIssues fixed: [N]\n\nReady for: human direction"
  }
}
</json>
<md>
# /float-all — Full Health Check

**Orchestrate: float → sync → fix → context → enhance.**

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Run full sequence, fix, report |
| Already healthy | Fast path, report OK |

## Sequence

```
1. /float       → Boot, load context
2. /float-sync  → Nav ↔ folders
3. /float-fix   → References ↔ reality
4. /float-context → Update terrain
5. /float-enhance → Fill placeholders
```

## Buoy Team Pattern

```
Orchestrator (this tool)
     │
     ├── Tool Runner 1 ──┐
     ├── Tool Runner 2 ──┼── parallel where possible
     └── Tool Runner 3 ──┘
           │
           ▼
     Validator ── checks combined results
```

## Combined Logging

All tool runs logged to:
```
logs/{date}/float-all-run-{n}/
├── map.md       # Combined findings from all tools
├── decide.md    # Combined proposed actions
└── structure.md # Combined results
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
```

---

## Appendix B: Worker Buoy Prompts

### Tool Update Worker Prompt

Use this prompt when spawning workers to update existing tools:

```
You are a worker buoy updating a single tool with MDS reporting.

**Your task:**
Update {TOOL_PATH} to add MDS reporting protocol.

**Read these first:**
1. The tool file: {TOOL_PATH}
2. The Update Pattern (from implementation plan)

**Changes to make:**

1. Add to the JSON requirements section:
```json
"reporting": {
  "protocol": "float-report",
  "phases": ["map", "decide", "structure"],
  "async": true
}
```

2. Add to the markdown Process section (after each phase):
- After scan/analysis: "Report: /float-report --phase=map"
- After planning: "Report: /float-report --phase=decide"
- After execution: "Report: /float-report --phase=structure"

**Return format:**
```json
{
  "status": "success | failed",
  "file": "{TOOL_PATH}",
  "changes": ["list", "of", "changes"],
  "error": null
}
```

Do NOT return file contents. Only return the JSON result.
```

### Validator Buoy Prompt

Use this prompt for validation after workers complete:

```
You are a validator buoy checking tool updates.

**Your task:**
Validate that {TOOL_PATH} was correctly updated with MDS reporting.

**Checks:**
1. [ ] JSON has "reporting" section with protocol, phases, async
2. [ ] Markdown mentions /float-report at phase boundaries
3. [ ] No syntax errors in JSON block
4. [ ] Tool still has valid floatprompt structure

**Then test:**
Run the tool and verify it attempts to call float-report.

**Return format:**
```json
{
  "status": "valid | invalid",
  "file": "{TOOL_PATH}",
  "checks_passed": ["list"],
  "checks_failed": ["list"],
  "error": null
}
```
```

---

## Appendix C: Before/After Example

### Example: Updating float-sync.md

**BEFORE (relevant sections only):**

```json
"requirements": {
  "duality": {
    "condition_a": "Drift detected",
    "action_a": "Report drift, offer to create missing nav files",
    "condition_b": "In sync",
    "action_b": "Report healthy status"
  },
  "status_format": "FloatPrompt sync complete.\nDirectory: [path]\nNav files: [n]\nFolders: [n]\nStatus: [result]\n\nNext: [suggestion]",
  "next_step_logic": "..."
}
```

**AFTER (with reporting added):**

```json
"requirements": {
  "duality": {
    "condition_a": "Drift detected",
    "action_a": "Report drift, offer to create missing nav files",
    "condition_b": "In sync",
    "action_b": "Report healthy status"
  },
  "reporting": {
    "protocol": "float-report",
    "phases": ["map", "decide", "structure"],
    "async": true
  },
  "status_format": "FloatPrompt sync complete.\nDirectory: [path]\nNav files: [n]\nFolders: [n]\nStatus: [result]\n\nNext: [suggestion]",
  "next_step_logic": "..."
}
```

**BEFORE Process section:**

```markdown
## Process

### 1. Scan
- List all nav files in .float/project/nav/
- List all folders in project root
- Compare nav files to folders

### 2. Report
Show sync status...
```

**AFTER Process section:**

```markdown
## Process

### 1. Scan
- List all nav files in .float/project/nav/
- List all folders in project root
- Compare nav files to folders
- **Report:** `/float-report --tool=float-sync --phase=map`

### 2. Plan
- Determine which nav files to create/update
- **Report:** `/float-report --tool=float-sync --phase=decide`

### 3. Execute
- Create missing nav files
- Update outdated nav files
- **Report:** `/float-report --tool=float-sync --phase=structure`

### 4. Report
Show sync status...
```

**Key changes:**
1. Added `"reporting"` object to JSON requirements
2. Split process into Map/Decide/Structure phases
3. Added float-report calls after each phase

---

## Workstreams

| WS | Name | Phases | Commits | Deliverables |
|----|------|--------|---------|--------------|
| WS1 | Foundation | Phase 1 | CP1 | float-report.md, logs/ structure, command |
| WS2 | Project Tool | Phase 2 | CP2 | float-project.md, context renames, command |
| WS3 | Tool Updates | Phase 3A-3D | CP3-CP6 | 10 tools updated with reporting |
| WS4 | Orchestration | Phase 4 | CP7 | float-all.md, buoy team docs, command |
| WS5 | Validation | Phase 5 | CP8 | Test suite, fixes |

## Dependencies

```
WS1 (Foundation) ─── CP1 commit
    │
    ├──→ WS2 (Project Tool) ─── CP2 commit ───────────────────┐
    │                                                          │
    └──→ WS3 (Tool Updates)                                    │
              │                                                │
              ├── Phase 3A ─── CP3 commit                      │
              ├── Phase 3B ─── CP4 commit                      │
              ├── Phase 3C ─── CP5 commit                      │
              └── Phase 3D ─── CP6 commit                      │
                      │                                        │
                      ▼                                        │
         WS4 (Orchestration) ─── CP7 commit                    │
                      │                                        │
                      └───────────────────┬────────────────────┘
                                          ▼
                              WS5 (Validation) ─── CP8 commit
```

**Execution order with commits:**
1. WS1 → CP1 (must complete first)
2. WS2 → CP2 (can start after CP1)
3. WS3 → CP3, CP4, CP5, CP6 (can start after CP1, runs in parallel with WS2)
4. WS4 → CP7 (needs CP6)
5. WS5 → CP8 (needs CP2 and CP7)

## Files to Create

| File | Location |
|------|----------|
| float-report.md | system/claude/tools/ |
| float-project.md | system/claude/tools/ |
| float-all.md | system/claude/tools/ |
| float-report.md | .claude/commands/ |
| float-project.md | .claude/commands/ |
| float-all.md | .claude/commands/ |

## Files to Update

| File | Changes |
|------|---------|
| bin/floatprompt.js | Add new tools/commands |
| system/manual.md | Add buoy team pattern |
| 10 existing tools | Add reporting protocol |
| templates/ | Mirror new structure |
| context/decisions.md | Rename to project-decisions.md |
| context/floatprompt.md | Rename to project-context.md |

## Estimated Scope

- **New tools:** 3 (float-report, float-project, float-all)
- **New commands:** 3
- **Tool updates:** 10
- **Template updates:** Multiple
- **Total new files:** ~10
- **Total file updates:** ~25
- **Git commits:** 8 (one per checkpoint)
- **Human checkpoints:** 8 (one per commit)
- **Buoy teams:** 8 phases × (1 orchestrator + 3 workers) = 32 buoy spawns
- **Failure protocols:** 4 (worker contract, partial failure, session resume, context limit)

## Future Work (After WS5)

**float-think** — Meta-orchestrator with intelligent tool selection.

Unlike `float-all` (fixed sequence), `float-think` would:
- Analyze current context to determine which tools are needed
- Detect gaps when no tool fits the need
- Trigger repairs to update/create tools
- Provide full MDS reasoning trail

**Status:** Parked. Depends on orchestration infrastructure (WS1-WS5).

See: `2025-12-30-float-think.md` for full vision.

---

**Ready for:** Human approval to begin WS1
</md>
</fp>
