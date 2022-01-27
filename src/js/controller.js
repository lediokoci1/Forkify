import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import * as model from './model.js';
import 'regenerator-runtime';
import 'core-js/stable';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Load the recipe:
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQueryInput();
    console.log(query);
    if (!query) return;
    await model.loadSearchResults(query);
    // Rendering results of search:
    resultsView.render(model.getSearchResultPage(2));
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlPagination = function () {
  console.log('Pagination controller');
};
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controllSearchResult);
  paginationView.addHandlerClick(controlPagination);
};
init();
