/**
 * Categories View - 6-category picker with Lucide Icons
 */

import { state, setActiveCategory } from '../state.js';
import { navigate } from '../router.js';
import { fetchAndDisplayJoke } from './feed.js';

const CATEGORIES = [
  { 
    name: 'Programming', 
    description: 'Bugs, recursion, and compiler humor',
    icon: 'code-2'
  },
  { 
    name: 'Misc', 
    description: 'Random thoughts & tech life',
    icon: 'dices'
  },
  { 
    name: 'Dark', 
    description: 'Edgy humor & software realities',
    icon: 'moon'
  },
  { 
    name: 'Pun', 
    description: 'Witty wordplays & language puns',
    icon: 'message-square-code'
  },
  { 
    name: 'Spooky', 
    description: 'Deadlocks, legacy code & ghosts',
    icon: 'ghost'
  },
  { 
    name: 'Christmas', 
    description: 'Holiday cheer and festive tech jokes',
    icon: 'sparkles'
  }
];

export function renderCategories() {
  const feedView = document.getElementById('feed-view');
  const categoriesView = document.getElementById('categories-view');
  
  if (feedView) feedView.style.display = 'none';
  if (categoriesView) categoriesView.style.display = 'block';

  updateNavState('#/categories');

  const container = document.getElementById('categories-grid');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isSelected = state.activeCategory === cat.name;
    return `
      <div class="category-card ${isSelected ? 'selected' : ''}" data-category="${cat.name}">
        <span class="category-status">${isSelected ? 'ACTIVE' : ''}</span>
        <div class="category-icon-wrapper">
          <i data-lucide="${cat.icon}"></i>
        </div>
        <div class="category-details">
          <h3>${cat.name}</h3>
          <p>${cat.description}</p>
        </div>
      </div>
    `;
  }).join('');

  // Re-initialize Lucide Icons for dynamic elements
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const cards = container.querySelectorAll('.category-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const selectedCategory = card.getAttribute('data-category');
      const prevCategory = state.activeCategory;
      setActiveCategory(selectedCategory);

      const cardContent = document.getElementById('joke-card-content');
      if (cardContent && prevCategory !== selectedCategory) {
        delete cardContent.dataset.loaded;
      }

      navigate('#/feed');
      fetchAndDisplayJoke();
    });
  });
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
