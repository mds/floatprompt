---
title: Decision History
type: decisions
status: current
created: 2025-12-29
related: .float/project/context/project-context.md, .float/system.md

human_author: @mds
human_intent: Capture rationale for project decisions so future AI sessions understand the "why"
human_context: Append-only log — AI adds entries during context building, human reviews

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: Log-style document. Entries appended chronologically. Never delete, only supersede.
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

### .float/ self-doc via floatprompt/index.md
**Question:** Why does the `.float/` folder self-document with its own structural reference?
**Answer:** Depth layering — `floatprompt/index.md` is "what's here" (quick structural reference), `system.md` is "how it works" (full behavioral protocol). Different depths for different needs. Originally lived in `project/nav/float.md` but moved to `floatprompt/` because `.float/` structure is system documentation, not project documentation. `project/nav/*.md` is now purely for project folders.
**Date:** 2025-12-29
**Refined:** 2025-12-29 (moved from project/nav/float.md to floatprompt/index.md)

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

### meta/ and project/ structure (v0.9.0) — SUPERSEDED by v0.10.0
**Question:** How should .float/ be organized for instant human clarity?
**Answer:** Split into `meta/` (FloatPrompt system internals) and `project/` (your project's data). Inspired by Next.js conventions where folder names communicate purpose instantly. When AI handles 90% of implementation, humans need to glance at a path and know immediately what it is. `meta/` = don't touch, system files. `project/` = your stuff. See docs/structure.md for philosophy.
**Date:** 2025-12-29
**Version:** 0.9.0
**Superseded:** v0.10.0 renamed `meta/` to `floatprompt/` for consistency with package naming
**Note:** Decisions above this entry reference pre-0.9.0 paths (e.g., `.float/tools/` is now `.float/core/tools/`)

### floatprompt/ folder naming (v0.10.0)
**Question:** How should core templates be named for clarity and consistency?
**Answer:** Renamed `core/` to `floatprompt/`. Files keep simple names (template.md, doc.md, os.md, update.md) — the folder provides the namespace. Rationale: (1) "floatprompt" is never pluralized (like "JavaScript" not "JavaScripts"); (2) Folder name documents what's inside; (3) `floatprompt/floatprompt-template.md` stutters — redundant prefix removed; (4) `template.md` describes purpose better than `prompt.md`.
**Date:** 2025-12-29
**Version:** 0.10.0

### /float boot routes to correct fix command (v0.10.0)
**Question:** Why did `/float` recommend `/float sync` for stale reference issues?
**Answer:** The boot command had hardcoded "issues found → run /float sync" logic. But `/float sync` handles structure (nav ↔ folders), while `/float fix` handles content (stale refs inside files). Updated to categorize issue types: structure issues → sync, content issues → fix, both → sync then fix.
**Date:** 2025-12-29
**Version:** 0.10.0

