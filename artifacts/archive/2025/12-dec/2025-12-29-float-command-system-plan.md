---
title: Float Command System Implementation Plan
type: plan
status: active
created: 2025-12-29

human_author: @mds
human_intent: Restructure docs/specs and implement formal /float command system
human_context: Conversation-derived plan for Phase 1 (structure) and Phase 2 (commands)

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Plan developed through extended conversation about /float command enhancements.
  Key decisions: Option B (clean separation), subfolder for claude/, specs vs docs split.
  Revised to add: internal reference updates, root.md update, buoys clarification,
  shell optimization as future enhancement, expanded context-creator update details.
---

# Float Command System Implementation Plan

Restructure documentation into specs/ and docs/, then build formal command system with individual floatprompt tools.

## Overview

### What We're Building

1. **specs/** folder for formal definitions
2. **specs/claude/** subfolder for Claude Code integration
3. **specs/claude/commands.md** — The command system spec
4. **.float/tools/float-*.md** — Four command floatprompts
5. Updated orchestrator in **.claude/commands/float.md**

### Key Decisions (from conversation)

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Orchestrator/tools relationship | Option B (clean separation) | Single source of truth, tools are portable |
| Claude docs organization | Subfolder (specs/claude/) | Keeps related specs together, room to grow |
| docs/ vs specs/ | Split them | Formal definitions vs guides/philosophy |
| Buoys | Pattern spec + inline prompts | specs/claude/buoys.md = what buoys ARE; inline in tools = specific prompts |
| /float describe | Replaced by /float enhance | Consolidation |
| Cursor parity | Remove | Doesn't work well, use tools directly |
| Shell optimization | Future enhancement | Not in scope; /float could use shell internally for speed later |
| .float/.version | Delete | Redundant; package.json is single source of truth |

### Command Progression

```
/float           Awareness   (boot/init)
/float sync      Structure   (nav matches folders)
/float context   Meaning     (terrain map)
/float enhance   Quality     (make it better)
```

---

## Phase 1: Structure Change

### 1.1 Create Folders

```bash
mkdir -p specs/claude
```

### 1.2 Move Files to specs/

| From | To |
|------|-----|
| docs/floatprompt.md | specs/floatprompt.md |
| docs/doc.md | specs/doc.md |
| docs/system.md | specs/system.md |
| docs/buoys.md | specs/claude/buoys.md |

**Note:** docs/claude.md stays in docs/ as lightweight entry point for Claude Code users (points to specs).

```bash
git mv docs/floatprompt.md specs/floatprompt.md
git mv docs/doc.md specs/doc.md
git mv docs/system.md specs/system.md
git mv docs/buoys.md specs/claude/buoys.md
```

### 1.2b Update Internal References

After moving files, search and update references:

| File | Update Needed |
|------|---------------|
| .float/context/floatprompt.md | Reading order paths (docs/ → specs/) |
| .float/system.md | Any docs/ references in boot sequence |
| context/float-deepdive.md | Reading order paths |
| context/float-context.md | Any docs/ references |
| context/float-map.md | Any docs/ references |
| Moved files themselves | Cross-references between specs |

**Search pattern:** `grep -r "docs/floatprompt\|docs/doc\|docs/system\|docs/buoys" .`

### 1.3 Update docs/claude.md

Becomes a lightweight integration guide that points to:
- specs/claude/commands.md for command details
- specs/claude/buoys.md for buoy pattern

### 1.4 Create Nav Files

**Create .float/nav/specs.md:**
```markdown
---
title: Specifications
type: nav
ai_updated: 2025-12-29
---

# Specifications

Formal definitions for the FloatPrompt system.

## Contents

| File | Purpose |
|------|---------|
| **floatprompt.md** | FloatPrompt file format specification |
| **doc.md** | floatprompt doc format specification |
| **system.md** | FloatPrompt System architecture |

## Subfolders

| Folder | Purpose |
|--------|---------|
| **claude/** | Claude Code integration specs |

## claude/

| File | Purpose |
|------|---------|
| **commands.md** | /float command system specification |
| **buoys.md** | Float Buoys pattern specification |
```

**Update .float/nav/docs.md:**
- Remove floatprompt.md, doc.md, system.md, buoys.md
- Keep philosophy/, reference/, goals.md, principles.md, voice.md, mds-method.md, use.md, safety.md, claude.md

**Update .float/nav/root.md:**
- Add specs/ to folder list
- Update docs/ description to reflect it now contains guides/philosophy only

### 1.5 Update Structure Map

Update .float/system.md to reflect new structure:
- Add specs/ to structure map
- Add specs/claude/ subfolder
- Update docs/ to show what remains

### 1.6 Verification Checklist

- [ ] specs/ folder exists
- [ ] specs/claude/ folder exists
- [ ] floatprompt.md, doc.md, system.md in specs/
- [ ] buoys.md in specs/claude/
- [ ] docs/claude.md updated to point to specs
- [ ] .float/nav/specs.md created
- [ ] .float/nav/docs.md updated
- [ ] .float/nav/root.md updated (specs/ added)
- [ ] .float/system.md structure map updated
- [ ] Internal references updated (grep returns no docs/floatprompt, docs/doc, docs/system, docs/buoys)
- [ ] No broken references

---

## Phase 2: Build Command System

### 2.1 Create specs/claude/commands.md (CHECKPOINT)

The formal specification covering:
- Command progression (awareness → structure → meaning → quality)
- Each command's duality pattern (detailed)
- Status + next step convention (exact format)
- Orchestrator behavior (routing logic)
- Tool file references

**USER REVIEW:** Pause after this step for approval before building tools.
This spec becomes the "contract" all tools implement.

### 2.2 Create Tool Floatprompts (parallel, after spec approved)

**Location:** .float/tools/

| File | Command | Duality |
|------|---------|---------|
| float.md | /float | No .float → Init / Has .float → Boot |
| float-sync.md | /float sync | Issues → Fix / Clean → Report OK |
| float-context.md | /float context | No context → Generate / Has context → Load |
| float-enhance.md | /float enhance | Weak content → Improve / High quality → Report OK |

**Each tool includes:**
- `<fp><json>` behavioral specification
- STOP directive for that command
- Requirements specific to command
- Status output format
- Next step recommendations
- Buoy spawning instructions (if applicable)

### 2.3 Rename and Update context-creator.md

```bash
git mv .float/tools/context-creator.md .float/tools/float-context.md
```

**Content updates required:**
- Add/update `<fp><json>` structure to match other tool floatprompts
- Add STOP directive: "Float context command. Generate or load project context."
- Add status output format section
- Add next step recommendations section
- Add duality documentation (No context → Generate / Has context → Load)
- Ensure consistency with float.md, float-sync.md, float-enhance.md structure

### 2.4 Update Orchestrator

**.claude/commands/float.md** becomes slim router:

1. Parse input (/float, /float sync, /float context, /float enhance)
2. Read appropriate tool from .float/tools/float-{command}.md
3. Execute according to tool's instructions
4. Report status + next step

Remove /float describe (absorbed by enhance).

### 2.5 Update Nav Files

**Update .float/nav/float.md:**
- Reflect new tools: float.md, float-sync.md, float-context.md, float-enhance.md
- Remove context-creator.md reference
- Add note: "Command system spec: specs/claude/commands.md"
- Add note: "Buoy pattern spec: specs/claude/buoys.md"

### 2.6 Verification Checklist

- [ ] specs/claude/commands.md exists and complete
- [ ] .float/tools/float.md exists
- [ ] .float/tools/float-sync.md exists
- [ ] .float/tools/float-context.md exists (renamed from context-creator.md)
- [ ] .float/tools/float-enhance.md exists
- [ ] .claude/commands/float.md updated to router pattern
- [ ] /float describe removed
- [ ] .float/nav/float.md updated
- [ ] All commands work when tested

---

## Phase 3: Cleanup

### 3.1 Remove Cursor Parity

```bash
rm .cursor/rules/float.md
```

Or if .cursor/rules/ becomes empty, remove the folder.

### 3.2 Update decisions.md

Add entries for:
- Why /float enhance replaces /float describe
- Why tools live in .float/tools/
- The progression principle (awareness → structure → meaning → quality)
- Why specs/ split from docs/
- Why Option B (clean separation) for orchestrator

### 3.3 Version Bump

Update version to 0.8.0 in:
- package.json (single source of truth)

**Also delete:** .float/.version (redundant, package.json is canonical)

### 3.4 Session Log

Append to .float/logs/2025-12-29.md:
- Summary of restructuring
- New command system
- Files created/moved/deleted

### 3.5 Final Verification

- [ ] All nav files accurate
- [ ] Structure map accurate
- [ ] /float works
- [ ] /float sync works
- [ ] /float context works
- [ ] /float enhance works
- [ ] No orphaned files
- [ ] No broken references
- [ ] Git status clean after commit

---

## Buoy Assignments

### Phase 1 Buoys

| Buoy | Task | Depends On |
|------|------|------------|
| Structure Buoy | Create specs/, specs/claude/ | None (first) |
| Move Buoy | git mv files to specs/ | Structure Buoy |
| Reference Buoy | Update internal references (docs/ → specs/) | Move Buoy |
| Nav Buoy | Create specs.md, update docs.md, update root.md | Move Buoy |
| System Buoy | Update structure map | Move Buoy |
| Claude Doc Buoy | Update docs/claude.md to point to specs | Move Buoy |

### Phase 2 Buoys

| Buoy | Task | Depends On |
|------|------|------------|
| Spec Buoy | Create specs/claude/commands.md | Phase 1 complete |
| — | **USER REVIEW CHECKPOINT** | Spec Buoy |
| Tool Buoy 1 | Create float.md | Spec approved |
| Tool Buoy 2 | Create float-sync.md | Spec approved |
| Tool Buoy 3 | Update float-context.md | Spec approved |
| Tool Buoy 4 | Create float-enhance.md | Spec approved |
| Orchestrator Buoy | Update .claude/commands/float.md | All tool buoys |

**Note:** Tool Buoys 1-4 can run in parallel after spec approval.

### Phase 3 Buoys

| Buoy | Task | Depends On |
|------|------|------------|
| Cleanup Buoy | Remove cursor, update decisions | Phase 2 complete |
| Log Buoy | Session log, version bump | Cleanup Buoy |

---

## Rollback Plan

If something goes wrong:

```bash
git checkout HEAD -- docs/
git checkout HEAD -- .float/
rm -rf specs/
```

All changes are reversible via git.

---

## Success Criteria

1. **Structure is clean:** specs/ for definitions, docs/ for guides
2. **Commands work:** All four /float commands functional
3. **Single source of truth:** Tools in .float/tools/, orchestrator just routes
4. **Status convention:** Every command outputs status + next step
5. **Documentation complete:** specs/claude/commands.md fully specified

---

*Plan created through conversation between @mds and Claude Opus 4.5*
