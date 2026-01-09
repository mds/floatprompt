# FloatPrompt Plugin Spec

**Date:** 2026-01-07
**Status:** Draft
**Supersedes:** `done/track1-workshop-plugin-spec-historical.md`

---

## Glossary (For Fresh Sessions)

| Term | Meaning |
|------|---------|
| **float.db** | SQLite database at `.float/float.db` storing folder context, file hashes, decision logs |
| **Layer 1** | Mechanical scanning — walk filesystem, hash files, write to SQLite (no AI) |
| **Layer 2** | AI generation — generate descriptions and context per folder |
| **Mode** | Context loadout — curated documents to read for specific work types (e.g., "deep-strategy" for architecture) |
| **PreCompact** | Claude Code hook event that fires when context window is about to auto-compact |
| **SessionEnd** | Claude Code hook event that fires when session is ending |
| **Workshop** | `.float-workshop/` folder in THIS repo — manages ACTIVE work, LATER queue, decision logs |
| **CLI** | `node dist/cli/float-db.js` — TypeScript CLI for querying/updating float.db |

**Scope:** This plugin is designed for ANY user project, not just this repo. The workshop layer is specific to floatprompt development.

---

## The Problem

Every AI session starts cold. Zero memory.

I read CLAUDE.md if it exists, explore the codebase, build understanding... then the session ends and **all of that is gone**. Next session: repeat from scratch.

Without persistent context, AI is perpetually a tourist — visiting but never knowing.

---

## The Solution

**Context that survives sessions and compounds over time.**

```
Session 1: Boot → Work → Learn → Write back (automatic)
Session 2: Boot with Session 1's learning → Work → Learn more → Write back
Session 3: Boot with accumulated understanding → ...
```

This is the enrichment loop. Context that learns.

> "CLAUDE.md is a note on the door. Float.db is the institutional knowledge of the building."

---

## The Analogy: .float is .git for AI context

Developers already understand `.git` — invisible infrastructure that tracks state.

| .git | .float |
|------|--------|
| Tracks code changes | Tracks context/understanding |
| Manual commits | Automatic enrichment |
| You push/pull | It breathes |
| Version history | Decision history |
| Invisible infrastructure | Invisible infrastructure |

**The difference:** Git requires discipline (`git add`, `git commit`, `git push`). Float requires ONE command and then gets out of the way.

```
.git  → manual version control infrastructure
.float → automatic context infrastructure
```

**.git changed how developers work.** You don't think about it — it's just there, tracking everything.

**.float does the same for AI collaboration.** You don't think about context — it's just there, compounding every session.

---

## The Adoption Truth

No human adopts a complex new AI workflow unless it's wildly better than what they're already doing — with near-zero friction.

**What we can expect humans to do:**
1. Install the plugin
2. Type `/float`
3. ...that's it

Everything else must happen automatically. Enrichment, handoff, context capture, staleness detection — all invisible.

---

## Getting the Plugin

Users install via Claude Marketplace (not npm):

```
/plugin marketplace add mds/floatprompt
/plugin install floatprompt@mds
```

Then `/float` in any project. That's the entire onboarding.

> See `floatprompt-plugin-PRD.md` for distribution details, marketplace.json schema, and repo structure.

---

## The Interface

```
/float
```

That's the entire user-facing interface. One command. One intentional gesture that says "yes, I want FloatPrompt for this session."

After that handshake — magic.

---

## Why One Command (Not Zero)

Zero commands (auto-boot via SessionStart) feels presumptuous. Sometimes you're fixing a typo. You don't need the full context machinery.

`/float` respects agency. It's like `/init` — an intentional opt-in.

One command is the sweet spot:
- **Zero:** Too assumptive
- **One:** Intentional, respectful
- **Many:** Won't get adopted

---

## The Lifecycle

```
User runs /float (first time in project)
    │
    ├── No float.db? Create it (Layer 1 scan)
    │
    ↓
Boot context loaded, machinery enabled
    │
    ↓
[User works — never types another float command]
    │
    ├── Skill notices enrichment opportunity
    │       ↓
    │   Spawns agent silently (separate context)
    │       ↓
    │   Agent writes to float.db
    │
    ↓
Session ending (PreCompact or SessionEnd)
    │
    ├── Hook triggers automatic handoff
    │       ↓
    │   Spawns agents: update-logs, organize, enricher
    │
    ├── Maybe: "Deep work detected in /src/auth. Create a mode?"
    │       ↓
    │   User: "nah" or "sure" — not required
    │
    ↓
Session ends clean. Context persisted.
    │
    ↓
[Next session, same project]
    │
    ↓
User runs /float
    │
    ↓
Everything's already there. Richer. Compounded.
```

---

## What Float.db Provides

| Without | With float.db |
|---------|---------------|
| Re-explain project every session | Context just there |
| Understanding dies with session | Understanding compounds |
| Flat CLAUDE.md (one file) | Hierarchical (every folder) |
| Static | Staleness-aware |
| Human maintains | AI enriches automatically |

**The core value:**

> "You're compressing human judgment into injectable context."

Context isn't just information. When someone writes "this folder handles authentication," they're encoding years of experience, decisions, trade-offs. That judgment persists and becomes queryable.

Float.db stores compressed judgment. AI enriches it automatically. Humans audit occasionally.

---

## The Machinery (Invisible to User)

### The `/float` Command

**The only user-facing command.**

What it does:
1. Check for `.float/float.db`
   - If missing: Run Layer 1 scan, create database
   - If exists: Continue
2. Load boot context
3. Query float.db for project orientation
4. Check for stale folders (inform, don't block)
5. Enable the machinery (skills become active)

### Skills (Notice + Spawn)

Skills are ambient awareness. They notice opportunities and spawn agents.

> **Design insight:** The old `protocols/*.md` files contained executable context that Claude read and acted on. Skills are that pattern, automated. The skill IS the protocol — it just triggers automatically instead of via a command.

**`float-enrich` skill:**
- Triggers when: Deep work in a folder, AI knows more than float.db stores
- Action: Spawn `float-enricher` agent with folder path
- Context cost: Minimal (notice pattern, not load/compare)

**When does "deep work" trigger enrichment?**
- Multiple file reads/edits in one folder
- Discovering patterns not in float.db
- Making decisions about folder architecture
- Understanding relationships not documented

NOT triggered by:
- Quick file lookups
- Single-line edits
- Reading without comprehension work

**`float-mode-suggest` skill:**
- Triggers when: Significant context built around a topic (not a folder)
- Action: Offer to create mode — casual, not pushy
- Context cost: Minimal

**The tone matters:**
```
"Hey, you've been deep in authentication patterns this session.
Want to save this as a mode for future sessions? Or nah."
```

User can say "sure" or ignore. Either way, session continues. Modes are helpful, not required.

### Agents (Do the Work)

Agents run in separate context windows. Heavy work happens there, not in main conversation.

**Plugin agents (for ANY project):**

| Agent | Purpose | Spawned By |
|-------|---------|------------|
| `float-enricher` | Generate/update folder context in float.db | Skill, Hook |
| `float-mode-generator` | Create mode files | Skill suggestion |

**Workshop agents (for THIS repo's development only):**

| Agent | Purpose | Spawned By |
|-------|---------|------------|
| `float-organize` | Update ACTIVE/LATER state | Hook |
| `float-update-logs` | Record decisions to logs/ | Hook |

> Note: Workshop agents manage floatprompt's own development workflow. They're not part of the plugin shipped to users.

### Hooks (Automatic Triggers)

Hooks fire on events. No user action required.

**PreCompact Hook:**
- Event: Context about to compact
- Action: Spawn enricher agents for touched folders, capture learnings before they're lost
- This is emergency preservation

**SessionEnd Hook:**
- Event: Session ending
- Action: Spawn organize + update-logs agents
- Offer mode creation if deep work detected

---

## Context Hygiene

**Principle:** All float components must REDUCE context, not add to it.

| Component | Context Cost | Pattern |
|-----------|--------------|---------|
| `/float` command | Boot context only (~2k tokens) | Load what's needed |
| Skills | Minimal | Notice, don't compare inline |
| Agents | Zero (main thread) | Separate context window |
| Hooks | Zero | Shell commands spawn agents |
| float.db queries | On-demand | Query specific folder, not bulk |

**The CLAUDE.md problem:** Everything loads at session start. 100 folders = massive context.

**The float.db solution:** Query what you need, when you need it. 65 folders stored, load 3-5 as needed.

---

## What Exists

### Database Layer (Complete — ships with plugin)
- `.float/float.db` — SQLite database (65 folders, 446 files in this repo)
- Schema: folders (16 fields), files, log_entries, references, deep
- CLI: `float-db status`, `details`, `update`, `scope-chain`

### Plugin Components (Partially exist — need adaptation)
- `/float-boot` → rename to `/float`, add auto-create
- `/float-mode` → keep for manual override, add skill for proactive
- `float-mode-generator` agent → exists, needs skill trigger

### Workshop Components (This repo only — not shipped)
- `/float-handoff` → stays as workshop tool, convert to hook-triggered
- `float-organize` agent → workshop only
- `float-update-logs` agent → workshop only

---

## What Needs Building

### Phase 1: Core Automatic Flow

1. **Rename `/float-boot` → `/float`**
   - Add float.db creation if missing
   - Add "machinery enabled" confirmation

2. **Create `float-enrich` skill**
   ```
   .claude/skills/float-enrich/SKILL.md
   ```
   - Notice deep folder work
   - Spawn enricher agent automatically
   - Lightweight: notice, don't load/compare

3. **Create `float-enricher` agent**
   ```
   .claude/agents/float-enricher.md
   ```
   - Generate/update folder context
   - Write to float.db via CLI
   - Runs in separate context

4. **Create SessionEnd/PreCompact hooks**
   ```
   .claude/settings.json (or hooks/hooks.json)
   ```
   - Auto-trigger handoff agents
   - No user command needed

### Phase 2: Proactive Suggestions

5. **Create `float-mode-suggest` skill**
   - Notice topic-based deep work
   - Offer mode creation (not required)

6. **Update `float-mode-generator` agent**
   - Can be triggered by skill suggestion
   - User approval still required for save

### Phase 3: Polish

7. **Refine `/float` output**
   - Clean boot experience
   - Show what's available, don't overwhelm

8. **Remove obsolete commands**
   - `/float-handoff` becomes hook-only (or keep as manual override)
   - Document escape hatches for power users

---

## Success Criteria

### Adoption
- [ ] User types `/float` once, everything else automatic
- [ ] No required commands after `/float`
- [ ] Context compounds without user effort

### Machinery
- [ ] Skill notices enrichment opportunities during work
- [ ] Agents spawn silently, write to float.db
- [ ] Hooks trigger handoff at session end
- [ ] PreCompact preserves learnings before context dies

### Context Hygiene
- [ ] Boot loads ~2-3k tokens, not 50k
- [ ] Skills don't bloat main context
- [ ] Agent work in separate context window
- [ ] Queries on-demand, not bulk-loaded

### Experience
- [ ] First `/float` creates everything needed
- [ ] Subsequent `/float` boots with richer context
- [ ] Mode suggestions are helpful, not annoying
- [ ] Power users can still manually trigger things

---

## What This Is NOT

This spec is for the **Claude Code plugin** — the adoption-ready, one-command interface.

The bigger vision (buoy execution engine, Vercel Sandbox, parallel fleets, `<fp><json><md>` format) lives in:
- `.float-workshop/ref/vision.md`
- `docs/vision.md`

That vision may eventually live outside Claude Code. This plugin is what we ship now.

---

## Historical Context

The previous spec (`done/track1-workshop-plugin-spec-historical.md`) had:
- 4 user-facing commands
- Manual enrichment paths
- Batched handoff as user choice
- Capability-first architecture

This spec inverts the priority:
- 1 user-facing command
- Automatic enrichment via skills
- Automatic handoff via hooks
- Adoption-first architecture

Same underlying machinery. Radically simpler surface.

---

*FloatPrompt Plugin: One command. Automatic everything. Context that compounds.*
