import { setNewQuery } from "./get-data.js"

const searchForm = document.querySelector('.search-form')
const searchField = searchForm.querySelector('.search-field')
const searchButton = searchForm.querySelector('.search-button')
const resetButton = searchForm.querySelector('.clear-button')

function toggleSearchButton() {
  if (searchButton.disabled) {
    searchButton.disabled = false
  } else {
    searchButton.disabled = true
  }
}

function handleSearchForm() {

  function getRequestTextFromInput(formNode) {
    const data = new FormData(formNode)
    let query = Array.from(data.entries())[0][1]
    return query
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    const data = getRequestTextFromInput(event.target)
    if (data) {
      const searchResult = setNewQuery(data)
      return searchResult
    } else {
      toggleSearchButton()
      alert("You can't send an empty request")
    }
    toggleSearchButton()
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

export { toggleSearchButton, handleSearchForm }
