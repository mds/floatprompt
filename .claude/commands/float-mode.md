---
name: float-mode
description: Create a new mode from session context. Crystallizes understanding into reusable context loadout.
---

# Create Mode

**Crystallize your context investment into a reusable mode.**

After deep work on a topic, run this to capture understanding before handoff. Next session, the mode is ready to activate.

---

## What This Does

1. **Gathers** your focus — what topic/work type?
2. **Searches** decision logs and ref docs for relevant material
3. **Asks** about gaps — prompts you for missing context
4. **Drafts** a mode following the MODES.md framework
5. **Verifies** with you before saving
6. **Registers** in modes/MODES.md

---

## When to Run

- After building significant context around a topic
- When you notice the same docs getting loaded repeatedly
- Before `/float-handoff` to preserve understanding
- When you want future sessions to start where you are now

---

## Usage

```
/float-mode
```

Then follow the prompts. The agent will:
- Ask what the mode is for
- Search for relevant decisions and docs
- Ask clarifying questions if it detects gaps
- Show you a draft for approval
- Save and register once approved

---

## Example

```
You: /float-mode

Agent: What topic should this mode cover?

You: Plugin implementation — Track 1 Claude Code patterns

Agent: I found these relevant materials:
- track1-workshop-plugin-spec.md
- plugin-architecture-exploration.md
- ref/buoys.md

I didn't find Claude Code skill/agent documentation in ref/.
Should I include what's in the spec, or is there more context?

You: The spec has everything, that's fine.

Agent: What role fits this work?
1. Implementer — focused on shipping, pragmatic
2. Architect — systems thinking, trade-offs
3. Other (describe)

You: Implementer

Agent: [Shows draft mode]

You: Looks good, save it.

Agent: Saved to modes/deep-plugin.md
Added to MODES.md Available Modes table.
Activate next session with: "activate deep-plugin mode"
```

---

## After Creating

- Run `/float-handoff` to close the session
- Next session: "activate [mode-name] mode" to load the context
- Mode persists — future sessions inherit your understanding

---

*Capture context before it's gone. Modes compound understanding.*
