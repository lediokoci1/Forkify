import paginationView from './views/paginationView.js';
import resultsView from './views/resultsView.js';
import recipeView from './views/recipeView.js';
import bookmarksVeiw from './views/bookmarksVeiw.js';
import searchView from './views/searchView.js';
import * as model from './model.js';
import 'regenerator-runtime';
import 'core-js/stable';
if (module.hot) {
  module.hot.accept();
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    // Update results view to mark selected search result
    resultsView.update(model.getSearchResultPage());
    // Load the recipe:
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlAddBookmark = function () {
  if (model.state.recipe.bookmark) {
    model.removeBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  console.log(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controllSearchResult = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQueryInput();
    if (!query) return;
    await model.loadSearchResults(query);
    // Rendering results of search:
    resultsView.render(model.getSearchResultPage());
    paginationView.render(model.state.search);
  } catch (err) {
    throw err;
  }
};
const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Perditesojme perberesit e recetes ne State
  model.updateServings(newServings);
  // Perditesojme View e recetes
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView._addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controllSearchResult);
  paginationView.addHandlerClick(controlPagination);
  recipeView.render(model.state.recipe);
};
init();
