/**
 * State Management for DevJokes with LocalStorage Persistence for Favorites
 */

const STORAGE_KEY = 'devjokes_favorites';

function loadFavorites() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading favorites from localStorage:', err);
    return [];
  }
}

function saveFavorites(favorites) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  } catch (err) {
    console.error('Error saving favorites to localStorage:', err);
  }
}

export const state = {
  activeCategory: 'Programming',
  safeMode: true,
  favorites: loadFavorites()
};

export function setActiveCategory(category) {
  state.activeCategory = category;
}

export function setSafeMode(enabled) {
  state.safeMode = Boolean(enabled);
}

export function addFavorite(joke) {
  if (!joke || !joke.id) return;
  if (!isFavorite(joke.id)) {
    state.favorites.push(joke);
    saveFavorites(state.favorites);
  }
}

export function removeFavorite(jokeId) {
  state.favorites = state.favorites.filter(j => j.id !== jokeId);
  saveFavorites(state.favorites);
}

export function isFavorite(jokeId) {
  return state.favorites.some(j => j.id === jokeId);
}
