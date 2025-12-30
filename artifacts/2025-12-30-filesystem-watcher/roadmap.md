<fp>
<json>
{
  "STOP": "Filesystem Watcher Roadmap. Living document tracking implementation phases, open questions, and completion status.",

  "meta": {
    "title": "Filesystem Watcher Roadmap",
    "id": "filesystem-watcher-roadmap",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Track implementation progress and open questions as a recursive living document",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Roadmap tracker",
    "behavior": "Update this document as phases complete, questions resolve, and new items emerge"
  },

  "requirements": {
    "recursive": "This document updates as work progresses",
    "tracking": "Mark items complete with date, add new items as discovered",
    "format": "Phases → Tasks → Status"
  }
}
</json>
<md>
# Filesystem Watcher Roadmap

**Living document tracking implementation progress.**

Update this document as phases complete, questions get answered, and new work emerges.

---

## Status Legend

| Symbol | Meaning |
|--------|---------|
| `[ ]` | Not started |
| `[~]` | In progress |
| `[x]` | Complete |
| `[?]` | Blocked / Needs decision |
| `[—]` | Deferred |

---

## Phase 0: Design (Current)

**Goal:** Complete architectural documentation before implementation.

| Task | Status | Notes |
|------|--------|-------|
| Core architecture spec | `[x]` | architecture.md |
| Buoy specifications | `[x]` | buoys.md |
| Watcher code spec | `[x]` | watcher.md |
| Decision log format | `[x]` | decision-log.md |
| Architectural decisions | `[x]` | decisions.md |
| Implementation roadmap | `[x]` | roadmap.md (this file) |
| Configuration spec | `[x]` | `.float/config.json` — decided 2025-12-30 |
| Integration mapping | `[x]` | Direct function import — decided 2025-12-30 |

**Phase 0 Completion:** 8/8 tasks

---

## Phase 1: Scaffold

**Goal:** Set up project structure and dependencies.

| Task | Status | Notes |
|------|--------|-------|
| Create `src/watcher/` directory structure | `[ ]` | |
| Add dependencies (chokidar, yaml, gray-matter) | `[ ]` | |
| Set up TypeScript/JavaScript config | `[ ]` | |
| Create state file handling | `[ ]` | `.float/project/.watcher.json` |
| Add to bin/floatprompt.js entry | `[ ]` | |

**Phase 1 Completion:** 0/5 tasks

---

## Phase 2: Code Layer (scout-detect)

**Goal:** Implement mechanical detection without AI.

| Task | Status | Notes |
|------|--------|-------|
| Filesystem watcher setup | `[ ]` | chokidar integration |
| Ignore pattern handling | `[ ]` | Default + configurable |
| Reference checker | `[ ]` | Grep for paths |
| Frontmatter parser | `[ ]` | YAML and <fp><json> |
| Timestamp comparator | `[ ]` | mtime vs ai_updated |
| Version checker | `[ ]` | Match against current |
| Trivial change filtering | `[ ]` | Decide when to invoke AI |
| Debouncing | `[ ]` | 500ms default |
| Flood detection | `[ ]` | 20+ files threshold |

**Phase 2 Completion:** 0/9 tasks

---

## Phase 3: Initial Scan

**Goal:** On startup, scan for all staleness types.

| Task | Status | Notes |
|------|--------|-------|
| Broken reference detection | `[ ]` | Links that don't resolve |
| Timestamp drift detection | `[ ]` | ai_updated < file mtime |
| Version mismatch detection | `[ ]` | Old version strings |
| Missing frontmatter detection | `[ ]` | Files that should have it |
| Orphaned nav entry detection | `[ ]` | Nav refs to missing files |
| Batch report generation | `[ ]` | Consolidated scan results |

**Phase 3 Completion:** 0/6 tasks

---

## Phase 4: Buoy Chain

**Goal:** Implement AI assessment chain.

| Task | Status | Notes |
|------|--------|-------|
| scout-map implementation | `[ ]` | Lightweight AI assessment |
| scout-map prompt tuning | `[ ]` | Test with real changes |
| Map Buoy implementation | `[ ]` | Blast radius analysis |
| Map Buoy prompt tuning | `[ ]` | Semantic relationship detection |
| Think Buoy implementation | `[ ]` | Decision and execution |
| Think Buoy prompt tuning | `[ ]` | Command selection accuracy |
| Chain communication | `[ ]` | Data flow between buoys |
| Error handling per buoy | `[ ]` | Timeout, retry, fallback |
| Model configuration | `[ ]` | Per-buoy model selection |

**Phase 4 Completion:** 0/9 tasks

---

## Phase 5: Decision Logging

**Goal:** Complete paper trail system.

| Task | Status | Notes |
|------|--------|-------|
| Markdown log writer | `[ ]` | Human-readable entries |
| JSON sidecar writer | `[ ]` | Machine-parseable entries |
| Daily summary generation | `[ ]` | Aggregated metrics |
| Human review states | `[ ]` | pending/approved/corrected/reverted |
| /float decisions command | `[ ]` | Review interface |
| Batch approve routine | `[ ]` | Quick approval workflow |

**Phase 5 Completion:** 0/6 tasks

---

## Phase 6: Integration

**Goal:** Connect watcher to existing FloatPrompt System.

| Task | Status | Notes |
|------|--------|-------|
| /float watcher status | `[ ]` | Report watcher health in boot |
| Command invocation from Think | `[ ]` | /float-sync, /float-fix, etc. |
| Result capture from commands | `[ ]` | Log what commands changed |
| Watcher restart capability | `[ ]` | From /float if crashed |
| npx floatprompt entry point | `[ ]` | CLI interface |

**Phase 6 Completion:** 0/5 tasks

---

## Phase 7: Offline & Backlog

**Goal:** Handle disconnection gracefully.

| Task | Status | Notes |
|------|--------|-------|
| Change queue during offline | `[ ]` | Local storage |
| Consolidation on reconnect | `[ ]` | Dedupe redundant changes |
| Backlog processing | `[ ]` | Batch through scout |
| Flood handling for backlog | `[ ]` | /float-plan trigger |
| Backlog log entries | `[ ]` | Record what was processed |

**Phase 7 Completion:** 0/5 tasks

---

## Phase 8: Testing & Validation

**Goal:** Ensure reliability before release.

| Task | Status | Notes |
|------|--------|-------|
| Unit tests for detect functions | `[ ]` | |
| Integration tests for buoy chain | `[ ]` | |
| Edge case testing | `[ ]` | Rapid changes, large batches |
| Cost estimation validation | `[ ]` | API call counts |
| Performance benchmarks | `[ ]` | Latency targets |
| Manual testing in real project | `[ ]` | Dogfooding on FloatPrompt itself |

**Phase 8 Completion:** 0/6 tasks

---

## Open Questions

Questions that need resolution. Update status when answered.

### Configuration Spec

**Question:** What should be configurable and where does config live?

**Status:** `[x]` Decided (2025-12-30)

**Decision:** `.float/config.json`

**Rationale:**
- Predictable location — config near what it configures
- Keeps package.json clean (already crowded with Next.js tooling)
- Copy-paste friendly between projects
- Separation of concerns — `.float/project/` is data, config is behavior
- Gitignore flexibility for `.float/config.local.json`
- Convention over configuration — works with zero config, only create if overriding

---

### Integration with Existing Commands

**Question:** How exactly does Think Buoy invoke float-* commands?

**Status:** `[x]` Decided (2025-12-30)

**Decision:** Direct function import

**Rationale:**
- Speed — subprocess spawn has 100-200ms overhead; direct imports ~1ms
- Shared context — same Node process, same loaded config, same parsed nav files
- Error handling — stack traces flow naturally, no stdout parsing
- Developer joy — straightforward debugging, set breakpoint, step through
- Resource efficiency — one Node process vs spawning many
- Matches Next.js patterns — plugins, middleware, API routes all use direct calls

---

### Cost Estimation

**Question:** What's the expected API cost per day for typical usage?

**Status:** `[ ]` Not measured

**Factors:**
- scout-map calls per change (Haiku)
- Map Buoy calls (Haiku, sometimes Sonnet)
- Think Buoy calls (Sonnet)
- Typical changes per day (varies by project activity)

**To Do:**
- Estimate token counts per buoy
- Model typical daily activity
- Calculate cost range

---

### Model Selection Strategy

**Question:** Should there be an "auto" mode that selects model based on complexity?

**Status:** `[x]` Decided (2025-12-30)

**Decision:** Hybrid — config sets default + max, auto-escalate allowed up to max

**Implementation:**
- scout-map: Haiku (fixed)
- Map Buoy: Haiku default, auto-escalate to Sonnet if confidence is `needs-judgment`
- Think Buoy: Sonnet (fixed)

**Config example:**
```json
{
  "buoys": {
    "map": {
      "model": "claude-3-5-haiku-20241022",
      "escalate_model": "claude-sonnet-4-20250514",
      "escalate_on": ["needs-judgment"]
    }
  }
}
```

**Rationale:**
- Cost-conscious default — 95% of changes are routine, Haiku handles them
- Quality when it matters — `needs-judgment` cases get Sonnet reasoning
- Config controls ceiling — users can disable with `"escalate_model": null`

---

### Human Interrupt

**Question:** Can humans interrupt the buoy chain mid-execution?

**Status:** `[ ]` Not decided

**Considerations:**
- For long-running chains, might want interrupt
- Current assumption: chain runs to completion
- Could add "pause" state to decision log

---

### Multi-Project Future

**Question:** How will multi-project watching work?

**Status:** `[—]` Deferred

**Notes:** Current scope is one project per watcher. Future consideration: liaison between projects.

---

### PR Output for Significant Changes

**Question:** Should Think Buoy create PRs for needs-judgment changes?

**Status:** `[—]` Deferred (future consideration)

**Notes:** See decisions.md for full write-up. Pattern from X: error → webhook → AI → PR.

---

## Discovered During Implementation

*Add new items here as they emerge during implementation.*

| Item | Type | Status | Notes |
|------|------|--------|-------|
| | | | |

---

## Completion Log

*Record phase completions here.*

| Phase | Completed | Notes |
|-------|-----------|-------|
| Phase 0: Design | Complete | 2025-12-30 |
| Phase 1: Scaffold | Not started | |
| Phase 2: Code Layer | Not started | |
| Phase 3: Initial Scan | Not started | |
| Phase 4: Buoy Chain | Not started | |
| Phase 5: Decision Logging | Not started | |
| Phase 6: Integration | Not started | |
| Phase 7: Offline & Backlog | Not started | |
| Phase 8: Testing | Not started | |

---

## How to Update This Document

1. **When completing a task:** Change `[ ]` to `[x]`, add date in Notes if significant
2. **When starting a task:** Change `[ ]` to `[~]`
3. **When blocked:** Change to `[?]`, add blocker in Notes
4. **When deferring:** Change to `[—]`, add reason in Notes
5. **When discovering new work:** Add to "Discovered During Implementation" table
6. **When answering open questions:** Update status and add resolution
7. **When completing a phase:** Update Completion Log with date

---

*Roadmap for the filesystem watcher implementation.*
</md>
</fp>
