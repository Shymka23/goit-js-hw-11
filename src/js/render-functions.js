// Імпортуємо бібліотеку SimpleLightbox та її стилі
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Ініціалізуємо lightbox для всіх посилань всередині елементу з класом .gallery
// captionsData: 'alt' — використовує текст з атрибута alt для підпису
// captionDelay: 250 — затримка перед відображенням підпису (у мс)
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Функція створення галереї з масиву зображень
export function createGallery(images) {
  // Знаходимо контейнер галереї
  const gallery = document.querySelector('.gallery');

  // Генеруємо HTML-розмітку для кожного зображення
  const markup = images
    .map(
      image => `
      <li class="gallery-item">
        <a href="${image.largeImageURL}">
          <img
            src="${image.webformatURL}"
            alt="${image.tags}"
            class="gallery-image"
          />
          <div class="image-info">
            <p><b>Likes:</b>👍 ${image.likes}</p>
            <p><b>Views:</b>👀 ${image.views}</p>
            <p><b>Comments:</b>💬 ${image.comments}</p>
            <p><b>Downloads:</b>⬇️ ${image.downloads}</p>
          </div>
        </a>
      </li>
    `
    )
    .join('');

  // Додаємо згенеровану розмітку в кінець галереї
  gallery.insertAdjacentHTML('beforeend', markup);

  // Оновлюємо lightbox, щоб нові елементи працювали
  lightbox.refresh();
}

// Функція очищення галереї
export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = ''; // Видаляємо весь вміст галереї
}

// Функція показу завантажувача
export function showLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'block'; // Робимо завантажувач видимим
}

// Функція приховування завантажувача
export function hideLoader() {
  const loader = document.querySelector('.loader');
  loader.style.display = 'none'; // Ховаємо завантажувач
}
