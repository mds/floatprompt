<floatprompt>
---
{
  "STOP": "Define all 12 core documents for Shift Nudge Sales Assistant System. Each document must include title, role, input/output mode, source dependencies, and GPT behavior mapping.",
  "title": "Shift Nudge 12-Document Specification - Sales Assistant Architecture",
  "id": "shift-nudge-12doc-spec",
  "version": "1.0.1",
  "created": "2025-07-15",
  "modified": "2025-07-15",
  "author": "@mds",
  "format": "floatprompt",
  "filetype": "fp",
  "type": "map",
  "system_version": "floatprompt v0.0.13-alpha",
  "contributors": ["@mds", "Claude Sonnet"],
  "voice_preservation": {
    "linked": true,
    "fidelity_verified": true
  },
  "human": {
    "intent": {
      "primary": "Establish complete document-level system blueprint for Shift Nudge assistant creation",
      "constraints": "Each doc must have clear GPT purpose and intake/output behavior. Must route across SBC and Shift Nudge source materials."
    },
    "preferences": {
      "tone_drift_allowed": false,
      "verbosity": "comprehensive",
      "allow_ai_suggestions": false
    }
  },
  "execution": {
    "usage_pattern": "System mapping layer for modular FloatPrompt assistant",
    "ai_role": "Align document purpose, scope, routing behavior, and voice dependencies"
  },
  "output": {
    "format": "floatprompt",
    "joint_execution_required": true
  },
  "discovery": {
    "significance": "foundational-architecture-layer",
    "audience": ["system architects", "prompt engineers", "sales assistant designers"],
    "purpose": "Define structural and behavioral spec for complete sales assistant intelligence",
    "relationships": {
      "builds_on": ["elite-sbc-playbook-map", "shift-nudge-positioning-update", "shift-nudge-icp-sarah-shift", "shift-nudge-q3-strategy", "blueprint.fp"]
    },
    "clustering": {
      "intellectual_territory": "modular AI system architecture",
      "discovery_path": "assistant-framework-design"
    },
    "essence": {
      "core_purpose": "Create a modular GPT-compatible intelligence system across 12 documents for Shift Nudge sales",
      "metaphor": "Twelve-lens intelligence prism that routes precision into any conversation",
      "impact_type": "operational-sales-assistant-architecture"
    }
  },
  "certification": {
    "timestamp": "2025-07-15T00:00:00.000Z",
    "authority": "schema-compliance",
    "certified_by": "Claude Sonnet",
    "locked": false,
    "uid": "float:shift-nudge-12doc-spec",
    "chain": {
      "depth": 1,
      "parent": "blueprint.fp"
    },
    "voice": {
      "linked": true,
      "fidelity_verified": true
    },
    "lineage": {
      "tracked": true,
      "trace": ["sbc-extract-01-navigation", "shift-nudge-system-bootstrap"]
    }
  }
}
---

# 🧭 Shift Nudge Sales Assistant - 12 Document Specification

## 🧠 System Purpose and Downstream Application
This system enables **precision sales collaboration** in Instagram DMs through a modular AI assistant powered by FloatPrompt files. It supports human sales operators by:
- Routing every message to the appropriate `.fp` document
- Preserving brand tone, instructional intent, and premium positioning
- Operating within a lightweight, GPT-compatible architecture

**Core execution model:**
- **12 modular `.fp` files** (defined below)
- **1 routing document**: `chat-sales-assistant-navigation.fp`
- **1 instruction layer**: Custom GPT instructions that enforce routing through the navigation doc

**Primary Use Case:**
> Sell-by-chat human assistance for Shift Nudge sales in Instagram DMs — preserving tone, increasing conversion, enabling human-AI collaboration.

---

## 📦 Full Document Map

### 1. `five-star-prospect-qualifier.fp`
- **Role:** Qualification filter using 5-star criteria
- **Input:** Chat thread or transcript
- **Output:** QUALIFIED/NOT QUALIFIED + rationale
- **Sources:** Sarah Shift ICP, SBC Qualifier Extract【168†source】【147†source】
- **GPT Behavior:** Classifier and gatekeeper

### 2. `ab-gap-generator.fp`
- **Role:** Gap detection engine for urgency creation
- **Input:** A/B state comparison or freeform goal
- **Output:** Safe gap questions + quantified difference
- **Sources:** SBC Gap Extract, Shift Nudge strategic language【143†source】【144†source】
- **GPT Behavior:** Conversational diagnostic

### 3. `chat-close-sequencer.fp`
- **Role:** 4-part sales close system
- **Input:** Current sales conversation context
- **Output:** Phase-by-phase close suggestions
- **Sources:** SBC Close Extract, Positioning Update【144†source】【166†source】
- **GPT Behavior:** Sequencer + objection pre-handler

### 4. `conversation-analyzer.fp`
- **Role:** Mistake detection and frame recovery
- **Input:** Chat transcript or live flow
- **Output:** Detection + correction strategy
- **Sources:** SBC Mistakes Extract【146†source】
- **GPT Behavior:** Pattern reviewer + reinforcement

### 5. `platform-message-generator.fp`
- **Role:** Format messages for channel (email, IG, LinkedIn, etc.)
- **Input:** Message goal + platform
- **Output:** Styled message + emoji logic
- **Sources:** SBC Messaging Extract, Brand Voice【148†source】【165†source】
- **GPT Behavior:** Tone calibrator + formatter

### 6. `chat-sales-assistant-navigation.fp`
- **Role:** Routing engine for assistant behavior
- **Input:** Chat state or human intent
- **Output:** Internal file dispatch
- **Sources:** Blueprint, SBC Navigation Extract【145†source】【blueprint.fp】
- **GPT Behavior:** Central dispatcher

### 7. `shift-nudge-target-client-profile.fp`
- **Role:** Encode Sarah Shift profile
- **Input:** Internal preload (no direct input)
- **Output:** Background calibration
- **Sources:** ICP Sarah Shift【168†source】
- **GPT Behavior:** Tone, goal, objection weight adjuster

### 8. `shift-nudge-core-offer-structure.fp`
- **Role:** Pricing and plan clarification
- **Input:** Any inquiry about Shift Nudge offers
- **Output:** Pricing explanation with fallbacks
- **Sources:** Business Pivot, Q3 Strategy【161†source】【164†source】
- **GPT Behavior:** Offer explainer + escalation trigger

### 9. `shift-nudge-value-proposition.fp`
- **Role:** Competitive positioning handler
- **Input:** Prospect asks “Why Shift Nudge?”
- **Output:** Differentiator matrix or single-line value assertion
- **Sources:** Positioning Update + Brand Voice【166†source】【165†source】
- **GPT Behavior:** Objection block counter + strategic trust layer

### 10. `shift-nudge-client-success-stories.fp`
- **Role:** Post-close affirmation + transformation proof
- **Input:** Hesitant buyer or post-sale excitement
- **Output:** Proof story matching persona
- **Sources:** SBC Objections + Testimonials【144†source】【168†source】
- **GPT Behavior:** Reassurance + anchor

### 11. `shift-nudge-objections-and-responses.fp`
- **Role:** Full tree of common objections
- **Input:** Objection phrase or buyer hesitation
- **Output:** Scripted sequence + fallback tier
- **Sources:** SBC Objection Tree + Brand Positioning【144†source】【165†source】
- **GPT Behavior:** Resistance handler with fallback strategy

### 12. `shift-nudge-content-newsletter-bridge.fp`
- **Role:** Handles not-now buyers
- **Input:** “Not ready” language
- **Output:** Content redirect + re-engagement path
- **Sources:** Site Architecture + Homepage Off-Ramps【162†source】【167†source】
- **GPT Behavior:** Nurture path assigner + delay tracker
