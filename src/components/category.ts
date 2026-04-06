// Category listing page

import { recipes } from '../recipes/index';
import { t, getLang } from '../i18n';
import { renderRecipeCard } from './recipe-card';
import type { Category } from '../recipes/types';

export function renderCategory(category: string): string {
  const cat = category as Category;
  const filtered = recipes.filter(r => r.category === cat);

  if (filtered.length === 0) {
    return `<div style="padding:48px 0;text-align:center;color:var(--text-secondary);">Category not found.</div>`;
  }

  return `
    <div class="category-header">
      <h1>${t(`category.${cat}`)}</h1>
      <p style="color:var(--text-secondary);margin-top:4px;">${t(`category.${cat}.desc`)}</p>
    </div>
    <div class="cards-grid">
      ${filtered.map(r => renderRecipeCard(r)).join('')}
    </div>
  `;
}
