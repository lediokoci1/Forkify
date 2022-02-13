import { API_URL, API_URL_RECIPE, RES_PER_PAGE, API_KEY } from './config.js';
import { AJAX } from './helpers.js';
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
const createRecipeObject = function (recipe) {
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: 4, // default Value
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  try {
    console.log(id);
    this.state.tempserving = 4;
    const data = await AJAX(`${API_URL_RECIPE}${id}`);
    console.log(data);
    state.recipe = {
      id: data.recipe_id,
      title: data.title,
      publisher: data.publisher,
      sourceUrl: data.source_url,
      image: data.image_url,
      servings: 4, // default Value
      cookingTime: data.cooking_time,
      ingredients: data.ingredients,
    };
    if (state.bookmarks.some(b => b.id === id)) {
      state.recipe.bookmark = true;
    } else {
      state.recipe.bookmark = false;
    }
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

export const loadSearchResults = async function (input) {
  try {
    state.search.input = input;
    const data = await AJAX(
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
  console.log(recipe);
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

const clearBookmarks = function () {
  localStorage.clear('bookmarks');
};
// clearBookmarks();

export const uploadRecipe = async function (newRecipe) {
  try {
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
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    const res = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    if (res && res.data) {
      state.recipe = createRecipeObject(res.data.recipe);
    }
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
};
