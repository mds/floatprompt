# Capture Pipeline Redesign

**Session 62** | **Status: Decision Pending**

## The Question

How should `/float-capture` work now that git is Layer 1?

## Context

Session 61 shipped git-native Layer 1 (v1.2.0):
- Git is source of truth for file tracking
- Removed ~2000 lines of Rust scanner
- `files` table removed, git commands replace it

Current capture.sh is 460 lines handling both:
- Hook path (PreCompact/SessionEnd) → mechanical INSERT
- Manual path (`--manual`) → spawns 4 claude subprocesses

Problems:
1. Hook has never worked reliably
2. bash-spawning-claude is invisible to user
3. Mechanical INSERT just copies git data (redundant)
4. 4 agents with staging/waiting (slow)

## Proposed Architecture

### Hook (PreCompact/SessionEnd)
**Option A:** Delete entirely — git is the safety net
**Option B:** Minimal breadcrumb — just "session ended at commit X"

### Command (/float-capture)
Claude orchestrates directly via Task tool:

```
/float-capture
    │
    ├─ Mechanical: sqlite3 INSERT placeholder (instant)
    │
    └─ Parallel agents (Task tool):
        ├── float-log → UPDATE entry + INSERT decisions + UPDATE questions
        └── float-handoff → Write handoff.md
```

### Agents: 4 → 2

| Current | Proposed |
|---------|----------|
| float-log | float-log (absorbs float-decisions) |
| float-decisions | (merged into float-log) |
| float-enrich | Separate command or optional |
| float-handoff | float-handoff (unchanged purpose) |

**float-enrich** becomes separate concern:
- Institutional knowledge, not session capture
- Could be `/float-enrich` command
- Or optional third agent
- Or triggered by "folder is stale"

## Key Insight

From the perspective of a NEW AI reading PRESERVED context:

**Most valuable (read first):**
1. handoff.md — AI-to-AI narrative
2. log_entry — searchable record
3. open_questions — continuity

**Less urgent (compounds over time):**
4. folder context — institutional knowledge

Handoff and log_entry need same inputs, different outputs (prose vs SQL).
Folder context is a different concern entirely.

## Decision Needed

1. **Hook:** Delete or minimal breadcrumb?
2. **Agents:** 2 agents (float-log + float-handoff) or keep float-enrich as third?
3. **float-enrich:** Part of capture or separate `/float-enrich` command?

## Trade-offs

### 2 Agents (float-log + float-handoff)
- Pro: Simpler, faster, focused
- Pro: Natural boundary (DB writes vs file write)
- Con: Folder context not updated on capture

### 3 Agents (+ float-enrich)
- Pro: Folder context stays fresh
- Con: More complexity
- Con: float-enrich is really a different concern

### Separate /float-enrich
- Pro: Clean separation of concerns
- Pro: User controls when to enrich
- Con: Another command to remember
- Con: Folders might get stale

## Files Affected

```
plugins/floatprompt/
├── hooks/capture.sh        # Simplify to ~40 lines or delete
├── commands/float-capture.md  # Rewrite for Task tool orchestration
├── agents/
│   ├── float-log.md        # Update to absorb decisions
│   ├── float-decisions.md  # Delete (merged)
│   ├── float-enrich.md     # Move to separate command?
│   └── float-handoff.md    # Simplify (no transcript file)
```

## Next Steps

1. Decide on the three questions above
2. Implement new float-capture.md command
3. Update/merge agent prompts
4. Simplify or delete capture.sh
5. Test the new flow
