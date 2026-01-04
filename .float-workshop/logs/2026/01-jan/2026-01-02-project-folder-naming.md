# Project Folder Naming Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Rename `_/` to `_project/` for root-level context folder. Self-describing naming is more explicit.

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

## Rationale

1. **Self-describing** — `_project/` immediately tells you what it is
2. **Consistency** — Matches the `project-map.md` naming inside
3. **Clarity > brevity** — Slight redundancy (`_project/project-map.md`) is acceptable
4. **`_` prefix preserved** — Still sorts first

## Key Insight

The `_/` convention was only needed at root level (no natural folder name for "the project itself"). Other folders (`src/`, `bin/`, `templates/`) have the files directly inside with self-describing prefixes:

```
.float-wip/project/
├── _project/               # Root needs special folder
│   ├── project-map.md
├── src/                    # Files go directly here
│   ├── src-map.md
│   ├── src-context.md
│   └── src-logs/
```

## Refines

- [2026-01-02-nav-structure.md](2026-01-02-nav-structure.md) — `_/` convention now `_project/` at root

---

## Files Changed

| File | Change |
|------|--------|
| `.float-wip/project/_/` | Renamed to `_project/` |
| `wip-logs/.../index.md` | Added decision, updated Nav Structure summary |
| `wip-logs/.../2026-01-02-nav-structure.md` | Added "Refined By" section |
| `wip-boot.md` | 10+ `_/` references → `_project/` or direct files |
| `wip-overview.md` | 2 sections updated |
| `wip-problem.md` | 1 section updated |

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
