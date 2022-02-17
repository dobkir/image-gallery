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

  // Ввожу массив номеров страниц
  const pageNumbersArr = []

  // Заполняю массив номеров страниц номерами, пока их число не будет равно
  // общему числу страниц, которое получаю из API в аргументе 'total_pages'
  // Итерацию начинаю с единицы, чтобы сразу корректно выводить нумерацию в UI (с 1, а не с 0)
  for (let pageNumber = 1; pageNumber <= total_pages; pageNumber++) {
    pageNumbersArr.push(pageNumber)
  }

  // Определяю крайнюю левую и крайнюю правую границы диапазона пагинации
  // Определяю размер диапазона пагинации в константе 'paginationRange'
  let leftmostPageNumber = 1
  let rightmostPageNumber = total_pages
  const paginationRange = 9

  // Если общее кол-во страниц меньше или равно размеру диапазона пагинации
  if (total_pages <= paginationRange) {
    leftmostPageNumber = 1
    rightmostPageNumber = paginationRange
    // Если общее кол-во страниц превысило размер диапазона пагинации
  } else {
    // Ввожу две новых переменных, которые определяют сколько номеров страниц
    // должно быть до номера актуальной страницы, и сколько после него
    let numbersBeforeCurrentPage = Math.floor(paginationRange / 2)
    let numbersAfterCurrentPage = Math.ceil(paginationRange / 2) - 1

    // Если номер актуальной страницы меньше, или равен числу номеров страниц,
    // которые должны быть до него (например, первая страница), то крайний
    // правый номер страницы будет равен размеру диапазона пагинации
    if (currentPage <= numbersBeforeCurrentPage) {
      leftmostPageNumber = 1
      rightmostPageNumber = paginationRange
      // Если номер актуальной страницы в сумме с числом номеров страниц, которые
      // должны быть после него больше, ил равен общему кол-ву страниц, то крайнее
      // левое число диапазона будет общее кол - во страниц вычесть размер диапазона пагинации + 1
    } else if ((currentPage + numbersAfterCurrentPage) >= total_pages) {
      leftmostPageNumber = total_pages - paginationRange + 1
      rightmostPageNumber = total_pages
      // Во всех остальных случаях крайний левый и крайний правый номер страницы
      // вычисляются по обычному алгоритсу
    } else {
      leftmostPageNumber = currentPage - numbersBeforeCurrentPage
      rightmostPageNumber = currentPage + numbersAfterCurrentPage
    }
  }

  // Вывод пагинации в UI
  const gettingPagination = pageNumbersArr
    // Определяю диапазон вывода номеров страниц
    .filter(pageNumber => pageNumber >= leftmostPageNumber && pageNumber <= rightmostPageNumber)
    // Вывожу определённый выше диапазон через теги в UI
    .map(pageNumber => {
      // Номер страницы в выводимом диапазоне, который совпадает с номером страницы, отображаемой сейчас на экране,
      // стилизую как активную ссылку, остальные выводятся как обычно
      if (pageNumber === currentPage) {
        return pagination.insertAdjacentHTML('beforeend', `<li class="page-link active-link">${pageNumber}</li>`)
      } else {
        return pagination.insertAdjacentHTML('beforeend', `<li class="page-link">${pageNumber}</li>`)
      }
    })

  if (total_pages) outputTotalPagesNumber(total_pages)

  if (currentPage !== 1)
    pagination.insertAdjacentHTML('afterbegin', `<li class="prev-page"> &laquo; </li>`)

  if (total_pages && currentPage !== total_pages)
    pagination.insertAdjacentHTML('beforeend', `<li class="next-page"> &raquo; </li>`)

  return gettingPagination
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
