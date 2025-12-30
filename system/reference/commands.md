---
title: Float Command System
type: spec
version: 0.12.0
created: 2025-12-29

human_author: @mds
human_intent: Define the /float command system for Claude Code integration
human_context: Formal specification that tools implement

ai_model: Claude Opus 4.5
ai_updated: 2025-12-30
ai_notes: |
  Created as part of Float Command System implementation.
  This spec is the "contract" that all tool floatprompts implement.
  v0.12.0: Updated for system/ restructure, clarified source vs deployed paths.
---

# Float Command System

Specification for the `/float` command family in Claude Code. Five commands that progress from awareness to quality.

## Command Progression

```
/float           Awareness   (boot/init)
/float sync      Structure   (nav ↔ folders)
/float fix       Content     (references ↔ reality)
/float context   Meaning     (terrain map)
/float enhance   Quality     (make it better)
/float all       Full sweep  (run all in sequence)
```

Each command increases depth. Use the lightest command that accomplishes the task.

`/float all` orchestrates the full sequence when you want comprehensive health check.

---

## The Spectrum: Speed to Quality

Commands and their internal operations exist on a spectrum from mechanical speed to AI synthesis.

```
[Fast/Mechanical]                                         [Slow/Synthetic]
       |                                                        |
    Shell         Shell+AI        AI Generate      AI Synthetic
   commands    →  interpret   →    content     →    reasoning
       |             |               |                  |
   ls, grep      Check Buoy     Describe Buoy     Context Buoy
   diff, wc      (compare)        (create)        (synthesize)
```

**Principle:** Use the lightest approach that accomplishes the task.

| Operation | Approach | Example |
|-----------|----------|---------|
| File exists? | Shell | `test -f .float/system.md` |
| Count files in folder | Shell | `ls docs/ \| wc -l` |
| Find nav entries | Shell | `grep "^\| \*\*" nav/docs.md` |
| Compare nav to folder | Shell + AI | Shell gathers, AI interprets diff |
| Generate description | AI (Haiku) | Read file, produce one line |
| Create terrain map | AI (Full) | Read many files, synthesize relationships |

**Future enhancement:** `/float` could use shell commands internally for faster health checks without API calls.

---

## Architecture

The orchestrator routes to tool floatprompts. Tools are the source of truth.

**Source (this repo):**
```
system/tools/float.md               Source of truth (maintainers edit here)
system/tools/float-sync.md
system/tools/float-fix.md
...
```

**Deployed (user projects):**
```
.claude/commands/float.md           Orchestrator (routes based on input)
        ↓
.float/core/tools/float.md               Boot/init tool
.float/core/tools/float-sync.md          Structure integrity tool
.float/core/tools/float-fix.md           Content integrity tool
.float/core/tools/float-context.md       Meaning generation tool
.float/core/tools/float-enhance.md       Quality improvement tool
.float/core/tools/float-all.md           Full health check orchestrator
```

See [deployment.md](../guides/deployment.md) for how tools flow from source to users.

**Orchestrator responsibilities:**
1. Parse input (`/float`, `/float sync`, `/float fix`, `/float context`, `/float enhance`)
2. Read the appropriate tool from `.float/core/tools/float-{command}.md`
3. Execute according to tool's instructions
4. Report status + next step

**Tool responsibilities:**
- Define duality (if X / then Y)
- Define buoy spawning (if applicable)
- Define status output format
- Define next step recommendations

---

## Duality Pattern

Each command handles two states of the same concern.

| Command | Condition | Action |
|---------|-----------|--------|
| `/float` | No `.float/` exists | Init: create folder structure, auto-boot |
| `/float` | Has `.float/` | Boot: read files, quick health check |
| `/float sync` | Issues found | Show details, propose fixes, apply with approval |
| `/float sync` | Clean | Report OK |
| `/float fix` | Issues found | Report targets, propose fixes, apply with approval |
| `/float fix` | Clean | Report OK |
| `/float context` | No context file | Generate terrain map |
| `/float context` | Has context file | Load deep, follow reading order |
| `/float enhance` | Weak/stale content | Improve with approval |
| `/float enhance` | High quality | Report OK, nothing to enhance |
| `/float all` | Issues found | Run full sequence, fix, report |
| `/float all` | Already healthy | Fast path, report OK |

---

## Status Output Convention

Every command outputs status. Format varies by command.

### /float (boot) — includes Context line

```
FloatPrompt operational.
Directory: [path]
Context: [Loaded | Missing]
Status: [No issues found | N issues found]

[Next step or "Ready for: human direction"]
```

### Other commands — no Context line

```
FloatPrompt [command] complete.
Directory: [path]
Status: [result]

[Next step or "Ready for: human direction"]
```

---

## Next Step Decision Logic

After each command, recommend the logical next step.

### /float (boot)

```
Issues found?
  → Yes: "Next: Run /float sync to see details and fix"
  → No: Context missing?
         → Yes: "Next: Run /float context to generate terrain map"
         → No: "Ready for: human direction"
```

### /float sync

```
Changes applied?
  → Yes: [needs description] placeholders exist?
          → Yes: "Next: Run /float enhance to fill descriptions"
          → No: "Ready for: human direction"
  → No (clean): "Ready for: human direction"
```

### /float context

```
Generated new context?
  → Yes: "Next: Run /float to boot with full context"
  → No (loaded existing): "Ready for: human direction"
```

### /float enhance

```
Always: "Ready for: human direction"
```

---

## Approval Behavior

Commands that modify files require approval.

### Approval prompt format

```
[Summary of proposed changes]

Apply changes? (y/n):
```

### User responses

| Response | Action |
|----------|--------|
| `y` or `yes` | Apply all proposed changes |
| `n` or `no` | Cancel, no changes made |
| Specific feedback | Address feedback, re-propose |

### Batch approval

For multiple similar changes (e.g., 10 descriptions), offer batch options:

```
Descriptions generated:
  file1.md → "Description 1"
  file2.md → "Description 2"
  ...

[accept all / review each / skip]:
```

---

## Error Handling

### Buoy Failures

```
If buoy fails:
  1. Log the failure
  2. Continue with other buoys (don't block)
  3. Report partial results to user
  4. Offer to retry failed operations
```

### File Access Errors

```
If file cannot be read:
  1. Skip that file
  2. Note in results: "⚠️ Could not read [file]: [reason]"
  3. Continue with remaining files
```

### User Declines Approval

```
If user says 'n':
  1. Report: "No changes made."
  2. Preserve proposed changes in memory
  3. User can re-run command to see proposals again
```

---

## Command Details

### /float

**Purpose:** Boot the FloatPrompt System or initialize if none exists.

**Duality:**
- No `.float/system.md` → Init sequence
- Has `.float/system.md` → Boot sequence

**Init sequence:**
1. Create `.float/` folder structure (meta/ and project/ subdirectories)
2. Create `system.md` boot loader
3. Create `project/nav/*.md` for each visible folder (shell detects all, excluding standard exclusions)
4. Create `project/logs/` directory
5. Auto-boot the newly created system

**Boot sequence:**
1. Read `.float/system.md`
2. Read `.float/project/context/project-decisions.md` (if exists)
3. Read `.float/project/context/*.md` (if exists)
4. Read ALL `.float/project/nav/*.md` files
5. Read today's session log (if exists)
6. Quick integrity check (count issues only, no details)
7. Report status + next step

**Shell optimization (future):**
```bash
# Could replace AI file counting with:
ls .float/project/nav/*.md | wc -l   # count nav files
ls docs/ | wc -l                      # count folder contents
```

**Buoys:** None (fast operation, no spawning)

**Tool:** `.float/core/tools/float.md`

---

### /float sync

**Purpose:** Verify nav files match reality and fix discrepancies.

**Duality:**
- Issues found → Show, propose, fix with approval
- Clean → Report OK

**Process:**
1. **Detect** (shell-assisted where possible)
   - List actual files in each folder
   - Parse nav file tables
   - Compare and identify discrepancies
2. **Report** issues with details
3. **Propose** fixes
4. **Wait** for approval
5. **Fix** via targeted buoys
6. **Validate** orchestrator checks buoy work
7. **Log** activity to session log

**What it checks:**
- Nav coverage (every visible folder has nav file)
- Table accuracy (files in nav match actual folder)
- Subfolder accuracy (subfolders in nav match actual)
- Structure map accuracy (system.md matches reality)

**Buoys:** See Buoy Assignments section

**Tool:** `.float/core/tools/float-sync.md`

---

### /float context

**Purpose:** Generate or load project context for deep understanding.

**Duality:**
- No context file → Generate terrain map
- Has context file → Load and follow reading order

**Regeneration:** Delete context file to force regeneration. No special command needed.

**Generate sequence:**
1. Scan system.md, nav/*.md, README, key entry points
2. Ask clarifying questions if uncertain (1-3 max)
3. Generate `.float/project/context/{project-name}.md` with meaningful name
4. Offer decision capture ("Build deeper context?")
5. If yes: prompt for decisions, save to `decisions.md`

**Load sequence:**
1. Read `.float/project/context/*.md` files
2. Follow reading order specified in terrain map
3. Read files in order to build rich mental model
4. Report understanding depth

**Difference from /float boot:**
- Boot: Quick read of context files for awareness
- Context load: Deep read following reading order for understanding

**Buoys:**
- Context Buoy (generate terrain map)

**Tool:** `.float/core/tools/float-context.md`

---

### /float enhance

**Purpose:** Improve content quality. Replaces `/float describe`.

**Duality:**
- Weak/stale content → Improve with approval
- High quality → Report OK

**What it enhances:**
1. `[needs description]` placeholders in nav files
2. Stale descriptions that don't match file contents
3. Outdated references in context files
4. Weak descriptions (too generic, too short)

**Process:**
1. **Scan** (shell-assisted)
   - `grep -r "\[needs description\]" .float/project/nav/` for placeholders
   - Compare descriptions to file contents for staleness
2. **Report** what needs enhancement
3. **Wait** for approval
4. **Spawn** Describe Buoys for descriptions (parallel, Haiku model)
5. **Spawn** Reference Buoy for stale references
6. **Validate** orchestrator reviews generated content
7. **Apply** with final approval

**Buoys:**
- Describe Buoy (generate descriptions, model: haiku)
- Reference Buoy (fix stale references)

**Tool:** `.float/core/tools/float-enhance.md`

---

## Buoy Design Principles

### The Goldilocks Rule

**Too narrow:** "Read line 5 of file X" — wasteful overhead, no useful context
**Too wide:** "Fix all problems in the project" — unpredictable, unfocused, hard to validate
**Just right:** "Read this file, return one-line description" — clear input, clear output, bounded scope

### Task Sizing Guidelines

| Good Buoy Task | Bad Buoy Task |
|----------------|---------------|
| Single clear objective | Multiple unrelated objectives |
| Bounded scope (1-3 files) | Unbounded scope |
| Predictable output format | Freeform output |
| Can be validated | Can't tell if it succeeded |

### Orchestration Pattern

**Two workers + one checker:**
```
Shell gathers raw data (fast, mechanical)
           ↓
    ┌──────┴──────┐
Buoy 1          Buoy 2    (parallel work)
    └──────┬──────┘
           ↓
   Orchestrator validates
           ↓
      Apply if valid
```

This pattern ensures:
- Speed where possible (shell)
- Parallelism where beneficial (buoys)
- Quality control before changes (validation)

---

## Buoy Assignments

### /float sync

| Phase | Buoy | Task | Model |
|-------|------|------|-------|
| Check | Check Buoy | Verify one nav file vs folder | general-purpose |
| Fix | Nav Buoy | Update file table in one nav file | general-purpose |
| Fix | System Buoy | Update structure map | general-purpose |
| Fix | Scaffold Buoy | Create one new nav file | general-purpose |
| Log | Log Buoy | Append to session log | general-purpose |

**Parallelization:** Check Buoys run in parallel (one per nav file). Fix Buoys run in parallel where independent.

### /float fix

| Phase | Buoy | Task | Model |
|-------|------|------|-------|
| Check | Scan Buoy | Detect inconsistencies in one file | general-purpose |
| Check | Related Buoy | Validate related field links in one file | general-purpose |
| Check | Trace Buoy | Follow reference chains for one pattern | general-purpose |
| Fix | Repair Buoy | Apply approved fix to one file | general-purpose |
| Log | Log Buoy | Append to session log | general-purpose |

**Parallelization:** Scan/Related Buoys run in parallel (one per target file). Repair Buoys run in parallel for independent files.

### /float context

| Phase | Buoy | Task | Model |
|-------|------|------|-------|
| Generate | Context Buoy | Create terrain map | general-purpose |

### /float enhance

| Phase | Buoy | Task | Model |
|-------|------|------|-------|
| Describe | Describe Buoy | Generate one file description | haiku |
| Fix | Reference Buoy | Fix stale references in one file | general-purpose |

**Parallelization:** Multiple Describe Buoys run in parallel (batched).

---

## Buoy Prompts

**Tools are the source of truth for buoy prompts.** See:

| Buoy | Prompt Location |
|------|-----------------|
| Check Buoy | `.float/core/tools/float-sync.md` |
| Nav Buoy | `.float/core/tools/float-sync.md` |
| System Buoy | `.float/core/tools/float-sync.md` |
| Scaffold Buoy | `.float/core/tools/float-sync.md` |
| Log Buoy | `.float/core/tools/float-sync.md` |
| Scan Buoy | `.float/core/tools/float-fix.md` |
| Related Buoy | `.float/core/tools/float-fix.md` |
| Trace Buoy | `.float/core/tools/float-fix.md` |
| Repair Buoy | `.float/core/tools/float-fix.md` |
| Context Buoy | `.float/core/tools/float-context.md` |
| Describe Buoy | `.float/core/tools/float-enhance.md` |
| Reference Buoy | `.float/core/tools/float-enhance.md` |

---

## Exclusions

These are never flagged as issues:

- Dotfiles (`.DS_Store`, `.gitignore`, etc.)
- `.float/` folder itself
- `node_modules/`, `dist/`, `build/`, `.git/`
- Lock files (`*.lock`, `package-lock.json`)

---

## Tool Floatprompt Structure

Each tool follows this structure:

```
<fp>
<json>
{
  "STOP": "Float [command] tool. [One-line description].",

  "meta": {
    "title": "/float [command]",
    "id": "float-[command]",
    "format": "floatprompt",
    "version": "0.9.0"
  },

  "human": {
    "author": "@mds",
    "intent": "[What this command accomplishes]",
    "context": "[When to use this command]"
  },

  "ai": {
    "role": "[Role when executing this command]",
    "behavior": "[Key behaviors]"
  },

  "requirements": {
    "duality": {
      "condition_a": "[First state]",
      "action_a": "[What to do]",
      "condition_b": "[Second state]",
      "action_b": "[What to do]"
    },
    "status_format": "[Expected output format]",
    "next_step_logic": "[Decision tree for recommendations]",
    "buoys": {
      "[buoy_name]": "[when and how to spawn]"
    }
  }
}
</json>
<md>
# /float [command]

[Full documentation in markdown]

## Purpose
## Duality
## Process
## Status Output
## Next Step Recommendations
## Buoy Spawning
## Examples
</md>
</fp>
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.8.0 | 2025-12-29 | Initial spec. Replaces /float describe with /float enhance. Adds spectrum concept, buoy sizing, error handling. |
| 0.9.0 | 2025-12-29 | Updated paths for meta/project structure. Tools now at `.float/core/tools/`. |
| 0.12.0 | 2025-12-30 | Clarified source vs deployed paths. Added link to deployment.md. |

---

*Spec created by @mds and Claude Opus 4.5*
