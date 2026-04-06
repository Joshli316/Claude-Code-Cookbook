# Claude Code Cookbook

Bilingual (EN/ZH) open-source recipe site for Claude Code users — workflow patterns, code recipes, and design techniques distilled from 21+ shipped projects.

## Tech Stack
TypeScript/HTML SPA on Cloudflare Pages. Esbuild bundler. Tailwind CSS v4. No framework — vanilla TypeScript with hash-based routing.

## Structure
```
Cookbook/
  index.html          # Entry point
  src/
    main.ts           # App entry, router, search
    i18n.ts           # EN/ZH translation system
    recipes/          # Recipe markdown files (parsed at build time)
    components/       # Sidebar, recipe card, code block, search
    styles/           # Tailwind + custom terminal theme
  public/
    og-image.png      # Social preview
  recipes/            # Source markdown recipe files
    workflow/         # Workflow recipes
    code/             # Code recipes
    design/           # Design recipes
  dist/               # Build output
  esbuild.config.ts   # Build config
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
