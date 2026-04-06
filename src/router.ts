// Hash-based SPA router

type RouteCallback = () => void;

let onRouteChange: RouteCallback | null = null;

export function initRouter(callback: RouteCallback): void {
  onRouteChange = callback;
  window.addEventListener('hashchange', () => {
    if (onRouteChange) onRouteChange();
  });
}

export function navigate(hash: string): void {
  window.location.hash = hash;
}

export function getCurrentRoute(): { page: string; param: string } {
  const hash = window.location.hash || '#/';

  if (hash === '#/' || hash === '') {
    return { page: 'home', param: '' };
  }
  if (hash.startsWith('#/recipe/')) {
    const slug = hash.replace('#/recipe/', '');
    if (/^[a-z0-9-]+$/.test(slug)) {
      return { page: 'recipe', param: slug };
    }
    return { page: 'home', param: '' };
  }
  if (hash.startsWith('#/category/')) {
    const cat = hash.replace('#/category/', '');
    if (['workflow', 'code', 'design'].includes(cat)) {
      return { page: 'category', param: cat };
    }
    return { page: 'home', param: '' };
  }

  return { page: 'home', param: '' };
}
