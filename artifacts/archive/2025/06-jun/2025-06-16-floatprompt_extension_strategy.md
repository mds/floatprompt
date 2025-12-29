<floatprompt>

---
STOP: "strategy and discussion floatprompt for upgrading file extension from .md to .fp"

title: recommendation – Evaluate .md to .fp Extension Upgrade

id: floatprompt-upgrade-extension-recommendation

version: 0.1.0-alpha

created: 2025-06-14-0000

modified: 2025-06-14-0000

author: @mds

format: floatprompt

filetype: markdown

type: recommendation

system_version: floatprompt v@latest

contributors: ["@mds", "ChatGPT"]

source:

  prompt: "Strategic consideration of renaming floatprompt files from .md to .fp"

  intent: "Explore implications and risks of adopting a protocol-specific file extension for the floatprompt system"

---

  

# 🧭 Recommendation: Evaluate Upgrading FloatPrompt File Extension to `.fp`

  

This floatprompt defines the strategic discussion framework for deciding whether to upgrade the file extension of all floatprompt files from `.md` to `.fp`.

  

## ✅ Why Consider the Change

- `.fp` is minimal, clean, brand-consistent, and execution-specific

- Distinguishes floatprompts from general markdown documents

- Improves file searchability, recognition, and GitHub automation

- Supports upcoming agentic workflows and Operator routing

- Reduces visual noise from long `.floatprompt` alternatives

  

## ⚠️ Strategic Considerations

  

| Area | Potential Impact |

|------|-------------------|

| **Tooling Compatibility** | Will editors, linters, syntax highlighters still work with `.fp`? |

| **GitHub Previews** | Will GitHub render `.fp` as markdown? If not, do we need `.editorconfig` or MIME overrides? |

| **Migration Plan** | Should `.md` remain valid? Do we enforce `.fp` only in new folders? |

| **Backwards Compatibility** | Do past files in `artifact/` need renaming? Do update floatprompts get dual naming? |

| **Public Adoption** | Will `.fp` be misunderstood, or accepted as clean like `.cue`, `.proto`, etc.? |

  

## 🛠 Migration Scenarios

  

### Option 1: Soft Launch

- Continue authoring as `.md`

- Allow `.fp` in `to-process/`, `deploy/`, and CLI tools

- Update metadata to recognize both

- Begin documenting `.fp` in naming.md and toolchains

  

### Option 2: Hard Launch

- Migrate all floatprompts to `.fp`

- Deprecate `.md` in future versions

- Update `validation.md` to reject `.md` unless `legacy: true`

  

### Option 3: Hybrid

- Use `.fp` for core system files and `deploy/`

- Use `.md` for dev and `lab/`

- Maintain bi-extension logic in tools

  

## ✅ Compatibility Safeguards

- Require `<floatprompt> ... </floatprompt>` wrapping for all `.fp` files

- All `.fp` files must still be valid markdown with YAML frontmatter

- Add `.fp` to `.gitattributes` or `.editorconfig` for markdown rendering in GitHub

- Update all CLI and GitHub workflows to match `*.fp`

  

## 🔗 Proposed Evaluation Plan

  

### 1. Share this floatprompt with:

- Claude

- GPT-4o

- Open source community (optional)

- Operator agent

  

### 2. Gather behavioral feedback:

- How do each interpret `.fp` files?

- Does markdown render properly?

- Are there any linting, readability, or compatibility issues?

  

### 3. Define adoption policy:

- Use `naming.md` and `metadata.md` to declare `.fp` as canonical, fallback `.md` as legacy

  

---

  

> **This is not just a file extension decision. It is a protocol formalization decision.**

  

This floatprompt invites AI systems and collaborators to evaluate the implications with precision.

</floatprompt>