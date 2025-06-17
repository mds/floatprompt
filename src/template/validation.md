<!-- validation.md -->
## Validate FloatPrompt Compliance Through Deployment Checklist

Execute comprehensive pre-deployment verification ensuring system authority compliance, goal hierarchy alignment, and archaeological preservation integrity.

## ⚠️ Validation Checklist

Before deploying any floatprompt:

**System Authority Compliance:**
- [ ] All TODO fields replaced with actual values
- [ ] STOP field includes exact response pattern with strategic guidance context
- [ ] Required frontmatter fields populated
- [ ] Type chosen from approved type system
- [ ] Contributors added (never removed)
- [ ] Actual dates used (verified, not approximated)
- [ ] ID follows naming pattern
- [ ] Voice preservation verified (see Voice Preservation Oath section for complete requirements)
- [ ] Human safety laws considered
- [ ] Soft-coded fields use emergent, human-defined values

**Goal Hierarchy Compliance:**
- [ ] Primary Goal: Preserves human intelligence, voice, and agency
- [ ] Secondary Goal: Supports precise AI instruction execution  
- [ ] Tertiary Goal: Enables human task completion through reliable collaboration
- [ ] System Principle: Chooses human preservation over AI efficiency where applicable

**Type-Specific Field Validation:**
- [ ] Executable types include `output.format: floatprompt`
- [ ] Executable types include `output.joint_execution_required: true`
- [ ] Executable types include `execution` block (if applicable)
- [ ] Preserved types include `source.prompt` field
- [ ] Preserved types include `source.intent` field

**Enhanced Certification Integrity:**
- [ ] Certification block completed with accurate data
- [ ] Timestamp uses precise ISO 8601 format with timezone
- [ ] Authority field specifies certification type (schema-compliance | execution-verified | voice-preserved)
- [ ] Certified_by field declares certifier identity (human @username or AI model name)
- [ ] Locked field set appropriately (true for immutable, false for modifiable)
- [ ] UID field provides unique identifier (format: "float:hash" or symbolic)
- [ ] Chain depth accurately reflects position in document hierarchy
- [ ] Chain parent correctly references upstream document (null for root documents)
- [ ] Voice linking status accurately reflects voice guide usage
- [ ] Voice fidelity verification completed and documented
- [ ] Lineage tracking enabled and populated with trace array
- [ ] Lineage trace includes all upstream document IDs in chronological order

**Human Execution Fingerprint (Enhanced Schema):**
- [ ] Execution mode specified (structured | spontaneous | hybrid)
- [ ] Signed_by field includes @username for final authorship acknowledgment (optional)
- [ ] Inferred_fields array lists AI-inferred metadata (e.g., ["clarity", "energy"])
- [ ] Human identity fields completed (if included)
- [ ] Session timestamps use ISO 8601 format (if included)
- [ ] Session duration calculated correctly (if included)
- [ ] Human state fields reflect actual execution context (if included)
- [ ] Intent and constraints accurately captured (if included)
- [ ] Preferences reflect actual human choices (if included)

**Discovery Intelligence (if included):**
- [ ] Relationship fields use valid document IDs
- [ ] Navigation sequences are logically ordered
- [ ] Temporal context accurately reflects chronology
- [ ] Essence fields capture document's true purpose
- [ ] All discovery values use emergent, human-defined terms

**Content Structure Validation:**
- [ ] Markdown formatting follows system body structure
- [ ] Heading hierarchy is logical and scannable
- [ ] Section content matches section purpose
- [ ] Implementation notes provide actionable guidance
- [ ] Safety considerations address relevant risks

**Schema Compliance:**
- [ ] All field values match expected types (string, boolean, array)
- [ ] Array fields use proper YAML list syntax
- [ ] Boolean fields use true/false (not "true"/"false" strings)
- [ ] Date fields follow YYYY-MM-DD-0000 format
- [ ] ISO 8601 timestamps include timezone information
- [ ] New certification fields follow upgrade schema requirements

**YAML Encoding & Escaping Compliance:**
- [ ] Frontmatter must not include escaped characters such as `\\[`, `\\:`, `\\@`, or `\\]`
- [ ] All values must be valid YAML scalars, arrays, or objects
- [ ] Values must be parseable by standard Markdown-aware YAML parsers (e.g. js-yaml, PyYAML, Ruby YAML)
- [ ] Backslashes should never be manually inserted unless representing a true character in a string literal
- [ ] Escaped sequences introduced by text renderers (not authors) must be stripped before execution or deployment


**Format Compliance:**
- [ ] File uses `.md` extension
- [ ] Contains `format: floatprompt` in frontmatter
- [ ] YAML frontmatter properly formatted
- [ ] Markdown body is human and AI readable
- [ ] No prohibited formats (JSON, XML, etc.) used

**Archaeological Preservation:**
- [ ] Original human voice preserved in content
- [ ] No AI tone or generic language overlays
- [ ] Ambiguity flagged with TODO, not invented
- [ ] Source intelligence extracted, not generated
- [ ] Archaeological weight maintained throughout

**Backward Compatibility:**
- [ ] New certification fields are optional and soft-coded
- [ ] Existing floatprompts remain valid without upgrade fields
- [ ] Schema extensions preserve existing validation structure
- [ ] No breaking changes to core frontmatter requirements

## Validation Criteria

Validation checklist implementation: Comprehensive pre-deployment verification executed covering system authority compliance, goal hierarchy alignment, and archaeological preservation. Checklist completeness verification: All validation categories included (System Authority, Goal Hierarchy, Type-Specific, Certification, Discovery Intelligence, Content Structure, Schema, Format, Archaeological, Backward Compatibility). Deployment readiness confirmation: All checklist items verified before floatprompt deployment to ensure system compliance and human agency preservation. 

## ✅ FloatPrompt Compliance Validation Checklist

### File Format & Structure
- [ ] Complete FloatPrompt uses `.fp` file extension
- [ ] Building blocks/documentation use `.md` file extension  
- [ ] Contains valid YAML frontmatter with all required fields
- [ ] Includes proper `<floatprompt>` wrapper tags (for .fp files)
- [ ] Written in clean, readable Markdown format
- [ ] No proprietary or encrypted content

