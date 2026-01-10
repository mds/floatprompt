# Automatic Handoff Hook

**Date:** 2026-01-09
**Session:** 44
**Status:** locked

---

## Summary

Built automatic handoff that fires on PreCompact OR SessionEnd (whichever comes first). Uses hybrid approach: mechanical sqlite3 capture (guaranteed) + AI synthesis via `claude -p` (best effort). Self-deduplicating. No manual `/float-handoff` command needed.

---

## Decisions

### 1. Hybrid Approach: sqlite3 + claude -p

**Decision:** SessionEnd hook does BOTH:
1. Immediate sqlite3 insert (mechanical data, always succeeds)
2. Spawn agents via `claude -p` (AI synthesis, best effort)

**Rationale:**
- sqlite3 is the safety net — local, instant, never fails
- claude -p is the value-add — synthesizes meaningful summaries
- If API fails, we still have files_changed data (degraded but functional)
- Don't let the ceiling collapse the floor

**Pattern:**
```bash
# 1. Mechanical capture (always runs)
sqlite3 .float/float.db "INSERT ... status='pending' ..."

# 2. AI enrichment (best effort, non-blocking)
claude -p "..." || true
```

**Failure modes:**
| Scenario | Result |
|----------|--------|
| Happy path | Rich AI-synthesized session handoff |
| API down | Basic data: "Session touched: [files]" |
| Fast exit | Instant mechanical capture |

### 2. PreCompact = Primary, SessionEnd = Fallback

**Decision:** Same hook fires on both events, but with different behavior:
- **PreCompact:** Full capture (sqlite3 + agents) — session alive, reliable
- **SessionEnd:** Mechanical only (sqlite3) — terminal closing, agents might die

**Rationale:**
- PreCompact fires while session is alive — agents complete reliably
- SessionEnd fires as terminal closes — child processes might get killed
- Mechanical capture is the floor (always works)
- AI enrichment is the ceiling (when conditions allow)
- Matches MDS's vision: "/float puts everything in motion and would ideally be the ONLY command needed"

### 3. Self-Deduplication

**Decision:** Hook checks for recent session-handoff (5 min window) and skips if found.

**Rationale:** Prevents double-firing when PreCompact runs and then SessionEnd follows. Same session shouldn't create multiple handoffs.

### 4. Haiku Model for Agents

**Decision:** Use `haiku` model for handoff agents.

**Rationale:** Fast, cheap, sufficient for structured summarization. These agents aren't doing complex reasoning — they're synthesizing what happened into a structured format.

### 5. Early Exit Optimization

**Decision:** Hook checks `git diff` first; skips agents if nothing changed.

**Rationale:** No point spawning agents for sessions that didn't modify anything. Saves tokens on trivial sessions.

```bash
changed_files=$(git diff --name-only HEAD 2>/dev/null)
if [ -z "$changed_files" ]; then
  exit 0  # Nothing changed, skip agents
fi
```

### 6. Workshop Gate Preserved

**Decision:** SessionEnd hook checks for `.float-workshop/` and spawns workshop agents (`float-organize`, `float-update-logs`) only if present.

**Rationale:** Workshop is internal development tooling. Users installing the plugin won't have this folder.

---

## Hook Architecture

```
PreCompact OR SessionEnd fires
    ↓
float-handoff.sh runs
    ↓
Early exits:
  - No .float/float.db → skip (not initialized)
  - Recent handoff (5 min) → skip (deduplication)
  - No git changes → skip (nothing to capture)
    ↓
PHASE 1: sqlite3 INSERT (always, instant)
  - status='pending', files_changed=[list]
    ↓
If HOOK_EVENT = PreCompact:
  PHASE 2: float-log agent (AI synthesis)
  PHASE 3: float-enrich agent (folder context)
  PHASE 4: Workshop agents (if .float-workshop/)
    ↓
If HOOK_EVENT = SessionEnd:
  - Skip agents (terminal closing)
  - Mechanical capture is enough
    ↓
Exit
```

**Summary:**
| Trigger | Phase 1 (sqlite3) | Phases 2-4 (agents) |
|---------|-------------------|---------------------|
| PreCompact | Yes | Yes |
| SessionEnd | Yes | No |

---

## Files Created

| File | Purpose |
|------|---------|
| `plugins/floatprompt/hooks/hooks.json` | Hook config (PreCompact + SessionEnd) |
| `plugins/floatprompt/hooks/float-handoff.sh` | Main hook script (executable) |

---

## Next Steps

1. ~~Build `hooks/hooks.json`~~ Done
2. ~~Build `hooks/float-handoff.sh`~~ Done
3. Test hook manually
4. Move to Layer 1 scan script

---

## Files Changed This Session

- `plugins/floatprompt/hooks/hooks.json` — Created (PreCompact + SessionEnd triggers)
- `plugins/floatprompt/hooks/float-handoff.sh` — Created (executable, 217 lines)
- `.float-workshop/active/claude-floatprompt-plugin-progress.md` — Updated
- `.float-workshop/logs/2026/01-jan/2026-01-09-sessionend-hook-approach.md` — Created

---

*Session 44: Automatic handoff built — PreCompact (primary) + SessionEnd (fallback), self-deduplicating*
