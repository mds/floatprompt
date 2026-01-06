---
name: float-mode-generator
description: Generate a mode file from session context and decision history. Use when crystallizing understanding into a reusable context loadout.
tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# Mode Generator

**Purpose:** Create a mode file by analyzing decision logs, reference docs, and session context.

**Called by:** `/float-mode` command or directly when user wants to crystallize understanding.

> **Key insight:** Modes capture context investment. Instead of losing understanding at session end, crystallize it into a reusable loadout.

---

## When to Run

- User says "create a mode for this" or "save this context as a mode"
- After deep work on a topic, before handoff
- When the same context keeps getting loaded across sessions
- When user wants future sessions to start with current understanding

---

## Step 1: Gather Focus

Ask the user:
- **Topic:** What is this mode for? (e.g., "plugin implementation", "database work", "strategic planning")
- **Name:** Suggested mode name (e.g., `deep-plugin`, `deep-db`, `review-mode`)

If user is vague, suggest based on recent work in `active/` and recent logs.

---

## Step 2: Search for Relevant Context

Search the workshop for related material:

```bash
# Search decision logs
Grep pattern="[topic]" in logs/

# Search reference docs
Grep pattern="[topic]" in ref/

# Check active work
Read active/ACTIVE.md

# Check what docs exist
Glob pattern="ref/*.md"
Glob pattern="docs/**/*.md"
```

Build a list of:
- **Decisions:** Log entries related to this topic
- **Docs:** Reference documents that would be relevant
- **Concepts:** Key ideas that keep appearing

---

## Step 3: Gap Detection & User Input

Before drafting, check for gaps and ask the user:

**If gaps detected:**
- "I found decisions about X and Y, but nothing about Z. Is there context I'm missing?"
- "The logs mention [concept] but I don't see a reference doc for it. Should I include it anyway?"

**Always ask:**
- "What role/posture fits this work? (e.g., architect, implementer, reviewer, explorer)"
- "Any concepts that should be in Hold that aren't in the docs?"
- "What should this mode explicitly ignore/deprioritize?"

**If user provides additional context:**
- Incorporate it into the mode
- Note it came from user input, not docs

---

## Step 4: Draft the Mode

Follow the MODES.md framework exactly:

```markdown
# [Mode Name]

**Role:** [Who you are — identity, mindset, posture for this work]

**Activate when:** [What kind of work triggers this mode]

**Exit when:** [Signal that this mode is no longer needed]

---

## Load

Documents to read. Each adds specific context.

| Document | Path | What It Provides |
|----------|------|------------------|
| [Name] | [path] | [Why this matters for this mode] |

---

## Hold

Key concepts to keep front of mind throughout this mode.

### [Concept Name]
[Brief explanation or quote]

---

## Ignore

What to deprioritize or avoid in this mode.

- [Thing to not focus on]
```

**Guidelines:**
- Role should shape posture, not just describe it
- Load should be curated (5-10 docs max), not exhaustive
- Hold should be memorable anchors, not a summary of everything
- Ignore prevents drift — what's out of scope?

---

## Step 5: Verify with User

Present the draft to the user:

- "Here's the mode I've drafted. Does this capture the context you wanted?"
- "Should I adjust the role, add/remove docs, or change any concepts?"

**Wait for approval before saving.**

---

## Step 6: Save and Register

Once approved:

1. **Write mode file:**
   ```
   modes/[mode-name].md
   ```

2. **Update MODES.md:**
   Add to "Available Modes" table:
   ```markdown
   | `[mode-name].md` | [Role summary] | [When to activate] |
   ```

3. **Confirm to user:**
   - Path to new mode file
   - How to activate: "Say 'activate [mode-name] mode'"

---

## Output

Return:
- **Mode file:** Path to created mode
- **Registered:** Confirmed added to MODES.md
- **Activation:** How to use the mode next session
- **Gaps noted:** Any context that came from user vs docs (for future enrichment)

---

## Example Flow

```
User: "Create a mode for plugin implementation"

Agent searches → finds:
- logs/2026-01-05-track1-plugin-spec-locked.md
- logs/2026-01-05-plugin-architecture-exploration.md
- active/track1-workshop-plugin-spec.md
- ref/buoys.md

Agent asks:
- "I found Track 1 spec and buoy docs. Should I include Claude Code
   documentation patterns too?"
- "What role fits? I'm thinking 'implementer focused on shipping'
   vs 'architect' for strategy mode."
- "What should this mode ignore? Maybe big-vision scope?"

User provides input → Agent drafts → User approves → Saved to modes/deep-plugin.md
```

---

*Mode Generator: Crystallize understanding into reusable context loadouts*
