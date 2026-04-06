// Top bar with search and language toggle

import { t } from '../i18n';

export function renderTopbar(): string {
  return `
    <div class="search-wrapper">
      <span class="search-icon">⌘</span>
      <input
        type="text"
        id="search-input"
        class="search-input"
        placeholder="${t('search.placeholder')}"
        aria-label="${t('search.placeholder')}"
        autocomplete="off"
        spellcheck="false"
      >
      <div class="search-results" id="search-results"></div>
    </div>
    <button class="lang-toggle" id="lang-toggle">${t('lang.toggle')}</button>
  `;
}
