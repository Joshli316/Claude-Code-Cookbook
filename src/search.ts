// Client-side search over recipes

import { recipes } from './recipes/index';
import { getLang } from './i18n';
import { navigate } from './router';

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightMatch(text: string, query: string): string {
  if (!query) return escapeHtml(text);
  const escaped = escapeHtml(text);
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escaped.replace(regex, '<span class="search-highlight">$1</span>');
}

export function handleSearch(query: string): void {
  const resultsEl = document.getElementById('search-results');
  if (!resultsEl) return;

  if (!query || query.length < 2) {
    resultsEl.classList.remove('open');
    resultsEl.innerHTML = '';
    return;
  }

  const lang = getLang();
  const q = query.toLowerCase();

  const matches = recipes.filter(r => {
    const title = lang === 'zh' ? r.titleZh : r.title;
    const desc = lang === 'zh' ? r.descriptionZh : r.description;
    const content = lang === 'zh' ? r.contentZh : r.content;
    const tagStr = r.tags.join(' ');

    return (
      title.toLowerCase().includes(q) ||
      desc.toLowerCase().includes(q) ||
      tagStr.toLowerCase().includes(q) ||
      content.toLowerCase().includes(q)
    );
  });

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-result-item" style="cursor:default;color:var(--text-secondary);font-size:0.85rem;">${lang === 'zh' ? '未找到食谱' : 'No recipes found'}</div>`;
    resultsEl.classList.add('open');
    return;
  }

  const countLabel = lang === 'zh' ? `${matches.length} 个食谱` : `${matches.length} recipes found`;
  resultsEl.innerHTML = `<div style="padding:6px 14px;font-size:0.7rem;color:var(--text-secondary);border-bottom:1px solid var(--border);">${countLabel}</div>` +
  matches.map(r => {
    const title = lang === 'zh' ? r.titleZh : r.title;
    return `
      <div class="search-result-item" role="option" data-slug="${r.slug}">
        <div class="search-result-title">${highlightMatch(title, query)}</div>
        <div class="search-result-meta">
          <span class="pill pill-${r.category}" style="font-size:0.65rem;">${r.category}</span>
          ${r.tags.slice(0, 3).map(tag => `<span class="tag" style="font-size:0.65rem;">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  resultsEl.classList.add('open');

  // Attach click handlers
  resultsEl.querySelectorAll('.search-result-item[data-slug]').forEach(item => {
    item.addEventListener('click', () => {
      const slug = (item as HTMLElement).dataset.slug;
      if (slug) {
        navigate(`#/recipe/${slug}`);
        resultsEl.classList.remove('open');
        const input = document.getElementById('search-input') as HTMLInputElement;
        if (input) input.value = '';
      }
    });
  });
}
