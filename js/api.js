/**
 * JokeAPI Wrapper (https://www.jokeapi.dev)
 */

const BASE_URL = 'https://v2.jokeapi.dev';

/**
 * Fetch a joke from JokeAPI based on options.
 * @param {Object} options
 * @param {string} [options.category] - Category name (e.g., Programming, Misc, Dark, Pun, Spooky, Christmas, Any)
 * @param {boolean} [options.safeMode] - Whether safe-mode parameter is appended
 * @returns {Promise<Object>} Joke object or error object
 */
export async function getJoke(options = {}) {
  const category = options.category || 'Any';
  let url = `${BASE_URL}/joke/${encodeURIComponent(category)}`;
  
  const params = new URLSearchParams();
  if (options.safeMode) {
    params.append('safe-mode', '');
  }

  const queryString = params.toString();
  if (queryString) {
    url += `?${queryString}`;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching joke:', error);
    return {
      error: true,
      message: 'Failed to fetch joke. Please check your internet connection and try again.'
    };
  }
}

/**
 * Fetch categories from JokeAPI.
 * @returns {Promise<Object>} Categories data
 */
export async function getCategories() {
  try {
    const response = await fetch(`${BASE_URL}/categories`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      error: true,
      categories: ['Programming', 'Misc', 'Dark', 'Pun', 'Spooky', 'Christmas']
    };
  }
}
