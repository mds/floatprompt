# Handoff Naming Decision

**Date:** 2026-01-04
**Status:** Locked

---

## Decision

Rename `reconcile.md` → `handoff.md` for the session end protocol.

---

## Rationale

"Reconcile" is accounting terminology — making accounts agree. The file does include consistency checks (Phase 4), but the **primary purpose** is preparing context for the next session.

What the protocol actually does:
1. Inventory files
2. Archive stale docs
3. Update boot.md for next session
4. Cross-reference check
5. Log decisions
6. Verify

The core function is **handoff** — preparing for the next AI session to pick up work.

---

## Alternatives Considered

| Name | Fit |
|------|-----|
| `reconcile.md` | Partial — captures consistency check, misses handoff purpose |
| `handoff.md` | Best — describes primary purpose |
| `close.md` | OK — "closing" a session |
| `wrap.md` | OK — "wrap up" is a trigger phrase |
| `end.md` | Too generic |

---

## Files Changed

- `2026-01-04-workshop-restructure-spec.md` — Updated all references
- `.float-workshop/protocols/handoff.md` — Renamed from reconcile.md
- `.float-workshop/protocols/boot.md` — Updated references

---

*Decision made during restructure execution, session 11*
