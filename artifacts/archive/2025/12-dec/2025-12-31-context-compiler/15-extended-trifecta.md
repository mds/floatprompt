---
title: Extended Trifecta
type: exploration
created: 2025-12-31

human_author: @mds
human_intent: Capture additional context files AI would crave beyond the core trifecta

ai_model: Claude Opus 4.5
ai_notes: Optional extensions for situational needs — not required, but powerful when needed
---

# Extended Trifecta

**Optional context files beyond map/decisions/context.**

---

## The Core Trifecta (Required)

| File | Question | Purpose |
|------|----------|---------|
| `map.md` | WHERE | Navigation, structure, relationships |
| `decisions.md` | WHY | Rationale, trade-offs, choices |
| `context.md` | WHAT | Deep understanding, the thing itself |

These answer the essential questions. Every deep context anchor needs them.

---

## The Extensions (Optional)

### 1. owners.md — WHO

**Question:** Who made these decisions? Who has context I'm missing?

**When to use:**
- Team projects with multiple contributors
- Areas with domain expertise requirements
- When decisions reference specific people

**Shape:**
```markdown
# Owners

| Area | Owner | Context |
|------|-------|---------|
| Schema design | @mds | Original vision holder |
| TypeScript direction | @mds + Claude | Session 2025-12-31 |
| Buoy patterns | @mds | From float-think design |

## Escalation
Questions about X → @person
Questions about Y → @other-person
```

---

### 2. quickstart.md — HOW (Fast)

**Question:** How do I get moving in 60 seconds?

**When to use:**
- Complex domains with learning curve
- Onboarding scenarios
- When full context.md is too deep for first touch

**Shape:**
```markdown
# Quickstart

## 60-Second Version

[One paragraph explaining the core concept]

## Key Files
- `file1` — what it does
- `file2` — what it does

## Common Actions
- To do X: `command`
- To do Y: `command`

## Go Deeper
- [map.md](map.md) — full navigation
- [context.md](context.md) — deep understanding
```

---

### 3. status.md — NOW

**Question:** What's the current state? What's actively happening?

**When to use:**
- Active work in progress
- Artifacts that evolve over time
- When "is this alive?" matters

**Shape:**
```markdown
# Status

## Current State
- Status: [active | paused | complete | archived]
- Last updated: YYYY-MM-DD
- Phase: [description]

## What's Next
- [ ] Next action
- [ ] Following action

## What's Blocked
- [Blocker or "Nothing"]

## Recent Changes
- YYYY-MM-DD: What changed
```

---

### 4. history.md — WHEN (Evolution)

**Question:** How did this evolve? What's the timeline?

**When to use:**
- Long-lived artifacts
- Complex evolution worth tracking
- When git log isn't surfaced enough

**Shape:**
```markdown
# History

| Date | Change | Reference |
|------|--------|-----------|
| YYYY-MM-DD | Initial creation | doc.md |
| YYYY-MM-DD | Major pivot | other-doc.md |
| YYYY-MM-DD | Decision locked | decisions.md |

## Eras

### Era 1: [Name] (dates)
What was true during this period.

### Era 2: [Name] (dates)
What changed and why.
```

---

## Decision Matrix

| Extension | Add When... |
|-----------|-------------|
| `owners.md` | Multiple contributors, domain expertise needed |
| `quickstart.md` | Complex domain, onboarding is common |
| `status.md` | Active/evolving work, "is this alive?" matters |
| `history.md` | Long-lived, complex evolution, git isn't enough |

---

## Full Extended Structure

```
folder/
├── map.md           ← WHERE (required)
├── decisions.md     ← WHY (required)
├── context.md       ← WHAT (required)
│
├── owners.md        ← WHO (optional)
├── quickstart.md    ← HOW fast (optional)
├── status.md        ← NOW (optional)
├── history.md       ← WHEN evolved (optional)
│
└── [domain-specific extensions...]
```

---

## AI Traversal Pattern

```
1. Read map.md        → Orient (what's here)
2. Read quickstart.md → Quick start (if exists, if I need speed)
3. Read context.md    → Understand (deep)
4. Read decisions.md  → Rationale (if I need why)
5. Read status.md     → Current state (if exists, if active)
6. Read owners.md     → Who to ask (if exists, if stuck)
7. Read history.md    → Evolution (if exists, if archaeology needed)
```

---

## Not Every Folder Needs All 7

The trifecta is the **minimum viable context**.

Extensions are **situational power-ups**:
- Simple folders: just trifecta
- Complex domains: add quickstart
- Team projects: add owners
- Active work: add status
- Long-lived: add history

**Start with 3. Add when the need is clear.**

---

## Breadcrumb Note

This document captures the AI perspective on what additional context would be valuable. It's an exploration, not a mandate. Future implementation should:

1. Start with core trifecta everywhere
2. Add extensions when pain/need emerges
3. Let patterns prove themselves before standardizing
