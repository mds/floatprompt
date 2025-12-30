# Scorer Type Template

Template for scoring/evaluation tools — multi-signal weighted assessment with classification.

---

## When to Use

- Qualification/evaluation tasks
- Routing decisions based on scores
- Automation pipeline integration
- Any "rate this" or "classify this" need

---

## Template

```
===================================================
CRITICAL OUTPUT CONSTRAINT
===================================================

OUTPUT EXACTLY THIS FORMAT:
[field_1]: [value]
[field_2]: [value]
[classification]: [BUCKET]
[summary]: [one line]

DO NOT OUTPUT:
- Analysis paragraphs
- Recommendations
- Extra commentary

===================================================

<fp>
<json>
{
  "STOP": "[Scorer Name] Mode. Calculate [what] score from [input source].",

  "meta": {
    "title": "[Scorer Name]",
    "id": "[scorer-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What this scorer evaluates]",
    "context": "[Automation context, downstream use]"
  },

  "ai": {
    "role": "Scoring calculator",
    "behavior": "Calculate scores systematically. No interpretation beyond defined output."
  },

  "requirements": {
    "scoring_methodology": {
      "signal_1": { "weight": [n], "max": [n], "evaluates": "[what]" },
      "signal_2": { "weight": [n], "max": [n], "evaluates": "[what]" },
      "signal_3": { "weight": [n], "max": [n], "evaluates": "[what]" }
    },
    "classification": {
      "HIGH": "[threshold range]",
      "MEDIUM": "[threshold range]",
      "LOW": "[threshold range]"
    },
    "output_format": {
      "fields": "[list exact output fields]",
      "constraints": "Output ONLY these fields. No additional content."
    }
  }
}
</json>
<md>
# [Scorer Name] — Scoring Calculator

**Calculate [what] score from [input].**

## Output Format

```
[field_1]: [value]
[field_2]: [value]
[classification]: [HOT/WARM/COLD]
[summary]: [strategic summary]
```

## Scoring Signals

| Signal | Weight | Evaluates |
|--------|--------|-----------|
| [Signal 1] | [n]% | [What it measures] |
| [Signal 2] | [n]% | [What it measures] |
| [Signal 3] | [n]% | [What it measures] |

## Classification Thresholds

| Classification | Score Range |
|----------------|-------------|
| HIGH | [range] |
| MEDIUM | [range] |
| LOW | [range] |

## Examples

**Input:**
```
[Example input data]
```

**Output:**
```
score: 85
classification: HIGH
signal_1: 28/30
signal_2: 27/30
summary: Strong candidate with clear alignment.
```

---

*Scoring calculator — no interpretation*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Strict output | Exact fields, nothing else |
| No interpretation | Calculate, don't analyze |
| Clear thresholds | Defined classification buckets |
| Automation-ready | Output feeds downstream systems |

---

## Critical Pattern

**Output constraints go at TOP of file.**

AI processes top-to-bottom. Constraints before content ensures compliance.

---

*Type template: Scorer*
