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

function loadGalleryImages(
  imageURL,
  imageLink,
  description,
  creator,
  location
) {
  const image = `
  <a class="image-link" href="${imageLink}" target="_blank" data-theme="image-link" title="View the foto by ${creator} from ${location}">
  <img class="gallery-image" src="${imageURL}" alt="${description}" width="456" height="320">
  </a>`
  gallery.insertAdjacentHTML('beforeend', image)
}

function clearGallery() {
  gallery.innerHTML = ''
}

function reportMissingData() {
  const message = `
  <div style="text-align: center;">
  <p>No matches found</p>
  <p>Try to input another query</p></div>`
  gallery.insertAdjacentHTML('beforeend', message)
}

export { loadGalleryTitle, loadGalleryImages, clearGallery, reportMissingData }
