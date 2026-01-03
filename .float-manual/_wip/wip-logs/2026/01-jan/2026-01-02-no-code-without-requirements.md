# No Code Without Requirements

**Date:** 2026-01-02
**Status:** Locked

---

## Decision

**Map → Decide → Structure is a GATE, not a suggestion.**

Before writing ANY code, AI must be able to answer:

> "Can I write a complete spec for this code without any gaps?"

If NO → don't write code yet. Go back to Map or Decide.

---

## Context

AI built `src/db/schema.ts` and `src/db/index.ts` after human said "do 1 and 2" (update wip-sqlite.md, start TypeScript implementation).

AI interpreted this as permission to write code immediately, without:
- Mapping what "scanner" actually means
- Deciding on the API design
- Locking requirements for Phase 2 vs Phase 3
- Getting explicit approval on approach

Human caught this and pushed back: "do you know exactly how you need to build the 2-part scanner?"

AI admitted gaps. Human correctly identified this as a violation of the float-os methodology.

---

## The Rule

### Process (Mandatory)

```
1. MAP the territory
   - What exists?
   - What's needed?
   - What's unclear?

2. DECIDE the approach
   - Lock every decision
   - Document gaps
   - Get explicit approval

3. STRUCTURE the solution
   - Only NOW write code
   - If gaps appear → STOP → back to Decide
```

### Anti-Patterns

| Anti-Pattern | Why It's Wrong |
|--------------|----------------|
| "Let me build this to see if it works" | Code is not a thinking tool — specs are |
| "I'll figure it out as I go" | You'll build the wrong thing |
| "do 1 and 2" = permission to skip planning | NO — still need locked requirements |
| Assuming you know what's needed | You don't — ask first |

---

## What Was Built

```
src/db/
└── schema.ts    # Zod schemas + SQL DDL for all 7 tables
```

**Status:** Direct translation of locked wip-sqlite.md schema. HIGH confidence. Kept.

## What Was Deleted

```
src/db/
└── index.ts     # FloatDB class with CRUD operations (DELETED)
```

**Reason:** Speculative API design without locked requirements. Removed to avoid anchoring bias when we properly map Phase 2. In git history if needed.

### The Correction

Human asked: "do you know exactly how you need to build the 2-part scanner?"

AI admitted gaps. Human pushed back. AI recommended deleting speculative code. Human approved.

**Result:** Clean slate for Phase 2. Only the locked schema remains.

---

## Files Changed

| File | Change |
|------|--------|
| `wip-boot.md` | Added CRITICAL_no_code_without_requirements to JSON |
| `wip-boot.md` | Added "No Code Without Locked Requirements" section |
| `wip-boot.md` | Added "Real Example: The Scanner Mistake" |
| `wip-boot.md` | Added src/db/ implementation status and confidence |
| `2026-01-02-no-code-without-requirements.md` | Created — this file |

---

## Future Agent

| Work Type | Agent |
|-----------|-------|
| Enforce methodology | `orchestrator` — should gate code generation |
| Validate requirements | `requirement_validator` — check for gaps before Structure phase |

---

**Do not revisit. This is a permanent rule.**
