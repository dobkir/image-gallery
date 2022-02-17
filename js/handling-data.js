import { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData } from './load-gallery-images.js'
import { showPagination } from './pagination.js'
import { toggleSearchButton } from './search.js'

function handleData(query, fetchingData) {
  const totalPages = fetchingData.total_pages
  const fetchingImagesData = fetchingData.results
  clearGallery()
  toggleSearchButton()

  if (fetchingImagesData.length === 0) {
    reportMissingData()
  }

  loadGalleryTitle(query)
  showPagination(totalPages)
  fetchingImagesData.map(image => loadGalleryImages(
    // Used manual adjustment of image sizes to improve proportions.
    // 'fm' - it's the image format; 'w' - the image width;
    // Also, for small format images can be used:
    // 'image.urls.small', which returns the photo in jpg format with a width of 400 pixels
    // or 'image.urls.thumb', which returns the photo in jpg format with a width of 200 pixels
    image.urls.raw + "&fm=jpg&w=456&fit=max",
    image.links.html,
    image.links.download + "&force=true",
    image.alt_description || "Beautiful image without description",
    image.user.name || "Anonymous",
    image.user.profile_image.small,
    image.user.links.html,
    image.user.location || "planet Earth")
  )
}

export { handleData }
