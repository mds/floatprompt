<fp>
<json>
{
  "STOP": "Filesystem Watcher Decisions. Architectural decisions and rationale for the self-healing FloatPrompt System.",

  "meta": {
    "title": "Filesystem Watcher Decisions",
    "id": "filesystem-watcher-decisions",
    "format": "floatprompt",
    "version": "0.1.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Capture the key decisions made during filesystem watcher design",
    "context": "Part of filesystem-watcher artifact exploration"
  },

  "ai": {
    "role": "Decision reference",
    "behavior": "Understand the 'why' behind architectural choices"
  },

  "requirements": {
    "purpose": "Document decisions with rationale so future sessions understand the reasoning",
    "format": "Question → Decision → Rationale"
  }
}
</json>
<md>
# Filesystem Watcher Decisions

**Key decisions made during the design of the filesystem watcher system.**

Each decision includes the question, what was decided, and why.

---

## Architecture Decisions

### 1. Three-Layer Architecture

**Question:** How should responsibilities be divided?

**Decision:** Three distinct layers:
1. **Code Layer** — Mechanical detection (filesystem watcher, detect functions)
2. **Buoy Layer** — AI agents (Scout, Map, Think)
3. **Command Layer** — Text tools (float-sync, float-fix, etc.)

**Rationale:** Clear separation allows:
- Code layer runs free (no API costs)
- Buoys can be individually configured/upgraded
- Commands remain human-invocable
- Each layer can evolve independently

---

### 2. Scout Two-Phase Design

**Question:** Should Scout be one buoy or two phases?

**Decision:** Scout is two phases within one conceptual buoy:
- **scout-detect** — Pure code, runs on every change, gathers raw data
- **scout-map** — Lightweight AI, assesses the change, produces report

**Rationale:**
- Most changes are trivial (save a file, nothing affected)
- Code can filter out noise before AI is invoked
- Reduces API costs significantly
- scout-detect is instant; scout-map only runs when needed

**Flow:**
```
Change → scout-detect (code) → trivial? → done
                             → non-trivial? → scout-map (AI) → Map Buoy
```

---

### 3. Chain of Command

**Question:** Can buoys skip other buoys for simple cases?

**Decision:** No shortcuts. Chain always flows: `Code → Scout → Map → Think → Act`

**Rationale:**
- Consistent behavior is predictable
- Paper trail captures every decision
- "Simple" is subjective — let Think decide what's simple
- Prevents bugs from special-case logic

**Exception:** scout-detect (code phase) can filter out truly trivial changes (ignored files, noise) before scout-map runs. This is filtering, not skipping the chain.

---

### 4. Buoys vs Commands vs Code

**Question:** What's the naming distinction between these concepts?

**Decision:**
- **Code** — JavaScript/Node.js functions that run mechanically (detect, parse, check)
- **Buoys** — AI agents that assess, decide, coordinate (Scout, Map, Think)
- **Commands** — Text-based tools invoked by `/float-*` (float-sync, float-fix, float-think)

**Rationale:**
- Code is free, instant, deterministic
- Buoys require AI, have judgment, log decisions
- Commands are the interface — both buoys and humans use them
- Clear vocabulary prevents confusion

---

### 5. Paper Trail Requirement

**Question:** How much should be logged?

**Decision:** Every AI decision logged with full rationale. No exceptions.

**Rationale:**
- Automation without accountability is dangerous
- Humans need to trace back when things go wrong
- Patterns emerge from reviewing decisions
- Trust is built through transparency

---

### 6. State File Location

**Question:** Where should watcher state live?

**Decision:** `.float/project/.watcher.json`

**Rationale:**
- `.float/floatprompt/` is for system internals (don't modify)
- `.float/project/` is for project-specific data
- Watcher state is project-specific (not part of floatprompt core)
- Consistent with existing split

---

### 7. Version Source

**Question:** How does the watcher know the current project version?

**Decision:** Read from `package.json` version field, with fallback to `.float/project/context/*.md` frontmatter.

**Rationale:**
- `package.json` is the standard source for Node projects
- Context files have version in frontmatter as backup
- Avoids creating another config location
- Works for non-npm projects too

---

### 8. Initial Scan Scope

**Question:** What should the initial scan check for?

**Decision:** Check all staleness types:
1. Broken references (links that don't resolve)
2. Timestamp drift (ai_updated older than file mtime)
3. Version mismatches (old version strings)
4. Missing frontmatter (files that should have it)
5. Orphaned nav entries (files listed that don't exist)

**Rationale:**
- First boot should surface all known issues
- Better to know everything upfront
- User can then decide what to address
- Sets baseline for ongoing monitoring

---

### 9. Offline/Backlog Handling

**Question:** What happens when watcher comes back online with queued changes?

**Decision:**
1. Queue changes during offline period
2. On reconnect, batch process through scout-detect
3. Consolidate redundant changes (file modified 5 times = 1 change)
4. Send consolidated batch to scout-map
5. Log "backlog processed" with count

**Rationale:**
- Don't lose changes during offline
- Don't flood API with redundant calls
- Consolidation is smart (final state matters, not intermediate)
- User sees what happened in logs

---

### 10. Flood Threshold

**Question:** When is a change set too large for normal processing?

**Decision:** 20+ files in one batch triggers flood handling.

**Rationale:**
- 20 files is roughly "git checkout" or "npm install" territory
- Below 20, normal buoy chain can handle it
- Above 20, need chunking via /float-plan
- Configurable for projects with different needs

---

## Open Questions

### Model Selection Strategy

**Question:** How should models be selected per buoy?

**Status:** Partially decided.
- Scout: Haiku (speed)
- Map: Haiku, escalate to Sonnet for needs-judgment
- Think: Sonnet (better reasoning)

**Still open:** Should there be an "auto" mode that selects based on complexity?

---

### Human Interrupt

**Question:** Can humans interrupt the buoy chain mid-execution?

**Status:** Not decided. Current assumption is chain runs to completion, human reviews after.

**Consideration:** For long-running chains, might want interrupt capability.

---

### Multi-Project Future

**Question:** How will multi-project watching work?

**Status:** Deferred. Current scope is one project per watcher.

**Notes from conversation:** "maybe in the future we can have a liaison" — suggests some coordination layer between projects.

---

### PR Output for Significant Changes

**Question:** Should Think Buoy create PRs for significant/needs-judgment changes instead of just logging?

**Status:** Future consideration. Inspired by production error auto-fix patterns.

**The pattern (seen on X):**
```
Production Error → Vercel Log Drain → Webhook → GitHub Actions → AI Agent → PR + Email
```

**How it could apply here:**
```
Filesystem Change → Watcher → Buoys → needs-judgment
         ↓
    Think Buoy creates branch
         ↓
    Makes proposed changes
         ↓
    Opens draft PR
         ↓
    Notifies human (email, Slack, etc.)
```

**Benefits:**
- Paper trail becomes actual git history
- Human review happens in familiar PR interface
- Changes can be approved, modified, or rejected
- CI/CD can validate proposed changes

**When to use:**
- `needs-judgment` confidence level
- Multiple files affected
- Structural changes to `.float/`
- Any change to `system.md`

**When NOT to use:**
- `routine` confidence (just execute and log)
- Single file description updates
- Trivial fixes

**Implementation consideration:** Could integrate with GitHub Actions similar to the error auto-fix pattern. Watcher triggers webhook → GitHub Action runs → AI proposes PR.

---

## Decision Log Format

Decisions should be added here as they're made:

```markdown
### [Number]. [Title]

**Question:** [What was being decided]

**Decision:** [What was decided]

**Rationale:** [Why this was chosen]

**Date:** [When decided]
```

---

*Decisions for the filesystem watcher system.*
</md>
</fp>
