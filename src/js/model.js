import { API_URL, RES_PER_PAGE } from './config.js';
import { getJSON } from './helpers.js';
// Important Data stay in the state:
export const state = {
  recipe: {
    servings: 4,
  },
  search: {
    input: '',
    result: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
  },
};
export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    console.log(data);
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
  state.recipe.ingredients = state.recipe.ingredients.map(
    ing => `${newServings / state.recipe.servings}( ${ing} )`
  );

  state.recipe.servings = newServings;
};
