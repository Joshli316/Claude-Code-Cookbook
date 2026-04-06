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
    return { page: 'recipe', param: hash.replace('#/recipe/', '') };
  }
  if (hash.startsWith('#/category/')) {
    return { page: 'category', param: hash.replace('#/category/', '') };
  }

  return { page: 'home', param: '' };
}
