# Workshop Structure Options

Evaluating folder structures for `.float-workshop/`


## Option F: No State Files (Folders + Indexes) ⭐⭐

```
.float-workshop/
├── workshop.md           # READ THIS FIRST (orientation + current focus)
│
├── active/
│   ├── active.md         # index: what's here, current focus noted
│   ├── plugin-architecture.md
│   └── handoff-agents.md
├── later/
│   └── later.md          # index: what's parked and why
├── done/
│   └── done.md           # index: completed work
├── ref/
│   └── ref.md            # index: stable docs
├── protocols/
│   ├── session-boot.md   # FloatPrompt format
│   └── session-handoff.md
└── logs/
    └── logs.md
```

**Newcomer experience:**
1. See `workshop.md` → read it
2. Folders are obvious: active, later, done, ref, protocols, logs
3. Each folder has `folder.md` index if needed
4. No mystery `_*.md` files to decode

**Pros:**
- Zero concepts to learn (just folders)
- Self-describing structure
- One entry point: `workshop.md`
- Current focus lives in `workshop.md` or `active/active.md`
- Fresh eyes can navigate immediately

**Cons:**
- No quick-glance state files at root
- Must open folder or workshop.md to see current focus

**Principle:** If the folder structure is clear, you don't need pointers.

### File Formats

Two formats, different purposes:

| Format | Purpose | Use for |
|--------|---------|---------|
| **FloatPrompt** `<fp>` | Modify AI behavior | Protocols, tools |
| **floatprompt doc** (YAML) | Provide context | Indexes, orientation |

**Format specs:**
- FloatPrompt: `docs/specs/floatprompt.md`
- floatprompt doc: `docs/specs/float-doc.md`

**Option F file format mapping:**

| File | Format | Why |
|------|--------|-----|
| `workshop.md` | floatprompt doc | Orientation — entry point |
| `active/active.md` | floatprompt doc | Orientation — what's active |
| `later/later.md` | floatprompt doc | Orientation — what's parked |
| `done/done.md` | floatprompt doc | Orientation — what's completed |
| `ref/ref.md` | floatprompt doc | Orientation — reference index |
| `logs/logs.md` | floatprompt doc | Orientation — log index |
| `protocols/session-boot.md` | FloatPrompt | Behavioral — how to boot |
| `protocols/session-handoff.md` | FloatPrompt | Behavioral — how to handoff |
| `protocols/update-*.md` | FloatPrompt | Behavioral — how to update |

**Rule:** Protocols = FloatPrompt (`<fp>`). Everything else = floatprompt doc (YAML).

---

### AI Hooks (Built-in Guardrails)

Index files include soft limits to keep folders lean:

**`active/active.md`:**
```yaml
---
type: index
folder: active
limit: 3
---

# Active Work

Current focus items. **Limit: 3 items max.**

> [!ai-hook]
> If this folder has more than 3 items, recommend moving lower-priority 
> items to `later/`. Active should only hold what's in hands NOW.

## Current Focus

- plugin-architecture.md — primary focus
- handoff-agents.md — secondary

## Overflow Check

<!-- AI: Count *.md files (excluding active.md). If > 3, suggest parking. -->
```

**`later/later.md`:**
```yaml
---
type: index
folder: later
limit: 10
---

# Later

Parked work. Will do, not now. **Soft limit: 10 items.**

> [!ai-hook]
> If this folder exceeds 10 items, recommend:
> 1. Archive stale items to `done/` (if completed) or delete
> 2. Group related items into a single spec
> 3. Create `later/YYYY/` subdirs for long-term parking

## Queued

| Item | Why parked | Ready to pull? |
|------|------------|----------------|
| ... | ... | Yes / No / Blocked |

## Overflow Check

<!-- AI: Count items. If > 10, surface warning and suggest cleanup. -->
```

**How it works:**
- YAML frontmatter has `limit` field — machine-readable
- `[!ai-hook]` callout — human + AI readable guidance
- HTML comment — invisible to humans, visible to AI parsing



=================================================

ARCHIVE OPTIONS 

---

## Option A: Current (Nested work/)

```
.float-workshop/
├── _focus.md, _next.md, _review.md
├── workshop.md
├── work/
│   ├── plugin-architecture.md
│   ├── handoff-agents.md
│   ├── reference/
│   ├── backlog/
│   └── archive/
├── protocols/
└── logs/
```

**Pros:**
- Clean separation: system files at root, all work in `work/`
- `work/` acts as the "desk" container

**Cons:**
- Extra nesting to reach active work
- Nested folders (`work/backlog/`, `work/archive/`) add depth

---

## Option B: Flat Active Work (5 folders)

```
.float-workshop/
├── workshop.md
├── _focus.md
├── _next.md
├── _review.md
│
├── plugin-architecture.md    # active work at root
├── handoff-agents.md
│
├── reference/                # stable docs
├── backlog/                  # parked work
├── archive/                  # completed
├── protocols/
└── logs/
```

**Pros:**
- Active work immediately visible
- Less nesting
- Clear separation: reference (docs) vs backlog (parked work)

**Cons:**
- Root could get cluttered with many active items
- Jargon-y folder names (backlog, archive)

---

## Option C: Human Naming (5 folders)

```
.float-workshop/
├── workshop.md
├── _focus.md
├── _next.md
│
├── plugin-architecture.md    # active (on desk)
│
├── later/                    # will do, not now
├── maybe/                    # might do, uncertain
├── done/                     # completed
├── ref/                      # stable docs
├── protocols/
└── logs/
```

**Pros:**
- Clear, conversational folder names
- Distinction: `later/` (queue) vs `maybe/` (ideas)
- `ref/` short and clear

**Cons:**
- 5 folders still
- `maybe/` vs `later/` might blur in practice

---

## Option D: Ultra-Minimal (4 folders)

```
.float-workshop/
├── workshop.md
├── _focus.md
├── _next.md
│
├── [active-work].md
│
├── later/        # everything not-now
├── done/         # completed
├── ref/          # stable docs
├── protocols/
└── logs/
```

**Pros:**
- Simplest possible
- 4 folders, clear purpose
- No ambiguity between maybe/later

**Cons:**
- Loses distinction between "will do" and "might do"
- All non-active work lumped together

---

## Option E: Clean Root + Active Folder ⭐

```
.float-workshop/
├── workshop.md           # orientation
├── _focus.md             # → points into active/
├── _next.md              # → points into later/
│
├── active/               # current work (1-3 items)
├── later/                # not now (parked, queued)
├── done/                 # finished
├── ref/                  # stable docs
├── protocols/
└── logs/
```

**Lifecycle:**
```
later/ ──pull──▶ active/ ──finish──▶ done/
   ▲                │
   └───park─────────┘
```

**Pros:**
- Root is clean: just state files + folders
- 4 work folders with clear lifecycle
- Consistent pattern: everything in a folder
- Human naming (active/later/done vs backlog/archive)
- State files point into folders, not at loose files

**Cons:**
- One more click to reach active work vs Option D
- `later/` combines "will do" and "might do"

**Principle:** State files track STATUS. Folders are for STORAGE.

---



## Comparison Matrix

| Aspect | Option A | Option B | Option C | Option D | Option E | Option F |
|--------|----------|----------|----------|----------|----------|----------|
| Active work | `work/*.md` | root | root | root | `active/` | `active/` |
| Stable docs | `work/reference/` | `reference/` | `ref/` | `ref/` | `ref/` | `ref/` |
| Parked work | `work/backlog/` | `backlog/` | `later/`+`maybe/` | `later/` | `later/` | `later/` |
| Completed | `work/archive/` | `archive/` | `done/` | `done/` | `done/` | `done/` |
| State files | 3 | 3 | 2 | 2 | 2 | **0** |
| Nesting depth | 2 | 1 | 1 | 1 | 1 | 1 |
| Root clutter | Low | High | High | High | None | **None** |
| Newcomer friendly | ✗ | ✗ | ~ | ~ | ~ | **✓** |

---

## Decision

[ ] Option A - Current nested  
[ ] Option B - Flat, formal names  
[ ] Option C - Flat, human names (later/maybe/done)  
[ ] Option D - Ultra-minimal (later/done, active at root)  
[ ] Option E - Clean root + active/ folder  
[ ] Option F - No state files, folders + indexes ⭐⭐

---


