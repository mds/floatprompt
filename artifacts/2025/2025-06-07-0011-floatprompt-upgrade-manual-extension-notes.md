---

title: floatPrompt Upgrade Strategy Manual — Using Artifacts to Refactor the Core Specification
id: 2025-06-07-0009-floatprompt-upgrade-strategy-manual
version: 1.0.0
created: 2025-06-07-0009
modified: 2025-06-07-0009
author: @mds
contributors: ["@mds", "ChatGPT 4o"]
format: floatPrompt
filetype: markdown
type: instruction
system_version: floatPrompt v0.7.0
source:
prompt: "Post-artifact integration strategy for human-guided upgrade of core floatPrompt.md using floatPrompt modes"
intent: "Create a foolproof human-executable playbook for systematically refactoring floatPrompt.md using 8 preserved artifacts"
certification:
timestamp: 2025-06-07T18:50:00Z
chain:
depth: 9
parent: 2025-06-07-0008-constructor-warning-protocol
voice:
linked: true
fidelity_verified: true
lineage:
tracked: true
trace: ["floatPrompt.md", "floatprompt-soft-coded-construction", "floatprompt-modes-breakthrough"]

# 🧭 floatPrompt Upgrade Strategy Manual

## 📁 Project Directory Structure (Updated for v0.8.0+)

```bash
/floatPrompt/
├── floatPrompt.md                # ✅ The canonical compiled spec (output only)
├── build-floatPrompt.mjs         # Compiler script
│
├── /source/                      # All modular system inputs
│   ├── /spec/                    # Modular compiler logic (frontmatter YAML + spec .md modules)
│   └── /docs/                    # Manifesto, safety, and legacy philosophy documents
│
├── /artifacts/                   # Preserved cognition — not compile inputs
│   ├── 2025-06-07-0001-...md     # Design sessions, strategy logs, philosophical thought
│   └── ...
```

---

## 🎯 Purpose

This manual is for the human operator (@mds) to use the **8 preserved floatPrompt artifacts** as **fuel** for a surgical, structured upgrade of the core `floatPrompt.md` file.

It uses the floatPrompt system **against itself**, running each phase of upgrade as a distinct floatPrompt operation. This prevents drift, flattening, and untraceable edits.

---

## 🛠️ What You Have

You already created 8 artifacts:

1. `manifesto-upgrade-gutenberg`
2. `floatprompt-modes-breakthrough`
3. `floatprompt-soft-coded-construction`
4. `shadow-human-doctrine`
5. `floatprompt-constitutional-analogy`
6. `hallway-log`
7. `ai-self-diagnosis-checkpoint`
8. `constructor-warning-protocol`

---

## ⚙️ The 8-Phase Upgrade Workflow

Each of the 8 floatPrompt operational modes is mapped to a specific phase. Follow them in order.

---

### 1️⃣ **Map the Insertion Plan** → `cartographer`

> **Goal:** Decide where each artifact conceptually plugs into `floatPrompt.md`

**Do this:**

* Read all 8 artifact titles and skim contents
* Create a 1-line summary of what each one *adds to the system*
* Draw a list of existing floatPrompt.md sections and match which artifact touches which
* Create a draft order of integration (e.g. philosophy → modes → architecture → safeguards)

Output: a floatPrompt map like `floatprompt-upgrade-insertion-plan.md`

---

### 2️⃣ **Extract Key Intel from Each Artifact** → `extractor`

> **Goal:** Pull only the relevant operational intelligence for inclusion

**Do this:**

* One artifact at a time
* Highlight the concepts that are actionable upgrades (e.g. section rewrites, new field behaviors, philosophical framing)
* Ignore poetic framing unless it serves clarity or governance

Output: A cleaned version of each artifact as an `extract` floatPrompt (e.g. `extract-soft-coded-construction.md`)

---

### 3️⃣ **Graft Upgrades into the Spec** → `constructor`

> **Goal:** Carefully add new structure into `floatPrompt.md`

**Do this:**

* Open floatPrompt.md in Cursor or trusted markdown editor
* Choose one `extract` at a time
* Identify insertion point (section header or new section)
* Apply changes incrementally (never bulk insert)
* Add TODO or `source:` if unsure — do not improvise
* Compiler should add: `<!-- Source: /spec/filename.md -->` above each modular block

---

### 4️⃣ **Pause and Self-Audit** → `constructorWarning`

> **Goal:** Catch epistemic overreach before saving

**Do this:**

* Before you commit any graft, ask:

  * Is this for execution or exploration?
  * Will this make sense 6 months from now?
  * Is this structural truth or symbolic framing?
* If unsure, create a `floatprompt-clarify-XXX.md` to think through it later

---

### 5️⃣ **Preserve Your Decisions** → `curator`

> **Goal:** Keep a clean record of what changed and why

**Do this:**

* For each edit, make a short floatPrompt entry like:

```markdown
2025-06-08-0001-inserted-soft-coded-construction.md
```

* Include:

  * What section changed
  * Why this edit was made
  * What artifact it came from
  * What phase of the upgrade it occurred in

---

### 6️⃣ **Run a System Scan** → `cartographer` (again)

> **Goal:** Map the new architecture after upgrade is complete

**Do this:**

* Compare new `floatPrompt.md` to original
* Create a top-down map showing:

  * New section titles
  * New protocols introduced
  * Linked floatPrompts now referenced

---

### 7️⃣ **Finalize and Lock Version** → `constructor`

> **Goal:** Declare a system version upgrade

**Do this:**

* Rename `floatPrompt.md` to `floatPrompt-v0.8.0.md`
* Create a new canonical version
* Add certification metadata (chain.parent, chain.depth, etc.)

---

### 8️⃣ **Run Closing Diagnostic Log** → `summary`

> **Goal:** Document what changed and why the system is now stronger

**Do this:**

* Create a final log:

```markdown
2025-06-08-0002-floatprompt-upgrade-log.md
```

* Include:

  * Philosophy that guided the change
  * Risks averted
  * Improvements made
  * Link to new spec

---

## 🪨 Final Reminder

You are not rewriting a spec. You are **grafting preserved intelligence into a living constitutional file**.

floatPrompt will hold — as long as you proceed like the surgeon, not the scribe.

When in doubt, pause. When clear, execute. When complete, preserve the system itself.

That’s the path. You’ve built it.
