# Contributing a Recipe

Thanks for sharing your Claude Code patterns! Here's how to submit a recipe.

## Recipe Format

Each recipe is a TypeScript object in `src/recipes/index.ts`. Use this template:

```typescript
{
  slug: 'your-recipe-slug',          // URL-safe, lowercase, hyphens
  title: 'Your Recipe Title',         // English title
  titleZh: '你的食谱标题',              // Chinese title
  description: 'One-line summary.',    // English description
  descriptionZh: '一行摘要。',          // Chinese description
  category: 'workflow',                // 'workflow' | 'code' | 'design'
  tags: ['tag1', 'tag2'],             // 2-4 tags
  difficulty: 'starter',              // 'starter' | 'intermediate' | 'advanced'
  author: 'Your Name',
  content: `
    <p>English content with HTML markup.</p>
    <h2>Section Heading</h2>
    <p>Explanation...</p>
    ${/* Use cb() for code blocks */''}
  `,
  contentZh: `
    <p>Chinese content with HTML markup.</p>
    <h2>章节标题</h2>
    <p>说明...</p>
  `,
}
```

## Code Blocks

Use the `cb()` helper function defined at the top of the recipes file:

```typescript
cb(`const x = 1;`, 'typescript')   // TypeScript
cb(`npm install foo`, 'bash')      // Bash
cb(`{ "key": "value" }`, 'json')   // JSON
cb(`.class { color: red; }`, 'css') // CSS
```

## Submission Steps

1. Fork the repo
2. Add your recipe object to the `recipes` array in `src/recipes/index.ts`
3. Make sure both English and Chinese content are provided
4. Run `npm run build` to verify it compiles
5. Run `npm run dev` and check your recipe at `http://localhost:3000/#/recipe/your-slug`
6. Submit a PR with a clear title: `Add recipe: Your Recipe Title`

## Guidelines

- **Real patterns only** — recipes should come from actual project experience
- **Tested code** — every code example should work if copy-pasted
- **Bilingual** — both English and Chinese content required
- **Concise** — aim for 200-400 words per recipe, plus code examples
- **Specific** — "Deploy to Cloudflare Pages" not "Deploy your app"

## Categories

- **Workflow**: Process patterns (session management, pipelines, CLAUDE.md)
- **Code**: Implementation recipes (routing, i18n, build setup, deployment)
- **Design**: Visual/UX techniques (themes, responsive layout, accessibility)

## Questions?

Open an issue on GitHub.
