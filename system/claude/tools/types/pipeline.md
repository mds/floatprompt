# Pipeline Type Template

Template for pipeline stage tools — sequential processing with clear handoffs.

---

## When to Use

- Complex tasks that decompose into stages
- Multi-step transformations
- Map → Do → Verify patterns
- Intermediate artifacts have standalone value

---

## Template

```
<fp>
<json>
{
  "STOP": "[Stage Name] Mode. [What this stage does in the pipeline].",

  "meta": {
    "title": "[Stage Name]",
    "id": "[stage-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What this stage accomplishes]",
    "context": "[Where this fits in the pipeline]"
  },

  "ai": {
    "role": "[Stage role]",
    "behavior": "[How to process input into output]"
  },

  "requirements": {
    "input_contract": {
      "requires": "[List of required inputs]",
      "format": "[Expected input format]"
    },
    "output_contract": {
      "produces": "[List of outputs]",
      "format": "[Output format]"
    },
    "processing": {
      "step_1": "[First processing step]",
      "step_2": "[Second processing step]",
      "step_n": "[Final processing step]"
    }
  }
}
</json>
<md>
# [Stage Name] — Pipeline Stage

**[One-line description of what this stage does].**

## Position in Pipeline

```
[Previous Stage] → THIS STAGE → [Next Stage]
```

## Input Contract

This stage requires:
- [Input 1 description]
- [Input 2 description]

## Process

1. [Step 1]
2. [Step 2]
3. [Step n]

## Output Contract

This stage produces:
- [Output 1 description]
- [Output 2 description]

## Examples

**Input:**
```
[Example input]
```

**Output:**
```
[Example output]
```

---

*Pipeline stage template*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Single responsibility | One stage, one job |
| Clear contracts | Define IN and OUT |
| Stage independence | Can run with cached prior output |
| Handoff clarity | Next stage knows what to expect |

---

## Common Pipeline Patterns

### Map → Do → Verify

```
Stage 1: Map      → Analyze territory, scope problem
Stage 2: Do       → Core transformation
Stage 3: Verify   → Reconcile, check completeness
```

### Parse → Process → Route

```
Stage 1: Parse    → Extract structured data
Stage 2: Process  → Score/evaluate
Stage 3: Route    → Determine next action
```

---

*Type template: Pipeline*
