const createPromisesButton = document.querySelector('button[type="submit"]');
const delayField = document.querySelector('input[name="delay"]');
const stepField = document.querySelector('input[name="step"]');
const amountField = document.querySelector('input[name="amount"]');

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

const startPromis = function (event) {
  event.preventDefault();
  const informationContainer = [];
  for (let i = 0; i < amountField.value; i++) {
    const delayValue = Number(delayField.value) + i * Number(stepField.value);
    informationContainer.push(createPromise(i, delayValue));

    informationContainer[i]
      .then(({ position, delay }) => {
        console.log(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        console.log(`❌ Rejected promise ${position + 1} in ${delay}ms`);
      });
  }
};

createPromisesButton.addEventListener('click', startPromis);
