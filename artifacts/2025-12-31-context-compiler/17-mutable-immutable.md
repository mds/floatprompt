---
title: Mutable vs Immutable
type: architecture
created: 2025-12-31

human_author: @mds
human_intent: Define upfront what parts of the system are gospel vs contextual

ai_model: Claude Opus 4.5
ai_notes: Critical distinction — AI should self-update contextual parts but never touch immutable structure
---

# Mutable vs Immutable

**What AI can evolve vs what AI must preserve.**

---

## The Core Principle

> AI should be able to self-update as it discovers new information.
> But it should never lock contextual information as gospel.
> Structure and scaffolding are immutable. Understanding is fluid.

---

## The Split

### Immutable (Gospel Truth)

These are **contractual**. AI observes and documents them but does not interpret or evolve them:

| Category | Examples | Why Immutable |
|----------|----------|---------------|
| **File structure** | What files exist, folder hierarchy | Filesystem is ground truth |
| **Schema shapes** | JSON structure, required fields | Contract with consumers |
| **Template outputs** | Compiled .md matches source | Build reproducibility |
| **Code behavior** | What functions do (from tests) | Tests prove it |
| **Version numbers** | 0.17.0 is 0.17.0 | Semantic meaning |
| **Path references** | `.float/tools/` exists or doesn't | Reality check |
| **Naming conventions** | trifecta = map/decisions/context | Locked decisions |

**AI treatment:** Scan, verify, report. Never reinterpret.

---

### Mutable (Contextual Understanding)

These are **interpretive**. AI can update as understanding evolves:

| Category | Examples | Why Mutable |
|----------|----------|-------------|
| **Purpose descriptions** | "This folder handles auth" | Understanding deepens |
| **Decision rationale** | "We chose X because Y" | Memory can be incomplete |
| **Trade-off assessments** | "This is faster but less safe" | Context changes |
| **Relationship maps** | "A depends on B" | Discoveries happen |
| **Gotchas and warnings** | "Watch out for X" | New gotchas emerge |
| **Usage guidance** | "Start here, then go there" | Better paths discovered |
| **Historical context** | "This was built during era X" | New perspective gained |

**AI treatment:** Draft, label source, date stamp, allow revision.

---

## The Labeling System

Every piece of context should be labeled:

### Immutable Label
```markdown
## File Structure
*Source: Filesystem scan, 2025-12-31*
*Type: IMMUTABLE — reflects actual state*

| File | Exists |
|------|--------|
| config.ts | ✓ |
| providers/ | ✓ |
```

### Mutable Label
```markdown
## Purpose

*Source: Interview with @mds, 2025-12-31*
*Type: CONTEXTUAL — may evolve*

This authentication system handles user sessions for the main application.
We chose NextAuth because enterprise clients need self-hosting capability.

*Last validated: 2025-12-31*
```

---

## AI Self-Update Rules

### CAN Update (Mutable)
- [ ] Refined understanding based on new code analysis
- [ ] Corrected rationale after human clarification
- [ ] Additional gotchas discovered during use
- [ ] Better navigation paths identified
- [ ] Relationship changes detected

### CANNOT Update (Immutable)
- [ ] File existence (must re-scan to verify)
- [ ] Schema structure (must match source)
- [ ] Version numbers (must read from source)
- [ ] Path references (must validate against filesystem)
- [ ] Locked decisions (require human unlock)

---

## The Update Flow

```
AI discovers new information
         ↓
Is it about STRUCTURE or UNDERSTANDING?
         ↓
    ┌────┴────┐
    ↓         ↓
STRUCTURE   UNDERSTANDING
    ↓         ↓
Re-scan     Update mutable section
Verify      Add "Updated: date"
Report      Add "Reason: discovery"
drift       Preserve previous version
```

---

## Version Control for Mutable Content

When AI updates contextual understanding:

```markdown
## Purpose

*Source: Interview with @mds, 2025-12-31*
*Type: CONTEXTUAL — may evolve*
*Updated: 2025-12-31 by Claude (code analysis)*

This authentication system handles user sessions for the main application.
We chose NextAuth because enterprise clients need self-hosting capability.

> **Update note:** Added detail about rate limiting after discovering
> `rate-limit.ts` in the codebase.

We also implement rate limiting on auth endpoints to prevent brute force attacks.
```

---

## Practical Examples

### Example 1: AI Discovers New File

**Situation:** AI finds `rate-limit.ts` that wasn't in previous scan.

**Immutable update:**
```markdown
## File Structure
*Updated: 2025-12-31 (re-scan)*

| File | Exists |
|------|--------|
| config.ts | ✓ |
| providers/ | ✓ |
| rate-limit.ts | ✓ ← NEW |
```

**Mutable update:**
```markdown
## Purpose
*Updated: 2025-12-31 (discovery)*

...existing content...

> Added: Rate limiting is also part of this system (discovered rate-limit.ts).
```

---

### Example 2: Human Corrects AI Understanding

**Situation:** AI thought "sessions" but human says "tokens"

**AI response:**
```markdown
## How It Works
*Source: Interview with @mds, 2025-12-31*
*Corrected: 2025-12-31 by @mds*

~~This handles user sessions~~
This handles JWT tokens, not sessions. Stateless authentication.

*Correction note: AI initially inferred sessions from file names.
Human clarified the actual implementation.*
```

---

### Example 3: Decision Becomes Outdated

**Situation:** NextAuth decision was made in 2024, now reconsidering

**AI treatment:**
```markdown
## Why NextAuth?

*Source: Interview with @mds, 2024-06-15*
*Type: CONTEXTUAL — may evolve*
*Status: UNDER REVIEW (flagged 2025-12-31)*

Original rationale: Enterprise self-hosting requirements.

> **Review note:** This decision may need revisiting.
> Clerk now offers self-hosted option. See discussion in PR #142.
```

---

## The Boundary Enforcement

### In Tool Design

Tools should know what they can touch:

```typescript
interface ContextSection {
  type: 'immutable' | 'mutable';
  source: string;
  date: string;
  content: string;
}

function updateSection(section: ContextSection, newContent: string) {
  if (section.type === 'immutable') {
    throw new Error('Cannot update immutable section. Re-scan required.');
  }

  return {
    ...section,
    content: newContent,
    updated: new Date().toISOString(),
    previousContent: section.content
  };
}
```

### In Document Structure

Documents could explicitly separate:

```markdown
# auth/ — Context

## Immutable (Scan-Based)

[File structure, paths, versions — AI cannot reinterpret]

---

## Mutable (Understanding-Based)

[Purpose, rationale, guidance — AI can evolve with proper labeling]
```

---

## Decision: What's Immutable?

| Element | Status | Rationale |
|---------|--------|-----------|
| Trifecta file names | **IMMUTABLE** | map.md / decisions.md / context.md locked |
| Folder structure in map.md | **IMMUTABLE** | Must match filesystem |
| Schema fields in tools | **IMMUTABLE** | Contract with AI consumers |
| Version numbers | **IMMUTABLE** | Semantic versioning |
| Decision status (locked/leaning/open) | **IMMUTABLE** | Human controls this |
| Decision rationale text | **MUTABLE** | Can be refined |
| Purpose descriptions | **MUTABLE** | Understanding evolves |
| Gotchas and warnings | **MUTABLE** | New discoveries happen |
| Relationship descriptions | **MUTABLE** | Context changes |
| Usage guidance | **MUTABLE** | Better paths found |

---

## Breadcrumb Note

This captures the critical insight: **decide upfront what's sacred**.

AI can be a powerful self-updating system, but only if it knows:
1. What it can touch (contextual understanding)
2. What it must preserve (structural truth)
3. How to label the difference (source, date, type)

The boundary between immutable and mutable IS the architecture.
