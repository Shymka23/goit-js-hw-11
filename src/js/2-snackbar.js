// Імпортуємо бібліотеку iziToast та її стилі
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

// Знаходимо форму у DOM
const form = document.querySelector('.form');

// Додаємо обробник події submit на форму
form.addEventListener('submit', event => {
  // Забороняємо стандартну поведінку форми (перезавантаження сторінки)
  event.preventDefault();

  // Отримуємо значення з форми:
  // - delay: перетворюємо строку в число за допомогою Number()
  // - state: отримуємо обране значення радіо-кнопок
  const delay = Number(form.elements.delay.value);
  const state = form.elements.state.value;

  // Створюємо проміс та обробляємо його результати
  createPromise(delay, state)
    .then(delay => {
      // У разі успішного виконання (resolve) показуємо "success" повідомлення
      iziToast.success({
        message: `✅ Проміс виконано за ${delay}мс`,
        position: 'topRight',
        timeout: 3000,
        color: 'green',
      });
    })
    .catch(delay => {
      // У разі помилки (reject) показуємо "error" повідомлення
      iziToast.error({
        message: `❌ Проміс відхилено за ${delay}мс`,
        position: 'topRight',
        timeout: 3000,
        color: 'red',
      });
    });
});

// Функція для створення промісу, який вирішується або відхиляється через заданий час
function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    // Встановлюємо таймер на вказану затримку
    setTimeout(() => {
      // Якщо обрано стан 'fulfilled' - викликаємо resolve
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        // Інакше - викликаємо reject
        reject(delay);
      }
    }, delay);
  });
}
