# Decide: Component Architecture

Decisions for each component. **All decisions locked.**

---

## Decision 1: float-project.md ✅

**Role:** Tool + Spec (possibly + orchestrator if goldilocks)

- Defines expected structure for nav/, logs/, context/
- Enforces structure (not just documents it)
- May spawn buoys for subdirectories if scope warrants

---

## Decision 2: float-report Integration ✅

**Pattern:** Protocol + report_buoy hybrid

- Tools call float-report protocol at phase boundaries
- Protocol spawns report_buoy for async, non-blocking writes
- Lives in `floatprompt/tools/float-report.md`

---

## Decision 3: Buoy Coordination ✅

**Pattern:** Orchestrator pattern

- Central conductor buoy spawns, collects, and manages others
- Teams of 4-5 buoys:
  - 1 Orchestrator (spawn, collect)
  - 2-3 Workers (parallel execution)
  - 1 Validator (sequential, runs AFTER workers complete)

---

## Decision 4: Gate UX ✅

**Pattern:** Automated with paper trail

- No blocking gates — maximize automation
- Full paper trail via MDS logs enables post-job fixes
- Humans can always review logs and correct

---

## Decision 5: MDS File Format ✅

### map.md
```markdown
---
tool: float-sync
phase: map
run: 1
timestamp: 2025-12-30T10:30:00Z
---

# Map: float-sync

## Scanned
- Nav files: 9
- Folders: 8

## Findings
[what exists]

## Gaps
[mismatches found]
```

### decide.md
```markdown
---
tool: float-sync
phase: decide
run: 1
timestamp: 2025-12-30T10:31:00Z
depends_on: map.md
---

# Decide: float-sync

## Proposed Actions
1. Create nav/newdir.md
2. Update nav/docs.md

## Rationale
[why each action]
```

### structure.md
```markdown
---
tool: float-sync
phase: structure
run: 1
timestamp: 2025-12-30T10:35:00Z
depends_on: decide.md
---

# Structure: float-sync

## Actions Taken
1. ✓ Created nav/newdir.md
2. ✓ Updated nav/docs.md

## Result
- Nav files: 10 (was 9)
- Sync: Complete

## Next
Ready for: /float-fix
```

---

## Decision 6: context/ Structure ✅

**Pattern:** Required core + emergent discovery

**Required (always exist):**
- `project-decisions.md` — Rationale capture
- `project-context.md` — Project understanding

**Emergent (created by tools/buoys):**
- Scope files from `/float-focus`
- Domain files discovered by buoys
- Special context from specific tasks

---

## Decision 7: logs/ Structure ✅

**Pattern:** Run numbers for multiple executions

```
logs/
├── 2025-12-30/
│   ├── session.md
│   ├── float-sync-run-1/
│   │   ├── map.md
│   │   ├── decide.md
│   │   └── structure.md
│   ├── float-sync-run-2/      # If run again same day
│   │   └── ...
│   └── float-all-run-1/
│       ├── map.md             # Combined
│       ├── decide.md          # Combined
│       └── structure.md       # Combined
```

---

## Decision 8: Buoy Hierarchy ✅

**Pattern:** Teams of 4-5, flat structure

- No unlimited depth
- Teams work as units
- Orchestrator can spawn one level of workers
- Validator runs after workers complete (sequential)

```
Orchestrator (1)
     │
     ├── Worker A ──┐
     ├── Worker B ──┼── (parallel)
     └── Worker C ──┘
                    │
                    ▼
              Validator (1)
              (sequential)
```

---

## Decisions Summary

| # | Component | Decision | Status |
|---|-----------|----------|--------|
| 1 | float-project.md | Tool + Spec (+ orchestrator) | ✅ Locked |
| 2 | float-report | Protocol + report_buoy | ✅ Locked |
| 3 | Buoy coordination | Orchestrator pattern | ✅ Locked |
| 4 | Gate UX | Automated + paper trail | ✅ Locked |
| 5 | MDS file format | See templates above | ✅ Locked |
| 6 | context/ structure | Required + emergent | ✅ Locked |
| 7 | logs/ structure | Run numbers | ✅ Locked |
| 8 | Buoy hierarchy | Teams of 4-5, flat | ✅ Locked |

---

**Ready for:** structure-implementation.md (build plan)
