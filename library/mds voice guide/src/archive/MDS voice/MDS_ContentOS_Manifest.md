# MDS ContentOS – Reference Manifest

This document explains how the MDS ContentOS system is structured. It serves as a reference map for understanding how all the files work together to support short-form, long-form, newsletter, and social content creation using consistent voice, repeatable structure, and extracted critique insights.

---

## SYSTEM PURPOSE

MDS ContentOS is a fully documented prompt system designed to:
• Extract design insights from live critiques  
• Generate short-form scripts, YouTube walkthroughs, and newsletters  
• Maintain MDS voice, phrasing, and rhythm across all content  
• Enable scalable AI and team-supported content creation

---

## CORE COMPONENTS

| File | Purpose |
|------|---------|
| `MDS_ContentOS.md` | The full SOP with all stages, prompts, and workflow checklists |
| `MDS_Voice_&_Tone.txt` | The definitive rewrite + clarity guide for voice fidelity |
| `MDS_Tone_Summaries.txt` | Combined tone extractions from blog, spoken, and written teaching |
| `MDS_Raw_Content.txt` | Full raw source archive for traceability (not used in daily prompting) |
| `Vendor_Summaries.txt` | Short-form structural logic from Viralish + One Peak (summary only) |
| `Vendor_Raw_Guides.txt` | Full playbooks and hook/CTA formats (used as needed)

---

## WHEN TO USE WHAT

| Goal | Use This |
|------|----------|
| Extract design decisions | `Stage 1` prompt in `MDS_ContentOS.md` |
| Write short-form script | `Stage 2` + `MDS_Voice_&_Tone.txt` + `Vendor_Summaries.txt` |
| Write newsletter | `Stage 4` + `MDS_Tone_Summaries.txt` + visuals |
| Write YouTube script | `Stage 3` + `MDS_Voice_&_Tone.txt` + `MDS_Tone_Summaries.txt` |
| Adapt phrasing to match tone | Always check against `MDS_Voice_&_Tone.txt` |
| Strengthen hook/CTA pacing | Reference `Vendor_Summaries.txt` |
| Deep dive into platform tactics | (Only when needed) use `Vendor_Raw_Guides.txt`

---

## AI / TEAM WORKFLOW

This system supports both AI-assisted prompting and team handoff.

**If using ChatGPT or another LLM:**
• Upload `MDS_ContentOS.md`, `MDS_Voice_&_Tone.txt`, and `MDS_Tone_Summaries.txt`  
• Add `Vendor_Summaries.txt` only when working on short-form content  
• Use `Vendor_Raw_Guides.txt` only when deep structure or pacing examples are needed  
• Final script outputs must always be reviewed against `MDS_Voice_&_Tone.txt`

**If using a human teammate:**
• Share this Manifest and SOP file on first use  
• Walk through one critique using `Stage 1 → Stage 2` for onboarding  
• Encourage questions about phrasing, clarity, or pacing  
• Invite improvements and voice alignment feedback

---

## VERSIONING & CONTROL

All system components live in a centralized folder. For any updates:
• Version the voice doc (e.g. `v1.2`, `v1.3`)  
• Keep summaries cleanly separated from raw files  
• Raw files (`MDS_Raw_Content.txt`) should not be deleted—they serve as historical reference  
• Add future stages (e.g. podcast, case study, launch pages) only after testing and documenting

System last audited: [Friday, May 30, 2025]
