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
    "next_step_logic": "After write, return to calling tool or human",
    "self_reports": false
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
/float-report --tool=<tool-name> --phase=<map|decide|structure> --content="<content>"
```

**Parameters:**
- `--tool` — Name of the tool being logged (e.g., `float-sync`)
- `--phase` — MDS phase: `map`, `decide`, or `structure`
- `--content` — The content to write to the phase file

**Called by tools at phase boundaries:**
- After scan/analysis → `--phase=map`
- After planning → `--phase=decide`
- After execution → `--phase=structure`

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

## Examples

**Log a map phase:**
```
> /float-report --tool=float-sync --phase=map --content="## Scanned\n- Nav files: 4\n- Folders: 5\n\n## Gaps\n- Missing nav/newdir.md"

FloatPrompt report.
Wrote: logs/2025-12-30/float-sync-run-1/map.md

Ready for: next phase or human direction
```

**Log a decide phase:**
```
> /float-report --tool=float-sync --phase=decide --content="## Proposed Actions\n1. Create nav/newdir.md\n\n## Rationale\nFolder exists but no nav file"

FloatPrompt report.
Wrote: logs/2025-12-30/float-sync-run-1/decide.md

Ready for: next phase or human direction
```

**Check logs status (no params):**
```
> /float-report

FloatPrompt report.
Directory: /path/to/project
Logs: 3 runs today

Recent:
- float-sync-run-1/ (map, decide, structure)
- float-fix-run-1/ (map, decide)
- float-context-run-1/ (map)

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
