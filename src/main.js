import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

const form = document.getElementById('search-form');

form.addEventListener('submit', async e => {
  e.preventDefault();

  const query = form.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
    return;
  }

  showLoader();
  clearGallery();

  try {
    const images = await getImagesByQuery(query);
    if (images.length === 0) {
      iziToast.error({
        title: 'Error',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }
    createGallery(images);
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'An unexpected error occurred. Try again later.',
    });
  } finally {
    hideLoader();
  }
});

// Показуємо/приховуємо кнопку при скролі
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-to-top');
  btn.style.display = window.pageYOffset > 300 ? 'block' : 'none';
});

// Плавний скрол наверх при кліку
document.getElementById('back-to-top').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
});
