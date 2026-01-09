# Draft Agents

These agents are designed but not yet wired into the workflow.

---

## Future Agent Names

When these ship, they'll be renamed to simpler names:

| Current Draft | Future Name | Job |
|---------------|-------------|-----|
| `float-logger.md` | **float-log** | Session continuity — decisions, next steps → float.db |
| `float-enricher.md` | **float-enrich** | Folder context enrichment → float.db |
| `float-mode-generator.md` | **float-mode** | Mode detection + preservation — assess, update, create |

**float-organize** already exists and is active.

---

## The Four Agents

| Agent | Purpose | Trigger |
|-------|---------|---------|
| **float-log** | Capture session snapshot to float.db | SessionEnd hook / handoff |
| **float-organize** | Workshop cleanup (ACTIVE, LATER, done/) | Handoff (if .float-workshop/ exists) |
| **float-mode** | Mode detection, update, or create | SessionEnd hook / handoff |
| **float-enrich** | Folder context enrichment | SessionEnd hook (git diff → folders) |

---

## Wiring Order (per PRD)

1. SessionEnd hook detects edited folders
2. Hook spawns agents in parallel:
   - float-log (always)
   - float-enrich (for edited folders)
   - float-mode (always, lightweight check)
   - float-organize (if workshop exists)

---

*Draft agents — waiting for hook implementation*
