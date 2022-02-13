import paginationView from './views/paginationView.js';
import bookmarksVeiw from './views/bookmarksVeiw.js';
import addRecipeView from './views/addRecipeView';
import { MODAL_CLOSE_SECONDS } from './config.js';
import resultsView from './views/resultsView.js';
import recipeView from './views/recipeView.js';
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

    bookmarksVeiw.update(model.state.bookmarks);
    // Load the recipe:
    await model.loadRecipe(id);
    // rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlBookmarks = function () {
  bookmarksVeiw.render(model.state.bookmarks);
};

const controlAddBookmark = function () {
  debugger;
  if (model.state.recipe.bookmark) {
    model.removeBookmark(model.state.recipe.id);
  } else {
    model.addBookmark(model.state.recipe);
  }
  recipeView.update(model.state.recipe);
  bookmarksVeiw.render(model.state.bookmarks);
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
    resultsView.renderError();
    throw err;
  }
};

const controlPagination = function (goToPage) {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update Servings:
  model.updateServings(newServings);
  // Update the view of Recipe:
  recipeView.update(model.state.recipe);
};

const controlAddRecipe = async function (newRecipe) {
  try {
    // Load the spinner:
    addRecipeView.renderSpinner();

    //upload the new recipe
    await model.uploadRecipe(newRecipe);

    // render recipeView
    recipeView.render(model.state.recipe);

    // Success message:
    addRecipeView.renderMessage();

    // render the bookmarks
    bookmarksVeiw.render(model.state.bookmarks);

    // close modal after 2.5seconds
    setTimeout(function () {
      // Close modal:
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SECONDS * 1000);

    // window.history.pushState( STATE , TITLE , URL  )
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
  } catch (err) {
    addRecipeView.renderError(err.message);
    throw err;
  }
};
const init = function () {
  bookmarksVeiw.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView._addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controllSearchResult);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
