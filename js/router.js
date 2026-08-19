/**
 * Simple Hash-based Router
 */

const routes = {};

export function registerRoute(path, renderFunction) {
  routes[path] = renderFunction;
}

export function navigate(path) {
  window.location.hash = path;
}

export function handleRoute() {
  const hash = window.location.hash || '#/feed';
  const renderFn = routes[hash] || routes['#/feed'];
  if (renderFn) {
    renderFn();
  }
}

export function initRouter() {
  window.addEventListener('hashchange', handleRoute);
  // Initial load navigation
  if (!window.location.hash) {
    window.location.hash = '#/feed';
  } else {
    handleRoute();
  }
}
