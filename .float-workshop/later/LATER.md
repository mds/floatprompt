---
type: index
folder: later
limit: 10
---

# Later

Parked work. Will do, not now. **Soft limit: 10 items.**

> [!ai-hook]
> If this folder exceeds 10 items, recommend:
> 1. Archive stale items to `done/` (if completed) or delete
> 2. Group related items into a single spec
> 3. Create `later/YYYY/` subdirs for long-term parking

## Queued

| Item | Why Parked | Ready to Pull? |
|------|------------|----------------|
| Plugin Phase 6: Distribution | Sequenced | After SessionEnd hook built (agents done) |
| `wip-layer-3-ongoing.md` | Blocked | Needs plugin architecture first |
| `wip-float-build-spec.md` | Tabled | Plugin-first approach faster |
| `vercel-sdk-integration-spec.md` | Tabled | Plugin-first approach faster |
| `float-CMS-context-management-system.md` | Superseded | Plugin model replaces this |
| `workshop-productization-concept.md` | Parked | Concept: productizing boot pattern |

## Phase 6 Details (for when ready)

- Create `marketplace.json` for plugin directory
- Reorganize to `plugins/floatprompt/` structure
- Bundle `schema.sql` and `scan.sh` (not float-db.js — AI uses sqlite3 directly)

## Overflow Check

<!-- AI: Count items. If > 10, surface warning and suggest cleanup. -->
