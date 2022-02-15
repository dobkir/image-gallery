import { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData } from './load-gallery-images.js'
import { toggleLoader } from './loader.js'
import { showPagination } from './pagination.js'

let currentQuery = 'latest'
let currentPage = 1

async function fetchImages(query = currentQuery, page = currentPage) {
  const accessKey = '8EnJm5o8GKeVQ_y02NuOD2VtMkZxPLkEJ-TVkNjSaMs'
  toggleLoader()
  let imagesPerPage = '9'
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
      alert(`HTTP-Error: ${res.status}. We are already working on it`)
      return null
    } else {
      const data = await res.json()
      const totalPages = data.total_pages
      const receivedImages = data.results
      clearGallery()
      if (receivedImages.length === 0) reportMissingData()
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
