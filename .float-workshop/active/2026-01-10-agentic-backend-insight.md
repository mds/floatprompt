# Agentic Backend Insight: Where the Scanner Work Has Value

**Date:** 2026-01-10 (Session 60)
**Status:** Future possibility — captured for later exploration
**Context:** Emerged from git-native architecture discussion

---

## The Realization

The scanner/merkle infrastructure is redundant for **git-based codebases** (where git already tracks files).

But it might be exactly right for **agentic web applications** where:
- AI agents do work on user data, not code
- There's no git equivalent for tracking database changes
- You need: what changed, why, what decisions were made

---

## Three FloatPrompt Products

| Product | Substrate | Tracking | Status |
|---------|-----------|----------|--------|
| **npm package** (`web/`) | Websites | HTML → Markdown extraction | Exists |
| **Claude Code plugin** | Codebases | Git + AI context | Exists (simplify to git-native) |
| **Agentic backend** | Web apps | DB state + agent decisions | Future possibility |

---

## The Gap in Agentic Apps

**Current state of AI agents in web apps:**

```
User interacts with AI agent
        │
        ▼
Agent makes decisions, updates database
        │
        ▼
??? — Nothing tracks what happened or why
        │
        ▼
Next interaction starts cold
```

**No git equivalent.** Databases don't have:
- Commit history
- Diff between states
- "Why" attached to changes
- Session continuity for the agent

---

## What float.db Patterns Provide

**Patterns that transfer directly:**

| Pattern | Codebase Use | Agentic Backend Use |
|---------|--------------|---------------------|
| `log_entries` | Session decisions | Agent action log with rationale |
| Decision rationale | Why code changed | Why agent took this action |
| `open_questions` | Uncertainty tracking | "Agent wasn't sure about X" |
| `handoffs` | Session continuity | Multi-turn task continuity |
| Context compounding | AI understands codebase | AI understands user/task history |

**Patterns that adapt:**

| Codebase | Agentic Backend |
|----------|-----------------|
| `folders` table | `entities` or `tasks` table |
| `files` table with hashes | `records` or `state_snapshots` |
| Filesystem hierarchy | Domain model hierarchy |
| Git diff for staleness | Record hash diff for staleness |

---

## Where Scanner/Merkle Becomes Valuable

For codebases: Git exists → scanner redundant

For agentic backends: **No git** → scanner patterns valuable

```
Database records
        │
        ▼
Hash each record (like file hashing)
        │
        ▼
Merkle tree of entity states
        │
        ▼
Detect "what changed since agent last looked"
        │
        ▼
Staleness = data changed since last agent action
```

The Rust scanner infrastructure could track:
- Entity state hashes
- Change detection across records
- "What's different since agent last saw this user's data"

---

## The Agentic Backend Product

```
User interacts with AI agent in app
        │
        ▼
Agent queries float.db: "What do I know about this user/task?"
        │
        ▼
Agent makes decisions, updates data
        │
        ▼
FloatPrompt backend records:
├── What records were read
├── What records were changed
├── What decisions were made (with rationale)
├── What's uncertain / needs follow-up
└── State snapshot (merkle hash)
        │
        ▼
Next interaction:
├── "Last time, agent did X because Y"
├── "User's data changed since then" (staleness!)
├── "Open question about Z"
└── Agent has context + continuity + awareness
```

---

## The Schema Adaptation

**For agentic backend (hypothetical):**

```sql
-- Entities being tracked (like folders)
CREATE TABLE entities (
  id TEXT PRIMARY KEY,
  type TEXT,              -- 'user', 'order', 'document', etc.
  description TEXT,       -- AI understanding
  context TEXT,           -- Deeper context
  status TEXT,            -- pending/current/stale
  state_hash TEXT,        -- Hash of current state
  last_seen_at TEXT,      -- When agent last accessed
  ai_model TEXT,
  created_at TEXT,
  updated_at TEXT
);

-- Agent actions (like log_entries)
CREATE TABLE agent_actions (
  id INTEGER PRIMARY KEY,
  entity_id TEXT,
  action_type TEXT,       -- 'read', 'update', 'decision'
  decision TEXT,
  rationale TEXT,
  before_state TEXT,
  after_state TEXT,
  state_hash TEXT,        -- Snapshot reference
  created_at TEXT
);

-- Open items (same as open_questions)
CREATE TABLE open_items (
  id INTEGER PRIMARY KEY,
  entity_id TEXT,
  question TEXT,
  context TEXT,
  created_at TEXT,
  resolved_at TEXT,
  resolved_by TEXT
);
```

---

## Use Cases

**Customer support agent:**
- Track conversation history with rationale
- Know what changed about the customer since last interaction
- Surface unresolved issues from previous conversations

**Task automation agent:**
- Log why each decision was made
- Detect when task data changed (staleness)
- Hand off context to human or another agent

**Personal assistant:**
- Remember decisions across sessions
- Track what's uncertain or needs follow-up
- Compound understanding of user preferences

**Multi-agent workflows:**
- Agent-to-agent handoffs with context
- Audit trail of which agent did what
- Staleness detection when data changes between agents

---

## The Connection to Existing Products

```
                    FloatPrompt
                         │
          ┌──────────────┼──────────────┐
          │              │              │
          ▼              ▼              ▼
    npm package    Claude plugin    Agentic backend
    (web content)  (code context)   (app state)
          │              │              │
          ▼              ▼              ▼
    HTML → Markdown  Git + SQLite    DB + SQLite
    llms.txt        session context  agent memory
```

**Same philosophy across all three:**
- Make AI more capable through persistent context
- Track decisions with rationale
- Enable continuity across interactions
- Compound understanding over time

---

## Why This Matters

**The scanner work isn't wasted.**

For Claude Code plugin: Simplify to git-native (remove scanner)
For agentic backend: Scanner patterns become the foundation

Different substrates need different infrastructure:
- Codebases have git → use git
- Web apps don't have git → build tracking layer

---

## Open Questions

1. **Market:** Is there demand for "agent memory as a service"?
2. **Competition:** What exists in this space? (LangChain memory, etc.)
3. **Integration:** How would this plug into existing agent frameworks?
4. **Hosting:** Local SQLite vs cloud service?
5. **Pricing:** Open source core + hosted service (like the web vision)?

---

## Next Steps (If Pursuing)

1. Research existing agent memory solutions
2. Talk to developers building agentic apps
3. Prototype: float.db for a simple agent workflow
4. Validate: Does the scanner/merkle pattern actually help for DB state?

---

## The Irony, Restated

> Built infrastructure for tracking file changes.
> That infrastructure is redundant where git exists (codebases).
> That infrastructure is valuable where git doesn't exist (app databases).
>
> **The scanner isn't wrong. It's in the wrong product.**

---

## Related Files

| Document | Path |
|----------|------|
| Git-native plan | `active/2026-01-10-git-native-architecture-plan.md` |
| Git Layer 1 insight | `active/2026-01-10-git-layer1-insight.md` |
| Web package | `web/README.md` |
| Plugin README | `plugins/floatprompt/README.md` |

---

*Captured: Session 60, January 10, 2026*
*Status: Future possibility — not blocking current work*
