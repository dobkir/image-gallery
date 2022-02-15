import { currentPage, getCurrentPage } from "./fetch-images.js"

const pagination = document.querySelector('.pagination')

function showPagination(total_pages) {
  pagination.innerHTML = ''
  pagination.classList.remove('hidden')
  let startPage = 1
  let endPage = total_pages
  const maxPages = 9

  if (total_pages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1
    endPage = total_pages
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2)
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1
      endPage = maxPages
    } else if (currentPage + maxPagesAfterCurrentPage >= total_pages) {
      // current page near the end
      startPage = total_pages - maxPages + 1
      endPage = total_pages
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage
      endPage = currentPage + maxPagesAfterCurrentPage
    }
  }

  outputTotalPagesNumber(total_pages)

  let pageLinks = Array.from(Array((endPage + 1) - startPage).keys()).map(i => {
    if (startPage + i === currentPage) {
      pagination.insertAdjacentHTML('beforeend', `<li class="page-link active-link">${startPage + i}</li>`)
    } else {
      pagination.insertAdjacentHTML('beforeend', `<li class="page-link">${startPage + i}</li>`)
    }
  })

  if (currentPage !== 1)
    pagination.insertAdjacentHTML('afterbegin', `<li class="prev-page"> &laquo; </li>`)

  if (currentPage !== total_pages)
    pagination.insertAdjacentHTML('beforeend', `<li class="next-page"> &raquo; </li>`)

}

function showCurrentPage(event) {
  const target = event.target

  if (target.classList.contains('page-link')) {
    let currentPage = +target.textContent
    getCurrentPage(currentPage)
  }
}

function showPreviousPage(event) {
  const target = event.target

  if (target.classList.contains('prev-page')) {
    getCurrentPage(currentPage - 1)
  }
}

function showNextPage(event) {
  const target = event.target

  if (target.classList.contains('next-page')) {
    getCurrentPage(currentPage + 1)
  }
}

function outputTotalPagesNumber(totalPages) {
  let totalPagesOutput = document.querySelector('.total-pages')
  if (totalPagesOutput.classList.contains('hidden')) {
    totalPagesOutput.classList.remove('hidden')
  }
  totalPagesOutput.textContent = ''
  totalPagesOutput.textContent = `from ${totalPages} pages`
}

function listenPagination() {
  pagination.addEventListener('click', showCurrentPage)
  pagination.addEventListener('click', showPreviousPage)
  pagination.addEventListener('click', showNextPage)
}


export { showPagination, listenPagination }
