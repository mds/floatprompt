# Partials

Partials are **ad-hoc, not core architecture**.

## When NOT to use partials

- Speculatively ("we might need this")
- For content that appears once

## When to use partials

- 3+ tools share **identical** content
- Changing one should change all
- Content is mechanical, not creative

## How to add

1. Notice repetition across tools
2. Extract to `src/partials/[name].ts`
3. Export from `index.ts`
4. Import in tool configs

## Current partials

None. Schema + Tool Config is sufficient.
