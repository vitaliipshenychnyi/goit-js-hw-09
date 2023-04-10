const formEl = document.querySelector('.form');
let position = 0;

formEl.addEventListener('submit', event => {
  event.preventDefault();
  position += 1;
  const delay = event.currentTarget.elements.delay.value;
  const step = event.currentTarget.elements.step.value;
  const amount = event.currentTarget.elements.amount.value;

  createPromise(position, delay);
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    console.log(position);
    console.log(delay);
    // Fulfill
  } else {
    // Reject
    console.log(false);
  }
}
