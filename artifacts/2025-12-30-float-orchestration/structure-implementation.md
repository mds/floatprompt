# Structure: Implementation Plan

Build plan for the orchestration architecture.

---

## Overview

```
Phase 1: Foundation     → float-report, logs/ structure
Phase 2: Project Tool   → float-project.md
Phase 3: Tool Updates   → Add reporting to existing tools
Phase 4: Orchestration  → float-all, buoy teams
Phase 5: Validation     → Full system test
```

---

## Phase 1: Foundation

**Goal:** Establish the MDS logging infrastructure.

### 1A. Create float-report.md

Location: `.float/floatprompt/tools/float-report.md`

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

---

## Phase 2: Project Tool

**Goal:** Convert project.md from doc to tool.

### 2A. Create float-project.md

Location: `.float/floatprompt/tools/float-project.md`

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

---

## Phase 3: Tool Updates

**Goal:** Add MDS reporting to all existing tools.

### Tools to Update (10)

| Tool | Phases Used | Notes |
|------|-------------|-------|
| float | map only | Boot status, no changes |
| float-sync | map, decide, structure | Full MDS |
| float-fix | map, decide, structure | Full MDS |
| float-context | map, structure | No decide (auto-generates) |
| float-enhance | map, decide, structure | Full MDS |
| float-build | map, decide, structure | Guided build |
| float-harvest | map, decide, structure | Mining |
| float-delta | map, decide | Analysis, may not structure |
| float-focus | map, structure | Context building |
| float-relate | map, decide, structure | Relationship fixing |

### Update Pattern

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

## Phase 4: Orchestration

**Goal:** Build float-all and buoy team pattern.

### 4A. Create float-all.md

Location: `.float/floatprompt/tools/float-all.md`

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

---

## Workstreams

| WS | Name | Deliverables |
|----|------|--------------|
| WS1 | Foundation | float-report.md, logs/ structure, command |
| WS2 | Project Tool | float-project.md, context renames, command |
| WS3 | Tool Updates | 10 tools updated with reporting |
| WS4 | Orchestration | float-all.md, buoy team docs, command |
| WS5 | Validation | Test suite, fixes |

---

## Dependencies

```
WS1 (Foundation)
    │
    ├──→ WS2 (Project Tool) ──→ WS5 (Validation)
    │
    └──→ WS3 (Tool Updates) ──→ WS4 (Orchestration) ──→ WS5
```

WS1 must complete first. WS2 and WS3 can run in parallel. WS4 needs WS3. WS5 needs all.

---

## Files to Create

| File | Location |
|------|----------|
| float-report.md | .float/floatprompt/tools/ |
| float-project.md | .float/floatprompt/tools/ |
| float-all.md | .float/floatprompt/tools/ |
| float-report.md | .claude/commands/ |
| float-project.md | .claude/commands/ |
| float-all.md | .claude/commands/ |

## Files to Update

| File | Changes |
|------|---------|
| bin/floatprompt.js | Add new tools/commands |
| manual.md | Add buoy team pattern |
| 10 existing tools | Add reporting protocol |
| templates/ | Mirror new structure |
| context/decisions.md | Rename to project-decisions.md |
| context/floatprompt.md | Rename to project-context.md |

---

## Estimated Scope

- **New tools:** 3 (float-report, float-project, float-all)
- **New commands:** 3
- **Tool updates:** 10
- **Template updates:** Multiple
- **Total new files:** ~10
- **Total file updates:** ~25

---

**Ready for:** Human approval to begin WS1
