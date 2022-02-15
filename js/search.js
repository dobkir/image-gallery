import { getNewQuery } from "./fetch-images.js"

const searchForm = document.querySelector('.search-form')
const searchField = searchForm.querySelector('.search-field')
const resetButton = searchForm.querySelector('.clear-button')

export default function handleSearchForm() {

  function getRequestTextFromInput(formNode) {
    const data = new FormData(formNode)
    let query = Array.from(data.entries())[0][1]
    return query
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    const data = getRequestTextFromInput(event.target)
    const searchResult = getNewQuery(data)
    return searchResult
  }

  function showResetButton() {
    if (searchField.value.length) {
      resetButton.classList.remove('hidden')
    } else {
      resetButton.classList.add('hidden')
    }
  }

  function resetInput() {
    searchField.value = searchField.defaultValue
    showResetButton()
  }

  searchForm.addEventListener('submit', handleFormSubmit)

  searchField.addEventListener('keyup', showResetButton)
  searchField.addEventListener('click', showResetButton)
  resetButton.addEventListener('click', resetInput)
}
