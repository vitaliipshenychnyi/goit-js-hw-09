import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
import 'flatpickr/dist/flatpickr.min.css';
import convertMs from './moduls/convert-time';
import addLeadingZero from './moduls/add-zero';

const refs = {
  inputEl: document.querySelector('#datetime-picker'),
  btnEl: document.querySelector('button[data-start]'),
  dayEl: document.querySelector('.value[data-days]'),
  hourEl: document.querySelector('.value[data-hours]'),
  minutEl: document.querySelector('.value[data-minutes]'),
  secondEl: document.querySelector('.value[data-seconds]'),
};

refs.btnEl.setAttribute('disabled', 'disabled');

// let realTime = 0;
let futureTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  // defaultDate: new Date(),
  defaultDate: Date.now(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > options.defaultDate) {
      refs.btnEl.removeAttribute('disabled');
      futureTime = selectedDates[0].getTime();
    } else {
      refs.btnEl.setAttribute('disabled', 'disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
};

flatpickr(refs.inputEl, options);

// refs.btnEl.addEventListener('click', timeOut);
refs.btnEl.addEventListener('click', timerOut.start());

// function timeOut() {
//   refs.btnEl.setAttribute('disabled', 'disabled');
//   realTime = Date.now();
//   let ms = futureTime - realTime;
//   const idInterval = setInterval(() => {
//     ms -= 1000;
//     refs.dayEl.textContent = addLeadingZero(convertMs(ms).days);
//     refs.hourEl.textContent = addLeadingZero(convertMs(ms).hours);
//     refs.minutEl.textContent = addLeadingZero(convertMs(ms).minutes);
//     refs.secondEl.textContent = addLeadingZero(convertMs(ms).seconds);
//     if (ms < 1000) {
//       clearInterval(idInterval);
//       console.log('stop');
//       return;
//     }
//   }, 1000);
// }

const timerOut = {
  start() {
    setInterval(() => {
      const currentTime = Date.now();
      const ms = futureTime - currentTime;
      console.log(currentTime);
      console.log(ms);
      const { days, hours, minutes, seconds } = convertMs(ms);
    }, 1000);
  },
};

// timerOut.start();
