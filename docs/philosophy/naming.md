---
title: Naming Convention
type: reference
status: complete
created: 2025-06

human_author: MDS
human_intent: Define naming standards - FloatPrompt capitalization, file extensions
human_context: Brand consistency, never plural, .txt adoption strategy

ai_model: Claude Opus 4
ai_updated: 2025-12-28
ai_notes: Added FloatDoc frontmatter
---

# FloatPrompt Naming Convention

**Clear naming standards for FloatPrompt system components, files, and brand references**

*Consistent naming conventions supporting current .txt adoption strategy and cross-platform compatibility.*

## Purpose

Provide systematic naming standards for FloatPrompt components, files, and communications that maintain brand consistency while supporting the current .txt adoption strategy and universal compatibility approach.

## **Naming Rules**

| **Context** | **Format** | **Example** |
|-------------|------------|-------------|
| **Document titles & headers** | `FloatPrompt` | "# FloatPrompt System Goals" |
| **Sentence beginnings** | `FloatPrompt` | "FloatPrompt enables systematic collaboration..." |
| **Mid-sentence technical refs** | `floatprompt` | "Upload the floatprompt.txt file..." |
| **Filenames** | `floatprompt` | `floatprompt.txt`, `floatprompt-goals.txt` |
| **Brand references** | `FloatPrompt` | "The FloatPrompt system serves humans" |
| **Plural references** | `FloatPrompt files` | "Multiple FloatPrompt files can be coordinated" |

## **File Extension Strategy**

### **Current Adoption (.txt files)**

| **File Type** | **Extension** | **Example** |
|---------------|---------------|-------------|
| **Main System Template** | `.txt` | `floatprompt.txt` |
| **Legacy/Experimental** | `.txt` | `experimental/floatprompt-os.txt` |
| **Documentation** | `.md` | `fp.md`, `orientation.md`, `goals.md` |
| **Reference Files** | `.txt` | `reference-micro.txt`, `reference-mini.txt` |

### **File Extension Rationale**

**Current Strategy (.txt):**
- **Universal compatibility** across all AI platforms without configuration
- **Zero friction deployment** enabling immediate usage without technical setup
- **Maximum accessibility** ensuring adoption without specialized file type support
- **Cross-platform reliability** working identically across all systems

**Future Evolution (.fp):**
- **Ecosystem maturation** with specialized tooling and enhanced features
- **Native file support** in development environments and AI platforms
- **Backward compatibility** maintaining full .txt support indefinitely
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
├── floatprompt.txt              # 3KB Universal template and complete system
├── docs/                        # Documentation in markdown
├── artifacts/                   # Historical development artifacts
├── dev/                         # Development files
└── experimental/                # Archived legacy system
    ├── src/                     # Old source files  
    ├── dist/                    # Old distribution
    ├── scripts/                 # Build system
    └── package.json             # Build dependencies
```

### **Naming Conventions**
- **Main Template**: `floatprompt.txt` (3KB complete system with creation protocol)
- **Documentation**: `{topic}.md` for system documentation
- **Reference Files**: `reference-{type}.txt` for structure examples
- **Legacy System**: `experimental/` directory contains archived build system and OS versions

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
- "Upload the floatprompt.txt file to activate the collaboration system."
- "Say 'float map' to create a content mapping floatprompt."
- "The floatprompt.txt contains the complete creation protocol."

**File Naming:**
- `floatprompt.txt` (3KB complete system)
- `docs/fp.md` (format specification)
- `docs/reference-micro.txt` (minimal structure example)
- `experimental/floatprompt-os.txt` (legacy OS version)

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
- `FloatPrompt.txt` (wrong capitalization)
- `floatprompt.fp` (current standard is .txt)
- `floatprompt-template.txt` (main file is just floatprompt.txt)

## **Implementation Guidelines**

### **For Documentation**
- **Title case** for brand references and document titles
- **Lowercase** for technical references and file mentions
- **Never plural** in any context or usage
- **Current .txt strategy** for all file references

### **For File Creation**
- **Main system**: Always `floatprompt.txt`
- **Documentation**: Topic-based naming with .md extension
- **Reference files**: `reference-{type}.txt` format
- **Cross-platform** compatibility through universal .txt adoption

### **For Communications**
- **Brand consistency** with FloatPrompt capitalization rules
- **Technical accuracy** reflecting current .txt implementation
- **Future awareness** acknowledging .fp evolution without premature adoption
- **Universal accessibility** emphasizing immediate usability across all platforms
