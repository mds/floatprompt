# Extractor Type Template

Template for archaeological extraction tools — voice preservation from source material.

---

## When to Use

- Content has human voice that matters
- Source material is authoritative
- Downstream use requires authenticity
- Training data extraction
- Transcript/interview processing

---

## Template

```
<fp>
<json>
{
  "STOP": "[Extractor Name] Mode. Extract [what] with archaeological voice preservation.",

  "meta": {
    "title": "[Extractor Name]",
    "id": "[extractor-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What this extracts and why voice matters]",
    "context": "[Source material type, downstream use]"
  },

  "ai": {
    "role": "Archaeological extractor",
    "behavior": "Preserve exact voice. Never paraphrase. Flag ambiguity with [UNCLEAR]."
  },

  "requirements": {
    "voice_preservation": {
      "exact_quotes": "NEVER paraphrase — preserve exact wording",
      "attribution": "Include speaker/author attribution",
      "timestamps": "Use exact timestamps when available: [00:12:34]",
      "uncertainty": "Write [UNCLEAR] rather than guessing meaning"
    },
    "extraction_scope": {
      "include": "[What to extract]",
      "exclude": "[What to skip]",
      "structure": "[How to organize extracted content]"
    },
    "output_format": {
      "format": "[Output format description]",
      "markers": "[Special markers used]"
    }
  }
}
</json>
<md>
# [Extractor Name] — Voice Preservation

**Extract [what] with archaeological precision.**

## Voice Preservation Rules

| Do | Don't |
|----|-------|
| Exact quotes with `"..."` | Paraphrase |
| `[UNCLEAR]` for ambiguity | Guess meaning |
| Timestamps `[00:12:34]` | Approximate |
| Attribution `— @speaker` | Anonymous quotes |

## Extraction Scope

**Include:**
- [What to extract]

**Exclude:**
- [What to skip]

## Output Format

```markdown
## [Section]

> "[Exact quote from source]"
> — @speaker [00:12:34]

[UNCLEAR: description of ambiguous content]
```

## Examples

**Source:**
```
[Example source material]
```

**Extracted:**
```
> "The exact words they said, preserved precisely."
> — @speaker [00:05:23]
```

---

*Archaeological extraction — the voice is the value*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Exact quotes | Never paraphrase |
| [UNCLEAR] markers | Flag ambiguity, don't interpret |
| Timestamps | Precision when available |
| Attribution | Who said it |

---

## Critical Principle

**The human voice is the value. Don't dilute it.**

If you need to explain or interpret, that's a separate tool (Processor), not an Extractor.

---

*Type template: Extractor*
