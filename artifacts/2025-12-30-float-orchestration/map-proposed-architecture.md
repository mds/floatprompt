# Map: Proposed Architecture

What we're building.

---

## Core Principle

**MDS everywhere:**
- Tools follow MDS (map → decide → structure)
- Tool OUTPUT follows MDS (map.md → decide.md → structure.md)
- Buoy coordination follows MDS (scan → plan → execute)

---

## New/Evolved Components

### 1. float-project.md

**What:** Directory management tool for `.float/project/*`

**Responsibilities:**
- Define expected structure for nav/, logs/, context/
- Coordinate with `/float-sync` for validation
- Spawn buoys for each subdirectory

**Relationship:**
```
float-project.md (spec) ←→ /float-sync (checker)
```

### 2. float-report

**What:** Logging mechanism for all tool runs

**Responsibilities:**
- Create `logs/{date}/{tool}/` folder
- Write `map.md` after scan phase
- Write `decide.md` after plan phase
- Write `structure.md` after execute phase

**Integration:**
- Tools call float-report at phase boundaries
- Or: float-report wraps tool execution
- Or: report_buoy handles logging in parallel

### 3. float-all (Orchestrator)

**What:** Runs the "make it healthy" sequence

**Sequence:**
```
float → sync → fix → context → enhance
```

**Responsibilities:**
- Coordinate tool execution order
- Collect all map.md files → combined view
- Collect all decide.md files → approval gate
- Execute approved changes
- Produce summary

### 4. Buoy Types

| Type | Purpose | Lifecycle |
|------|---------|-----------|
| **Scan buoy** | Parallel information gathering | Short-lived |
| **Report buoy** | Write MDS logs | Short-lived |
| **Gate buoy** | Wait for approval | Blocking |
| **Monitor buoy** | Watch for changes | Long-running |
| **Orchestrator buoy** | Coordinate other buoys | Session-length |

---

## Proposed project/ Structure

```
.float/project/
├── float-project.md      # Directory tool (renamed from project.md)
├── nav/                  # Folder-file mapping
│   ├── root.md
│   └── {folder}.md
├── logs/                 # Tool run logs (automatic)
│   ├── 2025-12-30/       # Date folder
│   │   ├── float-sync/
│   │   │   ├── map.md
│   │   │   ├── decide.md
│   │   │   └── structure.md
│   │   ├── float-fix/
│   │   │   └── ...
│   │   └── session.md    # High-level session summary
│   └── ...
└── context/              # Project understanding (organic)
    ├── decisions.md      # Rationale capture
    ├── floatprompt.md    # Project understanding
    └── {scope}.md        # Created by /float-focus
```

---

## Proposed Data Flow

```
User runs /float-all
        │
        ▼
┌───────────────────────────────────────────┐
│           Orchestrator Buoy               │
│                                           │
│  1. Spawn scan buoys (parallel)           │
│     ├── sync_scan_buoy                    │
│     ├── fix_scan_buoy                     │
│     └── context_scan_buoy                 │
│                                           │
│  2. Collect map.md files                  │
│     └── report_buoy writes combined map   │
│                                           │
│  3. Generate decide.md                    │
│     └── gate_buoy waits for approval      │
│                                           │
│  4. Execute approved changes              │
│     ├── sync_execute_buoy                 │
│     ├── fix_execute_buoy                  │
│     └── context_execute_buoy              │
│                                           │
│  5. Collect structure.md files            │
│     └── report_buoy writes summary        │
└───────────────────────────────────────────┘
        │
        ▼
   Persistent logs in logs/{date}/
```

---

## Buoy Coordination Pattern

```
        ┌─────────────┐
        │ Orchestrator│
        └──────┬──────┘
               │
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌───────┐  ┌───────┐  ┌───────┐
│Scan A │  │Scan B │  │Scan C │  (parallel)
└───┬───┘  └───┬───┘  └───┬───┘
    │          │          │
    └──────────┼──────────┘
               ▼
        ┌─────────────┐
        │ Report Buoy │ writes map.md files
        └──────┬──────┘
               ▼
        ┌─────────────┐
        │  Gate Buoy  │ waits for approval
        └──────┬──────┘
               ▼
    ┌──────────┼──────────┐
    ▼          ▼          ▼
┌───────┐  ┌───────┐  ┌───────┐
│Exec A │  │Exec B │  │Exec C │  (parallel or sequential)
└───┬───┘  └───┬───┘  └───┬───┘
    │          │          │
    └──────────┼──────────┘
               ▼
        ┌─────────────┐
        │ Report Buoy │ writes structure.md files
        └─────────────┘
```

---

## Gate Points

| Gate | When | What's Approved |
|------|------|-----------------|
| **Post-map** | After all scans complete | Continue to decide phase |
| **Post-decide** | After plan generated | Execute proposed changes |
| **Post-structure** | After execution | Confirm success, close workflow |

---

## Monitor Buoys (Future)

Long-running buoys that watch for changes:

| Monitor | Watches | Triggers |
|---------|---------|----------|
| `nav_monitor` | Folder creation/deletion | `/float-sync` |
| `ref_monitor` | File renames/moves | `/float-fix` |
| `context_monitor` | Significant changes | `/float-context` |

These are stretch goals — coordination comes first.
