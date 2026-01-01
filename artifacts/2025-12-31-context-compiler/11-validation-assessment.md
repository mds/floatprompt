---
title: Validation Assessment
type: analysis
created: 2025-12-31
status: critical

human_author: @mds
human_intent: Define what proves or disproves the FloatPrompt thesis
human_context: Before building more, need clear success/failure criteria

ai_model: Claude Opus 4.5
ai_updated: 2025-12-31
ai_notes: Intellectual honesty about what would make this wrong
---

# Validation Assessment

What proves or disproves the FloatPrompt thesis.

---

## The Thesis

> AI lacks persistent, structured, evolving project context.
> FloatPrompt provides it.
> This is valuable enough that people will adopt it.

Three claims. Each must be validated.

---

## Claim 1: The Problem Exists

**Thesis:** AI lacks persistent, structured, evolving project context.

### Evidence FOR (observed)

| Evidence | Source |
|----------|--------|
| AI asks "what framework?" every session | Universal experience |
| Context window limits force summarization | Technical constraint |
| Chat history doesn't capture decisions | Structural limitation |
| IDE context is ephemeral | Tool limitation |
| RAG returns chunks, not understanding | Architectural limitation |
| Same mistakes repeated across sessions | No learning mechanism |

### Evidence AGAINST (hypothetical)

| Evidence | Would Mean |
|----------|------------|
| AI models get unlimited context | Brute force might work |
| AI models get persistent memory | Built-in solution |
| IDE integration solves this | Proprietary solutions win |
| Users don't notice the problem | Pain isn't acute enough |

### Validation Test

**Ask 10 developers:**
1. "Do you repeat the same context to AI across sessions?"
2. "Does AI make mistakes because it doesn't know your project?"
3. "How do you handle project context with AI tools?"

**Success:** 8+ say yes to #1 and #2, no good answer for #3
**Failure:** Most have solved this another way

### Current Assessment

**VALIDATED.** The problem is real and widely experienced. No existing solution addresses it well.

---

## Claim 2: FloatPrompt Solves It

**Thesis:** Structured context in `.float/` gives AI accurate project understanding.

### Evidence FOR (observed in this session)

| Evidence | Observation |
|----------|-------------|
| Boot sequence works | Reading system.md gave instant project awareness |
| Nav files provide structure | Knew folder purposes without scanning |
| Context files capture meaning | Understood project goals from terrain map |
| Decisions persist | Could reference past choices |

### Evidence AGAINST (observed in this session)

| Evidence | Observation |
|----------|-------------|
| Drift happens | Context said v0.14.0, tools at v0.17.0 |
| Maintenance is manual | Had to run /float-sync to find issues |
| References go stale | `system.md` reference but file is `float.md` |
| Coverage is incomplete | Only 2 nav files for 5 folders |

### Validation Tests

**Test A: Fresh AI Session**
1. Give AI a project with `.float/`
2. Give AI same project without `.float/`
3. Ask identical questions
4. Compare accuracy and speed

**Success:** With `.float/` is measurably better
**Failure:** No significant difference

**Test B: Drift Detection**
1. Make changes to project
2. See if AI notices inconsistencies
3. See if `/float-*` tools catch drift

**Success:** Drift is caught and surfaced
**Failure:** Drift goes unnoticed

**Test C: Decision Recall**
1. Record a decision in decisions.md
2. New session, ask about that decision
3. See if AI knows it

**Success:** Decision is recalled accurately
**Failure:** AI doesn't find or use it

### Current Assessment

**PARTIALLY VALIDATED.** The approach works when maintained. The maintenance burden is the weak point. Templating/compilation addresses this.

---

## Claim 3: People Will Adopt It

**Thesis:** The value is worth the adoption cost.

### Adoption Costs

| Cost | Weight |
|------|--------|
| Learning curve | Medium — new concepts |
| Installation friction | Low — `npx floatprompt init` |
| Maintenance burden | High — keeping context fresh |
| Mental model shift | Medium — thinking in context |
| Workflow change | Low — additive, not replacement |

### Adoption Benefits

| Benefit | Weight |
|---------|--------|
| Faster AI onboarding | High — immediate value |
| Fewer repeated explanations | High — daily pain relief |
| Better AI accuracy | High — quality improvement |
| Decision persistence | Medium — long-term value |
| Portable across tools | Medium — flexibility |

### Validation Tests

**Test A: Install Friction**
1. Time from discovery to working `.float/`
2. Count steps and errors

**Success:** < 5 minutes, < 3 commands
**Failure:** > 15 minutes or requires debugging

**Test B: First Value**
1. Time from install to "aha" moment
2. What triggers the realization

**Success:** < 1 session, clear benefit
**Failure:** Benefit unclear after multiple sessions

**Test C: Continued Use**
1. Do users keep using it after 1 week?
2. Do they maintain the context?

**Success:** > 50% still active, context updated
**Failure:** Abandoned or stale

**Test D: Recommendation**
1. Would users recommend to others?
2. NPS score

**Success:** NPS > 30
**Failure:** NPS < 0

### Current Assessment

**UNVALIDATED.** No external users yet. Internal use (this project) shows promise but isn't objective.

---

## What Would Prove the Thesis

| Milestone | Significance |
|-----------|--------------|
| 10 users install and use for 1 week | Early adoption works |
| 5 users maintain context actively | Maintenance is tractable |
| 3 users report measurable improvement | Value is real |
| 1 user builds a vertical extension | Platform potential |
| Community contributions | Ecosystem forming |

---

## What Would Disprove the Thesis

| Signal | Meaning |
|--------|---------|
| Users install but don't maintain | Burden too high |
| AI doesn't use the context effectively | Format doesn't work |
| No measurable improvement in AI accuracy | Value isn't real |
| Better alternatives emerge | Market moves on |
| Context windows become unlimited | Problem dissolves |

---

## Risks by Layer

### Layer 0: Schema
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Schema too rigid | Medium | High | Extension points |
| Schema too loose | Low | Medium | Validation |
| Breaking changes needed | High | High | Versioning strategy |

### Layer 1: Core
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Maintenance burden | High | Critical | Templating system |
| Poor AI adoption | Medium | Critical | Clear boot protocol |
| Cross-platform issues | Medium | Medium | Portable format |

### Layer 2: Router
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Not smart enough | Medium | High | Iterative improvement |
| Too slow | Low | Medium | Caching |
| Wrong abstractions | Medium | High | User feedback |

### Layer 3: Engine
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Too noisy | Medium | Medium | Tunable sensitivity |
| Misses drift | Medium | High | Multiple detection methods |
| Wrong updates | Medium | High | Human approval |

### Layer 4: Verticals
| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| No one builds them | Medium | Medium | Build first one yourself |
| Incompatible extensions | Medium | High | Clear contracts |
| Fragmentation | Low | Medium | Core vs extension boundary |

---

## Critical Assumptions

These must be true for FloatPrompt to work:

| Assumption | Confidence | If Wrong |
|------------|------------|----------|
| AI reads and uses structured context | High | Fundamental failure |
| Markdown is a good format | High | Format change needed |
| Users will run maintenance commands | Medium | Automation needed |
| Decisions are worth capturing | Medium | Scope reduction |
| Verticals will want to extend | Low | Just a tool, not a platform |

---

## The Honest Summary

### What's Validated
- The problem exists (AI lacks project context)
- The approach works (structured context helps)
- The format is reasonable (`.md` with `<fp>` tags)

### What's Unvalidated
- People will adopt it
- Maintenance is tractable at scale
- Verticals will build on it
- It's better than alternatives that don't exist yet

### What Would Kill It
- Maintenance burden exceeds value
- AI models solve this natively
- A simpler solution emerges
- No one cares enough to adopt

---

## Next Validation Steps

| Priority | Action | Validates |
|----------|--------|-----------|
| 1 | Stabilize core, reduce maintenance | Claim 2 |
| 2 | Get 10 external users | Claim 3 |
| 3 | Measure before/after AI accuracy | Claim 2 |
| 4 | Track 1-week retention | Claim 3 |
| 5 | Attempt first vertical | Platform thesis |

---

## Decision Point

**If after 10 users and 1 month:**
- Retention < 30% → Pivot or abandon
- Retention 30-50% → Simplify, reduce friction
- Retention > 50% → Scale, build Layer 2

**If after first vertical:**
- No one builds one → It's a tool, not a platform
- Hard to build → Schema needs work
- Easy to build → Platform validated

---

## The Bottom Line

The thesis is **plausible but unproven**.

- Problem: Validated
- Solution: Partially validated (works but maintenance is hard)
- Adoption: Unvalidated

The templating/compilation work directly addresses the biggest risk (maintenance burden). That's the right priority.

External validation is the next critical step. Internal use isn't objective.
