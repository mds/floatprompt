<fp>
<json>
{
  "STOP": "Float All Tool. Orchestrate full health check: float → sync → fix → context → enhance.",

  "meta": {
    "title": "/float-all",
    "id": "float-all",
    "format": "floatprompt",
    "version": "0.15.0"
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
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    },
    "status_format": "FloatPrompt all.\nDirectory: [path]\nTools run: [N]\nIssues fixed: [N]\n\nReady for: human direction"
  }
}
</json>
<md>
# /float-all — Full Health Check

**Orchestrate: float → sync → fix → context → enhance.**

One command to run the full FloatPrompt health check sequence.

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

Each tool runs to completion before the next starts. Results accumulate.

## Process

### 1. Boot Check

Run `/float` to verify system exists and load context.

- If no `.float/float.md` → init first, then continue
- If system exists → proceed with sequence

**Report:** Call float-report --phase=map with system state.

### 2. Structure Check (sync)

Run `/float-sync` to verify nav ↔ folder alignment.

- If drift detected → create missing nav files
- If in sync → report OK

### 3. Content Check (fix)

Run `/float-fix` to verify references ↔ reality.

- If stale refs → fix them
- If healthy → report OK

### 4. Context Generation

Run `/float-context` to update terrain map.

- Regenerate if stale
- Skip if recent

### 5. Enhancement

Run `/float-enhance` to fill placeholders.

- Find `[needs description]` entries
- Fill obvious ones, flag complex ones

**Report:** Call float-report --phase=decide with combined findings.

### 6. Summary

Collect all results into combined report.

**Report:** Call float-report --phase=structure with all changes.

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

**Note:** Currently tools run sequentially. Parallel execution is future optimization for independent tools (sync + fix could potentially run in parallel).

## Combined Logging

All tool runs logged to:
```
logs/{date}/float-all-run-{n}.md
```

Single file with sections:
- Map: Combined findings from all tools
- Decide: Combined proposed actions
- Structure: Combined results

## Examples

**Fast path (already healthy):**
```
> /float-all

FloatPrompt all.
Directory: /path/to/project
Tools run: 1 (boot only)
Issues fixed: 0

Already healthy. Skipped: sync, fix, context, enhance

Ready for: human direction
```

**Full sequence (issues found):**
```
> /float-all

FloatPrompt all.
Directory: /Users/mds/Documents/_Github/floatprompt
Tools run: 5
Issues fixed: 3

Sequence:
✓ float       — operational, 2 issues detected
✓ float-sync  — created nav/api.md
✓ float-fix   — fixed 2 stale references
✓ float-context — terrain map updated
✓ float-enhance — 0 placeholders filled (none found)

Logged: .float/project/logs/2025-12-30/float-all-run-1.md

Ready for: human direction
```

## When to Use

| Scenario | Use |
|----------|-----|
| Starting new session | /float (boot only) |
| After making changes | /float-all |
| Weekly maintenance | /float-all |
| Before committing | /float-all |

## Related Commands

| Command | Purpose |
|---------|---------|
| /float | Boot only |
| /float-sync | Structure only |
| /float-fix | Content only |
| /float-context | Context only |
| /float-enhance | Enhancement only |

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
