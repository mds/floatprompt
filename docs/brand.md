---
title: FloatPrompt Brand & Naming
type: guide
status: current
created: 2026-01-04

human_author: "@mds"
human_intent: Naming conventions for FloatPrompt concepts

ai_model: Claude Opus 4.5
ai_notes: Established via naming discussion. Keep updated as system evolves.
---

# Brand & Naming

Naming conventions for FloatPrompt. What to call things, what not to call things, and why.

---

## The Test

> "Would I cringe explaining this to a senior engineer?"

If yes, don't use it.

---

## Branded Terms

These are FloatPrompt-specific. Use them.

| Term | What It Is | Why It Works |
|------|------------|--------------|
| **FloatPrompt** | The system | Trademarked. Core identity. |
| **Buoys** | Parallel task workers | Differentiating. Not "agents." See decision doc. |
| **Fleet** | Group of buoys | Natural extension. "Spawn a fleet." |
| **Float** | Command prefix | Verb form. "float sync", "float fix" |
| **MDS** | Map → Decide → Structure | The methodology. Already established. |

---

## Natural Vocabulary

These flow from the metaphor without forcing. Free to use.

| Term | Usage | Example |
|------|-------|---------|
| **Drift** | Context going stale | "Detected drift in /src/auth" |
| **Anchor** (verb) | Attach to context | "Buoys anchor to folder context" |
| **Shallow** | Quick context | "Grab shallow context for orientation" |
| **Deep** | Full context | "Need deep context for this decision" |
| **Stale** | Needs refresh | "Three folders marked stale" |
| **Fresh** | Recently updated | "Context is fresh" |

---

## Keep Generic

Don't brand these. Industry terms work fine.

| Term | Why Generic |
|------|-------------|
| **Scope** | Technical term. Clear. "Autonomous scope" is descriptive enough. |
| **boot.md** | Self-explanatory. No need for "lighthouse" or similar. |
| **Database** | It's SQLite. Just call it the database. |
| **Orchestrator** | Standard term for coordination. |
| **Layers 1/2/3** | Numbered layers are clear. |
| **Schema** | Technical term. Keep it. |
| **Scanner** | It scans. That's what it does. |

---

## Don't Use

These are too cute. Avoid.

| Term | Why Not |
|------|---------|
| **Marina** | Where buoys live? No. ".float/" is fine. |
| **Lighthouse** | The boot file? No. "boot.md" works. |
| **Harbor** | For scopes? No. "Scope" is clearer. |
| **Captain** | The human? Absolutely not. |
| **Dock** | The database? No. |
| **Mayor** | Orchestrator in city metaphor? Fun internally, too cute for production. |
| **Overboard** | When a buoy fails? Tempting but no. |

---

## The Rule

> If the metaphor extends naturally, use it. If you have to force it, don't.

**Natural:** "The fleet detected drift" — flows from existing terms.

**Forced:** "The captain docks at the marina" — requires a glossary.

---

## Context Depth

Use **shallow/deep**, not lean/full.

| Depth | Purpose | When |
|-------|---------|------|
| **Shallow** | Quick orientation | Mechanical workers, fast operations |
| **Deep** | Full understanding | Judgment workers, complex decisions |

---

## Naming New Concepts

When something new needs a name:

1. **Can it be generic?** Use the industry term.
2. **Does it need to differentiate?** Consider branded term.
3. **Does it flow from float/buoy?** It's free vocabulary.
4. **Does it require explanation every time?** Probably too cute.

---

## Buoy Buckets

Seven categories of buoys, by what they do:

| Bucket | Core Job |
|--------|----------|
| **Generators** | Create content (context, summaries, explanations) |
| **Validators** | Check correctness (staleness, quality, integrity) |
| **Fixers** | Repair problems (refs, paths, conflicts, sync) |
| **Mappers** | Internal connections (relationships, patterns, dependencies) |
| **Integrators** | External systems (Git, GitHub, CI/CD, IDE) |
| **Orchestrators** | Coordinate buoys (spawn, merge, prioritize, decide) |
| **Recorders** | Record activity (decisions, harvests, metrics, archives) |

All action-oriented. All clear. No explanation needed.

---

## Related

- `artifacts/2026-01-04-buoy-naming-decision.md` — Full rationale for "buoys"
- `docs/philosophy/voice.md` — Voice preservation principles

---

*Living document — update as the system evolves.*
