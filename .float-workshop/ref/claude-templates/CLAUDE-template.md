# [Project Name] — Agent Instructions

> **Read this file first.** It tells you what this project is, where things live, and how to work.

## Project Overview

[2-3 sentences. What are you building? Who is it for? What's the current state?]

**Tech Stack:** [e.g., Next.js 14+, TypeScript, Vercel, SQLite]
**Current Status:** [Not Started / In Progress / Testing / Deployed]

---

## Directory Structure

```
project/
├── CLAUDE.md                  ← You are here (read first)
├── .float/
│   ├── prd.md                 ← BUILD SPEC: What to build and how
│   ├── features.json          ← CHECKLIST: Testable features with status
│   ├── claude-progress.md     ← CONTINUITY: Session log (read at start, update at end)
│   │
│   ├── spec.md                ← REFERENCE: Boundaries, data schema
│   ├── tech-stack.md          ← REFERENCE: Technology decisions
│   ├── design.md              ← REFERENCE: Aesthetic principles
│   ├── decisions.md           ← REFERENCE: ADRs (why we chose X)
│   ├── vision.md              ← REFERENCE: North star (not for execution)
│   └── reference/             ← REFERENCE: Screenshots, docs, assets
│
├── src/                       ← Your code goes here
├── [app-directory]/           ← [If different from src/]
└── package.json
```

---

## Essential Reading (Every Session)

**Read these files at the start of every session, in this order:**

1. **`.float/claude-progress.md`** — What was done in previous sessions, current blockers
2. **`.float/features.json`** — Which features are passing, failing, untested
3. **`.float/prd.md`** — The build spec (features, acceptance criteria, implementation order)

---

## Reference Documents (Read When Needed)

| Document | When to Reference |
|----------|-------------------|
| `spec.md` | Understanding boundaries, data schema |
| `tech-stack.md` | Setup, dependencies, "why this technology?" |
| `design.md` | Implementing UI, aesthetic decisions |
| `decisions.md` | Understanding past architectural choices |
| `vision.md` | Understanding the "why" (rarely needed during build) |

---

## How to Work

### Starting a Session

1. Read `claude-progress.md` — understand what was done and any blockers
2. Read `features.json` — see current status (passing/failing/untested)
3. Check for any `blocked` or `failing` features that need attention
4. Identify the next `untested` feature to implement (follow Implementation Order in PRD)

### Implementing Features

1. **One feature at a time.** Complete and verify before moving to the next.
2. **Follow the Implementation Order** from the PRD — it's a command, not a suggestion.
3. **Verify each feature works** before marking it done:
   - `curl` for headers, API responses
   - Browser/visual check for UI features
   - Run tests for logic features
4. **Update `features.json` immediately** after verification:
   - Set `status` to `passing`, `failing`, or `blocked`
   - Add `verified_at` timestamp
   - Add `notes` for any important context
5. **Commit after each feature** or logical group of features.

### Ending a Session

1. Commit all code with a descriptive message
2. Update `claude-progress.md` with:
   - **Completed:** What you finished
   - **In Progress:** Anything partially done
   - **Blockers:** Issues preventing progress
   - **Notes:** Context for the next session
3. Ensure `features.json` reflects current state
4. Leave the codebase in a **clean, runnable state**

---

## Rules

- **Do not skip features** — work through them in Implementation Order
- **Do not mark features as `passing`** until actually verified
- **Do not declare the project complete** until all required features pass
- **Commit frequently** — after each feature or logical group
- **Update progress log** at the end of every session
- **Ask for human input** on subjective decisions (design choices, UX tradeoffs)

---

## Environment Variables

[List required environment variables. Remove this section if none.]

```bash
# Required
[VAR_NAME]=           # [What it's for]
[VAR_NAME]=           # [What it's for]

# Optional
[VAR_NAME]=           # [What it's for, default value]
```

> See `tech-stack.md` for detailed setup instructions.

---

## Quick Commands

```bash
# Development
[npm run dev / yarn dev / etc.]

# Build
[npm run build]

# Test
[npm test]

# Lint
[npm run lint]
```

---

## Current Focus

[Optional: What should Claude focus on right now? Remove if not needed.]

**Priority:** [e.g., "Complete authentication features before moving to navigation"]

**Blocked on:** [e.g., "Waiting for API key from client" or "None"]

---

*This file is the entry point for Claude Code. Keep it updated as the project evolves.*
