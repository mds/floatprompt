---
type: index
folder: active
limit: 3
---

# Active Work

Current focus items. **Limit: 3 items max.**

## Current Focus

| Item | Status | Summary |
|------|--------|---------|
| FloatPrompt Plugin | **Testing (8/10)** | Plugin loads, commands work, hooks need live test |
| FloatPrompt for Web | **Ready** | NPM package needs testing, then publish |

**Session 45 outcomes:**
- **Fixed plugin.json schema** — author object, commands/hooks paths corrected
- **Fixed float-handoff.sh** — status constraint (pending -> open)
- **Enhanced scan.sh** — Now populates files table (582 files with SHA-256 hashes)
- **Enhanced float-log agent** — Two jobs: session handoff + folder-level decisions
- **Enhanced float-update-logs agent** — Step-by-step instructions, markdown template
- **Plugin validation passes** — `claude plugin validate` succeeds

**Session 44 outcomes:**
- Built automatic handoff hook (PreCompact + SessionEnd)
- Built Layer 1 scan script (86 folders indexed)
- Created /float command (boot sequence)
- Created Float.md (AI driver's manual)
- Created plugin.json (manifest)

**Active folder contains:**
- `ACTIVE.md` — This index
- `floatprompt-plugin.md` — THE authoritative spec
- `claude-floatprompt-plugin-progress.md` — Build tracker (8/10 done)
- `MDS-floatprompt-claude-code-plugin.md` — Workflow notes

## Next Steps

**FloatPrompt Plugin (8/10 done — HOOK TESTING NEXT):**

- [x] Update `float-enrich` agent → sqlite3
- [x] Update `float-log` agent → sqlite3 + files_read
- [x] Build automatic handoff hook (PreCompact + SessionEnd)
- [x] Layer 1 scan script (`scan.sh`) — enhanced with files table
- [x] `/float` command
- [x] Float.md (AI driver's manual)
- [x] Plugin manifest (`plugin.json`) — schema fixed
- [x] Plugin validation passes
- [ ] **Test PreCompact hook firing** (fill context window)
- [ ] **Test SessionEnd hook firing** (exit session)

**Agent Reorganization (after testing):**

| From | To | Why |
|------|-----|-----|
| `.claude/agents/float-organize.md` | `.float-workshop/agents/` | Workshop-specific |
| `.claude/agents/float-update-logs.md` | `.float-workshop/agents/` | Workshop-specific |
| `.claude/agents/draft/float-mode-generator.md` | `.float-workshop/agents/` | Workshop utility |
| `.claude/agents/draft/float-enrich.md` | `plugins/floatprompt/ref/` | Reference only (hook spawns inline) |
| `.claude/agents/draft/float-log.md` | `plugins/floatprompt/ref/` | Reference only (hook spawns inline) |

**FloatPrompt for Web:**
- Test the NPM package
- Publish to npm

## Overflow Check

<!-- AI: Count *.md files (excluding active.md). If > 3, suggest parking. -->
