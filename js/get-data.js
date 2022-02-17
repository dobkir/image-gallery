import { toggleLoader } from './loader.js'
import { queryVariants } from './popular-variants-query-images.js'
import { toggleSearchButton } from './search.js'
import { handleData } from './handling-data.js'

const randomQueryNumber = Math.floor(Math.random() * queryVariants.length)
let currentQuery = queryVariants[randomQueryNumber]
let currentPage = 1

async function getData(query = currentQuery, page = currentPage) {
  toggleLoader()
  toggleSearchButton()
  const accessKey = '8EnJm5o8GKeVQ_y02NuOD2VtMkZxPLkEJ-TVkNjSaMs'
  const endpoint = '/search/photos?'
  const imagesPerPage = 12

  const baseUrl = 'https://api.unsplash.com'
  // Request parameters
  const queryParams = new URLSearchParams({
    query: query,
    page: page,
    per_page: imagesPerPage,
    order_by: 'relevant',
    orientation: 'landscape',
    client_id: accessKey,
  })
  const url = baseUrl + endpoint + queryParams.toString()

  // Requesting data from a remote server
  try {
    const response = await fetch(url)

    if (response.status != 200) {
      if (response.status === 403) {
        alert(`HTTP-Error: ${response.status}. There are too many queries per hour. Please, try again later!`)
      } else {
        alert(`HTTP-Error: ${response.status}. We are already working on it`)
      }
      return null
    } else {
      const data = await response.json()

      if (currentQuery != query) {
        currentQuery = query
        setCurrentPage(1)
      }
      //Handling the fetching data
      handleData(query, data)
      toggleLoader()
    }

  } catch (error) {
    alert(`Oops, there's some problem here: ${error.name}. ${error.message}`)
    console.error("Error fetching data from server!")
    console.warn("What's wrong with getting data:", error.message)
  }
}

function setNewQuery(newQuery) {
  return getData(newQuery, currentPage)
}

function setCurrentPage(pageNumber) {
  currentPage = pageNumber
  return getData(currentQuery, pageNumber)
}

export { getData, setNewQuery, setCurrentPage, currentPage }
