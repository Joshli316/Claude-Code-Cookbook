# Claude Code Cookbook

Bilingual (EN/ZH) open-source recipe site for Claude Code users — workflow patterns, code recipes, and design techniques distilled from 21+ shipped projects.

## Tech Stack
TypeScript/HTML SPA on Cloudflare Pages. Esbuild bundler (build.mjs). No framework — vanilla TypeScript with hash-based routing. Plain CSS (no Tailwind).

## Structure
```
Cookbook/
  index.html          # Entry point
  build.mjs           # Esbuild bundler script
  src/
    main.ts           # App entry, router, search
    i18n.ts           # EN/ZH translation system
    router.ts         # Hash-based SPA router
    search.ts         # Client-side search
    recipes/
      index.ts        # All 10 recipes as TypeScript objects
      types.ts        # Recipe interface
    components/       # home, sidebar, topbar, recipe-page, recipe-card, category
    styles/
      main.css        # Terminal theme (custom properties, no framework)
  public/
    og-image.svg      # Social preview
    _headers          # Cloudflare security headers
    robots.txt
  dist/               # Build output
```

## Entry Point
index.html

## Build
`npm run build` → esbuild bundles to dist/

## Deployment
`wrangler pages deploy dist/`

## Conventions
- English-first, Chinese toggle. All user-facing strings in i18n.ts.
- Recipes are authored as structured TypeScript objects (not runtime markdown parsing) — title, category, tags, difficulty, content blocks.
- Terminal Manual aesthetic: dark bg, monospace (JetBrains Mono), green/cyan accents.
- Code blocks use syntax highlighting with a dark theme.
- Community contributions via GitHub PRs to the recipes/ directory.
- Mobile-first responsive layout.
- No backend, no accounts, no tracking.
