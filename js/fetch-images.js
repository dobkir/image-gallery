import { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData } from './load-gallery-images.js'
import { toggleLoader } from './loader.js'
import { hidePagination, showPagination } from './pagination.js'
import { queryVariants } from './popular-variants-query-images.js'
import { toggleSearchButton } from './search.js'

const randomQueryNumber = Math.floor(Math.random() * queryVariants.length)
let currentQuery = queryVariants[randomQueryNumber]
let currentPage = 1

async function fetchImages(query = currentQuery, page = currentPage) {
  const accessKey = '8EnJm5o8GKeVQ_y02NuOD2VtMkZxPLkEJ-TVkNjSaMs'
  toggleLoader()
  toggleSearchButton()
  let imagesPerPage = 12
  let imageOrientation = 'landscape'
  let url = 'https://api.unsplash.com/search/photos?query=' +
    query +
    '&page=' +
    page +
    '&per_page=' +
    imagesPerPage +
    '&orientation=' +
    imageOrientation +
    '&client_id=' +
    accessKey

  try {
    const res = await fetch(url)

    if (res.status != 200) {
      if (res.status === 403) {
        alert(`HTTP-Error: ${res.status}. There are too many queries per hour. Please, try again later!`)
      } else {
        alert(`HTTP-Error: ${res.status}. We are already working on it`)
      }
      return null
    } else {
      const data = await res.json()
      const totalPages = data.total_pages
      const receivedImages = data.results
      clearGallery()
      toggleSearchButton()
      if (receivedImages.length === 0) {
        reportMissingData()
        hidePagination()
        console.log(receivedImages.length)
      }
      if (currentQuery != query) {
        currentQuery = query
        getCurrentPage(1)
      }
      loadGalleryTitle(query)
      showPagination(totalPages)
      receivedImages.map(image => loadGalleryImages(image.urls.regular, image.alt_description))
      toggleLoader()
    }

  } catch (error) {
    alert(`Oops, any problem here: ${error.name}. ${error.message}`)
    console.error("Error fetching data from server!")
    console.warn("What's wrong with getting data:", error.message)
  }
}

function getNewQuery(newQuery) {
  return fetchImages(newQuery, currentPage)
}

function getCurrentPage(pageNumber) {
  currentPage = pageNumber
  return fetchImages(currentQuery, pageNumber)
}

export { fetchImages, getNewQuery, getCurrentPage, currentPage }
