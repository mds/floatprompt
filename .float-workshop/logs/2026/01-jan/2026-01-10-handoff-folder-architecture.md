# Handoff Folder Architecture Decision

**Date:** 2026-01-10
**Session:** 53
**Status:** Locked

---

## Context

Evaluating whether `float.db` + `handoff.md` can fully replace `.float-workshop/` without losing fidelity. The workshop pattern of `active/ACTIVE.md` pointing to `active/*.md` spec files works well.

Gap identified: Storing full 90-line specs in `log_entries.context` is queryable but not human-reviewable or git-friendly.

---

## Decision

Adopt a hybrid approach mirroring the workshop pattern:

```
.float/
├── float.db                      # Metadata, queryable
├── handoff/
│   ├── HANDOFF.md                # Session orientation (regenerated each capture)
│   └── [topic].md                # Active specs (persist until completed/archived)
└── archive/                      # Optional: completed specs
```

**Principle:** Database for querying. Files for reading.

---

## Schema Changes

### log_entries table

Add `spec_path` column:

```sql
ALTER TABLE log_entries ADD COLUMN spec_path TEXT;
```

- Points to `handoff/[topic].md` when a spec exists
- NULL for simple decisions without detailed specs
- Allows querying metadata, then reading file for full content

### No new tables needed

The combination of:
- `log_entries` (decisions + spec pointers)
- `open_questions` (unresolved threads)
- `folders` (context per folder)
- `handoff/HANDOFF.md` (orientation)
- `handoff/*.md` (full specs)

...covers everything the workshop provides.

---

## HANDOFF.md Structure

```markdown
# Handoff

Session N → N+1

## Where We Are
[Narrative orientation]

## Active Work
| Item | Spec | Status |
|------|------|--------|
| Plugin Distribution | [phase-6-distribution.md](phase-6-distribution.md) | Ready |
| Web Package | [web-package-testing.md](web-package-testing.md) | Needs testing |

## Parked
| Item | Spec | Why |
|------|------|-----|
| Rust Scanner | [rust-scanner-plan.md](rust-scanner-plan.md) | Post-Phase-6 |

## Completed This Session
- [List of completions]

## Open Threads
- [From open_questions table]

## Next Move
[Options for next session]
```

---

## float-capture Flow (Updated)

```
float-capture runs:
  1. Spawn float-log agent
     → Write log_entry to float.db (metadata + spec_path)
     → Write/update spec to handoff/[topic].md (full content)

  2. Spawn float-enrich agent
     → Update folder context as before

  3. Regenerate handoff/HANDOFF.md
     → Query active specs from float.db
     → Build index with links to spec files
```

---

## /float Boot Flow (Updated)

```
/float boots:
  1. Run boot.sh
     → Query float.db for metadata
     → Read handoff/HANDOFF.md for orientation
     → Return combined JSON

  2. Present context to user
     → Use HANDOFF.md narrative
     → Reference specs as needed

  3. If user asks about specific topic
     → Read handoff/[topic].md for full spec
```

---

## Limits

- `handoff/` has 3-5 active specs max (like active/ limit)
- When work completes: archive to `.float/archive/` or delete
- HANDOFF.md regenerated each capture (not manually edited)

---

## Migration

1. Add `spec_path` column to log_entries
2. Create `.float/handoff/` directory
3. Update float-capture.sh to write specs
4. Update float-log agent to handle spec files
5. Update boot.sh to read from handoff/
6. Update /float skill to present handoff/ content

---

## Rationale

- **Database for querying:** "What decisions about X? When was Y decided?"
- **Files for reading:** "What's the actual plan? What's checked off?"
- **Git-trackable:** Spec files are markdown, reviewable in PRs
- **Familiar pattern:** Mirrors workshop structure that works well
- **No content bloat in SQLite:** Metadata only, specs in files

---

*Session 53 — Handoff folder architecture locked*
