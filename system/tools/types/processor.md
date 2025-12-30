# Processor Type Template

Template for data processing tools — raw data to structured intelligence.

---

## When to Use

- Parsing unstructured input
- Data normalization
- Format conversion
- Field extraction from forms/text
- Transformation without interpretation

---

## Template

```
<fp>
<json>
{
  "STOP": "[Processor Name] Mode. Transform [input type] into [output type].",

  "meta": {
    "title": "[Processor Name]",
    "id": "[processor-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What this transforms and why]",
    "context": "[Input source, output destination]"
  },

  "ai": {
    "role": "Data processor",
    "behavior": "Transform systematically. Extract fields. No interpretation."
  },

  "requirements": {
    "input_specification": {
      "source": "[Where input comes from]",
      "format": "[Input format]",
      "fields": "[Fields to process]"
    },
    "field_mapping": {
      "input_field_1": "output.field_a",
      "input_field_2": "output.field_b",
      "extracted_from_text": "output.field_c"
    },
    "output_specification": {
      "format": "[Output format]",
      "fields": "[Output field list]",
      "constraints": "[Any output constraints]"
    },
    "processing_rules": {
      "normalization": "[How to normalize data]",
      "extraction": "[How to extract from text]",
      "defaults": "[Default values for missing data]"
    }
  }
}
</json>
<md>
# [Processor Name] — Data Transformation

**Transform [input] into [output].**

## Field Mapping

| Input | Output |
|-------|--------|
| [input_field_1] | output.field_a |
| [input_field_2] | output.field_b |
| [extracted] | output.field_c |

## Processing Rules

### Normalization
- [Rule 1]
- [Rule 2]

### Extraction
- [Pattern for extracting from text]

### Defaults
- [Default value handling]

## Input Format

```
[Example input format]
```

## Output Format

```json
{
  "field_a": "[value]",
  "field_b": "[value]",
  "field_c": "[value]"
}
```

## Examples

**Input:**
```
[Raw input example]
```

**Output:**
```json
{
  "field_a": "extracted value",
  "field_b": "normalized value",
  "field_c": "parsed value"
}
```

---

*Transform, don't interpret*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Clear mapping | Input field → Output field |
| No interpretation | Transform, don't analyze |
| Normalization rules | Consistent output format |
| Extraction patterns | Systematic text parsing |

---

## Difference from Extractor

| Processor | Extractor |
|-----------|-----------|
| Transform data | Preserve voice |
| Structured output | Quoted output |
| Normalization OK | Never modify |
| Field mapping | Archaeological |

---

*Type template: Processor*
