import { currentPage, setCurrentPage } from "./get-data.js"

const pagination = document.querySelector('.pagination')
let totalPagesOutput = document.querySelector('.total-pages')

function clearPagination() {
  pagination.innerHTML = ''
  hideTotalPagesNumber()
}

function showPagination(total_pages) {
  clearPagination()
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

  if (total_pages) outputTotalPagesNumber(total_pages)

  let pageLinks = Array.from(Array((endPage + 1) - startPage).keys()).map(i => {
    if (startPage + i === currentPage) {
      pagination.insertAdjacentHTML('beforeend', `<li class="page-link active-link">${startPage + i}</li>`)
    } else {
      pagination.insertAdjacentHTML('beforeend', `<li class="page-link">${startPage + i}</li>`)
    }
  })

  if (currentPage !== 1)
    pagination.insertAdjacentHTML('afterbegin', `<li class="prev-page"> &laquo; </li>`)

  if (total_pages && currentPage !== total_pages)
    pagination.insertAdjacentHTML('beforeend', `<li class="next-page"> &raquo; </li>`)

  return pageLinks
}

function showCurrentPage(event) {
  const target = event.target

  if (target.classList.contains('page-link')) {
    let currentPage = +target.textContent
    setCurrentPage(currentPage)
  }
}

function showPreviousPage(event) {
  const target = event.target

  if (target.classList.contains('prev-page')) {
    setCurrentPage(currentPage - 1)
  }
}

function showNextPage(event) {
  const target = event.target

  if (target.classList.contains('next-page')) {
    setCurrentPage(currentPage + 1)
  }
}

function showTotalPagesNumber() {
  if (totalPagesOutput.classList.contains('hidden')) {
    totalPagesOutput.classList.remove('hidden')
  }
}

function hideTotalPagesNumber() {
  totalPagesOutput.classList.add('hidden')
  totalPagesOutput.textContent = ''
}

function outputTotalPagesNumber(totalPages) {
  totalPagesOutput.textContent = ''
  showTotalPagesNumber()
  totalPagesOutput.textContent = `from ${totalPages} pages`
}


pagination.addEventListener('click', showCurrentPage)
pagination.addEventListener('click', showPreviousPage)
pagination.addEventListener('click', showNextPage)


export { showPagination }
