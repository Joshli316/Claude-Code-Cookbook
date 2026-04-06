// Code block with syntax highlighting and copy button

import { t } from '../i18n';

export function codeBlock(code: string, lang: string = 'typescript'): string {
  // Escape HTML entities in code
  const escaped = code
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  return `
    <div class="code-block-wrapper">
      <span class="code-block-lang">${lang}</span>
      <button class="copy-btn">${t('recipe.copy')}</button>
      <pre><code class="language-${lang}">${escaped}</code></pre>
    </div>
  `;
}
