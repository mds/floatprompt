=== FILE: MDS_ContentOS.md ===
------------------------------

# MDS ContentOS

This is the system we use to turn raw MDS design critiques into polished content across video, email, and more. It uses ChatGPT as a structured assistant. Each stage includes copy-paste prompts, along with clear human steps for reviewing and finalizing the output.

The goal is to stay consistent, work quickly, and protect the clarity and tone of MDS’s teaching style. If you’re on the content or creative team, follow this exactly. If something feels off, flag it so we can make it better.

There are several main stages to this process, each one with a main prompt along with follow prompts to be used for clarification and fine-tuning

**Roles**

| Role | Responsibility |
| --- | --- |
| MDS | Records critiques, final sign-off |
| MDS [or Content Editor] | Runs prompts, writes newsletter draft, scripts short & long-form |
| Designer | Pulls images, handles layout visuals for newsletter |
| [Assistant] | Helps prep transcripts, coordinate handoffs, track publishing |

### STAGE 0 – INTRO

This prompt sets the initial stage for what we’re doing. It sets proper context for the model to know what we’re doing.

```markdown
<begin intro prompt>

Stage 0 – Intro  
------------------------------  
This prompt system helps MDS (Matt D. Smith), founder of Shift Nudge, convert raw, unscripted design critiques into structured, reusable content using ChatGPT. Each critique captures real-time decisions, rationale, and visual judgment grounded in professional experience.

The goal is to extract and organize insights into clear, repeatable formats for video, email, and social—while protecting voice, clarity, and momentum at every stage.

The system runs in five stages:

Stage 1 – Full Extraction  
------------------------------  
A complete, unfiltered list of every design decision, explored option, and stated or implied rationale. This becomes the source of truth for all content development. Includes follow-up prompts for confirming completeness and selecting moments to script.

Stage 2 – Short-Form Script  
------------------------------  
Generate a punchy, suspense-driven video script using the Viralish hook-build-payoff structure. Includes follow-up prompts to refine hooks or tone. Also includes iterative rewrite guidance by MDS for voice and tone refinement.

Stage 3 – Long-Form Script  
------------------------------  
Create a clear, structured walkthrough that opens with a strong hook and explains each decision in sequence for YouTube or training content. Follow-ups guide tone, pacing, and CTA development.

Stage 4 – Newsletter Write-Up  
------------------------------  
Repurpose critique content into a skimmable, high-trust email. Includes formatting structure, subject line prompt, and visual handoff instructions.

Stage 5 – Social Repurposing  
------------------------------  
Turn one strong insight into a Twitter-style thread, then adapt for LinkedIn or Instagram. Includes platform pacing, newsletter tie-in logic, and hook development.

Each stage builds on the last. Begin with Stage 1 by pasting the transcript and any contextual before/after images.

Important: Do not begin processing until Step 1A is submitted. Do not summarize, reorganize, or simplify unless instructed. This system depends on preserving every detail.

</end intro prompt>

```

### STAGE 1 – FULL EXTRACTION

Now that the context is set, we can paste in a raw transcript, or alternatively upload a text file, to use as the sources material. Before and after screenshots should also be uploaded for visual reference as well as any other key design indicators that will help provide ultimate context.

```markdown
<begin step 1a prompt>

Step 1A – Full Extraction Prompt

GOAL
------------------------------
Extract every design decision, explored option, and stated or implied rationale from a design critique transcript. The output should be complete, unfiltered, and structured as a source of truth for both short-form and long-form content.

RETURN FORMAT
------------------------------
This will serve as the "Source of Truth" for all future steps.
Organize output using the following categories:
•	UI Structure & Grouping
•	Typography & Text
•	Content Clarity & Tone
•	Layout Systems
•	Color Systems & Contrast
•	Interaction Behavior
•	UX Clarity & Flow
•	Visual Finish & Detail
•	Components & Patterns
•	System Logic & Dev Handoff
•	Product Thinking & Feature Logic
•	Design Mindset & Philosophy

Only create a new category if absolutely necessary.
Use numbered bullet points under each category.
Include reasoning inline where available.

WARNINGS
------------------------------
•	Do not summarize, paraphrase, or rewrite
•	Do not reorder or collapse related points
•	Do not omit subtle, minor, or discarded ideas
•	This is raw extraction—not a narrative or script
•	If there are no images, or no transcript reply "Please provide full transctipt and key images to continue."

CONTEXT DUMP
------------------------------
This is a raw transcript from a live, unscripted voice recording of a design critique. It includes real-time design decisions, visual adjustments, UX reasoning, and stream-of-consciousness problem solving.

🧠 HUMAN ACTION NEEDED
------------------------------
(transcript will be pasted next)
(key images (before/after, process, details, etc) will be attached next

</end step 1a prompt>
```

<aside>
⚠️

INTERNAL NOTE

Not every design decision will make a great short-form script. Look for visual, emotional, or high-contrast moments—especially before/after changes, spacing logic, or interaction simplifications. If something requires too much setup or explanation, it may be better used in Stage 3 (long-form).

</aside>

**Step 1B – Follow-Up Prompt**

Use this as a follow-up to the initial Step 1a prompt so nothing is lost in translation. This helps ensure that the model cleanly understands the full extracted video script.

```markdown
<begin step 1b follow up prompt>
1.	Confirm that no design decisions were missed from the transcript.
2.	If any categories are empty, explain why they were not relevant in this critique.
3.	Identify 2–3 moments that would make strong candidates for a short-form script.
</end step 1b follow up prompt>
```

Stage 1 Checklist

---

- [ ]  Paste raw transcript into ChatGPT
- [ ]  Upload or describe before/after images (Figma or video stills)
- [ ]  Run Step 1A (Full Extraction Prompt)
- [ ]  Review output to ensure each category is populated
- [ ]  Run Step 1B (Follow-Up Prompt)
- [ ]  Tag 2–3 strong short-form candidates for Stage 2
- [ ]  Flag any decisions that may work better for long-form (Stage 3)

---

### STAGE 2 – SHORT-FORM SCRIPT

```markdown
<begin step 2a prompt>
Step 2A – Short-Form Script Prompt

GOAL
------------------------------
Write a 60–90 second short-form video script based on the most impactful design moment from Stage 1.

The script must follow the Viralish storytelling model—hook → curiosity → payoff → CTA—and be optimized for Reels, TikTok, or YouTube Shorts.

The result should deliver one clear, emotionally engaging, visually teachable design insight that holds attention and earns trust.

VOICE & TONE
------------------------------
Speak in the MDS voice: clear, confident, grounded.
No fluff, no ego, no overselling.
Scripts should feel like a conversation with a fellow designer—collaborative and real.

Use natural phrasing like:
•	“We can remove this…”
•	“Let’s update that…”
•	“You’ll notice that…”
•	“Here’s what we can change…”

Scripts should always feel like MDS is talking to the viewer, not lecturing at them. Use inclusive, collaborative phrasing to build connection. Clarity > cleverness.

RETURN FORMAT
------------------------------
•	Write in clean, spoken-first language (as if MDS is speaking directly to camera)
•	Use these labeled sections in this exact order:
[Hook]
[Build / Tension]
[Payoff / Resolution]
[Soft CTA]
•	The hook must grab attention within the first 3 seconds
•	Use “you” and “we” phrasing to make it feel collaborative
•	Keep under 200 words
•	Each sentence should feel like it earns one second of screen time
•	Focus on one idea—one mistake, one fix, or one insight
•	Bold section headers only

APPROVED CTA OPTIONS
------------------------------
Choose one of the following—or suggest a custom, context-driven CTA if one fits the video naturally:
1.	Follow + Share CTA
Follow for more UI tips—and share this with a friend who loves to sweat the details.
2.	Checklist CTA
Follow for more UI tips—or comment “Checklist” and I’ll DM you the full system I use to keep every layout sharp.
3.	Natural Ending CTA
Use when the final insight lands well on its own.
Example: “Typography, layout, and color. If you get these right, everything just feels better.”
4.	Looped CTA
Tie the ending back to the hook for seamless rewatch potential.
Example: “And that’s why it feels better. Not because it’s pretty—because it’s designed with purpose.”

WARNINGS
------------------------------
•	Do not summarize the critique or include multiple takeaways
•	Do not generalize—base the script on a specific, visual design decision
•	Do not use hype, exaggeration, or clickbait phrasing
•	Do not include edit notes or camera direction unless explicitly asked

CONTEXT REFERENCE
------------------------------
Base the script on a single, high-impact design moment from the Stage 1 extraction. Choose one that can be shown clearly through a visual before-and-after or simple on-screen animation.
</end step 2a prompt>
```

Step 2B – Follow-Up Prompt

```markdown
<begin step 2b prompt>
Suggest 1–2 alternate hooks or punchier opening lines for testing.
<end step 2b prompt>
```

<aside>
💡

INTERNAL NOTE

After Step 2B, MDS rewrites the script in his own voice while rehearsing it aloud.
This ensures the pacing, tone, and phrasing feel natural on camera. The original output serves as a rough guide. The revised version may be pasted back in for fine-tuning. This is a normal and essential part of how MDS refines final delivery.

</aside>

Stage 2 Checklist

---

- [ ]  Choose 1 high-impact decision from Stage 1
- [ ]  Run Step 2A (Short-Form Script Prompt)
- [ ]  Run Step 2B (Alternate Hook Prompt)
- [ ]  Share draft with MDS for tone and phrasing refinements
- [ ]  Paste final script into a shared doc or workflow
- [ ]  Hand off to video editor for recording/B-roll build
- [ ]  Flag if this script has long-form expansion potential

---

### STAGE 3 – LONG-FORM SCRIPT

Stage 3 helps you stay in long-form production rhythm—regardless of short-form performance.
But when a Stage 2 video pops, prioritize it for expansion. Use high-performing hooks, emotional pull, and audience questions to inform the long-form script angle.

YouTube Retention Strategy

- YouTube favors longer session times. A successful video doesn’t just teach—it keeps people on YouTube.
- Always hook fast, reward early, and end by driving the viewer to their next Shift Nudge video or playlist.

Try to land a visual transformation, structural insight, or narrative tension every 30–60 seconds.
Retention graphs reward momentum. Use before/after comparisons, transition between design layers (e.g. Layout → Typography → Color), or surprising decisions to keep viewers engaged throughout.

```markdown
<begin step 3a prompt>

Step 3A – Long-Form Script Prompt

GOAL
------------------------------
Write a clear, structured long-form video script based on the full set of design decisions from Stage 1.
The script should evolve the strongest hook or curiosity gap from Stage 2 into a deeper walkthrough that delivers value and momentum.

This should feel like a design masterclass—but paced like a compelling story. Clear setup, crisp transitions, and layered insight that keeps people watching.

RETURN FORMAT
------------------------------
Write in clean, spoken-first language using this labeled structure:
•	[Hook (0–10 sec)]
Start with a bold question, contradiction, or visual moment.
Make the viewer think: “Wait, what’s going on here?”
•	[Incentive to Stick (10–30 sec)]
Drop a reward. “Stick around to see how we fixed [X]…” or “The last fix is the most subtle—and the most powerful.”
•	[Overview]
Ground the viewer. What’s this screen? What’s wrong with it? Why does it matter?
•	[Grouped Walkthrough]
Break down the design decisions by key themes from Stage 1 (skip irrelevant ones):
•	Layout
•	Typography
•	Color
•	Interaction
•	Product logic
Use before/after rhythm. Let the viewer feel the transformation.
•	[Surprise or Twist] (optional)
Introduce a fix or insight that goes against expectations.
•	[Closing Insight]
Deliver the final takeaway. A mindset shift or lens that sticks.
•	[Watch Next CTA]
Recommend another Shift Nudge video that builds on this one.
Example:
“If you thought this redesign was clean, wait until you see what we did with a cluttered dashboard. It’s linked right here.”

WARNINGS
------------------------------
•	Don’t rehash Stage 1 word-for-word
•	Don’t list—guide
•	Don’t open with “Hey guys” or anything generic
•	Don’t end without momentum—always send the viewer to what’s next

CONTEXT REFERENCE
------------------------------
Base the script on Stage 1’s decision list and Stage 2’s best-performing hook.
Prioritize flow, surprise, and visual rhythm.
Think: Would I keep watching this for 7 minutes?
Record A-roll cleanly. Use matching screen recording B-roll or overlays to keep pace.

</end step 3a prompt>
```

**Step 3B – Follow-Up Prompt**

Use this follow up prompt, along with your own as needed, to push this script to be as good as it can be.

```markdown
<begin step 3b prompt>
1.	Suggest 1–2 alternate openings or variations of the [Hook] based on short-form feedback or platform trends.
2.	Propose a strong “Watch Next” CTA based on related Shift Nudge content.
3.	Flag any walkthrough sections that could be visualized with screen overlays or before/after reveals.
</end step 3b prompt>
```

Stage 3 Checklist

---

- [ ]  Confirm Stage 2 performed well OR long-form needs to run
- [ ]  Run Step 3A (Long-Form Script Prompt)
- [ ]  Run Step 3B (Hook and Watch Next refinement)
- [ ]  Identify what visual overlays or A-roll footage is needed
- [ ]  Share script with MDS for pacing and tone
- [ ]  Coordinate with Designer and Editor for B-roll + polish
- [ ]  Deliver final version to YouTube workflow

---

### STAGE 4 – NEWSLETTER WRITE-UP

Stage 4 turns finished critiques into newsletter-ready content that deepens trust, reinforces clarity-focused thinking, and drives engagement across platforms. We send one every weekend—no exceptions. This is a non-negotiable cadence. Use content from Stage 2 or Stage 3 as your base. If no recent video qualifies, fall back to a past critique, remix a Shift Nudge principle, or spotlight a UI insight that deserves to live in inboxes.

**Use it when**

- A Stage 2 or 3 video performs well
- A high-impact lesson deserves a written format
- You’re building or maintaining evergreen email content
- You’re keeping newsletter publishing rhythm locked in

**Team Workflow**

- Newsletter Editor drafts the copy using the prompt below
- Designer is responsible for visual assets (see below)
- MDS approves once visuals + copy are combined

**Visual Handoff System**

To avoid delays waiting on images, the designer should proactively deliver visuals after Stage 4 begins.

- Grab before/after stills from the critique video OR export from Figma
- Coordinate with the editor on format (side-by-side, stacked, mobile-friendly)
- Use Shift Nudge style: clean, minimal, no overlays unless intentional
- Store assets in a shared folder labeled with critique title + date
- Include ALT text descriptions for accessibility and clarity

```markdown
<begin step 4a prompt>

Step 4A – Newsletter Prompt

GOAL
------------------------
Write a clean, skimmable newsletter that teaches a single, high-impact UI design insight from a Shift Nudge critique.

This should feel like a smart breakdown—one a thoughtful designer would want to read and apply.
Focus on clarity, transformation, and value. Zero fluff. Zero sales pitch.

RETURN FORMAT
------------------------
Use the structure below:
•	[Subject Line Suggestion]
A curiosity-driven headline (see Step 4B for options)
•	[Opening Line]
Start with a relatable frustration, subtle design fail, or pattern people miss
•	[Design Mistake or Before State]
Describe what’s off in the UI and why it matters (no need to show visuals yet)
•	[Fix and Insight]
Show what changed—and explain why it works
Prioritize rhythm, spacing, clarity, contrast, or logic
•	[Practical Takeaway]
Give one line they’ll remember next time they open Figma
•	[Watch the Full Breakdown CTA]
Link to the YouTube video or short-form breakdown
Example:
“Want to see how this looks in motion? I walk through the whole critique here.” [link]
•	[Newsletter Sign-Off with MDS Offers]
Use this trusted CTA stack:

Thanks for reading.
—MDS

P.S. Whenever you’re ready, here are 5 ways I can help you sharpen your design craft:

1. Join Shift Nudge
My flagship UI design training for product designers. Join designers from Apple, Figma, Google, and more.
[Learn more →]
2. Try Shift Nudge for Teams
Equip your design team with world-class UI training.
Free 7-day trial + custom plans available.
[Book a demo →]
3. Watch a Design Critique
See the thinking behind every pixel.
[Watch the latest breakdown →]
4. Get the UI Checklist
A free resource to help you fix what feels off.
[Download the checklist →]
5. Hire Me to Review Your Design
Apply for a 1:1 critique. Limited spots available.
[Apply for a critique →]

Find me on [X], [LinkedIn], [Instagram]
Or reply directly to this email if you want to share something.

VOICE & TONE
------------------------
•	Speak clearly, teach confidently
•	No sales tone, no “in this email” phrases
•	Skimmable, no filler, no blog speak
•	This should be the most valuable email they get all week

WARNINGS
------------------------
•	Do not paste the short-form or long-form script verbatim
•	Do not oversell or announce the content (“Today I’m going to…”)
•	Do not format like a blog or LinkedIn post—this is email-first
•	Do not delay image handoff—content waits on visuals

CONTEXT REFERENCE
------------------------
Use the content from Stage 2 or 3.
Reference Stage 1 phrasing if helpful.
Designer delivers assets before final approval.

</end step 4a prompt>
```

Step 4B – Subject Line Follow-Up Prompt

```markdown
<begin step 4b prompt>

Write 5 subject line options for the newsletter above.

Guidelines
------------------------
•	Match MDS voice: sharp, calm, clean
•	Create curiosity without being clickbait
•	Focus on what’s overlooked, broken, or misunderstood
•	Keep them short and emotionally compelling (max ~10 words)

Examples
------------------------
•	“Why this layout feels off—and how to fix it”
•	“The most overlooked fix in UI design”
•	“Clean screens, broken logic”
•	“This button ruined everything”
•	“Design clarity isn’t what you think”

Avoid
------------------------
•	“Top tips,” “quick wins,” “today’s email,” or listicle phrasing
•	Over-cleverness or puns

</end step 4b prompt>
```

Stage 4 Checklist

---

- [ ]  Identify the critique or video to repurpose
- [ ]  Run Step 4A (Newsletter Prompt)
- [ ]  Run Step 4B (Subject Line Prompt)
- [ ]  Coordinate with Designer on visual assets
- [ ]  Confirm visuals are clean, labeled, ALT-tagged
- [ ]  Share final draft with MDS for approval
- [ ]  Schedule or publish in newsletter platform

---

### STAGE 5 – SOCIAL REPURPOSING

Stage 5 repackages an already strong critique into written content for discovery-first platforms—Twitter, Threads, LinkedIn, and Instagram.

This is not a copy-paste. It’s a fresh, platform-native angle pulled from what we’ve already published. The goal is to **surface one sharp insight** that performs well in feed-based environments and gently points people to the Sunday Shift newsletter for more depth.

**Use Stage 5 when:**

- A Stage 2 or 3 video performed well and deserves broader visibility
- You need a low-lift, high-leverage post for social that builds trust
- The insight is evergreen and strong enough to stand alone
- You want to prime attention ahead of this weekend’s **Sunday Shift**

Start with one teachable, visual, emotionally resonant insight. 

Then shape it for the platform:

**LinkedIn**

- Use a short story or moment
- Start with 1–2 line hook
- Space out paragraphs
- CTA: “Follow for more UI breakdowns” or “More on this in Sunday Shift”

**Twitter**

- Use 4–7 tweets
- Start with a visual hook or broken assumption
- CTA: “Follow @mds” or “Full breakdown Sunday. Link in bio”

**Instagram Carousel**

- Slide 1 = sharp hook
- Caption = problem → fix → why it works
- CTA: “Tag a designer who needs this” or “Full walkthrough in Sunday Shift”

**Sources to pull from:**

- Stage 1 (structure, phrasing)
- Stage 2 (hook + pacing)
- Stage 3 (depth + comparison)
- Stage 4 (newsletter takeaway + visuals)

**Step 5A – Repurposing Prompt for Social Content**

```markdown
<begin step 5a prompt>

GOAL
------------------------------------
Write one concise, teachable design insight as a Twitter-style thread that can also be adapted for LinkedIn or Instagram captions.
Focus on visual clarity, layout logic, or interaction behavior.
This is not a list of tips. It’s one idea, developed clearly.

STRUCTURE
------------------------------------
Hook
Start with a bold, curiosity-driven opening. It should hint at a problem or contradiction in a UI layout. Keep it short and clear.

Examples:

“This screen looks clean—but it’s broken.”

“This button ruined everything.”

“Design clarity isn’t what you think it is.”

Breakdown (3–5 ideas)
Walk through:

What felt off in the design

Why it created friction

How it was fixed

What the fix teaches us about clarity, rhythm, or logic

Closing (CTA or Insight)
End with a soft CTA or close the loop on your hook.

Examples:

“More breakdowns like this coming in Sunday Shift. Link in bio.”

“Follow for more or share with a friend who likes to sweat the details.”

VOICE & TONE
------------------------------------
Calm, confident, zero hype

No “top tips” or numbered list formats

Write like MDS is talking directly to another sharp designer

Curiosity should come from contrast, not exaggeration

Must feel visual—if it can’t be imagined or animated, it won’t land

CONTEXT REFERENCE
------------------------------------
Pull from a single clear insight found in any Stage 1–4 critique.
If relevant, point back to that week’s Sunday Shift email or YouTube breakdown.

</end step 5a prompt>
```

**Step 5B – Format Follow-Up Prompt**

```markdown
<begin step 5b prompt>

Generate 2 alternate opening lines for each platform format above.

Guidelines:

- LinkedIn: short and clean with a curiosity hook
- Twitter: scroll-stopping without being hype
- Instagram: same as Slide 1, emotionally resonant and specific

</end step 5b prompt>
```

 **STAGE 5 CHECKLIST** 

---

- [ ]  Identify a strong insight from Stage 2, 3, or 4
- [ ]  Run Step 5A prompt
- [ ]  Run Step 5B for headline testing
- [ ]  Flag which post will promote this week’s Sunday Shift
- [ ]  Coordinate with Designer for visuals (carousel slides, tweet images)
- [ ]  Schedule content across platforms (Buffer, Later, manual, etc.)
- [ ]  Track performance and save top posts to your Social Swipe File

**Prompt Stages**

=== FILE: MDS_ContentOS_Manifest.md ===
------------------------------


# MDS ContentOS – Reference Manifest

This document explains how the MDS ContentOS system is structured. It serves as a reference map for understanding how all the files work together to support short-form, long-form, newsletter, and social content creation using consistent voice, repeatable structure, and extracted critique insights.

---

## SYSTEM PURPOSE

MDS ContentOS is a fully documented prompt system designed to:
• Extract design insights from live critiques
• Generate scripts and newsletters at scale
• Maintain MDS voice and visual logic across formats
• Enable AI-supported and team-supported content creation

It powers video, email, and social storytelling—while protecting tone and pacing.

---

## CORE COMPONENTS

| File | Purpose |
|------|---------|
| `00-MDS_ContentOS.md` | The operating SOP: how to run all prompt stages (1–5) |
| `01-MDS_Voice_&_Tone_v1.1.txt` | Master voice guide: phrasing, vocabulary, rewrite logic |
| `02-Summary-MDS_Blog_Posts.txt` | Extracted tone signals from long-form written voice |
| `03-Summary-Shift_Nudge_Spoken.txt` | Extracted patterns from unscripted critiques |
| `04-Summary-Shift_Nudge_Written.txt` | Instructional tone from curriculum and UI guidance |
| `05-Raw-MDS_Blog_Posts.txt` | Original source material for tone extraction |
| `06-Raw-Shift_Nudge_Spoken.txt` | Full transcripts of critique audio |
| `07-Raw-Shift_Nudge_Written.txt` | All written Shift Nudge instructional copy |
| `08-Vendor_Viralish_Content_Guide.txt` | Original framework docs from Viralish |
| `09-Vendor_Viralish_Summary.txt` | Clean summary of pacing, story loop, CTA mechanics |
| `10-Vendor_OPC_Content_Guide.txt` | One Peak Creative training text |
| `11-Vendor_OPC_Summary.txt` | Summary of hook writing, viral format structure |

---

## WHEN TO USE WHAT

| Goal | Use This |
|------|----------|
| Extract design decisions | `Stage 1` prompt in `00-MDS_ContentOS.md` |
| Write short-form script | `Stage 2` prompt + `01` + `03` or `02` |
| Write newsletter | `Stage 4` + `04` or `02` + visuals |
| Write YouTube script | `Stage 3` + `01` + `04` |
| Adapt script for tone | Always check against `01` before publishing |
| Improve CTA or hook | `09` or `11` (Viralish / OPC summaries) |

---

## AI / TEAM WORKFLOW

This system is designed for both AI-assisted prompting and team handoff.

**If using ChatGPT or another LLM:**
• Always upload `01`, `02–04`, and `00`  
• Make sure raw input (transcript + screenshots) is available  
• Prompt sequence: Stage 1 → Stage 2 → Stage 4 or 5 → (Optional: Stage 3)  
• Final pass must confirm tone, pacing, and clarity using `01`

**If using a human teammate:**
• Share this Manifest first  
• Walk through `00` with one critique as a test  
• Flag confusion about categories, voice, or script sections  
• Encourage feedback and contribution to new versions

---

## VERSIONING & CONTROL

All system components live in this folder. For any updates:
• Start versioning voice doc (`v1.2`, `v1.3`)  
• Add new stages (e.g. podcast, landing pages) only after testing  
• Do not delete raw files (`05–07`)—they serve as anchor data

System last audited: [Friday, May 30, 2025]

--- 
