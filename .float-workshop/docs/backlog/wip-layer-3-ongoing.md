# Layer 3: The Ongoing System

> **Status:** WIP — Capturing vision from Session 18 discussion
> **Created:** 2026-01-04

---

## The Problem (From Multiple Angles)

Future sessions: this section exists so you deeply understand what we're solving. Read it carefully.

### Angle 1: The Repeated Tax

Every AI session pays a **context tax**:

```
Session starts
  → Read boot.md (file I/O)
  → Query: current folder
  → Query: parent scope
  → Query: grandparent scope
  → Query: root scope
  → Query: relevant log entries
  → Assemble in memory
  → Feed to AI
  → Finally: actual work begins
```

**Six+ operations. Every. Single. Session.**

For a deep path like `/packages/web-app/src/features/auth/hooks`:
- 1 boot.md read
- 5+ folder queries (one per path segment)
- N log queries per relevant folder
- String concatenation to assemble

SQLite is fast. But this is **unnecessary work repeated thousands of times**.

### Angle 2: The Token Economy (from vision.md)

> "The goal isn't minimizing tokens, it's **maximizing value per token**."

Every piece of context must pass the test:
> "Does this help AI understand and operate better?"

**Valuable context is:**
- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluff

**The industry throws more context window at the problem.**
**FloatPrompt provides *better* context — structured, hierarchical, trustworthy.**

Static pre-built context files are HIGHER value per token than runtime-assembled context because:
1. Pre-computed = guaranteed consistent shape
2. Pre-summarized = ancestors compressed, current folder full
3. Pre-windowed = only relevant logs included
4. Pre-validated = human can inspect exactly what AI sees

### Angle 3: The Invisible Cognitive Overhead

The real cost isn't query time. It's **cognitive load on the system**:

| Hidden Cost | Impact |
|-------------|--------|
| Assembly logic lives somewhere | Code that knows scope chain traversal, inclusion rules, formatting — runs every session |
| No caching layer | Session A and Session B hitting `/src/auth` both query and assemble from scratch |
| Context shape not guaranteed | Assembly might produce different results based on timing, race conditions, code changes |
| Debugging is hard | "What context did AI actually receive?" — replay assembly logic to find out |
| No preview | Human can't easily see what AI will see for a location |

**Static context files eliminate ALL of these.**

### Angle 4: The CMS Analogy

WordPress doesn't query MySQL on every page view. It pre-renders.
Gatsby doesn't hit the CMS on every request. It builds static files.

**FloatPrompt shouldn't query SQLite on every AI session. It should serve pre-built context.**

```
Traditional CMS              FloatPrompt CMS
─────────────────            ─────────────────
Database stores content      SQLite stores folder metadata
Admin edits content          AI + human update context
Build generates HTML         Build generates context files
CDN serves pages instantly   AI reads context instantly
Rebuild on content change    Rebuild on file change
```

### Angle 5: The Speed Differential

**Before (Query-Based): 9 steps**
```
1. Read boot.md
2. Connect to SQLite
3. SELECT * FROM folders WHERE path = '/src/auth'
4. SELECT * FROM folders WHERE path = '/src'
5. SELECT * FROM folders WHERE path = '/'
6. SELECT * FROM log_entries WHERE folder_path = '/src/auth'
7. Assemble all results into context string
8. Process context string
9. Begin task
```

**After (Static Context): 2 steps**
```
1. Read .float/context/src--auth.standard.md
2. Begin task
```

**From 9 steps to 2. Every session. Forever.**

### Angle 6: The Competitive Moat

| Tool | Approach | Limitation |
|------|----------|------------|
| Cursor Rules | Static .cursorrules file | Single level, no hierarchy |
| CLAUDE.md | Static markdown file | Single level, no hierarchy |
| Codebase RAG | Embed chunks, retrieve | No structure, no relationships |
| Copilot Workspace | Black box context | No user control, no inspection |
| LangChain | Orchestration framework | Developer builds everything |

**What FloatPrompt does differently:**
1. **Hierarchical** — Scopes within scopes, context inherits
2. **Pre-computed** — No runtime assembly, instant load
3. **Inspectable** — Human reads same file AI reads
4. **Evolving** — Context improves through collaboration
5. **Structured** — Not just text, but relationships and history
6. **Portable** — Works with any AI (Claude, GPT, local models)

> **"The schema is the moat."**
>
> Anyone can write a boot.md. Few will build recursive scope detection, parallel context generation, incremental rebuilding, log entry integration, cross-reference resolution, tiered context levels.
>
> FloatPrompt isn't a prompt. It's infrastructure.

---

## The Core Realization

**Repeat users are the 99% case. Optimize for them.**

First-time setup is expensive but rare. Every subsequent session should be instant. The architecture must reflect this:

```
FIRST TIME (1% of sessions):
  Heavy setup → buoys → float.db populated → expensive but worth it

REPEAT USE (99% of sessions):
  Read one file → full context → zero queries → instant
```

> **The Amortization Principle**
>
> You pay the AI-thinking cost ONCE. Buoys run, context is generated, artifacts are written. Every subsequent session just reads those artifacts. The expensive work is amortized across hundreds of sessions.
>
> This is why static context files matter. This is why snapshot boots exist. The investment happens upfront; the payoff is perpetual.

---

## The Insight

The workshop protocols ARE the prototype for Layer 3.

What we do manually in `.float-workshop/`:
- `boot.md` → session orientation
- `/fp-handoff` → state capture
- `/fp-log` → decision logging
- Next session → reads synthesized state

This becomes what float does **automatically** for any project.

---

## Prior Art: We're Already Doing This

**Proof:** The `/fp-handoff` skill already builds a fresh boot.md each session.

Look at what handoff does:
1. Reads current session state
2. Synthesizes key decisions and progress
3. Generates a NEW boot.md for the next session
4. Next session reads the pre-built artifact

That's build-time generation. We've been doing it manually all along.

The static context system (Layer 2.5) generalizes this to folders.
Layer 3 automates the handoff itself.

```
HANDOFF (current):
  Session ends → /fp-handoff → builds boot.md → next session reads

LAYER 3 (future):
  Session progresses → background buoys → continuous synthesis → snapshot ready
```

The handoff skill is proof-of-concept for the entire architecture.

---

## The Two Boot Modes

| Mode | When | Context Shape |
|------|------|---------------|
| **create-floatprompt** | First time setup | Full scaffolding, explains everything, builds float.db |
| **snapshot boot** | Repeat sessions | Recent work weighted, decision trail, suggested next steps |

### First-Time Boot

Heavy. Expensive. Runs once.

```
Human installs float
        ↓
create-floatprompt boot runs
        ↓
Layer 1: Scan filesystem → float.db
        ↓
Layer 2: Buoys generate context per folder
        ↓
Static context files built
        ↓
Project ready for ongoing use
```

### Snapshot Boot

Light. Instant. Runs every session.

```
Human opens Claude Code
        ↓
Read snapshot boot (one file)
        ↓
Contains:
  - Project essence (not full explanation)
  - Recent work summary
  - Active decisions/threads
  - Suggested next steps
        ↓
AI oriented in <500 tokens
        ↓
Work begins
```

The snapshot boot is **slanted toward recent work** — like the workshop boot, not the full vision doc.

---

## Background Buoys (During Session)

While human chats, buoys run invisibly in parallel:

```
Human ←→ AI conversation
              ↓ (parallel, non-blocking)
┌─────────────────────────────────────────┐
│ pattern-detector buoy                   │
│ → identifies recurring themes           │
│ → links discussion to folder contexts   │
│ → "user keeps referencing auth flow"    │
├─────────────────────────────────────────┤
│ decision-logger buoy                    │
│ → detects decisions in conversation     │
│ → auto-logs to float.db                 │
│ → "chose JWT over sessions"             │
├─────────────────────────────────────────┤
│ context-linker buoy                     │
│ → connects current work to existing     │
│ → surfaces relevant prior decisions     │
│ → "3 weeks ago you decided X"           │
├─────────────────────────────────────────┤
│ next-steps buoy                         │
│ → synthesizes logical continuations     │
│ → "based on this session, consider:"    │
│ → generates "choose your adventure"     │
└─────────────────────────────────────────┘
```

These buoys don't interrupt. They build context **as the session happens**.

---

## The Continuous Handoff-Log Cycle

Currently manual:
```
Session ends → human runs /fp-handoff → log written → next session reads
```

Becomes automatic:
```
Session progresses → buoys continuously update context
Session ends → snapshot auto-synthesized
Next session → reads fresh snapshot
```

The handoff isn't a discrete event. It's **continuous synthesis**.

---

## The Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 1: MECHANICAL                       │
│                                                              │
│  float scan → filesystem hashes → float.db                   │
│  (runs on change detection or manual trigger)                │
│                                                              │
│  Status: DONE                                                │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 2: AI GENERATION                    │
│                                                              │
│  Buoys generate context per folder                           │
│  Results stored in float.db                                  │
│  Static context files built from float.db                    │
│                                                              │
│  Status: PARTIAL (buoy execution validated)                  │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 2.5: STATIC BUILD                   │
│                                                              │
│  float.db → .float/context/*.md                              │
│  Pre-assembled, tiered (minimal/standard/full/deep)          │
│  One file read per session, zero queries                     │
│                                                              │
│  Status: DESIGNED (float-CMS doc)                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    LAYER 3: ONGOING                          │
│                                                              │
│  Background buoys during sessions                            │
│  Pattern detection, decision logging, context linking        │
│  Continuous snapshot synthesis                               │
│  "Choose your adventure" next steps                          │
│                                                              │
│  Status: THIS DOCUMENT (capturing vision)                    │
└─────────────────────────────────────────────────────────────┘
```

---

## What Layer 3 Buoys Need

### pattern-detector
- Input: conversation stream (or transcript)
- Output: themes, recurring topics, folder links
- Writes to: `patterns` table? or enriches `folders.content_md`?

### decision-logger
- Input: conversation stream
- Output: decisions with rationale
- Writes to: `log_entries` table
- Already validated (Session 17), needs conversation integration

### context-linker
- Input: current discussion + float.db
- Output: relevant prior context, related decisions
- Reads from: `log_entries`, `folders`, `deep` tables
- Surfaces to AI mid-session

### next-steps (adventure-generator)
- Input: session transcript + project state
- Output: 2-4 suggested next actions
- Format: like workshop boot's "Session Focus Options"
- Generated at session end, included in next snapshot boot

---

## The Token Economy

Snapshot boot must be **light**:

```markdown
# Snapshot Boot: FloatPrompt

## Recent (last 48h)
- Validated buoy execution engine
- Designed static context system (float-CMS)
- Captured Layer 3 vision (this discussion)

## Active Threads
- [ ] Fleet mode implementation
- [ ] Test 2B (full orientation)
- [x] Test 2A passed (DB-only orientation)

## Hot Folders
- /src/buoys — execution engine, templates
- /src/cli — float-db commands
- /.float-workshop/docs — vision, specs

## Suggested Next
1. Implement float build (Layer 2.5)
2. Design pattern-detector buoy
3. Run Test 2B with snapshot boot

---
*Auto-generated from float.db + session history*
```

Target: **<800 tokens** for full snapshot boot.

---

## Open Questions

### Q1: Conversation Access
How do background buoys access the conversation stream?
- Claude Code hooks?
- MCP server?
- Post-session transcript analysis?

### Q2: Timing
When do background buoys run?
- Truly parallel (during conversation)?
- Periodic (every N messages)?
- Post-session (transcript available)?

### Q3: Snapshot Trigger
What triggers snapshot regeneration?
- Session end?
- Time-based (hourly)?
- Change-based (N new decisions)?

### Q4: Storage
Where does session-derived context go?
- New tables (`sessions`, `patterns`)?
- Enriches existing tables?
- Separate from folder context?

---

## Migration Path: Workshop → Automated

How does the current manual workshop graduate to automated Layer 3?

### Phase 1: Parallel Operation
```
Workshop continues as-is (manual)
Layer 3 buoys run in background (experimental)
Compare outputs — does auto-logging match manual logs?
```

### Phase 2: Assisted Manual
```
Background buoys suggest decisions to log
Human confirms/edits before commit
Handoff still manual, but pre-populated
```

### Phase 3: Supervised Automatic
```
Buoys auto-log with human review queue
Snapshot boot auto-generated, human can edit
Handoff becomes "review and approve" not "write"
```

### Phase 4: Fully Automatic
```
Background buoys run without intervention
Snapshots regenerate on triggers
Human only intervenes for corrections
```

The workshop doesn't disappear — it becomes the **override layer**. Humans can always manually log, manually handoff, manually adjust. Automation handles the 90%; humans handle the exceptions.

---

## CLI Implications

New commands for Layer 3:

```bash
# Generate snapshot boot for current project state
float snapshot

# Generate snapshot with specific focus
float snapshot --focus="auth refactor"

# Preview what snapshot would contain (without writing)
float snapshot --preview

# Force snapshot regeneration (ignore staleness)
float snapshot --force

# Boot modes
float boot --mode=create    # First-time setup
float boot --mode=snapshot  # Repeat session (default)

# Background buoy control
float buoys start           # Start background monitoring
float buoys stop            # Stop background monitoring
float buoys status          # Show what's running

# Review auto-logged decisions before commit
float review                # Show pending auto-logs
float review --approve      # Approve all pending
float review --approve=3    # Approve specific entry
float review --reject=5     # Reject specific entry
```

### Integration with Existing Commands

```bash
# Existing Layer 1
float scan                  # Unchanged

# Existing Layer 2
float generate              # Unchanged (buoy context generation)

# New Layer 2.5
float build                 # Static context files from float.db
float build --stale         # Only rebuild stale folders

# New Layer 3
float snapshot              # Session boot generation
float buoys start           # Background monitoring
float review                # Auto-log review queue
```

---

## Related Documents

| Document | Relationship |
|----------|--------------|
| [deep-context-floatprompt.md](./deep-context-floatprompt.md) | System overview, mentions Layer 3 as NOT STARTED |
| [float-CMS-context-management-system.md](./float-CMS-context-management-system.md) | Layer 2.5 static build system |
| [vision.md](../../docs/vision.md) | THE vision doc, three layers defined |
| [boot.md](../protocols/boot.md) | Workshop boot protocol (the prototype) |
| [boot-draft.md](../../.float/boot-draft.md) | Production boot (first-time mode) |

---

## The Graduation

> The workshop graduates from "how we build float" to "what float does for everyone."

The patterns we've developed manually:
- Session boot with context
- Handoff logs capturing state
- Decision logging with rationale
- Next session options

These become **automated infrastructure**. The workshop is the spec. Layer 3 is the implementation.

---

*Layer 3 vision captured — Session 18, 2026-01-04*
