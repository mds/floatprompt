---
title: FloatPrompt Vision - The Invisible OS for AI
type: vision
status: draft
created: 2025-12-28

human_author: MDS
human_intent: Capture the full FloatSystem vision and architecture
human_context: Emerged from deep conversation about recursive, self-documenting file systems

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Foundational vision document. References floatdoc-specification.md and floatsystem-specification.md.
---

# FloatPrompt: The Invisible OS for AI

## The Vision

FloatPrompt is the invisible operating system for AI collaboration.

Feed a single `system.md` file to any AI. It boots up, penetrates the folder structure, builds rich context, and becomes aware of everything—what exists, how it connects, what's healthy, what needs attention.

**One file turns the lights on.**

Without it, AI is blind. Asks questions. Starts from zero every session.

With it, AI has instant awareness. Knows where everything is. Understands relationships. Can act intelligently. Maintains the system over time.

## The Binary of AI

Text files are to AI what binary is to computers.

The smallest structured unit that gives AI understanding. Minimal. Portable. Infinitely scalable.

FloatPrompt defines the instruction set:
- How to structure context
- How to encode behavior
- How to maintain awareness
- How to pass understanding between sessions and agents

## Architecture

### Six Components

| Component | File/Pattern | Purpose | Format |
|-----------|--------------|---------|--------|
| **FloatStructure** | Root architecture | Overall OS | — |
| **FloatFolder** | Any folder + float.md | Folder pattern | — |
| **FloatSystem** | `system.md` | Boot loader, behavioral protocol | `<fp>` tags |
| **FloatIndex** | `float.md` | Folder navigation | Minimal YAML |
| **FloatDoc** | `*.md` | Document context | Full YAML frontmatter |
| **FloatPrompt** | `*.md` | Tools, behavioral modifiers | `<fp>` tags |
| **FloatLog** | `sessions/` | Activity history | Session YAML |

### File Structure

```
project/
├── system.md          # THE root (behavioral, read first)
├── float.md           # Root folder navigation
├── sessions/          # Activity history
│   ├── float.md       # Session navigation
│   └── 2025-12-28.md  # Daily session log
├── docs/
│   ├── float.md       # Folder navigation
│   ├── guide.md       # FloatDoc (frontmatter)
│   └── spec.md        # FloatDoc (frontmatter)
├── tools/
│   ├── float.md       # Folder navigation
│   └── coach.md       # FloatPrompt tool (<fp> tags)
└── artifacts/
    ├── float.md       # Folder navigation
    └── notes.md       # FloatDoc (frontmatter)
```

## The Penetration Sequence

When AI receives `system.md`:

```
1. Read system.md
   → Understand behavioral rules
   → Load structure map

2. Follow map to each float.md
   → Understand folder purposes
   → See file listings

3. Skim floatdoc frontmatter
   → Understand each document
   → Note status, intent, relationships

4. Read recent session logs
   → Understand recent activity
   → See pending issues
   → Get handoff context

5. Build mental model
   → Full project awareness
   → Lightweight, in memory

6. Ready for any task
   → Complete context
   → Can navigate intelligently

7. Monitor and maintain
   → Flag issues
   → Suggest updates
   → Keep system healthy

8. Log session before ending
   → Record activity
   → Update sessions/float.md
   → Leave handoff notes
```

**Result:** Extremely rich context with minimal token footprint. Full audit trail.

## Token Efficiency

Structure IS compression. Conventions eliminate verbosity.

### Token Budget (approximate)

| Component | Tokens |
|-----------|--------|
| system.md | 300-500 |
| float.md (per folder) | 30-50 |
| floatdoc frontmatter | 40-60 |
| session log (recent) | 50-150 |

**Example: 10-folder project, 50 files**
- 1 system.md: 400 tokens
- 10 float.md: 400 tokens
- 50 frontmatters: 2000 tokens (skimmed)
- 3 recent sessions: 300 tokens

**~3100 tokens = complete project awareness + recent history**

Deep dive only when task requires.

## Field Specifications

### system.md (Boot Loader)

Uses `<fp>` tags. Behavioral modifier. No YAML frontmatter needed—the JSON handles it.

```markdown
<fp>
<json>
{
  "STOP": "FloatSystem Protocol. Read first.",
  "meta": { "title": "", "format": "floatprompt" },
  "human": { "author": "", "intent": "" },
  "ai": { "role": "System navigator and maintainer" },
  "requirements": { ... }
}
</json>
<md>
# Structure Map
# File Conventions
# Maintenance Protocol
</md>
</fp>
```

### float.md (Folder Navigation)

Minimal YAML. Just enough to map the folder.

```yaml
---
title:
type: index
status:
ai_updated:
---

# Folder Name

- **file.md** — description
- **subfolder/** — description
```

**Fields:** 4 (title, type, status, ai_updated)

Skips: created, human_author, human_intent, human_context, ai_model, ai_notes

Why: float.md is navigation, not content. Keep it lean.

### floatdoc (Document Context)

Full YAML frontmatter. Complete context for any document.

```yaml
---
title:
type:
status:
created:

human_author:
human_intent:
human_context:

ai_model:
ai_updated:
ai_notes:
---
```

**Fields:** 10 (full spec)

All fields available. Use what's relevant.

### floatprompt (Tools)

Uses `<fp>` tags. Behavioral modifier.

```markdown
<fp>
<json>
{
  "STOP": "...",
  "meta": { ... },
  "human": { ... },
  "ai": { ... },
  "requirements": { ... }
}
</json>
<md>
# Methodology
</md>
</fp>
```

No YAML frontmatter—the JSON contains all metadata.

## Maintenance Protocol

### AI Responsibilities

**Every session:**
1. Read system.md first
2. Check integrity
3. Surface issues before proceeding

**Integrity checks:**
- All folders have float.md
- All float.md files reflect actual contents
- No broken internal links
- No orphaned files
- Structure map matches reality

**When issues found:**
```
⚠️ FloatSystem Integrity Issues:

1. Missing float.md in /new-folder/
2. Stale: /docs/old.md not in index
3. Broken link: references deleted file

Suggested fixes: [list]
Proceed? (Human approval required)
```

### Human Responsibilities

- Approve structural changes
- Create content
- Set human_ fields
- Review AI suggestions

### Recursive Updates

When AI modifies a file:
1. Update ai_updated
2. Check if float.md needs updating
3. Check if system.md structure map needs updating
4. Propagate changes upward

## Agent Handoff

When passing context between AI agents:

```yaml
handoff:
  from: [agent]
  to: [agent]
  context:
    system: system.md (always)
    scope: [relevant float.md files]
    files: [specific files for task]
    task: [what to do]
```

**Minimum:** Always pass system.md reference.

## Naming Conventions

All files are `.md` for universal compatibility.

| Name | Purpose |
|------|---------|
| `system.md` | Root behavioral protocol (one per project) |
| `float.md` | Folder navigation (one per folder) |
| `*.md` with frontmatter | Documents (floatdocs) |
| `*.md` with `<fp>` tags | Tools (floatprompts) |

Differentiation by content, not file extension.

## Core Principles

**Self-documenting:** Every file carries context about what it is.

**Recursive:** AI maintains the system. Human controls.

**Portable:** Plain text. Works everywhere. No dependencies.

**Token-efficient:** Structure is compression. Rich context, small footprint.

**Convention over configuration:** Names and patterns, not verbose setup.

## The Hierarchy

```
FloatPrompt (trademark, umbrella)
└── FloatStructure (the OS architecture)
    └── FloatFolder (any folder with float.md)
        ├── FloatSystem → system.md (boot loader, root only)
        ├── FloatIndex → float.md (navigation)
        ├── FloatDoc → *.md (document context)
        ├── FloatPrompt → *.md (tools)
        ├── FloatLog → sessions/ (activity log)
        └── behavior.md (optional, folder-specific rules)
```

## Summary

**FloatPrompt** is the invisible OS for AI.

**system.md** is the power switch. Feed it to any AI, the lights turn on.

**The penetration sequence** builds rich context from minimal tokens.

**Everything is .md.** Simple. Portable. Universal.

**AI maintains. Human controls.** Recursive, self-healing, always aware.

**Text files are the binary of AI.** The atomic unit of machine understanding.

---

Created by MDS and Claude Opus 4

<!-- floatprompt.com -->
