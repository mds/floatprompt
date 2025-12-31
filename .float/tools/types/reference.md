# Reference Type Template

Template for reference/context documents — authority that informs other tools.

---

## When to Use

- ICP (Ideal Customer Profile) definitions
- Voice/style guides
- Domain expertise documentation
- Shared context across multiple tools
- Evaluation criteria definitions

---

## Template

```
<fp>
<json>
{
  "STOP": "[Reference Name] Authority. Provides [domain] context for [use case].",

  "meta": {
    "title": "[Reference Name]",
    "id": "[reference-id]",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@[author]",
    "intent": "[What knowledge this provides]",
    "context": "[How other tools use this]"
  },

  "ai": {
    "role": "Context provider",
    "behavior": "Provide authoritative context. Do not take action. Inform other tools."
  },

  "requirements": {
    "domain": "[Domain this covers]",
    "authority": {
      "defines": "[What this definitively establishes]",
      "informs": "[What decisions this supports]"
    },
    "usage": {
      "referenced_by": "[Tools that use this]",
      "not_for": "Direct execution — this is context only"
    }
  }
}
</json>
<md>
# [Reference Name] — Authority Document

**Authoritative context for [domain].**

This document provides context for other tools. It does not take action directly.

## Domain

[Description of what domain this covers]

## Definitions

### [Definition 1]
[Clear definition with criteria]

### [Definition 2]
[Clear definition with criteria]

## Criteria

| Aspect | Standard |
|--------|----------|
| [Criterion 1] | [What qualifies] |
| [Criterion 2] | [What qualifies] |
| [Criterion 3] | [What qualifies] |

## Used By

This reference informs:
- [Tool 1] — uses [which criteria]
- [Tool 2] — uses [which definitions]

## Not For

This document does NOT:
- Score or evaluate directly
- Take action
- Process input

For action, see: [related action tools]

---

*Authority document — informs, doesn't act*
</md>
</fp>
```

---

## Key Characteristics

| Aspect | Requirement |
|--------|-------------|
| Authority | Definitive source for domain |
| No action | Provides context only |
| Clear definitions | Unambiguous criteria |
| Referenced by others | Tools point to this |

---

## Examples of Reference Documents

- **ICP Definition** — Who is the ideal customer
- **Voice Guide** — How to write/speak
- **Evaluation Criteria** — What makes something good/bad
- **Domain Glossary** — Authoritative definitions

---

## Critical Principle

**Reference docs don't DO — they INFORM.**

If you find yourself adding "now evaluate..." to a reference doc, that's a separate Scorer tool.

---

*Type template: Reference*
