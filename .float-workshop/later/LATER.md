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
| Plugin Phase 6: Distribution | Sequenced | **Almost ready** — 11/11 tests passed, permission handling locked |
| Plugin Phase 7: Enhanced Hooks | Sequenced | After Phase 6 ships — git commit trigger interesting |
| `1-RUST-plan.md` | Blocked | Awaiting plugin architecture stabilization (moved Session 51) |
| `2-SKILLS-commands-refactor-plan.md` | Blocked | Awaiting plugin architecture stabilization (moved Session 51) |
| `wip-layer-3-ongoing.md` | Blocked | Needs plugin architecture first |
| `wip-float-build-spec.md` | Tabled | Plugin-first approach faster |
| `vercel-sdk-integration-spec.md` | Tabled | Plugin-first approach faster |
| `float-CMS-context-management-system.md` | Superseded | Plugin model replaces this |
| `workshop-productization-concept.md` | Parked | Concept: productizing boot pattern |

## Phase 6 Details (for when ready)

- Create `marketplace.json` for plugin directory
- Reorganize to `plugins/floatprompt/` structure
- Bundle `schema.sql` and `scan.sh` (not float-db.js — AI uses sqlite3 directly)

## Phase 7 Details: Enhanced Hooks

**Evaluated hooks (Session 49):**
- PostToolUse — Would enable real-time file tracking, but may be overkill
- SessionStart — Auto-boot possible, but respects user agency
- **Git commit trigger** — Most interesting: capture context when user commits

**PostToolUse hook** — Real-time file tracking
- Fires after every Read/Edit/Write tool call
- Track `files_read` and `files_changed` in real-time
- No more relying on git diff at capture time
- Cleaner, more accurate activity tracking

**SessionStart hook** — Optional zero-command mode
- Fires when session starts
- Auto-show last handoff summary + stale folder count
- "Always-on" context awareness without `/float`
- Power user opt-in (not default — respects agency)

## Overflow Check

✓ **11/10 items** ⚠️ — At soft limit. Monitor for: Plugin Phase 7, Layer 3, and productization work. Consider archiving or grouping tabled items if Phase 6 adds more work.
