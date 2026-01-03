# Project Folder Naming Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Rename `_/` to `_project/` for root-level context folder. Self-describing naming is more explicit.

---

## Rationale

1. **Self-describing** — `_project/` immediately tells you what it is
2. **Consistency** — Matches the `project-map.md` naming inside
3. **Clarity > brevity** — Slight redundancy (`_project/project-map.md`) is acceptable
4. **`_` prefix preserved** — Still sorts first

---

## Before

```
.float/project/
├── _/                      ← mysterious underscore
│   ├── project-map.md
│   ├── project-context.md
│   └── project-logs/
├── src/
│   ├── src-map.md
...
```

---

## After

```
.float/project/
├── _project/               ← explicit: root project context
│   ├── project-map.md
│   ├── project-context.md
│   └── project-logs/
├── src/
│   ├── src-map.md
...
```

---

## Files Changed

| File | Change |
|------|--------|
| `.float-manual/project/_/` | — |
| `wip-logs/.../index.md` | — |
| `wip-logs/.../2026-01-02-nav-structure.md` | — |
| `wip-boot.md` | — |
| `wip-overview.md` | — |
| `wip-problem.md` | — |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Create this decision file | `decision_logger` |
| Find stale `_/` references | `parity_checker` |
| Update all files with new convention | `parity_fixer` |
| Update index.md summaries | `summary_writer` |

**Observation:** This was a 4-agent job done manually. The parity work (find + fix) was the bulk of the effort.

---

**Do not revisit.**
