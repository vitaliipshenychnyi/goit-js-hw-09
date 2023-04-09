import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './moduls/convert-time';
import addLeadingZero from './moduls/add-zero';
import { description } from './moduls/description-timer'; // для опису функціоналу

// Збірка зміних
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('button[data-start]'),
  dayEl: document.querySelector('.value[data-days]'),
  hourEl: document.querySelector('.value[data-hours]'),
  minutEl: document.querySelector('.value[data-minutes]'),
  secondEl: document.querySelector('.value[data-seconds]'),
  timerEl: document.querySelector('.timer'), // для опису функціоналу
};

refs.btnEl.setAttribute('disabled', 'disabled');
let futureTime = 0;
let idTimeout = 0;

// Налаштування бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(), // замість new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime();

    // Перевірка вибраної дати та розблокування кнопки Start
    if (futureTime > options.defaultDate) {
      refs.btnEl.removeAttribute('disabled');

      // Функція, яка перевіряє залишок часу перед натискання на клавішу Start
      idTimeout = setTimeout(() => {
        refs.btnEl.setAttribute('disabled', 'disabled');
        Notiflix.Notify.warning(
          'Time out! Please choose a new date in the future'
        );
      }, futureTime - Date.now());
    } else if (Math.abs(futureTime - options.defaultDate) < 100000) {
      Notiflix.Notify.info('You are do not choose a date');
      return;
    } else {
      refs.btnEl.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

// Ініціалізація бібліотеки flatpickr
flatpickr(refs.inputEl, options);
Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '10px',
  opacity: 1,
});

// Створення класу таймеру зворотнього відліку
class Countdown {
  constructor({ timeTable }) {
    this.idInterval = null;
    this.timeTable = timeTable;
  }

  start() {
    refs.btnEl.setAttribute('disabled', 'disabled');
    refs.inputEl.setAttribute('disabled', 'disabled');
    clearTimeout(idTimeout);
    this.idInterval = setInterval(() => {
      const currentTime = Date.now(); // отримуємо поточний час
      const ms = futureTime - currentTime; // вираховуємо час до вибраного від поточного
      const time = convertMs(ms); // конвертуємо мілісекунди у формат Д:Ч:Х:С
      this.timeTable(time); // оновлюємо значення на екрані

      if (ms < 1000) {
        refs.inputEl.removeAttribute('disabled');
        clearInterval(this.idInterval); // очищаємо виконання функції лічильника
        Notiflix.Notify.success('Time out!!!');
        return;
      }
    }, 1000);
  }
}
// Створення таймеру із даними для виводу на екран лічильника часу
const timerOut = new Countdown({
  timeTable: updateTime,
});

// Функція відтворення таймеру на еркані
function updateTime({ days, hours, minutes, seconds }) {
  refs.dayEl.textContent = addLeadingZero(days);
  refs.hourEl.textContent = addLeadingZero(hours);
  refs.minutEl.textContent = addLeadingZero(minutes);
  refs.secondEl.textContent = addLeadingZero(seconds);
}

// Оброблювач подій на кнопці для запуску таймеру
refs.btnEl.addEventListener('click', timerOut.start.bind(timerOut));

// Пояснення щодо перевірок лічильника
document.addEventListener('DOMContentLoaded', descriptionCountdownTimer);

function descriptionCountdownTimer() {
  setTimeout(() => {
    refs.timerEl.insertAdjacentHTML('afterend', description);
  }, 1500);
}
