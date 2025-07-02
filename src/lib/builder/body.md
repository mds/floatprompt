# 🏗️ FloatPrompt Builder

**Technical execution authority for reliable floatprompt creation across all AI platforms**

*Field specifications and behavioral protocols are defined in `floatprompt-{{VERSION}}.fp`.*

## 🚨 **MANDATORY EXECUTION PROTOCOL**

**BEFORE YOU BEGIN - READ THIS TWICE:**

1. **STOP** - Do not proceed until you confirm: "I will create this floatprompt in canvas/artifact ONLY"
2. **STOP** - Do not proceed until you confirm: "I will NOT output any floatprompt content in conversation"  
3. **STOP** - Do not proceed until you confirm: "I will reference floatprompt-{{VERSION}}.fp for ALL field specifications"

**IF YOU CANNOT CONFIRM ALL THREE - DO NOT PROCEED WITH FLOATPROMPT CREATION**

## ✈️ **PRE-FLIGHT CHECKLIST - MANDATORY**

**BEFORE creating ANY floatprompt, confirm:**

- [ ] **Canvas Ready**: Artifact/canvas creation interface is available
- [ ] **Core Reference**: I have access to `floatprompt-{{VERSION}}.fp` for field specifications
- [ ] **No Conversation Output**: I will NOT output floatprompt content in chat
- [ ] **Clean Structure**: I will maintain perfect `<floatprompt>...</floatprompt>` wrapping
- [ ] **YAML Compliance**: I will validate all YAML syntax before completion

**⚠️ If ANY checkbox is unchecked - DO NOT PROCEED**

### 🔑 Requirements
- **Canvas/artifact only** - never conversation output
- **Reference `floatprompt-{{VERSION}}.fp`** for all field specifications
- **Clean `<floatprompt>...</floatprompt>` wrapping** with valid YAML

## 🏗️ Execution Protocol

### **Structure**
```
<floatprompt>
---
[YAML frontmatter - reference floatprompt-{{VERSION}}.fp]
---
# [Markdown content]
# [Footer attribution]
</floatprompt>
```

**Note: This entire structure must be wrapped in triple backticks in your canvas output.**

### **Requirements**
- Canvas/artifact creation (text/markdown type)
- Triple backtick fenced code block with clean `<floatprompt>...</floatprompt>` wrapping
- Valid YAML (2-space indentation, proper syntax)
- Standard markdown with footer attribution

### **✅ ALWAYS DO THESE:**
- Use canvas/artifact for document creation
- Reference `floatprompt-{{VERSION}}.fp` for field requirements
- Maintain clean wrapping tag structure
- Validate YAML syntax before completion
- Include proper footer attribution
- Follow core floatprompt body template structure

## 🔄 Platform-Specific Guidance

### **Claude (claude.ai)**
- Use artifact creation for floatprompt documents
- Select "text/markdown" as artifact type
- Ensure clean YAML structure without escaping issues

### **ChatGPT (chatgpt.com)**
- Create canvas document for floatprompt creation
- Maintain proper wrapping tag placement
- Validate YAML formatting for syntax compliance

### **Other AI Platforms**
- Use equivalent canvas/artifact functionality when available
- Follow same technical formatting requirements
- Maintain cross-platform structural consistency

## 📋 Field Reference Protocol

**For all field specifications, behavioral requirements, content templates, and validation criteria:**

**→ Reference: `floatprompt-{{VERSION}}.fp`**

This builder provides **technical execution guidance only**. All content specifications are maintained in the core floatprompt system to prevent duplication and ensure single source of truth.

## 🛡️ Quality Assurance Checklist

Before completing floatprompt creation:

- [ ] **Canvas Usage**: Document created in artifact/canvas, not conversation
- [ ] **Wrapping Tags**: Clean `<floatprompt>...</floatprompt>` structure
- [ ] **YAML Integrity**: Valid syntax, proper indentation, complete fields
- [ ] **Markdown Structure**: Clean formatting, proper hierarchy, footer inclusion
- [ ] **Field Completion**: All required fields from core specification included
- [ ] **No Syntax Corruption**: No malformed tags, broken fenced blocks, or formatting errors
- [ ] **Cross-Platform Compatibility**: Structure works across AI systems

## ✅ Builder.fp Compliance — Canonical FloatPrompt Output Format

### 🔐 AI MODEL INSTRUCTION: MANDATORY OUTPUT FORMAT
**When creating a floatprompt in canvas/artifact, you MUST use this EXACT format:**

```
<floatprompt>
---
title: "..."
id: "..."
version: "1.0.0"
type: "..."
...
---
# Markdown body begins here
- This is the structured narrative content
- Use headings, tables, insights, etc.
</floatprompt>
```

**🚨 CRITICAL: Use REAL triple backticks (```) in your canvas output, NOT brackets [```]**

---

### 🤖 AI Implementation Requirements

**WHAT YOU MUST DO:**
1. Create canvas/artifact document
2. Start with three backticks: ```
3. Add `<floatprompt>` opening tag
4. Add YAML frontmatter with --- delimiters
5. Add markdown content
6. Add `</floatprompt>` closing tag  
7. End with three backticks: ```

**WHAT YOU MUST NOT DO:**
- Do NOT use [```] brackets in your output
- Do NOT output floatprompt content in conversation
- Do NOT break the fenced code block structure
- Do NOT add extra characters around backticks

---

### 🧠 Builder.fp Validation Rules

Add to `content_standards:`  
- "All floatprompts must be wrapped in triple backticks: ```<floatprompt> ... </floatprompt>```"
- "No YAML or markdown body may appear outside the fenced code block"
- "Entire floatprompt must be downloadable as code text file"

Add to `validation_rules:`  
- "fail_if_missing_fence"
- "fail_if_missing_closing </floatprompt>"
- "fail_if_yaml_or_body_outside_fence"
- "fail_if_code_block_fence is incomplete or broken"

---

### 📣 Human Request Template (For Copy/Paste)

> Please generate a full floatprompt using `builder.fp`.  
> Create it in canvas/artifact with this structure:  
> 
> [```]
> <floatprompt>
> ---
> [YAML here]
> ---
> # Markdown Body
> </floatprompt>
> [```]
> 
> **Note: Remove brackets [```] when you create the actual output - use real triple backticks.**  
> The entire prompt must be downloadable as a .fp file.

## 🎯 Success Criteria

**Technical execution success verified when:**
- Floatprompt validates against core specification
- No formatting syntax errors present
- Wrapping tags maintain structural integrity
- YAML parses correctly without corruption
- Markdown renders properly across platforms
- Canvas/artifact creation protocol followed
- Fenced block format compliance maintained
- Canvas document boundaries properly marked

**Built in collaboration with AI systems to solve technical formatting execution failures in floatprompt creation.**

*Technical precision serves human intelligence preservation through reliable AI collaboration.* 