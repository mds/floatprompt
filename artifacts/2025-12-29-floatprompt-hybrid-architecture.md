---
title: FloatPrompt Hybrid Architecture
type: exploration
status: active
created: 2025-12-29

human_author: @mds
human_intent: Capture insights on code + FloatPrompt architecture and market opportunities
human_context: Emerged from conversation about the future of programming

ai_model: Claude Opus 4.5
ai_updated: 2025-12-29
ai_notes: |
  Conversation explored: AI-only limitations, hybrid potential, TAM analysis.
  Key insight: FloatPrompt is a judgment layer, not a replacement for code.
---

# FloatPrompt Hybrid Architecture

## The Shift

**Old model:** Human writes precise instructions → Machine executes exactly
**New model:** Human writes intent + constraints → AI figures out execution

FloatPrompt represents a new kind of programming:
- Specs over code
- Constraints over control flow
- Patterns over procedures
- Prose as program

## Honest Assessment: AI-Only Limitations

**Traditional code wins on:**
| Strength | Description |
|----------|-------------|
| Determinism | Same input = same output, always |
| Testability | Unit tests, CI/CD, coverage reports |
| Debuggability | Stack traces, breakpoints, logging |
| Refactoring | IDE support, type systems catch errors at compile time |
| Reproducibility | Exact state, version pinned, deployable |

**AI behavior struggles with:**
| Challenge | Description |
|-----------|-------------|
| Probabilistic | Same prompt ≈ similar output (not guaranteed) |
| Model drift | New model version → behavior changes |
| Testing | How do you unit test a prompt? |
| Debugging | "Why did it do that?" often unanswerable |
| Fragility | Small prompt changes → unexpected cascades |

FloatPrompt adds **structure to chaos** — duality, status formats, approval gates, clear contracts. But those are guardrails, not guarantees.

## The Hybrid Sweet Spot

The future isn't AI-only or code-only. It's both.

### Code Handles (Deterministic Foundation)
- File I/O, git, npm, builds
- Validation, linting, type checking
- Test execution, CI/CD pipelines
- Operations that *must* be reliable

### FloatPrompt Handles (Judgment Layer)
- What needs attention (judgment)
- How to describe changes (language)
- When to ask for approval (discretion)
- What "done" looks like (intent)

### Examples

```
Traditional code:     "Run these 47 files through the linter"
FloatPrompt layer:    "Which lint errors actually matter for this PR?"

Traditional code:     "Here are 200 test failures"
FloatPrompt layer:    "3 are real bugs, 197 are from that API rename"

Traditional code:     "Commit staged files"
FloatPrompt layer:    "Here's a commit message that captures the why"
```

**Code = reliable execution engine**
**FloatPrompt = intelligent judgment layer**

Claude Code already demonstrates this — TypeScript infrastructure + AI judgment. FloatPrompt makes the judgment layer *structured and portable*.

## Market Opportunities (TAM Analysis)

High TAM applications that benefit from code + FloatPrompt:

| Category | Apps | Why FloatPrompt Fits |
|----------|------|---------------------|
| **Email** | Gmail, Outlook | Triage, drafting, follow-up judgment. Billions of users. |
| **CRM** | Salesforce, HubSpot | Lead scoring, next-action, follow-up timing. $50B+ market. |
| **Support** | Zendesk, Intercom | Ticket routing, response drafting, escalation judgment. |
| **Dev Tools** | IDEs, CI/CD, GitHub | Code review, PR descriptions, test prioritization. |
| **Docs/Writing** | Notion, Google Docs | Structure suggestions, editing, summarization. |
| **Spreadsheets** | Excel, Sheets | Formula suggestions, anomaly detection, data cleaning. |
| **Project Mgmt** | Jira, Asana, Linear | Status updates, prioritization, blocker detection. |
| **Calendar** | Google Calendar | Scheduling judgment, conflict resolution, prep suggestions. |

### Biggest Opportunities

1. **Email** — Massive TAM, everyone has it, 90% is judgment (reply? ignore? delegate?)
2. **CRM** — Enterprise $$$, sales teams live in it, "what do I do next?" is the whole job
3. **Support** — High volume, repetitive judgment, clear success metrics
4. **Spreadsheets** — Universal tool, "make sense of this data" is pure judgment

### The Pattern

**High-volume workflows where humans currently make repetitive judgment calls** that are hard to codify in traditional rules but easy to describe in natural language.

FloatPrompt's "duality + approval gates" is perfect — AI proposes, human approves, deterministic code executes.

## Docs/Writing: Easiest Win

**Why docs/writing is lowest friction:**

1. **Medium is native** — FloatPrompt is already markdown. No translation layer.
2. **Users expect suggestions** — Spell check, Grammarly trained this behavior
3. **Low stakes per edit** — Accept/reject inline, undo is easy
4. **Iterative by nature** — Writing already *is* a propose/revise loop
5. **No integration complexity** — It's just text manipulation
6. **Version control exists** — Google Docs history, git for markdown

### FloatPrompt Patterns Map to Writing

| Writing Problem | FloatPrompt Equivalent |
|-----------------|----------------------|
| "Too long" | Propose split (like buoys decomposing tasks) |
| "Unclear structure" | Propose reorder (like nav sync) |
| "Stale content" | Flag + propose update (like /float-fix) |
| "Missing context" | Propose additions (like /float-enhance) |
| "Inconsistent tone" | Propose edits with rationale |

### Implementation Path

A "FloatPrompt for Notion/Obsidian" plugin could be built today:

```
Duality example:
  condition_a: "Section > 500 words, no subheadings"
  action_a: "Propose structure with heading suggestions"
  condition_b: "Section well-structured"
  action_b: "No action needed"
```

Lowest lift, clearest value, fastest validation.

## Architecture Summary

```
┌─────────────────────────────────────────┐
│           User Intent                    │
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      FloatPrompt Judgment Layer          │
│  ┌─────────────────────────────────────┐│
│  │ Duality patterns                    ││
│  │ Status formats                      ││
│  │ Approval gates                      ││
│  │ Next step logic                     ││
│  └─────────────────────────────────────┘│
└─────────────────┬───────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────┐
│      Traditional Code Foundation         │
│  ┌─────────────────────────────────────┐│
│  │ File operations                     ││
│  │ Git, npm, builds                    ││
│  │ Validation, testing                 ││
│  │ Deterministic execution             ││
│  └─────────────────────────────────────┘│
└─────────────────────────────────────────┘
```

## Key Insight

FloatPrompt isn't replacing programming — it's adding a **structured judgment layer** on top of deterministic foundations.

The future: **deterministic foundations, probabilistic intelligence, clear contracts between them.**

---

*Captured from conversation on 2025-12-29*
