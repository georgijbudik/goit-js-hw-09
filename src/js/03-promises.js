import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', submitForm);

function submitForm(event) {
  event.preventDefault();

  const { delay, step, amount } = event.target.elements;
  const firstDelay = parseInt(delay.value);
  const delayStep = parseInt(step.value);
  const promiseAmount = parseInt(amount.value);

  for (let i = 1; i <= promiseAmount; i += 1) {
    const currentDelay = firstDelay + (i - 1) * delayStep;
    createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
