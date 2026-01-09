# [Project Name] — PRD

**Status:** Draft | Ready | Building | Complete
**Version:** 1.0 (v1 scope)
**Last Updated:** YYYY-MM-DD

---

## Core Problem

[1-2 sentences. What pain exists today? Why does this need to be built?]

---

## Overview

[2-3 sentences. What is this? Who is it for? What does it do?]

**Domain:** [URL, CLI context, or runtime environment]
**Source of Truth:** [Where does data live? Single DB? External API? Filesystem?]

---

## Users

| User Type | Description | Primary Actions |
|-----------|-------------|-----------------|
| [type] | [who they are] | [what they do] |

**When this tool adds value:**
- [Condition where it's worth using]
- [Another condition]

**When it's overkill:**
- [Condition where simpler solutions work]

---

## Technical Stack

| Component | Technology | Notes |
|-----------|------------|-------|
| Runtime | [e.g., Next.js 14+, Node.js] | |
| Database | [e.g., SQLite, PostgreSQL, none] | |
| Hosting | [e.g., Vercel, local CLI] | |
| Auth | [e.g., httpOnly cookie, API key, none] | |
| Key Libraries | [e.g., react-markdown, zod] | |

> `→ see tech-stack.md for full technology rationale and version details`

---

## Configuration

| Variable | Required | Description | Example |
|----------|----------|-------------|---------|
| [VAR_NAME] | Yes/No | [what it configures] | [example value] |

**Philosophy:** [e.g., "Zero configuration for v1" or "Explicit over implicit"]

> `→ see tech-stack.md for full environment variable documentation and setup instructions`

---

## Data Schema

[Define tables, fields, types. Be explicit about structure.]

**[table_name]**

| Field | Type | Description |
|-------|------|-------------|
| [field] | [TEXT/INTEGER/BOOLEAN] | [what it stores] |

> `→ see spec.md for full schema details and relationships`

---

## Features

### [Area 1: e.g., Authentication]

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| [AREA-001] | [feature name] | [what happens] | [how to verify — testable] |
| [AREA-002] | | | |

> **Key insight:** [Crucial understanding for this area that Claude must internalize]

---

### [Area 2: e.g., Navigation]

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| [AREA-001] | | | |

---

### [Area 3: e.g., Content Rendering]

**File/Input Handling:**

| Type | Behavior |
|------|----------|
| [input type] | [what the system does with it] |

| ID | Feature | Behavior | Acceptance Criteria |
|----|---------|----------|---------------------|
| [AREA-001] | | | |

---

### [Area N: Add as needed]

[Repeat the pattern. Each area should be a logical grouping.]

---

## UI Philosophy

[2-4 bullet points. Design direction without being a full design doc.]

- [e.g., Minimal, Swiss-inspired]
- [e.g., Maximum whitespace, no decoration]
- [e.g., Content-forward, system fonts]
- [e.g., Light mode only for v1]

> `→ see design.md for detailed component specifications`

---

## Caching & Performance

| Resource | Strategy | TTL/Notes |
|----------|----------|-----------|
| [resource type] | [cache strategy] | [duration or behavior] |

[Skip this section if not applicable to your project type.]

---

## Error Handling

| Scenario | Behavior |
|----------|----------|
| [what breaks] | [graceful response] |
| [edge case] | [how system responds] |

**Philosophy:** [e.g., "Fail gracefully, never block user's work. Context is enhancement, not requirement."]

---

## Out of Scope (v1)

| Excluded | Rationale |
|----------|-----------|
| [feature/capability] | [why not now] |

[Be explicit. This prevents scope creep and gold-plating.]

---

## Implementation Order

1. [First thing to build — should be foundational]
2. [Second thing — builds on first]
3. [Third thing]
4. [Continue in dependency order...]

**Follow this sequence.** Each step should be completable and verifiable before the next begins.

---

## Success Criteria

### Must Have (v1 ship-blocking)

- [ ] [Testable requirement with clear pass/fail]
- [ ] [Another testable requirement]

### Should Have (v1 quality bar)

- [ ] [Testable requirement]

### Nice to Have (if time permits)

- [ ] [Testable requirement]

---

## Key Deliverables

| Deliverable | Type | Priority | Status | Notes |
|-------------|------|----------|--------|-------|
| [thing to build] | [Command/Agent/Hook/Component] | P0/P1/P2 | Not Started/In Progress/Done | |

---

## Design Progress

| Component | Status | Location |
|-----------|--------|----------|
| [component] | Not Started / Drafted / Done | [file path if exists] |

[Update this as work progresses. Helps Claude understand current state.]

---

## Open Questions

| Question | Status | Resolution |
|----------|--------|------------|
| [unresolved decision] | Open | — |
| [resolved question] | Resolved | [the answer] |

---

## References

| File | Contains | When to Reference |
|------|----------|-------------------|
| `vision.md` | North star, long-term goals | Understanding the "why" |
| `spec.md` | Detailed technical specification, data models | Deep implementation details |
| `tech-stack.md` | Technology decisions and rationale | Setup and dependencies |
| `design.md` | UI/UX patterns, component specs | Visual implementation |
| `decisions.md` | ADRs, rationale for past choices | Understanding constraints |
| `features.json` | Testable features with status tracking | Progress tracking, verification |
| `claude-progress.md` | Session log, blockers, implementation phases | Session continuity |
| `reference/visuals/` | Screenshots, mockups, inspiration | Visual reference |
| `reference/docs/` | External documentation | API docs, library guides |
| `reference/vendor/` | Third-party assets | Fonts, icons, etc. |

---

## Setup Instructions

[First-run bootstrap. What needs to happen to initialize the project?]

1. [Create necessary directories/files]
2. [Install dependencies]
3. [Configure environment variables]
4. [Run initial setup command]

---

## Build-Ready Checklist

- [ ] Core problem is clear
- [ ] All features have acceptance criteria
- [ ] Technical stack is defined
- [ ] Configuration variables documented
- [ ] Implementation order makes sense
- [ ] Out of scope is explicit
- [ ] No open questions blocking v1

**Build-ready:** Yes / No
**If no, blocking items:** [list what's missing]

---

*This PRD is optimized for Claude Code. Extract features to `features.json` for progress tracking.*
