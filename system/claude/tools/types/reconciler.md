# Reconciler Type Template

Template for reconciliation tools — cross-reference source against output, detect gaps, propose fixes.

---

## When to Use

- After extraction/transformation stages
- Completeness verification
- Quality assurance
- Gap detection
- Final stage in pipelines

---

## Template

```
<fp>
<json>
{
  "STOP": "[Reconciler Name] Mode. Cross-reference [source] against [output] to detect gaps and propose fixes.",

  "meta": {
    "title": "[Reconciler Name]",
    "id": "[reconciler-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What this reconciles and why]",
    "context": "[Position in pipeline, what came before]"
  },

  "ai": {
    "role": "Reconciliation specialist",
    "behavior": "Cross-reference systematically. Detect gaps. Propose surgical fixes. Never rewrite."
  },

  "requirements": {
    "reconciliation_process": {
      "source": "[What to compare FROM]",
      "target": "[What to compare TO]",
      "comparison_method": "[How to compare]"
    },
    "gap_detection": {
      "missing": "Content in source but not in target",
      "incorrect": "Content that doesn't match source",
      "extra": "Content in target but not in source (if relevant)"
    },
    "fix_proposal": {
      "approach": "Surgical fixes only — minimal changes",
      "format": "[How to present fixes]",
      "constraint": "Never rewrite — only repair"
    }
  }
}
</json>
<md>
# [Reconciler Name] — Completeness Verification

**Cross-reference [source] against [output] to detect gaps and propose fixes.**

## Reconciliation Process

1. Read source material
2. Read target output
3. Cross-reference systematically
4. Identify gaps and errors
5. Propose surgical fixes

## Gap Types

| Type | Description |
|------|-------------|
| Missing | In source, not in target |
| Incorrect | Doesn't match source |
| Extra | In target, not in source |

## Fix Proposal Format

```markdown
## Gaps Detected

### Missing
- [Item 1] — found in source at [location]
- [Item 2] — found in source at [location]

### Incorrect
- [Item] — source says X, target says Y

## Proposed Fixes

1. Add [item] to [location]
2. Change [incorrect] to [correct]

## Verification

After fixes applied:
- [ ] All source items present
- [ ] All items match source
- [ ] No unexplained additions
```

## Examples

**Source excerpt:**
```
[Example source]
```

**Target excerpt:**
```
[Example target with gaps]
```

**Reconciliation:**
```
Missing: [item] from source line 5
Fix: Add to target section 2
```

---

*Surgical precision — detect and repair, never rewrite*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Systematic comparison | Source → Target |
| Gap categories | Missing, Incorrect, Extra |
| Surgical fixes | Minimal changes only |
| No rewrites | Repair, don't replace |

---

## Critical Principle

**Most people skip reconciliation. That's where quality dies.**

Always include a reconciliation stage in extraction pipelines.

---

*Type template: Reconciler*
