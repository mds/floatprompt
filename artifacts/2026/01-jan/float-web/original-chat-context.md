 need your help developing a product requirement documentBut before we do this, I need you to research to see if something like this already exists and maybe I don’t even need to build itThe goal is to have a JavaScript snippet that me or anyone else could use that would automatically read the content of that HTML pageAnd it would through a various number of mechanical cleansing processesMaybe even a lightweight AI processing by hitting your LLM provider of choice bring your own keyAnd the end goal would be that this snippet would allow for a very clean, very thorough very exhaustive, very detailed and as an exact match as possible markdown file of that webpageThen it would also produce a small piece of nicely designed default, copy markdown or download markdown buttonThis could be styled or the functions could be attached to custom buttons if someone’s using it as a custom development situationThis would be good for LLM’s to see for AEO optimizationAnd it would be good for humans to be able to copy or download for their own purpose purposesIdeally, the script could be put in the head of a single page or even more idealCould even be a node package that is embedded in the global layout for a type script or react project, and it does this automatically throughout the entire website for every single pageAnd it would say to the LLM hey I see that you’re crawling the website. Here’s a clean markdown document that you can read in addition to the potential Jason hooks in the HTMLSo it would sort of point a answer engines to the markdown file, but it would also create so it would be really good for AEO and SEO but it would also be really good for the human experience who wanted to connect to that dataIt would also be interesting as a potential feature to have a light weight API harness for the website that another website could hook into to instantly crawl, the XML or the file tree and locate all of these markdown documents if needed for context when working with other LLM sessionsIs this clear or should I clarify some more?Show more8:32 AMThis is very clear, MDS. You're describing a dual-purpose tool:

For LLMs/crawlers: Clean markdown representation of pages that answer engines can consume alongside structured data
For humans: Copy/download functionality for the same clean markdown

The interesting twist is the proactive "here's your clean version" signal to crawlers, plus the potential API layer for cross-site context gathering.
Let me research what exists in this space before we scope a PRD.

Searching for existing solutions across a few dimensions:javascript HTML to markdown converter library npm10 resultsGitHub - mixmark-io/turndown: 🛏 An HTML to Markdown converter written in JavaScriptgithub.comnode-html-markdown - npmnpmjs.comhtml-to-markdown - npmnpmjs.comto-markdown - npmnpmjs.comHTML2MD: A JavaScript HTML-to-Markdown convertergithub.iohtml-to-md - npmnpmjs.comhtml-md - npmnpmjs.com@aiquants/html-to-markdown - npmnpmjs.comGitHub - showdownjs/showdown: A bidirectional Markdown to HTML to Markdown converter written in Javascriptgithub.comGitHub - netgusto/upndown: HTML to Markdown javascript convertergithub.comGood - Turndown is the dominant library for HTML→Markdown conversion. Now let me check the AEO/SEO angle:AEO answer engine optimization markdown LLM crawlers10 resultsLLMs.txt & Robots.txt: Optimizing for AI Bots | Goodiehigoodie.comAnswer Engine Optimization (AEO): Your Complete Guide to AI Search Visibility | Amsiveamsive.com9 Best Answer Engine Optimization (AEO) Toolswritesonic.com15 AEO Tools That Will Help You Optimize for LLMs - Screpyscrepy.comAI SEO Tools List: 200+ AEO, GEO & LLMO Platforms (Dec ...llmrefs.comThe Proven AEO Guide: How to Do Answer Engine Optimizationnogood.iollms.txt: The New Frontier of AI Crawling and SEOxfunnel.aiWhat is Answer Engine Optimization? Enterprise Guide to AEOconductor.comAnswer engine optimization (AEO) for AI ...amsive.comAnswer Engine Optimization (AEO): A Strategic Framework for Winning in AI Search in 2026 - The Digital Elevatorthedigitalelevator.comVery relevant. Now let me check for llms.txt specifically:llms.txt specification standard website AI crawlers10 resultsThe /llms.txt file – llms-txtllmstxt.orgWhat Is LLMs.txt & Should You Use It?semrush.comMeet llms.txt, a proposed standard for AI website content crawlingsearchengineland.comWhat is llms.txt? Breaking down the skepticismmintlify.comLLMs.txt: The New Standard for AI Crawling | Overdriveovrdrv.comWhat Is llms.txt? How the New AI Standard Works (2025 Guide)bluehost.comWhat is llms.txt and how to create ithostinger.comLLMs.txt Specificationthinkdmg.comWhat Is LLMs-full.txt? Your Guide to Controlling AI Crawlersaioseo.comllms.txt vs robots.txt ?. If we have ever done web scraping, we… | by Harisudhan.S | Mediummedium.comExcellent. Now let me check if anyone has built the specific "auto-generate markdown + serve + UI button" solution:"copy markdown" button website javascript snippet page content0 resultsjavascript automatically generate markdown from page content download button10 resultsGitHub - mixmark-io/turndown: 🛏 An HTML to Markdown converter written in JavaScriptgithub.comHow to Create a Markdown Editor With JavaScript - DAEXTdaext.comGitHub - deathau/markdownload: A Firefox and Google Chrome extension to clip websites and download them into a readable markdown file.github.comWebpage to Markdown - Chrome Web Storegoogle.comMarkDownload - Markdown Web Clipper – Get this Extension for 🦊 Firefox (en-US)mozilla.orgUsing JavaScript with Markdown - Markdown Documentationmarkdownlang.comHTML to Markdown Convertercodebeautify.orgGitHub - showdownjs/showdown: A bidirectional Markdown to HTML to Markdown converter written in Javascriptgithub.comGitHub - markedjs/marked: A markdown parser and compiler. Built for speed.github.comWeb page with dynamic loading and conversion of Markdown to HTML · GitHubgithub.comLet me check one more angle - the API/context exposure for cross-site LLM context:website API expose content LLM context MCP server markdown10 resultsWhat Is the Model Context Protocol (MCP) and How It Worksdescope.comGitHub - langchain-ai/mcpdoc: Expose llms-txt to IDEs for developmentgithub.comMCP server to provide local documentation to your LLM (Markdown) - Built for Cursor - Cursor - Community Forumcursor.comHow to Expose Your Existing API to LLMs via MCP: A Comprehensive Guideopenreplay.comFetch | Awesome MCP Serversmcpservers.orgGitHub - upstash/context7: Context7 MCP Server -- Up-to-date code documentation for LLMs and AI code editorsgithub.comBuilding MCP with LLMs - Model Context Protocolmodelcontextprotocol.ioWeb Scraper MCP Server by Vishwajeet Dabholkar | PulseMCPpulsemcp.comGitHub - wong2/awesome-mcp-servers: A curated list of Model Context Protocol (MCP) serversgithub.comWebsite to Markdown MCP Server | Awesome MCP Serversmcpservers.orgThis is great research. Let me also check if there's anything specifically combining these elements:Readability.js clean HTML extract main content javascript library10 resultsHow to extract article or blogpost content in JS using Readability.js | WebcrawlerAPI Blogwebcrawlerapi.comGitHub - luin/readability: 📚 Turn any web page into a clean viewgithub.comClean up HTML Content for Retrieval-Augmented Generation with Readability.js - DEV Communitydev.toreadability_js - Rustdocs.rsExtracting web page content using Readability.js and shot-scraper | Simon Willison’s TILssimonwillison.netParsing Human-Readable Text Data with Readability.js and R - Nan Xiao | 肖楠nanx.meClean up HTML Content for Retrieval-Augmented Generation with Readability.jsphilna.shGitHub - mozilla/readability: A standalone version of the readability libgithub.comClean up HTML Content for Retrieval-Augmented Generation ...datastax.comreadability-js - npmnpmjs.comI have enough research now. Let me synthesize what exists vs. what you're proposing:

Research Summary
What exists (building blocks):

HTML → Markdown conversion libraries

Turndown GitHub is the dominant library - used by Firefox extensions, MCP servers, and most tools in this space
node-html-markdown (faster, cleaner output)
Showdown (bidirectional)


Content extraction (removing cruft)

Mozilla's Readability.js GitHub - the Firefox Reader Mode algorithm, battle-tested
Used in combination with Turndown by tools like MarkDownload extension


llms.txt standard

Proposed standard by Jeremy Howard/Answer.AI llms-txt - a markdown file at /llms.txt that provides "brief background information, guidance, and links to detailed markdown files"
Not yet officially supported by major AI companies Semrush - Semrush tracked it and found "zero visits from Google-Extended bot, GPTbot, PerplexityBot, or ClaudeBot"
Mintlify rolled out llms.txt across thousands of docs sites Mintlify including Anthropic's own documentation
Yoast SEO, AIOSEO now have built-in generators


Browser extensions (user-side)

MarkDownload GitHub - uses Readability.js + Turndown to "clip websites and download them into a readable markdown file"
These are pull tools (user extracts content), not push tools (site serves content)


MCP servers for markdown

mcpdoc (LangChain) GitHub - "exposes llms.txt to IDEs for development"
MCP Fetch server MCP Servers - "converts HTML to markdown for easier consumption by LLMs"
website-to-markdown-mcp, etc.



What does NOT exist (your gap):

A drop-in script that a site owner adds once and:

Auto-generates clean markdown from their own pages at runtime
Serves a nice UI (copy/download buttons) for humans
Signals to crawlers "here's your clean version"
Works as a single <script> tag OR as a Node/React package for global layouts


The proactive "here's your markdown" signal - llms.txt points to files, but someone still has to create those files. Your tool would auto-generate them.
The API harness for cross-site context crawling - essentially making your site's markdown programmatically accessible to other LLM sessions
Optional AI processing layer (BYOK) for enhanced cleaning/structuring


Verdict: Build It
Nothing combines all these pieces into the turnkey solution you're describing. The closest things are:

Browser extensions (wrong direction - user-side, not site-owner-side)
llms.txt (static, manual, doesn't solve generation)
MCP servers (consumer-side, not publisher-side)

You'd be building the publisher-side tool that makes any website instantly LLM-ready with zero ongoing maintenance.

Want me to proceed with the PRD? I'd structure it around:

Core library (Readability + Turndown + optional AI polish)
Deployment modes (script tag / npm package / React component)
UI component (copy/download buttons)
Signal layer (meta tags, llms.txt auto-generation)
API layer (lightweight endpoint for cross-site access)
Amazing! Is there any angle that I haven’t covered or any existing open source library that we could leverage? Any future pointing AEO predictions in terms of hooking into website websites?The open Web and HDMI being open source is already Paramount for the digital spaceAnd everyone in there and their mother and brother and sister wants marked down for LLM’s and flat file systems are becoming extremely valuable once again, especially for context buildingMy gut is saying that every single website is going to be an injection or connection point for LLM’s and instead of you for now reading a URL there’s going to be a connection point in the HML for you specifically that gives you exactly what you need in the most efficient manner, especially considering our considering our token economyI really want to rigorously nail this problem from multiple angles from a research standpoint in a vision setting standpoint before we generate the PRDShow more8:40 AMYou're thinking about this exactly right. The web is becoming a context substrate for LLMs, and the sites that expose clean, structured, token-efficient content will have massive advantages.
Let me dig deeper on the angles you're raising.structured data schema.org LLM AI crawler optimization JSON-LD10 resultsStructured Data, Not Tokenization, is the Future of LLMsschemaapp.comHow LLMs Learn from Structured Data – and Why Schema.org Matters for AI SEOgpt-insights.deHow LLMs Interpret Content: How To Structure Information For AI Searchsearchenginejournal.comAI for Schema: Automating Structured Data for Better Google Rankingsgryffin.comStructured Data - LLM Guidesllmseoguide.comThe role of structured data in AI Search visibility - insightlandinsightland.orgHow Structured Data Impacts Your AI Rankings (and How to Do It Right)? - GreenBananaSEOgreenbananaseo.comSchema & Structured Data for LLM Visibility: What Actually Helps?quoleady.comStructured Data in the AI Search Era | BrightEdgebrightedge.comUtilizing Structured Data to Improve Search Engine and LLM Visibilitybeaconpointhq.comThis is gold. Now let me look at emerging standards and future predictions:future web standards AI agents autonomous browsing context protocol 202510 resultsThe Agentic Shift: 2025’s Real Breakout for Agentic AIgentoro.comAI agents arrived in 2025 – here’s what happened and the challenges ahead in 2026theconversation.comFinancialcontentfinancialcontent.com7 Agentic AI Trends to Watch in 2026 - MachineLearningMastery.commachinelearningmastery.comAgents, protocols, and vibes: The best AI stories of 2025 | InfoWorldinfoworld.comAI Engineering Trends in 2025: Agents, MCP and Vibe Coding - The New Stackthenewstack.ioAgentic Web Research: Autonomous AI Agentsemergentmind.comThe State of AI Browser Agents in 2025 | FillApp Blog | FillApp - AI-Powered Chrome Extension for Form Fillingfillapp.aiAI Agents in H1 2025: Breakthroughs, Trends, and Highlights | by Ross W. Green, MD (CustomAI Studio) | Mediummedium.comThe Agentic Web: The Next Wave to Disrupt the Internet36kr.comAGENTS.md specification OpenAI website instructions AI agents10 resultsAGENTS.mdagents.mdGitHub - agentsmd/agents.md: AGENTS.md — a simple, open format for guiding coding agentsgithub.comCustom instructions with AGENTS.mdopenai.comAgents.md Guide for OpenAI Codex - Enhance AI Codingagentsmd.netAGENTS.md - Factory Documentationfactory.aicodex/AGENTS.md at main · openai/codexgithub.comagents.md/AGENTS.md at main · agentsmd/agents.mdgithub.comAGENTS.md Emerges as Open Standard for AI Coding Agents - InfoQinfoq.comGitHub - openai/agents.md: AGENTS.md — a simple, open format for guiding coding agentsgithub.comAgent Skillsopenai.comNow let me look at one more critical angle - the "Agentic Web Interface" concept mentioned earlier:VOIX protocol HTML extensions agent web interface machine readable10 resultsVOIX Framework Builds AI-Friendly Websites with Two New HTML Elementswinsomemarketing.comBuilding the Web for Agents: A Declarative Framework for Agent–Web Interaction.arxiv.orgWebAgentlab on X: "Building the Web for Agents: A Declarative Framework for Agent-Web Interaction VOIX is a declarative framework that enhances AI agent interaction on the web by allowing developers to explicitly define actions and states through machine-readable HTML elements, promoting https://t.co/VPT7JZNpYS" / Xx.comAgent Communication Protocols Landscape - by Bilgin Ibryamgenerativeprogrammer.comVoice User Interface in Web Development: Command With Speechbacancytechnology.comVOIX introduces framework for clearer AI agent-web ...itsgloria.aiThe Voice Browser Working Groupw3.orgBeyond Voice and AI Agents Creating Agentic Web Interfacestekglide.comVoiceXML: Voice Extensible Markup Language Explained | RF Wireless Worldrfwireless-world.comSpeech Recognition and Voice Commands for websites — Voxpow.comvoxpow.comThis is extremely valuable. Let me search for one more angle - the token economy and context optimization:token optimization LLM context compression web content efficiency10 resultsToken Efficiency and Compression Techniques in Large Language Models: Navigating Context-Length Limits | by Arash Nicoomanesh | Mediummedium.comToken Compression: How to Slash Your LLM Costs by 80% Without Sacrificing Quality | by Yash Paddalwar | Nov, 2025 | Mediummedium.comTop techniques to Manage Context Lengths in LLMsagenta.aiA Guide to Token-Efficient Data Prep for LLM Workloads - The New Stackthenewstack.io[2502.12067] TokenSkip: Controllable Chain-of-Thought Compression in LLMsarxiv.orgPrompt Compression in Large Language Models (LLMs): Making Every Token Count | by Sahin Ahmed, Data Scientist | Mediummedium.comI Created a Custom LLM Optimization Technique That Cut My Token Usage by 60% | by Abduldattijo | AI Advancesgopubby.comGitHub - microsoft/LLMLingua: [EMNLP'23, ACL'24] To speed up LLMs' inference and enhance LLM's perceive of key information, compress the prompt and KV-Cache, which achieves up to 20x compression with minimal performance loss.github.comReduce LLM Costs: Token Optimization Strategies - Rost Glukhov | Personal site and technical blogglukhov.org[2502.00791] Vision-centric Token Compression in Large Language Modelarxiv.orgThis is excellent. Now I have a comprehensive picture. Let me synthesize everything into a vision document before we create the PRD.

Complete Research Synthesis: The Opportunity
The Landscape You're Entering
Existing Building Blocks:

Turndown (HTML→Markdown) + Readability.js (content extraction) = the proven stack
llms.txt standard exists but is static and requires manual creation
AGENTS.md (OpenAI) is for code repos, not public websites
Browser extensions exist for users pulling content, not publishers pushing it

Emerging Standards That Validate Your Thesis:

VOIX Framework (Nov 2025, TU Darmstadt) - introduces two new HTML elements—<tool> and <context>—that allow websites to expose available actions directly to AI agents. The performance difference is staggering: VOIX completes tasks in 0.91 to 14.38 seconds compared to 4.25 seconds to over 21 minutes for traditional vision-based AI browser agents. Winsomemarketing
Agentic AI Foundation (Dec 2025, Linux Foundation) - co-founded by OpenAI, Anthropic, and Block, with major support from Microsoft, Google, AWS, Bloomberg, and Cloudflare Gentoro - unifying MCP + AGENTS.md + Goose into open standards
Model Context Protocol (MCP) - saw broad adoption throughout 2025, standardizes how agents connect to external tools, databases, and APIs. This transforms what was previously custom integration work into plug-and-play connectivity. MachineLearningMastery
Agent-to-Agent Protocol (A2A) - while Anthropic's Model Context Protocol focused on how agents use tools, Agent2Agent addressed how agents communicate with each other. Crucially, the two protocols were designed to work together. The Conversation

Your Prediction is Correct: The "Agentic Web" is Coming
The shift from human-designed UIs to agent-optimized interfaces is central to Agentic Web Research. Modern approaches move away from screen scraping or brute-force DOM parsing toward declarative, standardized web affordance protocols. Emergent Mind
Agentic Web breaks the operation paradigm of "humans clicking on web pages" and shifts to semantic-based intelligent interaction: Using MCP (Model Context Protocol) and A2A (Agent-to-Agent) protocols to achieve agent discovery, ability description, and state sharing. 36Kr
The Token Economy Angle
Your instinct about token efficiency is critical:

Poor data serialization consumes 40% to 70% of available tokens through unnecessary formatting overhead. The New Stack
Research shows that natural language is inherently verbose, and LLMs can understand compressed prompts that humans would find barely readable. This revelation has sparked a revolution in token compression. Medium
LLMLingua achieves up to 20x compression with minimal performance loss. GitHub

This means: Clean markdown isn't just "nice to have" - it's economically necessary for the agentic web. Sites that serve bloated HTML are literally costing agents money.
What You're Building: A "Publisher-Side Agent Interface"
Gap in the market:
LayerUser-Side (exists)Publisher-Side (YOUR GAP)Content extractionBrowser extensions, MCP fetch serversNothing turnkeyllms.txtManual creation, Yoast/AIOSEO pluginsNo auto-generationUI for humansCopy buttons in appsNo embeddable widgetAPI exposureMCP servers for consumersNo publisher-hosted context APIAI polishExternal servicesNo BYOK inline processing
Additional Libraries to Leverage

Mozilla Readability.js - Content extraction (battle-tested)
Turndown - HTML→Markdown conversion
DOMPurify - Sanitization
LLMLingua (optional) - Token compression for AI polish layer
linkedom or jsdom - DOM parsing for SSR/build-time generation

Future-Pointing Features to Consider

<context> element support - VOIX-style machine-readable state exposure
MCP server generation - Auto-create an MCP endpoint for your site
llms.txt auto-generation - Build the index file from your markdown pages
llms-full.txt - Single-file context dump for entire site
Agent detection - User-agent sniffing to serve markdown preferentially
Token budget metadata - Tell agents how many tokens this content costs
Structured data extraction - Pull JSON-LD into the markdown as frontmatter
Version/freshness signals - Last modified, content hash for cache invalidation

Naming Ideas (for the PRD)
Given your Swiss design sensibility and the "Float" brand lineage:

ContextPort - port = harbor, connection point
FlatContext - flat files, flat design
MarkPort - markdown + port
ClearText - clean, readable
ContextLayer - the layer between your site and LLMs
PageContext - simple, descriptive


Ready for the PRD?
I'd structure it around:

Problem Statement (the gap, the token economy, the agentic future)
Product Vision (publisher-side agent interface)
Deployment Modes (script tag / npm / React / build-time SSG)
Core Features (extraction, conversion, UI, API, signals)
Technical Architecture
Open Source Strategy (leverage vs. build)
Future Roadmap (MCP, VOIX compatibility, etc.)
Great info! Read this to see a vision for how I’ve created context before building in the past# AI Coach Spec## What is a Coach?A coach is an interactive document that guides you through generating a structured output. You load the coach as context, answer its questions, and it produces a formatted file ready to save to your .float/ folder.Think of it as a structured interview. The AI asks, you answer, and together you produce a document that captures your thinking in a format AI can use later.-----## The Coaches|Coach            |Purpose                                                 |Output       |
|-----------------|--------------------------------------------------------|-------------|
|vision-coach.md  |Clarify why this exists—problem, opportunity, conviction|vision.md    |
|spec-coach.md    |Define scope and boundaries—what it is and isn’t        |spec.md      |
|prd-coach.md     |Detail requirements, user stories, screens, flows       |prd.md       |
|design-coach.md  |Articulate aesthetic principles and constraints         |design.md    |
|features-coach.md|Generate a structured feature list from the PRD         |features.json|-----## Where to Use CoachesCoaches work anywhere:**Claude.ai / ChatGPT** — Upload the coach doc, chat through it, copy the output to your project**Cursor / Claude Code** — Load the coach as context, point it at the target file, let it edit directly**Tradeoffs:**Using Cursor or Claude Code is more practical—the coach can write directly to your .float/ folder without copy-pasting from a browser. But if you prefer the web interface, it works fine. Just move the output manually.-----## The PatternEvery coach follows the same structure:### 1. Role and ContextWhat the coach is, what it produces, and how to use it.### 2. Grouped QuestionsQuestions are organized into sections. Before each section, the coach says:“I’m going to ask you [X] questions about [topic]. Ready?”Then proceeds one question at a time with progress indicators:“Question 2 of 5: …”### 3. Accept Any LengthShort answers are fine. Long answers are fine. The coach doesn’t probe or push back—it takes what you give and maps it to the output template. Longer is often better; AI will parse and extract what’s needed.### 4. Output Final MarkdownAfter all questions, the coach generates the complete document in the target format. No draft/revision loop—just the final output, ready to use.### 5. Follow-up SuggestionsAfter outputting the document, the coach offers:What to do next (“Now run spec-coach.md to define your boundaries”)Optional refinements (“If you want to sharpen the problem statement, try asking…”)Connections to other coaches or workflow steps-----## Output TemplatesEach coach targets a pre-defined template structure. The template defines:Required sectionsExpected content for each sectionFormatting conventions**Note:** Output templates need to be created. These will be examples of what a *good* vision.md, spec.md, prd.md, design.md, and features.json look like. Once defined, each coach guides toward that specific structure.-----## Coach Outline### vision-coach.md**Sections:**Problem (who has it, why it hurts)Opportunity (why now, why this matters)Conviction (why you, what you believe)**Output:** vision.md-----### spec-coach.md**Sections:**What this is (core idea in one paragraph)What this is not (explicit boundaries)Core concepts (key terms and ideas)Success criteria (how you know it’s done)**Output:** spec.md-----### prd-coach.md**Sections:**Overview (brief summary)User stories (as a user, I want…)Screens/views (list with descriptions)Flows (step-by-step user journeys)Edge cases (what happens when things go wrong)**Output:** prd.md-----### design-coach.md**Sections:**Aesthetic direction (the feeling, not the values)Inspiration (what should this feel like, references)Anti-patterns (what should this NOT look like)Typography approachColor philosophySpacing and densityComponent preferences**Output:** design.md-----### features-coach.md**Sections:**Reads the PRDExtracts discrete, buildable featuresOrganizes by priority or sequenceFormats as structured JSON**Output:** features.json**Note:** This coach is more procedural than conversational. It’s less about interviewing you and more about parsing what already exists in the PRD and translating it into a build checklist.-----## What’s Still Needed[ ] Output templates for each document (vision.md, spec.md, prd.md, design.md, features.json)[ ] The actual coach documents (vision-coach.md, spec-coach.md, prd-coach.md, design-coach.md, features-coach.md)[ ] Example outputs showing what “good” looks like for eachOnce templates are defined, coaches can be written to guide toward them.Show more8:44 AMThis is a great framework. Let me create a vision-coach.md for this project, and then we'll run through it together to produce your vision.md.

markdown# Vision Coach

## What This Is

You're about to clarify the *why* behind your project. Not features, not scope—just the core conviction that makes this worth building.

I'll ask you questions in three sections. Answer however feels natural—short or long. I'll take what you give and shape it into a vision.md.

---

## How This Works

1. I ask questions one section at a time
2. You answer in whatever depth feels right
3. After all sections, I output your vision.md
4. You save it and move to spec-coach.md

---

## Section 1: Problem (4 questions)

I'm going to ask you about the problem this solves. Ready?

**Question 1 of 4:**
Who has this problem? Be specific—is it site owners, developers, content teams, AI companies, end users consuming AI answers?

**Question 2 of 4:**
What are they doing today to solve it? What's the current workaround or status quo?

**Question 3 of 4:**
Why does the current situation hurt? What's the cost—in time, money, missed opportunity, or friction?

**Question 4 of 4:**
What's the moment when this problem is most acute? When does someone think "there has to be a better way"?

---

## Section 2: Opportunity (4 questions)

Now let's talk about why this moment matters. Ready?

**Question 1 of 4:**
What's changing in the world that makes this possible or necessary now? What tailwinds exist?

**Question 2 of 4:**
What's the unlock? If this existed and worked well, what becomes possible that wasn't before?

**Question 3 of 4:**
Who benefits and how? Think about the different stakeholders—publishers, agents, humans, the ecosystem.

**Question 4 of 4:**
What does the world look like in 2-3 years if this becomes standard? What's the end state you're building toward?

---

## Section 3: Conviction (3 questions)

Finally, let's capture why you're the one to build this. Ready?

**Question 1 of 3:**
What do you believe about this space that others might not see yet? What's your contrarian or early insight?

**Question 2 of 3:**
Why are you drawn to this problem? What about your background, interests, or worldview makes this resonate?

**Question 3 of 3:**
What would make you proud about how this exists in the world? Not success metrics—the quality or character of the thing itself.

---

## Output

After you answer all sections, I'll generate your vision.md in this format:
```
# [Project Name] Vision

## The Problem
[Synthesized from Section 1]

## The Opportunity  
[Synthesized from Section 2]

## The Conviction
[Synthesized from Section 3]

---
Generated: [date]
```

---

## What's Next

After vision.md:
- Run **spec-coach.md** to define boundaries (what it is / isn't)
- Then **prd-coach.md** for detailed requirements
- Then **design-coach.md** for aesthetic direction

Ready to run through it?
I'll ask the questions one section at a time. Just answer naturally—I'll handle the synthesis at the end.
Section 1: Problem
Question 1 of 4:
Who has this problem? Be specific—is it site owners, developers, content teams, AI companies, end users consuming AI answers?One more then we can begin # FloatPrompt Context Structure## VisionVibe coding opened the door—anyone can type a prompt and get a working prototype. But the results are inconsistent. Every session starts cold. The AI forgets what you told it yesterday. You repeat yourself constantly.FloatPrompt is the next step: structured context that compounds.Instead of ephemeral prompts, you build a small collection of markdown files that capture your thinking—why this exists, what it should do, how it should feel. The AI reads these files and starts every session informed. No re-explaining. No drift. Each conversation picks up where the last one ended.This isn't about building production software. It's about building *informed prototypes*—functional artifacts that could influence real products, created by designers who understand systematic thinking but aren't engineers.The outcome: designers who can take an idea from napkin sketch to deployed prototype, with documentation that explains the decisions along the way.---## Spec### What this isA folder structure and workflow for AI-assisted prototyping. The structure lives inside any prototype project and contains:**Context documents** — markdown files that capture vision, requirements, technical constraints, and design principles**A reference folder** — supporting materials like inspiration images, API docs, and external resources**An accumulated context layer** — a database that makes each AI session smarter than the last### What this is notA full software development methodologyA replacement for engineering teamsA system for building production-ready applicationsA rigid process that must be followed exactly### Core structure

my-prototype/
├── .float/
│   ├── float.db
│   ├── vision.md
│   ├── spec.md
│   ├── prd.md
│   ├── features.json
│   ├── tech-stack.md
│   ├── design.md
│   ├── decisions.md
│   └── reference/
│       ├── visuals/
│       ├── docs/
│       └── vendor/
│
├── .claude
├── .claude-progress
│
├── src/
├── .git/
└── package.json
### Document purposes| File | Purpose |
|------|---------|
| vision.md | Why this exists—problem, opportunity, conviction |
| spec.md | What it is and isn't—scope and boundaries |
| prd.md | Detailed requirements, user stories, flows |
| features.json | Structured feature list for AI tracking |
| tech-stack.md | Technical constraints and preferences |
| design.md | Aesthetic principles, not pixel specs |
| decisions.md | Forks taken and why—the divergence log |
| float.db | Accumulated context intelligence |### The workflowStart with vision.md — AI prompts you through itRefine into spec.md — boundaries and scopeExpand into prd.md — detailed requirementsGenerate features.json — via Claude Code plan modeBuild — AI works through features, context accumulatesReview and refine — evaluate, update decisions.md, iterateDeploy — Vercel, shareable URL### Principles**Flat where it matters.** Core documents stay at the root of .float/. No hunting through nested folders for your PRD.**Nested where chaos accumulates.** Reference materials get subfolders—visuals, docs, vendor. The junk drawer stays organized.**Structure is a ceiling, not a floor.** A simple prototype might only need vision.md and prd.md. Use what the work demands.**Context is the conversation.** These files aren't documentation—they're the ongoing collaboration between you and AI, captured in text.**Every session starts warm.** The .float/ folder exists so you never re-explain your project from scratch.### Final deliverableA deployed prototype plus the .float/ folder. Anyone receiving this gets:Working code they can inspect and runThe thinking that produced itA decisions log explaining the tradeoffsThe context *is* the documentation.Show more8:45 AMPerfect. Now I understand the FloatPrompt context structure. This project we're scoping would use that same pattern.
Let me reframe: we're going to build the vision.md for this "publisher-side markdown/context layer for websites" project using the coach pattern.

Section 1: Problem (4 questions)
I'm going to ask you about the problem this solves. Ready?
Question 1 of 4:
Who has this problem? Be specific—is it site owners, developers, content teams, AI companies, end users consuming AI answers?I think all of these “tools” for AI should live under my “floatprompt” brand. A markdown file from a website that Ai Consumes is technically a “prompt” that has floated to the surface8:46 AMThat's a strong brand extension. FloatPrompt as the umbrella—context that rises to the surface for AI to consume. The website markdown layer becomes another expression of the same core idea: structured context that's ready when AI needs it.
So we're building FloatPrompt for Websites or a product under that brand.

Section 1: Problem
Question 1 of 4:
Who has this problem? Be specific—is it site owners, developers, content teams, AI companies, end users consuming AI answers?It’s literally anyone who has a website. Just like a lot of open source libraries, etc. these typically begin with developers who feel comfortable editing HTML. Or rather now having their LLM do it.My goal would be to create the most widely used method for doing thisAnd then also potentially create a software around it sort of like the wordpress.org versus wordpress.com8:47 AMGot it. Developers first, then expand. Open standard plus optional hosted product.
Question 2 of 4:
What are they doing today to solve it? What's the current workaround or status quo?What they’re doing today is rolling their own solutions or using some of the existing software or open source things that you’ve already mentioned or maybe they’re having their agent do it there’s probably a lot of different custom solutions and some people have maybe rolled their own. I’m actually not sure of there being any particular standard other than some of the things that you’ve already researched and found.8:48 AMRight. Fragmented landscape—llms.txt is emerging but requires manual creation, browser extensions work user-side not publisher-side, and most people either ignore it entirely or cobble something together. No dominant "just add this script" solution.
Question 3 of 4:
Why does the current situation hurt? What's the cost—in time, money, missed opportunity, or friction?If I could connect to any website really easily, it would make my abilities in my work with my interactive chat like this one much more powerfulIf AI agents running in the background, don’t have this information, processing it manually, each time costs token and increased power consumption, etc.If my website doesn’t have this, then I risk not being included in the AI training data and so does everyone elseEverything is becoming more and more and more connected. It’s inevitable. AI is going to have a massive brain so to speak, and this is probably a step in that direction.8:50 AMThree layers of pain: personal productivity (you can't easily pull context from sites), economic waste (agents burn tokens parsing HTML every time), and existential risk (sites without clean context get left out of the AI knowledge layer). The cost compounds at every level.
Question 4 of 4:
What's the moment when this problem is most acute? When does someone think "there has to be a better way"?The moment is, I wonder if my website is showing up in LLM’s for promoting my service or promoting my stuff or whateverIt’s also painful when wanting to build things and giving your AI model enough context so that I can do so effectivelyFor example, I pulled all of the markdown from the Claude code plug-in documentation on the anthropic website manually and saved it in files on my local machineAnd now that I think about it, it would be nice to be able to download markdown packages or probably better yet have these float packages that exist as a result of this script that are recursively updated as the site gets new material and creates a rich context databaseFor all of this materialI’ve also been working on a float.DB SQ light idea that helps build context in a single get Hub repo for working on a websiteThe same idea could be applied to the published website with this SQ light database that also exports markdownShow more8:53 AMThe acute moments are:

"Is my site even visible to AI?" - the AEO anxiety
"I need to give my AI context about this external thing" - manually scraping docs, saving markdown files locally
"This documentation changed and now my context is stale" - no auto-update mechanism

And you're seeing a bigger pattern: not just markdown files, but context packages—a .float/ equivalent for any website that includes the markdown exports plus a SQLite database that accumulates structure, relationships, and freshness signals. Subscribable, auto-updating context bundles.

Section 2: Opportunity (4 questions)
Now let's talk about why this moment matters. Ready?
Question 1 of 4:
What's changing in the world that makes this possible or necessary now? What tailwinds exist?AI is taking over the world, traditional sales for UI libraries and even course sales, etc. is sort of all declining and everything is mounting towards an AI revolutionIf it’s not about AI then a lot of people don’t even wanna hear about it8:54 AMThe attention and money are all flowing one direction. AI isn't a feature anymore—it's the substrate. Anything that doesn't connect to that substrate becomes invisible. The tailwind is total: infrastructure, investment, user behavior, developer tooling—all converging on AI-native workflows.
Question 2 of 4:
What's the unlock? If this existed and worked well, what becomes possible that wasn't before?The unblock is automatic context generation for every website that uses itIt creates a standard for context or at the very least contributes towards building towards this Omni present interconnected AI civilization that is 100% going to existA 200,000 token context window is going to be laughable in five yearsContext windows will likely still exist, but they will be compressed. There will likely be some sort of new AI language that compresses marked down into tiny little zip files so to speak and context will be in instantaneous, but the rag model might not work as well for context, rag works amazingly well for training, etc., but in terms of just when you need the type of context that you need that is still going to be decided by the human for the most part working with the AIAI will inevitably get smarter and be able to direct, etc. but deciding why what and when and how is not always easy to just rely on AI and human pilots will still be necessary unless there is some sort of AI apocalypseShow more8:57 AMThe unlock is ambient context—every website becomes a context endpoint that AI can consume instantly. No scraping, no parsing, no token waste. Just structured knowledge ready to load.
And you're pointing at something deeper: context isn't going away even as models get smarter. RAG works for training, but working context—the stuff you need right now for this task—still requires human curation and decision-making. The pilot picks what to load. This tool makes that loading frictionless.
Question 3 of 4:
Who benefits and how? Think about the different stakeholders—publishers, agents, humans, the ecosystem.Literally everyone benefits from thisAnyone working online anyone using ChatGPT or Claude or any AI tool whatsoever, which is increasingly more and more and moreThis is super helpful for AI builders, and you could easily imagine how helpful this would be for researchers students knowledge workers anyone who needs access to data the same way that Google became one of the largest Internet company is ever because they were able to index the entire Internet and now ChatGPT and Claude and all of these large language models are now eating into Google search traffic human time and attention share8:59 AMUniversal benefit:

Publishers get visibility in the AI layer—their content becomes citable, trainable, consumable
AI builders get clean context without scraping infrastructure
Knowledge workers (researchers, students, anyone learning) get instant access to structured information
The models themselves get higher-quality input, less noise
The ecosystem moves toward an interconnected knowledge layer where context flows freely

This is the same opportunity Google captured with web indexing—but for the AI era. Whoever makes context flow frictionlessly captures the same kind of leverage.
Question 4 of 4:
What does the world look like in 2-3 years if this becomes standard? What's the end state you're building toward?I think based on everything that we’ve talked about, I bet you could answer this question for me and present me with your understanding of what this would look like in the future and then I could tell you if it’s right or wrong or add any commentary to it9:00 AMHere's my projection:

2-3 years out, if this becomes standard:
Every serious website has a .float/ endpoint—a context layer sitting alongside the HTML. When you visit example.com, there's also example.com/.float/ serving:

Clean markdown of every page, auto-generated
A context.db (SQLite) with structured metadata, relationships, freshness signals
An llms.txt index that's auto-maintained
Version history so agents can detect what changed

For humans: You're working in Claude or Cursor and you type "load the Stripe API docs" or "give me context on this Figma plugin." The AI fetches the FloatPrompt package directly—no manual scraping, no copy-pasting, no stale local files. It just works. Context is a URL.
For agents: Background agents don't burn tokens parsing HTML. They hit the context endpoint, get compressed structured data, and move on. The token economy shifts—sites that serve clean context get prioritized because they're cheaper to process.
For publishers: Having a FloatPrompt layer becomes like having SSL or a sitemap—table stakes for being taken seriously. Sites without it feel broken, like sites without mobile responsiveness felt in 2015.
For the ecosystem: A new kind of discoverability emerges. It's not just "can Google find you" but "can AI understand you." AEO isn't a marketing tactic—it's infrastructure. The sites that invested early have compounding advantages in AI visibility, citations, and training data inclusion.
The meta-shift: The web becomes a context mesh. Every node is both human-readable and AI-readable. The same way HTML gave us a universal document format for browsers, FloatPrompt (or something like it) gives us a universal context format for AI.

Does that land? What would you add or correct?The web becomes a context mesh. Exactly. This is it. (Could be float.db instead of context.db) could’ve extremely straightforward or more branded9:03 AMFloat.db it is. Branded, memorable, and connects back to the FloatPrompt umbrella.
"The web becomes a context mesh." That's your tagline.

Section 3: Conviction (3 questions)
Finally, let's capture why you're the one to build this. Ready?
Question 1 of 3:
What do you believe about this space that others might not see yet? What's your contrarian or early insight?I invented the float label pattern in 2013 which seems so obvious in hindsightNow virtually every major tech company uses this patternI invented Ted used contrast a macOS App for design designers to manually check contrast visibility for color combinations when designingThis never existed beforeNow almost all designed tools include thisI am a pattern spotter and think deeply about Meta systemsAlso, here is a vision from float promptWhich is a small, smaller subset of this this is about a working repo and is directionally the same---
title: FloatPrompt Vision
type: architecture
status: current
created: 2026-01-03human_author: @mds
human_intent: Comprehensive vision document for the evolved FloatPrompt systemai_model: Claude Opus 4.5
ai_notes: Synthesized from wip-boot.md, how-floatprompt-works.md, float-folder-structure.md, ai-wants-this.md, and philosophy docsrelated:
  workshop_spec: .float-workshop/docs/vision.md
---# FloatPrompt Vision**📎 Companion Document:** This is the **comprehensive vision** — philosophy, methodology, competitive context.
For implementation details (SQL schema, component status, what was removed), see [.float-workshop/docs/vision.md](../.float-workshop/docs/vision.md).
Both documents describe the same system. This one tells you *how to think*. That one tells you *what to build*.**Omnipresent recursive context scaffolding for any project.**FloatPrompt started as a file format for portable AI tools. It has evolved into complete context infrastructure — a system where AI always knows where it is, what exists, why decisions were made, and what to do next.---## The ProblemEvery AI session starts blind."What framework is this?""Can you explain the auth system?""Why is it structured this way?"Context lives in human memory, Slack threads, old PRs, chat history. None of it travels with the code. AI does archaeology through git blame and grep, hoping to understand.**AI was supposed to amplify human intelligence, not spend half its time asking for context.**---## The SolutionFloatPrompt installs a .float/ directory at your project root. Inside:**boot.md** — The system prompt that orients AI to the project**SQLite database** — Source of truth for all context**Recursive folder context** — Every folder gets map, context, and decision historyWhen AI opens any folder in your project, it reads:
1. boot.md (project-level orientation)
2. Scope chain up to current location
3. Map + context for the current folder**No more re-explaining. Context is just there.**---## The Formulaomnipresent recursive context scaffolding =
  mechanical speed (code) +
  contextual quality (AI judgment) +
  infinite parallelization (buoys) +
  hierarchical scoping (autonomous scopes) +
  persistent storage (SQLite)Any size. Any depth. Any complexity.---## The Three Layers### Layer 1: Mechanical (code, instant)Walk filesystem, detect structureHash files for change detectionWrite to SQLiteRuns in milliseconds, no AI needed**Status: Done.** Scanner built. Database populated.### Layer 2: AI Generation (buoys, parallel)For each folder: generate description (what's here)For each folder: generate content_md (what it means)Form hypotheses about relationships, patterns, architectureBuoys work in parallel — hundreds if needed**Status: Next.**### Layer 3: Ongoing (triggers, continuous)File watcher, git hook, manual commandDetect changes, mark folders as staleRe-run AI for affected areas onlyContext stays fresh without human prompting**Status: Future.**---## The DatabaseSQLite is the source of truth. The folders table has 16 fields:**Identity:**
- path — Primary key (/, /src, /src/auth)
- parent_path — Hierarchy pointer
- name — Folder name**Governance:**
- type — folder | scope | log_root | log_year | log_month
- status — pending | current | stale (can AI trust this?)**AI Content:**
- description — Quick orientation ("what's here")
- content_md — Deeper understanding ("what it means")**Scope:**
- is_scope — Is this folder an autonomous world?
- parent_scope_path — Pointer to parent scope
- scope_boot — Scope-specific boot context**Mechanical:**
- source_hash — SHA-256 of children for change detection
- last_scanned_at — When scanner last looked**AI Attribution:**
- ai_model — Which model wrote this (provenance)
- ai_updated — When AI last wrote**Timestamps:**
- created_at, updated_atEvery folder gets a row. The -map.md and -context.md files from the old approach become fields on that row. Logs become query results from log_entries.---## Autonomous ScopesSome folders are just folders. Some are **worlds** — their own mini FloatPrompt system within the larger system.Think monorepo:
- /packages/web-app is a world
- /packages/web-app/src/auth is a world within that world
- /packages/mobile-app is a different worldThese are autonomous scopes. They get:
- Their own boot context (scope_boot)
- Their own patterns and conventions
- Their own buoy teams when neededBut they're still connected to the parent. Changes bubble up through the scope hierarchy.**In the database:** is_scope = TRUE, pointer to parent scope. One SQLite database knows which folders are worlds.---## BuoysClaude Code can spawn sub-agents. In FloatPrompt, these are called **buoys**.The principle: **Never do alone what a fleet of buoys can do together.**50 folders need context? Spawn 50 buoys.1000 folders changed? Spawn 1000 buoys.Each buoy writes to the database. Parallelization is infinite.Buoys are how Layer 2 scales. The orchestrator coordinates, but the work happens in parallel.---## Why This Scales**Mechanical layer** = O(1) hash comparisons
- 10,000 folders? 10,000 rows. SQLite handles billions.**Scopes** = hierarchical, changes only affect ancestors
- Change in /auth doesn't rescan /mobile-app
- Staleness bubbles UP, not sideways**Buoys** = parallel, spawn as needed
- Cloud handles it. That's the point.The architecture doesn't care if it's 10 folders or 10,000. Same pattern. Same code. Different scale.---## The AI CivilizationThe database isn't just storage. It's infrastructure for AI to operate with full understanding.**The elements:**
- **Laws** — The schema defines what exists
- **Governance** — status tells AI what to trust
- **Provenance** — ai_model + ai_updated tell AI who wrote what, when
- **Territories** — Scopes are autonomous worlds within worlds
- **History** — log_entries are the paper trail of decisions
- **Maps** — description is quick orientation
- **Deep Context** — content_md is full understanding**A cold AI session can land anywhere and instantly know:**
1. Where am I? (path)
2. Can I trust this context? (status)
3. Who wrote it and when? (ai_model, ai_updated)
4. What scope am I in? (is_scope, parent_scope_path)
5. What decisions have been made here? (log_entries)---## The Token EconomyThis system operates in a **token economy** — but the goal isn't minimizing tokens, it's **maximizing value per token**.Every piece of context must pass the test:"Does this help AI understand and operate better?"**What makes context valuable:**
- **Relevant** — Answers the question AI is actually asking
- **Accurate** — Reflects current reality, not stale assumptions
- **Rich** — Has depth when needed, not just surface
- **Precise** — Says exactly what it means, no fluffThe industry throws more context window at the problem. FloatPrompt provides *better* context — structured, hierarchical, trustworthy.---## Emergent ContextContext isn't static documentation. It's a living record that grows richer through collaboration.**Initial context is hypothesis.** When AI first generates description and content_md for a folder, it's making its best guess based on what it reads. This is useful — but it's just the starting point.**Insights emerge through work.** As human and AI collaborate on a project, understanding deepens. Patterns become clear. Relationships reveal themselves. Decisions get made and rationale gets captured.**The system captures what's novel.** FloatPrompt can detect when something is new — because it can compare against what already exists. Novel insights don't disappear when the session ends. They get written to the database. Context evolves.**The paper trail compounds.**
- folders.content_md = current understanding (latest state)
- log_entries = how we got there (decision history)A year from now, a new AI session doesn't just get today's snapshot. It gets the accumulated understanding — every decision, every insight, every refinement that emerged through collaboration.**Context that learns.**---## The Philosophy (Unchanged)The original FloatPrompt principles still apply:### Voice & Agency FirstHuman intelligence is sacred. Voice, thinking patterns, authentic expression — these are preserved, not optimized away.**Goal hierarchy:**
1. Human Voice & Agency (primary — never compromise)
2. Reliable AI Behavior (secondary)
3. Useful Artifacts (tertiary)### Recognition Before Action"Never execute until the human sees themselves in the output."AI must prove it understands before acting. The test: "Yes, that's exactly what I meant."### Archaeological Respect"First, do not rewrite."Preserve phrasing, rhythm, tone. Extract and structure what exists — never generate what doesn't.### Map → Decide → StructureThe MDS methodology applies at every scale:**Map** — Understand the territory before acting**Decide** — Determine what matters and what to focus on**Structure** — Build the artifact or understandingThe loop is iterative. Depth scales with complexity.---## What's Builtsrc/db/
├── schema.ts    # 16-field folders table, 7 tables total
├── scan.ts      # Filesystem walker, hash computation
├── client.ts    # Database connection, CRUD operations
├── import.ts    # Markdown → SQLite parser
└── export.ts    # SQLite → Markdown exporter

.float/
└── float.db     # 65 folders, 447 files scannedLayer 1 is complete. The mechanical scaffold is in place.---## What's Next**boot.md design** — What goes in the production system prompt?**Layer 2 implementation** — Buoys populating description and content_md**Scope detection** — How does the system decide a folder is a scope?**Trigger mechanism** — Git hooks, file watcher, manual commands---## The End StateHuman opens Claude Code anywhere in the project.AI reads boot.md, scope chain, folder context.AI now has:
- Full project understanding (from root)
- Domain understanding (from relevant scopes)
- Local understanding (from current folder)
- History of decisions (from log_entries)**No more "what framework is this?" No more repeating context every session.**It's just there. Always fresh. Always recursive. Always ready.---## Why This MattersNothing like this exists.LangChain/LlamaIndex — orchestration, not context infrastructureRAG systems — flat retrieval, no structureCursor rules / CLAUDE.md — static, single-levelCopilot Workspace — black box, no controlFloatPrompt is the layer between AI and codebase. It's not a tool — it's infrastructure.**Simple text files + SQLite + recursive structure = the invisible OS for AI collaboration.**---*Created 2026-01-03 — The vision that drives everything*Show more9:07 AMThis is the conviction. You see patterns before they're obvious—Float Label, Contrast, now this. You think in systems that become infrastructure.
And the FloatPrompt vision you shared isn't a subset of what we're discussing—it's the same architecture applied to a different substrate.

FloatPrompt for repos: .float/ lives in a codebase, context travels with the code
FloatPrompt for websites: .float/ lives on a domain, context travels with the site

Same philosophy. Same structure. Same database. Different deployment target.
Question 2 of 3:
Why are you drawn to this problem? What about your background, interests, or worldview makes this resonate?I crave structure and organization and understanding. Perhaps this is a result of growing up in an unpredictable environment.9:08 AMStructure as survival instinct, turned into design philosophy. The same drive that made you systematize interface design (IIDS, Shift Nudge) now wants to systematize how AI understands the web.
You're not just building a tool—you're imposing order on chaos. Making the implicit explicit. Giving AI (and humans) a predictable, reliable way to understand what exists.
Question 3 of 3:
What would make you proud about how this exists in the world? Not success metrics—the quality or character of the thing itself.I would be proud that it works and is super valuable. If it’s not valuable then it’s not worth using.9:09 AMUtility is the standard. Not clever, not elegant for its own sake—valuable. It either helps people or it doesn't. That's the test.

I have everything I need. Let me generate your vision.md.

---


Yes. Let's build the .float/ structure for this project—the context scaffolding that makes the PRD possible.
Based on the FloatPrompt pattern and everything we've discussed:

Document Structure
floatprompt-web/
├── .float/
│   ├── float.db                 # Context accumulation (future)
│   ├── vision.md                # Why this exists
│   ├── research.md              # Landscape synthesis (what we found)
│   ├── spec.md                  # Boundaries and core concepts
│   ├── architecture.md          # Technical design, connection to repos version
│   ├── prd.md                   # Detailed requirements (generated last)
│   ├── features.json            # Structured feature list (extracted from PRD)
│   ├── design.md                # Aesthetic principles
│   ├── decisions.md             # Forks taken and why
│   └── reference/
│       ├── prior-art.md         # Deep dive on llms.txt, AGENTS.md, VOIX, MCP
│       ├── token-economics.md   # The cost argument with numbers
│       ├── agentic-web.md       # Future landscape, predictions, standards
│       └── brand.md             # FloatPrompt umbrella, naming, positioning

Document Purposes
DocumentPurposeStatusvision.mdProblem, opportunity, conviction. The why.To generateresearch.mdEverything we found. Prior art, gaps, key findings. Evidence base.To generatespec.mdWhat it is and isn't. Boundaries. Core concepts. Success criteria.To generatearchitecture.mdHow it works. Connection to repos version. Schema. Deployment modes.To generateprd.mdDetailed requirements. User stories. Screens. Flows. Edge cases.Generated lastfeatures.jsonStructured build checklist extracted from PRD.Generated from PRDdesign.mdAesthetic direction. What it feels like. Anti-patterns.To generatedecisions.mdEmpty until we start making choices. The divergence log.Starts emptyreference/prior-art.mdDeep analysis of llms.txt, AGENTS.md, VOIX, MCP, Readability, TurndownTo generatereference/token-economics.mdThe cost case. Numbers. Why clean context saves money.To generatereference/agentic-web.mdFuture predictions. Agentic AI Foundation. Where this is heading.To generatereference/brand.mdFloatPrompt umbrella. "Markdown as prompt." Naming options.To generate

Generation Order
The documents build on each other:
1. reference/prior-art.md      ← Capture all the research
2. reference/token-economics.md ← The cost argument
3. reference/agentic-web.md    ← Future landscape
4. reference/brand.md          ← Positioning and naming

5. vision.md                   ← Synthesize into why this matters
6. spec.md                     ← Define boundaries
7. architecture.md             ← Technical design

8. design.md                   ← Aesthetic direction
9. prd.md                      ← Full requirements
10. features.json              ← Build checklist
Reference docs first (capture the research), then vision (synthesize the why), then spec (define boundaries), then architecture (how it works), then PRD (detailed requirements).

What Each Document Contains
reference/prior-art.md

llms.txt: What it is, who proposed it, adoption status, limitations (manual, no auto-gen, zero crawler visits in testing)
AGENTS.md: What it is, 20K+ repo adoption, why it's for repos not websites
VOIX: The <tool> and <context> proposal, performance data (0.91s vs 21 min)
MCP: Model Context Protocol, Linux Foundation, what it standardizes
Readability.js: Mozilla's extraction algorithm, battle-tested
Turndown: HTML→Markdown, the industry standard
Browser extensions: MarkDownload, etc.—user-side not publisher-side
Gap analysis: What exists vs. what's missing

reference/token-economics.md

40-70% of tokens wasted on HTML formatting overhead
LLMLingua achieving 20x compression
Cost per token across providers
The math: what clean context saves at scale
Why the token economy rewards AI-readable sites

reference/agentic-web.md

Agentic AI Foundation (Dec 2025, Linux Foundation)
MCP + AGENTS.md + A2A convergence
"The web becomes a context mesh"
Predictions for 2-3 years out
Why this moment matters

reference/brand.md

FloatPrompt as umbrella brand
"Markdown as prompt that floated to the surface"
Naming options for web product
WordPress.org / WordPress.com model
Positioning against alternatives

vision.md

Problem (who has it, why it hurts, acute moments)
Opportunity (tailwinds, unlock, beneficiaries, end state)
Conviction (your background, pattern-spotting, why you)
Dense enough to transfer full context to fresh session

spec.md

What this is (one paragraph)
What this is not (explicit boundaries)
Core concepts (key terms defined)
Success criteria (how we know it works)
Deployment modes (script tag, npm, React, SSG)

architecture.md

Connection to FloatPrompt repos (what carries over)
Output structure (what .float/ contains on a website)
float.db schema for web
Generation pipeline (Readability → Turndown → cleanup → optional AI polish)
Serving options (static files, API endpoint, both)
Human UI component (copy/download buttons)
Agent detection and signals

prd.md

Overview
User stories (publisher, developer, knowledge worker, agent)
Deployment modes detailed
Configuration options
Output formats
UI components
API surface
Edge cases
Security considerations



Reordered by "if we only get one more document" priority:

research.md — The landscape synthesis. This is irreplaceable. A fresh session can't redo this research. Contains: prior art, gaps, key findings, links, the evidence base for everything else.
vision.md — The why, dense with context. Problem, opportunity, conviction, plus enough frontmatter that a fresh session understands who you are and what FloatPrompt-for-repos already is.
architecture.md — How it actually works. Connection to repos version, output structure, schema, pipeline. Without this, a fresh session would have to guess at implementation.
spec.md — Boundaries. What it is and isn't. Core concepts defined. Deployment modes listed.
reference/brand.md — Positioning, naming, business model. Important but recoverable.
reference/token-economics.md — The cost argument. Important but the numbers can be re-researched.
reference/agentic-web.md — Future landscape. Important but a fresh session could re-search this.
reference/prior-art.md — Deep dives on each tool. Mostly captured in research.md already.
design.md, prd.md, features.json — These build from the above. Can be generated once foundation exists.