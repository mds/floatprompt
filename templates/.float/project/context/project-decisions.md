<fp>
<json>
{
  "STOP": "Decision history. Why things are the way they are.",

  "meta": {
    "title": "Decision History",
    "type": "decisions",
    "format": "floatprompt",
    "maintained_by": "AI appends, human approves"
  },

  "ai": {
    "role": "Capture rationale for project decisions",
    "behavior": "Append new decisions as Q&A format. Never delete existing entries."
  }
}
</json>
<md>
# Decision History

Captured rationale for project decisions. AI appends entries during context building.

## Format

```
### [Topic]
**Question:** Why [observed choice]?
**Answer:** [human's response]
**Date:** YYYY-MM-DD
```

---

<!-- Entries below -->

</md>
</fp>
