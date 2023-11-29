import { Notify } from 'notiflix/build/notiflix-notify-aio';

const createPromiseButton = document.querySelector('form');
const delayField = document.querySelector('input[name="delay"]');
const stepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');

Notify.init({
  position: 'center-center',
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const startPromise = function (event) {
  event.preventDefault();
  const informationContainer = [];

  for (let i = 0; i < amountField.value; i++) {
    const delayValue = Number(delayField.value) + i * Number(stepField.value);
    informationContainer.push(createPromise(i, delayValue));

    console.log(informationContainer);

    informationContainer[i]
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
        console.log(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`);
        console.log(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }
};

createPromiseButton.addEventListener('submit', startPromise);
