⏺ Let's stress test this. I'll throw scenarios at the 7 fields and see what breaks.

  Current fields:
  1. title
  2. author
  3. created
  4. status (draft | published | archived)
  5. type (article | newsletter | notes | transcript)
  6. published_to (newsletter | blog | unpublished)
  7. ai_assisted (true | false)
  8. context

  (That's actually 8. Let me keep going and we'll trim.)

  ---
  Scenario 1: Journal entry
  title: 2025-01-15 Journal
  author: MDS
  created: 2025-01-15
  status: ??? # not draft, not published, just... done
  type: journal
  published_to: ??? # never will be published, it's private
  ai_assisted: false
  context: daily reflection
  Breaks: status doesn't fit. "Published" doesn't apply. published_to is awkward for private docs.

  ---
  Scenario 2: Transcript (raw)
  title: Dan Martell coaching call
  author: MDS
  created: 2025-01-09
  status: raw # needs processing
  type: transcript
  published_to: unpublished
  ai_assisted: true # transcription
  context: coaching call notes
  Breaks: status needs "raw" or "processed" for transcripts.

  ---
  Scenario 3: Social post (multi-platform)
  title: Modal redesign before/after
  author: MDS
  created: 2025-08-15
  status: published
  type: social
  published_to: instagram, twitter, linkedin # multiple!
  ai_assisted: false
  context: 1M+ view post
  Breaks: published_to needs to support multiple destinations.

  ---
  Scenario 4: Archived external article
  title: "The Future of Design Tools" by Someone Else
  author: ??? # not me
  created: ??? # when I saved it? when they wrote it?
  status: archived
  type: reference
  published_to: n/a
  ai_assisted: n/a
  context: saved for research
  Breaks: author isn't you. Need source or original_author. created is ambiguous (saved vs written).

  ---
  Scenario 5: Living document (ongoing research)
  title: AI tools landscape
  author: MDS
  created: 2025-02-01
  status: ??? # ongoing, never "done"
  type: research
  published_to: unpublished
  ai_assisted: partial # some AI, some manual
  context: tracking AI design tools
  Breaks: status needs "ongoing" or "living". ai_assisted might need more than true/false.

  ---
  Scenario 6: Email draft
  title: Email to Dan Martell
  author: MDS
  created: 2025-01-09
  status: sent
  type: email
  published_to: ??? # sent to a person, not published
  ai_assisted: false
  context: coaching follow-up
  Breaks: published_to doesn't fit emails. Need "recipient" or just drop this field for emails.

  ---
  Scenario 7: Course curriculum
  title: Shift Nudge Module 5 - Typography
  author: MDS
  created: 2024-06-01
  status: live # but also updating
  type: curriculum
  published_to: course platform
  ai_assisted: partial
  context: typography fundamentals
  Breaks: Need updated date (created is old, but content is current). status might need "live" option.

  ---
  Scenario 8: Collaboration doc
  title: Q1 2026 Planning
  author: MDS, Lillian # multiple
  created: 2025-12-15
  status: active
  type: planning
  published_to: internal
  ai_assisted: false
  context: quarterly planning
  Breaks: author needs to support multiple people. published_to = "internal" is different from "unpublished".

  ---
  What's breaking:

  | Field        | Issue                                                                                         |
  |--------------|-----------------------------------------------------------------------------------------------|
  | status       | Needs more options: draft, complete, published, archived, raw, ongoing, sent, live            |
  | published_to | Doesn't fit private docs, emails, internal docs, multi-platform. Maybe rename to destination? |
  | ai_assisted  | Might need: true, false, partial, transcribed. Or keep boolean and "partial = true"           |
  | author       | Needs to support multiple. Also: what about content you didn't write?                         |
  | created      | Ambiguous for archived content. Might need saved vs written distinction                       |

  ---
  Questions to resolve:

  1. Is published_to actually required? Or is it optional metadata that only applies to some doc types?
  2. Should status have a fixed set or be freeform? Fixed is cleaner, freeform is flexible.
  3. Do we need updated as a field? Or trust file system metadata?
  4. How do we handle content you didn't author? Separate source field?

  What's your instinct on these?

> all these fields can be emergent vs locked to a dropdown for status, destination is a good idea but does that work for all?, ai_assisted is almost not even 
needed this IS for AI assistance... should we move back into the floatprompt directory so we have a good baseline for the JSON fields? 

⏺ Good instincts.

  1. Emergent fields - freeform is more flexible and future-proof
  2. destination - might be optional, not everything has one
  3. ai_assisted - you're right. If this IS for AI collaboration, that's assumed. Redundant field.

  Let's look at the floatprompt JSON structure as baseline:

⏺ Read(~/Documents/_Github/floatprompt/docs/fp.md)
  ⎿  Read 131 lines

⏺ Good baseline. Looking at floatprompt JSON:

  Required in floatprompt:
  - STOP — mode directive
  - meta — title, id, format
  - human — author, intent, context
  - ai — role, behavior
  - requirements — scales with complexity

  For floatdoc (documents, not tools), we strip the machinery:

  | floatprompt   | floatdoc | why                              |
  |---------------|----------|----------------------------------|
  | STOP          | —        | docs don't have modes            |
  | meta.title    | title    | same                             |
  | meta.id       | —        | optional for docs                |
  | human.author  | author   | same                             |
  | human.intent  | intent   | why does this exist              |
  | human.context | type     | what kind of thing               |
  | ai.role       | —        | docs don't define AI behavior    |
  | requirements  | —        | docs don't have behavioral specs |
  | —             | created  | docs need timestamps             |
  | —             | status   | docs need state tracking         |

  Floatdoc core (6 fields):

  ---
  title:
  created:
  author:
  type: # emergent (article, notes, transcript, research, email...)
  intent: # one line - why does this exist
  status: # emergent (draft, complete, published, raw...)
  ---

  Optional:
  destination: # where it goes (blog, newsletter, internal...)
  updated: # last modified
  source: # for external/archived content

  This mirrors floatprompt's human block (author, intent, context) but strips the AI behavioral stuff since docs aren't tools.

  Does this feel right? Or should human and ai sections exist in floatdoc too?