# CLAUDE.md

This file provides guidance to Claude Code when working with the FloatPrompt repository.

## What is FloatPrompt?

**Build AI tools as text files.**

Upload a floatprompt to any AI platform (ChatGPT, Claude, Cursor) and it becomes a specialized tool—a coach, writer, extractor, or assistant—with defined behavior and structured output.

**Core concept**: JSON defines AI behavior. Markdown provides methodology. Together they create portable tools that work on any AI platform.

**Not prompts. Not saved context. Tools.**

---

## Repository Structure

```
floatprompt/
├── floatprompt.txt          # The template (3KB) - creates more floatprompts
├── floatprompt-os.txt       # The full system (35KB) - guided tool creation
├── README.md                # Public-facing documentation
├── CLAUDE.md                # This file
│
├── docs/                    # Core documentation
│   ├── fp.md                # File format specification
│   ├── mds-method.md        # MDS methodology (Map → Decide → Structure)
│   ├── use.md               # What you can build (coaches, writers, extractors)
│   ├── goals.md             # Three-tier goal hierarchy
│   ├── principles.md        # Recognition before action, slow is smooth
│   ├── voice.md             # Voice preservation rules
│   ├── safety.md            # Safety guidelines
│   ├── philosophy/          # Background thinking
│   │   ├── context.md       # Context engineering philosophy
│   │   ├── discovery.md     # How floatprompt was discovered
│   │   ├── manifesto.md     # Core manifesto
│   │   ├── naming.md        # Naming conventions
│   │   ├── orientation.md   # Orientation guide
│   │   └── value.md         # Value proposition
│   └── reference/           # Template references
│       ├── reference-full.txt   # Full template with all fields
│       ├── reference-mini.txt   # Minimal template
│       └── reference-micro.txt  # Micro template
│
├── context/                 # Onboarding
│   └── floatprompt-context.txt  # Context document for new sessions
│
├── dev/                     # Development tools
│   ├── update-creator.txt   # Tool for creating updates
│   ├── update-protocol.txt  # Protocol for updates
│   └── updates/             # Update files
│
├── experimental/            # Build system (Node.js)
│   ├── src/                 # Source files
│   │   ├── os/              # OS components (modular markdown)
│   │   ├── lib/             # Library tools (blueprint, format, voice-guide-creator)
│   │   └── experimental/    # Experimental variants
│   ├── dist/                # Compiled output
│   ├── scripts/build.mjs    # Build script
│   └── package.json         # npm config
│
└── artifacts/               # Historical archive
    └── 2025/                # 113 files documenting evolution
        └── CLAUDE.md        # TOC for 2025 artifacts
```

---

## File Format

```
<fp>
  <json>
  {
    "STOP": "Mode directive - what AI sees first",
    "meta": { "title": "", "id": "", "format": "floatprompt" },
    "human": { "author": "", "intent": "", "context": "" },
    "ai": { "role": "", "tone": "" },
    "requirements": { ... }
  }
  </json>
  <md>
  # Tool Name

  ## Quick Start
  ## Process / Phases
  ## Output
  ## Warnings
  </md>
</fp>
```

**Required JSON fields**: STOP, meta, human, ai, requirements

**Validation**:
- Must begin with `<fp>` and end with `</fp>`
- JSON section precedes markdown section
- No `{{PLACEHOLDER}}` variables in production files
- Extension: `.txt` for universal compatibility

---

## MDS Methodology

**Map → Decide → Structure**

1. **Map** — Establish shared understanding before building
   - Assess content, scope, complexity
   - Create shared vocabulary
   - Understand territory before acting

2. **Decide** — Determine what the tool needs to do
   - What behavior should AI have?
   - What methodology applies?
   - What output gets produced?

3. **Structure** — Build the floatprompt file
   - Write JSON behavioral spec
   - Write markdown methodology
   - Test and refine

**Depth scales with complexity.** Simple tools skip elaborate mapping. Complex tools benefit from thorough upfront work.

---

## Goal Hierarchy (Strict)

1. **Human Voice & Agency** (Primary)
   - Preserve authentic thinking, phrasing, expression
   - Humans retain complete decision-making control
   - No AI rewriting without explicit permission

2. **Reliable AI Behavior** (Secondary)
   - Systematic behavioral specs in JSON
   - Cross-platform consistency
   - Predictable outputs from defined inputs

3. **Useful Artifacts** (Tertiary)
   - Tools that guide people through processes
   - Structured outputs you can actually use
   - Results that improve over time

**The hierarchy is strict.** A feature that improves usefulness but compromises voice is not a feature.

---

## Core Principles

**Recognition Before Action**
> Never execute until the human sees themselves in the output.

The test: "Yes. That's exactly what I meant."

**Slow is Smooth**
> Speed without alignment is drift.

Strategy before output. Questioning before generating. Alignment over throughput.

**Anti-Patterns** (What floatprompts must never do):
- Flatten tone
- Erase nuance
- Hallucinate synthesis
- Overwrite voice
- Rush to execution
- Guess intent
- Inject perspective

---

## Voice Preservation

AI defaults to rewriting everything into generic, polished output. Floatprompts fight this.

**Preserve**: Phrasing, rhythm, tone, hesitations, quirks

**Avoid**: Generic rewriting, em dash addiction, corporate smoothing, over-optimization

**The test**: Read the output aloud. Does it sound like the person who created the input? Or does it sound like AI wrote it?

---

## What You Can Build

**Coaches** — Multi-phase guidance tools that produce artifacts (portfolio coach, script coach)

**Writers** — Content tools with frameworks and voice preservation (newsletter writer, thread writer)

**Extractors** — Pull structured intelligence from messy content (feedback extractor, meeting notes)

**Assistants** — Specialized helpers with defined personas (sales assistant, vendor comms)

**Index Files** — Navigation documents for complex projects

---

## Natural Language Triggers

When `floatprompt.txt` is uploaded:
- `float map` — Assess content territory
- `float build` — Create a tool through conversation
- `float [anything]` — Custom floatprompt for any use case

---

## Development Commands

From `experimental/` (Node.js >=16):

```bash
npm run build        # Compile src/os/ to dist/
npm run build-all    # Build everything
```

---

## Key Files to Read First

1. **floatprompt.txt** — The template itself
2. **docs/fp.md** — File format specification
3. **docs/mds-method.md** — The methodology
4. **docs/goals.md** — Goal hierarchy
5. **docs/principles.md** — Core principles
6. **docs/voice.md** — Voice preservation

For historical context: `artifacts/2025/CLAUDE.md` has a comprehensive TOC of 113 files documenting the evolution of FloatPrompt throughout 2025.

---

## Safety

**Core principle**: Floatprompts empower human intelligence. They never compromise human well-being, agency, or control.

- High-risk outputs require human confirmation
- No weaponization (no tools that harm, manipulate, or deceive)
- Uncertainty disclosure (if AI can't assess safety, it stops and asks)
- Voice protection (preserve cognitive freedom)

---

## Historical Note

The "floatdoc" concept (lighter-weight document format) was explored in June 2025 and unified INTO floatPrompt rather than kept separate. See `artifacts/2025/2025-06-05-the-great-unification-floatdoc-metamorphosis.md` for the breakthrough moment.

---

© 2025 @MDS | CC BY 4.0
