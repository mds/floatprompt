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
**Answer:** Two reasons: (1) Consistency — every navigable folder uses a nav file, `.float/` is no exception. (2) Depth layering — nav/float.md is the quick structural reference (88 lines, "what's here"), system.md is the full behavioral protocol (400 lines, "how it works"). They serve different depths, not duplication. Same pattern as float-map.md vs float-deepdive.md.
**Date:** 2025-12-29
**Refined:** 2025-12-29 (added depth layering rationale)

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

### /float fix migration mode (future enhancement)
**Question:** Could /float fix handle path migrations (like meta/project restructure)?
**Answer:** Yes, potentially. After folder moves, broken paths become "broken links" — exactly what /float fix finds. Gap: current implementation finds breaks but doesn't know the old→new mapping. Future enhancement: `/float fix --migrate old/path new/path` or teach it to infer mappings from structure. For now, checklist approach is safer for one-time structural changes.
**Date:** 2025-12-29
**Status:** Future enhancement, not blocking

### meta/ and project/ structure (v0.9.0)
**Question:** How should .float/ be organized for instant human clarity?
**Answer:** Split into `meta/` (FloatPrompt system internals) and `project/` (your project's data). Inspired by Next.js conventions where folder names communicate purpose instantly. When AI handles 90% of implementation, humans need to glance at a path and know immediately what it is. `meta/` = don't touch, system files. `project/` = your stuff. See docs/structure.md for philosophy.
**Date:** 2025-12-29
**Version:** 0.9.0
**Note:** Decisions above this entry reference pre-0.9.0 paths (e.g., `.float/tools/` is now `.float/meta/tools/`)

