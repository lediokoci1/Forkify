import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    // Faqa e pare
    if (this._data.page === 1 && numPages > 1) {
      return 'page1 , ....';
    }
    // Faqa e fundit:
    if (this._data.page === numPages && numPages > 1) {
      return 'last page';
    }
    // Faqe te tjera
    if (this._data.page < numPages) {
      return '...';
    }
  }
}

export default new PaginationView();
