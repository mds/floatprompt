# Priority Update

**Date:** 2026-01-04
**Session:** 22
**Status:** Locked

---

## Decision

Clarified priority after reviewing all logs and vision documents. The project had drifted toward speculative features (`float build`, `float sync`) that aren't in the core vision.

**The actual priority:**

1. **Run buoys on all 65 folders** — populate SQLite with `description` and `context`
2. **Rename `content_md` → `context`** — decided in Session 12, not implemented
3. **Finalize boot.md** — boot-draft.md → boot.md

---

## Rationale

### What the Vision Says

From `how-floatprompt-works.md` and `vision.md`:

> AI reads (in order):
> 1. boot.md (root system prompt)
> 2. Scope chain up to current location ← FROM SQLITE
> 3. Map + context for current folder ← FROM SQLITE

The vision is: **boot.md teaches AI to query SQLite**. There's no mention of static exported files.

### What Was Drifting

- **`float build`** — Static export from SQLite to markdown files. Not in vision. An optimization that was drafted but not core.
- **`float sync`** — Concept referenced in boot.md but no spec exists. Undefined.

### What Was Actually Ready

From `2026-01-04-layer2-buoy-spec.md`:

> **Next Steps**
> 1. Test full generation loop using CLI
> 2. Process all 65 folders
> 3. Validate output quality
> 4. Log results

The buoy infrastructure is complete. All 4 buoys validated. But they haven't been run at scale yet.

### The Gap

- Layer 1 (scanning): ✅ 65 folders, 446 files in float.db
- Layer 2 (generation): Infrastructure ✅, but **folders have empty `description` and `content_md`**
- The database is a skeleton without context

---

## Tabled

| Item | Reason |
|------|--------|
| `float build` | Export optimization, not core vision |
| `float sync` | No spec, concept only |
| Layer 3 (Ongoing) | 4 open questions, not ready |

---

## Next Steps

1. Run context-generator buoy on all 65 folders
2. Run scope-detector to identify autonomous scopes
3. Validate output quality
4. Rename `content_md` → `context` in schema
5. Finalize boot.md

---

## Files Changed

None — this is a priority clarification, not implementation.

---

## Future Agent

**Work type:** Priority analysis, decision synthesis
**Suggested agent:** `decision_logger` — This synthesizing of conversation into structured decisions is what decision-logger automates.

---

*Session 22: Priority reset — run the buoys, fill the database, then the vision works.*
