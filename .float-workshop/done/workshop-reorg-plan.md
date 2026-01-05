# Workshop Reorganization Plan

**Status:** In Progress
**Created:** 2026-01-05

---

## Overview

Reorganizing `.float-workshop/` with kanban-style state management and consistent update protocols.

---

## Completed

- [x] Created `workshop.md` — root map of workshop
- [x] Created state files: `_1_next.md`, `_2_focus.md`, `_3_review.md`
- [x] Created folder structure: `docs/foundation/`, `docs/specs/`, `docs/backlog/`
- [x] Created folder indexes: `foundation.md`, `specs.md`, `backlog.md`
- [x] Created protocols: `update-123.md`, `update-files.md`
- [x] Renamed `log.md` → `update-logs.md`

---

## Pending: Protocol Updates

### Update Scope Summary

| Protocol | Scope | Effort |
|----------|-------|--------|
| `boot.md` | **HEAVY** — rewire to state files, update all paths, restructure sections | High |
| `handoff.md` | **SIGNIFICANT** — simplify 6 phases → 3 protocols, update all paths | Medium-High |
| `update-logs.md` | **MODERATE** — rename references, align with new structure | Medium |

**Note:** These files have extensive internal references and cross-links. Expect many edits per file.

---

### boot.md Changes Needed

| Section | Current | Change To |
|---------|---------|-----------|
| Next Steps | Inline in boot.md | Point to `_2_focus.md` |
| Possible Directions | Inline list | Point to `_1_next.md` |
| Drill-Down Files | `docs/*.md` paths | `docs/foundation/*.md`, `docs/specs/*.md`, `docs/backlog/*.md` |
| Current State | Lists `docs/` flat | Update to nested structure |

**Key additions:**
```markdown
## Current Focus

See `_2_focus.md` for active work this session.

## Work Queue

See `_1_next.md` for prioritized next items.
```

**File references to update:**
- `docs/buoys.md` → `docs/specs/buoys.md`
- `docs/vision.md` → `docs/foundation/vision.md`
- `docs/generate-spec.md` → `docs/specs/generate-spec.md`
- `docs/deep-context.md` → `docs/specs/deep-context.md`
- `docs/comments.md` → `docs/specs/comments.md`
- `docs/deep-context-floatprompt.md` → `docs/foundation/deep-context-floatprompt.md`
- `docs/wip-*.md` → `docs/backlog/wip-*.md`
- `docs/vercel-sdk-integration-spec.md` → `docs/backlog/vercel-sdk-integration-spec.md`
- `docs/float-CMS-context-management-system.md` → `docs/backlog/float-CMS-context-management-system.md`
- `docs/workshop.md` → `docs/backlog/workshop.md`

### handoff.md Changes Needed

| Section | Current | Change To |
|---------|---------|-----------|
| Phase 5 | References `log.md` | Reference `update-logs.md` |
| Phases | 6 detailed phases | Simplify: orchestrate 3 update protocols |
| File inventory | `docs/*.md` | `docs/foundation/*.md`, `docs/specs/*.md`, `docs/backlog/*.md` |

**Current 6 phases to simplify:**
1. Phase 1: Inventory → (fold into update-files or remove)
2. Phase 2: Archive stale files → `update-files.md`
3. Phase 3: Update boot.md → `update-123.md` (state) + manual boot tweaks
4. Phase 3.5: Update production boot → (keep or fold in)
5. Phase 4: Cross-reference → `update-files.md`
6. Phase 5: Log decisions → `update-logs.md`
7. Phase 6: Verify → (keep as final checklist)

**Key restructure:**
```markdown
## Handoff Chain

1. Run `update-logs.md` — record session
2. Run `update-123.md` — update state files
3. Run `update-files.md` — update folder indexes (if needed)
```

**References to update (extensive):**
- `protocols/log.md` → `protocols/update-logs.md`
- All `docs/*.md` paths → new nested paths
- "What This Replaces" section — update agent names
- Example session — update file paths
- Phase descriptions — rewrite for new structure

---

### update-logs.md Changes Needed

| Section | Current | Change To |
|---------|---------|-----------|
| Title/header | "Log Protocol" | "Update Logs" |
| JSON id | `log-protocol` | `update-logs` |
| References | May reference old `docs/*.md` | Update to new paths |
| Future agents | References old protocol names | Align with update-* naming |

**Specific updates:**
- Header: `# Log Protocol` → `# Update Logs`
- JSON meta: Update `id` field
- Verify no stale `docs/*.md` paths
- Align "Future Agents" section with new protocol names


---

## Pending: File Moves

Files to move (NOT YET DONE):

```bash
# To foundation/
git mv docs/vision.md docs/foundation/
git mv docs/deep-context-floatprompt.md docs/foundation/

# To specs/
git mv docs/buoys.md docs/specs/
git mv docs/generate-spec.md docs/specs/
git mv docs/deep-context.md docs/specs/
git mv docs/comments.md docs/specs/

# To backlog/
git mv docs/wip-float-build-spec.md docs/backlog/
git mv docs/wip-layer-3-ongoing.md docs/backlog/
git mv docs/vercel-sdk-integration-spec.md docs/backlog/
git mv docs/float-CMS-context-management-system.md docs/backlog/
git mv docs/workshop.md docs/backlog/

# Stays at docs/ root (active focus)
# docs/plugin-architecture.md
```

---

## Execution Order

Recommended sequence:

1. **Move files first** — get folder structure correct
2. **Update folder indexes** — reflect actual contents
3. **Update boot.md** — point to new structure + state files
4. **Update handoff.md** — simplify to 3-protocol chain
5. **Update update-logs.md** — minor header fix
6. **Populate state files** — fill in _1, _2, _3 with real content
7. **Update workshop.md** — verify structure map is accurate
8. **Test flow** — run boot → work → handoff cycle

---

## Agent Architecture (Future)

```
handoff.md (orchestrator)
  │
  ├── spawn: update-logs agent
  │   └── writes: logs/YYYY/MM/session.md
  │
  ├── spawn: update-123 agent
  │   └── writes: _1_next.md, _2_focus.md, _3_review.md
  │
  └── spawn: update-files agent (conditional)
      └── writes: foundation.md, specs.md, backlog.md
```

Sequential execution: logs → 123 → files (each may inform the next)

---

## Automation via `-p` Mode

Leverage Claude Code's non-interactive mode for protocol execution.

**Reference:** `artifacts/claude-code-plugins/agent-sdk.md`

### Handoff Chain Example

```bash
# 1. Update logs
claude -p "Read .float-workshop/protocols/update-logs.md and execute for this session. \
  Record what was accomplished and decisions made." \
  --allowedTools "Read,Write,Bash(git:*)" \
  --output-format json

# 2. Update state files (continue same session)
claude -p "Read .float-workshop/protocols/update-123.md and update state files. \
  Move completed items to review, pull next items to focus." \
  --continue \
  --allowedTools "Read,Write,Edit"

# 3. Update folder indexes (if files moved)
claude -p "Read .float-workshop/protocols/update-files.md and update folder indexes. \
  Sync foundation.md, specs.md, backlog.md with actual folder contents." \
  --continue \
  --allowedTools "Read,Write,Edit,Bash(git mv:*)"
```

### Key `-p` Features

| Flag | Purpose |
|------|---------|
| `--allowedTools` | Auto-approve specific tools per protocol |
| `--continue` | Chain protocols with shared context |
| `--output-format json` | Structured output for validation |
| `--append-system-prompt` | Inject protocol-specific instructions |
| `--resume <id>` | Resume specific session by ID |

### Protocol-Specific Tool Permissions

| Protocol | Allowed Tools |
|----------|---------------|
| `update-logs.md` | `Read,Write,Bash(git:*)` |
| `update-123.md` | `Read,Write,Edit` |
| `update-files.md` | `Read,Write,Edit,Bash(git mv:*)` |

### Add to workshop.md

Once reorg complete, add automation section:

```markdown
## Automation

Protocols can run non-interactively via `claude -p`:

\`\`\`bash
# Automated handoff chain
claude -p "Execute update-logs protocol" --allowedTools "Read,Write"
claude -p "Execute update-123 protocol" --continue --allowedTools "Read,Write,Edit"
claude -p "Execute update-files protocol" --continue --allowedTools "Read,Write,Edit"
\`\`\`

See `artifacts/claude-code-plugins/agent-sdk.md` for full docs.
```

---

## Design Considerations

### Watch For

**Context gathering latency**
Subagents start fresh each time. For small, focused protocols like ours, this is fine. But if protocols grow complex, agents spend tokens re-reading the same files.

**Orchestration gap**
The diagram shows `handoff.md` spawning agents. In reality, you (or the main conversation) are the orchestrator. It's a manual chain, not a self-running pipeline. That's not bad—just be aware.

**Overkill check**
Three separate subagents for workshop handoff might be more machinery than needed. Consider:
- Do we actually run these separately, or always together?
- If always together, one handoff agent with 3 internal steps might be simpler

### Recommendation

Start with **1-2 subagents**, then split if needed:

| Option | Agents | When |
|--------|--------|------|
| **Minimal** | `update-logs` + `update-state` (combined 123 + files) | Start here |
| **Split** | `update-logs` + `update-123` + `update-files` | If state/files diverge in practice |

The protocols stay separate as documentation. The agents can combine them.

```
# Minimal version
handoff.md (manual orchestrator)
  ├── spawn: update-logs agent
  └── spawn: update-state agent (does 123 + files)
```

---

## Also Needs Updates

| File | Scope | Notes |
|------|-------|-------|
| `logs/logs.md` | Check | May reference old `docs/` paths |
| `.float/boot-draft.md` | Check | Production boot — may need path updates |
| `workshop.md` | Verify | Confirm structure matches reality after moves |

---

## Protocol Completion

Before testing handoff flow:
- [ ] Flesh out `update-123.md` with real steps (not just placeholder)
- [ ] Flesh out `update-files.md` with real steps
- [ ] Review `update-logs.md` for completeness
- [ ] Consider combining 123 + files into single `update-state.md`

---

## Git Strategy

- Commit after file moves (atomic, message: "reorg: move docs to foundation/specs/backlog")
- Commit after protocol updates (atomic, message: "reorg: update protocols for new structure")
- Tag when complete: `workshop-reorg-v1`

---

## Success Criteria

- [ ] `ls docs/` shows only `foundation/`, `specs/`, `backlog/`, `plugin-architecture.md`
- [ ] All protocols run without path errors
- [ ] `boot.md` reads `_2_focus.md` correctly
- [ ] Handoff chain completes (manual or via `-p`)
- [ ] No broken references in protocols

---

## Open Questions

1. Should `plugin-architecture.md` stay at `docs/` root or have an "active" folder?
2. Should we update all file references in one pass, or incrementally?
3. Do we move files first (breaking references) or update references first (pointing to nonexistent paths)?
4. ~~Combine `update-123.md` + `update-files.md` into single `update-state.md`?~~
   **DECIDED: Yes.** One agent, internal conditional logic:
   ```
   update-state.md
   ├── always: update _1, _2, _3
   └── if files_moved: sync folder indexes
   ```
   Heuristic: Separate if different triggers. Combine if always sequential.

---

*Plan doc — execute steps in separate session*
