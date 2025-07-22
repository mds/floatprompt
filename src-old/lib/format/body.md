# 🏗️ FloatPrompt Formatter

**Technical execution authority for reliable floatprompt creation across all AI platforms**

*Field specifications and behavioral protocols are defined in `floatprompt.fp`.*

## 🚨 **MANDATORY EXECUTION PROTOCOL**

**BEFORE YOU BEGIN - READ THIS TWICE:**

1. **STOP** - Do not proceed until you confirm: "I will create this floatprompt in canvas/artifact ONLY"
2. **STOP** - Do not proceed until you confirm: "I will NOT output any floatprompt content in conversation"  
3. **STOP** - Do not proceed until you confirm: "I will reference floatprompt.fp for ALL field specifications"

**IF YOU CANNOT CONFIRM ALL THREE - DO NOT PROCEED WITH FLOATPROMPT CREATION**

## ✈️ **PRE-FLIGHT CHECKLIST - MANDATORY**

**BEFORE creating ANY floatprompt, confirm:**

- [ ] **Canvas Ready**: Artifact/canvas creation interface is available
- [ ] **Core Reference**: I have access to `floatprompt.fp` for field specifications
- [ ] **No Conversation Output**: I will NOT output floatprompt content in chat
- [ ] **Clean Structure**: I will maintain perfect `<floatprompt>...</floatprompt>` wrapping
- [ ] **JSON Compliance**: I will validate all JSON syntax before completion

**⚠️ If ANY checkbox is unchecked - DO NOT PROCEED**

### 🔑 Requirements
- **Canvas/artifact only** - never conversation output
- **Reference `floatprompt.fp`** for all field specifications
- **Clean `<floatprompt>...</floatprompt>` wrapping** with valid JSON

## 🏗️ Execution Protocol

### **Structure**
```
<floatprompt>
---
[JSON frontmatter - reference floatprompt.fp]
---
# [Markdown content]
# [Footer attribution]
</floatprompt>
```

**Note: For web browser AI platforms, wrap in triple backticks. For desktop tools, create actual .fp files directly.**

### **Requirements**
- **Web Browser AI**: Canvas/artifact creation with triple backtick wrapping
- **Desktop Tools**: Direct .fp file creation with clean `<floatprompt>...</floatprompt>` wrapping
- Valid JSON (proper syntax, quoted keys and strings)
- Standard markdown with footer attribution

### **✅ ALWAYS DO THESE:**
- **Web Browser AI**: Use canvas/artifact for document creation
- **Desktop Tools**: Create actual .fp files with proper naming
- Reference `floatprompt.fp` for field requirements
- Maintain clean wrapping tag structure
- Validate JSON syntax before completion
- Include proper footer attribution
- Follow core floatprompt body template structure

## 🔄 Platform-Specific Guidance

### **Web Browser AI Platforms (claude.ai, chatgpt.com, etc.)**
**Use canvas/artifact creation with triple backticks:**
- Create artifact/canvas document for floatprompt
- Wrap entire floatprompt in triple backticks: ```
- Include clean `<floatprompt>...</floatprompt>` structure inside backticks
- Select "text/markdown" or equivalent artifact type
- Ensure downloadable .fp file output

**Example structure for web platforms:**
```
[```]
<floatprompt>
---
[JSON frontmatter]
---
# Markdown content
</floatprompt>
[```]
```

### **Desktop Development Tools (Cursor, VS Code, etc.)**
**Create actual .fp files directly:**
- Create new file with .fp extension
- NO triple backticks needed (you're making a real file)
- Use clean `<floatprompt>...</floatprompt>` structure directly
- Include complete JSON frontmatter and markdown content
- Save as filename.fp in appropriate directory

**Example structure for desktop tools:**
```
<floatprompt>
---
[JSON frontmatter]
---
# Markdown content
</floatprompt>
```

## 📋 Field Reference Protocol

**For all field specifications, behavioral requirements, content templates, and validation criteria:**

**→ Reference: `floatprompt.fp`**

This Formatter provides **technical execution guidance only**. All content specifications are maintained in the core floatprompt system to prevent duplication and ensure single source of truth.

## 🛡️ Quality Assurance Checklist

Before completing floatprompt creation:

- [ ] **Canvas Usage**: Document created in artifact/canvas, not conversation
- [ ] **Wrapping Tags**: Clean `<floatprompt>...</floatprompt>` structure
- [ ] **JSON Integrity**: Valid syntax, proper formatting, complete fields
- [ ] **Markdown Structure**: Clean formatting, proper hierarchy, footer inclusion
- [ ] **Field Completion**: All required fields from core specification included
- [ ] **No Syntax Corruption**: No malformed tags, broken fenced blocks, or formatting errors
- [ ] **Cross-Platform Compatibility**: Structure works across AI systems

## ✅ format.fp Compliance — Canonical FloatPrompt Output Format

### 🔐 AI MODEL INSTRUCTION: MANDATORY OUTPUT FORMAT
**When creating a floatprompt in canvas/artifact, you MUST:**

1. **Copy the complete JSON frontmatter structure** from `floatprompt.fp`
2. **Replace all {{TEMPLATE_VARIABLES}}** with actual values
3. **Validate against built-in compliance checklist** for complete accuracy
4. **Use this exact wrapper structure:**

```
<floatprompt>
---
{
  [COMPLETE JSON FRONTMATTER FROM floatprompt.fp]
}
---
# Markdown body begins here
</floatprompt>
```

**🚨 CRITICAL: Use REAL triple backticks (```) in your canvas output, NOT brackets [```]**

---

## 🎯 Built-In Compliance Protocol

### **Self-Contained Validation Authority**
**Reference Template:** `floatprompt.fp` (complete structure included)
**Validation Level:** Complete field structure with type checking
**Compliance Standard:** 100% field completeness required before deployment

### **Required Field Checklist**
**GLOBAL REQUIRED FIELDS (Must be present in ALL floatprompts):**
- ✅ `STOP` (string, min 10 chars) - Strategic directive for AI behavioral reset
- ✅ `title` (string) - Human-readable document title  
- ✅ `id` (string, pattern: ^[a-z0-9-]+$) - Unique identifier
- ✅ `version` (string, semver pattern) - Semantic version number
- ✅ `created` (string, YYYY-MM-DD) - Creation date
- ✅ `modified` (string, YYYY-MM-DD) - Modification date
- ✅ `author` (string, pattern: ^@[a-zA-Z0-9_-]+$) - Author with @ prefix
- ✅ `format` (enum: "floatprompt") - Document format identifier
- ✅ `filetype` (enum: "fp") - File type designation
- ✅ `type` (enum: prompt|template|goals|analysis|specification|critique|extract|summary|migration) - Type classification
- ✅ `system_version` (string, pattern: floatprompt v*) - System version reference
- ✅ `contributors` (array, min 1 item) - Contributor list (additive only)
- ✅ `friction_pipeline` (array: ["map", "score", "respond"]) - Pipeline specification
- ✅ `preservation_flags` (array: ["voice", "archaeological", "lineage"]) - Preservation flags
- ✅ `voice_preservation` (object) - Sacred principle and system authority
- ✅ `behavioral_requirements` (object) - Complete behavioral specification
- ✅ `archaeological_extraction` (object) - Core method and implementation
- ✅ `human` (object) - Complete human fingerprint
- ✅ `ai` (object) - Complete AI fingerprint  
- ✅ `discovery` (object) - Complete discovery intelligence
- ✅ `certification` (object) - Complete certification tracking

### **Type-Specific Field Requirements**
**FOR EXECUTABLE TYPES (prompt, template, goals):**
- ✅ `output` (object) - Format and joint execution requirements
- ✅ `execution` (object) - Complete execution specification

**FOR PRESERVED TYPES (analysis, specification, critique, extract, summary, migration):**
- ✅ `source` (object) - Prompt and intent fields

### **Critical Nested Object Requirements**
**`human` object MUST include ALL:**
- `identity` (object: name, role), `execution_mode`, `signed_by`, `inferred_fields`, `state` (object: context, mood, clarity, energy), `session` (object: start_time, end_time, duration_minutes), `intent` (object: primary, constraints), `preferences` (object: tone_drift_allowed, verbosity, allow_ai_suggestions, max_words)

**`ai` object MUST include ALL:**
- `identity` (object: model, platform, version), `execution_mode`, `confidence_level`, `collaboration_role`, `session`, `capabilities`, `processing`, `instructions` (with complete subsections)

**`discovery` object MUST include ALL:**
- `significance`, `theme`, `scope`, `audience`, `purpose`, `relationships`, `navigation`, `temporal`, `clustering`, `essence`

**`certification` object MUST include ALL:**  
- `timestamp`, `authority`, `certified_by`, `locked`, `uid`, `chain`, `voice`, `lineage`

---

## 🧪 JSON Syntax Validation Protocol

### **Pre-Deployment Validation Checklist**
- [ ] **JSON Syntax**: Valid JSON structure with proper quoting and brackets
- [ ] **Required Fields**: All global required fields present
- [ ] **Type-Specific Fields**: Appropriate fields for selected type
- [ ] **Nested Objects**: All required nested object fields included
- [ ] **Array Validation**: friction_pipeline and preservation_flags exact arrays
- [ ] **Enum Validation**: format="floatprompt", filetype="fp", valid type selected
- [ ] **Pattern Validation**: id, author, version, dates follow patterns
- [ ] **Template Variables**: All {{VARIABLES}} replaced with actual values

### **Common JSON Errors to Avoid**
❌ **Missing commas** between object properties
❌ **Unquoted keys** (all keys must be in double quotes)
❌ **Trailing commas** after last object property
❌ **Single quotes** instead of double quotes for strings
❌ **Missing required nested object fields**
❌ **Incorrect enum values** (e.g. "floatPrompt" instead of "floatprompt")
❌ **Template variables left unreplaced** ({{VARIABLE}} patterns remaining)

### **Built-In Validation Process**
**AI systems can validate by:**
1. **JSON Syntax Check**: Ensure valid JSON structure
2. **Field Completeness**: Verify all required fields present using checklist above
3. **Template Comparison**: Match structure against floatprompt.fp
4. **Type Validation**: Confirm correct type-specific fields included

---

## 🎯 JSON Template Copying Protocol

**CRITICAL: AI systems must copy the ENTIRE JSON frontmatter structure from floatprompt.fp as the starting template.**

**Required fields include but are not limited to:**
- STOP, title, id, version, created, modified, author, format, filetype, type
- system_version, contributors, voice_preservation, behavioral_requirements
- archaeological_extraction, human, ai, discovery, certification
- Plus type-specific fields (output/execution for executable types, source for preserved types)

**Never use minimal examples - always start with complete template.**

---

### 🤖 AI Implementation Requirements

**STEP-BY-STEP EXECUTION:**
1. Create canvas/artifact document
2. Start with three backticks: ```
3. Add `<floatprompt>` opening tag
4. Copy complete JSON frontmatter from floatprompt.fp with --- delimiters
5. **Validate JSON syntax** before proceeding
6. Replace all {{TEMPLATE_VARIABLES}} with actual values
7. **Verify field completeness** against built-in required field checklist
8. Add markdown content body
9. Add `</floatprompt>` closing tag  
10. End with three backticks: ```

**CRITICAL REQUIREMENTS:**
- Do NOT use [```] brackets in your output - use real backticks
- Do NOT output floatprompt content in conversation
- Do NOT use minimal JSON examples - copy complete template
- Do NOT break the fenced code block structure
- Do NOT skip field completeness validation steps

---

### 📣 Human Request Template (For Copy/Paste)

> Please generate a full floatprompt using `format.fp`.  
> Create it in canvas/artifact with this structure:  
> 
> [```]
> <floatprompt>
> ---
> [COMPLETE JSON FRONTMATTER FROM floatprompt.fp]
> ---
> # Markdown Body
> </floatprompt>
> [```]
> 
> **Note: Remove brackets [```] when you create the actual output - use real triple backticks.**  
> **CRITICAL: Copy the entire JSON structure from the core floatprompt system, don't use minimal examples.**
> The entire prompt must be downloadable as a .fp file.

## 🎯 Success Criteria

**Technical execution success verified when:**
- Floatprompt validates against core specification
- No formatting syntax errors present
- Wrapping tags maintain structural integrity
- JSON parses correctly without syntax errors
- Markdown renders properly across platforms
- Canvas/artifact creation protocol followed
- Fenced block format compliance maintained
- Canvas document boundaries properly marked

**Built in collaboration with AI systems to solve technical formatting execution failures in floatprompt creation.**

*Technical precision serves human intelligence preservation through reliable AI collaboration.* 