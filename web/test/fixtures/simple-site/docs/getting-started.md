---
title: Getting Started — Simple Site Docs
url: /docs/getting-started
generated: 2026-01-09T13:58:26.561Z
description: Get started with FloatPrompt in under 5 minutes
---

Get FloatPrompt running on your site in under 5 minutes.

## Prerequisites

-   Node.js 18 or higher
-   A website with a build step

## Installation

Install FloatPrompt as a dev dependency:

```
npm install --save-dev floatprompt
```

## Usage

Add FloatPrompt to your build script:

```
{
  "scripts": {
    "build": "your-build-command && npx floatprompt generate ./dist"
  }
}
```

## Configuration

Create `floatprompt.config.js` for custom settings:

```
export default {
  exclude: ['/admin/**'],
  baseUrl: 'https://example.com',
};
```

## What Gets Generated

| File | Description |
| --- | --- |
| `{page}.md` | Markdown version of each page |
| `llms.txt` | Site index for AI |
| `llms-full.txt` | Complete site content |
| `/float/` | Human dashboard |

That's it! Your site is now AI-readable.
