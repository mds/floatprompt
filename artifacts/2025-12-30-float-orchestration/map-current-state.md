# Map: Current State

What exists today before this architecture work.

---

## Current Tools (10)

| Tool | Purpose | Outputs To |
|------|---------|------------|
| `/float` | Boot, load context | Conversation only |
| `/float-sync` | Nav ↔ folders | Conversation only |
| `/float-fix` | References ↔ reality | Conversation only |
| `/float-context` | Generate terrain | `.float/project/context/` |
| `/float-enhance` | Fill placeholders | Edits files in place |
| `/float-build` | Create new tools | Creates tool files |
| `/float-harvest` | Mine decisions | `.float/project/context/decisions.md` |
| `/float-delta` | Trace changes | Conversation only |
| `/float-focus` | Deep dive scope | Optionally to context/ |
| `/float-relate` | Map relationships | Conversation only |

**Gap:** Most tools output only to conversation. No persistent logging.

---

## Current project/ Structure

```
.float/project/
├── project.md          # Structural reference (documentation only)
├── nav/                # Folder-file mapping
│   ├── root.md
│   └── {folder}.md
├── logs/               # Session logs (manual)
│   ├── 2025-12-28.md
│   ├── 2025-12-29.md
│   └── 2025-12-30.md
└── context/            # Project understanding
    ├── decisions.md
    └── floatprompt.md
```

**Gap:** `project.md` is passive documentation, not an active tool.

---

## Current Buoy Usage

Buoys are spawned ad-hoc via Task tool:
- Parallel scanning (nav_buoy, system_buoy, etc.)
- Validation at workstream completion
- No persistent coordination
- No waiting/gating between buoys

**Gap:** Buoys don't coordinate. No orchestration layer.

---

## Current Logging

```
logs/
├── 2025-12-28.md    # Manual session log
├── 2025-12-29.md    # Manual session log
└── 2025-12-30.md    # Manual session log (created retroactively)
```

**Gap:**
- No per-tool logs
- No MDS structure (map/decide/structure)
- No automatic logging from tool runs

---

## Current Data Flow

```
User runs /float-sync
        │
        ▼
   Tool executes
        │
        ▼
   Output to conversation
        │
        ▼
   ... lost to context compaction
```

**Gap:** No persistent record of what tools did.

---

## What's Missing

| Need | Current State |
|------|---------------|
| Tool logging | None |
| MDS reports | None |
| Buoy coordination | Ad-hoc only |
| Orchestration | Manual |
| Gate/approval points | None |
| Monitoring | None |
| project.md as tool | Just documentation |

---

## Strengths to Keep

- Tools are goldilocks-sized
- Buoy pattern exists and works
- Duality pattern in all tools
- Status format consistency
- `.float/project/` structure exists
