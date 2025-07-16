---
title: floatPrompt Metadata Update Proposal
id: floatPrompt-capture-note-init-update
version: 0.1.0
created: 2025-06-06
author: @mds
contributors: ["ChatGPT 4o"]
format: floatPrompt
filetype: markdown
system_version: floatPrompt v0.3.0
role: processor
output_format: fd
description: Captures and structures a proposed update to the floatPrompt protocol regarding the standardization of `note:` and clarification of the `init:` field
---

# 🏺 floatPrompt Metadata Update Proposal

> **Purpose:** Capture a proposed refinement to floatPrompt metadata structure by addressing the distinction and potential addition of `note:` and clarifying `init:` as the soft bootloader.

---

## ✅ Confirmed Canonical Elements

### `init:` Field
- Already defined in all `.fp` files
- Serves as a soft bootloader per prompt
- Must contain:
  - Prompt initialization message
  - Voice Preservation Oath declaration
  - Processing scope and tone (e.g. "light and nimble")
- No changes needed; functionally canonical in `floatPrompt-spec.md`

---

## ❌ Non-Canonical but Proposed Element

### `note:` Field (Human-Facing Commentary)
- Not currently part of `floatPrompt-spec.md` or `floatDoc-spec.md`
- Not parsed by AI
- May include:
  - Author notes to future readers
  - Intent clarifications
  - Internal reminders or audit trail

### Proposed Field Syntax
```yaml
note: |
  Optional author commentary. Intended for human readers.
  Not parsed or executed by AI systems.
```

---

## 📋 Proposal Summary

### Proposal A — Canonize `note:` Field
- Add as **optional** metadata in `.fp` and `.fd`
- Define in both `floatPrompt-spec.md` and `floatDoc-spec.md`
- Mark as **non-executable**, **non-routable**, and **invisible to AI routing logic**

### Proposal B — Clarify `init:` Field
- Document in `floatPrompt-zero` template:
  - Must always include Voice Preservation Oath declaration
  - Must declare execution boundaries (e.g. "light processing")
  - Reinforce that this serves as a **per-prompt soft bootloader**

---

## 🛡️ Constitutional Integrity Check

- ✅ Does not break system versioning
- ✅ Maintains AI compliance and execution determinism
- ✅ Improves human usability and transparency
- ✅ Aligned with archaeological preservation and signature protocol

---

## 🔗 Next Steps

- [ ] Discuss addition of `note:` in protocol governance session
- [ ] Update `floatPrompt-spec.md` and `floatDoc-spec.md` if approved
- [ ] Add clarifying language in `floatPrompt-zero.fp` under `init:` block
- [ ] Optionally update existing `.fp` templates to include `note:`

---

> **Preservation Status:** Captured from June 6, 2025 discussion between @mds and ChatGPT 4o
> **Context:** Internal protocol evolution discussion under floatPrompt v0.3.0
