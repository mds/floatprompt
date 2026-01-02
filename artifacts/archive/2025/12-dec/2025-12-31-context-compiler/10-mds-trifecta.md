# MDS Trifecta

## The Pattern

Every deep contextual anchor needs three documents:

| Document | Question | Purpose |
|----------|----------|---------|
| **map.md** | WHERE | Navigation, file locations, structure |
| **decisions.md** | WHY | Reasoning, rationale, trade-offs |
| **structure.md** | WHAT | Deep description, the thing itself |

The trifecta is the atomic unit of deep context.

---

## MDS Framework Alignment

The trifecta mirrors the MDS methodology:

| MDS Phase | Document | Creates |
|-----------|----------|---------|
| **M**ap | map.md | Inventory of territory |
| **D**ecide | decisions.md | Record of choices |
| **S**tructure | structure.md | Structured output |

When you map → decide → structure, you produce all three documents.

---

## map.md — WHERE

### Purpose

Answer: "What's here and how do I find things?"

### Contents

- File/folder inventory
- Relationships between pieces
- Navigation paths
- Entry points
- Structure visualization

### Example

```markdown
# tools/ — Map

**WHERE things are**

## Structure

```
.float/tools/
├── float.md           # Boot tool
├── float-sync.md      # Structure integrity
├── float-fix.md       # Content integrity
├── float-context.md   # Context generation
└── ...
```

## Relationships

- float-think → routes to all tools
- float-sync → validates nav files
- float-fix → repairs what sync finds

## Entry Points

- Start with `/float` (boot)
- For validation: `/float-sync`
- For repair: `/float-fix`
```

---

## decisions.md — WHY

### Purpose

Answer: "Why is it this way and not another way?"

### Contents

- Choices made
- Alternatives considered
- Rationale for each decision
- Trade-offs accepted
- Things that might be revisited

### Example

```markdown
# tools/ — Decisions

**WHY things are this way**

## Key Decisions

### Separate sync and fix tools

**Choice:** Two tools (float-sync, float-fix) not one.

**Alternatives:**
- Single tool with modes
- Combined validation + repair

**Rationale:** Separation of concerns. Sync is read-only validation. Fix is write. Users can run sync safely, then decide about fix.

### Check mode as default

**Choice:** All tools default to check mode (report only).

**Alternatives:**
- Run mode as default
- Require explicit mode always

**Rationale:** Safety. Users see what would happen before it happens. Explicit `run` for changes.

**May revisit:** If users find it annoying to always add `run`.
```

---

## structure.md — WHAT

### Purpose

Answer: "What is this thing, really?"

Deep description, not just inventory.

### Contents

- Purpose and function
- How it works
- Interfaces and contracts
- Dependencies
- Context needed to understand

### Example

```markdown
# tools/ — Structure

**WHAT this is (deep context)**

## Purpose

The tools folder contains FloatPrompt's operational tools — commands that maintain, validate, and enhance the .float/ system.

## How It Works

Tools follow a consistent pattern:

1. **Boot:** Read .float/system.md for context
2. **Discover:** Scan relevant files/folders
3. **Analyze:** Compare state to expectations
4. **Report/Act:** Show findings or make changes

All tools support duality (run/check modes).

## Tool Categories

### Integrity Tools
Validate structure and content match expectations.
- float-sync: nav ↔ folders
- float-fix: content references

### Context Tools
Generate and maintain context files.
- float-context: terrain map
- float-focus: deep dive

### Orchestration Tools
Coordinate other tools.
- float-think: intelligent routing
- float-all: run everything

## Interfaces

All tools output JSON status:
```json
{
  "status": "operational | issues_found | error",
  "tool": "float-sync",
  "mode": "run | check",
  "findings": [...],
  "next_steps": [...]
}
```
```

---

## Naming Note

**Current choice:** `structure.md`

Aligns with MDS naming (Map → Decide → Structure).

**Alternative considered:** `context.md`

More intuitive standalone ("gives me context").

**May revisit:** If `structure.md` causes confusion with "folder structure" or "architecture," could rename to `context.md`.

---

## When to Create Trifecta

Create all three for:

- **Major features:** tools/, nav/, context/
- **Complex domains:** authentication, API, data layer
- **Architectural areas:** anything with decisions worth documenting
- **Onboarding targets:** where new contributors need deep context

Don't need trifecta for:

- Simple folders (just need nav entry)
- Self-explanatory code
- Temporary structures

---

## Generation vs Manual

### Generated (from templates)

```bash
npm float anchor create tools

# Generates:
#   .float/project/anchors/tools/map.md
#   .float/project/anchors/tools/decisions.md
#   .float/project/anchors/tools/structure.md
```

Templates provide structure. Human fills content.

### Assisted (AI helps)

```bash
npm float anchor create tools --assist

# Scans tools/ folder
# Generates map.md from scan
# Drafts decisions.md from git history
# Drafts structure.md from code analysis
# Human reviews and edits
```

AI does first pass. Human refines.

### Manual (human writes)

For nuanced context that can't be inferred:
- Strategic rationale
- Historical context
- Future intentions

---

## AI Consumption Pattern

When AI needs to understand an area:

```
AI needs to understand tools/

1. Read tools/map.md
   → Orient: what's here, how is it organized

2. Read tools/structure.md
   → Understand: what is it, how does it work

3. Read tools/decisions.md (if needed)
   → Why: rationale for choices, trade-offs
```

Map first (orient), structure second (understand), decisions if needed (why).

---

## Directory Structure Options

### Option A: Nested in area

```
.float/tools/
├── float-sync.md
├── float-fix.md
├── map.md           # trifecta for tools/
├── decisions.md
└── structure.md
```

Trifecta lives with the thing it describes.

### Option B: Central anchors folder

```
.float/project/
├── anchors/
│   ├── tools/
│   │   ├── map.md
│   │   ├── decisions.md
│   │   └── structure.md
│   ├── nav/
│   │   ├── map.md
│   │   ├── decisions.md
│   │   └── structure.md
```

All trifectas in one place.

### Option C: Hybrid

```
.float/project/
├── nav/             # simple nav files
│   ├── tools.md
│   └── docs.md
├── context/         # deep context (trifectas)
│   ├── tools/
│   │   ├── map.md
│   │   ├── decisions.md
│   │   └── structure.md
```

Nav for quick reference, context for deep dives.

**Recommendation:** Option C (Hybrid). Separates quick nav from deep context.

---

## The Trifecta as Compile Target

With templating, the trifecta is a compile target:

```
Scan data + Templates → map.md
Git history + Templates → decisions.md (draft)
Code analysis + Templates → structure.md (draft)
```

Human reviews and enriches. System provides scaffolding.

---

## Summary

The MDS Trifecta:
- **map.md** — WHERE (navigation)
- **decisions.md** — WHY (rationale)
- **structure.md** — WHAT (deep context)

Three documents, complete context. The atomic unit of understanding.
