# Layer 2 Buoy Specification

**Date:** 2026-01-04
**Session:** 12
**Status:** Locked

---

## Decisions Made

### Buoy Prioritization

| Priority | Buoy | Reason |
|----------|------|--------|
| 1 | Context Generator | Core worker for Layer 2 |
| 2 | Scope Detector | Merged INTO Context Generator (single pass) |
| - | Staleness Checker | Layer 3, not needed yet |
| - | Orchestrator | Not needed in single chat mode |

**Key insight:** In single chat mode, the AI in conversation IS the orchestrator. No TypeScript orchestrator needed until fleet mode.

### AI Instruction Details (A1-A4)

| # | Question | Answer | Rationale |
|---|----------|--------|-----------|
| A1 | How verbose should content_md be? | **Adaptive to folder size** | Simple folders (1-3 files): 50-150 words. Complex (10+): 300-500. Matches cognitive load. |
| A2 | Include file-by-file breakdown? | **Only key files** | Noise reduction. Highlight what matters, not catalog everything. |
| A3 | Scope detection confidence? | **Binary yes/no** | Simpler output. AI's judgment call, not probability. |
| A4 | Format of scope_boot? | **Prose, 2-5 sentences** | Boot context is for AI orientation, not structured data. |

### Buoy Location

**Decision:** `.float-workshop/buoys/` during development.

**Rationale:**
- Development context, not production yet
- Easy to iterate
- Will move to `src/buoys/` or similar for fleet mode

### Context Generator Design

Follows LOCKED schema from `docs/buoys.md`:

```
meta: id, title, type, version
ai: role, archetype, sub_archetype, autonomy
input: receives, defaults
output: produces
```

Produces all context in single pass:
- description (1-2 sentences)
- content_md (adaptive markdown)
- is_scope (boolean)
- type (folder/scope/log_*)
- parent_scope_path (nearest ancestor scope)
- scope_boot (if is_scope)

---

## Files Created

| File | Purpose |
|------|---------|
| `.float-workshop/buoys/context-generator.md` | First buoy-boot file |

---

## Next Steps

1. Test full generation loop using CLI
2. Process all 65 folders
3. Validate output quality
4. Log results

---

*Locked 2026-01-04 — Session 12*
