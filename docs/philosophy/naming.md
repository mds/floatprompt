---
title: Naming Convention
type: reference
status: complete
created: 2025-06

human_author: MDS
human_intent: Define naming standards - FloatPrompt capitalization, file extensions
human_context: Brand consistency, never plural, unified .md extension

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Added FloatDoc frontmatter
---

# FloatPrompt Naming Convention

**Clear naming standards for FloatPrompt system components, files, and brand references**

*Consistent naming conventions with unified .md extension for all files.*

## Purpose

Provide systematic naming standards for FloatPrompt components, files, and communications that maintain brand consistency with a unified .md extension for all files.

## **Naming Rules**

| **Context** | **Format** | **Example** |
|-------------|------------|-------------|
| **Document titles & headers** | `FloatPrompt` | "# FloatPrompt System Goals" |
| **Sentence beginnings** | `FloatPrompt` | "FloatPrompt enables systematic collaboration..." |
| **Mid-sentence technical refs** | `floatprompt` | "Upload the floatprompt.md file..." |
| **Filenames** | `floatprompt` | `floatprompt.md`, `floatprompt-goals.md` |
| **Brand references** | `FloatPrompt` | "The FloatPrompt system serves humans" |
| **Plural references** | `FloatPrompt files` | "Multiple FloatPrompt files can be coordinated" |

## **File Extension Strategy**

### **Unified .md Extension**

| **File Type** | **Extension** | **Example** |
|---------------|---------------|-------------|
| **Main System Template** | `.md` | `floatprompt.md` |
| **Full System** | `.md` | `floatprompt-os.md` |
| **Documentation** | `.md` | `floatdoc.md`, `goals.md` |
| **Reference Files** | `.md` | `reference-micro.md`, `reference-mini.md` |
| **Tools** | `.md` | `update-creator.md`, `update-protocol.md` |

### **File Extension Rationale**

**Why .md for everything:**
- **Universal compatibility** — .md is plain text, works on all AI platforms
- **One extension to explain** — no confusion between .txt and .md
- **Better rendering** — GitHub, editors, and tools render .md nicely
- **Same portability** — .md uploads work identically to .txt

**Future Evolution (.fp):**
- **Ecosystem maturation** with specialized tooling and enhanced features
- **Native file support** in development environments and AI platforms
- **Backward compatibility** maintained
- **User choice** allowing adoption of .fp benefits when ready

## **Never Plural Rule**

**FloatPrompt is never plural** - consistent with technical naming like JavaScript, Python, HTML.

**✅ Correct:**
- "FloatPrompt files"
- "multiple FloatPrompt files" 
- "several FloatPrompt documents"
- "two FloatPrompt tools"

**❌ Incorrect:**
- "FloatPrompts"
- "floatprompts" 
- "multiple FloatPrompts"
- "several floatprompts"

## **System Architecture Naming**

### **Current File Structure**
```
floatprompt/
├── core/                        # Essential templates
│   ├── prompt.md                # 3KB Universal template
│   ├── doc.md                   # FloatDoc tool
│   └── os.md                    # 35KB Full system
├── docs/                        # Documentation
├── artifacts/                   # Historical development artifacts
├── dev/                         # Development files
└── experimental/                # Archived legacy system
```

### **Naming Conventions**
- **Main Template**: `core/prompt.md` (3KB complete system with creation protocol)
- **Full System**: `core/os.md` (35KB guided tool creation)
- **Documentation**: `{topic}.md` for all documentation
- **Reference Files**: `reference-{type}.md` for structure examples
- **Tools**: `{tool-name}.md` for floatprompt tools

## **Brand Positioning Language**

### **Primary Positioning**
- **"Complete AI collaboration system in one file"** - Core value proposition
- **"Conversational emergence"** - Natural tool creation through dialogue
- **"Human+AI collaboration model"** - Partnership approach vs. autonomous execution
- **"Archaeological voice preservation"** - Unique methodology advantage
- **"Cross-platform compatibility"** - Universal deployment capability

### **Technical Terminology**
- **"Float triggers"** - Natural language activation ("float map", "float extract", "float build", "float [anything]")
- **"Dual architecture"** - JSON for AI behavior, markdown for human comprehension
- **"Self-referential template"** - Template that teaches AI how to create more floatprompts
- **"Conversational emergence"** - Tool development through collaborative dialogue
- **"Voice preservation protocols"** - Systematic protection of human thinking patterns

## **Validation Examples**

### **✅ Correct Usage**

**Brand References:**
- "FloatPrompt is the invisible OS for AI."
- "The FloatPrompt system enables enhanced AI collaboration."
- "FloatPrompt files maintain voice preservation throughout processing."

**Technical References:**
- "Upload the core/prompt.md file to activate the collaboration system."
- "Say 'float map' to create a content mapping floatprompt."
- "The core/prompt.md contains the complete creation protocol."

**File Naming:**
- `core/prompt.md` (3KB template)
- `core/os.md` (35KB full system)
- `docs/floatprompt.md` (format specification)
- `docs/reference-micro.md` (minimal structure example)

### **❌ Incorrect Usage**

**Brand References:**
- "Float Prompt is a portable AI instruction set." (two words)
- "The floatprompt system enables..." (brand reference should be title case)
- "Multiple FloatPrompts can be coordinated..." (never plural)

**Technical References:**
- "Upload the FloatPrompt file to activate..." (wrong context for filename)
- "The main FloatPrompt.txt contains..." (wrong capitalization)
- "Several floatprompts were created..." (never plural)

**File Naming:**
- `FloatPrompt.md` (wrong capitalization)
- `floatprompt.fp` (current standard is .md)
- `floatprompt-template.md` (main file is just floatprompt.md)

## **Implementation Guidelines**

### **For Documentation**
- **Title case** for brand references and document titles
- **Lowercase** for technical references and file mentions
- **Never plural** in any context or usage
- **Unified .md extension** for all file references

### **For File Creation**
- **Main system**: `core/prompt.md`
- **All files**: Use .md extension
- **Reference files**: `reference-{type}.md` format
- **Cross-platform** compatibility through universal .md adoption

### **For Communications**
- **Brand consistency** with FloatPrompt capitalization rules
- **Technical accuracy** reflecting current .md implementation
- **Future awareness** acknowledging .fp evolution without premature adoption
- **Universal accessibility** emphasizing immediate usability across all platforms
