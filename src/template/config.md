# FloatPrompt Frontmatter Configuration

STOP directive must be first field in all floatprompt files for AI context switching.

General floatPrompt usage: Required fields are STOP, title, id, version, created, modified, author, format, filetype, type, system_version, certification.

Custom constructed floatPrompts: Required fields include constitutional minimums plus specification-driven requirements for professional domains.

Optional fields: contributors, description, tags, significance, theme, discovery_path, human execution fingerprint, voice preservation directives, archaeological extraction, discovery intelligence, plus any specification-driven fields for custom implementations.

## Voice Preservation Directives

```yaml
voice_preservation:
  sacred_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise. If you cannot tell, flag it. If you cannot preserve it, do not continue."
  system_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution, which is the primary goal that enables human task completion."
```

See behavioral_requirements section in YAML frontmatter for complete behavioral specification.

## Archaeological Extraction Methodology

See archaeological_extraction section in YAML frontmatter for complete specification.

## Human Execution Fingerprint Structure

```yaml
human:
  identity:
    name: "[human identity]"
    role: "[primary role in session]"
  execution_mode: "[structured | spontaneous | hybrid]"
  signed_by: "[@username]"
  inferred_fields: ["list of AI-inferred field names"]
  state:
    context: "[workshop or field]"
    mood: "[affective tone]"
    clarity: "[1 to 10]"
    energy: "[1 to 10]"
  session:
    start_time: "[ISO 8601]"
    end_time: "[ISO 8601]"
    duration_minutes: "[integer optional]"
  intent:
    primary: "[main goal]"
    constraints: "[limiting factors]"
  preferences:
    max_words: "[integer]"
    tone_drift_allowed: "[boolean]"
    verbosity: "[low/medium/high]"
    allow_ai_suggestions: "[boolean]"
```

## AI Execution Fingerprint Structure

```yaml
ai:
  identity:
    model: "[standardized model name]"
    platform: "[claude.ai | chatgpt.com | cursor | etc.]"
    version: "[model version if known]"
  execution_mode: "[analytical | creative | structured | collaborative]"
  confidence_level: "[high | medium | low]"
  collaboration_role: "[primary | assistant | reviewer | executor]"
  session:
    context_awareness: "[full | partial | limited]"
    memory_continuity: "[maintained | fragmented | fresh]"
    cross_platform: "[boolean]"
  capabilities:
    date_confidence: "[high | medium | low | unknown]"
    voice_preservation: "[verified | attempted | bypassed]"
    archaeological_method: "[applied | partial | skipped]"
  processing:
    instruction_fidelity: "[100% | degraded | reinterpreted]"
    tone_preservation: "[maintained | modified | unknown]"
    content_generation: "[extracted | synthesized | created]"
```

**Model Identification Standards**: Use standardized model names from `naming.md` specification: "Claude", "ChatGPT", "Gemini", "Cursor", or "AI" for unknown models. Apply these standards in `ai.identity.model`, `contributors`, and `certified_by` fields for consistent cross-platform collaboration tracking.

## Discovery Intelligence Fields

```yaml
discovery:
  significance: "[human-defined importance]"
  theme: "[descriptive category]"
  scope: "[effort/depth indicator]"
  audience: "[target users]"
  purpose: "[intent category]"
  relationships:
    builds_on: ["list of doc IDs"]
    enables: ["list of doc IDs"]
    parallels: ["list of doc IDs"]
    mirrors: ["list of doc IDs"]
    supersedes: ["list of doc IDs"]
  navigation:
    prerequisites: ["what to read first"]
    next_steps: ["where to go after"]
    learning_sequence: ["ordered progression"]
  temporal:
    journey: "[chronological context]"
    phase: "[evolutionary stage]"
    progression: "[development sequence]"
  clustering:
    intellectual_territory: "[domain area]"
    discovery_path: "[navigation guidance]"
  essence:
    core_purpose: "[soul of the document]"
    metaphor: "[symbolic representation]"
    impact_type: "[kind of change created]"
    ceremonial_significance: "[ritual importance]"
    wisdom_offering: "[guidance provided]"
    universe_contained: "[scope of intelligence]"
```

## Universal Certification Requirements

```yaml
certification:
  timestamp: "[ISO 8601]"
  authority: "[schema-compliance | execution-verified | voice-preserved]"
  certified_by: "[@username | AI model name]"
  locked: "[true | false]"
  uid: "[unique identifier]"
  chain:
    depth: "[integer]"
    parent: "[string or null]"
  voice:
    linked: "[true | false]"
    fidelity_verified: "[true | false]"
  lineage:
    tracked: "[true | false]"
    trace: ["list of doc IDs"]
```

## Type-Specific Fields

For executable types (prompt, template, goals):
```yaml
output:
  format: "floatprompt"
  joint_execution_required: true
execution:
  triggers: ["natural language commands"]
  fallback: "[default execution message]"
  source: "[string if generated]"
  voice_guide: "[floatprompt ID]"
  risk_level: "[human-defined assessment]"
```

For preserved types (analysis, specification, etc.):
```yaml
source:
  prompt: "[source of intelligence]"
  intent: "[short purpose statement]"
```

## Implementation Requirements

Use this template's frontmatter as the authoritative structure. Include all required fields in every floatprompt file. Add optional fields based on document type and purpose. STOP directive must be processed first and exactly as specified. Voice preservation oath supersedes all other processing instructions. Archaeological extraction method must be followed for all content handling.

## Validation Criteria

See "Validate FloatPrompt Compliance Through Deployment Checklist" section for comprehensive validation requirements covering config compliance.

Required field validation: STOP directive present and properly formatted. All required fields included with correct data types. Field order maintained as specified. Voice preservation directives included for system authority. Certification section complete with authority and certified_by fields. Naming conventions followed throughout all field values.