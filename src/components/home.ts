// Home page — hero + featured recipes + category browse

import { recipes } from '../recipes/index';
import { t, getLang } from '../i18n';
import { renderRecipeCard } from './recipe-card';

export function renderHome(): string {
  const lang = getLang();
  const featured = [recipes[0], recipes[3], recipes[7]]; // kickoff pipeline, i18n, terminal aesthetic

  const categories = [
    { key: 'workflow', icon: '⚡', count: recipes.filter(r => r.category === 'workflow').length },
    { key: 'code', icon: '{ }', count: recipes.filter(r => r.category === 'code').length },
    { key: 'design', icon: '◆', count: recipes.filter(r => r.category === 'design').length },
  ];

  return `
    <div class="hero">
      <div class="hero-prompt">&gt; claude "build something great"<span class="cursor"></span></div>
      <h1>${t('home.hero_title')}</h1>
      <p class="hero-subtitle">${t('home.hero_subtitle')}</p>
    </div>

    <section>
      <h2>${t('home.featured')}</h2>
      <div class="cards-grid" style="margin-top:16px;">
        ${featured.map(r => renderRecipeCard(r)).join('')}
      </div>
    </section>

    <section style="margin-top:48px;">
      <h2>${t('home.browse_category')}</h2>
      <div class="cards-grid" style="margin-top:16px;">
        ${categories.map(cat => `
          <a href="#/category/${cat.key}" class="recipe-card" style="text-decoration:none;">
            <div style="font-size:1.5rem;margin-bottom:8px;">${cat.icon}</div>
            <div class="recipe-card-title">${t(`category.${cat.key}`)}</div>
            <div class="recipe-card-desc">${t(`category.${cat.key}.desc`)}</div>
            <div style="font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-green);margin-top:8px;">${cat.count} ${lang === 'zh' ? '篇食谱' : 'recipes'}</div>
          </a>
        `).join('')}
      </div>
    </section>

    <section style="margin-top:48px;">
      <h2>${t('home.all_recipes')}</h2>
      <div class="cards-grid" style="margin-top:16px;">
        ${recipes.map(r => renderRecipeCard(r)).join('')}
      </div>
    </section>
  `;
}
