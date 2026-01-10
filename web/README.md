# floatprompt

**Floats your content for AI — and humans who use it.**

One install. Zero config. Every page becomes copyable markdown.

- AI agents get clean `llms.txt` and `.md` files
- Humans get `/float/` dashboard to browse and copy any page
- No AI calls. No API keys. Just markdown.

## Install

```bash
npm install floatprompt
```

That's it. On install, FloatPrompt adds itself to your build. Every `npm run build` now generates markdown automatically.

## Framework Support

| Framework | Extra Steps | Notes |
|-----------|-------------|-------|
| **Next.js** | None | Works automatically |
| **Astro** | None | Works automatically |
| **Gatsby** | None | Works automatically |
| **Eleventy** | None | Works automatically |
| **Vite** | None | Works automatically |
| **Hugo** | Add to build command | `hugo && floatprompt ./public` |
| **Jekyll** | Add to build command | `jekyll build && floatprompt ./_site` |

*Hugo and Jekyll don't use npm scripts, so add FloatPrompt to your build command manually.*

## What You Get

After each build:

```
out/
├── index.html
├── index.md            ← AI-readable
├── about.html
├── about.md            ← AI-readable
├── llms.txt            ← Site index for LLMs
├── llms-full.txt       ← Complete site content
└── float/
    └── index.html      ← Dashboard for browsing all pages
```

## Embed Widget (Optional)

Want a "Copy as Markdown" button on your live site? Add the widget so visitors can copy any page directly:

### React Component

```jsx
import { FloatButton } from 'floatprompt/react'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <FloatButton position="bottom-right" />
    </>
  )
}
```

### Custom UI

Use the core functions with your own buttons:

```js
import { copyPageMarkdown, getPageMarkdown } from 'floatprompt/widget'

// Copy current page to clipboard
document.getElementById('my-copy-btn').onclick = async () => {
  await copyPageMarkdown()
}

// Or get the markdown to do something else with it
const markdown = await getPageMarkdown()
```

## How It Works

FloatPrompt runs after your build and:

1. Extracts main content from each HTML page (using [Mozilla Readability](https://github.com/mozilla/readability))
2. Converts to clean Markdown (using [Turndown](https://github.com/mixmark-io/turndown))
3. Generates `llms.txt` — a site index following the [llms.txt standard](https://llmstxt.org)
4. Creates `/float/` — a dashboard for browsing and copying all pages

No AI. No API keys. Pure mechanical extraction.

## Configuration (Optional)

Create `floatprompt.config.js` for custom settings:

```js
export default {
  exclude: ['/admin/**', '/api/**'],
  baseUrl: 'https://example.com',
  siteTitle: 'My Site',
  siteDescription: 'A site that floats its content for AI',
}
```

### All Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | string | auto-detected | Input directory |
| `output` | string | same as input | Output directory |
| `exclude` | string[] | `[]` | Glob patterns to exclude |
| `baseUrl` | string | `''` | Base URL for the site |
| `siteTitle` | string | from index.html | Site title |
| `siteDescription` | string | — | Site description |
| `llmsTxt` | boolean | `true` | Generate llms.txt |
| `llmsFullTxt` | boolean | `true` | Generate llms-full.txt |
| `dashboard` | boolean | `true` | Generate /float/ dashboard |

## Manual Usage

If you'd rather run FloatPrompt yourself instead of using the automatic `postbuild` hook:

```bash
floatprompt              # auto-detects output directory
floatprompt ./out        # explicit path
floatprompt ./out --exclude "/admin/**"
```

### CLI Options

| Flag | Description |
|------|-------------|
| `--output <dir>` | Output directory (default: same as input) |
| `--exclude <glob>` | Exclude pattern (can use multiple times) |
| `--base-url <url>` | Base URL for the site |
| `--site-title <title>` | Site title |
| `--no-llms-txt` | Skip llms.txt and llms-full.txt |
| `--no-dashboard` | Skip /float/ dashboard |
| `--verbose` | Show detailed output |

## Programmatic API

```js
import { FloatPrompt } from 'floatprompt'

// Generate for a directory
const result = await FloatPrompt.generate({
  input: './out',
  exclude: ['/admin/**'],
})

console.log(`Generated ${result.markdownFilesGenerated} files`)

// Extract single page
const markdown = FloatPrompt.extract(htmlString, {
  url: '/about',
  title: 'About Us',
})
```

## Why FloatPrompt?

**For AI agents:** HTML is full of navigation, footers, scripts, and styling. Markdown is just the content. Less noise, better results.

**For humans:** Visitors can copy any page as markdown and paste directly into Claude, ChatGPT, or any AI tool.

**For you:** One install. Works on every build. Nothing to maintain.

## License

MIT
