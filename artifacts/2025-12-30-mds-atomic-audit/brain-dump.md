2025-12-30-mds-atomic-audit-DO-NOT-MOVE.md

# AI NOTE: I @MDS AM WORKING THROUGH SOME IDEAS HERE, DO NOT MODIFY OR MOVE THIS DOCUMENT...

This is my attempt to organize everything related to floatprompt.

Flow Prompt started as a file format and still very much is that. We have the traditional floatprompt tool format with the FP brackets, the JSON, and the Markdown. We have the float doc which includes required metadata as a YAML front matter and a Markdown document. And now we have the system that sits in the.float folder for building and maintaining ultimate context of any directory.

All of our documents as they relate to floatprompt are related to the floatprompt file and some philosophical things about flow prompt and my musings on AI in general.

The system has evolved substantially over the last few days as I've been building tools and processes and concepts regarding system awareness, buoy coordination (which is the floatprompt term for AI agents).

The system has gotten substantially more complex over the last few days as I've been working on it nonstop. I'm extremely excited about this possibility, but I also know that it may be time to pause and take a step back to solidify the foundation again.

That's why in this document below, I will try to list out everything that I can think of as it relates to Flow Prompt and this system and this new AI civilization that would exist at the root level of any folder.

The goals for floatprompt are still the same and can be found in the floatprompt root folder documents and goals. It's all about preserving human voice and creating rich context and precise AI instructions so that the human remains in control and that AI is incredibly powerful within those constraints, while keeping the human in the loop.

(idea for /float-think tool for claude code That would take the current context and the human would run float think, and the AI would cycle through all available float tools and decide which ones would be best for the task at hand spawn float buoys to run each of them. float-think should also produce the three-way reporting that we've been discussing. And it should make a note as to whether or not any of the existing tools are not built properly for the task at hand. And maybe there is a gap buoy that determines what that missing functionality is and puts it into a report. If and only if there are gaps missing that would fire off a repair buoy to update the tool.)

(idea for /float-context that it does read the last three or more git logs as well IF the repo exists, other wise skips this step, the amount of git history could be emergent based on related pushes or what the git buoy finds)

1. floatprompt <fp><json/><md/></>
2. floatdoc yaml + md
3. floatprompt root github repository that was originally created for just the floatprompt project, contains docs, readme, etc. as it relates to the file format itself and philosophical ideas that power the decisions
4. float system (NEW) which lives at .float in both the floatprompt repo and deployed via npx floatprompt into any folder director (could be a git project, a dropbox folder, or simply a folder on someon's desktop, we don't know)
5. .float/project, floatprompt, and system files
6. .float/floatprompt contains core files, specialty tools, and tool types, it's a full workshop
7. .float/floatprompt/tools are special tools that manipulate all sorts of data and relate to .claude/commands in the same root directory
8. .float/project/ contains all information and contextual understanding of the project folder that .float/ has been added to

other things that have emerged and that have gotten muddled a bit in the original repo with the addition of the system. 

This may not be a bad thing, but it is much more complex. I just want to create this document to put a timestamp on my concerns about things getting super complicated.

We're building the system with the system and trying to document things, and we have several different systems and formats and documentation, etc.

here are the things that are getting the root folder structure messy:

- maintenance
- npx stuff
- buoy documentation (specs/claude/*)
- templates (for npx) but unclear when looking in repo

all of this is important, but we have three main things here

1. floatprompt file formats and related docs/specs/etc.
2. .float system material
3. npx package

another confusing thing is that floatprompt tools and floatprompt docs and floatprompt system are all good concepts, but having /floatprompt/floatprompt/floatprompt (exageration) gets confusing, perhaps a better hierarchy is 

1 file
2 system
3 package

? 

I'm in search of structural and contextual clarity.

the system is by far the most complex becuase it has user tools, internal tools, etc. and a buoy civilization. all very exciting but some of that is documented and mixed with the file format.

we've also got:

tools: types, updates, syncs, etc.
buoys: randomly documented outside of the system files
commands: claude, floatprompt tools, etc. (claude command and claude code is critical engine underneath this entire .float system, but it should continue to be built in the way that AI any engine could power it, which is why the claude commands are abstracted into floatprompt tools)

let's discuss a very high level strategy for the ultimate hierarchy and foundation for continuing our work here.

MDS, map out where we are, discuss and decided where we want to go and build a spec, then structure everything properly (this may need a new git branch "the-great-restructuring)