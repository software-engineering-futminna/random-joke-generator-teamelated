/**
 * Favorites View - Renders saved favorite jokes with removal option
 */

import { state, removeFavorite } from '../state.js';

export function renderFavorites() {
  const feedView = document.getElementById('feed-view');
  const categoriesView = document.getElementById('categories-view');
  const favoritesView = document.getElementById('favorites-view');

  if (feedView) feedView.style.display = 'none';
  if (categoriesView) categoriesView.style.display = 'none';
  if (favoritesView) favoritesView.style.display = 'block';

  updateNavState('#/favorites');

  const container = document.getElementById('favorites-list');
  if (!container) return;

  if (state.favorites.length === 0) {
    container.innerHTML = `
      <div class="favorites-empty">
        <i data-lucide="bookmark-x" style="width:36px;height:36px;color:var(--ds-gray-500);margin-bottom:12px;"></i>
        <h3>No saved jokes yet</h3>
        <p>Click the bookmark icon on any joke in your feed to save it here.</p>
      </div>
    `;
    if (window.lucide) window.lucide.createIcons();
    return;
  }

  container.innerHTML = state.favorites.map(joke => {
    let bodyHTML = '';
    if (joke.type === 'single') {
      bodyHTML = `<p class="joke-single">${escapeHTML(joke.joke)}</p>`;
    } else if (joke.type === 'twopart') {
      bodyHTML = `
        <div class="joke-twopart">
          <p class="setup">${escapeHTML(joke.setup)}</p>
          <div class="delivery-box">
            <span class="delivery-label">Output</span>
            <p>${escapeHTML(joke.delivery)}</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="joke-card favorite-card" data-id="${joke.id}">
        <div class="card-top-bar">
          <span class="card-tag">#${joke.category} — ID #${joke.id}</span>
          <button class="remove-fav-btn" data-id="${joke.id}" title="Remove from favorites">
            <i data-lucide="trash-2"></i>
          </button>
        </div>
        <div class="joke-body">
          ${bodyHTML}
        </div>
      </div>
    `;
  }).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Attach delete handlers
  const deleteBtns = container.querySelectorAll('.remove-fav-btn');
  deleteBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const jokeId = parseInt(btn.getAttribute('data-id'), 10);
      removeFavorite(jokeId);
      renderFavorites();
    });
  });
}

function escapeHTML(str) {
  if (!str) return '';
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

function updateNavState(currentHash) {
  const navLinks = document.querySelectorAll('nav a');
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentHash) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
