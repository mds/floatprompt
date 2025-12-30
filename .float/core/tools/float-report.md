<fp>
<json>
{
  "STOP": "Float Report Tool. Write MDS run logs (single file with map/decide/structure sections) to logs/ folder.",

  "meta": {
    "title": "/float-report",
    "id": "float-report",
    "format": "floatprompt",
    "version": "0.12.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Persistent logging for all tool runs — civilization of context",
    "context": "Called by tools at end of run, or progressively as sections complete"
  },

  "ai": {
    "role": "Log writer and file manager",
    "behavior": "Create logs folder structure, write run files, maintain run numbering"
  },

  "requirements": {
    "duality": {
      "condition_a": "Run data provided",
      "action_a": "Write to logs/{date}/{tool}-run-{n}.md",
      "condition_b": "No data provided",
      "action_b": "Report current logs/ status"
    },
    "status_format": "FloatPrompt report.\nWrote: logs/{date}/{tool}-run-{n}.md\n\nReady for: human direction",
    "next_step_logic": "After write, return to calling tool or human",
    "self_reports": false
  }
}
</json>
<md>
# /float-report — MDS Logging

**Write run logs for tool executions.**

## Duality

| Condition | Action |
|-----------|--------|
| Run data provided | Write to logs/{date}/{tool}-run-{n}.md |
| No data provided | Report current logs/ status |

## Interface

```bash
/float-report --tool=<tool-name> --map="<content>" --decide="<content>" --structure="<content>"
```

**Parameters:**
- `--tool` — Name of the tool being logged (e.g., `float-sync`)
- `--map` — What was scanned, findings, gaps (optional)
- `--decide` — Proposed actions, rationale (optional)
- `--structure` — Actions taken, result, next (optional)

At minimum, provide `--tool` and at least one section.

## Folder Structure

```
.float/project/logs/
├── 2025-12-30/
│   ├── float-sync-run-1.md
│   ├── float-sync-run-2.md
│   └── float-fix-run-1.md
└── 2025-12-31/
    └── ...
```

One file per tool run. Sections inside.

## Run Numbering

- First run of tool today: `{tool}-run-1.md`
- Subsequent runs: increment run number
- Check existing files to determine next number

## File Format

```markdown
---
tool: {tool}
run: {n}
timestamp: {ISO timestamp}
status: complete | partial
---

# {tool} run {n}

## Map

### Scanned
{what was analyzed}

### Findings
{what exists}

### Gaps
{what's missing or wrong}

## Decide

### Proposed Actions
{numbered list of changes}

### Rationale
{why each action}

## Structure

### Actions Taken
{numbered list with ✓ or ✗}

### Result
{summary of changes}

### Next
{what to do next}
```

**Notes:**
- Sections are optional — include what's relevant
- `status: partial` if not all sections present
- Tools without a decide phase skip that section

## Process

1. Determine today's date (YYYY-MM-DD)
2. Check if `logs/{date}/` exists, create if not
3. Find next run number for this tool today
4. Write `logs/{date}/{tool}-run-{n}.md` with provided sections
5. Report what was written

## Examples

**Full run log:**
```
> /float-report --tool=float-sync \
    --map="### Scanned\n- Nav files: 4\n- Folders: 5\n\n### Gaps\n- Missing nav/newdir.md" \
    --decide="### Proposed Actions\n1. Create nav/newdir.md" \
    --structure="### Actions Taken\n1. ✓ Created nav/newdir.md\n\n### Result\nNav files: 5"

FloatPrompt report.
Wrote: logs/2025-12-30/float-sync-run-1.md

Ready for: human direction
```

**Map only (boot tools):**
```
> /float-report --tool=float --map="### Scanned\n- system.md ✓\n- context/ ✓\n\n### Findings\nSystem healthy"

FloatPrompt report.
Wrote: logs/2025-12-30/float-run-1.md

Ready for: human direction
```

**Check logs status:**
```
> /float-report

FloatPrompt report.
Directory: /path/to/project
Logs: 3 runs today

Recent:
- float-sync-run-1.md (complete)
- float-fix-run-1.md (complete)
- float-run-1.md (partial: map only)

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
