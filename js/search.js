import { getData } from "./get-data.js"

export default function handleSearchForm() {

  function getRequestTextFromInput(formNode) {
    const data = new FormData(formNode)
    let query = Array.from(data.entries())[0][1]
    return query
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    const data = getRequestTextFromInput(event.target)
    const searchResult = getData(data)
    return searchResult
  }

  const searchForm = document.querySelector('.search-form')
  searchForm.addEventListener('submit', handleFormSubmit)
}
