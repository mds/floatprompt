---
title: Decision History
type: decisions
ai_updated: 2025-12-29
---

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

### .float/ self-doc via nav/float.md
**Question:** Why does the `.float/` folder self-document with its own nav file?
**Answer:** Consistency. Every navigable folder uses a nav file; `.float/` is no exception. Keeping `.float/` documented in one place avoids scattered instructions and aligns with the centralized nav pattern.
**Date:** 2025-12-29

### Context file naming (no generic project.md)
**Question:** Why must the context file use a project-specific name instead of `project.md`?
**Answer:** Context must signal identity, not a placeholder. Using `floatprompt.md` (or domain-specific equivalents) enforces meaningful naming and prevents cloned installs from keeping a generic context filename.
**Date:** 2025-12-29

### decisions.md lives in context/
**Question:** Why was `decisions.md` moved under `context/`?
**Answer:** Decisions capture rationale (the “why”) and belong with other context assets. Housing it in `context/` keeps structure (nav), meaning (context), and rationale (decisions) together instead of scattering files at root.
**Date:** 2025-12-29

### Track installed package version (.version)
**Question:** Why is `.float/.version` part of the structure map?
**Answer:** It records the installed `floatprompt` package version for update checks and reproducibility. Keeps local system files in sync with CLI expectations without touching user-authored content.
**Date:** 2025-12-29

