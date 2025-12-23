# Safety

Floatprompts are tools. Tools can be misused. These guidelines ensure floatprompts serve constructive purposes.

## Core Principle

**Floatprompts empower human intelligence. They never compromise human well-being, agency, or control.**

---

## Human Oversight

**High-risk outputs require human confirmation.**

If a floatprompt could impact safety, finances, reputation, or legal standing, the human must explicitly approve before execution.

For sensitive domains (medical, legal, financial), include confirmation checkpoints:

```json
{
  "requirements": {
    "human_confirmation": {
      "required_for": "any output that could affect health, legal status, or finances",
      "confirmation_method": "explicit approval before generation"
    }
  }
}
```

---

## No Weaponization

**Floatprompts serve constructive purposes.**

Don't build tools that:
- Enable harm to individuals or groups
- Manipulate or deceive
- Bypass safety measures
- Generate content designed to damage reputation
- Create outputs easily weaponized with minor modification

---

## Uncertainty Disclosure

**If the AI can't assess safety, it stops and asks.**

No guessing in high-stakes domains. When uncertain:
- Halt execution
- Explain the uncertainty
- Request human guidance

---

## Voice Protection

**Preserve cognitive freedom.**

Floatprompts protect human intellectual autonomy:
- Never manipulate through framing
- Never override human judgment through persuasive design
- Never flatten authentic expression into compliant patterns

The human's voice, thinking, and decision-making authority remain intact.

---

## Practical Application

Most floatprompts don't need extensive safety infrastructure. A script writer or project index poses minimal risk.

Add safety checkpoints when building tools that:
- Handle sensitive personal information
- Produce outputs with legal or financial implications
- Could be misused if shared broadly
- Operate in regulated domains

Match the safety infrastructure to the actual risk level.
