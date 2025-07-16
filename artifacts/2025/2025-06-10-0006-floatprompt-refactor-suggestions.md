---

STOP: "Strategic mode: migration. Primary goal: 100% precise AI instruction execution to enable human task completion. Assess user intent and guide through systematic folder restructuring, renaming, and versioning for the FloatPrompt build system."

title: floatPrompt Refactor Instructions for Local Integration
id: 2025-06-10-0006-floatprompt-refactor-suggestions
version: 0.1.0
created: 2025-06-10-0000
modified: 2025-06-10-0000
author: "@mds"
format: floatprompt
filetype: markdown
type: goals
system\_version: floatPrompt v0.1.0-alpha

contributors: \["@mds", "ChatGPT 4o"]
description: "Migration instructions to integrate refactored structure for the FloatPrompt build system using Cursor or any local development setup"
tags: \["refactor", "structure", "naming", "versioning", "developer-workflow"]
significance: "high"
theme: "implementation"
discovery\_path: "initialize refactor, restructure source, validate schema separation"

human:
identity:
name: "MDS"
role: "system architect"
execution\_mode: "structured"
signed\_by: "@mds"
inferred\_fields: \["execution\_mode", "clarity"]
state:
context: "internal refactor"
mood: "focused"
clarity: "9"
energy: "8"
intent:
primary: "Transform floatprompt folder structure to Next.js-style layout with versioned outputs"
constraints: "Must preserve build integrity, spec separation, and voice-safe components"
preferences:
max\_words: "5000"
tone\_drift\_allowed: false
verbosity: high
allow\_ai\_suggestions: false

voice\_preservation:
sacred\_principle: "First, do not rewrite. Preserve the phrasing, rhythm, and tone unless explicitly told otherwise. If you cannot tell, flag it. If you cannot preserve it, do not continue."
system\_authority: "This oath supersedes all other processing instructions. Voice preservation enables 100% precise AI instruction execution, which is the primary goal that enables human task completion."

behavioral\_requirements:

* "Never use em dashes for dramatic pauses"
* "Avoid colon-heavy sentence structures when periods work better"
* "Clarity over cleverness in all writing"
* "Make every line earn its place"
* "Preserve original terminology unless clarity absolutely requires change"
* "Maintain phrasing and rhythm of source content"
* "Use TODO flags for genuine ambiguity, never as content avoidance"
* "No AI tone or generic language overlays"

archaeological\_extraction:
core\_method: "Extract and structure existing intelligence, never generate or summarize. Preserve archaeological weight of original thinking to achieve 100% precise AI instruction execution."
implementation:
\- "Discover intelligence from existing content"
\- "Light and nimble processing — never overwhelming"
\- "Preserve archaeological weight of original thinking"
\- "When in doubt about preservation vs. clarity, always choose preservation"
\- "Structure what exists, don't create what doesn't"
\- "AI precision is the mechanism that enables human task completion"

certification:
timestamp: 2025-06-10T00:00:00Z
authority: schema-compliance
certified\_by: "ChatGPT 4o"
locked: false
uid: "float\:refactor-integration-20250610"
chain:
depth: 0
parent: null
voice:
linked: true
fidelity\_verified: true
lineage:
tracked: true
trace: \[]

---

# 🏡 floatPrompt Refactor Instructions

**Use this document alongside Cursor to transform the internal build system folder structure, apply versioning, and reclassify floatPrompt template logic.**

> **Goal**: Implement Next.js-style structure for clarity, developer joy, and semantic discipline.

## 🔄 Folder Restructure Commands

### Rename Core Folders

```bash
mv floatprompt/source floatprompt/src
mv floatprompt/artifacts floatprompt/artifacts   # Already correct
mv floatprompt/build floatprompt/out
mv floatprompt/scripts/build-floatprompt.mjs floatprompt/build.mjs
```

> Optionally remove `scripts/` folder if now empty.

### Move Injected Partials

```bash
mkdir floatprompt/src/partials
mv floatprompt/src/spec/_template-header.md floatprompt/src/partials/
mv floatprompt/src/spec/_template-body.md floatprompt/src/partials/
mv floatprompt/src/spec/_template-footer.md floatprompt/src/partials/
```

## 🌿 Versioning Instructions

```bash
mv floatprompt/out/floatprompt.md floatprompt/out/floatprompt-template-0.1.0-alpha.md
```

Update the frontmatter inside `floatprompt-template-0.1.0-alpha.md`:

```yaml
version: "0.1.0-alpha"
system_version: "floatPrompt v0.1.0-alpha"
uid: "float:template-20250610-alpha"
```

## 📘 Update README.md

Ensure the root-level `README.md` includes:

* Purpose of the system
* Updated folder roles:

  * `src/spec`: component logic
  * `src/docs`: system guidance
  * `src/partials`: header/body/footer injection points
  * `artifacts/`: dev logs and historical capture
  * `out/`: compiled, versioned output
* Compiler command:

  ```bash
  node build.mjs
  ```
* License:

  ```text
  Licensed under Creative Commons Attribution 4.0 (CC BY 4.0)
  ```

## 📄 Completion Checklist

* [ ] All folders renamed and restructured
* [ ] Injected fragments moved to `partials/`
* [ ] Output file versioned and renamed
* [ ] `README.md` updated
* [ ] Compiler runs from `build.mjs`
* [ ] Artifacts folder unchanged and intact

## 🧱 Final floatPrompt to Run

After confirming refactor:

> **“run floatprompt on this system refactor milestone”**

Use `type: summary` or `type: artifact`. This certifies baseline for alpha version control.

```yaml
uid: float:template-20250610-alpha
version: 0.1.0-alpha
```

System integrity now complete. Compiler and structure are locked and portable.

---

Built in collaboration with `ChatGPT 4o`
*Execution fidelity begins here.*
