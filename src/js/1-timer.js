// Імпорт бібліотек та їх стилів
import flatpickr from 'flatpickr'; // Бібліотека для вибору дати/часу
import 'flatpickr/dist/flatpickr.min.css'; // Стилі для flatpickr
import iziToast from 'izitoast'; // Бібліотека для сповіщень
import 'izitoast/dist/css/iziToast.min.css'; // Стилі для сповіщень

// Отримання елементів DOM
const datetimePicker = document.querySelector('#datetime-picker'); // Поле вибору дати
const startButton = document.querySelector('[data-start]'); // Кнопка старту
const daysValue = document.querySelector('[data-days]'); // Елемент для днів
const hoursValue = document.querySelector('[data-hours]'); // Елемент для годин
const minutesValue = document.querySelector('[data-minutes]'); // Елемент для хвилин
const secondsValue = document.querySelector('[data-seconds]'); // Елемент для секунд

// Глобальні змінні
let userSelectedDate; // Зберігає обрану користувачем дату
let countdownInterval; // Інтервал для зворотнього відліку

// Налаштування для flatpickr
const options = {
  enableTime: true, // Дозволити вибір часу
  time_24hr: true, // 24-годинний формат часу
  defaultDate: new Date(), // Поточна дата за замовчуванням
  minuteIncrement: 1, // Крок хвилин
  onClose(selectedDates) {
    // Функція, яка викликається при закритті календаря
    userSelectedDate = selectedDates[0]; // Зберігаємо обрану дату
    const currentDate = new Date(); // Поточна дата

    // Перевіряємо, чи обрана дата в майбутньому
    if (userSelectedDate <= currentDate) {
      // Якщо дата в минулому - показуємо помилку
      iziToast.error({
        title: 'Помилка',
        message: 'Будь ласка, оберіть дату у майбутньому',
        position: 'topRight',
      });
      startButton.disabled = true; // Блокуємо кнопку старту
    } else {
      startButton.disabled = false; // Розблоковуємо кнопку старту
    }
  },
};

// Ініціалізація flatpickr
flatpickr(datetimePicker, options);

// Обробник кліку на кнопку старту
startButton.addEventListener('click', () => {
  startButton.disabled = true; // Блокуємо кнопку старту
  datetimePicker.disabled = true; // Блокуємо поле вибору дати

  // Запускаємо інтервал зворотнього відліку (кожну секунду)
  countdownInterval = setInterval(() => {
    const currentDate = new Date(); // Поточна дата
    const timeDifference = userSelectedDate - currentDate; // Різниця часу в мілісекундах

    // Якщо час вийшов
    if (timeDifference <= 0) {
      clearInterval(countdownInterval); // Зупиняємо інтервал
      updateTimerDisplay(0, 0, 0, 0); // Оновлюємо таймер на нулі
      datetimePicker.disabled = false; // Розблоковуємо поле вибору дати
      return;
    }

    // Конвертуємо мілісекунди в дні, години, хвилини, секунди
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    // Оновлюємо відображення таймера
    updateTimerDisplay(days, hours, minutes, seconds);
  }, 1000); // Оновлення кожну секунду
});

// Функція для конвертації мілісекунд у дні, години, хвилини, секунди
function convertMs(ms) {
  // Константи для переведення мілісекунд
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Розрахунки
  const days = Math.floor(ms / day); // Дні
  const hours = Math.floor((ms % day) / hour); // Години
  const minutes = Math.floor(((ms % day) % hour) / minute); // Хвилини
  const seconds = Math.floor((((ms % day) % hour) % minute) / second); // Секунди

  return { days, hours, minutes, seconds };
}

// Функція для додавання ведучого нуля (наприклад, 5 -> "05")
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

// Функція для оновлення відображення таймера
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days); // Оновлюємо дні
  hoursValue.textContent = addLeadingZero(hours); // Оновлюємо години
  minutesValue.textContent = addLeadingZero(minutes); // Оновлюємо хвилини
  secondsValue.textContent = addLeadingZero(seconds); // Оновлюємо секунди
}
