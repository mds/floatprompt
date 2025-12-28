# CLAUDE.md - Documentation

Core documentation for FloatPrompt. Start here to understand the system.

## Reading Order

**Essential (read first):**
1. **fp.md** - File format specification. The `<fp><json></json><md></md></fp>` structure.
2. **mds-method.md** - The methodology: Map → Decide → Structure
3. **goals.md** - Three-tier goal hierarchy (voice > behavior > artifacts)

**Principles:**
4. **principles.md** - Recognition before action. Slow is smooth. Anti-patterns.
5. **voice.md** - Voice preservation rules. What to preserve, what to avoid.
6. **safety.md** - Safety guidelines. Human oversight, no weaponization.

**Practical:**
7. **use.md** - What you can build: coaches, writers, extractors, assistants, index files

## Subfolders

**philosophy/** - Background thinking. Origin story, manifesto, naming decisions. Read for context on why floatprompt exists and how it evolved.

**reference/** - Template references at three complexity levels:
- `reference-full.txt` - All fields, full structure
- `reference-mini.txt` - Minimal viable template
- `reference-micro.txt` - Absolute minimum

## Key Concepts

**File Format**: JSON for behavior, Markdown for methodology. Wrapped in `<fp></fp>` tags.

**MDS Method**: Map (understand) → Decide (choose) → Structure (build). Depth scales with complexity.

**Goal Hierarchy**: Voice preservation is primary. Everything else serves it.

**Voice Preservation**: Preserve phrasing, rhythm, tone. Avoid generic rewriting, em dashes, corporate smoothing.
