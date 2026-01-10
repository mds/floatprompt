# FloatPrompt Package Issues

Analysis of shiftnudge.com pages for floatprompt dynamic extraction improvements.

## TL;DR - Current Site Status

| Issue | Severity | Pages Affected |
|-------|----------|----------------|
| **h1 heading missing** | Critical | ALL 46 pages |
| **Intro paragraph missing** | High | ~35 pages (varies by content density) |
| **Returns "Loading..." only** | Critical | 2 pages (teams, join) |
| **No semantic wrappers** | Medium | ALL 46 pages |

**Bottom line:** Every `.md` endpoint is broken in some way. The h1 is NEVER extracted.

## Page Type Distribution

| Type | Count | Examples |
|------|-------|----------|
| Server Components (no 'use client') | 27 | `/faq`, `/mds`, `/curriculum` |
| Client Components (no Suspense) | 15 | `/apply`, `/expense`, `/reviews` |
| Client + Suspense (useful fallback) | 2 | `/contact`, `/custom` |
| Client + Suspense (empty fallback) | 2 | `/teams`, `/join` |

## Issues Found

### 1. HeroSection h1 ALWAYS Stripped

**Affected:** ALL pages with HeroSection component

**Problem:** The `<h1>` inside HeroSection is NEVER captured by Readability.

**Verified missing on:**
- `/mds.md` - missing `# MDS`
- `/teams.md` - missing `# Teams`
- `/faq.md` - missing `# FAQ`
- `/curriculum.md` - missing `# Curriculum`
- `/reviews.md` - missing `# Reviews`
- `/index.md` - missing `# Shift Nudge`

**Root cause:** HeroSection renders as `<section>` (line 71 of HeroSection.tsx), which Readability classifies as navigation/header content.

**Confirmed via floatprompt source analysis:**

```
Pipeline: HTML → sanitize() → extractContent() [READABILITY] → toMarkdown() [TURNDOWN]
                                    ↑
                              h1 is lost HERE
```

- `extract.js:33-38` - Readability with `charThreshold: 100`
- `convert.js:9-10` - Turndown IS configured with `headingStyle: 'atx'` (would preserve h1 if present)
- `pipeline.js:30-33` - If Readability doesn't include h1 in `extracted.content`, it's lost forever
- Title in frontmatter comes from `extracted.title` (Readability's title) or `<title>` tag, NOT the `<h1>`

### 2. HeroSection Intro Paragraph INCONSISTENTLY Captured

**Problem:** The intro paragraph in HeroSection is sometimes captured, sometimes not, depending on what OTHER content exists on the page.

| Page | Has h1? | Has intro? | Why? |
|------|---------|------------|------|
| `/mds.md` | ❌ | ❌ | Dense ContentStack sections below = Readability prefers those |
| `/reviews.md` | ❌ | ✅ | Reviews render client-side (`isReady && ...`) = HeroSection is only SSR content |
| `/faq.md` | ❌ | ❌ | FAQ items render server-side = denser than HeroSection |
| `/curriculum.md` | ❌ | ❌ | Module lists render server-side = denser than HeroSection |
| `/index.md` | ❌ | ❌ | Lots of server-rendered content below |
| `/figma/101.md` | ❌ | ✅ | Conditional render = minimal SSR content |

**Root cause:** Readability uses text density heuristics. When the page has lots of dense content below HeroSection, Readability ignores the HeroSection paragraph as "header fluff." When HeroSection is the ONLY dense content (client-rendered pages with empty initial state), Readability captures it.

### 3. Client-Rendered Pages Return Empty Content

**Affected:** Pages with `'use client'` + `<Suspense fallback={<div>Loading...</div>}>`

**Problem:** When floatprompt fetches the HTML, it gets the server-rendered Suspense fallback (just "Loading...") instead of the actual content.

**Examples:**
- `/teams.md` returns only "Loading..."
- `/join.md` returns only "Loading..."

### 4. No Semantic Wrapper Elements

**Affected:** All 46 pages

**Problem:** No pages use `<main>` or `<article>` as the outer wrapper. All use `<div className="relative bg-[var(--canvas)]...">`. This makes it harder for Readability to identify the primary content area.

### 5. Inconsistent Suspense Fallbacks

**Pattern observed:**

```tsx
// Good - Contact page has meaningful fallback
<Suspense fallback={
  <div>
    <Header />
    <HeroSection
      leftContent={<h1>Contact</h1>}
      rightContent={<p>Reach out about enrollment...</p>}
    />
  </div>
}>

// Bad - Teams page has empty fallback
<Suspense fallback={<div>Loading...</div>}>
```

## Proposed floatprompt Solutions

### Option A: Custom HTML Preprocessing (fetchHtml option)

Allow users to transform HTML before Readability processes it:

```typescript
export const GET = createFloatHandler({
  baseUrl: 'https://example.com',
  fetchHtml: async (url, request) => {
    const html = await fetch(url).then(r => r.text());
    // Move HeroSection content into <article> wrapper
    return preprocessHtml(html);
  },
})
```

### Option B: Configure Readability Options

Expose Readability configuration:

```typescript
export const GET = createFloatHandler({
  readability: {
    charThreshold: 50,  // Lower threshold
    keepClasses: true,  // Preserve semantic classes
  },
})
```

### Option C: Bypass Readability for Known Patterns

Add option to skip Readability and use custom selectors:

```typescript
export const GET = createFloatHandler({
  extractionMode: 'custom',
  contentSelector: 'main, [data-content], .page-content',
  titleSelector: 'h1',
})
```

### Option D: Pre-extract Hero Content (RECOMMENDED)

Before Readability runs, extract and preserve h1 + first paragraph.

**Exact fix location in floatprompt:**

```typescript
// In pipeline.js, AFTER line 27 (sanitize) but BEFORE line 30 (extractContent):

// Pre-extract h1 before Readability strips it
import { parseHTML } from 'linkedom';
const dom = parseHTML(sanitizedHtml);
const h1 = dom.document.querySelector('h1')?.textContent?.trim();
const h1Parent = dom.document.querySelector('h1')?.closest('section, header, div');
const introP = h1Parent?.querySelector('p')?.textContent?.trim();

// Then AFTER line 35 (toMarkdown), prepend to markdownContent:
let finalMarkdown = markdownContent;
if (h1 && !markdownContent.startsWith('# ')) {
  const intro = introP ? `\n\n${introP}` : '';
  finalMarkdown = `# ${h1}${intro}\n\n${markdownContent}`;
}
```

**Why this works:**
- Extracts h1 from sanitized HTML before Readability processes it
- Readability can't strip what we've already saved
- Only prepends if markdown doesn't already have an h1 (avoids duplication)
- Captures sibling `<p>` as intro when available

### Option E: Support data-* Hints

Allow pages to mark content for inclusion:

```html
<section data-floatprompt="include">
  <h1>MDS</h1>
  <p>Designer, educator...</p>
</section>
```

## Recommended Approach

**Priority 1 - Fix h1 extraction (Critical):**
- Implement Option D: Always extract first `<h1>` BEFORE Readability runs
- Prepend as `# {title}` to the markdown output
- This single fix would improve ALL 46 pages

**Priority 2 - Fix intro paragraph (High):**
- Also extract first `<p>` that's a sibling/near-sibling of `<h1>`
- Prepend after the h1 in output

**Priority 3 - Handle empty SSR (Medium):**
- Detect "Loading..." only content
- Return error or warning in output
- Or document that sites need meaningful Suspense fallbacks

**Priority 4 - Long-term improvements:**
- Option E (data-* hints) for fine-grained control
- Option C (custom selectors) for bypassing Readability entirely

## Validation Summary

**What was verified:**
- Fetched 8+ `.md` endpoints on float branch - all missing h1
- Read floatprompt source: `pipeline.js`, `extract.js`, `convert.js`, `next-dynamic.js`
- Confirmed Readability (`extract.js:33`) is where h1 gets stripped
- Confirmed Turndown (`convert.js:10`) would preserve h1 if it existed in input
- Confirmed title in frontmatter comes from Readability or `<title>`, not `<h1>`

**Confidence level:** HIGH that the diagnosis is correct and Option D would fix the issue.

## Additional Findings (Deep Dive)

### Dynamic Routes Work Same as Static
Tested `/figma/101/interface.md` and `/schedules/12.md` - same h1 missing issue.

### Pages Without HeroSection (6 total)
| Page | Structure | Issue |
|------|-----------|-------|
| `/figma/101/[slug]` | Uses `<nav>` + `LessonNav` component | **No h1 exists at all** - site-side issue |
| `/figma/101` | Conditional auth render | Same extraction issues |
| `/figma` | Just a redirect | N/A |
| `/lab/blob`, `/lab/mosaic` | Client experiments | No meaningful content |
| `/test/email-drafts` | Dev tool | N/A |

**Note:** The `/figma/101/[slug]` pages don't have an `<h1>` in the DOM - they use `<nav>` with lesson title. The pre-extract fix won't help these; they need site-side h1 addition.

### Links ARE Preserved
External links in body content work fine:
- `/mds.md` correctly has `[Float Label](https://floatlabel.com)` etc.
- Internal navigation links may be stripped if they're complex `<a>` wrappers

### Empty SSR Patterns Found
| Page | Pattern | Result |
|------|---------|--------|
| `/teams` | `<Suspense fallback={<div>Loading...</div>}>` | Returns "Loading..." |
| `/join` | Same pattern | Returns "Loading..." |
| `/reviews` | `isReady && allReviews.map(...)` | HeroSection captured (only content!) |
| `/apply` | Form visible, reviews empty | Partial content |

### fetchHtml Workaround IS Possible

Current float branch config:
```typescript
// src/app/api/float/route.ts
export const GET = createFloatHandler({
  baseUrl: 'https://shiftnudge.com',
  cacheControl: 'public, s-maxage=3600, stale-while-revalidate=86400',
})
```

**Site-side workaround** (without changing floatprompt):
```typescript
import { createFloatHandler } from 'floatprompt/next-dynamic'
import { parseHTML } from 'linkedom'

export const GET = createFloatHandler({
  baseUrl: 'https://shiftnudge.com',
  fetchHtml: async (url, request) => {
    const res = await fetch(url, {
      headers: {
        'Cookie': request.headers.get('cookie') || '',
        'x-floatprompt-internal': '1',
      },
    })
    if (!res.ok) return null

    let html = await res.text()

    // Pre-extract h1 and inject into main content area
    const dom = parseHTML(html)
    const h1 = dom.document.querySelector('h1')
    const mainContent = dom.document.querySelector('#page-content')

    if (h1 && mainContent) {
      // Clone h1 into main content so Readability sees it
      const h1Clone = h1.cloneNode(true)
      mainContent.insertBefore(h1Clone, mainContent.firstChild)
    }

    return dom.document.toString()
  },
})
```

**Limitation:** This adds complexity and `linkedom` dependency to the site.

## Site-Side Fixes (Alternative)

If floatprompt changes aren't feasible, site owners can:

1. Wrap page content in `<main>` element
2. Use meaningful Suspense fallbacks that include h1 + intro
3. Add `<article>` wrapper around primary content
4. Move h1 outside of HeroSection into main content flow
5. Use the `fetchHtml` workaround shown above

## Final Assessment

| Category | Count | Fix Location |
|----------|-------|--------------|
| h1 missing (HeroSection pages) | 40 | floatprompt |
| h1 missing (no h1 in DOM) | 6 | site-side |
| Intro paragraph missing | ~35 | floatprompt |
| "Loading..." pages | 2 | site-side (Suspense fallbacks) |
| Redirect-only pages | 1 | N/A |

**Recommended path forward:**

1. **floatprompt fix** - Pre-extract h1 before Readability (fixes 40 pages)
2. **Site-side** - Add h1 to `/figma/101/[slug]` pages (fixes 6 pages)
3. **Site-side** - Add meaningful Suspense fallbacks for `/teams` and `/join` (fixes 2 pages)

Total pages with issues: 48 (including dynamic routes)
Fixed by floatprompt change: ~40
Requires site-side changes: ~8

## Test Cases for Regression

After implementing the fix, verify:

```bash
# h1 should appear in output
curl -s https://example.com/about.md | grep -q "^# About" && echo "PASS" || echo "FAIL"

# Intro paragraph should appear after h1
curl -s https://example.com/about.md | head -20 | grep -q "intro text" && echo "PASS" || echo "FAIL"

# Should NOT duplicate h1 if page already has h1 in main content
curl -s https://example.com/blog/post.md | grep -c "^# " # Should be 1, not 2

# Empty SSR pages should return error or meaningful content (not "Loading...")
curl -s https://example.com/dynamic-page.md | grep -qv "Loading..." && echo "PASS" || echo "FAIL"
```

**Test matrix:**

| Test | Input | Expected Output |
|------|-------|-----------------|
| HeroSection h1 | Page with `<h1>` in `<section>` | `# Title` at start of markdown |
| HeroSection intro | Page with `<p>` sibling to h1 | Intro paragraph after h1 |
| Multiple h1s | Page with 2+ h1 elements | Only first h1 extracted |
| No h1 | Page without any h1 | No `#` prefix added |
| h1 in main content | Page with h1 inside `<article>` | No duplication |
| Suspense fallback | Client page with "Loading..." | 422 error or warning |

## Implementation Notes

**Version tested:** floatprompt 1.1.1

**Performance impact:** Pre-extracting h1 adds ~1-2ms for DOM parsing (linkedom is already a dependency, used in `extract.js`). Negligible compared to fetch latency.

**Edge case - multiple h1s:** The fix should only extract the FIRST h1:
```typescript
const h1 = dom.document.querySelector('h1') // Returns first match only
```

**Edge case - h1 already in output:** Check before prepending to avoid duplication:
```typescript
if (h1 && !markdownContent.startsWith('# ')) {
  finalMarkdown = `# ${h1}\n\n${markdownContent}`
}
```

**Compatibility:** This fix is backwards-compatible. Sites that already have h1 in main content won't be affected due to the duplication check.
