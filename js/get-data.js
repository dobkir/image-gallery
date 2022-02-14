import { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData } from './load-gallery-images.js'
import { toggleLoader } from './loader.js'

async function getData(query = 'latest') {
  const accessKey = '8EnJm5o8GKeVQ_y02NuOD2VtMkZxPLkEJ-TVkNjSaMs'
  toggleLoader()
  let imagesPerPage = '9'
  let imageOrientation = 'landscape'
  let url = 'https://api.unsplash.com/search/photos?query=' +
    query +
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
      const receivedImages = data.results
      clearGallery()
      if (receivedImages.length === 0) reportMissingData()
      loadGalleryTitle(query)
      receivedImages.map(image => loadGalleryImages(image.urls.regular))
      toggleLoader()
    }

  } catch (error) {
    alert(`Oops, any problem here: ${error.name}. ${error.message}`)
    console.error("Error fetching data from server!")
    console.warn("What's wrong with getting data:", error.message)
  }
}

export { getData }
