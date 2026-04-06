# Implementation Plan: Claude Code Cookbook

## Overview
A bilingual (EN/ZH) open-source recipe site for Claude Code users. Documents workflow patterns, code recipes, and design techniques distilled from 21+ shipped projects. Terminal Manual aesthetic — dark, monospace, code-first. Community contributions welcome via GitHub PRs.

## Design Spec

### Color Palette
- **Background:** `#0a0e14` (deep navy-black)
- **Surface:** `#131920` (slightly lighter, for cards/panels)
- **Border:** `#1e2a35` (subtle dividers)
- **Primary text:** `#e0e0e0` (light gray)
- **Secondary text:** `#7a8a9e` (muted blue-gray)
- **Accent green:** `#00e88f` (terminal green — links, highlights, active states)
- **Accent cyan:** `#00bcd4` (secondary accent — tags, badges)
- **Accent amber:** `#f5a623` (warnings, difficulty indicators)
- **Code background:** `#0d1117` (GitHub dark code block feel)

### Typography
- **Font family:** `JetBrains Mono` (primary), `system-ui` (fallback for body prose)
- **H1:** 2.25rem (36px) / bold
- **H2:** 1.5rem (24px) / semibold
- **H3:** 1.25rem (20px) / semibold
- **Body:** 1.125rem (18px) / regular
- **Small/meta:** 0.875rem (14px) / regular
- **Code inline:** 0.95em / JetBrains Mono with `#131920` bg pill

### Spacing System
- **Base unit:** 4px
- **Scale:** 4, 8, 12, 16, 24, 32, 48, 64

### Component Style
- **Cards:** `background: #131920`, `border: 1px solid #1e2a35`, `border-radius: 8px`
- **Code blocks:** `background: #0d1117`, `border-radius: 6px`, `padding: 16px`, line numbers in `#7a8a9e`
- **Buttons/pills:** `border-radius: 4px`, `padding: 4px 12px`
- **Sidebar:** Fixed left, 260px wide, `background: #0a0e14`, `border-right: 1px solid #1e2a35`
- **Shadows:** None — flat terminal aesthetic, borders only

### Micro-interactions
- **Link hover:** color → `#00e88f`, `transition: color 150ms ease`
- **Card hover:** `border-color` → `#00e88f`, `transition: border-color 200ms ease`
- **Sidebar item active:** left `3px solid #00e88f` border, text turns white
- **Code block copy button:** appears on hover, `opacity 0→1, 150ms ease`
- **Search:** instant filter as you type, no debounce needed (client-side data)
- **Language toggle:** smooth text swap, no page reload

## Steps

### Step 1: Project scaffold
- Initialize `package.json` with esbuild, tailwind, typescript, wrangler
- Create `tsconfig.json`, `esbuild.config.ts`, `tailwind.config.ts`
- Create `index.html` shell with font imports (JetBrains Mono from Google Fonts)
- Set up `src/main.ts` entry point
- Verify: `npm run build` produces `dist/index.html`

### Step 2: Core layout and routing
- Build hash-based router (`#/`, `#/recipe/:slug`, `#/category/:name`)
- Create sidebar component (fixed left, 260px, collapsible on mobile → hamburger menu)
- Create main content area (scrollable, max-width 800px, centered)
- Create top bar with search input and EN/ZH toggle
- Verify: navigating between `#/` and `#/recipe/test` swaps content area

### Step 3: i18n system
- Create `src/i18n.ts` with EN/ZH string maps
- Language toggle in top bar, persisted to localStorage
- All UI chrome strings translated (sidebar labels, search placeholder, category names, "Copy" button, "Contributed by", difficulty labels)
- Verify: toggling language switches all visible UI text

### Step 4: Recipe data model and initial content
- Define TypeScript recipe interface: `{ slug, title, titleZh, category, tags, difficulty, author, content, contentZh }`
- Categories: `workflow`, `code`, `design`
- Difficulty levels: `starter` (green), `intermediate` (cyan), `advanced` (amber)
- Author 10 initial recipes from Z's actual project experience:
  1. **Workflow:** The /kickoff → /build → /verify pipeline
  2. **Workflow:** Writing effective CLAUDE.md files
  3. **Workflow:** Session memory — saving and resuming context
  4. **Code:** Bilingual i18n setup (the translation pattern used across 21 projects)
  5. **Code:** Deploying to Cloudflare Pages with wrangler
  6. **Code:** Esbuild + TypeScript + Tailwind project scaffold
  7. **Code:** Hash-based SPA routing without a framework
  8. **Design:** Terminal hacker aesthetic (dark mode, monospace, green accents)
  9. **Design:** Mobile-first responsive layout with Tailwind
  10. **Design:** Accessible dark mode — contrast, focus states, reduced motion

### Step 5: Recipe display page
- Render recipe content with proper heading hierarchy, code blocks, inline code
- Syntax highlighting for code blocks (use Prism.js or Shiki with a dark theme)
- Copy-to-clipboard button on each code block
- Recipe metadata header: title, category pill, difficulty badge, tags, author
- "View on GitHub" link pointing to the recipe source file
- Prev/Next navigation at bottom
- Verify: recipe page renders all 10 recipes correctly with syntax highlighting

### Step 6: Home page and category pages
- Home page: hero section ("21+ projects. Patterns that work."), search bar, featured recipes grid (3 cards)
- Category pages (`#/category/workflow`, etc.): filtered list of recipe cards
- Recipe cards show: title, category pill, difficulty badge, first 2 lines of description, tags
- Verify: home page loads, cards link to recipes, category filter works

### Step 7: Search
- Client-side search over recipe titles, tags, and content
- Instant filter as user types in the top bar search input
- Results shown as a dropdown list or inline filtered view
- Highlight matching text in results
- Verify: typing "i18n" surfaces the bilingual recipe; typing "deploy" surfaces the Cloudflare recipe

### Step 8: Contributing guide and GitHub setup
- Create `CONTRIBUTING.md` with recipe template and PR instructions
- Create `recipes/TEMPLATE.md` showing the recipe format
- Add "Contribute a Recipe" link in sidebar
- Verify: CONTRIBUTING.md is clear enough for a stranger to submit a PR

### Step 9: OG image and meta tags
- Create OG image (1200x630) with Cookbook branding
- Add meta tags: title, description, og:image, twitter:card
- Verify: social preview looks correct when pasted into a link previewer

### Step 10: Final QA and deploy prep
- Test responsive layout at 375px, 768px, 1024px
- Test EN/ZH toggle on all pages
- Test all 10 recipes render correctly
- Test search works
- Lighthouse audit (aim for 90+ performance, 100 accessibility)
- Verify: `wrangler pages deploy dist/` succeeds

## Files to Create/Modify
- `index.html` — HTML shell, font imports, mount point
- `package.json` — dependencies, build/dev scripts
- `tsconfig.json` — TypeScript config
- `esbuild.config.ts` — build pipeline
- `tailwind.config.ts` — theme colors, fonts
- `src/main.ts` — app entry, router init
- `src/router.ts` — hash-based router
- `src/i18n.ts` — bilingual string maps
- `src/search.ts` — client-side search logic
- `src/recipes/index.ts` — recipe data (all 10 recipes)
- `src/recipes/types.ts` — Recipe interface
- `src/components/sidebar.ts` — sidebar navigation
- `src/components/topbar.ts` — search + language toggle
- `src/components/recipe-card.ts` — card for listings
- `src/components/recipe-page.ts` — full recipe view
- `src/components/code-block.ts` — syntax-highlighted code with copy button
- `src/components/home.ts` — home page hero + featured grid
- `src/components/category.ts` — category listing page
- `src/styles/main.css` — Tailwind directives + custom terminal theme
- `CONTRIBUTING.md` — how to submit a recipe
- `public/og-image.png` — social preview image

## Open Questions
- None. Ready to build.
