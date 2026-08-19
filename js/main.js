/**
 * Main Entry Point - Boots shell, wires nav clicks & router
 */

import { initRouter, registerRoute } from './router.js';
import { renderFeed, fetchAndDisplayJoke } from './views/feed.js';
import { renderCategories } from './views/categories.js';
import { renderFavorites } from './views/favorites.js';
import { setSafeMode } from './state.js';

document.addEventListener('DOMContentLoaded', () => {
  // Register routes
  registerRoute('#/feed', renderFeed);
  registerRoute('#/categories', renderCategories);
  registerRoute('#/favorites', renderFavorites);

  // Wire Safe Mode toggle listener in header
  const safeModeToggle = document.getElementById('safe-mode-toggle');
  if (safeModeToggle) {
    safeModeToggle.addEventListener('change', (e) => {
      setSafeMode(e.target.checked);
      // Fetch a new joke under updated safe mode filter
      const feedView = document.getElementById('feed-view');
      if (feedView && feedView.style.display !== 'none') {
        fetchAndDisplayJoke();
      }
    });
  }

  // Wire "Get New Joke" button
  const getJokeBtn = document.getElementById('get-joke-btn');
  if (getJokeBtn) {
    getJokeBtn.addEventListener('click', () => {
      fetchAndDisplayJoke();
    });
  }

  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Initialize router
  initRouter();
});
