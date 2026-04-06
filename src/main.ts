// Claude Code Cookbook — Entry Point
import { initRouter, navigate } from './router';
import { renderSidebar } from './components/sidebar';
import { renderTopbar } from './components/topbar';
import { renderHome } from './components/home';
import { renderRecipePage } from './components/recipe-page';
import { renderCategory } from './components/category';
import { t, getLang, toggleLang } from './i18n';
import { recipes } from './recipes/index';

declare const Prism: { highlightAll: () => void };

function renderApp(): void {
  const app = document.getElementById('app');
  if (!app) return;

  app.innerHTML = `
    <a href="#content" class="skip-to-content" style="position:absolute;left:-9999px;top:0;padding:8px 16px;background:var(--accent-green);color:var(--bg);z-index:999;font-family:var(--font-mono);font-size:0.85rem;border-radius:0 0 4px 0;" onfocus="this.style.left='0'" onblur="this.style.left='-9999px'">Skip to content</a>
    <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">☰</button>
    <div class="sidebar-overlay" id="sidebar-overlay"></div>
    <aside class="sidebar" id="sidebar">
      ${renderSidebar()}
    </aside>
    <main class="main">
      <header class="topbar">
        ${renderTopbar()}
      </header>
      <div class="content" id="content"></div>
    </main>
  `;

  setupMobileMenu();
  setupLangToggle();
  initSearch();
}

function renderContent(): void {
  const content = document.getElementById('content');
  if (!content) return;

  const hash = window.location.hash || '#/';

  if (hash === '#/' || hash === '') {
    content.innerHTML = renderHome();
  } else if (hash.startsWith('#/recipe/')) {
    const slug = hash.replace('#/recipe/', '');
    content.innerHTML = renderRecipePage(slug);
  } else if (hash.startsWith('#/category/')) {
    const category = hash.replace('#/category/', '');
    content.innerHTML = renderCategory(category);
  } else {
    content.innerHTML = renderHome();
  }

  // Syntax highlighting
  requestAnimationFrame(() => {
    if (typeof Prism !== 'undefined') {
      Prism.highlightAll();
    }
  });

  // Dynamic page title
  updatePageTitle(hash);

  // Update active sidebar link
  updateActiveSidebarLink();

  // Close mobile menu on navigation
  closeMobileMenu();

  // Scroll to top
  const mainEl = document.querySelector('.main');
  if (mainEl) mainEl.scrollTop = 0;
  window.scrollTo(0, 0);
}

function setupDelegatedClicks(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement;

    // Copy button (event delegation — no per-element listeners)
    if (target.classList.contains('copy-btn')) {
      const wrapper = target.closest('.code-block-wrapper');
      const code = wrapper?.querySelector('code');
      if (code) {
        navigator.clipboard.writeText(code.textContent || '').then(() => {
          target.textContent = getLang() === 'zh' ? '已复制' : 'Copied!';
          target.classList.add('copied');
          setTimeout(() => {
            target.textContent = getLang() === 'zh' ? '复制' : 'Copy';
            target.classList.remove('copied');
          }, 2000);
        }).catch(() => {
          target.textContent = getLang() === 'zh' ? '失败' : 'Failed';
          setTimeout(() => {
            target.textContent = getLang() === 'zh' ? '复制' : 'Copy';
          }, 2000);
        });
      }
    }

    // Share button (copy recipe link)
    if (target.classList.contains('share-btn')) {
      const url = `${window.location.origin}/${target.dataset.url}`;
      navigator.clipboard.writeText(url).then(() => {
        target.textContent = getLang() === 'zh' ? '链接已复制！' : 'Link copied!';
        setTimeout(() => {
          target.textContent = `↗ ${getLang() === 'zh' ? '复制链接' : 'Copy link'}`;
        }, 2000);
      }).catch(() => {});
    }
  });
}

function updateActiveSidebarLink(): void {
  const hash = window.location.hash || '#/';
  document.querySelectorAll('.sidebar-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === hash) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });
}

function updatePageTitle(hash: string): void {
  const base = 'Claude Code Cookbook';
  if (hash.startsWith('#/recipe/')) {
    const slug = hash.replace('#/recipe/', '');
    const recipe = recipes.find(r => r.slug === slug);
    if (recipe) {
      const lang = getLang();
      document.title = `${lang === 'zh' ? recipe.titleZh : recipe.title} — ${base}`;
      return;
    }
  } else if (hash.startsWith('#/category/')) {
    const cat = hash.replace('#/category/', '');
    document.title = `${t(`category.${cat}`)} — ${base}`;
    return;
  }
  document.title = `${base} — Recipes from 21+ Shipped Projects`;
}

function setupMobileMenu(): void {
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebar-overlay');

  hamburger?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    overlay?.classList.toggle('open');
    const isOpen = sidebar?.classList.contains('open') ?? false;
    hamburger?.setAttribute('aria-expanded', String(isOpen));
  });

  overlay?.addEventListener('click', closeMobileMenu);
}

function setupLangToggle(): void {
  document.getElementById('lang-toggle')?.addEventListener('click', () => {
    toggleLang();
    renderApp();
    renderContent();
  });
}

function closeMobileMenu(): void {
  document.getElementById('sidebar')?.classList.remove('open');
  document.getElementById('sidebar-overlay')?.classList.remove('open');
}

function initSearch(): void {
  // Search is initialized from topbar component via event delegation
  const searchInput = document.getElementById('search-input') as HTMLInputElement;
  if (!searchInput) return;

  // Import search dynamically
  import('./search').then(({ handleSearch }) => {
    let debounceTimer: ReturnType<typeof setTimeout>;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = (e.target as HTMLInputElement).value;
      debounceTimer = setTimeout(() => handleSearch(query), 150);
    });

    searchInput.addEventListener('focus', () => {
      if (searchInput.value.length > 0) {
        handleSearch(searchInput.value);
      }
    });

    // Keyboard navigation for search results
    let activeIndex = -1;
    searchInput.addEventListener('keydown', (e) => {
      const resultsEl = document.getElementById('search-results');
      const items = resultsEl ? resultsEl.querySelectorAll('.search-result-item[data-slug]') : document.querySelectorAll('.nonexistent');

      if (e.key === 'Escape') {
        resultsEl?.classList.remove('open');
        activeIndex = -1;
        searchInput.blur();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        activeIndex = Math.min(activeIndex + 1, items.length - 1);
        updateActiveResult(items, activeIndex);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        activeIndex = Math.max(activeIndex - 1, 0);
        updateActiveResult(items, activeIndex);
      } else if (e.key === 'Enter' && activeIndex >= 0 && items[activeIndex]) {
        e.preventDefault();
        const slug = (items[activeIndex] as HTMLElement).dataset.slug;
        if (slug) {
          navigate(`#/recipe/${slug}`);
          resultsEl?.classList.remove('open');
          searchInput.value = '';
          activeIndex = -1;
        }
      } else {
        activeIndex = -1;
      }
    });

    function updateActiveResult(items: NodeListOf<Element>, index: number): void {
      items.forEach((item, i) => {
        if (i === index) {
          item.classList.add('search-result-active');
          item.scrollIntoView({ block: 'nearest' });
        } else {
          item.classList.remove('search-result-active');
        }
      });
    }

    // Close search on click outside
    document.addEventListener('click', (e) => {
      const wrapper = document.querySelector('.search-wrapper');
      if (wrapper && !wrapper.contains(e.target as Node)) {
        const results = document.getElementById('search-results');
        results?.classList.remove('open');
      }
    });
  });
}

// Initialize
renderApp();
setupDelegatedClicks();
initRouter(renderContent);
renderContent();
