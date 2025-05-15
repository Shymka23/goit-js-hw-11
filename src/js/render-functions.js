import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryEl = document.getElementById('gallery');
let lightbox;

export function createGallery(images) {
  const markup = images
    .map(
      image => `
    <li class="gallery-item">
      <a href="${image.largeImageURL}">
        <img src="${image.webformatURL}" alt="${image.tags}" />
        <div class="info">
          <p>Likes:👍 ${image.likes}</p>
          <p>Views:👀 ${image.views}</p>
          <p>Comments:💬 ${image.comments}</p>
          <p>Downloads:⬇️ ${image.downloads}</p>
        </div>
      </a>
    </li>
  `
    )
    .join('');

  galleryEl.innerHTML = markup;

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionPosition: 'bottom',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  galleryEl.innerHTML = '';
}

export function showLoader() {
  document.getElementById('loader').style.display = 'flex';
}

export function hideLoader() {
  document.getElementById('loader').style.display = 'none';
}
