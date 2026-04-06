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
      <div class="search-results" id="search-results" role="listbox" aria-live="polite"></div>
    </div>
    <button class="lang-toggle" id="lang-toggle" aria-label="Toggle language">${t('lang.toggle')}</button>
  `;
}
