// Full recipe display page

import { recipes } from '../recipes/index';
import { getLang, t } from '../i18n';
import type { Recipe } from '../recipes/types';

export function renderRecipePage(slug: string): string {
  const recipe = recipes.find(r => r.slug === slug);
  if (!recipe) {
    return `<div style="padding:48px 0;text-align:center;color:var(--text-secondary);">${t('error.recipe_not_found')} <a href="#/">${t('error.browse_all')}</a></div>`;
  }

  const lang = getLang();
  const title = lang === 'zh' ? recipe.titleZh : recipe.title;
  const content = lang === 'zh' ? recipe.contentZh : recipe.content;

  // Find prev/next
  const idx = recipes.indexOf(recipe);
  const prev = idx > 0 ? recipes[idx - 1] : null;
  const next = idx < recipes.length - 1 ? recipes[idx + 1] : null;

  return `
    <article>
      <div style="font-size:0.8rem;color:var(--text-secondary);margin-bottom:16px;">
        <a href="#/" style="color:var(--text-secondary);">Home</a>
        <span style="margin:0 6px;">›</span>
        <a href="#/category/${recipe.category}" style="color:var(--text-secondary);">${t(`category.${recipe.category}`)}</a>
        <span style="margin:0 6px;">›</span>
        <span style="color:var(--text-primary);">${title}</span>
      </div>
      <div class="recipe-meta">
        <span class="pill pill-${recipe.category}">${t(`category.${recipe.category}`)}</span>
        <span class="pill badge-${recipe.difficulty}">${t(`difficulty.${recipe.difficulty}`)}</span>
        ${recipe.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
      <h1>${title}</h1>
      <div style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:24px;">
        ${t('recipe.contributed_by')} ${recipe.author}
      </div>

      <div class="recipe-content">
        ${content}
      </div>

      <a href="https://github.com/zhihuang-ai/Claude-Code-Cookbook" target="_blank" rel="noopener noreferrer" class="github-link">
        ↗ ${t('recipe.view_github')}
      </a>

      <nav class="recipe-nav">
        ${prev ? `
          <a href="#/recipe/${prev.slug}">
            <span class="recipe-nav-label">← ${t('recipe.prev')}</span>
            <span class="recipe-nav-title">${lang === 'zh' ? prev.titleZh : prev.title}</span>
          </a>
        ` : '<div></div>'}
        ${next ? `
          <a href="#/recipe/${next.slug}">
            <span class="recipe-nav-label">${t('recipe.next')} →</span>
            <span class="recipe-nav-title">${lang === 'zh' ? next.titleZh : next.title}</span>
          </a>
        ` : '<div></div>'}
      </nav>
    </article>
  `;
}
