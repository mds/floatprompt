---
title: Float Buoys Context
type: context
status: current
created: 2025-12-28

human_author: MDS
human_intent: Document the strategic thinking behind the Float Buoys spec
human_context: Companion to float-buoys-spec.md — the "why" behind decisions

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Captures conversation that led to spec — preserves reasoning for future reference
---

# Float Buoys Context

Strategic context and decision rationale for the Float Buoys specification. Read alongside `float-buoys-spec.md`.

---

## Origin

**The problem:** FloatSystem's `_float/index.md` files go stale. When files change, the indexes don't update automatically. AI drops into a project and gets outdated context.

**The insight:** "I'd almost want a Dropbox-style system where any file updated would trigger a system update."

**The vision:** Dropbox for AI context. Files stay synced with accurate, AI-readable context. Always. Not just when you remember to update.

---

## Key Strategic Decisions

### 1. Two-Tier Architecture

**Options considered:**
- All local (no AI) — just file listings, no intelligence
- All AI — every change calls Claude API
- Hybrid — local for simple stuff, AI for complex

**Decision:** Hybrid (Tier 1 + Tier 2)

**Reasoning:**
- 90% of updates are structural (file added/removed) — no AI needed
- AI only when meaning matters (new file needs description)
- Cost-effective: most updates are free
- Fast: Tier 1 is instant

### 2. The Watchlist Pattern

**Options considered:**
- Direct processing (change detected → immediately process)
- Queue-based (change detected → add to queue → process queue)
- Timer-based (batch changes every N minutes)

**Decision:** Watchlist as queue, adding triggers processing

**Reasoning:**
- Decouples detection from processing
- Tier 2 can batch or debounce
- Human can see what's pending
- Failed items stay visible for retry
- Event-driven, not polling

### 3. Single vs Multi-Project

**Options considered:**
- Watch multiple directories from one daemon
- One daemon per project

**Decision:** Single directory for MVP

**Reasoning:**
- Simpler to build and debug
- Avoid complexity of managing multiple watchers
- Multi-project is a "later" feature, not core value
- YAGNI — user said "let's keep this practical"

### 4. Claude Model for Tier 2

**Options considered:**
- Haiku (fast, cheap)
- Sonnet (balanced)
- Opus (smart, expensive)

**Decision:** Haiku default, configurable

**Reasoning:**
- Tier 2 tasks are relatively simple (read file, write description)
- Haiku is sufficient for indexing/describing
- Can upgrade to Sonnet if descriptions feel shallow
- User controls cost via config

### 5. Naming: Swarm → Buoys

**Evolution:**
1. "Agents" — generic, clear
2. "The Swarm" — too aggressive
3. "Coast Guard" — fun, but complex metaphor
4. "Buoys" — fits float theme, each has specific job

**Decision:** Buoys (with note that "agents" is fine for public docs)

**Reasoning:**
- User said "it's me for now" — can have fun with naming
- Buoys fit the Float metaphor perfectly
- Each buoy has a specific purpose (like real buoys)
- Can rename to "agents" later if going public

---

## The Core Tension

**FloatPrompt's promise:**
> "No platform lock-in, no dependencies, no accounts. Pure text files."

**Float Buoys introduces:**
> A daemon, npm install, API calls

**Resolution:**
The text files still work without the daemon. They just might go stale. Float Buoys is a convenience layer, not a dependency.

**Positioning:**
> "FloatSystem works without Float Buoys. Buoys just keep it fresh."

Like how Git works without GitHub, but GitHub adds convenience.

---

## Why Five Buoys?

Started with the question: "What agents do we actually need?"

**Initial brainstorm:**
- Watcher Agent — watches files
- Index Agent — updates indexes
- System Agent — updates structure map
- FloatDoc Agent — adds frontmatter
- FloatPrompt Agent — creates tools
- Watchlist Agent — manages queue

**Refinement:**
- FloatDoc/FloatPrompt are authoring, not maintenance → human-piloted
- Watchlist is a data structure, not an agent → just a queue
- Need something for logs → Log Buoy
- Need something to catch drift → Integrity Buoy

**Final five:**
1. Watch Buoy — detects changes
2. Index Buoy — updates file tables
3. System Buoy — updates structure map
4. Log Buoy — records activity
5. Integrity Buoy — periodic drift check

---

## Why Integrity Buoy?

**The gap:** Event-based watching can miss things:
- Files changed while daemon wasn't running
- Race conditions
- External tools modifying files

**The solution:** Periodic check (startup + hourly) that:
- Verifies all folders have `_float/index.md`
- Confirms tables match actual contents
- Validates structure map accuracy

Catches what events miss.

---

## Human Authority Principle

**The concern:** What if human and daemon edit the same file?

**Options considered:**
- Daemon always wins (overwrite human changes)
- Lock files during daemon writes
- Detect conflicts, pause and ask
- Human always wins

**Decision:** Human always wins

**Reasoning:**
- Aligns with FloatPrompt's "pilot principle" — human decides, AI executes
- The daemon is crew, not pilot
- Never overwrite human work
- When in doubt, pause and log

---

## Voice Preservation Concern

**The question:** Tier 2 generates descriptions. Is that AI writing in the repo? Does it violate voice preservation?

**Resolution:** No conflict.

Tier 2 descriptions are:
- System-generated metadata
- Describing what files ARE
- Indexing, not authoring
- Not human expression

Voice preservation applies to human content. Index metadata is infrastructure.

---

## Why Node.js?

**Options considered:**
- Python (Dropbox uses it, good for daemons)
- Node.js (user hosts on Vercel, npm ecosystem)
- Go/Rust (fast, but harder to build)

**Decision:** Node.js

**Reasoning:**
- User hosts on Vercel → Node-native
- npm install is familiar distribution method
- chokidar is battle-tested file watcher
- Same codebase could power future cloud version
- User said "node is fine with me"

---

## The /float Integration

**The question:** How does the `/float` Claude Code command know about the daemon?

**Options considered:**
- Socket connection (daemon listens, command connects)
- State file (daemon writes, command reads)
- PID file + signals

**Decision:** State file (`_float/.daemon.json`)

**Reasoning:**
- Simplest to implement
- No socket management
- File is deleted on clean shutdown
- Human-readable for debugging

---

## What We Explicitly Deferred

**Multi-directory watching** — complexity without core value for MVP

**FloatDoc auto-add** — better to flag for human decision, respect authoring control

**Smart filtering by file type** — all text files get descriptions for now

**Cloud sync (floatprompt.ai)** — future feature, user owns domains

**Per-file sync icons** — requires Finder extension, significant complexity

**Complex integrity checks** — Integrity Buoy does basic checks, advanced analysis later

---

## The YAGNI Discipline

Throughout the conversation, scope kept trying to expand:
- Multiple agents with complex orchestration
- Timers and thresholds for Tier 2 triggering
- Smart filtering rules
- Cloud components

**The correction:** "Let's keep this practical and don't venture into YAGNI territory... I don't want to spend days and weeks on this."

**The result:** A tight MVP that:
- Watches one directory
- Has five buoys with clear jobs
- Uses simple file-based state
- Triggers Tier 2 on watchlist updates
- Flags for human instead of auto-deciding

Build the simple thing. See if it works. Expand later.

---

## Success Looks Like

1. `npm install -g floatprompt` works
2. `float` starts watching current directory
3. Add a file → `_float/index.md` updates automatically
4. New file gets description via Tier 2
5. All activity logged to `_float/logs/`
6. `/float` shows daemon status

Test case: The floatprompt repo itself. Complex enough to stress test, familiar enough to validate quickly.

---

## Open Threads

**Daemon lifecycle:**
- Background process vs system service (launchd/systemd)?
- Auto-start on boot or manual start each session?

**Rate limiting:**
- Current approach: debounce + retry backoff
- May need more sophisticated throttling for large projects

**Future features (parked):**
- Multi-project watching
- Cloud sync via floatprompt.ai
- Smart file type filtering
- FloatDoc auto-add with smart rules

---

© 2025 @MDS
