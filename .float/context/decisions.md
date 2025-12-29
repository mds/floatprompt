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

### Track installed package version (.version) — SUPERSEDED
**Question:** Why is `.float/.version` part of the structure map?
**Answer:** Originally recorded the installed `floatprompt` package version. **Removed in v0.8.0** — redundant with `package.json`. Single source of truth is better.
**Date:** 2025-12-29

### /float enhance replaces /float describe
**Question:** Why rename describe to enhance?
**Answer:** Broader scope. `/float describe` only filled placeholder descriptions. `/float enhance` covers descriptions, stale references, weak content, and future quality improvements. The progression is now: awareness → structure → meaning → quality.
**Date:** 2025-12-29

### Tools live in .float/tools/
**Question:** Why put tool floatprompts in `.float/tools/` instead of elsewhere?
**Answer:** Tools are system files, not user content. Keeping them in `.float/` groups all system components. Each tool (`float.md`, `float-sync.md`, `float-context.md`, `float-enhance.md`) is the source of truth for its command.
**Date:** 2025-12-29

### specs/ split from docs/
**Question:** Why separate specs from docs?
**Answer:** Different audiences, different purposes. `specs/` contains formal definitions (what the system IS). `docs/` contains guides and philosophy (how to USE it). Cleaner organization, easier navigation.
**Date:** 2025-12-29

### Orchestrator routes to tools (Option B)
**Question:** Why is the orchestrator a slim router instead of containing all logic?
**Answer:** Clean separation. The orchestrator (`.claude/commands/float.md`) just parses input and routes to the appropriate tool. Tools (`.float/tools/float-*.md`) contain all logic. Single source of truth, easier maintenance, tools can be updated independently.
**Date:** 2025-12-29

### Buoy spawning is AI discretion, not enforced
**Question:** Should buoys always be spawned for nav/sync work, or can the orchestrator do small work directly?
**Answer:** AI discretion. Buoy specs describe behavior, not enforce it. Guardrails: (1) Descriptions — AI judges obvious vs complex, writes directly or uses placeholders; (2) Status — always report what happened with descriptions and next step; (3) Buoys — spawn fleet when 3+ parallel operations, direct execution OK below threshold. Outcomes matter, method is flexible.
**Date:** 2025-12-29

