User installs floatprompt into any directory of their own knowledge (code/content/etc) via npm install floatprompt

.float/ is installed at root level along with:
- boot.md
- project/
  - context/
  - logs/
  - nav/
- templates/
  - legacy markdown docs
- tools/
  - float*tools

.claude/commands are also installed and each one points to .float/tools/*

Everything in .float/ has previously been done with markdown only

We're now in the process of rebuilding the foundational pieces, bit by bit, with typescript.

The goals is to merge the speed and predictability of code and the contextual quality structue of floatprompt to create omnipresent recursive context scaffolding around any users' project

Users install floatprompt (npm install floatprompt) then run /float command

The system is built and ready for recursive context

---

For now, we are assuming CLI tools, users are running Claude Code

Claude Code can spawn "Claude" agents to handle various tasks. These agents in the floatprompt world are called "Buoys"

Moving forward beyond where we're at now, we need to decide the absolutely best:

boot.md (aka system.md) floatprompt structure,and OS-level document—similar to templates/.float/templates/float-os.md that would ORIENT AND DIRECT CLAUDE CODE to fully understand the .float/ system and how it should operate to create recursive contextual scaffolding THIS IS THE ULTIMATE FLOATPROMPT to define the full system and how it operates. the existing file does pretty well, but it's all based on old markdown methodology

we, also need to determine the best typescript setup for floatprompt tools (we've already defined schema for base format) all existing tools are markdown only, but they could probably be more powerful within .float/ if some of them were actual typescript functions vs markdown instruction for AI

AI needs to realize that it can use typescript functions, command line functions, AND the ability to SPAWN multiple buoys/agents to accomplish various tasks in this .float/ system. It should never try to do alone, what 3-4 subagents/buoys can do together.


