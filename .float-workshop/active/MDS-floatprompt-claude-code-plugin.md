Written by @MDS

Based on join human + ai execution

Below assumes the Claude Code FloatPrompt plugin has been installed already:

- Human cd directory via terminal
- Human runs "claude"
- Claude Code activates
- Human types /float to run float command
- /float is similar to what we now have as float-boot
- Claude iniates boot sequence
- Reads decision logs, checks ACTIVE status, suggest, MODE
- Anything else I'm missing? 
- Human & Claude do work together
- Human either:
  - Manually runs /float-handoff OR
  - Precompact hook fires /float-handoff before autocompact occurs to preserve desicion logs, organize things, update mode, prepare next /float session


other ideas for float-handoff
- /float-save


We want to make this as easy and non-invasive as possible for the human. /float puts everthing in motion and would ideally be the ONLY command needed

There may be some special circumstances where we could supply extra commands for "power users" but it would be ideal to have this just work magically with Claude agents, skills, and plugins all inside of Claude code writing everything necessary to floatDB and generating necessary markdown files as needed in the .float/ folder.

Other considerations:
- we don't need any CLI specific commands do we? 
- or maybe we do so that floatprompt plugin can build float.db manually? need clarity here
- make sure that we use CLI commands and typescript to build float.db as mechancially and lightning fast as possible, THEN use background agents to enrich
- .float-workshop/ currently has manual modes/MODES.md for reclaiming a certain type of work... should this be in float.db?


Human + AI session structure idea... this may not be fully accurate:

- Human's Project
- Phase(s) (build phases to segment all the work)
  - Feature 
  - Task
  - ?
- Session: running "claude" within one context window
  - During a session any number of phases, or feature builds, or tasks may be completed
  - Session logs/

Do we also need also need to break up logs into:
  - logs/session
  - logs/feature
  - logs/task
  - logs/*

In addition to have our logs/ PER .float/ root directory page???

