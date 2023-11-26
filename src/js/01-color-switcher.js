const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyBackground = document.querySelector('body');
let intervalSetup;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

startButton.style.cursor = 'pointer';
stopButton.style.cursor = 'pointer';

const backgroundColorStart = function () {
  intervalSetup = setInterval(() => {
    bodyBackground.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.setAttribute('disabled', true);
  stopButton.removeAttribute('disabled');
};

const backgroundColorStop = function () {
  clearInterval(intervalSetup);
  startButton.removeAttribute('disabled');
  stopButton.setAttribute('disabled', true);
};

startButton.addEventListener('click', backgroundColorStart);
stopButton.addEventListener('click', backgroundColorStop);
