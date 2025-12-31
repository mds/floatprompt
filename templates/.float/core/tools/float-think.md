<fp>
<json>
{
  "STOP": "Float Think Tool. Intelligent meta-orchestrator that analyzes findings and routes to appropriate tools via buoy teams.",

  "meta": {
    "title": "/float-think",
    "id": "float-think",
    "format": "floatprompt",
    "version": "0.14.0"
  },

  "human": {
    "author": "@mds",
    "intent": "One command that figures out what's needed and does it",
    "context": "The reasoning layer — analyzes any tool output and intelligently routes to next actions"
  },

  "ai": {
    "role": "Intelligent tool selector and buoy coordinator",
    "behavior": "Analyze findings, match to tool capabilities, spawn parallel buoys, collect results, report to human"
  },

  "requirements": {
    "duality": {
      "condition_a": "Findings indicate issues",
      "action_a": "Select tools, spawn buoys, execute, report results",
      "condition_b": "No issues found",
      "action_b": "Report healthy status, ready for human direction"
    },
    "input_sources": [
      "Output from /float (boot findings)",
      "Output from any float-* tool",
      "Direct invocation (analyzes current state)"
    ],
    "tool_capabilities": {
      "float-sync": "Structure issues (nav ↔ folders mismatch)",
      "float-fix": "Content issues (stale references, broken links)",
      "float-context": "Missing or stale terrain map",
      "float-enhance": "Placeholder descriptions, weak content",
      "float-project": "Structure validation for .float/project/",
      "float-build": "Need to create a new tool",
      "float-harvest": "Extract patterns from conversations",
      "float-delta": "Analyze change impact",
      "float-focus": "Deep dive into specific area",
      "float-relate": "Map file relationships"
    },
    "buoy_pattern": {
      "orchestrator": 1,
      "workers": "1 per selected tool (parallel)",
      "max_parallel": 4
    },
    "human_checkpoint": "Always return to human after one round",
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "decide", "structure"],
      "async": true
    },
    "status_format": "FloatPrompt think.\nAnalyzed: [source]\nSelected: [tool list]\nResult: [summary]\n\nReady for: human direction"
  }
}
</json>
<md>
# /float-think — Intelligent Router

**Analyze findings and route to appropriate tools via buoy teams.**

The reasoning layer that sits on top of all float tools. Analyzes any input, decides what's needed, spawns buoys to execute, reports back.

## Duality

| Condition | Action |
|-----------|--------|
| Issues found | Select tools → spawn buoys → execute → report |
| No issues | Report healthy, ready for human direction |

## How It Works

```
Input (findings from any tool or current state)
              ↓
Analyze: What issues/needs exist?
              ↓
Match: Which tools address these needs?
              ↓
Plan: "float-think will call float-sync, float-fix to resolve 2 issues"
              ↓
Execute: Spawn buoys in parallel
              ↓
Collect: Gather results from all buoys
              ↓
Report: Summary to human
              ↓
Human checkpoint (always)
```

## Tool Capability Map

float-think matches findings to tools:

| Finding | Tool | Why |
|---------|------|-----|
| Nav file missing for folder | float-sync | Structure alignment |
| Folder missing for nav file | float-sync | Structure alignment |
| Stale reference in file | float-fix | Content integrity |
| Broken link | float-fix | Content integrity |
| No context/terrain map | float-context | Missing awareness |
| Context file stale (>7 days) | float-context | Refresh awareness |
| `[needs description]` found | float-enhance | Fill placeholders |
| .float/project/ structure invalid | float-project | Validate system |
| User describes new need | float-build | Create tool |
| Need to understand changes | float-delta | Impact analysis |
| Need deep understanding | float-focus | Targeted research |
| Need relationship mapping | float-relate | Connection discovery |

## Buoy Team Pattern

```
float-think (orchestrator)
       │
       ├── Tool Buoy 1 (float-sync) ──┐
       ├── Tool Buoy 2 (float-fix)  ──┼── parallel
       └── Tool Buoy 3 (float-context)┘
               │
               ▼
       Collect results
               │
               ▼
       Report to human
```

**Rules:**
- Max 4 parallel buoys (context window limit)
- Independent tools run in parallel
- Dependent tools run sequentially
- Always return to human after one round

## Process

### 1. Receive Input

Accept findings from:
- `/float` boot output (most common)
- Any `float-*` tool output
- Direct invocation (will run `/float` first to get state)

**Report:** Call float-report --phase=map with input analysis.

### 2. Analyze Findings

Parse the input for actionable items:
- Issue counts and types
- Missing structures
- Stale content
- Gaps in coverage

### 3. Match to Tools

For each finding, determine which tool addresses it:

```
"2 issues found"
  → Issue 1: "nav/api.md missing" → float-sync
  → Issue 2: "stale ref in docs/guide.md" → float-fix
```

### 4. Plan Execution

Determine parallelization:
- float-sync and float-fix are independent → parallel
- float-context after float-sync (needs updated nav) → sequential

**Report:** Call float-report --phase=decide with tool selection and rationale.

### 5. Announce Plan

Before executing, show the human what will happen:

```
float-think will call:
  • float-sync (1 nav file to create)
  • float-fix (1 stale reference to fix)

Proceed? (y/n)
```

### 6. Execute

Spawn buoys for approved tools:
- Parallel where possible
- Collect results as they complete
- Handle partial failures gracefully

### 7. Report Results

**Report:** Call float-report --phase=structure with execution results.

Summarize to human:

```
FloatPrompt think.
Analyzed: /float boot output
Selected: float-sync, float-fix
Result: 2 tools run, 2 issues resolved

  ✓ float-sync — created nav/api.md
  ✓ float-fix — fixed 1 stale reference

Ready for: human direction
```

## Examples

### After /float boot

```
> /float

FloatPrompt operational.
Directory: /Users/mds/project
Context: Loaded
Status: 2 issues found

Next: /float-think (will likely call float-sync, float-fix)

> /float-think

Analyzing /float output...

float-think will call:
  • float-sync (nav/api.md missing)
  • float-fix (stale ref in README.md)

Proceed? (y/n): y

Spawning buoys...
  ✓ float-sync complete
  ✓ float-fix complete

FloatPrompt think.
Analyzed: /float boot output
Selected: float-sync, float-fix
Result: 2 tools run, 2 issues resolved

Ready for: human direction
```

### Direct invocation

```
> /float-think

No recent findings. Running /float first...

FloatPrompt operational.
Directory: /Users/mds/project
Status: No issues found

FloatPrompt think.
Analyzed: current state
Selected: (none needed)
Result: System healthy

Ready for: human direction
```

### After float-sync

```
> /float-sync

FloatPrompt sync complete.
Created: nav/api.md, nav/utils.md
Status: 2 nav files created with [needs description]

Next: /float-think

> /float-think

Analyzing /float-sync output...

float-think will call:
  • float-enhance (2 placeholders to fill)

Proceed? (y/n): y

FloatPrompt think.
Analyzed: /float-sync output
Selected: float-enhance
Result: 2 descriptions filled

Ready for: human direction
```

## When to Use

| Situation | Command |
|-----------|---------|
| Start of session | /float → /float-think |
| After any tool | /float-think |
| Want intelligent routing | /float-think |
| Want fixed sequence | /float-all |

## Comparison to float-all

| Aspect | float-all | float-think |
|--------|-----------|-------------|
| Sequence | Fixed (5 tools always) | Dynamic (only needed tools) |
| Intelligence | None (pipeline) | Analyzes and selects |
| Speed | Slower (runs everything) | Faster (runs only needed) |
| Use case | "Make everything healthy" | "Do what's needed" |

## Human Checkpoint

**float-think always returns to human after one round.**

No infinite loops. No autonomous multi-round execution. Human stays in control.

If more work is needed after the first round, the human runs `/float-think` again.

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
