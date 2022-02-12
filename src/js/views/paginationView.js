import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto; // equal with Number(btn.dataset.goto)
      handler(goToPage);
    });
  }
  _paggButtMarkup(currentPage, type) {
    let position = type === '+' ? currentPage + 1 : currentPage - 1;
    let paggBut =
      type === '+' ? ['next', 'arrow-right'] : ['prev', 'arrow-left'];
    return `
    <button data-goto='${position}' class="btn--inline pagination__btn--${paggBut[0]}">
    <span>Page${position}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-${paggBut[1]}"></use>
      </svg>
      </button>
  `;
  }

  _paggMarkup(currentPage, numPages) {
    // First page:
    if (currentPage === 1 && numPages > 1) {
      return this._paggButtMarkup(currentPage, '+');
    }
    // Last Page:
    if (currentPage === numPages && numPages > 1) {
      return this._paggButtMarkup(currentPage, '-');
    }
    // Other Pages:
    if (currentPage < numPages) {
      return `${this._paggButtMarkup(currentPage, '-')}
     ${this._paggButtMarkup(currentPage, '+')}
     `;
    }
    return '';
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    return this._paggMarkup(currentPage, numPages);
  }
}

export default new PaginationView();
