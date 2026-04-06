// Recipe card component for listings

import { getLang, t } from '../i18n';
import type { Recipe } from '../recipes/types';

export function renderRecipeCard(recipe: Recipe, featured = false): string {
  const lang = getLang();
  const title = lang === 'zh' ? recipe.titleZh : recipe.title;
  const desc = lang === 'zh' ? recipe.descriptionZh : recipe.description;
  const cls = featured ? 'recipe-card recipe-card-featured' : 'recipe-card';

  return `
    <a href="#/recipe/${recipe.slug}" class="${cls}">
      <div class="recipe-card-title">${title}</div>
      <div class="recipe-card-desc">${desc}</div>
      <div class="recipe-card-footer">
        <span class="pill pill-${recipe.category}">${t(`category.${recipe.category}`)}</span>
        <span class="pill badge-${recipe.difficulty}">${t(`difficulty.${recipe.difficulty}`)}</span>
        ${recipe.tags.slice(0, 2).map(tag => `<span class="tag">${tag}</span>`).join('')}
      </div>
    </a>
  `;
}
