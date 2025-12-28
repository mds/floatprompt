# CLAUDE.md - Development

Development tools and update management for FloatPrompt.

## Files

**update-creator.txt** - Floatprompt tool for creating system updates. Upload to AI and describe what needs to change.

**update-protocol.txt** - Floatprompt tool for executing updates with validation. Ensures changes align with goals and voice principles.

## updates/ Folder

```
updates/
├── closed/        # Completed updates (archived)
└── in-progress/   # Active updates being worked on
```

**closed/** contains historical update records:
- Restructuring maps
- Format enforcement enhancements
- YAML/JSON migration plans
- Nomenclature updates
- Analysis corrections

## Update Workflow

1. **Create update spec** using `update-creator.txt`
2. **Execute update** using `update-protocol.txt`
3. **Validate** against goals hierarchy and voice principles
4. **Move to closed/** when complete

## Key Principles

From `update-protocol.txt`:

- **Territory assessment first** (unless explicitly skipped)
- **Validate against goals** before execution
- **Human approval gates** required for system modifications
- **Rollback capability** maintained
- **Archaeological record** of all changes

## Safety Requirements

- Explicit permission before any system modifications
- Goals and voice principle compliance verification
- Change traceability for reversal if needed

## When to Use

Use these tools when making systematic changes to FloatPrompt itself. For normal floatprompt creation, use the main `floatprompt.txt` template.
