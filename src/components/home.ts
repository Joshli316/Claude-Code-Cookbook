// Home page — hero + featured recipes + category browse

import { recipes } from '../recipes/index';
import { t, getLang } from '../i18n';
import { renderRecipeCard } from './recipe-card';

export function renderHome(): string {
  const lang = getLang();

  const categories = [
    { key: 'workflow', icon: '⚡', count: recipes.filter(r => r.category === 'workflow').length },
    { key: 'code', icon: '{ }', count: recipes.filter(r => r.category === 'code').length },
    { key: 'design', icon: '◆', count: recipes.filter(r => r.category === 'design').length },
  ];

  const [featured, ...rest] = recipes;

  return `
    <div class="hero">
      <div class="hero-prompt">&gt; claude "build something great"<span class="cursor"></span></div>
      <h1>${t('home.hero_title')}</h1>
      <p class="hero-subtitle">${t('home.hero_subtitle')}</p>
    </div>

    <section class="home-section">
      <h2 class="section-heading">${t('home.browse_category')}</h2>
      <div class="category-bar">
        ${categories.map(cat => `
          <a href="#/category/${cat.key}" class="category-chip category-chip-${cat.key}">
            <span class="category-chip-icon">${cat.icon}</span>
            <span class="category-chip-label">${t(`category.${cat.key}`)}</span>
            <span class="category-chip-count">${cat.count} ${lang === 'zh' ? '篇' : ''}</span>
          </a>
        `).join('')}
      </div>
    </section>

    <section class="home-section-recipes">
      <h2 class="section-heading">${t('home.all_recipes')}</h2>
      <div class="cards-grid">
        ${renderRecipeCard(featured, true)}
        ${rest.map(r => renderRecipeCard(r)).join('')}
      </div>
    </section>
  `;
}
