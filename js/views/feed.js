/**
 * Feed View - Render joke card, "Get New Joke" button, Safe Mode toggle & Favorite bookmark
 */

import { getJoke } from '../api.js';
import { state, addFavorite, removeFavorite, isFavorite } from '../state.js';

let isFetching = false;
let currentJoke = null;

export function renderFeed() {
  const feedView = document.getElementById('feed-view');
  const categoriesView = document.getElementById('categories-view');
  const favoritesView = document.getElementById('favorites-view');
  
  if (feedView) feedView.style.display = 'flex';
  if (categoriesView) categoriesView.style.display = 'none';
  if (favoritesView) favoritesView.style.display = 'none';

  updateNavState('#/feed');

  // Sync Safe Mode checkbox in header
  const safeToggle = document.getElementById('safe-mode-toggle');
  if (safeToggle) {
    safeToggle.checked = state.safeMode;
  }

  // Update feed category pill
  const activeCatEl = document.getElementById('active-category-name');
  if (activeCatEl) {
    activeCatEl.textContent = state.activeCategory;
  }

  // If card has not fetched initial joke yet
  const cardContent = document.getElementById('joke-card-content');
  if (cardContent && !cardContent.dataset.loaded) {
    fetchAndDisplayJoke();
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

export async function fetchAndDisplayJoke() {
  if (isFetching) return;
  isFetching = true;

  const cardContent = document.getElementById('joke-card-content');
  const fetchBtn = document.getElementById('get-joke-btn');

  if (fetchBtn) {
    fetchBtn.disabled = true;
    fetchBtn.innerHTML = `
      <div class="spinner" style="width:14px;height:14px;border-width:2px;"></div>
      <span>Fetching...</span>
    `;
  }

  if (cardContent) {
    cardContent.innerHTML = `
      <div class="card-loading">
        <div class="spinner"></div>
        <p style="color: var(--ds-gray-600); font-size:0.85rem;">Fetching joke...</p>
      </div>
    `;
  }

  const result = await getJoke({
    category: state.activeCategory,
    safeMode: state.safeMode
  });

  isFetching = false;
  currentJoke = result;

  if (fetchBtn) {
    fetchBtn.disabled = false;
    fetchBtn.innerHTML = `
      <i data-lucide="refresh-cw"></i>
      <span>Get New Joke</span>
    `;
  }

  if (!cardContent) return;

  cardContent.dataset.loaded = "true";

  if (result.error) {
    cardContent.innerHTML = `
      <div class="error-state">
        <p style="font-weight:500; font-size: 0.9rem; margin-bottom: 12px;">⚠️ ${result.message || 'Could not connect to JokeAPI.'}</p>
        <button id="retry-btn" class="primary-btn" style="height: 36px; font-size:0.8rem; width: auto; padding: 0 16px;">Try Again</button>
      </div>
    `;
    const retryBtn = document.getElementById('retry-btn');
    if (retryBtn) retryBtn.addEventListener('click', fetchAndDisplayJoke);
    return;
  }

  let jokeBodyHTML = '';
  if (result.type === 'single') {
    jokeBodyHTML = `
      <div class="joke-body">
        <div class="joke-single">
          <p>${escapeHTML(result.joke)}</p>
        </div>
      </div>
    `;
  } else if (result.type === 'twopart') {
    jokeBodyHTML = `
      <div class="joke-body">
        <div class="joke-twopart">
          <p class="setup">${escapeHTML(result.setup)}</p>
          <div class="delivery-box">
            <span class="delivery-label">Output</span>
            <p>${escapeHTML(result.delivery)}</p>
          </div>
        </div>
      </div>
    `;
  }

  const flags = result.flags ? Object.keys(result.flags).filter(f => result.flags[f]) : [];
  const flagsHTML = flags.length > 0
    ? `<div class="card-footer-flags">${flags.map(f => `<span class="flag-badge">${f}</span>`).join('')}</div>`
    : '';

  const favActive = isFavorite(result.id);

  cardContent.innerHTML = `
    <div class="card-top-bar">
      <span class="card-tag">ID #${result.id || 'dev'}</span>
      <div style="display:flex; align-items:center; gap: 8px;">
        <span class="card-badge">${result.safe ? 'Safe' : 'Explicit'}</span>
        <button id="fav-btn" class="fav-toggle-btn ${favActive ? 'active' : ''}" title="${favActive ? 'Remove from favorites' : 'Bookmark joke'}">
          <i data-lucide="${favActive ? 'bookmark-check' : 'bookmark'}"></i>
        </button>
      </div>
    </div>
    ${jokeBodyHTML}
    ${flagsHTML}
  `;

  // Attach favorite button click listener
  const favBtn = document.getElementById('fav-btn');
  if (favBtn) {
    favBtn.addEventListener('click', () => {
      if (isFavorite(result.id)) {
        removeFavorite(result.id);
        favBtn.classList.remove('active');
        favBtn.innerHTML = `<i data-lucide="bookmark"></i>`;
        favBtn.title = 'Bookmark joke';
      } else {
        addFavorite(result);
        favBtn.classList.add('active');
        favBtn.innerHTML = `<i data-lucide="bookmark-check"></i>`;
        favBtn.title = 'Remove from favorites';
      }
      if (window.lucide) window.lucide.createIcons();
    });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
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
