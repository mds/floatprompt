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

Called by tools or directly:
- After scan phase: report --phase=map
- After plan phase: report --phase=decide
- After execute phase: report --phase=structure

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

## Process

1. Determine today's date (YYYY-MM-DD)
2. Check if `logs/{date}/` exists, create if not
3. Find next run number for this tool today
4. Create `logs/{date}/{tool}-run-{n}/` folder
5. Write the phase file (map.md, decide.md, or structure.md)
6. Report what was written

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
