import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
// Important Data stay in the state:
export const state = {
  tempserving: 4,
  recipe: {
    servings: 4,
    bookmark: false,
  },
  search: {
    input: '',
    result: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
  bookmarks: [],
};
export const loadRecipe = async function (id) {
  try {
    this.state.tempserving = 4;
    const data = await getJSON(`${API_URL}${id}`);
    const { recipe } = data;
    state.recipe = {
      id: recipe.recipe_id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: 4, // default Value
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmark = true;
    } else {
      state.recipe.bookmark = false;
    }
  } catch (error) {
    throw err;
  }
};

export const loadSearchResults = async function (input) {
  try {
    state.search.input = input;
    const data = await getJSON(
      `https://forkify-api.herokuapp.com/api/search?q=${input}`
    );
    state.search.page = 1;
    state.search.result = data.recipes.map(rec => {
      return {
        id: rec.recipe_id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (state.search.page - 1) * state.search.resultsPerPage;
  const end = state.search.page * state.search.resultsPerPage;
  return state.search.result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.tempserving = newServings / state.recipe.servings;
  state.recipe.servings = newServings;
};

const persistBookmarks = function () {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};
export const addBookmark = function (recipe) {
  // add Bookmark in state
  state.bookmarks.push(recipe);
  // Mark current recipe as bookmark
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmark = true;
  }

  persistBookmarks();
};
export const removeBookmark = function (id) {
  const index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  if (id === state.recipe.id) {
    state.recipe.bookmark = false;
  }

  persistBookmarks();
};

const onInit = function () {
  const storage = localStorage.getItem('bookmarks');
  if (storage) {
    state.bookmarks = JSON.parse(storage);
  }
};
onInit();
console.log(state.bookmarks);
const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  const ingredients = Object.entries(newRecipe)
    .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
    .map(ing => {
      const ingArr = ing[1].replaceAll(' ', '').split(',');
      if (ingArr.length !== 3)
        throw new Error(
          'Wrong ingredient format! Pleaseuse the correct format'
        );
      const [quantity, unit, description] = ing[1]
        .replaceAll(' ', '')
        .split(',');
      return { quantity: quantity ? +quantity : null, unit, description };
    });
  console.log(ingredients);
};
