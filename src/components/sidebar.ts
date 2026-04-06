// Sidebar navigation component

import { recipes } from '../recipes/index';
import { t, getLang } from '../i18n';
import type { Category } from '../recipes/types';

const categories: { key: Category; icon: string }[] = [
  { key: 'workflow', icon: '⚡' },
  { key: 'code', icon: '{ }' },
  { key: 'design', icon: '◆' },
];

export function renderSidebar(): string {
  const lang = getLang();
  const hash = window.location.hash || '#/';

  return `
    <div class="sidebar-header">
      <a href="#/" class="sidebar-logo">
        &gt;_ ${t('site.subtitle')}<span>${t('site.title')}</span>
      </a>
    </div>
    <nav class="sidebar-nav">
      <div class="sidebar-section">
        <a href="#/" class="sidebar-link ${hash === '#/' ? 'active' : ''}">
          ${t('nav.home')}
        </a>
      </div>

      ${categories.map(cat => {
        const catRecipes = recipes.filter(r => r.category === cat.key);
        return `
          <div class="sidebar-section">
            <div class="sidebar-section-title">${cat.icon} ${t(`nav.${cat.key}`)}</div>
            <a href="#/category/${cat.key}" class="sidebar-link ${hash === `#/category/${cat.key}` ? 'active' : ''}">
              ${t('home.all_recipes')} (${catRecipes.length})
            </a>
            ${catRecipes.map(r => `
              <a href="#/recipe/${r.slug}" class="sidebar-link ${hash === `#/recipe/${r.slug}` ? 'active' : ''}">
                ${lang === 'zh' ? r.titleZh : r.title}
              </a>
            `).join('')}
          </div>
        `;
      }).join('')}

      <div class="sidebar-section" style="margin-top: 8px;">
        <a href="https://github.com/zhihuang-ai/Claude-Code-Cookbook/blob/main/CONTRIBUTING.md" target="_blank" class="sidebar-link">
          + ${t('nav.contribute')}
        </a>
      </div>
    </nav>
    <div class="sidebar-footer">
      <a href="https://github.com/zhihuang-ai/Claude-Code-Cookbook" target="_blank">${t('nav.github')} →</a>
    </div>
  `;
}
