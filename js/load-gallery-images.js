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
  imageDownloadLink,
  description,
  authorName,
  authorAvatarSmall,
  authorPageLink,
  userLocation
) {
  const image = `
  <figure class="gallery-image_container" itemprop="image" itemscope itemtype="https://schema.org/ImageObject">
    <a class="image-link" href="${imageLink}" target="_blank" title="View the foto by ${authorName} from ${userLocation}" itemprop="contentUrl">
      <img class="gallery-image" src="${imageURL}" alt="${description}" width="456" height="320" itemprop="thumbnailUrl">
    </a>
    <div class="gallery-image_info">
      <a class="author-link" href="${authorPageLink}" target="_blank" itemprop="author" title="View the author's profile">
        <img class="author-avatar" src="${authorAvatarSmall}" alt="Go to ${authorName} profile" width="32" height="32">
        <p class="author-about">
          <span class="author-name">${authorName}</span>
          <span class="author-location" itemprop="contentLocation" data-theme="author-about">from ${userLocation}</span>
        </p>
      </a>
      <a class="download-link" href="${imageDownloadLink}" download rel="nofollow" title="Download this image">
        <button class="download-button"></button>
      </a>
    </div>
  </figure>`
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
