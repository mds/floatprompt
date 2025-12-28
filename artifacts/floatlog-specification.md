---
title: FloatLog Specification
type: specification
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Define the session logging format for FloatSystem activity tracking
human_context: Fifth component of FloatSystem - records AI activity for audit trail and history

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Initial draft. Part of the five-component FloatSystem architecture.
---

# FloatLog Specification

**Version:** 0.1.0 (Draft)

## Overview

FloatLog is the session logging component of FloatSystem. It records AI activity for audit trail, debugging, handoff context, and historical reference.

**The Five Components:**

| Component | File | Purpose |
|-----------|------|---------|
| FloatSystem | `system.md` | Boot loader, behavioral protocol |
| FloatIndex | `float.md` | Folder navigation |
| FloatDoc | frontmatter | Document context |
| FloatPrompt | `<fp>` tags | Tools, behavioral modifiers |
| **FloatLog** | `sessions/` | Activity history |

## Purpose

**Why session logging:**

- **Audit trail** — What happened, when, by which AI
- **Debugging** — Trace issues back to specific sessions
- **Handoff context** — New AI/agent can see recent activity
- **History** — Long-term record of system evolution
- **Accountability** — Human can review AI actions

## Structure

### Basic (low volume)

```
project/
├── system.md
├── float.md
├── sessions/
│   ├── float.md              # Session navigation
│   ├── 2025-12-28.md         # Daily log
│   ├── 2025-12-29.md
│   └── 2025-12-30.md
```

### Nested (high volume)

```
project/
├── sessions/
│   ├── float.md              # Session navigation
│   ├── 2025-12/
│   │   ├── float.md          # Month navigation
│   │   ├── 2025-12-28.md
│   │   └── 2025-12-29.md
│   └── 2025-11/
│       ├── float.md
│       └── ...
```

### Per-session (very high volume)

```
project/
├── sessions/
│   ├── float.md
│   ├── 2025-12-28/
│   │   ├── float.md          # Day navigation
│   │   ├── 0900-scan.md      # Morning scan
│   │   └── 1400-update.md    # Afternoon work
```

Choose structure based on activity volume.

## Session Log Format

### Frontmatter (minimal)

```yaml
---
title: Session 2025-12-28
type: session
created: 2025-12-28

ai_model: Claude Opus 4
ai_updated: 2025-12-28
---
```

No human_ fields needed — sessions are AI-generated.

### Content Structure

```markdown
---
title: Session 2025-12-28
type: session
created: 2025-12-28

ai_model: Claude Opus 4
ai_updated: 2025-12-28
---

# Session 2025-12-28

## Summary

Brief description of what happened this session.

## Activity

- [x] Scanned system (boot sequence complete)
- [x] Found 3 integrity issues
- [x] Updated `/docs/float.md`
- [ ] Flagged `/tools/old.md` for review (pending human)

## Files Modified

| File | Action | Notes |
|------|--------|-------|
| `/docs/float.md` | Updated | Added new file listing |
| `/docs/guide.md` | Updated | Refreshed ai_notes |

## Issues Surfaced

| File | Issue | Severity | Status |
|------|-------|----------|--------|
| `/tools/old.md` | 90 days stale | Low | Pending review |
| `/new-folder/` | Missing float.md | High | Created |

## Handoff Notes

Context for next session or agent:
- Human approved 2 of 3 fixes
- `/tools/old.md` still needs human decision
- Consider scanning `/archive/` next session
```

## Field Definitions

### Frontmatter

| Field | Required | Description |
|-------|----------|-------------|
| `title` | Yes | Session identifier (date or datetime) |
| `type` | Yes | Always "session" |
| `created` | Yes | Session date |
| `ai_model` | Yes | Which AI ran this session |
| `ai_updated` | No | Last update to this log |

### Content Sections

| Section | Required | Description |
|---------|----------|-------------|
| **Summary** | Yes | One-line description |
| **Activity** | Yes | Checklist of actions taken |
| **Files Modified** | If any | Table of changes |
| **Issues Surfaced** | If any | Table of problems found |
| **Handoff Notes** | No | Context for next session |

## sessions/float.md

The sessions folder needs its own index:

```yaml
---
title: Session Logs
type: index
status: current
ai_updated: 2025-12-28
---

# Session Logs

Activity history for this project.

## Recent Sessions

| Date | AI Model | Summary |
|------|----------|---------|
| 2025-12-28 | Claude Opus 4 | Initial system scan, 3 issues found |
| 2025-12-27 | Claude Opus 4 | Created /docs/ structure |

## Statistics

- Total sessions: 15
- Files modified: 47
- Issues resolved: 12
- Issues pending: 3
```

AI maintains this index after each session.

## When to Log

**Always log:**
- System scans (boot sequence)
- File modifications
- Issues found
- Human approvals/rejections

**Optional to log:**
- Read-only sessions (just browsing)
- Quick questions (no changes)

**Rule:** If you changed anything or found issues, log it.

## Token Efficiency

Session logs are write-heavy, read-occasional. Optimize for:
- Quick scanning (tables, checklists)
- Searchable patterns (consistent structure)
- Minimal prose (facts, not narrative)

Typical session log: 50-150 tokens.

## Integration with Boot Sequence

Updated boot sequence:

```
1. Read system.md completely
2. Load structure map into memory
3. Understand file conventions
4. Check for integrity issues
5. Read recent session logs (last 2-3)
6. Report any gaps or broken links
7. Proceed with task
8. Log session before ending
```

Step 5 added: Read recent sessions for context.
Step 8 added: Log activity before session ends.

## Maintenance Protocol

**AI responsibilities:**
- Create session log at end of each working session
- Update sessions/float.md with new entry
- Keep handoff notes current
- Archive old sessions (optional, by month/quarter)

**Human responsibilities:**
- Review session logs periodically
- Approve/reject pending issues
- Archive or delete old logs as needed

## Retention

Suggested retention:
- Keep last 30 days immediately accessible
- Archive older sessions by month
- Delete after 1 year (or keep forever, storage is cheap)

No hard rules — adapt to project needs.

## Example: Multi-Session Handoff

**Session 1 (Claude):**
```markdown
## Handoff Notes
- Found broken link in /docs/api.md
- Human not available to approve fix
- Next session: verify link target exists before fixing
```

**Session 2 (GPT, different agent):**
```markdown
## Activity
- Read previous session handoff notes
- Verified link target `/docs/endpoints.md` exists
- Proposed fix to human
- Human approved
- Fixed broken link

## Handoff Notes
- All issues from previous session resolved
- System healthy, no pending items
```

Context travels between agents via session logs.

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
