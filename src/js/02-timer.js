import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import convertMs from './moduls_02/convert_ms';
import addLeadingZero from './moduls_02/add_zero_start';
// Додаткова розмітка для опису функціоналу таймеру
import { description } from './moduls_02/description_countdown';

// Об'єкт зі змінними
const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('button[data-start]'),
  daysValueEl: document.querySelector('.value[data-days]'),
  hoursValueEl: document.querySelector('.value[data-hours]'),
  minutesValueEl: document.querySelector('.value[data-minutes]'),
  secondsValueEl: document.querySelector('.value[data-seconds]'),
  timerDivEl: document.querySelector('.timer'), // для опису функціоналу таймеру
};

let futureTime = 0;

// Налаштування бібліотеки flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(), // замість new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    futureTime = selectedDates[0].getTime(); // отримуємо вибраний час
    if (futureTime < options.defaultDate) {
      refs.startBtnEl.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtnEl.removeAttribute('disabled');
    }
  },
};

// Ініціалізація бібліотеки flatpickr та позиціонування
flatpickr(refs.inputEl, options);
Notiflix.Notify.init({
  width: '280px',
  position: 'left-top',
  distance: '10px',
  opacity: 1,
});

// початкове блокування кнопки Start
refs.startBtnEl.setAttribute('disabled', 'disabled');

// Оброблювач подій на кнопці Start
refs.startBtnEl.addEventListener('click', countdown);

function countdown() {
  refs.startBtnEl.setAttribute('disabled', 'disabled');
  refs.inputEl.setAttribute('disabled', 'disabled');

  // умова наявності залишку часу після його вибору
  if (futureTime < Date.now()) {
    refs.inputEl.removeAttribute('disabled');
    Notiflix.Notify.info('Time out! Please choose a new date in the future');
    return;
  }

  // запуск таймеру
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const restTime = futureTime - currentTime;
    const convertTime = convertMs(restTime);
    updateTime(convertTime);

    // умова зміни кольору лічильника
    if (restTime < 60000) {
      refs.timerDivEl.classList.add('last');
    }

    // умова зупинки таймеру
    if (restTime < 1000) {
      clearInterval(intervalId);
      refs.inputEl.removeAttribute('disabled');
      refs.timerDivEl.classList.remove('last');
      Notiflix.Notify.success('Success!!!');
    }
  }, 1000);
}

// Функція відтворення таймеру на еркані
function updateTime({ days, hours, minutes, seconds }) {
  refs.daysValueEl.textContent = addLeadingZero(days);
  refs.hoursValueEl.textContent = addLeadingZero(hours);
  refs.minutesValueEl.textContent = addLeadingZero(minutes);
  refs.secondsValueEl.textContent = addLeadingZero(seconds);
}

// Доддавання розмітка для опису функціоналу таймеру
document.addEventListener('DOMContentLoaded', descriptionCountdownTimer);
function descriptionCountdownTimer() {
  setTimeout(() => {
    refs.timerDivEl.insertAdjacentHTML('afterend', description);
  }, 1500);
}
