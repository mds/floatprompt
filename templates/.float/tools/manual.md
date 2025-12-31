# FloatPrompt Tool Manual

Reference guide for building FloatPrompt tools. Describes tool types, patterns, and design principles.

---

## Tool Types

Six distinct types emerged from production usage. Each has specific characteristics and use cases.

### 1. Pipeline

**Purpose:** Sequential processing with clear stage handoffs.

**Characteristics:**
- Each stage has single responsibility
- Clear input/output contracts between stages
- Stages can run independently
- Later stages consume earlier stage output

**When to use:**
- Complex tasks that decompose into Map → Do → Verify
- Multi-step transformations
- Tasks where intermediate artifacts have value

**Key pattern:** Define what goes IN and what comes OUT of each stage.

**Example structure:**
```
Stage 1: Map      → territorial analysis
Stage 2: Process  → transformation
Stage 3: Verify   → reconciliation
```

---

### 2. Scorer

**Purpose:** Multi-signal weighted evaluation with classification.

**Characteristics:**
- Multiple evaluation signals with weights
- Clear thresholds for classification (HOT/WARM/COLD, A/B/C)
- Strict output format for automation
- No interpretation layer — pure calculation

**When to use:**
- Qualification/evaluation tasks
- Routing decisions
- Automation pipeline integration
- Any "rate this" or "score this" need

**Key pattern:** Output constraints at TOP of file.

```
OUTPUT EXACTLY THIS FORMAT:
score: [number]
classification: [BUCKET]
signal_1: [value]
signal_2: [value]

DO NOT OUTPUT:
- Analysis paragraphs
- Recommendations
- Interpretation
```

**Critical:** Scorers feed automation. Freedom kills automation.

---

### 3. Extractor

**Purpose:** Archaeological voice preservation from source material.

**Characteristics:**
- Never paraphrase — exact quotes only
- `[UNCLEAR]` markers over interpretation
- Timestamp precision when available
- Preserves original voice, tone, cadence

**When to use:**
- Content has human voice that matters
- Source material is authoritative
- Downstream use requires authenticity
- Training data extraction

**Key pattern:** Archaeological respect.

```
VOICE PRESERVATION:
- Exact quotes with attribution
- [UNCLEAR] rather than guessing
- Timestamp: [00:12:34] when available
- Never interpret, never paraphrase
```

**Critical:** The human voice is the value. Don't dilute it.

---

### 4. Reconciler

**Purpose:** Cross-reference source against output, detect gaps, propose fixes.

**Characteristics:**
- Compares two artifacts (source vs output)
- Detects what's missing, what's wrong
- Proposes surgical fixes (not rewrites)
- Verification as final pipeline stage

**When to use:**
- After extraction/transformation
- Completeness verification
- Quality assurance
- Gap detection

**Key pattern:** Surgical precision.

```
RECONCILIATION:
1. Cross-reference source → output
2. List gaps (what's missing)
3. List errors (what's wrong)
4. Propose fixes (minimal, surgical)
5. Never rewrite — only repair
```

**Critical:** Most people skip reconciliation. That's where quality dies.

---

### 5. Processor

**Purpose:** Raw data → structured intelligence.

**Characteristics:**
- Field mapping from input to output
- Variable extraction
- Transformation without interpretation
- Structured output format

**When to use:**
- Parsing unstructured input
- Data normalization
- Format conversion
- Field extraction from forms/text

**Key pattern:** Transform, don't interpret.

```
INPUT: Raw form submission
OUTPUT: Structured fields

PROCESSING:
- Map field X → output.field_a
- Extract variable Y from text
- Normalize format Z
- No interpretation, no inference
```

---

### 6. Reference

**Purpose:** Context document that informs other tools.

**Characteristics:**
- Not called directly — provides context
- Deep domain knowledge
- Informs decisions made by other tools
- Authority document

**When to use:**
- ICP (Ideal Customer Profile) definitions
- Voice guides
- Domain expertise
- Shared context across multiple tools

**Key pattern:** Authority, not action.

```
This document defines [domain].
Other tools reference this for:
- Decision criteria
- Evaluation standards
- Voice/tone guidance
```

**Critical:** Reference docs don't DO — they INFORM.

---

## Key Patterns

### Voice Preservation

When extraction must preserve human voice:

| Do | Don't |
|----|-------|
| Exact quotes with `"..."` | Paraphrase |
| `[UNCLEAR]` markers | Guess meaning |
| Timestamps `[00:12:34]` | Approximate timing |
| Attribution `— @author` | Anonymous quotes |

**Binary decision:** Either you need voice preservation or you don't. Don't mix.

### Output Constraints

For automation integration:

```
===================================================
CRITICAL OUTPUT CONSTRAINT
===================================================

OUTPUT EXACTLY THIS FORMAT:
field_1: [value]
field_2: [value]

DO NOT OUTPUT:
- Extra fields
- Analysis
- Commentary
===================================================
```

**Place at TOP of file.** AI sees constraints before content.

### Multi-Signal Scoring

For evaluation tools:

```json
"scoring_methodology": {
  "signals": {
    "signal_a": { "weight": 30, "max": 30 },
    "signal_b": { "weight": 30, "max": 30 },
    "signal_c": { "weight": 20, "max": 20 },
    "signal_d": { "weight": 20, "max": 20 }
  },
  "classification": {
    "HOT": "80-100",
    "WARM": "60-79",
    "COLD": "<60"
  }
}
```

### Pipeline Handoffs

For multi-stage work:

```
STAGE 1 OUTPUT:
- Artifact A
- Artifact B

STAGE 2 INPUT:
- Requires Artifact A
- Requires Artifact B

STAGE 2 OUTPUT:
- Artifact C
```

Each stage documents what it produces and what the next stage needs.

---

## Anti-Patterns

### 1. Mixed Responsibilities

**Wrong:** One tool does extraction AND scoring AND reconciliation.

**Right:** Three tools in a pipeline, each with single responsibility.

### 2. Vague Output Format

**Wrong:** "Output a summary of the analysis."

**Right:** "Output exactly 5 fields: score, classification, signal_a, signal_b, ai_summary."

### 3. Interpretation in Extraction

**Wrong:** "Extract the key points and explain what they mean."

**Right:** "Extract exact quotes. Use [UNCLEAR] for ambiguity."

### 4. Skipping Reconciliation

**Wrong:** Extract → Done.

**Right:** Extract → Transform → Reconcile → Done.

### 5. Reference Docs That Act

**Wrong:** Reference doc with "now score the applicant."

**Right:** Reference doc defines criteria. Scorer tool uses criteria.

### 6. Too Big Scope

**Wrong:** One tool that "handles the entire application review process."

**Right:** Pipeline: Parse → Score → Route → Notify.

---

## Pipeline Design

### The Map → Do → Verify Pattern

Most complex tasks decompose into:

```
1. MAP     — Analyze, scope, understand territory
2. DO      — Core transformation/extraction
3. VERIFY  — Reconcile, check completeness
```

### When to Decompose

| Signal | Indicates |
|--------|-----------|
| Multiple distinct stages | Pipeline needed |
| "And then..." in description | Decompose |
| Multiple output types | Separate tools |
| Reusable intermediate artifacts | Pipeline stages |

### Handoff Contracts

Each stage defines:

```markdown
## Input Contract
- Requires: [list artifacts needed]
- Format: [expected format]

## Output Contract
- Produces: [list artifacts created]
- Format: [output format]
```

### Stage Independence

Good pipelines allow:
- Running Stage 2 with cached Stage 1 output
- Skipping Stage 3 if verification not needed
- Replacing one stage without touching others

---

## Tool Structure

### Required Sections

Every FloatPrompt tool needs:

**JSON block:**
- `STOP` — Mode directive (what this tool does)
- `meta` — title, id, format, version
- `human` — author, intent, context
- `ai` — role, behavior
- `requirements` — tool-specific requirements

**Markdown block:**
- Title and one-line description
- Duality table (condition → action)
- Process/workflow description
- Examples section
- Footer with attribution

### Duality Pattern

Every tool should handle two conditions:

| Condition A | Action A |
|-------------|----------|
| [situation 1] | [response 1] |

| Condition B | Action B |
|-------------|----------|
| [situation 2] | [response 2] |

Example: "Issues found" → "Report and fix" vs "No issues" → "Report OK"

---

## Quick Reference

### Choosing a Type

| Need | Type |
|------|------|
| Multi-step processing | Pipeline |
| Evaluate/qualify/rate | Scorer |
| Preserve human voice | Extractor |
| Verify completeness | Reconciler |
| Parse/transform data | Processor |
| Provide context | Reference |

### Common Mistakes

| Mistake | Fix |
|---------|-----|
| Too many responsibilities | Split into pipeline |
| Vague output | Strict constraints |
| Paraphrasing voice | Exact quotes only |
| Skipping verification | Add reconciler stage |
| Reference that acts | Separate action into tool |

---

*Reference manual for FloatPrompt tool building*
