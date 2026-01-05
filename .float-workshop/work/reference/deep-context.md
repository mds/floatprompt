<fp>
<json>
{
  "STOP": "Deep Context Spec. LOCKED 2026-01-04. Topic-based context storage for FloatPrompt.",

  "meta": {
    "id": "deep-context-spec",
    "title": "Deep Context Spec",
    "status": "LOCKED",
    "locked_date": "2026-01-04",
    "session": 15
  },

  "human": {
    "author": "@mds",
    "intent": "Topic-based context that spans locations, recallable on demand"
  },

  "decisions": {
    "watches": "Auto-detected by creation buoy",
    "versioning": "Keep history in deep_history table",
    "command": "/float deep <slug> (namespaced)"
  }
}
</json>
<md>
# Deep Context Spec

**Status:** LOCKED
**Date:** 2026-01-04
**Session:** 15

---

## The Problem

Current architecture is **location-based** (folders table tied to filesystem paths). But sometimes you need **topic-based** deep context:

- "Buoys" (the concept, architecture, patterns)
- "Vision" (the full FloatPrompt vision)
- "Fleet mode" (Vercel sandbox parallel execution)
- "Brand/naming" (terminology decisions)

These aren't folders. They're **living reference documents** — concept primers that you summon when you need to go deep on a topic.

---

## The Solution

A `deep` table in float.db that stores topic-centric context documents with:
- Slug-based recall (`/float deep buoys`)
- Staleness tracking via `watches` JSON
- Buoy-maintained freshness
- Version history for diffing

---

## Schema Design

### SQL DDL

```sql
CREATE TABLE IF NOT EXISTS deep (
  -- Identity
  slug        TEXT PRIMARY KEY,    -- 'buoys', 'vision', 'fleet'
  title       TEXT NOT NULL,       -- 'Everything About Buoys'

  -- Content
  content_md  TEXT NOT NULL,       -- The actual deep context (can be large)

  -- Staleness
  watches     TEXT,                -- JSON array of staleness triggers (auto-detected)
  status      TEXT NOT NULL DEFAULT 'current'
              CHECK (status IN ('current', 'stale', 'generating')),

  -- Attribution
  ai_model    TEXT,                -- Model that generated this

  -- Timestamps
  created_at  TEXT NOT NULL,       -- ISO 8601
  updated_at  TEXT NOT NULL        -- ISO 8601
);

CREATE TABLE IF NOT EXISTS deep_history (
  -- Identity
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT NOT NULL,       -- FK to deep.slug
  version     INTEGER NOT NULL,    -- 1, 2, 3, ...

  -- Snapshot
  title       TEXT NOT NULL,
  content_md  TEXT NOT NULL,
  watches     TEXT,
  ai_model    TEXT,

  -- When this version was created
  created_at  TEXT NOT NULL,       -- ISO 8601

  FOREIGN KEY (slug) REFERENCES deep(slug) ON DELETE CASCADE
);

CREATE INDEX idx_deep_history_slug ON deep_history(slug);
```

### Watches JSON Structure

```json
{
  "watches": [
    {"type": "folder", "path": "src/buoys"},
    {"type": "glob", "pattern": "**/*buoy*.md"},
    {"type": "logs", "topic_contains": "buoy"},
    {"type": "deep", "slug": "vision"}
  ]
}
```

**Watch types:**

| Type | Watches | Example |
|------|---------|---------|
| `folder` | Folder path in folders table | `{"type": "folder", "path": "src/buoys"}` |
| `glob` | Files matching pattern | `{"type": "glob", "pattern": "**/*buoy*.md"}` |
| `logs` | Log entries containing topic | `{"type": "logs", "topic_contains": "buoy"}` |
| `deep` | Another deep context | `{"type": "deep", "slug": "vision"}` |

---

## Zod Schema

```typescript
// src/db/deep-schema.ts

import { z } from "zod";

// Watch types
export const DeepWatchTypeSchema = z.enum([
  "folder",
  "glob",
  "logs",
  "deep"
]);
export type DeepWatchType = z.infer<typeof DeepWatchTypeSchema>;

// Individual watch
export const DeepWatchSchema = z.object({
  type: DeepWatchTypeSchema,
  path: z.string().optional(),           // for folder type
  pattern: z.string().optional(),        // for glob type
  topic_contains: z.string().optional(), // for logs type
  slug: z.string().optional(),           // for deep type
});
export type DeepWatch = z.infer<typeof DeepWatchSchema>;

// Status
export const DeepStatusSchema = z.enum([
  "current",
  "stale",
  "generating"
]);
export type DeepStatus = z.infer<typeof DeepStatusSchema>;

// Full deep context row
export const DeepSchema = z.object({
  slug: z.string(),
  title: z.string(),
  content_md: z.string(),
  watches: z.array(DeepWatchSchema).nullable(),
  status: DeepStatusSchema,
  ai_model: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
});
export type Deep = z.infer<typeof DeepSchema>;

// History entry (version snapshot)
export const DeepHistorySchema = z.object({
  id: z.number().optional(),  // Auto-increment
  slug: z.string(),
  version: z.number(),
  title: z.string(),
  content_md: z.string(),
  watches: z.array(DeepWatchSchema).nullable(),
  ai_model: z.string().nullable(),
  created_at: z.string(),
});
export type DeepHistory = z.infer<typeof DeepHistorySchema>;
```

---

## Commands

### Slash Command (Claude Code)

```
/float deep <slug>        → Recall deep context into session
/float deep list          → List all available deep contexts
/float deep create <slug> → Create new deep context (buoy does recon)
/float deep refresh <slug> → Regenerate stale deep context
/float deep history <slug> → Show version history
```

### CLI (float-db)

```bash
float-db deep list                    # List all deep contexts with status
float-db deep show <slug>             # Print content_md to stdout
float-db deep create <slug> --title   # Insert new (content via stdin or buoy)
float-db deep check                   # Check staleness of all
float-db deep stale <slug>            # Mark as stale manually
float-db deep history <slug>          # List versions
float-db deep diff <slug> <v1> <v2>   # Diff two versions
```

---

## Flows

### Creation Flow

```
User: /float deep create fleet
  ↓
Prompt for title: "Fleet Mode Architecture"
  ↓
status = 'generating'
  ↓
Buoy does reconnaissance:
  - Searches codebase for relevant files
  - Reads existing documentation
  - Synthesizes into comprehensive context
  ↓
Buoy determines watches (what makes this stale?)
  ↓
INSERT INTO deep (slug, title, content_md, watches, status, ai_model, ...)
  ↓
User can now: /float deep fleet
```

### Recall Flow

```
User: /float deep buoys
  ↓
SELECT content_md FROM deep WHERE slug = 'buoys'
  ↓
Inject into session context
  ↓
User enters plan mode with massive context loaded
```

### Staleness Check Flow

```
Scheduled or on-demand: float-db deep check
  ↓
For each deep context:
  - Parse watches JSON
  - Query float.db for changes since updated_at
  - If any watch triggered → status = 'stale'
  ↓
Report: "buoys: stale (src/buoys changed), vision: current"
```

### Regeneration Flow

```
User notices stale: /float deep buoys (shows stale warning)
  ↓
User: /float deep refresh buoys
  ↓
Save current version to deep_history
  ↓
status = 'generating'
  ↓
Buoy re-runs reconnaissance with existing doc as reference
  ↓
Updates content_md, watches, updated_at
  ↓
status = 'current'
```

---

## Decisions

### Answered

| Question | Decision | Rationale |
|----------|----------|-----------|
| Watches auto-detection? | Yes | Creation buoy already reads codebase — it knows what it read |
| Version history? | Yes | `deep_history` table for diffing and rollback |
| Command format? | `/float deep <slug>` | Namespaced under /float, consistent with other commands |

### Remaining

| Question | Current Answer |
|----------|----------------|
| Content size limits? | No practical limit — SQLite handles large TEXT |
| Regeneration strategy? | Full regeneration (simpler to start) |

---

## Files to Create/Modify

| File | Purpose |
|------|---------|
| `src/db/deep-schema.ts` | Zod schemas for deep + deep_history (new) |
| `src/db/schema.ts` | Add DDL for deep and deep_history tables |
| `src/db/client.ts` | Add CRUD functions (insert, update, get, list, history) |
| `src/cli/float-db.ts` | Add deep subcommands |
| `src/buoys/templates/deep-creator.md` | Buoy template for creating deep contexts (new) |
| `.claude/commands/float-deep.md` | Slash command skill (new) |

---

## Example Deep Context

When stored in the database:

```json
{
  "slug": "buoys",
  "title": "Everything About Buoys",
  "content_md": "# Everything About Buoys\n\n**Updated:** 2026-01-04\n\n---\n\n## What Buoys Are\n\nParallel task agents for FloatPrompt System maintenance...\n\n[5000+ tokens of comprehensive context]",
  "watches": [
    {"type": "folder", "path": "src/buoys"},
    {"type": "glob", "pattern": "**/*buoy*.md"},
    {"type": "logs", "topic_contains": "buoy"}
  ],
  "status": "current",
  "ai_model": "claude-opus-4-5-20251101",
  "created_at": "2026-01-04T10:00:00Z",
  "updated_at": "2026-01-04T10:00:00Z"
}
```

---

## Related

- **Decision log:** `logs/2026/01-jan/2026-01-04-deep-context-spec.md`
- **Existing recon example:** `artifacts/2026-01-04-buoy-recon.md` (what a deep context looks like)
- **Buoy spec:** `docs/buoys.md` (for creation buoy archetype)

---

*LOCKED 2026-01-04 — Session 15*
</md>
</fp>
