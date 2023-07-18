import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const datetimePicker = document.querySelector('#datetime-picker');
const startBtnEl = document.querySelector('[data-start]');
const restartBtnEl = document.querySelector('[data-restart]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtnEl.disabled = true;
    } else {
      startBtnEl.disabled = false;
    }
  },
});

let timerCountdown;

function updateTimer() {
  const targetDate = new Date(datetimePicker.value).getTime();
  const currentDate = new Date().getTime();
  const remainingTime = targetDate - currentDate;

  if (remainingTime <= 0) {
    clearInterval(timerCountdown);
    updateTimerDisplay(0, 0, 0, 0);
    datetimePicker.disabled = false;
    restartBtnEl.disabled = true;
    Notiflix.Notify.success('Countdown timer has ended');
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(remainingTime);
  updateTimerDisplay(days, hours, minutes, seconds);
}
function updateTimerDisplay(days, hours, minutes, seconds) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function restartTimer() {
  clearInterval(timerCountdown);
  updateTimerDisplay(0, 0, 0, 0);
  datetimePicker.disabled = false;
  restartBtnEl.disabled = true;
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtnEl.addEventListener('click', () => {
  timerCountdown = setInterval(updateTimer, 1000);
  startBtnEl.disabled = true;
  datetimePicker.disabled = true;
  restartBtnEl.disabled = false;
});

restartBtnEl.addEventListener('click', restartTimer);

window.addEventListener('DOMContentLoaded', () => {
  clearInterval(timerCountdown);
  updateTimerDisplay(0, 0, 0, 0);
  startBtnEl.disabled = true;
  restartBtnEl.disabled = true;
});
