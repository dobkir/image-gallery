const galleryTitle = document.querySelector('.gallery-title')
const gallery = document.querySelector('.gallery')

function makeFirstCharUppercase(str) {
  if (!str) return str
  return str[0].toUpperCase() + str.slice(1)
}

function loadGalleryTitle(fetchingQuery) {
  galleryTitle.textContent = ''
  galleryTitle.textContent = `Gallery: ${makeFirstCharUppercase(fetchingQuery)}`
}

function loadGalleryImages(imageURL) {
  const image = `<img class="gallery-image" src=${imageURL} alt="gallery image" width="456" height="320">`
  gallery.insertAdjacentHTML('beforeend', image)
}

function clearGallery() {
  gallery.innerHTML = ''
}

function reportMissingData() {
  const message = `<p>No matches found</p>`
  gallery.insertAdjacentHTML('beforeend', message)
}

export { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData }
