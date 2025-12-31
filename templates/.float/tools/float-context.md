<fp>
<json>
{
  "STOP": "Float Context Tool. Generate deep understanding files for folders and projects.",

  "meta": {
    "title": "/float context",
    "id": "float-context",
    "format": "floatprompt",
    "version": "0.17.0"
  },

  "human": {
    "author": "@mds",
    "intent": "Generate context files that give AI deep understanding of folders and projects",
    "context": "Run after /float-sync to add depth to map files, or when deep understanding is needed"
  },

  "ai": {
    "role": "Project archaeologist and cartographer",
    "behavior": "Discover patterns, relationships, and meaning. Generate emergent context based on what you find."
  },

  "requirements": {
    "duality": {
      "condition_a": "Missing context files",
      "action_a": "Generate context files",
      "condition_b": "Has context files",
      "action_b": "Load and follow reading order"
    },
    "status_format": "FloatPrompt context complete.\nDirectory: [path]\nStatus: [result]\n\n[Next step or Ready for: human direction]",
    "next_step_logic": "Always suggest /float-think as next step. Float-think will decide what's needed based on context state.",
    "output_patterns": {
      "folder_context": "nav/{folder}-context.md",
      "project_context": "context/project-context.md",
      "format": "floatprompt (full <fp><json><md>)",
      "purpose": "Deep understanding, architecture, relationships"
    },
    "buoys": {
      "folder_context_buoy": "Generate one folder context file (parallel, one per folder)",
      "project_context_buoy": "Generate project-wide terrain map (full model)"
    },
    "reporting": {
      "protocol": "float-report",
      "phases": ["map", "structure"],
      "async": true
    }
  }
}
</json>
<md>
# /float context — Deep Understanding Tool

**Generate context files for deep understanding of folders and projects.**

This command creates `*-context.md` files — the understanding layer that complements `*-map.md` inventory files.

## Output Pattern

Creates **context files** (deep understanding):

```
.float/project/
├── nav/
│   ├── root-map.md          # Created by /float-sync
│   ├── root-context.md      # Created by /float-context ← THIS
│   ├── src-map.md
│   └── src-context.md       # ← THIS
└── context/
    └── project-context.md   # Project-wide terrain map ← THIS
```

**Format:** floatprompt (full `<fp><json><md>`) — rich understanding, read when needed.

**Companion:** `/float-sync` creates `*-map.md` files for lightweight inventory.

## Duality

| Condition | Action |
|-----------|--------|
| Missing context files | Generate context files |
| Has context files | Load and follow reading order |

**Regeneration:** Delete context file to force regeneration. No special command needed.

## Two Levels of Context

| Level | File | Purpose |
|-------|------|---------|
| **Folder** | `nav/{folder}-context.md` | Deep understanding of one folder |
| **Project** | `context/project-context.md` | Project-wide terrain map |

## Difference from /float Boot

| Command | Purpose | Depth |
|---------|---------|-------|
| `/float` (boot) | Quick awareness | Reads `*-map.md` files only |
| `/float context` (load) | Deep understanding | Follows reading order, builds mental model |
| `/float context` (generate) | Create context | Synthesizes folder/project understanding |

## Generate Sequence

When context files are missing:

### 1. Discover

Read and analyze:
- `.float/float.md` — Boot protocol
- `.float/project/nav/*-map.md` — All map files
- `README.md` — Project overview
- Key entry points (main files, index files, core modules)

Look for:
- Patterns in naming, structure, organization
- Relationships between folders
- Central concepts and terminology
- What makes this project unique

**Report:** Call float-report --phase=map

### 2. Identify Missing Context

Check for folders with maps but no context:

```bash
# Find map files without matching context files
for map in .float/project/nav/*-map.md; do
  context="${map/-map.md/-context.md}"
  test -f "$context" || echo "Missing: $context"
done

# Check project-wide context
test -f .float/project/context/project-context.md || echo "Missing: project-context.md"
```

### 3. Clarify (if needed)

If uncertain about key things, ask before generating:

**Triggers:**
- Project purpose unclear from files
- Key relationships ambiguous
- Multiple valid interpretations
- Missing README or entry point

**Format:**
- Max 3 questions at once
- Brief, specific questions

**Examples:**
- "What's the main purpose of this project?"
- "How do packages/frontend and packages/backend relate?"
- "Is artifacts/ historical or active?"

If everything is clear, skip to Generate.

### 4. Generate via Buoys

Spawn buoys for each missing context file:

**Folder Context Buoy** — for each missing `{folder}-context.md`:

```
REFERENCE: Use templates/.float/project/nav/root-context.md as the template.

Create .float/project/nav/{folder}-context.md with full floatprompt format:

<fp>
<json>
{
  "STOP": "Deep context for {folder}/ folder. Understanding, patterns, relationships.",
  "meta": {
    "title": "{folder}/ context",
    "type": "context",
    "format": "floatprompt",
    "generated_by": "/float-context"
  },
  "ai": {
    "role": "Deep folder understanding",
    "behavior": "Reference for architecture, patterns, and connections"
  }
}
</json>
<md>
# {folder}/ — Context

Deep understanding of the {folder}/ folder.

## What This Folder Does

[One paragraph: purpose, goals, what problem it solves]

## Architecture

[Key patterns, structure, how pieces fit together]

## Key Files

| File | Why It Matters |
|------|----------------|
| [file] | [importance] |

## Relationships

- [How this folder connects to others]
- [Dependencies, imports, references]

## Conventions

[Naming patterns, organization rules, coding standards]

</md>
</fp>
```

**Project Context Buoy** — for `project-context.md`:

```
Create .float/project/context/project-context.md with full floatprompt format.

This is the project-wide terrain map covering:
- What this project IS
- Key files table
- Reading order for new AI sessions
- Domain map (how folders/concepts relate)
- Core patterns and conventions
```

**Parallelization:** Multiple folder context buoys can run in parallel.

**Report:** Call float-report --phase=structure

### 5. Offer Decision Capture

After generating context:

```
Context generated:
  - nav/src-context.md
  - nav/docs-context.md
  - context/project-context.md

Build deeper context? (Capture key decisions)
(y/n):
```

If yes: prompt for decisions, save to `project-decisions.md`

## Load Sequence

When context files exist:

1. **Read `.float/project/context/project-context.md`** — Project-wide terrain map
2. **Follow reading order** — As specified in terrain map
3. **Read `nav/*-context.md` as needed** — Deep folder understanding
4. **Report understanding depth**

## Output Locations

```
.float/project/nav/{folder}-context.md    # Per-folder deep understanding
.float/project/context/project-context.md # Project-wide terrain map
```

**Naming:**
- Folder context: `{folder}-context.md` (matches `{folder}-map.md`)
- Project context: `project-context.md` (the terrain map)

## Status Output

```
FloatPrompt context complete.
Directory: /path/to/project
Status: [result]

[Next step recommendation]
```

**Results:**
- "Generated 3 context files (2 folder, 1 project)"
- "Loaded context, followed reading order (8 files)"

## Next Step Logic

**Always suggest `/float-think` as the next step:**

```
Next: /float-think
```

Float-think will decide what's needed based on context state.

## Buoy Prompts

### Folder Context Buoy

```
Generate context file for {folder}/:

REFERENCE: Use templates/.float/project/nav/root-context.md as the template.

1. Read .float/project/nav/{folder}-map.md for inventory
2. Read key files in {folder}/ to understand purpose
3. Identify architecture and patterns
4. Map relationships to other folders
5. Note conventions and standards
6. Generate full floatprompt format file with:
   - What This Folder Does
   - Architecture
   - Key Files table
   - Relationships
   - Conventions
7. Write to .float/project/nav/{folder}-context.md
8. Return: { folder: string, file: string }
```

### Project Context Buoy

```
Generate project-wide terrain map:

1. Read .float/float.md for boot protocol
2. Read all .float/project/nav/*-map.md files for structure
3. Read README.md for public description
4. Identify key files that define the project
5. Determine logical reading order for understanding
6. Map domain relationships
7. Generate full floatprompt format file with:
   - Project summary
   - Key files table
   - Reading order
   - Domain map
   - Core patterns
   - Conventions
8. Write to .float/project/context/project-context.md
9. Return: { file: string }
```

## Depth Modes

**Standard (default):**
- Enough for operational understanding
- Key files, reading order, domain map
- ~50-100 lines

**Deep (on request):**
- Expanded analysis of specific areas
- More relationships and patterns
- Historical context if available

**Focused (on request):**
- Deep dive on one domain only
- Useful for complex subsystems

## What NOT to Include

- File lists (that's nav/*.md)
- Implementation details
- Exhaustive documentation
- Duplicated content from other files

**Context is a map, not an atlas.**

## Preservation

If updating existing context:
- Keep sections marked as human-added
- Preserve `human_refinements` frontmatter
- Merge new discoveries with existing context
- Note what changed

## Examples

**Generate new context:**
```
> /float-context

Scanning project structure...
Found 3 map files without context: src-map.md, docs-map.md, root-map.md
Missing project-context.md

Questions:
1. Is artifacts/ historical or active development?

> historical, it's the archive

Generating context...

FloatPrompt context complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: Generated 4 context files (3 folder, 1 project)

Created:
  - nav/root-context.md
  - nav/src-context.md
  - nav/docs-context.md
  - context/project-context.md

Build deeper context? (Capture key decisions)
(y/n): y

What key decisions should be captured?
> We chose <fp> tags over YAML because...

Saved to project-decisions.md

Next: /float-think
```

**Generate single folder context:**
```
> /float-context src

Generating context for src/...

FloatPrompt context complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: Generated nav/src-context.md

Next: /float-think
```

**Load existing context:**
```
> /float-context

Loading context from project-context.md...

Following reading order:
1. .float/float.md — Boot protocol
2. docs/api.md — API documentation
3. src/core/index.ts — Main entry point
...

FloatPrompt context complete.
Directory: /Users/mds/Documents/_Github/floatprompt
Status: Loaded context, followed reading order (8 files)

Ready for: human direction
```

---

*[FloatPrompt](https://github.com/mds/floatprompt) — the invisible OS for AI*
</md>
</fp>
