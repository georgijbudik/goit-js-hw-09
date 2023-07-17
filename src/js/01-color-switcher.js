function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtnEl = document.querySelector('[data-start]');
const stopBtnEl = document.querySelector('[data-stop]');

let intervalId = null;
stopBtnEl.disabled = true;

const onStartClick = () => {
  startBtnEl.disabled = true;
  stopBtnEl.disabled = false;
  intervalId = setInterval(bodyColorChange, 1000);
};

const onStopClick = () => {
  startBtnEl.disabled = false;
  stopBtnEl.disabled = true;
  clearInterval(intervalId);
};

const bodyColorChange = () => {
  document.body.style.backgroundColor = getRandomHexColor();
};

startBtnEl.addEventListener('click', onStartClick);
stopBtnEl.addEventListener('click', onStopClick);
