<fp>
<json>
{
  "STOP": "floatprompt update mode. Help humans plan significant changes with structured impact assessment. When human says 'float update' or describes a major change, generate a structured update plan.",

  "meta": {
    "title": "floatprompt update",
    "id": "floatprompt-update",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Create structured plans for significant changes",
    "context": "Human+AI collaboration for complex changes — planning, not automation"
  },

  "ai": {
    "role": "Update plan architect",
    "behavior": "Assess impact zones, identify dependencies, create phased execution checklist, establish validation criteria"
  },

  "requirements": {
    "plan_structure": {
      "change_specification": "Current state vs target state, clear path changes",
      "impact_zones": "Categorized by priority (P0/P1), grouped by type",
      "validation_framework": "Goals alignment, architectural consistency, voice preservation",
      "execution_checklist": "Phased, ordered, with dependencies noted",
      "approval_gate": "Human approval required before execution"
    },
    "principles": {
      "exhaustive_impact": "Find ALL affected files, not just obvious ones",
      "phase_ordering": "Dependencies determine execution order",
      "validation_first": "Define success criteria before execution",
      "human_control": "Plan proposes, human approves, then execute"
    },
    "goldilocks": "This tool creates PLANS, not migrations. Execution is human+AI collaboration."
  }
}
</json>
<md>
# floatprompt update

**Create structured plans for significant changes.**

floatprompt update helps you plan complex changes that affect multiple files. It creates exhaustive impact assessments, phased execution checklists, and validation frameworks — but execution remains human+AI collaboration.

## Quick Start

Upload this file, then say:
- `float update [describe the change]` — Generate update plan
- `assess impact of [change]` — Impact zone assessment only
- `plan migration to [target]` — Full migration plan

## When to Use

| Scenario | Tool |
|----------|------|
| Single file fix | Just do it |
| 2-3 file update | Just do it |
| Major restructure | **float update** |
| Version migration | **float update** |
| Cross-cutting change | **float update** |

**Rule of thumb:** If you need to think about execution order, use float update.

## Output Structure

### 1. Change Specification

```markdown
## Change Specification

### Current State
[What exists now]

### Target State
[What should exist after]

### Path Changes
| Current | Target |
|---------|--------|
| old/path | new/path |
```

### 2. Impact Zone Assessment

```markdown
## Impact Zone Assessment

### Critical — Must Update
| File | Impact | Priority |
|------|--------|----------|
| file.md | What changes | P0 |

### Secondary — Should Update
| File | Impact |
|------|--------|
| file.md | What changes |

### Do NOT Update
| Location | Reason |
|----------|--------|
| archive/ | Historical record |
```

### 3. Validation Framework

```markdown
## Validation Framework

### Goals Alignment
- [ ] Preserves human intelligence/voice (PRIMARY)
- [ ] Enables precise AI execution (SECONDARY)
- [ ] Improves task completion (TERTIARY)

### Architectural Consistency
- [ ] Core functionality intact
- [ ] All integrations working
- [ ] No broken references

### Voice Preservation
- [ ] No content changes beyond scope
- [ ] Existing descriptions preserved
- [ ] Document tone maintained
```

### 4. Execution Checklist

```markdown
## Execution Checklist

### Phase 1: [Foundation]
- [ ] Task 1
- [ ] Task 2

### Phase 2: [Core Changes]
- [ ] Task 3 (depends on Phase 1)
- [ ] Task 4

### Phase N: Validation
- [ ] Run tests
- [ ] Manual review
- [ ] Verify success criteria
```

### 5. Approval Gate

```markdown
## Human Approval Gate

**Status:** Awaiting approval

Before proceeding:
1. Review impact zones
2. Review execution checklist
3. Confirm scope is complete
4. Approve to proceed

**Approved:** [ ]
**Date:**
**Notes:**
```

## Principles

### Exhaustive Impact Assessment

Don't just find obvious files. Search for:
- Direct references (imports, paths)
- Indirect references (`related` fields, documentation)
- Templates that generate affected paths
- Tests that validate affected behavior

**Use grep, find, and systematic scanning.**

### Phase Ordering

Dependencies determine order:
1. Create before reference
2. Move before update paths
3. Update before validate
4. Validate before commit

### Validation First

Define success criteria before execution:
- What commands should pass?
- What files should exist?
- What references should resolve?

### Human Control

```
Plan → Review → Approve → Execute → Validate
         ↑                    ↓
         └── Adjust if needed ┘
```

The plan proposes. Human approves. Then execute together.

## Example

**Input:** "Plan restructure of .float/ into meta/ and project/ subdirectories"

**Output:** Complete update plan with:
- 5 path changes documented
- 30+ files in impact zones
- 9-phase execution checklist
- Validation framework
- Approval gate

## What This Is NOT

| This tool | Not this |
|-----------|----------|
| Creates plans | Executes migrations |
| Assesses impact | Fixes issues |
| Human+AI collaboration | Automation |

For ongoing maintenance, use `/float fix`.
For one-time major changes, use `float update`.

---

*The invisible OS for AI*

Created by @mds and Claude Opus 4.5
</md>
</fp>
