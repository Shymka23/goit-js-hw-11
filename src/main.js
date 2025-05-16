// Імпортуємо бібліотеку iziToast для відображення повідомлень
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Імпортуємо функцію для отримання зображень з Pixabay API
import { getImagesByQuery } from './js/pixabay-api';

// Імпортуємо допоміжні функції для роботи з галереєю та завантажувачем
import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions';

// Знаходимо форму пошуку на сторінці
const form = document.querySelector('.form');

// Додаємо слухача події submit до форми
form.addEventListener('submit', handleSubmit);

// Обробник події надсилання форми
async function handleSubmit(event) {
  event.preventDefault(); // Скасовуємо стандартну поведінку (перезавантаження сторінки)

  // Отримуємо значення з поля пошуку, обрізаючи пробіли
  const searchQuery = event.target.elements['search-text'].value.trim();

  // Якщо поле пошуку порожнє — показуємо попередження і зупиняємо виконання
  if (!searchQuery) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term',
      position: 'topRight',
    });
    return;
  }

  // Показуємо завантажувач та очищуємо попередню галерею
  showLoader();
  clearGallery();

  try {
    // Отримуємо дані зображень за пошуковим запитом
    const data = await getImagesByQuery(searchQuery);

    // Якщо результатів немає — повідомляємо користувача
    if (data.hits.length === 0) {
      iziToast.error({
        title: 'Error',
        message: 'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    // Створюємо галерею з отриманих зображень
    createGallery(data.hits);
  } catch (error) {
    // Обробка помилок запиту — повідомляємо користувача і виводимо помилку в консоль
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
    console.error(error);
  } finally {
    // Ховаємо завантажувач та скидаємо форму
    hideLoader();
    form.reset();
  }
}
