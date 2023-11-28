import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const startButton = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

let dateSelectedInFlatpickr;
let timeToCount;
let intervalRun;

startButton.setAttribute('disabled', true);

flatpickr('input#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < new Date().getTime()) {
      startButton.setAttribute('disabled', true);
      window.alert('Please choose a date in the future');
    } else {
      startButton.removeAttribute('disabled');
      dateSelectedInFlatpickr = selectedDates[0].getTime();
    }
  },
});
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

startButton.addEventListener('click', () => {
  intervalRun = setInterval(() => {
    const currentTime = new Date().getTime();
    ms = dateSelectedInFlatpickr - currentTime;
    if (ms <= 0) {
      clearInterval(intervalRun);
    } else {
      timeToCount = convertMs(ms);
      daysNumber = timeToCount.days;
      hoursNumber = timeToCount.hours;
      minutesNumber = timeToCount.minutes;
      secondsNumber = timeToCount.seconds;
      addLeadingZero(daysNumber, daysField);
      addLeadingZero(hoursNumber, hoursField);
      addLeadingZero(minutesNumber, minutesField);
      addLeadingZero(secondsNumber, secondsField);
    }
  }, 1000);
});

function addLeadingZero(value, field) {
  field.textContent = String(value).padStart(2, '0');
}
