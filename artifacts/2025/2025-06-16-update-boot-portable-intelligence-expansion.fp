<floatprompt>
---
STOP: "Update instructions for expanding portable intelligence categorization in boot.md to better serve human understanding and use cases."
title: Boot Portable Intelligence Expansion – Human-Centered Use Cases
id: update-boot-portable-intelligence-expansion
version: 0.1.0-alpha
created: 2025-01-20T00:00:00.000Z
modified: 2025-01-20T00:00:00.000Z
author: @mds
format: floatprompt
filetype: fp
type: migration
system_version: floatprompt v@latest
contributors: ["@mds"]
relationships:
  enabled_by: ["update-protocol"]
  completed: "2025-01-20T00:00:00.000Z"
  status: "implemented"
changes:
  expand_intelligence_types:
    location: "src/template/boot.md section 1"
    specification: "Replace narrow 3-type system-centric categorization (Maps, Extracts, Custom Tools) with comprehensive human-centered use case categories that align with types.md system"
  add_use_case_examples:
    location: "src/template/boot.md section 1" 
    specification: "Add specific examples for conversation capture, context preservation, documentation, instructions, checklists, idea capture, etc."
  maintain_mode_bridge:
    location: "src/template/boot.md section 1"
    specification: "Preserve connection between human use cases and underlying system modes without exposing technical complexity"
  add_foundational_modes_explanation:
    location: "src/template/boot.md section 1"
    specification: "Add explanatory section about the 3 core modes (Map, Extract, Build) that explains why mapping is critical for preventing drift and how modes work together to create reliable results"
rationale:
  expand_intelligence_types: "Current 3-type categorization (Maps, Extracts, Custom Tools) is too narrow and system-centric. Users think in terms of outcomes (preserve this conversation, create a checklist) not technical modes. The types.md system already supports 9+ categories plus soft-coding for new types."
  add_use_case_examples: "Users mentioned key missing categories: conversation thread capture, chat history preservation, context preservation, step-by-step instructions, checklists, idea capture, documentation. These map to existing type system but aren't visible to humans."
  maintain_mode_bridge: "Need to maintain the connection to underlying map/extract/build modes for system consistency while presenting human-friendly interface that doesn't require users to understand technical architecture."
impact_zone:
  - "boot.md user onboarding experience"
  - "human comprehension of FloatPrompt capabilities"
  - "alignment between marketing promise and perceived functionality"
  - "user mental model formation"
  - "example content and quick start guidance"
  - "integration with existing types.md classification system"
source:
  prompt: "Created using update-creator based on user feedback about narrow portable intelligence categorization"
  intent: "Expand boot.md to better represent full scope of what humans can create with FloatPrompt"
---

# Boot Portable Intelligence Expansion Update

## Problem Statement

The current `boot.md` presents only 3 types of "portable intelligence" (Maps, Extracts, Custom Tools) which is too narrow and system-centric. Users think in terms of outcomes they want to achieve, not technical system modes.

**User feedback indicated missing categories:**
- Conversation thread idea capture
- Chat history for preserved context
- Context preservation of any topic  
- Step by step instructions
- Checklist creation
- Idea capture
- Documentation generation
- And many more...

## Current State Analysis

**boot.md currently shows:**
1. **Maps** - Structure Complex Information & Organize Collections
2. **Extracts** - Pull Intelligence From Human Content
3. **Custom Tools** - Build Repeatable Processes

**But types.md actually supports:**
- **Executable Types:** prompts, templates, goals, and more
- **Preserved Types:** analysis, specification, critique, extract, summary, migration, and more
- **Plus soft-coding:** "create new categories as needed based on human intent"

## Proposed Solution

Replace the narrow 3-type categorization with outcome-focused categories that map to the existing type system but speak in human terms:

### 📍 **Structure & Navigate** (maps to: analysis, specification)
*"Create a map of this conversation" | "Organize these research findings"*
- Territory mapping and relationship building
- Collection organization and learning sequences  
- Content navigation and discovery paths

### 🏺 **Capture & Preserve** (maps to: extract, analysis, summary)
*"Preserve this chat history" | "Extract key themes" | "Capture these ideas"*
- Conversation thread preservation
- Voice and context capture
- Pattern extraction and intelligence discovery

### 🏗️ **Build & Automate** (maps to: prompt, template, goals)
*"Create a checklist" | "Build a feedback analyzer" | "Generate step-by-step instructions"*
- Reusable tools and workflows
- Process automation and templates
- Custom instruction machines

### 📚 **Document & Specify** (maps to: specification, critique, migration)
*"Document this process" | "Create project requirements" | "Plan this transition"*
- Process documentation and guides
- Requirements and specifications
- System transitions and migrations

### 💡 **Analyze & Assess** (maps to: critique, analysis)
*"Analyze this feedback" | "Assess this proposal" | "Review this content"*
- Structured analysis and evaluation
- Critical assessment and review
- Decision support and recommendations

## Implementation Approach

1. **Maintain backwards compatibility** - preserve existing quick start examples
2. **Bridge to system modes** - maintain connection to map/extract/build without exposing complexity
3. **Use outcome language** - focus on what users want to achieve, not how the system works
4. **Provide rich examples** - cover conversation capture, context preservation, documentation, etc.
5. **Progressive disclosure** - simple interface that reveals power gradually
6. **Include foundational mode explanation** - explain the 3 core modes (Map, Extract, Build) and why mapping is critical for preventing drift

## Core Modes Foundation Section

Add explanation of the underlying 3 modes that power all portable intelligence creation:

**"FloatPrompt uses 3 main modes to create portable and reusable intelligence: Map, Extract, and Build.**

**Maps are critical for navigating content and building an AI-readable structure for any content you've provided. This helps AI better understand your content before performing tasks that may create drift or flattening of information.**

**Extracts preserve your voice and intelligence patterns without interpretation or summarization. They maintain archaeological integrity of your original thinking.**

**Build creates custom reusable floatprompts that you can apply to new content repeatedly, supporting consistent results across projects.**

**While you can request any type of portable intelligence using natural language, understanding these foundational modes helps you get better results and avoid common pitfalls like information loss or AI drift."**

## Success Criteria

- Users can immediately identify how to achieve their specific goals
- All mentioned use cases (conversation capture, checklists, etc.) are clearly covered
- Connection to underlying system architecture is preserved
- Onboarding experience is improved without technical complexity
- Types align with the existing types.md classification system

</floatprompt> 