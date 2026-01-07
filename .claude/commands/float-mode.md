---
name: float-mode
description: Activate an existing mode or create a new one. Modes are context loadouts for different types of work.
---

# Float Mode

**Activate context for this session, or crystallize understanding into a new mode.**

---

## First Step: Detect Session State

Before asking, assess where the user is in their session:

### Early Session Indicators (Default to Activate)
- Just ran `/float-boot` (orientation only, no work yet)
- No substantive edits or tool calls beyond reading
- Short conversation history
- User explicitly wants to "load context" or "get set up"

**Key insight:** Boot context ≠ work context. Boot loads orientation material, but the user hasn't *built* understanding yet. Create is for capturing work, not orientation.

### Deep Session Indicators (Suggest Create)
- Multiple file edits have been made
- Substantive back-and-forth discussion
- Decisions have been made or problems solved
- User mentions wrapping up, handoff, or ending session
- Significant context has been developed through work

### How to Present

**If early session:**
```
You just booted up. Would you like to activate a mode for this session?

Available modes:
1. deep-strategy — Architect role, for architecture decisions and planning
2. [other modes...]

Or: Skip (continue without a mode)
```
Don't even mention "create" — it's not relevant yet.

**If deep into session:**
```
You've built significant context this session. What would you like to do?

1. Create a mode — Capture this understanding before handoff (recommended)
2. Activate a mode — Switch to different context
```
Lead with create, but offer activate as option.

**If ambiguous:**
```
What would you like to do?

1. Activate a mode — Load context for this session
2. Create a mode — Crystallize understanding before handoff
```
Neutral presentation, user decides.

**If mode already active:**
```
You're currently in [mode-name] mode. What would you like to do?

1. Switch modes — Change to a different context
2. Create a mode — Capture current understanding
3. Deactivate — Continue without a mode
```
Acknowledge current state, offer switch/create/deactivate.

---

## Path 1: Activate

If user chooses activate:

1. **Read** `.float-workshop/modes/MODES.md` to get available modes
2. **Present** modes as numbered options using AskUserQuestion:
   - Show mode name, role, and "when to activate" for each
   - Example: "1. deep-strategy — Architect role, for architecture decisions and planning"
3. **Read** the selected mode file (e.g., `modes/deep-strategy.md`)
4. **Load** all documents listed in the mode's "Load" table
5. **Confirm** activation: "Mode activated. I'm now in [role]. Key concepts I'm holding: [list from Hold section]"
6. **Adopt** the role and hold the concepts for the rest of the session

---

## Path 2: Create

If user chooses create:

1. **Analyze** the session — what have you been working on?
2. **Hypothesize** a mode — "Based on this session, I think you want..."
3. **Confirm or redirect** — user approves, corrects, or guides the focus
4. **Search** decision logs and ref docs for relevant material
5. **Ask** about gaps — prompt for missing context
6. **Draft** a mode following the MODES.md framework
7. **Verify** with user before saving
8. **Save** to `modes/[mode-name].md`
9. **Register** in modes/MODES.md Available Modes table

---

## When to Run

**Activate:**
- Start of session when you need specific context
- Switching focus mid-session to different type of work

**Create:**
- After building significant context around a topic
- When you notice the same docs getting loaded repeatedly
- Before `/float-handoff` to preserve understanding

---

## Examples

### Early Session (After Boot)

```
You: /float-boot
Claude: [Reads ACTIVE, LATER, logs, provides orientation]

You: /float-mode

Claude: You just booted up. Would you like to activate a mode for this session?

Available modes:
1. deep-strategy — Architect role, for architecture decisions and planning

Or choose: Skip (continue without a mode)

You: 1

Claude: [Reads deep-strategy.md, loads referenced documents]

Mode activated. I'm now in Architect role — thinking in systems,
trade-offs, and long-term consequences.

Key concepts I'm holding:
- Context is compressed human judgment
- Map → Decide → Structure methodology
- SQLite serves AI (queryable beats navigable)

Ready to work on architecture and strategy.
```

### Deep Session (Before Handoff)

```
[After substantial work — edits, decisions, problem-solving]

You: /float-mode

Claude: You've built significant context this session. What would you like to do?

1. Create a mode — Capture this understanding before handoff (recommended)
2. Activate a mode — Switch to different context

You: 1

Claude: Based on this session, you've been working on:
- Track 1 plugin implementation
- Claude Code native patterns
- Mode system design

I think you want a mode for: **Plugin Implementation**
Is this right, or should I focus on something else?

You: Yes, that's right.

Claude: [Searches for relevant materials, asks clarifying questions]
[Shows draft mode]

You: Looks good, save it.

Claude: Saved to modes/deep-plugin.md
Added to MODES.md Available Modes table.
```

### Mid-Session Switch

```
[Working in deep-strategy mode, but shifting to implementation]

You: /float-mode

Claude: You're currently in deep-strategy mode. What would you like to do?

1. Switch modes — Change to a different context
2. Create a mode — Capture current understanding
3. Deactivate — Continue without a mode

You: 1

Claude: Available modes:
1. deep-strategy — Architect role (currently active)
2. deep-plugin — Implementer role, for plugin development

You: 2

Claude: Switching from deep-strategy to deep-plugin...
[Reads deep-plugin.md, loads referenced documents]

Mode switched. I'm now in Implementer role — focused on shipping,
pragmatic decisions, working code.

Previous context (deep-strategy) released. Now holding:
- Track 1 plugin patterns
- Claude Code native approach
- Skill/agent/command structure
```

---

## Mid-Session Switching

You can switch modes anytime. Common scenarios:

- **Planning → Implementation:** Start in `deep-strategy`, switch to `deep-plugin` when ready to build
- **Implementation → Review:** Switch to a review-focused mode
- **Exploration → Focused work:** Start without a mode, activate one when direction is clear

When switching:
- Previous mode context is released
- New mode context is loaded
- Role and held concepts change

---

*Modes: activate at session start, switch mid-session, create before handoff.*
