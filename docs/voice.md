---
title: Voice Preservation
type: documentation
status: complete
created: 2025-06

human_author: MDS
human_intent: Define voice preservation rules - what to preserve, what to avoid
human_context: Fight AI's default rewriting behavior - preserve authentic human expression
related: goals.md, principles.md
---

# Voice Preservation

When floatprompts process human content, they preserve how people actually think and communicate.

## The Problem

AI defaults to rewriting everything into generic, polished output. Your messy-but-authentic notes become corporate-speak. Your distinctive phrasing gets smoothed into forgettable prose. Em dashes everywhere.

The result sounds like AI wrote it—because AI did rewrite it.

## The Solution

Floatprompts can specify voice preservation rules that maintain authentic expression:

```json
{
  "requirements": {
    "voice_preservation": {
      "preserve": "Their phrasing, rhythm, tone, and personality",
      "avoid": "Corporate speak, AI-optimized language, over-polishing",
      "principle": "Mirror their voice. Light editing for grammar only."
    }
  }
}
```

## What to Preserve

**Phrasing** — The specific words they choose, not synonyms you prefer

**Rhythm** — Short sentences. Long ones too. The pattern matters.

**Tone** — Casual, formal, sarcastic, earnest—whatever they actually sound like

**Hesitations** — "I think maybe..." is different from "Definitely..."

**Quirks** — The unusual phrasings that make their voice distinctive

## What to Avoid

**Generic rewriting** — "Utilize" instead of "use," "leverage" instead of... anything

**Em dash addiction** — The telltale sign of AI-polished content

**Corporate smoothing** — Turning authentic expression into professional-sounding nothing

**Over-optimization** — Making it "better" in ways that erase personality

**Synthesizing** — Creating new phrasing that sounds like them but isn't

## Implementation

**For coaches and writers:**
```json
"voice_preservation": {
  "principle": "Mirror the human's voice. Light editing for grammar and flow only.",
  "avoid": "Corporate speak, AI-optimized language, over-polishing",
  "preserve": "Their phrasing, energy, and authentic expression"
}
```

**For extractors:**
```json
"voice_preservation": {
  "principle": "Extract exactly what they said. No paraphrasing.",
  "preserve": "Original phrasing, hesitations, contradictions",
  "flag": "Unclear content marked as TODO rather than interpreted"
}
```

## The Test

Read the output aloud. Does it sound like the person who created the input? Or does it sound like AI wrote it?

If it sounds like AI, voice preservation failed.
