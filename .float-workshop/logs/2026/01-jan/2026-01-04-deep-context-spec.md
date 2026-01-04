# Deep Context Spec

**Date:** 2026-01-04
**Status:** LOCKED
**Session:** 15

---

## Decision

Topic-based context storage via `deep` table in float.db.

**Problem:** Current architecture is location-based (folders table tied to filesystem paths). Sometimes you need topic-based deep context — "buoys", "vision", "fleet mode", "brand/naming" — that isn't tied to a folder.

**Solution:** Two new tables in float.db:
- `deep` — Topic-centric context documents with slug-based recall
- `deep_history` — Version snapshots for diffing and rollback

---

## Key Decisions

| Question | Decision |
|----------|----------|
| Watches auto-detection? | Yes — creation buoy analyzes content and determines what to watch |
| Version history? | Yes — `deep_history` table stores snapshots on each regeneration |
| Command format? | `/float deep <slug>` — namespaced under /float |

---

## Schema

```sql
CREATE TABLE IF NOT EXISTS deep (
  slug        TEXT PRIMARY KEY,
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  watches     TEXT,  -- JSON array of staleness triggers
  status      TEXT NOT NULL DEFAULT 'current'
              CHECK (status IN ('current', 'stale', 'generating')),
  ai_model    TEXT,
  created_at  TEXT NOT NULL,
  updated_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS deep_history (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL,
  version     INTEGER NOT NULL,
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  watches     TEXT,
  ai_model    TEXT,
  created_at  TEXT NOT NULL,
  FOREIGN KEY (slug) REFERENCES deep(slug) ON DELETE CASCADE
);
```

---

## Watches

Auto-detected by creation buoy. Four watch types:

| Type | Watches | Example |
|------|---------|---------|
| `folder` | Folder path in folders table | `{"type": "folder", "path": "src/buoys"}` |
| `glob` | Files matching pattern | `{"type": "glob", "pattern": "**/*buoy*.md"}` |
| `logs` | Log entries containing topic | `{"type": "logs", "topic_contains": "buoy"}` |
| `deep` | Another deep context | `{"type": "deep", "slug": "vision"}` |

---

## Commands

**Slash commands:**
- `/float deep <slug>` — Recall into session
- `/float deep list` — List all deep contexts
- `/float deep create <slug>` — Create new (buoy does recon)
- `/float deep refresh <slug>` — Regenerate stale
- `/float deep history <slug>` — Show version history

**CLI commands:**
- `float-db deep list/show/create/check/stale/history/diff`

---

## Files to Create

1. `src/db/deep-schema.ts` — Zod schemas
2. `src/db/schema.ts` — Add DDL
3. `src/db/client.ts` — Add CRUD
4. `src/cli/float-db.ts` — Add subcommands
5. `src/buoys/templates/deep-creator.md` — Creation buoy
6. `.claude/commands/float-deep.md` — Slash command
7. `.float-workshop/docs/deep-context.md` — Full spec (locked)

---

## Rationale

**Why topic-based context?**
- Location-based context (folders) works for code
- But concepts span locations: "buoys" touches src/buoys/, docs/buoys.md, logs/*buoy*
- Topic-based context captures the full picture for deep work

**Why version history?**
- Deep contexts evolve as understanding deepens
- Diffing versions shows what changed
- Enables rollback if regeneration produces worse output

**Why auto-detect watches?**
- Creation buoy already reads the codebase to build context
- It knows what it read → those are the watches
- Manual specification is friction and prone to staleness

---

## Future Agent

**deep_creator** — Creates deep context documents
- Capabilities: codebase search, file reading, synthesis, watch inference
- Archetype: generator
- Input: slug + title
- Output: content_md + watches JSON

---

*Full spec at `.float-workshop/docs/deep-context.md`*
