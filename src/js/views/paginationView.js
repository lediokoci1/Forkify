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

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.result.length / this._data.resultsPerPage
    );
    // Faqa e Pare
    if (currentPage === 1 && numPages > 1) {
      return `
            <button data-goto='${
              currentPage + 1
            }' class="btn--inline pagination__btn--next">
            <span>Page${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
            `;
    }
    // Faqa e Fundit
    if (currentPage === numPages && numPages > 1) {
      return `<button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${currentPage - 1}</span>
          </button>
        </button>
   `;
    }
    // Faqe te tjera
    if (currentPage < numPages) {
      return `<button data-goto='${
        currentPage - 1
      }' class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>
    <button data-goto='${
      currentPage + 1
    }' class="btn--inline pagination__btn--next">
    <span>Page${currentPage + 1}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
  </button>`;
    }
    return '';
  }
}

export default new PaginationView();
