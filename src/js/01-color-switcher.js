import getRandomHexColor from './moduls/color';

const refs = {
  startBtnEl: document.querySelector('button[data-start]'),
  stopBtnEl: document.querySelector('button[data-stop]'),
  bodyEl: document.querySelector('body'),
};

refs.startBtnEl.addEventListener('click', startChangeColor);
refs.stopBtnEl.addEventListener('click', stopChangeColor);

let idInterval = null;

function startChangeColor() {
  idInterval = setInterval(() => {
    refs.bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.startBtnEl.setAttribute('disabled', 'disabled');
  refs.stopBtnEl.removeAttribute('disabled');
}

function stopChangeColor() {
  refs.startBtnEl.removeAttribute('disabled');
  refs.stopBtnEl.setAttribute('disabled', 'disabled');
  clearInterval(idInterval);
}
