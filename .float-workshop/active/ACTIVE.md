---
type: index
folder: active
limit: 3
---

# Active Work

Current focus items. **Limit: 3 items max.**

> [!ai-hook]
> If this folder has more than 3 items, recommend moving lower-priority
> items to `later/`. Active should only hold what's in hands NOW.

## Current Focus

| Item | Status | Summary |
|------|--------|---------|
| FloatPrompt Plugin | **Building (2/8)** | Agents updated, schema restored, progress tracked |
| FloatPrompt for Web | **Ready** | NPM package needs testing, then publish |

**Session 43 outcomes:**
- **Restored src/ from git** — schema.ts, client.ts, scan.ts back
- **Updated float-enrich agent** — sqlite3 direct queries (was float-enricher)
- **Updated float-log agent** — sqlite3 + files_read tracking (was float-logger)
- **Created progress tracker** — `claude-floatprompt-plugin-progress.md`

**Active folder contains:**
- `ACTIVE.md` — This index
- `floatprompt-plugin.md` — THE authoritative spec
- `claude-floatprompt-plugin-progress.md` — Build tracker (2/8 done)
- `MDS-floatprompt-claude-code-plugin.md` — Workflow notes

## Next Steps

**FloatPrompt Plugin (In Progress — 2/8 done):**

- [x] Update `float-enrich` agent → sqlite3
- [x] Update `float-log` agent → sqlite3 + files_read
- [ ] Build SessionEnd hook (spawns enrich + log)
- [ ] Layer 1 scan script (`scan.sh`)
- [ ] `/float` command (rename from float-boot)
- [ ] Float.md (instruction file — design last)
- [ ] Plugin manifest (`plugin.json`)
- [ ] Test end-to-end

**FloatPrompt for Web:**
- Test the NPM package
- Publish to npm

## Overflow Check

<!-- AI: Count *.md files (excluding active.md). If > 3, suggest parking. -->
