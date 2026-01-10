# Skills/Commands Refactor Plan

**Date:** 2026-01-10
**Session:** 53
**Status:** Gaps Identified — Resolve Before Execution
**Confidence:** 85% (gaps must be resolved first)

---

## The Core Insight

**Commands and skills are the same thing now.**

Boris Cherny (Claude Code creator) confirmed this in 2.1.3. The official docs confirm it. Here's the truth:

| Old Pattern | New Pattern | Result |
|-------------|-------------|--------|
| `commands/foo.md` | `skills/foo/SKILL.md` | User types `/foo` → invokes |

The `user-invocable` frontmatter field controls slash menu visibility:
- `user-invocable: true` (default) → Shows in `/` menu
- `user-invocable: false` → Hidden, but Claude can still auto-discover

**A skill with `user-invocable: true` IS a slash command.**

---

## What We Want

Three user-invokable slash commands:

| Command | Purpose | Current State |
|---------|---------|---------------|
| `/float` | Boot session with context | Exists in `commands/` |
| `/float-capture` | Manual mid-session capture | Exists in `commands/` (reported issue) |
| `/float-enrich` | Bulk context enrichment | **DOESN'T EXIST** |

Plus one model-invokable skill:

| Skill | Purpose | Current State |
|-------|---------|---------------|
| `float-context` | Proactive context lookup | Exists in `skills/` ✓ |

---

## Current State (The Problem)

```
plugins/floatprompt/
├── commands/                    # OLD pattern
│   ├── float.md                 # 291 lines
│   └── float-capture.md         # 115 lines
├── skills/                      # NEW pattern
│   └── float-context/
│       └── SKILL.md             # 136 lines (correct format)
├── agents/
├── hooks/
├── lib/
└── plugin.json                  # References BOTH directories
```

**plugin.json currently:**
```json
{
  "commands": "./commands/",
  "skills": "./skills/"
}
```

**Problems:**
1. Mixed patterns cause confusion
2. `/float-capture` reportedly didn't invoke (possibly due to old format)
3. `/float-enrich` doesn't exist
4. `plugin.json` references deprecated `commands/` directory

---

## Target State (The Solution)

```
plugins/floatprompt/
├── skills/                      # ONE pattern, consistent
│   ├── float/
│   │   └── SKILL.md             # /float - boot
│   ├── float-capture/
│   │   └── SKILL.md             # /float-capture - capture
│   ├── float-enrich/
│   │   └── SKILL.md             # /float-enrich - enrich (NEW)
│   └── float-context/
│       └── SKILL.md             # Model-invoked lookup (exists)
├── agents/                      # Unchanged
├── hooks/                       # Unchanged
├── lib/                         # Unchanged
└── plugin.json                  # Updated (no commands reference)
```

**plugin.json after:**
```json
{
  "name": "floatprompt",
  "version": "1.0.0",
  "description": "The invisible OS for AI-persistent context that survives sessions and compounds over time",
  "author": {
    "name": "@mds"
  },
  "agents": "./agents/",
  "skills": "./skills/",
  "hooks": "./hooks/hooks.json",
  "homepage": "https://github.com/mds/floatprompt"
}
```

**Note:** `"commands"` line removed entirely.

---

## The Four Skills

### 1. `/float` — Boot (User-Invoked)

**File:** `skills/float/SKILL.md`

```yaml
---
name: float
description: Boot FloatPrompt session. Orients AI with persistent context from float.db. Use at session start, when user says "/float" or "boot".
user-invocable: true
---
```

**What it does:**
- Run boot.sh to gather context from float.db
- Present session state (last handoff, recent decisions, open questions)
- Offer to pick up where left off
- Handle first-run initialization if needed

**Content:** Keep existing `commands/float.md` content, update frontmatter only.

---

### 2. `/float-capture` — Capture (User-Invoked)

**File:** `skills/float-capture/SKILL.md`

```yaml
---
name: float-capture
description: Capture session context to float.db. Use mid-session to save significant work, after completing a feature, or before risky operations.
user-invocable: true
---
```

**What it does:**
- Gather session data (files changed, decisions made)
- Run capture script
- Spawn agents for enrichment
- Write handoff.md
- Report what was saved

**Content:** Keep existing `commands/float-capture.md` content, update frontmatter only.

---

### 3. `/float-enrich` — Enrich (User-Invoked, NEW)

**File:** `skills/float-enrich/SKILL.md`

```yaml
---
name: float-enrich
description: Build AI context for your codebase. Spawns parallel agents to analyze folders and write understanding to float.db. Use after initialization, when folders are stale, or for bulk enrichment.
user-invocable: true
---
```

**What it does:**
1. Query float.db for pending/stale folders
2. Batch into groups of ~20
3. Spawn float-enrich agents in parallel
4. Wait for completion
5. Report results

**Content:** New skill, full content below.

---

### 4. `float-context` — Lookup (Model + User Invoked)

**File:** `skills/float-context/SKILL.md` (already exists)

```yaml
---
name: float-context
description: Query float.db for full context on a file or folder. Use when user mentions a path, asks about folder context, says "what do we know about X?", or BEFORE modifying any unfamiliar code. Proactive use prevents mistakes.
user-invocable: true
---
```

**What it does:**
- Query folder context, locked decisions, open questions
- Surface warnings about staleness
- Show scope chain

**Content:** Keep existing, no changes needed.

---

## /float-enrich Full Content (New Skill)

```markdown
---
name: float-enrich
description: Build AI context for your codebase. Spawns parallel agents to analyze folders and write understanding to float.db. Use after initialization, when folders are stale, or for bulk enrichment.
user-invocable: true
---

# /float-enrich — Build Context

**Teach AI about your codebase with parallel agents.**

---

## When to Run

- After `/float` initialization (if you skipped enrichment offer)
- When you see folders with `pending` or `stale` status
- When you want to refresh understanding for a section of code
- Before a major work session to ensure context is fresh

---

## Usage

```
/float-enrich              # Enrich all pending/stale folders
/float-enrich /src/auth    # Enrich specific subtree only
```

---

## The Process

### Step 1: Find Folders Needing Enrichment

Query float.db for folders without current context:

```bash
sqlite3 .float/float.db "SELECT path FROM folders WHERE status IN ('pending', 'stale') ORDER BY path"
```

If a path argument was provided, filter:
```bash
sqlite3 .float/float.db "SELECT path FROM folders WHERE status IN ('pending', 'stale') AND path LIKE '/src/auth%' ORDER BY path"
```

Report to user: "Found X folders needing enrichment."

If zero folders found: "All folders have current context. Nothing to enrich."

---

### Step 2: Batch and Spawn Agents

Group folders into batches of approximately 20 folders each.

For each batch, spawn a float-enrich agent using the Task tool:

```
Task tool:
  subagent_type: floatprompt:float-enrich
  prompt: |
    Enrich these folders in float.db:
    [list of ~20 folder paths]

    For each folder:
    1. Read the folder's files to understand what it contains
    2. Generate a description (1-2 sentences: what this folder IS)
    3. Generate context (what it means, patterns, how it relates to the project)
    4. Write to float.db using sqlite3
    5. Mark the folder as status='current'
```

**Spawn multiple batches in parallel** for speed. Don't wait for one batch to finish before starting the next.

---

### Step 3: Wait and Report

Wait for all agent batches to complete.

Query the results:
```bash
sqlite3 .float/float.db "SELECT status, COUNT(*) FROM folders GROUP BY status"
```

Report to user:
- Folders enriched: X
- Total folders now current: Y/Z
- Any errors encountered

---

## What Each Agent Does

The `floatprompt:float-enrich` agent handles each folder:

1. **Read** — Examine files in the folder (glob, read key files)
2. **Understand** — Form understanding of purpose, patterns, relationships
3. **Generate description** — Short orientation (1-2 sentences)
4. **Generate context** — Deeper understanding (what, why, patterns, insights)
5. **Write** — Update float.db via sqlite3:
   ```bash
   sqlite3 .float/float.db "UPDATE folders SET description='...', context='...', status='current', ai_model='claude-...', ai_updated=strftime('%s','now') WHERE path='/folder/path'"
   ```

---

## After Enrichment

Your float.db now has AI-generated context for each folder.

- Next `/float` will boot with full understanding
- `float-context` skill can surface this context when working
- Folders are marked `current` until files change (then `stale`)

---

## The Enrichment Loop

```
/float → Boot with existing context
Work → Learn things, make changes
/float-enrich → Build/refresh context (or automatic via hooks)
Next /float → Boot with richer understanding
```

Context compounds over time. Each enrichment makes future sessions smarter.
```

---

## Migration Steps

### Step 1: Create New Skill Directories

```bash
cd /Users/mds/Documents/_Github/floatprompt/plugins/floatprompt

# Create directories for moved skills
mkdir -p skills/float
mkdir -p skills/float-capture
mkdir -p skills/float-enrich
```

### Step 2: Move Existing Files

```bash
# Move and rename
mv commands/float.md skills/float/SKILL.md
mv commands/float-capture.md skills/float-capture/SKILL.md
```

### Step 3: Update Frontmatter

Edit `skills/float/SKILL.md`:
- Ensure `name: float`
- Ensure `user-invocable: true`
- Keep description clear and keyword-rich

Edit `skills/float-capture/SKILL.md`:
- Ensure `name: float-capture`
- Ensure `user-invocable: true`

### Step 4: Create /float-enrich

Create `skills/float-enrich/SKILL.md` with the full content above.

### Step 5: Update plugin.json

Remove the `"commands"` line:

```json
{
  "name": "floatprompt",
  "version": "1.0.0",
  "description": "The invisible OS for AI-persistent context that survives sessions and compounds over time",
  "author": {
    "name": "@mds"
  },
  "agents": "./agents/",
  "skills": "./skills/",
  "hooks": "./hooks/hooks.json",
  "homepage": "https://github.com/mds/floatprompt"
}
```

### Step 6: Delete Old Directory

```bash
rm -r commands/
```

### Step 7: Test All Skills

| Test | Expected Result |
|------|-----------------|
| `/float` | Boots session, shows context from float.db |
| `/float-capture` | Captures session, spawns agents, writes to float.db |
| `/float-enrich` | Shows folders needing enrichment, spawns parallel agents |
| "What do we know about /src?" | `float-context` activates, shows folder context |

---

## Verification Checklist

After migration:

- [ ] `plugins/floatprompt/commands/` directory no longer exists
- [ ] `plugins/floatprompt/skills/` contains: float/, float-capture/, float-enrich/, float-context/
- [ ] Each skill has `SKILL.md` with proper YAML frontmatter
- [ ] `plugin.json` no longer references `commands`
- [ ] `/float` invokes correctly
- [ ] `/float-capture` invokes correctly
- [ ] `/float-enrich` invokes correctly
- [ ] `float-context` triggers on "what do we know about X?"

---

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| `/float` stops working after move | Low | Test immediately after migration |
| Frontmatter format incorrect | Low | Copy exact format from working float-context |
| float-enrich agent spawning fails | Medium | Test with small batch first |
| plugin.json change breaks loading | Low | Keep backup, can revert quickly |

---

## Relationship to Other Work

| Work Item | Relationship |
|-----------|--------------|
| Phase 6 Distribution | This is prerequisite — clean up before publish |
| Rust Scanner | Independent — scanner is about performance |
| FTS5 File Suggestion | Deferred — future optimization |

---

## Gaps to Address (Before Execution)

### Gap 1: Project `.claude/commands/` Not Addressed

**Status:** UNRESOLVED

**Problem:** The plan focuses on `plugins/floatprompt/` but the project also has:
```
.claude/commands/
├── float-boot.md      # Project-specific (reads .float-workshop/)
├── float-handoff.md   # Workshop handoff orchestration
└── float-mode.md      # Mode system
```

Should these also migrate to `.claude/skills/`?

**Options:**
- A) Yes, migrate to `.claude/skills/` with same pattern
- B) No, leave as-is (commands/ still works for backwards compat)
- C) Defer — address in separate task

**Recommendation:** Option A — consistency matters. If plugin uses `skills/`, project should too.

**If Option A, add these steps:**
```bash
mkdir -p .claude/skills/float-boot
mkdir -p .claude/skills/float-handoff
mkdir -p .claude/skills/float-mode

mv .claude/commands/float-boot.md .claude/skills/float-boot/SKILL.md
mv .claude/commands/float-handoff.md .claude/skills/float-handoff/SKILL.md
mv .claude/commands/float-mode.md .claude/skills/float-mode/SKILL.md

rm -r .claude/commands/
```

---

### Gap 2: Argument Handling for `/float-enrich`

**Status:** UNRESOLVED

**Problem:** The skill shows:
```
/float-enrich /src/auth    # Enrich specific subtree
```

But HOW does the skill receive that argument? The plan doesn't specify the mechanism.

**Research needed:**
- How do Claude Code skills receive arguments?
- Is it via `$ARGUMENTS` variable? Parsed from prompt? Something else?

**Options:**
- A) Arguments passed in prompt, skill parses them manually
- B) Claude Code has built-in argument handling (need to verify)
- C) Remove argument support for v1, add later

**Recommendation:** Research official docs on skill arguments before implementing.

---

### Gap 3: Agent/Skill Interface Mismatch (HIGH PRIORITY)

**Status:** UNRESOLVED

**Problem:** The existing `float-enrich` agent expects:
```markdown
## Inputs (provided via environment)

- `FOLDERS_EDITED` — JSON array of folders containing changes
- `FLOAT_DB` — Path to .float/float.db
```

But the `/float-enrich` skill would spawn the agent with folder list in the prompt, not environment variables.

**The agent was designed for hooks, not skills.**

**Options:**
- A) **Modify existing agent** — Handle both env vars AND prompt-based input
- B) **Create new agent** — `float-enrich-bulk.md` for skill, keep existing for hooks
- C) **Create wrapper script** — Skill calls script that sets env vars and spawns agent
- D) **Pass env vars from skill** — If Task tool supports environment variable passing

**Recommendation:** Option A — modify agent to detect input source:
```markdown
## Inputs

**From hook (environment variables):**
- `FOLDERS_EDITED` — JSON array
- `FLOAT_DB` — Path to float.db

**From skill (prompt-based):**
- Folder list provided directly in prompt
- Derive FLOAT_DB from project root (.float/float.db)

**Detection:** If `FOLDERS_EDITED` env var exists, use it. Otherwise, parse folder list from prompt.
```

---

### Gap 4: Testing Procedure Vague

**Status:** UNRESOLVED

**Problem:** "Test All Skills" doesn't specify HOW to test.

**Questions:**
- Test in same session or new session?
- Test in this project or fresh project?
- What constitutes "working"?
- How to test model-invoked discovery?

**Proposed Testing Procedure:**

1. **Environment:** New Claude Code session in floatprompt project

2. **Test `/float`:**
   ```
   Type: /float
   Expected: Boots session, shows last handoff, recent decisions, stats
   Pass if: Context from float.db is displayed
   ```

3. **Test `/float-capture`:**
   ```
   Type: /float-capture
   Expected: Shows files changed, spawns agents, writes to float.db
   Pass if: New log_entry created in float.db
   ```

4. **Test `/float-enrich`:**
   ```
   Type: /float-enrich
   Expected: Queries pending/stale folders, spawns agents
   Pass if: Folders marked as 'current' after completion
   ```

5. **Test `float-context` (user-invoked):**
   ```
   Type: What do we know about /src?
   Expected: float-context skill activates, shows folder context
   Pass if: Context from float.db is displayed
   ```

6. **Test `float-context` (model-invoked):**
   ```
   Type: Fix the bug in /plugins/floatprompt/lib/boot.sh
   Expected: Claude checks float-context before modifying
   Pass if: Claude mentions checking context (may not always trigger)
   ```

---

### Gap 5: Skill Discovery Registration

**Status:** NEEDS VERIFICATION

**Problem:** When skills move from `commands/` to `skills/`, does Claude Code automatically discover them? Or does something need to be registered?

**Questions:**
- Does removing `"commands": "./commands/"` from plugin.json break anything?
- Does `"skills": "./skills/"` auto-discover all subdirectories?
- Is there a cache that needs clearing?

**Verification needed:** Test that skills are discovered after migration.

---

## Open Questions (Low Priority)

1. **Should float-enrich have --force flag?** — Re-enrich even if current?
2. **Optimal batch size?** — 20 is a guess, might need tuning
3. **Should float-enrich run in background?** — Current plan is blocking with progress

These can be refined after basic migration works.

---

## Gap Resolution Checklist

Before executing migration:

- [ ] **Gap 1:** Decide on project `.claude/commands/` — migrate or defer?
- [ ] **Gap 2:** Research skill argument handling mechanism
- [ ] **Gap 3:** Update float-enrich agent to handle both env vars and prompt input
- [ ] **Gap 4:** Confirm testing procedure is adequate
- [ ] **Gap 5:** Verify skill discovery works after migration

---

## Summary

**The change is straightforward in principle:**

1. Move `commands/*` → `skills/*/SKILL.md`
2. Update frontmatter to proper format
3. Create new `/float-enrich` skill
4. Update `plugin.json` (remove commands reference)
5. Delete old `commands/` directory
6. Test all four skills

**However, 5 gaps must be resolved first:**

| Gap | Priority | Status |
|-----|----------|--------|
| Gap 1: Project `.claude/commands/` | Medium | Decision needed |
| Gap 2: Argument handling | Medium | Research needed |
| Gap 3: Agent/Skill interface | **High** | Must fix before `/float-enrich` works |
| Gap 4: Testing procedure | Low | Proposed, needs confirmation |
| Gap 5: Skill discovery | Low | Verification needed |

**Confidence: 85%** — Core pattern is solid, but Gap 3 is a real blocker for `/float-enrich`.

---

*NOT ready for execution. Resolve gaps first.*
