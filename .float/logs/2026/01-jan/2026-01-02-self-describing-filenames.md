# Self-Describing Filenames Decision

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

Replace `index.md` with self-describing filenames that match their folder name.

---

## Rationale

1. **Consistent with established pattern** — We already use `project-map.md` not `map.md`, `wip-boot.md` not `boot.md`
2. **Tab clarity** — When file is open, you know exactly where it is
3. **Self-describing** — No need to check path
4. **`index.md` is web convention** — We're not building web pages

---

## Before

```
wip-logs/
├── index.md              ← which index.md?
└── 2026/
    ├── index.md          ← which index.md?
    └── 01-jan/
        └── index.md      ← which index.md?
```

5 tabs open, all say `index.md`. Have to look at path.

---

## After

```
wip-logs/
├── wip-logs.md           ← self-describing
└── 2026/
    ├── 2026.md           ← self-describing
    └── 01-jan/
        └── 01-jan.md     ← self-describing
```

You always know where you are.

---

## Files Changed

| File | Change |
|------|--------|
| `wip-logs/index.md` | — |
| `2026/index.md` | — |
| `01-jan/index.md` | — |
| `project-logs/index.md` | — |
| `wip-logs.md` | — |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Rename files | `parity_fixer` (simple rename, no judgment) |
| Update protocol docs | `decision_logger` |
| Find stale `index.md` references | `parity_checker` |

**Observation:** Mostly mechanical work. The decision was the hard part (human + AI discussion).

---

**Do not revisit.**
